import React, { useEffect } from 'react';
import PageSEO from '@/components/seo/PageSEO';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Clock, Cpu, Gem, GraduationCap, Handshake, HeartHandshake, Sparkles, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import VideoHero from '@/components/VideoHero';

import ReviewWidget from '@/components/ReviewWidget';
import { cn } from '@/lib/utils';
import { OptimizedImage } from '@/components/seo';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/motion/Reveal';
import CountUp from '@/components/motion/CountUp';
import ConsultationCtaBand from '@/components/about/ConsultationCtaBand';
import { trackConsultationIntent } from '@/utils/vercelAnalytics';
import MasterStructuredData from '@/components/seo/MasterStructuredData';
import { getCanonicalUrl } from '@/utils/schemaValidation';
import { drAguilImages } from '@/data/drAguilImages';
import PracticeVideoSection from '@/components/PracticeVideoSection';
import TreatmentDecisionBand from '@/components/TreatmentDecisionBand';
import { ROUTE_METADATA } from '@/constants/metadata';
import { SCHEDULE_CONSULTATION_PATH } from '@/constants/urls';

const CARD_CLASS = 'rounded-2xl border border-gold/15 bg-white shadow-[0_24px_60px_-40px_rgba(23,18,10,0.35)]';

/** Credentials as published on this page. */
const CREDENTIALS = [
  { icon: GraduationCap, label: 'UCLA School of Dentistry graduate' },
  { icon: Award, label: 'Invisalign Lifetime Achievement Award' },
  { icon: UserPlus, label: 'Member of the American Academy of Cosmetic Dentistry' },
  { icon: Clock, label: 'Over 1,000 smile transformations completed' },
] as const;

const PHILOSOPHY = [
  {
    icon: Handshake,
    title: 'Care built around you',
    body: 'Dr. Aguil starts by understanding your goals and concerns, then builds a plan that fits your teeth and your timeline.',
  },
  {
    icon: Gem,
    title: 'Materials chosen with care',
    body: 'Dr. Aguil uses quality materials and works with experienced dental laboratories, so your restorations fit well and look natural.',
  },
  {
    icon: HeartHandshake,
    title: 'A calm, comfortable visit',
    body: 'We keep the setting calm and take the time to explain your options, so each visit feels unhurried and you know what to expect.',
  },
] as const;

const TECHNOLOGY = [
  {
    icon: Sparkles,
    title: 'iTero 3D Scanning',
    body: 'Mess-free digital impressions capture every angle of your smile for Invisalign, veneers, crowns, and more. The scan uploads instantly so you can preview results with Dr. Aguil in real time.',
    href: '/itero-scanner/',
    linkText: 'Learn about the iTero scanner',
  },
  {
    icon: Cpu,
    title: 'Pearl AI Diagnostics',
    body: 'Artificial intelligence reviews every radiograph alongside Dr. Aguil, highlighting microfractures, incipient decay, and bone changes so treatment stays proactive and precise.',
    href: '/services/#technology',
    linkText: 'Explore our technology suite',
  },
] as const;

