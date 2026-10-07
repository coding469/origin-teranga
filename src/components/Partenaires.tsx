const PARTNERS = [
  "LOUDNICK",
  "CROSSWILL",
  "Real Wave",
  "PITCH",
  "Juire",
  "Job Line",
  "INNER",
  "LO",
];

function Track({ hidden = false }: { hidden?: boolean }) {
  return (
    <div
      className="animate-marquee flex flex-none gap-[72px] px-9"
      aria-hidden={hidden || undefined}
    >
      {PARTNERS.map((name) => (
        <span
          key={name}
          className="whitespace-nowrap font-display text-2xl text-ink/62"
        >
          {name}
        </span>
      ))}
    </div>
  );
}

export default function Partenaires() {
  return (
    <section
      id="partenaires"
      className="grain relative overflow-hidden bg-bg py-16"
    >
      <p className="mb-9 text-center text-[13px] uppercase tracking-[0.1em] text-ink/34">
        Ils construisent l&apos;expérience avec nous
      </p>
      <div
        className="flex overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)",
        }}
      >
        <Track />
        <Track hidden />
      </div>
    </section>
  );
}
