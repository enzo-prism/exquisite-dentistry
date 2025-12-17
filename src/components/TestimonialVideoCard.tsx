import React from 'react';
import UniversalVideoPlayer from './UniversalVideoPlayer';
import { cn } from '@/lib/utils';
import PracticeVideoPlayer from './PracticeVideoPlayer';
import type { VideoTestimonialItem } from '@/components/video-hero/video-constants';

interface TestimonialVideoCardProps {
  testimonial: VideoTestimonialItem;
  analyticsCategory: string;
  className?: string;
  trackCompletion?: boolean;
}

const TestimonialVideoCard: React.FC<TestimonialVideoCardProps> = ({
  testimonial,
  analyticsCategory,
  className,
  trackCompletion = false
}) => {
  const hasTrackedStartRef = React.useRef(false);

  const videoId = testimonial.type === 'vimeo' ? testimonial.vimeoId : testimonial.id;

  const handleVideoStart = React.useCallback(() => {
    if (hasTrackedStartRef.current) return;
    hasTrackedStartRef.current = true;

    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'video_start', {
        event_category: analyticsCategory,
        event_label: testimonial.title,
        video_id: videoId
      });
    }
  }, [analyticsCategory, testimonial.title, videoId]);

  const handleVideoEnd = React.useCallback(() => {
    if (!trackCompletion) return;

    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'video_complete', {
        event_category: analyticsCategory,
        event_label: testimonial.title,
        video_id: videoId
      });
    }
  }, [analyticsCategory, testimonial.title, videoId, trackCompletion]);

  return (
    <div className={cn('bg-gray-50 rounded-lg overflow-hidden shadow-lg', className)}>
      {testimonial.type === 'vimeo' ? (
        <UniversalVideoPlayer
          platform="vimeo"
          videoId={testimonial.vimeoId}
          title={testimonial.title}
          thumbnailUrl={testimonial.thumbnailUrl}
          thumbnailFallbackUrl={testimonial.thumbnailFallbackUrl}
          className="w-full h-full"
          useCustomControls={true}
          overlayMode="safe"
          onVideoStart={handleVideoStart}
          onVideoEnd={trackCompletion ? handleVideoEnd : undefined}
        />
      ) : (
        <PracticeVideoPlayer
          source={testimonial.videoUrl}
          poster={testimonial.thumbnailUrl}
          title={testimonial.title}
          className="w-full h-full"
          onVideoStart={handleVideoStart}
          onVideoEnd={trackCompletion ? handleVideoEnd : undefined}
          appearance="minimal"
        />
      )}
    </div>
  );
};

export default TestimonialVideoCard;
