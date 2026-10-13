import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PillarInterestForm from "@/components/PillarInterestForm";
import type { Pillar } from "@/app/actions/pillar-interest";

type PillarPageProps = {
  pillar: Pillar;
  title: string;
  signature: string;
  vision: string;
  objectifs: string[];
  image: string;
  imageAlt: string;
};

export default function PillarPage({
  pillar,
  title,
  signature,
  vision,
  objectifs,
  image,
  imageAlt,
}: PillarPageProps) {
  return (
    <div className="w-full max-w-full overflow-x-clip">
      <Header />

      <section className="relative flex min-h-[56vh] flex-col justify-end overflow-hidden px-5 pb-16 sm:px-8 lg:px-[72px] lg:pb-20">
        <div className="absolute inset-0">
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/45 to-bg/20" />
        </div>
        <div className="relative z-10 mx-auto max-w-[720px] text-center">
          <span className="text-[12.5px] font-bold uppercase tracking-[0.22em] text-clay-soft">
            {signature}
          </span>
          <h1 className="mt-4 font-display text-[clamp(32px,5vw,64px)] font-medium text-ink">
            {title}
          </h1>
          <p className="mt-5 text-[15px] leading-relaxed text-ink/72">
            {vision}
          </p>
        </div>
      </section>

      <section className="bg-bg-soft px-5 py-16 text-ink sm:px-8 lg:px-[72px]">
        <div className="mx-auto max-w-[720px]">
          <span className="text-[12.5px] font-bold uppercase tracking-[0.22em] text-clay-soft">
            Nos objectifs
          </span>
          <ul className="mt-6 flex flex-col gap-4">
            {objectifs.map((objectif) => (
              <li
                key={objectif}
                className="flex items-start gap-3 text-[15px] leading-relaxed text-ink/72"
              >
                <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-clay-soft" />
                {objectif}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-sand px-5 py-20 text-dark-ink sm:px-8 sm:py-28 lg:px-[72px] lg:py-[140px]">
        <div className="mx-auto max-w-[560px]">
          <span className="text-[12.5px] font-bold uppercase tracking-[0.22em] text-clay">
            Rejoindre {title}
          </span>
          <h2 className="mt-4 mb-10 font-display text-[clamp(24px,3vw,36px)] font-medium">
            Dis-nous ce qui t&apos;intéresse.
          </h2>
          <PillarInterestForm pillar={pillar} />
        </div>
      </section>

      <Footer />
    </div>
  );
}
