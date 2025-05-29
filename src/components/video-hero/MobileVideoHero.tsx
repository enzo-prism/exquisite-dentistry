
import React from 'react';
import { cn } from '@/lib/utils';
import VideoBackground from '../VideoBackground';
import HeroCtaButtons from './HeroCtaButtons';
import { VideoHeroProps } from './video-hero-types';

const MobileVideoHero: React.FC<VideoHeroProps> = ({
  vimeoId,
  youtubeId,
  streamableUrl,
  posterSrc,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  className,
  contentClassName,
  height = 'auto',
  badgeText = "MEET DR. ALEXIE AGUIL",
  scrollIndicator = true,
  aspectRatio = 16 / 9,
}) => {
  // Calculate height based on video aspect ratio for mobile screens
  const videoHeight = `${(100 / aspectRatio)}vw`;

  return (
    <section 
      className={cn(
        'relative overflow-hidden bg-black w-full flex flex-col',
        'section-vertical-spacing',
        className
      )}
      style={{ height: videoHeight, minHeight: '60vh', maxHeight: '100vh' }}
    >
      {/* Full-screen video background with enhanced mobile coverage - increased overlay opacity from 50 to 60 */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <VideoBackground 
          vimeoId={vimeoId}
          youtubeId={youtubeId}
          streamableUrl={streamableUrl}
          posterSrc={posterSrc}
          isContained={false}
          overlayOpacity={60}
          className="w-full h-full"
        />
      </div>
      
      {/* Content overlay - optimized positioning */}
      <div className={cn(
        'relative z-30 w-full h-full flex flex-col justify-center content-vertical-spacing mobile-optimized-padding',
        contentClassName
      )}>
        {badgeText && (
          <span className="inline-block bg-gold/90 text-white px-4 py-1 rounded-sm text-sm font-medium mb-6 transform hover:scale-105 transition-transform duration-300 shadow-lg">
            {badgeText}
          </span>
        )}
        
        <h1 className="text-3xl sm:text-4xl font-sans font-semibold text-white leading-tight mb-6 drop-shadow-md">
          {title}
        </h1>
        
        {subtitle && (
          <p className="text-base sm:text-lg text-white/90 mb-8 font-light max-w-2xl drop-shadow-md">
            {subtitle}
          </p>
        )}

        <HeroCtaButtons
          primaryCta={primaryCta}
          secondaryCta={secondaryCta}
          isMobile={true}
        />
      </div>
    </section>
  );
};

export default MobileVideoHero;
