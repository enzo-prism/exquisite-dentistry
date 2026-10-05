import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SCHEDULE_CONSULTATION_PATH } from '@/constants/urls';
import { trackConsultationIntent } from '@/utils/vercelAnalytics';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Instagram,
  Facebook,
  Youtube,
  Star,
  ArrowRight
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import ImageComponent from '@/components/Image';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import PhoneLink from '@/components/PhoneLink';
import OfficeStatus from '@/components/OfficeStatus';
import { useHasClosingCta } from '@/lib/closingCta';
import {
  PHONE_NUMBER_DISPLAY,
  EMAIL,
  ADDRESS,
  SOCIAL_MEDIA,
  BUSINESS_HOURS
} from '@/constants/contact';
import { GOOGLE_MAPS_SHORT_URL } from '@/constants/urls';
import { INSURANCE_FOOTER_SUMMARY } from '@/data/insurance';
import { generateUTMUrl, UTM_PARAMETERS } from '@/utils/utmTracking';
import { openAnalyticsPreferences } from '@/utils/googleAnalytics';

type FooterLink = {
  label: string;
  to?: string;
  href?: string;
};

const POPULAR_PAGES: FooterLink[] = [
  { label: 'Dental Implants', to: '/dental-implants/' },
  { label: 'Porcelain Veneers', to: '/veneers/' },
  { label: 'Insurance Accepted', to: '/insurance/' },
  { label: 'Payment Plans', to: '/payment-plans/' },
  { label: 'Beverly Hills Dentist', to: '/beverly-hills-dentist/' },
  { label: 'Smile Gallery', to: '/smile-gallery/' },
  { label: 'Schedule Consultation', to: '/schedule-consultation/' }
];

const FOOTER_SECTIONS: { id: string; title: string; links: FooterLink[] }[] = [
  {
    id: 'practice',
    title: 'Practice',
    links: [
      { label: 'Home', to: '/' },
      { label: 'About Dr. Aguil', to: '/about/' },
      { label: 'Team Excellence', to: '/why-us/team-excellence/' },
      { label: 'Client Experience', to: '/client-experience/' },
      { label: 'Testimonials', to: '/testimonials/' },
      { label: 'Blog', to: '/blog/' },
      { label: 'Contact', to: '/contact/' }
    ]
  },
  {
    id: 'services',
    title: 'Signature Services',
    links: [
      { label: 'Porcelain Veneers', to: '/veneers/' },
      { label: 'Invisalign', to: '/invisalign/' },
      { label: 'Teeth Whitening', to: '/teeth-whitening/' },
      { label: 'Zoom Whitening', to: '/zoom-whitening/' },
      { label: 'Dental Implants', to: '/dental-implants/' },
      { label: 'Cosmetic Dentistry', to: '/cosmetic-dentistry/' },
      { label: 'Emergency Dentist', to: '/emergency-dentist/' },
      { label: 'Wedding Smiles', to: '/wedding/' },
      { label: 'Graduation Ready', to: '/graduation/' }
    ]
  },
  {
    id: 'neighborhoods',
    title: 'Neighborhoods',
    links: [
      { label: '90048 Dentist', to: '/90048-dentist/' },
      { label: 'Bel Air Dentist', to: '/bel-air-dentist/' },
      { label: 'Melrose Dentist', to: '/melrose-dentist/' },
      { label: 'West Hollywood Dentist', to: '/west-hollywood-dentist/' },
      { label: 'Westwood Dentist', to: '/westwood-dentist/' }
    ]
  },
  {
    id: 'resources',
    title: 'Client Resources',
    links: [
      { label: 'Transformation Stories', to: '/transformation-stories/' },
      { label: 'Insurance Accepted', to: '/insurance/' },
      { label: 'Smile Gallery', to: '/smile-gallery/' },
      { label: 'Payment Plans', to: '/payment-plans/' },
      { label: 'FAQs', to: '/faqs/' },
      { label: 'Editorial Policy', to: '/editorial-policy/' }
    ]
  }
];

