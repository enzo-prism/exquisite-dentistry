
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { OptimizedImage } from '@/components/seo';

interface VideoBackgroundProps {
  youtubeId?: string;
  streamableUrl?: string;
  vimeoId?: string;
  posterSrc?: string;
  className?: string;
  overlayOpacity?: number;
  aspectRatio?: number;
  isContained?: boolean;
  onLoad?: () => void;
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({
  youtubeId,
  streamableUrl,
  vimeoId,
  posterSrc,
  className,
  overlayOpacity = 60,
  aspectRatio = 16 / 9,
  isContained = false,
  onLoad
}) => {
  const isMobile = useIsMobile();
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const hasVideo = Boolean(vimeoId || youtubeId || streamableUrl);

  const preconnectOrigin = useCallback((origin: string) => {
    if (typeof document === 'undefined') return;
    if (document.querySelector(`link[rel="preconnect"][href="${origin}"]`)) return;

    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = origin;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  }, []);

  const preconnectVideoOrigins = useCallback(() => {
    if (vimeoId) {
      preconnectOrigin('https://player.vimeo.com');
      preconnectOrigin('https://f.vimeocdn.com');
    }

    if (youtubeId) {
      preconnectOrigin('https://www.youtube.com');
    }

    if (streamableUrl) {
      try {
        const origin = new URL(streamableUrl).origin;
        preconnectOrigin(origin);
      } catch (error) {
        // Ignore invalid URLs
      }
    }
  }, [preconnectOrigin, streamableUrl, vimeoId, youtubeId]);

  useEffect(() => {
    if (!hasVideo || typeof window === 'undefined') return;

    const element = containerRef.current;
    if (!element || typeof IntersectionObserver === 'undefined') {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: isContained ? '150px' : '300px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [hasVideo, isContained]);

  useEffect(() => {
    if (!hasVideo || !isInView || shouldLoadVideo || typeof window === 'undefined') return;

    const scheduleLoad = () => {
      preconnectVideoOrigins();
      setShouldLoadVideo(true);
    };

    if ('requestIdleCallback' in window) {
      const idleId = window.requestIdleCallback(scheduleLoad, { timeout: 2000 });
      return () => window.cancelIdleCallback(idleId);
    }

    const timeoutId = window.setTimeout(scheduleLoad, 1200);
    return () => window.clearTimeout(timeoutId);
  }, [hasVideo, isInView, shouldLoadVideo, preconnectVideoOrigins]);
  
  // Handle video playback for streamable videos
  useEffect(() => {
    if (!shouldLoadVideo || !videoRef.current || !streamableUrl || vimeoId) return;
    
    const playVideo = async () => {
      try {
        const video = videoRef.current;
        if (!video) return;
        
        video.muted = true;
        video.preload = 'metadata';
        
        const playPromise = video.play();
        
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              onLoad?.();
            })
            .catch(error => {
              console.error('Error playing video:', error);
            });
        }
      } catch (error) {
        console.error('Error in playVideo function:', error);
      }
    };
    
    playVideo();
  }, [shouldLoadVideo, streamableUrl, vimeoId, onLoad]);
  
  const renderVideoElement = () => {
    if (!shouldLoadVideo && posterSrc) {
      return (
        <OptimizedImage
          src={posterSrc}
          alt=""
          aria-hidden="true"
          priority
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
          sizes="100vw"
        />
      );
    }

    if (!shouldLoadVideo) {
      return null;
    }

    if (vimeoId) {
      return (
        <iframe
          src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1&muted=1&controls=0&loop=1&title=0&byline=0&portrait=0&background=1`}
          className="absolute inset-0 w-full h-full"
          style={{ 
            width: '140%',
            height: '140%',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: 'none',
            maxHeight: 'none'
          }}
          frameBorder="0"
          allow="autoplay; fullscreen"
          title="Background video"
          loading="lazy"
          onLoad={() => onLoad?.()}
        />
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
          className="absolute inset-0 w-full h-full"
          style={{ 
            objectFit: isContained ? 'contain' : 'cover',
            width: '100%',
            height: '100%',
            minWidth: '100%',
            minHeight: '100%',
            position: 'absolute',
            top: '0',
            left: '0'
          }}
        >
          <source src={`${streamableUrl}.mp4`} type="video/mp4" />
          <source src={streamableUrl} type="video/mp4" />
        </video>
      );
    }
    
    if (youtubeId) {
      return (
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <iframe 
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${youtubeId}&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&disablekb=1&enablejsapi=1&playsinline=1&origin=${window.location.origin}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            className="absolute"
            style={{ 
              width: isMobile ? '200%' : '140%',
              height: isMobile ? '200%' : '140%',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              maxWidth: 'none',
              maxHeight: 'none',
              objectFit: 'cover'
            }}
            frameBorder="0"
            title="Video player"
            loading="lazy"
            onLoad={() => onLoad?.()}
          />
        </div>
      );
    }
    
    // No video - just return null for solid black background
    return null;
  };
  
  if (isContained) {
    return (
      <div
        ref={containerRef}
        className={cn("w-full overflow-hidden rounded-md shadow-lg bg-black", className)}
      >
        <AspectRatio ratio={aspectRatio}>
          {renderVideoElement()}
        </AspectRatio>
      </div>
    );
  }
  
  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full bg-black">
      {/* Video content */}
      <div className={cn("absolute inset-0 w-full h-full z-10 overflow-hidden bg-black", className)}>
        {/* Dark overlay */}
        <div 
          className="absolute inset-0 bg-black z-10"
          style={{ opacity: overlayOpacity / 100 }}
        />
        
        {/* Video container */}
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
