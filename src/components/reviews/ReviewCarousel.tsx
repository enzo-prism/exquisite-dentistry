import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ReviewCarouselProps {
  /** Accessible name for the carousel region (e.g. "Video reviews"). */
  label: string;
  /**
   * Cards to render. Every child stays mounted in the DOM at all times so
   * crawlers (and users without JS) still see the full set — the carousel only
   * changes what is scrolled into view.
   */
  children: React.ReactNode;
  /** Cards visible per view on large screens. Mobile always shows one. */
  perView?: 2 | 3;
  className?: string;
}

/**
 * Basis subtracts the gutters before dividing, otherwise `basis-1/2`/`basis-1/3`
 * plus the track's `gap-6` (1.5rem) overflows and clips the last visible card.
 * n cards per view leave (n - 1) gutters to account for.
 */
const PER_VIEW_BASIS: Record<2 | 3, string> = {
  2: 'basis-full sm:basis-[calc((100%-1.5rem)/2)]',
  3: 'basis-full sm:basis-[calc((100%-1.5rem)/2)] lg:basis-[calc((100%-3rem)/3)]'
};

/**
 * Horizontal scroll-snap carousel used by the reviews surfaces.
 *
 * Deliberately *not* a mount/unmount carousel: the track holds every card and
 * we scroll it. That keeps all review copy in the static prerendered HTML and
 * in the rendered DOM, which is what makes the section indexable while still
 * showing only ~3 cards at a time to a human.
 */
const ReviewCarousel: React.FC<ReviewCarouselProps> = ({
  label,
  children,
  perView = 3,
  className
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const items = React.Children.toArray(children);

  const syncScrollState = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    // Tolerance absorbs sub-pixel rounding *and* the 4px resting offset the
    // track's focus-ring padding (px-1/-mx-1) introduces — without it the
    // "previous" arrow renders enabled at the start position. Still far below
    // one card width, so it can never mask a real scroll position.
    const END_TOLERANCE = 12;
    const maxScroll = track.scrollWidth - track.clientWidth;
    setCanScrollPrev(track.scrollLeft > END_TOLERANCE);
    setCanScrollNext(track.scrollLeft < maxScroll - END_TOLERANCE);
  }, []);

  useEffect(() => {
    syncScrollState();

    const track = trackRef.current;
    if (!track || typeof ResizeObserver === 'undefined') return;

    const observer = new ResizeObserver(syncScrollState);
    observer.observe(track);
    return () => observer.disconnect();
  }, [syncScrollState, items.length]);

  const scroll = (direction: 'prev' | 'next') => {
    const track = trackRef.current;
    if (!track) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    // Scroll a full view at a time so the arrows page through the set.
    const delta = track.clientWidth * (direction === 'next' ? 1 : -1);
    track.scrollBy({
      left: delta,
      behavior: prefersReducedMotion ? 'auto' : 'smooth'
    });
  };

  return (
    <div
      className={cn('relative', className)}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
    >
      {/*
        No `scroll-smooth` class on the track, deliberately: CSS
        scroll-behavior:smooth combined with scroll-snap-type:mandatory makes
        Chrome re-snap the track back to its origin, so programmatic scrolls
        never land. Smoothness is set per-call in scroll(), which also honors
        prefers-reduced-motion.
      */}
      <div
        ref={trackRef}
        onScroll={syncScrollState}
        tabIndex={0}
        className="no-scrollbar -mx-1 flex snap-x snap-mandatory gap-6 overflow-x-auto px-1 pb-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
      >
        {items.map((child, index) => (
          <div
            key={index}
            className={cn('min-w-0 shrink-0 grow-0 snap-start', PER_VIEW_BASIS[perView])}
          >
            {child}
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => scroll('prev')}
          disabled={!canScrollPrev}
          className="button-static inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/15 bg-white text-black transition hover:border-black/40 disabled:cursor-not-allowed disabled:opacity-35"
          aria-label={`Previous ${label.toLowerCase()}`}
        >
          <ArrowLeft size={18} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => scroll('next')}
          disabled={!canScrollNext}
          className="button-static inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/15 bg-black text-white transition hover:border-black disabled:cursor-not-allowed disabled:opacity-35"
          aria-label={`Next ${label.toLowerCase()}`}
        >
          <ArrowRight size={18} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

export default ReviewCarousel;
