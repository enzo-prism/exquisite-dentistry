
import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import VideoBackground from '../VideoBackground';
import HeroCtaButtons from './HeroCtaButtons';
import { VideoHeroProps } from './video-hero-types';
import { getHeightClasses } from './video-constants';

const DesktopVideoHero: React.FC<VideoHeroProps> = ({
  vimeoId,
  youtubeId,
  streamableUrl,
  posterSrc,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  className,
  height = 'auto',
  badgeText = "MEET DR. ALEXIE AGUIL",
  scrollIndicator = true,
  aspectRatio = 16 / 9,
}) => {
  const [isContentVisible, setIsContentVisible] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsContentVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  const scrollToNextSection = () => {
    const heroSection = document.querySelector('section');
    if (heroSection && heroSection.nextElementSibling) {
      heroSection.nextElementSibling.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      className={cn(
        'relative bg-black w-full section-vertical-spacing',
        getHeightClasses(height),
        className
      )}
    >
      <div className="section-container">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          <div className={cn(
            "w-full lg:w-1/2 max-w-3xl content-spacing",
            isContentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
            "transition-all duration-1000 ease-out"
          )}>
            {badgeText && (
              <span className="inline-block bg-gold/90 text-white px-4 py-1 rounded-sm text-sm font-medium mb-6 transform hover:scale-105 transition-transform duration-300">
                {badgeText}
              </span>
            )}
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-semibold text-white leading-tight mb-6">
              {title}
            </h1>
            
            {subtitle && (
              <p className="text-lg md:text-xl text-white/90 mb-8 font-light max-w-2xl">
                {subtitle}
              </p>
            )}
            
            <HeroCtaButtons
              primaryCta={primaryCta}
              secondaryCta={secondaryCta}
            />
          </div>
          
          <div className={cn(
            "w-full lg:w-1/2 flex-shrink-0",
            isContentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
            "transition-all duration-1000 ease-out"
          )}>
            <div className="w-full h-full">
              <VideoBackground 
                vimeoId={vimeoId}
                youtubeId={youtubeId}
                streamableUrl={streamableUrl}
                posterSrc={posterSrc}
                aspectRatio={aspectRatio}
                isContained={true}
                className="rounded-sm shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>
      
      {scrollIndicator && height !== 'auto' && (
        <div 
          className="absolute bottom-8 left-0 right-0 mx-auto flex justify-center cursor-pointer animate-bounce"
          onClick={scrollToNextSection}
        >
          <div className="flex flex-col items-center">
            <span className="text-white/70 text-xs sm:text-sm mb-1 sm:mb-2">Scroll Down</span>
            <ChevronDown className="text-white/70 w-5 h-5 sm:w-6 sm:h-6" />
          </div>
        </div>
      )}
    </section>
  );
};

export default DesktopVideoHero;

