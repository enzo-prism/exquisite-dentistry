
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import Button from '@/components/Button';
import { Link } from 'react-router-dom';

interface VideoHeroProps {
  videoSrc?: string;
  posterSrc: string;
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
      {/* Video or Image Background */}
      {videoSrc ? (
        <>
          <div className="absolute inset-0 bg-cover bg-center z-0" 
               style={{ backgroundImage: `url(${posterSrc})` }} />
          
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
        </>
      ) : (
        <div 
          className="absolute inset-0 bg-cover bg-center z-10" 
          style={{ backgroundImage: `url(${posterSrc})` }} 
        />
      )}

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
