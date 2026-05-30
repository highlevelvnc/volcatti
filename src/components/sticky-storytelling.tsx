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
 * Sticky scroll storytelling — scroll-linked crossfade.
 * Progress 0..1 is computed continuously from the container's scroll
 * position relative to the viewport. The sticky image crossfades
 * fluidly between frames as you scroll, with subtle parallax and a
 * bronze progress bar at the top. Much more responsive than the
 * previous discrete IntersectionObserver fade.
 */
export function StickyStorytelling() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Respect reduced-motion preference — fall back to discrete steps
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
      // Snap to discrete frames if reduced motion
      if (reduce) {
        const idx = Math.min(FRAMES.length - 1, Math.floor(p * FRAMES.length));
        setProgress((idx + 0.5) / FRAMES.length);
      } else {
        setProgress(p);
      }
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

  const frameP = progress * FRAMES.length; // 0..N
  const activeIndex = Math.min(
    FRAMES.length - 1,
    Math.max(0, Math.floor(frameP)),
  );

  return (
    <section
      ref={containerRef}
      className="relative bg-graphite text-offwhite overflow-hidden"
      style={{ paddingBlock: "clamp(48px, 5.5vw, 80px)" }}
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

        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-20">
          {/* Sticky image — scroll-linked crossfade + parallax */}
          <div className="hidden lg:block">
            <div className="sticky top-24 aspect-[4/5] overflow-hidden border border-offwhite/12 relative bg-graphite-2">
              {FRAMES.map((frame, i) => {
                const center = i + 0.5;
                const distance = Math.abs(frameP - center);
                let opacity = Math.max(0, 1 - distance);
                // Edge clamp: keep first/last frame solid at start/end
                if (i === 0 && frameP < 0.5) opacity = 1;
                if (i === FRAMES.length - 1 && frameP > FRAMES.length - 0.5) opacity = 1;
                // Subtle parallax: image drifts -16..+16px through its window
                const local = Math.max(-1, Math.min(1, frameP - i - 0.5));
                const parallaxY = local * -16;

                return (
                  <Image
                    key={frame.img}
                    src={frame.img}
                    alt={frame.title}
                    fill
                    loading={i === 0 ? "eager" : "lazy"}
                    priority={i === 0}
                    quality={72}
                    sizes="50vw"
                    className="object-cover"
                    style={{
                      opacity,
                      transform: `translate3d(0, ${parallaxY}px, 0) scale(1.06)`,
                      filter: "grayscale(15%) contrast(1.04)",
                      willChange: "opacity, transform",
                    }}
                  />
                );
              })}

              {/* Top progress bar — bronze, follows scroll */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-offwhite/10 z-[3] overflow-hidden">
                <span
                  className="absolute top-0 left-0 h-full w-full bg-bronze origin-left"
                  style={{
                    transform: `scaleX(${progress})`,
                    willChange: "transform",
                  }}
                />
              </div>

              {/* Frame label — updates with active */}
              <span className="absolute top-5 left-5 z-[2] font-mono text-[0.65rem] tracking-[0.2em] uppercase text-offwhite/90 px-2.5 py-1 bg-graphite/65 backdrop-blur-sm border border-offwhite/10">
                {FRAMES[activeIndex].label}
              </span>

              {/* Progress percentage — bronze */}
              <span className="absolute top-5 right-5 z-[2] font-mono text-[0.6rem] tracking-[0.18em] uppercase text-bronze px-2 py-1 bg-graphite/65 backdrop-blur-sm border border-bronze/35">
                {Math.round(progress * 100).toString().padStart(2, "0")}%
              </span>

              {/* Active title overlay — sits at the bottom of the image */}
              <div className="absolute bottom-0 left-0 right-0 z-[2] px-5 pb-5 pt-16 bg-gradient-to-t from-graphite/95 via-graphite/50 to-transparent pointer-events-none">
                <span className="block font-mono text-[0.58rem] tracking-[0.2em] uppercase text-bronze mb-1">
                  ▸ Fase em curso
                </span>
                <span className="block font-display font-light text-offwhite tracking-[-0.01em]" style={{ fontSize: "1.4rem", lineHeight: 1.15 }}>
                  {FRAMES[activeIndex].title}
                </span>
              </div>

              {/* Vertical dot indicator — right side */}
              <div className="absolute right-3 top-1/2 -translate-y-1/2 z-[2] flex flex-col gap-2.5">
                {FRAMES.map((_, j) => (
                  <span
                    key={j}
                    className={`block w-[6px] rounded-full transition-all duration-500 ${
                      activeIndex === j
                        ? "bg-bronze h-6"
                        : j < activeIndex
                          ? "bg-bronze/45 h-2"
                          : "bg-offwhite/25 h-2"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Scrolling panels */}
          <div className="flex flex-col gap-12 lg:gap-32">
            {FRAMES.map((frame, i) => (
              <div
                key={frame.title}
                data-idx={i}
                className="lg:min-h-[60vh] flex flex-col justify-center"
              >
                {/* Mobile-only image */}
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
                        activeIndex === j ? "bg-bronze w-12" : "bg-offwhite/25 w-6"
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
