import React from 'react';
import { Link } from 'react-router-dom';
import { PageSEO } from '@/components/seo/PageSEO';
import MasterStructuredData from '@/components/seo/MasterStructuredData';
import MedicalProcedureStructuredData from '@/components/seo/MedicalProcedureStructuredData';
import FAQStructuredData from '@/components/seo/FAQStructuredData';
import WebPageStructuredData from '@/components/WebPageStructuredData';
import Breadcrumbs from '@/components/Breadcrumbs';
import FinancingOptionsSection from '@/components/FinancingOptionsSection';
import RelatedArticles from '@/components/RelatedArticles';
import LastUpdated from '@/components/LastUpdated';
import { Button } from '@/components/ui/button';
import PhoneLink from '@/components/PhoneLink';
import { SCHEDULE_CONSULTATION_PATH, PAYMENT_PLANS_PATH, INSURANCE_PATH } from '@/constants/urls';
import { PHONE_NUMBER_DISPLAY, PHONE_NUMBER_E164 } from '@/constants/contact';
import { trackCTAClick } from '@/utils/googleAdsTracking';

// NOTE: This page intentionally contains no dollar figures. Per the repo's
// VERIFY-BEFORE-PUBLIC convention (see src/constants/veneerCosts.ts and the
// VENEER_COST_VERIFIED gate), unverified prices must not be published. This
// guide covers the factors that set the cost, what a quote includes, insurance,
// and financing, and directs readers to a consultation for exact numbers.

const faqs = [
  {
    question: 'How much does professional teeth whitening cost in Los Angeles?',
    answer:
      'It depends on the option you choose. An in-office whitening session, a custom take-home tray kit, and a hybrid plan that combines both are priced differently because they involve different chair time, materials, and follow-up. We confirm the exact fee for the option that fits your teeth at a consultation, before anything is scheduled.',
  },
  {
    question: 'Which costs more: in-office whitening or take-home trays?',
    answer:
      'In-office whitening generally costs more than a take-home kit because it uses professional chair time, stronger gel applied under supervision, and a sensitivity protocol during the visit. Take-home trays cost less and brighten more gradually. Which is the better value depends on your timeline and how your teeth respond to whitening.',
  },
  {
    question: 'Does insurance cover teeth whitening?',
    answer:
      'Almost never. Whitening is considered a cosmetic treatment, and PPO dental plans do not typically cover cosmetic care. It is still worth knowing what your plan does cover, since a cleaning or exam beforehand may be a covered service. We can help you review your benefits.',
  },
  {
    question: 'Why does professional whitening cost more than drugstore products?',
    answer:
      'The treatments are different. Professional whitening uses stronger gel than over-the-counter products, applied either under supervision in the office or in trays molded to your teeth, with sensitivity managed along the way. Over-the-counter strips and generic trays cost less and can help with mild surface stains, but they are not tailored to your teeth or monitored by a dentist.',
  },
  {
    question: 'Will whitening work on my crowns, veneers, or fillings?',
    answer:
      'No. Whitening gel changes the shade of natural enamel, but crowns, veneers, and tooth-colored fillings keep their original color. If you have visible restorations, we plan the shade carefully, sometimes whitening first and then matching or replacing a restoration afterward. This affects both the plan and the cost, and it is one of the most useful things to sort out at a consultation.',
  },
  {
    question: 'Are touch-ups an extra cost?',
    answer:
      'Results fade gradually with coffee, tea, red wine, and time, so most people eventually refresh their shade. Take-home trays make touch-ups straightforward, and we will tell you what maintenance gel costs and how often you are likely to want it before you start, so there are no surprises later.',
  },
];

