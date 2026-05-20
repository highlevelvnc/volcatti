"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight } from "./icons";
import { TechnicalStamp } from "./technical-stamp";
import { Magnetic } from "./magnetic";

/** Mouse-tilt parallax — subtle 3D-feel pan on the hero bg. */
function useMouseTilt(maxOffset = 18) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let raf = 0;
    let targetX = 0;
    let targetY = 0;
    let curX = 0;
    let curY = 0;

    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      targetX = x * maxOffset;
      targetY = y * maxOffset * 0.6;
    };

    const tick = () => {
      curX += (targetX - curX) * 0.08;
      curY += (targetY - curY) * 0.08;
      if (ref.current) {
        ref.current.style.transform = `translate3d(${-curX.toFixed(2)}px, ${-curY.toFixed(2)}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, [maxOffset]);
  return ref;
}

/**
 * Hero with architectural blueprint references:
 * - "PROJETO N.º" kicker badge (top-right)
 * - Vertical running label (left side)
 * - Ticker bar with technical metadata (bottom)
 * - Drawn blueprint corners
 */
export function Hero() {
  const tiltRef = useMouseTilt(16);

  return (
    <section
      id="inicio"
      className="relative min-h-[100svh] flex items-end overflow-hidden text-offwhite isolate texture-grain"
      style={{ paddingTop: "calc(var(--header-h) + 60px)", paddingBottom: "clamp(110px, 12vw, 170px)" }}
    >
      {/* Background image */}
      <div ref={tiltRef} className="absolute -inset-[3%] -z-[2] will-change-transform">
        <Image
          src="/portfolio/piscina-noturna.png"
          alt="Piscina iluminada de noite num projeto Volcatti em Lisboa"
          fill
          priority
          fetchPriority="high"
          quality={85}
          sizes="100vw"
          className="object-cover hero-zoom"
          style={{ objectPosition: "center 30%", filter: "contrast(1.05) saturate(1.05)" }}
        />
      </div>

      {/* Multi-stop overlay */}
      <div
        className="absolute inset-0 -z-[1]"
        style={{
          background:
            "linear-gradient(180deg, rgba(17,17,17,0.82) 0%, rgba(17,17,17,0.42) 32%, rgba(17,17,17,0.92) 100%), linear-gradient(90deg, rgba(23,50,56,0.55) 0%, rgba(17,17,17,0) 55%)",
        }}
      />

      {/* Architectural blueprint frame */}
      <svg
        className="absolute inset-0 w-full h-full -z-[1] pointer-events-none"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <line x1="0" y1="120" x2="1440" y2="120" stroke="rgba(244,241,234,0.18)" strokeWidth="1" strokeDasharray="1500" strokeDashoffset="1500" className="draw-line" />
        <line x1="120" y1="0" x2="120" y2="900" stroke="rgba(244,241,234,0.18)" strokeWidth="1" strokeDasharray="1500" strokeDashoffset="1500" className="draw-line" style={{ animationDelay: "200ms" }} />
        <line x1="1320" y1="0" x2="1320" y2="900" stroke="rgba(244,241,234,0.18)" strokeWidth="1" strokeDasharray="1500" strokeDashoffset="1500" className="draw-line" style={{ animationDelay: "400ms" }} />
        <line x1="0" y1="780" x2="1440" y2="780" stroke="rgba(244,241,234,0.18)" strokeWidth="1" strokeDasharray="1500" strokeDashoffset="1500" className="draw-line" style={{ animationDelay: "600ms" }} />
        {/* Corner markers */}
        {[[120, 120], [1320, 120], [120, 780], [1320, 780]].map(([x, y]) => (
          <g key={`${x}-${y}`}>
            <circle cx={x} cy={y} r="3" fill="#B88A2A" />
            <line x1={x - 6} y1={y} x2={x + 6} y2={y} stroke="#B88A2A" strokeWidth="0.5" />
            <line x1={x} y1={y - 6} x2={x} y2={y + 6} stroke="#B88A2A" strokeWidth="0.5" />
          </g>
        ))}
      </svg>

      {/* Vertical running label (desktop only, left side) */}
      <div
        aria-hidden="true"
        className="hidden xl:flex absolute left-7 top-1/2 -translate-y-1/2 z-[1] flex-col items-center gap-3 font-mono text-[0.6rem] tracking-[0.36em] uppercase text-offwhite/45 [writing-mode:vertical-rl] [transform:rotate(180deg)_translateY(50%)]"
        style={{ transform: "rotate(180deg)" }}
      >
        <span>Volcatti · Obra</span>
        <span className="block w-px h-12 bg-offwhite/30" />
        <span className="text-bronze">N.º 01</span>
      </div>

      {/* Rotating technical stamp — top-right */}
      <div className="hidden md:block absolute right-10 top-[calc(var(--header-h)+24px)] z-[1]">
        <TechnicalStamp />
      </div>

      <div className="relative z-[1] max-w-container w-full mx-auto px-5 md:px-8 lg:px-12">
        {/* Eyebrow */}
        <div data-reveal className="flex items-center gap-4 mb-9 font-mono text-[0.72rem] tracking-[0.18em] uppercase text-offwhite/72">
          <span className="text-bronze font-medium">N.º 01</span>
          <span className="inline-block w-7 h-px bg-offwhite/40" />
          <span>Construção & Remodelação Premium</span>
        </div>

        {/* Title — line-by-line reveal */}
        <h1 className="hero-breathing font-display font-light leading-none tracking-[-0.03em] text-offwhite mb-9 sm:mb-11 max-w-[18ch]" style={{ fontSize: "clamp(2.6rem, 7vw, 6.4rem)" }}>
          <span data-reveal="line"><span>Construção, Remodelação,</span></span>
          <span data-reveal="line" data-d="100"><span>Piscinas e Elétrica</span></span>
          <span data-reveal="line" data-d="200" className="inline-block">
            <span className="inline-block sm:pl-[6vw] xl:pl-[90px]">
              <em className="not-italic italic font-light text-bronze">com Precisão.</em>
            </span>
          </span>
        </h1>

        {/* Subtitle */}
        <p
          data-reveal
          data-d="300"
          className="font-display font-light text-offwhite/85 mb-12 sm:mb-14 max-w-[52ch]"
          style={{ fontSize: "clamp(1.05rem, 1.4vw, 1.25rem)", lineHeight: 1.55 }}
        >
          Soluções completas para transformar espaços com qualidade, segurança
          e acabamento profissional — do primeiro traço à entrega final.
        </p>

        {/* Actions */}
        <div data-reveal data-d="400" className="flex flex-wrap gap-3.5 mb-14 sm:mb-16">
          <Magnetic strength={12} radius={80}>
            <a href="#orcamento" className="btn btn--primary btn--lg" data-cursor="Pedir →">
              <span>Pedir orçamento</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </Magnetic>
          <Magnetic strength={8} radius={70}>
            <a href="#servicos" className="btn btn--ghost btn--ghost-light btn--lg" data-cursor="Ver">
              <span>Ver serviços</span>
            </a>
          </Magnetic>
        </div>

        {/* Tags */}
        <ul data-reveal data-d="500" className="flex flex-wrap gap-5 sm:gap-9 font-mono text-[0.72rem] tracking-[0.16em] uppercase text-offwhite/78">
          {["Construção Civil", "Remodelações", "Piscinas", "Elétrica"].map((t) => (
            <li key={t} className="inline-flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 bg-bronze rounded-full" />
              {t}
            </li>
          ))}
        </ul>
      </div>

      {/* Ticker bar — bottom: technical metadata */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 z-[1] border-t border-offwhite/10 backdrop-blur-[2px]"
        style={{ background: "linear-gradient(180deg, rgba(17,17,17,0) 0%, rgba(17,17,17,0.85) 100%)" }}
      >
        <div className="max-w-container mx-auto px-5 md:px-8 lg:px-12 py-4 flex items-center justify-between gap-4 font-mono text-[0.62rem] sm:text-[0.66rem] tracking-[0.2em] uppercase text-offwhite/75">
          <span className="hidden sm:inline-flex items-center gap-2">
            <span className="text-bronze">Sede</span>
            <span>· Palmela, PT</span>
          </span>
          <span className="hidden md:inline-flex items-center gap-2">
            <span className="text-bronze">Cat</span>
            <span>· Vivenda</span>
          </span>
          <span className="hidden md:inline-flex items-center gap-2">
            <span className="text-bronze">Área</span>
            <span>· 240 m²</span>
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="text-bronze">Ano</span>
            <span>· 2024</span>
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-bronze rounded-full animate-pulse" />
            <span className="text-offwhite">38°44′N · 8°59′W</span>
          </span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hidden md:flex absolute bottom-24 right-12 z-[1] flex-col items-center gap-3.5 font-mono text-[0.66rem] tracking-[0.18em] uppercase text-offwhite/55 [writing-mode:vertical-rl] [transform:rotate(180deg)]">
        <span>Descer</span>
        <span className="block w-px h-[60px] bg-gradient-to-b from-transparent to-bronze scroll-line-indicator" />
      </div>
    </section>
  );
}
