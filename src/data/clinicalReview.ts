export interface CompletedClinicalReview {
  status: 'completed';
  reviewer: string;
  reviewedAt: string;
  /** Reference to documented practice approval, not a publication or edit date. */
  evidence: string;
}

export type ClinicalReview = { status: 'pending' } | CompletedClinicalReview;

/** Defensive gate: unknown, incomplete, and future-dated records never earn a badge. */
export function getCompletedClinicalReview(review?: ClinicalReview): CompletedClinicalReview | undefined {
  if (!review || review.status !== 'completed') return undefined;
  if (![review.reviewer, review.evidence].every((value) => typeof value === 'string' && value.trim())) return undefined;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(review.reviewedAt ?? '')) return undefined;
  const date = new Date(`${review.reviewedAt}T00:00:00Z`);
  if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== review.reviewedAt) return undefined;
  if (date.getTime() > Date.now()) return undefined;
  return review;
}
