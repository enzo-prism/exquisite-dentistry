import React from 'react';
import { Play } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import UniversalVideoPlayer from './UniversalVideoPlayer';
import { cn } from '@/lib/utils';
import type { VideoTestimonialItem } from '@/components/video-hero/video-constants';

interface TestimonialVideoCardProps {
  testimonial: VideoTestimonialItem;
  analyticsCategory: string;
  className?: string;
  trackCompletion?: boolean;
}

interface HostedVideoPlayerProps {
  videoUrl: string;
  thumbnailUrl: string;
  title: string;
  onVideoStart: () => void;
  onVideoEnd?: () => void;
}

const HostedVideoPlayer: React.FC<HostedVideoPlayerProps> = ({
  videoUrl,
  thumbnailUrl,
  title,
  onVideoStart,
  onVideoEnd
}) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [isVideoVisible, setIsVideoVisible] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);

  const handleActivateVideo = React.useCallback(() => {
    setIsVideoVisible(true);

    requestAnimationFrame(() => {
      const videoElement = videoRef.current;
      if (!videoElement) return;

      const playPromise = videoElement.play();
      if (playPromise && typeof playPromise.then === 'function') {
        playPromise.catch(() => {
          // Autoplay might be blocked; controls remain visible for manual playback
        });
      }
    });
  }, []);

  return (
    <AspectRatio ratio={16 / 9} className="overflow-hidden group relative">
      <div className="relative w-full h-full bg-black">
        <video
          ref={videoRef}
          src={videoUrl}
          poster={thumbnailUrl}
          controls
          playsInline
          preload="metadata"
          className={cn(
            'absolute inset-0 w-full h-full object-cover transition-opacity duration-300',
            isVideoVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
          )}
          onPlay={onVideoStart}
          onEnded={onVideoEnd}
        />

        {!isVideoVisible && (
          <button
            type="button"
            onClick={handleActivateVideo}
            className="absolute inset-0 w-full h-full focus:outline-none"
            aria-label={`Play ${title}`}
          >
            {!imageError ? (
              <img
                src={thumbnailUrl}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="absolute inset-0 w-full h-full bg-gray-100 flex items-center justify-center">
                <span className="text-gray-400 text-sm">Video Thumbnail</span>
              </div>
            )}

            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-gold/90 hover:bg-gold text-white rounded-full p-3 sm:p-4 group-hover:scale-110 transition-transform min-h-[44px] min-w-[44px] flex items-center justify-center shadow-lg">
                <Play className="h-5 w-5 sm:h-6 sm:w-6 ml-0.5" fill="currentColor" />
              </div>
            </div>
          </button>
        )}
      </div>
    </AspectRatio>
  );
};

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

    if (typeof window !== 'undefined' && typeof (window as any).gtag !== 'undefined') {
      (window as any).gtag('event', 'video_start', {
        event_category: analyticsCategory,
        event_label: testimonial.title,
        video_id: videoId
      });
    }
  }, [analyticsCategory, testimonial.title, videoId]);

  const handleVideoEnd = React.useCallback(() => {
    if (!trackCompletion) return;

    if (typeof window !== 'undefined' && typeof (window as any).gtag !== 'undefined') {
      (window as any).gtag('event', 'video_complete', {
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
          className="w-full h-full"
          useCustomControls={true}
          overlayMode="safe"
          onVideoStart={handleVideoStart}
          onVideoEnd={trackCompletion ? handleVideoEnd : undefined}
        />
      ) : (
        <HostedVideoPlayer
          videoUrl={testimonial.videoUrl}
          thumbnailUrl={testimonial.thumbnailUrl}
          title={testimonial.title}
          onVideoStart={handleVideoStart}
          onVideoEnd={trackCompletion ? handleVideoEnd : undefined}
        />
      )}
    </div>
  );
};

export default TestimonialVideoCard;
