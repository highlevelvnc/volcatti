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
      style={{ paddingBlock: "clamp(48px, 5.5vw, 80px)" }}
    >
      <GhostNumber num="06" position="left" />

      <div className="relative max-w-container mx-auto px-5 md:px-8 lg:px-12">
        <header className="grid lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-20 items-center pb-8 lg:pb-12">
          <div className="flex flex-col gap-7 items-center text-center lg:items-start lg:text-left">
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
                  loading="lazy"
                  quality={70}
                  sizes="(min-width:1024px) 25vw, 50vw"
                  className="object-cover transition-[transform,filter] duration-1000 ease-out group-hover:scale-[1.06] volcatti-look"
                />

                {/* Always-on gradient — gives every tile readable text without hover */}
                <span
                  className="absolute inset-0 pointer-events-none transition-opacity duration-500 group-hover:opacity-0"
                  style={{ background: "linear-gradient(180deg, rgba(17,17,17,0) 55%, rgba(17,17,17,0.78) 100%)" }}
                />

                {/* Number stamp top-left */}
                <span className="absolute top-3 left-3 font-mono text-[0.55rem] tracking-[0.18em] uppercase text-offwhite/90 px-1.5 py-0.5 bg-graphite/55 backdrop-blur-sm z-[2]">
                  N.º {String(i + 1).padStart(2, "0")}
                </span>

                {/* Category badge top-right — always visible */}
                <span className="absolute top-3 right-3 font-mono text-[0.55rem] tracking-[0.18em] uppercase text-bronze px-1.5 py-0.5 border border-bronze/55 backdrop-blur-sm z-[2]">
                  {GALLERY_FILTERS.find((f) => f.value === item.cat)?.label}
                </span>

                {/* Title — always visible (subtle), full info on hover */}
                <span
                  className="absolute bottom-0 left-0 right-0 flex flex-col justify-end p-4 lg:p-5 text-offwhite z-[1]"
                  style={{ background: "linear-gradient(180deg, rgba(17,17,17,0) 0%, rgba(17,17,17,0.88) 80%)" }}
                >
                  <span className="font-display font-normal text-base lg:text-lg tracking-[-0.01em] leading-tight">
                    {item.title}
                  </span>
                  <span className="overflow-hidden max-h-0 opacity-0 transition-[max-height,opacity,margin-top] duration-500 ease-out group-hover:max-h-12 group-hover:opacity-100 group-hover:mt-2 flex flex-wrap gap-x-3 gap-y-0.5 font-mono text-[0.58rem] tracking-[0.14em] uppercase text-offwhite/75">
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
