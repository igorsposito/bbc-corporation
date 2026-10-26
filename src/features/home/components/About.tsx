
"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { ArrowUpRight, ArrowDown } from "lucide-react";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

const { scrollYProgress } = useScroll({
  target: sectionRef,
  offset: ["start end", "end end"],
});

  const progress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 28,
    mass: 0.35,
  });

// Avião atravessa a tela da esquerda para a direita.
 
const jetX = useTransform(
  progress,
  [0, 0.15, 0.4, 0.7, 1],
  ["-45vw", "-25vw", "0vw", "55vw", "125vw"]
);

const jetY = useTransform(
  progress,
  [0, 0.4, 0.75, 1],
  ["12vh", "5vh", "-5vh", "-15vh"]
);

const jetScale = useTransform(
  progress,
  [0, 0.15, 0.4, 0.7, 1],
  [0.2, 0.35, 0.8, 1.45, 1.9]
);

const jetRotate = useTransform(
  progress,
  [0, 0.5, 1],
  [3, 0, -4]
);

const jetOpacity = useTransform(
  progress,
  [0, 0.08, 0.9, 1],
  [1, 1, 1, 0]
);

  // Parallax do céu.
  const skyScale = useTransform(progress, [0, 1], [1.08, 1.2]);
  const skyY = useTransform(progress, [0, 1], ["0%", "-5%"]);

  // Texto desaparece gradualmente no final.
  const textOpacity = useTransform(
    progress,
    [0, 0.65, 0.95],
    [1, 1, 0]
  );

  const textY = useTransform(
    progress,
    [0, 1],
    ["0px", "-45px"]
  );

  return (
    <section
      ref={sectionRef}
      id="sobre"
    className="relative h-[170svh] bg-[#DDE7EF] md:h-[170svh]"
    >
      <div className="sticky top-0 isolate h-[100svh] overflow-hidden">
        {/* CÉU REAL */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/ceu-about.webp')",
            scale: reducedMotion ? 1 : skyScale,
            y: reducedMotion ? 0 : skyY,
          }}
        />

        {/* CAMADA PARA LEGIBILIDADE */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(245,248,250,0.90) 0%, rgba(245,248,250,0.68) 40%, rgba(245,248,250,0.05) 100%)",
          }}
        />

        {/* AVIÃO NO FUNDO */}
        <motion.div
          aria-hidden="true"
          style={
            reducedMotion
              ? { x: "0vw", y: 0, scale: 0.8, rotate: 0 }
              : {
                  x: jetX,
                  y: jetY,
                  scale: jetScale,
                  rotate: jetRotate,
                  opacity: jetOpacity,
                }
          }
          className="pointer-events-none absolute left-0 top-[45%] z-[1] w-[75vw] max-w-[1100px] md:top-[30%] md:w-[50vw] will-change-transform"
        >
                <Image
        src="/images/jato.png"
        alt=""
        width={1200}
        height={800}
        sizes="(max-width: 768px) 100vw, 50vw"
        className="h-auto w-full object-contain drop-shadow-[0_20px_30px_rgba(20,40,60,0.18)]"
        draggable={false}
      />
        </motion.div>

        {/* CONTEÚDO */}
        <motion.div
          style={
            reducedMotion
              ? undefined
              : {
                  opacity: textOpacity,
                  y: textY,
                }
          }
          className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-center px-6 pb-20 pt-24 sm:px-10 md:px-16 lg:px-24"
        >
          <div className="max-w-[760px]">
            <motion.h2
              initial={
                reducedMotion ? false : { opacity: 0, y: 35 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.85,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-[clamp(2.8rem,6vw,6.5rem)] font-semibold leading-[1.02] tracking-[-0.07em] text-[#111820]"
            >
              Conectamos
              <br />
              oportunidades.
              <br />
              <span className="font-normal text-[#677785]">
                Expandimos
                <br />
                horizontes.
              </span>
            </motion.h2>

            <motion.p
              initial={
                reducedMotion ? false : { opacity: 0, y: 20 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="mt-7 max-w-[450px] text-base leading-[1.8] text-[#344552] md:mt-9 md:text-lg"
            >
              A BBC Corporation aproxima pessoas,
              empresas e oportunidades, criando
              conexões estratégicas que impulsionam
              negócios e abrem novos horizontes.
            </motion.p>

            <motion.a
              href="#atuacao"
              initial={
                reducedMotion ? false : { opacity: 0, y: 20 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="group mt-8 inline-flex items-center gap-4 rounded-full border border-[#1A2732]/25 bg-white/40 py-2 pl-2 pr-6 text-sm font-medium text-[#14212B] shadow-lg shadow-black/5 backdrop-blur-xl transition-all hover:bg-white/65"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#111820] text-white">
                <ArrowUpRight
                  size={19}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
              Conheça nossa atuação
            </motion.a>
          </div>
        </motion.div>

        {/* INDICADOR DE SCROLL */}
        <div className="pointer-events-none absolute bottom-7 left-6 right-6 z-20 flex items-center gap-3 text-[10px] font-medium tracking-[0.12em] text-[#344552] sm:left-10 sm:right-10 md:left-16 md:right-16 lg:left-24 lg:right-24">
          <ArrowDown size={16} />
          <span>CONTINUE EXPLORANDO</span>
          <div className="h-px flex-1 bg-[#344552]/30" />
          <span>02 / 06</span>
        </div>
      </div>
    </section>
  );
}
