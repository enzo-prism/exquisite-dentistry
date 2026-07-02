import React from 'react';
import { Link } from 'react-router-dom';
import { PageSEO } from '@/components/seo/PageSEO';
import MasterStructuredData from '@/components/seo/MasterStructuredData';
import ServiceStructuredData from '@/components/ServiceStructuredData';
import FAQStructuredData from '@/components/seo/FAQStructuredData';
import WebPageStructuredData from '@/components/WebPageStructuredData';
import Breadcrumbs from '@/components/Breadcrumbs';
import FinancingOptionsSection from '@/components/FinancingOptionsSection';
import RelatedArticles from '@/components/RelatedArticles';
import LastUpdated from '@/components/LastUpdated';
import { Button } from '@/components/ui/button';
import PhoneLink from '@/components/PhoneLink';
import { SCHEDULE_CONSULTATION_PATH, PAYMENT_PLANS_PATH } from '@/constants/urls';
import { BUSINESS_HOURS, PHONE_NUMBER_DISPLAY, PHONE_NUMBER_E164 } from '@/constants/contact';
import { trackCTAClick } from '@/utils/googleAdsTracking';

// NOTE: This page makes no promises about specific same-day outcomes. Whether a
// treatment can be completed in one visit always depends on the exam, so the copy
// distinguishes what is often possible promptly from what takes more than one
// visit, and directs urgent cases to call first. No dollar figures appear here
// (see the repo's VERIFY-BEFORE-PUBLIC pricing convention).

const faqs = [
  {
    question: 'Can I get a same-day dental appointment in Los Angeles?',
    answer:
      'Often, yes. We hold room in the schedule for urgent needs when we can, especially earlier in the day. The office is open Monday through Thursday, so the best first step is to call as early as you can and describe what is going on. If we cannot see you the same day, we will tell you honestly and help you plan the soonest sensible visit.',
  },
  {
    question: 'What can actually be done in a single visit?',
    answer:
      'An exam with X-rays and a diagnosis, relief for most pain, in-office whitening, smoothing a small chip, composite bonding in select cases, recementing a crown when the tooth underneath is sound, and placing a temporary restoration to protect a tooth. What your visit includes depends on what the exam shows.',
  },
  {
    question: 'Can veneers or crowns be finished the same day?',
    answer:
      'Not at our office. Our porcelain veneers and crowns are crafted by a dental lab, which takes more than one visit but is part of how we control the fit and the final result. What we often can do the same day is protect the tooth, place a well-made temporary, and start the plan.',
  },
  {
    question: 'What should I do if I have a dental emergency after hours?',
    answer:
      'Call us and follow the guidance on our emergency dentist page, which covers common situations like a knocked-out tooth, a broken tooth, or swelling. If you have signs of a serious infection, such as facial swelling with fever or difficulty swallowing or breathing, go to an emergency room first.',
  },
  {
    question: 'Will I know the cost before treatment starts?',
    answer:
      'Yes. After the exam we explain what we found, what we recommend, and what it costs, before anything begins. If treatment can wait, we will say so. If you want to spread the cost over time, you can review Cherry financing options on our payment plans page.',
  },
  {
    question: 'Do I need to be an existing patient to be seen promptly?',
    answer:
      'No. New patients with urgent needs are welcome. When you call, tell us what happened, where the tooth is, and how long it has been bothering you, and bring a list of any medications. That helps us reserve the right amount of time and see you sooner.',
  },
];

