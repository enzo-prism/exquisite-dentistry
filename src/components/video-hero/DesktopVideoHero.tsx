
import React from 'react';
import { cn } from '@/lib/utils';
import VideoBackground from '@/components/VideoBackground';
import GradientBackground from '@/components/GradientBackground';
import ImageComponent from '@/components/Image';
import HeroCtaButtons from './HeroCtaButtons';
import type { VideoHeroProps } from './video-hero-types';
import { getHeroHeightClasses } from '@/utils/heroHeights';
import { Link } from 'react-router-dom';

const DesktopVideoHero: React.FC<VideoHeroProps> = ({
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
    <section className={cn("relative flex items-center overflow-hidden bg-slate-900", heightClasses.desktop)}>
      {useGradient ? (
        <GradientBackground variant="dental" intensity="moderate" />
      ) : shouldRenderVideo ? (
        <>
          <VideoBackground
            vimeoId={vimeoId}
            posterSrc={posterSrc}
            className="absolute inset-0"
          />
          <div className="absolute inset-0 bg-black/40 z-10" />
        </>
      ) : (
        <div className="absolute inset-0">
          {posterSrc ? (
            <>
              <ImageComponent
                src={posterSrc}
                alt=""
                aria-hidden="true"
                fill
                priority
                decoding="async"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/55" />
            </>
          ) : (
            <GradientBackground variant="dental" intensity="moderate" />
          )}
        </div>
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
        <Link
          to="/testimonials/"
          className="mt-4 inline-flex items-center text-sm text-white/70 hover:text-white transition-colors"
        >
          5-star experience · 200+ Google reviews · 100+ Yelp reviews
        </Link>
      </div>
    </section>
  );
};

export default DesktopVideoHero;
