import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Loader2 } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { cn } from '@/lib/utils';
import { VideoPlayerAPI, createEmbedUrl, isMobileDevice } from '@/utils/videoPlayerAPI';
import MobileAudioPrompt from '@/components/ui/mobile-audio-prompt';

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
  overlayMode?: 'default' | 'safe';
}

const CustomVideoPlayer: React.FC<CustomVideoPlayerProps> = ({
  platform,
  videoId,
  title,
  thumbnailUrl,
  className,
  autoplay = false,
  muted = false,
  onVideoStart,
  onVideoEnd,
  overlayMode = 'default'
}) => {
  const isSafe = overlayMode === 'safe';
  const [isMobile] = useState(() => isMobileDevice());
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(isMobile ? true : (muted || false)); // Force muted on mobile
  const [isLoading, setIsLoading] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);
  const [showAudioPrompt, setShowAudioPrompt] = useState(isMobile && !hasPlayedOnce); // Show immediately on mobile
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

  // Create dynamic embed URL based on current state
  const embedUrl = useMemo(() => {
    if (!isPlaying) return '';
    
    return createEmbedUrl(platform, videoId, {
      autoplay: false,
      muted: isMuted,
      enableJSAPI: true
    });
  }, [platform, videoId, isPlaying, isMuted]);

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
      
      playerAPIRef.current.setOnMuteChange((muted) => {
        setIsMuted(muted);
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
          console.log('Player ready, setting loading to false');
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

  const toggleMute = useCallback(() => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    
    // Handle mobile audio activation
    if (isMobile && newMutedState === false && isPlaying) {
      setShowAudioPrompt(true);
      return;
    }
    
    // Use API to control mute state
    if (playerAPIRef.current && isPlaying) {
      if (newMutedState) {
        playerAPIRef.current.mute();
      } else {
        playerAPIRef.current.unmute();
      }
    }
    
    resetControlsTimeout();
  }, [isMuted, isMobile, isPlaying, resetControlsTimeout]);

  const handleAudioEnable = useCallback(() => {
    setShowAudioPrompt(false);
    setIsMuted(false);
    setHasPlayedOnce(true);
    
    // Synchronous audio enable for mobile - must happen within user tap
    if (playerAPIRef.current) {
      playerAPIRef.current.unmute();
      playerAPIRef.current.setVolume(1);
      if (!isPlaying) {
        playerAPIRef.current.play();
        setIsPlaying(true);
      }
    }
  }, [isPlaying]);

  const handleAudioPromptDismiss = useCallback(() => {
    setShowAudioPrompt(false);
    setIsMuted(true); // Keep it muted if user dismisses
  }, []);

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
                  console.log('Setting iframe on player API');
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

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleMute();
                        }}
                        className="bg-white/20 hover:bg-white/30 backdrop-blur-none md:backdrop-blur-sm text-white rounded-full p-2 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gold/50 pointer-events-auto"
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
                        toggleMute();
                      }}
                      className="bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gold/50 pointer-events-auto"
                      aria-label={isMuted ? 'Unmute' : 'Mute'}
                    >
                      {isMuted ? (
                        <VolumeX className="h-5 w-5" />
                      ) : (
                        <Volume2 className="h-5 w-5" />
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

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleMute();
                      }}
                      className="bg-white/20 hover:bg-white/30 backdrop-blur-none md:backdrop-blur-sm text-white rounded-full p-2 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gold/50 pointer-events-auto"
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

          {/* Click indicator for mobile */}
          <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-none md:backdrop-blur-sm text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none md:hidden">
            Tap to {isPlaying ? 'pause' : 'play'}
          </div>
        </div>

        {/* Mobile Audio Prompt */}
        <MobileAudioPrompt
          isVisible={showAudioPrompt}
          isMuted={isMuted}
          onAudioEnable={handleAudioEnable}
          onDismiss={handleAudioPromptDismiss}
        />
      </div>
    </AspectRatio>
  );
};

export default CustomVideoPlayer;