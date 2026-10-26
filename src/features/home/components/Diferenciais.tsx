
"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { ArrowUpRight, ArrowRight } from "lucide-react";

const diferenciais = [
  {
    numero: "01",
    titulo: "Visão estratégica",
    descricao:
      "Um olhar atento às possibilidades que conectam interesses e abrem novos caminhos.",
  },
  {
    numero: "02",
    titulo: "Relacionamentos",
    descricao:
      "Acreditamos no valor das conexões e na construção de relações profissionais duradouras.",
  },
  {
    numero: "03",
    titulo: "Novas possibilidades",
    descricao:
      "Buscamos aproximar oportunidades, pessoas e iniciativas com potencial de crescimento.",
  },
];

export default function Diferenciais() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    ["-7%", "7%"]
  );

  const imageScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1.1, 1, 1.1]
  );

  return (
    <section
      ref={sectionRef}
      id="diferenciais"
      className="relative overflow-hidden bg-[#F0F1EE] text-[#192127]"
    >
      <div className="mx-auto max-w-[1500px] px-5 py-24 sm:px-8 md:px-12 md:py-32 lg:px-20">
        <div className="grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20 xl:gap-28">
          {/* Fotografia */}
          <motion.div
            ref={imageRef}
            initial={
              reducedMotion
                ? false
                : { opacity: 0, y: 45 }
            }
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.95,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] bg-[#D5DAD8] md:rounded-[32px]">
              <motion.div
                style={
                  reducedMotion
                    ? undefined
                    : {
                        y: imageY,
                        scale: imageScale,
                      }
                }
                className="absolute -inset-y-[9%] inset-x-0"
              >
                <Image
                  src="/images/bbc-arquitetura.webp"
                  alt="Arquitetura corporativa contemporânea"
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
              </motion.div>

              {/* Tratamento cinematográfico */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B1720]/25 via-transparent to-white/10" />
            </div>

            {/* Detalhe arquitetônico */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-5 -right-5 -z-10 h-[65%] w-[65%] rounded-[30px] border border-[#BFC7C5] md:-bottom-7 md:-right-7"
            />
          </motion.div>

          {/* Conteúdo */}
          <div className="lg:py-8">
            <motion.h2
              initial={
                reducedMotion
                  ? false
                  : { opacity: 0, y: 30 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.85,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="max-w-[680px] text-[clamp(2.5rem,4.5vw,5rem)] font-medium leading-[1.07] tracking-[-0.065em]"
            >
              Mais que conexões.
              <br />
              <span className="text-[#929B9A]">
                Visão de futuro.
              </span>
            </motion.h2>

            <motion.p
              initial={
                reducedMotion
                  ? false
                  : { opacity: 0, y: 20 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: 0.12,
              }}
              className="mt-7 max-w-[520px] text-[15px] leading-[1.9] text-[#66716F] md:mt-9 md:text-base"
            >
              Na BBC Corporation, acreditamos que grandes
              oportunidades nascem de conexões relevantes.
              Nossa visão valoriza relacionamentos,
              perspectivas e possibilidades que impulsionam
              novos negócios.
            </motion.p>

            {/* Diferenciais */}
            <div className="mt-12 border-t border-[#CBD1CE] md:mt-14">
              {diferenciais.map((item, index) => (
                <motion.div
                  key={item.numero}
                  initial={
                    reducedMotion
                      ? false
                      : { opacity: 0, y: 18 }
                  }
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{
                    duration: 0.65,
                    delay: index * 0.08,
                  }}
                  className="group grid grid-cols-[32px_1fr_24px] gap-4 border-b border-[#CBD1CE] py-6 md:gap-6"
                >
                  <span className="pt-1 text-xs font-medium text-[#A1AAA7]">
                    {item.numero}
                  </span>

                  <div>
                    <h3 className="text-lg font-medium tracking-[-0.035em] md:text-xl">
                      {item.titulo}
                    </h3>

                    <p className="mt-2 max-w-[400px] text-sm leading-[1.75] text-[#75807D]">
                      {item.descricao}
                    </p>
                  </div>

                  <ArrowUpRight
                    size={18}
                    strokeWidth={1.5}
                    className="mt-1 text-[#89938F] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.a
              href="#contato"
              initial={
                reducedMotion
                  ? false
                  : { opacity: 0, y: 18 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: 0.15,
              }}
              className="group mt-10 inline-flex items-center gap-4 text-sm font-medium text-[#1A252B]"
            >
              Vamos construir novas conexões
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#AEB8B5] transition-all duration-300 group-hover:border-[#1A252B] group-hover:bg-[#1A252B] group-hover:text-white">
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </span>
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
