import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, FileSearch, ShieldCheck } from 'lucide-react';

import FAQStructuredData from '@/components/seo/FAQStructuredData';
import MasterStructuredData from '@/components/seo/MasterStructuredData';
import PageSEO from '@/components/seo/PageSEO';
import VideoHero from '@/components/VideoHero';
import WebPageStructuredData from '@/components/WebPageStructuredData';
import PhoneLink from '@/components/PhoneLink';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { PHONE_NUMBER_DISPLAY } from '@/constants/contact';
import { ROUTE_METADATA } from '@/constants/metadata';
import {
  DIRECT_IN_NETWORK_CARRIERS,
  INSURANCE_HERO_BADGE,
  INSURANCE_HERO_HOOK,
  INSURANCE_HERO_SUPPORT,
  INSURANCE_DIRECT_TIER_COPY,
  INSURANCE_PAGE_FAQS,
  INSURANCE_PAGE_LINKS,
  INSURANCE_PAGE_STEPS,
  INSURANCE_PARTNER_TIER_COPY,
  INSURANCE_PAYMENT_SUMMARY,
  INSURANCE_SUPPORT_POINTS,
  INSURANCE_VERIFICATION_DISCLAIMER,
  PARTNER_BILLING_CARRIERS,
} from '@/data/insurance';

