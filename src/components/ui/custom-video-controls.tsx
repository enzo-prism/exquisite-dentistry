import React, { useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './button';
import { Slider } from './slider';

interface CustomVideoControlsProps {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  isLoaded: boolean;
  onPlayPause: () => void;
  onSeek: (time: number) => void;
  onVolumeChange: (volume: number) => void;
  onToggleMute: () => void;
  onFullscreen: () => void;
  className?: string;
}

const CustomVideoControls: React.FC<CustomVideoControlsProps> = ({
  isPlaying,
  currentTime,
  duration,
  volume,
  isMuted,
  isLoaded,
  onPlayPause,
  onSeek,
  onVolumeChange,
  onToggleMute,
  onFullscreen,
  className,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [hideTimer, setHideTimer] = useState<NodeJS.Timeout | null>(null);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  // Auto-hide controls after 3 seconds of inactivity
  useEffect(() => {
    if (hideTimer) {
      clearTimeout(hideTimer);
    }

    if (isPlaying) {
      const timer = setTimeout(() => setIsVisible(false), 3000);
      setHideTimer(timer);
    } else {
      setIsVisible(true);
    }

    return () => {
      if (hideTimer) clearTimeout(hideTimer);
    };
  }, [isPlaying, hideTimer]);

  const handleMouseMove = () => {
    setIsVisible(true);
    if (hideTimer) {
      clearTimeout(hideTimer);
    }
    if (isPlaying) {
      const timer = setTimeout(() => setIsVisible(false), 3000);
      setHideTimer(timer);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  if (!isLoaded) return null;

  return (
    <div
      className={cn(
        "absolute inset-0 transition-opacity duration-300",
        isVisible ? "opacity-100" : "opacity-0",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsVisible(true)}
    >
      {/* Gradient overlay for better control visibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
      
      {/* Controls container */}
      <div className="absolute bottom-0 left-0 right-0 p-4 space-y-3">
        {/* Progress bar */}
        <div className="relative group">
          <div 
            className="h-1 bg-white/20 rounded-full cursor-pointer transition-all group-hover:h-1.5"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              const percentage = clickX / rect.width;
              onSeek(percentage * duration);
            }}
          >
            <div 
              className="h-full bg-gold rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
            {/* Progress handle - only visible on hover */}
            <div 
              className="absolute top-1/2 w-3 h-3 bg-gold rounded-full transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ left: `${progressPercentage}%`, marginLeft: '-6px' }}
            />
          </div>
        </div>

        {/* Control buttons and time */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* Play/Pause button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onPlayPause}
              className="h-8 w-8 p-0 text-white hover:text-gold hover:bg-white/10 transition-colors"
            >
              {isPlaying ? (
                <Pause className="h-4 w-4" fill="currentColor" />
              ) : (
                <Play className="h-4 w-4 ml-0.5" fill="currentColor" />
              )}
            </Button>

            {/* Volume controls */}
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggleMute}
                onMouseEnter={() => setShowVolumeSlider(true)}
                className="h-8 w-8 p-0 text-white hover:text-gold hover:bg-white/10 transition-colors"
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
              </Button>

              {/* Volume slider - appears on hover */}
              <div 
                className={cn(
                  "transition-all duration-200 overflow-hidden",
                  showVolumeSlider ? "w-16 opacity-100" : "w-0 opacity-0"
                )}
                onMouseEnter={() => setShowVolumeSlider(true)}
                onMouseLeave={() => setShowVolumeSlider(false)}
              >
                <Slider
                  value={[isMuted ? 0 : volume]}
                  onValueChange={([value]) => onVolumeChange(value)}
                  max={1}
                  step={0.1}
                  className="w-16"
                />
              </div>
            </div>

            {/* Time display */}
            <div className="text-white text-sm font-medium">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>

          {/* Fullscreen button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onFullscreen}
            className="h-8 w-8 p-0 text-white hover:text-gold hover:bg-white/10 transition-colors"
          >
            <Maximize className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CustomVideoControls;