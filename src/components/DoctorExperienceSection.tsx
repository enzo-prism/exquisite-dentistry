import React from "react";
import { Link } from "react-router-dom";

import ImageComponent from "@/components/Image";
import { Button } from "@/components/ui/button";
import type { DoctorExperienceSectionConfig } from "@/data/locationPages";
import { cn } from "@/lib/utils";

interface DoctorExperienceSectionProps {
  config: DoctorExperienceSectionConfig;
}

const isHttpUrl = (href: string) => /^https?:\/\//i.test(href);

const DoctorExperienceSection: React.FC<DoctorExperienceSectionProps> = ({ config }) => {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16 md:py-20" id="doctor">
      <div className={cn("grid gap-10 lg:grid-cols-2 lg:items-center", config.image ? "" : "lg:grid-cols-1")}>
        {config.image ? (
          <div className="mx-auto w-full max-w-sm lg:max-w-none">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-border bg-muted/20 shadow-sm">
              <ImageComponent
                src={config.image.src}
                alt={config.image.alt}
                fill={true}
                objectFit="cover"
                objectPosition="center"
                priority={true}
              />
            </div>
          </div>
        ) : null}

        <div className="rounded-3xl border border-border bg-background p-8 shadow-sm">
          {config.eyebrow ? (
            <p className="text-sm uppercase tracking-[0.4em] text-primary">{config.eyebrow}</p>
          ) : null}
          <h2 className={cn("text-3xl font-semibold", config.eyebrow ? "mt-3" : "")}>{config.heading}</h2>

          <div className="mt-4 space-y-4 text-lg text-muted-foreground">
            {config.paragraphs.filter(Boolean).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          {config.highlights?.length ? (
            <ul className="mt-8 space-y-3 text-muted-foreground">
              {config.highlights.map((item) => (
                <li key={item} className="flex gap-3 rounded-2xl border border-border/60 bg-muted/20 p-4">
                  <span
                    className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : null}

          {config.cta ? (
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="w-full sm:w-auto">
                {config.cta.primaryHref.startsWith("/") ? (
                  <Link to={config.cta.primaryHref}>{config.cta.primaryText}</Link>
                ) : (
                  <a
                    href={config.cta.primaryHref}
                    target={isHttpUrl(config.cta.primaryHref) ? "_blank" : undefined}
                    rel={isHttpUrl(config.cta.primaryHref) ? "noopener noreferrer" : undefined}
                  >
                    {config.cta.primaryText}
                  </a>
                )}
              </Button>

              {config.cta.secondaryText && config.cta.secondaryHref ? (
                <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                  {config.cta.secondaryHref.startsWith("/") ? (
                    <Link to={config.cta.secondaryHref}>{config.cta.secondaryText}</Link>
                  ) : (
                    <a
                      href={config.cta.secondaryHref}
                      target={isHttpUrl(config.cta.secondaryHref) ? "_blank" : undefined}
                      rel={isHttpUrl(config.cta.secondaryHref) ? "noopener noreferrer" : undefined}
                    >
                      {config.cta.secondaryText}
                    </a>
                  )}
                </Button>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default DoctorExperienceSection;
