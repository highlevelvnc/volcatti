"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const FRAMES = [
  {
    title: "Estaleiro · Implantação",
    sub: "Levantamento técnico, marcação de cotas, validação com o cliente.",
    img: "/portfolio/espaco-comercial.png",
    label: "01 / 04",
  },
  {
    title: "Estrutura · Execução",
    sub: "Equipa própria, fornecedores certificados, controlo de qualidade diário.",
    img: "/portfolio/marquise.png",
    label: "02 / 04",
  },
  {
    title: "Acabamento · Detalhe",
    sub: "Mármores, carvalho, latão, cabos. Tudo pensado ao milímetro.",
    img: "/portfolio/wc-marmore.png",
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
 * Sticky scroll storytelling: text/image columns scroll together but the
 * image holder is sticky. Text on the right scrolls naturally; we detect
 * which "panel" is in view and swap the sticky image.
 */
export function StickyStorytelling() {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = Number((e.target as HTMLElement).dataset.idx);
            if (!Number.isNaN(idx)) setActive(idx);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    panelRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative bg-graphite text-offwhite overflow-hidden"
      style={{ paddingBlock: "clamp(48px, 5.5vw, 80px)" }}
    >
      <div className="max-w-container mx-auto px-5 md:px-8 lg:px-12">
        <header className="grid lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-20 items-end pb-8 lg:pb-12">
          <div className="flex flex-col gap-7">
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
          {/* Sticky image */}
          <div className="hidden lg:block">
            <div className="sticky top-24 aspect-[4/5] overflow-hidden border border-offwhite/12">
              {FRAMES.map((frame, i) => (
                <Image
                  key={frame.img}
                  src={frame.img}
                  alt={frame.title}
                  fill
                  loading="lazy"
                  quality={70}
                  sizes="50vw"
                  className={`object-cover transition-opacity duration-700 ease-out ${
                    active === i ? "opacity-100" : "opacity-0"
                  }`}
                  style={{ filter: "grayscale(15%) contrast(1.04)" }}
                />
              ))}
              {/* Frame label */}
              <span className="absolute top-5 left-5 z-[2] font-mono text-[0.65rem] tracking-[0.2em] uppercase text-offwhite/85 px-2.5 py-1 bg-graphite/55 backdrop-blur-sm">
                {FRAMES[active].label}
              </span>
              {/* Bottom gradient */}
              <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-graphite/85 to-transparent z-[1] pointer-events-none" />
            </div>
          </div>

          {/* Scrolling panels */}
          <div className="flex flex-col gap-12 lg:gap-32">
            {FRAMES.map((frame, i) => (
              <div
                key={frame.title}
                ref={(el) => {
                  panelRefs.current[i] = el;
                }}
                data-idx={i}
                className="lg:min-h-[60vh] flex flex-col justify-center"
              >
                {/* Mobile-only image */}
                <div className="lg:hidden mb-6 aspect-[4/5] overflow-hidden border border-offwhite/12 relative">
                  <Image src={frame.img} alt={frame.title} fill loading="lazy" quality={70} sizes="100vw" className="object-cover" />
                  <span className="absolute top-4 left-4 font-mono text-[0.6rem] tracking-[0.2em] uppercase text-offwhite/85 px-2 py-0.5 bg-graphite/55">
                    {frame.label}
                  </span>
                </div>

                <span className="font-mono text-[0.7rem] tracking-[0.2em] uppercase text-bronze mb-3">
                  {frame.label}
                </span>
                <h3 className="font-display font-normal text-offwhite leading-tight tracking-[-0.02em] mb-4" style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.4rem)" }}>
                  {frame.title}
                </h3>
                <p className="font-display font-light text-offwhite/75 max-w-[44ch]" style={{ fontSize: "clamp(1.05rem, 1.4vw, 1.2rem)", lineHeight: 1.55 }}>
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
