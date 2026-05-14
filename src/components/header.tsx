"use client";

import { useEffect, useState } from "react";
import { Logo } from "./logo";
import { NAV_LINKS, WHATSAPP_URL } from "@/lib/constants";
import { ArrowRight } from "./icons";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const onLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    const top = (target as HTMLElement).getBoundingClientRect().top + window.scrollY - 70;
    window.scrollTo({ top, behavior: "smooth" });
    setOpen(false);
  };

  return (
    <>
      <header
        data-state={scrolled ? "scrolled" : "top"}
        role="banner"
        className={`fixed top-0 left-0 right-0 z-[100] transition-[background,height,border-color] duration-500 ${
          scrolled
            ? "h-[72px] bg-offwhite/95 backdrop-blur-md border-b border-graphite/12"
            : "h-[84px] bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-container mx-auto px-5 md:px-8 lg:px-12 h-full flex items-center justify-between gap-8">
          <a href="#inicio" onClick={(e) => onLinkClick(e, "#inicio")} aria-label="Volcatti — início">
            <Logo light={!scrolled} />
          </a>

          <nav aria-label="Navegação principal" className="hidden lg:flex flex-1 justify-center">
            <ul className="flex items-center gap-7 xl:gap-9">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => onLinkClick(e, link.href)}
                    className={`relative inline-block py-2 text-[0.86rem] font-medium tracking-[0.02em] transition-colors duration-300 hover:text-bronze ${
                      scrolled ? "text-graphite" : "text-offwhite"
                    } after:content-[''] after:absolute after:left-0 after:bottom-1 after:h-px after:w-0 after:bg-bronze after:transition-[width] after:duration-300 hover:after:w-full`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <a
            href="#orcamento"
            onClick={(e) => onLinkClick(e, "#orcamento")}
            className={`hidden md:inline-flex btn ${
              scrolled
                ? "btn--primary"
                : "border-offwhite/45 text-offwhite hover:bg-offwhite hover:text-graphite"
            } !px-4 !py-3 !text-[0.78rem] !gap-2`}
          >
            <span>Pedir orçamento</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            className={`lg:hidden flex flex-col items-end justify-center w-8 h-8 gap-1.5 ${
              scrolled ? "text-graphite" : "text-offwhite"
            }`}
          >
            <span className={`block h-px bg-current transition-all duration-300 ${open ? "w-5 translate-y-[3.5px] rotate-45" : "w-5"}`} />
            <span className={`block h-px bg-current transition-all duration-300 ${open ? "w-5 -translate-y-[3.5px] -rotate-45" : "w-3.5"}`} />
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        aria-hidden={!open}
        className={`fixed inset-0 z-[90] bg-graphite text-offwhite px-6 pt-28 pb-10 flex flex-col justify-between transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden ${
          open ? "translate-y-0 visible pointer-events-auto" : "-translate-y-[110%] invisible pointer-events-none"
        }`}
      >
        <nav className="flex flex-col mt-8">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => onLinkClick(e, link.href)}
              className="font-display font-light text-3xl sm:text-4xl tracking-[-0.02em] py-4 border-b border-offwhite/10 transition-[color,padding] hover:text-bronze hover:pl-3"
              style={{ transitionDelay: open ? `${i * 40}ms` : "0ms" }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex flex-col gap-6">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener"
            className="btn btn--bronze !w-fit"
          >
            <span>Falar pelo WhatsApp</span>
          </a>
          <p className="font-mono text-[0.65rem] tracking-[0.18em] uppercase text-offwhite/50">
            Lisboa · Portugal
          </p>
        </div>
      </div>
    </>
  );
}
