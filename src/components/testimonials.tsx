import { TESTIMONIALS } from "@/lib/constants";

export function Testimonials() {
  return (
    <section
      className="texture-concrete bg-offwhite-2 border-b border-graphite/12"
      style={{ paddingBlock: "clamp(80px, 11vw, 160px)" }}
    >
      <div className="max-w-container mx-auto px-5 md:px-8 lg:px-12">
        <header className="grid lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-20 items-end pb-12 lg:pb-20">
          <div className="flex flex-col gap-7">
            <div data-reveal className="section-index">
              <span className="section-index__num">∗</span>
              <span className="section-index__label">Testemunhos</span>
            </div>
            <h2 className="display">
              <span data-reveal="line"><span>O que os clientes</span></span>
              <span data-reveal="line" data-d="100"><span><em>dizem da Volcatti.</em></span></span>
            </h2>
          </div>
        </header>

        <div className="grid lg:grid-cols-3 gap-5 lg:gap-9">
          {TESTIMONIALS.map((q, i) => (
            <figure
              key={q.name}
              data-reveal
              data-d={i * 120}
              className="group relative p-8 sm:p-10 lg:p-12 bg-offwhite border border-graphite/12 flex flex-col gap-6 transition-[transform,border-color] duration-500 hover:-translate-y-1.5 hover:border-bronze"
            >
              <span className="font-display font-light text-5xl lg:text-6xl text-bronze block leading-none">"</span>
              <blockquote>
                <p className="font-display font-light text-graphite leading-relaxed" style={{ fontSize: "clamp(1.05rem, 1.4vw, 1.2rem)" }}>
                  {q.quote}
                </p>
              </blockquote>
              <figcaption className="flex flex-col gap-1 mt-auto pt-4 border-t border-graphite/12">
                <span className="font-sans text-[0.95rem] font-medium text-graphite">{q.name}</span>
                <span className="font-mono text-[0.7rem] tracking-[0.14em] uppercase text-graphite/55">
                  {q.role}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
