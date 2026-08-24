import React from 'react';
import UniversalVideoPlayer from './UniversalVideoPlayer';
import { cn } from '@/lib/utils';
import { trackVideoEngagement } from '@/utils/vercelAnalytics';

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
    trackVideoEngagement({
      action: 'start',
      source: 'testimonial_thumbnail',
      videoId: vimeoId,
    });

  };

  return (
    <div className={cn("bg-gray-50 rounded-lg overflow-hidden shadow-lg", className)}>
      <UniversalVideoPlayer
        platform="vimeo"
        videoId={vimeoId}
        title={title}
        thumbnailUrl={thumbnailUrl}
        className="w-full h-full"
        showIframeImmediately={true}
        useCustomControls={true}
        overlayMode="safe"
        onVideoStart={handleVideoStart}
      />
    </div>
  );
};

export default TestimonialThumbnail;
