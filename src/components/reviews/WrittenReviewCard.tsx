import React from 'react';
import { Star } from 'lucide-react';
import type { FeaturedReview } from '@/data/featuredReviews';
import { cn } from '@/lib/utils';

interface WrittenReviewCardProps {
  review: FeaturedReview;
  className?: string;
}

/**
 * Single written review card. Shared by the homepage carousel and the full
 * reviews wall on /testimonials/ so both surfaces stay visually identical.
 */
const WrittenReviewCard: React.FC<WrittenReviewCardProps> = ({ review, className }) => (
  <article
    className={cn(
      'flex h-full flex-col gap-4 rounded-2xl border border-gray-100/80 bg-white/90 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg',
      className
    )}
  >
    <div className="flex items-center justify-between gap-3">
      <div>
        <p className="text-base font-semibold text-black">{review.name}</p>
        <p className="text-xs uppercase tracking-[0.2em] text-gold/80">
          {review.source ? `${review.source} review` : 'Patient review'}
          {review.publishedDate ? ` · ${review.publishedDate}` : ''}
        </p>
      </div>
      <div
        className="flex items-center gap-1 text-gold"
        role="img"
        aria-label={`${review.rating} star review`}
      >
        {Array.from({ length: review.rating }).map((_, index) => (
          <Star key={index} size={16} className="fill-current" aria-hidden="true" />
        ))}
      </div>
    </div>
    {review.quote ? (
      <blockquote className="text-sm leading-relaxed text-black/80">
        &ldquo;{review.quote}&rdquo;
      </blockquote>
    ) : (
      <p className="text-sm italic text-black/60">5-star rating</p>
    )}
  </article>
);

export default WrittenReviewCard;
