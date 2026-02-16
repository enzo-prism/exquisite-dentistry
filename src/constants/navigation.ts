export interface NavigationItem {
  label: string;
  to: string;
  description?: string;
}

export const DESKTOP_PRIMARY_LINKS: NavigationItem[] = [
  { label: 'Smile Gallery', to: '/smile-gallery' },
  { label: 'Patient Reviews', to: '/testimonials' },
  { label: 'About Dr. Aguil', to: '/about' },
  { label: 'Locations', to: '/locations' },
];

export const DESKTOP_CORE_LINKS: NavigationItem[] = DESKTOP_PRIMARY_LINKS.slice(0, 2);
export const DESKTOP_EXPANDED_LINKS: NavigationItem[] = DESKTOP_PRIMARY_LINKS.slice(2);
export const DESKTOP_MORE_LINKS: NavigationItem[] = [
  ...DESKTOP_EXPANDED_LINKS,
  { label: 'Contact', to: '/contact' },
];

export const SERVICE_MENU_LINKS: NavigationItem[] = [
  {
    label: 'All Services',
    to: '/services',
    description: 'Explore every treatment and your best-fit options.',
  },
  {
    label: 'Porcelain Veneers',
    to: '/veneers',
    description: 'Signature smile transformations with custom design.',
  },
  {
    label: 'Dental Implants',
    to: '/dental-implants',
    description: 'Long-term tooth replacement with natural function.',
  },
  {
    label: 'Invisalign',
    to: '/invisalign',
    description: 'Clear aligners for discreet, predictable straightening.',
  },
  {
    label: 'Teeth Whitening',
    to: '/teeth-whitening',
    description: 'Professional whitening for brighter, camera-ready smiles.',
  },
  {
    label: 'Emergency Dentist',
    to: '/emergency-dentist',
    description: 'Fast relief when you need urgent dental care.',
  },
];

export const POPULAR_SERVICE_LINKS: NavigationItem[] = SERVICE_MENU_LINKS.filter(
  (item) => item.to !== '/services',
);

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

export const MOBILE_PRIMARY_LINKS: NavigationItem[] = [
  { label: 'Services', to: '/services' },
  { label: 'Smile Gallery', to: '/smile-gallery' },
  { label: 'Patient Reviews', to: '/testimonials' },
  { label: 'About Dr. Aguil', to: '/about' },
  { label: 'Locations', to: '/locations' },
  { label: 'Contact', to: '/contact' },
];

export const MOBILE_SECONDARY_LINKS: NavigationItem[] = [
  { label: 'Client Experience', to: '/client-experience' },
  { label: 'Blog', to: '/blog' },
  { label: 'FAQs', to: '/faqs' },
];
