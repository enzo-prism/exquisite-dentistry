import React from 'react';
import { Star } from 'lucide-react';
import { FeaturedReview } from '@/data/featuredReviews';
import { cn } from '@/lib/utils';

interface FeaturedReviewWallProps {
  reviews: FeaturedReview[];
}

const FeaturedReviewWall: React.FC<FeaturedReviewWallProps> = ({ reviews }) => {
  return (
    <div className="relative">
      <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-gold/10 via-white to-white" aria-hidden="true" />
      <div className="rounded-3xl border border-gold/20 bg-white/95 shadow-[0_50px_100px_-60px_rgba(15,23,42,0.35)] p-6 sm:p-10">
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {reviews.map((review) => (
            <article
              key={review.name + review.quote}
              className={cn(
                'flex h-full flex-col gap-4 rounded-2xl border border-gray-100/80 bg-white/90 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg'
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-base font-semibold text-black">{review.name}</p>
                  <p className="text-xs uppercase tracking-[0.28em] text-gold/80">Patient</p>
                </div>
                <div className="flex items-center gap-1 text-gold" aria-label={`${review.rating} star review`}>
                  {Array.from({ length: review.rating }).map((_, index) => (
                    <Star key={index} size={16} className="fill-current" />
                  ))}
                </div>
              </div>
              {review.quote ? (
                <p className="text-sm text-black/80 leading-relaxed">“{review.quote}”</p>
              ) : (
                <p className="text-sm text-black/60 italic">5-star rating</p>
              )}
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedReviewWall;
