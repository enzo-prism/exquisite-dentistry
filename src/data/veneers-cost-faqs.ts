import { VENEER_COSTS } from '@/constants/veneerCosts';

// Shared FAQ source for the Veneers Cost guide (/veneers/cost-los-angeles/).
// Imported by the page (visible FAQ + client-side FAQPage schema) AND by
// scripts/prerender-static.ts (static FAQPage schema in the crawler-visible HTML),
// so the question/answer set stays in one place.
//
// All dollar figures come from src/constants/veneerCosts.ts (VERIFY-BEFORE-PUBLIC).

export interface VeneerCostFaq {
  question: string;
  answer: string;
}

export const VENEERS_COST_FAQS: VeneerCostFaq[] = [
  {
    question: 'How much do veneers cost in Los Angeles?',
    answer: `Porcelain veneers in Los Angeles commonly range from about ${VENEER_COSTS.porcelainPerTooth} per tooth, and tend toward the higher end in the Beverly Hills and West Hollywood area. Composite veneers usually run about ${VENEER_COSTS.compositePerTooth} per tooth. These are general market ranges, and your exact cost is confirmed at a consultation.`,
  },
  {
    question: 'How much do veneers cost without insurance?',
    answer: `Because veneers are usually cosmetic, most people pay out of pocket, in the same market ranges of about ${VENEER_COSTS.porcelainPerTooth} per tooth for porcelain. Monthly payment options through Cherry are available if you would rather spread the cost over time.`,
  },
  {
    question: 'Are veneers covered by insurance?',
    answer: 'Usually not. Veneers are generally treated as cosmetic, and most PPO plans do not cover cosmetic work. It is still worth reviewing your plan, since some restorative components may be evaluated differently. We are glad to help you check.',
  },
  {
    question: 'How much does one veneer cost?',
    answer: `A single porcelain veneer typically falls in the range of about ${VENEER_COSTS.porcelainPerTooth}, depending on the lab, the prep, and any matching work. A single composite veneer usually costs less, around ${VENEER_COSTS.compositePerTooth}.`,
  },
  {
    question: 'How much is a full set of veneers?',
    answer: `A full upper "smile zone" set is typically ${VENEER_COSTS.smileZoneCount} veneers. The total depends on the material and how many teeth are treated, so we scope it per tooth and confirm the full cost at a consultation rather than quoting a flat set price.`,
  },
  {
    question: 'What makes veneers more or less expensive?',
    answer: 'The main factors are the material (porcelain costs more than composite), the number of teeth, the lab and ceramist, how much preparation your teeth need, and any added work like whitening or gum contouring. The dentist’s planning and experience are part of it too.',
  },
  {
    question: 'Are composite veneers cheaper than porcelain?',
    answer: `Yes. Composite veneers usually cost less, around ${VENEER_COSTS.compositePerTooth} per tooth, and are often done in one visit. The trade-off is that they do not last as long as porcelain and are more prone to staining over time.`,
  },
  {
    question: 'How long do veneers last?',
    answer: 'Porcelain veneers are long-lasting and, with good daily care, tend to outlast composite veneers, which usually need touch-ups or replacement sooner. Daily habits and regular cleanings make a real difference. We will give you a realistic sense of upkeep at your consultation.',
  },
  {
    question: 'Can I finance veneers?',
    answer: 'Yes. We offer monthly payment options through Cherry, a third-party financing provider, so you can budget for treatment over time. You can see how it works on our payment plans page.',
  },
  {
    question: 'Is getting veneers worth the cost?',
    answer: 'For many people, yes, because veneers are a long-term change and porcelain is built to last. The honest trade-off is that it is an investment, and porcelain usually involves some non-reversible preparation of the tooth. A consultation is the best way to decide whether it is a sensible fit for you.',
  },
];
