
import React, { useEffect, useState, useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import VimeoFacade from './VimeoFacade';
import OptimizedImage from '@/components/OptimizedImage';

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
  const [isVimeoReady, setIsVimeoReady] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [hasReducedMotion, setHasReducedMotion] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setHasReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => setHasReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  
  // Enhanced video ready handler with smoother transition timing
  const handleVideoReady = () => {
    setIsVimeoReady(true);
    setLoadingProgress(100);
    
    // Use shorter delay for reduced motion, longer for smooth transition
    const transitionDelay = hasReducedMotion ? 100 : (isMobile ? 300 : 500);
    
    setTimeout(() => {
      setShowVideo(true);
      if (onLoad) {
        onLoad();
      }
    }, transitionDelay);
  };
  
  // Simulate loading progress for better UX
  useEffect(() => {
    if (isVimeoReady || showVideo) return;
    
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 90) return prev; // Stop at 90% until video is actually ready
        return prev + Math.random() * 10;
      });
    }, 200);
    
    return () => clearInterval(interval);
  }, [isVimeoReady, showVideo]);
  
  // Handle video playback for streamable videos with progress tracking
  useEffect(() => {
    if (!videoRef.current || !streamableUrl || vimeoId) return;
    
    const playVideo = async () => {
      try {
        const video = videoRef.current;
        if (!video) return;
        
        video.muted = true;
        video.preload = 'metadata';
        
        // Track loading progress
        video.addEventListener('loadstart', () => setLoadingProgress(10));
        video.addEventListener('loadedmetadata', () => setLoadingProgress(50));
        video.addEventListener('canplaythrough', () => setLoadingProgress(90));
        
        const playPromise = video.play();
        
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log('Video playback started successfully');
              handleVideoReady();
            })
            .catch(error => {
              console.error('Error playing video:', error);
              // Fallback to poster image on error
              setShowVideo(false);
              setIsVimeoReady(false);
            });
        }
      } catch (error) {
        console.error('Error in playVideo function:', error);
      }
    };
    
    playVideo();
  }, [streamableUrl, vimeoId]);
  
  // Get mobile-optimized object position
  const getMobileOptimizedPosition = () => {
    if (isMobile) {
      return 'center 30%'; // Better positioning for mobile portraits
    }
    return 'center center';
  };
  
  // Get mobile-optimized overlay opacity
  const getMobileOverlayOpacity = () => {
    if (isMobile) {
      return Math.min(overlayOpacity + 10, 70); // Slightly darker on mobile for better text readability
    }
    return overlayOpacity;
  };
  
  const renderVideoElement = () => {
    if (vimeoId) {
      console.log('Rendering Vimeo video:', vimeoId);
      return (
        <VimeoFacade
          videoId={vimeoId}
          thumbnailUrl={posterSrc}
          className="w-full h-full"
          autoplay={true}
          muted={true}
          loop={true}
          background={true}
          controls={false}
          onReady={handleVideoReady}
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
          poster={posterSrc}
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
            onLoad={handleVideoReady}
          />
        </div>
      );
    }
    
    // Fallback to poster image
    const fallbackPoster = posterSrc || "/lovable-uploads/96c9493a-c97f-4076-b224-591c2e9c50e6.png";
    return (
      <OptimizedImage
        src={fallbackPoster}
        alt="Video poster"
        className="w-full h-full object-cover"
        width={1920}
        height={1080}
      />
    );
  };
  
  if (isContained) {
    return (
      <div className={cn("w-full overflow-hidden rounded-md shadow-lg bg-black", className)}>
        <AspectRatio ratio={aspectRatio}>
          {renderVideoElement()}
        </AspectRatio>
      </div>
    );
  }
  
  const transitionDuration = hasReducedMotion ? 'duration-300' : 'duration-1000';
  const mobileOverlayOpacity = getMobileOverlayOpacity();
  
  return (
    <div className="absolute inset-0 w-full h-full bg-black">
      {/* Enhanced Placeholder Image with mobile optimization */}
      <div 
        className={cn(
          `absolute inset-0 w-full h-full z-20 transition-all ${transitionDuration}`,
          showVideo ? "opacity-0 pointer-events-none scale-105" : "opacity-100 scale-100"
        )}
        style={{
          transform: showVideo ? 'scale(1.05)' : 'scale(1)',
          willChange: 'transform, opacity'
        }}
      >
        <OptimizedImage
          src="/lovable-uploads/548b9e25-d837-4cea-a035-32be2b9af785.png"
          alt="Loading placeholder"
          className="w-full h-full"
          width={1920}
          height={1080}
          objectFit="cover"
          objectPosition={getMobileOptimizedPosition()}
          priority={true}
        />
        
        {/* Adaptive overlay */}
        <div 
          className="absolute inset-0 bg-black z-10"
          style={{ opacity: mobileOverlayOpacity / 100 }}
        />
        
        {/* Loading progress indicator for slower connections */}
        {!hasReducedMotion && loadingProgress < 100 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
            <div className="w-32 h-1 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white/60 transition-all duration-300 ease-out"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Video content with enhanced mobile optimization */}
      <div className={cn("absolute inset-0 w-full h-full z-10 overflow-hidden bg-black", className)}>
        {/* Adaptive dark overlay */}
        <div 
          className="absolute inset-0 bg-black z-10"
          style={{ opacity: 0.6 }}
        />
        
        {/* Video container with GPU acceleration */}
        <div className="absolute inset-0 flex items-center justify-center w-full h-full">
          <div 
            className={cn(
              `w-full h-full overflow-hidden relative transition-all ${transitionDuration}`,
              showVideo ? "opacity-100 scale-100" : "opacity-0 scale-95"
            )}
            style={{
              willChange: 'transform, opacity',
              transform: showVideo ? 'scale(1)' : 'scale(0.95)'
            }}
          >
            {renderVideoElement()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoBackground;
