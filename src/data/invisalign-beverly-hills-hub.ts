import {
  ADDRESS,
  BUSINESS_HOURS,
  PHONE_NUMBER_DISPLAY,
  PHONE_NUMBER_E164
} from "@/constants/contact";
import { GOOGLE_MAPS_SHORT_URL, SCHEDULE_CONSULTATION_PATH } from "@/constants/urls";

export type InvisalignBeverlyHillsHubSection = {
  id: string;
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  links?: Array<{ label: string; href: string }>;
};

export const INVISALIGN_BEVERLY_HILLS_HUB_INTRO_PARAGRAPHS = [
  'If you’re searching for “Invisalign Beverly Hills,” you’re probably looking for discreet alignment with a plan that fits a busy schedule and delivers natural-looking results.',
  'Invisalign uses a series of clear aligners to move teeth gradually. The best outcomes come from precise planning, consistent wear, and check-ins that keep progress on track.',
  'At Exquisite Dentistry near Beverly Hills (Wilshire Blvd in Los Angeles), we start with digital scanning and a bite-focused evaluation so tooth movement is predictable—not guesswork.',
  'When alignment is complete, we can coordinate finishing touches like whitening or bonding so your final smile looks balanced and camera-ready.'
] as const;

export const INVISALIGN_BEVERLY_HILLS_HUB_SECTIONS: InvisalignBeverlyHillsHubSection[] = [
  {
    id: "benefits",
    heading: "Why Choose Invisalign for Beverly Hills Patients",
    paragraphs: [
      "Beverly Hills patients often choose Invisalign because it’s subtle, removable, and compatible with work, social events, and travel when the plan is well-managed."
    ],
    bullets: [
      "Clear aligners that stay discreet in photos and meetings",
      "Removable for dining and easy brushing/flossing",
      "Digital planning with measurable progress checkpoints",
      "Finishing options (whitening/bonding) once alignment is stable"
    ],
    links: [
      { label: "Invisalign (Los Angeles)", href: "/invisalign/" },
      { label: "iTero Scanner", href: "/itero-scanner/" }
    ]
  },
  {
    id: "candidacy",
    heading: "Who’s a Good Candidate (and When to Consider Other Options)",
    paragraphs: [
      "Invisalign can address many spacing and crowding concerns, but candidacy depends on your bite, enamel health, and the type of tooth movement needed."
    ],
    bullets: [
      "Common goals: crowding, spacing, mild bite issues, and cosmetic alignment",
      "A bite evaluation helps determine whether aligners, braces, or restorative planning is best",
      "Existing crowns, veneers, or bonding can be managed with the right sequencing",
      "We’ll outline realistic expectations after your scan and exam"
    ],
    links: [
      { label: "Smile Makeover Los Angeles", href: "/smile-makeover-los-angeles/" },
      { label: "Cosmetic Dentistry", href: "/cosmetic-dentistry/" }
    ]
  },
  {
    id: "process",
    heading: "What to Expect (Scan → Plan → Aligners → Retainers)",
    paragraphs: [
      "A successful Invisalign experience is planned from the end result backward. We use digital scans to map movement stages and keep timing predictable."
    ],
    bullets: [
      "Consultation and bite-focused exam to confirm goals and candidacy",
      "Digital scan (no messy impressions) and staged movement plan",
      "Aligner delivery and wear guidance (typically 20–22 hours/day)",
      "Check-ins every 6–10 weeks to confirm tracking and adjust as needed",
      "Refinements if needed, then retainers to lock in results"
    ],
    links: [
      { label: "Schedule Consultation", href: SCHEDULE_CONSULTATION_PATH }
    ]
  },
  {
    id: "attachments",
    heading: "Attachments, IPR & Refinements (Common Questions)",
    paragraphs: [
      "Many Invisalign plans include small attachments or minor enamel reshaping (IPR) to help teeth move precisely. We’ll explain what’s included and why."
    ],
    bullets: [
      "Attachments are small tooth-colored shapes that help aligners grip and guide movement",
      "IPR can create tiny amounts of space to improve alignment in a conservative way",
      "Refinements are common and help fine-tune the final details",
      "We’ll plan changes around your schedule and comfort level"
    ]
  },
  {
    id: "visits",
    heading: "Appointments & Beverly Hills-Friendly Scheduling",
    paragraphs: [
      "Most Invisalign patients don’t need frequent visits, but you do need consistent check-ins. We keep appointments efficient and coordinate around travel and events when possible."
    ],
    bullets: [
      "Typical cadence: every 6–10 weeks depending on your plan",
      "Clear guidance on wear time and aligner changes so progress stays on schedule",
      "Options to coordinate cosmetic finishing (whitening/bonding) when you’re done",
      "Support if you lose a tray or need help while traveling"
    ],
    links: [
      { label: "Patient Testimonials", href: "/testimonials/" }
    ]
  },
  {
    id: "timeline",
    heading: "How Long Does Invisalign Take?",
    paragraphs: [
      "Timelines vary by complexity and wear consistency. Many adults finish cosmetic alignment in months, while bite-focused cases can take longer."
    ],
    bullets: [
      "Many adults finish in ~6–12 months; complex bite cases may take longer",
      "Wear time and tracking impact timelines more than almost anything else",
      "Refinements can extend treatment slightly but improve the final details",
      "Retainers are essential after treatment to maintain alignment"
    ]
  },
  {
    id: "cost",
    heading: "Invisalign Beverly Hills Cost Factors (What Drives Pricing)",
    paragraphs: [
      "Costs vary based on the complexity of tooth movement, how many aligners are required, and whether refinements or finishing treatments are part of the plan."
    ],
    bullets: [
      "Case complexity and bite correction needs",
      "Number of aligners and likelihood of refinements",
      "Retainers and long-term retention planning",
      "Cosmetic finishing (whitening/bonding) if desired after alignment"
    ],
    links: [
      { label: "Contact & Scheduling", href: "/contact/" }
    ]
  },
  {
    id: "finishing",
    heading: "After Invisalign: Whitening, Bonding, Veneers",
    paragraphs: [
      "Alignment often sets the foundation for a more conservative cosmetic result. Once teeth are in the right position, we can refine shade and shape if you’d like."
    ],
    bullets: [
      "Whitening after alignment for more even brightness",
      "Bonding for minor edge refinements or chip repair",
      "Veneers when larger shape or symmetry changes are the goal",
      "Smile makeover sequencing for predictable color matching and bite stability"
    ],
    links: [
      { label: "Teeth Whitening Options", href: "/teeth-whitening/" },
      { label: "Zoom Whitening", href: "/zoom-whitening/" },
      { label: "Porcelain Veneers", href: "/veneers/" }
    ]
  },
  {
    id: "location",
    heading: "Visit Our Office (Near Beverly Hills)",
    paragraphs: [
      "Our dental studio is located on Wilshire Blvd in Los Angeles, convenient to Beverly Hills and surrounding neighborhoods."
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
      { label: "Beverly Hills Dentist Page", href: "/beverly-hills-dentist/" }
    ]
  }
];

export const INVISALIGN_BEVERLY_HILLS_SUPPORTING_LINKS = [
  { label: "Invisalign (Los Angeles)", href: "/invisalign/" },
  { label: "Beverly Hills Dentist", href: "/beverly-hills-dentist/" },
  { label: "iTero Scanner", href: "/itero-scanner/" },
  { label: "Smile Makeover Los Angeles", href: "/smile-makeover-los-angeles/" },
  { label: "Teeth Whitening Near Beverly Hills", href: "/teeth-whitening-beverly-hills/" },
  { label: "Patient Testimonials", href: "/testimonials/" }
] as const;

export const INVISALIGN_BEVERLY_HILLS_REFERENCES = [
  {
    label: "American Association of Orthodontists (AAO): Aligners",
    href: "https://aaoinfo.org/treatments/aligners/"
  },
  {
    label: "American Association of Orthodontists (AAO): Retainers",
    href: "https://aaoinfo.org/treatments/retainers/"
  },
  {
    label: "Invisalign: How it works",
    href: "https://www.invisalign.com/how-invisalign-works"
  }
] as const;
