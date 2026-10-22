import { images } from "@/lib/images";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import TiltCard from "@/components/motion/TiltCard";
import Counter from "@/components/motion/Counter";

const PILLARS = [
  {
    name: "Festival",
    href: "/festival",
    signature: "L'Afrique se célèbre.",
    image: images.activites.party,
    accent: "clay" as const,
    size: "lg" as const,
  },
  {
    name: "Expériences",
    href: "/experiences",
    signature: "L'Afrique se vit.",
    image: images.univers.sport,
    accent: "gold" as const,
    size: "sm" as const,
  },
  {
    name: "Passeport",
    href: "/passeport",
    signature: "L'Afrique se découvre.",
    image: images.activites.voyage,
    accent: "clay" as const,
    size: "sm" as const,
  },
  {
    name: "Oteranga",
    href: "/oteranga",
    signature: "L'Afrique se crée.",
    image: images.activites.marketplace,
    accent: "gold" as const,
    size: "sm" as const,
  },
  {
    name: "Communauté",
    href: "/communaute",
    signature: "L'Afrique se rassemble.",
    image: images.histoire.transmission,
    accent: "clay" as const,
    size: "sm" as const,
  },
  {
    name: "Impact",
    href: "/impact",
    signature: "L'Afrique se construit.",
    image: images.univers.entrepreneuriat,
    accent: "gold" as const,
    size: "sm" as const,
  },
];

export default function Univers() {
  return (
    <section
      id="ecosysteme"
      className="bg-sand px-5 py-20 text-dark-ink sm:px-8 sm:py-28 lg:px-[72px] lg:py-[140px]"
    >
      <div className="mb-10 max-w-[680px]">
        <span className="text-[12.5px] font-bold uppercase tracking-[0.22em] text-clay">
          Bien plus qu&apos;un événement
        </span>
        <h2 className="mt-3.5 font-display text-[clamp(30px,4vw,56px)] font-medium">
          Découvrez l&apos;écosystème Origin Teranga.
        </h2>
        <p className="mt-5 text-[15px] leading-relaxed text-dark-ink/64">
          Origin Teranga est une initiative culturelle, communautaire et
          économique qui rassemble les talents, valorise les savoir-faire et
          crée des passerelles entre l&apos;Afrique, ses diasporas et le
          monde.
        </p>
      </div>

      <div className="mb-12 flex flex-wrap gap-10">
        <div>
          <div className="font-display text-[clamp(32px,4vw,44px)] italic text-clay">
            <Counter to={6} />
          </div>
          <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-dark-ink/50">
            Piliers
          </p>
        </div>
        <div>
          <div className="font-display text-[clamp(32px,4vw,44px)] italic text-clay">
            <Counter to={5} />
          </div>
          <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-dark-ink/50">
            Jours de festival
          </p>
        </div>
        <div>
          <div className="font-display text-[clamp(32px,4vw,44px)] italic text-clay">
            <Counter to={2026} duration={1200} />
          </div>
          <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-dark-ink/50">
            Édition
          </p>
        </div>
      </div>

      <Stagger className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:grid-rows-2">
        {PILLARS.map((pillar) => (
          <StaggerItem
            key={pillar.name}
            className={
              pillar.size === "lg"
                ? "col-span-2 row-span-2 aspect-[4/3] lg:aspect-auto"
                : "col-span-1 aspect-[4/3] lg:aspect-auto"
            }
          >
            <TiltCard
              href={pillar.href}
              image={pillar.image}
              alt={pillar.signature}
              accentClassName={pillar.accent === "gold" ? "bg-gold" : "bg-clay-soft"}
              sizes={
                pillar.size === "lg"
                  ? "(min-width: 1024px) 50vw, 100vw"
                  : "(min-width: 1024px) 25vw, 50vw"
              }
              className="h-full"
            >
              <h3 className="font-display text-xl text-ink">{pillar.name}</h3>
              <p className="mt-2 text-[15px] italic text-ink/72">{pillar.signature}</p>
            </TiltCard>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
