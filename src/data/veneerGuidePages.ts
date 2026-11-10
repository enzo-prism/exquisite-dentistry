import { SCHEDULE_CONSULTATION_PATH } from '@/constants/urls';

export const VENEER_GUIDE_IDS = [
  'porcelain-vs-no-prep',
  'vs-crowns-bonding',
  'what-to-expect',
] as const;

export type VeneerGuideId = (typeof VENEER_GUIDE_IDS)[number];

export type VeneerGuideLink = {
  label: string;
  href: string;
};

export type VeneerGuideCard = {
  title: string;
  body: string;
};

export type VeneerGuideStep = {
  step: string;
  title: string;
  description: string;
};

export type VeneerGuideSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  cards?: VeneerGuideCard[];
  steps?: VeneerGuideStep[];
  tips?: string[];
  links?: VeneerGuideLink[];
};

export type VeneerGuidePage = {
  id: VeneerGuideId;
  path: string;
  title: string;
  description: string;
  keywords: string;
  h1: string;
  breadcrumb: string;
  eyebrow: string;
  heroAccent: string;
  subtitle: string;
  introEyebrow: string;
  introTitle: string;
  introTitleAccent: string;
  introParagraphs: string[];
  sections: VeneerGuideSection[];
  faqs: Array<{ question: string; answer: string }>;
  procedureName: string;
  procedureDescription: string;
  preparation: string[];
  followupCare: string[];
  benefits: string[];
  recoveryTime: string;
  relatedArticleTags: string[];
  lastUpdated: string;
};

const CONSULTATION_HREF = `${SCHEDULE_CONSULTATION_PATH}?service=porcelain-veneers`;
const VENEER_OG_IMAGE =
  'https://exquisitedentistryla.com/lovable-uploads/2e2732fc-c4a6-4f21-9829-3717d9b2b36d.png';

export const VENEER_GUIDE_OG_IMAGE = VENEER_OG_IMAGE;

