
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import VideoBackground from '@/components/VideoBackground';
import HeroCtaButtons from './HeroCtaButtons';
import type { VideoHeroProps } from './video-hero-types';

const MobileVideoHero: React.FC<VideoHeroProps> = ({
  vimeoId,
  title,
  subtitle,
  primaryCta,
  secondaryCta
}) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  return (
    <section className="relative min-h-[60vh] flex items-center overflow-hidden">
      <VideoBackground
        vimeoId={vimeoId}
        onLoad={() => setIsVideoLoaded(true)}
        className="absolute inset-0"
      />
      
      <div className="absolute inset-0 bg-black/50 z-10" />
      
      <div className="relative z-20 text-white px-4 max-w-sm">
        <h1 
          className="text-2xl sm:text-3xl font-bold mb-4 leading-tight text-left"
          style={{ 
            willChange: 'auto',
            contain: 'layout style'
          }}
        >
          {title}
        </h1>
        
        {subtitle && (
          <p 
            className="text-sm sm:text-base mb-6 text-white/90 leading-relaxed text-left"
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
            isMobile={true}
          />
        </div>
      </div>
    </section>
  );
};

export default MobileVideoHero;
