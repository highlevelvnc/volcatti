"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const FRAMES = [
  {
    title: "Estaleiro · Implantação",
    sub: "Levantamento técnico, marcação de cotas, validação com o cliente.",
    img: "/portfolio/construcao-civil.jpg",
    label: "01 / 04",
  },
  {
    title: "Estrutura · Execução",
    sub: "Equipa própria, fornecedores certificados, controlo de qualidade diário.",
    img: "/portfolio/wc-marmore.jpg",
    label: "02 / 04",
  },
  {
    title: "Acabamento · Detalhe",
    sub: "Mármores, carvalho, latão, cabos. Tudo pensado ao milímetro.",
    img: "/portfolio/acabamentos-finos.jpg",
    label: "03 / 04",
  },
  {
    title: "Entrega · Vistoria",
    sub: "Limpeza final, vistoria conjunta, afinações. O cliente recebe pronto.",
    img: "/portfolio/piscina-noturna.png",
    label: "04 / 04",
  },
];

/**
 * Pin-scroll storytelling.
 * Left column: sticky image pinned below header — stays fixed while you
 * scroll. Right column: scrolling text panels swap the pinned image as
 * each one enters view (active state is always exactly one frame, no
 * escuro-no-gap). A scroll-linked bronze bar at the top of the image
 * gives continuous feedback while scrolling.
 *
 * NOTE: Section uses overflow-clip (not hidden) so the sticky descendant
 * can pin properly without being constrained by a hidden formatting
 * context.
 */
