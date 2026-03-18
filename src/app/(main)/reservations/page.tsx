"use client";

import { ArrowLeft, CalendarCheck, MapPin } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";

function parsePrice(price: string | number | null | undefined) {
  const numericValue = String(price ?? "").replace(/[^0-9]/g, "");
  return Number.parseInt(numericValue, 10) || 0;
}

function formatPrice(value: number) {
  return `Rp ${value.toLocaleString("id-ID")}`;
}

function getStatusLabel(from: Date, to: Date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (to < today) {
    return { text: "Selesai", cls: "bg-muted text-muted-foreground" };
  }

  if (from <= today && to >= today) {
    return { text: "Berlangsung", cls: "bg-primary/20 text-primary" };
  }

  return { text: "Akan Datang", cls: "bg-accent text-accent-foreground" };
}

export default function ReservationsPage() {
  const router = useRouter();
  const { items, getDays } = useCart();

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-8">
      <div className="mb-8 flex items-center gap-4">
        <button
          type="button"
          onClick={() => router.push("/")}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-secondary-foreground transition-colors hover:bg-accent"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="font-display text-2xl font-bold text-foreground">
          Reservasi Saya
        </h1>
        {items.length > 0 ? (
          <span className="rounded-lg bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
            {items.length} booking
          </span>
        ) : null}
      </div>

      {items.length === 0 ? (
        <div className="flex min-h-[420px] flex-col items-center justify-center rounded-3xl border border-dashed border-border/50 bg-card/30 px-6 py-16 text-center">
          <CalendarCheck className="mb-4 h-16 w-16 text-muted-foreground" />
          <h2 className="font-display text-lg font-semibold text-foreground">
            Belum Ada Reservasi
          </h2>
          <p className="mb-6 mt-2 text-sm text-muted-foreground">
            Anda belum memiliki booking lokasi apapun.
          </p>
          <Button onClick={() => router.push("/")}>Jelajahi Lokasi</Button>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item) => {
            const days = getDays(item);
            const from = item.dateRange?.from ?? null;
            const to = item.dateRange?.to ?? from;
            const subtotal = parsePrice(item.price) * days;
            const status =
              from && to
                ? getStatusLabel(from, to)
                : {
                    text: "Tanggal Belum Dipilih",
                    cls: "bg-muted text-muted-foreground",
                  };

            return (
              <article
                key={item.id}
                className="rounded-2xl border border-border/40 bg-card/50 p-4"
              >
                <div className="flex gap-4">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="h-28 w-28 rounded-xl object-cover"
                  />
                  <div className="flex min-w-0 flex-1 flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h3 className="truncate font-display text-base font-semibold text-foreground">
                            {item.name}
                          </h3>
                          <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin className="h-3.5 w-3.5" />
                            <span>{item.city}</span>
                          </div>
                        </div>
                        <span
                          className={`rounded-md px-2.5 py-1 text-[10px] font-semibold ${status.cls}`}
                        >
                          {status.text}
                        </span>
                      </div>

                      <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                        <CalendarCheck className="h-3.5 w-3.5" />
                        {from && to ? (
                          <span>
                            {format(from, "d MMM yyyy", { locale: id })} -{" "}
                            {format(to, "d MMM yyyy", { locale: id })}
                          </span>
                        ) : (
                          <span>Pilih tanggal sewa di keranjang</span>
                        )}
                        <span className="text-muted-foreground/50">•</span>
                        <span>{days > 0 ? `${days} hari` : "-"}</span>
                      </div>

                      {item.tags.length > 0 ? (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {item.tags.slice(0, 3).map((tag: string) => (
                            <span
                              key={tag}
                              className="rounded-md bg-secondary/80 px-2 py-0.5 text-[10px] text-secondary-foreground"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </div>

                    <div className="mt-3 flex items-center justify-end">
                      <span className="text-sm font-semibold text-primary">
                        {formatPrice(subtotal)}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
