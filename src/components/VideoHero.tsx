import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import Button from '@/components/Button';
import { Link } from 'react-router-dom';
import { useIsMobile, useBreakpoint } from '@/hooks/use-mobile';
import VideoBackground from './VideoBackground';
import { ArrowRight, ChevronDown } from 'lucide-react';

interface VideoHeroProps {
  videoSrc?: string;
  posterSrc?: string;
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
  overlayColor?: 'dark' | 'light' | 'gradient' | 'none';
  className?: string;
  contentClassName?: string;
  height?: 'full' | 'large' | 'medium';
  badgeText?: string;
  alignment?: 'center' | 'left';
  scrollIndicator?: boolean;
  aspectRatio?: number;
}

const YOUTUBE_VIDEOS = {
  DEFAULT: 'GfC4M9HRR_A',
  COSMETIC: '3pNo4sKFB58',
  SMILE: 'dpd6glBbZVU',
  PATIENT: '3O6FuKufvL4',
  PROCEDURE: '6QACxCt6J7g',
  OFFICE: 'ogjAzMV2ZYY'
};

const VideoHero: React.FC<VideoHeroProps> = ({
  videoSrc,
  posterSrc,
  youtubeId = YOUTUBE_VIDEOS.DEFAULT,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  overlayColor = 'gradient',
  className,
  contentClassName,
  height = 'full',
  badgeText = "MEET DR. ALEXIE AGUIL",
  alignment = 'center',
  scrollIndicator = true,
  aspectRatio = 16 / 9
}) => {
  const [isContentVisible, setIsContentVisible] = useState(false);
  const isMobile = useIsMobile();
  const { current: breakpoint } = useBreakpoint();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsContentVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  const scrollToNextSection = () => {
    const heroSection = document.querySelector('section');
    if (heroSection && heroSection.nextElementSibling) {
      heroSection.nextElementSibling.scrollIntoView({ 
        behavior: 'smooth' 
      });
    }
  };

  const heightClasses = {
    full: 'min-h-screen',
    large: 'min-h-[80vh]',
    medium: 'min-h-[60vh]',
  };

  const overlayClasses = {
    dark: 'bg-black/60',
    light: 'bg-white/30',
    gradient: 'bg-gradient-to-b from-black/70 via-black/50 to-black/70',
    none: ''
  };

  const alignmentClasses = {
    center: 'text-center mx-auto',
    left: 'text-left ml-0 mr-auto'
  };

  if (isMobile) {
    return (
      <section 
        className={cn(
          'relative flex flex-col bg-black w-full pb-8', 
          heightClasses[height],
          className
        )}
      >
        <div className={cn(
          'w-full px-4 pt-24 pb-6 z-20 bg-black',
          contentClassName
        )}>
          <div className={cn(
            "w-full transition-all duration-1000 ease-out",
            alignmentClasses[alignment],
            isContentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            {badgeText && (
              <span className="inline-block bg-gold/90 text-white px-4 py-1 rounded-sm text-sm font-medium mb-6 transform hover:scale-105 transition-transform duration-300">
                {badgeText}
              </span>
            )}
            
            <h1 className="text-3xl sm:text-4xl font-sans font-semibold text-white leading-tight mb-6 relative">
              {title}
            </h1>
            
            {subtitle && (
              <p className={cn(
                "text-base text-white/90 mb-6 font-light",
                alignment === 'center' ? 'w-full' : 'w-full'
              )}>
                {subtitle}
              </p>
            )}
          </div>
        </div>
        
        <div className="w-full px-4 z-10">
          <VideoBackground 
            youtubeId={youtubeId} 
            posterSrc={posterSrc} 
            aspectRatio={aspectRatio}
            isContained={true}
          />
        </div>
        
        <div className={cn(
          "w-full px-4 pt-6 z-20",
          alignment === 'center' ? 'flex flex-col items-center' : 'flex flex-col'
        )}>
          {primaryCta && (
            primaryCta.href ? (
              primaryCta.href.startsWith('http') ? (
                <a 
                  href={primaryCta.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-full mb-4"
                >
                  <Button 
                    size="default"
                    onClick={primaryCta.onClick}
                    fullWidth={true}
                    className="group shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {primaryCta.text}
                    <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </a>
              ) : (
                <Link to={primaryCta.href} className="w-full mb-4">
                  <Button 
                    size="default"
                    onClick={primaryCta.onClick}
                    fullWidth={true}
                    className="group shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {primaryCta.text}
                    <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              )
            ) : (
              <Button 
                size="default"
                onClick={primaryCta.onClick}
                fullWidth={true}
                className="group shadow-lg hover:shadow-xl transition-all duration-300 mb-4"
              >
                {primaryCta.text}
                <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            )
          )}
          
          {secondaryCta && (
            <Link to={secondaryCta.href} className="w-full">
              <Button 
                variant="outline" 
                size="default"
                className="border-white text-white hover:bg-white/10 group"
                fullWidth={true}
              >
                {secondaryCta.text}
                <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          )}
        </div>
        
        {scrollIndicator && height === 'full' && (
          <div 
            className="w-full flex justify-center pt-4 z-20 cursor-pointer animate-bounce"
            onClick={scrollToNextSection}
          >
            <div className="flex flex-col items-center">
              <span className="text-white/70 text-xs mb-1">Scroll Down</span>
              <ChevronDown className="text-white/70 w-5 h-5" />
            </div>
          </div>
        )}
      </section>
    );
  }

  return (
    <section 
      className={cn(
        'relative flex items-center overflow-hidden w-full', 
        heightClasses[height],
        className
      )}
    >
      <VideoBackground youtubeId={youtubeId} posterSrc={posterSrc} aspectRatio={aspectRatio} />
      
      <div className={cn(
        'absolute inset-0 z-20',
        overlayClasses[overlayColor]
      )} />

      <div className={cn(
        'relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full',
        contentClassName
      )}>
        <div className={cn(
          "max-w-3xl transition-all duration-1000 ease-out",
          alignmentClasses[alignment],
          isContentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          {badgeText && (
            <span className="inline-block bg-gold/90 text-white px-4 py-1 rounded-sm text-sm font-medium mb-6 md:mb-8 transform hover:scale-105 transition-transform duration-300">
              {badgeText}
            </span>
          )}
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-sans font-semibold text-white leading-tight mb-6 md:mb-8 relative">
            {title}
          </h1>
          
          {subtitle && (
            <p className={cn(
              "text-base sm:text-lg md:text-xl text-white/90 mb-8 md:mb-10 font-light",
              alignment === 'center' ? 'max-w-2xl mx-auto' : 'max-w-2xl'
            )}>
              {subtitle}
            </p>
          )}
          
          <div className={cn(
            "flex items-center space-y-4 mt-6 md:mt-8",
            alignment === 'center' 
              ? "flex-col sm:flex-row sm:space-y-0 sm:space-x-4 justify-center" 
              : "flex-col sm:flex-row sm:space-y-0 sm:space-x-4"
          )}>
            {primaryCta && (
              primaryCta.href ? (
                primaryCta.href.startsWith('http') ? (
                  <a href={primaryCta.href} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                    <Button 
                      size={isMobile ? "default" : "lg"}
                      onClick={primaryCta.onClick}
                      fullWidth={isMobile}
                      className="group shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      {primaryCta.text}
                      <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </a>
                ) : (
                  <Link to={primaryCta.href} className="w-full sm:w-auto">
                    <Button 
                      size={isMobile ? "default" : "lg"}
                      onClick={primaryCta.onClick}
                      fullWidth={isMobile}
                      className="group shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      {primaryCta.text}
                      <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                )
              ) : (
                <Button 
                  size={isMobile ? "default" : "lg"}
                  onClick={primaryCta.onClick}
                  fullWidth={isMobile}
                  className="group shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {primaryCta.text}
                  <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              )
            )}
            
            {secondaryCta && (
              <Link to={secondaryCta.href} className="w-full sm:w-auto">
                <Button 
                  variant="outline" 
                  size={isMobile ? "default" : "lg"}
                  className="border-white text-white hover:bg-white/10 group"
                  fullWidth={isMobile}
                >
                  {secondaryCta.text}
                  <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
      
      {scrollIndicator && height === 'full' && (
        <div 
          className="absolute bottom-8 left-0 right-0 mx-auto z-30 flex justify-center cursor-pointer animate-bounce"
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

export { YOUTUBE_VIDEOS };
export default VideoHero;
