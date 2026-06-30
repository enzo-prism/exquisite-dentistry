import React from 'react';
import { Link } from 'react-router-dom';
import { PageSEO } from '@/components/seo/PageSEO';
import MasterStructuredData from '@/components/seo/MasterStructuredData';
import MedicalProcedureStructuredData from '@/components/seo/MedicalProcedureStructuredData';
import FAQStructuredData from '@/components/seo/FAQStructuredData';
import FinancingOptionsSection from '@/components/FinancingOptionsSection';
import { Button } from '@/components/ui/button';
import PhoneLink from '@/components/PhoneLink';
import { SCHEDULE_CONSULTATION_PATH } from '@/constants/urls';
import { PHONE_NUMBER_DISPLAY, PHONE_NUMBER_E164 } from '@/constants/contact';
import { VENEER_COSTS } from '@/constants/veneerCosts';
import { VENEERS_COST_FAQS } from '@/data/veneers-cost-faqs';
import { trackCTAClick } from '@/utils/googleAdsTracking';

// NOTE: Every dollar figure on this page is sourced from src/constants/veneerCosts.ts,
// which is tagged VERIFY-BEFORE-PUBLIC. These are general Los Angeles market ranges
// (not the practice's price list) and must be confirmed by the practice before this
// page is merged to production. The FAQ set lives in src/data/veneers-cost-faqs.ts so
// it is shared with the static prerender (scripts/prerender-static.ts).

const faqs = VENEERS_COST_FAQS;

