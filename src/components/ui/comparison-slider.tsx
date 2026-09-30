import React, { useCallback, useState, useRef, useEffect } from 'react';
import { SmartImage } from './smart-image';
import { cn } from '@/lib/utils';

interface ComparisonSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeAlt: string;
  afterAlt: string;
  label?: string;
  beforeObjectPosition?: string;
  afterObjectPosition?: string;
  objectPosition?: string;
  className?: string;
  aspectRatio?: number;
  minAspectRatio?: number;
  maxAspectRatio?: number;
}

export const ComparisonSlider: React.FC<ComparisonSliderProps> = ({
  beforeImage,
  afterImage,
  beforeAlt,
  afterAlt,
  label,
  beforeObjectPosition,
  afterObjectPosition,
  objectPosition = 'center 30%',
  className,
  aspectRatio,
  minAspectRatio = 3/4,
  maxAspectRatio = 16/9
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState({ before: false, after: false });
  const containerRef = useRef<HTMLDivElement>(null);

  const updateSliderPosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const position = ((clientX - rect.left) / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, position)));
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    updateSliderPosition(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    updateSliderPosition(e.touches[0].clientX);
  };

  const handleBeforeLoad = useCallback(() => {
    setImagesLoaded((previous) => previous.before ? previous : { ...previous, before: true });
  }, []);
  const handleAfterLoad = useCallback(() => {
    setImagesLoaded((previous) => previous.after ? previous : { ...previous, after: true });
  }, []);

  useEffect(() => {
    setImagesLoaded({ before: false, after: false });
    setSliderPosition(50);
  }, [beforeImage, afterImage]);

  // Handlers are created inside the effect so the exact listener instances that
  // were added are the ones removed on cleanup. Defining them in the component
  // body meant every re-render (including the ones the drag itself triggers)
  // produced new identities, so cleanup removed functions that were never
  // registered — leaking a live `mousemove`/`touchmove` listener per drag that
  // kept moving the slider long after the pointer was released.
  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => updateSliderPosition(e.clientX);
    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) updateSliderPosition(touch.clientX);
    };
    const stopDragging = () => setIsDragging(false);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', stopDragging);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', stopDragging);
    document.addEventListener('touchcancel', stopDragging);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', stopDragging);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', stopDragging);
      document.removeEventListener('touchcancel', stopDragging);
    };
  }, [isDragging, updateSliderPosition]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const deltas: Record<string, number> = { ArrowLeft: -5, ArrowDown: -5, ArrowRight: 5, ArrowUp: 5 };
    if (!(event.key in deltas) && event.key !== 'Home' && event.key !== 'End') return;
    event.preventDefault();
    setSliderPosition((position) => event.key === 'Home' ? 0 : event.key === 'End' ? 100 : Math.max(0, Math.min(100, position + deltas[event.key])));
  };

  const allImagesLoaded = imagesLoaded.before && imagesLoaded.after;

  return (
    <div 
      ref={containerRef}
      className={cn("relative group cursor-col-resize select-none touch-pan-y focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-dark", className)}
      role="slider"
      tabIndex={0}
      aria-label={label || `Compare ${beforeAlt} and ${afterAlt}`}
      aria-orientation="horizontal"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(sliderPosition)}
      aria-valuetext={`${Math.round(sliderPosition)}% before photo`}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      {/* After Image (Background) */}
      <SmartImage
        src={afterImage}
        alt={afterAlt}
        objectPosition={afterObjectPosition || objectPosition}
        fallbackAspectRatio={aspectRatio}
        minAspectRatio={minAspectRatio}
        maxAspectRatio={maxAspectRatio}
        onLoad={handleAfterLoad}
        showLoadingSkeleton={true}
      />

      <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-black/75 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
        After
      </span>

      {/* Before Image (Clipped) */}
      <div 
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <SmartImage
          src={beforeImage}
          alt={beforeAlt}
          objectPosition={beforeObjectPosition || objectPosition}
          fallbackAspectRatio={aspectRatio}
          minAspectRatio={minAspectRatio}
          maxAspectRatio={maxAspectRatio}
          onLoad={handleBeforeLoad}
          showLoadingSkeleton={false}
        />
      </div>

      <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-black/75 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
        Before
      </span>

      {/* Slider Handle */}
      {allImagesLoaded && (
        <>
          <div 
            className={cn(
              "absolute top-0 bottom-0 w-1 bg-white shadow-lg transition-opacity duration-200",
              "before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2",
              "before:w-11 before:h-11 before:bg-white before:rounded-full before:shadow-lg",
              "before:flex before:items-center before:justify-center",
              "after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2",
              "after:w-4 after:h-4 after:border-2 after:border-primary after:rounded-full",
              isHovering || isDragging ? "opacity-100" : "opacity-70"
            )}
            style={{ left: `${sliderPosition}%` }}
          />
          
        </>
      )}
    </div>
  );
};
