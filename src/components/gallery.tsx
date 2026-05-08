"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { GALLERY, GALLERY_FILTERS } from "@/lib/constants";
import { GhostNumber } from "./ghost-number";

type FilterValue = (typeof GALLERY_FILTERS)[number]["value"];

export function Gallery() {
  const [filter, setFilter] = useState<FilterValue>("all");

  return (
    <section
      id="obras"
      className="relative bg-offwhite border-b border-graphite/12 overflow-hidden"
      style={{ paddingBlock: "clamp(80px, 11vw, 160px)" }}
    >
      <GhostNumber num="06" position="left" />

      <div className="relative max-w-container mx-auto px-5 md:px-8 lg:px-12">
        <header className="grid lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-20 items-center pb-12 lg:pb-20">
          <div className="flex flex-col gap-7">
            <div data-reveal className="section-index">
              <span className="section-index__num">06</span>
              <span className="section-index__label">Obras</span>
            </div>
            <h2 className="display">
              <span data-reveal="line"><span>Obras que mostram</span></span>
              <span data-reveal="line" data-d="100"><span>a qualidade <em>em cada detalhe.</em></span></span>
            </h2>
          </div>

          <div data-reveal data-d="200" className="flex flex-wrap gap-1 items-center" role="tablist">
            {GALLERY_FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                data-cursor={f.label}
                className={`px-4 py-2.5 font-mono text-[0.72rem] tracking-[0.14em] uppercase border transition-all duration-300 ${
                  filter === f.value
                    ? "text-graphite border-graphite"
                    : "text-graphite/55 border-transparent hover:text-graphite hover:border-graphite/12"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </header>

        <div className="grid grid-cols-2 lg:grid-cols-4 auto-rows-[220px] gap-3">
          {GALLERY.map((item, i) => {
            const visible = filter === "all" || item.cat === filter;
            const sizeClass = item.size === "tall" ? "row-span-2" : item.size === "wide" ? "col-span-2" : "";
            return (
              <Link
                key={item.src}
                href={`/obras/${item.slug}`}
                data-reveal
                data-d={i * 60}
                data-cursor="Ver obra →"
                aria-label={`Ver obra: ${item.title} em ${item.location}`}
                className={`group relative overflow-hidden bg-graphite block ${sizeClass} ${
                  visible ? "" : "hidden"
                }`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(min-width:1024px) 25vw, 50vw"
                  className="object-cover transition-[transform,filter] duration-1000 ease-out group-hover:scale-[1.06]"
                  style={{ filter: "grayscale(15%) contrast(1.04)" }}
                />

                <span className="absolute top-3 left-3 font-mono text-[0.55rem] tracking-[0.18em] uppercase text-offwhite/90 px-1.5 py-0.5 bg-graphite/55 backdrop-blur-sm">
                  N.º {String(i + 1).padStart(2, "0")}
                </span>

                <span
                  className="absolute inset-0 flex flex-col justify-end p-5 text-offwhite opacity-0 translate-y-3 transition-[opacity,transform] duration-500 group-hover:opacity-100 group-hover:translate-y-0"
                  style={{ background: "linear-gradient(180deg, rgba(17,17,17,0) 35%, rgba(17,17,17,0.92) 100%)" }}
                >
                  <span className="font-mono text-[0.62rem] tracking-[0.2em] uppercase text-bronze mb-1.5">
                    {GALLERY_FILTERS.find((f) => f.value === item.cat)?.label}
                  </span>
                  <span className="font-display font-normal text-lg lg:text-xl tracking-[-0.01em] mb-2">
                    {item.title}
                  </span>
                  <span className="flex flex-wrap gap-x-3 gap-y-0.5 font-mono text-[0.6rem] tracking-[0.14em] uppercase text-offwhite/70">
                    {item.area && <span><span className="text-bronze">▸</span> {item.area}</span>}
                    {item.location && <span><span className="text-bronze">▸</span> {item.location}</span>}
                    {item.year && <span><span className="text-bronze">▸</span> {item.year}</span>}
                  </span>
                </span>
              </Link>
            );
          })}
        </div>

        <div className="mt-12 flex items-center justify-between gap-4 pt-8 border-t border-graphite/12 font-mono text-[0.7rem] tracking-[0.16em] uppercase text-graphite/55">
          <span>Total · {GALLERY.length} obras</span>
          <span className="hidden sm:block">Mais projetos sob pedido</span>
          <a href="#orcamento" className="text-graphite hover:text-bronze transition-colors duration-300" data-cursor="Falar →">
            Falar com a Volcatti →
          </a>
        </div>
      </div>
    </section>
  );
}
