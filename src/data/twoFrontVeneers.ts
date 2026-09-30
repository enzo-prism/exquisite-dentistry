import { getTreatmentCostAnswer } from './treatmentPricing';

/** Patient content for both the indexed document and interactive route. */
export const TWO_FRONT_VENEERS = {
  path: '/veneers/2-front-teeth-veneers-cost-los-angeles',
  title: 'Cost of 2 Front Teeth Veneers in Los Angeles',
  description: 'Compare the cost factors for two front teeth veneers, what to ask about a quote, and whether two veneers suit your smile. Plan with Dr. Aguil in Los Angeles.',
  h1: 'How Much Do 2 Front Teeth Veneers Cost in Los Angeles?',
  answer: `The cost of two front teeth veneers is quoted for your individual case after an examination. ${getTreatmentCostAnswer('porcelainVeneer')}`,
  introduction: 'For two front teeth, ask for the total two-tooth estimate, not only a per-tooth price. Matching the untreated teeth beside them is part of the planning. This guide covers a two-tooth case; our general cost guide covers wider veneer plans.',
  sections: [
    {
      heading: 'What should a quote for two veneers include?',
      paragraphs: ['Ask for an itemized estimate before agreeing to treatment. It should explain what is included and which items could carry a separate fee.'],
      bullets: ['The two teeth being treated and the veneer material', 'Examination, imaging, and smile planning', 'Tooth preparation and temporary veneers, if needed', 'Laboratory fabrication, placement, and bite adjustments', 'Follow-up visits and any additional treatment'],
    },
    {
      heading: 'Are two veneers enough for my smile?',
      paragraphs: ['Two veneers focus on the front pair. The number of teeth treated depends on your goals, the condition of each tooth, and how much of your smile is visible. Dr. Aguil evaluates the neighboring teeth and your bite before recommending a plan.', 'Bring photos of what you like and explain whether shape, chips, spacing, or shade is your main concern. Ask to compare a two-tooth plan with alternatives before deciding.'],
      links: [{ label: 'Compare veneers for two to four front teeth', href: '/veneers/front-teeth-veneers-los-angeles/' }],
    },
    {
      heading: 'Compare veneers with other options',
      paragraphs: ['Ask whether bonding, whitening, alignment, or a crown is appropriate for your teeth. These options address different concerns; an examination is needed to recommend one. A lower fee alone does not tell you which treatment fits your tooth condition.'],
      links: [
        { label: 'Veneers versus bonding', href: '/blog/dental-veneers-vs-bonding-a-comprehensive-comparison-for-your-smile-makeover/' },
        { label: 'Veneers versus crowns', href: '/blog/dental-veneers-vs-crowns/' },
        { label: 'Compare veneer shapes and styles', href: '/blog/the-shapes-and-styles-of-dental-veneers/' },
      ],
    },
    {
      heading: 'Look at real treatment examples',
      paragraphs: ['Use the smile gallery to compare treatment goals and results, then bring examples to your consultation. Gallery cases illustrate individual patients; they do not establish the number of veneers or price for your own case.'],
      links: [{ label: 'View veneer results in the smile gallery', href: '/smile-gallery/?treatment=veneers' }],
    },
    {
      heading: 'Plan your consultation and payment questions',
      paragraphs: ['Before scheduling, ask the team to confirm the consultation fee, expected duration, and what the visit includes. At the visit, discuss the two-tooth plan and request a written estimate. If you are considering financing, compare the total treatment cost as well as the payment terms.'],
      links: [{ label: 'Explore payment plans', href: '/payment-plans/' }, { label: 'Read the full Los Angeles veneers cost guide', href: '/veneers/cost-los-angeles/' }],
    },
  ],
  faqItems: [
    { question: 'Is the cost of two veneers simply twice the price of one?', answer: 'Ask for the full case estimate. Two veneer restorations are part of the cost, but examinations, planning, temporary veneers, or additional treatment may be included or billed separately.' },
    { question: 'Can you quote two veneers without an examination?', answer: 'The team can explain how pricing works, but your treatment estimate depends on the examination and the scope of your plan. Ask what is included before deciding.' },
    { question: 'Will two veneers match my other teeth?', answer: 'Shade and shape matching are part of planning a two-tooth case. Discuss the neighboring teeth, your goals, and any whitening plans with Dr. Aguil before selecting the final shade.' },
  ],
} as const;

export const isTwoFrontVeneersPath = (path: string): boolean => path.replace(/\/+$/, '') === TWO_FRONT_VENEERS.path;
