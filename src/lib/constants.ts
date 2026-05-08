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
  { label: "Início", href: "#inicio" },
  { label: "Sobre", href: "#sobre" },
  { label: "Serviços", href: "#servicos" },
  { label: "Obras", href: "#obras" },
  { label: "Processo", href: "#processo" },
  { label: "Contacto", href: "#contacto" },
] as const;

export const SERVICES = [
  {
    num: "01",
    title: "Construção Civil",
    blurb:
      "Obras novas com método. Do alvará ao acabamento, tratamos cada fase com rigor técnico e responsabilidade.",
    image: "/portfolio/espaco-comercial.png",
    alt: "Espaço amplo recém-construído com iluminação técnica",
  },
  {
    num: "02",
    title: "Remodelações",
    blurb:
      "Casas, apartamentos e espaços comerciais transformados com soluções de alto padrão e atenção ao detalhe.",
    image: "/portfolio/corredor-terracota.png",
    alt: "Hall remodelado com pavimento terracota",
  },
  {
    num: "03",
    title: "Construção de Piscinas",
    blurb:
      "Da escavação à iluminação. Piscinas modernas, duráveis e com acabamento que valoriza o espaço.",
    image: "/portfolio/piscina-diurna.png",
    alt: "Piscina retangular com deck madeira e spa em pedra",
  },
  {
    num: "04",
    title: "Serviços Elétricos",
    blurb:
      "Instalações novas, certificações e melhorias com foco em segurança, eficiência e organização técnica.",
    image: "/portfolio/marquise.png",
    alt: "Marquise envidraçada com vista de cidade",
  },
  {
    num: "05",
    title: "Acabamentos Finos",
    blurb:
      "Mármores, carvalho, pintura e remates. O que distingue uma obra entregue de uma obra acabada.",
    image: "/portfolio/wc-marmore.png",
    alt: "Casa de banho com revestimento mármore e box duche",
  },
  {
    num: "06",
    title: "Manutenção & Reparações",
    blurb:
      "Pequenas e médias intervenções para manter o espaço sempre em condições — antes que vire problema.",
    image: "/portfolio/barbearia.png",
    alt: "Interior de barbearia remodelada",
  },
] as const;

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
