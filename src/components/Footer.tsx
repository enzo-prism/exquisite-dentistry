import React from 'react';
import { Link } from 'react-router-dom';
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
import { motion } from 'framer-motion';

import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import PhoneLink from '@/components/PhoneLink';
import { useScrollAnimation } from '@/hooks/use-scroll-animations';
import {
  PHONE_NUMBER_DISPLAY,
  EMAIL,
  ADDRESS,
  SOCIAL_MEDIA,
  BUSINESS_HOURS
} from '@/constants/contact';
import { SCHEDULING_URL } from '@/constants/urls';
import { generateUTMUrl, UTM_PARAMETERS } from '@/utils/utmTracking';

type FooterLink = {
  label: string;
  to?: string;
  href?: string;
};

const FOOTER_SECTIONS: { id: string; title: string; links: FooterLink[] }[] = [
  {
    id: 'practice',
    title: 'Practice',
    links: [
      { label: 'Home', to: '/' },
      { label: 'About Dr. Aguil', to: '/about' },
      { label: 'Client Experience', to: '/client-experience' },
      { label: 'Testimonials', to: '/testimonials' },
      { label: 'Blog', to: '/blog' },
      { label: 'Contact', to: '/contact' }
    ]
  },
  {
    id: 'services',
    title: 'Signature Services',
    links: [
      { label: 'Porcelain Veneers', to: '/veneers' },
      { label: 'Invisalign', to: '/invisalign' },
      { label: 'Teeth Whitening', to: '/teeth-whitening' },
      { label: 'Zoom Whitening', to: '/zoom-whitening' },
      { label: 'Dental Implants', to: '/dental-implants' },
      { label: 'Cosmetic Dentistry', to: '/cosmetic-dentistry' },
      { label: 'Emergency Dentist', to: '/emergency-dentist' },
      { label: 'Wedding Smiles', to: '/wedding' },
      { label: 'Graduation Ready', to: '/graduation' }
    ]
  },
  {
    id: 'resources',
    title: 'Client Resources',
    links: [
      { label: 'Transformation Stories', to: '/transformation-stories' },
      { label: 'Smile Gallery', to: '/smile-gallery' },
      { label: 'FAQs', to: '/faqs' }
    ]
  }
];

const reviewStars = Array.from({ length: 5 });

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { ref: footerRef } = useScrollAnimation({
    animationClass: 'gpu-slide-in',
    threshold: 0.1
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  };

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
                className="flex items-center justify-between text-white/70 hover:text-gold transition-colors group"
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
              className="flex items-center justify-between text-white/70 hover:text-gold transition-colors group"
            >
              {content}
            </Link>
          </li>
        );
      })}
    </ul>
  );

  return (
    <footer
      ref={footerRef}
      className="bg-black text-white relative overflow-hidden gpu-accelerated"
      style={{ contain: 'layout', containIntrinsicSize: '100% 420px' }}
    >
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute -top-32 -right-10 h-64 w-64 rounded-full bg-gold/20 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-white/5 blur-[160px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
        {/* CTA Panel */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-white/10 pb-8">
          <div>
            <p className="text-xs tracking-[0.35em] uppercase text-gold/80 mb-2">
              Ready to start?
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold">
              Transform your smile with concierge care in Los Angeles.
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <a
              href={SCHEDULING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full sm:w-auto"
            >
              <Button className="bg-gold text-black hover:bg-gold/90 px-6 whitespace-nowrap w-full sm:w-auto">
                Book a Consultation
              </Button>
            </a>
            <Button
              variant="outline"
              className="border-gold/40 text-white hover:text-black hover:bg-gold/90 whitespace-nowrap px-4 w-full sm:w-auto"
              asChild
            >
              <PhoneLink
                phoneNumber={PHONE_NUMBER_DISPLAY}
                className="flex items-center justify-center gap-2"
              >
                <Phone size={16} className="text-gold" />
                <span className="font-semibold tracking-wide">Call {PHONE_NUMBER_DISPLAY}</span>
              </PhoneLink>
            </Button>
          </div>
        </div>

        {/* Reviews + Social */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex text-gold">
              {reviewStars.map((_, index) => (
                <Star key={index} size={18} fill="currentColor" />
              ))}
            </div>
            <p className="text-sm text-white/80">
              200+ five-star reviews from Los Angeles clients
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
                  <motion.a
                    key={href}
                    href={generateUTMUrl(href, utm)}
                    className="h-11 w-11 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:text-black hover:bg-gold transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={`Visit our ${
                      ['Instagram', 'Facebook', 'YouTube'][index]
                    }`}
                  >
                    <Icon size={18} />
                  </motion.a>
                );
              }
            )}
          </div>
        </div>

        {/* Mobile Accordion */}
        <div className="md:hidden">
          <Accordion type="multiple" className="divide-y divide-white/10">
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
        <motion.div
          className="hidden md:grid grid-cols-12 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div className="col-span-3 space-y-5" variants={itemVariants}>
            <div
              className="flex items-center"
              style={{ width: '220px', height: '40px' }}
            >
              <img
                src="/lovable-uploads/fd45d438-10a2-4bde-9162-a38816b28958.webp"
                alt="Exquisite Dentistry"
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-white/70 leading-relaxed text-sm">
              Luxury cosmetic and restorative dentistry in the heart of Los
              Angeles, blending artistry, technology, and concierge comfort.
            </p>
          </motion.div>

          {FOOTER_SECTIONS.map((section) => (
            <motion.div
              key={section.id}
              className="col-span-2"
              variants={itemVariants}
            >
              <h3 className="text-lg font-semibold text-white mb-4 border-b border-gold/30 pb-2">
                {section.title}
              </h3>
              {renderLinks(section.links)}
            </motion.div>
          ))}

          <motion.div className="col-span-3 space-y-5" variants={itemVariants}>
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
                      'https://maps.app.goo.gl/7g618h7918tzp9f79',
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
                  'https://maps.app.goo.gl/7g618h7918tzp9f79',
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
          </motion.div>
        </motion.div>
      </div>

      {/* Legal */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between text-xs text-white/60">
          <p>© {currentYear} Exquisite Dentistry. All rights reserved.</p>
          <div className="flex flex-wrap gap-3 items-center">
            <Link to="/privacy-policy" className="hover:text-gold transition-colors">
              Privacy Policy
            </Link>
            <span className="text-gold/50">•</span>
            <Link to="/terms-of-service" className="hover:text-gold transition-colors">
              Terms of Service
            </Link>
            <span className="text-gold/50">•</span>
            <Link to="/hipaa-compliance" className="hover:text-gold transition-colors">
              HIPAA Compliance
            </Link>
            <span className="text-gold/50">•</span>
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold transition-colors"
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
