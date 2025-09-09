import React, { useRef, useEffect, useState, useCallback } from 'react';
import Player from '@vimeo/player';
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { cn } from '@/lib/utils';

interface VimeoPlayerSDKProps {
  videoId: string;
  title: string;
  thumbnailUrl: string;
  autoplay?: boolean;
  muted?: boolean;
  className?: string;
  onVideoStart?: () => void;
  onVideoEnd?: () => void;
  onProgress?: (percent: number) => void;
  showCustomControls?: boolean;
}

const VimeoPlayerSDK: React.FC<VimeoPlayerSDKProps> = ({
  videoId,
  title,
  thumbnailUrl,
  autoplay = false,
  muted = false,
  className,
  onVideoStart,
  onVideoEnd,
  onProgress,
  showCustomControls = true
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerRef = useRef<Player | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(muted);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showThumbnail, setShowThumbnail] = useState(!autoplay);
  const [imageError, setImageError] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(false);

  const initializePlayer = useCallback(async () => {
    if (!iframeRef.current || isInitialized) return;

    try {
      const player = new Player(iframeRef.current);
      playerRef.current = player;

      // Set up event listeners
      await player.ready();

      player.on('play', () => {
        setIsPlaying(true);
        onVideoStart?.();
      });

      player.on('pause', () => {
        setIsPlaying(false);
      });

      player.on('ended', () => {
        setIsPlaying(false);
        onVideoEnd?.();
      });

      player.on('timeupdate', (data) => {
        const percent = (data.seconds / data.duration) * 100;
        setProgress(percent);
        setDuration(data.duration);
        onProgress?.(percent);
      });

      player.on('volumechange', (data) => {
        setIsMuted(data.volume === 0);
      });

      // Set initial muted state
      if (muted) {
        await player.setVolume(0);
      }

      setIsInitialized(true);
    } catch (error) {
      console.error('Failed to initialize Vimeo player:', error);
    }
  }, [isInitialized, muted, onVideoStart, onVideoEnd, onProgress]);

  const handleThumbnailClick = async () => {
    setShowThumbnail(false);
    
    // Small delay to ensure iframe is rendered
    setTimeout(() => {
      initializePlayer();
    }, 100);
  };

  const togglePlayPause = async () => {
    if (!playerRef.current) return;

    try {
      if (isPlaying) {
        await playerRef.current.pause();
      } else {
        await playerRef.current.play();
      }
    } catch (error) {
      console.error('Failed to toggle playback:', error);
    }
  };

  const toggleMute = async () => {
    if (!playerRef.current) return;

    try {
      const currentVolume = await playerRef.current.getVolume();
      if (currentVolume > 0) {
        await playerRef.current.setVolume(0);
        setIsMuted(true);
      } else {
        await playerRef.current.setVolume(0.7);
        setIsMuted(false);
      }
    } catch (error) {
      console.error('Failed to toggle mute:', error);
    }
  };

  const handleFullscreen = async () => {
    if (!playerRef.current) return;

    try {
      await playerRef.current.requestFullscreen();
    } catch (error) {
      console.error('Failed to enter fullscreen:', error);
    }
  };

  const getEmbedUrl = () => {
    const autoplayParam = autoplay ? '1' : '0';
    const mutedParam = muted ? '1' : '0';
    return `https://player.vimeo.com/video/${videoId}?autoplay=${autoplayParam}&muted=${mutedParam}&controls=${showCustomControls ? '0' : '1'}&title=0&byline=0&portrait=0&autopause=0`;
  };

  useEffect(() => {
    if (autoplay && !showThumbnail) {
      initializePlayer();
    }
  }, [autoplay, showThumbnail, initializePlayer]);

  if (showThumbnail) {
    return (
      <AspectRatio ratio={16 / 9} className={cn("overflow-hidden cursor-pointer group", className)}>
        <div className="relative w-full h-full" onClick={handleThumbnailClick}>
          {/* Thumbnail */}
          {!imageError && (
            <img
              src={thumbnailUrl}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          )}
          
          {/* Fallback background if image fails */}
          {imageError && (
            <div className="absolute inset-0 w-full h-full bg-gray-100 flex items-center justify-center">
              <span className="text-gray-400 text-sm">Video Thumbnail</span>
            </div>
          )}
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
          
          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-gold/90 hover:bg-gold text-white rounded-full p-3 sm:p-4 group-hover:scale-110 transition-transform min-h-[44px] min-w-[44px] flex items-center justify-center shadow-lg">
              <Play className="h-5 w-5 sm:h-6 sm:w-6 ml-0.5" fill="currentColor" />
            </div>
          </div>
        </div>
      </AspectRatio>
    );
  }

  return (
    <AspectRatio 
      ratio={16 / 9} 
      className={cn("overflow-hidden relative", className)}
      onMouseEnter={() => setControlsVisible(true)}
      onMouseLeave={() => setControlsVisible(false)}
    >
      <iframe
        ref={iframeRef}
        src={getEmbedUrl()}
        title={title}
        className="absolute inset-0 w-full h-full"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      
      {/* Custom Controls Overlay */}
      {showCustomControls && isInitialized && (
        <div className={cn(
          "absolute inset-0 pointer-events-none transition-opacity duration-300",
          controlsVisible ? "opacity-100" : "opacity-0"
        )}>
          {/* Bottom Controls Bar */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 pointer-events-auto">
            {/* Progress Bar */}
            <div className="mb-3">
              <div className="w-full bg-white/20 rounded-full h-1">
                <div 
                  className="bg-gold h-1 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            
            {/* Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button
                  onClick={togglePlayPause}
                  className="text-white hover:text-gold transition-colors p-1"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? (
                    <Pause className="h-5 w-5" fill="currentColor" />
                  ) : (
                    <Play className="h-5 w-5" fill="currentColor" />
                  )}
                </button>
                
                <button
                  onClick={toggleMute}
                  className="text-white hover:text-gold transition-colors p-1"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? (
                    <VolumeX className="h-5 w-5" />
                  ) : (
                    <Volume2 className="h-5 w-5" />
                  )}
                </button>
              </div>
              
              <button
                onClick={handleFullscreen}
                className="text-white hover:text-gold transition-colors p-1"
                aria-label="Fullscreen"
              >
                <Maximize className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </AspectRatio>
  );
};

export default VimeoPlayerSDK;