import Image from "next/image";
import { images } from "@/lib/images";

const PILLARS = [
  {
    name: "Festival",
    href: "/festival",
    signature: "L'Afrique se célèbre.",
    image: images.activites.party,
    accent: "clay" as const,
  },
  {
    name: "Expériences",
    href: "/experiences",
    signature: "L'Afrique se vit.",
    image: images.univers.sport,
    accent: "gold" as const,
  },
  {
    name: "Passeport",
    href: "/passeport",
    signature: "L'Afrique se découvre.",
    image: images.activites.voyage,
    accent: "clay" as const,
  },
  {
    name: "Oteranga",
    href: "/oteranga",
    signature: "L'Afrique se crée.",
    image: images.activites.marketplace,
    accent: "gold" as const,
  },
  {
    name: "Communauté",
    href: "/communaute",
    signature: "L'Afrique se rassemble.",
    image: images.histoire.transmission,
    accent: "clay" as const,
  },
  {
    name: "Impact",
    href: "/impact",
    signature: "L'Afrique se construit.",
    image: images.univers.entrepreneuriat,
    accent: "gold" as const,
  },
];

export default function Univers() {
  return (
    <section
      id="ecosysteme"
      className="bg-sand px-5 py-20 text-dark-ink sm:px-8 sm:py-28 lg:px-[72px] lg:py-[140px]"
    >
      <div className="mb-12 max-w-[680px]">
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

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        {PILLARS.map((pillar) => (
          <a
            key={pillar.name}
            href={pillar.href}
            className="group overflow-hidden rounded-2xl border border-dark-ink/12 bg-sand-soft transition-colors duration-300 hover:border-clay"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={pillar.image}
                alt={pillar.signature}
                fill
                sizes="(min-width: 1024px) 33vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-ink/55 via-transparent to-transparent" />
              <span
                className={`absolute left-4 top-4 h-2.5 w-2.5 rounded-full ${
                  pillar.accent === "gold" ? "bg-gold" : "bg-clay-soft"
                }`}
              />
            </div>
            <div className="px-6 py-6">
              <h3 className="font-display text-xl">{pillar.name}</h3>
              <p className="mt-2 text-[15px] italic text-dark-ink/64">
                {pillar.signature}
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
