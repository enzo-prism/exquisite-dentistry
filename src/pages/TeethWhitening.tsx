import React from 'react';
import { getTreatmentCostAnswer } from '@/data/treatmentPricing';
import { Link } from 'react-router-dom';
import PageSEO from '@/components/seo/PageSEO';
import VideoHero from '@/components/VideoHero';
import { Button } from '@/components/ui/button';
import { Sun, Sparkles, ArrowRight } from 'lucide-react';
import MasterStructuredData from '@/components/seo/MasterStructuredData';
import WebPageStructuredData from '@/components/WebPageStructuredData';
import ServiceStructuredData from '@/components/ServiceStructuredData';
import FAQStructuredData from '@/components/seo/FAQStructuredData';
import FinancingOptionsSection from '@/components/FinancingOptionsSection';
import InternalLinkingWidget from '@/components/InternalLinkingWidget';
import ServiceRecommendation from '@/components/ServiceRecommendation';
import RelatedArticles from '@/components/RelatedArticles';
import LastUpdated from '@/components/LastUpdated';
import FeaturedReviewWall from '@/components/FeaturedReviewWall';
import SmileGalleryPreview from '@/components/SmileGalleryPreview';
import { featuredReviews } from '@/data/featuredReviews';
import { getCanonicalUrl } from '@/utils/schemaValidation';
import { ROUTE_METADATA } from '@/constants/metadata';
import { consultationHref } from '@/data/consultation';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/motion/Reveal';
import ConsultationBand from '@/components/service/ConsultationBand';
import ServiceFaqList from '@/components/service/ServiceFaqList';
import { trackConsultationIntent } from '@/utils/vercelAnalytics';

const CARD = 'rounded-2xl border border-gold/15 bg-white shadow-[0_24px_60px_-40px_rgba(23,18,10,0.35)]';
const WHITENING_CONSULTATION_HREF = consultationHref('teeth-whitening');
const INLINE_LINK = 'font-medium text-gold-dark underline decoration-gold/40 underline-offset-4 transition-colors hover:decoration-gold';

