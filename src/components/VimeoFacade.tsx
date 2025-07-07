
import React, { useState, useEffect } from 'react';
import { Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import OptimizedImage from '@/components/OptimizedImage';

interface VimeoFacadeProps {
  videoId: string;
  title?: string;
  thumbnailUrl?: string;
  className?: string;
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
  background?: boolean;
  controls?: boolean;
  onReady?: () => void;
}

const VimeoFacade: React.FC<VimeoFacadeProps> = ({
  videoId,
  title = 'Video',
  thumbnailUrl,
  className,
  autoplay = true,
  muted = true,
  loop = true,
  background = true,
  controls = false,
  onReady,
}) => {
  const [isLoaded, setIsLoaded] = useState(false); // All videos lazy load now
  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  
  // Use the uploaded placeholder image as default for background videos
  const defaultThumbnail = background ? 
    `/lovable-uploads/256920f0-c51d-4074-a81d-e59e35b71946.png` : 
    `/lovable-uploads/96c9493a-c97f-4076-b224-591c2e9c50e6.png`;
  const thumbnail = thumbnailUrl || defaultThumbnail;
  
  // Handle iframe load event
  useEffect(() => {
    if (!isLoaded || !iframeRef.current) return;
    
    const iframe = iframeRef.current;
    
    const handleLoad = () => {
      onReady?.();
    };
    
    iframe.addEventListener('load', handleLoad);
    
    return () => {
      iframe.removeEventListener('load', handleLoad);
    };
  }, [isLoaded, onReady]);
  
  const handleClick = () => {
    if (!isLoaded) {
      setIsLoaded(true);
    }
  };
  
  // Build Vimeo URL with parameters
  const vimeoUrl = `https://player.vimeo.com/video/${videoId}?` + 
    `badge=0&autopause=0&autoplay=${autoplay ? 1 : 0}&muted=${muted ? 1 : 0}` +
    `&controls=${controls ? 1 : 0}&title=0&byline=0&portrait=0` +
    `&background=${background ? 1 : 0}&loop=${loop ? 1 : 0}` +
    `&player_id=0&app_id=58479&quality=auto`;
  
  if (isLoaded) {
    return (
      <div 
        className={cn("relative w-full h-full", className)}
        style={{ 
          aspectRatio: '16/9',
          contain: 'layout',
          containIntrinsicSize: '100% 56.25%'
        }}
      >
        <iframe
          ref={iframeRef}
          src={vimeoUrl}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%'
          }}
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
          title={title}
          loading="lazy"
        />
      </div>
    );
  }
  
  return (
    <div
      className={cn(
        "relative w-full h-full cursor-pointer group overflow-hidden",
        className
      )}
      style={{ 
        aspectRatio: '16/9',
        contain: 'layout',
        containIntrinsicSize: '100% 56.25%'
      }}
      onClick={handleClick}
    >
      {/* Thumbnail */}
      <OptimizedImage
        src={thumbnail}
        alt={`${title} thumbnail`}
        className="w-full h-full object-cover"
        width={1920}
        height={1080}
      />
      
      {/* Play button overlay (only for non-background videos) */}
      {!background && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
          <div className="bg-gold/90 text-white rounded-full p-4 group-hover:scale-110 transition-transform">
            <Play className="h-8 w-8" fill="currentColor" />
          </div>
        </div>
      )}
    </div>
  );
};

export default VimeoFacade;