const PORCELAIN_VS_NO_PREP: VeneerGuidePage = {
  id: 'porcelain-vs-no-prep',
  path: '/veneers/porcelain-vs-no-prep',
  title: 'Porcelain vs No-Prep Veneers in Los Angeles | Exquisite Dentistry',
  description:
    'Compare porcelain veneers with no-prep and Lumineers-style options in Los Angeles, including enamel prep, fit, and what a consultation reviews.',
  keywords:
    'porcelain vs no-prep veneers, lumineers vs porcelain veneers Los Angeles, no prep veneers, minimal prep veneers, ultra thin veneers Los Angeles',
  h1: 'Porcelain Veneers vs No-Prep Veneers in Los Angeles',
  breadcrumb: 'Porcelain vs No-Prep',
  eyebrow: 'Veneer options',
  heroAccent: 'No-Prep',
  subtitle:
    'Traditional porcelain veneers, no-prep veneers, and brand names such as Lumineers differ mainly in how much enamel is reduced and how the shells sit on the teeth. Dr. Alexie Aguil reviews the amount of preparation your teeth would need before you decide.',
  introEyebrow: 'Material and prep',
  introTitle: 'Two ways to cover a tooth, different amounts of enamel change',
  introTitleAccent: 'enamel change',
  introParagraphs: [
    'Porcelain veneers are thin ceramic shells bonded to the front of teeth to improve shape, color, chips, gaps, and uneven edges. At Exquisite Dentistry, each case is planned tooth by tooth with digital smile design and conservative preparation so as much natural enamel as possible is kept.',
    'Patients often ask about no-prep or ultra-thin veneers, including brand names such as Lumineers. Those products are marketed as needing little or no enamel removal. That can sound simpler, but the right approach depends on the tooth, the bite, and the look you want. This page explains the difference in general terms. It is not a claim that every smile, or every tooth, is a candidate for a no-prep shell.',
    'Dr. Aguil evaluates how much preparation your teeth would need and discusses alternatives before you decide. If a more conservative option can meet the goal, that is part of the conversation. If a flush, natural fit needs a small amount of enamel reduction, that is explained before any work begins.',
  ],
  sections: [
    {
      heading: 'How traditional porcelain veneers are planned',
      paragraphs: [
        'Custom porcelain veneers are fabricated in a dental lab after records, shade matching, and a smile design. Preparation is described on our veneers pages as conservative: only the enamel needed for a flush fit is reduced, often in the range of about 0.3 to 0.5mm where a front-tooth veneer needs space to sit without looking bulky.',
        'Because that step removes enamel, veneers that involve preparation are not reversible. The trade-off is control over thickness, shade, edge position, and how the veneer meets the neighboring teeth. Porcelain is stain-resistant compared with composite resin and is made to hold its color with ordinary care.',
      ],
      bullets: [
        'Lab-made porcelain layered for translucency and a natural finish',
        'Conservative enamel reduction only where a flush fit needs space',
        'Temporary veneers can be worn to test speech, bite, and shape',
        'Not reversible once enamel has been removed',
      ],
    },
    {
      heading: 'What “no-prep” and Lumineers-style veneers mean',
      paragraphs: [
        'No-prep veneers are very thin shells bonded with little or no enamel reduction. Lumineers is one brand name used for this category. In educational terms, the appeal is less change to the tooth. The limitation is space: if a tooth is not reduced, the added shell sits on top of the existing surface.',
        'That extra thickness can look bulky, catch light differently, or feel prominent at the bite edge, especially if the tooth is already full-sized or slightly forward. No-prep designs can be a reasonable discussion when a tooth is small, set back, or needs only a thin mask. They are a weaker match when the goal is to slim a tooth, even an edge, or hide a large change in color without adding bulk.',
        'Exquisite Dentistry does not treat a brand name as a plan. The exam looks at enamel, gum levels, bite, and the neighboring teeth, then compares porcelain veneers, composite bonding, whitening, or a crown when a tooth needs more coverage.',
      ],
      cards: [
        {
          title: 'Traditional porcelain',
          body: 'Custom lab porcelain with conservative prep for a flush fit, shade control, and a natural edge. Preparation that removes enamel is not reversible.',
        },
        {
          title: 'No-prep / ultra-thin',
          body: 'Very thin shells, sometimes sold under brand names such as Lumineers, that aim to limit enamel removal. Fit and bulk depend on the existing tooth.',
        },
        {
          title: 'Composite veneers',
          body: 'Tooth-colored resin shaped in the office, often in one visit, with less laboratory time. Easier to repair, more prone to staining, and usually a shorter lifespan than porcelain.',
        },
      ],
    },
    {
      heading: 'What a consultation actually decides',
      paragraphs: [
        'A consultation is the point where general comparisons become a plan for your teeth. Records, photographs, and a bite check show whether a thin additive shell can sit cleanly, or whether a small amount of enamel reduction would make the result look and feel more natural.',
        'If only one or two teeth are involved, shade matching against the untreated teeth is part of that same visit. Whitening of neighboring enamel is sometimes sequenced first so the veneer is not trying to hide a moving target. Cost is confirmed after that evaluation rather than quoted from a chart on this page.',
      ],
      links: [
        { label: 'Porcelain veneers overview', href: '/veneers/' },
        { label: 'Veneers cost in Los Angeles', href: '/veneers/cost-los-angeles/' },
        { label: 'Veneers vs crowns and bonding', href: '/veneers/vs-crowns-bonding/' },
        { label: 'Schedule a veneer consultation', href: CONSULTATION_HREF },
      ],
    },
  ],
  faqs: [
    {
      question: 'Are Lumineers the same as porcelain veneers?',
      answer:
        'Lumineers is a brand name often associated with ultra-thin, no-prep or minimal-prep veneers. Traditional porcelain veneers are custom lab shells that may involve conservative enamel preparation so they sit flush with the tooth. The names describe different approaches, not a single product.',
    },
    {
      question: 'Is a no-prep veneer always better because it removes less enamel?',
      answer:
        'Less enamel removal can be an advantage when the tooth has room for a thin shell. If the tooth is already full-sized, a no-prep veneer can look or feel bulky. Dr. Aguil reviews how much preparation your teeth would need and discusses alternatives before you decide.',
    },
    {
      question: 'Are veneers that involve enamel removal reversible?',
      answer:
        'Veneers that involve enamel removal are not reversible. That is one reason the practice starts with an exam and a clear discussion of prep, bonding, and other options such as whitening or composite bonding.',
    },
    {
      question: 'Do no-prep veneers last as long as traditional porcelain?',
      answer:
        'Longevity depends on material, bite, habits, and daily care. With proper care, porcelain veneers typically last 10 to 15 years. A no-prep or composite option may have a different maintenance path. Your consultation is the place to compare that for your teeth rather than from a general ranking.',
    },
  ],
  procedureName: 'Porcelain Veneers Compared with No-Prep Veneers',
  procedureDescription:
    'Educational comparison of traditional porcelain veneers and no-prep or Lumineers-style veneers, including conservative enamel preparation, fit, and consultation planning in Los Angeles.',
  preparation: [
    'Comprehensive consultation and examination',
    'Digital impressions and smile design',
    'Discussion of enamel preparation versus additive no-prep options',
  ],
  followupCare: [
    'Regular dental cleanings and checkups',
    'Non-abrasive toothpaste and gentle floss',
    'Nightguard if teeth grinding occurs',
  ],
  benefits: [
    'Clear comparison of prep versus no-prep approaches',
    'Conservative planning that keeps as much enamel as possible',
    'Custom porcelain when a flush, natural fit is the goal',
  ],
  recoveryTime: 'Immediate return to normal activities',
  relatedArticleTags: ['veneers', 'porcelain veneers', 'cosmetic dentistry'],
  lastUpdated: 'November 2026',
};

