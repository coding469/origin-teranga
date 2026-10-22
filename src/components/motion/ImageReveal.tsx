"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { EASE_OUT } from "./variants";

type ImageRevealProps = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
};

export default function ImageReveal({ src, alt, sizes, className, priority }: ImageRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={`relative overflow-hidden ${className ?? ""}`}>
      <motion.div
        className="absolute inset-0"
        initial={shouldReduceMotion ? false : { scale: 1.15 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.4, ease: EASE_OUT }}
      >
        <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg/60 via-transparent to-transparent" />
      </motion.div>
      <motion.div
        className="absolute inset-0 z-10 bg-bg"
        style={{ transformOrigin: "left" }}
        initial={shouldReduceMotion ? false : { scaleX: 1 }}
        whileInView={{ scaleX: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.1 }}
      />
    </div>
  );
}
