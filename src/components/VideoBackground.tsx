
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
    // Force video play when the component mounts (for direct video elements)
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
    
    // Add event listeners to debug video issues
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

  // Load the Vimeo API script
  useEffect(() => {
    if (vimeoId) {
      // Check if the script is already loaded
      if (!document.querySelector('script[src="https://player.vimeo.com/api/player.js"]')) {
        const script = document.createElement('script');
        script.src = 'https://player.vimeo.com/api/player.js';
        script.async = true;
        document.body.appendChild(script);
      }
    }
  }, [vimeoId]);
  
  // Render video element based on provided source
  const renderVideoElement = () => {
    if (vimeoId) {
      return (
        <div style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
          <iframe 
            ref={iframeRef}
            src={`https://player.vimeo.com/video/${vimeoId}?badge=0&autopause=0&autoplay=1&muted=1&background=1&player_id=0&app_id=58479`}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
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
          style={{ objectFit: isContained ? 'contain' : 'cover' }}
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
  
  // Original background implementation
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
