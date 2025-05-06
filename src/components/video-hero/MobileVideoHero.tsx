
import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import VideoBackground from '../VideoBackground';
import HeroCtaButtons from './HeroCtaButtons';
import { VideoHeroProps } from './video-hero-types';
import { getHeightClasses } from './video-constants';

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
  const scrollToNextSection = () => {
    const heroSection = document.querySelector('section');
    if (heroSection && heroSection.nextElementSibling) {
      heroSection.nextElementSibling.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      className={cn(
        'relative overflow-hidden bg-black w-full min-h-[80vh] flex flex-col',
        'section-vertical-spacing',
        getHeightClasses(height),
        className
      )}
    >
      {/* Full-screen video background */}
      <div className="absolute inset-0 z-0">
        <VideoBackground 
          vimeoId={vimeoId}
          youtubeId={youtubeId}
          streamableUrl={streamableUrl}
          posterSrc={posterSrc}
          isContained={false}
          overlayOpacity={70}
        />
      </div>
      
      {/* Content overlay - z-30 to ensure it's above the new overlay */}
      <div className={cn(
        'relative z-30 w-full content-vertical-spacing mobile-optimized-padding',
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
      
      {scrollIndicator && height !== 'auto' && (
        <div 
          className="relative z-30 w-full flex justify-center pt-8 pb-4 cursor-pointer animate-bounce"
          onClick={scrollToNextSection}
        >
          <div className="flex flex-col items-center">
            <span className="text-white/70 text-xs mb-1 drop-shadow-md">Scroll Down</span>
            <ChevronDown className="text-white/70 w-5 h-5 drop-shadow-md" />
          </div>
        </div>
      )}
    </section>
  );
};

export default MobileVideoHero;
