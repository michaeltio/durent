import Midtrans from "midtrans-client";
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

let snap = new Midtrans.Snap({
  // Set to true if you want Production Environment (accept real transaction).
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY || "",
});

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const body = await request.json();
    console.log("Midtrans tokenizer request body:", body);
    const user = body?.user;
    const items = Array.isArray(body?.items) ? body.items : [];

    const {
      data: { user: authUser },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !authUser) {
      return NextResponse.json(
        { message: "User belum login" },
        { status: 401 },
      );
    }

    if (!user || !user.id || !user.email) {
      return NextResponse.json(
        { message: "User checkout tidak valid" },
        { status: 400 },
      );
    }

    if (items.length === 0) {
      return NextResponse.json(
        { message: "Item checkout kosong" },
        { status: 400 },
      );
    }

    const grossAmount = items.reduce(
      (sum: number, item: { subtotal?: number }) => {
        return sum + Number(item?.subtotal || 0);
      },
      0,
    );

    const bookingRows = items.map(
      (item: {
        id?: string;
        subtotal?: number;
        dateRange?: { from?: string; to?: string };
      }) => ({
        user_id: authUser.id,
        location_id: String(item.id || ""),
        booking_start: item.dateRange?.from,
        booking_end: item.dateRange?.to ?? item.dateRange?.from,
        total_price: Number(item.subtotal || 0),
        payment_status: "pending",
      }),
    );

    const hasInvalidBookingRow = bookingRows.some(
      (row: { location_id: any; booking_start: any; booking_end: any }) =>
        !row.location_id || !row.booking_start || !row.booking_end,
    );

    if (hasInvalidBookingRow) {
      return NextResponse.json(
        { message: "Data booking tidak valid" },
        { status: 400 },
      );
    }

    const { error: bookingInsertError } = await supabase
      .from("bookings")
      .insert(bookingRows);

    if (bookingInsertError) {
      console.error("Insert bookings error:", bookingInsertError);
      return NextResponse.json(
        { message: "Gagal membuat booking" },
        { status: 500 },
      );
    }

    const orderId = `ORDER-${Date.now()}-${user.id.slice(0, 8)}`;

    const parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: grossAmount,
      },
      //   credit_card: {
      //     secure: true,
      //   },
      enabled_payments: [
        "bca_va",
        "bni_va",
        "bri_va",
        "permata_va",
        "gopay",
        "shopeepay",
      ],
      customer_details: {
        email: user.email,
      },
      page_expiry: {
        duration: 5,
        unit: "minute",
      },
      item_details: items.map(
        (item: {
          id: string;
          name: string;
          days: number;
          unitPrice: number;
        }) => ({
          id: item.id,
          price: Number(item.unitPrice || 0),
          quantity: Number(item.days || 1),
          name: item.name,
        }),
      ),
    };

    const token = await snap.createTransaction(parameter);

    return NextResponse.json({
      token: token.token,
      redirect_url: token.redirect_url,
      order_id: orderId,
      gross_amount: grossAmount,
    });
  } catch (error) {
    console.error("Midtrans tokenizer error:", error);
    return NextResponse.json(
      { message: "Gagal membuat token Midtrans" },
      { status: 500 },
    );
  }
}
