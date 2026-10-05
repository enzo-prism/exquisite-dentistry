import React from "react";
import { Link, useLocation } from "react-router-dom";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageSEO from "@/components/seo/PageSEO";
import WebPageStructuredData from "@/components/WebPageStructuredData";
import { Button } from "@/components/ui/button";
import PhoneLink from "@/components/PhoneLink";
import { PHONE_NUMBER_DISPLAY } from "@/constants/contact";
import { CHERRY_CREDIT_REPORTING_DISCLOSURE } from "@/constants/cherry";
import { INSURANCE_PATH, PAYMENT_PLANS_PATH, SCHEDULING_URL } from "@/constants/urls";
import { ROUTE_METADATA } from "@/constants/metadata";
import { INSURANCE_PAGE_LINKS } from "@/data/insurance";
import ConsultationCallbackForm from "@/components/ConsultationCallbackForm";
import ConsultationPathCards from "@/components/consultation/ConsultationPathCards";
import ConsultationTrustPanel from "@/components/consultation/ConsultationTrustPanel";
import FirstVisitTimeline from "@/components/consultation/FirstVisitTimeline";
import SchedulingFrame from "@/components/consultation/SchedulingFrame";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/motion/Reveal";
import { CreditCard } from "lucide-react";
import { getConsultationService } from "@/data/consultation";

const ScheduleConsultation = () => {
  const meta = ROUTE_METADATA["/schedule-consultation"];
  const { search } = useLocation();
  const service = getConsultationService(new URLSearchParams(search).get('service'));

  return (
    <>
      <PageSEO
        title={meta.title}
        description={meta.description}
        keywords={meta.keywords}
        path="/schedule-consultation"
        ogImage={meta.ogImage}
      />
      <WebPageStructuredData
        title="Schedule Consultation"
        description={meta.description}
        url="https://exquisitedentistryla.com/schedule-consultation"
        breadcrumbs={[
          { name: "Schedule Consultation", url: "https://exquisitedentistryla.com/schedule-consultation/" }
        ]}
      />

      <div className="min-h-screen bg-ivory">
        <section className="relative overflow-clip pb-16 pt-6 md:pb-24 md:pt-10">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-40 -top-48 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(closest-side,hsl(38_25%_58%/0.16),transparent)]"
          />
          <div className="section-container relative">
            <Breadcrumbs
              items={[{ label: "Schedule Consultation", to: "/schedule-consultation/" }]}
              className="mb-8 md:mb-10"
            />

            <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12 xl:gap-16">
              <div className="min-w-0">
                <SectionHeading
                  as="h1"
                  align="left"
                  eyebrow="Appointments"
                  title={<>Schedule <em>Consultation</em></>}
                  description="Book a visit with Exquisite Dentistry on Wilshire Blvd in Los Angeles, or request a callback to ask questions before choosing an appointment."
                />

                <ConsultationPathCards className="mt-8 md:mt-10" />

                <div className="mt-10 md:mt-14">
                  <ConsultationCallbackForm key={service?.id ?? 'general'} initialService={service?.id} />
                </div>

                <section id="book-online" className="mt-12 scroll-mt-24 md:mt-16" aria-labelledby="book-online-heading">
                  <Reveal as="p" variant="fade" className="eyebrow">Choose a time</Reveal>
                  <h2 id="book-online-heading" className="mt-3 text-[1.65rem] font-semibold leading-tight tracking-[-0.02em] text-ink md:text-3xl">
                    Book Online
                  </h2>
                  {service && (
                    <p className="mt-4 rounded-xl border border-gold/20 bg-white/70 px-4 py-3 text-[15px] leading-6 text-gray-700">
                      Interested in {service.label}? Please tell the team when booking. Your selection is included if you send a callback request above.
                    </p>
                  )}

                  <div className="mt-6">
                    <SchedulingFrame />
                  </div>

                  <p className="mt-4 text-sm leading-6 text-gray-600">
                    If the scheduler doesn’t load,{" "}
                    <a
                      href={SCHEDULING_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-gold-dark underline underline-offset-4 hover:no-underline"
                    >
                      open booking in a new tab
                    </a>{" "}
                    or call{" "}
                    <PhoneLink
                      phoneNumber={PHONE_NUMBER_DISPLAY}
                      className="font-medium text-gold-dark underline underline-offset-4 hover:no-underline"
                    >
                      {PHONE_NUMBER_DISPLAY}
                    </PhoneLink>
                    .
                  </p>
                </section>
              </div>

              <ConsultationTrustPanel className="min-w-0 lg:[@media(min-height:840px)]:sticky lg:[@media(min-height:840px)]:top-24" />
            </div>
          </div>
        </section>

        <section className="border-t border-gold/10 bg-white py-16 md:py-24" aria-labelledby="first-visit-heading">
          <div className="section-container">
            <FirstVisitTimeline />

            <Reveal variant="up" className="mx-auto mt-14 max-w-3xl md:mt-20">
              <details className="group rounded-2xl border border-gold/15 bg-ivory shadow-[0_24px_60px_-40px_rgba(23,18,10,0.35)]">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-5 py-4 font-semibold text-ink outline-none focus-visible:ring-2 focus-visible:ring-gold md:px-7 [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/25 bg-white text-gold" aria-hidden="true">
                      <CreditCard className="h-4 w-4" />
                    </span>
                    <span>Financing and insurance options</span>
                  </span>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold/25 bg-white text-lg leading-none text-gold transition-transform duration-500 group-open:rotate-45" aria-hidden="true">+</span>
                </summary>
                <div className="mx-5 border-t border-gold/15 pb-6 pt-5 md:mx-7 md:pb-7">
                  <p className="leading-relaxed text-gray-700">
                    If cost is part of your decision, you can review Cherry payment plans or check insurance after booking.
                  </p>
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    {CHERRY_CREDIT_REPORTING_DISCLOSURE}
                  </p>
                  <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <Button asChild>
                      <Link to={PAYMENT_PLANS_PATH}>Open Payment Plans</Link>
                    </Button>
                    <Button asChild variant="outline">
                      <Link to={INSURANCE_PATH}>Insurance Options</Link>
                    </Button>
                    <Button asChild variant="outline">
                      <Link to={INSURANCE_PAGE_LINKS.contact}>Verify insurance benefits</Link>
                    </Button>
                  </div>
                </div>
              </details>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
};

export default ScheduleConsultation;
