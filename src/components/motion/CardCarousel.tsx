import type { ReactNode } from "react";

type TrackProps = {
  items: ReactNode[];
  duration: number;
  hidden?: boolean;
};

function Track({ items, duration, hidden = false }: TrackProps) {
  return (
    <div
      className="flex flex-none gap-5 pr-5"
      style={{ animation: `marquee ${duration}s linear infinite` }}
      aria-hidden={hidden || undefined}
    >
      {items}
    </div>
  );
}

type CardCarouselProps = {
  items: ReactNode[];
  duration?: number;
};

export default function CardCarousel({ items, duration = 46 }: CardCarouselProps) {
  return (
    <div
      className="flex overflow-hidden"
      style={{
        maskImage: "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)",
        WebkitMaskImage: "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)",
      }}
    >
      <Track items={items} duration={duration} />
      <Track items={items} duration={duration} hidden />
    </div>
  );
}
