
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import Button from '@/components/Button';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

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

const VideoHero: React.FC<VideoHeroProps> = ({
  videoSrc,
  posterSrc,
  youtubeId,
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
        'relative flex items-center overflow-hidden', 
        heightClasses[height],
        className
      )}
    >
      {/* Background Options: YouTube, regular video, or image */}
      <div className="absolute inset-0 bg-cover bg-center z-0" 
           style={{ backgroundImage: `url(${posterSrc})` }} />
      
      {youtubeId ? (
        <div className="absolute inset-0 w-full h-full z-10 pointer-events-none">
          <div className="relative w-full h-full overflow-hidden">
            <iframe 
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${youtubeId}&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&disablekb=1&enablejsapi=1&playsinline=1`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              className={cn(
                "absolute top-1/2 left-1/2 min-w-[150%] min-h-[150%] transform -translate-x-1/2 -translate-y-1/2 w-auto h-auto",
                isMobile ? "min-w-[250%] min-h-[250%]" : "min-w-[150%] min-h-[150%]"
              )}
              frameBorder="0"
              title="YouTube video player"
            />
          </div>
        </div>
      ) : videoSrc ? (
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          onLoadedData={handleVideoLoaded}
          className={cn(
            "absolute inset-0 w-full h-full object-cover z-10 transition-opacity duration-700",
            isVideoLoaded ? 'opacity-100' : 'opacity-0'
          )}
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : null}

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
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-semibold text-white leading-tight mb-6">
            {title}
          </h1>
          
          {subtitle && (
            <p className="text-lg md:text-xl text-white/90 mb-8 font-light max-w-2xl mx-auto">
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

export default VideoHero;
