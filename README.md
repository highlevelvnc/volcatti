# Volcatti — Site Institucional

Esqueleto visual premium para a Volcatti — Construção, Remodelação, Piscinas e Elétrica.

## Stack

- HTML semântico
- CSS custom com design tokens (sem framework)
- Vanilla JS (IntersectionObserver, parallax, scroll progress)
- Fonts: Fraunces (display) + Inter + JetBrains Mono via Google Fonts
- Imagens: Unsplash (placeholders, substituir por fotos reais de obra)

## Estrutura

```
.
├── index.html       Markup completo (11 secções + curtain + WhatsApp float)
├── styles.css       Design system "Architectural Blueprint"
└── script.js        Reveals, parallax, gallery filter, scroll progress
```

## Design system

**Palette**
- Grafite `#111111` · Off-white `#F4F1EA` · Concreto `#C9C3B8`
- Bronze `#B88A2A` · Petróleo `#173238`

**Tipografia**
- Display: Fraunces (300/400 italic) — títulos editoriais
- Body: Inter (400/500) — leitura
- Mono: JetBrains Mono — labels técnicas tipo planta arquitetónica

**Princípios**
- Cantos a 0px (sharp). Sem sombras pesadas.
- Hierarquia por linha + tonalidade, não por peso.
- Bronze usado com parcimónia em CTAs, hairlines e destaques.

## Secções

1. Header fixo (transparente → sólido)
2. Hero com parallax + blueprint corners
3. Marquee de serviços
4. Autoridade (com counter animado)
5. 6 cards de serviços
6. Destaque Piscinas (split + parallax)
7. Destaque Elétrica (linhas SVG técnicas no scroll)
8. Galeria filtrável
9. Timeline do processo (linha bronze a desenhar)
10. Testemunhos
11. Diferenciais
12. CTA final + WhatsApp
13. Footer

## Rodar localmente

```bash
python3 -m http.server 4710
# abrir http://localhost:4710
```

Ou abrir `index.html` direto no browser.

## Deploy

Estático puro — pronto para Vercel, Netlify, GitHub Pages, Cloudflare Pages.

## TODO antes de produção

- [ ] Substituir imagens Unsplash por fotos reais de obra
- [ ] Substituir números de telefone e email pelos reais
- [ ] Adicionar Google Analytics / Plausible
- [ ] Configurar formulário de contacto (Formspree, Netlify Forms, etc.)
- [ ] Otimizar imagens (WebP/AVIF + responsive srcset)
- [ ] Audit Lighthouse (a11y, performance, SEO)