const VeneersCostGuideLosAngeles = () => {
  return (
    <>
      <MasterStructuredData includeBusiness includeWebsite />
      <PageSEO
        title="Veneers Cost in Los Angeles | Exquisite Dentistry"
        description="What veneers cost in Los Angeles: porcelain vs composite ranges, what changes the price, financing, and insurance. Your exact cost is set at a consultation."
        keywords="veneers cost los angeles, how much do veneers cost, porcelain veneers cost los angeles, composite veneers cost, veneers price los angeles, cost of veneers la"
        path="/veneers/cost-los-angeles"
      />

      <MedicalProcedureStructuredData
        procedureName="Veneers Cost in Los Angeles"
        description="What porcelain and composite veneers cost in Los Angeles, the factors that change the price, and how treatment is planned."
        url="/veneers/cost-los-angeles"
        procedureType="Cosmetic Dental Procedure"
        bodyLocation="Teeth"
        steps={[
          { name: 'Consultation', description: 'Review your smile goals, examine your teeth, and discuss options.' },
          { name: 'Planning', description: 'Scope the plan per tooth and give a clear, written estimate.' },
          { name: 'Placement', description: 'Custom veneer placement with bite and esthetic refinement.' },
        ]}
      />

      <FAQStructuredData faqs={faqs} about="Veneers Cost in Los Angeles" />

      <div className="min-h-screen bg-background">
        {/* Hero */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-gold/10 to-white">
          <div className="max-w-5xl mx-auto px-4">
            <p className="uppercase tracking-[0.2em] text-secondary font-semibold text-sm">Veneers Cost Guide</p>
            <h1 className="mt-4 text-4xl md:text-5xl font-bold text-foreground">Veneers Cost in Los Angeles</h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-3xl">
              In Los Angeles, porcelain veneers commonly range from about {VENEER_COSTS.porcelainPerTooth} per tooth,
              with the higher end more typical in the Beverly Hills and West Hollywood area. Composite veneers usually
              run less, in the range of about {VENEER_COSTS.compositePerTooth} per tooth. These are general market
              estimates, not our price list &mdash; your exact cost depends on your teeth and your plan, and is confirmed
              at a consultation.
            </p>
            <p className="mt-4 text-base text-muted-foreground max-w-3xl">
              New to veneers? Start with our overview of{' '}
              <Link to="/veneers/" className="text-secondary underline-offset-4 hover:underline">porcelain veneers</Link>.
              If you are only considering your two front teeth, see{' '}
              <Link to="/veneers/2-front-teeth-veneers-cost-los-angeles/" className="text-secondary underline-offset-4 hover:underline">
                the cost of veneers for 2 front teeth
              </Link>.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <Link to={SCHEDULE_CONSULTATION_PATH} onClick={() => trackCTAClick('veneers_cost_guide_book_click', 'Book a Veneers Consultation')}>
                  Book a Veneers Consultation
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/veneers/" onClick={() => trackCTAClick('veneers_cost_guide_pillar_click', 'View Veneers Overview')}>
                  View Veneers Overview
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* What goes into the cost */}
        <section className="py-14 bg-background">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl font-semibold text-foreground mb-4">What goes into the cost of veneers</h2>
            <p className="text-muted-foreground max-w-3xl mb-6">
              A few things move the price, which is why a single number rarely fits everyone:
            </p>
            <ul className="grid gap-4 md:grid-cols-2">
              <li className="bg-muted/30 rounded-xl p-5">
                <span className="font-semibold text-foreground">Material.</span>
                <span className="text-muted-foreground"> Porcelain costs more than composite. It is made in a dental lab, holds its color, and tends to last longer.</span>
              </li>
              <li className="bg-muted/30 rounded-xl p-5">
                <span className="font-semibold text-foreground">Number of teeth.</span>
                <span className="text-muted-foreground"> Cost scales with how many teeth are treated. One tooth is priced differently than a full smile zone.</span>
              </li>
              <li className="bg-muted/30 rounded-xl p-5">
                <span className="font-semibold text-foreground">Lab quality.</span>
                <span className="text-muted-foreground"> Porcelain veneers are crafted by a ceramist. More careful shade-matching and shaping take more time.</span>
              </li>
              <li className="bg-muted/30 rounded-xl p-5">
                <span className="font-semibold text-foreground">Complexity and prep.</span>
                <span className="text-muted-foreground"> Teeth that need more preparation, bite adjustment, or careful edge alignment take more chair time.</span>
              </li>
              <li className="bg-muted/30 rounded-xl p-5">
                <span className="font-semibold text-foreground">Additional work.</span>
                <span className="text-muted-foreground"> Whitening of the lower teeth, gum contouring, or replacing old fillings may be part of the plan and are priced separately.</span>
              </li>
              <li className="bg-muted/30 rounded-xl p-5">
                <span className="font-semibold text-foreground">The dentist&rsquo;s experience.</span>
                <span className="text-muted-foreground"> Getting the shape and bite right is most of the work, and that planning is reflected in the cost.</span>
              </li>
            </ul>
            <p className="text-muted-foreground max-w-3xl mt-6">
              None of these are add-ons we push. They are simply the parts of a plan, and we walk through which ones
              apply to you before anything begins.
            </p>
          </div>
        </section>

        {/* Porcelain vs composite */}
        <section className="py-14 bg-muted/20">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl font-semibold text-foreground mb-4">Porcelain vs composite veneers</h2>
            <p className="text-muted-foreground max-w-3xl mb-6">
              Both can give a good result. They differ mostly in cost, how long they last, and how they are repaired.
            </p>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="bg-white border border-border rounded-2xl p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-foreground mb-3">Porcelain veneers</h3>
                <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                  <li>Higher cost, about {VENEER_COSTS.porcelainPerTooth} per tooth.</li>
                  <li>Longer-lasting and stain-resistant.</li>
                  <li>Made in a lab over more than one visit.</li>
                  <li>If one chips, it is usually remade rather than patched.</li>
                </ul>
              </div>
              <div className="bg-white border border-border rounded-2xl p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-foreground mb-3">Composite veneers</h3>
                <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                  <li>Lower cost, about {VENEER_COSTS.compositePerTooth} per tooth.</li>
                  <li>Often done in a single visit.</li>
                  <li>More easily repaired or touched up.</li>
                  <li>Shorter lifespan, and more prone to staining over time.</li>
                </ul>
              </div>
            </div>
            <p className="text-muted-foreground max-w-3xl mt-6">
              A simple way to think about it: porcelain is a larger investment that tends to last longer, while composite
              costs less up front and is easier to adjust, but you should expect to maintain or replace it sooner. We can
              tell you which is a reasonable fit for your teeth at a consultation.
            </p>
          </div>
        </section>

        {/* Per tooth vs full set */}
        <section className="py-14 bg-background">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl font-semibold text-foreground mb-4">Cost per tooth vs a full set</h2>
            <p className="text-muted-foreground max-w-3xl">
              Veneers are usually priced per tooth. That makes it easy to scope a plan around the teeth that actually show
              when you smile, rather than treating teeth that do not need it. Most people focus on the &ldquo;smile
              zone&rdquo; &mdash; the upper front teeth visible when you talk and smile. A full upper set is typically{' '}
              {VENEER_COSTS.smileZoneCount} veneers. Because the total varies so much with material and tooth count, we
              scope it per tooth and give you a clear estimate rather than quoting a flat set price. Some people only need
              a few teeth matched, and a smaller plan can look complete on its own.
            </p>
          </div>
        </section>

        {/* Insurance */}
        <section className="py-14 bg-muted/20">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl font-semibold text-foreground mb-4">Does insurance cover veneers?</h2>
            <p className="text-muted-foreground max-w-3xl">
              Most of the time, no. Veneers are usually considered cosmetic, and most PPO plans do not cover cosmetic
              treatment. That said, it is still worth reviewing your plan, because some restorative parts of a treatment
              plan can be evaluated differently depending on your situation and your coverage. We can help you understand
              what your plan does and does not include before you decide anything &mdash; see our{' '}
              <Link to="/insurance/" className="text-secondary underline-offset-4 hover:underline">insurance page</Link> or{' '}
              <Link to="/contact/" className="text-secondary underline-offset-4 hover:underline">contact us</Link> to review your specifics.
            </p>
          </div>
        </section>

        {/* Worth it */}
        <section className="py-14 bg-background">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl font-semibold text-foreground mb-4">Is it worth it?</h2>
            <p className="text-muted-foreground max-w-3xl">
              That depends on what you are looking for, and it is a fair question to sit with. Veneers are a long-term
              change to teeth you use every day, so the value is in a careful plan and a result that still looks natural in
              a few years &mdash; not in a quick fix. Porcelain, in particular, is meant to last, which is part of what you
              are paying for. The honest trade-off is that it is an investment, and porcelain veneers usually involve some
              preparation of the tooth, which is not reversible. A consultation is the right place to weigh that &mdash; we
              will tell you plainly whether veneers are a sensible option for you, and what a reasonable plan would cost.
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
              <Link to="/veneers/">Porcelain Veneers Los Angeles</Link>
              <Link to="/veneers/front-teeth-veneers-los-angeles/">Front Teeth Veneers in Los Angeles</Link>
              <Link to="/veneers/2-front-teeth-veneers-cost-los-angeles/">Cost of 2 Front Teeth Veneers</Link>
              <Link to="/veneers/1-tooth-veneer-los-angeles/">Single-Tooth Veneer in Los Angeles</Link>
            </div>
          </div>
        </section>

        <FinancingOptionsSection
          title="Prefer to spread the cost over time?"
          description="If you are budgeting for veneers, our Cherry financing page lets you explore monthly payment options before your consultation."
        />

        {/* Closing CTA */}
        <section className="py-16 bg-foreground/[0.03]">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-semibold text-foreground">Get a quote built around your teeth</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Every plan is different, so the most useful number is the one made for you. Come in for a consultation and we
              will look at your teeth, walk through your options and the trade-offs, and give you a straightforward cost
              &mdash; with no pressure to decide on the spot.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              <Button asChild>
                <Link to={SCHEDULE_CONSULTATION_PATH} onClick={() => trackCTAClick('veneers_cost_guide_cta_book', 'Book a consultation')}>
                  Book a consultation
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <PhoneLink phoneNumber={PHONE_NUMBER_E164} analyticsSource="veneers_cost_guide_cta_call">
                  Call {PHONE_NUMBER_DISPLAY}
                </PhoneLink>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default VeneersCostGuideLosAngeles;
