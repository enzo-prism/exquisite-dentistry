
import React from 'react';
import { cn } from '@/lib/utils';
import VideoBackground from '@/components/VideoBackground';
import GradientBackground from '@/components/GradientBackground';
import HeroCtaButtons from './HeroCtaButtons';
import type { VideoHeroProps } from './video-hero-types';
import { getHeroHeightClasses } from '@/utils/heroHeights';
import { Link } from 'react-router-dom';

const MobileVideoHero: React.FC<VideoHeroProps> = ({
  vimeoId,
  posterSrc,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  height = 'medium',
  useGradient = false,
  disableVideo = false
}) => {
  const heightClasses = getHeroHeightClasses(height);
  const shouldRenderVideo = !disableVideo && !useGradient;

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
      ) : shouldRenderVideo ? (
        <>
          <VideoBackground
            vimeoId={vimeoId}
            posterSrc={posterSrc}
            className="absolute inset-0 w-full h-full"
          />
          <div className="absolute inset-0 bg-black/70 md:bg-black/50 z-10" />
        </>
      ) : (
        <div className="absolute inset-0">
          {posterSrc ? (
            <>
              <img
                src={posterSrc}
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/70 md:bg-black/50" />
            </>
          ) : (
            <GradientBackground variant="dental" intensity="moderate" />
          )}
        </div>
      )}
      
      <div className="relative z-20 text-white px-6 w-full max-w-lg mx-auto text-center">
        <h1 
          className="text-4xl sm:text-5xl font-bold mb-8 leading-tight mobile-text-shadow"
          style={{ 
            willChange: 'auto',
            contain: 'layout style',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.8), 0 4px 8px rgba(0, 0, 0, 0.6)'
          }}
        >
          {title}
        </h1>
        
        {subtitle && (
          <p 
            className="text-lg sm:text-xl mb-10 text-white/95 md:text-white/90 leading-relaxed max-w-md mx-auto mobile-text-shadow"
            style={{ 
              contain: 'layout',
              textShadow: '0 1px 3px rgba(0, 0, 0, 0.8), 0 2px 6px rgba(0, 0, 0, 0.6)'
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
        <Link
          to="/testimonials"
          className="mt-5 inline-flex w-full justify-center text-xs text-white/80 hover:text-white transition-colors"
        >
          5-star experience · 200+ Google · 100+ Yelp
        </Link>
      </div>
    </section>
  );
};

export default MobileVideoHero;
