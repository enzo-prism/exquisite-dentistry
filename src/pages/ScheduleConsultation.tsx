import React from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "@/components/Breadcrumbs";
import CherryPaymentPlansWidget from "@/components/CherryPaymentPlansWidget";
import PageSEO from "@/components/seo/PageSEO";
import WebPageStructuredData from "@/components/WebPageStructuredData";
import { Button } from "@/components/ui/button";
import PhoneLink from "@/components/PhoneLink";
import { PHONE_NUMBER_DISPLAY } from "@/constants/contact";
import { PAYMENT_PLANS_PATH, SCHEDULING_URL } from "@/constants/urls";
import { ROUTE_METADATA } from "@/constants/metadata";

const ScheduleConsultation = () => {
  const meta = ROUTE_METADATA["/schedule-consultation"];

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

      <div className="min-h-screen bg-background">
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Breadcrumbs
                items={[{ label: "Schedule Consultation", to: "/schedule-consultation/" }]}
                className="mb-6"
              />
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
                Appointments
              </p>
              <h1 className="mt-4 text-4xl md:text-5xl font-bold text-foreground">
                Schedule Consultation
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Planning porcelain veneers or dental implants near Beverly Hills?
                Use this page to book time with our team at Exquisite Dentistry on
                Wilshire Blvd in Los Angeles.
              </p>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                Prefer to speak with someone first? Call{" "}
                <PhoneLink
                  phoneNumber={PHONE_NUMBER_DISPLAY}
                  className="text-secondary underline underline-offset-4 hover:no-underline"
                >
                  {PHONE_NUMBER_DISPLAY}
                </PhoneLink>
                .
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Button asChild className="w-full sm:w-auto">
                  <a href="#book-online">Book Online</a>
                </Button>
                <Button
                  variant="outline"
                  asChild
                  className="w-full sm:w-auto"
                >
                  <PhoneLink
                    phoneNumber={PHONE_NUMBER_DISPLAY}
                    className="inline-flex items-center justify-center font-semibold"
                  >
                    Call {PHONE_NUMBER_DISPLAY}
                  </PhoneLink>
                </Button>
              </div>

              <div className="mt-8 rounded-3xl border border-gold/20 bg-gradient-to-br from-stone-50 to-white p-6 shadow-[0_18px_48px_-32px_rgba(0,0,0,0.25)] md:p-8">
                <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-start">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-secondary">
                      Flexible Financing
                    </p>
                    <h2 className="mt-3 text-2xl font-semibold text-foreground">
                      If cost is part of your decision, Cherry is available here too.
                    </h2>
                    <p className="mt-3 text-muted-foreground leading-relaxed">
                      You do not need to stop the booking process to use financing. If you want to
                      check possible monthly payments before you schedule, Cherry can help with
                      veneers, Invisalign, whitening, implants, and larger treatment plans.
                    </p>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      The page stays intentionally simple. Use the Cherry financing button when it
                      appears, open the full payment plans page if you want more guidance, or keep
                      going and book now if you already know you want to talk with the team.
                    </p>
                    <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                      <Button asChild>
                        <Link to={PAYMENT_PLANS_PATH}>Open Payment Plans</Link>
                      </Button>
                      <Button asChild variant="outline">
                        <a href="#book-online">Continue to Booking</a>
                      </Button>
                    </div>
                  </div>

                  <div className="min-w-0">
                    <CherryPaymentPlansWidget variant="preview" />
                  </div>
                </div>
              </div>

              <div className="mt-14" id="book-online">
                <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
                  Book Online
                </h2>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  If the scheduler doesn’t load,{" "}
                  <a
                    href={SCHEDULING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary underline underline-offset-4 hover:no-underline"
                  >
                    open booking in a new tab
                  </a>{" "}
                  or call{" "}
                  <PhoneLink
                    phoneNumber={PHONE_NUMBER_DISPLAY}
                    className="text-secondary underline underline-offset-4 hover:no-underline"
                  >
                    {PHONE_NUMBER_DISPLAY}
                  </PhoneLink>
                  .
                </p>

                <div className="mt-4">
                  <a
                    href={SCHEDULING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-secondary underline underline-offset-4 hover:no-underline"
                  >
                    Open scheduling in a new tab
                  </a>
                </div>

                <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
                  <iframe
                    title="Online scheduling"
                    src={SCHEDULING_URL}
                    className="w-full h-[900px]"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ScheduleConsultation;
