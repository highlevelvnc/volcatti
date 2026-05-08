import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  num: string;
  kicker: string;
  title: string;
  subtitle?: string;
  updated?: string;
  children: ReactNode;
};

/**
 * Shared layout for /privacidade /termos /cookies — minimal, editorial
 * tipo "white paper" da agência. Off-white bg + index + content
 * that uses .legal-prose styles defined in globals.css.
 */
export function LegalPage({ num, kicker, title, subtitle, updated, children }: Props) {
  return (
    <main className="bg-offwhite pt-[calc(var(--header-h)+40px)] pb-24">
      <article className="max-w-container mx-auto px-5 md:px-8 lg:px-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-[0.7rem] tracking-[0.18em] uppercase text-graphite/55 hover:text-bronze transition-colors duration-300 mb-10"
          data-cursor="Voltar"
        >
          <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
            <path d="M14 8 H 2 M 7 3 L 2 8 L 7 13" stroke="currentColor" strokeWidth="1.4" fill="none" />
          </svg>
          Início
        </Link>

        <header className="grid lg:grid-cols-[1fr_2fr] gap-8 lg:gap-16 pb-12 lg:pb-16 border-b border-graphite/15">
          <div>
            <span className="font-mono text-[0.72rem] tracking-[0.22em] uppercase text-bronze block mb-5">
              N.º {num} · {kicker}
            </span>
            {updated && (
              <span className="font-mono text-[0.65rem] tracking-[0.16em] uppercase text-graphite/50">
                Atualizado · {updated}
              </span>
            )}
          </div>
          <div>
            <h1
              className="font-display font-light leading-[1] tracking-[-0.025em] text-graphite mb-6"
              style={{ fontSize: "clamp(2.4rem, 6vw, 4.8rem)" }}
            >
              {title}
            </h1>
            {subtitle && (
              <p className="font-display font-light text-graphite/80 max-w-[60ch]" style={{ fontSize: "clamp(1.1rem, 1.5vw, 1.35rem)", lineHeight: 1.55 }}>
                {subtitle}
              </p>
            )}
          </div>
        </header>

        <div className="grid lg:grid-cols-[1fr_2fr] gap-8 lg:gap-16 pt-12 lg:pt-16">
          <aside className="hidden lg:block">
            <div className="sticky top-32 font-mono text-[0.65rem] tracking-[0.16em] uppercase text-graphite/50">
              ▸ Documento legal
            </div>
          </aside>
          <div className="legal-prose max-w-[68ch]">{children}</div>
        </div>
      </article>
    </main>
  );
}