const VS_CROWNS_BONDING: VeneerGuidePage = {
  id: 'vs-crowns-bonding',
  path: '/veneers/vs-crowns-bonding',
  title: 'Veneers vs Crowns and Bonding in Los Angeles | Exquisite Dentistry',
  description:
    'Compare porcelain veneers with dental bonding and crowns in Los Angeles. See which option fits chips, stains, or damaged teeth before a consultation.',
  keywords:
    'veneers vs crowns, veneers vs bonding Los Angeles, porcelain veneers or bonding, dental crown vs veneer, composite bonding vs veneers',
  h1: 'Veneers vs Crowns and Bonding in Los Angeles',
  breadcrumb: 'Veneers vs Crowns & Bonding',
  eyebrow: 'Comparing options',
  heroAccent: 'Bonding',
  subtitle:
    'Porcelain veneers, composite bonding, and crowns can all change the look of a tooth. They cover different amounts of tooth structure and solve different problems. Dr. Alexie Aguil compares them after examining the tooth, not from a single preferred product.',
  introEyebrow: 'Choosing coverage',
  introTitle: 'The question is how much of the tooth needs to be rebuilt',
  introTitleAccent: 'rebuilt',
  introParagraphs: [
    'Veneers, bonding, and crowns are easy to mix up because each can improve color or a chipped edge. The useful distinction is how much of the tooth they cover and whether the tooth still has a sound foundation.',
    'Porcelain veneers are thin shells bonded to the front surface. They are used for chips, gaps, discoloration, and modest changes in shape when the tooth is otherwise healthy. Bonding uses tooth-colored resin on the same surface, usually with little or no enamel removal. Crowns cover up to the entire exterior of the tooth when the structure is cracked, heavily filled, or treated with a root canal.',
    'A lower fee or a shorter visit does not, by itself, tell you which option fits. The exam looks at enamel, the bite, and how much of the tooth is already missing before a recommendation is made.',
  ],
  sections: [
    {
      heading: 'Side by side: veneers, bonding, and crowns',
      paragraphs: [
        'Use this as a starting map, then confirm it against your own teeth. These descriptions match how the practice already explains the three options on its veneer, bonding, and crown pages.',
      ],
      cards: [
        {
          title: 'Porcelain veneers',
          body: 'Thin lab porcelain on the front of the tooth. Used for color, chips, small gaps, and shape when the tooth still has a healthy core. Usually planned over more than one visit. Preparation that removes enamel is not reversible.',
        },
        {
          title: 'Composite bonding',
          body: 'Tooth-colored resin shaped onto the tooth, often in a single visit, with little or no enamel removal. Useful for small chips, modest shape changes, and some cavities. More repairable than porcelain, and more prone to staining and chipping over time.',
        },
        {
          title: 'Porcelain crowns',
          body: 'A cap that covers up to the full exterior of the tooth to protect a weak, cracked, or root-canal-treated core. More of the tooth is prepared. A temporary crown is worn while the lab makes the final porcelain. Two visits are typical.',
        },
      ],
    },
    {
      heading: 'When a veneer is usually the conversation',
      paragraphs: [
        'Veneers are a fit when the front of the tooth is the issue and the rest of the tooth is sound: a dark shade that whitening cannot change enough, a chipped corner, a small gap, or an uneven edge. They can also be planned for two, four, or a wider smile zone so shade stays consistent across the teeth that show when you speak.',
        'Bonding can be the better first step when the change is small and you want to keep enamel untouched. It is also the material used to repair some cavities in a tooth-colored way. If the tooth has a large filling, a fracture, or needs the whole exterior replaced, a crown is designed for that job. Front teeth sometimes do well with bonding after a smaller injury; back teeth that take heavy bite force almost always need a crown if the remaining walls are thin.',
      ],
      links: [
        { label: 'Porcelain veneers', href: '/veneers/' },
        { label: 'Porcelain dental crowns', href: '/dental-crowns/' },
        { label: 'Single-tooth veneer vs bonding or a crown', href: '/veneers/1-tooth-veneer-los-angeles/' },
        { label: 'Veneers vs bonding article', href: '/blog/dental-veneers-vs-bonding-a-comprehensive-comparison-for-your-smile-makeover/' },
        { label: 'Veneers vs crowns article', href: '/blog/dental-veneers-vs-crowns/' },
      ],
    },
    {
      heading: 'Visits, insurance, and cost without a guess',
      paragraphs: [
        'Porcelain veneers are typically planned across a few visits: consultation and design, preparation and records, then bonding of the lab porcelain. Bonding is often completed in one visit. Crowns usually take two visits with a temporary in between while the lab fabricates the cap.',
        'Veneers are usually considered cosmetic, and most PPO plans do not cover cosmetic treatment. Crowns are often evaluated as restorative care when a tooth needs protection, which is why insurance may apply differently. That still depends on your plan and the diagnosis. Exact fees are confirmed at a consultation rather than listed here.',
      ],
      links: [
        { label: 'Are veneers covered by insurance?', href: '/blog/are-veneers-covered-by-insurance/' },
        { label: 'Veneers cost in Los Angeles', href: '/veneers/cost-los-angeles/' },
        { label: 'Insurance at Exquisite Dentistry', href: '/insurance/' },
        { label: 'Schedule a consultation', href: CONSULTATION_HREF },
      ],
    },
  ],
  faqs: [
    {
      question: 'Can bonding do the same job as a veneer?',
      answer:
        'Bonding can close a small chip, reshape an edge, or change color in a limited way. The resin is not as strong or stain-resistant as lab porcelain, so it is a better match for smaller changes. A veneer is discussed when the front of the tooth needs a more complete mask and a longer-wearing surface.',
    },
    {
      question: 'When is a crown recommended instead of a veneer?',
      answer:
        'A crown is used when the tooth needs a bolder solution than a front-surface covering: a crack, a large existing restoration, or a tooth treated with a root canal. The crown covers up to the entire exterior to protect the remaining core.',
    },
    {
      question: 'Will insurance help with veneers, bonding, or crowns?',
      answer:
        'Veneers are usually considered cosmetic and are not covered by most PPO plans. Bonding and crowns may be evaluated differently when they restore a damaged tooth. The team can help you understand what your plan includes after an exam.',
    },
    {
      question: 'Can a smile plan mix these options?',
      answer:
        'Yes. Some teeth in a smile may need a veneer, others bonding, and a weaker tooth may need a crown. Whitening or Invisalign is sometimes sequenced first so shade and position are stable before porcelain is made.',
    },
  ],
  procedureName: 'Porcelain Veneers Compared with Crowns and Bonding',
  procedureDescription:
    'Comparison of porcelain veneers, composite bonding, and porcelain crowns for chips, discoloration, and damaged teeth, planned with Dr. Alexie Aguil in Los Angeles.',
  preparation: [
    'Examination of enamel, bite, and existing restorations',
    'Discussion of veneer, bonding, and crown coverage',
    'Records and shade matching when a veneer or crown is planned',
  ],
  followupCare: [
    'Brushing, flossing, and routine cleanings',
    'Nightguard if clenching or grinding occurs',
    'Avoid using teeth as tools',
  ],
  benefits: [
    'Match the restoration to how much tooth structure is involved',
    'Keep healthy enamel when a smaller repair is enough',
    'Protect a weak tooth with a crown when a veneer would not be enough',
  ],
  recoveryTime: 'Immediate return to normal activities',
  relatedArticleTags: ['veneers', 'bonding', 'crowns', 'cosmetic dentistry'],
  lastUpdated: 'November 2026',
};

