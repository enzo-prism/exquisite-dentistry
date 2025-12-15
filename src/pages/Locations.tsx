import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '@/components/Breadcrumbs';
import PageSEO from '@/components/seo/PageSEO';
import WebPageStructuredData from '@/components/WebPageStructuredData';
import PhoneLink from '@/components/PhoneLink';
import { Button } from '@/components/ui/button';
import { ADDRESS, PHONE_NUMBER_DISPLAY } from '@/constants/contact';
import { GOOGLE_MAPS_SHORT_URL } from '@/constants/urls';
import { ROUTE_METADATA } from '@/constants/metadata';

const LOCATIONS = [
  { label: 'Beverly Hills Dentist', to: '/beverly-hills-dentist/' },
  { label: 'West Hollywood Dentist', to: '/west-hollywood-dentist/' },
  { label: 'Culver City Dentist', to: '/culver-city-dentist/' },
  { label: 'West LA Dentist', to: '/west-la-dentist/' },
  { label: 'Bel Air Dentist', to: '/bel-air-dentist/' },
  { label: '90048 Dentist', to: '/90048-dentist/' },
  { label: 'Melrose Dentist', to: '/melrose-dentist/' },
  { label: 'Westwood Dentist', to: '/westwood-dentist/' }
] as const;

const Locations = () => {
  const meta = ROUTE_METADATA['/locations'];

  return (
    <>
      <PageSEO
        title={meta.title}
        description={meta.description}
        keywords={meta.keywords}
        path="/locations"
        ogImage={meta.ogImage}
      />
      <WebPageStructuredData
        title="Locations"
        description={meta.description}
        url="https://exquisitedentistryla.com/locations"
        breadcrumbs={[{ name: 'Locations', url: 'https://exquisitedentistryla.com/locations/' }]}
      />

      <div className="min-h-screen bg-background">
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Breadcrumbs items={[{ label: 'Locations', to: '/locations/' }]} className="mb-6" />

              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                Locations
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Exquisite Dentistry is located on Wilshire Blvd in Los Angeles, a quick drive
                from Beverly Hills and nearby neighborhoods. Use the links below to explore
                concierge dental care by area.
              </p>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                Address: {ADDRESS}. Call{' '}
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
                  <Link to="/schedule-consultation/">Schedule Consultation</Link>
                </Button>
                <Button variant="outline" asChild className="w-full sm:w-auto">
                  <a href={GOOGLE_MAPS_SHORT_URL} target="_blank" rel="noopener noreferrer">
                    Get Directions
                  </a>
                </Button>
              </div>

              <div className="mt-12 grid gap-3 sm:grid-cols-2">
                {LOCATIONS.map((location) => (
                  <Link
                    key={location.to}
                    to={location.to}
                    className="flex items-center justify-between rounded-2xl border border-border bg-muted/20 px-5 py-4 text-foreground transition hover:border-secondary hover:bg-secondary/5"
                  >
                    <span className="font-semibold">{location.label}</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Locations;
