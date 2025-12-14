import {
  ADDRESS,
  BUSINESS_HOURS,
  PHONE_NUMBER_DISPLAY,
  PHONE_NUMBER_E164
} from '@/constants/contact';
import { GOOGLE_MAPS_SHORT_URL, SCHEDULING_URL } from '@/constants/urls';

export type CulverCityTeethWhiteningHubSection = {
  id: string;
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  links?: Array<{ label: string; href: string }>;
};

export const CULVER_CITY_TEETH_WHITENING_INTRO_PARAGRAPHS = [
  'If you’re searching for “culver city teeth whitening,” you’re likely looking for a brighter shade that still looks natural — without sensitivity surprises or gimmicky one-size-fits-all treatments.',
  'Exquisite Dentistry is located on Wilshire Blvd in Los Angeles, and many patients visit us from Culver City for professional whitening planned around enamel health, existing restorations, and real-life timelines.',
  'Choose a fast in-office whitening visit (often 60–90 minutes), custom take-home trays for gradual brightening, or a hybrid plan that keeps results consistent long-term.',
  'We start with a shade assessment and comfort review, then finish with clear aftercare guidance so your smile stays bright beyond the appointment.'
] as const;

export const CULVER_CITY_TEETH_WHITENING_HUB_SECTIONS: CulverCityTeethWhiteningHubSection[] = [
  {
    id: 'options',
    heading: 'Professional Whitening Options',
    paragraphs: [
      'The right whitening approach depends on your sensitivity history, how quickly you need results, and whether you have veneers, bonding, or crowns in the smile zone.'
    ],
    bullets: [
      'In-office whitening: best for faster results ahead of events, photos, and deadlines',
      'Custom take-home trays: gradual brightening with more control over sensitivity and pace',
      'Hybrid plan: combine a jumpstart visit with periodic tray touch-ups to maintain your shade'
    ],
    links: [
      { label: 'Compare Teeth Whitening Options', href: '/teeth-whitening' },
      { label: 'Zoom Teeth Whitening (In-Office)', href: '/zoom-whitening' }
    ]
  },
  {
    id: 'sensitivity',
    heading: 'Sensitivity & Comfort Protocol',
    paragraphs: [
      'Temporary sensitivity is common with whitening, but it’s not something you should “push through.” We plan the visit to reduce flare-ups and keep you comfortable.'
    ],
    bullets: [
      'Review of sensitivity triggers (cold, brushing, clenching) and enamel condition',
      'Timed gel cycles and adjustments based on comfort during the appointment',
      'Desensitizing options and aftercare guidance for the first 24–48 hours',
      'A slower tray-based plan when you want results with minimal sensitivity'
    ]
  },
  {
    id: 'restorations',
    heading: 'Whitening with Veneers, Crowns, or Bonding',
    paragraphs: [
      'Whitening gels brighten natural enamel, but they don’t change the shade of porcelain or composite restorations. Planning matters if you have dental work that shows when you smile.'
    ],
    bullets: [
      'We identify which teeth and restorations are visible in your smile',
      'We plan the target shade so natural teeth blend with existing dentistry',
      'If shade mismatch is likely, we’ll discuss sequencing (whitening first, then replacements when needed)'
    ],
    links: [
      { label: 'Porcelain Veneers', href: '/veneers' },
      { label: 'Cosmetic Dentistry Overview', href: '/cosmetic-dentistry' }
    ]
  },
  {
    id: 'maintenance',
    heading: 'How Long Results Last & Maintenance',
    paragraphs: [
      'Whitening longevity varies based on habits and diet. The best results come from a simple plan you can actually maintain.'
    ],
    bullets: [
      'Many patients refresh in-office whitening about every 12–18 months, depending on stain exposure',
      'Take-home trays make it easy to do shorter touch-ups when you notice dulling',
      'We share stain-management guidance for coffee, tea, wine, and travel schedules'
    ]
  },
  {
    id: 'visit',
    heading: 'Planning a Visit from Culver City',
    paragraphs: [
      'If you’re coming from Culver City, we’ll help you choose the right appointment type so you can fit whitening into a workday or event timeline.'
    ],
    bullets: [
      'Most in-office whitening visits take about 60–90 minutes',
      'Validated parking is available in our building, plus ride-share friendly drop-offs',
      'Book online or call for scheduling guidance if you have a deadline'
    ],
    links: [
      { label: 'Book Online', href: SCHEDULING_URL },
      { label: 'Contact & Directions', href: '/contact' }
    ]
  },
  {
    id: 'location',
    heading: 'Visit Our Los Angeles Office (Near Culver City)',
    paragraphs: [
      'Our studio is on Wilshire Blvd in Los Angeles, convenient for Culver City and Westside neighborhoods.'
    ],
    bullets: [
      `Address: ${ADDRESS}`,
      `Phone: ${PHONE_NUMBER_DISPLAY}`,
      ...BUSINESS_HOURS.map(({ label, value }) => `${label}: ${value}`)
    ],
    links: [
      { label: 'Get Directions (Google Maps)', href: GOOGLE_MAPS_SHORT_URL },
      { label: `Call ${PHONE_NUMBER_DISPLAY}`, href: `tel:${PHONE_NUMBER_E164}` },
      { label: 'Contact & Scheduling', href: '/contact' }
    ]
  }
];

export const CULVER_CITY_TEETH_WHITENING_SUPPORTING_LINKS = [
  { label: 'Teeth Whitening (Los Angeles)', href: '/teeth-whitening' },
  { label: 'Zoom Whitening', href: '/zoom-whitening' },
  { label: 'Culver City Dentist', href: '/culver-city-dentist' },
  { label: 'Smile Gallery', href: '/smile-gallery' }
] as const;

export const CULVER_CITY_TEETH_WHITENING_REFERENCES = [
  {
    label: 'American Dental Association (ADA): Whitening',
    href: 'https://www.ada.org/resources/ada-library/oral-health-topics/whitening'
  },
  {
    label: 'NHS: Teeth whitening',
    href: 'https://www.nhs.uk/tests-and-treatments/teeth-whitening/'
  }
] as const;

