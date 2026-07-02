import { SCHEDULE_CONSULTATION_PATH } from "@/constants/urls";
import { PHONE_NUMBER_DISPLAY, PHONE_NUMBER_E164 } from "@/constants/contact";

export interface LocationPageConfig {
  slug: string;
  cityLabel: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  hero: {
    heading: string;
    subheading: string;
    stats: { label: string; value: string }[];
  };
  practiceLocation?: PracticeLocationSectionConfig;
  doctorSection?: DoctorExperienceSectionConfig;
  neighborhoodHighlights: string[];
  signatureServices: string[];
  testimonials: { quote: string; author: string }[];
  faqs: { question: string; answer: string }[];
  relatedServices: Array<{ label: string; href: string }>;
  cta: {
    heading: string;
    description: string;
    primaryText: string;
    primaryHref: string;
    secondaryText?: string;
    secondaryHref?: string;
  };
}

export interface PracticeLocationSectionConfig {
  heading: string;
  description: string;
  highlights?: string[];
  mapEmbedSrc?: string;
  directionsHref?: string;
}

export interface DoctorExperienceSectionConfig {
  eyebrow?: string;
  heading: string;
  paragraphs: string[];
  highlights?: string[];
  image?: {
    src: string;
    alt: string;
  };
  cta?: {
    primaryText: string;
    primaryHref: string;
    secondaryText?: string;
    secondaryHref?: string;
  };
}

const normalizeInternalHref = (href: string): string => {
  if (!href.startsWith("/")) return href;
  if (href === "/") return href;

  const [pathPart, hashPart] = href.split("#");
  const normalizedPath = pathPart.endsWith("/") ? pathPart : `${pathPart}/`;
  return hashPart ? `${normalizedPath}#${hashPart}` : normalizedPath;
};

const DOCTOR_IMAGE = {
  src: "/lovable-uploads/7fc03f27-6c3a-4d2a-bba6-961af127a9f0.webp",
  alt: "Dr. Alexie Aguil, professional business portrait",
};

const DOCTOR_HIGHLIGHTS = [
  "USC School of Dentistry graduate focused on cosmetic and restorative care",
  "Invisalign Lifetime Achievement Award provider",
  "iTero digital scanning for comfortable, accurate impressions",
  "15+ years of experience caring for Los Angeles patients",
];

const createDoctorSection = (paragraphs: string[]): DoctorExperienceSectionConfig => ({
  eyebrow: "Meet the Dentist",
  heading: "Dr. Alexie Aguil",
  paragraphs,
  highlights: DOCTOR_HIGHLIGHTS,
  image: DOCTOR_IMAGE,
  cta: {
    primaryText: "Schedule Consultation",
    primaryHref: SCHEDULE_CONSULTATION_PATH,
    secondaryText: "Learn About Dr. Aguil",
    secondaryHref: "/about/",
  },
});

interface LocationConfigInput {
  slug: string;
  cityLabel: string;
  /** Doubles as the hero subheading and the meta description (existing site convention). */
  description: string;
  heroHeading?: string;
  heroStats: { label: string; value: string }[];
  extraKeywords?: string[];
  highlights: string[];
  services: string[];
  testimonials: { quote: string; author: string }[];
  faqs: { question: string; answer: string }[];
  relatedServices: Array<{ label: string; href: string }>;
  practiceLocation: PracticeLocationSectionConfig;
  doctorSection: DoctorExperienceSectionConfig;
  ctaHeading?: string;
  ctaDescription?: string;
}

const createLocationConfig = (input: LocationConfigInput): LocationPageConfig => {
  const cityLower = input.cityLabel.toLowerCase();

  return {
    slug: input.slug,
    cityLabel: input.cityLabel,
    seo: {
      title: `${input.cityLabel} Dentist | Exquisite Dentistry in Los Angeles`,
      description: input.description,
      keywords: [
        `${cityLower} dentist`,
        `${cityLower} cosmetic dentist`,
        `dentist near ${cityLower}`,
        ...(input.extraKeywords ?? []),
      ],
    },
    hero: {
      heading: input.heroHeading ?? `${input.cityLabel}’s Boutique Dental Experience`,
      subheading: input.description,
      stats: input.heroStats,
    },
    practiceLocation: input.practiceLocation,
    doctorSection: input.doctorSection,
    neighborhoodHighlights: input.highlights,
    signatureServices: input.services,
    testimonials: input.testimonials,
    relatedServices: input.relatedServices.map((service) => ({
      ...service,
      href: normalizeInternalHref(service.href),
    })),
    faqs: input.faqs,
    cta: {
      heading: input.ctaHeading ?? `Visit Us From ${input.cityLabel}`,
      description:
        input.ctaDescription ?? "Our Wilshire Boulevard studio is a quick drive from your neighborhood.",
      primaryText: "Schedule Consultation",
      primaryHref: SCHEDULE_CONSULTATION_PATH,
      secondaryText: `Call ${PHONE_NUMBER_DISPLAY}`,
      secondaryHref: `tel:${PHONE_NUMBER_E164}`,
    },
  };
};

