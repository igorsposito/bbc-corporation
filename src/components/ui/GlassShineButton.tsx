
"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

type GlassShineButtonProps = {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
  variant?: "dark" | "light";
};

export default function GlassShineButton({
  href,
  children,
  className = "",
  external = false,
  variant = "dark",
}: GlassShineButtonProps) {
  const reducedMotion = useReducedMotion();
  const isDark = variant === "dark";

  return (
    <motion.a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      whileHover={reducedMotion ? undefined : { y: -2 }}
      whileTap={reducedMotion ? undefined : { scale: 0.98 }}
      className={`
        group relative isolate inline-flex
        items-center justify-center
        overflow-hidden rounded-full p-[1.5px]
        shadow-[0_10px_30px_rgba(0,0,0,0.14)]
        focus-visible:outline-2
        focus-visible:outline-offset-4
        focus-visible:outline-[#A8D4F0]
        ${className}
      `}
    >
      {/* Borda base */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-full bg-white/20"
      />

      {/* Reflexo espelhado em movimento */}
      {!reducedMotion && (
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute -inset-[150%]"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0deg, transparent 250deg, rgba(160,210,240,0.12) 285deg, rgba(235,248,255,0.95) 310deg, rgba(160,210,240,0.25) 330deg, transparent 360deg)",
          }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: 1.5,
          }}
        />
      )}

      {/* Superfície Liquid Glass */}
      <span
        className={`
          relative z-10 inline-flex w-full
          items-center justify-center gap-3
          rounded-full px-6 py-3.5
          text-sm font-medium
          backdrop-blur-2xl
          transition-colors duration-300
          ${
            isDark
              ? "bg-[#091621]/90 text-white group-hover:bg-[#193347]/95"
              : "bg-white/85 text-[#15242C] group-hover:bg-white/95"
          }
        `}
      >
        {/* Reflexo na parte superior do vidro */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-white/45 to-transparent"
        />

        {children}
      </span>
    </motion.a>
  );
}
