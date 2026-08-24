
import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
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
  const playerId = useId().replace(/:/g, '');
  const [isInView, setIsInView] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
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

    // Feature-test by value, not `'requestIdleCallback' in window`: lib.dom declares
    // it as a required member of Window, so `in` narrows the fallback branch to
    // `never` and TypeScript treats the setTimeout path as dead code.
    if (typeof window.requestIdleCallback === 'function') {
      const idleId = window.requestIdleCallback(scheduleLoad, { timeout: 2000 });
      return () => window.cancelIdleCallback(idleId);
    }

    const timeoutId = window.setTimeout(scheduleLoad, 1200);
    return () => window.clearTimeout(timeoutId);
  }, [hasVideo, isInView, shouldLoadVideo, preconnectVideoOrigins]);

  useEffect(() => {
    setIsVideoReady(false);
  }, [streamableUrl, vimeoId, youtubeId]);

  useEffect(() => {
    if (!vimeoId || typeof window === 'undefined') return;

    const handleVimeoMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://player.vimeo.com') return;

      let payload = event.data;
      if (typeof payload === 'string') {
        try {
          payload = JSON.parse(payload);
        } catch {
          return;
        }
      }

      if (!payload || payload.player_id !== playerId) return;
      // Keep the poster in place through Vimeo's `ready` event. `ready` only
      // means that the player API initialized; it does not guarantee that a
      // video frame has painted yet.
      if (payload.event === 'play' || payload.event === 'playing') {
        setIsVideoReady(true);
        onLoad?.();
      }
    };

    window.addEventListener('message', handleVimeoMessage);
    return () => window.removeEventListener('message', handleVimeoMessage);
  }, [onLoad, playerId, vimeoId]);
  
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
    // The full-bleed wrapper owns its poster layer, so it remains visible while
    // video loading is deferred. Contained players render the same poster here.
    if (!shouldLoadVideo) {
      if (isContained && posterSrc) {
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

      return null;
    }

    if (vimeoId) {
      return (
        <iframe
          src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1&muted=1&controls=0&loop=1&title=0&byline=0&portrait=0&background=1&player_id=${playerId}`}
          className="absolute inset-0 h-full w-full transition-opacity duration-500"
          style={{
            width: '140%',
            height: '140%',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: 'none',
            maxHeight: 'none',
            backgroundColor: '#000',
            opacity: isVideoReady ? 1 : 0
          }}
          frameBorder="0"
          allow="autoplay; fullscreen"
          title="Background video"
          loading="lazy"
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
            left: '0',
            backgroundColor: '#000'
          }}
          poster={posterSrc}
          onPlaying={() => {
            setIsVideoReady(true);
            onLoad?.();
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
              objectFit: 'cover',
              backgroundColor: '#000'
            }}
            frameBorder="0"
            title="Video player"
            loading="lazy"
            onLoad={() => onLoad?.()}
          />
        </div>
      );
    }
    
    // No video element is needed; the full-bleed wrapper keeps its poster visible.
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
        {posterSrc ? (
          <OptimizedImage
            src={posterSrc}
            alt=""
            aria-hidden="true"
            priority
            decoding="async"
            className={cn(
              'absolute inset-0 z-[5] h-full w-full object-cover transition-opacity duration-500',
              isVideoReady && 'pointer-events-none opacity-0'
            )}
            sizes="100vw"
          />
        ) : null}
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
