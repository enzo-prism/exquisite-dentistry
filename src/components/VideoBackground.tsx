
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [youtubeId, streamableUrl, vimeoId]);
  
  useEffect(() => {
    const playVideo = async () => {
      if (videoRef.current) {
        try {
          videoRef.current.muted = true;
          const playPromise = videoRef.current.play();
          
          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                console.log('Video playback started successfully');
              })
              .catch(error => {
                console.error('Error playing video:', error);
                setTimeout(() => {
                  if (videoRef.current) {
                    videoRef.current.play().catch(e => 
                      console.error('Second attempt to play video failed:', e)
                    );
                  }
                }, 1000);
              });
          }
        } catch (error) {
          console.error('Error in playVideo function:', error);
        }
      }
    };
    
    if (!vimeoId) {
      playVideo();
    }
    
    const video = videoRef.current;
    if (video) {
      const handleError = (e: Event) => console.error('Video error:', e);
      const handleStalled = () => console.warn('Video stalled');
      const handleWaiting = () => console.warn('Video waiting');
      const handleLoad = () => console.log('Video loaded metadata');
      
      video.addEventListener('error', handleError);
      video.addEventListener('stalled', handleStalled);
      video.addEventListener('waiting', handleWaiting);
      video.addEventListener('loadedmetadata', handleLoad);
      
      return () => {
        video.removeEventListener('error', handleError);
        video.removeEventListener('stalled', handleStalled);
        video.removeEventListener('waiting', handleWaiting);
        video.removeEventListener('loadedmetadata', handleLoad);
      };
    }
  }, []);
  
  useEffect(() => {
    if (vimeoId) {
      if (!document.querySelector('script[src="https://player.vimeo.com/api/player.js"]')) {
        const script = document.createElement('script');
        script.src = 'https://player.vimeo.com/api/player.js';
        script.async = true;
        document.body.appendChild(script);
      }
    }
  }, [vimeoId]);
  
  const renderVideoElement = () => {
    if (vimeoId) {
      return (
        <div className="w-full h-full" style={{ position: 'relative', paddingBottom: '56.25%' }}>
          <iframe 
            ref={iframeRef}
            src={`https://player.vimeo.com/video/${vimeoId}?badge=0&autopause=0&autoplay=1&muted=1&background=1&player_id=0&app_id=58479`}
            style={{ 
              position: 'absolute', 
              top: '50%', 
              left: '50%', 
              width: isMobile ? '400%' : '200%',  // Increased coverage to eliminate black bars
              height: isMobile ? '400%' : '200%',  // Increased coverage to eliminate black bars
              transform: isMobile ? 'translate(-50%, -50%) scale(2)' : 'translate(-50%, -50%) scale(1.5)', // Increased scale
              maxWidth: 'none',
              objectFit: 'cover'
            }}
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
            title="Exquisite Dentistry Video Background"
            loading="eager"
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
          className="w-full h-full object-cover"
          style={{ 
            objectFit: isContained ? 'contain' : 'cover',
            width: isMobile ? '500%' : '300%', // Increased from previous values
            height: isMobile ? '500%' : '300%', // Increased from previous values
            transform: isMobile ? 'translate(-40%, -40%)' : 'translate(-33%, -33%)', // Adjusted transform
            maxWidth: 'none'
          }}
          poster={posterSrc}
        >
          <source src={`${streamableUrl}.mp4`} type="video/mp4" />
          <source src={streamableUrl} type="video/mp4" />
          Your browser does not support the video tag.
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
            width: isMobile ? '500%' : '400%', // Increased coverage
            height: isMobile ? '300%' : '200%', // Increased coverage
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: isMobile ? 'translate(-50%, -50%) scale(2)' : 'translate(-50%, -50%) scale(1.5)', // Increased scale
            maxWidth: 'none'
          }}
          frameBorder="0"
          title="Video player"
          loading="eager"
        />
      );
    }
    
    return null;
  };
  
  if (isContained) {
    return (
      <div className={cn("w-full overflow-hidden rounded-md shadow-lg", className)}>
        <AspectRatio ratio={aspectRatio}>
          {renderVideoElement()}
        </AspectRatio>
      </div>
    );
  }
  
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
        {/* Reduced overlay opacity for better video visibility */}
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        
        <div className="absolute inset-0 flex items-center justify-center w-full h-full">
          <div className="w-full h-full overflow-hidden">
            {renderVideoElement()}
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoBackground;
