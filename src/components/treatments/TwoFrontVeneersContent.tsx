import React from 'react';
import { TWO_FRONT_VENEERS } from '../../data/twoFrontVeneers';
import { consultationHref } from '../../data/consultation';
import { Button } from '../ui/button';

/** Pure, deterministic markup: render the same page for crawlers and patients. */
export default function TwoFrontVeneersContent() {
  return (
    <div data-shared-treatment="two-front-veneers" className="bg-background">
      <section className="bg-gradient-to-b from-gold/10 to-white py-12 md:py-20">
        <div className="section-container max-w-5xl">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
            <a href="/" className="underline">Home</a> / <a href="/veneers/" className="underline">Porcelain veneers</a> / Two front teeth cost
          </nav>
          <p className="text-sm font-semibold uppercase tracking-widest text-secondary">Two-tooth veneer planning</p>
          <h1 className="mt-4 text-3xl font-bold leading-tight text-foreground md:text-5xl">{TWO_FRONT_VENEERS.h1}</h1>
          <p data-cost-answer className="mt-6 max-w-3xl text-lg leading-relaxed text-foreground">{TWO_FRONT_VENEERS.answer}</p>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">{TWO_FRONT_VENEERS.introduction}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild className="min-h-11"><a href={consultationHref('porcelain-veneers')} data-analytics-source="two_front_veneers_consultation">Plan a veneers consultation</a></Button>
            <Button asChild variant="outline" className="min-h-11"><a href="/veneers/">Explore porcelain veneers</a></Button>
          </div>
        </div>
      </section>
      <div className="section-container max-w-5xl py-12 md:py-16">
        {TWO_FRONT_VENEERS.sections.map((section) => (
          <section key={section.heading} className="mb-10 max-w-3xl">
            <h2 className="mb-4 text-2xl font-semibold text-foreground">{section.heading}</h2>
            {section.paragraphs.map((paragraph) => <p key={paragraph} className="mb-4 leading-relaxed text-muted-foreground">{paragraph}</p>)}
            {'bullets' in section && <ul className="mb-4 list-disc space-y-2 pl-6 text-muted-foreground">{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
            {'links' in section && <ul className="space-y-2">{section.links.map((link) => <li key={link.href}><a className="inline-flex min-h-11 items-center text-secondary underline underline-offset-4" href={link.href}>{link.label}</a></li>)}</ul>}
          </section>
        ))}
        <section className="max-w-3xl">
          <h2 className="mb-5 text-2xl font-semibold">Questions about two front teeth veneers</h2>
          {TWO_FRONT_VENEERS.faqItems.map((item) => <details className="mb-3 rounded-lg border p-4" key={item.question}><summary className="cursor-pointer font-medium">{item.question}</summary><p className="mt-3 leading-relaxed text-muted-foreground">{item.answer}</p></details>)}
        </section>
      </div>
    </div>
  );
}
