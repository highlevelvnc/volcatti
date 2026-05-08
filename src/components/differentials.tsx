import { DIFFERENTIALS } from "@/lib/constants";

export function Differentials() {
  return (
    <section
      className="texture-concrete bg-offwhite border-b border-graphite/12"
      style={{ paddingBlock: "clamp(80px, 11vw, 160px)" }}
    >
      <div className="max-w-container mx-auto px-5 md:px-8 lg:px-12">
        <header className="grid lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-20 items-end pb-12 lg:pb-20">
          <div className="flex flex-col gap-7">
            <div data-reveal className="section-index">
              <span className="section-index__num">08</span>
              <span className="section-index__label">Diferenciais</span>
            </div>
            <h2 className="display">
              <span data-reveal="line"><span>Porquê escolher</span></span>
              <span data-reveal="line" data-d="100"><span><em>a Volcatti.</em></span></span>
            </h2>
          </div>
        </header>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-graphite/12 border border-graphite/12">
          {DIFFERENTIALS.map((d, i) => (
            <article
              key={d.num}
              data-reveal
              data-d={i * 80}
              className="group relative bg-offwhite p-7 sm:p-9 lg:p-11 flex flex-col gap-3.5 transition-colors duration-500 hover:bg-offwhite-2"
            >
              <span className="absolute top-0 left-0 w-8 h-px bg-bronze transition-[width] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-20" />
              <span className="font-mono text-[0.72rem] tracking-[0.16em] text-bronze">{d.num}</span>
              <h3 className="font-display font-normal tracking-[-0.01em]" style={{ fontSize: "clamp(1.3rem, 1.8vw, 1.5rem)" }}>
                {d.title}
              </h3>
              <p className="text-[0.95rem] leading-relaxed text-graphite/75 max-w-[30ch]">{d.blurb}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
