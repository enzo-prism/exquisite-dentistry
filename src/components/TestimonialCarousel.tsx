
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useHardwareAcceleration } from '@/hooks/use-hardware-acceleration';
import { useSwipeGestures, useTouchOptimization } from '@/hooks/use-mobile-gestures';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();
  const { ref } = useHardwareAcceleration();
  const { getTouchTargetClasses } = useTouchOptimization();

  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  // Enhanced swipe gestures for mobile
  const { ref: swipeRef } = useSwipeGestures({
    onSwipeLeft: nextTestimonial,
    onSwipeRight: prevTestimonial,
    threshold: 50,
    disabled: !isMobile
  });

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      nextTestimonial();
    }, autoplaySpeed);

    return () => clearInterval(interval);
  }, [activeIndex, isPaused, autoplaySpeed]);

  // Combine refs for hardware acceleration and swipe gestures
  const combinedRef = React.useCallback((node: HTMLDivElement | null) => {
    if (ref) ref.current = node;
    if (swipeRef) swipeRef.current = node;
  }, [ref, swipeRef]);

  return (
    <div 
      ref={combinedRef}
      className={cn(
        'w-full max-w-4xl mx-auto relative hardware-optimized touch-optimized',
        className
      )}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
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
                {Array.from({ length: 5 }).map((_, starIndex) => (
                  <Star 
                    key={`star-${testimonial.id}-${starIndex}`}
                    size={20} 
                    className={cn(
                      starIndex < testimonial.stars ? 'text-gold fill-gold' : 'text-gray-300'
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
        className={cn(
          'absolute left-0 top-1/2 -translate-y-1/2',
          'flex items-center justify-center',
          'text-black-light hover:text-gold',
          'bg-white/80 hover:bg-white backdrop-blur-sm',
          'rounded-full shadow-md',
          'transition-all duration-200 gpu-accelerated mobile-touch-feedback',
          getTouchTargetClasses('md')
        )}
        aria-label="Previous testimonial"
      >
        <ChevronLeft size={isMobile ? 24 : 20} />
      </button>

      <button
        onClick={nextTestimonial}
        className={cn(
          'absolute right-0 top-1/2 -translate-y-1/2',
          'flex items-center justify-center',
          'text-black-light hover:text-gold',
          'bg-white/80 hover:bg-white backdrop-blur-sm',
          'rounded-full shadow-md',
          'transition-all duration-200 gpu-accelerated mobile-touch-feedback',
          getTouchTargetClasses('md')
        )}
        aria-label="Next testimonial"
      >
        <ChevronRight size={isMobile ? 24 : 20} />
      </button>

      <div className="flex justify-center space-x-2 mt-6">
        {testimonials.map((testimonial, index) => (
          <button
            key={`dot-${testimonial.id}`}
            onClick={() => setActiveIndex(index)}
            className={cn(
              'rounded-full transition-all duration-300 gpu-accelerated mobile-touch-feedback',
              getTouchTargetClasses('sm'),
              index === activeIndex 
                ? 'bg-gold w-8 h-3' 
                : 'bg-gray-300 hover:bg-gray-400 w-3 h-3'
            )}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Mobile swipe hint */}
      {isMobile && (
        <div className="text-center mt-4 text-xs text-gray-500 opacity-70">
          Swipe left or right to navigate
        </div>
      )}
    </div>
  );
};

export default TestimonialCarousel;
