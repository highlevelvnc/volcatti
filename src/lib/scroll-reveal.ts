/**
 * Scroll reveal: visible-by-default + IntersectionObserver + safety fallback.
 *
 * Pattern (from user's global rules):
 *  1. Elements stay visible in CSS by default.
 *  2. On mount we mark all `[data-reveal]` as `data-revealed="false"` (hides them).
 *  3. IntersectionObserver flips them to `"true"` when they enter the viewport.
 *  4. setTimeout(3500ms) forces all remaining to "true" — protects against
 *     headless browsers, background tabs, IO failures.
 *
 * GSAP is intentionally NOT used here. Vanilla IO + CSS transitions only.
 */

export function initScrollReveal(): () => void {
  if (typeof window === "undefined") return () => {};

  const els = Array.from(
    document.querySelectorAll<HTMLElement>("[data-reveal]"),
  );
  if (els.length === 0) return () => {};

  // Hide everything before observing — visible-by-default in CSS, masked here.
  els.forEach((el) => el.setAttribute("data-revealed", "false"));

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).setAttribute("data-revealed", "true");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
  );

  els.forEach((el) => io.observe(el));

  // Safety fallback: force-reveal everything after 3.5s.
  const timeout = window.setTimeout(() => {
    document
      .querySelectorAll<HTMLElement>('[data-revealed="false"]')
      .forEach((el) => el.setAttribute("data-revealed", "true"));
  }, 3500);

  return () => {
    io.disconnect();
    window.clearTimeout(timeout);
  };
}

/**
 * Refresh helper — re-observe new elements after dynamic content changes.
 */
export function refreshScrollReveal(): void {
  if (typeof window === "undefined") return;
  const init = initScrollReveal();
  init();
}
