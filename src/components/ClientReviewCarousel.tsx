import React, { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Star } from 'lucide-react';
import type { FeaturedReview } from '@/data/featuredReviews';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface ClientReviewCarouselProps {
  reviews: FeaturedReview[];
  variant?: 'full' | 'compact';
}

const ClientReviewCarousel: React.FC<ClientReviewCarouselProps> = ({ reviews, variant = 'full' }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const scroll = (direction: 'prev' | 'next') => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollAmount = direction === 'next' ? container.clientWidth * 0.9 : -container.clientWidth * 0.9;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  if (variant === 'compact') {
    const review = reviews[index];
    const handleChange = (direction: 'prev' | 'next') => {
      setIndex((prev) => {
        if (direction === 'next') {
          return prev + 1 < reviews.length ? prev + 1 : 0;
        }
        return prev - 1 >= 0 ? prev - 1 : reviews.length - 1;
      });
    };

    return (
      <div className="mt-10 mx-auto max-w-xl rounded-2xl border border-black/5 bg-white/90 p-6 shadow-[0_25px_45px_-30px_rgba(15,23,42,0.25)]">
        <div className="flex flex-col gap-1 text-center">
          <span className="text-xs uppercase tracking-[0.4em] text-gold">5-STAR PROOF</span>
        </div>
        <div className="mt-6 flex flex-col gap-4 text-left">
          <div className="flex items-center gap-3">
            <div>
              <p className="text-base font-semibold text-black">{review.name}</p>
              <p className="text-[11px] uppercase tracking-[0.35em] text-gold/80">Patient</p>
            </div>
            <div className="ml-auto flex items-center gap-1 text-gold" aria-label={`${review.rating} star review`}>
              {Array.from({ length: review.rating }).map((_, starIndex) => (
                <Star key={starIndex} size={14} className="fill-current" />
              ))}
            </div>
          </div>
          <blockquote className="text-sm text-black/80 leading-relaxed">
            {review.quote ? `“${review.quote}”` : '5-star rating'}
          </blockquote>
        </div>
        <div className="mt-6 flex items-center justify-between">
          <button
            type="button"
            onClick={() => handleChange('prev')}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-black hover:border-black/30 transition"
            aria-label="Previous review"
          >
            <ArrowLeft size={16} />
          </button>
          <div className="flex gap-1">
            {reviews.map((_, dotIndex) => (
              <span
                key={`dot-${dotIndex}`}
                className={cn(
                  'h-1.5 w-6 rounded-full bg-black/10 transition',
                  index === dotIndex && 'bg-black/60'
                )}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => handleChange('next')}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-black hover:border-black/30 transition"
            aria-label="Next review"
          >
            <ArrowRight size={16} />
          </button>
        </div>
        <div className="mt-5 text-center">
          <Link
            to="/testimonials"
            className="inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-1 text-xs font-semibold text-black/60 hover:text-black transition"
          >
            Read more reviews
            <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-12 rounded-3xl border border-black/5 bg-white/95 shadow-[0_45px_90px_-60px_rgba(15,23,42,0.5)] p-6 sm:p-8 md:p-10">
      <div className="flex flex-col gap-4 text-center max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-2 rounded-full bg-gold/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-gold">
          5-STAR PROOF
        </span>
        <h3 className="text-2xl sm:text-3xl font-semibold text-black">Why Angelenos Stay With Us Year After Year</h3>
        <p className="text-black-light/80">
          200+ Google reviews and 100+ Yelp reviews rave about the gentle care, cutting-edge technology, and anxiety-free experience our team delivers daily.
        </p>
      </div>

      <div className="relative mt-10">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white to-transparent" />

        <div className="flex justify-between mb-6">
          <div className="hidden sm:flex gap-3 ml-auto">
            <button
              type="button"
              onClick={() => scroll('prev')}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-black hover:border-black/30 transition"
              aria-label="Scroll reviews left"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => scroll('next')}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-black text-white hover:border-black/60 transition"
              aria-label="Scroll reviews right"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        <div ref={scrollRef} className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4">
          {reviews.map((review) => (
            <article
              key={`${review.name}-${review.quote}`}
              className="snap-start flex w-[85%] sm:w-[330px] lg:w-[360px] flex-none flex-col gap-4 rounded-2xl border border-black/5 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div>
                  <p className="text-base font-semibold text-black">{review.name}</p>
                  <p className="text-xs uppercase tracking-[0.28em] text-gold/80">Patient</p>
                </div>
                <div className="ml-auto flex items-center gap-1 text-gold" aria-label={`${review.rating} star review`}>
                  {Array.from({ length: review.rating }).map((_, index) => (
                    <Star key={index} size={16} className="fill-current" />
                  ))}
                </div>
              </div>
              <p className={cn('text-sm leading-relaxed text-black/80', !review.quote && 'italic text-black/60')}
              >
                {review.quote ? `“${review.quote}”` : '5-star rating'}
              </p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientReviewCarousel;
