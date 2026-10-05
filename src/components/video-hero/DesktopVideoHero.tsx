import React from 'react';
import { cn } from '@/lib/utils';
import type { VideoHeroProps } from './video-hero-types';
import { getHeroHeightClasses } from '@/utils/heroHeights';
import HeroBackdrop from './HeroBackdrop';
import HeroContent from './HeroContent';

const DesktopVideoHero: React.FC<VideoHeroProps> = ({
  vimeoId,
  posterSrc,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  proofLinks,
  eyebrow,
  phoneCta,
  height = 'medium',
  useGradient = false,
  disableVideo = false
}) => {
  const heightClasses = getHeroHeightClasses(height);
  const shouldRenderVideo = !disableVideo && !useGradient;

  return (
    <section className={cn('relative isolate flex items-center overflow-hidden bg-[#0b0a08]', heightClasses.desktop)}>
      <HeroBackdrop
        vimeoId={vimeoId}
        posterSrc={posterSrc}
        useGradient={useGradient}
        shouldRenderVideo={shouldRenderVideo}
        parallax
        scrim="desktop"
      />

      <div className="section-container relative z-20 w-full py-24 lg:py-28">
        <HeroContent
          title={title}
          subtitle={subtitle}
          primaryCta={primaryCta}
          secondaryCta={secondaryCta}
          proofLinks={proofLinks}
          eyebrow={eyebrow}
          phoneCta={phoneCta}
          isMobile={false}
        />
      </div>

      <div className="hero-rise pointer-events-none absolute bottom-7 left-1/2 z-20 hidden -translate-x-1/2 lg:block" style={{ '--d': '1400ms' } as React.CSSProperties} aria-hidden="true">
        <div className="scroll-cue" />
      </div>
    </section>
  );
};

export default DesktopVideoHero;
