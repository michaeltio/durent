import { MapPin, Maximize, Star } from "lucide-react";
import { AppCardProps } from "@/types/app-card";

export default function AppCard({
  name,
  city,
  price,
  area,
  imageUrl,
  pax,
  rate,
  tags,
}: AppCardProps) {
  return (
    <div className="snap-start shrink-0 w-[400px] sm:w-[420px]">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
        <img
          src={imageUrl && imageUrl.length > 0 ? imageUrl[0] : "/hero.webp"}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Rating badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-lg text-sm font-semibold">
          <Star className="h-3.5 w-3.5 fill-star text-star" />
          {rate.toFixed(1)}
        </div>
        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="absolute bottom-3 left-3 flex gap-1.5 flex-wrap">
            {tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="bg-background/80 backdrop-blur-sm text-foreground text-xs font-medium px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="pt-3 pb-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold text-foreground leading-tight">{name}</h3>
          <span className="text-primary font-bold whitespace-nowrap">
            {price}
            <span className="text-muted-foreground font-normal text-sm">
              /hari
            </span>
          </span>
        </div>
        <p className="flex items-center gap-1 text-muted-foreground text-sm mt-1">
          <MapPin className="h-3.5 w-3.5" />
          {city}
        </p>
        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Maximize className="h-3.5 w-3.5" />
            {area} m²
          </span>
          <span>{pax} pax</span>
        </div>
      </div>
    </div>
  );
}
