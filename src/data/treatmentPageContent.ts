/**
 * Text content for treatment pages whose copy used to live inline in the page
 * components. The React pages and the static prerender (scripts/prerender-static.ts)
 * both read from here, so crawlers that don't run JavaScript get the same copy.
 * Keep this file JSX-free: the prerender loads it in plain Node.
 */
import { PRACTICE_FACTS } from '@/data/practiceFacts';

export const INVISALIGN_BENEFITS = [
  {
    title: "Discreet & Confident",
    description: "Clear aligners stay discreet in photos, meetings, and evenings out around Los Angeles."
  },
  {
    title: "Predictable Timelines",
    description: "Digital treatment plans and weekly aligner changes get most adults to the finish line in 6 to 12 months."
  },
  {
    title: "Comfortable Progress",
    description: "Smooth medical-grade plastic minimizes irritation and eliminates emergencies from broken brackets."
  },
  {
    title: "Lifestyle Friendly",
    description: "Remove aligners to enjoy restaurant tastings, audition work, and daily coffee without restrictions."
  }
] as const;

export const INVISALIGN_MILESTONES = [
  {
    step: "Week 0",
    title: "Digital Smile Mapping",
    description: "iTero 3D scans create a precise model of your bite, while we preview tooth movements with ClinCheck simulations."
  },
  {
    step: "Weeks 2 to 6",
    title: "Trackable Progress",
    description: "Receive micro-adjusted aligners that guide teeth gently into position; virtual check-ins keep you on pace between in-person visits."
  },
  {
    step: "Weeks 12 to 24",
    title: "Refinements & Detailing",
    description: "Attachments and IPR, when indicated, refine the finishing details for an even, balanced occlusion."
  },
  {
    step: "Graduation",
    title: "Retention & Finishing",
    description: "Whitening touch-ups, Vivera retainers, and smile contouring help keep your results stable over time."
  }
] as const;

export const INVISALIGN_FAQS = [
  {
    question: "How does Invisalign® treatment compare to braces?",
    answer: "Both systems move teeth with controlled force, but Invisalign uses removable aligners instead of fixed brackets. You can eat normally, brush easily, and avoid emergencies from broken wires while still moving teeth precisely to a digitally planned position."
  },
  {
    question: "What is the typical Invisalign timeline in Los Angeles?",
    answer: "Most cosmetic alignment cases finish within 6 to 12 months, while more complex bite corrections may take 18 months. We stage your plan around work, production schedules, and major life events so treatment fits around your calendar."
  },
  {
    question: "Is Invisalign comfortable for speaking on camera or at events?",
    answer: "Yes. The trays hug teeth closely, so you can present, sing, or record podcasts without the speech changes caused by bulky appliances. Regular wear, 20 to 22 hours per day, keeps your articulation crisp after just a day or two of acclimating."
  }
] as const;

export const WHITENING_PROGRAMS = [
  {
    title: "In-Office Zoom Whitening",
    description: "In-office whitening for noticeable results in a single visit, with LED activation and a sensitivity protocol throughout."
  },
  {
    title: "Custom Take-Home Whitening",
    description: "Professional-strength gel in custom-fitted trays, so you can brighten gradually and control the pace and sensitivity."
  },
  {
    title: "Hybrid Whitening Plan",
    description: "Pair an in-office session with take-home touch-ups so your shade stays consistent over time."
  }
] as const;

export const WHITENING_FAQS = [
  {
    question: "Which whitening option is right for me?",
    answer: "During your consultation, we look at existing restorations, sensitivity history, enamel thickness, and your timeline. If you have an event coming up soon, in-office whitening works well. If you would rather brighten gradually, custom take-home trays give you more control. A hybrid plan helps keep your shade consistent over time."
  },
  {
    question: "How do you reduce sensitivity?",
    answer: "We prep teeth with a desensitizing mousse, use carefully timed gel cycles, and apply fluoride varnish right after whitening. Custom take-home kits include desensitizing gel and clear instructions so you stay comfortable between sessions."
  },
  {
    question: "How often should I whiten?",
    answer: "In-office whitening can be repeated every 12 to 18 months, while take-home touch-ups keep results fresh in between. We will recommend a maintenance plan that fits your routine and stain exposure so your shade stays consistent."
  }
] as const;

