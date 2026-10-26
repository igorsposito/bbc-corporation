
"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";

const navigation = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre", href: "#sobre" },
  { label: "Atuação", href: "#atuacao" },
  { label: "Diferenciais", href: "#diferenciais" },
  { label: "Contato", href: "#contato" },
];

const CONTACT_URL = "#contato";

const HEADER_OFFSET = 105;

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const reducedMotion = useReducedMotion();
  const scrollAnimationRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 70);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    return () => {
      if (scrollAnimationRef.current !== null) {
        cancelAnimationFrame(scrollAnimationRef.current);
      }
    };
  }, []);

  // Scroll suave com easing premium
  const smoothScrollTo = (targetY: number) => {
    if (scrollAnimationRef.current !== null) {
      cancelAnimationFrame(scrollAnimationRef.current);
    }

    const startY = window.scrollY;
    const distance = targetY - startY;

    if (reducedMotion || Math.abs(distance) < 2) {
      window.scrollTo(0, targetY);
      return;
    }

    const duration = Math.min(
      1250,
      Math.max(650, Math.abs(distance) * 0.45)
    );

    let startTime: number | null = null;

    const easeInOutCubic = (t: number) =>
      t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const animateScroll = (timestamp: number) => {
      if (startTime === null) {
        startTime = timestamp;
      }

      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOutCubic(progress);

      window.scrollTo(0, startY + distance * easedProgress);

      if (progress < 1) {
        scrollAnimationRef.current =
          requestAnimationFrame(animateScroll);
      } else {
        scrollAnimationRef.current = null;
      }
    };

    scrollAnimationRef.current =
      requestAnimationFrame(animateScroll);
  };

  const navigateTo = (href: string) => {
    const targetId = href.replace("#", "");
    const target = document.getElementById(targetId);

    setMenuOpen(false);

    if (!target) return;

    // Aguarda o desbloqueio do scroll do menu mobile
    requestAnimationFrame(() => {
      const targetPosition =
        target.getBoundingClientRect().top +
        window.scrollY -
        (targetId === "inicio" ? 0 : HEADER_OFFSET);

      const finalPosition = Math.max(0, targetPosition);

      smoothScrollTo(finalPosition);

      window.history.replaceState(null, "", href);
    });
  };

  const handleNavigation = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    // Preserva abrir em nova aba e outros comandos do navegador
    if (
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    ) {
      return;
    }

    event.preventDefault();
    navigateTo(href);
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-8"
    >
      <motion.div
        animate={{
          maxWidth: scrolled ? 1120 : 1280,
          backgroundColor: scrolled
            ? "rgba(15, 20, 30, 0.72)"
            : "rgba(15, 20, 30, 0)",
          borderColor: scrolled
            ? "rgba(255,255,255,0.12)"
            : "rgba(255,255,255,0)",
          borderRadius: scrolled ? 22 : 0,
        }}
        transition={{
          duration: 0.55,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="mx-auto border backdrop-blur-xl"
      >
        <div className="flex h-[76px] items-center justify-between px-5 md:px-8">
          {/* LOGOTIPO */}
          <a
            href="#inicio"
            onClick={(event) =>
              handleNavigation(event, "#inicio")
            }
            className="relative z-50 flex items-center"
          >
            <div className="flex flex-col">
              <motion.span
                animate={{ fontSize: scrolled ? 24 : 30 }}
                transition={{
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="font-bold tracking-[-0.08em] text-white"
              >
                BBC
              </motion.span>

              <AnimatePresence>
                {!scrolled && (
                  <motion.span
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden text-[9px] tracking-[0.35em] text-white/60"
                  >
                    CORPORATION
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </a>

          {/* NAVEGAÇÃO DESKTOP */}
          <nav
            aria-label="Navegação principal"
            className="hidden items-center gap-6 lg:gap-8 md:flex"
          >
            {navigation.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(event) =>
                  handleNavigation(event, item.href)
                }
                className="group relative whitespace-nowrap text-sm font-medium text-white/70 transition-colors duration-300 hover:text-white"
              >
                {item.label}

                <span className="absolute -bottom-2 left-0 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* CTA DESKTOP */}
          <a
            href={CONTACT_URL}
            onClick={(event) =>
              handleNavigation(event, CONTACT_URL)
            }
            className="hidden items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#10141B] transition-all duration-300 hover:bg-white/90 md:flex"
          >
            Fale com a BBC
            <ArrowUpRight size={17} />
          </a>

          {/* BOTÃO MOBILE */}
          <button
            type="button"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            aria-controls="bbc-mobile-menu"
            onClick={() => setMenuOpen(!menuOpen)}
            className="relative z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white md:hidden"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.div>

      {/* MENU MOBILE */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="bbc-mobile-menu"
            aria-label="Navegação mobile"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute inset-x-4 top-[104px] rounded-3xl border border-white/10 bg-[#0F141E]/95 p-8 shadow-2xl backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col gap-7">
              {navigation.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(event) =>
                    handleNavigation(event, item.href)
                  }
                  className="text-2xl font-medium text-white"
                >
                  {item.label}
                </a>
              ))}

              <a
                href={CONTACT_URL}
                onClick={(event) =>
                  handleNavigation(event, CONTACT_URL)
                }
                className="mt-3 flex items-center justify-between rounded-full bg-white px-6 py-4 font-semibold text-black"
              >
                Fale com a BBC
                <ArrowUpRight size={20} />
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
