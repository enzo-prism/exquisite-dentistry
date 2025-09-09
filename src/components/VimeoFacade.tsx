
import React, { useState, useEffect } from 'react';
import { Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useResponsiveScaling } from '@/hooks/use-responsive-scaling';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { VIDEO_ASPECT_RATIO, VIDEO_CONTAINER_CONSTRAINTS } from '@/components/video-hero/video-aspect-ratio';
import { useVimeoPlayer } from '@/hooks/use-vimeo-player';
import CustomVideoControls from '@/components/ui/custom-video-controls';

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
  customControls?: boolean;
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
  customControls = false,
  onReady,
}) => {
  const [isLoaded, setIsLoaded] = useState(background); // Background videos load immediately, others lazy load
  const [imageError, setImageError] = useState(false);
  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  const scaling = useResponsiveScaling();
  
  // Use Vimeo Player API for custom controls
  const vimeoPlayer = useVimeoPlayer(customControls ? {
    videoId,
    autoplay: false, // User-initiated playback for custom controls
    muted,
    loop,
    controls: false,
    background: false,
  } : null);
  
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
      // For custom controls, ensure iframe ref is ready
      if (customControls && vimeoPlayer?.iframeRef) {
        setTimeout(() => {
          if (iframeRef.current && vimeoPlayer.iframeRef) {
            vimeoPlayer.iframeRef.current = iframeRef.current;
          }
        }, 100);
      }
    }
  };
  
  // Build Vimeo URL with parameters
  const effectiveAutoplay = customControls ? false : autoplay;
  const effectiveControls = customControls ? false : controls;
  const effectiveBackground = background && !customControls;
  
  const vimeoUrl = `https://player.vimeo.com/video/${videoId}?` + 
    `badge=0&autopause=0&autoplay=${effectiveAutoplay ? 1 : 0}&muted=${muted ? 1 : 0}` +
    `&controls=${effectiveControls ? 1 : 0}&title=0&byline=0&portrait=0` +
    `&background=${effectiveBackground ? 1 : 0}&loop=${loop ? 1 : 0}&responsive=1` +
    `&player_id=0&app_id=58479&quality=auto&api=1`;
  
  if (isLoaded) {
    if (effectiveBackground) {
      return (
        <div className={cn("relative w-full h-full", className)}>
          <iframe
            ref={customControls ? vimeoPlayer.iframeRef : iframeRef}
            src={vimeoUrl}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: scaling.width,
              height: scaling.height,
              transform: 'translate(-50%, -50%)'
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
      <AspectRatio ratio={VIDEO_ASPECT_RATIO} className={cn("relative w-full", className)}>
        <iframe
          ref={iframeRef}
          src={vimeoUrl}
          className="absolute inset-0 w-full h-full"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
          title={title}
          loading="lazy"
        />
        
        {/* Custom video controls overlay */}
        {customControls && vimeoPlayer && (
          <CustomVideoControls
            isPlaying={vimeoPlayer.state.isPlaying}
            currentTime={vimeoPlayer.state.currentTime}
            duration={vimeoPlayer.state.duration}
            volume={vimeoPlayer.state.volume}
            isMuted={vimeoPlayer.state.isMuted}
            isLoaded={vimeoPlayer.state.isLoaded}
            onPlayPause={() => {
              if (vimeoPlayer.state.isPlaying) {
                vimeoPlayer.controls.pause();
              } else {
                vimeoPlayer.controls.play();
              }
            }}
            onSeek={vimeoPlayer.controls.seekTo}
            onVolumeChange={vimeoPlayer.controls.setVolume}
            onToggleMute={vimeoPlayer.controls.toggleMute}
            onFullscreen={vimeoPlayer.controls.toggleFullscreen}
          />
        )}
      </AspectRatio>
    );
  }
  
  return (
    <AspectRatio 
      ratio={VIDEO_ASPECT_RATIO} 
      className={cn("relative w-full cursor-pointer group overflow-hidden", className)}
      onClick={handleClick}
    >
      {/* Thumbnail Image or Gradient Fallback */}
      <div className="absolute inset-0 w-full h-full">
        {thumbnailUrl && !imageError ? (
          <>
            {/* Custom thumbnail image */}
            <img 
              src={thumbnailUrl} 
              alt={title}
              className="absolute inset-0 w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
            {/* Subtle overlay for better play button visibility */}
            <div className="absolute inset-0 w-full h-full bg-black/20" />
          </>
        ) : (
          <>
            {/* Fallback gradient when no thumbnail provided */}
            <div 
              className="absolute inset-0 w-full h-full"
              style={{
                background: `
                  radial-gradient(ellipse at 50% 30%, hsl(var(--gold-light) / 0.4) 0%, transparent 70%),
                  radial-gradient(ellipse at 80% 70%, hsl(var(--gold) / 0.3) 0%, transparent 60%),
                  linear-gradient(135deg, hsl(var(--gold-dark)) 0%, hsl(215 25% 27%) 50%, hsl(220 39% 11%) 100%)
                `
              }}
            />
            
            {/* Secondary depth layer */}
            <div 
              className="absolute inset-0 w-full h-full opacity-80"
              style={{
                background: `
                  radial-gradient(circle at 30% 80%, hsl(var(--gold) / 0.2) 0%, transparent 50%),
                  linear-gradient(45deg, transparent 30%, hsl(var(--gold-light) / 0.1) 50%, transparent 70%)
                `
              }}
            />
            
            {/* Subtle overlay for depth */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-transparent via-black/10 to-black/20" />
          </>
        )}
      </div>
      
      {/* Play button overlay (only for non-background videos) */}
      {!background && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
          <div className="bg-primary/90 text-primary-foreground rounded-full p-3 sm:p-4 group-hover:scale-110 transition-transform min-h-[44px] min-w-[44px] flex items-center justify-center">
            <Play className="h-5 w-5 sm:h-6 sm:w-6 ml-0.5" fill="currentColor" />
          </div>
        </div>
      )}
    </AspectRatio>
  );
};

export default VimeoFacade;