const WHAT_TO_EXPECT: VeneerGuidePage = {
  id: 'what-to-expect',
  path: '/veneers/what-to-expect',
  title: 'Veneer Process and Aftercare in Los Angeles | Exquisite Dentistry',
  description:
    'What to expect from porcelain veneers in Los Angeles: consultation, conservative prep, placement, and aftercare with Dr. Alexie Aguil.',
  keywords:
    'veneer process Los Angeles, what to expect with porcelain veneers, veneer aftercare, veneer recovery, porcelain veneer visits',
  h1: 'The Veneer Process: What to Expect and Aftercare',
  breadcrumb: 'What to Expect',
  eyebrow: 'What to expect',
  heroAccent: 'Aftercare',
  subtitle:
    'Porcelain veneers are planned in a short sequence of visits: consultation and design, conservative preparation, laboratory fabrication, and bonding. Afterward, daily care looks a lot like ordinary hygiene, with a few porcelain-specific habits.',
  introEyebrow: 'From consult to care',
  introTitle: 'A careful sequence, then ordinary daily habits',
  introTitleAccent: 'ordinary daily habits',
  introParagraphs: [
    'Most porcelain veneer plans at Exquisite Dentistry take a few visits rather than a single appointment. The first visit is an evaluation and smile design. Later visits cover any needed preparation, records for the lab, and bonding of the finished porcelain. Temporary veneers are often worn in between so you can test speech, bite, and shape.',
    'There is typically no recovery period in the sense of time off work. Once the veneers are bonded, you can return to normal activities the same day, with common-sense care around very hard foods and using your teeth as tools.',
    'This page gathers the process and aftercare already described on our veneers pages. It is a main-site guide. The preserved process document at /veneers/process/ remains available if you want that longer archive walkthrough.',
  ],
  sections: [
    {
      heading: 'The veneer process, step by step',
      paragraphs: [
        'The four steps below are the same sequence used on the porcelain veneers page. Some of those steps share a visit; others are separated so the laboratory has time to build the porcelain.',
      ],
      steps: [
        {
          step: '01',
          title: 'Consultation and design',
          description:
            'A thorough evaluation and digital smile design to preview shape and shade. Dr. Alexie Aguil looks at your goals, your bite, and how much preparation your teeth would need, and talks through alternatives before you decide.',
        },
        {
          step: '02',
          title: 'Preparation',
          description:
            'Conservative enamel reshaping only where a flush fit needs space, then precise impressions or scans for the laboratory. Temporary veneers may be placed so you can live with the design before finals are made.',
        },
        {
          step: '03',
          title: 'Fabrication',
          description:
            'A dental lab creates the custom porcelain. Layers are chosen to match complexion and the way neighboring teeth catch light. This is laboratory time, not chair time.',
        },
        {
          step: '04',
          title: 'Placement',
          description:
            'The porcelain is bonded, the bite is refined, and final adjustments are made. You leave with the new restorations in place and a clear aftercare plan.',
        },
      ],
    },
    {
      heading: 'How to care for veneers after they are bonded',
      paragraphs: [
        'Care for veneers much like natural teeth: brush twice daily, floss, and keep professional cleanings. Porcelain is stain-resistant compared with composite resin, but the tooth and gum around the margin still need daily cleaning.',
        'Avoid using your teeth as tools, chewing ice, or opening packages with your bite. If you grind or clench, a nightguard protects the porcelain edges. A mouthguard is also wise for sports. Non-abrasive toothpaste and gentle floss protect the finish and keep the margins clean.',
      ],
      tips: [
        'Brush twice daily for two minutes and floss once a day.',
        'Use a soft-bristle brush and non-abrasive toothpaste; replace the brush when the bristles wear.',
        'Keep professional cleanings. Hygienists trained in veneer-safe polishing paste can clean without scratching porcelain.',
        'Wear a nightguard if you clench or grind, and a mouthguard for sports.',
        'Do not use your teeth to open packages, bite nails, or chew ice.',
        'Schedule a bite check after major dental or orthodontic work so the veneers stay balanced.',
      ],
      links: [
        { label: 'Porcelain veneers overview', href: '/veneers/' },
        { label: 'Archive process walkthrough', href: '/veneers/process/' },
        { label: 'Restoration and maintenance article', href: '/blog/restoration-and-maintenance-for-dental-veneers/' },
        { label: 'Smile gallery veneer results', href: '/smile-gallery/?treatment=veneers' },
      ],
    },
    {
      heading: 'How long veneers last in typical use',
      paragraphs: [
        'With proper care and regular dental visits, porcelain veneers typically last 10 to 15 years. Longevity varies with hygiene, bite habits, and daily use. That range is a typical expectation, not a promise that every case will reach it.',
        'If a veneer chips later, the usual path is to remake that porcelain rather than patch it the way composite can be repaired. Come in promptly if something feels high, loose, or rough rather than waiting for a routine visit.',
      ],
      links: [
        { label: 'American Dental Association veneer overview', href: 'https://www.mouthhealthy.org/all-topics-a-z/veneers' },
        { label: 'Schedule a veneer consultation', href: CONSULTATION_HREF },
      ],
    },
  ],
  faqs: [
    {
      question: 'How many visits do porcelain veneers take?',
      answer:
        'Porcelain veneers are typically planned across a few visits: consultation and design, preparation and records, then bonding of the lab porcelain. Temporary veneers are often worn between the preparation and placement visits.',
    },
    {
      question: 'Can I eat normally after veneers are bonded?',
      answer:
        'Once the veneers are bonded, you can eat most foods normally. Avoid extremely hard foods and do not use your teeth as tools. There is typically no downtime after the placement visit.',
    },
    {
      question: 'How do I clean around veneers?',
      answer:
        'Brush twice daily, floss, and keep professional cleanings. Use non-abrasive toothpaste and a soft brush. The porcelain resists stains; the gumline and neighboring enamel still need ordinary daily care.',
    },
    {
      question: 'Do I need a nightguard?',
      answer:
        'If you clench or grind, a nightguard helps protect porcelain edges. Mention grinding at the consultation so it can be planned with the veneers rather than after a chip.',
    },
  ],
  procedureName: 'Porcelain Veneer Process and Aftercare',
  procedureDescription:
    'The porcelain veneer process in Los Angeles, from consultation and conservative preparation through laboratory fabrication, bonding, and daily aftercare.',
  preparation: [
    'Comprehensive consultation and examination',
    'Digital impressions and smile design',
    'Color matching to existing teeth',
  ],
  followupCare: [
    'Regular dental cleanings and checkups',
    'Avoid using teeth as tools',
    'Consider a nightguard if teeth grinding occurs',
  ],
  benefits: [
    'Clear view of each visit before treatment begins',
    'Conservative preparation that keeps as much enamel as possible',
    'Daily care that matches ordinary hygiene with porcelain-specific habits',
  ],
  recoveryTime: 'Immediate return to normal activities',
  relatedArticleTags: ['veneers', 'porcelain veneers', 'cosmetic dentistry', 'smile makeover'],
  lastUpdated: 'November 2026',
};

