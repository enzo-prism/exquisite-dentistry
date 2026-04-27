
import React from 'react';
import { cn } from '@/lib/utils';
import VideoBackground from '@/components/VideoBackground';
import GradientBackground from '@/components/GradientBackground';
import { OptimizedImage } from '@/components/seo';
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
  proofLinks,
  height = 'medium',
  useGradient = false,
  disableVideo = false
}) => {
  const heightClasses = getHeroHeightClasses(height);
  const shouldRenderVideo = !disableVideo && !useGradient;
  const heroProofLinks = proofLinks ?? [
    {
      text: '5-star experience · 200+ Google reviews · 100+ Yelp reviews',
      href: '/testimonials/'
    }
  ];

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
              <OptimizedImage
                src={posterSrc}
                alt=""
                aria-hidden="true"
                priority
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
                sizes="100vw"
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
        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-white/75">
          {heroProofLinks.map((link, index) => (
            <React.Fragment key={link.href}>
              {index > 0 ? <span className="text-gold/70">·</span> : null}
              <Link
                to={link.href}
                className="transition-colors hover:text-white"
              >
                {link.text}
              </Link>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DesktopVideoHero;
