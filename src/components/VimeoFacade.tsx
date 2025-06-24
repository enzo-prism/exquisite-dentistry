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
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [shouldAutoLoad, setShouldAutoLoad] = useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  
  // Generate Vimeo thumbnail URL if not provided
  const defaultThumbnail = `/lovable-uploads/96c9493a-c97f-4076-b224-591c2e9c50e6.png`; // Use a default poster
  const thumbnail = thumbnailUrl || defaultThumbnail;
  
  // Use Intersection Observer to detect when video is in viewport
  useEffect(() => {
    if (!background || !autoplay) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsIntersecting(true);
            // Auto-load after a delay if in viewport and page is idle
            if ('requestIdleCallback' in window) {
              window.requestIdleCallback(() => {
                setShouldAutoLoad(true);
              }, { timeout: 3000 });
            } else {
              setTimeout(() => setShouldAutoLoad(true), 3000);
            }
          }
        });
      },
      { rootMargin: '50px', threshold: 0.1 }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => observer.disconnect();
  }, [background, autoplay]);
  
  // Auto-load for background videos after delay
  useEffect(() => {
    if (shouldAutoLoad && isIntersecting && background && !isLoaded) {
      setIsLoaded(true);
    }
  }, [shouldAutoLoad, isIntersecting, background, isLoaded]);
  
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
      <div ref={containerRef} className={cn("relative w-full h-full", className)}>
        <iframe
          src={vimeoUrl}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
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
      ref={containerRef}
      className={cn(
        "relative w-full h-full cursor-pointer group overflow-hidden",
        className
      )}
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
      
      {/* Loading shimmer for background videos */}
      {background && isIntersecting && !shouldAutoLoad && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
      )}
    </div>
  );
};

export default VimeoFacade; 