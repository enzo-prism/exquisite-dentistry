import React, { useCallback, useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SmartImage } from './smart-image';
import { cn } from '@/lib/utils';
import { useInView } from '@/hooks/use-in-view';
import { easeInOutCubic, prefersReducedMotion } from '@/lib/motion';

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
  /** One gentle sweep the first time the comparison scrolls into view, to show it can be dragged. */
  autoPeek?: boolean;
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
  maxAspectRatio = 16/9,
  autoPeek = true
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState({ before: false, after: false });
  const containerRef = useRef<HTMLDivElement | null>(null);
  const userTookControl = useRef(false);
  const peekFrame = useRef(0);
  const { ref: inViewRef, inView } = useInView<HTMLDivElement>({ threshold: 0.55, rootMargin: '0px' });
  const setRefs = useCallback((node: HTMLDivElement | null) => {
    containerRef.current = node;
    (inViewRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
  }, [inViewRef]);

  const takeControl = useCallback(() => {
    userTookControl.current = true;
    if (peekFrame.current) cancelAnimationFrame(peekFrame.current);
    peekFrame.current = 0;
  }, []);

  const updateSliderPosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const position = ((clientX - rect.left) / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, position)));
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    takeControl();
    setIsDragging(true);
    updateSliderPosition(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    takeControl();
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
    takeControl();
    setSliderPosition((position) => event.key === 'Home' ? 0 : event.key === 'End' ? 100 : Math.max(0, Math.min(100, position + deltas[event.key])));
  };

  const allImagesLoaded = imagesLoaded.before && imagesLoaded.after;

  // Peek: 50 → 18 → 82 → 50 once, after both photos have painted. Any pointer,
  // touch, focus or key input cancels it immediately and hands over control.
  useEffect(() => {
    if (!autoPeek || !inView || !allImagesLoaded || userTookControl.current || prefersReducedMotion()) return;
    const stops = [50, 18, 82, 50];
    const segment = 700;
    let start = 0;
    const tick = (now: number) => {
      if (userTookControl.current) return;
      if (!start) start = now;
      const elapsed = now - start;
      const index = Math.min(stops.length - 2, Math.floor(elapsed / segment));
      const t = Math.min(1, (elapsed - index * segment) / segment);
      const from = stops[index];
      const to = stops[index + 1];
      setSliderPosition(from + (to - from) * easeInOutCubic(t));
      if (elapsed < segment * (stops.length - 1)) {
        peekFrame.current = requestAnimationFrame(tick);
      } else {
        userTookControl.current = true;
        peekFrame.current = 0;
      }
    };
    const delay = window.setTimeout(() => {
      peekFrame.current = requestAnimationFrame(tick);
    }, 250);
    return () => {
      window.clearTimeout(delay);
      if (peekFrame.current) cancelAnimationFrame(peekFrame.current);
    };
  }, [autoPeek, inView, allImagesLoaded]);

  return (
    <div 
      ref={setRefs}
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
      onFocus={takeControl}
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
        <div
          className="pointer-events-none absolute inset-y-0 z-10 w-0"
          style={{ left: `${sliderPosition}%` }}
          aria-hidden="true"
        >
          <div className="absolute inset-y-0 -left-px w-0.5 bg-white/90 shadow-[0_0_12px_rgba(0,0,0,0.35)]" />
          <div
            className={cn(
              "absolute left-0 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full",
              "border border-white/70 bg-white/90 text-gold-dark shadow-[0_10px_30px_-8px_rgba(0,0,0,0.45)] backdrop-blur",
              "transition-transform duration-300 ease-out",
              isHovering || isDragging ? "scale-110" : "scale-100"
            )}
          >
            <ChevronLeft className="-mr-1 h-4 w-4" />
            <ChevronRight className="-ml-1 h-4 w-4" />
          </div>
        </div>
      )}
    </div>
  );
};
