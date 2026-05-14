import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Marquee } from "@/components/marquee";
import { Authority } from "@/components/authority";
import { Services } from "@/components/services";
import { FeaturePools } from "@/components/feature-pools";
import { FeatureElectric } from "@/components/feature-electric";
import { Gallery } from "@/components/gallery";
import { VideoReel } from "@/components/video-reel";
import { BeforeAfter } from "@/components/before-after";
import { Materials } from "@/components/materials";
import { StickyStorytelling } from "@/components/sticky-storytelling";
import { Process } from "@/components/process";
import { ZonesMap } from "@/components/zones-map";
import { Testimonials } from "@/components/testimonials";
import { Differentials } from "@/components/differentials";
import { Trust } from "@/components/trust";
import { Faq } from "@/components/faq";
import { FaqSchema } from "@/components/faq-schema";
import { CtaFinal } from "@/components/cta-final";
import { Footer } from "@/components/footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { LoadingCurtain } from "@/components/loading-curtain";
import { ScrollProgress } from "@/components/scroll-progress";
import { RevealInit } from "@/components/reveal-init";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Cursor } from "@/components/cursor";
import { CookieBanner } from "@/components/cookie-banner";

export default function Home() {
  return (
    <>
      <FaqSchema />
      <LoadingCurtain />
      <SmoothScroll />
      <Cursor />
      <ScrollProgress />
      <RevealInit />
      <Header />
      <main id="main-content">
        <Hero />
        <Marquee />
        <Authority />
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
        <Faq />
        <CtaFinal />
      </main>
      <Footer />
      <WhatsAppFloat />
      <CookieBanner />
    </>
  );
}
