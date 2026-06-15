import { PHONE_NUMBER_DISPLAY } from '@/constants/contact';
import {
  CONTACT_PATH,
  INSURANCE_PATH,
  PAYMENT_PLANS_PATH,
  SCHEDULE_CONSULTATION_PATH,
  VENEERS_INSURANCE_BLOG_PATH,
} from '@/constants/urls';

export const INSURANCE_VERIFY_PATH = `${CONTACT_PATH}#contact-form` as const;

export const INSURANCE_HERO_BADGE = 'Dental Insurance Accepted';
export const INSURANCE_HERO_HEADLINE = 'Dental Insurance Accepted in Los Angeles';
export const INSURANCE_HERO_HOOK =
  "If you have a PPO dental insurance plan, there's a strong chance we can help you use your benefits at Exquisite Dentistry.";
export const INSURANCE_HERO_SUPPORT =
  "Our team works with many PPO insurance plans and PPO network relationships. Because every plan is different, we'll help verify your benefits before treatment and explain your estimated coverage clearly.";

export const INSURANCE_PAYMENT_SUMMARY =
  'Some cosmetic treatments may not be fully covered by dental insurance. If your plan does not cover the full cost of treatment, Cherry financing may help eligible patients move forward with flexible payment options.';

export type InsuranceCarrier = {
  name: string;
  detail: string;
};

export const PPO_NETWORKS = [
  {
    name: 'Guardian PPO',
    detail:
      'A PPO network relationship the practice commonly works through for eligible dental insurance benefits.',
  },
  {
    name: 'Guardian Advantage PPO',
    detail:
      'A Guardian PPO pathway that may help eligible patients use PPO benefits, including some MetLife PPO members.',
  },
  {
    name: 'Zealous Network',
    detail:
      'We are preparing to support additional PPO access through the Zealous Network. Eligibility will still depend on each patient plan.',
  },
] as const satisfies readonly InsuranceCarrier[];

export const INSURANCE_NETWORK_LIST = 'Guardian PPO, Guardian Advantage PPO';
export const INSURANCE_PENDING_NETWORK_LIST = 'Zealous Network';

export const INSURANCE_SCHEMA_VALUES = [
  'PPO dental insurance',
  'Guardian PPO',
  'Guardian Advantage PPO',
  'MetLife PPO benefits may be reviewed through participating PPO network relationships when eligible',
  'Preparing to support additional PPO access through the Zealous Network',
  'Many PPO plans, subject to benefits verification',
] as const;

export const INSURANCE_VERIFICATION_DISCLAIMER =
  'Coverage, benefits, provider-directory listings, fee schedules, and patient responsibility vary by plan. Please contact the office so our team can verify your specific PPO benefits before treatment.';

export const INSURANCE_SERVICE_REASSURANCE =
  "Have a PPO dental plan? There's a strong chance we can help you use your benefits. We can verify your plan before treatment, and Cherry financing may help eligible patients if insurance leaves a remaining balance.";

export const INSURANCE_FOOTER_SUMMARY =
  'PPO insurance guidance: our team works with many PPO plans and PPO network relationships, including Guardian PPO and Guardian Advantage PPO, and is preparing for Zealous Network access. Benefits vary by plan.';

export const HOMEPAGE_HERO_PROOF_LINKS = [
  {
    text: '5-star care since 2006',
    href: '/testimonials/',
  },
  {
    text: 'Pay over time, no hard credit check',
    href: PAYMENT_PLANS_PATH,
  },
  {
    text: 'PPO benefits verified',
    href: INSURANCE_PATH,
  },
] as const;

export const INSURANCE_FAQ_SHORT_ANSWER = `Yes. If you have a PPO dental plan, there is a strong chance we can help you use your benefits. Because every plan is different, call ${PHONE_NUMBER_DISPLAY} or send us your insurance information and our team will verify your specific benefits before treatment.`;

export const INSURANCE_FINANCING_FAQ_ANSWER =
  'Yes. Cherry financing is available for eligible patients who want help with the portion insurance does not cover. Cherry is financing, not insurance. We can review insurance first, then help you decide whether financing is useful for the remaining balance.';

