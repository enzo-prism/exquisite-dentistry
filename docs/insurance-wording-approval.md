# Insurance Wording Approval Notes

Last updated: April 27, 2026

## Public wording shipped in this branch

The site now uses a conservative two-tier insurance model:

- Direct in-network: Guardian, Cigna
- Accepted through partner PPO billing contracts: MetLife, Principal, ProSense, Emeritus
- General claim: "Most major PPO plans accepted"
- Required disclaimer: coverage, benefits, fee schedules, and patient responsibility vary by plan; the office should verify benefits before treatment.

MetLife is intentionally not presented as direct in-network. It is listed as accepted through the Guardian PPO billing-contract pathway while direct MetLife participation is in transition.

## Website placements

- Homepage hero proof line: "5-star care since 2006", "Pay over time, no credit check", and "Most PPO plans accepted"
- Homepage insurance/payment band: explains direct carriers plus partner-billing examples
- `/insurance/`: explains the two-tier model and gives patients a verify-benefits path
- Service/payment sections: reinforces insurance first, then Cherry for remaining balances
- Footer: compact crawlable carrier summary on every page
- FAQ/schema: natural-language "Do you accept my dental insurance?" answer and structured insurance/payment fields

## Items to confirm with Michael before expanding

1. Confirm Cigna is staying direct in-network, not moving into a partner-billing relationship.
2. Confirm the exact Guardian billing-contract carrier list.
3. Confirm whether "Emeritus" is the correct public carrier name or whether the intended carrier is "Ameritas."
4. Confirm whether MetLife should remain publicly listed during the transition.
5. Confirm when the Zealous rollout is actually live. The working note says roughly May 13, 2026, but the site should not list the additional 67 contracts until the office confirms they are active.
6. Decide whether the post-Zealous page should show the full carrier list or a curated major-carriers list.
7. Approve compliance wording for "accepted", "in-network", "partner billing contracts", and expected patient responsibility.
8. Decide the verify-benefits backend: contact form, dedicated form-to-email, scheduling note, or phone-only workflow.

## Suggested next version after approval

Once Michael confirms the items above, expand `/insurance/` with a dedicated verify-benefits form and carrier-specific sections for Guardian, Cigna, MetLife, and any approved Zealous carriers.
