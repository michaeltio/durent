import { MapPin, Maximize, Star } from "lucide-react";

export default function AppCard() {
  return (
    <div className="snap-start shrink-0 w-[400px] sm:w-[420px]">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
        <img
          src="/hero.webp"
          alt="Gedung Putih"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Rating badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-lg text-sm font-semibold">
          <Star className="h-3.5 w-3.5 fill-star text-star" />
          4.8
        </div>
        {/* Tags */}
        <div className="absolute bottom-3 left-3 flex gap-1.5 flex-wrap">
          <span className="bg-background/80 backdrop-blur-sm text-foreground text-xs font-medium px-2 py-0.5 rounded-full">
            Outdoor
          </span>
          <span className="bg-background/80 backdrop-blur-sm text-foreground text-xs font-medium px-2 py-0.5 rounded-full">
            Urban
          </span>
          <span className="bg-background/80 backdrop-blur-sm text-foreground text-xs font-medium px-2 py-0.5 rounded-full">
            Wilderness
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="pt-3 pb-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold text-foreground leading-tight">
            Gedung Putih
          </h3>
          <span className="text-primary font-bold whitespace-nowrap">
            Rp 2.000.000
            <span className="text-muted-foreground font-normal text-sm">
              /hari
            </span>
          </span>
        </div>
        <p className="flex items-center gap-1 text-muted-foreground text-sm mt-1">
          <MapPin className="h-3.5 w-3.5" />
          Jakarta
        </p>
        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Maximize className="h-3.5 w-3.5" />
            1000 m²
          </span>
          <span>50 pax</span>
        </div>
      </div>
    </div>
  );
}