export const locationPageConfigs: Record<string, LocationPageConfig> = {
  "west-hollywood-dentist": createLocationConfig({
    slug: "west-hollywood-dentist",
    cityLabel: "West Hollywood",
    description:
      "Minutes from the Sunset Strip and Melrose, our Beverly Grove studio is an easy stop for West Hollywood patients. We offer private treatment rooms, evening appointments, and concierge scheduling that fits busy calendars.",
    heroStats: [
      { label: "Caring for LA smiles", value: "Since 2006" },
      { label: "Years of experience", value: "15+" },
      { label: "Appointments 8AM–6PM", value: "Mon–Thu" },
    ],
    highlights: [
      "Easy access from Santa Monica Blvd. and Fairfax",
      "Late-morning and early-evening appointments",
      "Creative-friendly amenities for on-camera schedules",
    ],
    services: [
      "Porcelain veneers for natural-looking, confident smiles",
      "Zoom whitening boosts scheduled before premieres and panels",
      "Emergency dentistry with discreet same-day relief and sedation",
      "Invisalign programs tailored to entertainment professionals",
    ],
    testimonials: [
      {
        quote:
          "They treat you like family in the heart of West Hollywood. Comfort, privacy, and stunning results.",
        author: "Shannon L.",
      },
    ],
    faqs: [
      {
        question: "How do I get to your office from West Hollywood?",
        answer:
          "Crescent Heights Boulevard, Fairfax Avenue, and La Cienega Boulevard all run south from West Hollywood to Wilshire Boulevard. The office is at 6227 Wilshire Blvd, near Wilshire and Crescent Heights on the western end of the Miracle Mile.",
      },
      {
        question: "Where should I park?",
        answer:
          "There is a paid parking lot on-site at our building. It is operated separately from the practice and charges a cash fee, so plan accordingly. Street parking in the surrounding blocks is limited — read the posted signs carefully if you park on the street.",
      },
      {
        question: "Can you check my dental insurance before I book?",
        answer: `Yes. If you have a PPO dental plan, there is a strong chance we can help you use your benefits. Call ${PHONE_NUMBER_DISPLAY} or send us your plan details and our team will verify your specific coverage before treatment.`,
      },
      {
        question: "What do West Hollywood patients usually come in for?",
        answer:
          "Cosmetic requests are common — veneers, whitening, and Invisalign — alongside routine cleanings and exams. If you work on camera or have an event coming up, we can plan treatment timing around your schedule.",
      },
    ],
    relatedServices: [
      { label: "Porcelain Veneers", href: "/veneers" },
      { label: "Zoom Whitening", href: "/zoom-whitening" },
      { label: "Teeth Cleaning", href: "/teeth-cleaning" },
    ],
    practiceLocation: {
      heading: "Visit Exquisite Dentistry from West Hollywood",
      description:
        "Our studio sits at 6227 Wilshire Blvd near Crescent Heights, directly south of West Hollywood. Most patients take Crescent Heights, Fairfax, or La Cienega down to Wilshire Boulevard — no freeway needed.",
      highlights: [
        "Straight south from Santa Monica Blvd via Crescent Heights or Fairfax",
        "Paid parking lot at the building; rideshare drop-off is simple",
        "Appointments Monday through Thursday, 8AM to 6PM",
      ],
    },
    doctorSection: createDoctorSection([
      "West Hollywood patients visit Dr. Alexie Aguil for cosmetic and restorative dentistry in a calm, private setting just south of the neighborhood. Veneers, whitening, and Invisalign are planned with attention to proportion and shade, so results look natural in person and on camera.",
      "Dr. Aguil has cared for Los Angeles patients at Exquisite Dentistry since 2006. Appointments are unhurried, treatment options are explained clearly, and comfort amenities — from noise-canceling headphones to warm blankets — are part of every visit.",
    ]),
  }),

  "beverly-hills-dentist": createLocationConfig({
    slug: "beverly-hills-dentist",
    cityLabel: "Beverly Hills",
    description:
      "Concierge-level cosmetic dentistry a short drive east of Rodeo Drive, serving Beverly Hills patients with discreet, private treatment rooms. Veneers, Invisalign, whitening, and restorations planned with privacy-first scheduling keep every reveal seamless.",
    heroHeading: "Beverly Hills Dentist, Concierge Cosmetic Care",
    heroStats: [
      { label: "Caring for LA smiles", value: "Since 2006" },
      { label: "Benefits verified before treatment", value: "PPO" },
      { label: "Appointments 8AM–6PM", value: "Mon–Thu" },
    ],
    highlights: [
      "Complimentary beverage and comfort menu",
      "Coordinated rideshare or car service",
      "Collaboration with Beverly Hills surgeons and dermatologists",
    ],
    services: [
      "Smile makeovers that pair veneers, crowns, and whitening for flawless symmetry",
      "Porcelain veneers crafted with Beverly Hills ceramists for natural brilliance",
      "Invisalign clear aligners for discreet alignment and bite refinement",
      "Teeth whitening plans (in-office and take-home) timed around events and photo sessions",
      "Dental implants planned with advanced imaging for enduring bite strength",
      "Full-mouth reconstruction that balances function, health, and high fashion",
    ],
    testimonials: [
      {
        quote: "A Beverly Hills-level experience without crossing town. My veneers look flawless.",
        author: "Taylor V.",
      },
    ],
    faqs: [
      {
        question: "How far is the office from Beverly Hills?",
        answer:
          "We are just east of Beverly Hills on Wilshire Boulevard — a direct drive along Wilshire with no freeway. The office sits at 6227 Wilshire Blvd, near Crescent Heights, on the western end of the Miracle Mile.",
      },
      {
        question: "Is there parking at the building?",
        answer:
          "Yes. A paid parking lot operates on-site at 6227 Wilshire Blvd; it is not our lot and charges a cash fee. If you prefer not to drive, rideshare drop-off at the entrance is easy.",
      },
      {
        question: "Do you take PPO insurance?",
        answer:
          "We work with many PPO plans and PPO network relationships, including Guardian PPO. Benefits vary by plan, so send us your insurance information and we will verify your coverage before your appointment.",
      },
      {
        question: "Can appointments be kept private?",
        answer:
          "Yes. Treatment happens in private rooms, and we schedule deliberately so the office stays calm and unhurried. Let us know if discretion matters for your visit and we will plan timing accordingly.",
      },
    ],
    relatedServices: [
      { label: "Cosmetic Dentistry", href: "/cosmetic-dentistry" },
      { label: "Teeth Whitening Near Beverly Hills", href: "/teeth-whitening-beverly-hills" },
      { label: "Invisalign Beverly Hills", href: "/invisalign-beverly-hills" },
      { label: "Dental Implants", href: "/dental-implants" },
      { label: "Dental Crowns", href: "/dental-crowns" },
    ],
    practiceLocation: {
      heading: "Visit Exquisite Dentistry from Beverly Hills",
      description:
        "Our Wilshire Blvd studio sits just outside Beverly Hills, making it simple to plan concierge dental care without a long commute. We’ll help you coordinate timing, parking, and discreet scheduling so appointments fit seamlessly into your calendar.",
      highlights: [
        "A direct drive east on Wilshire Boulevard from Rodeo Drive (traffic varies)",
        "Paid parking lot at the building, plus rideshare-friendly drop-off",
        "Privacy-first scheduling for professionals and public-facing careers",
      ],
    },
    doctorSection: {
      ...createDoctorSection([
        "Beverly Hills patients visit Exquisite Dentistry for cosmetic and restorative care with a calm, private experience. Dr. Aguil blends precision dentistry with an artistic eye, creating natural-looking results that photograph well and hold up for everyday function.",
        "With more than 15 years of experience and a practice that has cared for Los Angeles patients since 2006, Dr. Aguil is known for thoughtful planning, clear communication, and comfort-first appointments. Whether you’re considering veneers, Invisalign, whitening, or implants, your treatment plan is tailored to your timeline, lifestyle, and long-term oral health.",
      ]),
      highlights: [
        "USC-trained cosmetic dentist with a function-first approach",
        "Invisalign Lifetime Achievement Award provider",
        "Digital scanning and smile planning for predictable results",
        "Discreet, concierge scheduling designed around busy calendars",
      ],
    },
  }),

  "culver-city-dentist": createLocationConfig({
    slug: "culver-city-dentist",
    cityLabel: "Culver City",
    description:
      "Preferred by studio professionals and tech teams commuting up La Cienega for elevated preventive and cosmetic care. We sync treatment plans with shoot calendars, investor meetings, and hybrid workweeks so nothing slows momentum.",
    heroStats: [
      { label: "Years of experience", value: "15+" },
      { label: "Digital scanning on site", value: "iTero" },
      { label: "Earliest weekday start", value: "8AM" },
    ],
    highlights: [
      "Flexible scheduling around production timelines",
      "Text-first communication for busy calendars",
      "Streaming, Wi-Fi, and productivity-friendly lounges",
    ],
    services: [
      "Teeth cleanings with VELscope screenings for proactive wellness",
      "Invisalign treatment that adapts to hybrid work and travel",
      "Professional teeth whitening (in-office and take-home) timed around headshots and events",
      "Dental crowns that restore durability without sacrificing aesthetics",
    ],
    testimonials: [
      {
        quote: "Worth the quick drive from Culver City. Efficient, luxurious, and always on schedule.",
        author: "Nick S.",
      },
    ],
    faqs: [
      {
        question: "What’s the best route from Culver City?",
        answer:
          "Most Culver City patients take Fairfax Avenue or La Cienega Boulevard north to Wilshire Boulevard. The office is at 6227 Wilshire Blvd, near Crescent Heights, between Fairfax and San Vicente.",
      },
      {
        question: "Can I schedule around my workday?",
        answer:
          "We see patients Monday through Thursday, 8AM to 6PM, so early starts and end-of-day visits are both possible. If plans change, please give us 48 hours’ notice to reschedule without a cancellation fee.",
      },
      {
        question: "How does parking work when I arrive?",
        answer:
          "A paid parking lot operates at our building — it is run separately from the practice and takes a cash fee. Street parking nearby is limited, so most patients use the lot or a rideshare.",
      },
      {
        question: "Will you verify my PPO benefits?",
        answer: `Yes. Because every plan is different, we verify PPO benefits before treatment. Call ${PHONE_NUMBER_DISPLAY} or send your plan details ahead of your visit and our team will confirm what applies.`,
      },
    ],
    relatedServices: [
      { label: "Teeth Whitening Near Culver City", href: "/culver-city-teeth-whitening" },
      { label: "Zoom Whitening", href: "/zoom-whitening" },
      { label: "Invisalign", href: "/invisalign" },
      { label: "Teeth Cleaning", href: "/teeth-cleaning" },
    ],
    practiceLocation: {
      heading: "Visit Exquisite Dentistry from Culver City",
      description:
        "The office sits at 6227 Wilshire Blvd near Crescent Heights, on the western end of the Miracle Mile. From Culver City, head north on Fairfax Avenue or La Cienega Boulevard to meet Wilshire — no freeway required.",
      highlights: [
        "North on Fairfax or La Cienega straight to the Wilshire corridor",
        "Paid on-site parking lot; rideshare drop-off at the entrance",
        "Early 8AM starts for appointments before work",
      ],
    },
    doctorSection: createDoctorSection([
      "Culver City patients make the drive up to Wilshire Boulevard for preventive and cosmetic care that respects their calendars. Dr. Alexie Aguil pairs efficient, well-planned visits with clear communication, so you always know what was done and what comes next.",
      "A USC School of Dentistry graduate, Dr. Aguil has practiced in Los Angeles for more than 15 years. iTero digital scanning replaces gooey impression trays for most crown, bridge, and Invisalign work — one more way visits stay comfortable.",
    ]),
  }),

  "west-la-dentist": createLocationConfig({
    slug: "west-la-dentist",
    cityLabel: "West LA",
    description:
      "Access advanced cosmetic and restorative care without the commute downtown, our studio sits conveniently off Wilshire and is an easy fit for Westside neighborhoods like Santa Monica. Enjoy valet-friendly arrival, digital consultations, and treatment plans that respect Westside commutes.",
    heroStats: [
      { label: "Years of experience", value: "15+" },
      { label: "Benefits verified before treatment", value: "PPO" },
      { label: "Appointments 8AM–6PM", value: "Mon–Thu" },
    ],
    highlights: [
      "Easy access from the 10 and 405",
      "Valet-friendly entrance",
      "Virtual consultations for busy professionals",
    ],
    services: [
      "Dental implants placed with precision guides for lasting stability",
      "Cosmetic bonding to refresh chips from daily wear and tear",
      "Emergency care that saves commutes with rapid response times",
      "Teeth whitening packages coordinated around board meetings and events",
    ],
    testimonials: [
      {
        quote: "Driving in from West LA is simple and the team makes every visit feel restorative.",
        author: "Chris R.",
      },
    ],
    faqs: [
      {
        question: "How do I reach you from West LA?",
        answer:
          "Wilshire Boulevard runs directly from the Westside to our door at 6227 Wilshire Blvd, near Crescent Heights. If you take the 10, exit Fairfax Avenue and head north to Wilshire, then west a few blocks.",
      },
      {
        question: "Is parking easy once I arrive?",
        answer:
          "There is a paid lot on-site at the building (separately operated, cash fee). Street parking in the surrounding blocks is limited and heavily signed, so the lot or a rideshare is usually the smoother option.",
      },
      {
        question: "Do you handle dental emergencies for Westside patients?",
        answer: `Yes. We offer same-day treatment for toothaches, fractures, and other urgent problems whenever the schedule allows. Call ${PHONE_NUMBER_DISPLAY} first so we can prepare for your arrival.`,
      },
      {
        question: "Can you verify my insurance before the first visit?",
        answer:
          "If you have a PPO dental plan, there is a strong chance we can help you use your benefits. Send us your plan information ahead of time and our team will confirm your coverage before treatment begins.",
      },
    ],
    relatedServices: [
      { label: "Dental Implants", href: "/dental-implants" },
      { label: "Dental Implants Near Santa Monica", href: "/santa-monica-dental-implants" },
      { label: "Emergency Dentistry", href: "/emergency-dentist/" },
      { label: "Professional Whitening", href: "/teeth-whitening" },
    ],
    practiceLocation: {
      heading: "Visit Exquisite Dentistry from West LA",
      description:
        "We’re located at 6227 Wilshire Blvd near Crescent Heights, at the western end of the Miracle Mile. From West LA, stay on Wilshire Boulevard heading east through Beverly Hills, or take the 10 and come up Fairfax Avenue.",
      highlights: [
        "One-road route: Wilshire Boulevard east, straight to the office",
        "Paid parking lot at the building; limited street parking nearby",
        "PPO benefits verified before treatment when you send plan details",
      ],
    },
    doctorSection: createDoctorSection([
      "Westside patients come east on Wilshire for restorative dentistry that is planned carefully and explained plainly. Dr. Alexie Aguil places dental implants with precision guides and 3D imaging, and handles crowns, bonding, and whitening with the same attention to detail.",
      "Dr. Aguil is a USC School of Dentistry graduate with more than 15 years of experience in Los Angeles. His team verifies PPO benefits before treatment and keeps appointments on time, so a cross-town visit stays predictable.",
    ]),
  }),

  "bel-air-dentist": createLocationConfig({
    slug: "bel-air-dentist",
    cityLabel: "Bel Air",
    description:
      "Discreet dentistry with careful attention to privacy for Bel Air residents. Private lounge service, personalized sedation, and quick lab turnarounds help keep appointments on schedule.",
    heroStats: [
      { label: "Caring for LA smiles", value: "Since 2006" },
      { label: "A practice focused on adult care", value: "Adults" },
      { label: "Appointments 8AM–6PM", value: "Mon–Thu" },
    ],
    highlights: [
      "Private bookings & NDA-friendly appointments",
      "On-site concierge for custom requests",
      "High-end sterilization and air purification protocols",
    ],
    services: [
      "Smile design consultations that consider facial harmony and on-camera poise",
      "Porcelain crowns that reinforce strength while matching natural translucency",
      "TMJ therapy to relieve clenching brought on by high-pressure calendars",
      "Holistic preventive care with spa-level comforts and aromatherapy",
    ],
    testimonials: [
      {
        quote: "Discreet, detail-oriented dentistry that matches Bel Air expectations.",
        author: "Virginia M.",
      },
    ],
    faqs: [
      {
        question: "What’s the drive like from Bel Air?",
        answer:
          "Head south to Wilshire Boulevard, then east through Beverly Hills; the office is at 6227 Wilshire Blvd near Crescent Heights, on the western end of the Miracle Mile. It is one continuous boulevard once you reach Wilshire.",
      },
      {
        question: "Is the office set up for privacy?",
        answer:
          "Yes. Treatment takes place in private rooms, the practice focuses on adult care, and we can schedule your visit at quieter times of day. Tell us what level of discretion you need and we will plan around it.",
      },
      {
        question: "How should I handle parking or drop-off?",
        answer:
          "Many Bel Air patients prefer a car service or rideshare directly to the entrance. If you drive, a paid parking lot operates at the building — note that it is separately run and charges a cash fee.",
      },
      {
        question: "Do you work with dental insurance?",
        answer:
          "We work with many PPO plans and verify benefits before treatment. Coverage varies by plan, so send us your details in advance and our team will explain what your plan is likely to cover.",
      },
    ],
    relatedServices: [
      { label: "Porcelain Veneers", href: "/veneers" },
      { label: "Dental Crowns", href: "/dental-crowns" },
      { label: "Teeth Cleaning", href: "/teeth-cleaning" },
    ],
    practiceLocation: {
      heading: "Visit Exquisite Dentistry from Bel Air",
      description:
        "Our studio is at 6227 Wilshire Blvd near Crescent Heights. From Bel Air, come south to Wilshire Boulevard and continue east through Beverly Hills — the office sits just past San Vicente at the western end of the Miracle Mile.",
      highlights: [
        "A single-boulevard drive once you reach Wilshire",
        "Car service and rideshare drop-off at the entrance",
        "Quieter appointment times available on request",
      ],
    },
    doctorSection: createDoctorSection([
      "Bel Air residents choose Dr. Alexie Aguil for careful, private dentistry with results that look natural rather than done. Crowns, veneers, and preventive care are planned with attention to facial balance, shade, and long-term function.",
      "Dr. Aguil has led Exquisite Dentistry since 2006, and the practice is designed around adult patients who value calm — soft lighting, warm blankets, and noise-canceling headphones come standard, not as extras.",
    ]),
  }),

  "90048-dentist": createLocationConfig({
    slug: "90048-dentist",
    cityLabel: "90048",
    description:
      "Your neighborhood dentist in the 90048 zip code, walkable for locals and convenient for Cedars-Sinai teams. Stop in between rounds or lunch breaks for modern preventive care, whitening boosts, and same-day fixes.",
    heroStats: [
      { label: "Our shared zip code", value: "90048" },
      { label: "Emergency appointments", value: "Same-day" },
      { label: "Monday through Thursday", value: "8AM–6PM" },
    ],
    highlights: [
      "At 6227 Wilshire Blvd near Crescent Heights, inside 90048",
      "Walkable for neighbors along the Wilshire corridor",
      "Same-day emergency availability",
    ],
    services: [
      "Preventive cleanings with gentle techniques for sensitive enamel",
      "Whitening boosts that refresh your smile between client dinners",
      "Dental bridges that close gaps quickly when implants aren’t ideal",
      "Invisalign Express options for subtle alignment on tighter timelines",
    ],
    testimonials: [
      {
        quote: "Living in 90048 means Exquisite Dentistry is my go-to spot for quick, beautiful care.",
        author: "Alex D.",
      },
    ],
    faqs: [
      {
        question: "Where in 90048 are you located?",
        answer:
          "We’re at 6227 Wilshire Blvd, near the corner of Wilshire and Crescent Heights at the western end of the Miracle Mile — the same zip code as much of the surrounding neighborhood.",
      },
      {
        question: "Should I walk or drive?",
        answer:
          "If you live nearby, walking is often easiest. Drivers can use the paid parking lot at the building (separately operated, cash fee). Street parking in the surrounding residential blocks is limited, so read the signs carefully.",
      },
      {
        question: "Can I be seen the same day for an urgent problem?",
        answer: `Often, yes. We hold room in the schedule for same-day treatment of toothaches, chips, and other urgent issues. Call ${PHONE_NUMBER_DISPLAY} as early in the day as you can and we will find the soonest opening.`,
      },
      {
        question: "Do you accept PPO dental insurance?",
        answer:
          "Yes — if you have a PPO plan, there is a strong chance we can help you use your benefits. Every plan differs, so we verify coverage before treatment and explain your estimated costs clearly.",
      },
    ],
    relatedServices: [
      { label: "Teeth Cleaning", href: "/teeth-cleaning" },
      { label: "Dental Bridge", href: "/dental-bridge" },
      { label: "Invisalign", href: "/invisalign" },
    ],
    practiceLocation: {
      heading: "Our Office in the 90048 Zip Code",
      description:
        "Exquisite Dentistry is at 6227 Wilshire Blvd, Los Angeles, CA 90048 — on Wilshire near Crescent Heights. For neighbors, that means a walk or a very short drive; for everyone else, Wilshire, Third Street, and San Vicente all lead here.",
      highlights: [
        "Walkable from the surrounding Wilshire-corridor blocks",
        "Paid on-site parking lot for patients who drive",
        "Same-day emergency visits when the schedule allows",
      ],
    },
    doctorSection: createDoctorSection([
      "For patients who live or work in 90048, Dr. Alexie Aguil is the dentist around the corner. The practice covers routine cleanings and exams, whitening, Invisalign, and restorative work like bridges and crowns — so most care happens in one familiar place.",
      "Dr. Aguil, a USC School of Dentistry graduate, has cared for this neighborhood since 2006. Visits are unhurried, digital x-rays and iTero scans keep diagnostics comfortable, and the team verifies PPO benefits before treatment.",
    ]),
  }),

  "melrose-dentist": createLocationConfig({
    slug: "melrose-dentist",
    cityLabel: "Melrose",
    description:
      "Creative professionals along Melrose trust us for cosmetic touch-ups before events, premieres, and photoshoots. On-demand whitening, veneer repairs, and pain-free visits keep you camera ready every day of the week.",
    heroStats: [
      { label: "Caring for LA smiles", value: "Since 2006" },
      { label: "Digital scanning on site", value: "iTero" },
      { label: "Appointments 8AM–6PM", value: "Mon–Thu" },
    ],
    highlights: [
      "Last-minute whitening and bonding",
      "Extended hours during awards season",
      "Digital mockups for on-set approval",
    ],
    services: [
      "Zoom whitening for bold on-stage sparkle",
      "Porcelain veneers that elevate branding shoots and headshots",
      "Same-day repairs for chipped teeth between rehearsals",
      "Pain-free dentistry with NuCalm-style relaxation methods",
    ],
    testimonials: [
      {
        quote: "Perfect for quick smile upgrades between shoots on Melrose.",
        author: "Brandon G.",
      },
    ],
    faqs: [
      {
        question: "How do I get there from Melrose Avenue?",
        answer:
          "Take Fairfax Avenue or Crescent Heights Boulevard south from Melrose to Wilshire Boulevard. The office is at 6227 Wilshire Blvd, near Crescent Heights — a short, surface-street drive from most of the Melrose corridor.",
      },
      {
        question: "Can you fix a chipped tooth quickly?",
        answer:
          "In many cases, yes. Cosmetic bonding and same-day repairs can often be completed in a single visit, and we hold schedule room for urgent problems. Call ahead so we can confirm timing for your specific situation.",
      },
      {
        question: "What’s the parking situation?",
        answer:
          "A paid parking lot operates at our building — it isn’t run by the practice and charges a cash fee. Street parking in the neighborhood is limited and closely signed, so budget a few extra minutes if you plan to hunt for a spot.",
      },
      {
        question: "Will my PPO insurance cover cosmetic work?",
        answer:
          "Coverage depends on your plan, and purely cosmetic treatment is often not covered. We verify PPO benefits before treatment, tell you what your plan is likely to pay, and explain the remaining costs before anything begins.",
      },
    ],
    relatedServices: [
      { label: "Zoom Whitening", href: "/zoom-whitening" },
      { label: "Porcelain Veneers", href: "/veneers" },
      { label: "Pain-Free Dentistry", href: "/pain-free-dentistry" },
    ],
    practiceLocation: {
      heading: "Visit Exquisite Dentistry from Melrose",
      description:
        "From the Melrose shopping and studio corridor, head south on Fairfax Avenue or Crescent Heights Boulevard to Wilshire. Our studio is at 6227 Wilshire Blvd, at the western end of the Miracle Mile, a few blocks west of the Wilshire and Fairfax museum corner.",
      highlights: [
        "Short surface-street drive south via Fairfax or Crescent Heights",
        "Paid parking lot at the building; rideshare drop-off is easy",
        "Same-day repair appointments when the schedule allows",
      ],
    },
    doctorSection: createDoctorSection([
      "Creative professionals from the Melrose corridor see Dr. Alexie Aguil for cosmetic dentistry with a fast, careful turnaround — whitening before a shoot, bonding for a chip, veneers planned around production calendars.",
      "Dr. Aguil pairs an artistic eye for shade and proportion with more than 15 years of clinical experience in Los Angeles. Digital mockups and iTero scans let you preview and approve changes before treatment starts.",
    ]),
  }),

  "westwood-dentist": createLocationConfig({
    slug: "westwood-dentist",
    cityLabel: "Westwood",
    description:
      "From UCLA grads to Century City executives, patients head east for boutique dentistry that respects tight calendars. We prioritize punctual starts, virtual follow-ups, and express hygiene blocks before big meetings.",
    heroStats: [
      { label: "Morning starts, Mon–Thu", value: "8AM" },
      { label: "Years of experience", value: "15+" },
      { label: "Benefits verified before treatment", value: "PPO" },
    ],
    highlights: [
      "Morning and lunchtime visits",
      "Virtual financial + treatment reviews",
      "Collaboration with orthodontic specialists",
    ],
    services: [
      "Invisalign treatment that fits grad school interviews and client decks",
      "Porcelain veneers for polished presentations and media days",
      "Preventive cleanings with VELscope screenings at every visit",
      "Oral cancer screenings that support long-term wellness goals",
    ],
    testimonials: [
      {
        quote: "Driving from Westwood is worth it, appointments start on time and the results are unmatched.",
        author: "Emily R.",
      },
    ],
    faqs: [
      {
        question: "What’s the easiest route from Westwood?",
        answer:
          "Wilshire Boulevard runs straight from Westwood through Beverly Hills to our door. The office is at 6227 Wilshire Blvd near Crescent Heights — stay on Wilshire the whole way and watch for the Miracle Mile’s museum row as you approach.",
      },
      {
        question: "Do appointments actually start on time?",
        answer:
          "We schedule deliberately so visits begin when they are booked, and patients regularly mention punctuality in their reviews. If you have a hard stop, tell us when you book and we will plan the visit to fit.",
      },
      {
        question: "Where do I park when I arrive?",
        answer:
          "Use the paid lot at the building — it is separately operated and charges a cash fee. Street parking on the surrounding blocks is limited, so the lot is usually the faster choice before a timed appointment.",
      },
      {
        question: "Can you verify my PPO plan before I commit to treatment?",
        answer: `Yes. Send your insurance details ahead of your visit or call ${PHONE_NUMBER_DISPLAY}, and our team will verify your specific PPO benefits and walk you through estimated coverage before treatment.`,
      },
    ],
    relatedServices: [
      { label: "Invisalign", href: "/invisalign" },
      { label: "Teeth Cleaning", href: "/teeth-cleaning" },
      { label: "Oral Cancer Screening", href: "/oral-cancer-screening" },
    ],
    practiceLocation: {
      heading: "Visit Exquisite Dentistry from Westwood",
      description:
        "Our studio is at 6227 Wilshire Blvd near Crescent Heights, at the western end of the Miracle Mile. From Westwood or Century City, it is one continuous drive east on Wilshire Boulevard — no freeway, no turns until you arrive.",
      highlights: [
        "Straight shot east on Wilshire Boulevard",
        "8AM starts for appointments before campus or the office",
        "Paid on-site parking; rideshare drop-off at the entrance",
      ],
    },
    doctorSection: createDoctorSection([
      "Westwood students, faculty, and Century City professionals come east on Wilshire for dentistry that respects their time. Dr. Alexie Aguil keeps visits punctual and focused, with Invisalign, cleanings, and cosmetic care planned around real deadlines.",
      "A USC School of Dentistry graduate and Invisalign Lifetime Achievement Award provider, Dr. Aguil has practiced in Los Angeles for more than 15 years. VELscope screenings and iTero scans are part of routine care, not add-ons.",
    ]),
  }),

  "miracle-mile-dentist": createLocationConfig({
    slug: "miracle-mile-dentist",
    cityLabel: "Miracle Mile",
    description:
      "Exquisite Dentistry sits on Wilshire Boulevard at Crescent Heights, on the western end of the Miracle Mile. If you live or work near Museum Row, preventive, cosmetic, and restorative care is a short walk or drive away.",
    heroHeading: "Your Dentist in the Miracle Mile",
    heroStats: [
      { label: "Wilshire Blvd, Miracle Mile", value: "6227" },
      { label: "Caring for LA smiles", value: "Since 2006" },
      { label: "Appointments 8AM–6PM", value: "Mon–Thu" },
    ],
    extraKeywords: ["museum row dentist"],
    highlights: [
      "A short walk from Museum Row offices and the Wilshire corridor",
      "Paid parking lot at the building for patients who drive",
      "8AM starts Monday through Thursday for before-work visits",
    ],
    services: [
      "Teeth cleanings with VELscope oral cancer screenings",
      "Zoom whitening completed in a single office visit",
      "Porcelain veneers planned with iTero digital impressions",
      "Same-day care for toothaches and broken teeth",
    ],
    testimonials: [
      {
        quote: "My favorite thing is how punctual they are. No waiting around, efficient and friendly.",
        author: "David Nguyen",
      },
    ],
    faqs: [
      {
        question: "Can I walk over from Museum Row?",
        answer:
          "Yes. The office is at 6227 Wilshire Blvd, near Wilshire and Crescent Heights — a few blocks west of the museum corner at Wilshire and Fairfax. Many patients who work along the corridor walk to their appointments.",
      },
      {
        question: "Is there parking if I drive?",
        answer:
          "A paid parking lot operates on-site at the building. It is not run by the practice and charges a cash fee. Street parking in the blocks around the Miracle Mile is limited and closely signed, so check postings carefully.",
      },
      {
        question: "Do you see patients before work?",
        answer:
          "Yes. We open at 8AM Monday through Thursday, which works well for cleanings or check-ups before the workday starts along the corridor. Early slots fill first, so book ahead when you can.",
      },
      {
        question: "Will you check my PPO benefits first?",
        answer: `Yes. If you have a PPO dental plan, there is a strong chance we can help you use your benefits. Call ${PHONE_NUMBER_DISPLAY} or send us your plan details and we will verify your coverage before treatment.`,
      },
    ],
    relatedServices: [
      { label: "Teeth Cleaning", href: "/teeth-cleaning" },
      { label: "Zoom Whitening", href: "/zoom-whitening" },
      { label: "Porcelain Veneers", href: "/veneers" },
      { label: "Emergency Dentistry", href: "/emergency-dentist/" },
    ],
    practiceLocation: {
      heading: "Our Home on the Miracle Mile",
      description:
        "This is our own neighborhood. Exquisite Dentistry is at 6227 Wilshire Blvd, near Crescent Heights, at the western end of the Miracle Mile — a short walk from Museum Row and the offices along the Wilshire corridor.",
      highlights: [
        "On Wilshire Boulevard, a few blocks west of the Wilshire and Fairfax museum corner",
        "Walkable for corridor workers; paid on-site lot for drivers",
        "Open Monday through Thursday, 8AM to 6PM",
      ],
    },
    doctorSection: createDoctorSection([
      "The Miracle Mile is where Dr. Alexie Aguil practices every day — his studio has been part of the Wilshire corridor’s working life since 2006. Neighbors come in for cleanings and exams, whitening, Invisalign, and restorative care without leaving the district.",
      "Dr. Aguil is a USC School of Dentistry graduate with more than 15 years of experience. Appointments are calm and unhurried, with digital x-rays, iTero scanning, and VELscope screenings built into routine visits.",
    ]),
    ctaHeading: "Visit Your Neighborhood Dentist",
    ctaDescription:
      "Our studio is part of the Miracle Mile itself — on Wilshire Boulevard near Crescent Heights, a short walk or drive from anywhere in the district.",
  }),

  "larchmont-dentist": createLocationConfig({
    slug: "larchmont-dentist",
    cityLabel: "Larchmont",
    description:
      "A calm, comfort-focused dental studio a short drive west of Larchmont Village along Beverly Boulevard or Third Street. Larchmont patients visit us for cleanings, Invisalign, veneers, and whitening planned around everyday schedules.",
    heroStats: [
      { label: "Caring for LA smiles", value: "Since 2006" },
      { label: "Appointments 8AM–6PM", value: "Mon–Thu" },
      { label: "Benefits verified before treatment", value: "PPO" },
    ],
    highlights: [
      "A short drive west along Beverly Boulevard or Third Street",
      "Morning and midday appointments Monday through Thursday",
      "PPO benefits verified before treatment begins",
    ],
    services: [
      "Invisalign clear aligners monitored with iTero digital scanning",
      "Professional whitening, in-office or take-home",
      "Routine cleanings and exams for adults",
      "Cosmetic bonding and veneers for chips and worn edges",
    ],
    testimonials: [
      {
        quote:
          "Excellent practice. Got me in quickly, everyone was nice and thorough, and Dr. Aguil explained everything clearly.",
        author: "Alex S. Wolff",
      },
    ],
    faqs: [
      {
        question: "How do I get there from Larchmont Village?",
        answer:
          "Head west on Beverly Boulevard or Third Street, then south on Crescent Heights Boulevard or Fairfax Avenue to Wilshire. The office is at 6227 Wilshire Blvd, near Wilshire and Crescent Heights — a short drive on surface streets the whole way.",
      },
      {
        question: "Where do I park when I arrive?",
        answer:
          "A paid parking lot operates at our building; it is separately run and charges a cash fee. Street parking around the office is limited — different from Larchmont Boulevard’s metered spots — so most patients use the lot.",
      },
      {
        question: "I’m interested in Invisalign. How does it start?",
        answer:
          "It starts with a consultation and an iTero digital scan — no impression trays. Dr. Aguil reviews whether Invisalign suits your alignment goals, walks you through the expected timeline, and gives you costs before anything begins.",
      },
      {
        question: "Can you verify my dental insurance?",
        answer: `Yes. We work with many PPO plans, and benefits vary by plan, so we check coverage before treatment. Call ${PHONE_NUMBER_DISPLAY} or send your plan details and the team will confirm what applies to your visit.`,
      },
    ],
    relatedServices: [
      { label: "Invisalign", href: "/invisalign" },
      { label: "Professional Whitening", href: "/teeth-whitening" },
      { label: "Teeth Cleaning", href: "/teeth-cleaning" },
    ],
    practiceLocation: {
      heading: "Visit Exquisite Dentistry from Larchmont",
      description:
        "From Larchmont Village, the office is a short drive west: take Beverly Boulevard or Third Street, then drop south on Crescent Heights or Fairfax to Wilshire. We’re at 6227 Wilshire Blvd, at the western end of the Miracle Mile.",
      highlights: [
        "Surface-street route west via Beverly Boulevard or Third Street",
        "Paid parking lot on-site at the building",
        "Appointments Monday through Thursday, 8AM to 6PM",
      ],
    },
    doctorSection: createDoctorSection([
      "Larchmont patients make the short drive west for dentistry that feels like the Village itself — personal, unhurried, and consistent. Dr. Alexie Aguil handles cleanings, Invisalign, veneers, and whitening with the same team at every visit.",
      "A USC School of Dentistry graduate and Invisalign Lifetime Achievement Award provider, Dr. Aguil has cared for Los Angeles patients since 2006. Treatment plans are explained clearly, including what your PPO plan is likely to cover.",
    ]),
  }),

  "hancock-park-dentist": createLocationConfig({
    slug: "hancock-park-dentist",
    cityLabel: "Hancock Park",
    description:
      "Hancock Park sits between Larchmont Village and our Wilshire Boulevard studio, so appointments are a short drive west along Wilshire, Sixth Street, or Third Street. We provide preventive, cosmetic, and restorative dentistry for adults.",
    heroStats: [
      { label: "Years of experience", value: "15+" },
      { label: "A practice focused on adult care", value: "Adults" },
      { label: "Appointments 8AM–6PM", value: "Mon–Thu" },
    ],
    highlights: [
      "A short drive west along Wilshire Boulevard, Sixth Street, or Third Street",
      "Quiet, private treatment rooms with comfort amenities",
      "An adults-focused practice with unhurried appointments",
    ],
    services: [
      "Porcelain veneers designed around facial proportion and shade",
      "Dental crowns matched carefully to neighboring teeth",
      "Preventive cleanings with VELscope oral cancer screenings",
      "Invisalign for gradual, discreet alignment",
    ],
    testimonials: [
      {
        quote: "Been a patient for over seven years, always feel safe, cared for, and treated with respect.",
        author: "Laurie Schaffler",
      },
    ],
    faqs: [
      {
        question: "What’s the best way there from Hancock Park?",
        answer:
          "Wilshire Boulevard, Sixth Street, and Third Street all run west from Hancock Park toward the office. We’re at 6227 Wilshire Blvd, near Wilshire and Crescent Heights — just past the Museum Row stretch of the Miracle Mile.",
      },
      {
        question: "Is parking difficult near the office?",
        answer:
          "There is a paid parking lot on-site at the building (separately operated, cash fee). Street parking in the surrounding blocks is limited and permit-signed in places, so the lot is the reliable option.",
      },
      {
        question: "Do you see children?",
        answer:
          "Exquisite Dentistry focuses on the treatment and comfort of adults. If you’re looking for care for your children, we’re happy to recommend a pediatric dental office nearby.",
      },
      {
        question: "How do you handle insurance?",
        answer:
          "If you carry a PPO dental plan, there is a strong chance we can help you use your benefits. Because plans differ, we verify your specific coverage before treatment and go over estimated costs with you first.",
      },
    ],
    relatedServices: [
      { label: "Porcelain Veneers", href: "/veneers" },
      { label: "Dental Crowns", href: "/dental-crowns" },
      { label: "Teeth Cleaning", href: "/teeth-cleaning" },
    ],
    practiceLocation: {
      heading: "Visit Exquisite Dentistry from Hancock Park",
      description:
        "Our studio is at 6227 Wilshire Blvd near Crescent Heights, a straight drive west of Hancock Park. Take Wilshire past Museum Row, or come across on Sixth or Third Street and drop down to Wilshire at Fairfax or Crescent Heights.",
      highlights: [
        "Direct route west on Wilshire Boulevard past Museum Row",
        "Paid on-site parking lot; rideshare drop-off at the entrance",
        "Quiet appointment times available for unhurried visits",
      ],
    },
    doctorSection: createDoctorSection([
      "Hancock Park residents drive a few minutes west on Wilshire for dentistry that matches the neighborhood’s pace — considered, consistent, and private. Dr. Alexie Aguil plans veneers, crowns, and preventive care with attention to how results will look and function for years.",
      "Dr. Aguil is a USC School of Dentistry graduate with more than 15 years of experience, and the practice has served the surrounding Wilshire corridor since 2006. The office focuses on adult care, with comfort amenities at every visit.",
    ]),
  }),

  "mid-wilshire-dentist": createLocationConfig({
    slug: "mid-wilshire-dentist",
    cityLabel: "Mid-Wilshire",
    description:
      "Our studio is part of the Mid-Wilshire corridor itself, at 6227 Wilshire Blvd near Crescent Heights. Neighbors from Park La Brea to the surrounding blocks rely on us for cleanings, cosmetic dentistry, and same-day help when something breaks.",
    heroStats: [
      { label: "Our zip code on the corridor", value: "90048" },
      { label: "Caring for LA smiles", value: "Since 2006" },
      { label: "Emergency appointments", value: "Same-day" },
    ],
    extraKeywords: ["wilshire boulevard dentist"],
    highlights: [
      "On Wilshire Boulevard at Crescent Heights, in the 90048 zip code",
      "Metro buses along Wilshire stop close to the office",
      "Same-day emergency appointments when something can’t wait",
    ],
    services: [
      "Comprehensive exams, cleanings, and digital x-rays",
      "Cosmetic dentistry, from whitening to full smile design",
      "Dental implants planned with 3D imaging",
      "Crowns and root canal treatment handled in one practice",
    ],
    testimonials: [
      {
        quote:
          "I’ve been coming here for about 8 years and even brought friends. Always pleased with the level of care and professionalism!",
        author: "Angela K Thomas",
      },
    ],
    faqs: [
      {
        question: "Where exactly is the office?",
        answer:
          "At 6227 Wilshire Blvd, Los Angeles, CA 90048 — on Wilshire near Crescent Heights, at the western end of the Miracle Mile. If you live or work anywhere along the Mid-Wilshire corridor, you pass within blocks of us regularly.",
      },
      {
        question: "Can I get there without a car?",
        answer:
          "Yes. Metro buses run along Wilshire Boulevard and stop close to the office, and neighbors from Park La Brea and the surrounding blocks often walk. If you drive, a paid lot operates at the building (cash fee, separately run).",
      },
      {
        question: "What if I have a dental emergency?",
        answer: `Call ${PHONE_NUMBER_DISPLAY} as early as you can. We offer same-day treatment for toothaches, fractures, and other urgent problems whenever the schedule allows, and we will tell you honestly what can be done that day.`,
      },
      {
        question: "Do you verify PPO insurance benefits?",
        answer:
          "Yes. We work with many PPO plans and PPO network relationships, and coverage varies by plan — so send us your insurance details and our team will verify your benefits before treatment starts.",
      },
    ],
    relatedServices: [
      { label: "Cosmetic Dentistry", href: "/cosmetic-dentistry" },
      { label: "Dental Implants", href: "/dental-implants" },
      { label: "Teeth Cleaning", href: "/teeth-cleaning" },
      { label: "Emergency Dentistry", href: "/emergency-dentist/" },
    ],
    practiceLocation: {
      heading: "Our Office on the Mid-Wilshire Corridor",
      description:
        "Exquisite Dentistry sits directly on the corridor at 6227 Wilshire Blvd, near Crescent Heights. Whether you come along Wilshire itself, Sixth Street, or Third Street, the office is on your everyday route rather than a trip across town.",
      highlights: [
        "Directly on Wilshire Boulevard — no detour from the corridor",
        "Wilshire bus stops nearby; paid on-site lot for drivers",
        "Open Monday through Thursday, 8AM to 6PM",
      ],
    },
    doctorSection: createDoctorSection([
      "Mid-Wilshire is home ground for Dr. Alexie Aguil — his practice has been part of the corridor since 2006. Patients from Park La Brea, the Miracle Mile, and the surrounding blocks come in for everything from routine cleanings to implants and full cosmetic planning.",
      "A USC School of Dentistry graduate with more than 15 years of experience, Dr. Aguil keeps care in one place: digital x-rays, iTero scanning, VELscope screenings, and restorative treatment under one roof, with PPO benefits verified before work begins.",
    ]),
    ctaHeading: "Visit Us on the Wilshire Corridor",
    ctaDescription:
      "We’re on Wilshire Boulevard near Crescent Heights — part of the Mid-Wilshire neighborhood, not a commute from it.",
  }),

  "koreatown-dentist": createLocationConfig({
    slug: "koreatown-dentist",
    cityLabel: "Koreatown",
    description:
      "For Koreatown patients, our studio is a straight drive west along Wilshire Boulevard, past Hancock Park and Museum Row. We offer preventive care, Invisalign, whitening, and implant dentistry in a quiet, comfort-focused setting.",
    heroStats: [
      { label: "Years of experience", value: "15+" },
      { label: "Benefits verified before treatment", value: "PPO" },
      { label: "Monday through Thursday", value: "8AM–6PM" },
    ],
    highlights: [
      "A straight drive west on Wilshire Boulevard, no freeway required",
      "Paid parking at the building when you arrive",
      "Appointments Monday through Thursday, 8AM to 6PM",
    ],
    services: [
      "Invisalign treatment monitored with iTero digital scans",
      "Zoom whitening before milestones and photos",
      "Dental implants for single teeth or larger restorations",
      "Gentle cleanings with VELscope oral cancer screenings",
    ],
    testimonials: [
      {
        quote:
          "Very pleasant experience with the doctor, staff, and hygienist. They were accommodating and super friendly.",
        author: "Hannah Han",
      },
    ],
    faqs: [
      {
        question: "How long is the trip from Koreatown?",
        answer:
          "It’s a straight drive west on Wilshire Boulevard — you stay on one street from Koreatown, past Hancock Park and Museum Row, to our door at 6227 Wilshire Blvd near Crescent Heights. Sixth Street is a good parallel alternative when Wilshire is busy.",
      },
      {
        question: "Is parking easier than in Koreatown?",
        answer:
          "There is a paid parking lot on-site at our building — it is separately operated and charges a cash fee. Street parking nearby is limited, so the lot is the dependable choice; rideshare drop-off at the entrance also works well.",
      },
      {
        question: "What cosmetic treatments do you offer?",
        answer:
          "Whitening, cosmetic bonding, porcelain veneers, and Invisalign are the most common requests. Every plan starts with a consultation and an iTero digital scan, and Dr. Aguil explains options and costs before you decide anything.",
      },
      {
        question: "Can you work with my PPO dental plan?",
        answer: `If you have a PPO plan, there is a strong chance we can help you use your benefits. Call ${PHONE_NUMBER_DISPLAY} or send your plan information and our team will verify your specific coverage before treatment.`,
      },
    ],
    relatedServices: [
      { label: "Invisalign", href: "/invisalign" },
      { label: "Zoom Whitening", href: "/zoom-whitening" },
      { label: "Dental Implants", href: "/dental-implants" },
    ],
    practiceLocation: {
      heading: "Visit Exquisite Dentistry from Koreatown",
      description:
        "The office is at 6227 Wilshire Blvd near Crescent Heights, at the western end of the Miracle Mile. From Koreatown, stay on Wilshire Boulevard heading west — one street, no freeway — or take Sixth Street and drop down at Fairfax.",
      highlights: [
        "One-street route: Wilshire Boulevard west from Koreatown",
        "Paid on-site parking lot at the building",
        "PPO benefits verified before treatment when you send plan details",
      ],
    },
    doctorSection: createDoctorSection([
      "Koreatown patients follow Wilshire west to see Dr. Alexie Aguil for preventive, cosmetic, and implant dentistry in a quieter setting. Appointments are unhurried, and treatment plans are explained clearly — including timelines and costs — before anything begins.",
      "Dr. Aguil is a USC School of Dentistry graduate and an Invisalign Lifetime Achievement Award provider with more than 15 years of experience. His practice has served the Wilshire corridor since 2006.",
    ]),
  }),

  "fairfax-district-dentist": createLocationConfig({
    slug: "fairfax-district-dentist",
    cityLabel: "Fairfax District",
    description:
      "The Fairfax District sits directly north of our office, so visits from The Grove, the Original Farmers Market, or Fairfax Avenue are a quick trip south to Wilshire Boulevard. We keep appointments calm, unhurried, and on schedule.",
    heroStats: [
      { label: "Caring for LA smiles", value: "Since 2006" },
      { label: "Emergency appointments", value: "Same-day" },
      { label: "Appointments 8AM–6PM", value: "Mon–Thu" },
    ],
    highlights: [
      "Directly south of the district via Fairfax Avenue or Crescent Heights Boulevard",
      "Close to The Grove and the Original Farmers Market",
      "Comfort-first visits with warm blankets and noise-canceling headphones",
    ],
    services: [
      "Routine cleanings and exams that start on time",
      "Porcelain veneers and cosmetic bonding",
      "Invisalign for adults with busy schedules",
      "Pain-free dentistry options for anxious patients",
    ],
    testimonials: [
      {
        quote:
          "Dr. Aguil is an amazing dentist, patient, efficient, and professional. The staff is always welcoming and warm.",
        author: "Natasha Espiedra",
      },
    ],
    faqs: [
      {
        question: "How close are you to The Grove and the Farmers Market?",
        answer:
          "Very close. From Third and Fairfax, head south on Fairfax Avenue to Wilshire Boulevard, then west a few blocks to Crescent Heights. The office is at 6227 Wilshire Blvd, on the western end of the Miracle Mile.",
      },
      {
        question: "Should I drive or can I walk?",
        answer:
          "Most Fairfax District patients drive or take a short rideshare, since the office sits at the district’s southern edge on Wilshire. If you drive, a paid lot operates at the building (cash fee, separately run); street parking nearby is limited.",
      },
      {
        question: "I get nervous at the dentist. How do you handle that?",
        answer:
          "The office is designed to feel more like a spa than a clinic — soft lighting, warm blankets, neck pillows, and noise-canceling headphones. Pain-free dentistry options are available, and Dr. Aguil keeps you informed at every step.",
      },
      {
        question: "Do you accept PPO insurance plans?",
        answer:
          "Yes — many PPO plans can be used at the practice, and there is a strong chance we can help with yours. We verify your benefits before treatment so you know what your plan covers and what your costs will be.",
      },
    ],
    relatedServices: [
      { label: "Teeth Cleaning", href: "/teeth-cleaning" },
      { label: "Porcelain Veneers", href: "/veneers" },
      { label: "Invisalign", href: "/invisalign" },
      { label: "Pain-Free Dentistry", href: "/pain-free-dentistry" },
    ],
    practiceLocation: {
      heading: "Visit Exquisite Dentistry from the Fairfax District",
      description:
        "We’re just south of the Fairfax District at 6227 Wilshire Blvd, near Wilshire and Crescent Heights. From The Grove or the Farmers Market, take Fairfax Avenue south to Wilshire and turn west — the office is a few blocks along, past the museum corner.",
      highlights: [
        "Quick trip south on Fairfax Avenue or Crescent Heights Boulevard",
        "Paid parking lot at the building; rideshare drop-off is simple",
        "Same-day appointments for urgent problems when the schedule allows",
      ],
    },
    doctorSection: createDoctorSection([
      "For Fairfax District neighbors, Dr. Alexie Aguil is the dentist just down the street — his studio sits at the district’s southern edge on Wilshire Boulevard. Patients come for routine care, cosmetic work, and a calmer experience than they expect from a dental visit.",
      "Dr. Aguil has cared for this part of Los Angeles since 2006. A USC School of Dentistry graduate, he combines careful clinical work with genuine attention to comfort, and his team verifies PPO benefits before treatment begins.",
    ]),
    ctaHeading: "Visit Us From the Fairfax District",
    ctaDescription:
      "We’re just down Fairfax at Wilshire and Crescent Heights — a quick trip from anywhere in the district.",
  }),
};
