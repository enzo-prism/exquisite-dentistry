
import React, { useEffect, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface VideoBackgroundProps {
  youtubeId?: string;
  streamableUrl?: string;
  posterSrc?: string;
  className?: string;
  overlayOpacity?: number;
  aspectRatio?: number;
  isContained?: boolean;
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({
  youtubeId,
  streamableUrl,
  posterSrc,
  className,
  overlayOpacity = 60,
  aspectRatio = 16 / 9,
  isContained = false
}) => {
  const isMobile = useIsMobile();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [youtubeId, streamableUrl]);
  
  // Render Streamable video if URL is provided
  const renderVideoElement = () => {
    if (streamableUrl) {
      return (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          style={{ objectFit: isContained ? 'contain' : 'cover' }}
        >
          <source src={streamableUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    }
    
    // Fallback to YouTube if no Streamable URL
    if (youtubeId) {
      return (
        <iframe 
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${youtubeId}&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&disablekb=1&enablejsapi=1&playsinline=1&origin=${window.location.origin}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          className="w-full h-full"
          style={{ objectFit: isContained ? 'contain' : 'cover' }}
          frameBorder="0"
          title="Video player"
          loading="eager"
        />
      );
    }
    
    return null;
  };
  
  // For contained mode, return a simpler component with proper aspect ratio
  if (isContained) {
    return (
      <div className={cn("w-full overflow-hidden rounded-md shadow-lg", className)}>
        <AspectRatio ratio={aspectRatio}>
          {renderVideoElement()}
        </AspectRatio>
      </div>
    );
  }
  
  // Original background implementation for desktop
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
            {renderVideoElement()}
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoBackground;
