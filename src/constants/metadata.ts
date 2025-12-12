export type PageMetadata = {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
};

const DEFAULT_OG_IMAGE =
  'https://exquisitedentistryla.com/lovable-uploads/dr-aguil-banner-2024-m.webp';

export const ROUTE_METADATA: Record<string, PageMetadata> = {
  '/': {
    title: 'Cosmetic Dentist Los Angeles | Dr. Aguil | Exquisite Dentistry',
    description:
      "Transform your smile with Los Angeles' most trusted cosmetic dentist. Dr. Aguil delivers Hollywood-quality results in a spa-like setting. Book today!",
    keywords:
      'cosmetic dentist Los Angeles, porcelain veneers, teeth whitening, smile makeover, Beverly Hills dentist, dental implants, cosmetic dentistry',
    ogImage:
      'https://exquisitedentistryla.com/lovable-uploads/2e2732fc-c4a6-4f21-9829-3717d9b2b36d.png'
  },
  '/about': {
    title:
      'Dr. Alexie Aguil | Los Angeles Cosmetic Dentist | Exquisite Dentistry',
    description:
      "Meet Dr. Alexie Aguil, Los Angeles' award-winning cosmetic dentist with 15+ years creating celebrity smiles. Artistic vision meets gentle care.",
    keywords:
      'Dr. Alexie Aguil, cosmetic dentist Los Angeles, dental expertise, smile transformation, porcelain veneers specialist, Beverly Hills dentist',
    ogImage: DEFAULT_OG_IMAGE
  },
  '/services': {
    title:
      'Cosmetic & Restorative Dentistry Los Angeles | Exquisite Dentistry',
    description:
      'Complete cosmetic dentistry in LA: porcelain veneers, Zoom whitening, Invisalign & implants. Advanced techniques, natural results. Call today!',
    keywords:
      'cosmetic dental services, porcelain veneers Los Angeles, teeth whitening, dental implants, smile makeover, dental crowns, cosmetic dentistry Beverly Hills',
    ogImage:
      'https://exquisitedentistryla.com/lovable-uploads/2e2732fc-c4a6-4f21-9829-3717d9b2b36d.png'
  },
  '/veneers': {
    title: 'Porcelain Veneers Los Angeles | Exquisite Dentistry',
    description:
      'Custom porcelain veneers in Los Angeles. Transform 1-8 teeth with ultra-thin shells. Natural results, minimal prep. Free consultation available.',
    keywords:
      'porcelain veneers, Los Angeles veneers, smile makeover, cosmetic dentistry, dental veneers',
    ogImage:
      'https://exquisitedentistryla.com/lovable-uploads/2e2732fc-c4a6-4f21-9829-3717d9b2b36d.png'
  },
  '/invisalign': {
    title:
      'Invisalign Clear Aligners Los Angeles | Exquisite Dentistry',
    description:
      'Invisalign in Los Angeles guided by Dr. Alexie Aguil delivers discreet aligner treatment, digital planning, and concierge check-ins for busy professionals.',
    keywords:
      'Invisalign Los Angeles, clear aligners LA, Invisalign dentist LA, adult orthodontics, clear braces',
    ogImage:
      'https://exquisitedentistryla.com/lovable-uploads/dc09fcc1-c9b0-4ab9-9244-4bbdffa8b5cb.webp'
  },
  '/invisalign-beverly-hills': {
    title: 'Invisalign Near Beverly Hills | Exquisite Dentistry',
    description:
      'Invisalign near Beverly Hills with Dr. Alexie Aguil, DDS. Clear aligners planned with iTero scans, flexible visits, and comfort-first care on Wilshire Blvd in Los Angeles.',
    keywords:
      'invisalign beverly hills, invisalign near beverly hills, clear aligners beverly hills, adult orthodontics beverly hills',
    ogImage:
      'https://exquisitedentistryla.com/lovable-uploads/dc09fcc1-c9b0-4ab9-9244-4bbdffa8b5cb.webp'
  },
  '/teeth-whitening': {
    title:
      'Teeth Whitening Los Angeles | Professional Smile Brightening',
    description:
      'Professional teeth whitening in Los Angeles with Zoom power whitening, custom take-home kits, and concierge maintenance plans for lasting radiance.',
    keywords:
      'teeth whitening Los Angeles, professional whitening LA, Zoom whitening Los Angeles, cosmetic dentist whitening',
    ogImage:
      'https://exquisitedentistryla.com/lovable-uploads/2e2732fc-c4a6-4f21-9829-3717d9b2b36d.png'
  },
  '/culver-city-teeth-whitening': {
    title: 'Teeth Whitening Near Culver City | Exquisite Dentistry LA',
    description:
      'Teeth whitening near Culver City with in-office whitening and custom take-home trays—comfort-first care at our Wilshire Blvd Los Angeles studio.',
    keywords:
      'culver city teeth whitening, teeth whitening near culver city, zoom whitening near culver city, professional whitening los angeles',
    ogImage:
      'https://exquisitedentistryla.com/lovable-uploads/2e2732fc-c4a6-4f21-9829-3717d9b2b36d.png'
  },
  '/zoom-whitening': {
    title: 'Zoom Whitening Los Angeles | Exquisite Dentistry',
    description:
      'Zoom teeth whitening in Los Angeles brightens your smile fast—often 3–8 shades in about 60–90 minutes. Comfort-first protocol on Wilshire Blvd.',
    keywords:
      'Zoom whitening, teeth whitening Los Angeles, professional whitening, dental whitening, bright smile',
    ogImage:
      'https://exquisitedentistryla.com/lovable-uploads/2e2732fc-c4a6-4f21-9829-3717d9b2b36d.png'
  },
  '/dental-implants': {
    title: 'Dental Implants Los Angeles | Exquisite Dentistry',
    description:
      'Dental implants in Los Angeles with guided surgery, bone regeneration, and custom restorations that restore chewing power and confident smiles.',
    keywords:
      'dental implants Los Angeles, implant dentist LA, tooth replacement, full arch implants LA',
    ogImage:
      'https://exquisitedentistryla.com/lovable-uploads/dc09fcc1-c9b0-4ab9-9244-4bbdffa8b5cb.webp'
  },
  '/cosmetic-dentistry': {
    title: 'Cosmetic Dentistry Los Angeles | Exquisite Dentistry',
    description:
      'Cosmetic dentistry in Los Angeles with bespoke veneers, Invisalign, whitening, and bonding to create camera-ready smiles that fit your lifestyle.',
    keywords:
      'cosmetic dentistry Los Angeles, smile makeover LA, cosmetic dentist Beverly Hills, veneers and Invisalign LA',
    ogImage:
      'https://exquisitedentistryla.com/lovable-uploads/fd45d438-10a2-4bde-9162-a38816b28958.webp'
  },
  '/smile-makeover-los-angeles': {
    title: 'Smile Makeover Los Angeles | Exquisite Dentistry',
    description:
      'Plan a smile makeover in Los Angeles with Dr. Alexie Aguil, DDS. Veneers, whitening, Invisalign, bonding, and implants coordinated with comfort-first care.',
    keywords:
      'smile makeover los angeles, smile makeover la, cosmetic dentist los angeles, veneers los angeles, teeth whitening los angeles, invisalign los angeles',
    ogImage:
      'https://exquisitedentistryla.com/lovable-uploads/fd45d438-10a2-4bde-9162-a38816b28958.webp'
  },
  '/emergency-dentist': {
    title: 'Emergency Dentist Los Angeles | Exquisite Dentistry',
    description:
      'Emergency dentist in Los Angeles providing same-day appointments, after-hours guidance, and concierge treatment for urgent dental needs.',
    keywords:
      'emergency dentist Los Angeles, same-day dental care LA, urgent dentist, after-hours dentist LA',
    ogImage:
      'https://exquisitedentistryla.com/lovable-uploads/2e2732fc-c4a6-4f21-9829-3717d9b2b36d.png'
  },
  '/contact': {
    title: 'Schedule Appointment | Exquisite Dentistry LA',
    description:
      'Schedule your consultation with Dr. Aguil in Los Angeles. Convenient Wilshire Blvd location, flexible hours. Call (323) 272-2388 or book online!',
    keywords:
      'contact dentist Los Angeles, dental appointment booking, Exquisite Dentistry location, cosmetic dentist consultation, dental office Wilshire Blvd',
    ogImage: DEFAULT_OG_IMAGE
  },
  '/testimonials': {
    title:
      'Patient Reviews & Testimonials Los Angeles | Exquisite Dentistry',
    description:
      'Read verified patient reviews and watch video testimonials. See why patients choose Dr. Aguil for cosmetic dentistry in Los Angeles.',
    keywords:
      'dental reviews Los Angeles, patient testimonials, cosmetic dentistry reviews, Dr. Alexie Aguil reviews, dental patient experiences, verified reviews',
    ogImage:
      'https://exquisitedentistryla.com/lovable-uploads/2e2732fc-c4a6-4f21-9829-3717d9b2b36d.png'
  },
  '/smile-gallery': {
    title:
      'Smile Gallery Los Angeles | Before & After | Exquisite Dentistry',
    description:
      'View stunning before & after smile transformations. Real patient results from porcelain veneers, whitening, and full makeovers in LA.',
    keywords:
      'smile gallery Los Angeles, before after dental photos, smile transformation results, porcelain veneers before after, cosmetic dentistry results, patient transformations',
    ogImage: DEFAULT_OG_IMAGE
  },
  '/faqs': {
    title: 'Dental FAQs Los Angeles | Exquisite Dentistry',
    description:
      'Get answers to common dental questions: veneer costs, insurance coverage, treatment time, recovery. Expert guidance from our LA dental team.',
    keywords:
      'dental FAQ, cosmetic dentistry questions, dental insurance Los Angeles, dental appointment questions, teeth whitening FAQ, veneers questions',
    ogImage:
      'https://exquisitedentistryla.com/lovable-uploads/2e2732fc-c4a6-4f21-9829-3717d9b2b36d.png'
  },
  '/blog': {
    title:
      'Cosmetic Dentistry Blog Los Angeles | Exquisite Dentistry',
    description:
      'Stay current with Exquisite Dentistry’s Los Angeles cosmetic dental insights. Discover veneers, whitening breakthroughs, patient stories, and advanced oral health techniques.',
    keywords:
      'dental blog, cosmetic dentistry, oral health, dental tips, Dr. Alexie Aguil, dental expert insights, Beverly Hills dentist',
    ogImage:
      'https://exquisitedentistryla.com/lovable-uploads/2e2732fc-c4a6-4f21-9829-3717d9b2b36d.png'
  }
};

export const getRouteMetadata = (path: string): PageMetadata => {
  return ROUTE_METADATA[path] ?? ROUTE_METADATA['/'];
};