const trackBooking = (ctaText: string, source: string) =>
  trackConsultationIntent({ source, ctaText, destination: SCHEDULE_CONSULTATION_PATH });

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const meta = ROUTE_METADATA['/about'];

  const mainPortrait = drAguilImages.professionalPortrait;
  const getAspectRatio = (ratio?: string, fallback = '4 / 5') => {
    if (!ratio) return fallback;
    const [w, h] = ratio.split(':').map(Number);
    if (!Number.isFinite(w) || !Number.isFinite(h) || h === 0) return fallback;
    return `${w} / ${h}`;
  };
  const patientImages = [
    {
      src: drAguilImages.patientConsultation.src,
      alt: drAguilImages.patientConsultation.alt,
      aspectRatio: drAguilImages.patientConsultation.aspectRatio
    },
    {
      src: drAguilImages.digitalConsultation.src,
      alt: drAguilImages.digitalConsultation.alt,
      aspectRatio: drAguilImages.digitalConsultation.aspectRatio
    }
  ];
  const soloPortraits = [
    {
      src: drAguilImages.clinicalPortrait.src,
      alt: drAguilImages.clinicalPortrait.alt,
      aspectRatio: drAguilImages.clinicalPortrait.aspectRatio
    }
  ];

  return (
    <>
      <MasterStructuredData 
        includeBusiness={true}
        includeDoctor={true}
        includeWebsite={true}
        additionalSchemas={[{
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          '@id': getCanonicalUrl('/about#page'),
          name: 'About Dr. Alexie Aguil | Cosmetic Dentist Los Angeles',
          description: 'Meet Dr. Alexie Aguil and our team. We combine modern cosmetic techniques with gentle, personalized care to create natural, long-lasting smiles in Los Angeles.',
          url: getCanonicalUrl('/about'),
          isPartOf: {
            '@id': 'https://exquisitedentistryla.com/#website'
          },
          about: {
            '@id': 'https://exquisitedentistryla.com/#doctor'
          },
          mainEntity: {
            '@id': 'https://exquisitedentistryla.com/#doctor'
          }
        }]}
      />
      <PageSEO
        title={meta.title}
        description={meta.description}
        keywords={meta.keywords}
        path="/about"
        ogImage={meta.ogImage}
      />

      {/* Hero Section with VideoHero */}
      <VideoHero
        title={<>Meet Dr. Alexie Aguil, <span className="text-gold">Cosmetic Dentist</span></>}
        subtitle="Learn about Dr. Alexie Aguil, a UCLA-trained cosmetic dentist and Invisalign Lifetime Achievement Award provider, and the personalized approach behind our Los Angeles practice."
        primaryCta={{ 
          text: "Schedule Consultation",
          href: SCHEDULE_CONSULTATION_PATH
        }}
        secondaryCta={{ text: "View Services", href: "/services/" }}
        height="medium"
        badgeText="MEET THE DOCTOR"
        phoneCta
        scrollIndicator={true}
      />

      <TreatmentDecisionBand
        className="bg-gray-50"
        eyebrow="Plan Your Visit"
        title="Match Dr. Aguil's approach to the result you want."
        description="Explore real transformations, understand Cherry payment-plan options, or book time with the team to map your cosmetic treatment."
      />

      {/* Dr. Aguil Introduction */}
      <section className="bg-white py-16 md:py-24">
        <div className="section-container grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Meet the doctor"
              title={<>The Dentist Behind <em>Natural-Looking</em> Smile Transformations</>}
            />

            <Reveal variant="up" delay={200} className="mt-6 space-y-4 text-base leading-8 text-gray-600 md:text-lg">
              <p>
                Dr. Alexie Aguil is a UCLA School of Dentistry graduate who focuses on cosmetic and restorative dentistry in Los Angeles. Dr. Aguil&apos;s approach blends clinical precision with an eye for proportion, shade, and facial balance.
              </p>
              <p>
                With more than a decade of experience planning porcelain veneers, Invisalign, whitening, and full smile makeovers, Dr. Aguil starts with digital scans and a conversation about your goals so the final result feels like you, not a template.
              </p>
              <p>
                Patients often comment on the calm setting and the time our team takes to explain options. From design to aftercare, the focus stays on comfort, clear expectations, and long-term oral health.
              </p>
            </Reveal>

            <Reveal variant="up" delay={280} className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Button asChild size="lg" className="group w-full justify-center sm:w-auto">
                <Link to="/services/">
                  Explore Our Services
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full justify-center sm:w-auto">
                <Link to={SCHEDULE_CONSULTATION_PATH} onClick={() => trackBooking('Schedule Consultation', 'about_intro')}>
                  Schedule Consultation
                </Link>
              </Button>
            </Reveal>

            <Reveal variant="up" delay={340} className="mt-8 flex items-start gap-4 border-t border-gold/20 pt-6">
              <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full border border-gold/25 bg-ivory text-gold">
                <Award className="h-4 w-4" aria-hidden="true" />
              </span>
              <div className="text-sm leading-6">
                <p className="font-semibold text-ink">Invisalign Lifetime Achievement</p>
                <p className="text-gray-600">Lifetime Achievement Award provider serving Beverly Hills &amp; West Hollywood</p>
              </div>
            </Reveal>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-5">
            <Reveal
              variant="wipe"
              className="relative col-span-2 aspect-[4/3] overflow-hidden rounded-[1.25rem] bg-black/5 shadow-[0_40px_80px_-48px_rgba(23,18,10,0.55)] lg:aspect-[5/4]"
            >
              <OptimizedImage
                src={mainPortrait.src}
                alt={mainPortrait.alt}
                className="absolute inset-0 h-full w-full object-cover object-[72%_center]"
                sizes="(min-width: 1024px) 760px, 100vw"
              />
            </Reveal>

            {patientImages.map((image, index) => (
              <Reveal
                key={image.src}
                variant="up"
                delay={160 + index * 90}
                className="relative overflow-hidden rounded-2xl bg-black/5"
                style={{ aspectRatio: getAspectRatio(image.aspectRatio) }}
              >
                <OptimizedImage
                  src={image.src}
                  alt={image.alt}
                  className="absolute inset-0 h-full w-full object-cover"
                  sizes="(min-width: 1024px) 300px, 50vw"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Dr. Aguil's Expertise */}
      <section className="bg-ivory py-16 md:py-24">
        <div className="section-container">
          <SectionHeading
            eyebrow="Expertise"
            title={<>Meet <em>Dr. Alexie Aguil</em></>}
            description="Dr. Aguil practices cosmetic and restorative dentistry in Los Angeles, planning each case around the details of your teeth, bite, and goals."
          />

          <div className="mx-auto mt-12 grid max-w-5xl items-stretch gap-6 md:mt-16 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-8">
            <Reveal
              variant="wipe"
              className="relative overflow-hidden rounded-2xl bg-black/5"
              style={{ aspectRatio: getAspectRatio(soloPortraits[0].aspectRatio, '3 / 4') }}
            >
              <OptimizedImage
                src={soloPortraits[0].src}
                alt={soloPortraits[0].alt}
                className="absolute inset-0 h-full w-full object-cover"
                sizes="(min-width: 768px) 440px, 100vw"
              />
            </Reveal>

            <Reveal variant="up" delay={120} className="flex">
              <div className={cn(CARD_CLASS, 'flex w-full flex-col justify-center p-6 sm:p-10')}>
                <h3 className="text-2xl font-semibold tracking-[-0.02em] text-ink sm:text-3xl">Dr. Alexie Aguil</h3>
                <p className="mt-1 text-sm font-semibold uppercase tracking-[0.18em] text-gold-dark">Founder &amp; Lead Dentist</p>

                <p className="mt-6 text-base leading-8 text-gray-600 md:text-lg">
                  With more than a decade of experience in cosmetic and restorative dentistry, Dr. Aguil pairs careful technique with attention to proportion, shade, and balance, so results look natural.
                </p>

                <div className="mt-8 flex items-end gap-4 border-y border-gold/20 py-5">
                  <CountUp value={1000} suffix="+" className="text-5xl font-semibold tracking-[-0.03em] text-ink" />
                  <p className="pb-1 text-sm leading-5 text-gray-600">smile transformations<br />completed</p>
                </div>

                <div className="mt-8">
                  <Button asChild variant="outline" className="w-full justify-center sm:w-auto">
                    <Link to={SCHEDULE_CONSULTATION_PATH} onClick={() => trackBooking('Schedule Consultation', 'about_bio')}>
                      Schedule Consultation
                    </Link>
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Credentials strip */}
          <ul
            aria-label="Credentials"
            className="mx-auto mt-10 grid max-w-5xl gap-px overflow-hidden rounded-2xl border border-gold/15 bg-gold/15 sm:grid-cols-2 lg:grid-cols-4"
          >
            {CREDENTIALS.map(({ icon: Icon, label }, index) => (
              <Reveal
                as="li"
                key={label}
                variant="fade"
                delay={index * 80}
                className="flex items-center gap-3 bg-white px-5 py-5 text-[15px] leading-6 text-gray-800"
              >
                <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-gold/25 bg-ivory text-gold">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                {label}
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Philosophy */}
      <section className="bg-white py-16 md:py-24">
        <div className="section-container">
          <SectionHeading eyebrow="Our philosophy" title={<>Our Approach to <em>Dental Care</em></>} />

          <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 md:mt-16 md:grid-cols-3">
            {PHILOSOPHY.map(({ icon: Icon, title, body }, index) => (
              <Reveal key={title} variant="up" delay={index * 90} className="flex">
                <div className={cn(CARD_CLASS, 'lift-card w-full p-7')}>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/25 bg-ivory text-gold" aria-hidden="true">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-6 text-xl font-semibold tracking-[-0.01em] text-ink">{title}</h3>
                  <p className="mt-3 leading-7 text-gray-600">{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Technology */}
      <section className="bg-black py-16 text-white md:py-24">
        <div className="section-container">
          <SectionHeading
            tone="dark"
            eyebrow="Technology"
            title={<>Precision Tools, <em>Human Touch</em></>}
            description="From Pearl AI diagnostics to the iTero Element 5D scanner, every piece of technology in our studio is selected to make care more accurate, more comfortable, and more collaborative."
          />

          <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
            {TECHNOLOGY.map(({ icon: Icon, title, body, href, linkText }, index) => (
              <Reveal key={title} variant="up" delay={index * 90} className="flex">
                <div className="lift-card flex w-full flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-7 hover:border-champagne/35">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-champagne/30 text-champagne" aria-hidden="true">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-6 text-xl font-semibold">{title}</h3>
                  <p className="mt-3 flex-1 leading-7 text-white/75">{body}</p>
                  <Link to={href} className="group mt-6 inline-flex min-h-11 items-center gap-2 self-start text-sm font-semibold text-champagne">
                    <span className="link-sweep pb-0.5">{linkText}</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-ivory py-16 md:py-24">
        <div className="section-container">
          <SectionHeading
            eyebrow="In their words"
            title={<>Patient <em>Reviews</em></>}
            description="See what our patients say about their experience with Dr. Aguil"
          />
          <Reveal variant="fade" delay={120} className="mt-12">
            <ReviewWidget />
          </Reveal>
        </div>
      </section>

      <ConsultationCtaBand
        id="about-consultation"
        className="bg-white"
        source="about_closing_cta"
        eyebrow="Schedule a consultation"
        title={<>Start with a conversation with <em className="whitespace-nowrap">Dr. Aguil</em></>}
        description="Book a consultation to review timing, treatment fit, PPO benefits, and next steps."
      />

      <PracticeVideoSection />
    </>
  );
};

export default About;
