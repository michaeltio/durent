import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

type MidtransWebhookPayload = {
  transaction_status?: string;
  order_id?: string;
};

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const body = (await request.json()) as MidtransWebhookPayload;

    const orderId = String(body?.order_id || "").trim();
    const transactionStatus = String(body?.transaction_status || "")
      .trim()
      .toLowerCase();

    if (!orderId || !transactionStatus) {
      return NextResponse.json(
        {
          message:
            "Payload tidak valid. order_id dan transaction_status wajib diisi.",
        },
        { status: 400 },
      );
    }

    const { data: updatedRows, error: updateError } = await supabase
      .from("bookings")
      .update({ payment_status: transactionStatus })
      .eq("booking_id", orderId)
      .select("id");

    if (updateError) {
      console.error("Midtrans webhook update error:", updateError);
      return NextResponse.json(
        { message: "Gagal update status pembayaran" },
        { status: 500 },
      );
    }

    if (!updatedRows || updatedRows.length === 0) {
      return NextResponse.json(
        {
          message: "Booking dengan booking_id tidak ditemukan",
          booking_id: orderId,
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        message: "Status pembayaran berhasil diperbarui",
        booking_id: orderId,
        transaction_status: transactionStatus,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Midtrans webhook error:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan saat memproses webhook" },
      { status: 500 },
    );
  }
}
