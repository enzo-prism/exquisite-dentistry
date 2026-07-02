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
    question: 'How much does Invisalign cost in Los Angeles?',
    answer:
      'It depends on your case. A short plan that tidies mild crowding involves fewer aligners and visits than a longer plan that corrects the bite, so the two are priced differently. After a scan and exam, we give you a written quote for your specific plan. The most reliable number is the one built for your teeth at a consultation.',
  },
  {
    question: 'What makes one Invisalign case cost more than another?',
    answer:
      'Mostly complexity and length. More movement means more aligner stages, more monitoring, and a longer treatment window. Cases that need attachments, tooth reshaping between teeth, or refinement rounds at the end also involve more work than simple alignment.',
  },
  {
    question: 'Are retainers included in the price?',
    answer:
      'That varies by office, which is one reason quotes are hard to compare. Retainers keep your result stable after treatment, so they are a real part of the plan rather than an extra. Ask any office you visit whether retainers and refinements are included, and we will spell out both in your written estimate.',
  },
  {
    question: 'Does dental insurance cover Invisalign?',
    answer:
      'Some PPO plans include an orthodontic benefit that can apply to Invisalign, usually up to a lifetime orthodontic maximum that is separate from your annual dental maximum. Some plans limit the benefit to dependents or exclude adult orthodontics. We can help verify what your plan includes before you decide anything.',
  },
  {
    question: 'Is Invisalign priced differently than mail-order aligners?',
    answer:
      'Generally yes, because the treatment is different. Invisalign at a dental office includes an exam, a 3D scan, a dentist reviewing and adjusting the plan, in-person checks, and refinements if teeth move off track. Mail-order products remove most of that oversight, which is why they can cost less. Whether that trade-off is sensible depends on your case, and we are happy to give you an honest read on it.',
  },
  {
    question: 'Can I pay for Invisalign monthly?',
    answer:
      'Yes. We work with Cherry, which lets you review monthly payment options and check whether you pre-qualify without affecting your credit score. You can explore it on our payment plans page before or after your consultation, and financing is always optional.',
  },
];

