import React, { useEffect, useRef } from 'react';
import VideoBackground from '@/components/VideoBackground';
import GradientBackground from '@/components/GradientBackground';
import { OptimizedImage } from '@/components/seo';
import { prefersReducedMotion } from '@/lib/motion';

interface HeroBackdropProps {
  vimeoId?: string;
  posterSrc?: string;
  useGradient: boolean;
  shouldRenderVideo: boolean;
  /** Desktop-only scroll parallax on the media layer. */
  parallax?: boolean;
  /** Mobile needs a heavier scrim behind centered copy. */
  scrim: 'mobile' | 'desktop';
}

/**
 * Shared hero media + light choreography: the scene "lights up" from black,
 * two gold threads draw across it, and a single glint passes once. Media
 * structure (poster img / Vimeo iframe) is unchanged from the original heroes
 * so the poster-until-playback contract still holds.
 */
const HeroBackdrop: React.FC<HeroBackdropProps> = ({
  vimeoId,
  posterSrc,
  useGradient,
  shouldRenderVideo,
  parallax = false,
  scrim,
}) => {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!parallax || !layer || prefersReducedMotion()) return;
    if (!window.matchMedia?.('(pointer: fine)').matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      // The section is scrolling out of view; a slower media layer reads as depth.
      if (y < window.innerHeight * 1.2) {
        layer.style.transform = `translate3d(0, ${Math.round(y * 0.28)}px, 0)`;
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
      layer.style.transform = '';
    };
  }, [parallax]);

  const scrimClass =
    scrim === 'mobile'
      ? 'bg-[linear-gradient(180deg,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.45)_40%,rgba(0,0,0,0.82)_100%)]'
      : 'bg-[linear-gradient(90deg,rgba(0,0,0,0.78)_0%,rgba(0,0,0,0.55)_42%,rgba(0,0,0,0.18)_100%)]';

  return (
    <>
      <div ref={layerRef} className="absolute inset-0 will-change-transform">
        {useGradient ? (
          <GradientBackground variant="dental" intensity="moderate" />
        ) : shouldRenderVideo ? (
          <VideoBackground vimeoId={vimeoId} posterSrc={posterSrc} className="absolute inset-0 h-full w-full" />
        ) : posterSrc ? (
          <OptimizedImage
            src={posterSrc}
            alt=""
            aria-hidden="true"
            priority
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
            sizes="100vw"
          />
        ) : (
          <GradientBackground variant="dental" intensity="moderate" />
        )}
      </div>

      {!useGradient && (
        <>
          <div className={`pointer-events-none absolute inset-0 z-10 ${scrimClass}`} aria-hidden="true" />
          <div
            className="allow-gradient-transparency pointer-events-none absolute inset-x-0 bottom-0 z-10 h-40 bg-gradient-to-t from-black/60 to-transparent"
            aria-hidden="true"
          />
        </>
      )}

      <svg
        className="pointer-events-none absolute inset-0 z-10 h-full w-full"
        viewBox="0 0 1440 800"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <linearGradient id="hero-thread-gold" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#b9a27c" stopOpacity="0" />
            <stop offset="0.45" stopColor="#e3cc9c" stopOpacity="0.75" />
            <stop offset="1" stopColor="#b9a27c" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          className="hero-thread"
          pathLength={1}
          d="M-40 640 C 280 520, 520 760, 860 560 S 1300 380, 1500 470"
          stroke="url(#hero-thread-gold)"
          strokeWidth="1.2"
          vectorEffect="non-scaling-stroke"
          style={{ '--d': '350ms' } as React.CSSProperties}
        />
        <path
          className="hero-thread"
          pathLength={1}
          d="M-40 700 C 320 600, 600 800, 920 640 S 1320 470, 1500 540"
          stroke="url(#hero-thread-gold)"
          strokeWidth="0.8"
          strokeOpacity="0.6"
          vectorEffect="non-scaling-stroke"
          style={{ '--d': '600ms' } as React.CSSProperties}
        />
      </svg>

      <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden" aria-hidden="true">
        <div className="hero-glint" />
      </div>
      <div className="hero-lights z-10" aria-hidden="true" />
    </>
  );
};

export default HeroBackdrop;
