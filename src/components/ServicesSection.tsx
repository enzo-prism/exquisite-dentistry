import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { OptimizedImage } from '@/components/seo';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/motion/Reveal';
import { cn } from '@/lib/utils';

interface ServiceItem {
  title: string;
  description: string;
  href: string;
  image: string;
  imagePosition?: string;
  /** Desktop bento placement. */
  layout: string;
}

const services: ServiceItem[] = [
  {
    title: 'Porcelain Veneers',
    description: 'Custom-designed, ultra-thin porcelain shells that cover imperfections for a natural-looking smile.',
    href: '/veneers/',
    image: '/lovable-uploads/0cf5c270-9dc6-41f6-9b69-f40a31403033.png',
    imagePosition: '50% 55%',
    layout: 'md:col-span-2',
  },
  {
    title: 'Smile Makeovers',
    description: 'Treatment plans that combine procedures to change how your whole smile looks.',
    href: '/smile-makeover-los-angeles/',
    image: '/lovable-uploads/5d9db165-60d4-4dee-80d9-5a89d7dacfe5.png',
    layout: '',
  },
  {
    title: 'Invisalign',
    description: 'Discreet clear aligners that gradually straighten teeth without metal braces.',
    href: '/invisalign/',
    image: '/lovable-uploads/specialty-services.webp',
    imagePosition: '50% 35%',
    layout: '',
  },
  {
    title: 'Dental Implants',
    description: 'Natural-looking tooth replacements that restore function and appearance.',
    href: '/dental-implants/',
    image: '/lovable-uploads/77e54716-bd1f-4933-a6e9-a2e31367a263.png',
    imagePosition: '30% 40%',
    layout: '',
  },
  {
    title: 'Full Mouth Reconstruction',
    description: 'Restoration of the teeth in both jaws through a combination of restorative procedures.',
    href: '/services#restorative',
    image: '/lovable-uploads/45895aca-ec41-480b-b5a3-b4261464edef.png',
    imagePosition: '40% 35%',
    layout: '',
  },
];

const ServiceTile: React.FC<{ service: ServiceItem; tall?: boolean }> = ({ service, tall }) => (
  <article className="group relative isolate flex h-full min-h-[22rem] flex-col justify-end overflow-hidden rounded-2xl bg-ink text-white shadow-[0_30px_60px_-40px_rgba(23,18,10,0.6)]">
    <div className="zoom-media absolute inset-0 -z-10">
      <OptimizedImage
        src={service.image}
        alt=""
        aria-hidden="true"
        className="h-full w-full object-cover"
        style={{ objectPosition: service.imagePosition ?? '50% 50%' }}
        sizes={tall ? '(min-width: 768px) 820px, 85vw' : '(min-width: 1024px) 400px, (min-width: 768px) 50vw, 85vw'}
      />
    </div>
    <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(0,0,0,0.05)_20%,rgba(0,0,0,0.55)_55%,rgba(0,0,0,0.88)_100%)]" aria-hidden="true" />
    <div className="p-6 md:p-7">
      <h3 className={cn('font-semibold tracking-[-0.01em]', tall ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl')}>{service.title}</h3>
      <p className="mt-2 max-w-sm text-sm leading-6 text-white/80">{service.description}</p>
      <Link
        to={service.href}
        className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-champagne after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:rounded-2xl focus-visible:after:ring-2 focus-visible:after:ring-champagne"
      >
        <span className="link-sweep pb-0.5">Explore {service.title}</span>
        <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
      </Link>
    </div>
  </article>
);

const ServicesSection: React.FC = () => (
  <section className="bg-ivory py-16 md:py-24">
    <div className="section-container">
      <SectionHeading
        eyebrow="Our expertise"
        title={<>Our <em>Services</em></>}
        description="Near Beverly Hills, Exquisite Dentistry provides porcelain veneers, Invisalign, professional whitening, dental implants, and smile makeovers. Explore your options, see real patient cases, and discuss your goals with Dr. Aguil."
      />

      {/* Phones: a swipeable rail that peeks the next treatment. Desktop: a bento grid. */}
      <div className="no-scrollbar -mx-5 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 md:mx-0 md:mt-14 md:grid md:snap-none md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 lg:grid-cols-3">
        {services.map((service, index) => (
          <Reveal
            key={service.title}
            variant="up"
            delay={index * 90}
            className={cn('w-[82%] flex-none snap-start sm:w-[60%] md:w-auto', service.layout)}
          >
            <ServiceTile service={service} tall={index === 0} />
          </Reveal>
        ))}
      </div>

      <Reveal variant="up" className="mt-10 flex justify-center">
        <Link
          to="/services/"
          className="group inline-flex min-h-12 items-center gap-2 rounded-full border border-ink/15 bg-white px-7 text-sm font-semibold text-ink shadow-sm transition-colors hover:border-gold/50"
        >
          View All Services
          <ArrowRight className="h-4 w-4 text-gold transition-transform duration-500 group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </Reveal>
    </div>
  </section>
);

export default ServicesSection;
