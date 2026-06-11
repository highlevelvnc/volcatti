/**
 * Homepage FAQ data — shared between client component (Faq) and server
 * component (FaqSchema, for JSON-LD). Lives in its own module so the
 * server component doesn't accidentally pull in the "use client" boundary.
 */

export const FAQS_HOME = [
  {
    q: "Como funciona o pedido de orçamento?",
    a: "Recebemos o seu contacto, marcamos uma visita técnica gratuita e enviamos uma proposta detalhada por escrito em até 10 dias úteis — organizada por capítulos, com prazos, materiais e valores claros.",
  },
  {
    q: "Quanto demora uma obra de remodelação?",
    a: "Depende da escala. Uma WC remodelada demora 15–25 dias úteis, uma cozinha 25–40, um apartamento T2 cerca de 8–12 semanas. No orçamento entregamos um cronograma com pontos de validação e mantemo-lo cumprido.",
  },
  {
    q: "Existe garantia sobre os trabalhos?",
    a: "Sim. As condições de garantia são definidas por mútuo acordo e ficam por escrito no contrato, em função do âmbito da obra — podendo ir até 5 anos sobre estrutura e impermeabilização. Acabamentos e instalações têm períodos próprios, sempre acordados antes de iniciar.",
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
    a: "Servimos todo o território nacional. A nossa base operacional é a Grande Lisboa (Lisboa, Cascais, Sintra, Oeiras, Loures, Mafra) e Setúbal — intervenções fora desta área incluem deslocação técnica, orçamentada de forma transparente em função da distância, logística e duração da obra.",
  },
  {
    q: "Como decorre o pagamento?",
    a: "Pagamento por etapas mediante validação. Tipicamente: 30% adjudicação, 30% meio da obra, 30% antes da entrega final, 10% após vistoria conjunta. Sempre com fatura.",
  },
  {
    q: "Têm seguro de obra?",
    a: "Sim — seguro de responsabilidade civil profissional e seguro de acidentes de trabalho para toda a equipa. Documentos disponíveis a pedido.",
  },
] as const;
