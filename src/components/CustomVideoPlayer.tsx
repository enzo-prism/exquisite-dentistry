import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Loader2 } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { cn } from '@/lib/utils';

interface CustomVideoPlayerProps {
  platform: 'vimeo' | 'youtube';
  videoId: string;
  title: string;
  thumbnailUrl?: string;
  className?: string;
  autoplay?: boolean;
  muted?: boolean;
  onVideoStart?: () => void;
  onVideoEnd?: () => void;
}

const CustomVideoPlayer: React.FC<CustomVideoPlayerProps> = ({
  platform,
  videoId,
  title,
  thumbnailUrl,
  className,
  autoplay = false,
  muted = true,
  onVideoStart,
  onVideoEnd
}) => {
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [isMuted, setIsMuted] = useState(muted);
  const [isLoading, setIsLoading] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [imageError, setImageError] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout>();

  // Auto-hide controls after inactivity
  const resetControlsTimeout = useCallback(() => {
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    setShowControls(true);
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  }, [isPlaying]);

  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

  const getEmbedUrl = useCallback(() => {
    const baseParams = new URLSearchParams({
      autoplay: isPlaying ? '1' : '0',
      muted: isMuted ? '1' : '0',
      controls: '0', // Hide all platform controls
      title: '0',
      byline: '0',
      portrait: '0',
    });

    if (platform === 'vimeo') {
      baseParams.append('background', '1'); // Remove all Vimeo branding
      baseParams.append('transparent', '0');
      baseParams.append('autopause', '0');
      return `https://player.vimeo.com/video/${videoId}?${baseParams.toString()}`;
    } else {
      baseParams.append('rel', '0');
      baseParams.append('modestbranding', '1');
      baseParams.append('showinfo', '0');
      baseParams.append('iv_load_policy', '3');
      baseParams.append('cc_load_policy', '0');
      return `https://www.youtube.com/embed/${videoId}?${baseParams.toString()}`;
    }
  }, [videoId, platform, isPlaying, isMuted]);

  const handlePlay = useCallback(() => {
    setIsLoading(true);
    setIsPlaying(true);
    onVideoStart?.();
    resetControlsTimeout();
    
    // Simulate loading time for smooth transition
    setTimeout(() => setIsLoading(false), 800);
  }, [onVideoStart, resetControlsTimeout]);

  const handlePause = useCallback(() => {
    setIsPlaying(false);
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
    resetControlsTimeout();
  }, [resetControlsTimeout]);

  const handleFullscreen = useCallback(() => {
    if (containerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        containerRef.current.requestFullscreen();
      }
    }
    resetControlsTimeout();
  }, [resetControlsTimeout]);

  const handleContainerClick = useCallback(() => {
    if (isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  }, [isPlaying, handlePlay, handlePause]);

  const handleMouseMove = useCallback(() => {
    resetControlsTimeout();
  }, [resetControlsTimeout]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!containerRef.current?.contains(document.activeElement)) return;
      
      switch (e.code) {
        case 'Space':
          e.preventDefault();
          handleContainerClick();
          break;
        case 'KeyM':
          e.preventDefault();
          toggleMute();
          break;
        case 'KeyF':
          e.preventDefault();
          handleFullscreen();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleContainerClick, toggleMute, handleFullscreen]);

  return (
    <AspectRatio 
      ratio={16 / 9} 
      className={cn("overflow-hidden group cursor-pointer relative", className)}
    >
      <div 
        ref={containerRef}
        className="relative w-full h-full bg-black rounded-lg overflow-hidden"
        onClick={handleContainerClick}
        onMouseMove={handleMouseMove}
        tabIndex={0}
        role="button"
        aria-label={isPlaying ? 'Pause video' : 'Play video'}
      >
        {/* Video iframe or thumbnail */}
        {isPlaying ? (
          <iframe
            ref={iframeRef}
            src={getEmbedUrl()}
            title={title}
            className="absolute inset-0 w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
          />
        ) : (
          <>
            {/* Thumbnail */}
            {thumbnailUrl && !imageError && (
              <img
                src={thumbnailUrl}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover"
                onError={() => setImageError(true)}
              />
            )}
            
            {/* Fallback background */}
            {(!thumbnailUrl || imageError) && (
              <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-neutral-800 to-neutral-900 flex items-center justify-center">
                <span className="text-white/60 text-sm font-medium">Video Preview</span>
              </div>
            )}
            
            {/* Play overlay for thumbnail */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-gold/90 hover:bg-gold text-white rounded-full p-4 group-hover:scale-110 transition-all duration-300 shadow-2xl">
                <Play className="h-8 w-8 ml-1" fill="currentColor" />
              </div>
            </div>
          </>
        )}

        {/* Loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-30">
            <div className="bg-black/80 backdrop-blur-sm rounded-full p-4">
              <Loader2 className="h-8 w-8 text-gold animate-spin" />
            </div>
          </div>
        )}

        {/* Custom Controls Overlay */}
        {isPlaying && (
          <div 
            className={cn(
              "absolute inset-0 z-20 transition-opacity duration-300",
              showControls ? "opacity-100" : "opacity-0"
            )}
          >
            {/* Top gradient for better control visibility */}
            <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />
            
            {/* Bottom gradient and controls */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/80 to-transparent">
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                {/* Left controls */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleContainerClick();
                    }}
                    className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full p-2 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gold/50"
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? (
                      <Pause className="h-5 w-5" fill="currentColor" />
                    ) : (
                      <Play className="h-5 w-5 ml-0.5" fill="currentColor" />
                    )}
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMute();
                    }}
                    className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full p-2 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gold/50"
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? (
                      <VolumeX className="h-5 w-5" />
                    ) : (
                      <Volume2 className="h-5 w-5" />
                    )}
                  </button>
                </div>

                {/* Right controls */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFullscreen();
                  }}
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full p-2 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gold/50"
                  aria-label="Fullscreen"
                >
                  <Maximize className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Click indicator for mobile */}
        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none md:hidden">
          Tap to {isPlaying ? 'pause' : 'play'}
        </div>
      </div>
    </AspectRatio>
  );
};

export default CustomVideoPlayer;