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
          <div className="text-center lg:text-left">
            <span className={`text-[12.5px] font-bold uppercase tracking-[0.22em] ${accentText}`}>
              {signature}
            </span>
            <h1 className="mt-4 font-display text-[clamp(32px,5vw,64px)] font-medium text-ink">
              {title}
            </h1>
            <p className="mx-auto mt-5 max-w-[480px] text-[15px] leading-relaxed text-ink/72 lg:mx-0">
              {vision}
            </p>
          </div>

          <div className="relative mx-auto aspect-[4/5] w-full max-w-[420px] lg:aspect-[6/7] lg:max-w-none">
            <div className="absolute inset-[6%] -rotate-2 overflow-hidden rounded-[20px] shadow-lg shadow-black/40 will-change-transform">
              <Image
                src={image}
                alt={imageAlt}
                fill
                priority
                sizes="(min-width: 1024px) 480px, 80vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg/55 via-transparent to-transparent" />
            </div>

            <div className="absolute -bottom-[4%] -left-[6%] h-[42%] w-[52%] rotate-3 overflow-hidden rounded-[16px] border-4 border-bg shadow-lg shadow-black/40 will-change-transform">
              <Image
                src={accentImage}
                alt={accentImageAlt}
                fill
                sizes="240px"
                className="object-cover"
              />
            </div>

            <div className={`absolute -top-4 right-[8%] rotate-6 rounded-full ${accentBg} px-5 py-3 text-center shadow-lg shadow-black/30`}>
              <span className="block font-display text-sm font-bold uppercase leading-none text-ink">
                {title}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-bg-soft px-5 py-16 text-ink sm:px-8 lg:px-[72px]">
        <div className="mx-auto max-w-[720px]">
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
