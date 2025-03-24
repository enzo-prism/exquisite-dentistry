
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import Button from '@/components/Button';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import VideoBackground from './VideoBackground';

interface VideoHeroProps {
  videoSrc?: string;
  posterSrc: string;
  youtubeId?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  primaryCta?: {
    text: string;
    href?: string;
    onClick?: () => void;
  };
  secondaryCta?: {
    text: string;
    href: string;
  };
  overlayColor?: 'dark' | 'light' | 'gradient';
  className?: string;
  contentClassName?: string;
  height?: 'full' | 'large' | 'medium';
}

// Collection of YouTube IDs to choose from if none is provided
const YOUTUBE_VIDEOS = {
  DEFAULT: 'GfC4M9HRR_A',  // Original default
  COSMETIC: '3pNo4sKFB58', // Cosmetic dentistry
  SMILE: 'dpd6glBbZVU',    // Smile makeover
  PATIENT: '3O6FuKufvL4',  // Patient experience
  PROCEDURE: '6QACxCt6J7g', // Dental procedure
  OFFICE: 'ogjAzMV2ZYY'    // Office tour
};

const VideoHero: React.FC<VideoHeroProps> = ({
  videoSrc,
  posterSrc,
  youtubeId = YOUTUBE_VIDEOS.DEFAULT,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  overlayColor = 'dark',
  className,
  contentClassName,
  height = 'full'
}) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const isMobile = useIsMobile();
  
  // Handle video load event
  const handleVideoLoaded = () => {
    setIsVideoLoaded(true);
  };

  // Define height classes
  const heightClasses = {
    full: 'h-screen',
    large: 'h-[80vh]',
    medium: 'h-[60vh]',
  };

  // Define overlay classes
  const overlayClasses = {
    dark: 'bg-black/60',
    light: 'bg-white/30',
    gradient: 'bg-gradient-to-b from-black/70 via-black/50 to-black/70'
  };

  return (
    <section 
      className={cn(
        'relative flex items-center overflow-hidden w-full', 
        heightClasses[height],
        className
      )}
    >
      {/* Background with YouTube video */}
      <VideoBackground youtubeId={youtubeId} posterSrc={posterSrc} />
      
      {/* Overlay */}
      <div className={cn(
        'absolute inset-0 z-20',
        overlayClasses[overlayColor]
      )} />

      {/* Content */}
      <div className={cn(
        'relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center',
        contentClassName
      )}>
        <div className="max-w-3xl mx-auto opacity-0 animate-fade-in">
          {/* Added vertical space for the badge */}
          <span className="inline-block bg-gold/90 text-white px-4 py-1 rounded-sm text-sm font-medium mb-8">
            MEET DR. ALEXIE AGUIL
          </span>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-semibold text-white leading-tight mb-8">
            {title}
          </h1>
          
          {subtitle && (
            <p className="text-lg md:text-xl text-white/90 mb-10 font-light max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            {primaryCta && (
              primaryCta.href ? (
                <Link to={primaryCta.href}>
                  <Button size="lg" onClick={primaryCta.onClick}>
                    {primaryCta.text}
                  </Button>
                </Link>
              ) : (
                <Button size="lg" onClick={primaryCta.onClick}>
                  {primaryCta.text}
                </Button>
              )
            )}
            
            {secondaryCta && (
              <Link to={secondaryCta.href}>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                  {secondaryCta.text}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// Export the YouTube IDs for use in other components
export { YOUTUBE_VIDEOS };
export default VideoHero;
