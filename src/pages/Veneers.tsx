import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '@/components/Breadcrumbs';
import PageSEO from '@/components/seo/PageSEO';
import VideoHero from '@/components/VideoHero';
import { Check, Star, Clock, Shield, Sparkles, ArrowRight, ChevronDown } from 'lucide-react';
import FinancingOptionsSection from '@/components/FinancingOptionsSection';
import MasterStructuredData from '@/components/seo/MasterStructuredData';
import InternalLinkingWidget from '@/components/InternalLinkingWidget';
import ServiceRecommendation from '@/components/ServiceRecommendation';
import RelatedArticles from '@/components/RelatedArticles';
import LastUpdated from '@/components/LastUpdated';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/motion/Reveal';
import ConsultationBand from '@/components/service/ConsultationBand';
import ServiceFaqList from '@/components/service/ServiceFaqList';
import ServiceProofSection from '@/components/service/ServiceProofSection';
import { consultationHref } from '@/data/consultation';
import {
  createFAQSchema,
  createMedicalProcedureSchema,
  createWebPageSchema,
  createBreadcrumbSchema
} from '@/utils/centralizedSchemas';
import { ROUTE_METADATA } from '@/constants/metadata';
import { getTreatmentCostAnswer } from '@/data/treatmentPricing';

const CARD = 'rounded-2xl border border-gold/15 bg-white shadow-[0_24px_60px_-40px_rgba(23,18,10,0.35)]';
const VENEER_CONSULTATION_HREF = consultationHref('porcelain-veneers');

