
import React, { useEffect, useState, useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface VideoBackgroundProps {
  youtubeId?: string;
  streamableUrl?: string;
  vimeoId?: string;
  posterSrc?: string;
  className?: string;
  overlayOpacity?: number;
  aspectRatio?: number;
  isContained?: boolean;
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({
  youtubeId,
  streamableUrl,
  vimeoId,
  posterSrc,
  className,
  overlayOpacity = 60,
  aspectRatio = 16 / 9,
  isContained = false
}) => {
  const isMobile = useIsMobile();
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Intersection Observer for lazy loading videos
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '100px', // Start loading 100px before coming into view
        threshold: 0.1
      }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  useEffect(() => {
    if (!isVisible) return;
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300); // Reduced from 500ms
    
    return () => clearTimeout(timer);
  }, [isVisible]);
  
  // Optimized video playback
  useEffect(() => {
    if (!isVisible || !videoRef.current) return;
    
    const playVideo = async () => {
      try {
        const video = videoRef.current;
        if (!video) return;
        
        video.muted = true;
        video.preload = 'metadata'; // Only load metadata initially
        
        const playPromise = video.play();
        
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log('Video playback started successfully');
            })
            .catch(error => {
              console.error('Error playing video:', error);
            });
        }
      } catch (error) {
        console.error('Error in playVideo function:', error);
      }
    };
    
    if (!vimeoId && streamableUrl) {
      playVideo();
    }
  }, [isVisible, vimeoId, streamableUrl]);
  
  // Preload Vimeo API only when needed
  useEffect(() => {
    if (vimeoId && isVisible) {
      if (!document.querySelector('script[src="https://player.vimeo.com/api/player.js"]')) {
        const script = document.createElement('script');
        script.src = 'https://player.vimeo.com/api/player.js';
        script.async = true;
        script.defer = true; // Add defer for better performance
        document.body.appendChild(script);
      }
    }
  }, [vimeoId, isVisible]);
  
  const renderVideoElement = () => {
    if (!isVisible) {
      // Show poster image while not visible
      return posterSrc ? (
        <img
          src={posterSrc}
          alt="Video poster"
          className="w-full h-full object-cover"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full bg-black" />
      );
    }
    
    if (vimeoId) {
      return (
        <div className="w-full h-full" style={{ position: 'relative', paddingBottom: '56.25%' }}>
          <iframe 
            ref={iframeRef}
            src={`https://player.vimeo.com/video/${vimeoId}?badge=0&autopause=0&autoplay=1&muted=1&background=1&player_id=0&app_id=58479&quality=auto`}
            style={{ 
              position: 'absolute', 
              top: '50%', 
              left: '50%', 
              width: isMobile ? '180%' : '140%',
              height: isMobile ? '180%' : '140%',
              transform: 'translate(-50%, -50%)',
              maxWidth: 'none',
              objectFit: 'cover'
            }}
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            title="Video Background"
            loading="lazy"
          />
        </div>
      );
    }
    
    if (streamableUrl) {
      return (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full h-full object-cover"
          style={{ 
            objectFit: isContained ? 'contain' : 'cover',
            width: isMobile ? '150%' : '120%',
            height: isMobile ? '150%' : '120%',
            transform: 'translate(-25%, -25%)',
            maxWidth: 'none',
            position: 'absolute',
            top: '50%',
            left: '50%'
          }}
          poster={posterSrc}
        >
          <source src={`${streamableUrl}.mp4`} type="video/mp4" />
          <source src={streamableUrl} type="video/mp4" />
        </video>
      );
    }
    
    if (youtubeId) {
      return (
        <iframe 
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${youtubeId}&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&disablekb=1&enablejsapi=1&playsinline=1&origin=${window.location.origin}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          className="w-full h-full"
          style={{ 
            objectFit: isContained ? 'contain' : 'cover',
            width: isMobile ? '160%' : '130%',
            height: isMobile ? '160%' : '130%',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: 'none'
          }}
          frameBorder="0"
          title="Video player"
          loading="lazy"
        />
      );
    }
    
    return null;
  };
  
  if (isContained) {
    return (
      <div ref={containerRef} className={cn("w-full overflow-hidden rounded-md shadow-lg", className)}>
        <AspectRatio ratio={aspectRatio}>
          {renderVideoElement()}
        </AspectRatio>
      </div>
    );
  }
  
  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full">
      {/* Loading background */}
      <div 
        className={cn(
          "absolute inset-0 w-full h-full bg-black z-0 transition-opacity duration-700",
          isLoading ? "opacity-100" : "opacity-80"
        )}
      />
      
      {/* Loading placeholder */}
      {isLoading && (
        <div className="absolute inset-0 w-full h-full z-5 bg-gradient-to-r from-black/80 via-black/90 to-black/80" />
      )}
      
      {/* Video content */}
      <div className={cn(
        "absolute inset-0 w-full h-full z-10 overflow-hidden transition-opacity duration-700",
        isLoading ? "opacity-0" : "opacity-100",
        className
      )}>
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        
        <div className="absolute inset-0 flex items-center justify-center w-full h-full">
          <div className="w-full h-full overflow-hidden relative">
            {renderVideoElement()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoBackground;
