/**
 * Post registry. Each post lives in src/app/noticias/[slug]/page.mdx
 * with metadata exported. We import them statically here for the index page.
 */

export type PostMeta = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: "obra" | "tecnico" | "empresa" | "destaque";
  cover: string;
  read: string;
};

export const POSTS: ReadonlyArray<PostMeta> = [
  {
    slug: "como-escolher-empreiteiro-para-remodelacao",
    title: "Como escolher empreiteiro para uma remodelação (sem se enganar)",
    excerpt:
      "Os 7 critérios objectivos para distinguir um construtor profissional de um aventureiro. Verificações que custam zero euros e poupam dezenas de milhares.",
    date: "2026-04-15",
    category: "tecnico",
    cover: "/portfolio/corredor-terracota.png",
    read: "8 min",
  },
  {
    slug: "piscina-no-jardim-quanto-custa-realmente",
    title: "Piscina no jardim: quanto custa realmente em 2026",
    excerpt:
      "Breakdown completo do custo de uma piscina familiar 8×4 m em Lisboa. Materiais, mão de obra, sistemas, licenciamento — sem floreados.",
    date: "2026-03-22",
    category: "tecnico",
    cover: "/portfolio/piscina-diurna.png",
    read: "11 min",
  },
  {
    slug: "remodelacao-wc-marmore-cascais-caso-estudo",
    title: "Caso de estudo: WC em mármore Estatuário (Cascais, 21 dias)",
    excerpt:
      "Da medição inicial à entrega — o cronograma real, os materiais escolhidos, e os 3 momentos críticos onde o detalhe fez a diferença.",
    date: "2026-02-08",
    category: "obra",
    cover: "/portfolio/wc-marmore.png",
    read: "6 min",
  },
];

export const POST_CATEGORIES = {
  obra: "Caso de obra",
  tecnico: "Técnico",
  empresa: "Empresa",
  destaque: "Destaque",
} as const;
