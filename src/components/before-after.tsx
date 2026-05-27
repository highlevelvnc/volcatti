"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * Interactive before/after slider — drag the divider to compare.
 * Real Volcatti recuperação de piscina: água verde com algas (antes,
 * Setembro 2022) → piscina azul cristalina com deck (depois,
 * Outubro 2022). Mesma piscina, ~5 semanas de intervalo.
 *
 * Layout responsivo:
 *  - Mobile/tablet: portrait 4:5 (mostra mais da piscina)
 *  - Desktop: landscape 16:10 max-width 1080px (cinematográfico,
 *    sem ocupar viewport inteiro com altura excessiva)
 */
export function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  // Set initial pos to 50 only once (avoid hydration mismatch)
  useEffect(() => {
    const update = (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const p = ((clientX - rect.left) / rect.width) * 100;
      setPos(Math.max(0, Math.min(100, p)));
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!draggingRef.current) return;
      e.preventDefault();
      update(e.clientX);
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!draggingRef.current || !e.touches[0]) return;
      update(e.touches[0].clientX);
    };
    const stop = () => (draggingRef.current = false);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("mouseup", stop);
    window.addEventListener("touchend", stop);
    window.addEventListener("mouseleave", stop);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("mouseup", stop);
      window.removeEventListener("touchend", stop);
      window.removeEventListener("mouseleave", stop);
    };
  }, []);

  // Keyboard accessibility — arrow keys move the divider
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setPos((p) => Math.max(0, p - 5));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setPos((p) => Math.min(100, p + 5));
    }
  };

  const startDrag = (clientX: number) => {
    draggingRef.current = true;
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPos(Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100)));
  };

  return (
    <section
      className="relative bg-graphite text-offwhite border-b border-offwhite/[0.06] overflow-hidden"
      style={{ paddingBlock: "clamp(48px, 5.5vw, 80px)" }}
    >
      <div className="max-w-container mx-auto px-5 md:px-8 lg:px-12">
        <header className="grid lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-20 items-end pb-8 lg:pb-12">
          <div className="flex flex-col gap-7 items-center text-center lg:items-start lg:text-left">
            <div data-reveal className="section-index section-index--light">
              <span className="section-index__num">∗</span>
              <span className="section-index__label">Antes & Depois</span>
            </div>
            <h2 className="display display--light">
              <span data-reveal="line"><span>De água verde</span></span>
              <span data-reveal="line" data-d="100"><span>a <em>azul cristalino.</em></span></span>
            </h2>
          </div>
          <p data-reveal data-d="200" className="font-display font-light text-offwhite/75 max-w-[44ch]" style={{ fontSize: "clamp(1.05rem, 1.4vw, 1.25rem)", lineHeight: 1.5 }}>
            Arrasta a linha para comparar. Mesma piscina, cinco semanas
            de trabalho — recuperação, tratamento e nova zona envolvente.
          </p>
        </header>

        <div
          ref={containerRef}
          role="slider"
          aria-label="Comparar piscina antes e depois"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          tabIndex={0}
          onKeyDown={onKeyDown}
          className="relative aspect-[4/5] sm:aspect-[1/1] lg:aspect-[16/10] max-w-[1080px] mx-auto overflow-hidden border border-offwhite/15 select-none touch-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-bronze focus-visible:outline-offset-4"
          onMouseDown={(e) => {
            e.preventDefault();
            startDrag(e.clientX);
          }}
          onTouchStart={(e) => {
            if (!e.touches[0]) return;
            startDrag(e.touches[0].clientX);
          }}
          data-cursor="Arrastar"
        >
          {/* AFTER (full width, behind) — piscina recuperada */}
          <Image
            src="/portfolio/piscina-depois-v2.jpg"
            alt="Piscina recuperada — azul cristalina com deck e jardim"
            fill
            priority={false}
            loading="lazy"
            quality={80}
            sizes="(min-width:1024px) 1080px, 100vw"
            className="object-cover volcatti-look pointer-events-none"
            draggable={false}
          />

          {/* BEFORE (clipped on left) — piscina com água verde */}
          <div
            className="absolute inset-0 overflow-hidden pointer-events-none"
            style={{
              clipPath: `inset(0 ${100 - pos}% 0 0)`,
              willChange: "clip-path",
            }}
          >
            <Image
              src="/portfolio/piscina-antes-v2.jpg"
              alt="Piscina antes — algas verdes, em manutenção pela equipa Volcatti"
              fill
              priority={false}
              loading="lazy"
              quality={75}
              sizes="(min-width:1024px) 1080px, 100vw"
              className="object-cover pointer-events-none"
              draggable={false}
            />
          </div>

          {/* Labels — top corners, with refined design */}
          <div className="absolute top-4 left-4 lg:top-5 lg:left-5 z-[3] pointer-events-none">
            <span className="inline-flex items-center gap-2 font-mono text-[0.6rem] lg:text-[0.65rem] tracking-[0.22em] uppercase text-offwhite px-2.5 py-1 bg-graphite/80 backdrop-blur-sm border-l border-offwhite/30">
              <span className="w-1 h-1 bg-offwhite/60" /> Antes
            </span>
          </div>
          <div className="absolute top-4 right-4 lg:top-5 lg:right-5 z-[3] pointer-events-none">
            <span className="inline-flex items-center gap-2 font-mono text-[0.6rem] lg:text-[0.65rem] tracking-[0.22em] uppercase text-graphite px-2.5 py-1 bg-bronze border-l border-graphite/20">
              <span className="w-1 h-1 bg-graphite/70" /> Depois
            </span>
          </div>

          {/* Divider — vertical bronze line with handle in centre */}
          <div
            className="absolute top-0 bottom-0 w-px bg-bronze pointer-events-none z-[2]"
            style={{ left: `${pos}%`, willChange: "left" }}
          >
            {/* Top/bottom arrows (technical-drawing convention) */}
            <span className="absolute top-3 left-1/2 -translate-x-1/2 w-2 h-2 border-t border-l border-bronze rotate-45 -translate-y-1/2 opacity-60" />
            <span className="absolute bottom-3 left-1/2 -translate-x-1/2 w-2 h-2 border-b border-r border-bronze -rotate-45 translate-y-1/2 opacity-60" />

            {/* Centre handle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-bronze flex items-center justify-center shadow-[0_6px_24px_rgba(0,0,0,0.4)]">
              <svg viewBox="0 0 24 24" className="w-4 h-4 lg:w-5 lg:h-5" fill="none" aria-hidden="true">
                <path d="M9 6 L4 12 L9 18" stroke="#111" strokeWidth="1.6" strokeLinecap="square" strokeLinejoin="miter" />
                <path d="M15 6 L20 12 L15 18" stroke="#111" strokeWidth="1.6" strokeLinecap="square" strokeLinejoin="miter" />
              </svg>
            </div>
          </div>

          {/* Position readout — bottom-right, technical readout */}
          <div className="absolute bottom-4 right-4 lg:bottom-5 lg:right-5 z-[3] pointer-events-none">
            <span className="font-mono text-[0.58rem] lg:text-[0.62rem] tracking-[0.2em] uppercase text-offwhite/85 px-2 py-1 bg-graphite/70 backdrop-blur-sm">
              <span className="text-bronze">▸</span> Pos {Math.round(pos).toString().padStart(2, "0")} / 100
            </span>
          </div>

          {/* Hint micro-text — only visible at idle position 50 */}
          <div
            className={`absolute bottom-4 left-4 lg:bottom-5 lg:left-5 z-[3] pointer-events-none font-mono text-[0.55rem] lg:text-[0.6rem] tracking-[0.2em] uppercase text-offwhite/65 transition-opacity duration-500 ${
              pos > 30 && pos < 70 ? "opacity-100" : "opacity-0"
            }`}
          >
            <span className="text-bronze">←</span> Arrastar <span className="text-bronze">→</span>
          </div>
        </div>

        {/* Metadata strip below */}
        <div className="mt-5 lg:mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 max-w-[1080px] mx-auto">
          {[
            { label: "Cliente", value: "Piscina particular · Setúbal" },
            { label: "Tipo", value: "Recuperação + tratamento + envolvente" },
            { label: "Duração", value: "5 semanas" },
          ].map((m) => (
            <div key={m.label} className="flex flex-col gap-0.5 border-l border-offwhite/15 pl-3">
              <span className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-bronze">
                ▸ {m.label}
              </span>
              <span className="font-mono text-[0.66rem] tracking-[0.14em] uppercase text-offwhite/75">
                {m.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
