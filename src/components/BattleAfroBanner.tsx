import Image from "next/image";
import { images } from "@/lib/images";

export default function BattleAfroBanner() {
  return (
    <section
      id="battle"
      className="relative overflow-hidden bg-bg px-5 py-20 sm:px-8 sm:py-28 lg:px-[72px] lg:py-[140px]"
    >
      <div className="relative z-10 grid gap-16 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div className="text-center lg:text-left">
          <span className="text-[12.5px] font-bold uppercase tracking-[0.22em] text-clay-soft">
            Moment fort du festival
          </span>
          <h2 className="my-5 font-display text-[clamp(48px,9vw,120px)] font-semibold leading-[0.92] tracking-tight">
            BATTLE
            <br />
            AFRO
          </h2>
          <p className="font-display text-[clamp(18px,2.2vw,28px)] italic text-sand-soft">
            La grande compétition de danse du festival
          </p>
          <p className="mx-auto mt-3 max-w-[460px] text-[14px] leading-relaxed text-ink/62 lg:mx-0">
            Née à Paris, elle s&apos;installe enfin en Afrique, le temps du
            festival à Origin Teranga.
          </p>
          <a
            href="/reserver"
            className="mt-9 inline-flex h-[58px] items-center rounded-full bg-clay px-9 text-[15px] font-bold text-ink transition-all duration-300 hover:bg-clay-soft hover:-translate-y-0.5"
          >
            Participer / Réserver
          </a>
        </div>

        <div className="relative mx-auto aspect-[4/5] w-full max-w-[420px] lg:aspect-[6/7] lg:max-w-none">
          <div className="absolute inset-[6%] -rotate-2 overflow-hidden rounded-[20px] shadow-lg shadow-black/40 will-change-transform">
            <Image
              src={images.battleAfroBanner}
              alt="Cercle de danseurs en pleine performance lors du Battle Afro"
              fill
              sizes="(min-width: 1024px) 480px, 80vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg/55 via-transparent to-transparent" />
          </div>

          <div className="absolute -bottom-[4%] -left-[6%] h-[42%] w-[52%] rotate-3 overflow-hidden rounded-[16px] border-4 border-bg shadow-lg shadow-black/40 will-change-transform">
            <Image
              src={images.programme.concert}
              alt="Foule en liesse pendant une soirée du festival"
              fill
              sizes="240px"
              className="object-cover"
            />
          </div>

          <div className="absolute -top-4 right-[8%] rotate-6 rounded-full bg-clay px-5 py-3 text-center shadow-lg shadow-black/30">
            <span className="block font-display text-sm font-bold uppercase leading-none text-ink">
              04—08
            </span>
            <span className="mt-0.5 block text-[10px] font-bold uppercase tracking-[0.1em] text-ink/80">
              Nov · Dakar
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
