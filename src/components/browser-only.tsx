"use client";

import dynamic from "next/dynamic";

// Browser-only widgets (no SSR). Centralised here so the Server Component
// page.tsx stays clean and we comply with Next 16's restriction:
// `ssr: false` must live inside a Client Component.
const LoadingCurtain = dynamic(() => import("./loading-curtain").then(m => m.LoadingCurtain), { ssr: false });
const SmoothScroll = dynamic(() => import("./smooth-scroll").then(m => m.SmoothScroll), { ssr: false });
const Cursor = dynamic(() => import("./cursor").then(m => m.Cursor), { ssr: false });
const CookieBanner = dynamic(() => import("./cookie-banner").then(m => m.CookieBanner), { ssr: false });

export function BrowserOnly() {
  return (
    <>
      <LoadingCurtain />
      <SmoothScroll />
      <Cursor />
      <CookieBanner />
    </>
  );
}
