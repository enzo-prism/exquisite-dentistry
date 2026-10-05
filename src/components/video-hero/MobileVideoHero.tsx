import React from 'react';
import { cn } from '@/lib/utils';
import type { VideoHeroProps } from './video-hero-types';
import { getHeroHeightClasses } from '@/utils/heroHeights';
import HeroBackdrop from './HeroBackdrop';
import HeroContent from './HeroContent';

const MobileVideoHero: React.FC<VideoHeroProps> = ({
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
    <section className={cn('relative isolate flex items-end overflow-hidden bg-[#0b0a08]', heightClasses.mobile)}>
      <HeroBackdrop
        vimeoId={vimeoId}
        posterSrc={posterSrc}
        useGradient={useGradient}
        shouldRenderVideo={shouldRenderVideo}
        scrim="mobile"
      />

      <div className="relative z-20 mx-auto w-full max-w-lg px-5 pb-9 pt-16 sm:px-6 sm:pb-12">
        <HeroContent
          title={title}
          subtitle={subtitle}
          primaryCta={primaryCta}
          secondaryCta={secondaryCta}
          proofLinks={proofLinks}
          eyebrow={eyebrow}
          phoneCta={phoneCta}
          isMobile
        />
      </div>
    </section>
  );
};

export default MobileVideoHero;
