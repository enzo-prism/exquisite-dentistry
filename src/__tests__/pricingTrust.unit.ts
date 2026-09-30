import { test } from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import ClinicalReviewCredit from '../components/ClinicalReviewCredit';
import ServiceRecommendation from '../components/ServiceRecommendation';
import { TREATMENT_PRICING, formatApprovedPrice, getTreatmentCostAnswer, getTreatmentPrice, type PricingApproval, type TreatmentPricingKey } from '../data/treatmentPricing';
import { getCompletedClinicalReview, type ClinicalReview } from '../data/clinicalReview';
import { getPublishedPosts } from '../data/blogPosts';
import clinicalReviews from '../data/blogClinicalReviews.json';
import { validateClinicalReviews } from '../../scripts/lib/clinical-review.mjs';

const render = (element: React.ReactElement) => renderToStaticMarkup(React.createElement(StaticRouter, { location: '/' }, element));
const completed: ClinicalReview = { status: 'completed', reviewer: 'Test reviewer', reviewedAt: '2020-01-01', evidence: 'Test fixture approval record' };

test('pending treatment prices cannot expose internal proposed figures', () => {
  for (const key of Object.keys(TREATMENT_PRICING) as TreatmentPricingKey[]) {
    if (TREATMENT_PRICING[key].approval.status === 'pending') {
      assert.equal(getTreatmentPrice(key), 'Confirmed at your consultation');
      assert.doesNotMatch(getTreatmentCostAnswer(key), /\$\d/);
    }
    assert.ok(TREATMENT_PRICING[key].quoteChecklist.length);
  }
});

test('a price requires documented approval with a real past date', () => {
  const approved: PricingApproval = { status: 'verified', amount: '$123 test fixture', approvedBy: 'Test approver', approvedAt: '2020-01-01', source: 'Test record' };
  assert.equal(formatApprovedPrice(approved), approved.amount);
  for (const invalid of [{ ...approved, approvedBy: '' }, { ...approved, source: '' }, { ...approved, approvedAt: '2020-02-31' }, { ...approved, approvedAt: '2099-01-01' }]) {
    assert.equal(formatApprovedPrice(invalid), 'Confirmed at your consultation');
  }
});

test('clinical credit requires explicit completed review, date, and evidence', () => {
  assert.equal(getCompletedClinicalReview(undefined), undefined);
  assert.equal(getCompletedClinicalReview({ status: 'pending' }), undefined);
  assert.equal(getCompletedClinicalReview(completed), completed);
  for (const invalid of [{ ...completed, evidence: '' }, { ...completed, reviewer: '' }, { ...completed, reviewedAt: '2020-02-31' }, { ...completed, reviewedAt: '2099-01-01' }]) {
    assert.equal(getCompletedClinicalReview(invalid), undefined);
    assert.throws(() => validateClinicalReviews({ fixture: invalid }));
  }
  assert.deepEqual(validateClinicalReviews({ fixture: completed }), { fixture: completed });
});

test('clinical badge does not render for authored or pending content', () => {
  assert.doesNotMatch(render(React.createElement(ClinicalReviewCredit, {})), /Clinically reviewed/);
  assert.doesNotMatch(render(React.createElement(ClinicalReviewCredit, { review: { status: 'pending' } })), /Clinically reviewed/);
  const html = render(React.createElement(ClinicalReviewCredit, { review: completed }));
  assert.match(html, /Clinically reviewed by Test reviewer/);
  assert.match(html, /dateTime="2020-01-01"/);
});

test('legacy recommendation fields cannot produce unsourced popularity or prices', () => {
  const html = render(React.createElement(ServiceRecommendation, {
    currentService: 'Test',
    recommendations: [{ title: 'Fixture', href: '/veneers/', description: 'Discuss options.', popularity: 99, priceRange: '$999' }],
  } as unknown as React.ComponentProps<typeof ServiceRecommendation>));
  assert.doesNotMatch(html, /choose this|99%|\$999/);
});

test('published articles without recorded review evidence stay pending despite authorship', () => {
  assert.ok(getPublishedPosts().length > 0);
  for (const post of getPublishedPosts()) {
    if (!(post.slug in clinicalReviews)) {
      assert.equal(post.clinicalReview?.status, 'pending', post.slug);
      assert.equal(getCompletedClinicalReview(post.clinicalReview), undefined, post.slug);
    }
  }
});
