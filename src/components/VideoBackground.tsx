import React, { useEffect, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface VideoBackgroundProps {
  youtubeId: string;
  posterSrc?: string;
  className?: string;
  overlayOpacity?: number;
  aspectRatio?: number;
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({
  youtubeId,
  posterSrc,
  className,
  overlayOpacity = 60,
  aspectRatio = 16 / 9
}) => {
  const isMobile = useIsMobile();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [youtubeId]);
  
  return (
    <>
      <div 
        className={cn(
          "absolute inset-0 w-full h-full bg-black z-0 transition-opacity duration-700",
          isLoading ? "opacity-100" : "opacity-80"
        )}
      />
      
      {isLoading && (
        <div className="absolute inset-0 w-full h-full z-5 bg-gradient-to-r from-black/80 via-black/90 to-black/80 animate-pulse-subtle" />
      )}
      
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
            
            <div 
              className="absolute bottom-0 right-0 w-32 h-16 z-20" 
              style={{
                backgroundColor: '#000000',
                borderTopLeftRadius: "8px"
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoBackground;
