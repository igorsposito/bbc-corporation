
"use client";

import { useEffect, useRef, useState } from "react";

const videos = [
  "/videos/hero-negociacao.mp4",
  "/videos/hero-acordo.mp4",
  "/videos/hero-negocios.mp4",
];

const DESKTOP_BREAKPOINT = "(min-width: 768px)";
const FADE_DURATION = 900;

export default function HeroVideoBackground() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [active, setActive] = useState(0);
  const [incoming, setIncoming] = useState<number | null>(null);

  const refs = useRef<(HTMLVideoElement | null)[]>([]);
  const activeRef = useRef(0);
  const transitioning = useRef(false);
  const transitionTimer = useRef<number | null>(null);
  
  // Detecta desktop sem acessar window durante a renderização.
  useEffect(() => {
    const media = window.matchMedia(DESKTOP_BREAKPOINT);

    const updateViewport = () => {
      setIsDesktop(media.matches);
    };

    // Atualização inicial e mudanças de tamanho.
    media.addEventListener("change", updateViewport);
    updateViewport();

    return () => {
      media.removeEventListener("change", updateViewport);
    };
  }, []);

  // Inicia o primeiro vídeo somente quando o desktop estiver ativo.
  useEffect(() => {
    if (!isDesktop) return;

    const firstVideo = refs.current[0];

    if (!firstVideo) return;

    firstVideo.play().catch(() => {
      // Mantém a imagem de fundo do Hero como fallback.
    });

    const videoElements = refs.current;

    return () => {
      if (transitionTimer.current !== null) {
        clearTimeout(transitionTimer.current);
        transitionTimer.current = null;
      }

      videoElements.forEach((video) => {
        video?.pause();
      });

      transitioning.current = false;
    };
  }, [isDesktop]);

  const nextVideo = async () => {
    if (!isDesktop || transitioning.current) return;

    transitioning.current = true;

    const next = (activeRef.current + 1) % videos.length;
    const video = refs.current[next];

    if (!video) {
      transitioning.current = false;
      return;
    }

    video.currentTime = 0;

    try {
      await video.play();
    } catch {
      transitioning.current = false;
      return;
    }

    setIncoming(next);

    // Aguarda o fade antes de trocar o vídeo ativo.
    transitionTimer.current = window.setTimeout(() => {
      refs.current[activeRef.current]?.pause();

      activeRef.current = next;
      setActive(next);
      setIncoming(null);

      transitioning.current = false;
      transitionTimer.current = null;
    }, FADE_DURATION);
  };

  // No mobile não renderizamos nenhum elemento de vídeo.
  if (!isDesktop) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 hidden overflow-hidden md:block"
    >
      {videos.map((src, index) => (
        <video
          key={src}
          ref={(element) => {
            refs.current[index] = element;
          }}
          src={src}
          muted
          playsInline
          preload={index === 0 ? "auto" : "metadata"}
          onEnded={() => {
            if (index === activeRef.current) {
              void nextVideo();
            }
          }}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-900"
          style={{
            opacity:
              index === incoming
                ? 1
                : index === active
                  ? 1
                  : 0,
            zIndex:
              index === incoming
                ? 2
                : index === active
                  ? 1
                  : 0,
          }}
        />
      ))}
    </div>
  );
}
