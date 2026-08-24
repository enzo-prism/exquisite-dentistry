import React, { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import WrittenReviewCard from '@/components/reviews/WrittenReviewCard';
import {
  filterReviewsByTheme,
  getAvailableThemes,
  taggedFeaturedReviews,
  type ReviewThemeId
} from '@/data/reviewThemes';
import { cn } from '@/lib/utils';

/**
 * Full written-review wall with theme filters.
 *
 * The default (unfiltered) state renders every review, which is what the
 * prerendered HTML and any crawler sees — filtering is a client-side
 * enhancement layered on top, never a gate on the content.
 */
const WrittenReviewsSection: React.FC = () => {
  const [activeTheme, setActiveTheme] = useState<ReviewThemeId | null>(null);
  const [visibleCount, setVisibleCount] = useState(12);

  const themes = useMemo(() => getAvailableThemes(taggedFeaturedReviews), []);
  const reviewsWithQuotes = useMemo(
    () => taggedFeaturedReviews.filter((review) => Boolean(review.quote?.trim())),
    []
  );
  const visibleReviews = useMemo(
    () => filterReviewsByTheme(reviewsWithQuotes, activeTheme),
    [activeTheme, reviewsWithQuotes]
  );
  const displayedReviews = visibleReviews.slice(0, visibleCount);

  const selectTheme = (theme: ReviewThemeId | null) => {
    setActiveTheme(theme);
    setVisibleCount(12);
  };

  return (
    <div className="relative">
      <div
        className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-gold/10 via-white to-white"
        aria-hidden="true"
      />
      <div className="rounded-3xl border border-gold/20 bg-white/95 p-6 shadow-[0_50px_100px_-60px_rgba(15,23,42,0.35)] sm:p-10">
        <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => selectTheme(null)}
            aria-pressed={activeTheme === null}
            className={cn(
              'button-static rounded-full border px-4 py-2 text-sm font-medium transition',
              activeTheme === null
                ? 'border-black bg-black text-white'
                : 'border-black/15 bg-white text-black hover:border-black/40'
            )}
          >
            All Reviews
          </button>
          {themes.map((theme) => (
            <button
              key={theme.id}
              type="button"
              onClick={() => selectTheme(theme.id)}
              aria-pressed={activeTheme === theme.id}
              className={cn(
                'button-static rounded-full border px-4 py-2 text-sm font-medium transition',
                activeTheme === theme.id
                  ? 'border-black bg-black text-white'
                  : 'border-black/15 bg-white text-black hover:border-black/40'
              )}
            >
              {theme.label}
            </button>
          ))}
        </div>

        <p className="sr-only" aria-live="polite">
          Showing {displayedReviews.length} of {visibleReviews.length} matching reviews.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {displayedReviews.map((review) => (
            <WrittenReviewCard key={review.name + (review.quote ?? '')} review={review} />
          ))}
        </div>

        {visibleCount < visibleReviews.length && (
          <div className="mt-8 text-center">
            <Button variant="outline" onClick={() => setVisibleCount((count) => count + 12)}>
              Load more reviews
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WrittenReviewsSection;
