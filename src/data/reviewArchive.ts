import { demandForceReviews } from '@/data/demandForceReviews.generated';
import { featuredReviews, type FeaturedReview } from '@/data/featuredReviews';

const reviewKey = (review: FeaturedReview) =>
  review.externalId || `${review.name.trim().toLowerCase()}::${review.quote?.trim().toLowerCase() || ''}`;

/**
 * Reviews that are actually bundled with this build. The empty generated
 * Demand Force module is populated only after a real export is imported.
 */
export const reviewArchive: FeaturedReview[] = Array.from(
  new Map(
    [...featuredReviews, ...demandForceReviews]
      .filter((review) => review.name.trim() && review.quote?.trim())
      .map((review) => [reviewKey(review), review])
  ).values()
);

export const bundledReviewCount = reviewArchive.length;
export const importedDemandForceReviewCount = demandForceReviews.length;
