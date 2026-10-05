import React from 'react';
import UniversalVideoPlayer from './UniversalVideoPlayer';
import { cn } from '@/lib/utils';
import PracticeVideoPlayer from './PracticeVideoPlayer';
import type { VideoTestimonialItem } from '@/components/video-hero/video-constants';
import { trackVideoEngagement } from '@/utils/vercelAnalytics';

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

    trackVideoEngagement({
      action: 'start',
      source: analyticsCategory,
      videoId,
    });

  }, [analyticsCategory, videoId]);

  const handleVideoEnd = React.useCallback(() => {
    if (!trackCompletion) return;

    trackVideoEngagement({
      action: 'complete',
      source: analyticsCategory,
      videoId,
    });

  }, [analyticsCategory, videoId, trackCompletion]);

  return (
    <figure className={cn('overflow-hidden rounded-2xl border border-gold/15 bg-white shadow-[0_24px_60px_-40px_rgba(23,18,10,0.45)]', className)}>
      {/* Branded placeholder so lazy thumbnails never read as empty black tiles. */}
      <div className="aspect-video w-full bg-[radial-gradient(120%_120%_at_30%_20%,#3a3226_0%,#14120e_55%,#0b0a08_100%)]">
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
      <figcaption className="border-t border-black/5 bg-white px-5 py-4 text-sm font-semibold text-ink">
        {testimonial.title}
      </figcaption>
    </figure>
  );
};

export default TestimonialVideoCard;
