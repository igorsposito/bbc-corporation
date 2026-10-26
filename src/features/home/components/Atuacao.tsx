
"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { ArrowUpRight } from "lucide-react";

type ImagePanelProps = {
  image: string;
  title: string;
  description: string;
  className?: string;
  imagePosition?: string;
  delay?: number;
};

function ImagePanel({
  image,
  title,
  description,
  className = "",
  imagePosition = "center",
  delay = 0,
}: ImagePanelProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    ["-3%", "3%"]
  );

  return (
    <motion.article
      ref={ref}
      initial={
        reducedMotion
          ? false
          : { opacity: 0, y: 35 }
      }
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.85,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`group relative min-w-0 ${className}`}
    >
      <div className="relative h-full min-h-[360px] overflow-hidden rounded-[20px] bg-[#E5E5E1] md:rounded-[28px]">
        {/* Fotografia */}
        <motion.div
          aria-hidden="true"
          style={
            reducedMotion ? undefined : { y: imageY }
          }
          className="absolute -inset-y-[5%] inset-x-0 overflow-hidden"
        >
          <div
            className="h-full w-full bg-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.055]"
            style={{
              backgroundImage: `url("${image}")`,
              backgroundPosition: imagePosition,
            }}
          />
        </motion.div>

        {/* Sombra para leitura */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#07111B]/80 via-[#07111B]/15 to-transparent" />

        {/* Conteúdo */}
        <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-4 p-6 text-white md:p-9 lg:p-11">
          <div className="max-w-[480px]">
            <h3 className="text-[clamp(1.6rem,2.7vw,2.7rem)] font-medium leading-[1.1] tracking-[-0.045em]">
              {title}
            </h3>

            <p className="mt-3 max-w-[380px] text-sm leading-relaxed text-white/75 md:text-[15px]">
              {description}
            </p>
          </div>

          <div
            aria-hidden="true"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/35 bg-white/10 backdrop-blur-md transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:bg-white group-hover:text-[#101820]"
          >
            <ArrowUpRight size={20} strokeWidth={1.6} />
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function Atuacao() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="atuacao"
      className="relative overflow-hidden bg-[#F7F7F4] text-[#151A1F]"
    >
      <div className="mx-auto max-w-[1500px] px-5 pb-24 pt-24 sm:px-8 md:px-12 md:pb-36 md:pt-32 lg:px-20">
        {/* Abertura */}
        <div className="mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end md:gap-12">
          <motion.div
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
          >
            <h2 className="max-w-[720px] text-[clamp(2.5rem,4.8vw,5rem)] font-medium leading-[1.07] tracking-[-0.065em]">
              Onde conexões
              <br />
              se transformam em{" "}
              <span className="text-[#92999C]">
                oportunidades.
              </span>
            </h2>
          </motion.div>

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
            className="max-w-[330px] text-[15px] leading-[1.8] text-[#626B70]"
          >
            Conectamos pessoas, ideias e possibilidades
            para construir relações que movimentam
            negócios.
          </motion.p>
        </div>

        {/* Mosaico */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
          <ImagePanel
            image="/images/atuacao-negocios.webp"
            title="Negócios"
            description="Relações estratégicas que aproximam interesses e abrem caminhos."
            className="h-[460px] md:col-span-2 md:h-[560px] lg:h-[620px]"
            imagePosition="center 45%"
          />

          <ImagePanel
            image="/images/atuacao-aviacao.webp"
            title="Novos horizontes"
            description="Uma visão conectada a possibilidades que ultrapassam fronteiras."
            className="h-[430px] md:h-[540px]"
            imagePosition="center"
            delay={0.05}
          />

          <ImagePanel
            image="/images/atuacao-conexoes.webp"
            title="Conexões"
            description="Pessoas e oportunidades reunidas para criar novos caminhos."
            className="h-[430px] md:h-[540px]"
            imagePosition="center"
            delay={0.12}
          />
        </div>

        {/* Fechamento discreto */}
        <motion.div
          initial={
            reducedMotion
              ? false
              : { opacity: 0, y: 20 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-12 flex flex-col justify-between gap-7 border-t border-[#DADDD9] pt-8 md:mt-16 md:flex-row md:items-center"
        >
          <p className="max-w-[570px] text-xl font-medium leading-snug tracking-[-0.035em] text-[#293238] md:text-2xl">
            Cada conexão pode ser o início de algo extraordinário.
          </p>

          <a
            href="#contato"
            className="group inline-flex w-fit items-center gap-3 text-sm font-medium text-[#1C282F]"
          >
            Vamos conversar
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#B9C1C1] transition-all duration-300 group-hover:border-[#1C282F] group-hover:bg-[#1C282F] group-hover:text-white">
              <ArrowUpRight size={18} />
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
