import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Play, Pause, Maximize, Loader2 } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { cn } from '@/lib/utils';
import { VideoPlayerAPI, createEmbedUrl } from '@/utils/videoPlayerAPI';

interface CustomVideoPlayerProps {
  platform: 'vimeo' | 'youtube';
  videoId: string;
  title: string;
  thumbnailUrl?: string;
  thumbnailFallbackUrl?: string;
  className?: string;
  autoplay?: boolean;
  muted?: boolean;
  onVideoStart?: () => void;
  onVideoEnd?: () => void;
  overlayMode?: 'default' | 'safe';
}

const CustomVideoPlayer: React.FC<CustomVideoPlayerProps> = ({
  platform,
  videoId,
  title,
  thumbnailUrl,
  thumbnailFallbackUrl,
  className,
  autoplay = false,
  muted = false,
  onVideoStart,
  onVideoEnd,
  overlayMode = 'default'
}) => {
  const isSafe = overlayMode === 'safe';
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [thumbnailSrc, setThumbnailSrc] = useState(thumbnailUrl);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout>();
  const playerAPIRef = useRef<VideoPlayerAPI | null>(null);

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

  useEffect(() => {
    setThumbnailSrc(thumbnailUrl);
    setImageError(false);
  }, [thumbnailUrl]);

  // Create dynamic embed URL - always unmuted for testimonial videos
  const embedUrl = useMemo(() => {
    if (!isPlaying) return '';
    
    return createEmbedUrl(platform, videoId, {
      autoplay: false,
      muted: false, // Always unmuted for testimonial videos
      enableJSAPI: true,
      loop: true // Enable auto-looping to prevent Vimeo end screen
    });
  }, [platform, videoId, isPlaying]);

  // Initialize player API
  useEffect(() => {
    if (!playerAPIRef.current) {
      playerAPIRef.current = new VideoPlayerAPI(platform);
      
      // Set up callbacks to sync UI state with player
      playerAPIRef.current.setOnPlayChange((playing) => {
        setIsPlaying(playing);
        if (!playing) {
          setShowControls(true);
          if (controlsTimeoutRef.current) {
            clearTimeout(controlsTimeoutRef.current);
          }
        }
      });
      
      playerAPIRef.current.setOnEnded(() => {
        setIsPlaying(false);
        setShowControls(true);
        onVideoEnd?.();
      });
    }
    
    return () => {
      playerAPIRef.current?.destroy();
    };
  }, [platform, onVideoEnd]);

  const handlePlay = useCallback(() => {
    if (!isPlaying) {
      setIsLoading(true);
      setIsPlaying(true);
      onVideoStart?.();
      resetControlsTimeout();
      
      // Set shouldAutoPlay to trigger playback when iframe is ready
      if (playerAPIRef.current) {
        playerAPIRef.current.setShouldAutoPlay(true);
        playerAPIRef.current.setOnReady(() => {
          setIsLoading(false);
        });
      }
    } else {
      // Video is already playing, use API to play
      playerAPIRef.current?.play();
    }
  }, [isPlaying, onVideoStart, resetControlsTimeout]);

  const handlePause = useCallback(() => {
    if (isPlaying && playerAPIRef.current) {
      // Use API to pause without recreating iframe
      playerAPIRef.current.pause();
      setIsPlaying(false);
      if (playerAPIRef.current) {
        playerAPIRef.current.setShouldAutoPlay(false);
      }
    } else {
      // Initial state management
      setIsPlaying(false);
      setShowControls(true);
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    }
  }, [isPlaying]);

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

  // Keyboard controls (removed mute functionality)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!containerRef.current?.contains(document.activeElement)) return;
      
      switch (e.code) {
        case 'Space':
          e.preventDefault();
          handleContainerClick();
          break;
        case 'KeyF':
          e.preventDefault();
          handleFullscreen();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleContainerClick, handleFullscreen]);

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
        style={{
          position: 'relative'
        }}
      >
        {/* Video containment wrapper */}
        <div className="absolute inset-0 w-full h-full overflow-hidden" style={isSafe ? { contain: 'paint' } : undefined}>
          {/* Video iframe or thumbnail */}
          {isPlaying ? (
            <iframe
              ref={(el) => {
                iframeRef.current = el;
                if (el && playerAPIRef.current) {
                  playerAPIRef.current.setIframe(el);
                }
              }}
              src={embedUrl}
              title={title}
              className="absolute inset-0 w-full h-full"
                style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
                transformOrigin: 'center',
                transform: 'translateZ(0)',
                WebkitTransform: 'translateZ(0)',
                backfaceVisibility: 'hidden',
                willChange: 'transform',
                pointerEvents: 'auto'
              }}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
            />
          ) : (
          <>
            {/* Thumbnail */}
            {thumbnailSrc && !imageError && (
              <img
                src={thumbnailSrc}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                fetchPriority="low"
                onError={() => {
                  if (thumbnailFallbackUrl && thumbnailSrc !== thumbnailFallbackUrl) {
                    setThumbnailSrc(thumbnailFallbackUrl);
                    return;
                  }
                  setImageError(true);
                }}
              />
            )}
            
            {/* Fallback background */}
            {(!thumbnailSrc || imageError) && (
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
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-30 allow-gradient-transparency">
            <div className="bg-black/80 backdrop-blur-none md:backdrop-blur-sm rounded-full p-4">
              <Loader2 className="h-8 w-8 text-gold animate-spin" />
            </div>
          </div>
        )}

        {/* Custom Controls Overlay */}
        {isPlaying && (
          <div 
            className={cn(
              "absolute inset-0 z-20 pointer-events-none transition-opacity duration-300",
              !isSafe && "isolate",
              showControls ? "opacity-100" : "opacity-0"
            )}
            style={{ willChange: 'opacity' }}
          >
            {/* Top gradient for better control visibility */}
            {isSafe ? (
              <div className="hidden lg:block absolute top-0 left-0 right-0 h-8 md:h-20 bg-gradient-to-b from-black/60 to-transparent allow-gradient-transparency pointer-events-none" />
            ) : (
              <div className="absolute top-0 left-0 right-0 h-8 md:h-20 bg-gradient-to-b from-black/60 to-transparent allow-gradient-transparency pointer-events-none" />
            )}
            
            {/* Bottom area */}
            {isSafe ? (
              <>
                {/* Desktop gradient + controls */}
                <div className="hidden lg:block absolute bottom-0 left-0 right-0 h-12 md:h-24 bg-gradient-to-t from-black/80 to-transparent allow-gradient-transparency">
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-auto">
                    {/* Left controls */}
                    <div className="flex items-center gap-3 pointer-events-auto">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleContainerClick();
                        }}
                        className="bg-white/20 hover:bg-white/30 backdrop-blur-none md:backdrop-blur-sm text-white rounded-full p-2 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gold/50 pointer-events-auto"
                        aria-label={isPlaying ? 'Pause' : 'Play'}
                      >
                        {isPlaying ? (
                          <Pause className="h-5 w-5" fill="currentColor" />
                        ) : (
                          <Play className="h-5 w-5 ml-0.5" fill="currentColor" />
                        )}
                      </button>
                    </div>

                    {/* Right controls */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFullscreen();
                      }}
                      className="bg-white/20 hover:bg-white/30 backdrop-blur-none md:backdrop-blur-sm text-white rounded-full p-2 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gold/50 pointer-events-auto"
                      aria-label="Fullscreen"
                    >
                      <Maximize className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Mobile + Tablet compact control pill */}
                <div className="lg:hidden absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-auto">
                  <div className="flex items-center gap-2 bg-black/60 text-white rounded-full px-3 py-2 shadow-lg backdrop-blur-xs">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleContainerClick();
                      }}
                      className="bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gold/50 pointer-events-auto"
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
                        handleFullscreen();
                      }}
                      className="bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gold/50 pointer-events-auto"
                      aria-label="Fullscreen"
                    >
                      <Maximize className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="absolute bottom-0 left-0 right-0 h-12 md:h-24 bg-gradient-to-t from-black/80 to-transparent allow-gradient-transparency">
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-auto">
                  {/* Left controls */}
                  <div className="flex items-center gap-3 pointer-events-auto">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleContainerClick();
                      }}
                      className="bg-white/20 hover:bg-white/30 backdrop-blur-none md:backdrop-blur-sm text-white rounded-full p-2 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gold/50 pointer-events-auto"
                      aria-label={isPlaying ? 'Pause' : 'Play'}
                    >
                      {isPlaying ? (
                        <Pause className="h-5 w-5" fill="currentColor" />
                      ) : (
                        <Play className="h-5 w-5 ml-0.5" fill="currentColor" />
                      )}
                    </button>
                  </div>

                  {/* Right controls */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFullscreen();
                    }}
                    className="bg-white/20 hover:bg-white/30 backdrop-blur-none md:backdrop-blur-sm text-white rounded-full p-2 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gold/50 pointer-events-auto"
                    aria-label="Fullscreen"
                  >
                    <Maximize className="h-5 w-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
        </div>
      </div>
    </AspectRatio>
  );
};

export default CustomVideoPlayer;
