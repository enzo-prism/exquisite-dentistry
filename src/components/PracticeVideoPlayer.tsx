import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Play, Pause, Maximize, Loader2 } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { cn } from '@/lib/utils';
import { OptimizedImage } from '@/components/seo';

interface PracticeVideoPlayerProps {
  source: string;
  poster: string;
  title: string;
  className?: string;
  onVideoStart?: () => void;
  onVideoEnd?: () => void;
  loop?: boolean;
  autoPlay?: boolean;
  muted?: boolean;
  passive?: boolean;
  appearance?: 'elevated' | 'minimal';
}

const PracticeVideoPlayer: React.FC<PracticeVideoPlayerProps> = ({
  source,
  poster,
  title,
  className,
  onVideoStart,
  onVideoEnd,
  loop = false,
  autoPlay = false,
  muted = false,
  passive = false,
  appearance = 'elevated'
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const controlsTimeoutRef = useRef<NodeJS.Timeout>();

  const clearControlsTimeout = () => {
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
      controlsTimeoutRef.current = undefined;
    }
  };

  const resetControlsTimeout = useCallback(() => {
    clearControlsTimeout();
    setShowControls(true);
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 2800);
    }
  }, [isPlaying]);

  useEffect(() => {
    return () => {
      clearControlsTimeout();
    };
  }, []);

  const syncFromVideo = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    setIsPlaying(!video.paused && !video.ended);
    setIsLoading(video.readyState < 3 && !video.paused);
    setShowControls(true);
    setIsReady(video.readyState >= 2);
    if (!video.paused) {
      resetControlsTimeout();
    }
  }, [resetControlsTimeout]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => {
      setIsPlaying(true);
      setIsLoading(false);
      resetControlsTimeout();
      onVideoStart?.();
    };
    const handlePause = () => {
      setIsPlaying(false);
      setShowControls(true);
      clearControlsTimeout();
    };
    const handleWaiting = () => {
      setIsLoading(true);
    };
    const handleCanPlay = () => {
      setIsLoading(false);
      setIsReady(true);
      if (autoPlay && video.paused) {
        const playPromise = video.play();
        if (playPromise) {
          playPromise.catch(() => undefined);
        }
      }
    };
    const handleEnded = () => {
      setIsPlaying(false);
      setShowControls(true);
      clearControlsTimeout();
      onVideoEnd?.();
    };

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('waiting', handleWaiting);
    video.addEventListener('playing', handleCanPlay);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('loadeddata', handleCanPlay);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('waiting', handleWaiting);
      video.removeEventListener('playing', handleCanPlay);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('loadeddata', handleCanPlay);
      video.removeEventListener('ended', handleEnded);
    };
  }, [autoPlay, onVideoEnd, onVideoStart, resetControlsTimeout]);

  const handlePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    setIsLoading(true);
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        setIsLoading(false);
        setIsPlaying(false);
      });
    }
  }, []);

  const handlePause = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();
  }, []);

  const handleTogglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused || video.ended) {
      handlePlay();
    } else {
      handlePause();
    }
  }, [handlePause, handlePlay]);

  const handleFullscreen = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => undefined);
    } else {
      container.requestFullscreen().catch(() => undefined);
    }
    resetControlsTimeout();
  }, [resetControlsTimeout]);

  const handleMouseMove = useCallback(() => {
    resetControlsTimeout();
  }, [resetControlsTimeout]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.code === 'Space' || event.code === 'Enter') {
        event.preventDefault();
        handleTogglePlay();
      } else if (event.code === 'KeyF') {
        event.preventDefault();
        handleFullscreen();
      }
    },
    [handleFullscreen, handleTogglePlay]
  );

  useEffect(() => {
    syncFromVideo();
  }, [syncFromVideo]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = muted;
    if (autoPlay && video.paused) {
      const playPromise = video.play();
      if (playPromise) {
        playPromise.catch(() => undefined);
      }
    }
  }, [autoPlay, muted]);

  const appearanceClasses =
    appearance === 'minimal'
      ? 'relative overflow-hidden rounded-lg bg-black group shadow-lg'
      : 'relative overflow-hidden rounded-lg shadow-2xl border border-white/40 backdrop-blur-sm bg-white/5 before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/10 before:to-transparent before:pointer-events-none group';

  const isInteractive = !passive;

  const preloadValue = autoPlay ? 'auto' : 'none';

  return (
    <AspectRatio
      ratio={16 / 9}
      className={cn(
        appearanceClasses,
        className
      )}
    >
      <div
        ref={containerRef}
        className={cn(
          'relative w-full h-full bg-black overflow-hidden',
          isInteractive ? 'cursor-pointer' : 'cursor-default'
        )}
        onClick={isInteractive ? handleTogglePlay : undefined}
        onMouseMove={isInteractive ? handleMouseMove : undefined}
        onKeyDown={isInteractive ? handleKeyDown : undefined}
        tabIndex={isInteractive ? 0 : -1}
        role={isInteractive ? 'button' : undefined}
        aria-label={isInteractive ? (isPlaying ? 'Pause video' : 'Play video') : undefined}
        style={{ borderRadius: 'inherit' }}
      >
        {!isReady && (
          <OptimizedImage
            src={poster}
            alt={`${title} preview`}
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
            sizes="100vw"
          />
        )}
        <video
          ref={videoRef}
          className={cn(
            'absolute inset-0 h-full w-full object-cover transition-opacity duration-300',
            !isReady ? 'opacity-0' : 'opacity-100'
          )}
          preload={preloadValue}
          loop={loop}
          controls={false}
          playsInline
          autoPlay={autoPlay}
          muted={muted}
          title={title}
        >
          <source src={source} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {!isInteractive && isLoading && (
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px] flex items-center justify-center z-30">
            <div className="bg-black/80 rounded-full p-4 shadow-xl">
              <Loader2 className="h-8 w-8 text-gold animate-spin" />
            </div>
          </div>
        )}

        {isInteractive && !isPlaying && (
          <>
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-gold/90 hover:bg-gold text-white rounded-full p-4 group-hover:scale-110 transition-all duration-300 shadow-2xl">
                <Play className="h-8 w-8 ml-1" fill="currentColor" />
              </div>
            </div>
          </>
        )}

        {isInteractive && isLoading && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex items-center justify-center z-30">
            <div className="bg-black/70 rounded-full p-4 shadow-xl">
              <Loader2 className="h-8 w-8 text-gold animate-spin" />
            </div>
          </div>
        )}

        {isInteractive && isPlaying && (
          <div
            className={cn(
              'absolute inset-0 z-20 flex items-end justify-center transition-opacity duration-300',
              showControls ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            )}
            onMouseMove={(event) => {
              event.stopPropagation();
              handleMouseMove();
            }}
            onClick={(event) => {
              event.stopPropagation();
              handleTogglePlay();
            }}
          >
            <div className="mb-5 flex w-full max-w-[240px] items-center justify-between rounded-full bg-black/70 px-5 py-2.5 shadow-lg backdrop-blur-md">
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  handleTogglePlay();
                }}
                className="bg-white/15 hover:bg-white/25 text-white rounded-full p-2 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gold/50"
                aria-label={isPlaying ? 'Pause video' : 'Play video'}
              >
                {isPlaying ? (
                  <Pause className="h-5 w-5" fill="currentColor" />
                ) : (
                  <Play className="h-5 w-5 ml-0.5" fill="currentColor" />
                )}
              </button>
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  handleFullscreen();
                }}
                className="bg-white/15 hover:bg-white/25 text-white rounded-full p-2 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gold/50"
                aria-label="Fullscreen"
              >
                <Maximize className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </AspectRatio>
  );
};

export default PracticeVideoPlayer;
