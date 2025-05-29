
import React from 'react';
import { cn } from '@/lib/utils';
import VideoBackground from '../VideoBackground';
import HeroCtaButtons from './HeroCtaButtons';
import { VideoHeroProps } from './video-hero-types';

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

  // Calculate height based on video aspect ratio for desktop screens
  const videoHeight = `${(100 / aspectRatio)}vw`;

  return (
    <section 
      className={cn(
        'relative bg-black w-full section-vertical-spacing overflow-hidden',
        className
      )}
      style={{ height: videoHeight, minHeight: '60vh', maxHeight: '100vh' }}
    >
      {/* Enhanced Video Background with increased opacity - from 70 to 80 for better text visibility */}
      <VideoBackground 
        vimeoId={vimeoId}
        youtubeId={youtubeId}
        streamableUrl={streamableUrl}
        posterSrc={posterSrc}
        isContained={false}
        overlayOpacity={80}
      />
      
      <div className="absolute inset-0 z-30">
        <div className="section-container h-full flex items-center">
          <div className={cn(
            "w-full lg:w-3/5 max-w-3xl content-spacing",
            isContentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
            "transition-all duration-1000 ease-out"
          )}>
            {badgeText && (
              <span className="inline-block bg-gold/90 text-white px-4 py-1 rounded-sm text-sm font-medium mb-6 transform hover:scale-105 transition-transform duration-300 shadow-lg">
                {badgeText}
              </span>
            )}
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-semibold text-white leading-tight mb-6 drop-shadow-md">
              {title}
            </h1>
            
            {subtitle && (
              <p className="text-lg md:text-xl text-white/90 mb-8 font-light max-w-2xl drop-shadow-md">
                {subtitle}
              </p>
            )}
            
            <HeroCtaButtons
              primaryCta={primaryCta}
              secondaryCta={secondaryCta}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DesktopVideoHero;
