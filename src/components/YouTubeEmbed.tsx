import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { VIDEO_ASPECT_RATIO, VIDEO_CONTAINER_CONSTRAINTS } from '@/components/video-hero/video-aspect-ratio';

interface YouTubeEmbedProps {
  videoId: string;
  title?: string;
  thumbnailUrl?: string;
  className?: string;
  autoplay?: boolean;
}

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({
  videoId,
  title = 'Video',
  thumbnailUrl,
  className,
  autoplay = false,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const handleClick = () => {
    setIsLoaded(true);
  };
  
  // Build YouTube URL with parameters
  const youtubeUrl = `https://www.youtube.com/embed/${videoId}?` + 
    `autoplay=${autoplay ? 1 : 0}&rel=0&modestbranding=1&showinfo=0`;
  
  if (isLoaded) {
    return (
      <AspectRatio ratio={VIDEO_ASPECT_RATIO} className={cn("relative w-full", className)}>
        <iframe
          src={youtubeUrl}
          className="absolute inset-0 w-full h-full"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          title={title}
          loading="lazy"
        />
      </AspectRatio>
    );
  }
  
  return (
    <AspectRatio 
      ratio={VIDEO_ASPECT_RATIO} 
      className={cn("relative w-full cursor-pointer group overflow-hidden rounded-lg", className)}
      onClick={handleClick}
    >
      {/* Thumbnail Image or YouTube Default */}
      <div className="absolute inset-0 w-full h-full">
        {thumbnailUrl && !imageError ? (
          <img 
            src={thumbnailUrl} 
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <img 
            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        )}
        {/* Overlay for better play button visibility */}
        <div className="absolute inset-0 w-full h-full bg-black/20" />
      </div>
      
      {/* Play button overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
        <div className="bg-primary/90 text-primary-foreground rounded-full p-3 sm:p-4 group-hover:scale-110 transition-transform min-h-[44px] min-w-[44px] flex items-center justify-center">
          <Play className="h-5 w-5 sm:h-6 sm:w-6 ml-0.5" fill="currentColor" />
        </div>
      </div>
    </AspectRatio>
  );
};

export default YouTubeEmbed;