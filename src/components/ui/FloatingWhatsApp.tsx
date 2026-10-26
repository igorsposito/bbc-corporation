
"use client";

import { motion, useReducedMotion } from "motion/react";

const WHATSAPP_NUMBER = "5531971267546";

const WHATSAPP_MESSAGE =
  "Olá! Vim pelo site da BBC Corporation e gostaria de saber mais sobre as oportunidades e como podemos conversar.";

const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE
)}`;

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="currentColor"
      aria-hidden="true"
      className="h-[25px] w-[25px]"
    >
      <path d="M16.01 2.67C8.66 2.67 2.69 8.63 2.69 15.98c0 2.35.61 4.65 1.77 6.68L2.6 29.33l6.84-1.79a13.26 13.26 0 0 0 6.57 1.67h.01c7.34 0 13.32-5.97 13.32-13.31 0-3.56-1.39-6.91-3.91-9.43a13.23 13.23 0 0 0-9.42-3.8Zm0 24.3a11.05 11.05 0 0 1-5.63-1.54l-.4-.24-4.06 1.06 1.08-3.96-.26-.41a11.03 11.03 0 0 1-1.7-5.9c0-6.07 4.94-11.01 11.02-11.01a10.94 10.94 0 0 1 7.79 3.23 10.94 10.94 0 0 1 3.22 7.8c0 6.07-4.95 11.01-11.06 11.01Zm6.05-8.25c-.33-.17-1.95-.96-2.25-1.07-.3-.11-.52-.17-.74.17-.22.33-.85 1.07-1.04 1.29-.19.22-.38.25-.71.08-.33-.16-1.39-.51-2.65-1.63-.98-.87-1.64-1.95-1.83-2.28-.19-.33-.02-.51.14-.67.15-.15.33-.38.5-.58.16-.19.22-.33.33-.55.11-.22.06-.41-.03-.58-.08-.17-.74-1.79-1.01-2.45-.27-.64-.54-.55-.74-.56h-.63c-.22 0-.58.08-.88.41-.3.33-1.15 1.12-1.15 2.74s1.18 3.18 1.34 3.4c.17.22 2.32 3.54 5.62 4.96.79.34 1.41.54 1.9.69.8.25 1.53.21 2.1.13.64-.1 1.95-.8 2.23-1.57.27-.77.27-1.43.19-1.57-.08-.14-.3-.22-.63-.38Z" />
    </svg>
  );
}

export default function FloatingWhatsApp() {
  const reducedMotion = useReducedMotion();

  return (
    <motion.a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar com a BBC Corporation pelo WhatsApp"
      title="Fale com a BBC pelo WhatsApp"
      initial={
        reducedMotion
          ? false
          : { opacity: 0, y: 24, scale: 0.92 }
      }
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.7,
        delay: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={
        reducedMotion ? undefined : { y: -3 }
      }
      whileTap={
        reducedMotion ? undefined : { scale: 0.96 }
      }
      className="
        group fixed bottom-6 right-5 z-[90]
        inline-flex h-[58px] items-center justify-center
        rounded-full p-[1.5px]
        text-white
        shadow-[0_12px_40px_rgba(0,0,0,0.32)]
        focus-visible:outline-2
        focus-visible:outline-offset-4
        focus-visible:outline-[#BBD7EA]
        sm:bottom-8 sm:right-8
      "
    >
      {/* BORDA ANIMADA: reflexo girando ao redor do botão */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-full bg-white/15"
      >
        {!reducedMotion && (
          <motion.span
            className="absolute -inset-[100%]"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0deg, transparent 250deg, rgba(160,210,240,0.12) 285deg, rgba(235,248,255,0.95) 310deg, rgba(160,210,240,0.25) 330deg, transparent 360deg)",
            }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: 1.5,
            }}
          />
        )}
      </span>

      {/* VIDRO ESCURO INTERNO */}
      <span
        className="
          relative flex h-full items-center justify-center
          overflow-hidden rounded-full
          bg-[#091621]/90 px-[17px]
          shadow-[inset_0_1px_0_rgba(255,255,255,0.16)]
          backdrop-blur-2xl
          transition-[background-color,box-shadow] duration-300
          group-hover:bg-[#152D3D]/95
          group-hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_0_25px_rgba(100,170,210,0.12)]
        "
      >
        {/* Reflexo delicado sobre o vidro */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"
        />

        {/* Ícone */}
        <span className="relative z-10 flex shrink-0 items-center justify-center">
          <WhatsAppIcon />
        </span>

        {/* Texto que aparece no hover */}
        <span
          className="
            relative z-10 hidden max-w-0 overflow-hidden
            whitespace-nowrap text-sm font-medium opacity-0
            transition-all duration-500 ease-out
            group-hover:ml-3 group-hover:max-w-[150px]
            group-hover:opacity-100 md:block
          "
        >
          Fale com a BBC
        </span>
      </span>
    </motion.a>
  );
}
