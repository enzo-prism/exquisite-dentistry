
import React, { useEffect, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface VideoBackgroundProps {
  youtubeId: string;
  posterSrc?: string;
  className?: string;
  overlayOpacity?: number;
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({
  youtubeId,
  posterSrc,
  className,
  overlayOpacity = 60
}) => {
  const isMobile = useIsMobile();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Reduce loading time for faster video appearance
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // Reduced from 800ms to 500ms for faster loading
    
    return () => clearTimeout(timer);
  }, [youtubeId]);
  
  return (
    <>
      {/* Black background (visible during loading) */}
      <div 
        className={cn(
          "absolute inset-0 w-full h-full bg-black z-0 transition-opacity duration-700",
          isLoading ? "opacity-100" : "opacity-80"
        )}
      />
      
      {/* Animated gradient overlay (visible during loading) */}
      {isLoading && (
        <div className="absolute inset-0 w-full h-full z-5 bg-gradient-to-r from-black/80 via-black/90 to-black/80 animate-pulse-subtle" />
      )}
      
      {/* YouTube iframe */}
      <div className={cn(
        "absolute inset-0 w-full h-full z-10 pointer-events-none overflow-hidden transition-opacity duration-700",
        isLoading ? "opacity-0" : "opacity-100",
        className
      )}>
        <iframe 
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${youtubeId}&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&disablekb=1&enablejsapi=1&playsinline=1&origin=${window.location.origin}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          className={cn(
            "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-auto h-auto",
            isMobile 
              ? "min-w-[400%] min-h-[400%]" // Increased coverage for better mobile display
              : "min-w-[200%] min-h-[200%]"
          )}
          style={{ aspectRatio: '16/9' }}
          frameBorder="0"
          title="YouTube video player"
          loading="eager" // Changed from "lazy" to "eager" for faster loading
        />
      </div>
    </>
  );
};

export default VideoBackground;
