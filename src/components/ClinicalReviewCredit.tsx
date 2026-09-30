import React from 'react';
import { Link } from 'react-router-dom';
import { getCompletedClinicalReview, type ClinicalReview } from '@/data/clinicalReview';

interface ClinicalReviewCreditProps {
  review?: ClinicalReview;
}

export default function ClinicalReviewCredit({ review }: ClinicalReviewCreditProps) {
  const completed = getCompletedClinicalReview(review);
  return (
    <p className="mt-4 text-sm text-gray-500">
      {completed ? (
        <>
          Clinically reviewed by {completed.reviewer} on{' '}
          <time dateTime={completed.reviewedAt}>{completed.reviewedAt}</time> ·{' '}
        </>
      ) : null}
      <Link to="/editorial-policy/" className="text-gold underline-offset-4 hover:underline">
        Editorial policy
      </Link>
    </p>
  );
}
