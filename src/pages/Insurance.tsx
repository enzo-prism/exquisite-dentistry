import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, CreditCard, FileSearch, ShieldCheck } from 'lucide-react';

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
import { PHONE_NUMBER_DISPLAY, PHONE_NUMBER_E164 } from '@/constants/contact';
import { ROUTE_METADATA } from '@/constants/metadata';
import {
  INSURANCE_HERO_BADGE,
  INSURANCE_HERO_HEADLINE,
  INSURANCE_HERO_HOOK,
  INSURANCE_HERO_SUPPORT,
  INSURANCE_PAGE_FAQS,
  INSURANCE_PAGE_LINKS,
  INSURANCE_PAGE_STEPS,
  INSURANCE_PAYMENT_SUMMARY,
  INSURANCE_SUPPORT_POINTS,
  INSURANCE_VERIFICATION_DISCLAIMER,
  PPO_NETWORKS,
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
        title={INSURANCE_HERO_HEADLINE}
        description={meta.description}
        url="https://exquisitedentistryla.com/insurance"
        breadcrumbs={[{ name: 'Insurance', url: 'https://exquisitedentistryla.com/insurance/' }]}
      />
      <FAQStructuredData
        faqs={[...INSURANCE_PAGE_FAQS]}
        about="PPO dental insurance accepted at Exquisite Dentistry"
      />

      <div className="min-h-screen bg-background">
        <VideoHero
          title={
            <>
              <span className="text-gold">Dental Insurance Accepted</span> in Los Angeles
            </>
          }
          subtitle={INSURANCE_HERO_HOOK}
          primaryCta={{
            text: 'Verify My Insurance',
            href: INSURANCE_PAGE_LINKS.contact,
          }}
          secondaryCta={{
            text: `Call ${PHONE_NUMBER_DISPLAY}`,
            href: `tel:${PHONE_NUMBER_E164}`,
          }}
          badgeText={INSURANCE_HERO_BADGE}
          height="medium"
          preferStaticOnMobile={true}
        />

        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-secondary">
                Simple Insurance Answer
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                If you have a PPO plan, there is a strong chance we can help.
              </h2>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                {INSURANCE_HERO_SUPPORT}
              </p>
              <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <Link to={INSURANCE_PAGE_LINKS.contact}>Verify My Benefits</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <PhoneLink phoneNumber={PHONE_NUMBER_DISPLAY}>
                    Call {PHONE_NUMBER_DISPLAY}
                  </PhoneLink>
                </Button>
              </div>
            </div>

            <div className="mx-auto mt-12 grid max-w-6xl gap-6 lg:grid-cols-2">
              <article className="rounded-[1.75rem] border border-gold/20 bg-white p-6 shadow-[0_22px_60px_-42px_rgba(0,0,0,0.25)] md:p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 text-gold">
                  <ShieldCheck size={22} />
                </div>
                <h3 className="mt-5 text-2xl font-semibold text-foreground">
                  PPO plans can be reviewed before treatment.
                </h3>
                <p className="mt-3 text-base leading-7 text-muted-foreground">
                  The first step is not asking patients to decode network mechanics. The first step
                  is sending the plan details so our team can verify whether PPO benefits may apply
                  and explain the estimated coverage clearly.
                </p>
              </article>

              <article className="rounded-[1.75rem] border border-border bg-white p-6 shadow-[0_22px_60px_-42px_rgba(0,0,0,0.25)] md:p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 text-gold">
                  <FileSearch size={22} />
                </div>
                <h3 className="mt-5 text-2xl font-semibold text-foreground">
                  Coverage depends on your specific plan.
                </h3>
                <p className="mt-3 text-base leading-7 text-muted-foreground">
                  Carrier name, plan name, employer group, member details, and the planned
                  treatment all matter. We will help review those details before treatment so you
                  have fewer surprises.
                </p>
              </article>
            </div>

            <div className="mx-auto mt-6 max-w-6xl rounded-xl border border-gold/20 bg-gold/5 p-5">
              <p className="text-sm leading-7 text-foreground/80">
                {INSURANCE_VERIFICATION_DISCLAIMER}
              </p>
            </div>
          </div>
        </section>

        <section className="bg-stone-50 py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-5xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-secondary">
                PPO Plans
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                PPO Plans We Commonly Work With
              </h2>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                Exquisite Dentistry works with many major PPO dental insurance plans and PPO
                networks. If you do not see your carrier listed, contact us. Many PPO plans can
                still be used even when the insurance relationship is handled through a
                participating PPO network.
              </p>
            </div>

            <div className="mx-auto mt-12 max-w-6xl rounded-[2rem] border border-gold/15 bg-white p-6 shadow-[0_24px_70px_-48px_rgba(0,0,0,0.28)] md:p-8">
              <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-secondary">
                    PPO Network Relationships
                  </p>
                  <h2 className="mt-4 text-3xl font-bold text-foreground md:text-4xl">
                    Guardian, Guardian Advantage, and Zealous Network access
                  </h2>
                  <p className="mt-4 text-base leading-7 text-muted-foreground">
                    Exquisite Dentistry works with PPO network relationships, including Guardian.
                    We are also preparing to support additional PPO access through the Zealous
                    Network. These relationships may allow patients with many PPO insurance plans
                    to use benefits at our office after plan verification.
                  </p>
                  <p className="mt-4 text-base leading-7 text-muted-foreground">
                    Have MetLife PPO? We may be able to work with MetLife PPO members through
                    participating PPO billing relationships, including Guardian PPO pathways.
                    Provider-directory status and billing-network processing can differ, so please
                    contact our team to verify your specific benefits before treatment.
                  </p>
                </div>

                <div className="grid gap-4">
                  {PPO_NETWORKS.map((network) => (
                    <article
                      key={network.name}
                      className="rounded-xl border border-border bg-stone-50 px-5 py-4"
                    >
                      <h3 className="text-base font-semibold text-foreground">{network.name}</h3>
                      <p className="mt-2 text-sm leading-7 text-muted-foreground">
                        {network.detail}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            </div>

            <div className="mx-auto mt-10 max-w-5xl rounded-[2rem] border border-gold/20 bg-white p-7 text-center shadow-[0_24px_70px_-48px_rgba(0,0,0,0.28)] md:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-secondary">
                Verify First
              </p>
              <h2 className="mt-4 text-3xl font-bold text-foreground md:text-4xl">
                Not sure if we accept your plan?
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-muted-foreground">
                Send us your insurance information and our team will help verify your PPO benefits
                before your visit.
              </p>
              <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <Link to={INSURANCE_PAGE_LINKS.contact}>Verify My Benefits</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <PhoneLink phoneNumber={PHONE_NUMBER_DISPLAY}>
                    Call {PHONE_NUMBER_DISPLAY}
                  </PhoneLink>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,1fr)_24rem]">
              <div className="rounded-[2rem] border border-border bg-white p-8 shadow-[0_24px_70px_-48px_rgba(0,0,0,0.28)] md:p-10">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-secondary">
                  How PPO Insurance Works
                </p>
                <h2 className="mt-4 text-3xl font-bold text-foreground md:text-4xl">
                  We review the plan details before you commit.
                </h2>
                <p className="mt-4 text-base leading-7 text-muted-foreground">
                  Many PPO dental insurance plans can be used through provider networks and
                  billing relationships. That means your plan may be usable even if the exact
                  carrier relationship is not obvious from a provider directory. Our team can
                  review your plan, verify your benefits, and explain your estimated coverage
                  before treatment.
                </p>
                <ul className="mt-6 space-y-4">
                  {INSURANCE_SUPPORT_POINTS.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                      <span className="text-base leading-7 text-muted-foreground">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <aside className="rounded-[2rem] border border-gold/20 bg-white p-7 shadow-[0_24px_70px_-48px_rgba(0,0,0,0.28)]">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 text-gold">
                  <CreditCard size={22} />
                </div>
                <p className="mt-5 text-sm font-semibold uppercase tracking-[0.24em] text-secondary">
                  Insurance + Cherry
                </p>
                <h3 className="mt-4 text-2xl font-semibold text-foreground">
                  Insurance and financing can work together.
                </h3>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  {INSURANCE_PAYMENT_SUMMARY}
                </p>
                <div className="mt-6 flex flex-col gap-3">
                  <Button asChild>
                    <Link to={INSURANCE_PAGE_LINKS.contact}>Confirm My Benefits</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link to={INSURANCE_PAGE_LINKS.paymentPlans}>View Cherry Financing</Link>
                  </Button>
                </div>
              </aside>
            </div>

            <div className="mx-auto mt-14 max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-secondary">
                What Happens Next
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Send the plan details, then we help you choose the right next step.
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

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-5xl rounded-[2rem] border border-border bg-white px-8 py-10 text-center shadow-[0_24px_70px_-48px_rgba(0,0,0,0.28)] md:px-12">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-secondary">
                Verify Benefits
              </p>
              <h2 className="mt-4 text-3xl font-bold text-foreground md:text-4xl">
                Not sure if your PPO plan is accepted?
              </h2>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                Send us your insurance information and we will help verify your benefits before
                your visit. If you already know you want to move forward, book a consultation and
                we will map out insurance and payment options from there.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <Link to={INSURANCE_PAGE_LINKS.contact}>Verify My Benefits</Link>
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
