import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, ChevronDown } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import PageSEO from '@/components/seo/PageSEO';
import VideoHero from '@/components/VideoHero';
import MasterStructuredData from '@/components/seo/MasterStructuredData';
import InternalLinkingWidget from '@/components/InternalLinkingWidget';
import RelatedArticles from '@/components/RelatedArticles';
import LastUpdated from '@/components/LastUpdated';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/motion/Reveal';
import ConsultationBand from '@/components/service/ConsultationBand';
import ServiceFaqList from '@/components/service/ServiceFaqList';
import { consultationHref } from '@/data/consultation';
import {
  createBreadcrumbSchema,
  createFAQSchema,
  createMedicalProcedureSchema,
  createWebPageSchema,
} from '@/utils/centralizedSchemas';
import {
  getVeneerGuideHeroTitleParts,
  getVeneerGuidePage,
  getVeneerGuideProcedureSteps,
  VENEER_GUIDE_CLUSTER_LINKS,
  VENEER_GUIDE_OG_IMAGE,
  VENEER_GUIDE_PAGE_LIST,
  type VeneerGuideId,
  type VeneerGuideSection,
} from '@/data/veneerGuidePages';
import { ROUTE_METADATA } from '@/constants/metadata';

const CARD = 'rounded-2xl border border-gold/15 bg-white shadow-[0_24px_60px_-40px_rgba(23,18,10,0.35)]';
const VENEER_CONSULTATION_HREF = consultationHref('porcelain-veneers');

const EXISTING_CLUSTER_LINKS = [
  {
    title: 'Veneers cost in Los Angeles',
    description: 'What changes the price of a veneer case, how porcelain and composite compare, and what a quote includes.',
    href: '/veneers/cost-los-angeles/',
    cta: 'Read the cost guide',
  },
  {
    title: 'Veneers for the front 2 to 4 teeth',
    description: 'How the veneer count is chosen for the smile zone, and why treating four often prevents later shade mismatch.',
    href: '/veneers/front-teeth-veneers-los-angeles/',
    cta: 'Compare 2 and 4 veneers',
  },
  {
    title: 'A veneer for a single tooth',
    description: 'Matching one veneer to the teeth beside it, and when bonding or whitening is the better starting point.',
    href: '/veneers/1-tooth-veneer-los-angeles/',
    cta: 'Read about single-tooth veneers',
  },
] as const;

const accentTitle = (title: string, accent: string): React.ReactNode => {
  if (!accent || !title.includes(accent)) return title;
  const [lead, ...rest] = title.split(accent);
  return (
    <>
      {lead}
      <em>{accent}</em>
      {rest.join(accent)}
    </>
  );
};

