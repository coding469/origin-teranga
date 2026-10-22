"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { images } from "@/lib/images";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import Spotlight from "@/components/motion/Spotlight";
import MagneticButton from "@/components/motion/MagneticButton";
import { REGISTRATION_URL } from "@/lib/links";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative flex min-h-[92vh] flex-col justify-end overflow-hidden px-5 pb-20 sm:px-8 lg:px-[72px] lg:pb-[88px]"
    >
      <div className="absolute inset-0">
        <motion.div className="absolute inset-0" style={{ y: imageY }}>
          <Image
            src={images.hero}
            alt="Foule célébrant lors d'un festival culturel africain"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/35 to-bg/25" />
        <div className="absolute inset-0 bg-gradient-to-b from-bg/50 via-transparent to-transparent" />
        <Spotlight />
        <span className="absolute right-5 bottom-5 hidden text-[11px] uppercase tracking-[0.18em] text-ink/34 sm:block">
          Dakar · ESCOA · 2026
        </span>
      </div>

      <Stagger className="relative z-10 max-w-[980px]">
        <StaggerItem className="mb-5 text-[12.5px] font-bold uppercase tracking-[0.22em] text-clay-soft">
          Origin Teranga Expérience 2026
        </StaggerItem>
        <StaggerItem>
          <h1 className="font-display font-medium text-ink text-[clamp(40px,10vw,112px)] leading-[0.98] tracking-tight">
            Le sport nous rassemble.
            <br />
            <em className="italic text-clay-soft">La culture nous connecte.</em>
          </h1>
        </StaggerItem>
        <StaggerItem className="mt-7 max-w-[560px] text-lg leading-relaxed text-ink/62">
          Origin Teranga Expérience — Du 5 au 8 novembre 2026, ESCOA Dakar.
        </StaggerItem>
        <StaggerItem className="mt-9 flex flex-wrap gap-4">
          <MagneticButton
            href={REGISTRATION_URL}
            external
            className="inline-flex h-[52px] items-center gap-2.5 rounded-full bg-clay px-7 text-sm font-bold text-ink transition-colors duration-300 hover:bg-clay-soft"
          >
            S&apos;inscrire
          </MagneticButton>
          <a
            href="#programme"
            className="inline-flex h-[52px] items-center gap-2.5 rounded-full border border-ink/40 px-7 text-sm font-bold text-ink transition-all duration-300 hover:border-ink hover:bg-ink/6"
          >
            Découvrir le programme
          </a>
        </StaggerItem>
      </Stagger>

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
