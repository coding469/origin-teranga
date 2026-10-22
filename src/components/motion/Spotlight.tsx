"use client";

import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

type SpotlightProps = {
  className?: string;
};

export default function Spotlight({ className }: SpotlightProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const shouldReduceMotion = useReducedMotion();
  const background = useMotionTemplate`radial-gradient(480px circle at ${x}px ${y}px, rgba(200,88,46,0.22), transparent 70%)`;

  useEffect(() => {
    if (shouldReduceMotion) return;

    function handleMove(event: MouseEvent) {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      x.set(event.clientX - rect.left);
      y.set(event.clientY - rect.top);
    }

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [shouldReduceMotion, x, y]);

  if (shouldReduceMotion) return null;

  return (
    <motion.div
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute inset-0 z-[5] ${className ?? ""}`}
      style={{ background }}
    />
  );
}
