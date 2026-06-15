# Insurance Wording Approval Notes

Last updated: June 15, 2026

## Public wording now used

The site now leads with patient clarity instead of the old two-tier explanation:

- Primary message: "Dental Insurance Accepted in Los Angeles."
- Verification message: patients should call or send insurance details so the team can verify benefits before treatment.
- Carrier/network language stays present for search and AI: Guardian PPO, Guardian Advantage PPO, MetLife PPO nuance, and pending Zealous Network access.
- Required disclaimer: coverage, benefits, provider-directory listings, fee schedules, and patient responsibility vary by plan.

The page no longer presents the old network-category split as a patient-facing model. Michael said that distinction can be confusing and may not matter from the patient's perspective.

## MetLife wording

MetLife is handled as an example of why verification matters:

- The page does not claim Exquisite Dentistry will always appear as a direct MetLife provider.
- The page says MetLife PPO members may be supported through participating PPO billing relationships, including Guardian PPO pathways.
- The page tells patients to verify their specific plan before treatment.

## Website placements

- Homepage hero proof line: "5-star care since 2006", "Pay over time, no hard credit check", and "PPO benefits verified"
- Homepage insurance/payment band: simplified PPO reassurance with no unconfirmed carrier list
- `/insurance/`: patient-first PPO explanation, network relationships, MetLife note, verification CTA, Cherry fallback, and FAQs
- Service/payment sections: reinforces "PPO first, Cherry if there is a gap"
- Footer: compact crawlable PPO/network summary on every page
- FAQ/schema: natural-language PPO insurance answer plus structured insurance/payment fields

## Cherry financing wording

Cherry credit-score and reporting wording is now documented separately in `docs/cherry-credit-disclosure.md` and centralized in `src/constants/cherry.ts`. The site uses a short reassurance for compact CTAs and the full soft-check/reporting disclosure on payment-plan detail surfaces. Unqualified credit-check claims should not be reintroduced.

## Items to confirm with Michael before expanding

1. Confirm the exact carrier fact sheet and which names should be public.
2. Confirm whether "Emeritus" is the correct public carrier name or whether the intended carrier is "Ameritas."
3. Confirm whether Cigna should be listed only as a common PPO carrier, or if there is approved wording for its specific relationship.
4. Confirm when the Zealous Network rollout is fully active and whether the 67-carrier list should be shown publicly.
5. Decide whether the post-Zealous page should show the full carrier list or a curated major-carriers list.
6. Approve compliance wording for "there's a strong chance we can help", "participating PPO network", and expected patient responsibility.
7. Decide the verify-benefits backend: contact form, dedicated form-to-email, scheduling note, or phone-only workflow.

## Suggested next version after approval

Once Michael shares the fact sheet, expand `/insurance/` with a dedicated verify-benefits form and carrier-specific SEO sections for approved carriers and networks.
