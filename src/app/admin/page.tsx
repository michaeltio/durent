import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Tag, Users, TrendingUp } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createServiceRoleClient } from "@/lib/supabase/server";

type OrderRow = {
  order_id: string;
  user_id: string;
  created_at: string;
};

type OrderItemRow = {
  order_id: string;
  location_id: string;
  booking_start: string;
  booking_end: string;
};

type LocationRow = {
  shooting_location_id: string;
  shooting_location_name: string;
};

type RecentBookingRow = {
  orderId: string;
  userLabel: string;
  locationNames: string;
  dateRange: string;
};

function formatDateRange(start: string, end: string) {
  const startDate = new Date(start);
  const endDate = new Date(end);

  if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
    return "-";
  }

  return `${startDate.toLocaleDateString("id-ID")} - ${endDate.toLocaleDateString("id-ID")}`;
}

export default async function AdminPage() {
  const supabase = createServiceRoleClient();

  const [
    profilesCountResult,
    locationsCountResult,
    tagsCountResult,
    ordersCountResult,
    recentOrdersResult,
  ] = await Promise.all([
    supabase.from("profiles").select("user_id", { count: "exact", head: true }),
    supabase
      .from("shooting_locations")
      .select("shooting_location_id", { count: "exact", head: true }),
    supabase.from("tags").select("tag_id", { count: "exact", head: true }),
    supabase.from("orders").select("order_id", { count: "exact", head: true }),
    supabase
      .from("orders")
      .select("order_id, user_id, created_at")
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  const totalUsers = profilesCountResult.count ?? 0;
  const totalLocations = locationsCountResult.count ?? 0;
  const totalTags = tagsCountResult.count ?? 0;
  const totalBookings = ordersCountResult.count ?? 0;

  const recentOrders = (recentOrdersResult.data ?? []) as OrderRow[];

  let recentBookings: RecentBookingRow[] = [];

  if (recentOrders.length > 0) {
    const orderIds = recentOrders.map((order) => order.order_id);

    const { data: orderItemsData } = await supabase
      .from("order_items")
      .select("order_id, location_id, booking_start, booking_end")
      .in("order_id", orderIds);

    const orderItems = (orderItemsData ?? []) as OrderItemRow[];
    const locationIds = [
      ...new Set(orderItems.map((item) => item.location_id)),
    ];

    const { data: locationsData } = await supabase
      .from("shooting_locations")
      .select("shooting_location_id, shooting_location_name")
      .in("shooting_location_id", locationIds);

    const locations = (locationsData ?? []) as LocationRow[];
    const locationMap = new Map(
      locations.map((loc) => [
        loc.shooting_location_id,
        loc.shooting_location_name,
      ]),
    );

    recentBookings = recentOrders.map((order) => {
      const itemsForOrder = orderItems.filter(
        (item) => item.order_id === order.order_id,
      );

      const locationNames = itemsForOrder
        .map(
          (item) =>
            locationMap.get(item.location_id) ?? "Lokasi tidak ditemukan",
        )
        .filter((name, index, arr) => arr.indexOf(name) === index);

      const sortedByStart = [...itemsForOrder].sort((a, b) =>
        a.booking_start.localeCompare(b.booking_start),
      );
      const firstItem = sortedByStart[0];
      const lastItem = sortedByStart[sortedByStart.length - 1];

      const dateRange =
        firstItem && lastItem
          ? formatDateRange(firstItem.booking_start, lastItem.booking_end)
          : "-";

      return {
        orderId: order.order_id,
        userLabel: order.user_id,
        locationNames:
          locationNames.length > 0 ? locationNames.join(", ") : "-",
        dateRange,
      };
    });
  }

  const stats = [
    {
      title: "Total Lokasi",
      value: String(totalLocations),
      icon: MapPin,
      description: "Lokasi aktif",
      href: "/admin/locations",
    },
    {
      title: "Total Tag",
      value: String(totalTags),
      icon: Tag,
      description: "Tag tersedia",
      href: "/admin/tags",
    },
    {
      title: "Total Booking",
      value: String(totalBookings),
      icon: TrendingUp,
      description: "Dari tabel orders",
      href: "#",
    },
    {
      title: "Total Users",
      value: String(totalUsers),
      icon: Users,
      description: "Pengguna terdaftar",
      href: "#",
    },
  ];

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground mb-2">
          Dashboard
        </h1>
        <p className="text-muted-foreground">
          Selamat datang di admin panel DuRent
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
                  {stat.value}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.description}
                </p>
                {stat.href !== "#" && (
                  <Link href={stat.href}>
                    <Button variant="link" className="px-0 mt-2 h-auto text-xs">
                      Lihat detail →
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="font-display">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link href="/admin/locations">
              <Button variant="outline" className="w-full justify-start">
                <MapPin className="h-4 w-4 mr-2" />
                Kelola Lokasi
              </Button>
            </Link>
            <Link href="/admin/tags">
              <Button variant="outline" className="w-full justify-start">
                <Tag className="h-4 w-4 mr-2" />
                Kelola Tag
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader>
            <CardTitle className="font-display">Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            {recentBookings.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Belum ada booking terbaru.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-left text-xs uppercase tracking-[0.08em] text-muted-foreground">
                      <th className="py-2 pr-4 font-medium">User</th>
                      <th className="py-2 pr-4 font-medium">Booking Lokasi</th>
                      <th className="py-2 font-medium">Tanggal Range</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentBookings.map((booking) => (
                      <tr
                        key={booking.orderId}
                        className="border-b border-border/40 align-top"
                      >
                        <td className="py-3 pr-4 text-xs text-muted-foreground">
                          {booking.userLabel}
                        </td>
                        <td className="py-3 pr-4 text-foreground">
                          {booking.locationNames}
                        </td>
                        <td className="py-3 text-muted-foreground">
                          {booking.dateRange}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
