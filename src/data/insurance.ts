import { PHONE_NUMBER_DISPLAY } from '@/constants/contact';
import {
  CONTACT_PATH,
  INSURANCE_PATH,
  PAYMENT_PLANS_PATH,
  SCHEDULE_CONSULTATION_PATH,
  VENEERS_INSURANCE_BLOG_PATH,
} from '@/constants/urls';

export const INSURANCE_HERO_BADGE = 'Most PPO Plans Accepted';
export const INSURANCE_HERO_HOOK = 'Most major PPO plans accepted.';
export const INSURANCE_HERO_SUPPORT =
  'We accept most major PPO plans, including Guardian, Cigna, MetLife, Principal, ProSense, Emeritus, and more. Some plans are direct in-network relationships; others are processed through partner PPO billing contracts.';

export const INSURANCE_PAYMENT_SUMMARY =
  'Most PPO plans accepted through direct or partner-billing pathways. Cherry financing is available for treatment portions insurance does not cover.';

export type InsuranceCarrier = {
  name: string;
  detail: string;
};

export const DIRECT_IN_NETWORK_CARRIERS = [
  {
    name: 'Guardian',
    detail:
      'Direct in-network PPO relationship and the primary partner billing-contract network.',
  },
  {
    name: 'Cigna',
    detail:
      'Direct in-network PPO relationship for eligible plans, with benefits verified before treatment.',
  },
] as const satisfies readonly InsuranceCarrier[];

export const PARTNER_BILLING_CARRIERS = [
  {
    name: 'MetLife',
    detail:
      'Accepted through the Guardian PPO billing-contract pathway while direct MetLife participation is in transition.',
  },
  {
    name: 'Principal',
    detail:
      'Accepted through partner PPO billing contracts when the patient plan is eligible.',
  },
  {
    name: 'ProSense',
    detail:
      'Accepted through partner PPO billing contracts when the patient plan is eligible.',
  },
  {
    name: 'Emeritus',
    detail:
      'Accepted through partner PPO billing contracts when the patient plan is eligible.',
  },
] as const satisfies readonly InsuranceCarrier[];

export const INSURANCE_DIRECT_CARRIER_LIST = DIRECT_IN_NETWORK_CARRIERS.map(
  (carrier) => carrier.name
).join(', ');

export const INSURANCE_PARTNER_CARRIER_LIST = PARTNER_BILLING_CARRIERS.map(
  (carrier) => carrier.name
).join(', ');

export const INSURANCE_SCHEMA_VALUES = [
  'Guardian PPO',
  'Cigna PPO',
  'MetLife PPO via Guardian partner billing pathway',
  'Principal PPO via partner billing pathway',
  'ProSense PPO via partner billing pathway',
  'Emeritus PPO via partner billing pathway',
  'Most major PPO plans, subject to benefits verification',
] as const;

export const INSURANCE_DIRECT_TIER_COPY =
  'We are directly contracted with these carriers, so eligible claims process through our in-network relationship and agreed PPO rates.';

export const INSURANCE_PARTNER_TIER_COPY =
  'We can also accept eligible PPO patients through partner billing contracts. That means a carrier may not be direct in-network with the practice, but the claim can still route through an in-network PPO partner.';

export const INSURANCE_VERIFICATION_DISCLAIMER =
  'Coverage, benefits, fee schedules, and patient responsibility vary by plan. Please contact the office so our team can verify your specific benefits before treatment.';

export const INSURANCE_SERVICE_REASSURANCE =
  'Most PPO plans accepted, including Guardian and Cigna directly and MetLife through a partner PPO billing pathway. Pay over time with Cherry if there is a remaining balance.';

export const INSURANCE_FOOTER_SUMMARY =
  'Insurance accepted: Guardian and Cigna direct in-network; MetLife, Principal, ProSense, Emeritus, and many PPO plans through partner billing pathways. Benefits vary by plan.';

export const HOMEPAGE_HERO_PROOF_LINKS = [
  {
    text: '5-star care since 2006',
    href: '/testimonials/',
  },
  {
    text: 'Pay over time, no credit check',
    href: PAYMENT_PLANS_PATH,
  },
  {
    text: 'Most PPO plans accepted',
    href: INSURANCE_PATH,
  },
] as const;

export const INSURANCE_FAQ_SHORT_ANSWER = `Yes. We accept most major PPO plans, including ${INSURANCE_DIRECT_CARRIER_LIST}, ${INSURANCE_PARTNER_CARRIER_LIST}, and more. Guardian and Cigna are direct in-network relationships. MetLife and several other PPO carriers may be processed through partner billing contracts instead of being direct in-network with the practice. If you are not sure whether your plan applies, call ${PHONE_NUMBER_DISPLAY} or send us a message through our contact page and our team will review your specific benefits before treatment.`;

export const INSURANCE_FINANCING_FAQ_ANSWER =
  'Yes. Cherry financing is available for eligible patients who want help with the portion insurance does not cover. We can review insurance first, then help you decide whether financing is useful for the remaining balance.';

export const HOMEPAGE_INSURANCE_PANELS = [
  {
    title: 'Most PPO plans accepted',
    description:
      'Guardian and Cigna are direct in-network relationships. MetLife and several other PPO plans can often be accepted through partner billing contracts.',
    primaryCtaLabel: 'Check your plan',
    primaryCtaHref: CONTACT_PATH,
    secondaryCtaLabel: 'Open insurance guide',
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
    question: 'Do you accept my dental insurance?',
    answer: INSURANCE_FAQ_SHORT_ANSWER,
  },
  {
    question: 'Do you file claims for me?',
    answer:
      'Yes. Our team can help submit the information your plan needs and explain what portion may remain your responsibility before treatment moves forward. Some claims process through direct in-network relationships, while others route through partner PPO billing contracts.',
  },
  {
    question: 'What if my plan is not listed on the website?',
    answer:
      'Please still reach out. Plan lists change, and some PPO benefits are not obvious until our team checks the details of your coverage and claim pathway. Additional partner-network options may become available over time, but we only want to confirm what applies to your plan after verification.',
  },
  {
    question: 'Can I use financing for the part insurance does not cover?',
    answer: INSURANCE_FINANCING_FAQ_ANSWER,
  },
] as const;

export const INSURANCE_PAGE_STEPS = [
  {
    title: 'Start with your plan information',
    description:
      'Call or message our team with your carrier, plan name, member information, and treatment question so we can review the right claim pathway.',
  },
  {
    title: 'We review benefits and expected out-of-pocket costs',
    description:
      'If your plan applies, we can explain whether it appears to be direct in-network or partner-billed, what may be covered, and where a remaining balance could still apply.',
  },
  {
    title: 'Use Cherry only if it helps',
    description:
      'If insurance does not cover the full plan, Cherry can help eligible patients review financing for the remaining balance.',
  },
] as const;

export const INSURANCE_SUPPORT_POINTS = [
  `Direct in-network PPO relationships with ${INSURANCE_DIRECT_CARRIER_LIST}`,
  `Partner billing-contract examples include ${INSURANCE_PARTNER_CARRIER_LIST}`,
  'Benefit verification before treatment whenever possible',
  'Claim support and treatment-estimate guidance from our team',
  'Cherry financing available for eligible out-of-pocket balances',
] as const;

export const INSURANCE_PAGE_LINKS = {
  contact: CONTACT_PATH,
  paymentPlans: PAYMENT_PLANS_PATH,
  schedule: SCHEDULE_CONSULTATION_PATH,
  blog: VENEERS_INSURANCE_BLOG_PATH,
  insurance: INSURANCE_PATH,
} as const;