const reviewStars = Array.from({ length: 5 });

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { pathname } = useLocation();
  // Pages that already end on their own booking actions skip the duplicate panel.
  const pageHasClosingCta = useHasClosingCta();
  const showCtaPanel =
    !pageHasClosingCta && !['/', '/schedule-consultation/', '/schedule-consultation', '/contact/', '/contact'].includes(pathname);

  const renderLinks = (links: FooterLink[]) => (
    <ul className="space-y-3 text-sm text-white/80">
      {links.map((link) => {
        const content = (
          <span className="group-hover:translate-x-1 transition-transform">
            {link.label}
          </span>
        );

        if (link.href) {
          return (
            <li key={link.label}>
              <a
                href={link.href}
                className="flex min-h-7 items-center justify-between text-white/70 transition-colors hover:text-gold group"
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                {content}
              </a>
            </li>
          );
        }

        return (
          <li key={link.label}>
            <Link
              to={link.to as string}
              className="flex min-h-7 items-center justify-between text-white/70 transition-colors hover:text-gold group"
            >
              {content}
            </Link>
          </li>
        );
      })}
    </ul>
  );

  return (
    <footer className="relative overflow-hidden bg-black pb-[var(--mobile-action-bar-space,0px)] text-white md:pb-0">
      {/* Ambient glow as plain gradients: huge `filter: blur()` blobs made WebKit
          drop paint tiles near the top of long pages. */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(40rem_24rem_at_100%_0%,rgba(185,162,124,0.12),transparent_70%),radial-gradient(36rem_28rem_at_0%_100%,rgba(255,255,255,0.03),transparent_70%)]"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
        {/* CTA Panel */}
        {showCtaPanel && (
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(120%_140%_at_100%_0%,rgba(185,162,124,0.22),transparent_55%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))] p-6 sm:p-8 md:p-10">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="eyebrow eyebrow--light">Ready to start?</p>
                <h2 className="mt-4 text-[clamp(1.6rem,3.2vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.02em]">
                  Plan your visit with <span className="accent-serif text-champagne">Dr. Aguil</span>
                </h2>
                <p className="mt-4 text-sm leading-7 text-white/70 md:text-base">
                  Book online, request a callback, or call the office. Our team will help you choose the right appointment.
                </p>
                <OfficeStatus className="mt-5" />
              </div>
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <Button className="h-12 w-full whitespace-nowrap bg-gold px-7 text-[15px] font-semibold sm:w-auto" asChild>
                  <Link
                    to={SCHEDULE_CONSULTATION_PATH}
                    onClick={() => trackConsultationIntent({ source: 'footer_cta', ctaText: 'Schedule Consultation', destination: SCHEDULE_CONSULTATION_PATH })}
                    className="inline-flex w-full justify-center sm:w-auto"
                  >
                    Schedule Consultation
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Button variant="glass" className="h-12 w-full whitespace-nowrap px-6 text-[15px] sm:w-auto" asChild>
                  <PhoneLink
                    phoneNumber={PHONE_NUMBER_DISPLAY}
                    analyticsSource="footer_cta"
                    className="flex items-center justify-center gap-2"
                  >
                    <Phone size={16} className="text-champagne" aria-hidden="true" />
                    <span className="font-semibold tracking-wide">Call {PHONE_NUMBER_DISPLAY}</span>
                  </PhoneLink>
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Reviews + Social */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex text-gold">
              {reviewStars.map((_, index) => (
                <Star key={index} size={18} fill="currentColor" />
              ))}
            </div>
            <p className="text-sm text-white/80">
              Five-star care, in patients&apos; own words
            </p>
          </div>

          <div className="flex items-center gap-3">
            {[SOCIAL_MEDIA.instagram, SOCIAL_MEDIA.facebook, SOCIAL_MEDIA.youtube].map(
              (href, index) => {
                const Icon = [Instagram, Facebook, Youtube][index];
                const utm = [
                  UTM_PARAMETERS.socialMedia.instagram,
                  UTM_PARAMETERS.socialMedia.facebook,
                  UTM_PARAMETERS.socialMedia.youtube
                ][index];

                return (
                  <a
                    key={href}
                    href={generateUTMUrl(href, utm)}
                    className="h-11 w-11 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:text-black hover:bg-gold transition-all duration-200 hover:scale-105 active:scale-95"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit our ${
                      ['Instagram', 'Facebook', 'YouTube'][index]
                    }`}
                  >
                    <Icon size={18} />
                  </a>
                );
              }
            )}
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-white/70">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-light">
            Insurance Accepted
          </p>
          <p className="mt-2">
            {INSURANCE_FOOTER_SUMMARY}{' '}
            <Link
              to="/insurance/"
              className="font-semibold text-gold-light underline underline-offset-4 hover:no-underline"
            >
              Verify your benefits
            </Link>
            .
          </p>
        </div>

        {/* Mobile Accordion */}
        <div className="lg:hidden">
          <Accordion type="multiple" className="divide-y divide-white/10">
            <AccordionItem value="popular-pages">
              <AccordionTrigger
                className="text-lg font-semibold text-white"
                textClassName="text-white"
                iconClassName="text-white"
              >
                Popular Pages
              </AccordionTrigger>
              <AccordionContent>{renderLinks(POPULAR_PAGES)}</AccordionContent>
            </AccordionItem>
            {FOOTER_SECTIONS.map((section) => (
              <AccordionItem key={section.id} value={section.id}>
                <AccordionTrigger
                  className="text-lg font-semibold text-white"
                  textClassName="text-white"
                  iconClassName="text-white"
                >
                  {section.title}
                </AccordionTrigger>
                <AccordionContent>{renderLinks(section.links)}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid grid-cols-12 gap-8">
          <div className="col-span-3 space-y-5">
            <div
              className="flex items-center"
              style={{ width: '220px', height: '40px' }}
            >
              <ImageComponent
                src="/lovable-uploads/fd45d438-10a2-4bde-9162-a38816b28958.png"
                alt="Exquisite Dentistry"
                responsive
                logoType="main"
                className="w-full h-full object-contain"
                loading="lazy"
                decoding="async"
              />
            </div>
            <p className="text-white/70 leading-relaxed text-sm">
              Cosmetic and restorative dentistry in the heart of Los
              Angeles, blending artistry, technology, and concierge comfort.
            </p>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 border-b border-gold/30 pb-2">
                Popular Pages
              </h3>
              {renderLinks(POPULAR_PAGES)}
            </div>
          </div>

          {FOOTER_SECTIONS.map((section) => (
            <div
              key={section.id}
              className="col-span-2"
            >
              <h3 className="text-lg font-semibold text-white mb-4 border-b border-gold/30 pb-2">
                {section.title}
              </h3>
              {renderLinks(section.links)}
            </div>
          ))}

          <div className="col-span-3 space-y-5">
            <h3 className="text-lg font-semibold text-white mb-2 border-b border-gold/30 pb-2">
              Visit Us
            </h3>

            <div className="rounded-2xl border border-white/10 p-4 bg-white/5 space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="text-gold mt-1" size={18} />
                <div>
                  <p className="text-sm font-semibold">Exquisite Dentistry</p>
                  <a
                    href={generateUTMUrl(
                      GOOGLE_MAPS_SHORT_URL,
                      UTM_PARAMETERS.googleBusinessProfile
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 hover:text-gold text-sm"
                  >
                    {ADDRESS}
                  </a>
                </div>
              </div>

              <a
                href={generateUTMUrl(
                  GOOGLE_MAPS_SHORT_URL,
                  UTM_PARAMETERS.googleBusinessProfile
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-gold text-sm font-semibold"
              >
                Open in Maps <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <Phone className="text-gold mt-1" size={18} />
                <div>
                  <p className="font-semibold text-white">Call</p>
                  <PhoneLink
                    phoneNumber={PHONE_NUMBER_DISPLAY}
                    className="text-white/70 hover:text-gold"
                  >
                    {PHONE_NUMBER_DISPLAY}
                  </PhoneLink>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="text-gold mt-1" size={18} />
                <div>
                  <p className="font-semibold text-white">Email</p>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="text-white/70 hover:text-gold"
                  >
                    {EMAIL}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="text-gold mt-1" size={18} />
                <div>
                  <p className="font-semibold text-white">Hours</p>
                  <div className="text-white/70 space-y-1">
                    {BUSINESS_HOURS.map(({ label, value }) => (
                      <div key={label}>
                        <span className="text-gold">{label}:</span> {value}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Legal */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between text-xs text-white/60">
          <p>© {currentYear} Exquisite Dentistry. All rights reserved.</p>
          <div className="flex flex-wrap gap-3 items-center">
            <Link to="/privacy-policy/" className="inline-flex min-h-6 items-center hover:text-gold transition-colors">
              Privacy Policy
            </Link>
            <span className="text-gold/50">•</span>
            <button
              type="button"
              className="inline-flex min-h-11 items-center hover:text-gold transition-colors"
              onClick={openAnalyticsPreferences}
            >
              Privacy choices
            </button>
            <span className="text-gold/50">•</span>
            <Link to="/terms-of-service/" className="inline-flex min-h-6 items-center hover:text-gold transition-colors">
              Terms of Service
            </Link>
            <span className="text-gold/50">•</span>
            <Link to="/hipaa-compliance/" className="inline-flex min-h-6 items-center hover:text-gold transition-colors">
              HIPAA Compliance
            </Link>
            <span className="text-gold/50">•</span>
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-6 items-center hover:text-gold transition-colors"
            >
              XML Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
