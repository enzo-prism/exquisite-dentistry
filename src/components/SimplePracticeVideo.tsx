import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SimplePracticeVideoProps {
  videoId: string;
  title: string;
  thumbnailUrl: string;
  className?: string;
}

const SimplePracticeVideo: React.FC<SimplePracticeVideoProps> = ({
  videoId,
  title,
  thumbnailUrl,
  className,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  if (isPlaying) {
    return (
      <div className={cn("relative w-full aspect-video", className)}>
        <iframe
          src={`https://player.vimeo.com/video/${videoId}?autoplay=1&controls=1&title=0&byline=0&portrait=0`}
          className="absolute inset-0 w-full h-full"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          title={title}
        />
      </div>
    );
  }

  return (
    <div 
      className={cn("relative w-full aspect-video cursor-pointer group overflow-hidden", className)}
      onClick={handlePlay}
    >
      {/* Thumbnail */}
      <img 
        src={thumbnailUrl} 
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 w-full h-full bg-black/20 group-hover:bg-black/30 transition-colors" />
      
      {/* Play Button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-primary/90 text-primary-foreground rounded-full p-3 sm:p-4 group-hover:scale-110 transition-transform min-h-[44px] min-w-[44px] flex items-center justify-center">
          <Play className="h-5 w-5 sm:h-6 sm:w-6 ml-0.5" fill="currentColor" />
        </div>
      </div>
    </div>
  );
};

export default SimplePracticeVideo;