export function StickyStorytelling() {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  // Active panel — IO with a "in view if center 40% crosses" rule.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        // Pick the entry closest to the viewport center.
        const vCenter = window.innerHeight / 2;
        let bestIdx = -1;
        let bestDist = Infinity;
        entries.forEach((e) => {
          const idx = Number((e.target as HTMLElement).dataset.idx);
          if (Number.isNaN(idx)) return;
          const r = e.target.getBoundingClientRect();
          const eCenter = r.top + r.height / 2;
          const dist = Math.abs(eCenter - vCenter);
          if (dist < bestDist) {
            bestDist = dist;
            bestIdx = idx;
          }
        });
        if (bestIdx >= 0) setActive(bestIdx);
      },
      // Wide rootMargin so we observe even before they perfectly center.
      { rootMargin: "-20% 0px -20% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    panelRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  // Continuous scroll progress (0..1) through the whole section.
  useEffect(() => {
    if (typeof window === "undefined") return;
    let raf = 0;
    const update = () => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrollable = rect.height - vh;
      if (scrollable <= 0) {
        setProgress(0);
        return;
      }
      const p = Math.max(0, Math.min(1, -rect.top / scrollable));
      setProgress(p);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative bg-graphite text-offwhite"
      style={{ paddingBlock: "clamp(48px, 5.5vw, 80px)", overflow: "clip" }}
    >
      <div className="max-w-container mx-auto px-5 md:px-8 lg:px-12">
        <header className="grid lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-20 items-end pb-8 lg:pb-12">
          <div className="flex flex-col gap-7 items-center text-center lg:items-start lg:text-left">
            <div data-reveal className="section-index section-index--light">
              <span className="section-index__num">∗</span>
              <span className="section-index__label">Da ideia à entrega</span>
            </div>
            <h2 className="display display--light">
              <span data-reveal="line"><span>Quatro fases.</span></span>
              <span data-reveal="line" data-d="100"><span>Uma <em>obra</em> entregue.</span></span>
            </h2>
          </div>
          <p data-reveal data-d="200" className="font-display font-light text-offwhite/72 max-w-[40ch]" style={{ fontSize: "clamp(1.05rem, 1.4vw, 1.25rem)", lineHeight: 1.5 }}>
            Cada projeto passa pelo mesmo método. Sem improvisos —
            só o que sabemos que funciona, repetido com rigor.
          </p>
        </header>

        {/* items-start é CRÍTICO — sem isto o grid alinha as colunas
            ao "center" e o sticky não tem altura útil para deslizar. */}
        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-20 items-start">
          {/* PINNED IMAGE — left column */}
          <div className="hidden lg:block">
            <div
              className="sticky aspect-[4/5] overflow-hidden border border-offwhite/12 relative bg-graphite-2"
              /* top = header height (84px) + breathing room */
              style={{ top: "104px" }}
            >
              {FRAMES.map((frame, i) => (
                <div
                  key={frame.img}
                  className={`absolute inset-0 transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    active === i
                      ? "opacity-100 scale-100"
                      : i < active
                        ? "opacity-0 -translate-y-3 scale-[1.02]"
                        : "opacity-0 translate-y-3 scale-[1.02]"
                  }`}
                  style={{ willChange: "opacity, transform" }}
                >
                  <Image
                    src={frame.img}
                    alt={frame.title}
                    fill
                    loading={i === 0 ? "eager" : "lazy"}
                    priority={i === 0}
                    quality={72}
                    sizes="50vw"
                    className="object-cover"
                    style={{ filter: "grayscale(15%) contrast(1.04)" }}
                  />
                </div>
              ))}

              {/* Top progress bar — scroll-linked */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-offwhite/12 z-[3] overflow-hidden">
                <span
                  className="absolute top-0 left-0 h-full w-full bg-bronze origin-left"
                  style={{
                    transform: `scaleX(${progress})`,
                    willChange: "transform",
                    transition: "transform 80ms linear",
                  }}
                />
              </div>

              {/* Frame label */}
              <span className="absolute top-5 left-5 z-[2] font-mono text-[0.65rem] tracking-[0.2em] uppercase text-offwhite/90 px-2.5 py-1 bg-graphite/65 backdrop-blur-sm border border-offwhite/10">
                {FRAMES[active].label}
              </span>

              {/* Scroll percentage */}
              <span className="absolute top-5 right-5 z-[2] font-mono text-[0.6rem] tracking-[0.18em] uppercase text-bronze px-2 py-1 bg-graphite/65 backdrop-blur-sm border border-bronze/35">
                {Math.round(progress * 100).toString().padStart(2, "0")}%
              </span>

              {/* Active title overlay — bottom of image */}
              <div className="absolute bottom-0 left-0 right-0 z-[2] px-5 pb-5 pt-16 bg-gradient-to-t from-graphite/95 via-graphite/55 to-transparent pointer-events-none">
                <span className="block font-mono text-[0.58rem] tracking-[0.2em] uppercase text-bronze mb-1">
                  ▸ Fase em curso
                </span>
                <span
                  key={active}
                  className="block font-display font-light text-offwhite tracking-[-0.01em] animate-[fadeUp_0.6s_ease-out]"
                  style={{ fontSize: "1.4rem", lineHeight: 1.15 }}
                >
                  {FRAMES[active].title}
                </span>
              </div>

              {/* Vertical dot indicator — right side */}
              <div className="absolute right-3 top-1/2 -translate-y-1/2 z-[2] flex flex-col gap-2.5">
                {FRAMES.map((_, j) => (
                  <span
                    key={j}
                    className={`block w-[6px] rounded-full transition-all duration-500 ${
                      active === j
                        ? "bg-bronze h-7"
                        : j < active
                          ? "bg-bronze/45 h-2"
                          : "bg-offwhite/22 h-2"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* SCROLLING PANELS — right column */}
          <div className="flex flex-col gap-12 lg:gap-32">
            {FRAMES.map((frame, i) => (
              <div
                key={frame.title}
                ref={(el) => {
                  panelRefs.current[i] = el;
                }}
                data-idx={i}
                className="lg:min-h-[70vh] flex flex-col justify-center"
              >
                {/* Mobile-only image — desktop uses the sticky one */}
                <div className="lg:hidden mb-6 aspect-[4/5] overflow-hidden border border-offwhite/12 relative">
                  <Image
                    src={frame.img}
                    alt={frame.title}
                    fill
                    loading="lazy"
                    quality={70}
                    sizes="100vw"
                    className="object-cover"
                  />
                  <span className="absolute top-4 left-4 font-mono text-[0.6rem] tracking-[0.2em] uppercase text-offwhite/85 px-2 py-0.5 bg-graphite/55">
                    {frame.label}
                  </span>
                </div>

                <span className="font-mono text-[0.7rem] tracking-[0.2em] uppercase text-bronze mb-3">
                  {frame.label}
                </span>
                <h3
                  className="font-display font-normal text-offwhite leading-tight tracking-[-0.02em] mb-4"
                  style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.4rem)" }}
                >
                  {frame.title}
                </h3>
                <p
                  className="font-display font-light text-offwhite/75 max-w-[44ch]"
                  style={{ fontSize: "clamp(1.05rem, 1.4vw, 1.2rem)", lineHeight: 1.55 }}
                >
                  {frame.sub}
                </p>

                <div className="flex items-center gap-3 mt-6">
                  {FRAMES.map((_, j) => (
                    <span
                      key={j}
                      className={`h-px transition-all duration-500 ${
                        active === j ? "bg-bronze w-12" : "bg-offwhite/25 w-6"
                      }`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
