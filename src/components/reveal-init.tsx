"use client";

import { useEffect } from "react";
import { initScrollReveal } from "@/lib/scroll-reveal";

export function RevealInit() {
  useEffect(() => {
    const cleanup = initScrollReveal();
    return cleanup;
  }, []);

  return null;
}
