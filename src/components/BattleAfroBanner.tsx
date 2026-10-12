import Image from "next/image";
import { images } from "@/lib/images";

export default function BattleAfroBanner() {
  return (
    <section
      id="battle"
      className="grain relative flex min-h-[520px] items-center overflow-hidden px-5 py-16 sm:px-8 lg:px-[72px]"
    >
      <div className="absolute inset-0">
        <Image
          src={images.battleAfroBanner}
          alt="Cercle de danseurs en pleine performance lors du Battle Afro"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-bg/75 via-bg/55 to-bg/85" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[980px] text-center">
        <span className="text-[12.5px] font-bold uppercase tracking-[0.22em] text-clay-soft">
          Moment fort du festival
        </span>
        <h2 className="my-5 font-display text-[clamp(48px,11vw,160px)] font-semibold leading-[0.92] tracking-tight">
          BATTLE
          <br />
          AFRO
        </h2>
        <p className="mb-9 font-display text-[clamp(18px,2.4vw,30px)] italic text-sand-soft">
          La grande compétition de danse du festival
        </p>
        <a
          href="/reserver"
          className="inline-flex h-[58px] items-center rounded-full bg-clay px-9 text-[15px] font-bold text-ink transition-all duration-300 hover:bg-clay-soft hover:-translate-y-0.5"
        >
          Participer / Réserver
        </a>
      </div>
    </section>
  );
}
