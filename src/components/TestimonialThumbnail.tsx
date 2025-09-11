import React from 'react';
import UniversalVideoPlayer from './UniversalVideoPlayer';
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
  const handleVideoStart = () => {
    // Track video engagement for analytics
    if (typeof (window as any).gtag !== 'undefined') {
      (window as any).gtag('event', 'video_start', {
        event_category: 'testimonial_thumbnail',
        event_label: title,
        video_id: vimeoId
      });
    }
  };

  return (
    <div className={cn("bg-gray-50 rounded-lg overflow-hidden shadow-lg", className)}>
      <UniversalVideoPlayer
        platform="vimeo"
        videoId={vimeoId}
        title={title}
        thumbnailUrl={thumbnailUrl}
        className="w-full h-full"
        onVideoStart={handleVideoStart}
      />
    </div>
  );
};

export default TestimonialThumbnail;