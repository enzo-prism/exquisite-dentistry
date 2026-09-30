/**
 * Practice pricing is published only after documented practice approval.
 * VERIFY-BEFORE-PUBLIC: legacy figures were inconsistent across pages and are
 * omitted until approved; past values remain only in source-control history.
 * Veneer market estimates keep their separate gate in constants/veneerCosts.ts.
 */
export type PricingApproval =
  | { status: 'pending' }
  | { status: 'verified'; amount: string; approvedBy: string; approvedAt: string; source: string };

export interface TreatmentPricing {
  label: string;
  approval: PricingApproval;
  costAnswer: string;
  quoteChecklist: readonly string[];
}

export const TREATMENT_PRICING = {
  invisalign: {
    label: 'Invisalign',
    approval: { status: 'pending' },
    costAnswer: 'Invisalign is quoted for your alignment and bite after an exam and scan. The number of aligners, monitoring visits, and any refinements affect the total. Ask for a written estimate that explains retainers, refinements, and follow-up before you decide.',
    quoteChecklist: ['Exam and digital scan', 'Aligners and monitoring', 'Refinements', 'Retainers and follow-up'],
  },
  whitening: {
    label: 'Professional teeth whitening',
    approval: { status: 'pending' },
    costAnswer: 'Whitening is priced by the option that fits your teeth: an in-office session, custom take-home trays, or a combined plan. Ask for the exact fee and whether gel refills, sensitivity care, and follow-up are included before scheduling treatment.',
    quoteChecklist: ['Whitening method', 'Custom trays if needed', 'Gel refills', 'Sensitivity care and follow-up'],
  },
  whiteningInOffice: {
    label: 'In-office whitening',
    approval: { status: 'pending' },
    costAnswer: 'The fee for an in-office whitening session is confirmed for your teeth and chosen method. Ask what the session, sensitivity care, and take-home supplies include before treatment.',
    quoteChecklist: ['Whitening session', 'Sensitivity care', 'Take-home supplies'],
  },
  whiteningTakeHome: {
    label: 'Custom take-home whitening',
    approval: { status: 'pending' },
    costAnswer: 'A custom take-home whitening quote should explain the trays, initial gel supply, and the cost of future refills. Confirm the exact fee with the team before treatment.',
    quoteChecklist: ['Custom trays', 'Initial gel supply', 'Refill pricing'],
  },
  whiteningHybrid: {
    label: 'Combined whitening plan',
    approval: { status: 'pending' },
    costAnswer: 'A combined whitening plan is quoted according to the in-office visit and take-home supplies you need. Confirm the total and any refill costs before treatment.',
    quoteChecklist: ['In-office visit', 'Take-home trays', 'Gel and refills'],
  },
  cosmeticConsultation: {
    label: 'Cosmetic consultation',
    approval: { status: 'pending' },
    costAnswer: 'Ask the team to confirm the consultation fee, expected appointment length, and any treatment credit when you book. Treatment costs are quoted individually after your goals and dental health are assessed.',
    quoteChecklist: ['Consultation fee', 'Expected visit length', 'Any treatment credit'],
  },
  porcelainVeneer: {
    label: 'Porcelain veneers',
    approval: { status: 'pending' },
    costAnswer: 'Veneers are quoted for the teeth being treated, the material, and any preparation needed. Ask for a written estimate that includes planning, temporary veneers if needed, the final restorations, and follow-up.',
    quoteChecklist: ['Teeth and materials', 'Planning and preparation', 'Temporary veneers if needed', 'Final veneers and follow-up'],
  },
  bonding: {
    label: 'Cosmetic bonding',
    approval: { status: 'pending' },
    costAnswer: 'Bonding is quoted according to the teeth involved and the size of the repair. The team can confirm the fee and whether bonding suits your goals after evaluating your teeth.',
    quoteChecklist: ['Teeth involved', 'Scope of repair', 'Follow-up'],
  },
  emergencyExam: {
    label: 'Emergency dental evaluation',
    approval: { status: 'pending' },
    costAnswer: 'Call to confirm appointment availability and the emergency evaluation fee. Imaging and treatment depend on the problem, so ask what the examination includes and review the treatment estimate before care begins.',
    quoteChecklist: ['Evaluation fee', 'Imaging if needed', 'Treatment estimate'],
  },
  dentalImplants: {
    label: 'Dental implants',
    approval: { status: 'pending' },
    costAnswer: 'Implants are quoted after an exam and imaging. The total depends on the teeth being replaced, any extraction or bone grafting, and the final restoration. Compare itemized estimates for the implant, abutment, crown, imaging, and follow-up.',
    quoteChecklist: ['Exam and imaging', 'Extraction or grafting if needed', 'Implant and abutment', 'Final restoration and follow-up'],
  },
} as const satisfies Record<string, TreatmentPricing>;

export type TreatmentPricingKey = keyof typeof TREATMENT_PRICING;

export function hasApprovedPrice(approval: PricingApproval): boolean {
  if (approval.status !== 'verified') return false;
  if (![approval.amount, approval.approvedBy, approval.source].every((value) => typeof value === 'string' && value.trim())) return false;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(approval.approvedAt ?? '')) return false;
  const approvedDate = new Date(`${approval.approvedAt}T00:00:00Z`);
  return !Number.isNaN(approvedDate.getTime())
    && approvedDate.toISOString().slice(0, 10) === approval.approvedAt
    && approvedDate.getTime() <= Date.now();
}

export function formatApprovedPrice(approval: PricingApproval): string {
  return hasApprovedPrice(approval) && approval.status === 'verified'
    ? approval.amount
    : 'Confirmed at your consultation';
}

export const getTreatmentPrice = (key: TreatmentPricingKey): string => formatApprovedPrice(TREATMENT_PRICING[key].approval);
export const getTreatmentCostAnswer = (key: TreatmentPricingKey): string => TREATMENT_PRICING[key].costAnswer;
