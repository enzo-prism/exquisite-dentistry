
import React from 'react';
import VimeoFacade from './VimeoFacade';
import { cn } from '@/lib/utils';

interface VideoTestimonialProps {
  vimeoId: string;
  thumbnailUrl: string;
  title: string;
  className?: string;
}

const VideoTestimonial: React.FC<VideoTestimonialProps> = ({
  vimeoId,
  thumbnailUrl,
  title,
  className
}) => {
  return (
    <div className={cn("bg-gray-50 rounded-lg overflow-hidden shadow-lg", className)}>
      <div className="relative aspect-video">
        <VimeoFacade
          videoId={vimeoId}
          title={title}
          thumbnailUrl={thumbnailUrl}
          className="w-full h-full"
          autoplay={true}
          muted={true}
          loop={false}
          background={false}
          controls={true}
        />
      </div>
    </div>
  );
};

export default VideoTestimonial;
