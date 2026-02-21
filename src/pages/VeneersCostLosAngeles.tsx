import React from 'react';
import { Link } from 'react-router-dom';
import { PageSEO } from '@/components/seo/PageSEO';
import MasterStructuredData from '@/components/seo/MasterStructuredData';
import MedicalProcedureStructuredData from '@/components/seo/MedicalProcedureStructuredData';
import { Button } from '@/components/ui/button';
import { SCHEDULE_CONSULTATION_PATH } from '@/constants/urls';
import { trackCTAClick } from '@/utils/googleAdsTracking';

const VeneersCostLosAngeles = () => {
  return (
    <>
      <MasterStructuredData includeBusiness includeWebsite />
      <PageSEO
        title="Cost of 2 Front Teeth Veneers in Los Angeles (2026 Guide)"
        description="Wondering how much 2 front teeth veneers cost in Los Angeles? Learn key pricing factors, treatment options, and next steps at Exquisite Dentistry."
        keywords="2 front teeth veneers cost near me, cost of 2 front teeth veneers, how much are 2 veneers, front teeth veneer cost los angeles"
        path="/veneers/2-front-teeth-veneers-cost-los-angeles"
      />

      <MedicalProcedureStructuredData
        procedureName="2 Front Teeth Veneers"
        description="Pricing and treatment planning for two front teeth veneers in Los Angeles."
        url="/veneers/2-front-teeth-veneers-cost-los-angeles"
        procedureType="Cosmetic Dental Procedure"
        bodyLocation="Front teeth"
        steps={[
          { name: 'Consultation', description: 'Smile goals, exam, and treatment options review.' },
          { name: 'Planning', description: 'Determine whether 2 veneers or a broader smile-zone plan is best.' },
          { name: 'Placement', description: 'Custom veneer placement with bite and esthetic refinement.' }
        ]}
      />

      <div className="min-h-screen bg-background">
        <section className="py-16 md:py-24 bg-gradient-to-b from-gold/10 to-white">
          <div className="max-w-5xl mx-auto px-4">
            <p className="uppercase tracking-[0.2em] text-secondary font-semibold text-sm">Veneers Cost Guide</p>
            <h1 className="mt-4 text-4xl md:text-5xl font-bold text-foreground">How Much Do 2 Front Teeth Veneers Cost in Los Angeles?</h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-3xl">
              If you're comparing the cost of 2 front teeth veneers, the key is not just price. It's natural esthetics, long-term durability, and whether 2 veneers are the right scope for your smile.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <Link to={SCHEDULE_CONSULTATION_PATH} onClick={() => trackCTAClick('veneers_cost_page_book_click', 'Book a Veneers Consultation')}>
                  Book a Veneers Consultation
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/veneers-los-angeles/" onClick={() => trackCTAClick('veneers_cost_page_pillar_click', 'View Veneers Overview')}>
                  View Veneers Overview
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-14 bg-background">
          <div className="max-w-5xl mx-auto px-4 grid gap-8">
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-3">What affects veneer cost most?</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Material and lab quality (porcelain craftsmanship)</li>
                <li>Complexity of shape, shade, and smile-line design</li>
                <li>Existing tooth condition and prep requirements</li>
                <li>Whether 2 veneers are enough or 4+ gives a better match</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-3">2 veneers vs alternatives</h2>
              <p className="text-muted-foreground">Two veneers can be ideal for localized front-tooth correction. In some cases, bonding or crowns may be better depending on structure and long-term goals.</p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-3">Related pages</h2>
              <div className="flex flex-col gap-2 text-secondary">
                <Link to="/veneers/1-tooth-veneer-los-angeles/">Single-Tooth Veneer in Los Angeles</Link>
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

export default VeneersCostLosAngeles;
