import { PROCESS_STEPS } from "@/lib/constants";

export function Process() {
  return (
    <section
      id="processo"
      className="bg-offwhite-2 border-b border-graphite/12"
      style={{ paddingBlock: "clamp(80px, 11vw, 160px)" }}
    >
      <div className="max-w-container mx-auto px-5 md:px-8 lg:px-12">
        <header className="grid lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-20 items-end pb-12 lg:pb-20">
          <div className="flex flex-col gap-7">
            <div data-reveal className="section-index">
              <span className="section-index__num">07</span>
              <span className="section-index__label">Processo</span>
            </div>
            <h2 className="display">
              <span data-reveal="line"><span>Um método claro,</span></span>
              <span data-reveal="line" data-d="100"><span>do <em>primeiro contacto</em></span></span>
              <span data-reveal="line" data-d="200"><span>à entrega final.</span></span>
            </h2>
          </div>
          <p data-reveal data-d="300" className="font-display font-light text-graphite/80 max-w-[44ch]" style={{ fontSize: "clamp(1.05rem, 1.4vw, 1.25rem)", lineHeight: 1.5 }}>
            Trabalhamos por fases, com pontos de validação que mantêm o cliente
            informado e o projeto sob controlo — orçamento, prazos e qualidade.
          </p>
        </header>

        <ol
          data-reveal
          className="timeline-track relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-y-8 lg:gap-y-0 sm:border-t sm:border-graphite/12 before:content-[''] before:absolute before:top-0 before:left-0 before:h-0.5 before:w-full before:bg-bronze before:scale-x-0 before:origin-left"
        >
          {PROCESS_STEPS.map((step, i) => (
            <li
              key={step.num}
              className="relative flex flex-col gap-3 pt-9 px-5 lg:pl-0 lg:pr-6"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <span className="absolute top-0 left-5 lg:left-0 -translate-y-1/2 w-3 h-3 bg-bronze rounded-full" style={{ outline: "4px solid #ECE7DC" }} />
              <span
                className="font-display font-light leading-none tracking-[-0.04em] text-graphite"
                style={{ fontSize: "clamp(2rem, 3.4vw, 2.8rem)" }}
              >
                {step.num}
              </span>
              <h3 className="font-display font-normal text-[1.2rem] tracking-[-0.01em]">{step.title}</h3>
              <p className="text-[0.92rem] leading-relaxed text-graphite/75 max-w-[28ch]">
                {step.blurb}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