const Insurance = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const meta = ROUTE_METADATA['/insurance'];

  return (
    <>
      <MasterStructuredData includeBusiness={true} includeWebsite={true} />
      <PageSEO
        title={meta.title}
        description={meta.description}
        keywords={meta.keywords}
        path="/insurance"
        ogImage={meta.ogImage}
      />
      <WebPageStructuredData
        title="Insurance Accepted"
        description={meta.description}
        url="https://exquisitedentistryla.com/insurance"
        breadcrumbs={[{ name: 'Insurance', url: 'https://exquisitedentistryla.com/insurance/' }]}
      />
      <FAQStructuredData faqs={[...INSURANCE_PAGE_FAQS]} about="Insurance accepted at Exquisite Dentistry" />

      <div className="min-h-screen bg-background">
        <VideoHero
          title={
            <>
              <span className="text-gold">Most PPO Plans</span> Accepted
            </>
          }
          subtitle={INSURANCE_HERO_SUPPORT}
          primaryCta={{
            text: 'Verify My Plan',
            href: INSURANCE_PAGE_LINKS.contact,
          }}
          secondaryCta={{
            text: 'Book Consultation',
            href: INSURANCE_PAGE_LINKS.schedule,
          }}
          badgeText={INSURANCE_HERO_BADGE}
          height="medium"
          preferStaticOnMobile={true}
        />

        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-5xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-secondary">
                PPO Insurance
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                {INSURANCE_HERO_HOOK}
              </h2>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                The important distinction is that accepted does not always mean direct in-network.
                Exquisite Dentistry uses a two-tier PPO model: direct in-network relationships for
                some carriers, and partner billing-contract pathways for others.
              </p>
            </div>

            <div className="mx-auto mt-10 grid max-w-6xl gap-6 lg:grid-cols-2">
              <article className="rounded-[1.75rem] border border-gold/20 bg-white p-6 shadow-[0_22px_60px_-42px_rgba(0,0,0,0.25)] md:p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 text-gold">
                  <ShieldCheck size={22} />
                </div>
                <p className="mt-5 text-sm font-semibold uppercase tracking-[0.28em] text-secondary">
                  Tier 1
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-foreground">
                  Direct in-network carriers
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {INSURANCE_DIRECT_TIER_COPY}
                </p>
                <div className="mt-6 space-y-4">
                  {DIRECT_IN_NETWORK_CARRIERS.map((carrier) => (
                    <div key={carrier.name} className="rounded-xl border border-border bg-stone-50 p-4">
                      <h4 className="text-base font-semibold text-foreground">{carrier.name}</h4>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">{carrier.detail}</p>
                    </div>
                  ))}
                </div>
              </article>

              <article className="rounded-[1.75rem] border border-border bg-white p-6 shadow-[0_22px_60px_-42px_rgba(0,0,0,0.25)] md:p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 text-gold">
                  <FileSearch size={22} />
                </div>
                <p className="mt-5 text-sm font-semibold uppercase tracking-[0.28em] text-secondary">
                  Tier 2
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-foreground">
                  Accepted through partner billing contracts
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {INSURANCE_PARTNER_TIER_COPY}
                </p>
                <div className="mt-6 space-y-4">
                  {PARTNER_BILLING_CARRIERS.map((carrier) => (
                    <div key={carrier.name} className="rounded-xl border border-border bg-stone-50 p-4">
                      <h4 className="text-base font-semibold text-foreground">{carrier.name}</h4>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">{carrier.detail}</p>
                    </div>
                  ))}
                </div>
              </article>
            </div>

            <div className="mx-auto mt-6 max-w-6xl rounded-xl border border-gold/20 bg-gold/5 p-5">
              <p className="text-sm leading-7 text-foreground/80">
                {INSURANCE_VERIFICATION_DISCLAIMER}
              </p>
            </div>

            <div className="mx-auto mt-14 max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-secondary">
                What Happens Next
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Verify the pathway before treatment starts
              </h2>
            </div>

            <div className="mx-auto mt-10 grid max-w-6xl gap-5 md:grid-cols-3">
              {INSURANCE_PAGE_STEPS.map((step, index) => (
                <article
                  key={step.title}
                  className="rounded-[1.75rem] border border-gold/15 bg-white p-6 shadow-[0_22px_60px_-42px_rgba(0,0,0,0.25)]"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gold/10 text-gold">
                    {index === 0 ? <ShieldCheck size={20} /> : index === 1 ? <FileSearch size={20} /> : <CheckCircle2 size={20} />}
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-stone-50 py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,1fr)_24rem]">
              <div className="rounded-[2rem] border border-border bg-white p-8 shadow-[0_24px_70px_-48px_rgba(0,0,0,0.28)] md:p-10">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-secondary">
                  What We Can Help Review
                </p>
                <h2 className="mt-4 text-3xl font-bold text-foreground md:text-4xl">
                  Correct insurance guidance before you commit
                </h2>
                <p className="mt-4 text-base leading-7 text-muted-foreground">
                  MetLife is accepted, but it should not be presented as the same kind of
                  relationship as Guardian or Cigna. Our team helps confirm whether your plan
                  should route through a direct in-network relationship or a partner PPO billing
                  contract.
                </p>
                <ul className="mt-6 space-y-4">
                  {INSURANCE_SUPPORT_POINTS.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                      <span className="text-base leading-7 text-muted-foreground">{point}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 rounded-[1.5rem] border border-gold/15 bg-gold/5 p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-secondary">
                    Insurance + Cherry
                  </p>
                  <p className="mt-3 text-base leading-7 text-foreground/85">
                    {INSURANCE_PAYMENT_SUMMARY} If a remaining balance still matters after
                    benefits are reviewed, Cherry can help eligible patients explore payment
                    options.
                  </p>
                </div>
              </div>

              <aside className="rounded-[2rem] border border-gold/20 bg-white p-7 shadow-[0_24px_70px_-48px_rgba(0,0,0,0.28)]">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-secondary">
                  Verify Benefits
                </p>
                <h3 className="mt-4 text-2xl font-semibold text-foreground">
                  Send your plan details before treatment
                </h3>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  Carrier names are only the starting point. Plan name, employer group, member ID,
                  and the planned treatment determine what benefits may apply.
                </p>
                <div className="mt-6 flex flex-col gap-3">
                  <Button asChild>
                    <Link to={INSURANCE_PAGE_LINKS.contact}>Verify My Benefits</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link to={INSURANCE_PAGE_LINKS.blog}>Read the veneers insurance guide</Link>
                  </Button>
                </div>
                <p className="mt-6 text-sm leading-7 text-muted-foreground">
                  Want a real person to help instead? Call{' '}
                  <PhoneLink
                    phoneNumber={PHONE_NUMBER_DISPLAY}
                    className="font-semibold text-secondary underline underline-offset-4 hover:no-underline"
                  >
                    {PHONE_NUMBER_DISPLAY}
                  </PhoneLink>
                  .
                </p>
              </aside>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <div className="text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-secondary">
                  Insurance FAQs
                </p>
                <h2 className="mt-4 text-3xl font-bold text-foreground md:text-4xl">
                  Questions patients ask before they reach out
                </h2>
              </div>

              <Accordion type="single" collapsible className="mt-10 space-y-4">
                {INSURANCE_PAGE_FAQS.map((faq, index) => (
                  <AccordionItem
                    key={faq.question}
                    value={`insurance-faq-${index}`}
                    className="rounded-xl border border-border bg-white px-6"
                  >
                    <AccordionTrigger
                      className="py-5 text-left text-lg font-semibold text-foreground"
                      textClassName="text-left text-lg font-semibold text-foreground"
                    >
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 pt-0 text-base leading-7 text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        <section className="pb-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-5xl rounded-[2rem] border border-border bg-white px-8 py-10 text-center shadow-[0_24px_70px_-48px_rgba(0,0,0,0.28)] md:px-12">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-secondary">
                Final Step
              </p>
              <h2 className="mt-4 text-3xl font-bold text-foreground md:text-4xl">
                Verify benefits first, then book with confidence
              </h2>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                If you want us to review your PPO plan before you commit, contact our team. If you
                already know you want to move forward, book a consultation and we will help you
                map out insurance and payment options from there.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <Link to={INSURANCE_PAGE_LINKS.contact}>Verify My Plan</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to={INSURANCE_PAGE_LINKS.schedule}>Book Consultation</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Insurance;
