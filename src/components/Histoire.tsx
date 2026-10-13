import Image from "next/image";
import { images } from "@/lib/images";

const STEPS = [
  {
    title: "Dakar",
    desc: "Le terrain, la source, l'endroit où tout se vit pleinement.",
    dot: "bg-clay",
    image: images.histoire.dakar,
    alt: "Monument de la Renaissance africaine à Dakar",
  },
  {
    title: "Diaspora",
    desc: "Une communauté connectée, en Afrique et partout dans le monde.",
    dot: "bg-gold",
    image: images.univers.emergence,
    alt: "Panel de discussion réunissant la diaspora africaine",
  },
  {
    title: "Culture",
    desc: "Musique, danse, gastronomie, savoirs : le cœur du festival.",
    dot: "bg-clay-soft",
    image: images.histoire.culture,
    alt: "Djembé traditionnel africain",
  },
  {
    title: "Transmission",
    desc: "Des masterclass aux ateliers, un savoir qui passe de mains en mains.",
    dot: "bg-gold",
    image: images.histoire.transmission,
    alt: "Femme tissant un panier artisanal traditionnel",
  },
  {
    title: "Futur",
    desc: "Une communauté qui grandit, édition après édition.",
    dot: "bg-clay",
    image: images.histoire.futur,
    alt: "Jeune enfant africain souriant",
  },
];

export default function Histoire() {
  return (
    <section
      id="histoire"
      className="bg-bg px-5 py-20 sm:px-8 sm:py-28 lg:px-[72px] lg:py-[140px]"
    >
      <div className="mb-14 max-w-[720px]">
        <span className="text-[12.5px] font-bold uppercase tracking-[0.22em] text-clay-soft">
          Notre histoire
        </span>
        <h2 className="mt-3.5 font-display text-[clamp(30px,4vw,56px)] font-medium">
          Ancrés à Dakar, ouverts sur le monde
        </h2>
        <p className="mt-4 text-base leading-relaxed text-ink/62">
          Origin Teranga est né d&apos;une conviction simple : pour avancer, il
          faut d&apos;abord savoir d&apos;où l&apos;on vient. De Dakar à ses diasporas, un
          même fil se tisse, celui de la culture, transmise et réinventée.
        </p>
      </div>

      <div className="relative grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-0">
        <div className="pointer-events-none absolute top-[30px] left-0 right-0 hidden h-px bg-ink/14 lg:block" />
        {STEPS.map((step) => (
          <div key={step.title} className="px-0 lg:px-[18px] lg:first:pl-0 lg:last:pr-0">
            <div className="relative mb-[18px] aspect-[4/3] overflow-hidden rounded-[14px]">
              <Image
                src={step.image}
                alt={step.alt}
                fill
                sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
                className="object-cover"
              />
            </div>
            <div
              className={`relative z-10 mb-5 h-2.5 w-2.5 rounded-full ${step.dot}`}
            />
            <div className="mb-1.5 font-display text-xl">{step.title}</div>
            <p className="text-[13.5px] leading-relaxed text-ink/62">
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
