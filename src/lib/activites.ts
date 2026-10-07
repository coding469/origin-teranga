import { images } from "@/lib/images";

export type Activite = {
  slug: string;
  num: string;
  title: string;
  shortDesc: string;
  longDesc: string[];
  cta: string;
  image: string;
  alt: string;
  span: string;
  aspect: string;
};

export const ACTIVITES: Activite[] = [
  {
    slug: "voyage-prive",
    num: "01",
    title: "Voyage privé",
    shortDesc:
      "Simulez et réservez votre séjour sur mesure entre Dakar et ses alentours.",
    longDesc: [
      "Simulez et réservez votre séjour sur mesure entre Dakar et ses alentours, avec un accompagnement pensé pour chaque profil de voyageur.",
      "Hébergement, transport et visites s'organisent autour de vos envies, pour une immersion authentique loin des circuits touristiques classiques.",
    ],
    cta: "Découvrir",
    image: images.activites.voyage,
    alt: "Pirogue colorée sur une plage sénégalaise",
    span: "lg:col-span-3",
    aspect: "aspect-[6/5]",
  },
  {
    slug: "the-party",
    num: "02",
    title: "The Party",
    shortDesc:
      "Les soirées officielles du festival, réservation en ligne, places limitées.",
    longDesc: [
      "Les soirées officielles du festival rassemblent DJ, artistes invités et sonorités afro sur plusieurs scènes.",
      "Les places sont limitées et la réservation se fait en ligne, à l'avance, pour garantir l'accès à chaque soirée.",
    ],
    cta: "Réserver",
    image: images.activites.party,
    alt: "Foule en liesse lors d'un concert de nuit",
    span: "lg:col-span-3",
    aspect: "aspect-[6/5]",
  },
  {
    slug: "village-origin-teranga",
    num: "03",
    title: "Village Origin Teranga",
    shortDesc: "Une expérience intergénérationnelle, de 7 à 77 ans.",
    longDesc: [
      "Le village rassemble familles, enfants et aînés autour d'ateliers, de stands et d'animations pensés pour toutes les générations.",
      "Un espace central du festival, ouvert en journée, où la culture se transmet et se partage simplement.",
    ],
    cta: "Visiter",
    image: images.activites.village,
    alt: "Grande place animée par une foule nombreuse",
    span: "lg:col-span-2",
    aspect: "aspect-[1/1.05]",
  },
  {
    slug: "excursion",
    num: "04",
    title: "Excursion",
    shortDesc: "Sorties guidées à la découverte du territoire sénégalais.",
    longDesc: [
      "Des sorties guidées emmènent les participants à la découverte de sites emblématiques autour de Dakar.",
      "Chaque excursion est encadrée par un guide local qui partage l'histoire et les récits propres à chaque lieu.",
    ],
    cta: "Explorer",
    image: images.activites.excursion,
    alt: "Monument de la Renaissance africaine à Dakar au coucher du soleil",
    span: "lg:col-span-2",
    aspect: "aspect-[1/1.05]",
  },
  {
    slug: "battle-afro",
    num: "05",
    title: "Battle Afro",
    shortDesc: "La grande compétition de danse du festival.",
    longDesc: [
      "La grande compétition de danse du festival réunit des danseuses et danseurs de tous horizons autour des styles afro.",
      "Battles en duo, en équipe et freestyle se succèdent devant le public, dans une ambiance portée par le son et la rue.",
    ],
    cta: "Participer",
    image: images.activites.battleAfro,
    alt: "Cercle de danseurs en pleine performance",
    span: "lg:col-span-2",
    aspect: "aspect-[1/1.05]",
  },
  {
    slug: "masterclass",
    num: "06",
    title: "Masterclass",
    shortDesc:
      "Ateliers animés par des expertes et experts de la culture africaine.",
    longDesc: [
      "Les masterclass sont animées par des expertes et experts venus partager leur savoir-faire : artisanat, danse, musique ou gastronomie.",
      "Chaque atelier est limité en nombre de places pour garder un format proche et accessible.",
    ],
    cta: "S'inscrire",
    image: images.activites.masterclass,
    alt: "Artisan au travail lors d'un atelier créatif",
    span: "lg:col-span-2",
    aspect: "aspect-[6/5]",
  },
  {
    slug: "marketplace",
    num: "07",
    title: "Marketplace",
    shortDesc: "Artisanat, mode et saveurs portés par des créateurs africains.",
    longDesc: [
      "La marketplace réunit des créatrices et créateurs africains autour de l'artisanat, de la mode et de la gastronomie.",
      "Un espace pour découvrir, échanger et repartir avec des pièces uniques, directement auprès de leurs créateurs.",
    ],
    cta: "Explorer",
    image: images.activites.marketplace,
    alt: "Textiles et vêtements colorés exposés sur un marché",
    span: "lg:col-span-2",
    aspect: "aspect-[6/5]",
  },
  {
    slug: "environnement-odd",
    num: "08",
    title: "Environnement & ODD",
    shortDesc: "Un engagement concret pour un festival durable et responsable.",
    longDesc: [
      "Origin Teranga s'engage pour un festival durable et responsable, aligné sur les objectifs de développement durable.",
      "Gestion des déchets, sensibilisation du public et partenaires locaux engagés font partie intégrante de l'organisation.",
    ],
    cta: "En savoir plus",
    image: images.activites.environnement,
    alt: "Acacia isolé dans la savane africaine",
    span: "lg:col-span-2",
    aspect: "aspect-[6/5]",
  },
];

export function getActivite(slug: string) {
  return ACTIVITES.find((a) => a.slug === slug);
}
