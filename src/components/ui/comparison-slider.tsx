import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import LoadingSkeleton from './loading-skeleton';
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

type LoadState = 'loading' | 'loaded' | 'error';

/** A finger has to travel this far before we decide between "drag the divider" and "scroll the page". */
const TOUCH_SLOP = 8;
const KEY_STEPS: Record<string, number> = { ArrowLeft: -5, ArrowDown: -5, ArrowRight: 5, ArrowUp: 5, PageDown: -10, PageUp: 10 };

const clamp = (value: number) => Math.max(0, Math.min(100, value));

type Gesture = {
  pointerId: number;
  pointerType: string;
  startX: number;
  startY: number;
  dragging: boolean;
};

/**
 * Before/after photo comparison.
 *
 * Input model (see docs/comparison-slider.md):
 * - Pointer Events drive mouse, pen and touch through one path. Mouse and pen
 *   grab the divider immediately (and capture the pointer, so a release outside
 *   the window still ends the drag). Touch waits for TOUCH_SLOP: a sideways
 *   gesture drags, a vertical one is left to the browser as a page scroll
 *   (`touch-action: pan-y`), and a tap jumps the divider to the tapped point.
 * - The photos are not draggable, so the browser's native image drag can never
 *   hijack the gesture.
 * - A native, invisible `<input type="range">` spans the frame and owns focus,
 *   keyboard and assistive tech (VoiceOver/TalkBack swipe-to-adjust).
 * - Both photos share one frame whose aspect ratio comes from the after photo,
 *   so the two layers can never drift out of register.
 */
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
  minAspectRatio = 3 / 4,
  maxAspectRatio = 16 / 9,
  autoPeek = true
}) => {
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [beforeState, setBeforeState] = useState<LoadState>('loading');
  const [afterState, setAfterState] = useState<LoadState>('loading');
  const [frameRatio, setFrameRatio] = useState(aspectRatio ?? 4 / 3);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const gesture = useRef<Gesture | null>(null);
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

  const positionAt = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return null;
    return clamp(((clientX - rect.left) / rect.width) * 100);
  }, []);

  const moveTo = useCallback((clientX: number) => {
    const next = positionAt(clientX);
    if (next !== null) setPosition(next);
  }, [positionAt]);

  const endGesture = useCallback(() => {
    gesture.current = null;
    setIsDragging(false);
  }, []);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    if (gesture.current) return; // ignore a second finger
    takeControl();
    gesture.current = {
      pointerId: event.pointerId,
      pointerType: event.pointerType,
      startX: event.clientX,
      startY: event.clientY,
      dragging: event.pointerType !== 'touch'
    };
    if (event.pointerType === 'touch') return; // wait to learn whether this is a scroll

    // Mouse / pen: grab now. preventDefault stops text selection and focus
    // theft, so hand focus to the range input ourselves for keyboard follow-up.
    event.preventDefault();
    event.currentTarget.setPointerCapture?.(event.pointerId);
    if (event.pointerType === 'mouse') inputRef.current?.focus({ preventScroll: true });
    setIsDragging(true);
    moveTo(event.clientX);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const current = gesture.current;
    if (!current || current.pointerId !== event.pointerId) return;
    if (!current.dragging) {
      const dx = Math.abs(event.clientX - current.startX);
      const dy = Math.abs(event.clientY - current.startY);
      if (dx < TOUCH_SLOP && dy < TOUCH_SLOP) return;
      if (dy >= dx) {
        // Vertical: the browser is scrolling the page. Leave the divider alone.
        gesture.current = null;
        return;
      }
      current.dragging = true;
      event.currentTarget.setPointerCapture?.(event.pointerId);
      setIsDragging(true);
    }
    moveTo(event.clientX);
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    const current = gesture.current;
    if (!current || current.pointerId !== event.pointerId) return;
    if (current.pointerType === 'touch' && !current.dragging) {
      // A tap: jump the divider to the tapped point.
      moveTo(event.clientX);
    }
    endGesture();
  };

  const handlePointerCancel = (event: React.PointerEvent<HTMLDivElement>) => {
    if (gesture.current?.pointerId === event.pointerId) endGesture();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const isStep = event.key in KEY_STEPS;
    if (!isStep && event.key !== 'Home' && event.key !== 'End') return;
    event.preventDefault();
    takeControl();
    setPosition((current) =>
      event.key === 'Home' ? 0 : event.key === 'End' ? 100 : clamp(Math.round(current) + KEY_STEPS[event.key])
    );
  };

  // Assistive tech (VoiceOver / TalkBack adjust gestures) changes the native value.
  const handleRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    takeControl();
    setPosition(clamp(Number(event.target.value)));
  };

  const handleAfterLoad = useCallback((event: React.SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth, naturalHeight } = event.currentTarget;
    if (naturalWidth && naturalHeight) {
      setFrameRatio(Math.max(minAspectRatio, Math.min(maxAspectRatio, naturalWidth / naturalHeight)));
    }
    setAfterState('loaded');
  }, [minAspectRatio, maxAspectRatio]);

  // A cached photo can finish before React attaches onLoad; settle it from the element.
  const syncCachedImage = useCallback((img: HTMLImageElement | null, which: 'before' | 'after') => {
    if (!img || !img.complete) return;
    if (img.naturalWidth === 0) {
      (which === 'before' ? setBeforeState : setAfterState)('error');
      return;
    }
    if (which === 'after') {
      setFrameRatio(Math.max(minAspectRatio, Math.min(maxAspectRatio, img.naturalWidth / img.naturalHeight)));
    }
    (which === 'before' ? setBeforeState : setAfterState)('loaded');
  }, [minAspectRatio, maxAspectRatio]);

  useEffect(() => {
    setBeforeState('loading');
    setAfterState('loading');
    setPosition(50);
  }, [beforeImage, afterImage]);

  const ready = beforeState === 'loaded' && afterState === 'loaded';
  const failed = beforeState === 'error' || afterState === 'error';

  // Peek: 50 → 18 → 82 → 50 once, after both photos have painted. Any pointer,
  // touch, focus or key input cancels it immediately and hands over control.
  useEffect(() => {
    if (!autoPeek || !inView || !ready || userTookControl.current || prefersReducedMotion()) return;
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
      setPosition(from + (to - from) * easeInOutCubic(t));
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
  }, [autoPeek, inView, ready]);

  const rounded = Math.round(position);
  const imageClass = 'pointer-events-none absolute inset-0 h-full w-full select-none object-cover';

  if (failed) {
    return (
      <div
        className={cn('relative flex items-center justify-center bg-muted text-sm text-muted-foreground', className)}
        style={{ aspectRatio: frameRatio }}
      >
        Photos unavailable right now.
      </div>
    );
  }

  return (
    <div
      ref={setRefs}
      data-comparison-slider=""
      data-dragging={isDragging ? '' : undefined}
      className={cn(
        'relative isolate cursor-ew-resize touch-pan-y select-none overflow-hidden bg-muted',
        '[-webkit-tap-highlight-color:transparent] [-webkit-touch-callout:none]',
        'has-[input:focus-visible]:outline has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-offset-4 has-[input:focus-visible]:outline-gold-dark',
        className
      )}
      style={{ aspectRatio: frameRatio }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      onLostPointerCapture={handlePointerCancel}
      onPointerEnter={(event) => event.pointerType === 'mouse' && setIsHovering(true)}
      onPointerLeave={() => setIsHovering(false)}
      onDragStart={(event) => event.preventDefault()}
    >
      {!ready && <LoadingSkeleton className="absolute inset-0 z-10" />}

      {/* After photo (base layer) */}
      <img
        ref={(img) => syncCachedImage(img, 'after')}
        src={afterImage}
        alt={afterAlt}
        draggable={false}
        decoding="async"
        className={cn(imageClass, 'transition-opacity duration-300', ready ? 'opacity-100' : 'opacity-0')}
        style={{ objectPosition: afterObjectPosition || objectPosition }}
        onLoad={handleAfterLoad}
        onError={() => setAfterState('error')}
      />

      {/* Before photo, clipped to the left of the divider */}
      <div className="pointer-events-none absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        <img
          ref={(img) => syncCachedImage(img, 'before')}
          src={beforeImage}
          alt={beforeAlt}
          draggable={false}
          decoding="async"
          className={cn(imageClass, 'transition-opacity duration-300', ready ? 'opacity-100' : 'opacity-0')}
          style={{ objectPosition: beforeObjectPosition || objectPosition }}
          onLoad={() => setBeforeState('loaded')}
          onError={() => setBeforeState('error')}
        />
      </div>

      <span
        className={cn(
          'pointer-events-none absolute left-3 top-3 z-20 rounded-full bg-black/75 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white transition-opacity duration-200',
          position < 14 ? 'opacity-0' : 'opacity-100'
        )}
        aria-hidden="true"
      >
        Before
      </span>
      <span
        className={cn(
          'pointer-events-none absolute right-3 top-3 z-20 rounded-full bg-black/75 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white transition-opacity duration-200',
          position > 86 ? 'opacity-0' : 'opacity-100'
        )}
        aria-hidden="true"
      >
        After
      </span>

      {ready && (
        <div
          className="pointer-events-none absolute inset-y-0 z-20 w-0"
          style={{ left: `${position}%` }}
          aria-hidden="true"
        >
          <div className="absolute inset-y-0 -left-px w-0.5 bg-white/90 shadow-[0_0_12px_rgba(0,0,0,0.35)]" />
          <div
            className={cn(
              'absolute left-0 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full',
              'border border-white/70 bg-white/90 text-gold-dark shadow-[0_10px_30px_-8px_rgba(0,0,0,0.45)] backdrop-blur',
              'transition-transform duration-300 ease-out',
              isHovering || isDragging ? 'scale-110' : 'scale-100'
            )}
          >
            <ChevronLeft className="-mr-1 h-4 w-4" />
            <ChevronRight className="-ml-1 h-4 w-4" />
          </div>
        </div>
      )}

      {/* Keyboard + assistive tech. Invisible, but spans the frame so screen reader focus outlines the photo. */}
      <input
        ref={inputRef}
        type="range"
        min={0}
        max={100}
        step={5}
        value={rounded}
        onChange={handleRangeChange}
        onKeyDown={handleKeyDown}
        onFocus={takeControl}
        aria-label={label || `Compare ${beforeAlt} and ${afterAlt}`}
        aria-valuetext={`Before photo ${rounded}%, after photo ${100 - rounded}%`}
        className="pointer-events-none absolute inset-0 z-30 m-0 h-full w-full cursor-ew-resize appearance-none opacity-0"
      />
    </div>
  );
};
