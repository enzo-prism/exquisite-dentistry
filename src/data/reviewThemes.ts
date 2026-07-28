import { featuredReviews, type FeaturedReview } from '@/data/featuredReviews';

/**
 * Themes patients bring up most often in their own words.
 *
 * These are DERIVED from the review text — never hand-assigned — so the filter
 * chips can't drift away from what a review actually says. Only themes with
 * meaningful coverage are exposed; service-level tags (veneers, implants) were
 * measured at 0-2 matching reviews and would render an empty filter, so they
 * are intentionally left out until the review set supports them.
 */
export type ReviewThemeId = 'team' | 'comfort' | 'office';

export interface ReviewTheme {
  id: ReviewThemeId;
  label: string;
  pattern: RegExp;
}

export const REVIEW_THEMES: ReviewTheme[] = [
  {
    id: 'team',
    label: 'The Team',
    pattern: /staff|team|hygienist|reception|dr\.?\s|doctor|nancy|brenda|laurice|yanny/i
  },
  {
    id: 'comfort',
    label: 'Comfort & Anxiety',
    pattern: /anxi|fear|nervous|gentle|painless|comfort|calm|ease|scared|needle|patient with/i
  },
  {
    id: 'office',
    label: 'The Office',
    pattern: /office|clean|pristine|environment|welcoming|beautiful|space|facility|modern|tech/i
  }
];

export interface TaggedReview extends FeaturedReview {
  themes: ReviewThemeId[];
}

const tagReview = (review: FeaturedReview): TaggedReview => ({
  ...review,
  themes: review.quote
    ? REVIEW_THEMES.filter((theme) => theme.pattern.test(review.quote as string)).map(
        (theme) => theme.id
      )
    : []
});

export const taggedFeaturedReviews: TaggedReview[] = featuredReviews.map(tagReview);

/** Reviews carrying a given theme, or every review when no theme is selected. */
export const filterReviewsByTheme = (
  reviews: TaggedReview[],
  themeId: ReviewThemeId | null
): TaggedReview[] =>
  themeId ? reviews.filter((review) => review.themes.includes(themeId)) : reviews;

/** Themes that actually match at least one review, for rendering filter chips. */
export const getAvailableThemes = (reviews: TaggedReview[]): ReviewTheme[] =>
  REVIEW_THEMES.filter((theme) =>
    reviews.some((review) => review.themes.includes(theme.id))
  );
