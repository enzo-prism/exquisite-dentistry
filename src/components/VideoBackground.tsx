
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
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Handle video ready state and smooth transition
  const handleVideoReady = () => {
    setIsVimeoReady(true);
    // Delay showing video to ensure smooth transition
    setTimeout(() => {
      setShowVideo(true);
      if (onLoad) {
        onLoad();
      }
    }, 500);
  };
  
  // Handle video playback for streamable videos
  useEffect(() => {
    if (!videoRef.current || !streamableUrl || vimeoId) return;
    
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
              console.log('Video playback started successfully');
              handleVideoReady();
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
  }, [streamableUrl, vimeoId]);
  
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
  
  return (
    <div className="absolute inset-0 w-full h-full bg-black">
      {/* Placeholder Image */}
      <div 
        className={cn(
          "absolute inset-0 w-full h-full z-20 transition-opacity duration-1000",
          showVideo ? "opacity-0 pointer-events-none" : "opacity-100"
        )}
      >
        <OptimizedImage
          src="/lovable-uploads/548b9e25-d837-4cea-a035-32be2b9af785.png"
          alt="Loading placeholder"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-black/50 z-10"></div>
      </div>

      {/* Video content with black background */}
      <div className={cn("absolute inset-0 w-full h-full z-10 overflow-hidden bg-black", className)}>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        
        {/* Video container */}
        <div className="absolute inset-0 flex items-center justify-center w-full h-full">
          <div 
            className={cn(
              "w-full h-full overflow-hidden relative transition-opacity duration-1000",
              showVideo ? "opacity-100" : "opacity-0"
            )}
          >
            {renderVideoElement()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoBackground;
