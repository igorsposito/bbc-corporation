
"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { ArrowDown } from "lucide-react";

export default function NextStep() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Movimento cinematográfico da imagem
  const backgroundScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1.16, 1, 1.12]
  );

  const backgroundY = useTransform(
    scrollYProgress,
    [0, 1],
    ["-5%", "5%"]
  );

  // Profundidade e saída suave do conteúdo
  const contentY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [65, 0, -65]
  );

  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.72, 1],
    [0, 1, 1, 0]
  );

  // Luz atmosférica
  const glowOpacity = useTransform(
    scrollYProgress,
    [0, 0.45, 1],
    [0.15, 0.55, 0.15]
  );

  return (
    <section
      ref={sectionRef}
      id="next-step"
      aria-labelledby="next-step-title"
      className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#030C17] text-white"
    >
      {/* Imagem cinematográfica */}
      <motion.div
        aria-hidden="true"
        style={
          reducedMotion
            ? undefined
            : {
                scale: backgroundScale,
                y: backgroundY,
              }
        }
        className="pointer-events-none absolute -inset-[8%] z-[-3]"
      >
        <Image
          src="/images/next-step-bg5.webp"
          alt=""
          fill
          sizes="100vw"
          quality={90}
          className="object-cover object-center"
        />
      </motion.div>

      {/* Tratamento escuro para legibilidade */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[-2] bg-[linear-gradient(180deg,rgba(2,9,19,0.42)_0%,rgba(2,9,19,0.26)_42%,rgba(2,9,19,0.65)_100%)]"
      />

      {/* Iluminação azul atmosférica */}
      <motion.div
        aria-hidden="true"
        style={
          reducedMotion
            ? undefined
            : { opacity: glowOpacity }
        }
        className="pointer-events-none absolute inset-x-[-15%] bottom-[-35%] z-[-1] h-[70%] rounded-[100%] bg-[#2365A2]/30 blur-[110px]"
      />

      {/* Conteúdo central */}
      <motion.div
        style={
          reducedMotion
            ? undefined
            : {
                y: contentY,
                opacity: contentOpacity,
              }
        }
        className="relative mx-auto flex w-full max-w-[1300px] flex-col items-center px-6 py-32 text-center sm:px-10 lg:px-16"
      >
        <motion.h2
          id="next-step-title"
          initial={
            reducedMotion
              ? false
              : { opacity: 0, y: 35, filter: "blur(8px)" }
          }
          whileInView={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{
            duration: 1.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="max-w-[1100px] text-[clamp(2.8rem,6.6vw,7.2rem)] font-medium leading-[1.06] tracking-[-0.065em] text-white"
        >
          O próximo grande passo
          <span className="block text-[#C0D8EF]">
            começa com uma conexão.
          </span>
        </motion.h2>

        <motion.p
          initial={
            reducedMotion
              ? false
              : { opacity: 0, y: 20 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{
            duration: 0.9,
            delay: 0.25,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-8 max-w-[550px] text-[15px] leading-[1.8] text-[#D2DEEA]/85 md:mt-10 md:text-lg"
        >
          Novos horizontes. Novas possibilidades.
          O futuro começa agora.
        </motion.p>

        <motion.a
          href="#contato"
          aria-label="Ir para a seção de contato"
          initial={
            reducedMotion
              ? false
              : { opacity: 0, y: 15 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: 0.55,
          }}
          className="group mt-14 flex flex-col items-center gap-4 md:mt-20"
        >
          <span className="text-xs font-medium tracking-[0.12em] text-white/75">
            Vamos conversar
          </span>

          <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-xl transition-all duration-300 group-hover:translate-y-1 group-hover:border-white/60 group-hover:bg-white/20">
            <ArrowDown
              size={19}
              strokeWidth={1.5}
              className="transition-transform duration-300 group-hover:translate-y-1"
            />
          </span>
        </motion.a>
      </motion.div>

      {/* Transição para a próxima seção */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#030C17]/60 to-transparent"
      />
    </section>
  );
}
