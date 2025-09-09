import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import LoadingSkeleton from './ui/loading-skeleton';

interface CustomVideoPlayerProps {
  videoId: string;
  title: string;
  thumbnailUrl: string;
  className?: string;
}

interface PlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  isLoaded: boolean;
  error: string | null;
}

const CustomVideoPlayer: React.FC<CustomVideoPlayerProps> = ({
  videoId,
  title,
  thumbnailUrl,
  className,
}) => {
  const [showVideo, setShowVideo] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [state, setState] = useState<PlayerState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 0.8,
    isMuted: false,
    isLoaded: false,
    error: null,
  });

  const playerRef = useRef<any>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const hideTimer = useRef<NodeJS.Timeout | null>(null);

  // Auto-hide controls after 3 seconds
  const resetHideTimer = useCallback(() => {
    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
    }
    if (state.isPlaying) {
      hideTimer.current = setTimeout(() => setControlsVisible(false), 3000);
    }
  }, [state.isPlaying]);

  const showControls = useCallback(() => {
    setControlsVisible(true);
    resetHideTimer();
  }, [resetHideTimer]);

  // Load Vimeo Player API
  useEffect(() => {
    if (!showVideo || typeof window === 'undefined') return;

    let mounted = true;

    const loadVimeoAPI = () => {
      if (window.Vimeo) {
        setTimeout(initializePlayer, 100);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://player.vimeo.com/api/player.js';
      script.onload = () => setTimeout(initializePlayer, 100);
      script.onerror = () => {
        if (mounted) {
          setState(prev => ({ ...prev, error: 'Failed to load video player' }));
        }
      };
      document.head.appendChild(script);
    };

    const initializePlayer = () => {
      if (!mounted || !iframeRef.current || !window.Vimeo || playerRef.current) return;

      try {
        playerRef.current = new window.Vimeo.Player(iframeRef.current);

        // Set up event listeners
        playerRef.current.on('loaded', () => {
          if (!mounted) return;
          setState(prev => ({ ...prev, isLoaded: true }));
          
          // Get initial video state
          Promise.all([
            playerRef.current?.getDuration(),
            playerRef.current?.getVolume()
          ]).then(([duration, volume]) => {
            if (mounted) {
              setState(prev => ({ ...prev, duration: duration || 0, volume: volume || 0.8 }));
            }
          }).catch(console.warn);
        });

        playerRef.current.on('play', () => {
          if (mounted) {
            setState(prev => ({ ...prev, isPlaying: true }));
            resetHideTimer();
          }
        });

        playerRef.current.on('pause', () => {
          if (mounted) {
            setState(prev => ({ ...prev, isPlaying: false }));
            setControlsVisible(true);
          }
        });

        playerRef.current.on('timeupdate', (data: { seconds: number }) => {
          if (mounted) {
            setState(prev => ({ ...prev, currentTime: data.seconds }));
          }
        });

        playerRef.current.on('volumechange', (data: { volume: number }) => {
          if (mounted) {
            setState(prev => ({ ...prev, volume: data.volume }));
          }
        });

        playerRef.current.on('error', (error: any) => {
          console.warn('Vimeo player error:', error);
          if (mounted) {
            setState(prev => ({ ...prev, error: 'Video failed to load' }));
          }
        });

      } catch (error) {
        console.warn('Failed to initialize Vimeo player:', error);
        if (mounted) {
          setState(prev => ({ ...prev, error: 'Failed to initialize video player' }));
        }
      }
    };

    loadVimeoAPI();

    return () => {
      mounted = false;
      if (hideTimer.current) {
        clearTimeout(hideTimer.current);
      }
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch (error) {
          console.warn('Error destroying player:', error);
        }
        playerRef.current = null;
      }
    };
  }, [showVideo, resetHideTimer]);

  // Control functions
  const togglePlayPause = useCallback(async () => {
    if (!playerRef.current) {
      console.warn('Player not initialized');
      return;
    }
    
    try {
      if (state.isPlaying) {
        await playerRef.current.pause();
      } else {
        await playerRef.current.play();
      }
    } catch (error) {
      console.warn('Error toggling play/pause:', error);
    }
  }, [state.isPlaying]);

  const seekTo = useCallback((time: number) => {
    if (!playerRef.current) return;
    playerRef.current.setCurrentTime(time);
  }, []);

  const setVolume = useCallback((volume: number) => {
    if (!playerRef.current) return;
    playerRef.current.setVolume(volume);
    setState(prev => ({ ...prev, volume, isMuted: volume === 0 }));
  }, []);

  const toggleMute = useCallback(() => {
    if (!playerRef.current) return;
    const newMutedState = !state.isMuted;
    playerRef.current.setMuted(newMutedState);
    setState(prev => ({ ...prev, isMuted: newMutedState }));
  }, [state.isMuted]);

  const toggleFullscreen = useCallback(() => {
    if (!iframeRef.current) return;
    if (iframeRef.current.requestFullscreen) {
      iframeRef.current.requestFullscreen();
    }
  }, []);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = state.duration > 0 ? (state.currentTime / state.duration) * 100 : 0;

  // Handle initial play click
  const handleInitialPlay = () => {
    setShowVideo(true);
  };

  // Show error state
  if (state.error) {
    return (
      <div className={cn("relative w-full aspect-video bg-muted rounded-sm flex items-center justify-center", className)}>
        <div className="text-center p-6">
          <p className="text-muted-foreground mb-4">Video temporarily unavailable</p>
          <Button onClick={() => setShowVideo(false)} variant="outline">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  // Show thumbnail before video loads
  if (!showVideo) {
    return (
      <div 
        className={cn("relative w-full aspect-video cursor-pointer group overflow-hidden rounded-sm", className)}
        onClick={handleInitialPlay}
      >
        <img 
          src={thumbnailUrl} 
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-primary/90 backdrop-blur-sm text-primary-foreground rounded-full p-4 group-hover:scale-110 group-hover:bg-primary transition-all duration-300 min-h-[60px] min-w-[60px] flex items-center justify-center shadow-lg">
            <Play className="h-6 w-6 ml-1" fill="currentColor" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={cn("relative w-full aspect-video bg-black rounded-sm overflow-hidden group", className)}
      onMouseMove={showControls}
      onMouseEnter={showControls}
      onTouchStart={showControls}
    >
      {/* Single iframe element */}
      <iframe
        ref={iframeRef}
        src={`https://player.vimeo.com/video/${videoId}?controls=0&title=0&byline=0&portrait=0&background=1`}
        className="absolute inset-0 w-full h-full"
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        title={title}
      />

      {/* Loading overlay */}
      {!state.isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-10">
          <div className="flex flex-col items-center gap-4">
            <LoadingSkeleton className="w-12 h-12 rounded-full" />
            <span className="text-white text-sm">Loading video...</span>
          </div>
        </div>
      )}

      {/* Custom Controls Overlay */}
      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-300 pointer-events-none",
          controlsVisible ? "opacity-100" : "opacity-0"
        )}
      >
        {/* Gradient backdrop */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Controls */}
        <div className="absolute bottom-0 left-0 right-0 p-4 space-y-3 pointer-events-auto">
          {/* Progress Bar */}
          <div className="relative group/progress">
            <div 
              className="h-1 bg-white/20 rounded-full cursor-pointer transition-all group-hover/progress:h-1.5"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const percentage = clickX / rect.width;
                seekTo(percentage * state.duration);
              }}
            >
              <div 
                className="h-full bg-gold rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
              <div 
                className="absolute top-1/2 w-3 h-3 bg-gold rounded-full transform -translate-y-1/2 opacity-0 group-hover/progress:opacity-100 transition-opacity shadow-lg"
                style={{ left: `${progressPercentage}%`, marginLeft: '-6px' }}
              />
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {/* Play/Pause */}
              <Button
                variant="ghost"
                size="sm"
                onClick={togglePlayPause}
                className="h-8 w-8 p-0 text-white hover:text-gold hover:bg-white/10 transition-colors"
              >
                {state.isPlaying ? (
                  <Pause className="h-4 w-4" fill="currentColor" />
                ) : (
                  <Play className="h-4 w-4 ml-0.5" fill="currentColor" />
                )}
              </Button>

              {/* Volume Controls */}
              <div 
                className="flex items-center space-x-2"
                onMouseEnter={() => setShowVolumeSlider(true)}
                onMouseLeave={() => setShowVolumeSlider(false)}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleMute}
                  className="h-8 w-8 p-0 text-white hover:text-gold hover:bg-white/10 transition-colors"
                >
                  {state.isMuted || state.volume === 0 ? (
                    <VolumeX className="h-4 w-4" />
                  ) : (
                    <Volume2 className="h-4 w-4" />
                  )}
                </Button>

                {/* Volume Slider */}
                <div 
                  className={cn(
                    "transition-all duration-200 overflow-hidden",
                    showVolumeSlider ? "w-16 opacity-100" : "w-0 opacity-0"
                  )}
                >
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={state.isMuted ? 0 : state.volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                    className="w-16 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gold"
                  />
                </div>
              </div>

              {/* Time Display */}
              <div className="text-white text-sm font-medium">
                {formatTime(state.currentTime)} / {formatTime(state.duration)}
              </div>
            </div>

            {/* Fullscreen */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleFullscreen}
              className="h-8 w-8 p-0 text-white hover:text-gold hover:bg-white/10 transition-colors"
            >
              <Maximize className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomVideoPlayer;