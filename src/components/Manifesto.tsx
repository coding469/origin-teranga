import Image from "next/image";
import { images } from "@/lib/images";
import Reveal from "@/components/motion/Reveal";

const PARAGRAPHS = [
  "Né à Tivaouane, au Sénégal, et ayant grandi entre la France et Dakar, j'ai construit mon identité entre deux territoires, deux cultures, mais avec une même conviction : le sport et la culture ont le pouvoir de rassembler, de transmettre et de créer des opportunités.",
  "C'est de cette conviction qu'est né ORIGIN TERANGA : une initiative qui célèbre nos racines, crée des ponts entre l'Afrique et ses diasporas et place la jeunesse au cœur de l'avenir.",
  "Pour donner vie à cette ambition, Apolhygie, association basée au Sénégal, s'associe à Art'Press Yourself, association française dirigée par Laeticia Ngoto, qui œuvre depuis plus de dix ans à la promotion des cultures africaines à travers l'organisation d'événements artistiques, culturels et sportifs.",
  "Deux structures, deux territoires, une même volonté : faire du sport et de la culture des moteurs de rencontre, de partage et d'opportunités.",
  "À travers le sport, la culture et l'entrepreneuriat, notre ambition est simple : rassembler les générations, révéler les talents et construire ensemble de nouvelles perspectives.",
  "Du 5 au 8 novembre, rejoignez-nous à Dakar pour faire vivre cette vision.",
  "Parce que l'avenir se construit ensemble.",
];

export default function Manifesto() {
  return (
    <section
      id="manifesto"
      className="sticky top-0 z-[11] rounded-t-[32px] bg-sand px-5 py-20 text-dark-ink shadow-[0_-24px_60px_rgba(0,0,0,0.25)] sm:px-8 sm:py-28 lg:px-[72px] lg:py-[140px]"
    >
      <div className="grid gap-12 lg:grid-cols-[400px_1fr] lg:gap-16">
        <Reveal className="relative mx-auto aspect-[4/5] w-full max-w-[420px] overflow-hidden rounded-[22px] lg:mx-0 lg:max-w-none">
          <Image
            src={images.manifesto}
            alt="Portrait de Falilou Thiam, fondateur d'Origin Teranga"
            fill
            sizes="(min-width: 1024px) 400px, 100vw"
            className="object-cover object-[50%_85%]"
          />
        </Reveal>

        <Reveal delay={0.15}>
          <span className="text-[12.5px] font-bold uppercase tracking-[0.22em] text-clay">
            Le mot du fondateur
          </span>
          <h2 className="mt-4 font-display text-[clamp(26px,3vw,38px)] font-medium">
            Falilou Thiam
          </h2>
          <span className="mt-1 block text-[13.5px] uppercase tracking-[0.08em] text-dark-ink/64">
            Fondateur d&apos;ORIGIN TERANGA
          </span>

          <div className="mt-7 flex flex-col gap-5">
            {PARAGRAPHS.map((paragraph, i) => (
              <p
                key={i}
                className={
                  i === 0
                    ? "font-display text-[clamp(18px,2vw,22px)] italic leading-[1.45] text-dark-ink"
                    : "text-[15.5px] leading-[1.75] text-dark-ink/72"
                }
              >
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
