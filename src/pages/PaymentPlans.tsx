import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CalendarClock, CreditCard, Sparkles } from 'lucide-react';

import Breadcrumbs from '@/components/Breadcrumbs';
import CherryPaymentPlansWidget from '@/components/CherryPaymentPlansWidget';
import PhoneLink from '@/components/PhoneLink';
import WebPageStructuredData from '@/components/WebPageStructuredData';
import PageSEO from '@/components/seo/PageSEO';
import { Button } from '@/components/ui/button';
import { PHONE_NUMBER_DISPLAY } from '@/constants/contact';
import { INSURANCE_PAYMENT_SUMMARY } from '@/data/insurance';
import { ROUTE_METADATA } from '@/constants/metadata';
import { useCherryWidgetRegistration } from '@/hooks/use-cherry-widget-registration';
import {
  CONTACT_PATH,
  INSURANCE_PATH,
  PAYMENT_PLANS_PATH,
  SCHEDULE_CONSULTATION_PATH,
  VENEERS_INSURANCE_BLOG_PATH,
} from '@/constants/urls';

const highlightCards = [
  {
    title: 'See whether the payment fits',
    description:
      'Review possible monthly payment options before you commit to veneers, implants, Invisalign, whitening, or another treatment plan.',
    icon: CreditCard,
  },
  {
    title: 'Use it before or after you book',
    description:
      'Some patients want to check the numbers before scheduling. Others use it after a consultation once they know the treatment they want.',
    icon: CalendarClock,
  },
  {
    title: 'Get clearer on your next step',
    description:
      'If the payment feels manageable, you can keep moving. If you still have questions, our team can help you talk through the plan.',
    icon: Sparkles,
  },
];

