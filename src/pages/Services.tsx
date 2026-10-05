import React, { useEffect } from 'react';
import PageSEO from '@/components/seo/PageSEO';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import VideoHero from '@/components/VideoHero';
import type { LucideIcon } from 'lucide-react';
import {
  Smile,
  Shield,
  Wrench,
  Stethoscope,
  ArrowRight,
  Check,
  ExternalLink,
  Camera,
  Monitor,
  Sparkles,
  Palette,
  Cpu,
  Bot
} from 'lucide-react';
import { cn } from '@/lib/utils';
import ImageComponent from '@/components/Image';
import { OptimizedImage } from '@/components/seo';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/motion/Reveal';
import ConsultationBand from '@/components/service/ConsultationBand';
import PracticeVideoPlayer from '@/components/PracticeVideoPlayer';
import FinancingOptionsSection from '@/components/FinancingOptionsSection';
import TreatmentDecisionBand from '@/components/TreatmentDecisionBand';
import { serviceCategories } from '@/data/services';

import MasterStructuredData from '@/components/seo/MasterStructuredData';
import MedicalProcedureStructuredData from '@/components/seo/MedicalProcedureStructuredData';
import TopicClusterWidget from '@/components/TopicClusterWidget';
import InternalLinkingWidget from '@/components/InternalLinkingWidget';
import { ROUTE_METADATA } from '@/constants/metadata';
import { SCHEDULE_CONSULTATION_PATH } from '@/constants/urls';
import { normalizeInternalHref } from '@/utils/normalizeInternalHref';

const CARD = 'rounded-2xl border border-gold/15 bg-white shadow-[0_24px_60px_-40px_rgba(23,18,10,0.35)]';
const CHECK_ITEM_TITLE = 'font-semibold text-ink';
const CHECK_ITEM_BODY = 'mt-1 text-sm leading-6 text-gray-600';

// Icon mapping helper
const getIcon = (iconName: string) => {
  const icons = {
    Smile: <Smile size={24} />,
    Shield: <Shield size={24} />,
    Wrench: <Wrench size={24} />,
    Stethoscope: <Stethoscope size={24} />
  };
  return icons[iconName as keyof typeof icons] || <Smile size={24} />;
};