export const HOMEPAGE_INSURANCE_PANELS = [
  {
    title: 'Have a PPO plan?',
    description:
      'There is a strong chance we can help you use your benefits. Our team can check your plan before treatment so you know what may apply.',
    primaryCtaLabel: 'Verify benefits',
    primaryCtaHref: INSURANCE_VERIFY_PATH,
    secondaryCtaLabel: 'Open insurance page',
    secondaryCtaHref: INSURANCE_PATH,
  },
  {
    title: 'Cherry financing if you still have a balance',
    description:
      'Insurance and financing are not competing options. Cherry can help eligible patients spread out the part insurance does not cover.',
    primaryCtaLabel: 'View payment plans',
    primaryCtaHref: PAYMENT_PLANS_PATH,
    secondaryCtaLabel: 'See how it works',
    secondaryCtaHref: `${PAYMENT_PLANS_PATH}#payment-plan-options`,
  },
  {
    title: '20+ years of 5-star service',
    description:
      'Patients come to us for a calm experience, clear communication, and results that feel elevated without feeling overdone.',
    primaryCtaLabel: 'Read reviews',
    primaryCtaHref: '/testimonials/',
    secondaryCtaLabel: 'Book consultation',
    secondaryCtaHref: SCHEDULE_CONSULTATION_PATH,
  },
] as const;

export const INSURANCE_PAGE_FAQS = [
  {
    question: 'Do you accept PPO dental insurance?',
    answer: INSURANCE_FAQ_SHORT_ANSWER,
  },
  {
    question: 'What if I do not see my insurance carrier listed?',
    answer:
      "Please still reach out. Many PPO plans can be used even when the insurance relationship is handled through a participating PPO network. We'll help verify your benefits before your visit.",
  },
  {
    question: 'Do you accept MetLife PPO insurance?',
    answer:
      'We may be able to work with MetLife PPO members through participating PPO billing relationships, including Guardian PPO pathways. Because provider-directory status and billing-network processing can differ, please contact our team so we can verify your specific benefits before treatment.',
  },
  {
    question: 'Do you work with Guardian PPO?',
    answer:
      'Yes. Guardian PPO and Guardian Advantage PPO are PPO network relationships our team can review when checking eligible dental insurance benefits. Your exact coverage still depends on your specific plan.',
  },
  {
    question: 'Do you work with the Zealous Network?',
    answer:
      'We are preparing to support additional PPO access through the Zealous Network. Until that rollout is confirmed for your specific plan, our team should verify your benefits before treatment.',
  },
  {
    question: 'Can you verify my benefits before treatment?',
    answer:
      `Yes. Call ${PHONE_NUMBER_DISPLAY} or send us your insurance information through the contact page. Carrier name, plan name, member details, and the treatment you are considering help us review your benefits more accurately before treatment.`,
  },
  {
    question: 'Can I use insurance for cosmetic dentistry?',
    answer:
      'Some cosmetic treatments may not be fully covered by dental insurance. We can review your PPO benefits before treatment and explain where insurance may apply, where it may not, and whether a remaining balance is likely.',
  },
  {
    question: 'Do you offer financing if insurance does not cover cosmetic treatment?',
    answer: INSURANCE_FINANCING_FAQ_ANSWER,
  },
] as const;

export const INSURANCE_PAGE_STEPS = [
  {
    title: 'Send your PPO plan details',
    description:
      'Share your carrier, plan name, member information, and the treatment you are considering so our team can check the right benefit path.',
  },
  {
    title: 'We verify benefits before treatment',
    description:
      'We review whether your PPO benefits may apply, what the plan appears to cover, and where an out-of-pocket balance may remain.',
  },
  {
    title: 'Use Cherry only if there is a gap',
    description:
      'If insurance does not cover the full plan, Cherry can help eligible patients review financing for the remaining balance.',
  },
] as const;

export const INSURANCE_SUPPORT_POINTS = [
  'Many PPO dental insurance plans can be reviewed before treatment',
  `PPO network relationships include ${INSURANCE_NETWORK_LIST}`,
  `Additional PPO access through ${INSURANCE_PENDING_NETWORK_LIST} is in preparation`,
  'Provider-directory listings may not show every PPO network pathway',
  'Cherry financing is available for eligible out-of-pocket balances',
] as const;

export const INSURANCE_PAGE_LINKS = {
  contact: INSURANCE_VERIFY_PATH,
  paymentPlans: PAYMENT_PLANS_PATH,
  schedule: SCHEDULE_CONSULTATION_PATH,
  blog: VENEERS_INSURANCE_BLOG_PATH,
  insurance: INSURANCE_PATH,
} as const;
