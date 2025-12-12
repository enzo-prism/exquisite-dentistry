import { SCHEDULING_URL } from "@/constants/urls";

export interface ServicePageConfig {
  slug: string;
  title: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  hero: {
    eyebrow: string;
    heading: string;
    subheading: string;
    highlights: string[];
  };
  overview: {
    intro: string[];
    callouts: { title: string; description: string }[];
  };
  benefits: { title: string; description: string }[];
  treatmentSteps: { title: string; detail: string }[];
  faqs: { question: string; answer: string }[];
  cta: {
    heading: string;
    description: string;
    primaryText: string;
    primaryHref: string;
    secondaryText?: string;
    secondaryHref?: string;
  };
  internalLinks: Array<{ label: string; href: string }>;
}

export const servicePageConfigs: Record<string, ServicePageConfig> = {
  "teeth-cleaning": {
    slug: "teeth-cleaning",
    title: "Teeth Cleaning in Los Angeles",
    seo: {
      title: "Teeth Cleaning in Los Angeles | Preventive Dental Care",
      description:
        "Schedule a gentle teeth cleaning in West Hollywood with Dr. Aguil. Boutique preventive care, VELscope® oral cancer screenings, and spa-level comfort.",
      keywords: [
        "teeth cleaning los angeles",
        "dental cleaning west hollywood",
        "preventive dentistry LA",
      ],
    },
    hero: {
      eyebrow: "Preventive Dentistry",
      heading: "Teeth Cleaning in Los Angeles",
      subheading:
        "Keep your smile bright with spa-level preventive visits that combine advanced technology, oral cancer screenings, and comforting amenities.",
      highlights: [
        "Comprehensive exam + digital imaging",
        "VELscope® oral cancer screening",
        "Comfort menu with warm towels & streaming",
      ],
    },
    overview: {
      intro: [
        "Professional cleanings at Exquisite Dentistry go far beyond a polish. We pair meticulous hygiene with a relaxing, concierge-style visit so you look forward to every appointment.",
        "Your hygienist personalizes the experience around sensitivity levels, gum health, and lifestyle habits, while Dr. Aguil checks in to map out a proactive plan.",
      ],
      callouts: [
        {
          title: "Spa-Level Comforts",
          description:
            "Noise-canceling headphones, aromatherapy, cozy blankets, and a calm environment keep anxiety low and relaxation high.",
        },
        {
          title: "Early Detection",
          description:
            "Digital X-rays, intraoral cameras, and VELscope® scans let us uncover concerns before they become emergencies.",
        },
        {
          title: "Personalized Maintenance",
          description:
            "We tailor recall frequency, fluoride options, and at-home products to your enamel, gum health, and cosmetic goals.",
        },
      ],
    },
    benefits: [
      {
        title: "Gentle, Thorough Cleaning",
        description:
          "We remove plaque and tartar while protecting enamel with high-quality instruments and enamel-strengthening polishes.",
      },
      {
        title: "Whole-Health Monitoring",
        description:
          "Regular periodontal charting and screenings keep an eye on inflammation markers that affect total wellness.",
      },
      {
        title: "Cosmetic Longevity",
        description:
          "Protect veneer edges, whitening results, and Invisalign progress with targeted polishing protocols.",
      },
    ],
    treatmentSteps: [
      {
        title: "01. Comfort Menu & Exam",
        detail:
          "Choose your amenities, review medical history, and begin with a comprehensive exam and oral cancer screening.",
      },
      {
        title: "02. Precision Cleaning",
        detail:
          "Your hygienist removes buildup above and below the gum line, finishing with an enamel-specific polish.",
      },
      {
        title: "03. Personalized Plan",
        detail:
          "Leave with tailored recommendations for at-home care, fluoride, whitening boosts, and your next visit cadence.",
      },
    ],
    faqs: [
      {
        question: "How often should I schedule a professional cleaning?",
        answer:
          "Most patients benefit from two cleanings per year. If you have a history of gum inflammation, cosmetic investments, or medical considerations, we may recommend more frequent visits to protect your smile.",
      },
      {
        question: "Can I whiten and clean in the same visit?",
        answer:
          "Yes. A professional cleaning is the ideal prep for whitening because it removes buildup that could block the gels. Let us know when booking so we can reserve time for both.",
      },
      {
        question: "Do you screen for oral cancer?",
        answer:
          "Every hygiene visit includes a visual exam plus VELscope® imaging to catch abnormalities early. It’s painless, fast, and included in your appointment.",
      },
    ],
    cta: {
      heading: "Book Your Teeth Cleaning",
      description:
        "Choose a time that fits your calendar or call our concierge team. We’ll take care of the rest.",
      primaryText: "Schedule Online",
      primaryHref: SCHEDULING_URL,
      secondaryText: "Call (323) 272-2388",
      secondaryHref: "tel:+13232722388",
    },
    internalLinks: [
      { label: "Oral Cancer Screenings", href: "/oral-cancer-screening" },
      { label: "Professional Teeth Whitening", href: "/teeth-whitening" },
      { label: "Spa Cosmetic Dentistry", href: "/cosmetic-dentistry" }
    ],
  },
  "smile-makeover-los-angeles": {
    slug: "smile-makeover-los-angeles",
    title: "Smile Makeover in Los Angeles",
    seo: {
      title: "Smile Makeover Los Angeles | Exquisite Dentistry",
      description:
        "Plan a smile makeover in Los Angeles with Dr. Alexie Aguil, DDS. Veneers, whitening, Invisalign, bonding, and implants—coordinated with digital smile design and comfort-first care.",
      keywords: [
        "smile makeover los angeles",
        "smile makeover la",
        "cosmetic dentist los angeles",
        "porcelain veneers los angeles",
        "invisalign los angeles",
        "zoom whitening los angeles",
        "dental bonding los angeles",
        "dental implants los angeles",
      ],
    },
    hero: {
      eyebrow: "Cosmetic Dentistry",
      heading: "Smile Makeover in Los Angeles",
      subheading:
        "A smile makeover is a personalized plan that combines veneers, whitening, Invisalign, bonding, and restorative care to upgrade color, shape, and symmetry—without the “done” look.",
      highlights: [
        "Digital smile design + photo analysis",
        "Curated plan: veneers, whitening, Invisalign, bonding",
        "Comfort-first care near Beverly Hills",
      ],
    },
    overview: {
      intro: [
        "If you’re searching for a smile makeover in Los Angeles, you’re probably looking for a result that looks natural in real life and on camera. We start with a shade, shape, and bite analysis, then map out the smallest set of treatments that reaches your goal.",
        "Dr. Alexie Aguil, DDS designs each plan around your face, lip dynamics, and timeline—whether that’s a fast whitening refresh, a veneer-focused redesign, or a multi-step combination that includes Invisalign or implants.",
      ],
      callouts: [
        {
          title: "Designed to look like you",
          description:
            "We focus on proportion, symmetry, and texture so enhancements read as healthy teeth—not a template.",
        },
        {
          title: "One coordinated plan",
          description:
            "We sequence treatments (alignment → whitening → bonding/veneers) so color matching and bite stability stay predictable.",
        },
        {
          title: "Comfort-first experience",
          description:
            "From digital scanning to gentle protocols, we aim for calm visits and clear expectations from consult to aftercare.",
        },
      ],
    },
    benefits: [
      {
        title: "Natural color and brightness",
        description:
          "Address stains and uneven shade with professional whitening or shade-matched porcelain that still looks lifelike.",
      },
      {
        title: "Improved shape and symmetry",
        description:
          "Refine proportions, close small gaps, and smooth chips with bonding or veneers tailored to your facial features.",
      },
      {
        title: "A stable, confident bite",
        description:
          "When alignment or missing teeth affect function, Invisalign and implants can be part of the makeover for long-term stability.",
      },
    ],
    treatmentSteps: [
      {
        title: "01. Smile Analysis",
        detail:
          "We review goals, photos, gum display, tooth wear, and bite—plus a shade assessment and digital scans when needed.",
      },
      {
        title: "02. Plan + Timeline",
        detail:
          "You’ll get a clear sequence of recommended treatments, expected milestones, and options based on comfort and budget.",
      },
      {
        title: "03. Treatment Visits",
        detail:
          "Depending on your plan, this may include whitening, Invisalign, bonding, veneers, crowns, or implant restorations.",
      },
      {
        title: "04. Finishing + Maintenance",
        detail:
          "We finalize bite and aesthetics, then share a maintenance plan (touch-ups, nightguard, hygiene) to protect results.",
      },
    ],
    faqs: [
      {
        question: "What treatments are included in a smile makeover?",
        answer:
          "A smile makeover is a customized combination of cosmetic and restorative treatments. Common options include whitening, bonding, porcelain veneers, Invisalign, crowns, and implants. Your plan depends on goals, enamel health, existing dental work, and bite function.",
      },
      {
        question: "How long does a smile makeover take?",
        answer:
          "Some makeovers are completed in a single visit (for example, whitening or bonding). Veneers often take a few visits. Invisalign-based plans can take several months. We’ll outline a realistic timeline after your consultation and scans.",
      },
      {
        question: "How much does a smile makeover cost in Los Angeles?",
        answer:
          "Costs vary widely based on the treatments and number of teeth involved. After a consultation, we provide a detailed plan with line-item pricing and options that prioritize the changes that matter most to you.",
      },
      {
        question: "Will my smile makeover look natural?",
        answer:
          "Natural results are the goal. We consider tooth translucency, texture, smile arc, and facial proportions, then coordinate shades across whitening and porcelain so the outcome looks like healthy enamel—just upgraded.",
      },
      {
        question: "Do you offer smile makeovers before events?",
        answer:
          "Yes. If you have a deadline (wedding, graduation, photos, or a move), we can recommend a plan that fits your timeline—often starting with whitening and short-term improvements, then layering longer-term changes if desired.",
      },
    ],
    cta: {
      heading: "Book a Smile Makeover Consultation",
      description:
        "Tell us your goal and your timeline. We’ll recommend the best combination of treatments to upgrade your smile—comfort-first, with clear next steps.",
      primaryText: "Book Online",
      primaryHref: SCHEDULING_URL,
      secondaryText: "Call Us",
      secondaryHref: "tel:+13232722388",
    },
    internalLinks: [
      { label: "Smile Gallery (Before & After)", href: "/smile-gallery" },
      { label: "Transformation Stories", href: "/transformation-stories" },
      { label: "Porcelain Veneers", href: "/veneers" },
      { label: "Veneers in Los Angeles", href: "/veneers-los-angeles" },
      { label: "Teeth Whitening Options", href: "/teeth-whitening" },
      { label: "Zoom Whitening", href: "/zoom-whitening" },
      { label: "Invisalign Clear Aligners", href: "/invisalign" },
      { label: "Dental Implants", href: "/dental-implants" },
      { label: "Cosmetic Dentistry Overview", href: "/cosmetic-dentistry" },
      { label: "Schedule a Consultation", href: "/contact" },
    ],
  },
  "invisalign-beverly-hills": {
    slug: "invisalign-beverly-hills",
    title: "Invisalign Near Beverly Hills",
    seo: {
      title: "Invisalign Near Beverly Hills | Exquisite Dentistry",
      description:
        "Invisalign near Beverly Hills with Dr. Alexie Aguil, DDS. Clear aligners planned with iTero scans, flexible visits, and comfort-first care on Wilshire Blvd in Los Angeles.",
      keywords: [
        "invisalign beverly hills",
        "invisalign near beverly hills",
        "clear aligners beverly hills",
        "invisalign los angeles",
        "adult orthodontics beverly hills",
        "itero scanner",
      ],
    },
    hero: {
      eyebrow: "Orthodontics",
      heading: "Invisalign Near Beverly Hills",
      subheading:
        "Discreet clear aligners designed for busy Beverly Hills schedules—planned with digital scans, concierge check-ins, and an aesthetics-first finish.",
      highlights: [
        "iTero digital scans (no messy impressions)",
        "Flexible appointments + concierge pacing",
        "Finish with whitening or bonding options",
      ],
    },
    overview: {
      intro: [
        "If you’re searching for Invisalign in Beverly Hills, you likely want a straighter smile without brackets or disruptions to your day. Our Wilshire Blvd Los Angeles studio is a short drive from Beverly Hills, and we plan clear aligner treatment around work, travel, and event timelines.",
        "Dr. Alexie Aguil, DDS uses digital iTero scanning and staged planning to guide predictable tooth movement. When the time is right, we can coordinate cosmetic finishing touches—like whitening or subtle edge contouring—so your final result looks natural and balanced.",
      ],
      callouts: [
        {
          title: "Digital planning",
          description:
            "We use iTero scans to map your bite, visualize movement, and keep progress measurable from start to finish.",
        },
        {
          title: "Beverly Hills-friendly scheduling",
          description:
            "Concierge reminders, efficient visits, and clear timelines help you stay consistent without compromising your calendar.",
        },
        {
          title: "Aesthetic finishing",
          description:
            "After alignment, we can coordinate whitening, bonding, or veneers when indicated to refine symmetry and shade.",
        },
      ],
    },
    benefits: [
      {
        title: "Nearly invisible treatment",
        description:
          "Clear aligners keep treatment discreet for meetings, social events, and photos while teeth gradually align.",
      },
      {
        title: "Comfort-first progress",
        description:
          "Smooth aligners reduce irritation and minimize emergencies compared to brackets and wires.",
      },
      {
        title: "A plan that fits your lifestyle",
        description:
          "Wear aligners 20–22 hours a day, remove them for dining, and keep oral hygiene simple throughout treatment.",
      },
    ],
    treatmentSteps: [
      {
        title: "01. Consultation + iTero Scan",
        detail:
          "We evaluate goals, bite function, and aesthetic priorities, then capture digital scans for precise planning.",
      },
      {
        title: "02. Digital Treatment Plan",
        detail:
          "We map tooth movement in stages and set expectations for wear time, check-ins, and likely refinements.",
      },
      {
        title: "03. Aligner Check-ins",
        detail:
          "Progress visits keep you on track. If needed, we adjust attachments or order refinement aligners for finishing details.",
      },
      {
        title: "04. Retainers + Finishing",
        detail:
          "We lock in results with retainers and can coordinate whitening or cosmetic polishing when desired.",
      },
    ],
    faqs: [
      {
        question: "Do you offer Invisalign for Beverly Hills patients?",
        answer:
          "Yes. Many patients travel from Beverly Hills to our Wilshire Blvd studio for Invisalign planning and check-ins. We coordinate schedules and timelines to make visits efficient.",
      },
      {
        question: "How long does Invisalign take?",
        answer:
          "Many adult alignment cases finish in 6–12 months, while complex bite corrections can take longer. After your scan, we’ll outline a realistic timeline and what each stage accomplishes.",
      },
      {
        question: "How often do I need to come in during treatment?",
        answer:
          "Visit frequency depends on your plan, but most patients check in every 6–10 weeks. We’ll coordinate appointments around travel and major events whenever possible.",
      },
      {
        question: "Can Invisalign be combined with whitening or veneers?",
        answer:
          "Yes. Alignment often comes first so we can refine shade and shape afterward. We’ll recommend the ideal sequence for predictable color matching and a balanced bite.",
      },
      {
        question: "Is Invisalign comfortable for speaking at work?",
        answer:
          "Most patients adjust quickly. Aligners fit closely to teeth, and any minor speech changes typically resolve within a day or two of consistent wear.",
      },
    ],
    cta: {
      heading: "Book an Invisalign Consultation Near Beverly Hills",
      description:
        "Schedule a scan and consultation to see if Invisalign fits your goals, timeline, and bite. We’ll outline options and next steps with clear expectations.",
      primaryText: "Book Online",
      primaryHref: SCHEDULING_URL,
      secondaryText: "Call Us",
      secondaryHref: "tel:+13232722388",
    },
    internalLinks: [
      { label: "Invisalign Clear Aligners (Los Angeles)", href: "/invisalign" },
      { label: "Beverly Hills Dentist Page", href: "/beverly-hills-dentist" },
      { label: "iTero 3D Scanner", href: "/itero-scanner" },
      { label: "Nick’s Invisalign Story", href: "/transformation-stories/nick-invisalign" },
      { label: "Teeth Whitening Options", href: "/teeth-whitening" },
      { label: "Contact & Scheduling", href: "/contact" },
    ],
  },
  "teeth-whitening-beverly-hills": {
    slug: "teeth-whitening-beverly-hills",
    title: "Teeth Whitening Near Beverly Hills",
    seo: {
      title: "Teeth Whitening Near Beverly Hills | Exquisite Dentistry",
      description:
        "Teeth whitening near Beverly Hills with in-office whitening and custom take-home trays. Comfort-first care on Wilshire Blvd in Los Angeles with shade planning for existing veneers or crowns.",
      keywords: [
        "teeth whitening beverly hills",
        "teeth whitening near beverly hills",
        "professional teeth whitening beverly hills",
        "zoom whitening beverly hills",
        "in-office teeth whitening",
        "custom whitening trays",
      ],
    },
    hero: {
      eyebrow: "Teeth Whitening",
      heading: "Teeth Whitening Near Beverly Hills",
      subheading:
        "Professional whitening plans designed for Beverly Hills schedules—fast in-office brightening, custom trays for sensitive teeth, and hybrid maintenance that keeps your shade consistent.",
      highlights: [
        "In-office whitening + sensitivity planning",
        "Custom take-home trays for gradual brightening",
        "Shade matching for veneers/crowns when needed",
      ],
    },
    overview: {
      intro: [
        "If you’re looking for teeth whitening in Beverly Hills, you probably want a brighter shade without sensitivity surprises or an unnatural finish. Our Wilshire Blvd Los Angeles studio is a short drive from Beverly Hills, and we tailor whitening to your timeline—whether that’s an upcoming event, headshots, or a low-maintenance refresh.",
        "We start with a shade assessment, review existing dental work, and choose the right approach: in-office whitening for faster results, custom trays for gradual brightening, or a hybrid plan that balances speed and comfort. If you have veneers or crowns, we’ll plan whitening so natural enamel blends with existing restorations.",
      ],
      callouts: [
        {
          title: "Comfort-first protocol",
          description:
            "We adjust gel strength and cycle timing, and recommend desensitizing steps when you’re prone to sensitivity.",
        },
        {
          title: "Options that fit your calendar",
          description:
            "Choose in-office whitening for speed, take-home trays for control, or a hybrid plan for lasting brightness.",
        },
        {
          title: "Realistic shade planning",
          description:
            "Whitening changes natural teeth, not porcelain. We’ll guide you on shade matching if you have veneers, bonding, or crowns.",
        },
      ],
    },
    benefits: [
      {
        title: "Brighter shade, professionally supervised",
        description:
          "We monitor comfort and results in real time, helping you avoid over-whitening and reducing sensitivity risks.",
      },
      {
        title: "A plan matched to your enamel",
        description:
          "Sensitive teeth, thin enamel, and existing restorations need different pacing—your plan is built around those details.",
      },
      {
        title: "Maintenance that keeps results stable",
        description:
          "We give you aftercare guidance and touch-up timing so your shade stays consistent through coffee, tea, and travel.",
      },
    ],
    treatmentSteps: [
      {
        title: "01. Shade Assessment",
        detail:
          "We evaluate enamel health, sensitivity history, and existing restorations, then set a realistic target shade.",
      },
      {
        title: "02. Choose Your Whitening Plan",
        detail:
          "Select in-office whitening, custom take-home trays, or a hybrid plan based on timeline, comfort, and desired brightness.",
      },
      {
        title: "03. Whitening + Comfort Support",
        detail:
          "We complete timed whitening cycles (or deliver trays) and share steps to minimize sensitivity during and after treatment.",
      },
      {
        title: "04. Aftercare + Touch-Ups",
        detail:
          "We provide a maintenance schedule and product guidance to help results last and to keep your shade even over time.",
      },
    ],
    faqs: [
      {
        question: "Do you offer teeth whitening for Beverly Hills patients?",
        answer:
          "Yes. Many patients visit us from Beverly Hills for in-office whitening and custom take-home trays. We coordinate schedules and recommend the best option based on your timeline and sensitivity level.",
      },
      {
        question: "How long does in-office whitening take?",
        answer:
          "Most in-office whitening visits take about 60–90 minutes. We begin with a shade check and comfort steps, then complete timed gel cycles with careful monitoring.",
      },
      {
        question: "Will whitening work if I have veneers or crowns?",
        answer:
          "Whitening gels brighten natural enamel but do not change the shade of porcelain or composite restorations. If you have veneers, bonding, or crowns in the smile zone, we’ll plan whitening and shade matching so everything looks consistent.",
      },
      {
        question: "How do you reduce sensitivity?",
        answer:
          "We use a comfort-first protocol with appropriate gel strengths, shorter cycles when needed, and desensitizing recommendations. If you’re highly sensitive, custom trays often provide a gentler, more controlled approach.",
      },
      {
        question: "How long do whitening results last?",
        answer:
          "Results vary by diet and habits, but many patients maintain brightness with periodic touch-ups. We’ll recommend timing based on coffee, tea, wine, and lifestyle factors so your shade stays consistent.",
      },
    ],
    cta: {
      heading: "Book Teeth Whitening Near Beverly Hills",
      description:
        "Schedule a shade assessment and we’ll recommend the whitening plan that fits your comfort level, timeline, and existing dental work.",
      primaryText: "Book Online",
      primaryHref: SCHEDULING_URL,
      secondaryText: "Call Us",
      secondaryHref: "tel:+13232722388",
    },
    internalLinks: [
      { label: "Teeth Whitening Options (Los Angeles)", href: "/teeth-whitening" },
      { label: "Zoom Whitening", href: "/zoom-whitening" },
      { label: "Beverly Hills Dentist Page", href: "/beverly-hills-dentist" },
      { label: "Smile Gallery (Before & After)", href: "/smile-gallery" },
      { label: "Patient Testimonials", href: "/testimonials" },
      { label: "Contact & Scheduling", href: "/contact" },
    ],
  },
  "root-canal": {
    slug: "root-canal",
    title: "Root Canal Therapy in Los Angeles",
    seo: {
      title: "Gentle Root Canal Therapy in Los Angeles | Exquisite Dentistry",
      description:
        "Experience sedation options, modern imaging, and compassionate care during root canal therapy in West Hollywood.",
      keywords: ["root canal los angeles", "endodontic therapy LA", "root canal west hollywood"],
    },
    hero: {
      eyebrow: "Restorative Dentistry",
      heading: "Root Canal Therapy Without the Stress",
      subheading:
        "We combine advanced imaging, laser-assisted disinfection, and comfort-focused protocols so you relax while we rescue your tooth.",
      highlights: [
        "Same-day pain relief",
        "Digital 3D imaging",
        "Sedation & comfort menu included",
      ],
    },
    overview: {
      intro: [
        "A root canal at Exquisite Dentistry is calm, efficient, and remarkably comfortable. We protect your natural tooth structure while eliminating infection and sealing the tooth with beautiful, durable materials.",
        "From aromatherapy to Netflix, our lounge-style operatories keep anxiety low while we work precisely and quickly.",
      ],
      callouts: [
        {
          title: "Comprehensive Diagnostics",
          description:
            "CBCT scans and digital X-rays pinpoint infection for precise, conservative treatment.",
        },
        {
          title: "Modern Disinfection",
          description:
            "We use rotary instruments, ultrasonic agitation, and medicaments that thoroughly cleanse canals.",
        },
        {
          title: "Esthetic Restorations",
          description:
            "Once healed, we complete the tooth with a custom porcelain crown that blends seamlessly with your smile.",
        },
      ],
    },
    benefits: [
      {
        title: "Pain Relief",
        description:
          "Eliminate infection and pressure with emergency scheduling and anesthesia tailored to your comfort level.",
      },
      {
        title: "Tooth Preservation",
        description:
          "Keeping your natural root structure maintains bite alignment and avoids future bone loss.",
      },
      {
        title: "Custom Aftercare",
        description:
          "You’ll leave with a treatment roadmap that covers medication, follow-up visits, and crown timing.",
      },
    ],
    treatmentSteps: [
      { title: "01. Diagnosis & Comfort Plan", detail: "We confirm infection, discuss sedation, and outline your visit." },
      { title: "02. Precise Therapy", detail: "Infected tissue is removed, canals are shaped, disinfected, and sealed." },
      { title: "03. Beautiful Finalization", detail: "We protect the tooth with a crown or onlay that restores strength and aesthetics." },
    ],
    faqs: [
      {
        question: "Will my root canal hurt?",
        answer:
          "With modern anesthesia, sedation options, and gentle techniques, most patients feel immediate relief. You may feel mild tenderness afterward, but it fades quickly with over-the-counter medication.",
      },
      {
        question: "How long does treatment take?",
        answer:
          "Straightforward cases finish in a single visit. Complex anatomies may need a follow-up for medication and sealing. We will let you know what to expect after reviewing your scans.",
      },
      {
        question: "Do I need a crown afterward?",
        answer:
          "Back teeth almost always need a crown to prevent fractures. Front teeth sometimes do fine with bonding. We’ll recommend the ideal restoration for lasting strength and beauty.",
      },
    ],
    cta: {
      heading: "Schedule a Root Canal Consultation",
      description:
        "Call or book online and we’ll reserve time to relieve your pain and save your tooth.",
      primaryText: "Book Online",
      primaryHref: SCHEDULING_URL,
      secondaryText: "Speak With Our Team",
      secondaryHref: "tel:+13232722388",
    },
    internalLinks: [
      { label: "Porcelain Dental Crowns", href: "/dental-crowns" },
      { label: "Pain-Free Dentistry Options", href: "/pain-free-dentistry" },
      { label: "Dental Bridge Solutions", href: "/dental-bridge" }
    ],
  },
  "dental-bridge": {
    slug: "dental-bridge",
    title: "Dental Bridges in Los Angeles",
    seo: {
      title: "Porcelain Dental Bridges in Los Angeles | Tooth Replacement",
      description:
        "Replace missing teeth with handcrafted porcelain bridges in West Hollywood. Custom shade-matching, digital scans, and spa-level comfort.",
      keywords: ["dental bridge los angeles", "tooth replacement west hollywood", "porcelain bridge LA"],
    },
    hero: {
      eyebrow: "Restorative Dentistry",
      heading: "Natural-Looking Dental Bridges",
      subheading:
        "When implants aren’t the right fit, a custom porcelain bridge closes the gap with strength, symmetry, and confidence.",
      highlights: ["Digital scans, no gooey impressions", "Custom shading + texture", "Flexible financing"],
    },
    overview: {
      intro: [
        "A dental bridge replaces one or more missing teeth by anchoring porcelain crowns to neighboring teeth. We design each bridge with ceramists who understand Los Angeles aesthetics, so your smile looks seamless on camera and in real life.",
      ],
      callouts: [
        {
          title: "Digital Planning",
          description:
            "We scan your teeth with iTero so we can map bite forces, gumline contour, and occlusion for long-term comfort.",
        },
        {
          title: "Artisan Fabrication",
          description:
            "Our lab partners craft layered porcelain that perfectly matches translucency, shade, and surface texture.",
        },
        {
          title: "Comprehensive Protection",
          description:
            "We review nightguard needs, hygiene strategies, and maintenance visits to keep your bridge pristine.",
        },
      ],
    },
    benefits: [
      { title: "Immediate Transformation", description: "Restore chewing, speech, and symmetry in just two visits." },
      { title: "Conservative Approach", description: "Ideal when implants aren’t possible or desired due to bone, timelines, or medical considerations." },
      { title: "Cosmetic Precision", description: "The final bridge is indistinguishable from your natural enamel." },
    ],
    treatmentSteps: [
      { title: "01. Smile Design Session", detail: "Digital scans, photography, and shade mapping guide your blueprint." },
      { title: "02. Preparation & Temporaries", detail: "Supporting teeth are shaped and protected with luxurious temporaries." },
      { title: "03. Final Placement", detail: "We bond the bridge, refine your bite, and review maintenance." },
    ],
    faqs: [
      {
        question: "How long do dental bridges last?",
        answer:
          "With proper hygiene and regular checkups, bridges often last 10–15 years or more. We’ll share specific tips for flossing and care to extend longevity.",
      },
      {
        question: "Are implants better?",
        answer:
          "Implants are a fantastic option, but bridges remain ideal when bone grafting isn’t preferred, multiple implants would raise costs, or a faster solution is needed.",
      },
      {
        question: "Will insurance help?",
        answer:
          "Most PPO plans contribute toward bridges. Our concierge team verifies benefits before treatment so you know your exact investment.",
      },
    ],
    cta: {
      heading: "Replace Missing Teeth With Confidence",
      description: "Let’s plan the right restoration for your smile and lifestyle.",
      primaryText: "Request a Consultation",
      primaryHref: SCHEDULING_URL,
      secondaryText: "Call (323) 272-2388",
      secondaryHref: "tel:+13232722388",
    },
    internalLinks: [
      { label: "Handcrafted Dental Crowns", href: "/dental-crowns" },
      { label: "Dental Implants in Los Angeles", href: "/dental-implants" },
      { label: "Gentle Root Canal Therapy", href: "/root-canal" }
    ],
  },
  "dental-crowns": {
    slug: "dental-crowns",
    title: "Dental Crowns in Los Angeles",
    seo: {
      title: "Porcelain Dental Crowns in Los Angeles | Exquisite Dentistry",
      description:
        "Restore cracked, weak, or root canal-treated teeth with custom porcelain crowns fabricated for Hollywood-ready aesthetics.",
      keywords: ["dental crowns los angeles", "porcelain crown west hollywood", "cosmetic crown LA"],
    },
    hero: {
      eyebrow: "Restorative & Cosmetic",
      heading: "Porcelain Dental Crowns",
      subheading:
        "Protect and perfect compromised teeth with crowns that mirror natural enamel down to the translucency.",
      highlights: ["Digital scans", "Metal-free ceramics", "Comfort-first visits"],
    },
    overview: {
      intro: [
        "Dr. Aguil designs crowns that reinforce weakened teeth and keep your smile photo-ready. Whether you’ve had a root canal, a fracture, or an aging restoration, we’ll rebuild strength without sacrificing beauty.",
      ],
      callouts: [
        { title: "Digital Design", description: "3D scans capture every contour to guide precise preparations." },
        { title: "Lab Partnership", description: "Top-tier ceramists craft crowns using layered porcelain for lifelike results." },
        { title: "Bite Harmony", description: "We fine-tune occlusion so your jaw, TMJ, and smile stay comfortable." },
      ],
    },
    benefits: [
      { title: "Strength & Longevity", description: "Crowns shield fragile teeth from fractures and temperature sensitivity." },
      { title: "Cosmetic Upgrade", description: "Customize shade and shape to enhance symmetry and confidence." },
      { title: "Predictable Process", description: "Two visits with luxurious temporaries in between keep you comfortable." },
    ],
    treatmentSteps: [
      { title: "01. Consultation & Scan", detail: "Digital impressions capture your current smile and bite dynamics." },
      { title: "02. Preparation & Temporary", detail: "We shape the tooth, place a custom temporary, and send specs to the lab." },
      { title: "03. Final Bonding", detail: "Your porcelain crown is bonded in place and polished for perfection." },
    ],
    faqs: [
      { question: "Do crowns look natural?", answer: "Yes. We control translucency, texture, and shade so they blend seamlessly with surrounding teeth." },
      { question: "How do I care for my crown?", answer: "Brush, floss, and schedule cleanings every six months. A nightguard protects against clenching or grinding." },
      { question: "Are same-day crowns available?", answer: "For select cases we can use chairside milling, but lab-fabricated porcelain delivers the most precise, cosmetic outcome." },
    ],
    cta: {
      heading: "Strengthen & Beautify Your Smile",
      description: "Reserve time to discuss whether a crown, onlay, or veneer suits your goals.",
      primaryText: "Book Online",
      primaryHref: SCHEDULING_URL,
      secondaryText: "Call the Office",
      secondaryHref: "tel:+13232722388",
    },
    internalLinks: [
      { label: "Root Canal Therapy", href: "/root-canal" },
      { label: "Dental Bridge Restorations", href: "/dental-bridge" },
      { label: "Cosmetic Dentistry Enhancements", href: "/cosmetic-dentistry" }
    ],
  },
  "pain-free-dentistry": {
    slug: "pain-free-dentistry",
    title: "Pain-Free Dentistry in Los Angeles",
    seo: {
      title: "Pain-Free Dentistry & Dental Anxiety Relief | Los Angeles",
      description:
        "Experience stress-free visits with sedation, advanced anesthesia, and a concierge comfort menu designed for anxious patients.",
      keywords: ["pain free dentist LA", "sedation dentistry west hollywood", "dental anxiety help"],
    },
    hero: {
      eyebrow: "Comfort & Technology",
      heading: "Pain-Free Dentistry for Every Visit",
      subheading:
        "From painless injections to cozy amenities, we build every appointment around relaxation and control.",
      highlights: ["Sedation options", "Calming environment", "Extended appointments"],
    },
    overview: {
      intro: [
        "We believe dentistry should feel restorative—not stressful. Whether you need a simple cleaning or a full smile makeover, we adapt pacing, anesthesia, and communication to your comfort level.",
      ],
      callouts: [
        { title: "Sedation Choices", description: "Nitrous oxide, oral medication, and NuCalm®-style relaxation keep anxiety low." },
        { title: "Comfort Menu", description: "Warm neck wraps, aromatherapy, weighted blankets, and curated playlists help you unwind." },
        { title: "Transparent Communication", description: "We walk through every step before we begin, with pause signals anytime you need a break." },
      ],
    },
    benefits: [
      { title: "Lower Stress", description: "Enjoy dentistry that respects your pace and preferences." },
      { title: "Better Outcomes", description: "Relaxed patients can complete comprehensive treatment without postponements." },
      { title: "Tailored for You", description: "From needle-free numbing gel to streaming entertainment, everything is customizable." },
    ],
    treatmentSteps: [
      { title: "01. Consultation", detail: "Share past experiences, triggers, and goals so we can personalize your visit." },
      { title: "02. Comfort Roadmap", detail: "Choose sedation, timing, and amenities that help you feel in control." },
      { title: "03. Supportive Care", detail: "We provide post-visit check-ins and collaborative scheduling to keep momentum." },
    ],
    faqs: [
      {
        question: "Do you offer sedation dentistry?",
        answer:
          "Yes. We provide nitrous oxide and oral sedation for eligible patients. We’ll review medical history and tailor the approach to keep you safe and relaxed.",
      },
      {
        question: "Can I bring a friend or headphones?",
        answer:
          "Absolutely. Many patients feel more at ease with a companion or preferred entertainment. We also supply premium headphones and streaming services.",
      },
      {
        question: "Is pain-free dentistry more expensive?",
        answer:
          "Comfort amenities are included. Sedation options may have a modest fee, and we’ll review that transparently before scheduling.",
      },
    ],
    cta: {
      heading: "Talk With Our Concierge Team",
      description: "We’ll map out a gentle approach so you actually look forward to care.",
      primaryText: "Request a Comfort Consult",
      primaryHref: SCHEDULING_URL,
      secondaryText: "Call (323) 272-2388",
      secondaryHref: "tel:+13232722388",
    },
    internalLinks: [
      { label: "Teeth Cleaning Experiences", href: "/teeth-cleaning" },
      { label: "Gentle Root Canal Therapy", href: "/root-canal" },
      { label: "Dental Implant Planning", href: "/dental-implants" }
    ],
  },
  "oral-cancer-screening": {
    slug: "oral-cancer-screening",
    title: "Oral Cancer Screenings in Los Angeles",
    seo: {
      title: "Oral Cancer Screening in Los Angeles | VELscope at Exquisite Dentistry",
      description:
        "Annual VELscope oral cancer screenings detect cellular changes early. Add a screening to any hygiene visit in West Hollywood.",
      keywords: [
        "oral cancer screening los angeles",
        "velscope dentist LA",
        "oral cancer exam west hollywood",
      ],
    },
    hero: {
      eyebrow: "Preventive Priority",
      heading: "VELscope® Oral Cancer Screenings",
      subheading:
        "Protect your long-term health with fast, non-invasive screenings built into every hygiene visit.",
      highlights: ["Included with cleanings", "Takes under two minutes", "Early detection saves lives"],
    },
    overview: {
      intro: [
        "Oral cancer is most treatable when caught early. We use VELscope® technology to highlight abnormal tissue long before it’s visible to the eye.",
        "Whether you’re a routine patient or new to LA, we can add a screening to any appointment for added peace of mind.",
      ],
      callouts: [
        { title: "Blue-Light Technology", description: "VELscope’s fluorescence visualization reveals cellular changes under the surface." },
        { title: "Baseline Photography", description: "We document findings so we can compare visits and spot subtle developments." },
        { title: "Specialist Network", description: "If we see anything suspicious, we handle referrals and follow-up coordination immediately." },
      ],
    },
    benefits: [
      { title: "Peace of Mind", description: "Know that proactive screenings are part of every visit, not an optional add-on." },
      { title: "Holistic Wellness", description: "We look at lifestyle, medications, and immune factors that influence risk." },
      { title: "Fast & Comfortable", description: "No dyes, rinses, or discomfort—just a quick scan during your exam." },
    ],
    treatmentSteps: [
      { title: "01. Health Review", detail: "We discuss risk factors like tobacco use, HPV, and family history." },
      { title: "02. Visual & Palpation Exam", detail: "Your clinician checks cheeks, tongue, lymph nodes, and soft tissue." },
      { title: "03. VELscope Scan", detail: "Blue light highlights areas that may need closer monitoring or a specialist referral." },
    ],
    faqs: [
      {
        question: "Who should get screened?",
        answer:
          "Everyone. Risk increases with age, alcohol, and tobacco, but we see cases across all lifestyles. That’s why it’s part of every cleaning visit here.",
      },
      {
        question: "Does insurance cover oral cancer screenings?",
        answer:
          "Most PPO plans consider it part of a comprehensive exam. If there’s any out-of-pocket cost, we’ll let you know beforehand.",
      },
      {
        question: "What happens if you spot something?",
        answer:
          "We’ll photograph the area, monitor it closely, and coordinate with trusted specialists for biopsy or further evaluation if needed.",
      },
    ],
    cta: {
      heading: "Add a Screening to Your Next Visit",
      description: "Book online or call the office—we’ll handle everything once you arrive.",
      primaryText: "Schedule Preventive Care",
      primaryHref: SCHEDULING_URL,
      secondaryText: "Call Us",
      secondaryHref: "tel:+13232722388",
    },
    internalLinks: [
      { label: "Teeth Cleaning Visits", href: "/teeth-cleaning" },
      { label: "Professional Teeth Whitening", href: "/teeth-whitening" },
      { label: "Contact Exquisite Dentistry", href: "/contact" }
    ],
  },
};