const Services = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const meta = ROUTE_METADATA['/services'];

  const differentiators = [
    {
      title: 'Artistic Smile Design',
      description:
        'Preview your transformation with digital smile design that harmonizes with your facial features.',
      Icon: Palette
    },
    {
      title: 'Precision-Driven Technology',
      description:
        '3D imaging, iTero scanning, and meticulous planning deliver accurate, comfortable treatment journeys.',
      Icon: Cpu
    },
    {
      title: 'Elevated Patient Experience',
      description:
        'Relaxing amenities and compassionate care create a calm visit tailored to your comfort.',
      Icon: Sparkles
    }
  ];

  const serviceNavigation = [
    {
      id: 'cosmetic',
      title: 'Cosmetic Dentistry',
      description: 'Signature veneers, whitening, and custom smile makeovers crafted for you.',
      Icon: Smile
    },
    {
      id: 'restorative',
      title: 'Restorative Dentistry',
      description: 'Full-mouth rehabilitation, crowns, implants, and tooth-colored restorations.',
      Icon: Wrench
    },
    {
      id: 'preventive',
      title: 'Preventive Care',
      description: 'Comprehensive exams, cleanings, and proactive screenings to protect your smile.',
      Icon: Shield
    },
    {
      id: 'specialty',
      title: 'Specialty Services',
      description: 'Laser therapies, full-mouth reconstruction, and advanced clinical expertise.',
      Icon: Stethoscope
    },
    {
      id: 'invisalign',
      title: 'Invisalign®',
      description: 'Discreet clear aligners shaped by digital precision for confident results.',
      Icon: Sparkles
    }
  ];

  type TechnologyHighlight = {
    title: string;
    description: string;
    Icon?: LucideIcon;
    iconLabel?: string;
    cta?: {
      label: string;
      href: string;
    };
  };

  const technologyHighlights: TechnologyHighlight[] = [
    {
      title: 'iTero 3D Scanner',
      description:
        'Our advanced iTero 3D imaging system captures thousands of detailed images per second to create a precise digital model of your teeth. Enjoy faster, more comfortable scans and hyper-accurate Invisalign or cosmetic treatment planning.',
      iconLabel: '3D',
      cta: {
        label: 'Learn More',
        href: '/itero-scanner/'
      }
    },
    {
      title: 'Digital X-Rays',
      description:
        'Digital radiography provides immediate, high-quality images with significantly reduced radiation exposure compared to traditional x-rays.',
      Icon: Monitor
    },
    {
      title: 'Pearl AI Diagnostics',
      description:
        'Pearl AI analyzes radiographs in real time to highlight potential areas of concern, supporting accurate diagnoses and proactive treatment planning.',
      Icon: Bot
    }
  ];

  return (
    <>
      <MasterStructuredData 
        includeBusiness={true}
        includeWebsite={true}
        additionalSchemas={[{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          '@id': 'https://exquisitedentistryla.com/services/#catalog',
          name: 'Dental Services Catalog',
          description: 'Comprehensive dental services offered at Exquisite Dentistry in Los Angeles',
          url: 'https://exquisitedentistryla.com/services/',
          numberOfItems: 7,
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              item: {
                '@type': 'MedicalProcedure',
                name: 'Porcelain Veneers',
                description: 'Ultra-thin porcelain shells designed to cover the front surface of teeth for a perfect smile transformation',
                url: 'https://exquisitedentistryla.com/veneers/',
                category: 'Cosmetic Dentistry',
                provider: {
                  '@id': 'https://exquisitedentistryla.com/#business'
                },
                performer: {
                  '@id': 'https://exquisitedentistryla.com/#doctor'
                }
              }
            },
            {
              '@type': 'ListItem',
              position: 2,
              item: {
                '@type': 'MedicalProcedure',
                name: 'Teeth Whitening',
                description: 'Professional teeth whitening treatments for a brighter, more confident smile',
                url: 'https://exquisitedentistryla.com/teeth-whitening/',
                category: 'Cosmetic Dentistry',
                provider: {
                  '@id': 'https://exquisitedentistryla.com/#business'
                },
                performer: {
                  '@id': 'https://exquisitedentistryla.com/#doctor'
                }
              }
            },
            {
              '@type': 'ListItem',
              position: 3,
              item: {
                '@type': 'MedicalProcedure',
                name: 'Zoom Whitening',
                description: 'In-office Zoom whitening that brightens teeth multiple shades in one comfortable visit',
                url: 'https://exquisitedentistryla.com/zoom-whitening/',
                category: 'Cosmetic Dentistry',
                provider: {
                  '@id': 'https://exquisitedentistryla.com/#business'
                },
                performer: {
                  '@id': 'https://exquisitedentistryla.com/#doctor'
                }
              }
            },
            {
              '@type': 'ListItem',
              position: 4,
              item: {
                '@type': 'MedicalProcedure',
                name: 'Dental Implants',
                description: 'Permanent tooth replacement solution using titanium or zirconia implants for natural-looking results',
                url: 'https://exquisitedentistryla.com/dental-implants/',
                category: 'Restorative Dentistry',
                provider: {
                  '@id': 'https://exquisitedentistryla.com/#business'
                },
                performer: {
                  '@id': 'https://exquisitedentistryla.com/#doctor'
                }
              }
            },
            {
              '@type': 'ListItem',
              position: 5,
              item: {
                '@type': 'MedicalProcedure',
                name: 'Invisalign Clear Aligners',
                description: 'Discreet orthodontic treatment using clear, removable aligners to straighten teeth',
                url: 'https://exquisitedentistryla.com/invisalign/',
                category: 'Orthodontics',
                provider: {
                  '@id': 'https://exquisitedentistryla.com/#business'
                },
                performer: {
                  '@id': 'https://exquisitedentistryla.com/#doctor'
                }
              }
            },
            {
              '@type': 'ListItem',
              position: 6,
              item: {
                '@type': 'MedicalProcedure',
                name: 'Cosmetic Dentistry',
                description: 'Integrated cosmetic dentistry plans combining veneers, bonding, whitening, and alignment',
                url: 'https://exquisitedentistryla.com/cosmetic-dentistry/',
                category: 'Cosmetic Dentistry',
                provider: {
                  '@id': 'https://exquisitedentistryla.com/#business'
                },
                performer: {
                  '@id': 'https://exquisitedentistryla.com/#doctor'
                }
              }
            },
            {
              '@type': 'ListItem',
              position: 7,
              item: {
                '@type': 'MedicalProcedure',
                name: 'Emergency Dental Care',
                description: 'Same-day emergency dentistry for toothaches, fractures, infections, and trauma',
                url: 'https://exquisitedentistryla.com/emergency-dentist/',
                category: 'Emergency & Urgent Dental Care',
                provider: {
                  '@id': 'https://exquisitedentistryla.com/#business'
                },
                performer: {
                  '@id': 'https://exquisitedentistryla.com/#doctor'
                }
              }
            }
          ]
        }]}
      />
      
      <PageSEO
        title={meta.title}
        description={meta.description}
        keywords={meta.keywords}
        path="/services"
        ogImage={meta.ogImage}
      />

      {/* Add structured data for key services */}
      <MedicalProcedureStructuredData
        procedureName="Cosmetic Dental Services"
        description="Comprehensive cosmetic dentistry services including porcelain veneers, teeth whitening, dental implants, and complete smile makeovers"
        url="/services"
        procedureType="Cosmetic Dental Procedures"
        bodyLocation="Oral and Dental System"
        benefits={[
          "Enhanced smile aesthetics",
          "Improved confidence",
          "Long-lasting results",
          "Natural appearance"
        ]}
      />
      
      <VideoHero
        vimeoId="1076745525"
        eyebrow="Our services"
        title={<>Advanced Cosmetic & <span className="text-gold">Restorative Dental Services</span></>}
        subtitle="Experience the full spectrum of modern dentistry with procedures ranging from preventive care to complex smile makeovers. Our Los Angeles practice near Beverly Hills combines artistic vision with cutting-edge technology to deliver exceptional results."
        primaryCta={{
          text: "Schedule Consultation",
          href: SCHEDULE_CONSULTATION_PATH
        }}
        secondaryCta={{
          text: "View Smile Gallery",
          href: "/smile-gallery"
        }}
        phoneCta
        overlayColor="gradient"
        height="medium"
        badgeText="COMPREHENSIVE DENTAL EXCELLENCE"
        scrollIndicator={false}
      />

      {/* Sits below the hero (no negative-margin overlap, which used to cover the hero proof link). */}
      <section className="bg-ivory py-16 md:py-24">
        <div className="section-container">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start lg:gap-16">
            <div className="min-w-0">
              <SectionHeading
                align="left"
                eyebrow="Signature Care Journey"
                title={<>Where Technology Meets <em>Artistry</em></>}
                description="Our Los Angeles practice near Beverly Hills delivers the complete spectrum of modern dentistry, from transformative aesthetics to comprehensive restorative solutions. Dr. Aguil blends time-honored techniques with the latest innovations, ensuring each experience is as precise and personal as it is beautiful."
              />
              <Reveal variant="up" delay={200} className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <Button className="group h-auto min-h-12 whitespace-normal py-3" size="lg" asChild>
                  <Link to={SCHEDULE_CONSULTATION_PATH}>
                    Schedule Consultation
                    <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="h-auto min-h-12 whitespace-normal py-3" asChild>
                  <Link to="/contact/">Contact Us</Link>
                </Button>
              </Reveal>
            </div>

            <Reveal as="ul" variant="up" delay={120} className={cn(CARD, 'divide-y divide-gold/10 px-6 sm:px-8')}>
              {differentiators.map(({ title, description, Icon }) => (
                <li key={title} className="flex gap-4 py-6">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold" aria-hidden="true">
                    <Icon size={20} />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-base font-semibold text-ink">{title}</h3>
                    <p className="mt-1.5 text-sm leading-6 text-gray-600">{description}</p>
                  </div>
                </li>
              ))}
            </Reveal>
          </div>

          <div className="mt-16 md:mt-20">
            <Reveal variant="up" className="max-w-2xl">
              <h3 className="text-xl font-semibold tracking-[-0.01em] text-ink sm:text-2xl">
                Guided Paths to Your Ideal Smile
              </h3>
              <p className="mt-3 text-base leading-7 text-gray-600">
                Explore comprehensive services tailored to your needs, from artistry-driven cosmetic enhancements to advanced restorative care and precision orthodontics.
              </p>
            </Reveal>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {serviceNavigation.map(({ id, title, description, Icon }, index) => (
                <Reveal
                  key={id}
                  variant="up"
                  delay={index * 70}
                  className={cn('h-full', index === serviceNavigation.length - 1 ? 'sm:col-span-2 lg:col-span-1' : '')}
                >
                  <a
                    href={`#${id}`}
                    className={cn(CARD, 'lift-card group flex h-full flex-col gap-4 p-6')}
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold/10 text-gold" aria-hidden="true">
                      <Icon size={20} />
                    </span>
                    <span className="block">
                      <span className="block text-lg font-semibold tracking-[-0.01em] text-ink">{title}</span>
                      <span className="mt-2 block text-sm leading-6 text-gray-600">{description}</span>
                    </span>
                    <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-gold-dark">
                      <span className="link-sweep pb-0.5">Explore {title}</span>
                      <ArrowRight size={16} className="shrink-0 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <TreatmentDecisionBand
        className="bg-white"
        eyebrow="Service Finder"
        title="Choose a treatment path with proof and payment clarity."
        description="If you are comparing veneers, Invisalign, whitening, implants, or a full smile makeover, start with real outcomes, then review payment options or schedule a consultation."
      />

      {serviceCategories.map((service, index) => (
        <section key={service.id} id={service.id} className={cn("scroll-mt-24 py-16 md:py-24", index % 2 === 0 ? "bg-ivory" : "bg-white")}>
          <div className="section-container">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <div className={cn("min-w-0", index % 2 === 1 ? "lg:order-2" : "")}>
                <SectionHeading align="left" eyebrow="Our Services" title={service.title} />
                <Reveal variant="up" delay={120}>
                  <p className="mt-5 text-base leading-7 text-gray-600 md:text-lg md:leading-8">{service.description}</p>

                  {service.highlight && (
                    <div className="mt-6 rounded-r-xl border-l-2 border-gold bg-gold/[0.06] px-5 py-4">
                      <p className="font-medium text-ink">{service.highlight}</p>
                    </div>
                  )}

                  <ul className="mt-6 divide-y divide-gold/10">
                    {service.treatments.map(treatment => (
                      <li key={treatment.name} className="flex flex-col gap-3 py-4 sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex min-w-0 flex-1 gap-3">
                          <Check size={18} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
                          <div className="min-w-0 flex-1">
                            <h4 className={CHECK_ITEM_TITLE}>{treatment.name}</h4>
                            <p className={CHECK_ITEM_BODY}>{treatment.details}</p>
                          </div>
                        </div>
                        {treatment.hasDetailPage && treatment.slug && (
                          <div className="ml-8 sm:ml-4 sm:shrink-0">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-auto min-h-10 w-full whitespace-normal border-gold/50 text-xs text-gold-dark hover:bg-gold sm:w-auto"
                              asChild
                            >
                              <Link to={treatment.slug}>{treatment.ctaLabel || 'Learn More'}</Link>
                            </Button>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <Button className="group h-auto min-h-12 whitespace-normal py-3" size="lg" asChild>
                      <Link to={SCHEDULE_CONSULTATION_PATH}>
                        Schedule Consultation
                        <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                      </Link>
                    </Button>
                    <Button variant="outline" size="lg" className="h-auto min-h-12 whitespace-normal py-3" asChild>
                      <Link to="/contact/">Contact Us</Link>
                    </Button>
                  </div>
                </Reveal>
              </div>

              <Reveal variant="up" delay={160} className={cn("min-w-0", index % 2 === 1 ? "lg:order-1" : "")}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-gold/15 shadow-[0_40px_80px_-50px_rgba(23,18,10,0.55)]">
                  <ImageComponent
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      ))}

      <FinancingOptionsSection
        className="bg-background"
        title="Flexible financing for cosmetic and restorative treatment."
        description="If you already know the treatment you want, or you are still narrowing the right path, start on our Cherry payment plans page to explore monthly payment possibilities before your consultation."
      />

      {/* Invisalign Section */}
      <section id="invisalign" className="scroll-mt-24 bg-ivory py-16 md:py-24">
        <div className="section-container">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="min-w-0">
              <SectionHeading align="left" eyebrow="Clear Aligners" title={<>Invisalign <em>Treatment</em></>} />
              <Reveal variant="up" delay={120}>
                <p className="mt-5 text-base leading-7 text-gray-600 md:text-lg md:leading-8">
                  Straighten your teeth discreetly with Invisalign clear aligners. Our advanced digital treatment planning ensures precise, comfortable results that fit seamlessly into your lifestyle.
                </p>

                <ul className="mt-6 grid gap-x-8 gap-y-5 sm:grid-cols-2">
                  {[
                    { title: 'Nearly Invisible', body: 'Clear aligners that are virtually undetectable when worn' },
                    { title: 'Removable Convenience', body: 'Eat, drink, brush, and floss normally throughout treatment' },
                    { title: 'Comfortable Design', body: 'Smooth plastic with no metal brackets, wires, or sharp edges' },
                    { title: 'Predictable Results', body: '3D digital planning shows your expected results before treatment begins' },
                  ].map((item) => (
                    <li key={item.title} className="flex gap-3">
                      <Check size={18} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
                      <div className="min-w-0">
                        <h4 className={CHECK_ITEM_TITLE}>{item.title}</h4>
                        <p className={CHECK_ITEM_BODY}>{item.body}</p>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Button className="group h-auto min-h-12 whitespace-normal py-3" size="lg" asChild>
                    <Link to={SCHEDULE_CONSULTATION_PATH}>
                      Schedule Consultation
                      <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" className="group h-auto min-h-12 whitespace-normal py-3" asChild>
                    <a
                      href="https://providerbio.invisalign.com/sv/381345#start"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Sample Results
                      <ExternalLink size={16} className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                    </a>
                  </Button>
                </div>
              </Reveal>
            </div>

            <Reveal variant="up" delay={160} className="min-w-0">
              <div className="rounded-[28px] border border-gold/30 bg-ink p-[1.5px] shadow-[0_40px_80px_-40px_rgba(23,18,10,0.6)]">
                <PracticeVideoPlayer
                  source="https://videos-hazel-eta.vercel.app/invisalign.mp4"
                  poster="/lovable-uploads/77e54716-bd1f-4933-a6e9-a2e31367a263.png"
                  title="Invisalign Treatment at Exquisite Dentistry"
                  className="!rounded-[26px] !bg-black !shadow-none"
                  appearance="minimal"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <ConsultationBand
        eyebrow="Not sure where to start?"
        title={<>Start with a <em>consultation</em></>}
        description="Bring your questions and goals. Dr. Aguil will review your options with you and recommend a plan that fits."
        source="services_mid_cta"
        className="bg-background"
      />

      <section id="technology" className="scroll-mt-24 bg-white pb-16 pt-4 md:pb-24 md:pt-8">
        <div className="section-container">
          <div className="grid grid-cols-1 items-start gap-12 xl:grid-cols-[1.1fr_0.9fr] xl:gap-16">
            <div className="min-w-0 space-y-10">
              <SectionHeading
                align="left"
                eyebrow="Advanced Technology"
                title={<>Cutting-Edge Dental <em>Equipment</em></>}
                description="We utilize state-of-the-art technology to enhance precision, efficiency, and comfort during your dental treatment."
              />

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {technologyHighlights.map((highlight, index) => (
                  <Reveal
                    key={highlight.title}
                    variant="up"
                    delay={index * 80}
                    className={cn(CARD, 'h-full p-6', index === technologyHighlights.length - 1 && technologyHighlights.length % 2 === 1 ? 'sm:col-span-2' : '')}
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gold/10 text-gold" aria-hidden="true">
                      {highlight.Icon ? (
                        <highlight.Icon className="h-5 w-5" strokeWidth={1.5} />
                      ) : (
                        <span className="text-xs font-semibold uppercase tracking-[0.2em]">{highlight.iconLabel}</span>
                      )}
                    </div>
                    <h3 className="mt-5 text-lg font-semibold tracking-[-0.01em] text-ink">{highlight.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-gray-600">{highlight.description}</p>
                    {highlight.cta && (
                      <Link
                        to={normalizeInternalHref(highlight.cta.href)}
                        className="group mt-3 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-gold-dark"
                      >
                        <span className="link-sweep pb-0.5">{highlight.cta.label}</span>
                        <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                      </Link>
                    )}
                  </Reveal>
                ))}
              </div>
            </div>

            {/* Media column: every frame has a fixed aspect ratio so late-loading media never shifts layout. */}
            <div className="mx-auto w-full min-w-0 max-w-xl space-y-6 xl:max-w-none">
              <Reveal variant="up" delay={120}>
                <div className="relative rounded-[32px] border border-gold/30 bg-ink p-[1.5px] shadow-[0_45px_90px_-40px_rgba(12,7,0,0.75)]">
                  <div className="pointer-events-none absolute left-6 top-6 z-10 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white backdrop-blur">
                    <span className="h-2 w-2 rounded-full bg-champagne" />
                    Pearl AI in Action
                  </div>
                  <PracticeVideoPlayer
                    source="https://res.cloudinary.com/dhqpqfw6w/video/upload/v1761506806/pearl_ai_ctiswr.mp4"
                    poster="https://res.cloudinary.com/dhqpqfw6w/image/upload/v1761507329/pearl-thumbnail_ijmlov.png"
                    title="Pearl AI Technology Overview"
                    className="!rounded-[30px] !bg-black"
                    appearance="minimal"
                    loop
                    autoPlay
                    muted
                    passive
                  />
                </div>
                <p className="mt-4 text-center text-xs font-semibold uppercase tracking-[0.3em] text-gold-dark">
                  tech lets you see what our dentist sees
                </p>
              </Reveal>

              <Reveal variant="up" delay={200} className={cn(CARD, 'overflow-hidden')}>
                <div className="relative aspect-[4/3] bg-ivory">
                  {/* The previous photo here showed a panoramic X-ray unit, not the iTero. */}
                  <OptimizedImage
                    src="/lovable-uploads/77e54716-bd1f-4933-a6e9-a2e31367a263.png"
                    alt="Dr. Aguil reviewing an iTero 3D scan with a patient at Exquisite Dentistry"
                    className="absolute inset-0 h-full w-full object-cover object-[35%_40%]"
                    sizes="(min-width: 1024px) 560px, 100vw"
                  />
                </div>
                <div className="p-5 text-sm leading-6 text-gray-600">
                  The iTero Element 5D scanner captures a complete 3D model without traditional trays, keeping diagnostics fast, clean, and comfortable.
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ivory py-16 md:py-24">
        <div className="section-container">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="min-w-0">
              <SectionHeading align="left" eyebrow="Client Experience" title={<>Exceptional Comfort &amp; <em>Care</em></>} />
              <Reveal variant="up" delay={120}>
                <p className="mt-5 text-base leading-7 text-gray-600 md:text-lg md:leading-8">
                  At Exquisite Dentistry, we have reimagined what a dental visit can be. Our calm setting features amenities designed for your comfort:
                </p>

                <ul className="mt-6 grid gap-x-8 gap-y-5 sm:grid-cols-2">
                  {[
                    { title: 'Calming Amenities', body: 'Soft lighting and warm blankets for ultimate comfort' },
                    { title: 'Noise-Canceling Experience', body: 'High-quality headphones to help you relax during treatment' },
                    { title: 'Aromatherapy & Wellness', body: 'Calming scents and hot lemongrass towels after treatment' },
                    { title: 'Private Treatment Rooms', body: 'Comfortable, private spaces with entertainment options' },
                  ].map((item) => (
                    <li key={item.title} className="flex gap-3">
                      <Check size={18} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
                      <div className="min-w-0">
                        <h4 className={CHECK_ITEM_TITLE}>{item.title}</h4>
                        <p className={CHECK_ITEM_BODY}>{item.body}</p>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <Button className="group h-auto min-h-12 whitespace-normal py-3" size="lg" asChild>
                    <Link to={SCHEDULE_CONSULTATION_PATH}>
                      Schedule Consultation
                      <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                    </Link>
                  </Button>
                </div>
              </Reveal>
            </div>

            <Reveal variant="up" delay={160} className="relative min-w-0 pb-6 sm:pb-8 sm:pr-6">
              <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-gold/15 shadow-[0_40px_80px_-50px_rgba(23,18,10,0.55)]">
                <img
                  alt="Spa-like dental environment"
                  className="h-full w-full object-cover"
                  src="/lovable-uploads/e1a7d23f-3c7b-4c52-a1ac-7862140cf0af.png"
                  sizes="(min-width: 1024px) 520px, 90vw"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className={cn(CARD, 'relative z-10 mx-4 -mt-10 p-6 sm:absolute sm:bottom-0 sm:right-0 sm:mx-0 sm:mt-0 sm:max-w-xs')}>
                <p className="text-sm italic leading-6 text-gray-600">
                  "We believe that exceptional dental care should be a comfortable, stress-free experience from start to finish."
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Topic Clusters Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="section-container">
          <SectionHeading
            eyebrow="Explore"
            title={<>Explore Treatment <em>Options</em></>}
            description="Discover comprehensive solutions for your smile goals"
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <TopicClusterWidget
              title="Smile Makeover Hub"
              description="Complete transformation solutions"
              centralHub={{
                title: "Complete Smile Makeover",
                href: "/smile-makeover-los-angeles",
                description: "Transform your entire smile with our comprehensive approach",
                type: "service"
              }}
              spokes={[
                {
                  title: "Porcelain Veneers",
                  href: "/veneers",
                  description: "Perfect teeth in just visits",
                  type: "service",
                  featured: true
                },
                {
                  title: "Teeth Whitening",
                  href: "/zoom-whitening",
                  description: "Professional brightening treatment",
                  type: "service"
                },
                {
                  title: "Front Teeth Veneers",
                  href: "/veneers/front-teeth-veneers-los-angeles",
                  description: "Transparent pricing for 2 to 4 veneers",
                  type: "service"
                },
                {
                  title: "Before & After Gallery",
                  href: "/smile-gallery",
                  description: "See real transformation results",
                  type: "gallery"
                },
                {
                  title: "Patient Stories",
                  href: "/testimonials",
                  description: "Hear from transformed patients",
                  type: "testimonial"
                }
              ]}
            />

            <TopicClusterWidget
              title="Special Occasions"
              description="Perfect smile for life's moments"
              centralHub={{
                title: "Wedding & Graduation Prep",
                href: "/wedding",
                description: "Look your best for special occasions",
                type: "special"
              }}
              spokes={[
                {
                  title: "Wedding Smiles",
                  href: "/wedding",
                  description: "Perfect smile for your big day",
                  type: "special",
                  featured: true
                },
                {
                  title: "Graduation Ready",
                  href: "/graduation", 
                  description: "Confident smile for photos",
                  type: "special"
                },
                {
                  title: "Quick Solutions",
                  href: "/veneers",
                  description: "Fast results for tight timelines",
                  type: "service"
                },
                {
                  title: "Timeline Planning",
                  href: "/contact",
                  description: "Plan your treatment schedule",
                  type: "consultation"
                }
              ]}
            />

            <TopicClusterWidget
              title="Orthodontic Solutions"
              description="Straighter teeth, better confidence"
              centralHub={{
                title: "Invisalign Treatment",
                href: "/services#invisalign",
                description: "Discreet teeth straightening with clear aligners",
                type: "service"
              }}
              spokes={[
                {
                  title: "Invisalign vs Braces",
                  href: "/blog/invisalign-clear-advantage-over-traditional-braces",
                  description: "Compare your options",
                  type: "blog",
                  featured: true
                },
                {
                  title: "Student Discounts",
                  href: "/graduation",
                  description: "Special rates for students",
                  type: "special"
                },
                {
                  title: "Treatment Gallery",
                  href: "/smile-gallery",
                  description: "Before & after results",
                  type: "gallery"
                },
                {
                  title: "Schedule Consultation",
                  href: SCHEDULE_CONSULTATION_PATH,
                  description: "Get your custom plan",
                  type: "consultation"
                }
              ]}
            />
          </div>

          <div className="mt-12">
            <InternalLinkingWidget 
              context="general" 
              variant="expanded"
              title="Start Your Smile Journey"
              currentPage="/services"
            />
          </div>
        </div>
      </section>

      <ConsultationBand
        closing
        tone="light"
        eyebrow="Your consultation"
        title={<>Plan your treatment <em>with Dr. Aguil</em></>}
        description="Schedule a consultation to talk through your goals, review your options, and leave with a clear next step."
        source="services_final_cta"
        secondaryLink={{ text: 'Contact Us', href: '/contact/' }}
        className="pb-16 pt-0 md:pb-24 md:pt-0"
      />
    </>
  );
};

export default Services;
