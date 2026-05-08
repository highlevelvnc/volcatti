"use client";

import Image from "next/image";
import { useState } from "react";
import { GALLERY, GALLERY_FILTERS } from "@/lib/constants";

type FilterValue = (typeof GALLERY_FILTERS)[number]["value"];

export function Gallery() {
  const [filter, setFilter] = useState<FilterValue>("all");

  return (
    <section
      id="obras"
      className="bg-offwhite border-b border-graphite/12"
      style={{ paddingBlock: "clamp(80px, 11vw, 160px)" }}
    >
      <div className="max-w-container mx-auto px-5 md:px-8 lg:px-12">
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
                className={`px-4 py-2.5 font-mono text-[0.72rem] tracking-[0.14em] uppercase border transition-all duration-300 ${
                  filter === f.value
                    ? "text-graphite border-graphite"
                    : "text-graphite/60 border-transparent hover:text-graphite hover:border-graphite/12"
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
              <a
                key={item.src}
                href="#orcamento"
                data-reveal
                data-d={i * 60}
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
                <span className="absolute inset-0 flex flex-col justify-end p-5 text-offwhite opacity-0 translate-y-5 transition-[opacity,transform] duration-500 group-hover:opacity-100 group-hover:translate-y-0" style={{ background: "linear-gradient(180deg, rgba(17,17,17,0) 50%, rgba(17,17,17,0.86) 100%)" }}>
                  <span className="font-mono text-[0.66rem] tracking-[0.18em] uppercase text-bronze mb-1.5">
                    {GALLERY_FILTERS.find((f) => f.value === item.cat)?.label}
                  </span>
                  <span className="font-display font-normal text-xl tracking-[-0.01em]">{item.title}</span>
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