const TeethWhitening = () => {
  const meta = ROUTE_METADATA['/teeth-whitening'];
  const whiteningPrograms = [
    {
      title: "In-Office Zoom Whitening",
      description: "In-office whitening for noticeable results in a single visit, with LED activation and a sensitivity protocol throughout."
    },
    {
      title: "Custom Take-Home Whitening",
      description: "Professional-strength gel in custom-fitted trays, so you can brighten gradually and control the pace and sensitivity."
    },
    {
      title: "Hybrid Whitening Plan",
      description: "Pair an in-office session with take-home touch-ups so your shade stays consistent over time."
    }
  ];

  const faqs = [
    {
      question: "Which whitening option is right for me?",
      answer: "During your consultation, we look at existing restorations, sensitivity history, enamel thickness, and your timeline. If you have an event coming up soon, in-office whitening works well. If you would rather brighten gradually, custom take-home trays give you more control. A hybrid plan helps keep your shade consistent over time."
    },
    {
      question: "How do you reduce sensitivity?",
      answer: "We prep teeth with a desensitizing mousse, use carefully timed gel cycles, and apply fluoride varnish right after whitening. Custom take-home kits include desensitizing gel and clear instructions so you stay comfortable between sessions."
    },
    {
      question: "How often should I whiten?",
      answer: "In-office whitening can be repeated every 12 to 18 months, while take-home touch-ups keep results fresh in between. We will recommend a maintenance plan that fits your routine and stain exposure so your shade stays consistent."
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
          '@type': 'MedicalProcedure',
          name: 'Professional Teeth Whitening',
          description: 'Professional teeth whitening treatments tailored for Los Angeles lifestyles, featuring Zoom in-office whitening and custom take-home programs.',
          url: getCanonicalUrl('/teeth-whitening'),
          category: 'Cosmetic Dentistry',
          provider: {
            '@id': 'https://exquisitedentistryla.com/#business'
          },
          performer: {
            '@id': 'https://exquisitedentistryla.com/#doctor'
          },
          expectedPrognosis: 'Noticeably brighter smile with long-lasting results when paired with maintenance.',
          bodyLocation: 'Teeth'
        }]}
      />

      <PageSEO
        title={meta.title}
        description={meta.description}
        keywords={meta.keywords}
        path="/teeth-whitening"
        ogImage={meta.ogImage}
      />

      <WebPageStructuredData
        title="Teeth Whitening in Los Angeles"
        description="Brighten your smile with professional teeth whitening options in Los Angeles. Choose Zoom in-office whitening, hybrid plans, or custom take-home kits."
        url="https://exquisitedentistryla.com/teeth-whitening"
        breadcrumbs={[
          { name: 'Services', url: 'https://exquisitedentistryla.com/services/' },
          { name: 'Teeth Whitening', url: 'https://exquisitedentistryla.com/teeth-whitening/' }
        ]}
      />

      <ServiceStructuredData
        serviceName="Professional Teeth Whitening"
        description="Concierge whitening programs including Zoom in-office treatments and custom take-home kits for long-lasting brightness."
        url="/teeth-whitening"
      />

      <FAQStructuredData faqs={faqs} about="Professional Teeth Whitening in Los Angeles" />

      <div className="min-h-screen bg-background">
        <VideoHero
          eyebrow="Teeth whitening"
          title="Teeth Whitening Los Angeles"
          subtitle="In-office whitening, custom take-home trays, and hybrid plans, matched to your sensitivity and schedule."
          primaryCta={{
            text: "Schedule Consultation",
            href: WHITENING_CONSULTATION_HREF
          }}
          phoneCta
          height="medium"
        />

        <section className="bg-background py-16 md:py-24">
          <div className="section-container">
            <SectionHeading
              eyebrow="Los Angeles Smile Brightening"
              title={<>Professional Whitening, Planned Around <em>Your Schedule</em></>}
            />
            <Reveal variant="up" delay={120} className="mx-auto mt-8 max-w-3xl space-y-6 text-left text-lg leading-8 text-gray-600 sm:text-center">
              <p>
                Our whitening combines clinical precision with comfort-focused care.
                We offer three whitening pathways designed to brighten noticeably while protecting enamel.
                Each one is supported by a sensitivity protocol and tailored aftercare,
                so the experience stays predictable and your results hold up.
              </p>
              <p>
                Dr. Alexie Aguil and our hygiene team review your enamel thickness, existing dentistry, and habits to recommend the right approach.
                We calibrate gel strength, light activation, and session timing to your comfort level.
                You leave with a clear maintenance plan so your results stay consistent over time.
              </p>
              <p className="text-base leading-7">
                Looking specifically for in-office Zoom? Explore{' '}
                <Link to="/zoom-whitening/" className={INLINE_LINK}>
                  Zoom Teeth Whitening in Los Angeles
                </Link>
                . Coming from Culver City? See{' '}
                <Link to="/culver-city-teeth-whitening/" className={INLINE_LINK}>
                  teeth whitening near Culver City
                </Link>
                . Planning around a ceremony or engagement photos? Read our{' '}
                <Link to="/blog/when-to-start-wedding-smile-prep-los-angeles/" className={INLINE_LINK}>
                  wedding smile prep timeline guide
                </Link>
                .
              </p>
            </Reveal>
          </div>
        </section>

        <section className="bg-ivory py-16 md:py-24">
          <div className="section-container">
            <SectionHeading eyebrow="Three pathways" title={<>Whitening <em>options</em></>} />
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {whiteningPrograms.map((program, index) => (
                <Reveal key={program.title} variant="up" delay={index * 80} className={`${CARD} h-full p-6 sm:p-7`}>
                  <span className="text-3xl leading-none" aria-hidden="true">
                    <span className="accent-serif text-gold">{String(index + 1).padStart(2, '0')}</span>
                  </span>
                  <h3 className="mt-4 text-xl font-semibold tracking-[-0.01em] text-ink">{program.title}</h3>
                  <p className="mt-2 text-base leading-7 text-gray-600">{program.description}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-background py-16 md:py-24">
          <div className="section-container grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="min-w-0">
              <SectionHeading align="left" eyebrow="Your visit" title={<>What to Expect During <em>Whitening</em></>} />
              <Reveal variant="up" delay={120} className="mt-6 space-y-6 text-base leading-7 text-gray-600 md:text-lg md:leading-8">
                <p>
                  Each visit begins with a gentle polish, and we apply a warm desensitizing mousse before whitening to keep you comfortable.
                  During an in-office session, you can settle in and relax while the gel does its work.
                </p>
                <p>
                  We adjust gel strength for each 15-minute cycle to balance noticeable results with enamel safety.
                  After whitening, you will receive a take-home kit with touch-up pens, aligner-safe gel (if you wear <Link to="/invisalign/" className={INLINE_LINK}>Invisalign</Link>),
                  and dietary guidance for the first 48 hours.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Button size="lg" className="group h-auto min-h-12 whitespace-normal py-3" asChild>
                    <Link
                      to={WHITENING_CONSULTATION_HREF}
                      onClick={() => trackConsultationIntent({ source: 'whitening_expect_section', ctaText: 'Schedule Consultation', destination: WHITENING_CONSULTATION_HREF })}
                    >
                      Schedule Consultation
                      <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="h-auto min-h-12 whitespace-normal py-3" asChild>
                    <Link to="/zoom-whitening/">
                      Learn about Zoom Whitening
                    </Link>
                  </Button>
                </div>
              </Reveal>
            </div>
            <Reveal variant="up" delay={160} className={`${CARD} h-fit bg-ivory p-6 sm:p-8`}>
              <h3 className="text-xl font-semibold tracking-[-0.01em] text-ink">Whitening Comfort Protocol</h3>
              <ul className="mt-4 divide-y divide-gold/10 text-base leading-7 text-gray-600">
                {[
                  'Pre-treatment evaluation ensures existing restorations and veneers align with whitening goals.',
                  'Micro-applicators deliver gel precisely, protecting gums and minimizing sensitivity flare-ups.',
                  'Cool air fans, vitamin E swabs, and blue-light shielding keep you comfortable throughout the session.',
                  'Post-treatment remineralization strengthens enamel and seals pores for longer-lasting results.',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 py-4">
                    <Sparkles className="mt-1.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                    <span className="min-w-0">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        <ConsultationBand
          eyebrow="Whitening consultation"
          title={<>Find the whitening plan <em>that fits</em></>}
          description="We look at your enamel, any existing dentistry, and your sensitivity history, then recommend in-office, take-home, or a hybrid plan."
          href={WHITENING_CONSULTATION_HREF}
          source="whitening_mid_cta"
          className="pt-0 md:pt-0"
        />

        <section className="bg-ivory py-16 md:py-24">
          <div className="section-container">
            <div className="mx-auto max-w-4xl">
              <SectionHeading align="left" eyebrow="Personalized" title={<>Whitening Tailored to <em>Your Routine</em></>} />
              <Reveal variant="up" delay={120} className="mt-6 space-y-6 text-base leading-7 text-gray-600 md:text-lg md:leading-8">
                <p>
                  We personalize whitening around your habits and goals.
                  If coffee, tea, or wine are part of your routine, we will share stain-prevention tips to help your results last.
                  If you have an event coming up, we can plan the timing so your shade settles beforehand.
                </p>
                <p>
                  If you travel often, we can put together a take-home kit and a simple touch-up routine that fits your schedule.
                  If you have veneers, implants, or composite bonding, we calibrate whitening so your natural teeth match your existing dental work.
                </p>
                <p>
                  Whitening also pairs well with <Link to="/veneers/" className={INLINE_LINK}>porcelain veneers</Link>, <Link to="/dental-implants/" className={INLINE_LINK}>dental implants</Link>, or a <Link to="/cosmetic-dentistry/" className={INLINE_LINK}>comprehensive cosmetic plan</Link>
                  {' '}when you are planning broader changes.
                </p>
              </Reveal>
            </div>
            <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-2">
              {[
                {
                  title: 'Teeth whitening near Beverly Hills',
                  body: 'Coming from Beverly Hills? See whitening options designed around Beverly Hills schedules, including in-office whitening, custom trays, and shade planning for existing restorations.',
                  links: [
                    { text: 'Beverly Hills Whitening Guide', href: '/teeth-whitening-beverly-hills/' },
                    { text: 'Beverly Hills Dentist Page', href: '/beverly-hills-dentist/' },
                  ],
                },
                {
                  title: 'Culver City teeth whitening',
                  body: 'Coming from Culver City? Compare in-office whitening, custom take-home trays, and sensitivity planning designed for busy Culver City schedules.',
                  links: [
                    { text: 'Culver City Whitening Guide', href: '/culver-city-teeth-whitening/' },
                    { text: 'Culver City Dentist Page', href: '/culver-city-dentist/' },
                  ],
                },
              ].map((area, index) => (
                <Reveal key={area.title} variant="up" delay={index * 80} className={`${CARD} flex h-full min-w-0 flex-col p-6 sm:p-8`}>
                  <h3 className="text-xl font-semibold tracking-[-0.01em] text-ink">{area.title}</h3>
                  <p className="mt-3 flex-1 text-base leading-7 text-gray-600">{area.body}</p>
                  {/* Long labels wrap instead of forcing the card wider than the viewport. */}
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {area.links.map((link) => (
                      <Button key={link.href} variant="outline" className="h-auto min-h-11 whitespace-normal px-4 py-2.5 text-center leading-snug" asChild>
                        <Link to={link.href}>{link.text}</Link>
                      </Button>
                    ))}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-background py-16 md:py-24">
          <div className="section-container grid gap-8 lg:grid-cols-2 lg:gap-10">
            <Reveal variant="up" className={`${CARD} h-fit p-6 sm:p-8`}>
              <p className="eyebrow">Cost</p>
              <h2 className="mt-4 text-2xl font-semibold tracking-[-0.02em] text-ink md:text-3xl">Whitening Costs &amp; What to Ask</h2>
              <div className="mt-4 space-y-4 text-base leading-7 text-gray-600">
                <p>
                  {getTreatmentCostAnswer('whitening')}
                </p>
                <p>
                  Ask whether take-home trays, touch-up gel, and follow-up visits are included in your estimate, and how maintenance supplies are priced.
                </p>
                <p>
                  If you are also considering veneers, bonding, or Invisalign, discuss the treatment order and request an itemized estimate.
                </p>
              </div>
            </Reveal>

            <div className="flex min-w-0 flex-col gap-6">
              <Reveal variant="up" delay={120} className={`${CARD} p-6 sm:p-8`}>
                <h3 className="text-xl font-semibold tracking-[-0.01em] text-ink">Smile Brightening Checklist</h3>
                <ul className="mt-4 divide-y divide-gold/10 text-base leading-7 text-gray-600">
                  {[
                    'Avoid dark foods and drinks for 48 hours; choose light-colored meals and still water for lasting results.',
                    'Rinse with cool water or straw-sip if you indulge in espresso or red wine during the first week after whitening.',
                    'Use remineralizing serum nightly for seven days to hydrate enamel and keep the surface smooth.',
                    'Schedule whitening 7 to 10 days before major events so shade settles and soft tissues look their healthiest.',
                    'Bring your trays to hygiene visits, we’ll professionally clean them and restock whitening gel refills.',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 py-3.5">
                      <Sun className="mt-1.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                      <span className="min-w-0">{item}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <ServiceRecommendation
                currentService="Teeth Whitening"
                context="complement"
                recommendations={[
                  {
                    title: "Zoom Whitening",
                    href: "/zoom-whitening/",
                    description: "Learn about our in-office whitening technology for immediate results.",

                    combination: true
                  },
                  {
                    title: "Wedding Smile Package",
                    href: "/wedding/",
                    description: "Pair whitening with veneers and Invisalign before your celebration.",

                  },
                  {
                    title: "Graduation Smile Prep",
                    href: "/graduation/",
                    description: "Brighten your smile before ceremonies and professional headshots.",

                  },
                  {
                    title: "Client Experience",
                    href: "/client-experience/",
                    description: "See the comfort details that make whitening an easy, low-stress visit.",

                  }
                ]}
              />
            </div>
          </div>
        </section>

        <FinancingOptionsSection
          className="bg-background pt-0 md:pt-0"
          title="See flexible payment options right after the whitening investment breakdown."
          description="If you are comparing Zoom whitening, custom trays, or a whitening package bundled with veneers or Invisalign, our Cherry financing page lets you review monthly options while the pricing details are still top of mind."
        />

        <section className="bg-ivory py-16 md:py-24">
          <div className="section-container">
            <SectionHeading eyebrow="Answers" title={<>Teeth Whitening <em>FAQs</em></>} />
            <Reveal variant="up" className="mx-auto mt-10 max-w-3xl">
              <ServiceFaqList faqs={faqs} openFirst />
            </Reveal>
          </div>
        </section>

        {/* Social Proof: Patient Reviews */}
        <section className="bg-background py-16 md:py-24">
          <div className="section-container">
            <SectionHeading
              eyebrow="Patient reviews"
              title={<>What Our Patients <em>Say</em></>}
              description="A selection of reviews from patients at Exquisite Dentistry."
            />
            <Reveal variant="up" className="mx-auto mt-12 max-w-6xl">
              <FeaturedReviewWall reviews={featuredReviews.slice(0, 6)} />
            </Reveal>
          </div>
        </section>

        {/* Before & After Transformations */}
        <SmileGalleryPreview />

        {/* Related Articles Section */}
        <RelatedArticles
          tags={['whitening', 'teeth whitening', 'zoom', 'bright smile']}
          title="Whitening Tips & Insights"
          subtitle="Learn how to brighten and maintain your smile"
        />

        <ConsultationBand
        closing
          tone="light"
          eyebrow="Your consultation"
          title={<>Ready to Talk Through <em>Whitening?</em></>}
          description="If you are considering whitening, a consultation is the place to start. We will talk through your options, your sensitivity, and your timeline, then recommend the path that fits. If you still have questions, that is completely fine too."
          href={WHITENING_CONSULTATION_HREF}
          source="whitening_final_cta"
          secondaryLink={{ text: 'Hear From Whitening Clients', href: '/testimonials/' }}
        />

        <section className="pb-20">
          <div className="section-container">
            <InternalLinkingWidget
              context="whitening"
              variant="expanded"
              title="Explore more smile-brightening resources"
              className="mt-0"
            />
            <LastUpdated date="December 2025" className="text-center" />
          </div>
        </section>
      </div>
    </>
  );
};

export default TeethWhitening;
