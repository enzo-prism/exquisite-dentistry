# Practice content approvals still required

These are facts the implementation cannot establish from source code. No pending price or clinical-review record has been marked approved.

## Treatment fees and consultation details

`src/data/treatmentPricing.ts` is the shared patient-facing source for pricing answers and quote checklists. Every treatment entry is pending. Numeric legacy fees were removed from the public pages, export sources, and runtime registry; past figures remain in Git history. The consultation fee, visit length, treatment credits, and scope need practice confirmation.

To publish a fee, replace an entry's pending approval with `status: 'verified'`, its `amount`, `approvedBy`, actual `approvedAt` date, and approval `source`. `formatApprovedPrice` rejects incomplete or invalid approval records. Update the corresponding patient cost answer only after the fee and its inclusions have been approved. The independent veneer market-range gate in `src/constants/veneerCosts.ts` remains false.

Confirm Invisalign aligners, monitoring, refinements and retainers; whitening methods, sensitivity care, supplies and refills; cosmetic consultation fees and any credits; veneers/bonding scope; implant components and preparatory care; and emergency exam/imaging fees. Do not promise discounts, memberships, free assessments, or bundled inclusions without approval.

## Availability and comfort options

`src/data/practiceFacts.ts` supplies established office hours, paid independently operated cash parking, and conservative patient wording for urgent appointments, comfort planning and aftercare. Confirm any after-hours staffing, text/video support, same-day appointment guarantee, specific sedation modality, included amenity fee, or home/on-set service before publishing it. Online booking availability does not establish around-the-clock clinical support.

## Clinical review of articles

`src/data/blogClinicalReviews.json` is the durable registry keyed by article slug. It starts empty because authorship and edit dates do not document clinical review. Generated and base posts default to `clinicalReview: { status: 'pending' }`.

After an actual clinical review, add `status: 'completed'`, `reviewer`, real `reviewedAt` date (`YYYY-MM-DD`), and `evidence` referencing the approval record. The generator validates records; `ClinicalReviewCredit` renders the credit only for a valid completed review. Regenerate with `npm run generate:blog`. Do not use an implementation date or article author as a substitute for review approval.

## Patient evidence

Treatment popularity percentages and unspecified Google/Yelp counts have been removed. Client-experience quotes and previously unsourced location quotes now use the bundled patient review corpus verbatim. Do not assign neighborhood, treatment, timing, or outcome details to a reviewer unless the source supports them. Exact review provenance and consent for additional case details remain a practice responsibility.

## Verification

Run `node --import tsx --test src/__tests__/pricingTrust.unit.ts`, `npm run test:content`, `npm run test:blog`, and `npm run typecheck` when these records or templates change. The pricing/review tests cover pending records, approved fixtures, missing evidence, invalid/future dates, badge output, and suppression of legacy popularity/price props.
