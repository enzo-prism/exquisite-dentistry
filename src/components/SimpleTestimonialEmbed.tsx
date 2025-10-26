import React from 'react';
import TestimonialVideoCard from './TestimonialVideoCard';
import type { VideoTestimonialItem } from '@/components/video-hero/video-constants';

interface SimpleTestimonialEmbedProps {
  testimonial: VideoTestimonialItem;
  className?: string;
}

const SimpleTestimonialEmbed: React.FC<SimpleTestimonialEmbedProps> = ({
  testimonial,
  className = ""
}) => {
  return (
    <TestimonialVideoCard
      testimonial={testimonial}
      analyticsCategory="homepage_testimonial"
      className={className}
    />
  );
};

export default SimpleTestimonialEmbed;