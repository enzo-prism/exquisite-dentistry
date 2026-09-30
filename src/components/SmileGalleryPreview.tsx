import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import PatientTransformationCard from '@/components/PatientTransformation';
import { patientTransformations } from '@/data/patientTransformations';

const SmileGalleryPreview = () => (
  <section className="bg-gray-50 py-10 md:py-14" aria-label="Real patient results">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto mb-8 max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-dark">Real patient results</p>
        <h2 className="mt-3 text-2xl font-semibold md:text-3xl">Compare smile transformations</h2>
        <p className="mt-4 text-base leading-7 text-gray-600">Explore veneers, alignment, and combined treatments. Drag a comparison or use the arrow keys when it has focus. Results vary by patient.</p>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {patientTransformations.slice(0, 3).map((patient) => (
          <PatientTransformationCard key={patient.name} patient={patient} />
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <Button asChild variant="outline" size="lg">
          <Link to="/smile-gallery/">Browse cases by treatment <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" /></Link>
        </Button>
      </div>
    </div>
  </section>
);

export default SmileGalleryPreview;
