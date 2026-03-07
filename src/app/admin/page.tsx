"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Tag, Users, TrendingUp } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AdminPage() {
  const stats = [
    {
      title: "Total Lokasi",
      value: "5",
      icon: MapPin,
      description: "Lokasi aktif",
      href: "/admin/locations",
    },
    {
      title: "Total Tag",
      value: "10",
      icon: Tag,
      description: "Tag tersedia",
      href: "/admin/tags",
    },
    {
      title: "Total Booking",
      value: "24",
      icon: TrendingUp,
      description: "Bulan ini",
      href: "#",
    },
    {
      title: "Total Users",
      value: "156",
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
            <CardTitle className="font-display">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-sm">
                <p className="font-medium text-foreground">
                  Lokasi baru ditambahkan
                </p>
                <p className="text-xs text-muted-foreground">
                  Tropical Garden Courtyard - 2 jam yang lalu
                </p>
              </div>
              <div className="text-sm">
                <p className="font-medium text-foreground">Tag baru dibuat</p>
                <p className="text-xs text-muted-foreground">
                  Nature - 5 jam yang lalu
                </p>
              </div>
              <div className="text-sm">
                <p className="font-medium text-foreground">
                  Booking baru masuk
                </p>
                <p className="text-xs text-muted-foreground">
                  Skyline Rooftop - 1 hari yang lalu
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