const Veneers = () => {
  const meta = ROUTE_METADATA['/veneers'];
  const benefits = [
    {
      icon: <Sparkles className="h-5 w-5" />,
      title: "A Refreshed Smile",
      description: "Improve your smile's appearance in just a few visits"
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: "Durable & Long-lasting",
      description: "High-quality porcelain veneers can last many years with appropriate care; longevity varies"
    },
    {
      icon: <Star className="h-5 w-5" />,
      title: "Natural Appearance",
      description: "Custom-crafted to match your facial features and desired aesthetic"
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: "Minimal Tooth Preparation",
      description: "Conservative approach that preserves most of your natural tooth structure"
    }
  ];

  const process = [
    {
      step: "01",
      title: "Consultation & Design",
      description: "A thorough evaluation and digital smile design to preview your new smile"
    },
    {
      step: "02", 
      title: "Preparation",
      description: "Minimal tooth preparation and precise impressions for custom fabrication"
    },
    {
      step: "03",
      title: "Fabrication",
      description: "Expert craftsmen create your custom veneers using quality porcelain materials"
    },
    {
      step: "04",
      title: "Placement",
      description: "Precise bonding and final adjustments to complete your new smile"
    }
  ];

  const veneerGuides = [
    {
      title: 'Veneers cost in Los Angeles',
      description: 'What changes the price of a veneer case, how porcelain and composite compare, and what a quote includes.',
      href: '/veneers/cost-los-angeles/',
      cta: 'Read the cost guide'
    },
    {
      title: 'Veneers for the front 2 to 4 teeth',
      description: 'How the veneer count is chosen for the smile zone, and why treating four often prevents later shade mismatch.',
      href: '/veneers/front-teeth-veneers-los-angeles/',
      cta: 'Compare 2 and 4 veneers'
    },
    {
      title: 'Cost of veneers for 2 front teeth',
      description: 'A closer look at the two-tooth case, including whitening sequence and what the quote covers.',
      href: '/veneers/2-front-teeth-veneers-cost-los-angeles/',
      cta: 'See two-tooth pricing detail'
    },
    {
      title: 'A veneer for a single tooth',
      description: 'Matching one veneer to the teeth beside it, and when bonding or whitening is the better starting point.',
      href: '/veneers/1-tooth-veneer-los-angeles/',
      cta: 'Read about single-tooth veneers'
    }
  ];

  const faqs = [
    {
      question: "How long do porcelain veneers last?",
      answer: "With proper care and regular dental visits, porcelain veneers typically last 10 to 15 years. Their longevity depends on factors like oral hygiene, bite habits, and lifestyle choices."
    },
    {
      question: "Are veneers reversible?",
      answer: "Veneers that involve enamel removal are not reversible. Dr. Aguil evaluates how much preparation your teeth would need and discusses alternatives before you decide."
    },
    {
      question: "Do veneers look natural?",
      answer: "Our custom porcelain veneers are designed to match your facial features, skin tone, and desired aesthetic. They reflect light naturally and blend seamlessly with your existing teeth."
    },
    {
      question: "Can I eat normally with veneers?",
      answer: "Once your veneers are bonded, you can eat most foods normally. We recommend avoiding extremely hard foods and using common sense to protect your investment."
    },
    {
      question: "How do I care for my veneers?",
      answer: "Care for veneers just like your natural teeth, brush twice daily, floss regularly, and visit us for routine cleanings. Avoid using your teeth as tools and consider a nightguard if you grind your teeth."
    }
  ];

  // Generate schemas to pass to MasterStructuredData (single @graph)
  const additionalSchemas = [
    createMedicalProcedureSchema({
      procedureName: "Porcelain Veneers",
      description: "Custom-designed ultra-thin porcelain shells bonded to the front surface of teeth to improve appearance, creating a beautiful and natural-looking smile transformation.",
      url: "/veneers",
      image: "https://exquisitedentistryla.com/lovable-uploads/2e2732fc-c4a6-4f21-9829-3717d9b2b36d.png",
      procedureType: "Cosmetic Dental Procedure",
      bodyLocation: "Oral and Dental System",
      preparation: [
        "Comprehensive consultation and examination",
        "Digital impressions and smile design",
        "Color matching to existing teeth"
      ],
      steps: [
        { name: "Consultation & Design", description: "A thorough evaluation and digital smile design to preview your new smile" },
        { name: "Preparation", description: "Minimal tooth preparation and precise impressions for custom fabrication" },
        { name: "Fabrication", description: "Expert craftsmen create your custom veneers using quality porcelain materials" },
        { name: "Placement", description: "Precise bonding and final adjustments to complete your new smile" }
      ],
      followupCare: [
        "Regular dental cleanings and checkups",
        "Avoid using teeth as tools",
        "Consider nightguard if teeth grinding occurs"
      ],
      benefits: [
        "A natural-looking improvement to your smile",
        "Natural-looking results",
        "Long-lasting durability",
        "Stain-resistant surface"
      ],
      recoveryTime: "Immediate return to normal activities"
    }),
    createWebPageSchema({
      title: "Porcelain Veneers Los Angeles",
      description: "Transform your smile with custom porcelain veneers in Los Angeles. Expert craftsmanship, natural results, and personalized care.",
      url: "/veneers"
    }),
    createBreadcrumbSchema([
      { name: "Services", url: "/services" },
      { name: "Porcelain Veneers", url: "/veneers" }
    ]),
    createFAQSchema(faqs, "Porcelain Veneers")
  ];


  return (
    <>
      <MasterStructuredData
        includeBusiness={true}
        includeWebsite={true}
        additionalSchemas={additionalSchemas}
      />

      <PageSEO
        title={meta.title}
        description={meta.description}
        keywords={meta.keywords}
        path="/veneers"
        ogImage={meta.ogImage}
      />

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <VideoHero
          eyebrow="Porcelain veneers"
          title={<>Dental Veneers in <span className="text-gold">Los Angeles</span></>}
          subtitle="Ultra-thin, custom-crafted porcelain veneers designed to correct chips, gaps, discoloration, and uneven edges while preserving healthy enamel. Planned by Dr. Alexie Aguil using digital smile design and careful lab fabrication."
          primaryCta={{
            text: "Schedule Consultation",
            href: VENEER_CONSULTATION_HREF
          }}
          phoneCta
          height="medium"
        />

        <div className="section-container mt-6">
          <Breadcrumbs
            items={[
              { label: 'Services', to: '/services/' },
              { label: 'Porcelain Veneers', to: '/veneers/' }
            ]}
          />
        </div>

        {/* Introduction */}
        <section className="bg-background pb-14 pt-12 md:pb-20 md:pt-16">
          <div className="section-container">
            <SectionHeading
              eyebrow="Porcelain veneers"
              title={<>Porcelain Veneers, Planned for <em>Natural Results</em></>}
              description="Porcelain veneers are thin ceramic shells bonded to the front of teeth to improve shape, color, and minor alignment. We start with digital smile design and conservative preparation to keep as much natural tooth structure as possible. Each veneer is fabricated by a dental lab to match your facial features and bite for a natural-looking finish."
            />
          </div>
        </section>

        {/* Proof first: real comparisons, verbatim reviews, one clear next step */}
        <ServiceProofSection
          caseNames={['Brittany', 'Jessica', 'Abigail']}
          reviewNames={['Wylie S', 'Nik Nak', 'Ziggy Valdez']}
          consultationHref={VENEER_CONSULTATION_HREF}
          source="veneers_proof_section"
        />

        {/* Veneers Designed for Everyday Confidence */}
        <section className="bg-background py-16 md:py-24">
          <div className="section-container grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
            <SectionHeading
              align="left"
              eyebrow="Designed around you"
              title={<>Veneers Designed for <em>Everyday Confidence</em></>}
            />
            <Reveal variant="up" delay={120} className="space-y-6 text-lg leading-8 text-gray-600 lg:pt-12">
              <p>
                Every veneer plan starts with a smile discovery session. We look at your facial proportions, how you speak, and how you want your smile to feel day to day, then design porcelain that fits your features rather than covering them. The goal is a smile that photographs well, speaks naturally, and still looks like you.
              </p>
              <p>
                Dr. Alexie Aguil works with Los Angeles ceramists to shape each veneer by hand. Layers of porcelain are chosen to match your complexion and the way your teeth catch light. The finished result looks consistent in person and on camera, and is built to hold up over years of everyday use.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="bg-ivory py-16 md:py-24">
          <div className="section-container">
            <SectionHeading
              eyebrow="Benefits"
              title={<>Why Choose <em>Veneers?</em></>}
              description="Discover the transformative benefits of porcelain veneers"
            />
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {benefits.map((benefit, index) => (
                <Reveal
                  key={`benefit-${benefit.title.replace(/[^a-zA-Z0-9]/g, '')}`}
                  variant="up"
                  delay={index * 80}
                  className={`${CARD} flex h-full items-start gap-4 p-5 sm:block sm:p-6`}
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold" aria-hidden="true">
                    {benefit.icon}
                  </span>
                  <div className="min-w-0 sm:mt-5">
                    <h3 className="text-lg font-semibold tracking-[-0.01em] text-ink">{benefit.title}</h3>
                    <p className="mt-1.5 text-sm leading-6 text-gray-600 sm:mt-2">{benefit.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="bg-background py-16 md:py-24">
          <div className="section-container">
            <SectionHeading
              eyebrow="What to expect"
              title={<>Our Veneer <em>Process</em></>}
              description="A careful approach to designing your new smile"
            />
            <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {process.map((step, index) => (
                <Reveal as="li" key={`process-step-${step.step}`} variant="up" delay={index * 80} className={`${CARD} relative flex h-full items-start gap-4 p-5 sm:block sm:p-6`}>
                  <span className="w-10 shrink-0 text-3xl leading-none sm:block sm:text-4xl" aria-hidden="true">
                    <span className="accent-serif text-gold">{step.step}</span>
                  </span>
                  <div className="min-w-0 sm:mt-4">
                    <h3 className="text-lg font-semibold tracking-[-0.01em] text-ink">{step.title}</h3>
                    <p className="mt-1.5 text-sm leading-6 text-gray-600 sm:mt-2">{step.description}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        <ConsultationBand
          eyebrow="Veneer consultation"
          title={<>Start with a <em>veneer consultation</em></>}
          description="Dr. Aguil looks at your goals, your bite, and how much preparation your teeth would need, and talks through alternatives before you decide."
          href={VENEER_CONSULTATION_HREF}
          source="veneers_mid_cta"
          className="bg-background pt-0 md:pt-0"
        />

        {/* Front teeth scenarios + cluster index */}
        <section className="bg-ivory py-16 md:py-24">
          <div className="section-container">
            <SectionHeading
              eyebrow="Front teeth"
              title={<>Only need your front teeth <em>transformed?</em></>}
              description="Plan for 2 or 4 veneers with transparent pricing, shade strategy, and conservative prep."
            />
            <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-2">
              {[
                {
                  label: '2 veneers',
                  title: 'Targeted front tooth fixes',
                  description: 'A good option for a single dark tooth, chips, or peg laterals after whitening.',
                  cta: 'Explore 2 veneer plans',
                },
                {
                  label: '4 veneers',
                  title: 'Balance the entire smile zone',
                  description: 'Prevent shade mismatch and create even, natural symmetry across your front teeth.',
                  cta: 'Explore 4 veneer plans',
                },
              ].map((option, index) => (
                <Reveal key={option.label} variant="up" delay={index * 80} className="h-full">
                  <Link
                    to="/veneers/front-teeth-veneers-los-angeles/"
                    className={`${CARD} lift-card group flex h-full flex-col p-7`}
                  >
                    <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-dark">{option.label}</span>
                    <span className="mt-2 text-xl font-semibold tracking-[-0.01em] text-ink">{option.title}</span>
                    <span className="mt-2 text-base leading-7 text-gray-600">{option.description}</span>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-gold-dark">
                      <span className="link-sweep pb-0.5">{option.cta}</span>
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>

            {/*
              Cluster index. This pillar previously linked only to the front-teeth child,
              so the cost and single-tooth pages had no internal path in from the hub —
              Search Console listed the sitemap as their only referring URL.
            */}
            <div className="mx-auto mt-16 max-w-5xl md:mt-20">
              <SectionHeading
                eyebrow="Guides"
                title="Veneer guides"
                description="Detail on the questions that come up most often before a veneer consultation."
              />
              <div className="mt-10 grid gap-4 md:grid-cols-2">
                {veneerGuides.map((guide, index) => (
                  <Reveal key={guide.href} variant="up" delay={(index % 2) * 80} className="h-full">
                    <Link to={guide.href} className={`${CARD} lift-card group flex h-full flex-col p-6`}>
                      <span className="text-lg font-semibold tracking-[-0.01em] text-ink">{guide.title}</span>
                      <span className="mt-2 text-sm leading-6 text-gray-600">{guide.description}</span>
                      <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-gold-dark">
                        <span className="link-sweep pb-0.5">{guide.cta}</span>
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                      </span>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Estimate + financing */}
        <section className="bg-background pb-4 pt-16 md:pt-24">
          <div className="section-container">
            <Reveal variant="up" className={`${CARD} mx-auto max-w-4xl p-7 md:p-10`}>
              <p className="eyebrow">Cost</p>
              <h2 className="mt-4 text-2xl font-semibold tracking-[-0.02em] text-ink md:text-3xl">Understand your veneer estimate</h2>
              <p className="mt-4 text-base leading-7 text-gray-600">{getTreatmentCostAnswer('porcelainVeneer')}</p>
              <Link
                to="/veneers/2-front-teeth-veneers-cost-los-angeles/"
                className="group mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-gold-dark"
              >
                <span className="link-sweep pb-0.5">Planning just two front teeth? Compare the cost factors.</span>
                <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </Reveal>
          </div>
        </section>

        <FinancingOptionsSection
          className="bg-background"
          title="Comparing 2 veneers, 4 veneers, or a fuller veneer plan?"
          description="Right after reviewing front-teeth veneer options and transparent planning guidance, our Cherry financing page lets you explore monthly payment options before moving into the full treatment process."
        />

        {/* Los Angeles planning + care */}
        <section className="bg-ivory py-16 md:py-24">
          <div className="section-container grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionHeading
                align="left"
                eyebrow="Shade and planning"
                title={<>Los Angeles-Focused <em>Veneer Planning</em></>}
              />
              <Reveal as="p" variant="up" delay={120} className="mt-6 text-lg leading-8 text-gray-600">
                In Los Angeles, your smile shows up on video calls, in photos, and in everyday conversation. We look at how your teeth move as you speak, laugh, and smile, and if your gum levels need refining we can pair veneers with gentle laser recontouring. Some patients prefer slightly warmer undertones and others prefer a brighter, cooler shade. We plan the shade with you so it suits your face and the light you are usually in.
              </Reveal>
            </div>
            <div>
              <SectionHeading
                align="left"
                eyebrow="Aftercare"
                title={<>Caring for Your <em>Veneers</em></>}
              />
              <Reveal as="ul" variant="up" delay={120} className={`${CARD} mt-6 divide-y divide-gold/10 px-6`}>
                {[
                  'Attend professional cleanings every 3 to 4 months with hygienists trained in veneer-safe polishing paste.',
                  'Wear your nightguard nightly to protect porcelain edges from clenching and grinding.',
                  'Use non-abrasive toothpaste and gentle floss to protect the finish and keep the margins clean.',
                  'Schedule quick bite checks after major orthodontic changes or new restorative work to keep veneers balanced.',
                  'Keep a travel-safe whitening pen and veneer case in your bag for touch-ups while you travel.',
                ].map((tip) => (
                  <li key={tip} className="flex gap-3 py-4">
                    <Check className="mt-1 h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
                    <span className="text-base leading-7 text-gray-600">{tip}</span>
                  </li>
                ))}
              </Reveal>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-background py-16 md:py-24">
          <div className="section-container">
            <SectionHeading
              eyebrow="Answers"
              title={<>Frequently Asked <em>Questions</em></>}
              description="Everything you need to know about porcelain veneers"
            />
            <Reveal variant="up" className="mx-auto mt-10 max-w-3xl">
              <ServiceFaqList faqs={faqs} openFirst />
              <p className="mt-6 text-sm leading-6 text-gray-600">
                Learn more about veneer preparation and care from the{' '}
                <a href="https://www.mouthhealthy.org/all-topics-a-z/veneers" target="_blank" rel="noopener noreferrer" className="font-medium text-gold-dark underline underline-offset-4">American Dental Association</a>.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Related Articles Section */}
        <RelatedArticles
          tags={['veneers', 'porcelain veneers', 'cosmetic dentistry', 'smile makeover']}
          category="Cosmetic Dentistry"
          title="Learn More About Veneers"
          subtitle="Explore our blog for expert insights on porcelain veneers, costs, and care"
        />

        {/* Related services and resources, collapsed so they don't bury the next step */}
        <section className="bg-background pt-12 md:pt-16">
          <div className="section-container">
            <details className={`${CARD} group mx-auto max-w-5xl`}>
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 sm:px-8 [&::-webkit-details-marker]:hidden">
                <span className="min-w-0">
                  <span className="block text-lg font-semibold tracking-[-0.01em] text-ink">More veneer resources</span>
                  <span className="mt-1 block text-sm text-gray-600">Related treatments, cost guides, and planning articles</span>
                </span>
                <ChevronDown className="h-5 w-5 shrink-0 text-gold transition-transform duration-300 group-open:rotate-180" aria-hidden="true" />
              </summary>
              <div className="space-y-6 border-t border-gold/10 px-4 pb-6 pt-2 sm:px-8">
                <InternalLinkingWidget
                  context="veneer"
                  variant="expanded"
                  currentPage="/veneers"
                  className="my-4"
                />
                <ServiceRecommendation
                  currentService="Porcelain Veneers"
                  context="complement"
                  recommendations={[
                    {
                      title: "Teeth Whitening",
                      href: "/zoom-whitening",
                      description: "Complement your veneer results with professional whitening",
                      duration: "1 hour",
                      combination: true
                    },
                    {
                      title: "Gum Contouring",
                      href: "/services#cosmetic",
                      description: "Frame your veneers with balanced gum lines",
                      duration: "30 to 60 min",
                    },
                    {
                      title: "Smile Makeover",
                      href: "/smile-makeover-los-angeles",
                      description: "Complete transformation with multiple procedures",
                      duration: "Multiple visits",
                    }
                  ]}
                />
              </div>
            </details>
          </div>
        </section>

        {/* CTA Section */}
        <ConsultationBand
        closing
          tone="light"
          eyebrow="Your consultation"
          title={<>Ready to Transform <em>Your Smile?</em></>}
          description="Schedule a consultation to learn how porcelain veneers could fit your smile and your goals."
          href={VENEER_CONSULTATION_HREF}
          source="veneers_final_cta"
          secondaryLink={{ text: 'Contact Us', href: '/contact/' }}
        />
        <div className="section-container pb-12">
          <LastUpdated date="December 2025" className="mt-0 text-center" />
        </div>
      </div>
    </>
  );
};

export default Veneers;
