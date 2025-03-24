
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface VideoBackgroundProps {
  youtubeId: string;
  posterSrc?: string;
  className?: string;
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({
  youtubeId,
  posterSrc,
  className
}) => {
  const isMobile = useIsMobile();
  
  return (
    <>
      {posterSrc && (
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center z-0" 
          style={{ backgroundImage: `url(${posterSrc})` }} 
        />
      )}
      
      <div className={cn(
        "absolute inset-0 w-full h-full z-10 pointer-events-none overflow-hidden",
        className
      )}>
        <iframe 
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${youtubeId}&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&disablekb=1&enablejsapi=1&playsinline=1`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          className={cn(
            "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-auto h-auto",
            isMobile 
              ? "min-w-[300%] min-h-[300%]" 
              : "min-w-[200%] min-h-[200%]"
          )}
          style={{ aspectRatio: '16/9' }}
          frameBorder="0"
          title="YouTube video player"
        />
      </div>
    </>
  );
};

export default VideoBackground;
