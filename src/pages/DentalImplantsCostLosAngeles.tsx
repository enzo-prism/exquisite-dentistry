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
    question: 'How much do dental implants cost in Los Angeles?',
    answer:
      'It varies enough from case to case that a single number would be misleading. The total depends on how many teeth are being replaced, whether foundation work like bone grafting is needed, and the type of restoration on top of the implant. After an exam and imaging, we give you a written quote for your specific plan, so the most reliable number is the one built for you at a consultation.',
  },
  {
    question: 'Why do implant quotes from different offices look so different?',
    answer:
      'They often cover different things. Some quotes list only the implant post, while others include the abutment, the crown, imaging, and follow-up visits. Before comparing totals, check what each quote actually includes line by line. We itemize our estimates so you can see exactly what is covered.',
  },
  {
    question: 'Does dental insurance cover implants?',
    answer:
      'It depends on your plan. Some PPO plans exclude implants, while others contribute toward parts of treatment, such as the crown, an extraction, or imaging. Annual maximums also limit what a plan pays in a given year. We can help verify your benefits and submit documentation before you commit to anything.',
  },
  {
    question: 'Is a dental bridge cheaper than an implant?',
    answer:
      'A bridge often costs less up front, but the two options have different long-term trade-offs. A bridge relies on the neighboring teeth for support, while an implant stands on its own and helps preserve the bone underneath. Which one makes more sense depends on your bite, the health of the adjacent teeth, and how you weigh upfront cost against long-term maintenance. We can walk you through both at a consultation.',
  },
  {
    question: 'What makes the cost higher for some patients?',
    answer:
      'The most common reasons are foundation work and scope. If the site needs bone grafting, a sinus lift, or an extraction first, those steps are priced in addition to the implant itself. Replacing several teeth, choosing an implant-supported bridge or full-arch plan, and adding sedation for comfort also increase the total.',
  },
  {
    question: 'Can I pay for dental implants over time?',
    answer:
      'Yes. We work with Cherry, which lets you review monthly payment options and check whether you pre-qualify without affecting your credit score. You can explore it on our payment plans page before or after your consultation, and financing is always optional.',
  },
];

