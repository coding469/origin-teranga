import Image from "next/image";
import { images } from "@/lib/images";

export default function Manifesto() {
  return (
    <section
      id="manifesto"
      className="bg-sand px-5 py-20 text-dark-ink sm:px-8 sm:py-28 lg:px-[72px] lg:py-[140px]"
    >
      <div className="flex flex-wrap items-start gap-12 lg:gap-16">
        <div className="min-w-[280px] flex-1 basis-[440px]">
          <span className="text-[12.5px] font-bold uppercase tracking-[0.22em] text-clay">
            Manifeste
          </span>
          <p className="mt-6 max-w-[620px] font-display text-[clamp(26px,3.4vw,44px)] font-medium italic leading-[1.25]">
            « Un peuple qui ne connaît pas son passé, ses origines et sa
            culture ressemble à un arbre sans racines. »
          </p>
          <span className="mt-6 block text-[13.5px] uppercase tracking-[0.08em] text-dark-ink/64">
            Marcus Garvey
          </span>
        </div>

        <div className="relative mt-7 aspect-[4/5] min-h-[300px] w-full min-w-[220px] flex-1 basis-[300px] overflow-hidden rounded-[22px] self-stretch grain sm:aspect-auto">
          <Image
            src={images.manifesto}
            alt="Portrait d'une femme sénégalaise en tenue traditionnelle colorée"
            fill
            sizes="(min-width: 1024px) 300px, 100vw"
            className="object-cover"
          />
        </div>

        <div className="flex min-w-[280px] flex-1 basis-[360px] flex-col gap-6">
          <p className="text-[17px] leading-[1.75] text-dark-ink/64">
            Origin Teranga est né entre Paris et Dakar, pensé par des
            Sénégalais autour du bien-être, de la culture, de l&apos;expérience
            et de la communauté. Un festival pour se reconnecter à ses
            racines, et construire, ensemble, ce qui vient après.
          </p>
        </div>
      </div>
    </section>
  );
}
