import { SCHEDULING_URL } from "@/constants/urls";

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

const sharedFaqs = [
  {
    question: "Do you see new patients from this neighborhood?",
    answer:
      "Absolutely. Many of our patients live, work, or film near this neighborhood. We keep flexible hours and concierge scheduling to make appointments convenient.",
  },
  {
    question: "Is parking available?",
    answer:
      "Yes. Enjoy validated parking in our building plus ride-share friendly drop-offs. Let us know if you need additional assistance.",
  },
  {
    question: "What services are most popular locally?",
    answer:
      "Cosmetic smile upgrades, preventive care with VELscope® screenings, Invisalign, and spa-level hygiene visits are common requests from neighbors in this area.",
  },
];

const createLocationConfig = (
  slug: string,
  cityLabel: string,
  description: string,
  highlights: string[],
  services: string[],
  quote: { quote: string; author: string },
  relatedServices: Array<{ label: string; href: string }>
): LocationPageConfig => ({
  slug,
  cityLabel,
  seo: {
    title: `${cityLabel} Dentist | Exquisite Dentistry in Los Angeles`,
    description,
    keywords: [`${cityLabel.toLowerCase()} dentist`, `${cityLabel.toLowerCase()} cosmetic dentist`, "west hollywood dentist"],
  },
  hero: {
    heading: `${cityLabel}’s Boutique Dental Experience`,
    subheading: description,
    stats: [
      { label: "Years serving LA", value: "15+" },
      { label: "Smile transformations", value: "2,400+" },
      { label: "Avg. Google rating", value: "4.9/5" },
    ],
  },
  neighborhoodHighlights: highlights,
  signatureServices: services,
  testimonials: [quote],
  relatedServices,
  faqs: sharedFaqs,
  cta: {
    heading: `Visit Us From ${cityLabel}`,
    description: "Our Wilshire Boulevard studio is a quick drive from your neighborhood.",
    primaryText: "Schedule Online",
    primaryHref: SCHEDULING_URL,
    secondaryText: "Call (323) 272-2388",
    secondaryHref: "tel:+13232722388",
  },
});

