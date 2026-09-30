import { Link } from 'react-router-dom';
import ImageComponent from '@/components/Image';
import { featuredReviews } from '@/data/featuredReviews';

const planningReview = featuredReviews.find((review) => review.name === 'Nik Nak');

/** A compact introduction keeps the dentist and a real patient voice near the first action. */
const HomepageDoctorProof = () => (
  <section className="border-b border-gold/20 bg-white py-8 md:py-10" aria-label="Meet your dentist">
    <div className="mx-auto grid max-w-6xl grid-cols-[96px_minmax(0,1fr)] items-start gap-5 px-4 sm:grid-cols-[144px_minmax(0,1fr)] sm:gap-8 lg:grid-cols-[160px_minmax(0,1fr)_minmax(0,1fr)] lg:items-center">
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
        <ImageComponent
          src="/lovable-uploads/7fc03f27-6c3a-4d2a-bba6-961af127a9f0.webp"
          alt="Dr. Alexie Aguil"
          fill
          objectFit="cover"
          objectPosition="center"
        />
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-dark">Your dentist in Los Angeles</p>
        <h2 className="mt-2 text-xl font-semibold sm:text-2xl">Meet Dr. Alexie Aguil</h2>
        <p className="mt-3 text-sm leading-6 text-gray-600">Discuss your goals, compare treatment options, and plan a smile that feels like you.</p>
        <Link to="/about/" className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-gold-dark underline underline-offset-4">About Dr. Aguil</Link>
      </div>
      {planningReview?.quote && (
        <figure className="col-span-2 border-t border-gold/20 pt-5 lg:col-span-1 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          <blockquote className="text-base leading-7 text-gray-700">“{planningReview.quote}”</blockquote>
          <figcaption className="mt-3 text-sm text-gray-600">{planningReview.name}, patient review</figcaption>
          <Link to="/testimonials/" className="mt-2 inline-flex min-h-11 items-center text-sm font-semibold text-gold-dark underline underline-offset-4">Read patient experiences</Link>
        </figure>
      )}
    </div>
  </section>
);

export default HomepageDoctorProof;
