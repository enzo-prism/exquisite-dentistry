import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Clock, Navigation } from "lucide-react";

import { Button } from "@/components/ui/button";
import PhoneLink from "@/components/PhoneLink";
import type { PracticeLocationSectionConfig } from "@/data/locationPages";
import {
  BUSINESS_HOURS,
  PHONE_NUMBER_DISPLAY,
  STREET_ADDRESS,
  ADDRESS_LOCALITY,
  ADDRESS_REGION,
  POSTAL_CODE,
} from "@/constants/contact";
import { GOOGLE_MAPS_SHORT_URL, SCHEDULE_CONSULTATION_PATH } from "@/constants/urls";

interface PracticeLocationSectionProps {
  config: PracticeLocationSectionConfig;
}

const DEFAULT_MAP_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.7467390070256!2d-118.3650287!3d34.063844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2b93cca04c0c3%3A0x98b9bda196f7b6bf!2s6227%20Wilshire%20Blvd%2C%20Los%20Angeles%2C%20CA%2090048!5e0!3m2!1sen!2sus!4v1653485691058!5m2!1sen!2sus";

const PracticeLocationSection: React.FC<PracticeLocationSectionProps> = ({ config }) => {
  const directionsHref = config.directionsHref || GOOGLE_MAPS_SHORT_URL;
  const mapEmbedSrc = config.mapEmbedSrc || DEFAULT_MAP_EMBED_SRC;

  return (
    <section className="mx-auto max-w-5xl px-4 py-16 md:py-20" id="location">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
        <div className="rounded-3xl border border-border bg-muted/20 p-8">
          <p className="text-sm uppercase tracking-[0.4em] text-primary">Location</p>
          <h2 className="mt-3 text-3xl font-semibold">{config.heading}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{config.description}</p>

          {config.highlights?.length ? (
            <ul className="mt-6 space-y-3 text-muted-foreground">
              {config.highlights.map((item) => (
                <li key={item} className="flex gap-3 rounded-2xl border border-border/60 bg-background/60 p-4">
                  <span className="mt-0.5 text-primary" aria-hidden="true">
                    •
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : null}

          <div className="mt-8 space-y-4">
            <div className="rounded-2xl border border-border bg-background/60 p-5">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 text-primary" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold text-foreground">Address</p>
                  <a
                    href={directionsHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-block text-muted-foreground hover:text-foreground"
                  >
                    {STREET_ADDRESS}
                    <br />
                    {ADDRESS_LOCALITY}, {ADDRESS_REGION} {POSTAL_CODE}
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-background/60 p-5">
              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 h-5 w-5 text-primary" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold text-foreground">Phone</p>
                  <PhoneLink phoneNumber={PHONE_NUMBER_DISPLAY} className="mt-1 inline-block text-muted-foreground hover:text-foreground">
                    {PHONE_NUMBER_DISPLAY}
                  </PhoneLink>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-background/60 p-5">
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-5 w-5 text-primary" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold text-foreground">Hours</p>
                  <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                    {BUSINESS_HOURS.map(({ label, value }) => (
                      <li key={label} className="flex items-center justify-between gap-4">
                        <span>{label}</span>
                        <span className="font-medium text-foreground/90">{value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link to={SCHEDULE_CONSULTATION_PATH}>Schedule Consultation</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
              <a href={directionsHref} target="_blank" rel="noopener noreferrer">
                <span className="inline-flex items-center gap-2">
                  <Navigation className="h-4 w-4" aria-hidden="true" />
                  Get Directions
                </span>
              </a>
            </Button>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-border bg-muted/20">
          <div className="aspect-video bg-muted/30">
            <iframe
              src={mapEmbedSrc}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Exquisite Dentistry location map"
            />
          </div>
          <div className="border-t border-border/60 p-6 text-sm text-muted-foreground">
            <p>
              Prefer to plan your route first? Open the live map for turn-by-turn directions and parking details.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PracticeLocationSection;

