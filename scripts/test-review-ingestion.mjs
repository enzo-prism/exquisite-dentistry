import assert from 'node:assert/strict';
import { importDemandForceReviews, renderReviewModule } from './import-demandforce-reviews.mjs';

const csv = `reviewer_name,rating,review_text,review_date,review_id
"Ana P.",5,"Kind, clear, and gentle.",2026-08-01,df-1
"Ana P.",5,"Kind, clear, and gentle.",2026-08-01,df-1
"Luis R.",4,"Explained every step.",2026-08-02,df-2`;

const reviews = importDemandForceReviews('reviews.csv', csv);
assert.equal(reviews.length, 2);
assert.deepEqual(reviews[0], {
  name: 'Ana P.',
  rating: 5,
  quote: 'Kind, clear, and gentle.',
  source: 'Demand Force',
  publishedDate: '2026-08-01',
  externalId: 'df-1'
});
assert.match(renderReviewModule(reviews), /demandForceReviews: FeaturedReview\[\]/);
assert.throws(
  () => importDemandForceReviews('bad.json', JSON.stringify([{ name: 'No rating', quote: 'Missing.' }])) ,
  /rating from 1 to 5/
);

process.stdout.write('Demand Force review importer checks passed.\n');
