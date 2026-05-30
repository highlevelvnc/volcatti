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
  const [progress, setProgress] = useState(0);

  // Continuous scroll progress (0..1) — drives both crossfade and parallax.
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

  // Active index derived from scroll progress.
  const frameP = progress * FRAMES.length; // 0..N
  const active = Math.min(
    FRAMES.length - 1,
    Math.max(0, Math.floor(frameP)),
  );

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

        {/* Grid stretch default: a coluna esquerda estica até à altura
            da coluna direita (~280vh). O sticky child (~80vh) pode então
            deslizar livremente dentro dessas ~200vh disponíveis. NUNCA
            usar items-start aqui — colapsaria a coluna esquerda ao
            tamanho do sticky child e o pin pararia de funcionar. */}
        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-20">
          {/* PINNED IMAGE — left column (stretches full row height) */}
          <div className="hidden lg:block relative">
            <div
              className="sticky aspect-[4/5] overflow-hidden border border-offwhite/12 bg-graphite-2"
              /* top = header height (84px) + breathing room */
              style={{ top: "104px", position: "sticky" }}
            >
              {FRAMES.map((frame, i) => {
                // Scroll-linked crossfade: opacity = 1 - distance to frame center.
                // Edge-clamp first/last so the image never goes below 1 at the
                // section start/end (avoids visible "dark" gap).
                const center = i + 0.5;
                const distance = Math.abs(frameP - center);
                let opacity = Math.max(0, 1 - distance);
                if (i === 0 && frameP < 0.5) opacity = 1;
                if (i === FRAMES.length - 1 && frameP > FRAMES.length - 0.5) opacity = 1;
                // Subtle parallax: image drifts -10..+10px within its window.
                const local = Math.max(-1, Math.min(1, frameP - i - 0.5));
                const parallaxY = local * -10;

                return (
                  <div
                    key={frame.img}
                    className="absolute inset-0"
                    style={{
                      opacity,
                      transform: `translate3d(0, ${parallaxY}px, 0) scale(1.04)`,
                      willChange: "opacity, transform",
                    }}
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
                );
              })}

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
