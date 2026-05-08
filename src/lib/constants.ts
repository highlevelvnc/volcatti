/**
 * Single source of truth for company data.
 * Update WhatsApp number, contacts and links here.
 */

export const COMPANY = {
  name: "Volcatti",
  fullName: "Volcatti — Construção, Remodelação, Piscinas e Elétrica",
  tagline: "Precisão em cada etapa.",
  region: "Lisboa · Portugal",
  email: "geral@volcatti.pt",
  phone: "+351 000 000 000",
  phoneCompact: "+351000000000",
  nipc: "000 000 000",
  est: "2014",
  url: "https://volcatti.pt",
  social: {
    instagram: "https://instagram.com/volcatti",
    facebook: "https://facebook.com/volcatti",
    linkedin: "https://linkedin.com/company/volcatti",
  },
} as const;

export const WHATSAPP_NUMBER = "351000000000";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Olá Volcatti, gostaria de pedir um orçamento para o meu projeto.",
)}`;

export const NAV_LINKS = [
  { label: "Início", href: "/#inicio" },
  { label: "Serviços", href: "/#servicos" },
  { label: "Obras", href: "/#obras" },
  { label: "Processo", href: "/#processo" },
  { label: "Notícias", href: "/noticias" },
  { label: "Contacto", href: "/#contacto" },
] as const;

export type ServiceItem = {
  slug: string;
  num: string;
  title: string;
  blurb: string;
  image: string;
  alt: string;
  intro?: string;
  scope?: readonly string[];
  faq?: ReadonlyArray<{ q: string; a: string }>;
  relatedCat?: "construcao" | "remodelacao" | "piscinas" | "eletrica" | "acabamentos";
};

export const SERVICES: ReadonlyArray<ServiceItem> = [
  {
    slug: "construcao-civil",
    num: "01",
    title: "Construção Civil",
    blurb:
      "Obras novas com método. Do alvará ao acabamento, tratamos cada fase com rigor técnico e responsabilidade.",
    image: "/portfolio/espaco-comercial.png",
    alt: "Espaço amplo recém-construído com iluminação técnica",
    relatedCat: "construcao",
    intro:
      "Construímos do zero — fundações, estrutura, fachadas, acabamentos. Equipa própria coordenada com fornecedores certificados, cronograma transparente e reportes semanais. Cada obra acompanhada por um responsável técnico em estaleiro.",
    scope: [
      "Estudo prévio e licenciamento",
      "Fundações e estrutura armada",
      "Alvenarias e impermeabilizações",
      "Coberturas e fachadas",
      "Instalações técnicas integradas",
      "Acabamentos e entrega chave-na-mão",
    ],
    faq: [
      { q: "Que dimensão de obra fazem?", a: "De moradias unifamiliares a edifícios de até 6 fogos. Para escala maior, articulamos parcerias." },
      { q: "Tratam do projeto de arquitetura?", a: "Trabalhamos com arquitetos parceiros e também com os do cliente." },
      { q: "Que prazo médio para uma vivenda T3?", a: "10–14 meses, dependendo de localização, terreno e acabamentos." },
    ],
  },
  {
    slug: "remodelacoes",
    num: "02",
    title: "Remodelações",
    blurb:
      "Casas, apartamentos e espaços comerciais transformados com soluções de alto padrão e atenção ao detalhe.",
    image: "/portfolio/corredor-terracota.png",
    alt: "Hall remodelado com pavimento terracota",
    relatedCat: "remodelacao",
    intro:
      "Pegamos em espaços existentes e devolvemos-lhe valor. Apartamentos antigos, casas que precisam de ganhar luz, lojas que querem reposicionar-se — temos método para cada caso. Levantamento técnico, projeto faseado de demolição, e execução por capítulos para minimizar o impacto.",
    scope: [
      "Demolição controlada e tratamento de resíduos",
      "Recuperação de estrutura quando necessário",
      "Canalização e elétrica novas",
      "Carpintaria à medida",
      "Pinturas, pavimentos, revestimentos",
      "Instalação de cozinhas e WCs completos",
    ],
    faq: [
      { q: "É preciso desocupar a casa?", a: "Em remodelações totais sim. Para parciais, faseamos para manter zonas habitáveis." },
      { q: "Aceitam projetos pequenos (1 WC, 1 cozinha)?", a: "Sim. Tratamos com o mesmo rigor de uma obra grande." },
      { q: "Quanto custa remodelar um T2 em Lisboa?", a: "Tipicamente 800–1500 €/m² para qualidade média-alta. Damos breakdown por capítulo no orçamento." },
    ],
  },
  {
    slug: "piscinas",
    num: "03",
    title: "Construção de Piscinas",
    blurb:
      "Da escavação à iluminação. Piscinas modernas, duráveis e com acabamento que valoriza o espaço.",
    image: "/portfolio/piscina-diurna.png",
    alt: "Piscina retangular com deck madeira e spa em pedra",
    relatedCat: "piscinas",
    intro:
      "Piscinas que duram. Estrutura armada com fundação dimensionada ao terreno, impermeabilização técnica em três camadas e revestimentos de qualidade. Sistemas de filtragem silenciosos e iluminação LED com automação opcional.",
    scope: [
      "Estudo geotécnico do terreno",
      "Implantação e marcação de cotas",
      "Estrutura armada em betão",
      "Impermeabilização em 3 camadas",
      "Revestimentos premium (vidro, pedra, mosaico)",
      "Filtragem, aquecimento, iluminação, automação",
      "Deck, spa, jacuzzi, jardim envolvente",
    ],
    faq: [
      { q: "É preciso licenciamento?", a: "Para piscinas em terreno próprio até dimensão regulada, geralmente comunicação prévia. Tratamos do processo." },
      { q: "Quanto demora a construção?", a: "Tipicamente 8–14 semanas para piscina + envolvente." },
      { q: "Preço médio para piscina 8x4 m?", a: "Entre 25 000–45 000 €, consoante revestimento, sistemas e envolvente." },
    ],
  },
  {
    slug: "eletrica",
    num: "04",
    title: "Serviços Elétricos",
    blurb:
      "Instalações novas, certificações e melhorias com foco em segurança, eficiência e organização técnica.",
    image: "/portfolio/marquise.png",
    alt: "Marquise envidraçada com vista de cidade",
    relatedCat: "eletrica",
    intro:
      "Quadros novos, circuitos refeitos, certificações IEP. Trabalhamos com técnicos credenciados para garantir que tudo passa com nota máxima nas inspeções. Iluminação técnica, automação e domótica para casa ou empresa.",
    scope: [
      "Diagnóstico e auditoria elétrica",
      "Quadros eléctricos novos",
      "Circuitos de iluminação, tomadas, força",
      "Certificação IEP (CERTIEL)",
      "Iluminação técnica LED interior + exterior",
      "Automação e domótica",
    ],
    faq: [
      { q: "Emitem o certificado de instalação?", a: "Sim, fazemos toda a instalação certificada com técnicos credenciados (CERTIEL)." },
      { q: "Trabalham 24h para emergências?", a: "Sim, equipa de plantão para clientes ativos com contrato de manutenção." },
      { q: "Fazem domótica?", a: "Sim — pré-instalação ou instalação completa em sistemas KNX, Loxone, ou marcas mais acessíveis." },
    ],
  },
  {
    slug: "acabamentos",
    num: "05",
    title: "Acabamentos Finos",
    blurb:
      "Mármores, carvalho, pintura e remates. O que distingue uma obra entregue de uma obra acabada.",
    image: "/portfolio/wc-marmore.png",
    alt: "Casa de banho com revestimento mármore e box duche",
    relatedCat: "acabamentos",
    intro:
      "O acabamento é onde se vê o cuidado. Trabalhamos com mármore, carvalho, latão, vidro temperado e técnicas especializadas. Pintura à régua, juntas perfeitas, ferragens à medida. É o último 10% que faz toda a diferença.",
    scope: [
      "Mármores e pedras naturais",
      "Carpintaria em carvalho e nogueira",
      "Pintura técnica e estuque veneziano",
      "Revestimentos cerâmicos premium",
      "Ferragens, latão, bronze polido",
      "Vidros temperados (box duche, divisórias)",
    ],
    faq: [
      { q: "Trabalham com fornecedores próprios?", a: "Temos parceiros certificados, mas se já tem fornecedor de confiança, integramos." },
      { q: "Fazem reparação de mármores existentes?", a: "Sim — polimento, cristalização, reparação de fissuras." },
      { q: "Quanto custa pintura interior de um T2?", a: "Pintura simples 4–6 €/m², estuque veneziano 35–60 €/m²." },
    ],
  },
  {
    slug: "manutencao",
    num: "06",
    title: "Manutenção & Reparações",
    blurb:
      "Pequenas e médias intervenções para manter o espaço sempre em condições — antes que vire problema.",
    image: "/portfolio/barbearia.png",
    alt: "Interior de barbearia remodelada",
    relatedCat: "remodelacao",
    intro:
      "Manter custa muito menos que recuperar. Oferecemos contratos anuais para condomínios, escritórios e clientes que valorizam ter uma equipa de confiança disponível para intervenções rápidas — desde fugas a manutenção elétrica.",
    scope: [
      "Diagnóstico anual preventivo",
      "Reparações canalização e elétricas",
      "Pintura de manutenção",
      "Pequenas obras (até 1 mês)",
      "Limpeza e tratamento de fachadas",
      "Manutenção de piscinas",
    ],
    faq: [
      { q: "Existem contratos de manutenção?", a: "Sim — anuais ou semestrais, com visitas programadas e resposta prioritária a emergências." },
      { q: "Fazem reparações urgentes?", a: "Sim, com prazo de resposta de 24–48h para clientes em manutenção, 5 dias úteis para outros." },
      { q: "Preço típico de visita?", a: "Visita técnica 50 €, deduzida do orçamento se avançar com a reparação." },
    ],
  },
];

export type GalleryItem = {
  slug: string;
  src: string;
  alt: string;
  title: string;
  cat: "construcao" | "remodelacao" | "piscinas" | "eletrica" | "acabamentos";
  size?: "tall" | "wide";
  area?: string;
  year?: string;
  location?: string;
  duration?: string;
  scope?: string;
  description?: string;
};

export const GALLERY: ReadonlyArray<GalleryItem> = [
  {
    slug: "piscina-iluminada-lisboa",
    src: "/portfolio/piscina-noturna.png",
    alt: "Piscina iluminada com LED de noite",
    title: "Piscina Iluminada",
    cat: "piscinas",
    size: "tall",
    area: "48 m²",
    year: "2024",
    location: "Lisboa",
    duration: "65 dias úteis",
    scope: "Piscina · Iluminação LED · Calçada portuguesa",
    description:
      "Construção de raiz de piscina retangular num condomínio em Lisboa, com iluminação LED perimetral e remate em calçada portuguesa. Impermeabilização técnica em 3 camadas e sistema de filtragem com bomba silenciosa.",
  },
  {
    slug: "barbearia-comercial-lisboa",
    src: "/portfolio/barbearia.png",
    alt: "Interior de barbearia",
    title: "Barbearia · Remodelação Comercial",
    cat: "remodelacao",
    area: "62 m²",
    year: "2024",
    location: "Lisboa",
    duration: "42 dias úteis",
    scope: "Layout · Eletricidade · Iluminação técnica · Tijoleira",
    description:
      "Remodelação completa de espaço comercial para barbearia premium. Tijolo aparente nas paredes, tetos suspensos com iluminação LED em linha e piso flutuante de carvalho. Quadro elétrico novo certificado.",
  },
  {
    slug: "wc-marmore-cascais",
    src: "/portfolio/wc-marmore.png",
    alt: "Casa de banho mármore",
    title: "WC em Mármore",
    cat: "acabamentos",
    area: "8 m²",
    year: "2024",
    location: "Cascais",
    duration: "21 dias úteis",
    scope: "Mármore · Box duche · Canalização nova",
    description:
      "Remodelação de casa de banho em apartamento de Cascais com revestimentos de mármore Estatuário, box duche em vidro temperado e mobiliário em carvalho. Canalização e elétrica refeitas a 100%.",
  },
  {
    slug: "piscina-spa-sintra",
    src: "/portfolio/piscina-diurna.png",
    alt: "Piscina diurna com deck",
    title: "Piscina + Spa",
    cat: "piscinas",
    size: "wide",
    area: "72 m²",
    year: "2023",
    location: "Sintra",
    duration: "82 dias úteis",
    scope: "Piscina · Spa em pedra · Deck madeira · Filtragem",
    description:
      "Conjunto piscina + spa em moradia de Sintra. Deck em madeira tratada, spa em pedra natural e sistema de filtragem com automação. Iluminação subaquática LED multicor com controlo via app.",
  },
  {
    slug: "hall-terracota-lisboa",
    src: "/portfolio/corredor-terracota.png",
    alt: "Corredor terracota",
    title: "Hall Terracota",
    cat: "remodelacao",
    area: "14 m²",
    year: "2024",
    location: "Lisboa",
    duration: "18 dias úteis",
    scope: "Pavimento · Carpintaria · Pintura",
    description:
      "Remodelação de hall de entrada com pavimento em terracota, porta interior em madeira maciça e carpintaria personalizada. Pintura nova em todas as paredes.",
  },
  {
    slug: "espaco-comercial-oeiras",
    src: "/portfolio/espaco-comercial.png",
    alt: "Espaço comercial branco",
    title: "Espaço Comercial",
    cat: "construcao",
    area: "180 m²",
    year: "2023",
    location: "Oeiras",
    duration: "95 dias úteis",
    scope: "Estrutura · Acabamento · Iluminação técnica · Domótica",
    description:
      "Construção de raiz de espaço comercial em Oeiras. Acabamentos em branco minimal, tetos suspensos com iluminação técnica LED em malha e pré-instalação de sistema de domótica.",
  },
  {
    slug: "marquise-iluminacao-lisboa",
    src: "/portfolio/marquise.png",
    alt: "Marquise envidraçada",
    title: "Marquise + Iluminação",
    cat: "eletrica",
    area: "12 m²",
    year: "2024",
    location: "Lisboa",
    duration: "12 dias úteis",
    scope: "Carpintaria de alumínio · Iluminação LED · Pavimento",
    description:
      "Fechamento de varanda com marquise em alumínio com vidro duplo e rede de proteção, com pavimento técnico e iluminação LED indireta. Solução térmica que ganha um divisão útil ao apartamento.",
  },
];

export const GALLERY_FILTERS = [
  { label: "Todos", value: "all" },
  { label: "Construção", value: "construcao" },
  { label: "Remodelações", value: "remodelacao" },
  { label: "Piscinas", value: "piscinas" },
  { label: "Elétrica", value: "eletrica" },
  { label: "Acabamentos", value: "acabamentos" },
] as const;

export const PROCESS_STEPS = [
  {
    num: "01",
    title: "Contacto inicial",
    blurb: "Entendemos a ideia, recolhemos referências e identificamos o âmbito.",
  },
  {
    num: "02",
    title: "Avaliação técnica",
    blurb: "Visita ao local, levantamento de medidas e análise das condições do espaço.",
  },
  {
    num: "03",
    title: "Orçamento detalhado",
    blurb: "Proposta clara, organizada por capítulos, com prazos e materiais.",
  },
  {
    num: "04",
    title: "Planeamento",
    blurb: "Cronograma de obra, gestão de equipas e calendarização de entregas.",
  },
  {
    num: "05",
    title: "Execução",
    blurb: "Obra acompanhada de perto, com reportes de progresso e controlo de qualidade.",
  },
  {
    num: "06",
    title: "Entrega final",
    blurb: "Vistoria conjunta, afinações finais e entrega com tudo a funcionar.",
  },
] as const;

export const TESTIMONIALS = [
  {
    quote:
      "Trabalho impecável. A obra cumpriu prazos e o acabamento ficou muito acima do que tínhamos visto noutros orçamentos. Voltaremos a contar com a Volcatti.",
    name: "Inês Marques",
    role: "Vivenda T4 · Cascais",
  },
  {
    quote:
      "A piscina ficou exatamente como sonhámos. Comunicação clara em todas as fases — coisa rara no setor, e que faz toda a diferença.",
    name: "Pedro Antunes",
    role: "Moradia · Sintra",
  },
  {
    quote:
      "Remodelação completa do apartamento, incluindo elétrica nova. Equipa organizada, sem surpresas no orçamento, e o resultado é elegante.",
    name: "Catarina Lopes",
    role: "Apartamento · Lisboa",
  },
] as const;

export const DIFFERENTIALS = [
  { num: "01", title: "Atendimento profissional", blurb: "Comunicação clara em todas as fases, do orçamento à entrega." },
  { num: "02", title: "Soluções completas", blurb: "Construção, remodelação, piscinas e elétrica numa só equipa." },
  { num: "03", title: "Organização técnica", blurb: "Método em todas as etapas — do estaleiro ao acabamento final." },
  { num: "04", title: "Qualidade no acabamento", blurb: "Detalhe e rigor visíveis em cada superfície, junta e remate." },
  { num: "05", title: "Segurança técnica", blurb: "Equipamento, certificações e procedimentos para zero surpresas." },
  { num: "06", title: "Compromisso com prazos", blurb: "Cronograma honesto e cumprido — sem promessas vazias." },
] as const;

export const STATS = [
  { num: 120, suffix: "+", label: "Projetos concluídos" },
  { num: 12, suffix: "+", label: "Anos de experiência" },
  { num: 98, suffix: "%", label: "Clientes satisfeitos" },
] as const;
