
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
  const handleVideoStart = () => {
    // Track video engagement for analytics
    if (typeof (window as any).gtag !== 'undefined') {
      (window as any).gtag('event', 'video_start', {
        event_category: 'testimonial',
        event_label: title,
        video_id: vimeoId
      });
    }
  };

  const handleVideoEnd = () => {
    // Track video completion for analytics
    if (typeof (window as any).gtag !== 'undefined') {
      (window as any).gtag('event', 'video_complete', {
        event_category: 'testimonial',
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
        useCustomControls={true}
        overlayMode="safe"
        onVideoStart={handleVideoStart}
        onVideoEnd={handleVideoEnd}
      />
    </div>
  );
};

export default VideoTestimonial;