const TeethWhiteningCostLosAngeles = () => {
  return (
    <>
      <MasterStructuredData includeBusiness includeWebsite />
      <PageSEO
        title="Teeth Whitening Cost in Los Angeles | Exquisite Dentistry"
        description="What professional teeth whitening costs depend on in Los Angeles: in-office vs take-home options, sensitivity care, maintenance, insurance, and financing."
        keywords="teeth whitening cost los angeles, how much does teeth whitening cost, zoom whitening cost, professional whitening price la, take home whitening trays cost"
        path="/teeth-whitening/cost-los-angeles"
        ogImage="https://exquisitedentistryla.com/lovable-uploads/2e2732fc-c4a6-4f21-9829-3717d9b2b36d.png"
      />

      <WebPageStructuredData
        title="Teeth Whitening Cost in Los Angeles"
        description="The factors that set professional teeth whitening cost in Los Angeles, what a quote includes, insurance basics, and financing options."
        url="https://exquisitedentistryla.com/teeth-whitening/cost-los-angeles"
        breadcrumbs={[
          { name: 'Services', url: 'https://exquisitedentistryla.com/services/' },
          { name: 'Teeth Whitening', url: 'https://exquisitedentistryla.com/teeth-whitening/' },
          { name: 'Cost Guide', url: 'https://exquisitedentistryla.com/teeth-whitening/cost-los-angeles/' },
        ]}
      />

      <MedicalProcedureStructuredData
        procedureName="Teeth Whitening Cost in Los Angeles"
        description="How professional teeth whitening is priced in Los Angeles: in-office and take-home options, the factors that change the total, and how a plan is built."
        url="/teeth-whitening/cost-los-angeles"
        procedureType="Cosmetic Dental Procedure"
        bodyLocation="Teeth"
        steps={[
          { name: 'Consultation', description: 'Review your shade goals, sensitivity history, and any existing restorations.' },
          { name: 'Whitening plan', description: 'Choose in-office whitening, custom take-home trays, or a hybrid plan, with a clear fee.' },
          { name: 'Maintenance', description: 'Touch-up guidance so your shade stays consistent over time.' },
        ]}
      />

      <FAQStructuredData faqs={faqs} about="Teeth Whitening Cost in Los Angeles" />

      <div className="min-h-screen bg-background">
        {/* Hero */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-gold/10 to-white">
          <div className="max-w-5xl mx-auto px-4">
            <p className="uppercase tracking-[0.2em] text-secondary font-semibold text-sm">Whitening Cost Guide</p>
            <h1 className="mt-4 text-4xl md:text-5xl font-bold text-foreground">Teeth Whitening Cost in Los Angeles</h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-3xl">
              Professional whitening is priced by the option you choose &mdash; an in-office session, custom take-home
              trays, or a hybrid plan that combines both &mdash; and by what your teeth need to get there comfortably.
              This guide explains what moves the cost, what is included in each option, and how financing fits in. Your
              exact fee is confirmed at a consultation, once we have looked at your teeth and any existing dental work.
            </p>
            <p className="mt-4 text-base text-muted-foreground max-w-3xl">
              New to whitening? Start with our overview of{' '}
              <Link to="/teeth-whitening/" className="text-secondary underline-offset-4 hover:underline">teeth whitening in Los Angeles</Link>{' '}
              or read about{' '}
              <Link to="/zoom-whitening/" className="text-secondary underline-offset-4 hover:underline">Zoom whitening</Link>, our in-office option.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <Link to={SCHEDULE_CONSULTATION_PATH} onClick={() => trackCTAClick('whitening_cost_guide_book_click', 'Book a Whitening Consultation')}>
                  Book a Whitening Consultation
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/teeth-whitening/" onClick={() => trackCTAClick('whitening_cost_guide_pillar_click', 'View Whitening Overview')}>
                  View Whitening Overview
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 mt-6">
          <Breadcrumbs
            items={[
              { label: 'Services', to: '/services/' },
              { label: 'Teeth Whitening', to: '/teeth-whitening/' },
              { label: 'Cost Guide', to: '/teeth-whitening/cost-los-angeles/' },
            ]}
          />
        </div>

        {/* What goes into the cost */}
        <section className="py-14 bg-background">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl font-semibold text-foreground mb-4">What goes into the cost of whitening</h2>
            <p className="text-muted-foreground max-w-3xl mb-6">
              These are the factors that change the total from one person to the next:
            </p>
            <ul className="grid gap-4 md:grid-cols-2">
              <li className="bg-muted/30 rounded-xl p-5">
                <span className="font-semibold text-foreground">In-office vs take-home.</span>
                <span className="text-muted-foreground"> An in-office session uses chair time, stronger gel, and supervision; take-home trays cost less and work gradually at your pace.</span>
              </li>
              <li className="bg-muted/30 rounded-xl p-5">
                <span className="font-semibold text-foreground">Custom trays.</span>
                <span className="text-muted-foreground"> Take-home kits include trays molded to your teeth so the gel sits evenly and stays off your gums &mdash; part of what you are paying for versus a boxed product.</span>
              </li>
              <li className="bg-muted/30 rounded-xl p-5">
                <span className="font-semibold text-foreground">How your teeth respond.</span>
                <span className="text-muted-foreground"> Deeper or long-standing stains can take more sessions or a combined plan to reach the shade you want.</span>
              </li>
              <li className="bg-muted/30 rounded-xl p-5">
                <span className="font-semibold text-foreground">Sensitivity management.</span>
                <span className="text-muted-foreground"> Desensitizing steps before, during, and after whitening keep treatment comfortable and are built into a professional plan.</span>
              </li>
              <li className="bg-muted/30 rounded-xl p-5">
                <span className="font-semibold text-foreground">Existing dental work.</span>
                <span className="text-muted-foreground"> Crowns, veneers, and fillings do not whiten. If they show when you smile, shade planning &mdash; and sometimes updating a restoration &mdash; becomes part of the plan.</span>
              </li>
              <li className="bg-muted/30 rounded-xl p-5">
                <span className="font-semibold text-foreground">Maintenance.</span>
                <span className="text-muted-foreground"> Touch-up gel and occasional refresher sessions keep the result consistent; we tell you what to expect before you start.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Options compared */}
        <section className="py-14 bg-muted/20">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl font-semibold text-foreground mb-4">In-office, take-home, or both</h2>
            <p className="text-muted-foreground max-w-3xl mb-6">
              Each option is priced separately, and they suit different situations:
            </p>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="bg-white border border-border rounded-2xl p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-foreground mb-3">In-office whitening</h3>
                <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                  <li>Done in a single visit.</li>
                  <li>Professional-strength gel with a sensitivity protocol throughout.</li>
                  <li>A practical choice when you have a date on the calendar.</li>
                </ul>
              </div>
              <div className="bg-white border border-border rounded-2xl p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-foreground mb-3">Custom take-home trays</h3>
                <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                  <li>Lower cost than an in-office session.</li>
                  <li>Brightens gradually; you control the pace.</li>
                  <li>Trays are reusable for future touch-ups.</li>
                </ul>
              </div>
              <div className="bg-white border border-border rounded-2xl p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-foreground mb-3">Hybrid plan</h3>
                <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                  <li>An in-office session plus take-home touch-ups.</li>
                  <li>Priced as a combined plan.</li>
                  <li>Helps the shade stay consistent over time.</li>
                </ul>
              </div>
            </div>
            <p className="text-muted-foreground max-w-3xl mt-6">
              We will tell you plainly which option fits your teeth and your timeline &mdash; and if a drugstore product
              would genuinely serve you for now, we will say that too.
            </p>
          </div>
        </section>

        {/* Candidacy */}
        <section className="py-14 bg-background">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl font-semibold text-foreground mb-4">Before you spend anything: is whitening the right tool?</h2>
            <p className="text-muted-foreground max-w-3xl">
              Whitening works well on natural enamel with surface and age-related staining. It is less effective on some
              deep internal discoloration, and it does not change the color of crowns, veneers, or fillings. If a single
              dark tooth or an old restoration is what bothers you, a different treatment may address it more directly
              than whitening would &mdash; sometimes{' '}
              <Link to="/cosmetic-dentistry/" className="text-secondary underline-offset-4 hover:underline">another cosmetic option</Link>{' '}
              is the better fit. A short consultation sorts this out before you commit to anything, which is the most
              reliable way to avoid paying for a treatment that will not get you the result you want.
            </p>
          </div>
        </section>

        {/* Insurance */}
        <section className="py-14 bg-muted/20">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl font-semibold text-foreground mb-4">Does insurance cover whitening?</h2>
            <p className="text-muted-foreground max-w-3xl">
              Almost never &mdash; whitening is a cosmetic treatment, and PPO dental plans do not typically cover
              cosmetic care. That said, your plan may cover the cleaning or exam that makes sense before whitening, and
              knowing your benefits helps you budget for the whole picture. We can help you review what your plan
              includes &mdash; see our{' '}
              <Link to={INSURANCE_PATH} className="text-secondary underline-offset-4 hover:underline">insurance page</Link>{' '}
              or <Link to="/contact/" className="text-secondary underline-offset-4 hover:underline">contact us</Link> with your plan details.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-14 bg-background">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl font-semibold text-foreground mb-6">Frequently asked questions</h2>
            <div className="grid gap-6">
              {faqs.map((faq) => (
                <div key={faq.question}>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground max-w-3xl">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related pages */}
        <section className="py-12 bg-muted/20">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl font-semibold text-foreground mb-3">Related pages</h2>
            <div className="flex flex-col gap-2 text-secondary">
              <Link to="/teeth-whitening/">Teeth Whitening in Los Angeles</Link>
              <Link to="/zoom-whitening/">Zoom Whitening in Los Angeles</Link>
              <Link to="/teeth-whitening-beverly-hills/">Teeth Whitening Near Beverly Hills</Link>
              <Link to={PAYMENT_PLANS_PATH}>Payment Plans &amp; Cherry Financing</Link>
            </div>
          </div>
        </section>

        <FinancingOptionsSection
          title="Prefer to spread the cost of whitening over time?"
          description="If whitening is part of a larger smile plan, our Cherry financing page lets you explore monthly payment options before your consultation."
        />

        {/* Closing CTA */}
        <section className="py-16 bg-foreground/[0.03]">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-semibold text-foreground">Get a whitening plan and a clear fee</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Come in for a consultation and we will look at your teeth, factor in any existing dental work, recommend
              the option that fits your shade goal, and give you the exact fee &mdash; with no pressure to decide on the
              spot.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              <Button asChild>
                <Link to={SCHEDULE_CONSULTATION_PATH} onClick={() => trackCTAClick('whitening_cost_guide_cta_book', 'Book a consultation')}>
                  Book a consultation
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <PhoneLink phoneNumber={PHONE_NUMBER_E164} analyticsSource="whitening_cost_guide_cta_call">
                  Call {PHONE_NUMBER_DISPLAY}
                </PhoneLink>
              </Button>
            </div>
          </div>
        </section>

        <RelatedArticles
          tags={['teeth whitening', 'whitening', 'zoom whitening', 'stains']}
          title="Teeth Whitening Resources"
          subtitle="More reading on whitening options, sensitivity, and keeping your shade"
        />

        <div className="max-w-5xl mx-auto px-4 pb-12">
          <LastUpdated date="July 2026" className="text-center" />
        </div>
      </div>
    </>
  );
};

export default TeethWhiteningCostLosAngeles;
