
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import VideoBackground from '@/components/VideoBackground';
import GradientBackground from '@/components/GradientBackground';
import HeroCtaButtons from './HeroCtaButtons';
import type { VideoHeroProps } from './video-hero-types';
import { getHeroHeightClasses } from '@/utils/heroHeights';

const DesktopVideoHero: React.FC<VideoHeroProps> = ({
  vimeoId,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  height = 'medium',
  useGradient = true
}) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const heightClasses = getHeroHeightClasses(height);

  return (
    <section className={cn("relative flex items-center overflow-hidden bg-slate-900", heightClasses.desktop)}>
      {useGradient ? (
        <GradientBackground variant="dental" intensity="moderate" />
      ) : (
        <>
          <VideoBackground
            vimeoId={vimeoId}
            onLoad={() => setIsVideoLoaded(true)}
            className="absolute inset-0"
          />
          <div className="absolute inset-0 bg-black/40 z-10" />
        </>
      )}
      
      <div className="relative z-20 text-white px-4 sm:px-6 lg:px-8 max-w-4xl">
        <h1 
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-left"
          style={{ 
            willChange: 'auto',
            contain: 'layout style'
          }}
        >
          {title}
        </h1>
        
        {subtitle && (
          <p 
            className="text-lg sm:text-xl md:text-2xl mb-8 max-w-3xl text-white/90 leading-relaxed text-left"
            style={{ 
              contain: 'layout'
            }}
          >
            {subtitle}
          </p>
        )}
        
        <div className="flex justify-start">
          <HeroCtaButtons 
            primaryCta={primaryCta}
            secondaryCta={secondaryCta}
          />
        </div>
      </div>
    </section>
  );
};

export default DesktopVideoHero;
