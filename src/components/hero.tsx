"use client";

import Image from "next/image";
import { ArrowRight } from "./icons";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-[100svh] flex items-end overflow-hidden text-offwhite isolate texture-grain"
      style={{ paddingTop: "calc(var(--header-h) + 60px)", paddingBottom: "clamp(60px, 8vw, 120px)" }}
    >
      {/* Background image with parallax via CSS zoom */}
      <div className="absolute inset-0 -z-[2]">
        <Image
          src="/portfolio/piscina-noturna.png"
          alt="Piscina iluminada de noite num projeto Volcatti em Lisboa"
          fill
          priority
          fetchPriority="high"
          quality={90}
          sizes="100vw"
          className="object-cover hero-zoom"
          style={{ objectPosition: "center 30%" }}
        />
      </div>

      {/* Overlay */}
      <div
        className="absolute inset-0 -z-[1]"
        style={{
          background:
            "linear-gradient(180deg, rgba(17,17,17,0.78) 0%, rgba(17,17,17,0.42) 35%, rgba(17,17,17,0.86) 100%), linear-gradient(90deg, rgba(23,50,56,0.5) 0%, rgba(17,17,17,0) 60%)",
        }}
      />

      {/* Architectural blueprint corner lines */}
      <svg
        className="absolute inset-0 w-full h-full -z-[1] pointer-events-none"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <line x1="0" y1="120" x2="1440" y2="120" stroke="rgba(244,241,234,0.16)" strokeWidth="1" strokeDasharray="1500" strokeDashoffset="1500" className="draw-line" />
        <line x1="120" y1="0" x2="120" y2="900" stroke="rgba(244,241,234,0.16)" strokeWidth="1" strokeDasharray="1500" strokeDashoffset="1500" className="draw-line" style={{ animationDelay: "200ms" }} />
        <line x1="1320" y1="0" x2="1320" y2="900" stroke="rgba(244,241,234,0.16)" strokeWidth="1" strokeDasharray="1500" strokeDashoffset="1500" className="draw-line" style={{ animationDelay: "400ms" }} />
        <line x1="0" y1="780" x2="1440" y2="780" stroke="rgba(244,241,234,0.16)" strokeWidth="1" strokeDasharray="1500" strokeDashoffset="1500" className="draw-line" style={{ animationDelay: "600ms" }} />
        <circle cx="120" cy="120" r="3" fill="#B88A2A" />
        <circle cx="1320" cy="120" r="3" fill="#B88A2A" />
        <circle cx="120" cy="780" r="3" fill="#B88A2A" />
        <circle cx="1320" cy="780" r="3" fill="#B88A2A" />
      </svg>

      <div className="relative z-[1] max-w-container w-full mx-auto px-5 md:px-8 lg:px-12">
        {/* Eyebrow */}
        <div data-reveal className="flex items-center gap-4 mb-9 font-mono text-[0.72rem] tracking-[0.18em] uppercase text-offwhite/72">
          <span className="text-bronze font-medium">N.º 01</span>
          <span className="inline-block w-7 h-px bg-offwhite/40" />
          <span>Construção & Remodelação Premium</span>
        </div>

        {/* Title — line-by-line reveal */}
        <h1 className="font-display font-light leading-none tracking-[-0.03em] text-offwhite mb-9 sm:mb-11 max-w-[18ch]" style={{ fontSize: "clamp(2.6rem, 7vw, 6.4rem)" }}>
          <span data-reveal="line"><span>Construção, Remodelação,</span></span>
          <span data-reveal="line" data-d="100"><span>Piscinas e Elétrica</span></span>
          <span data-reveal="line" data-d="200" className="inline-block">
            <span className="inline-block sm:pl-[6vw] xl:pl-[90px]">
              <em className="not-italic italic font-light text-bronze">com Precisão.</em>
            </span>
          </span>
        </h1>

        {/* Subtitle */}
        <p
          data-reveal
          data-d="300"
          className="font-display font-light text-offwhite/85 mb-12 sm:mb-14 max-w-[52ch]"
          style={{ fontSize: "clamp(1.05rem, 1.4vw, 1.25rem)", lineHeight: 1.55 }}
        >
          Soluções completas para transformar espaços com qualidade, segurança
          e acabamento profissional — do primeiro traço à entrega final.
        </p>

        {/* Actions */}
        <div data-reveal data-d="400" className="flex flex-wrap gap-3.5 mb-14 sm:mb-16">
          <a href="#orcamento" className="btn btn--primary btn--lg">
            <span>Pedir orçamento</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
          <a href="#servicos" className="btn btn--ghost btn--ghost-light btn--lg">
            <span>Ver serviços</span>
          </a>
        </div>

        {/* Tags */}
        <ul data-reveal data-d="500" className="flex flex-wrap gap-5 sm:gap-9 font-mono text-[0.72rem] tracking-[0.16em] uppercase text-offwhite/78">
          {["Construção Civil", "Remodelações", "Piscinas", "Elétrica"].map((t) => (
            <li key={t} className="inline-flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 bg-bronze rounded-full" />
              {t}
            </li>
          ))}
        </ul>
      </div>

      {/* Corner labels */}
      <span className="hidden lg:block absolute left-12 bottom-8 z-[1] font-mono text-[0.66rem] tracking-[0.18em] uppercase text-offwhite/50">
        38° 43′ N · 9° 08′ W
      </span>
      <span className="hidden lg:block absolute right-12 top-[calc(var(--header-h)+18px)] z-[1] font-mono text-[0.66rem] tracking-[0.18em] uppercase text-offwhite/50">
        EST. 2014
      </span>

      {/* Scroll indicator */}
      <div className="hidden md:flex absolute bottom-8 right-12 z-[1] flex-col items-center gap-3.5 font-mono text-[0.7rem] tracking-[0.18em] uppercase text-offwhite/65 [writing-mode:vertical-rl] [transform:rotate(180deg)]">
        <span>Descer</span>
        <span className="block w-px h-[60px] bg-gradient-to-b from-transparent to-bronze scroll-line-indicator" />
      </div>
    </section>
  );
}
