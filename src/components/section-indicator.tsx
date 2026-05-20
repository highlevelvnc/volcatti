"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "inicio",    label: "Hero",         num: "01" },
  { id: "sobre",     label: "Posicionamento", num: "02" },
  { id: "servicos",  label: "Serviços",     num: "03" },
  { id: "obras",     label: "Obras",        num: "04" },
  { id: "processo",  label: "Processo",     num: "05" },
  { id: "orcamento", label: "Orçamento",    num: "06" },
];

/**
 * Vertical sheet indicator — fixed on the right side of the viewport,
 * shows the current section like a blueprint sheet number (06/06).
 * Hides on mobile, hides during hero (so the hero stays clean).
 */
export function SectionIndicator() {
  const [active, setActive] = useState<string>("inicio");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (!el) return;
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) setActive(s.id);
          });
        },
        { threshold: 0.3, rootMargin: "-30% 0px -50% 0px" },
      );
      io.observe(el);
      observers.push(io);
    });

    const onScroll = () => {
      // Show indicator once user has scrolled past the hero
      const hero = document.getElementById("inicio");
      if (!hero) return;
      const heroBottom = hero.getBoundingClientRect().bottom;
      setVisible(heroBottom < window.innerHeight * 0.3);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observers.forEach((o) => o.disconnect());
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const activeIdx = SECTIONS.findIndex((s) => s.id === active);
  const activeNum = SECTIONS[activeIdx]?.num ?? "01";
  const activeLabel = SECTIONS[activeIdx]?.label ?? "Hero";

  return (
    <aside
      aria-hidden="true"
      className={`fixed right-6 top-1/2 -translate-y-1/2 z-[60] hidden xl:flex flex-col items-end gap-3 pointer-events-none transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <span className="font-mono text-[0.58rem] tracking-[0.24em] uppercase text-graphite/55">
        Folha
      </span>

      {/* Ticks */}
      <div className="flex flex-col items-end gap-2.5">
        {SECTIONS.map((s, i) => (
          <div key={s.id} className="flex items-center gap-2.5">
            <span
              className={`font-mono text-[0.55rem] tracking-[0.18em] uppercase transition-opacity duration-300 ${
                active === s.id ? "opacity-100 text-bronze" : "opacity-0"
              }`}
            >
              {s.label}
            </span>
            <span
              className={`block h-px transition-[width,background-color] duration-500 ${
                active === s.id ? "bg-bronze w-7" : "bg-graphite/35 w-3"
              }`}
            />
            <span
              className={`font-mono text-[0.55rem] tracking-[0.16em] w-5 text-right transition-colors duration-300 ${
                active === s.id ? "text-bronze" : i < activeIdx ? "text-graphite/60" : "text-graphite/25"
              }`}
            >
              {s.num}
            </span>
          </div>
        ))}
      </div>

      {/* Current — big sheet */}
      <div className="mt-3 flex items-baseline gap-1 font-display font-light text-graphite tracking-[-0.03em] leading-none">
        <span className="text-bronze text-3xl">{activeNum}</span>
        <span className="text-graphite/40 text-sm">/ {SECTIONS.length.toString().padStart(2, "0")}</span>
      </div>
    </aside>
  );
}
