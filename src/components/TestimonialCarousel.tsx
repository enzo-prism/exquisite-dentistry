
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useHardwareAcceleration } from '@/hooks/use-hardware-acceleration';

interface Testimonial {
  id: number;
  name: string;
  content: string;
  stars: number;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  className?: string;
  autoplaySpeed?: number;
}

const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({ 
  testimonials,
  className,
  autoplaySpeed = 5000 
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { ref } = useHardwareAcceleration();

  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      nextTestimonial();
    }, autoplaySpeed);

    return () => clearInterval(interval);
  }, [activeIndex, isPaused, autoplaySpeed]);

  return (
    <div 
      ref={ref}
      className={cn(
        'w-full max-w-4xl mx-auto relative hardware-optimized',
        className
      )}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="overflow-hidden relative px-6 py-12">
        <div 
          className="flex transition-transform duration-500 ease-in-out composite-layer"
          style={{ transform: `translate3d(-${activeIndex * 100}%, 0, 0)` }}
        >
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="w-full flex-shrink-0 px-6 text-center gpu-layer"
            >
              <div className="flex justify-center pb-6">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star 
                    key={index} 
                    size={20} 
                    className={cn(
                      index < testimonial.stars ? 'text-gold fill-gold' : 'text-gray-300'
                    )}
                  />
                ))}
              </div>
              <blockquote className="text-xl md:text-2xl font-light text-black-light italic mb-8">
                "{testimonial.content}"
              </blockquote>
              <p className="font-medium text-gold">{testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={prevTestimonial}
        className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-black-light hover:text-gold bg-white/80 hover:bg-white backdrop-blur-sm rounded-full shadow-md smooth-animation gpu-accelerated"
        aria-label="Previous testimonial"
      >
        <ChevronLeft size={20} />
      </button>

      <button
        onClick={nextTestimonial}
        className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-black-light hover:text-gold bg-white/80 hover:bg-white backdrop-blur-sm rounded-full shadow-md smooth-animation gpu-accelerated"
        aria-label="Next testimonial"
      >
        <ChevronRight size={20} />
      </button>

      <div className="flex justify-center space-x-2 mt-6">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={cn(
              'w-2.5 h-2.5 rounded-full transition-all duration-300 gpu-accelerated',
              index === activeIndex ? 'bg-gold w-8' : 'bg-gray-300'
            )}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialCarousel;
