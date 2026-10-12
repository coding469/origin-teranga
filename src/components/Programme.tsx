import Image from "next/image";
import { images } from "@/lib/images";

const ROWS = [
  {
    num: "01",
    title: "Soirée de bienvenue",
    desc: "Une ouverture qui fait dialoguer danse contemporaine et rythmes traditionnels sénégalais.",
    tag: "Ouverture",
    day: "Jour 1",
    cta: "Réserver",
    href: "/reserver",
    variant: "line" as const,
    image: images.programme.bienvenue,
    alt: "Foule souriante levant les mains en signe de bienvenue",
  },
  {
    num: "02",
    title: "Concert live",
    desc: "Des artistes de la diaspora sur scène, pour une soirée musicale sans frontières.",
    tag: "Musique",
    day: "Jour 2",
    cta: "Réserver",
    href: "/reserver",
    variant: "line" as const,
    image: images.programme.concert,
    alt: "Foule face à une scène de concert illuminée",
  },
  {
    num: "03",
    title: "Atelier culinaire",
    desc: "Des cheffes sénégalaises transmettent les gestes et les saveurs de la cuisine locale.",
    tag: "Gastronomie",
    day: "Jour 2",
    cta: "Réserver",
    href: "/reserver",
    variant: "line" as const,
    image: images.programme.culinaire,
    alt: "Plat de riz et viande servi traditionnellement",
  },
  {
    num: "04",
    title: "Battle Afro",
    desc: "La grande compétition de danse du festival.",
    tag: "Danse",
    day: "Jour 3",
    cta: "Participer",
    href: "#battle",
    variant: "clay" as const,
    image: images.programme.battleAfro,
    alt: "Cercle de danseurs en pleine performance",
  },
  {
    num: "05",
    title: "Nuit des voix",
    desc: "La clôture du festival, autour de micros vintage et de voix qui racontent.",
    tag: "Clôture",
    day: "Jour 3",
    cta: "Réserver",
    href: "/reserver",
    variant: "line" as const,
    image: images.programme.nuitVoix,
    alt: "Microphone vintage sur scène",
  },
];

export default function Programme() {
  return (
    <section
      id="programme"
      className="bg-bg-soft px-5 py-20 sm:px-8 sm:py-28 lg:px-[72px] lg:py-[140px]"
    >
      <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <div>
          <span className="text-[12.5px] font-bold uppercase tracking-[0.22em] text-clay-soft">
            Au programme
          </span>
          <h2 className="mt-3.5 font-display text-[clamp(30px,4vw,56px)] font-medium">
            Cinq temps forts
          </h2>
        </div>
        <a
          href="/reserver"
          className="hidden h-[52px] items-center gap-2.5 rounded-full border border-ink/40 px-7 text-sm font-bold text-ink transition-all duration-300 hover:border-ink hover:bg-ink/6 lg:inline-flex"
        >
          Réserver ma place
        </a>
      </div>

      <div className="border-b border-ink/14">
        {ROWS.map((row) => (
          <div
            key={row.num}
            className="flex flex-wrap items-center gap-5 border-t border-ink/14 py-7 first:border-t-0 sm:gap-7"
          >
            <span className="w-14 text-[12.5px] font-bold uppercase tracking-[0.22em] text-ink/34">
              {row.num}
            </span>
            <div className="relative h-16 w-16 flex-none overflow-hidden rounded-xl sm:h-[72px] sm:w-[72px]">
              <Image
                src={row.image}
                alt={row.alt}
                fill
                sizes="72px"
                className="object-cover"
              />
            </div>
            <div className="min-w-[220px] flex-1 basis-[280px]">
              <h3 className="font-display text-xl font-medium sm:text-2xl">
                {row.title}
              </h3>
              <p className="mt-1.5 max-w-[560px] text-[13.5px] leading-relaxed text-ink/62 sm:text-[14.5px]">
                {row.desc}
              </p>
            </div>
            <span className="w-auto text-[13px] text-ink/62 sm:w-[120px]">
              {row.tag}
            </span>
            <span className="hidden w-[100px] text-[13px] text-ink/62 sm:inline">
              {row.day}
            </span>
            <a
              href={row.href}
              className={`inline-flex h-[42px] items-center rounded-full px-5 text-[13px] font-bold transition-all duration-300 ${
                row.variant === "clay"
                  ? "bg-clay text-ink hover:bg-clay-soft"
                  : "border border-ink/40 text-ink hover:border-ink hover:bg-ink/6"
              }`}
            >
              {row.cta}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
