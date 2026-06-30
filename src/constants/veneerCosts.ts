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

/**
 * ────────────────────────────────────────────────────────────────────────────
 *  FLAG-AWARE DISPLAY PHRASES  (the part the page actually renders)
 * ────────────────────────────────────────────────────────────────────────────
 *  The /veneers/cost-los-angeles/ guide stays LIVE and fully indexable, but it
 *  must show NO unverified dollar figure until the practice signs off. Every
 *  DOLLAR price on the page/FAQ is rendered through one of the helpers below, so
 *  the gate is a single switch:
 *
 *    • VENEER_COST_VERIFIED === true  → the real per-tooth market range is shown
 *      and each sentence reads exactly as drafted.
 *    • VENEER_COST_VERIFIED === false → every dollar figure is replaced by a
 *      grammatically-complete, consultation-framed phrase, so the sentence still
 *      reads as natural English and NO "$" appears anywhere on the page.
 *
 *  SCOPE: only DOLLAR figures (porcelain / composite per-tooth) are gated. The
 *  non-price smileZoneCount ("8 to 10" veneers) is a standard clinical scope
 *  norm, not a price, so it stays visible in BOTH states — read it straight from
 *  VENEER_COSTS.smileZoneCount.
 *
 *  Each helper returns a complete fragment tailored to its host sentence (see the
 *  doc comment above it), and the unverified wording is varied on purpose so the
 *  gated page does not read like a repeated template.
 * ────────────────────────────────────────────────────────────────────────────
 */
const verified = VENEER_COST_VERIFIED;
const { porcelainPerTooth, compositePerTooth } = VENEER_COSTS;

/**
 * Porcelain market clause. Host: "…porcelain veneers ${porcelainMarketClause},
 * with/and … the higher end …" (hero paragraph + the LA-cost FAQ).
 */
export const porcelainMarketClause = verified
  ? `commonly range from about ${porcelainPerTooth} per tooth`
  : 'are quoted per tooth at an amount we confirm at your consultation';

/**
 * Hero composite sentence + its "general market estimates / not our price list"
 * lead-in. Host: "Composite veneers usually ${heroCompositeClause} — your exact
 * cost depends on your teeth and your plan, and is confirmed at a consultation."
 */
export const heroCompositeClause = verified
  ? `run less, in the range of about ${compositePerTooth} per tooth. These are general market estimates, not our price list`
  : 'run less than porcelain, a figure we also confirm at your consultation. We share general context here, not a price list';

/**
 * LA-cost FAQ composite sentence + its "general market ranges" lead-in. Host:
 * "Composite veneers usually ${faqLaCompositeClause} your exact cost is confirmed
 * at a consultation."
 */
export const faqLaCompositeClause = verified
  ? `run about ${compositePerTooth} per tooth. These are general market ranges, and`
  : 'run less than porcelain, a figure we confirm at your consultation. Pricing depends on your case, and';

/**
 * "Without insurance" FAQ. Host: "…most people pay out of pocket,
 * ${faqOutOfPocketClause}. Monthly payment options …"
 */
export const faqOutOfPocketClause = verified
  ? `in the same market ranges of about ${porcelainPerTooth} per tooth for porcelain`
  : 'at a porcelain cost we confirm at your consultation';

/**
 * "How much does one veneer cost" FAQ, porcelain. Host: "A single porcelain
 * veneer ${faqSinglePorcelainClause}, depending on the lab, the prep, …"
 */
export const faqSinglePorcelainClause = verified
  ? `typically falls in the range of about ${porcelainPerTooth}`
  : 'is priced to your specific tooth, an amount we confirm at your consultation';

/**
 * "How much does one veneer cost" FAQ, composite. Host: "A single composite
 * veneer ${faqSingleCompositeClause}."
 */
export const faqSingleCompositeClause = verified
  ? `usually costs less, around ${compositePerTooth}`
  : 'usually costs less than porcelain, again confirmed at your consultation';

/**
 * "Are composite cheaper" FAQ. Host: "Composite veneers usually
 * ${faqCheaperCompositeClause}, and are often done in one visit."
 */
export const faqCheaperCompositeClause = verified
  ? `cost less, around ${compositePerTooth} per tooth`
  : 'cost less than porcelain, an amount we confirm at your consultation';

/** Porcelain comparison-card bullet (the whole <li> line). */
export const cardPorcelainLine = verified
  ? `Higher cost, about ${porcelainPerTooth} per tooth.`
  : 'Higher cost than composite, confirmed at your consultation.';

/** Composite comparison-card bullet (the whole <li> line). */
export const cardCompositeLine = verified
  ? `Lower cost, about ${compositePerTooth} per tooth.`
  : 'Lower cost than porcelain, confirmed at your consultation.';
