import React from 'react';
import { Link } from 'react-router-dom';
import { Award, GraduationCap, HeartHandshake, MessagesSquare, ShieldCheck } from 'lucide-react';
import PageSEO from '@/components/seo/PageSEO';
import MasterStructuredData from '@/components/seo/MasterStructuredData';
import ImageComponent from '@/components/Image';
import WrittenReviewCard from '@/components/reviews/WrittenReviewCard';
import { Button } from '@/components/ui/button';
import { drAguilImages } from '@/data/drAguilImages';
import { filterReviewsByTheme, taggedFeaturedReviews } from '@/data/reviewThemes';
import { ROUTE_METADATA } from '@/constants/metadata';
import { SCHEDULE_CONSULTATION_PATH } from '@/constants/urls';
import { getCanonicalUrl } from '@/utils/schemaValidation';

const TEAM_REVIEWS = filterReviewsByTheme(taggedFeaturedReviews, 'team').slice(0, 6);

const TeamExcellence: React.FC = () => {
  const meta = ROUTE_METADATA['/why-us/team-excellence'];

  return (
    <>
      <MasterStructuredData
        includeBusiness
        includeDoctor
        includeWebsite
        additionalSchemas={[
          {
            '@context': 'https://schema.org',
            '@type': 'AboutPage',
            '@id': getCanonicalUrl('/why-us/team-excellence#page'),
            name: meta.title,
            description: meta.description,
            url: getCanonicalUrl('/why-us/team-excellence'),
            isPartOf: { '@id': 'https://exquisitedentistryla.com/#website' },
            about: { '@id': 'https://exquisitedentistryla.com/#business' },
            mainEntity: { '@id': 'https://exquisitedentistryla.com/#doctor' }
          }
        ]}
      />
      <PageSEO
        title={meta.title}
        description={meta.description}
        keywords={meta.keywords}
        path="/why-us/team-excellence"
        ogImage={meta.ogImage}
      />

      <header className="bg-black py-20 text-white md:py-28">
        <div className="section-container grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.32em] text-gold">
              Team Excellence
            </p>
            <h1 className="text-4xl font-semibold leading-tight md:text-6xl">
              Skilled care feels better when the whole team communicates.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80">
              Dr. Alexie Aguil and the Exquisite Dentistry team pair careful treatment planning with a calm setting, clear explanations, and thoughtful follow-through.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button className="bg-gold text-black hover:bg-gold/90" asChild>
                <Link to={SCHEDULE_CONSULTATION_PATH}>Schedule Consultation</Link>
              </Button>
              <Button variant="outline" className="border-white/40 text-white hover:bg-white hover:text-black" asChild>
                <Link to="/testimonials/">Read Patient Reviews</Link>
              </Button>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl">
            <ImageComponent
              src={drAguilImages.patientConsultation.src}
              alt={drAguilImages.patientConsultation.alt}
              className="aspect-[4/3] h-full w-full object-cover"
              responsive
            />
          </div>
        </div>
      </header>

      <section className="py-16 md:py-24">
        <div className="section-container grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div className="overflow-hidden rounded-2xl bg-gray-100">
            <ImageComponent
              src={drAguilImages.clinicalPortrait.src}
              alt={drAguilImages.clinicalPortrait.alt}
              className="aspect-[3/4] h-full w-full object-cover"
              responsive
            />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-dark">Clinical Leadership</p>
            <h2 className="mt-3 text-3xl font-semibold md:text-5xl">Dr. Alexie Aguil</h2>
            <p className="mt-2 text-lg font-medium text-black/65">Founder &amp; Lead Dentist</p>
            <p className="mt-6 text-lg leading-8 text-black/75">
              Dr. Aguil is a UCLA School of Dentistry graduate with more than a decade of experience in cosmetic and restorative dentistry. His planning focuses on proportion, shade, facial balance, comfort, and long-term oral health.
            </p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              <li className="flex gap-3 rounded-xl border border-black/10 p-4">
                <GraduationCap className="mt-0.5 h-5 w-5 shrink-0 text-gold-dark" aria-hidden="true" />
                <span>UCLA School of Dentistry graduate</span>
              </li>
              <li className="flex gap-3 rounded-xl border border-black/10 p-4">
                <Award className="mt-0.5 h-5 w-5 shrink-0 text-gold-dark" aria-hidden="true" />
                <span>Invisalign Lifetime Achievement Award provider</span>
              </li>
              <li className="flex gap-3 rounded-xl border border-black/10 p-4 sm:col-span-2">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-gold-dark" aria-hidden="true" />
                <span>Member of the American Academy of Cosmetic Dentistry</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 md:py-24">
        <div className="section-container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-dark">How We Work</p>
            <h2 className="mt-3 text-3xl font-semibold md:text-5xl">A coordinated experience from hello to follow-up</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: MessagesSquare,
                title: 'Clear explanations',
                body: 'The team makes room for questions and explains options, timing, and next steps in plain language.'
              },
              {
                icon: HeartHandshake,
                title: 'Comfort by design',
                body: 'A calm setting, gentle care, and an unhurried approach help patients know what to expect.'
              },
              {
                icon: ShieldCheck,
                title: 'Thoughtful follow-through',
                body: 'Treatment planning and aftercare stay connected so the experience feels organized from consultation onward.'
              }
            ].map(({ icon: Icon, title, body }) => (
              <article key={title} className="rounded-2xl border border-black/10 bg-white p-7 shadow-sm">
                <Icon className="h-7 w-7 text-gold-dark" aria-hidden="true" />
                <h3 className="mt-5 text-xl font-semibold">{title}</h3>
                <p className="mt-3 leading-7 text-black/70">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="section-container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-dark">In Patients&apos; Words</p>
            <h2 className="mt-3 text-3xl font-semibold md:text-5xl">Reviews that mention the team</h2>
            <p className="mt-4 text-black/65">Selected from the written reviews already published on this site.</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {TEAM_REVIEWS.map((review) => (
              <WrittenReviewCard key={`${review.name}-${review.quote}`} review={review} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button variant="outline" asChild>
              <Link to="/testimonials/">Explore All Published Reviews</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default TeamExcellence;