const InvisalignCostLosAngeles = () => {
  return (
    <>
      <MasterStructuredData includeBusiness includeWebsite />
      <PageSEO
        title="Invisalign Cost in Los Angeles | Exquisite Dentistry"
        description="What drives Invisalign cost in Los Angeles: case complexity, treatment length, refinements, retainers, insurance benefits, and monthly financing options."
        keywords="invisalign cost los angeles, how much does invisalign cost, invisalign price los angeles, clear aligner cost la, invisalign insurance coverage, invisalign payment plans"
        path="/invisalign/cost-los-angeles"
        ogImage="https://exquisitedentistryla.com/lovable-uploads/dr-aguil-banner-2024-m.webp"
      />

      <WebPageStructuredData
        title="Invisalign Cost in Los Angeles"
        description="The factors that set Invisalign cost in Los Angeles, what a quote should include, insurance basics, and financing options."
        url="https://exquisitedentistryla.com/invisalign/cost-los-angeles"
        breadcrumbs={[
          { name: 'Services', url: 'https://exquisitedentistryla.com/services/' },
          { name: 'Invisalign', url: 'https://exquisitedentistryla.com/invisalign/' },
          { name: 'Cost Guide', url: 'https://exquisitedentistryla.com/invisalign/cost-los-angeles/' },
        ]}
      />

      <MedicalProcedureStructuredData
        procedureName="Invisalign Cost in Los Angeles"
        description="How Invisalign treatment is priced in Los Angeles: the factors that change the total, what a quote includes, and how a plan is built."
        url="/invisalign/cost-los-angeles"
        procedureType="Orthodontic Procedure"
        bodyLocation="Teeth"
        steps={[
          { name: 'Consultation and scan', description: 'Exam and iTero 3D scan to map your bite and alignment goals.' },
          { name: 'Planning', description: 'A digital treatment plan and a written estimate for your specific case.' },
          { name: 'Aligner treatment', description: 'Sequential aligners with periodic checks, then retainers to hold the result.' },
        ]}
      />

      <FAQStructuredData faqs={faqs} about="Invisalign Cost in Los Angeles" />

      <div className="min-h-screen bg-background">
        {/* Hero */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-gold/10 to-white">
          <div className="max-w-5xl mx-auto px-4">
            <p className="uppercase tracking-[0.2em] text-secondary font-semibold text-sm">Invisalign Cost Guide</p>
            <h1 className="mt-4 text-4xl md:text-5xl font-bold text-foreground">Invisalign Cost in Los Angeles</h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-3xl">
              Invisalign is priced from your treatment plan, not from a menu. A short plan for mild crowding and a
              longer plan that also corrects the bite involve different numbers of aligners, visits, and refinements
              &mdash; so they cost different amounts. This guide explains what moves the price, what a quote should
              include, and how insurance and financing fit in. Your exact cost is confirmed at a consultation, after a
              scan of your teeth.
            </p>
            <p className="mt-4 text-base text-muted-foreground max-w-3xl">
              New to clear aligners? Start with our overview of{' '}
              <Link to="/invisalign/" className="text-secondary underline-offset-4 hover:underline">Invisalign in Los Angeles</Link>.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <Link to={SCHEDULE_CONSULTATION_PATH} onClick={() => trackCTAClick('invisalign_cost_guide_book_click', 'Book an Invisalign Consultation')}>
                  Book an Invisalign Consultation
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/invisalign/" onClick={() => trackCTAClick('invisalign_cost_guide_pillar_click', 'View Invisalign Overview')}>
                  View Invisalign Overview
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 mt-6">
          <Breadcrumbs
            items={[
              { label: 'Services', to: '/services/' },
              { label: 'Invisalign', to: '/invisalign/' },
              { label: 'Cost Guide', to: '/invisalign/cost-los-angeles/' },
            ]}
          />
        </div>

        {/* What goes into the cost */}
        <section className="py-14 bg-background">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl font-semibold text-foreground mb-4">What goes into the cost of Invisalign</h2>
            <p className="text-muted-foreground max-w-3xl mb-6">
              These are the factors that move the total from one case to the next:
            </p>
            <ul className="grid gap-4 md:grid-cols-2">
              <li className="bg-muted/30 rounded-xl p-5">
                <span className="font-semibold text-foreground">Case complexity.</span>
                <span className="text-muted-foreground"> Mild crowding or spacing needs less movement than rotated teeth or bite correction, and the plan is scoped accordingly.</span>
              </li>
              <li className="bg-muted/30 rounded-xl p-5">
                <span className="font-semibold text-foreground">Treatment length.</span>
                <span className="text-muted-foreground"> More movement means more aligner stages and a longer treatment window, with more monitoring along the way.</span>
              </li>
              <li className="bg-muted/30 rounded-xl p-5">
                <span className="font-semibold text-foreground">Refinements.</span>
                <span className="text-muted-foreground"> Teeth do not always track perfectly. Refinement aligners at the end of treatment fine-tune the result, and quotes handle them differently.</span>
              </li>
              <li className="bg-muted/30 rounded-xl p-5">
                <span className="font-semibold text-foreground">Attachments and reshaping.</span>
                <span className="text-muted-foreground"> Small tooth-colored attachments and minor reshaping between teeth help aligners grip and create space; not every case needs them.</span>
              </li>
              <li className="bg-muted/30 rounded-xl p-5">
                <span className="font-semibold text-foreground">Retainers.</span>
                <span className="text-muted-foreground"> Holding the result after treatment matters as much as the movement itself. Ask whether retainers are included in any quote you compare.</span>
              </li>
              <li className="bg-muted/30 rounded-xl p-5">
                <span className="font-semibold text-foreground">Scans and monitoring.</span>
                <span className="text-muted-foreground"> Digital scans, the treatment plan itself, and in-person check-ins are part of supervised treatment and are reflected in the fee.</span>
              </li>
            </ul>
            <p className="text-muted-foreground max-w-3xl mt-6">
              At a consultation we scan your teeth, show you what the plan involves, and give you one clear number for
              your case &mdash; not a range that may or may not apply to you.
            </p>
          </div>
        </section>

        {/* What a quote includes */}
        <section className="py-14 bg-muted/20">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl font-semibold text-foreground mb-4">What an Invisalign quote should include</h2>
            <p className="text-muted-foreground max-w-3xl mb-4">
              Two quotes with different totals may simply cover different things. Before comparing, check whether each
              one includes:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground max-w-3xl space-y-2">
              <li>The exam, records, and 3D scan used to build the plan.</li>
              <li>All aligner stages for the planned movement.</li>
              <li>In-person checks and adjustments during treatment.</li>
              <li>Refinement aligners if teeth need fine-tuning at the end.</li>
              <li>Retainers once treatment finishes.</li>
            </ul>
            <p className="text-muted-foreground max-w-3xl mt-4">
              Our written estimates spell out each of these, so the number you see is the number you plan around.
            </p>
          </div>
        </section>

        {/* Candidacy */}
        <section className="py-14 bg-background">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl font-semibold text-foreground mb-4">Is Invisalign a fit for your case?</h2>
            <p className="text-muted-foreground max-w-3xl">
              Invisalign handles a wide range of alignment and bite concerns for adults, and it works best for people
              who will wear the aligners consistently through the day. Some complex bite problems are better served by
              other orthodontic approaches, and occasionally a small cosmetic concern is addressed more simply with{' '}
              <Link to="/cosmetic-dentistry/" className="text-secondary underline-offset-4 hover:underline">cosmetic dentistry</Link>{' '}
              instead of moving teeth at all. That assessment &mdash; whether aligners are the right tool, and how long
              your plan would run &mdash; is exactly what the consultation is for, and it is also when your cost is set.
              If you are comparing offices near Beverly Hills, our{' '}
              <Link to="/invisalign-beverly-hills/" className="text-secondary underline-offset-4 hover:underline">Invisalign Beverly Hills page</Link>{' '}
              covers what to expect at our Wilshire Blvd office.
            </p>
          </div>
        </section>

        {/* Insurance */}
        <section className="py-14 bg-muted/20">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl font-semibold text-foreground mb-4">Does insurance cover Invisalign?</h2>
            <p className="text-muted-foreground max-w-3xl">
              Sometimes, in part. PPO plans that include an orthodontic benefit can often apply it to Invisalign, and
              that benefit usually has its own lifetime maximum, separate from your annual dental maximum. Some plans
              restrict orthodontic coverage to dependents under a certain age or exclude adult orthodontics entirely, so
              the details of your specific plan matter. We can verify your benefits before your visit so the estimate
              you receive already reflects what your plan contributes. See our{' '}
              <Link to={INSURANCE_PATH} className="text-secondary underline-offset-4 hover:underline">insurance page</Link>{' '}
              or <Link to="/contact/" className="text-secondary underline-offset-4 hover:underline">contact us</Link> to
              get that started.
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
              <Link to="/invisalign/">Invisalign in Los Angeles</Link>
              <Link to="/invisalign-beverly-hills/">Invisalign Near Beverly Hills</Link>
              <Link to="/cosmetic-dentistry/">Cosmetic Dentistry in Los Angeles</Link>
              <Link to={PAYMENT_PLANS_PATH}>Payment Plans &amp; Cherry Financing</Link>
            </div>
          </div>
        </section>

        <FinancingOptionsSection
          title="Prefer to spread the cost of Invisalign over time?"
          description="If you are budgeting for aligner treatment, our Cherry financing page lets you explore monthly payment options before your consultation."
        />

        {/* Closing CTA */}
        <section className="py-16 bg-foreground/[0.03]">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-semibold text-foreground">Get an Invisalign quote built around your teeth</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              A scan takes minutes, and it turns a vague range into a real plan with a real number. Come in for a
              consultation and we will show you what your treatment would involve, how long it would run, and exactly
              what it would cost &mdash; with no pressure to decide on the spot.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              <Button asChild>
                <Link to={SCHEDULE_CONSULTATION_PATH} onClick={() => trackCTAClick('invisalign_cost_guide_cta_book', 'Book a consultation')}>
                  Book a consultation
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <PhoneLink phoneNumber={PHONE_NUMBER_E164} analyticsSource="invisalign_cost_guide_cta_call">
                  Call {PHONE_NUMBER_DISPLAY}
                </PhoneLink>
              </Button>
            </div>
          </div>
        </section>

        <RelatedArticles
          tags={['invisalign', 'clear aligners', 'orthodontics', 'straighten']}
          title="Invisalign Resources"
          subtitle="More reading on aligner treatment, planning, and what to expect"
        />

        <div className="max-w-5xl mx-auto px-4 pb-12">
          <LastUpdated date="July 2026" className="text-center" />
        </div>
      </div>
    </>
  );
};

export default InvisalignCostLosAngeles;
