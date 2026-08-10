import React from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageSEO from "@/components/seo/PageSEO";
import WebPageStructuredData from "@/components/WebPageStructuredData";
import { Button } from "@/components/ui/button";
import PhoneLink from "@/components/PhoneLink";
import { PHONE_NUMBER_DISPLAY } from "@/constants/contact";
import { CHERRY_CREDIT_REPORTING_DISCLOSURE } from "@/constants/cherry";
import { useCherryWidgetRegistration } from "@/hooks/use-cherry-widget-registration";
import { INSURANCE_PATH, PAYMENT_PLANS_PATH, SCHEDULING_URL } from "@/constants/urls";
import { ROUTE_METADATA } from "@/constants/metadata";
import { INSURANCE_PAGE_LINKS } from "@/data/insurance";

const ScheduleConsultation = () => {
  const meta = ROUTE_METADATA["/schedule-consultation"];

  useCherryWidgetRegistration({ enabled: true });

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
                <Button asChild variant="outline" className="w-full sm:w-auto">
                  <Link to={INSURANCE_PAGE_LINKS.contact}>Verify Insurance</Link>
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

              <div className="mt-10" id="book-online">
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
                    className="inline-flex min-h-6 items-center text-sm font-semibold text-secondary underline underline-offset-4 hover:no-underline"
                  >
                    Open scheduling in a new tab
                  </a>
                </div>

                <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
                  <iframe
                    title="Online scheduling"
                    src={SCHEDULING_URL}
                    className="block w-full h-[calc(100svh-8rem)] min-h-[560px] md:h-[900px]"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>

              <details className="group mt-10 rounded-2xl border border-gold/20 bg-stone-50 p-5 md:p-6">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 font-semibold text-foreground">
                  <span>Financing and insurance options</span>
                  <span className="text-xl text-secondary transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                </summary>
                <div className="mt-4 border-t border-gold/15 pt-5">
                  <p className="leading-relaxed text-muted-foreground">
                    If cost is part of your decision, you can review Cherry payment plans or check insurance after booking.
                  </p>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {CHERRY_CREDIT_REPORTING_DISCLOSURE}
                  </p>
                  <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <Button asChild>
                      <Link to={PAYMENT_PLANS_PATH}>Open Payment Plans</Link>
                    </Button>
                    <Button asChild variant="outline">
                      <Link to={INSURANCE_PATH}>Insurance Options</Link>
                    </Button>
                  </div>
                </div>
              </details>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ScheduleConsultation;
