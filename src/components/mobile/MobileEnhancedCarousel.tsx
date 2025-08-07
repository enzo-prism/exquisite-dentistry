import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSwipeGestures, useTouchOptimization } from '@/hooks/use-mobile-gestures';
import { useHardwareAcceleration } from '@/hooks/use-hardware-acceleration';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion, AnimatePresence } from 'framer-motion';

interface CarouselItem {
  id: string | number;
  content: React.ReactNode;
}

interface MobileEnhancedCarouselProps {
  items: CarouselItem[];
  className?: string;
  autoplaySpeed?: number;
  showDots?: boolean;
  showArrows?: boolean;
  enableSwipe?: boolean;
  itemsPerView?: number;
}

const MobileEnhancedCarousel: React.FC<MobileEnhancedCarouselProps> = ({
  items,
  className,
  autoplaySpeed = 0,
  showDots = true,
  showArrows = true,
  enableSwipe = true,
  itemsPerView = 1
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const isMobile = useIsMobile();
  const { ref: hardwareRef } = useHardwareAcceleration();
  const { getTouchTargetClasses } = useTouchOptimization();

  const maxIndex = Math.max(0, items.length - itemsPerView);

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
  }, [isTransitioning, maxIndex]);

  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    setCurrentIndex(prev => (prev <= 0 ? maxIndex : prev - 1));
  }, [isTransitioning, maxIndex]);

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setCurrentIndex(Math.min(Math.max(0, index), maxIndex));
  }, [isTransitioning, currentIndex, maxIndex]);

  // Swipe gesture handling
  const { ref: swipeRef } = useSwipeGestures({
    onSwipeLeft: nextSlide,
    onSwipeRight: prevSlide,
    threshold: 50,
    disabled: !enableSwipe || !isMobile
  });

  // Autoplay functionality
  useEffect(() => {
    if (!autoplaySpeed || isPaused || items.length <= itemsPerView) return;

    const interval = setInterval(nextSlide, autoplaySpeed);
    return () => clearInterval(interval);
  }, [autoplaySpeed, isPaused, nextSlide, items.length, itemsPerView]);

  // Transition state management
  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => setIsTransitioning(false), 300);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  // Combine refs
  const combinedRef = useCallback((node: HTMLDivElement | null) => {
    if (hardwareRef) hardwareRef.current = node;
    if (swipeRef) swipeRef.current = node;
  }, [hardwareRef, swipeRef]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0
    })
  };

  return (
    <div 
      className={cn('relative w-full overflow-hidden', className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* Main carousel container */}
      <div 
        ref={combinedRef}
        className="relative w-full"
        style={{ 
          willChange: 'transform',
          contain: 'layout style paint'
        }}
      >
        <div className="overflow-hidden">
          <motion.div
            className="flex"
            animate={{ 
              x: `${-currentIndex * (100 / itemsPerView)}%` 
            }}
            transition={{ 
              type: 'spring', 
              stiffness: 300, 
              damping: 30,
              mass: 0.8
            }}
            style={{ 
              width: `${(items.length / itemsPerView) * 100}%`,
              willChange: 'transform'
            }}
          >
            {items.map((item) => (
              <div
                key={item.id}
                className="flex-shrink-0"
                style={{ width: `${100 / items.length}%` }}
              >
                <div className="px-2">
                  {item.content}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Navigation arrows - enhanced for mobile */}
      {showArrows && items.length > itemsPerView && (
        <>
          <motion.button
            className={cn(
              'absolute left-2 top-1/2 -translate-y-1/2 z-10',
              'bg-white/90 hover:bg-white text-gray-700 hover:text-primary',
              'rounded-full shadow-lg backdrop-blur-sm',
              'transition-all duration-200',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              getTouchTargetClasses('md')
            )}
            onClick={prevSlide}
            disabled={isTransitioning}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} />
          </motion.button>

          <motion.button
            className={cn(
              'absolute right-2 top-1/2 -translate-y-1/2 z-10',
              'bg-white/90 hover:bg-white text-gray-700 hover:text-primary',
              'rounded-full shadow-lg backdrop-blur-sm',
              'transition-all duration-200',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              getTouchTargetClasses('md')
            )}
            onClick={nextSlide}
            disabled={isTransitioning}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Next slide"
          >
            <ChevronRight size={20} />
          </motion.button>
        </>
      )}

      {/* Dots indicator - enhanced for mobile touch */}
      {showDots && items.length > itemsPerView && (
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: maxIndex + 1 }, (_, index) => (
            <motion.button
              key={index}
              className={cn(
                'rounded-full transition-all duration-300',
                'touch-manipulation',
                index === currentIndex 
                  ? 'bg-primary w-8 h-3' 
                  : 'bg-gray-300 hover:bg-gray-400 w-3 h-3',
                getTouchTargetClasses('sm')
              )}
              onClick={() => goToSlide(index)}
              disabled={isTransitioning}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Swipe indicator for first-time users */}
      {isMobile && enableSwipe && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-gray-500 opacity-60">
          <motion.div
            className="flex items-center space-x-1"
            initial={{ opacity: 1 }}
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: 2 }}
          >
            <span>Swipe to navigate</span>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default MobileEnhancedCarousel;