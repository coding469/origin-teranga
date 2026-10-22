import Image from "next/image";
import { images } from "@/lib/images";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import MagneticButton from "@/components/motion/MagneticButton";
import ImageReveal from "@/components/motion/ImageReveal";
import { REGISTRATION_URL } from "@/lib/links";

export default function BattleAfroBanner() {
  return (
    <section
      id="battle"
      className="sticky top-0 z-[14] overflow-hidden rounded-t-[32px] bg-bg px-5 py-20 shadow-[0_-24px_60px_rgba(0,0,0,0.25)] sm:px-8 sm:py-28 lg:px-[72px] lg:py-[140px]"
    >
      <div className="relative z-10 grid gap-16 lg:grid-cols-2 lg:items-center lg:gap-20">
        <Stagger className="text-center lg:text-left">
          <StaggerItem className="text-[12.5px] font-bold uppercase tracking-[0.22em] text-clay-soft">
            Moment fort du festival
          </StaggerItem>
          <StaggerItem>
            <h2 className="my-5 font-display text-[clamp(48px,9vw,120px)] font-semibold leading-[0.92] tracking-tight">
              BATTLE
              <br />
              AFRO
            </h2>
          </StaggerItem>
          <StaggerItem className="font-display text-[clamp(18px,2.2vw,28px)] italic text-sand-soft">
            La grande compétition de danse du festival
          </StaggerItem>
          <StaggerItem className="mx-auto mt-3 max-w-[460px] text-[14px] leading-relaxed text-ink/62 lg:mx-0">
            Née à Paris, elle s&apos;installe enfin en Afrique, le temps du
            festival à Origin Teranga.
          </StaggerItem>
          <StaggerItem className="mt-9">
            <MagneticButton
              href={REGISTRATION_URL}
              external
              className="inline-flex h-[58px] items-center rounded-full bg-clay px-9 text-[15px] font-bold text-ink transition-colors duration-300 hover:bg-clay-soft"
            >
              Participer / Réserver
            </MagneticButton>
          </StaggerItem>
        </Stagger>

        <div className="relative mx-auto aspect-[4/5] w-full max-w-[420px] lg:aspect-[6/7] lg:max-w-[440px] lg:max-h-[620px]">
          <ImageReveal
            src={images.battleAfroBanner}
            alt="Cercle de danseurs en pleine performance lors du Battle Afro"
            sizes="(min-width: 1024px) 480px, 80vw"
            className="h-full w-full rounded-[24px] shadow-lg shadow-black/40"
          />

          <div className="absolute -bottom-6 -right-6 hidden h-[120px] w-[160px] overflow-hidden rounded-[14px] border-4 border-bg shadow-lg shadow-black/40 sm:block">
            <Image
              src={images.programme.concert}
              alt="Foule en liesse pendant une soirée du festival"
              fill
              sizes="160px"
              className="object-cover"
            />
          </div>

          <div className="absolute -top-4 left-6 rounded-full bg-clay px-5 py-3 text-center shadow-lg shadow-black/30">
            <span className="block font-display text-sm font-bold uppercase leading-none text-ink">
              05—08
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
