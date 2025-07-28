
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import VideoBackground from '@/components/VideoBackground';
import GradientBackground from '@/components/GradientBackground';
import HeroCtaButtons from './HeroCtaButtons';
import type { VideoHeroProps } from './video-hero-types';
import { getHeroHeightClasses } from '@/utils/heroHeights';

const MobileVideoHero: React.FC<VideoHeroProps> = ({
  vimeoId,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  height = 'medium',
  useGradient = false
}) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const heightClasses = getHeroHeightClasses(height);

  return (
    <section 
      className={cn(
        "relative flex items-center justify-center overflow-hidden bg-slate-900", 
        heightClasses.mobile,
        "supports-[height:100dvh]:min-h-[100dvh] supports-[height:100svh]:min-h-[100svh]"
      )}
      style={{
        minHeight: '100svh' // Safari mobile viewport, fallback handled by CSS
      }}
    >
      {useGradient ? (
        <GradientBackground variant="dental" intensity="moderate" />
      ) : (
        <>
          <VideoBackground
            vimeoId={vimeoId}
            onLoad={() => setIsVideoLoaded(true)}
            className="absolute inset-0 w-full h-full"
          />
          <div className="absolute inset-0 bg-black/50 z-10" />
        </>
      )}
      
      <div className="relative z-20 text-white px-6 w-full max-w-lg mx-auto text-center">
        <h1 
          className="text-4xl sm:text-5xl font-bold mb-8 leading-tight"
          style={{ 
            willChange: 'auto',
            contain: 'layout style'
          }}
        >
          {title}
        </h1>
        
        {subtitle && (
          <p 
            className="text-lg sm:text-xl mb-10 text-white/90 leading-relaxed max-w-md mx-auto"
            style={{ 
              contain: 'layout'
            }}
          >
            {subtitle}
          </p>
        )}
        
        <div className="flex justify-center">
          <HeroCtaButtons 
            primaryCta={primaryCta}
            secondaryCta={secondaryCta}
            isMobile={true}
          />
        </div>
      </div>
    </section>
  );
};

export default MobileVideoHero;
