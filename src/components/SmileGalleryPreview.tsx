import { ArrowRight, MoveHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import PatientTransformationCard from '@/components/PatientTransformation';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/motion/Reveal';
import { patientTransformations } from '@/data/patientTransformations';

const SmileGalleryPreview = () => (
  <section className="bg-white py-16 md:py-24" aria-label="Real patient results">
    <div className="section-container">
      <SectionHeading
        eyebrow="Real patient results"
        title={<>Compare smile <em>transformations</em></>}
        description="Explore veneers, alignment, and combined treatments. Drag a comparison or use the arrow keys when it has focus. Results vary by patient."
      />
      <Reveal variant="fade" delay={240} className="mt-6 flex items-center justify-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-gray-500">
        <MoveHorizontal className="h-4 w-4 text-gold" aria-hidden="true" />
        Drag to compare
      </Reveal>
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
        {patientTransformations.slice(0, 3).map((patient, index) => (
          // Tablets get two roomy cards; the third returns at desktop widths.
          <Reveal key={patient.name} variant="up" delay={index * 110} className={index === 2 ? 'h-full sm:max-lg:hidden' : 'h-full'}>
            <PatientTransformationCard patient={patient} />
          </Reveal>
        ))}
      </div>
      <Reveal variant="up" className="mt-10 flex justify-center">
        <Button asChild variant="outline" size="lg" className="group h-12 rounded-full px-7">
          <Link to="/smile-gallery/">
            Browse cases by treatment
            <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </Button>
      </Reveal>
    </div>
  </section>
);

export default SmileGalleryPreview;
