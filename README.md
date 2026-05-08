# Volcatti — Site Institucional

Site institucional premium para a Volcatti — Construção, Remodelação, Piscinas e Elétrica.

Construído em **Next.js 15 + TypeScript + Tailwind 3**, com fotos reais de obra, animações scroll-reveal, parallax e SEO completo.

## Stack

- Next.js 15 (App Router)
- React 19 RC
- TypeScript 5.6
- Tailwind CSS 3.4
- Fonts: Fraunces (display) + Inter (body) + JetBrains Mono (technical labels) — via `next/font`
- `next/image` com AVIF/WebP automático

## Design system — Architectural Blueprint

**Palette**
- Grafite `#111111` · Off-white `#F4F1EA` · Concreto `#C9C3B8`
- Bronze `#B88A2A` · Petróleo `#173238`

**Tipografia**
- Display: Fraunces (300/400 italic) — títulos editoriais
- Body: Inter (400/500) — leitura
- Mono: JetBrains Mono — labels técnicas tipo planta arquitetónica

**Princípios**
- Cantos a 0px (sharp corners). Sem sombras pesadas.
- Hierarquia por linha + tonalidade, não por peso.
- Bronze usado com parcimónia (CTAs, hairlines, destaques).
- `overflow-x: clip` (não `hidden`) — segue regras globais do user.

## Estrutura

```
src/
├── app/
│   ├── layout.tsx        Metadata API, fontes, JSON-LD
│   ├── page.tsx          Composição das 12 secções
│   ├── globals.css       Tokens, reveal patterns, utilitários
│   ├── sitemap.ts        Auto-gerado pelo Next
│   ├── robots.ts         Permissivo, aponta para sitemap
│   └── manifest.ts       PWA manifest
├── components/
│   ├── header.tsx        Sticky transparente → sólido
│   ├── hero.tsx          Piscina noturna + parallax + blueprint
│   ├── marquee.tsx       Faixa scroll horizontal
│   ├── authority.tsx     Posicionamento + counter animado
│   ├── services.tsx      Grid de 6 serviços
│   ├── feature-pools.tsx Destaque piscinas (split layout)
│   ├── feature-electric  Destaque elétrica (linhas SVG técnicas)
│   ├── gallery.tsx       Filtrável, fotos reais
│   ├── process.tsx       Timeline 6 etapas
│   ├── testimonials.tsx  3 quotes com hover lift
│   ├── differentials.tsx Grid 6 diferenciais
│   ├── cta-final.tsx     CTA com WhatsApp + parallax bg
│   ├── footer.tsx        4 colunas + base + redes sociais
│   ├── whatsapp-float.tsx
│   ├── loading-curtain   Blueprint planta arquitetónica
│   ├── scroll-progress   Linha bronze fina no topo
│   ├── reveal-init       Hook do IntersectionObserver
│   ├── stat-counter      Counter animado
│   ├── parallax-image    Wrapper de parallax
│   ├── logo, icons       SVG inline
└── lib/
    ├── constants.ts      WHATSAPP_URL, COMPANY, NAV_LINKS, dados
    └── scroll-reveal.ts  IO + 3.5s safety fallback (regra global)
```

## Secções

1. Header sticky (transparente em hero, sólido após scroll)
2. **Hero** com piscina noturna real + parallax + blueprint corners + scroll indicator
3. Marquee horizontal de serviços
4. **Posicionamento** (autoridade) com 3 estatísticas counter
5. **6 Serviços** em cards com hover bronze underline
6. **Destaque Piscinas** — split com lista premium
7. **Destaque Elétrica** — fundo petróleo, linhas SVG a desenhar
8. **Galeria filtrável** — 7 obras reais por categoria
9. **Processo** — timeline 6 etapas, linha bronze a progredir
10. **Testemunhos** — 3 quotes premium com aspas bronze
11. **Diferenciais** — 6 cards minimal
12. **CTA final** — WhatsApp + email com parallax
13. Footer 4 colunas + base + NIPC

## Animações

- **Loading curtain** — planta arquitetónica desenha-se, depois 2 painéis grafite abrem-se ao centro
- **Scroll reveal** — pattern visible-by-default + `data-reveal` IO + 3.5s fallback
- **Parallax** — fórmula viewport-anchored (não shifta no scroll 0)
- **Hero zoom** — CSS animation lenta no bg
- **Marquee** — translate infinito horizontal
- **Counter** — eased-out cubic em estatísticas
- **Electric lines** — `stroke-dashoffset` a desenhar quando entra no viewport
- **Timeline progress** — linha bronze a expandir scaleX

## SEO

- Metadata API completa (title, description, keywords, authors, canonical)
- Open Graph + Twitter Card
- JSON-LD `GeneralContractor` schema
- `sitemap.xml` + `robots.txt` auto-gerados
- PWA manifest
- `lang="pt-PT"`, `og:locale="pt_PT"`
- Favicon SVG inline
- Preload da imagem hero com `fetchPriority="high"`

## Rodar

```bash
npm install
npm run dev    # http://localhost:4711
npm run build  # produção
npm start      # serve build
```

## Deploy

Pronto para Vercel:
```bash
vercel
```

Ou conectar via dashboard.

## TODO antes de produção

- [ ] Substituir telefone (`+351 000 000 000`) e email pelos reais em `src/lib/constants.ts`
- [ ] Substituir NIPC
- [ ] Substituir testemunhos por reais (manter formato em `lib/constants.ts > TESTIMONIALS`)
- [ ] Atualizar links de redes sociais (`COMPANY.social`)
- [ ] Substituir domínio `volcatti.pt` em `src/lib/constants.ts > COMPANY.url`
- [ ] (Opcional) Adicionar Plausible / Umami / Google Analytics
- [ ] (Opcional) Form de contacto com Server Action + email
- [ ] (Opcional) Páginas individuais por obra em `/obras/[slug]`

---

Construído com `Co-Authored-By: Claude Opus 4.7`
