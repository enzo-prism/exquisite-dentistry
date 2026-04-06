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
import { ROUTE_METADATA } from '@/constants/metadata';
import { PAYMENT_PLANS_PATH, SCHEDULE_CONSULTATION_PATH } from '@/constants/urls';

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
        <section className="relative overflow-hidden border-b border-border/60 bg-black text-white">
          <div className="absolute inset-0">
            <div className="absolute left-[-10%] top-[-18rem] h-[28rem] w-[28rem] rounded-full bg-gold/20 blur-[140px]" />
            <div className="absolute bottom-[-12rem] right-[-8%] h-[24rem] w-[24rem] rounded-full bg-white/10 blur-[150px]" />
          </div>

          <div className="relative container mx-auto px-4 py-16 md:py-24">
            <div className="mx-auto max-w-6xl">
              <Breadcrumbs
                items={[{ label: 'Payment Plans', to: PAYMENT_PLANS_PATH }]}
                className="mb-6"
                listClassName="border-white/10 bg-white/5 text-white/70"
                currentClassName="text-gold"
                linkClassName="text-white/70 hover:text-gold"
              />

              <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_22rem] lg:items-start">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-gold/90">
                    Flexible Financing
                  </p>
                  <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight md:text-5xl">
                    Understand your payment options before you commit to treatment.
                  </h1>
                  <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/75">
                    If you would rather understand the cost side before you make a decision, this
                    page is for you. Cherry can help you review possible monthly payment options for
                    veneers, Invisalign, whitening, implants, and other treatment plans before or
                    after your consultation.
                  </p>
                  <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/65">
                    Use the widget below if you want to see what financing might look like, compare
                    payment scenarios, and decide whether it feels right for you. Financing is
                    offered through Cherry, and approval is handled by Cherry.
                  </p>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Button
                      asChild
                      className="bg-gold text-black hover:bg-gold/90"
                    >
                      <a href="#payment-plan-options">See Payment Options</a>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="border-gold/40 bg-transparent text-white hover:bg-white hover:text-black"
                    >
                      <Link to={SCHEDULE_CONSULTATION_PATH}>Schedule Consultation</Link>
                    </Button>
                  </div>
                </div>

                <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gold/85">
                    Not Sure Whether To Start Here?
                  </p>
                  <p className="mt-4 text-base leading-relaxed text-white/75">
                    If you are not sure what treatment amount to review, whether to book first, or
                    whether financing even makes sense for your situation, our team can help you
                    talk it through.
                  </p>
                  <PhoneLink
                    phoneNumber={PHONE_NUMBER_DISPLAY}
                    className="mt-6 inline-flex items-center gap-2 text-lg font-semibold text-white hover:text-gold"
                  >
                    Call {PHONE_NUMBER_DISPLAY}
                    <ArrowRight size={18} />
                  </PhoneLink>
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
              <div className="max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-secondary">
                  Payment Options
                </p>
                <h2 className="mt-4 text-3xl font-bold text-foreground md:text-4xl">
                  See what monthly payments could look like.
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                  Use the Cherry experience below to review financing for cosmetic and restorative
                  dental care. Once you have a better sense of what feels comfortable, we can help
                  you decide whether to schedule, ask questions, or keep refining the treatment
                  plan.
                </p>
              </div>

              <div className="mt-8">
                <CherryPaymentPlansWidget variant="full" />
              </div>

              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                If you are unsure what amount to review in Cherry or which treatment plan to think
                about first, call{' '}
                <PhoneLink
                  phoneNumber={PHONE_NUMBER_DISPLAY}
                  className="font-semibold text-secondary underline underline-offset-4 hover:no-underline"
                >
                  {PHONE_NUMBER_DISPLAY}
                </PhoneLink>{' '}
                and our team will help you figure out the most useful next step.
              </p>
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
