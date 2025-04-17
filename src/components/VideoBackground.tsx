
import React, { useEffect, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface VideoBackgroundProps {
  youtubeId: string;
  posterSrc?: string;
  className?: string;
  overlayOpacity?: number;
  aspectRatio?: number; // Add support for custom aspect ratio
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({
  youtubeId,
  posterSrc,
  className,
  overlayOpacity = 60,
  aspectRatio = 16 / 9 // Default to standard 16:9 ratio
}) => {
  const isMobile = useIsMobile();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Reduced loading time for faster video appearance
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
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
      
      {/* YouTube iframe with proper aspect ratio container */}
      <div className={cn(
        "absolute inset-0 w-full h-full z-10 overflow-hidden transition-opacity duration-700",
        isLoading ? "opacity-0" : "opacity-100",
        className
      )}>
        <div className="absolute inset-0 flex items-center justify-center w-full h-full">
          <div className="relative w-full h-full max-h-screen overflow-hidden">
            <iframe 
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${youtubeId}&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&disablekb=1&enablejsapi=1&playsinline=1&origin=${window.location.origin}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              className="absolute w-full h-full top-0 left-0 right-0 bottom-0"
              style={{ objectFit: 'cover' }}
              frameBorder="0"
              title="YouTube video player"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoBackground;
