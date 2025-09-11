import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { cn } from '@/lib/utils';

interface UniversalVideoPlayerProps {
  platform: 'vimeo' | 'youtube';
  videoId: string;
  title: string;
  thumbnailUrl: string;
  autoplay?: boolean;
  muted?: boolean;
  className?: string;
  onVideoStart?: () => void;
  onVideoEnd?: () => void;
}

const UniversalVideoPlayer: React.FC<UniversalVideoPlayerProps> = ({
  platform,
  videoId,
  title,
  thumbnailUrl,
  autoplay = false,
  muted = false,
  className,
  onVideoStart,
  onVideoEnd
}) => {

  const [isPlaying, setIsPlaying] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
    onVideoStart?.();
  };

  const getEmbedUrl = () => {
    const autoplayParam = autoplay ? '1' : '0';
    const mutedParam = muted ? '1' : '0';
    
    if (platform === 'vimeo') {
      return `https://player.vimeo.com/video/${videoId}?autoplay=${autoplayParam}&muted=${mutedParam}&controls=1&title=0&byline=0&portrait=0&autopause=0`;
    } else {
      return `https://www.youtube.com/embed/${videoId}?autoplay=${autoplayParam}&muted=${mutedParam}&controls=1&rel=0&modestbranding=1&showinfo=0`;
    }
  };

  if (isPlaying) {
    return (
      <AspectRatio ratio={16 / 9} className={cn("overflow-hidden", className)}>
        <iframe
          src={getEmbedUrl()}
          title={title}
          className="absolute inset-0 w-full h-full"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </AspectRatio>
    );
  }

  return (
    <AspectRatio ratio={16 / 9} className={cn("overflow-hidden cursor-pointer group", className)}>
      <div className="relative w-full h-full" onClick={handlePlay}>
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
};

export default UniversalVideoPlayer;