export const locationPageConfigs: Record<string, LocationPageConfig> = {
  "west-hollywood-dentist": createLocationConfig(
    "west-hollywood-dentist",
    "West Hollywood",
    "Minutes from the Sunset Strip and Melrose, our dental studio delivers Beverly Grove convenience with West Hollywood style. Expect hush-hush operatories, late appointments during award season, and concierge touches curated for on-camera schedules.",
    [
      "Easy access from Santa Monica Blvd. and Fairfax",
      "Late-morning and early-evening appointments",
      "Creative-friendly amenities for on-camera schedules",
    ],
    [
      "Porcelain veneers for camera-ready smiles and close-up confidence",
      "Zoom whitening boosts scheduled before premieres and panels",
      "Emergency dentistry with discreet same-day relief and sedation",
      "Invisalign programs tailored to entertainment professionals"
    ],
    { quote: "They treat you like family in the heart of West Hollywood. Comfort, privacy, and stunning results.", author: "Shannon L." },
    [
      { label: "Porcelain Veneers", href: "/veneers" },
      { label: "Zoom Whitening", href: "/zoom-whitening" },
      { label: "Teeth Cleaning", href: "/teeth-cleaning" }
    ]
  ),
  "beverly-hills-dentist": createLocationConfig(
    "beverly-hills-dentist",
    "Beverly Hills",
    "Concierge-level cosmetic dentistry a short drive east of Rodeo Drive with discreet, private treatment rooms. Private entries, NDA-friendly visits, and same-day coordination with your glam squad keep every reveal seamless.",
    [
      "Complimentary beverage and comfort menu",
      "Coordinated rideshare or car service",
      "Collaboration with Beverly Hills surgeons and dermatologists",
    ],
    [
      "Smile makeovers that pair veneers, crowns, and whitening for flawless symmetry",
      "Porcelain veneers crafted with Beverly Hills ceramists for natural brilliance",
      "Dental implants planned with advanced imaging for enduring bite strength",
      "Full-mouth reconstruction that balances function, health, and high fashion"
    ],
    { quote: "A Beverly Hills-level experience without crossing town. My veneers look flawless.", author: "Taylor V." },
    [
      { label: "Cosmetic Dentistry", href: "/cosmetic-dentistry" },
      { label: "Dental Implants", href: "/dental-implants" },
      { label: "Dental Crowns", href: "/dental-crowns" }
    ]
  ),
  "culver-city-dentist": createLocationConfig(
    "culver-city-dentist",
    "Culver City",
    "Preferred by studio professionals and tech teams commuting up La Cienega for elevated preventive and cosmetic care. We sync treatment plans with shoot calendars, investor meetings, and hybrid workweeks so nothing slows momentum.",
    [
      "Flexible scheduling around production timelines",
      "Text-first communication for busy calendars",
      "Streaming, Wi-Fi, and productivity-friendly lounges",
    ],
    [
      "Teeth cleanings with VELscope screenings for proactive wellness",
      "Invisalign treatment that adapts to hybrid work and travel",
      "Professional teeth whitening (in-office and take-home) timed around headshots and events",
      "Dental crowns that restore durability without sacrificing aesthetics"
    ],
    { quote: "Worth the quick drive from Culver City. Efficient, luxurious, and always on schedule.", author: "Nick S." },
    [
      { label: "Teeth Whitening Near Culver City", href: "/culver-city-teeth-whitening" },
      { label: "Zoom Whitening", href: "/zoom-whitening" },
      { label: "Invisalign", href: "/invisalign" },
      { label: "Teeth Cleaning", href: "/teeth-cleaning" }
    ]
  ),
  "west-la-dentist": createLocationConfig(
    "west-la-dentist",
    "West LA",
    "Access advanced cosmetic and restorative care without the commute downtown—our studio sits conveniently off Wilshire. Enjoy valet-friendly arrival, digital consultations, and treatment plans that respect Westside commutes.",
    [
      "Easy access from the 10 and 405",
      "Valet-friendly entrance",
      "Virtual consultations for busy professionals",
    ],
    [
      "Dental implants placed with precision guides for lasting stability",
      "Cosmetic bonding to refresh chips from daily wear and tear",
      "Emergency care that saves commutes with rapid response times",
      "Teeth whitening packages coordinated around board meetings and events"
    ],
    { quote: "Driving in from West LA is simple and the team makes every visit feel restorative.", author: "Chris R." },
    [
      { label: "Dental Implants", href: "/dental-implants" },
      { label: "Emergency Dentistry", href: "/emergency-dentist" },
      { label: "Professional Whitening", href: "/teeth-whitening" }
    ]
  ),
  "bel-air-dentist": createLocationConfig(
    "bel-air-dentist",
    "Bel Air",
    "Luxury-driven dentistry with tight confidentiality, ideal for Bel Air residents seeking a polished smile experience. Private lounge service, personalized sedation, and rapid lab turnarounds keep elite calendars on track.",
    [
      "Private bookings & NDA-friendly appointments",
      "On-site concierge for custom requests",
      "High-end sterilization and air purification protocols",
    ],
    [
      "Smile design consultations that consider facial harmony and on-camera poise",
      "Porcelain crowns that reinforce strength while matching natural translucency",
      "TMJ therapy to relieve clenching brought on by high-pressure calendars",
      "Holistic preventive care with spa-level comforts and aromatherapy"
    ],
    { quote: "Discreet, detail-oriented dentistry that matches Bel Air expectations.", author: "Virginia M." },
    [
      { label: "Porcelain Veneers", href: "/veneers" },
      { label: "Dental Crowns", href: "/dental-crowns" },
      { label: "Teeth Cleaning", href: "/teeth-cleaning" }
    ]
  ),
  "90048-dentist": createLocationConfig(
    "90048-dentist",
    "90048",
    "Your neighborhood dentist in the 90048 zip code—walkable for locals and convenient for Cedars-Sinai teams. Stop in between rounds or lunch breaks for modern preventive care, whitening boosts, and same-day fixes.",
    [
      "Steps from the Beverly Center and Cedars-Sinai",
      "Validated parking + EV charging nearby",
      "Same-day emergency availability",
    ],
    [
      "Preventive cleanings with gentle techniques for sensitive enamel",
      "Whitening boosts that refresh your smile between client dinners",
      "Dental bridges that close gaps quickly when implants aren’t ideal",
      "Invisalign Express options for subtle alignment on tighter timelines"
    ],
    { quote: "Living in 90048 means Exquisite Dentistry is my go-to spot for quick, beautiful care.", author: "Alex D." },
    [
      { label: "Teeth Cleaning", href: "/teeth-cleaning" },
      { label: "Dental Bridge", href: "/dental-bridge" },
      { label: "Invisalign", href: "/invisalign" }
    ]
  ),
  "melrose-dentist": createLocationConfig(
    "melrose-dentist",
    "Melrose",
    "Creative professionals along Melrose trust us for cosmetic touch-ups before events, premieres, and photoshoots. On-demand whitening, veneer repairs, and pain-free visits keep you camera ready every day of the week.",
    [
      "Last-minute whitening and bonding",
      "Extended hours during awards season",
      "Digital mockups for on-set approval",
    ],
    [
      "Zoom whitening for bold on-stage sparkle",
      "Porcelain veneers that elevate branding shoots and headshots",
      "Same-day repairs for chipped teeth between rehearsals",
      "Pain-free dentistry with NuCalm-style relaxation methods"
    ],
    { quote: "Perfect for quick smile upgrades between shoots on Melrose.", author: "Brandon G." },
    [
      { label: "Zoom Whitening", href: "/zoom-whitening" },
      { label: "Porcelain Veneers", href: "/veneers" },
      { label: "Pain-Free Dentistry", href: "/pain-free-dentistry" }
    ]
  ),
  "westwood-dentist": createLocationConfig(
    "westwood-dentist",
    "Westwood",
    "From UCLA grads to Century City executives, patients head east for boutique dentistry that respects tight calendars. We prioritize punctual starts, virtual follow-ups, and express hygiene blocks before big meetings.",
    [
      "Morning and lunchtime visits",
      "Virtual financial + treatment reviews",
      "Collaboration with orthodontic specialists",
    ],
    [
      "Invisalign treatment that fits grad school interviews and client decks",
      "Porcelain veneers for polished presentations and media days",
      "Preventive cleanings with VELscope screenings at every visit",
      "Oral cancer screenings that support long-term wellness goals"
    ],
    { quote: "Driving from Westwood is worth it—appointments start on time and the results are unmatched.", author: "Emily R." },
    [
      { label: "Invisalign", href: "/invisalign" },
      { label: "Teeth Cleaning", href: "/teeth-cleaning" },
      { label: "Oral Cancer Screening", href: "/oral-cancer-screening" }
    ]
  ),
};
