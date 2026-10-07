import Image from "next/image";
import { images } from "@/lib/images";

const CARDS = [
  {
    title: "Sport / Leader",
    desc: "Des figures qui inspirent par le dépassement.",
    image: images.univers.sport,
    alt: "Coureurs en pleine course, effet de mouvement",
    wide: false,
  },
  {
    title: "Story / Littérature",
    desc: "Les récits qui construisent une mémoire commune.",
    image: images.univers.story,
    alt: "Pile de livres sur une étagère en bois",
    wide: false,
  },
  {
    title: "TIC / Marketing",
    desc: "L'innovation africaine au service de ses créateurs.",
    image: images.univers.tic,
    alt: "Équipe travaillant sur un ordinateur portable",
    wide: false,
  },
  {
    title: "Music / Dance",
    desc: "Le cœur battant du festival, soir après soir.",
    image: images.univers.musicDance,
    alt: "Mains jouant du djembé lors d'une performance",
    wide: false,
  },
  {
    title: "Food / Agriculture",
    desc: "Des terroirs à la table, une souveraineté qui se goûte.",
    image: images.univers.foodAgri,
    alt: "Paysage agricole sénégalais",
    wide: false,
  },
  {
    title: "Émergence / Économie",
    desc: "Les modèles qui dessinent l'Afrique de demain.",
    image: images.univers.emergence,
    alt: "Panel de discussion sur l'entrepreneuriat africain",
    wide: false,
  },
  {
    title: "Entrepreneuriat",
    desc: "Un espace pour celles et ceux qui osent construire, ici et là-bas.",
    image: images.univers.entrepreneuriat,
    alt: "Groupe d'entrepreneurs africains en réunion",
    wide: true,
  },
];

export default function Univers() {
  return (
    <section className="bg-sand px-5 py-20 text-dark-ink sm:px-8 sm:py-28 lg:px-[72px] lg:py-[140px]">
      <div className="mb-12 max-w-[680px]">
        <span className="text-[12.5px] font-bold uppercase tracking-[0.22em] text-clay">
          Nos univers
        </span>
        <h2 className="mt-3.5 font-display text-[clamp(30px,4vw,56px)] font-medium">
          Sept façons de penser l&apos;Afrique de demain
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {CARDS.map((card) => (
          <div
            key={card.title}
            className={`group relative overflow-hidden rounded-2xl bg-panel transition-transform duration-500 ease-out hover:-translate-y-1.5 ${
              card.wide
                ? "col-span-2 aspect-[2.2/1]"
                : "aspect-square"
            }`}
          >
            <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.08]">
              <Image
                src={card.image}
                alt={card.alt}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover saturate-[0.75] transition-[filter] duration-500 group-hover:saturate-100"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-bg/85 via-bg/10 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-5 text-ink sm:p-6">
              <h3 className="mb-1.5 font-display text-lg sm:text-xl">
                {card.title}
              </h3>
              <p className="max-w-[420px] translate-y-1 text-xs text-ink/62 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:text-[13px]">
                {card.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
