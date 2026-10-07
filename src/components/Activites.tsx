import Image from "next/image";
import Link from "next/link";
import { images } from "@/lib/images";

type Tile = {
  num: string;
  title: string;
  desc: string;
  cta: string;
  href: string;
  image: string;
  alt: string;
  span: string;
  aspect: string;
};

const TILES: Tile[] = [
  {
    num: "01",
    title: "Voyage privé",
    desc: "Simulez et réservez votre séjour sur mesure entre Dakar et ses alentours.",
    cta: "Découvrir",
    href: "#reserver",
    image: images.activites.voyage,
    alt: "Pirogue colorée sur une plage sénégalaise",
    span: "lg:col-span-3",
    aspect: "aspect-[6/5]",
  },
  {
    num: "02",
    title: "The Party",
    desc: "Les soirées officielles du festival — réservation en ligne, places limitées.",
    cta: "Réserver",
    href: "#reserver",
    image: images.activites.party,
    alt: "Foule en liesse lors d'un concert de nuit",
    span: "lg:col-span-3",
    aspect: "aspect-[6/5]",
  },
  {
    num: "03",
    title: "Village Origin Teranga",
    desc: "Une expérience intergénérationnelle, de 7 à 77 ans.",
    cta: "Visiter",
    href: "#reserver",
    image: images.activites.village,
    alt: "Grande place animée par une foule nombreuse",
    span: "lg:col-span-2",
    aspect: "aspect-[1/1.05]",
  },
  {
    num: "04",
    title: "Excursion",
    desc: "Sorties guidées à la découverte du territoire sénégalais.",
    cta: "Explorer",
    href: "#reserver",
    image: images.activites.excursion,
    alt: "Monument de la Renaissance africaine à Dakar au coucher du soleil",
    span: "lg:col-span-2",
    aspect: "aspect-[1/1.05]",
  },
  {
    num: "05",
    title: "Battle Afro",
    desc: "La grande compétition de danse du festival.",
    cta: "Participer",
    href: "#battle",
    image: images.activites.battleAfro,
    alt: "Cercle de danseurs en pleine performance",
    span: "lg:col-span-2",
    aspect: "aspect-[1/1.05]",
  },
  {
    num: "06",
    title: "Masterclass",
    desc: "Ateliers animés par des expertes et experts de la culture africaine.",
    cta: "S'inscrire",
    href: "#reserver",
    image: images.activites.masterclass,
    alt: "Artisan au travail lors d'un atelier créatif",
    span: "lg:col-span-2",
    aspect: "aspect-[6/5]",
  },
  {
    num: "07",
    title: "Marketplace",
    desc: "Artisanat, mode et saveurs portés par des créateurs africains.",
    cta: "Explorer",
    href: "#reserver",
    image: images.activites.marketplace,
    alt: "Textiles et vêtements colorés exposés sur un marché",
    span: "lg:col-span-2",
    aspect: "aspect-[6/5]",
  },
  {
    num: "08",
    title: "Environnement & ODD",
    desc: "Un engagement concret pour un festival durable et responsable.",
    cta: "En savoir plus",
    href: "#reserver",
    image: images.activites.environnement,
    alt: "Acacia isolé dans la savane africaine",
    span: "lg:col-span-2",
    aspect: "aspect-[6/5]",
  },
];

export default function Activites() {
  return (
    <section
      id="activites"
      className="bg-bg px-5 py-20 sm:px-8 sm:py-28 lg:px-[72px] lg:py-[140px]"
    >
      <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <div>
          <span className="text-[12.5px] font-bold uppercase tracking-[0.22em] text-clay-soft">
            Nos activités
          </span>
          <h2 className="mt-3.5 max-w-[640px] font-display text-[clamp(30px,4vw,56px)] font-medium">
            Huit façons de vivre Origin Teranga
          </h2>
        </div>
        <p className="max-w-[360px] text-[15px] leading-relaxed text-ink/62">
          Des expériences pensées pour toutes les générations — du voyage
          privé à la marketplace, chaque activité raconte une part de la
          culture.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-6">
        {TILES.map((tile) => (
          <Link
            key={tile.num}
            href={tile.href}
            className={`group relative isolate overflow-hidden rounded-[18px] ${tile.span} ${tile.aspect}`}
          >
            <div className="absolute inset-0 transition-transform duration-1000 ease-out group-hover:scale-[1.07]">
              <Image
                src={tile.image}
                alt={tile.alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-bg/0 via-bg/35 to-bg/90" />
            <div className="absolute inset-0 flex flex-col justify-between p-6">
              <span className="font-display text-sm text-ink/34">
                {tile.num}
              </span>
              <div>
                <h3 className="mb-2 font-display text-xl font-medium sm:text-2xl">
                  {tile.title}
                </h3>
                <p className="mb-3.5 max-w-[360px] text-[13px] text-ink/62 sm:text-sm">
                  {tile.desc}
                </p>
                <span className="inline-block text-[12.5px] font-bold transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                  {tile.cta} →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
