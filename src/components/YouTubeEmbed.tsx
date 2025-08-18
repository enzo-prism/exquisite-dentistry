import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { cn } from '@/lib/utils';

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
      <div 
        className={cn("relative w-full", className)}
        style={{ 
          aspectRatio: '16/9',
          contain: 'layout',
          containIntrinsicSize: '100% 56.25%'
        }}
      >
        <iframe
          src={youtubeUrl}
          className="absolute inset-0 w-full h-full"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          title={title}
          loading="lazy"
        />
      </div>
    );
  }
  
  return (
    <div
      className={cn(
        "relative w-full cursor-pointer group overflow-hidden rounded-lg",
        className
      )}
      style={{ 
        aspectRatio: '16/9',
        contain: 'layout',
        containIntrinsicSize: '100% 56.25%'
      }}
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
        <div className="bg-red-600 text-white rounded-full p-3 sm:p-4 group-hover:scale-110 transition-transform min-h-[44px] min-w-[44px] flex items-center justify-center">
          <Play className="h-5 w-5 sm:h-6 sm:w-6 ml-0.5" fill="currentColor" />
        </div>
      </div>
    </div>
  );
};

export default YouTubeEmbed;