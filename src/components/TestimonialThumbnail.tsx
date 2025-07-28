import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TestimonialThumbnailProps {
  vimeoId: string;
  thumbnailUrl: string;
  title: string;
  className?: string;
}

const TestimonialThumbnail: React.FC<TestimonialThumbnailProps> = ({
  vimeoId,
  thumbnailUrl,
  title,
  className
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  const handleClick = () => {
    setIsLoaded(true);
  };

  const vimeoUrl = `https://player.vimeo.com/video/${vimeoId}?badge=0&autopause=0&autoplay=1&muted=1&controls=1&title=0&byline=0&portrait=0&background=0&loop=0&responsive=1&player_id=0&app_id=58479&quality=auto`;

  if (isLoaded) {
    return (
      <div className={cn("bg-gray-50 rounded-lg overflow-hidden shadow-lg", className)}>
        <div className="relative aspect-video">
          <iframe
            src={vimeoUrl}
            className="absolute inset-0 w-full h-full"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
            title={title}
            loading="lazy"
          />
        </div>
      </div>
    );
  }

  return (
    <div className={cn("bg-gray-50 rounded-lg overflow-hidden shadow-lg", className)}>
      <div 
        className="relative aspect-video cursor-pointer group"
        onClick={handleClick}
      >
        <img 
          src={thumbnailUrl} 
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
          <div className="bg-gold/90 text-white rounded-full p-3 sm:p-4 group-hover:scale-110 transition-transform min-h-[44px] min-w-[44px] flex items-center justify-center">
            <Play className="h-5 w-5 sm:h-6 sm:w-6 ml-0.5" fill="currentColor" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialThumbnail;