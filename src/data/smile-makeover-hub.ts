import {
  ADDRESS,
  BUSINESS_HOURS,
  PHONE_NUMBER_DISPLAY,
  PHONE_NUMBER_E164
} from "@/constants/contact";
import { GOOGLE_MAPS_SHORT_URL, SCHEDULE_CONSULTATION_PATH } from "@/constants/urls";

export type SmileMakeoverHubSection = {
  id: string;
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  links?: Array<{ label: string; href: string }>;
};

export const SMILE_MAKEOVER_HUB_INTRO_PARAGRAPHS = [
  'If you’re searching for “smile makeover Los Angeles,” you’re likely looking for a plan that improves color, shape, and symmetry, without an overdone look.',
  'A smile makeover isn’t one procedure. It’s a sequenced treatment plan that can combine whitening, bonding, porcelain veneers, Invisalign, and restorative dentistry when needed.',
  'At Exquisite Dentistry on Wilshire Blvd in Los Angeles, we start with a smile analysis (shade, proportions, and bite), then recommend the smallest set of treatments that gets you to your goal.',
  'You’ll leave with clear options, timeline expectations, and next steps, whether you want a quick refresh for an event or a fully coordinated transformation.'
] as const;

export const SMILE_MAKEOVER_HUB_SECTIONS: SmileMakeoverHubSection[] = [
  {
    id: "options",
    heading: "Smile Makeover Options (Veneers, Whitening, Invisalign & More)",
    paragraphs: [
      "The right makeover depends on what you want to change (brightness, shape, alignment, missing teeth) and what will look natural for your face and bite."
    ],
    bullets: [
      "Professional teeth whitening: lift stains and brighten natural enamel",
      "Dental bonding: repair chips, close small gaps, and refine edges in a conservative way",
      "Porcelain veneers: upgrade shape, symmetry, and shade in the smile zone",
      "Invisalign: align teeth before cosmetic finishing for better proportions and bite stability",
      "Restorative dentistry (crowns/implants): replace worn or missing teeth as part of the plan"
    ],
    links: [
      { label: "Porcelain Veneers", href: "/veneers/" },
      { label: "Teeth Whitening Options", href: "/teeth-whitening/" },
      { label: "Zoom Whitening", href: "/zoom-whitening/" },
      { label: "Invisalign", href: "/invisalign/" },
      { label: "Dental Implants", href: "/dental-implants/" }
    ]
  },
  {
    id: "process",
    heading: "Our Smile Makeover Process (Planning + Sequencing)",
    paragraphs: [
      "The best smile makeovers are planned from the end result backward. We coordinate shade, shape, and bite so every step supports the final outcome."
    ],
    bullets: [
      "Smile analysis: photos, shade assessment, gum display, tooth wear, and bite review",
      "Digital planning when needed: scans and mockups to preview the direction",
      "Sequencing: alignment → whitening → bonding/veneers so shade matching stays predictable",
      "Finishing: refine contact points, edges, and bite for comfort and longevity",
      "Maintenance plan: hygiene, retainers/nightguard guidance, and touch-up timing"
    ],
    links: [
      { label: "Smile Gallery (Before & After)", href: "/smile-gallery/" },
      { label: "Transformation Stories", href: "/transformation-stories/" }
    ]
  },
  {
    id: "timeline",
    heading: "Timeline: How Long Does a Smile Makeover Take?",
    paragraphs: [
      "Timelines vary based on your plan. Some improvements are fast; others are staged for bite stability and long-term results."
    ],
    bullets: [
      "Whitening refresh: often one visit (or a short series with take-home trays)",
      "Bonding: often completed in one visit for small chips or gaps",
      "Veneers: typically a few visits after planning and design approval",
      "Invisalign-first plans: several months depending on alignment goals",
      "Implant or restorative cases: staged timelines that prioritize healing and fit"
    ],
    links: [
      { label: "Schedule Consultation", href: SCHEDULE_CONSULTATION_PATH }
    ]
  },
  {
    id: "cost",
    heading: "Smile Makeover Cost in Los Angeles (What Affects Pricing)",
    paragraphs: [
      "Smile makeover fees vary because plans range from a conservative refresh to a multi-step aesthetic and restorative sequence. We recommend comparing itemized estimates, not just headline pricing."
    ],
    bullets: [
      "Number of teeth in the smile zone and what needs to change",
      "Materials and lab work (bonding vs porcelain vs restorative components)",
      "Whether alignment, gum health, or bite issues need to be addressed first",
      "Existing dental work (veneers/crowns/fillings) that may require shade matching",
      "Timeline needs (events, travel, staged treatment)"
    ],
    links: [
      { label: "Schedule Consultation", href: SCHEDULE_CONSULTATION_PATH },
      { label: "Contact", href: "/contact/" }
    ]
  },
  {
    id: "natural-results",
    heading: "Natural-Looking Results (Shade, Shape & Texture)",
    paragraphs: [
      "“Natural” isn’t one shade, it’s a combination of proportion, translucency, and surface texture that reads like healthy enamel. We plan these details so your smile looks elevated, not artificial."
    ],
    bullets: [
      "Shade planning that fits your skin tone and lifestyle (camera-friendly, not chalky)",
      "Tooth shapes and lengths balanced to your facial features and lip dynamics",
      "Texture and translucency that mimic real enamel (especially for veneers)",
      "Bite stability so the final result feels comfortable as well as beautiful"
    ]
  },
  {
    id: "maintenance",
    heading: "Maintenance & Longevity",
    paragraphs: [
      "A smile makeover is an investment. The right maintenance plan protects your results and helps restorations look consistent over time."
    ],
    bullets: [
      "Regular cleanings and exams to manage stain and gum health",
      "Retainers after Invisalign to keep alignment stable",
      "Nightguard guidance if you clench or grind",
      "Touch-ups timed for events and lifestyle habits (coffee/tea/wine)",
      "Long-term planning for existing restorations so everything stays color-matched"
    ]
  },
  {
    id: "location",
    heading: "Visit Our Los Angeles Office",
    paragraphs: [
      "Our dental studio is located on Wilshire Blvd in Los Angeles, convenient to Beverly Hills, West Hollywood, and surrounding neighborhoods."
    ],
    bullets: [
      `Address: ${ADDRESS}`,
      `Phone: ${PHONE_NUMBER_DISPLAY}`,
      ...BUSINESS_HOURS.map(({ label, value }) => `${label}: ${value}`)
    ],
    links: [
      { label: "Get Directions (Google Maps)", href: GOOGLE_MAPS_SHORT_URL },
      { label: `Call ${PHONE_NUMBER_DISPLAY}`, href: `tel:${PHONE_NUMBER_E164}` },
      { label: "Schedule Consultation", href: SCHEDULE_CONSULTATION_PATH },
      { label: "Client Experience", href: "/client-experience/" }
    ]
  }
];

export const SMILE_MAKEOVER_HUB_SUPPORTING_LINKS = [
  { label: "Smile Gallery (Before & After)", href: "/smile-gallery/" },
  { label: "Transformation Stories", href: "/transformation-stories/" },
  { label: "Cosmetic Dentistry", href: "/cosmetic-dentistry/" },
  { label: "Porcelain Veneers", href: "/veneers/" },
  { label: "Teeth Whitening", href: "/teeth-whitening/" },
  { label: "Invisalign", href: "/invisalign/" }
] as const;

export const SMILE_MAKEOVER_REFERENCES = [
  {
    label: "American Dental Association (ADA): Whitening",
    href: "https://www.ada.org/resources/ada-library/oral-health-topics/whitening"
  },
  {
    label: "NHS: Teeth whitening",
    href: "https://www.nhs.uk/tests-and-treatments/teeth-whitening/"
  }
] as const;
