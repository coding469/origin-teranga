import Image from "next/image";
import { images } from "@/lib/images";
import Reveal from "@/components/motion/Reveal";
import CardCarousel from "@/components/motion/CardCarousel";

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
      className="sticky top-0 z-[15] rounded-t-[32px] bg-bg px-5 py-20 shadow-[0_-24px_60px_rgba(0,0,0,0.25)] sm:px-8 sm:py-28 lg:px-[72px] lg:py-[140px]"
    >
      <Reveal className="mb-14 max-w-[720px] px-0 sm:px-8 lg:px-0">
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
      </Reveal>

      <CardCarousel
        items={STEPS.map((step) => (
          <div key={step.title} className="group w-[220px] flex-none sm:w-[260px]">
            <div className="relative mb-[18px] aspect-[3/4] overflow-hidden rounded-[14px]">
              <Image
                src={step.image}
                alt={step.alt}
                fill
                sizes="260px"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg/55 via-transparent to-transparent" />
            </div>
            <div className={`relative z-10 mb-5 h-2.5 w-2.5 rounded-full ${step.dot}`} />
            <div className="mb-1.5 font-display text-2xl">{step.title}</div>
            <p className="text-[13.5px] leading-relaxed text-ink/62">{step.desc}</p>
          </div>
        ))}
      />
    </section>
  );
}