const DentalImplantsCostLosAngeles = () => {
  return (
    <>
      <MasterStructuredData includeBusiness includeWebsite />
      <PageSEO
        title="Dental Implants Cost in Los Angeles | Exquisite Dentistry"
        description="What drives dental implant cost in Los Angeles: number of teeth, foundation work, materials, insurance, and financing. Your exact quote is set at a consultation."
        keywords="dental implants cost los angeles, dental implant cost, how much do dental implants cost, implant cost per tooth los angeles, implant financing, dental implant insurance"
        path="/dental-implants/cost-los-angeles"
        ogImage="https://exquisitedentistryla.com/lovable-uploads/dr-aguil-banner-2024-m.webp"
      />

      <WebPageStructuredData
        title="Dental Implants Cost in Los Angeles"
        description="The factors that set dental implant cost in Los Angeles, what a written quote should include, insurance basics, and financing options."
        url="https://exquisitedentistryla.com/dental-implants/cost-los-angeles"
        breadcrumbs={[
          { name: 'Services', url: 'https://exquisitedentistryla.com/services/' },
          { name: 'Dental Implants', url: 'https://exquisitedentistryla.com/dental-implants/' },
          { name: 'Cost Guide', url: 'https://exquisitedentistryla.com/dental-implants/cost-los-angeles/' },
        ]}
      />

      <MedicalProcedureStructuredData
        procedureName="Dental Implants Cost in Los Angeles"
        description="How dental implant treatment is priced in Los Angeles: the factors that change the total, what a quote includes, and how a plan is built."
        url="/dental-implants/cost-los-angeles"
        procedureType="Restorative Dental Procedure"
        bodyLocation="Oral cavity"
        steps={[
          { name: 'Consultation and imaging', description: 'Exam and 3D imaging to assess the site, bone, and restorative goals.' },
          { name: 'Planning', description: 'A written treatment plan and itemized estimate for your specific case.' },
          { name: 'Placement and restoration', description: 'Guided implant placement, healing, then the final crown or bridge.' },
        ]}
      />

      <FAQStructuredData faqs={faqs} about="Dental Implants Cost in Los Angeles" />

      <div className="min-h-screen bg-background">
        {/* Hero */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-gold/10 to-white">
          <div className="max-w-5xl mx-auto px-4">
            <p className="uppercase tracking-[0.2em] text-secondary font-semibold text-sm">Implant Cost Guide</p>
            <h1 className="mt-4 text-4xl md:text-5xl font-bold text-foreground">Dental Implants Cost in Los Angeles</h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-3xl">
              Implant treatment is priced from your specific plan: how many teeth are being replaced, whether the site
              needs foundation work first, and the type of restoration on top. Because those pieces vary so much from
              person to person, a single quoted number rarely fits everyone. This guide explains what moves the cost,
              what a quote should include, and how insurance and financing fit in &mdash; your exact cost is confirmed
              at a consultation.
            </p>
            <p className="mt-4 text-base text-muted-foreground max-w-3xl">
              New to implants? Start with our overview of{' '}
              <Link to="/dental-implants/" className="text-secondary underline-offset-4 hover:underline">dental implants in Los Angeles</Link>.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <Link to={SCHEDULE_CONSULTATION_PATH} onClick={() => trackCTAClick('implants_cost_guide_book_click', 'Book an Implant Consultation')}>
                  Book an Implant Consultation
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/dental-implants/" onClick={() => trackCTAClick('implants_cost_guide_pillar_click', 'View Implant Overview')}>
                  View Implant Overview
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 mt-6">
          <Breadcrumbs
            items={[
              { label: 'Services', to: '/services/' },
              { label: 'Dental Implants', to: '/dental-implants/' },
              { label: 'Cost Guide', to: '/dental-implants/cost-los-angeles/' },
            ]}
          />
        </div>

        {/* What goes into the cost */}
        <section className="py-14 bg-background">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl font-semibold text-foreground mb-4">What goes into the cost of a dental implant</h2>
            <p className="text-muted-foreground max-w-3xl mb-6">
              An implant is not one fee &mdash; it is a plan made of parts. These are the ones that move the total:
            </p>
            <ul className="grid gap-4 md:grid-cols-2">
              <li className="bg-muted/30 rounded-xl p-5">
                <span className="font-semibold text-foreground">Number of teeth.</span>
                <span className="text-muted-foreground"> A single implant crown, an implant-supported bridge, and a full-arch plan are scoped and priced very differently.</span>
              </li>
              <li className="bg-muted/30 rounded-xl p-5">
                <span className="font-semibold text-foreground">Foundation work.</span>
                <span className="text-muted-foreground"> Extractions, bone grafting, or a sinus lift are sometimes needed before placement, and each is priced as its own step.</span>
              </li>
              <li className="bg-muted/30 rounded-xl p-5">
                <span className="font-semibold text-foreground">The implant and restoration materials.</span>
                <span className="text-muted-foreground"> The implant post, the abutment that connects it, and the crown or bridge on top are separate components with their own costs.</span>
              </li>
              <li className="bg-muted/30 rounded-xl p-5">
                <span className="font-semibold text-foreground">Imaging and planning.</span>
                <span className="text-muted-foreground"> 3D cone beam imaging and surgical guides let the implant be placed precisely; some offices include them, others bill them separately.</span>
              </li>
              <li className="bg-muted/30 rounded-xl p-5">
                <span className="font-semibold text-foreground">Comfort options.</span>
                <span className="text-muted-foreground"> Sedation planning and appointment pacing add to the total when they are part of your plan.</span>
              </li>
              <li className="bg-muted/30 rounded-xl p-5">
                <span className="font-semibold text-foreground">Follow-up care.</span>
                <span className="text-muted-foreground"> Post-operative checks and the visits around delivering the final restoration are part of treatment, and quotes handle them differently.</span>
              </li>
            </ul>
            <p className="text-muted-foreground max-w-3xl mt-6">
              None of these are add-ons we push. They are the parts of implant treatment, and at a consultation we walk
              through which ones apply to your case before anything begins.
            </p>
          </div>
        </section>

        {/* What a quote should include */}
        <section className="py-14 bg-muted/20">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl font-semibold text-foreground mb-4">What a written implant quote should include</h2>
            <p className="text-muted-foreground max-w-3xl mb-4">
              Implant quotes are hard to compare because they do not all cover the same things. A quote that looks lower
              may simply list fewer components. Before you compare totals, check that each quote spells out:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground max-w-3xl space-y-2">
              <li>The implant post itself, placed in the jaw.</li>
              <li>The abutment &mdash; the connector between the implant and the crown.</li>
              <li>The final crown, bridge, or arch restoration.</li>
              <li>Imaging, surgical guides, and planning.</li>
              <li>Any extractions, grafting, or sinus work, if your case needs them.</li>
              <li>Post-operative visits and adjustments.</li>
            </ul>
            <p className="text-muted-foreground max-w-3xl mt-4">
              We itemize our estimates so you can see each part of the plan. If you bring a quote from another office,
              we are glad to help you read it line by line.
            </p>
          </div>
        </section>

        {/* How treatment unfolds */}
        <section className="py-14 bg-background">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl font-semibold text-foreground mb-4">How implant treatment unfolds</h2>
            <p className="text-muted-foreground max-w-3xl">
              Most implant plans follow the same phases: an exam with 3D imaging, any foundation work the site needs,
              guided placement of the implant, a healing period while the implant integrates with the bone, and then the
              final crown or bridge. Healing timelines vary by case and bone health, which is one reason plans &mdash;
              and costs &mdash; differ between patients. Because the phases are distinct, the cost is also spread across
              them rather than due all at once, and we outline that schedule in your estimate. For a fuller picture of
              the steps, see the{' '}
              <Link to="/dental-implants/" className="text-secondary underline-offset-4 hover:underline">dental implants overview</Link>{' '}
              or our{' '}
              <Link to="/blog/dental-implant-cost-los-angeles/" className="text-secondary underline-offset-4 hover:underline">implant cost article</Link>.
            </p>
          </div>
        </section>

        {/* Candidacy */}
        <section className="py-14 bg-muted/20">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl font-semibold text-foreground mb-4">Who is a candidate &mdash; and how that affects cost</h2>
            <p className="text-muted-foreground max-w-3xl">
              Most adults missing one or more teeth can be evaluated for implants. The main questions are the amount and
              quality of bone at the site, gum health, and overall health factors that affect healing. If bone has
              receded where a tooth has been missing for a while, grafting can rebuild the site &mdash; it adds a step
              and cost, but it is what makes a stable implant possible. If an implant is not a good fit, a{' '}
              <Link to="/dental-bridge/" className="text-secondary underline-offset-4 hover:underline">dental bridge</Link>{' '}
              may be an alternative worth discussing. The consultation exists to answer exactly these questions before
              you spend anything on treatment.
            </p>
          </div>
        </section>

        {/* Insurance */}
        <section className="py-14 bg-background">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl font-semibold text-foreground mb-4">Does insurance cover dental implants?</h2>
            <p className="text-muted-foreground max-w-3xl">
              Coverage varies more for implants than for most procedures. Some PPO plans exclude implants entirely;
              others contribute toward parts of the treatment, such as the extraction, imaging, or the crown. Annual
              maximums also cap what a plan pays in a given year, which matters for multi-phase treatment &mdash;
              sometimes phases can be scheduled with that in mind. We can help verify your benefits and submit
              documentation to support any applicable coverage. See our{' '}
              <Link to={INSURANCE_PATH} className="text-secondary underline-offset-4 hover:underline">insurance page</Link>{' '}
              or <Link to="/contact/" className="text-secondary underline-offset-4 hover:underline">contact us</Link> to
              review your specifics before your visit.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-14 bg-muted/20">
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
        <section className="py-12 bg-background">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl font-semibold text-foreground mb-3">Related pages</h2>
            <div className="flex flex-col gap-2 text-secondary">
              <Link to="/dental-implants/">Dental Implants in Los Angeles</Link>
              <Link to="/dental-bridge/">Dental Bridges in Los Angeles</Link>
              <Link to="/santa-monica-dental-implants/">Dental Implants Near Santa Monica</Link>
              <Link to={PAYMENT_PLANS_PATH}>Payment Plans &amp; Cherry Financing</Link>
            </div>
          </div>
        </section>

        <FinancingOptionsSection
          title="Prefer to spread the cost of implants over time?"
          description="If you are budgeting for an implant, an implant bridge, or a full-arch plan, our Cherry financing page lets you explore monthly payment options before your consultation."
        />

        {/* Closing CTA */}
        <section className="py-16 bg-foreground/[0.03]">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-semibold text-foreground">Get an implant quote built around your case</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              The most useful number is the one made for you. Come in for a consultation and we will examine the site,
              take the imaging, walk through your options and trade-offs, and give you a clear, itemized estimate &mdash;
              with no pressure to decide on the spot.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              <Button asChild>
                <Link to={SCHEDULE_CONSULTATION_PATH} onClick={() => trackCTAClick('implants_cost_guide_cta_book', 'Book a consultation')}>
                  Book a consultation
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <PhoneLink phoneNumber={PHONE_NUMBER_E164} analyticsSource="implants_cost_guide_cta_call">
                  Call {PHONE_NUMBER_DISPLAY}
                </PhoneLink>
              </Button>
            </div>
          </div>
        </section>

        <RelatedArticles
          tags={['dental implants', 'implants', 'missing teeth', 'restorative']}
          category="Restorative Dentistry"
          title="Dental Implant Resources"
          subtitle="More reading on implant procedures, planning, and what to expect"
        />

        <div className="max-w-5xl mx-auto px-4 pb-12">
          <LastUpdated date="July 2026" className="text-center" />
        </div>
      </div>
    </>
  );
};

export default DentalImplantsCostLosAngeles;