const GuideSection = ({ section, index }: { section: VeneerGuideSection; index: number }) => (
  <section className={index % 2 === 0 ? 'bg-background py-16 md:py-24' : 'bg-ivory py-16 md:py-24'}>
    <div className="section-container">
      <SectionHeading
        eyebrow="Guide"
        title={section.heading}
        description={section.paragraphs[0]}
      />
      {section.paragraphs.length > 1 ? (
        <div className="mx-auto mt-8 max-w-3xl space-y-4 text-base leading-7 text-gray-600">
          {section.paragraphs.slice(1).map((paragraph) => (
            <Reveal as="p" variant="up" key={paragraph.slice(0, 48)}>
              {paragraph}
            </Reveal>
          ))}
        </div>
      ) : null}
      {section.cards?.length ? (
        <div className={`mt-12 grid gap-5 ${section.cards.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
          {section.cards.map((card, cardIndex) => (
            <Reveal key={card.title} variant="up" delay={cardIndex * 80} className={`${CARD} h-full p-6`}>
              <h3 className="text-lg font-semibold tracking-[-0.01em] text-ink">{card.title}</h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">{card.body}</p>
            </Reveal>
          ))}
        </div>
      ) : null}
      {section.steps?.length ? (
        <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {section.steps.map((step, stepIndex) => (
            <Reveal
              as="li"
              key={step.step}
              variant="up"
              delay={stepIndex * 80}
              className={`${CARD} relative flex h-full items-start gap-4 p-5 sm:block sm:p-6`}
            >
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
      ) : null}
      {section.bullets?.length ? (
        <Reveal as="ul" variant="up" className={`${CARD} mx-auto mt-10 max-w-3xl divide-y divide-gold/10 px-6`}>
          {section.bullets.map((bullet) => (
            <li key={bullet} className="flex gap-3 py-4">
              <Check className="mt-1 h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
              <span className="text-base leading-7 text-gray-600">{bullet}</span>
            </li>
          ))}
        </Reveal>
      ) : null}
      {section.tips?.length ? (
        <Reveal as="ul" variant="up" className={`${CARD} mx-auto mt-10 max-w-3xl divide-y divide-gold/10 px-6`}>
          {section.tips.map((tip) => (
            <li key={tip} className="flex gap-3 py-4">
              <Check className="mt-1 h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
              <span className="text-base leading-7 text-gray-600">{tip}</span>
            </li>
          ))}
        </Reveal>
      ) : null}
      {section.links?.length ? (
        <div className="mx-auto mt-8 flex max-w-3xl flex-col gap-2">
          {section.links.map((link) => {
            const isExternal = /^https?:\/\//.test(link.href);
            const className = 'group inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-gold-dark';
            const label = (
              <>
                <span className="link-sweep pb-0.5">{link.label}</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </>
            );
            return isExternal ? (
              <a
                key={link.href}
                href={link.href}
                className={className}
                target="_blank"
                rel="noopener noreferrer"
              >
                {label}
              </a>
            ) : (
              <Link key={link.href} to={link.href} className={className}>
                {label}
              </Link>
            );
          })}
        </div>
      ) : null}
    </div>
  </section>
);

type VeneerGuidePageProps = {
  guideId: VeneerGuideId;
};

const VeneerGuidePage = ({ guideId }: VeneerGuidePageProps) => {
  const guide = getVeneerGuidePage(guideId);
  const meta = ROUTE_METADATA[guide.path];
  const heroParts = getVeneerGuideHeroTitleParts(guideId);
  const siblingGuides = VENEER_GUIDE_PAGE_LIST.filter((page) => page.id !== guideId);
  const additionalSchemas = [
    createMedicalProcedureSchema({
      procedureName: guide.procedureName,
      description: guide.procedureDescription,
      url: guide.path,
      image: VENEER_GUIDE_OG_IMAGE,
      procedureType: 'Cosmetic Dental Procedure',
      bodyLocation: 'Oral and Dental System',
      preparation: guide.preparation,
      steps: getVeneerGuideProcedureSteps(guide),
      followupCare: guide.followupCare,
      benefits: guide.benefits,
      recoveryTime: guide.recoveryTime,
    }),
    createWebPageSchema({
      title: guide.h1,
      description: guide.description,
      url: guide.path,
    }),
    createBreadcrumbSchema([
      { name: 'Services', url: '/services' },
      { name: 'Porcelain Veneers', url: '/veneers' },
      { name: guide.breadcrumb, url: guide.path },
    ]),
    createFAQSchema(guide.faqs, guide.h1),
  ];

  return (
    <>
      <MasterStructuredData includeBusiness includeWebsite additionalSchemas={additionalSchemas} />
      <PageSEO
        title={meta?.title ?? guide.title}
        description={meta?.description ?? guide.description}
        keywords={meta?.keywords ?? guide.keywords}
        path={guide.path}
        ogImage={meta?.ogImage ?? VENEER_GUIDE_OG_IMAGE}
      />

      <div className="min-h-screen bg-background">
        <VideoHero
          eyebrow={guide.eyebrow}
          title={
            <>
              {heroParts.lead}
              <span className="text-gold">{heroParts.accent}</span>
              {heroParts.tail}
            </>
          }
          subtitle={guide.subtitle}
          primaryCta={{
            text: 'Schedule Consultation',
            href: VENEER_CONSULTATION_HREF,
          }}
          phoneCta
          height="medium"
        />

        <div className="section-container mt-6">
          <Breadcrumbs
            items={[
              { label: 'Services', to: '/services/' },
              { label: 'Porcelain Veneers', to: '/veneers/' },
              { label: guide.breadcrumb, to: `${guide.path}/` },
            ]}
          />
        </div>

        <section className="bg-background pb-14 pt-12 md:pb-20 md:pt-16">
          <div className="section-container">
            <SectionHeading
              eyebrow={guide.introEyebrow}
              title={accentTitle(guide.introTitle, guide.introTitleAccent)}
              description={guide.introParagraphs[0]}
            />
            <div className="mx-auto mt-8 max-w-3xl space-y-4 text-lg leading-8 text-gray-600">
              {guide.introParagraphs.slice(1).map((paragraph) => (
                <Reveal as="p" variant="up" key={paragraph.slice(0, 48)}>
                  {paragraph}
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {guide.sections.map((section, index) => (
          <GuideSection key={section.heading} section={section} index={index} />
        ))}

        <ConsultationBand
          eyebrow="Veneer consultation"
          title={
            <>
              Start with a <em>veneer consultation</em>
            </>
          }
          description="Dr. Aguil looks at your goals, your bite, and how much preparation your teeth would need, and talks through alternatives before you decide."
          href={VENEER_CONSULTATION_HREF}
          source={`veneers_${guide.id}_mid_cta`}
          className="bg-background pt-0 md:pt-0"
        />

        <section className="bg-ivory py-16 md:py-24">
          <div className="section-container">
            <SectionHeading
              eyebrow="Guides"
              title="More veneer guides"
              description="Stay inside the veneers cluster for cost, tooth count, and the questions that come up before a consultation."
            />
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {siblingGuides.map((page, index) => (
                <Reveal key={page.path} variant="up" delay={(index % 2) * 80} className="h-full">
                  <Link to={`${page.path}/`} className={`${CARD} lift-card group flex h-full flex-col p-6`}>
                    <span className="text-lg font-semibold tracking-[-0.01em] text-ink">{page.breadcrumb}</span>
                    <span className="mt-2 text-sm leading-6 text-gray-600">{page.description}</span>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-gold-dark">
                      <span className="link-sweep pb-0.5">Read this guide</span>
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </Link>
                </Reveal>
              ))}
              {EXISTING_CLUSTER_LINKS.map((guideLink, index) => (
                <Reveal key={guideLink.href} variant="up" delay={((siblingGuides.length + index) % 2) * 80} className="h-full">
                  <Link to={guideLink.href} className={`${CARD} lift-card group flex h-full flex-col p-6`}>
                    <span className="text-lg font-semibold tracking-[-0.01em] text-ink">{guideLink.title}</span>
                    <span className="mt-2 text-sm leading-6 text-gray-600">{guideLink.description}</span>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-gold-dark">
                      <span className="link-sweep pb-0.5">{guideLink.cta}</span>
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
            <p className="mt-8 text-center text-sm text-gray-600">
              {VENEER_GUIDE_CLUSTER_LINKS.map((link) => (
                <span key={link.href} className="mx-2 inline-block">
                  <Link to={link.href} className="font-medium text-gold-dark underline underline-offset-4">
                    {link.label}
                  </Link>
                </span>
              ))}
            </p>
          </div>
        </section>

        <section className="bg-background py-16 md:py-24">
          <div className="section-container">
            <SectionHeading
              eyebrow="Answers"
              title={
                <>
                  Frequently Asked <em>Questions</em>
                </>
              }
              description="Clear answers before you book a veneer consultation"
            />
            <Reveal variant="up" className="mx-auto mt-10 max-w-3xl">
              <ServiceFaqList faqs={guide.faqs} openFirst />
            </Reveal>
          </div>
        </section>

        <RelatedArticles
          tags={guide.relatedArticleTags}
          category="Cosmetic Dentistry"
          title="Learn More About Veneers"
          subtitle="Explore our blog for expert insights on porcelain veneers, costs, and care"
        />

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
                  currentPage={guide.path}
                  className="my-4"
                />
              </div>
            </details>
          </div>
        </section>

        <ConsultationBand
          closing
          tone="light"
          eyebrow="Your consultation"
          title={
            <>
              Ready to talk through <em>your options?</em>
            </>
          }
          description="Schedule a consultation to see whether porcelain veneers, bonding, or another plan fits your teeth and your goals."
          href={VENEER_CONSULTATION_HREF}
          source={`veneers_${guide.id}_final_cta`}
          secondaryLink={{ text: 'Contact Us', href: '/contact/' }}
        />
        <div className="section-container pb-12">
          <LastUpdated date={guide.lastUpdated} className="mt-0 text-center" />
        </div>
      </div>
    </>
  );
};

export default VeneerGuidePage;
