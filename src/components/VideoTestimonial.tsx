
import React from 'react';
import UniversalVideoPlayer from './UniversalVideoPlayer';
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
      <UniversalVideoPlayer
        platform="vimeo"
        videoId={vimeoId}
        title={title}
        thumbnailUrl={thumbnailUrl}
        className="w-full h-full"
        autoplay={true}
      />
    </div>
  );
};

export default VideoTestimonial;