const PaymentPlans = () => {
  const meta = ROUTE_METADATA['/payment-plans'];

  useCherryWidgetRegistration({ enabled: true });

  return (
    <>
      <PageSEO
        title={meta.title}
        description={meta.description}
        keywords={meta.keywords}
        path="/payment-plans"
        ogImage={meta.ogImage}
      />
      <WebPageStructuredData
        title="Payment Plans"
        description={meta.description}
        url="https://exquisitedentistryla.com/payment-plans"
        breadcrumbs={[{ name: 'Payment Plans', url: PAYMENT_PLANS_PATH }]}
      />

      <div className="min-h-screen bg-background">
        <section className="relative overflow-hidden border-b border-border/60 bg-gradient-to-br from-white via-stone-50 to-white">
          <div className="absolute inset-0">
            <div className="absolute left-[-10%] top-[-18rem] h-[28rem] w-[28rem] rounded-full bg-gold/18 blur-[140px]" />
            <div className="absolute bottom-[-12rem] right-[-8%] h-[24rem] w-[24rem] rounded-full bg-primary/10 blur-[150px]" />
          </div>

          <div className="relative container mx-auto px-4 py-16 md:py-24">
            <div className="mx-auto max-w-6xl">
              <Breadcrumbs
                items={[{ label: 'Payment Plans', to: PAYMENT_PLANS_PATH }]}
                className="mb-6"
              />

              <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_22rem] lg:items-start">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-secondary">
                    Flexible Financing
                  </p>
                  <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight text-foreground md:text-5xl">
                    Understand your payment options before you commit to treatment.
                  </h1>
                  <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
                    If you would rather understand the cost side before you make a decision, this
                    page is for you. Cherry can help you review possible monthly payment options for
                    veneers, Invisalign, whitening, implants, and other treatment plans before or
                    after your consultation.
                  </p>
                  <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
                    This page stays intentionally simple. Read the guidance here, then use the
                    floating Cherry button only if you want to explore payment options in more
                    detail. Financing is offered through Cherry, and approval is handled by Cherry.
                  </p>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Button asChild>
                      <a href="#payment-plan-options">See How Cherry Works</a>
                    </Button>
                    <Button asChild variant="outline">
                      <Link to={SCHEDULE_CONSULTATION_PATH}>Schedule Consultation</Link>
                    </Button>
                  </div>
                </div>

                <div className="rounded-[1.75rem] border border-gold/20 bg-white/90 p-6 shadow-[0_20px_48px_-34px_rgba(0,0,0,0.18)]">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-secondary">
                    Helpful To Know
                  </p>
                  <ul className="mt-4 space-y-3 text-sm leading-6 text-muted-foreground">
                    <li>Use Cherry before you book if budget clarity affects your timing.</li>
                    <li>Use Cherry after a consultation if you want treatment guidance first.</li>
                    <li>You do not need to decide about financing to keep moving forward.</li>
                  </ul>
                  <PhoneLink
                    phoneNumber={PHONE_NUMBER_DISPLAY}
                    className="mt-6 inline-flex items-center gap-2 text-lg font-semibold text-foreground hover:text-secondary"
                  >
                    Call {PHONE_NUMBER_DISPLAY}
                    <ArrowRight size={18} />
                  </PhoneLink>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8 md:py-10">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-6xl rounded-[1.75rem] border border-gold/15 bg-gradient-to-br from-stone-50 to-white p-6 shadow-[0_20px_60px_-44px_rgba(0,0,0,0.3)] md:p-8">
              <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
                <div className="min-w-0">
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-secondary">
                    Insurance + Financing
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold text-foreground md:text-3xl">
                    {INSURANCE_PAYMENT_SUMMARY}
                  </h2>
                  <p className="mt-3 text-base leading-7 text-muted-foreground">
                    If insurance is your first question, start there. If you still want to compare
                    payment scenarios afterward, keep reading and use Cherry when it helps. For a
                    treatment-specific example, read our{' '}
                    <Link
                      to={VENEERS_INSURANCE_BLOG_PATH}
                      className="text-secondary underline underline-offset-4 hover:no-underline"
                    >
                      veneers-and-insurance guide
                    </Link>
                    .
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                  <Button asChild>
                    <Link to={CONTACT_PATH}>Check Your Plan</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link to="#payment-plan-options">See Cherry Options</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link to={INSURANCE_PATH}>Open Insurance Page</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 md:py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
              {highlightCards.map(({ title, description, icon: Icon }) => (
                <div
                  key={title}
                  className="rounded-[1.75rem] border border-border bg-white p-6 shadow-[0_18px_48px_-32px_rgba(0,0,0,0.25)]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 text-gold">
                    <Icon size={22} />
                  </div>
                  <h2 className="mt-5 text-xl font-semibold text-foreground">{title}</h2>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="payment-plan-options"
          className="border-y border-border/70 bg-stone-50 py-16 md:py-20"
        >
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-6xl">
              <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
                <div className="max-w-xl">
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-secondary">
                    How To Use Cherry
                  </p>
                  <h2 className="mt-4 text-3xl font-bold text-foreground md:text-4xl">
                    Use Cherry only when it helps.
                  </h2>
                  <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                    The floating Cherry button gives you a simpler way to check payments without
                    turning this page into a complicated estimator screen.
                  </p>

                  <div className="mt-6 space-y-3">
                    <div className="rounded-[1.35rem] border border-border bg-white px-5 py-4">
                      <p className="text-sm font-semibold text-foreground">1. Start with a rough amount or your consultation estimate.</p>
                    </div>
                    <div className="rounded-[1.35rem] border border-border bg-white px-5 py-4">
                      <p className="text-sm font-semibold text-foreground">2. Use Cherry to see whether monthly payments feel manageable.</p>
                    </div>
                    <div className="rounded-[1.35rem] border border-border bg-white px-5 py-4">
                      <p className="text-sm font-semibold text-foreground">3. Keep booking, ask questions, or pause. Cherry is there to help you decide, not push you.</p>
                    </div>
                  </div>
                </div>

                <div className="min-w-0">
                  <CherryPaymentPlansWidget variant="full" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-5xl rounded-[2rem] border border-border bg-white p-8 shadow-[0_22px_60px_-38px_rgba(0,0,0,0.28)] md:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-secondary">
                Next Step
              </p>
              <h2 className="mt-4 text-3xl font-bold text-foreground md:text-4xl">
                Ready to talk through treatment?
              </h2>
              <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted-foreground">
                Once you&apos;ve reviewed payment options, we can help you match them to the right
                treatment plan, timeline, and priorities. If you still have questions, that is
                completely fine too. A consultation is the place to talk them through.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild>
                  <Link to={SCHEDULE_CONSULTATION_PATH}>Schedule Consultation</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/services/">Explore Services</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default PaymentPlans;
