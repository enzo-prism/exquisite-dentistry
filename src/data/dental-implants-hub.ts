import {
  ADDRESS,
  BUSINESS_HOURS,
  PHONE_NUMBER_DISPLAY,
  PHONE_NUMBER_E164
} from '@/constants/contact';
import { GOOGLE_MAPS_SHORT_URL } from '@/constants/urls';

export type DentalImplantsHubSection = {
  id: string;
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  links?: Array<{ label: string; href: string }>;
};

export const DENTAL_IMPLANTS_HUB_INTRO_PARAGRAPHS = [
  'If you’re searching for “dental implants Los Angeles,” you’re likely looking for a tooth replacement option that feels stable, looks natural, and supports long-term oral health.',
  'Dental implants replace the tooth root with a biocompatible post that supports a custom implant crown, implant-supported bridge, or full-arch restoration.',
  'At Exquisite Dentistry on Wilshire Blvd in Los Angeles, we begin with 3D imaging (CBCT) and restoration-first planning so the final tooth shape and bite guide every step.',
  'You’ll leave your consultation with a clear plan, timeline, and estimate. When surgical placement is best handled by a specialist, we coordinate closely so the restorative result stays predictable.'
] as const;

export const DENTAL_IMPLANTS_HUB_SECTIONS: DentalImplantsHubSection[] = [
  {
    id: 'options',
    heading: 'Implant Options (Single Tooth, Bridge, Full-Arch)',
    paragraphs: [
      'The right implant plan depends on how many teeth you’re replacing, your bite, and the condition of adjacent teeth and bone.'
    ],
    bullets: [
      'Single implant crown: replaces one missing tooth without relying on adjacent teeth',
      'Implant-supported bridge: replaces multiple teeth efficiently with fewer implants',
      'Full-arch solutions: replace many teeth with a fixed or removable implant-supported design',
      'Foundation support: bone grafting or sinus lift may be recommended when needed for stability'
    ],
    links: [
      { label: 'Dental Bridge (Alternative to Implants)', href: '/dental-bridge/' },
      { label: 'Implants vs Bridge Guide', href: '/blog/dental-implants-vs-bridge-los-angeles/' }
    ]
  },
  {
    id: 'timeline',
    heading: 'Timeline & What to Expect',
    paragraphs: [
      'Most implant plans include an exam and imaging review, any needed foundation work, placement, healing, and the final restoration. Timelines vary by case and biology.'
    ],
    bullets: [
      'Consultation + 3D imaging: confirm candidacy and plan the final restoration',
      'Foundation planning: discuss extractions or grafting when indicated',
      'Placement + healing: allow time for integration before final restorations',
      'Final restoration: deliver a custom crown or bridge and refine bite for comfort'
    ]
  },
  {
    id: 'cost',
    heading: 'Dental Implant Cost Factors in Los Angeles',
    paragraphs: [
      'Implant fees vary because every plan is built from your imaging, bone health, and the type of restoration you need. Ask for an itemized estimate so you can compare quotes confidently.'
    ],
    bullets: [
      'Number of teeth: a single crown vs. a multi-tooth bridge vs. full-arch replacement',
      'Foundation work: extractions, bone grafting, or sinus lift needs when indicated',
      'Materials: restoration materials and esthetic considerations',
      'Comfort options: sedation planning and appointment pacing'
    ],
    links: [
      { label: 'Dental Implant Cost Guide (Los Angeles)', href: '/blog/dental-implant-cost-los-angeles/' }
    ]
  },
  {
    id: 'aftercare',
    heading: 'Recovery & Aftercare',
    paragraphs: [
      'Recovery is typically manageable, and we’ll provide clear guidance on diet, activity, and hygiene based on your procedure.'
    ],
    bullets: [
      'Follow post-op instructions for diet and activity, especially in the first few days',
      'Keep the area clean with gentle brushing and flossing; we’ll recommend tools for your case',
      'Attend follow-up visits so we can monitor healing and bite stability',
      'Protect your investment if you clench or grind by discussing bite guards and maintenance'
    ]
  },
  {
    id: 'location',
    heading: 'Visit Our Los Angeles Office',
    paragraphs: [
      'Our dental studio is located on Wilshire Blvd in Los Angeles, convenient to Beverly Hills, West Hollywood, and surrounding neighborhoods.'
    ],
    bullets: [
      `Address: ${ADDRESS}`,
      `Phone: ${PHONE_NUMBER_DISPLAY}`,
      ...BUSINESS_HOURS.map(({ label, value }) => `${label}: ${value}`)
    ],
    links: [
      { label: 'Get Directions (Google Maps)', href: GOOGLE_MAPS_SHORT_URL },
      { label: `Call ${PHONE_NUMBER_DISPLAY}`, href: `tel:${PHONE_NUMBER_E164}` },
      { label: 'Contact & Scheduling', href: '/contact/' }
    ]
  }
];

export const DENTAL_IMPLANTS_HUB_SUPPORTING_LINKS = [
  { label: 'Implants Benefits Guide', href: '/blog/reasons-to-get-dental-implants/' },
  { label: 'Dental Implant Cost Guide', href: '/blog/dental-implant-cost-los-angeles/' },
  { label: 'Smile Gallery (Before & After)', href: '/smile-gallery/' },
  { label: 'Transformation Stories', href: '/transformation-stories/' }
] as const;

export const DENTAL_IMPLANTS_REFERENCES = [
  {
    label: 'American Dental Association (ADA): Dental Implants',
    href: 'https://www.ada.org/resources/research/science-and-research-institute/oral-health-topics/dental-implants'
  },
  {
    label: 'NIH (NIDCR): Dental Implants',
    href: 'https://www.nidcr.nih.gov/health-info/dental-implants'
  }
] as const;
