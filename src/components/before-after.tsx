"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * Interactive before/after slider — drag the divider to compare.
 * "Before" = filtered version of the same image (desaturated + sepia-leaning),
 * "After" = original. Acts as a visual storytelling device for transformation.
 */
export function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  useEffect(() => {
    const onMove = (clientX: number) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const p = ((clientX - rect.left) / rect.width) * 100;
      setPos(Math.max(0, Math.min(100, p)));
    };
    const onMouse = (e: MouseEvent) => draggingRef.current && onMove(e.clientX);
    const onTouch = (e: TouchEvent) => draggingRef.current && e.touches[0] && onMove(e.touches[0].clientX);
    const stop = () => (draggingRef.current = false);
    window.addEventListener("mousemove", onMouse);
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("mouseup", stop);
    window.addEventListener("touchend", stop);
    return () => {
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("mouseup", stop);
      window.removeEventListener("touchend", stop);
    };
  }, []);

  return (
    <section
      className="relative bg-graphite text-offwhite border-b border-offwhite/[0.06] overflow-hidden"
      style={{ paddingBlock: "clamp(80px, 11vw, 160px)" }}
    >
      <div className="max-w-container mx-auto px-5 md:px-8 lg:px-12">
        <header className="grid lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-20 items-end pb-12 lg:pb-20">
          <div className="flex flex-col gap-7">
            <div data-reveal className="section-index section-index--light">
              <span className="section-index__num">∗</span>
              <span className="section-index__label">Antes & Depois</span>
            </div>
            <h2 className="display display--light">
              <span data-reveal="line"><span>O mesmo espaço,</span></span>
              <span data-reveal="line" data-d="100"><span>uma <em>nova</em> história.</span></span>
            </h2>
          </div>
          <p data-reveal data-d="200" className="font-display font-light text-offwhite/75 max-w-[44ch]" style={{ fontSize: "clamp(1.05rem, 1.4vw, 1.25rem)", lineHeight: 1.5 }}>
            Arrasta a linha para comparar. Mesmo planta, mesma luz —
            o que muda é o cuidado com cada detalhe.
          </p>
        </header>

        <div
          ref={ref}
          className="relative aspect-[16/10] overflow-hidden border border-offwhite/12 select-none"
          onMouseDown={(e) => {
            draggingRef.current = true;
            const rect = ref.current!.getBoundingClientRect();
            setPos(Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100)));
          }}
          onTouchStart={(e) => {
            draggingRef.current = true;
            const rect = ref.current!.getBoundingClientRect();
            setPos(Math.max(0, Math.min(100, ((e.touches[0].clientX - rect.left) / rect.width) * 100)));
          }}
          data-cursor="Arrastar"
        >
          {/* AFTER (full width, behind) */}
          <Image
            src="/portfolio/wc-marmore.png"
            alt="Casa de banho remodelada — depois"
            fill
            sizes="(min-width:1024px) 80vw, 100vw"
            className="object-cover"
          />
          {/* BEFORE (clipped on left) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          >
            <Image
              src="/portfolio/wc-marmore.png"
              alt="Antes da remodelação"
              fill
              sizes="(min-width:1024px) 80vw, 100vw"
              className="object-cover"
              style={{ filter: "grayscale(100%) sepia(40%) contrast(0.85) brightness(0.7)" }}
            />
            <div className="absolute inset-0 pointer-events-none" style={{ background: "rgba(28,20,10,0.25)" }} />
          </div>

          {/* Labels */}
          <span className="absolute top-5 left-5 font-mono text-[0.65rem] tracking-[0.22em] uppercase text-offwhite/85 px-2.5 py-1 bg-graphite/70 border border-offwhite/20">
            Antes
          </span>
          <span className="absolute top-5 right-5 font-mono text-[0.65rem] tracking-[0.22em] uppercase text-graphite px-2.5 py-1 bg-bronze">
            Depois
          </span>

          {/* Divider */}
          <div
            className="absolute top-0 bottom-0 w-px bg-bronze pointer-events-none"
            style={{ left: `${pos}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-bronze flex items-center justify-center shadow-[0_4px_30px_rgba(0,0,0,0.4)]">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
                <path d="M9 6 L4 12 L9 18" stroke="#111" strokeWidth="1.5" strokeLinecap="square" />
                <path d="M15 6 L20 12 L15 18" stroke="#111" strokeWidth="1.5" strokeLinecap="square" />
              </svg>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 font-mono text-[0.65rem] tracking-[0.18em] uppercase text-offwhite/55">
          <span>Cliente · Apartamento Lisboa</span>
          <span>Tipo · WC + carpintaria + iluminação</span>
          <span>Duração · 21 dias úteis</span>
        </div>
      </div>
    </section>
  );
}
