
import React from 'react';
import TestimonialVideoCard from './TestimonialVideoCard';
import type { VideoTestimonialItem } from '@/components/video-hero/video-constants';

interface VideoTestimonialProps {
  testimonial: VideoTestimonialItem;
  className?: string;
}

const VideoTestimonial: React.FC<VideoTestimonialProps> = ({
  testimonial,
  className
}) => {
  return (
    <TestimonialVideoCard
      testimonial={testimonial}
      analyticsCategory="testimonial"
      className={className}
      trackCompletion={true}
    />
  );
};

export default VideoTestimonial;
