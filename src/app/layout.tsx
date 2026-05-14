import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { COMPANY } from "@/lib/constants";
import "./globals.css";

const fontDisplay = Fraunces({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const fontSans = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#111111",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(COMPANY.url),
  title: {
    default: `${COMPANY.name} — Construção, Remodelação, Piscinas e Elétrica`,
    template: `%s · ${COMPANY.name}`,
  },
  description:
    "Volcatti — Soluções completas em construção civil, remodelação, piscinas e serviços elétricos em Lisboa. Precisão em cada etapa, excelência em cada detalhe.",
  keywords: [
    "construção civil Lisboa",
    "remodelação apartamentos Lisboa",
    "construção de piscinas",
    "instalação elétrica Lisboa",
    "remodelação casas",
    "acabamentos premium",
    "Volcatti",
  ],
  authors: [{ name: COMPANY.name }],
  creator: COMPANY.name,
  publisher: COMPANY.name,
  alternates: { canonical: COMPANY.url },
  category: "Construction",
  openGraph: {
    type: "website",
    locale: "pt_PT",
    url: COMPANY.url,
    title: `${COMPANY.name} — Precisão em cada etapa`,
    description:
      "Construção, remodelação, piscinas e elétrica com qualidade, segurança e acabamento profissional em Lisboa.",
    siteName: COMPANY.name,
    images: [
      {
        url: "/portfolio/piscina-noturna.png",
        width: 1200,
        height: 1500,
        alt: "Piscina Volcatti iluminada de noite",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${COMPANY.name} — Precisão em cada etapa`,
    description:
      "Construção, Remodelação, Piscinas e Elétrica. Excelência em cada detalhe.",
    images: ["/portfolio/piscina-noturna.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  name: COMPANY.name,
  description: COMPANY.fullName,
  url: COMPANY.url,
  telephone: COMPANY.phone,
  email: COMPANY.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lisboa",
    addressRegion: "Lisboa",
    addressCountry: "PT",
  },
  areaServed: { "@type": "Country", name: "Portugal" },
  foundingDate: COMPANY.est,
  vatID: COMPANY.nipc,
  sameAs: [
    COMPANY.social.instagram,
    COMPANY.social.facebook,
    COMPANY.social.linkedin,
  ],
  serviceType: [
    "Construção Civil",
    "Remodelação",
    "Construção de Piscinas",
    "Casas de Máquina para Piscinas",
    "Assistência e Manutenção de Piscinas",
    "Serviços Elétricos",
    "Acabamentos",
    "Manutenção",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-PT"
      className={`${fontDisplay.variable} ${fontSans.variable} ${fontMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <a href="#main-content" className="skip-link">
          Saltar para o conteúdo
        </a>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