const SameDayDentist = () => {
  return (
    <>
      <MasterStructuredData includeBusiness includeWebsite />
      <PageSEO
        title="Same-Day Dentist in Los Angeles | Exquisite Dentistry"
        description="Same-day dental care in Los Angeles: urgent exams, pain relief, in-office whitening, and honest guidance on what takes more than one visit. Call to be seen."
        keywords="same day dentist los angeles, same day dental appointment, urgent dental care los angeles, walk in dentist los angeles, dentist open today los angeles"
        path="/same-day-dentist"
        ogImage="https://exquisitedentistryla.com/lovable-uploads/2e2732fc-c4a6-4f21-9829-3717d9b2b36d.png"
      />

      <WebPageStructuredData
        title="Same-Day Dentist in Los Angeles"
        description="What can be handled same-day or promptly at our Wilshire Blvd office: urgent exams, pain relief, in-office whitening, and select repairs."
        url="https://exquisitedentistryla.com/same-day-dentist"
        breadcrumbs={[
          { name: 'Services', url: 'https://exquisitedentistryla.com/services/' },
          { name: 'Same-Day Dentist', url: 'https://exquisitedentistryla.com/same-day-dentist/' },
        ]}
      />

      <ServiceStructuredData
        serviceName="Same-Day Dental Care in Los Angeles"
        description="Prompt and same-day dental visits on Wilshire Blvd in Los Angeles: urgent exams, pain relief, in-office whitening, and select same-visit repairs."
        url="/same-day-dentist"
      />

      <FAQStructuredData faqs={faqs} about="Same-Day Dental Care in Los Angeles" />

      <div className="min-h-screen bg-background">
        {/* Hero */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-gold/10 to-white">
          <div className="max-w-5xl mx-auto px-4">
            <p className="uppercase tracking-[0.2em] text-secondary font-semibold text-sm">Prompt Care</p>
            <h1 className="mt-4 text-4xl md:text-5xl font-bold text-foreground">Same-Day Dentist in Los Angeles</h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-3xl">
              Some dental needs should not wait for next week. We hold room in the schedule for urgent visits when we
              can, and several treatments genuinely fit in a single appointment. Just as important, some do not &mdash;
              and we would rather tell you that plainly than promise a one-visit fix that depends on what the exam
              shows. Here is an honest picture of what same-day care at our Wilshire Blvd office looks like.
            </p>
            <p className="mt-4 text-base text-muted-foreground max-w-3xl">
              In pain right now? Start with our{' '}
              <Link to="/emergency-dentist/" className="text-secondary underline-offset-4 hover:underline">emergency dentist page</Link>{' '}
              or call us directly.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <PhoneLink phoneNumber={PHONE_NUMBER_E164} analyticsSource="same_day_dentist_hero_call">
                  Call {PHONE_NUMBER_DISPLAY}
                </PhoneLink>
              </Button>
              <Button variant="outline" asChild>
                <Link to={SCHEDULE_CONSULTATION_PATH} onClick={() => trackCTAClick('same_day_dentist_book_click', 'Schedule a Visit')}>
                  Schedule a Visit
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 mt-6">
          <Breadcrumbs
            items={[
              { label: 'Services', to: '/services/' },
              { label: 'Same-Day Dentist', to: '/same-day-dentist/' },
            ]}
          />
        </div>

        {/* What can be done same day */}
        <section className="py-14 bg-background">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl font-semibold text-foreground mb-4">What we can often handle in one visit</h2>
            <p className="text-muted-foreground max-w-3xl mb-6">
              Whether a treatment can be completed same-day always depends on the exam, but these commonly fit in a
              single appointment:
            </p>
            <ul className="grid gap-4 md:grid-cols-2">
              <li className="bg-muted/30 rounded-xl p-5">
                <span className="font-semibold text-foreground">An urgent exam and diagnosis.</span>
                <span className="text-muted-foreground"> X-rays, an examination, and a clear explanation of what is happening and what your options are.</span>
              </li>
              <li className="bg-muted/30 rounded-xl p-5">
                <span className="font-semibold text-foreground">Pain relief.</span>
                <span className="text-muted-foreground"> Most dental pain can be meaningfully addressed the same day, whether the full fix happens then or at a follow-up visit.</span>
              </li>
              <li className="bg-muted/30 rounded-xl p-5">
                <span className="font-semibold text-foreground">In-office teeth whitening.</span>
                <span className="text-muted-foreground"> <Link to="/zoom-whitening/" className="text-secondary underline-offset-4 hover:underline">Zoom whitening</Link> is completed in a single visit, after a quick check that whitening suits your teeth.</span>
              </li>
              <li className="bg-muted/30 rounded-xl p-5">
                <span className="font-semibold text-foreground">Smoothing and bonding small chips.</span>
                <span className="text-muted-foreground"> A minor chip can often be smoothed or repaired with composite bonding in one appointment, when the tooth is otherwise healthy.</span>
              </li>
              <li className="bg-muted/30 rounded-xl p-5">
                <span className="font-semibold text-foreground">Recementing a loose crown.</span>
                <span className="text-muted-foreground"> If the crown and the tooth underneath are sound, recementing is often a same-visit fix. If not, we will explain why and protect the tooth in the meantime.</span>
              </li>
              <li className="bg-muted/30 rounded-xl p-5">
                <span className="font-semibold text-foreground">Temporary restorations.</span>
                <span className="text-muted-foreground"> When a tooth needs lab-made work, a well-made temporary protects it and keeps you comfortable while the final restoration is crafted.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* What takes longer */}
        <section className="py-14 bg-muted/20">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl font-semibold text-foreground mb-4">What usually takes more than one visit</h2>
            <p className="text-muted-foreground max-w-3xl mb-4">
              Being straightforward about this matters more than sounding fast:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground max-w-3xl space-y-3">
              <li>
                <span className="font-semibold text-foreground">Porcelain veneers and crowns.</span> Ours are made by a
                dental lab, which takes more than one visit &mdash; that is part of how the fit and shade are controlled.
                See our <Link to="/veneers/" className="text-secondary underline-offset-4 hover:underline">veneers overview</Link>.
              </li>
              <li>
                <span className="font-semibold text-foreground">Dental implants.</span> Implants involve imaging,
                planning, placement, and healing time before the final tooth. The consultation can often happen promptly,
                but the treatment itself unfolds in phases &mdash; see{' '}
                <Link to="/dental-implants/" className="text-secondary underline-offset-4 hover:underline">dental implants</Link>.
              </li>
              <li>
                <span className="font-semibold text-foreground">Invisalign.</span> Aligners are fabricated from your scan,
                so treatment starts after a planning visit &mdash; see{' '}
                <Link to="/invisalign/" className="text-secondary underline-offset-4 hover:underline">Invisalign</Link>.
              </li>
              <li>
                <span className="font-semibold text-foreground">Some root canals and infections.</span> Depending on the
                tooth and the infection, a <Link to="/root-canal/" className="text-secondary underline-offset-4 hover:underline">root canal</Link>{' '}
                may be started the same day to relieve pain and finished at a follow-up visit.
              </li>
            </ul>
            <p className="text-muted-foreground max-w-3xl mt-4">
              Even when the full treatment takes longer, the same-day goal is concrete: relieve pain, protect the tooth,
              and leave with a clear plan.
            </p>
          </div>
        </section>

        {/* How to be seen + hours */}
        <section className="py-14 bg-background">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl font-semibold text-foreground mb-4">How to be seen promptly</h2>
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <p className="text-muted-foreground mb-4">
                  Call first rather than walking in &mdash; it lets us reserve the right amount of time and, when
                  possible, fit you in the same day. When you call, it helps to have:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>What happened, and when it started.</li>
                  <li>Where the tooth is and how it feels (sharp, throbbing, sensitive to heat or cold).</li>
                  <li>Any swelling, and whether it is getting worse.</li>
                  <li>Medications you take and any medical conditions.</li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  If you reach us after hours, the{' '}
                  <Link to="/emergency-dentist/" className="text-secondary underline-offset-4 hover:underline">emergency dentist page</Link>{' '}
                  explains what to do for common situations while you wait, and when an emergency room is the safer
                  first stop.
                </p>
              </div>
              <div className="bg-muted/30 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">Office hours</h3>
                <div className="space-y-2 text-muted-foreground">
                  {BUSINESS_HOURS.map(({ label, value }) => (
                    <p key={label}>
                      <span className="font-medium text-foreground">{label}:</span> {value}
                    </p>
                  ))}
                </div>
                <p className="text-muted-foreground mt-4 text-sm">
                  Same-day availability is easiest to find earlier in the day, and we will always tell you honestly
                  whether today is realistic.
                </p>
                <div className="mt-5">
                  <Button asChild>
                    <PhoneLink phoneNumber={PHONE_NUMBER_E164} analyticsSource="same_day_dentist_hours_call">
                      Call {PHONE_NUMBER_DISPLAY}
                    </PhoneLink>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Costs */}
        <section className="py-14 bg-muted/20">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl font-semibold text-foreground mb-4">Knowing the cost before you decide</h2>
            <p className="text-muted-foreground max-w-3xl">
              Urgent visits should not come with surprise bills. After the exam, we walk you through what we found and
              what each option costs before treatment begins &mdash; including the option of waiting, when waiting is
              safe. If urgent care turns into a larger plan, like a crown, implant, or root canal, you can review Cherry
              monthly payment options on our{' '}
              <Link to={PAYMENT_PLANS_PATH} className="text-secondary underline-offset-4 hover:underline">payment plans page</Link>{' '}
              before you commit, and we can help check what your insurance covers.
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
              <Link to="/emergency-dentist/">Emergency Dentist in Los Angeles</Link>
              <Link to="/teeth-whitening/">Teeth Whitening in Los Angeles</Link>
              <Link to="/root-canal/">Root Canal Treatment</Link>
              <Link to={PAYMENT_PLANS_PATH}>Payment Plans &amp; Cherry Financing</Link>
            </div>
          </div>
        </section>

        <FinancingOptionsSection
          title="If a prompt visit turns into a larger plan, financing is ready."
          description="You can review Cherry monthly payment options on our payment plans page before deciding on any follow-up treatment."
        />

        {/* Closing CTA */}
        <section className="py-16 bg-foreground/[0.03]">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-semibold text-foreground">Need to be seen today?</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Call and tell us what is going on. If we can see you today, we will. If we cannot, we will say so plainly
              and help you take the right next step &mdash; whether that is first aid guidance, a next-morning visit, or
              a scheduled consultation.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              <Button asChild>
                <PhoneLink phoneNumber={PHONE_NUMBER_E164} analyticsSource="same_day_dentist_cta_call">
                  Call {PHONE_NUMBER_DISPLAY}
                </PhoneLink>
              </Button>
              <Button variant="outline" asChild>
                <Link to={SCHEDULE_CONSULTATION_PATH} onClick={() => trackCTAClick('same_day_dentist_cta_book', 'Schedule a consultation')}>
                  Schedule a consultation
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <RelatedArticles
          tags={['emergency', 'urgent', 'toothache', 'broken tooth']}
          title="Urgent Care Resources"
          subtitle="More reading on handling dental problems when they come up"
        />

        <div className="max-w-5xl mx-auto px-4 pb-12">
          <LastUpdated date="July 2026" className="text-center" />
        </div>
      </div>
    </>
  );
};

export default SameDayDentist;
