
"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

const INSTAGRAM_URL =
  "https://www.instagram.com/bbc.corporation/";

const CURRENT_YEAR = 2026;

function InstagramIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle
        cx="17.5"
        cy="6.5"
        r="1"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17 17 7M7 7h10v10" />
    </svg>
  );
}

export default function Footer() {
  const reducedMotion = useReducedMotion();

  return (
    <footer
      id="footer"
      className="relative overflow-hidden bg-[#091621] text-white"
    >
      {/* IMAGEM DE FUNDO + IDENTIDADE BBC */}
      <div className="relative isolate flex min-h-[420px] items-center justify-center overflow-hidden px-6 py-24 md:min-h-[490px]">
        {/* Imagem com baixa opacidade */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-20"
        >
          <Image
            src="/images/footer-bg.webp"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center opacity-[0.16]"
          />
        </div>

        {/* Degradê para integrar a imagem */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,#091621_0%,rgba(9,22,33,0.15)_35%,rgba(9,22,33,0.15)_65%,#091621_100%)]"
        />

        <motion.div
          initial={
            reducedMotion
              ? false
              : { opacity: 0, y: 30 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative flex flex-col items-center text-center"
        >
          {/* Nome BBC */}
          <a
            href="#inicio"
            aria-label="BBC Corporation — voltar ao início"
            className="group inline-block"
          >
            <span className="block text-[clamp(3.2rem,8vw,7rem)] font-medium leading-none tracking-[-0.075em] text-white transition-opacity duration-300 group-hover:opacity-80">
              BBC
            </span>

            <span className="mt-3 block text-[clamp(0.8rem,1.5vw,1.15rem)] font-medium uppercase tracking-[0.4em] text-white/80">
              Corporation
            </span>
          </a>

          <p className="mt-7 max-w-[460px] text-sm leading-[1.9] text-[#A8B8C5] md:text-[15px]">
            Conectando pessoas, empresas e oportunidades.
          </p>

          {/* Instagram — Liquid Glass com reflexo espelhado */}
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visitar Instagram da BBC Corporation"
            className="group relative mt-8 inline-flex overflow-hidden rounded-full p-[1.5px] text-sm font-medium text-white/90 shadow-[0_8px_32px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_35px_rgba(0,0,0,0.2)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            {/* Borda base */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-full bg-white/20"
            />

            {/* Reflexo animado percorrendo a borda */}
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
            <span className="relative z-10 inline-flex items-center gap-3 rounded-full bg-white/[0.06] px-5 py-3 backdrop-blur-xl transition-colors duration-300 group-hover:bg-white/[0.12]">
              {/* Reflexo superior do vidro */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"
              />

              <InstagramIcon />

              <span>@bbc.corporation</span>

              <span className="text-white/60 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowIcon />
              </span>
            </span>
          </a>
        </motion.div>
      </div>

      {/* DIREITOS RESERVADOS + ÁGAVE LAB */}
      <div className="mx-auto max-w-[1440px] px-6 pb-8 sm:px-8 lg:px-16">
        <div className="border-t border-white/10 pt-7">
          <div className="flex flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">
            <p className="text-xs leading-relaxed text-[#8193A1]">
              © {CURRENT_YEAR} BBC Corporation. Todos os
              direitos reservados.
            </p>

            <a
              href="https://www.agavelab.com.br"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Desenvolvido pela Ágave Lab — visitar site"
              className="group inline-flex items-center gap-3 transition-opacity duration-300 hover:opacity-75"
            >
              <span className="text-xs text-[#8193A1]">
                Designed &amp; Developed by
              </span>

              <span className="relative block h-7 w-[110px]">
                <Image
                  src="/images/agave-logo.png"
                  alt="Ágave Lab"
                  fill
                  sizes="110px"
                  className="object-contain object-center"
                />
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
