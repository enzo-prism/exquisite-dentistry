import React from 'react';
import { Link } from 'react-router-dom';
import { PageSEO } from '@/components/seo/PageSEO';
import MasterStructuredData from '@/components/seo/MasterStructuredData';
import MedicalProcedureStructuredData from '@/components/seo/MedicalProcedureStructuredData';
import { Button } from '@/components/ui/button';
import { SCHEDULE_CONSULTATION_PATH } from '@/constants/urls';
import { trackCTAClick } from '@/utils/googleAdsTracking';

const OneToothVeneerLosAngeles = () => {
  return (
    <>
      <MasterStructuredData includeBusiness includeWebsite />
      <PageSEO
        title="1 Tooth Veneer in Los Angeles | Natural Match & Smile Design"
        description="Need to fix one front tooth? Learn when a single veneer is ideal, how shade matching works, and what to expect at Exquisite Dentistry."
        keywords="1 tooth veneer, single tooth veneer, 1 veneer tooth, veneer front tooth, los angeles veneer dentist"
        path="/veneers/1-tooth-veneer-los-angeles"
      />

      <MedicalProcedureStructuredData
        procedureName="Single Tooth Veneer"
        description="Single front-tooth veneer treatment in Los Angeles with precise shade and shape matching."
        url="/veneers/1-tooth-veneer-los-angeles"
        procedureType="Cosmetic Dental Procedure"
        bodyLocation="Single front tooth"
        steps={[
          { name: 'Consultation', description: 'Assess candidacy and compare veneer vs bonding/crown options.' },
          { name: 'Design', description: 'Precise shade and shape match planning against adjacent teeth.' },
          { name: 'Placement', description: 'Custom veneer bonding with bite and esthetic refinement.' }
        ]}
      />

      <div className="min-h-screen bg-background">
        <section className="py-16 md:py-24 bg-gradient-to-b from-gold/10 to-white">
          <div className="max-w-5xl mx-auto px-4">
            <p className="uppercase tracking-[0.2em] text-secondary font-semibold text-sm">Single-Tooth Veneers</p>
            <h1 className="mt-4 text-4xl md:text-5xl font-bold text-foreground">Single Tooth Veneer in Los Angeles</h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-3xl">
              A single veneer can be the right solution when one front tooth is chipped, discolored, or misshapen. The key is precise shade and shape matching so your smile stays natural.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <Link to={SCHEDULE_CONSULTATION_PATH} onClick={() => trackCTAClick('veneers_single_tooth_book_click', 'Book a Single-Tooth Consult')}>
                  Book a Single-Tooth Consult
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/veneers-los-angeles/" onClick={() => trackCTAClick('veneers_single_tooth_pillar_click', 'View Veneers Overview')}>
                  View Veneers Overview
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-14 bg-background">
          <div className="max-w-5xl mx-auto px-4 grid gap-8">
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-3">When one veneer is a strong fit</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Only one visible tooth needs cosmetic correction</li>
                <li>Adjacent teeth are healthy and esthetically balanced</li>
                <li>Bite and enamel condition support a conservative approach</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-3">Single veneer vs bonding vs crown</h2>
              <p className="text-muted-foreground">Single veneers are often best for high-end esthetics and durability. Bonding may be lower upfront cost; crowns may be better if structure is significantly compromised.</p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-3">Related pages</h2>
              <div className="flex flex-col gap-2 text-secondary">
                <Link to="/veneers/2-front-teeth-veneers-cost-los-angeles/">Cost of 2 Front Teeth Veneers in Los Angeles</Link>
                <Link to="/veneers/front-teeth-veneers-los-angeles/">Front Teeth Veneers in Los Angeles</Link>
                <Link to="/veneers-los-angeles/">Porcelain Veneers Los Angeles (Pillar)</Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default OneToothVeneerLosAngeles;
