"use client";

import { useState } from "react";
import { GhostNumber } from "./ghost-number";

const FAQS = [
  {
    q: "Como funciona o pedido de orçamento?",
    a: "Recebemos o seu contacto, marcamos uma visita técnica gratuita e enviamos uma proposta detalhada por escrito em até 5 dias úteis — organizada por capítulos, com prazos, materiais e valores claros.",
  },
  {
    q: "Quanto demora uma obra de remodelação?",
    a: "Depende da escala. Uma WC remodelada demora 15–25 dias úteis, uma cozinha 25–40, um apartamento T2 cerca de 8–12 semanas. No orçamento entregamos um cronograma com pontos de validação e mantemo-lo cumprido.",
  },
  {
    q: "Existe garantia sobre os trabalhos?",
    a: "Sim. Garantia de 5 anos sobre estrutura e impermeabilização, 2 anos sobre instalações elétricas e canalização, e 1 ano sobre acabamentos. Tudo por escrito no contrato.",
  },
  {
    q: "Trabalham com fornecedores próprios ou aceitam materiais que eu compre?",
    a: "Ambos. Temos fornecedores certificados com preços de profissional, mas se preferir adquirir os materiais por conta integramos no orçamento sem custos extra de gestão.",
  },
  {
    q: "Tratam de licenças e legalizações?",
    a: "Sim — quando a obra exige licenciamento ou comunicação prévia à câmara, tratamos do processo completo, incluindo desenhos técnicos e acompanhamento do pedido.",
  },
  {
    q: "Quais zonas servem?",
    a: "Trabalhamos em toda a Grande Lisboa (Lisboa, Cascais, Sintra, Oeiras, Loures, Mafra) e Setúbal. Para projetos de maior escala, deslocamo-nos a outras zonas do país.",
  },
  {
    q: "Como decorre o pagamento?",
    a: "Pagamento por etapas mediante validação. Tipicamente: 30% adjudicação, 30% meio da obra, 30% antes da entrega final, 10% após vistoria conjunta. Sempre com fatura.",
  },
  {
    q: "Têm seguro de obra?",
    a: "Sim — seguro de responsabilidade civil profissional e seguro de acidentes de trabalho para toda a equipa. Documentos disponíveis a pedido.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      className="relative bg-offwhite-2 border-b border-graphite/12 overflow-hidden"
      style={{ paddingBlock: "clamp(80px, 11vw, 160px)" }}
    >
      <GhostNumber num="?" position="left" />

      <div className="relative max-w-container mx-auto px-5 md:px-8 lg:px-12">
        <header className="grid lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-20 items-end pb-12 lg:pb-20">
          <div className="flex flex-col gap-7">
            <div data-reveal className="section-index">
              <span className="section-index__num">∗</span>
              <span className="section-index__label">Perguntas Frequentes</span>
            </div>
            <h2 className="display">
              <span data-reveal="line"><span>O que costumam</span></span>
              <span data-reveal="line" data-d="100"><span><em>perguntar-nos.</em></span></span>
            </h2>
          </div>
          <p data-reveal data-d="200" className="font-display font-light text-graphite/75 max-w-[44ch]" style={{ fontSize: "clamp(1.05rem, 1.4vw, 1.25rem)", lineHeight: 1.5 }}>
            Respostas diretas às dúvidas mais comuns. Falta alguma?
            <a href="#orcamento" className="text-bronze underline-offset-4 hover:underline ml-1" data-cursor="Falar →">
              Pergunte-nos.
            </a>
          </p>
        </header>

        <ul className="border-t border-graphite/15 max-w-[920px]">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.q} className="border-b border-graphite/15">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  data-cursor={isOpen ? "Fechar" : "Abrir"}
                  className="w-full flex items-start justify-between gap-6 py-7 lg:py-8 text-left group"
                >
                  <div className="flex items-baseline gap-5 lg:gap-7 flex-1">
                    <span className="font-mono text-[0.7rem] tracking-[0.18em] text-bronze pt-1.5 flex-shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`font-display font-normal tracking-[-0.01em] leading-tight transition-colors duration-300 ${
                        isOpen ? "text-bronze" : "text-graphite group-hover:text-bronze"
                      }`}
                      style={{ fontSize: "clamp(1.2rem, 1.8vw, 1.55rem)" }}
                    >
                      {item.q}
                    </span>
                  </div>
                  <span
                    className={`relative flex-shrink-0 w-6 h-6 mt-2 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isOpen ? "rotate-45" : "rotate-0"
                    }`}
                    aria-hidden="true"
                  >
                    <span className="absolute top-1/2 left-0 right-0 h-px bg-bronze -translate-y-1/2" />
                    <span className="absolute left-1/2 top-0 bottom-0 w-px bg-bronze -translate-x-1/2" />
                  </span>
                </button>

                <div
                  className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="pl-9 lg:pl-12 pb-8 max-w-[64ch]">
                      <p className="font-display font-light text-graphite/85 leading-relaxed" style={{ fontSize: "clamp(1rem, 1.3vw, 1.15rem)" }}>
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
