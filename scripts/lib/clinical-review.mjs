/** Keep generator validation aligned with src/data/clinicalReview.ts. */
export function validateClinicalReviews(registry) {
  if (!registry || typeof registry !== 'object' || Array.isArray(registry)) {
    throw new Error('Clinical review registry must be an object keyed by article slug.');
  }
  for (const [slug, review] of Object.entries(registry)) {
    if (review?.status === 'pending') continue;
    if (review?.status !== 'completed' || ![review.reviewer, review.evidence].every((value) => typeof value === 'string' && value.trim())) {
      throw new Error(`Clinical review for ${slug} requires completed status, reviewer, date, and approval evidence.`);
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(review.reviewedAt ?? '')) throw new Error(`Invalid clinical review date for ${slug}.`);
    const date = new Date(`${review.reviewedAt}T00:00:00Z`);
    if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== review.reviewedAt || date.getTime() > Date.now()) {
      throw new Error(`Invalid or future clinical review date for ${slug}.`);
    }
  }
  return registry;
}
