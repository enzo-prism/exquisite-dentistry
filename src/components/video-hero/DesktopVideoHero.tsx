
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import VideoBackground from '@/components/VideoBackground';
import HeroCtaButtons from './HeroCtaButtons';
import type { VideoHeroProps } from './video-hero-types';

const DesktopVideoHero: React.FC<VideoHeroProps> = ({
  vimeoId,
  title,
  subtitle,
  primaryCta,
  secondaryCta
}) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  return (
    <section className="relative min-h-[70vh] md:min-h-[80vh] lg:min-h-screen flex items-center justify-center overflow-hidden">
      <VideoBackground
        vimeoId={vimeoId}
        onLoad={() => setIsVideoLoaded(true)}
        className="absolute inset-0"
      />
      
      <div className="absolute inset-0 bg-black/40 z-10" />
      
      <div className="relative z-20 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl">
        <h1 
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          style={{ 
            willChange: 'auto',
            contain: 'layout style'
          }}
        >
          {title}
        </h1>
        
        {subtitle && (
          <p 
            className="text-lg sm:text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-white/90 leading-relaxed"
            style={{ 
              contain: 'layout'
            }}
          >
            {subtitle}
          </p>
        )}
        
        <HeroCtaButtons 
          primaryCta={primaryCta}
          secondaryCta={secondaryCta}
        />
      </div>
    </section>
  );
};

export default DesktopVideoHero;