export const VENEER_GUIDE_PAGES: Record<VeneerGuideId, VeneerGuidePage> = {
  'porcelain-vs-no-prep': PORCELAIN_VS_NO_PREP,
  'vs-crowns-bonding': VS_CROWNS_BONDING,
  'what-to-expect': WHAT_TO_EXPECT,
};

export const VENEER_GUIDE_PAGE_LIST: VeneerGuidePage[] = VENEER_GUIDE_IDS.map(
  (id) => VENEER_GUIDE_PAGES[id],
);

export const getVeneerGuidePage = (id: VeneerGuideId): VeneerGuidePage => VENEER_GUIDE_PAGES[id];

export const VENEER_GUIDE_CLUSTER_LINKS: VeneerGuideLink[] = [
  { label: 'Porcelain vs no-prep veneers', href: '/veneers/porcelain-vs-no-prep/' },
  { label: 'Veneers vs crowns and bonding', href: '/veneers/vs-crowns-bonding/' },
  { label: 'Veneer process and aftercare', href: '/veneers/what-to-expect/' },
];

const assertNever = (value: never): never => {
  throw new Error(`Unhandled veneer guide: ${String(value)}`);
};

export const getVeneerGuideHeroTitleParts = (
  id: VeneerGuideId,
): { lead: string; accent: string; tail: string } => {
  switch (id) {
    case 'porcelain-vs-no-prep':
      return { lead: 'Porcelain Veneers vs ', accent: 'No-Prep', tail: ' Veneers in Los Angeles' };
    case 'vs-crowns-bonding':
      return { lead: 'Veneers vs Crowns and ', accent: 'Bonding', tail: ' in Los Angeles' };
    case 'what-to-expect':
      return { lead: 'The Veneer Process: What to Expect and ', accent: 'Aftercare', tail: '' };
    default:
      return assertNever(id);
  }
};

export const getVeneerGuideStaticSections = (guide: VeneerGuidePage) =>
  guide.sections.map((section) => ({
    heading: section.heading,
    paragraphs: [
      ...section.paragraphs,
      ...(section.cards ?? []).map((card) => `${card.title}. ${card.body}`),
      ...(section.steps ?? []).map((step) => `${step.title}. ${step.description}`),
    ],
    ...(section.bullets?.length || section.tips?.length
      ? { bullets: [...(section.bullets ?? []), ...(section.tips ?? [])] }
      : {}),
    ...(section.links?.length ? { links: section.links.map((link) => ({ ...link })) } : {}),
  }));

export const getVeneerGuideProcedureSteps = (guide: VeneerGuidePage) => {
  const steps = guide.sections.flatMap((section) => section.steps ?? []);
  if (steps.length) {
    return steps.map((step) => ({ name: step.title, description: step.description }));
  }
  return guide.sections.slice(0, 3).map((section) => ({
    name: section.heading,
    description: section.paragraphs[0] ?? guide.procedureDescription,
  }));
};
