import {
  ADDRESS,
  BUSINESS_HOURS,
  PHONE_NUMBER_DISPLAY,
  PHONE_NUMBER_E164
} from '@/constants/contact';
import { GOOGLE_MAPS_SHORT_URL, SCHEDULE_CONSULTATION_PATH } from '@/constants/urls';

export type ZoomWhiteningHubSection = {
  id: string;
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  links?: Array<{ label: string; href: string }>;
};

export const ZOOM_WHITENING_HUB_INTRO_PARAGRAPHS = [
  'If you’re searching for “Zoom whitening Los Angeles,” you’re probably looking for fast, in-office brightening with a plan for comfort and natural-looking results.',
  'Zoom whitening is a dentist-supervised treatment that uses timed gel cycles (and light activation) to lift common stains from coffee, tea, wine, and everyday life.',
  'At Exquisite Dentistry on Wilshire Blvd in Los Angeles, we start with a shade assessment and sensitivity review so the treatment fits your enamel, restorations, and timeline.',
  'You’ll leave with aftercare guidance and a realistic maintenance plan to keep your shade consistent for photos, meetings, and events.'
] as const;

export const ZOOM_WHITENING_HUB_SECTIONS: ZoomWhiteningHubSection[] = [
  {
    id: 'benefits',
    heading: 'Why Choose Zoom Whitening in Los Angeles',
    paragraphs: [
      'Zoom is popular because it’s fast and predictable when it’s planned around enamel health, sensitivity, and existing dental work.'
    ],
    bullets: [
      'In-office treatment often takes about 60 to 90 minutes',
      'Many patients brighten about 3 to 8 shades depending on starting shade and enamel',
      'Dentist-supervised protocol with gum protection and comfort-first adjustments',
      'Optional take-home boosters can help maintain brightness long-term'
    ]
  },
  {
    id: 'process',
    heading: 'What to Expect (Zoom Whitening Process)',
    paragraphs: [
      'A great outcome starts with the right prep and a realistic target shade. We’ll walk you through your best option and what to expect on the day of treatment.'
    ],
    bullets: [
      'Consultation + shade assessment to confirm candidacy and target shade',
      'Protect gums and lips before applying the whitening gel',
      'Complete timed gel cycles with monitoring and comfort adjustments',
      'Review aftercare and touch-up guidance so results last'
    ]
  },
  {
    id: 'sensitivity',
    heading: 'Sensitivity & Comfort Protocol',
    paragraphs: [
      'Temporary sensitivity can happen with whitening, especially if you’ve had sensitivity in the past. Our goal is to reduce flare-ups and keep your visit comfortable.'
    ],
    bullets: [
      'Review sensitivity history and enamel condition before starting',
      'Adjust cycle timing and treatment pacing based on comfort',
      'Recommend desensitizing options and 24 to 48 hour aftercare steps',
      'Offer tray-based alternatives when a slower pace is the better fit'
    ],
    links: [
      { label: 'Compare Teeth Whitening Options', href: '/teeth-whitening/' }
    ]
  },
  {
    id: 'cost',
    heading: 'Zoom Whitening Cost in Los Angeles',
    paragraphs: [
      'Pricing varies based on your starting shade, sensitivity history, and whether take-home boosters are included for maintenance.'
    ],
    bullets: [
      'In-office Zoom whitening typically starts around $595 (confirm after your exam and shade check)',
      'Existing veneers, crowns, or bonding may require shade-matching planning',
      'A maintenance plan (touch-up gel or trays) can extend longevity for coffee/tea/wine habits'
    ],
    links: [
      { label: 'Schedule Consultation', href: SCHEDULE_CONSULTATION_PATH }
    ]
  },
  {
    id: 'aftercare',
    heading: 'Aftercare & How Long Results Last',
    paragraphs: [
      'Results commonly last months to a couple of years depending on diet, habits, and maintenance. Aftercare helps protect your new shade, especially in the first 24 to 48 hours.'
    ],
    bullets: [
      'Follow a “white diet” for 24 to 48 hours (avoid dark sauces, coffee, red wine, and berries)',
      'Manage sensitivity with the plan we recommend for your enamel',
      'Keep up with regular cleanings so surface stains don’t build up',
      'Use touch-ups as needed to keep your shade consistent before events'
    ]
  },
  {
    id: 'location',
    heading: 'Visit Our Los Angeles Office',
    paragraphs: [
      'Our dental studio is located on Wilshire Blvd in Los Angeles, convenient to Beverly Hills, Culver City, and Westside neighborhoods.'
    ],
    bullets: [
      `Address: ${ADDRESS}`,
      `Phone: ${PHONE_NUMBER_DISPLAY}`,
      ...BUSINESS_HOURS.map(({ label, value }) => `${label}: ${value}`)
    ],
    links: [
      { label: 'Get Directions (Google Maps)', href: GOOGLE_MAPS_SHORT_URL },
      { label: `Call ${PHONE_NUMBER_DISPLAY}`, href: `tel:${PHONE_NUMBER_E164}` },
      { label: 'Schedule Consultation', href: SCHEDULE_CONSULTATION_PATH },
      { label: 'Contact', href: '/contact/' }
    ]
  }
];

export const ZOOM_WHITENING_SUPPORTING_LINKS = [
  { label: 'Teeth Whitening Options', href: '/teeth-whitening/' },
  { label: 'Teeth Whitening Near Beverly Hills', href: '/teeth-whitening-beverly-hills/' },
  { label: 'Culver City Teeth Whitening', href: '/culver-city-teeth-whitening/' },
  { label: 'Smile Gallery', href: '/smile-gallery/' },
  { label: 'Patient Testimonials', href: '/testimonials/' }
] as const;

export const ZOOM_WHITENING_REFERENCES = [
  {
    label: 'American Dental Association (ADA): Whitening',
    href: 'https://www.ada.org/resources/ada-library/oral-health-topics/whitening'
  },
  {
    label: 'NHS: Teeth whitening',
    href: 'https://www.nhs.uk/tests-and-treatments/teeth-whitening/'
  }
] as const;