export const EMERGENCY_RAPID_RESPONSE = [
  {
    title: "Appointment Availability",
    description: PRACTICE_FACTS.emergencyAvailability
  },
  {
    title: "Direct Communication",
    description: "Call during office hours to discuss your concern and confirm next steps before arriving."
  },
  {
    title: "Comprehensive Solutions",
    description: "We stabilize pain, repair fractures, treat infections, and coordinate specialists when complex care is required."
  },
  {
    title: "Comfort-First Approach",
    description: PRACTICE_FACTS.sedation
  }
] as const;

export const EMERGENCY_TYPES = [
  {
    heading: "Tooth or Veneer Fractures",
    details: "An evaluation helps determine whether bonding, a temporary restoration, or another repair is appropriate. Availability and treatment time depend on the injury."
  },
  {
    heading: "Severe Toothaches",
    details: "An evaluation helps identify the cause of a toothache. Treatment recommendations depend on the diagnosis."
  },
  {
    heading: "Knocked-Out Teeth",
    details: "Call to discuss a knocked-out tooth and confirm where to seek prompt evaluation. The appropriate care depends on the injury and your dental health."
  },
  {
    heading: "Gum & Soft Tissue Injuries",
    details: "The team can assess dental injuries and discuss treatment or referral based on the care needed."
  }
] as const;

export const EMERGENCY_FAQS = [
  {
    question: "Do you accept walk-in emergencies?",
    answer: PRACTICE_FACTS.emergencyAvailability
  },
  {
    question: "Can you help if I am visiting Los Angeles?",
    answer: "Yes. Call during office hours to confirm the soonest available appointment. After your visit, ask the team about sending your records to your home dentist so they can continue your care."
  },
  {
    question: "What should I do before my appointment?",
    answer: "Keep knocked-out teeth moist in milk or a saliva container, take over-the-counter pain relief as advised, and avoid extremely hot or cold foods. Our team will give you detailed instructions during your call."
  }
] as const;

export const COSMETIC_PILLARS = [
  {
    title: "Personalized Smile Design",
    description: "Digital simulations and facial analysis help match each treatment to your features and goals."
  },
  {
    title: "Natural-Looking Results",
    description: "We combine veneers, whitening, bonding, and alignment so the work blends with the rest of your teeth."
  },
  {
    title: "Planned in the Right Order",
    description: "We sequence restorative, orthodontic, and cosmetic steps so your smile stays healthy at every stage."
  },
  {
    title: "On-Camera and Photo Detail",
    description: "If you appear on camera, we fine-tune shade, translucency, and contour so your teeth look natural under lighting."
  }
] as const;

export const COSMETIC_SMILE_PATHS = [
  {
    name: "Full Smile Makeover",
    details: "Porcelain veneers, Invisalign®, and whitening combined for a balanced, even smile."
  },
  {
    name: "Minor Refinements",
    details: "Bonding, gum contouring, and targeted whitening for small changes with little or no downtime."
  },
  {
    name: "Single-Visit Options",
    details: "Same-day bonding, professional whitening, and Botox® for a gummy smile, often done in one visit."
  }
] as const;

export const COSMETIC_FAQS = [
  {
    question: "How do you plan a cosmetic dentistry makeover?",
    answer: "We start with imaging, 3D scans, and a conversation about what you want to change. We review your photos, look at your facial proportions, and build a treatment plan together. Digital mockups and trial smiles let you preview the result before treatment begins."
  },
  {
    question: "Can cosmetic dentistry be phased?",
    answer: "Yes. Many patients phase treatment around their schedule, an upcoming event, or budget. We handle foundational work first, such as Invisalign or implants, then move to veneers, bonding, and whitening when you are ready."
  },
  {
    question: "Is cosmetic dentistry only about looks?",
    answer: "No. We balance appearance with function. We check your bite, airway, and gum health before recommending treatment, so the result looks good and stays comfortable."
  }
] as const;

/** Credentials as published on /about/. */
export const ABOUT_CREDENTIALS = [
  'UCLA School of Dentistry graduate',
  'Invisalign Lifetime Achievement Award',
  'Member of the American Academy of Cosmetic Dentistry',
  'Over 1,000 smile transformations completed',
] as const;

export const ABOUT_PHILOSOPHY = [
  {
    title: 'Care built around you',
    body: 'Dr. Aguil starts by understanding your goals and concerns, then builds a plan that fits your teeth and your timeline.',
  },
  {
    title: 'Materials chosen with care',
    body: 'Dr. Aguil uses quality materials and works with experienced dental laboratories, so your restorations fit well and look natural.',
  },
  {
    title: 'A calm, comfortable visit',
    body: 'We keep the setting calm and take the time to explain your options, so each visit feels unhurried and you know what to expect.',
  },
] as const;
