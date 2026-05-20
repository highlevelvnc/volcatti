import dynamic from "next/dynamic";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { JobsiteTicker } from "@/components/jobsite-ticker";
import { ScaffoldingDivider } from "@/components/scaffolding-divider";
import { Authority } from "@/components/authority";
import { Services } from "@/components/services";
import { FeaturePools } from "@/components/feature-pools";
import { FeatureElectric } from "@/components/feature-electric";
import { Gallery } from "@/components/gallery";
import { Footer } from "@/components/footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { ScrollProgress } from "@/components/scroll-progress";
import { RevealInit } from "@/components/reveal-init";
import { FaqSchema } from "@/components/faq-schema";
import { BrowserOnly } from "@/components/browser-only";

// Below-the-fold — dynamic import to shrink First Load JS.
// SSR stays enabled so SEO/HTML still ships server-rendered.
const VideoReel = dynamic(() => import("@/components/video-reel").then(m => m.VideoReel));
const BeforeAfter = dynamic(() => import("@/components/before-after").then(m => m.BeforeAfter));
const Materials = dynamic(() => import("@/components/materials").then(m => m.Materials));
const StickyStorytelling = dynamic(() => import("@/components/sticky-storytelling").then(m => m.StickyStorytelling));
const Process = dynamic(() => import("@/components/process").then(m => m.Process));
const ZonesMap = dynamic(() => import("@/components/zones-map").then(m => m.ZonesMap));
const Testimonials = dynamic(() => import("@/components/testimonials").then(m => m.Testimonials));
const Differentials = dynamic(() => import("@/components/differentials").then(m => m.Differentials));
const Trust = dynamic(() => import("@/components/trust").then(m => m.Trust));
const Faq = dynamic(() => import("@/components/faq").then(m => m.Faq));
const CtaFinal = dynamic(() => import("@/components/cta-final").then(m => m.CtaFinal));

export default function Home() {
  return (
    <>
      <FaqSchema />
      <BrowserOnly />
      <ScrollProgress />
      <RevealInit />
      <Header />
      <main id="main-content">
        <Hero />
        <JobsiteTicker />
        <Authority />
        <ScaffoldingDivider caption="Próxima fase · Serviços" dimension="L = 1320 mm" />
        <Services />
        <FeaturePools />
        <FeatureElectric />
        <Gallery />
        <VideoReel />
        <BeforeAfter />
        <Materials />
        <StickyStorytelling />
        <Process />
        <ZonesMap />
        <Testimonials />
        <Differentials />
        <Trust />
        <ScaffoldingDivider caption="Próxima fase · Perguntas" dimension="N. º 09 / 12" />
        <Faq />
        <CtaFinal />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
