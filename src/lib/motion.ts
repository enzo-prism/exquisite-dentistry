/** Shared motion helpers. CSS owns the actual animation (see "MOTION SYSTEM" in index.css). */
export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Opt the document into reveal motion. Until this runs, every `[data-reveal]`
 * element renders in its final, visible state — so crawlers, failed bundles and
 * reduced-motion visitors always get the full page.
 */
export const enableMotion = () => {
  if (typeof document === 'undefined' || prefersReducedMotion()) return;
  if (typeof window.IntersectionObserver !== 'function') return;
  document.documentElement.classList.add('motion-ok');
};

export const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
