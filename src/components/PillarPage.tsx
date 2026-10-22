import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PillarInterestForm from "@/components/PillarInterestForm";
import type { Pillar } from "@/app/actions/pillar-interest";
import Reveal from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import ImageReveal from "@/components/motion/ImageReveal";

type PillarPageProps = {
  pillar: Pillar;
  title: string;
  signature: string;
  vision: string;
  objectifs: string[];
  image: string;
  imageAlt: string;
  accentImage: string;
  accentImageAlt: string;
  accent?: "clay" | "gold";
};

export default function PillarPage({
  pillar,
  title,
  signature,
  vision,
  objectifs,
  image,
  imageAlt,
  accentImage,
  accentImageAlt,
  accent = "clay",
}: PillarPageProps) {
  const accentText = accent === "gold" ? "text-gold" : "text-clay-soft";
  const accentDot = accent === "gold" ? "bg-gold" : "bg-clay-soft";
  const accentBg = accent === "gold" ? "bg-gold" : "bg-clay";
  return (
    <div className="w-full max-w-full overflow-x-clip">
      <Header />

      <section className="relative overflow-hidden bg-bg px-5 pt-20 pb-20 sm:px-8 sm:pt-24 sm:pb-28 lg:px-[72px] lg:pt-32 lg:pb-32">
        <div className="relative z-10 grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
          <Stagger className="text-center lg:text-left">
            <StaggerItem className={`text-[12.5px] font-bold uppercase tracking-[0.22em] ${accentText}`}>
              {signature}
            </StaggerItem>
            <StaggerItem>
              <h1 className="mt-4 font-display text-[clamp(32px,5vw,64px)] font-medium text-ink">
                {title}
              </h1>
            </StaggerItem>
            <StaggerItem className="mx-auto mt-5 max-w-[480px] text-[15px] leading-relaxed text-ink/72 lg:mx-0">
              {vision}
            </StaggerItem>
          </Stagger>

          <div className="relative mx-auto aspect-[4/5] w-full max-w-[420px] lg:aspect-[6/7] lg:max-w-none">
            <ImageReveal
              src={image}
              alt={imageAlt}
              priority
              sizes="(min-width: 1024px) 480px, 80vw"
              className="h-full w-full rounded-[24px] shadow-lg shadow-black/40"
            />

            <div className="absolute -bottom-6 -right-6 hidden h-[120px] w-[160px] overflow-hidden rounded-[14px] border-4 border-bg shadow-lg shadow-black/40 sm:block">
              <Image
                src={accentImage}
                alt={accentImageAlt}
                fill
                sizes="160px"
                className="object-cover"
              />
            </div>

            <div className={`absolute -top-4 left-6 rounded-full ${accentBg} px-5 py-3 text-center shadow-lg shadow-black/30`}>
              <span className="block font-display text-sm font-bold uppercase leading-none text-ink">
                {title}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-bg-soft px-5 py-16 text-ink sm:px-8 lg:px-[72px]">
        <Reveal className="mx-auto max-w-[720px]">
          <span className={`text-[12.5px] font-bold uppercase tracking-[0.22em] ${accentText}`}>
            Nos objectifs
          </span>
          <ul className="mt-6 flex flex-col gap-4">
            {objectifs.map((objectif) => (
              <li
                key={objectif}
                className="flex items-start gap-3 text-[15px] leading-relaxed text-ink/72"
              >
                <span className={`mt-2 h-1.5 w-1.5 flex-none rounded-full ${accentDot}`} />
                {objectif}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section className="bg-sand px-5 py-20 text-dark-ink sm:px-8 sm:py-28 lg:px-[72px] lg:py-[140px]">
        <Reveal className="mx-auto max-w-[560px]">
          <span className="text-[12.5px] font-bold uppercase tracking-[0.22em] text-clay">
            Rejoindre {title}
          </span>
          <h2 className="mt-4 mb-10 font-display text-[clamp(24px,3vw,36px)] font-medium">
            Dis-nous ce qui t&apos;intéresse.
          </h2>
          <PillarInterestForm pillar={pillar} />
        </Reveal>
      </section>

      <Footer />
    </div>
  );
}
