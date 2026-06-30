/**
 * ────────────────────────────────────────────────────────────────────────────
 *  VENEER COST RANGES — ⚠️  VERIFY-BEFORE-PUBLIC  ⚠️
 * ────────────────────────────────────────────────────────────────────────────
 *  These are GENERAL Los Angeles MARKET ranges — NOT Exquisite Dentistry's own
 *  price list. They were proposed from market research as estimates so the
 *  /veneers/cost-los-angeles/ guide could be drafted.
 *
 *  DO NOT ship to production until Dr. Aguil / the practice has reviewed and
 *  confirmed (or replaced) every figure below. The page copy always frames these
 *  as "general Los Angeles market ranges" with "your exact cost is confirmed at a
 *  consultation" — never as the practice's quoted prices — but the numbers still
 *  need a human sign-off before they go live.
 *
 *  When confirmed, set VENEER_COST_VERIFIED = true (and update the figures).
 *  Same convention as the regulated Cherry figures in src/constants/cherry.ts.
 * ────────────────────────────────────────────────────────────────────────────
 */

/** Flip to true ONLY after the practice has signed off on the ranges below. */
export const VENEER_COST_VERIFIED = false;

export const VENEER_COSTS = {
  /** Typical LA market range for a porcelain veneer, per tooth. [VERIFY] */
  porcelainPerTooth: '$1,500 to $3,500',
  /** Typical LA market range for a composite veneer, per tooth. [VERIFY] */
  compositePerTooth: '$400 to $1,500',
  /** Typical number of veneers in a full upper "smile zone" set. [VERIFY] */
  smileZoneCount: '8 to 10',
} as const;
