import { PHONE_NUMBER_DISPLAY } from '@/constants/contact';
import {
  CONTACT_PATH,
  INSURANCE_PATH,
  PAYMENT_PLANS_PATH,
  SCHEDULE_CONSULTATION_PATH,
  VENEERS_INSURANCE_BLOG_PATH,
} from '@/constants/urls';

export const INSURANCE_HERO_BADGE = 'Most PPO Plans Accepted';
export const INSURANCE_HERO_HOOK = 'We probably take your insurance.';
export const INSURANCE_HERO_SUPPORT =
  'Most PPO plans accepted. If you are not sure how your benefits apply, our team can help verify your plan before treatment starts.';

export const INSURANCE_PAYMENT_SUMMARY =
  'Most PPO plans accepted. Cherry financing is available for treatment portions insurance does not cover.';

export const INSURANCE_FAQ_SHORT_ANSWER = `We accept most PPO plans and can help verify benefits before treatment. If you are not sure whether your plan applies, call ${PHONE_NUMBER_DISPLAY} or send us a message through our contact page and our team will review it with you.`;

export const INSURANCE_FINANCING_FAQ_ANSWER =
  'Yes. Cherry financing is available for eligible patients who want help with the portion insurance does not cover. We can review insurance first, then help you decide whether financing is useful for the remaining balance.';

export const HOMEPAGE_INSURANCE_PANELS = [
  {
    title: 'Most PPO plans accepted',
    description:
      'Many patients start here because they assume they are out of network when they may still have usable PPO benefits. We can help verify your plan before you commit.',
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
      'Yes. Our team can help submit the information your plan needs and explain what portion may remain your responsibility before treatment moves forward.',
  },
  {
    question: 'What if my plan is not listed on the website?',
    answer:
      'Please still reach out. Plan lists change, and some PPO benefits are not obvious until our team checks the details of your coverage and claim pathway.',
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
      'Call or message our team with your carrier details, and we will help you understand the next best step before treatment begins.',
  },
  {
    title: 'We review benefits and expected out-of-pocket costs',
    description:
      'If your plan applies, we can explain what may be covered, what may stay elective, and where a remaining balance could still apply.',
  },
  {
    title: 'Use Cherry only if it helps',
    description:
      'If insurance does not cover the full plan, Cherry can help eligible patients review financing for the remaining balance.',
  },
] as const;

export const INSURANCE_SUPPORT_POINTS = [
  'Most PPO plans accepted',
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
