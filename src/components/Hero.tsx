import Image from "next/image";
import { images } from "@/lib/images";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[92vh] flex-col justify-end overflow-hidden px-5 pb-20 sm:px-8 lg:px-[72px] lg:pb-[88px]"
    >
      <div className="absolute inset-0">
        <Image
          src={images.hero}
          alt="Foule célébrant lors d'un festival culturel africain"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/35 to-bg/25" />
        <div className="absolute inset-0 bg-gradient-to-b from-bg/50 via-transparent to-transparent" />
        <span className="absolute right-5 bottom-5 hidden text-[11px] uppercase tracking-[0.18em] text-ink/34 sm:block">
          Dakar · ESCOA · 2026
        </span>
      </div>

      <div className="relative z-10 max-w-[980px] animate-fade-in">
        <div className="animate-rise mb-5 text-[12.5px] font-bold uppercase tracking-[0.22em] text-clay-soft">
          Origin Teranga Expérience 2026
        </div>
        <h1 className="animate-rise font-display font-medium text-ink text-[clamp(40px,10vw,112px)] leading-[0.98] tracking-tight">
          Nos origines.
          <br />
          Notre culture.
          <br />
          <em className="italic text-clay-soft">Notre avenir.</em>
        </h1>
        <p className="animate-rise mt-7 max-w-[560px] text-lg leading-relaxed text-ink/62">
          Origin Teranga Expérience — Du 4 au 8 novembre 2026, ESCOA Dakar.
        </p>
        <div className="animate-rise mt-9 flex flex-wrap gap-4">
          <a
            href="/reserver"
            className="inline-flex h-[52px] items-center gap-2.5 rounded-full bg-clay px-7 text-sm font-bold text-ink transition-all duration-300 hover:bg-clay-soft hover:-translate-y-0.5"
          >
            S&apos;inscrire
          </a>
          <a
            href="#programme"
            className="inline-flex h-[52px] items-center gap-2.5 rounded-full border border-ink/40 px-7 text-sm font-bold text-ink transition-all duration-300 hover:border-ink hover:bg-ink/6"
          >
            Découvrir le programme
          </a>
        </div>
      </div>

      <a
        href="#manifesto"
        className="absolute bottom-7 left-5 z-10 hidden items-center gap-2.5 text-[12.5px] uppercase tracking-[0.14em] text-ink/34 sm:left-8 lg:left-[72px] md:flex"
      >
        <span className="inline-block h-px w-[30px] bg-ink/34" />
        <span className="underline-link">Scroller</span>
      </a>
    </section>
  );
}
