
"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";

// VÍDEOS DO HERO — ADICIONE QUANTOS QUISER
const videos = [
  "/videos/hero-negociacao.mp4",
  "/videos/hero-acordo.mp4",
  "/videos/hero-negocios.mp4",
];

const TRANSITION_DURATION = 1000;

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const activeRef = useRef(0);
  const transitioningRef = useRef(false);
  const transitionTimer = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  const [activeVideo, setActiveVideo] = useState(0);
  const [incomingVideo, setIncomingVideo] = useState<number | null>(
    null
  );

  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "15%"]
  );

  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.8],
    [1, 0]
  );

  // TRANSIÇÃO ENTRE OS VÍDEOS
  const nextVideo = async () => {
    if (transitioningRef.current || videos.length < 2) return;

    transitioningRef.current = true;

    const next = (activeRef.current + 1) % videos.length;
    const video = videoRefs.current[next];

    if (!video) {
      transitioningRef.current = false;
      return;
    }

    video.currentTime = 0;

    try {
      await video.play();
    } catch {
      transitioningRef.current = false;
      return;
    }

    setIncomingVideo(next);

    transitionTimer.current = setTimeout(() => {
      videoRefs.current[activeRef.current]?.pause();

      activeRef.current = next;
      setActiveVideo(next);
      setIncomingVideo(null);

      transitioningRef.current = false;
    }, TRANSITION_DURATION);
  };

  // INICIA O PRIMEIRO VÍDEO
  useEffect(() => {
    if (reducedMotion) return;

    const media = window.matchMedia("(min-width: 768px)");

    const startVideo = () => {
      if (media.matches) {
        videoRefs.current[activeRef.current]
          ?.play()
          .catch(() => {});
      } else {
        videoRefs.current.forEach((video) => video?.pause());
      }
    };

    startVideo();

   
media.addEventListener("change", startVideo);

const videos = videoRefs.current;

return () => {
  media.removeEventListener("change", startVideo);

  if (transitionTimer.current) {
    clearTimeout(transitionTimer.current);
  }

  videos.forEach((video) => video?.pause());
};
}, [reducedMotion]);


  const entrance = (delay: number) => ({
    initial: reducedMotion
      ? false
      : { opacity: 0, y: 35 },

    animate: { opacity: 1, y: 0 },

    transition: {
      duration: reducedMotion ? 0 : 0.9,
      delay: reducedMotion ? 0 : delay,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  });

  return (
    <section
      ref={heroRef}
      id="inicio"
      className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#090D13] px-6 pt-32 pb-24"
    >
      {/* BACKGROUND COM PARALLAX */}
      <motion.div
        aria-hidden="true"
        style={reducedMotion ? undefined : { y: backgroundY }}
        className="pointer-events-none absolute -inset-y-[15%] inset-x-0 z-0 overflow-hidden"
      >
        {/* IMAGEM MOBILE E FALLBACK */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/images/hero-negociacao.webp')",
          }}
        />

        {/* VÍDEOS DESKTOP */}
        {!reducedMotion && (
          <div className="absolute inset-0 hidden md:block">
            {videos.map((src, index) => {
              const isActive = index === activeVideo;
              const isIncoming = index === incomingVideo;

              return (
                <video
                  key={src}
                  ref={(element) => {
                    videoRefs.current[index] = element;
                  }}
                  src={src}
                  muted
                  playsInline
                  preload={index === 0 ? "auto" : "metadata"}
                  onTimeUpdate={(event) => {
                    if (index !== activeRef.current) return;
                    if (transitioningRef.current) return;

                    const video = event.currentTarget;

                    if (
                      Number.isFinite(video.duration) &&
                      video.duration > 0 &&
                      video.duration - video.currentTime <=
                        TRANSITION_DURATION / 1000
                    ) {
                      void nextVideo();
                    }
                  }}
                  onEnded={() => {
                    if (index === activeRef.current) {
                      void nextVideo();
                    }
                  }}
                  className="absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out"
                  style={{
                    opacity:
                      isIncoming || isActive ? 1 : 0,
                    zIndex: isIncoming
                      ? 2
                      : isActive
                        ? 1
                        : 0,
                  }}
                />
              );
            })}
          </div>
        )}
      </motion.div>

      {/* OVERLAY CINEMATOGRÁFICO */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(180deg, rgba(5,8,14,0.50) 0%, rgba(5,8,14,0.55) 45%, rgba(5,8,14,0.88) 100%)",
        }}
      />

      {/* ILUMINAÇÃO SUTIL */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(70,100,140,0.10), transparent 65%)",
        }}
      />

      {/* CONTEÚDO CENTRAL */}
      <motion.div
        style={
          reducedMotion
            ? undefined
            : { opacity: contentOpacity }
        }
        className="relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center"
      >
        <motion.h1
          {...entrance(0.2)}
          className="max-w-5xl text-[clamp(2.8rem,7vw,7rem)] leading-[1.04] font-semibold tracking-[-0.065em] text-white"
        >
          Grandes negócios começam com grandes conexões.
        </motion.h1>

        <motion.p
          {...entrance(0.5)}
          className="mt-8 max-w-xl text-base leading-relaxed text-white/75 md:text-lg"
        >
          Conectando pessoas, empresas e oportunidades.
        </motion.p>

       
{/* BOTÕES LIQUID GLASS COM REFLEXO APENAS NAS BORDAS */}
<motion.div
  {...entrance(0.8)}
  className="mt-11 flex flex-wrap items-center justify-center gap-4"
>
  {/* CTA PRINCIPAL */}
  <a
    href="#sobre"
    className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-white/35 bg-white/20 px-7 py-4 text-sm font-semibold text-white shadow-[0_8px_32px_rgba(0,0,0,0.18)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/30 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
  >
    {/* Reflexo restrito à borda */}
    {!reducedMotion && (
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-full"
        style={{
          padding: "1.5px",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      >
        <motion.span
          className="absolute -inset-[150%]"
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
      </span>
    )}

    <span className="relative z-10">
      Conheça a BBC
    </span>

    <ArrowUpRight
      size={18}
      className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
    />

    {/* Reflexo estático superior do vidro */}
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent"
    />
  </a>

  {/* CTA SECUNDÁRIO */}
  <a
    href="#atuacao"
    className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-white/20 bg-black/20 px-7 py-4 text-sm font-medium text-white backdrop-blur-lg transition-all duration-300 hover:-translate-y-1 hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
  >
    {/* Reflexo mais suave, também restrito à borda */}
    {!reducedMotion && (
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-full"
        style={{
          padding: "1.5px",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      >
        <motion.span
          className="absolute -inset-[150%]"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0deg, transparent 270deg, rgba(160,210,240,0.06) 295deg, rgba(220,240,255,0.55) 315deg, rgba(160,210,240,0.12) 335deg, transparent 360deg)",
          }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: 2,
          }}
        />
      </span>
    )}

    <span className="relative z-10">
      Nossa atuação
    </span>

    <ArrowDown
      size={18}
      className="relative z-10 transition-transform duration-300 group-hover:translate-y-1"
    />
  </a>
</motion.div>

      </motion.div>

      {/* INDICADOR DE SCROLL */}
      <motion.div
        aria-hidden="true"
        animate={
          reducedMotion ? {} : { y: [0, 8, 0] }
        }
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-white/60"
      >
        <ArrowDown size={20} strokeWidth={1.5} />
      </motion.div>
    </section>
  );
}
