type TrackProps = {
  items: string[];
  itemClassName?: string;
  hidden?: boolean;
};

function Track({ items, itemClassName, hidden = false }: TrackProps) {
  return (
    <div
      className="animate-marquee flex flex-none gap-[72px] px-9"
      aria-hidden={hidden || undefined}
    >
      {items.map((item, index) => (
        <span
          key={`${item}-${index}`}
          className={itemClassName ?? "whitespace-nowrap font-display text-2xl text-ink/62"}
        >
          {item}
        </span>
      ))}
    </div>
  );
}

type MarqueeProps = {
  items: string[];
  itemClassName?: string;
};

export default function Marquee({ items, itemClassName }: MarqueeProps) {
  return (
    <div
      className="flex overflow-hidden"
      style={{
        maskImage: "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)",
        WebkitMaskImage: "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)",
      }}
    >
      <Track items={items} itemClassName={itemClassName} />
      <Track items={items} itemClassName={itemClassName} hidden />
    </div>
  );
}
