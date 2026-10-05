import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Hairline reading-progress bar. Writes the transform directly (no React state
 * per scroll frame) and stays invisible at the top of the page so it never
 * reads as a stuck loading bar.
 */
const ScrollProgress: React.FC = () => {
  const barRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const progress = total > 0 ? Math.min(1, Math.max(0, window.scrollY / total)) : 0;
      bar.style.transform = `scaleX(${progress})`;
      bar.style.opacity = progress > 0.01 ? '1' : '0';
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return (
    <div
      ref={barRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[60] h-0.5 w-full origin-left bg-gradient-to-r from-gold via-champagne to-gold opacity-0 transition-opacity duration-300 allow-gradient-transparency"
      style={{ transform: 'scaleX(0)' }}
    />
  );
};

export default ScrollProgress;
