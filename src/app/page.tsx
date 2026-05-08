import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Marquee } from "@/components/marquee";
import { Authority } from "@/components/authority";
import { Services } from "@/components/services";
import { FeaturePools } from "@/components/feature-pools";
import { FeatureElectric } from "@/components/feature-electric";
import { Gallery } from "@/components/gallery";
import { BeforeAfter } from "@/components/before-after";
import { Materials } from "@/components/materials";
import { Process } from "@/components/process";
import { Testimonials } from "@/components/testimonials";
import { Differentials } from "@/components/differentials";
import { CtaFinal } from "@/components/cta-final";
import { Footer } from "@/components/footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { LoadingCurtain } from "@/components/loading-curtain";
import { ScrollProgress } from "@/components/scroll-progress";
import { RevealInit } from "@/components/reveal-init";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Cursor } from "@/components/cursor";

export default function Home() {
  return (
    <>
      <LoadingCurtain />
      <SmoothScroll />
      <Cursor />
      <ScrollProgress />
      <RevealInit />
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Authority />
        <Services />
        <FeaturePools />
        <FeatureElectric />
        <Gallery />
        <BeforeAfter />
        <Materials />
        <Process />
        <Testimonials />
        <Differentials />
        <CtaFinal />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
