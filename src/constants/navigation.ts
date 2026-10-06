/**
 * Site navigation — the single source for the header (desktop bar + mega menu)
 * and the mobile menu. Every `to` must be a route that exists in `src/App.tsx`.
 * Descriptions follow the site voice: calm, plain, no claims or superlatives.
 */
export interface NavigationItem {
  label: string;
  to: string;
  description?: string;
}

export interface ServiceGroup {
  id: string;
  title: string;
  summary?: string;
  items: NavigationItem[];
}

export const ALL_SERVICES_LINK: NavigationItem = {
  label: 'All services',
  to: '/services',
  description: 'Every treatment we offer, in one place.',
};

export const FINANCING_LINK: NavigationItem = { label: 'Financing', to: '/payment-plans' };

/** Services mega menu (desktop) and the expandable Services group (mobile). */
export const SERVICE_GROUPS: ServiceGroup[] = [
  {
    id: 'cosmetic',
    title: 'Cosmetic',
    summary: 'Change how your smile looks.',
    items: [
      { label: 'Porcelain Veneers', to: '/veneers', description: 'Custom porcelain shaped to your smile.' },
      { label: 'Smile Makeovers', to: '/smile-makeover-los-angeles', description: 'One plan built around your goals.' },
      { label: 'Teeth Whitening', to: '/teeth-whitening', description: 'Professional whitening for a brighter shade.' },
      { label: 'Invisalign', to: '/invisalign', description: 'Clear aligners to straighten teeth discreetly.' },
    ],
  },
  {
    id: 'restorative',
    title: 'Restorative',
    summary: 'Repair or replace teeth.',
    items: [
      { label: 'Dental Implants', to: '/dental-implants', description: 'Long-term replacement for missing teeth.' },
      { label: 'Dental Crowns', to: '/dental-crowns', description: 'Protect and restore a weakened tooth.' },
      { label: 'Dental Bridges', to: '/dental-bridge', description: 'Fill the space left by a missing tooth.' },
      { label: 'Root Canal Therapy', to: '/root-canal', description: 'Treat infection and keep your natural tooth.' },
    ],
  },
  {
    id: 'care',
    title: 'Everyday care',
    summary: 'Checkups, comfort and urgent care.',
    items: [
      { label: 'Teeth Cleaning', to: '/teeth-cleaning', description: 'Routine cleanings and checkups.' },
      { label: 'Emergency Dentist', to: '/emergency-dentist', description: 'Care for pain, breaks and urgent problems.' },
      { label: 'Pain-Free Dentistry', to: '/pain-free-dentistry', description: 'Comfort options for a calmer visit.' },
      { label: 'iTero Scanner', to: '/itero-scanner', description: 'Digital impressions, no putty trays.' },
    ],
  },
];

/** Smaller services shown in the mega menu's footer row. */
export const SERVICE_EXTRAS: NavigationItem[] = [
  { label: 'Cosmetic Dentistry', to: '/cosmetic-dentistry' },
  { label: 'Zoom Whitening', to: '/zoom-whitening' },
  { label: 'Oral Cancer Screening', to: '/oral-cancer-screening' },
];

/** Desktop primary links that sit between the Services and More disclosures. */
export const DESKTOP_PRIMARY_LINKS: NavigationItem[] = [
  { label: 'Smile Gallery', to: '/smile-gallery' },
  { label: 'Reviews', to: '/testimonials' },
  { label: 'About', to: '/about' },
  FINANCING_LINK,
];

/** Desktop "More" disclosure, in two small groups. */
export const DESKTOP_MORE_GROUPS: ServiceGroup[] = [
  {
    id: 'visit',
    title: 'Plan your visit',
    items: [
      { label: 'Insurance', to: '/insurance' },
      { label: 'Locations', to: '/locations' },
      { label: 'FAQs', to: '/faqs' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    id: 'practice',
    title: 'The practice',
    items: [
      { label: 'Our Team', to: '/why-us/team-excellence' },
      { label: 'Client Experience', to: '/client-experience' },
      { label: 'Transformation Stories', to: '/transformation-stories' },
      { label: 'Blog', to: '/blog' },
    ],
  },
];

export const DESKTOP_MORE_LINKS: NavigationItem[] = DESKTOP_MORE_GROUPS.flatMap((group) => group.items);

/** Large links in the mobile menu (Services is the expandable row above these). */
export const MOBILE_PRIMARY_LINKS: NavigationItem[] = [
  { label: 'Smile Gallery', to: '/smile-gallery' },
  { label: 'Patient Reviews', to: '/testimonials' },
  { label: 'About Dr. Aguil', to: '/about' },
  FINANCING_LINK,
  { label: 'Locations', to: '/locations' },
  { label: 'Contact', to: '/contact' },
];

export const MOBILE_SECONDARY_LINKS: NavigationItem[] = [
  { label: 'Insurance', to: '/insurance' },
  { label: 'Our Team', to: '/why-us/team-excellence' },
  { label: 'Client Experience', to: '/client-experience' },
  { label: 'Transformation Stories', to: '/transformation-stories' },
  { label: 'Blog', to: '/blog' },
  { label: 'FAQs', to: '/faqs' },
];

/** Paths that light up the Services item as the current section. */
export const SERVICE_SECTION_MATCHES = [
  '/services',
  '/veneers',
  '/dental-implants',
  '/invisalign',
  '/teeth-whitening',
  '/teeth-cleaning',
  '/zoom-whitening',
  '/dental-crowns',
  '/dental-bridge',
  '/root-canal',
  '/cosmetic-dentistry',
  '/emergency-dentist',
  '/pain-free-dentistry',
  '/oral-cancer-screening',
  '/itero-scanner',
  '/smile-makeover-los-angeles',
] as const;

/** Normalise trailing slashes so `/veneers/` and `/veneers` compare equal. */
const normalisePath = (path: string) => (path.length > 1 ? path.replace(/\/+$/, '') : path);

export const matchesPath = (pathname: string, to: string) => {
  const current = normalisePath(pathname);
  const target = normalisePath(to);
  return current === target || current.startsWith(`${target}/`);
};

export const isServicesPath = (pathname: string) =>
  SERVICE_SECTION_MATCHES.some((path) => matchesPath(pathname, path));

export const isMorePath = (pathname: string) =>
  DESKTOP_MORE_LINKS.some((item) => matchesPath(pathname, item.to));
