"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight } from "./icons";
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
 * Hero limpo — sem eyebrow, sem tags, sem ticker técnico.
 * Apenas: bg image + overlay + título + subtitle + 2 CTAs + scroll cue.
 */
export function Hero() {
  const tiltRef = useMouseTilt(16);

  return (
    <section
      id="inicio"
      className="relative min-h-[100svh] flex items-end overflow-hidden text-offwhite isolate texture-grain"
      style={{ paddingTop: "calc(var(--header-h) + 40px)", paddingBottom: "clamp(60px, 6vw, 90px)" }}
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
            "linear-gradient(180deg, rgba(17,17,17,0.78) 0%, rgba(17,17,17,0.35) 35%, rgba(17,17,17,0.92) 100%), linear-gradient(90deg, rgba(23,50,56,0.5) 0%, rgba(17,17,17,0) 55%)",
        }}
      />

      <div className="relative z-[1] max-w-container w-full mx-auto px-5 md:px-8 lg:px-12">
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
          className="font-display font-light text-offwhite/85 mb-10 sm:mb-12 max-w-[52ch]"
          style={{ fontSize: "clamp(1.05rem, 1.4vw, 1.25rem)", lineHeight: 1.55 }}
        >
          Soluções completas para transformar espaços com qualidade, segurança
          e acabamento profissional — do primeiro traço à entrega final.
        </p>

        {/* Actions */}
        <div data-reveal data-d="400" className="flex flex-wrap gap-3.5">
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
      </div>

      {/* Scroll indicator — minimal, side */}
      <div className="hidden md:flex absolute bottom-8 right-10 z-[1] flex-col items-center gap-3 font-mono text-[0.62rem] tracking-[0.24em] uppercase text-offwhite/55 [writing-mode:vertical-rl] [transform:rotate(180deg)]">
        <span>Descer</span>
        <span className="block w-px h-[56px] bg-gradient-to-b from-transparent to-bronze scroll-line-indicator" />
      </div>
    </section>
  );
}
