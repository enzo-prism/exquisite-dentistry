
import React from 'react';
import { cn } from '@/lib/utils';
import VideoBackground from '@/components/VideoBackground';
import GradientBackground from '@/components/GradientBackground';
import { OptimizedImage } from '@/components/seo';
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
  proofLinks,
  height = 'medium',
  useGradient = false,
  disableVideo = false
}) => {
  const heightClasses = getHeroHeightClasses(height);
  const shouldRenderVideo = !disableVideo && !useGradient;
  const heroProofLinks = proofLinks ?? [
    {
      text: 'Read patient experiences',
      href: '/testimonials/'
    }
  ];

  return (
    <section 
      className={cn(
        "relative flex items-center justify-center overflow-hidden bg-slate-900", 
        heightClasses.mobile
      )}
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
              <OptimizedImage
                src={posterSrc}
                alt=""
                aria-hidden="true"
                priority
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-black/70 md:bg-black/50" />
            </>
          ) : (
            <GradientBackground variant="dental" intensity="moderate" />
          )}
        </div>
      )}
      
      <div className="relative z-20 mx-auto w-full max-w-lg px-5 py-10 text-center text-white sm:py-12">
        <h1 
          className="mb-5 text-[clamp(1.875rem,7vw,2.5rem)] font-bold leading-tight [overflow-wrap:anywhere] mobile-text-shadow"
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
            className="mx-auto mb-6 max-w-md text-base leading-relaxed text-white/95 mobile-text-shadow sm:text-lg"
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
        <div className="mx-auto mt-5 flex max-w-xs flex-wrap items-center justify-center gap-x-2 gap-y-2 text-xs text-white/80">
          {heroProofLinks.map((link, index) => (
            <React.Fragment key={link.href}>
              {index > 0 ? <span className="hidden text-gold/70 sm:inline">·</span> : null}
              <Link
                to={link.href}
                className="inline-flex min-h-11 items-center px-1 transition-colors hover:text-white"
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

export default MobileVideoHero;
