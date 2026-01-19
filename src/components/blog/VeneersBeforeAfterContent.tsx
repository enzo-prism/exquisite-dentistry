import React, { useMemo } from 'react';
import { patientTransformations } from '@/data/patientTransformations';
import { closeUpTransformations } from '@/data/closeUpTransformations';
import PatientTransformationCard from '@/components/PatientTransformation';
import CloseUpTransformationCard from '@/components/CloseUpTransformation';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { SCHEDULE_CONSULTATION_PATH } from '@/constants/urls';
import { PHONE_NUMBER_DISPLAY, PHONE_NUMBER_E164 } from '@/constants/contact';

const VeneersBeforeAfterContent = () => {
  const sectionContainer = 'max-w-5xl mx-auto px-4';
  const wideContainer = 'max-w-6xl mx-auto px-4';

  const veneerTransformations = useMemo(() => {
    return patientTransformations
      .filter(patient => /veneers|smile/i.test(patient.procedure))
      .slice(0, 3)
      .map((patient, index) => ({
        ...patient,
        name: `Veneer Case ${index + 1}`
      }));
  }, []);

  const closeUpHighlights = useMemo(() => closeUpTransformations.slice(0, 3), []);

  return (
    <>
      <section className={`${sectionContainer} py-12 md:py-16 space-y-12`}>
        <div>
          <h2 className="text-3xl font-semibold mb-4">Why Before-and-After Veneer Photos Matter</h2>
          <p className="text-gray-600 mb-8 max-w-3xl">
            You should see the work before you trust a cosmetic dentist. The gallery proves whether the artistry is
            natural, balanced, and modern—not exaggerated or overdone.
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: 'Proof over promises',
                text: 'Anyone can make claims. Real photos confirm finish, proportions, and polish.'
              },
              {
                title: 'Understand stylistic fit',
                text: 'Each practice has an aesthetic. The Exquisite Dentistry look is refined, luminous, and natural-forward.'
              },
              {
                title: 'Evaluate micro-details',
                text: 'Look for translucency, smooth smile arcs, and gum harmony—the subtle cues of premium veneers.'
              }
            ].map(item => (
              <div key={item.title} className="bg-slate-50 border border-slate-100 rounded-xl p-6 h-full shadow-sm">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-semibold mb-4">What Porcelain Veneers Can Improve</h2>
          <p className="text-gray-600 mb-6 max-w-3xl">
            Without referencing any individual patient, the smile gallery already proves veneers can handle the most
            common cosmetic priorities.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Whiter, brighter enamel that stays stable for years</li>
              <li>Smoother, more uniform tooth edges and contours</li>
              <li>Improved width, fullness, and midline alignment</li>
              <li>Visually corrected spacing, minor rotation, and uneven angling</li>
            </ul>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Custom color palettes ranging from soft ivory to high-gloss white</li>
              <li>Balanced left-to-right proportions that feel intentional</li>
              <li>Cleaner gumline transitions for a healthier frame</li>
              <li>Lifelike texture that reflects light like natural enamel</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-14 md:py-20">
        <div className={`${wideContainer}`}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
            <div>
              <p className="text-sm font-semibold text-primary mb-2">Veneer Transformations</p>
              <h2 className="text-3xl font-semibold">Real Cases, Anonymous Presentation</h2>
              <p className="text-gray-600 mt-3 max-w-2xl">
                Each slider below pulls directly from our in-house smile gallery with names anonymized. Focus on the
                luminance, symmetry, and edge refinement.
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/smile-gallery/">Browse Full Smile Gallery</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {veneerTransformations.map(transformation => (
              <PatientTransformationCard key={transformation.beforeImage} patient={transformation} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className={`${wideContainer}`}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
            <div>
              <p className="text-sm font-semibold text-primary mb-2">Detail Study</p>
              <h2 className="text-3xl font-semibold">Up Close Veneer Precision</h2>
              <p className="text-gray-600 mt-3 max-w-2xl">
                Layering, translucency, and incisal texture are easiest to see up close. These cases show how veneers can
                refine chips, gaps, and worn edges without resorting to bulky shapes.
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/smile-gallery/#smile-gallery-sliders">View More Close-Ups</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {closeUpHighlights.map(transformation => (
              <CloseUpTransformationCard key={transformation.id} transformation={transformation} />
            ))}
          </div>
        </div>
      </section>

      <section className={`${sectionContainer} py-12 md:py-16 space-y-12`}>
        <div className="space-y-6">
          <h2 className="text-3xl font-semibold">How These Transformations Stay Natural</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: 'Conservative aesthetic',
                text: 'Teeth retain natural character. The goal is a believable enhancement—not a copy-and-paste smile.'
              },
              {
                title: 'Shade & face harmony',
                text: 'Shades are selected for skin tone, lip tone, and personality so the smile fits effortlessly.'
              },
              {
                title: 'Precision smile design',
                text: 'Smile arcs, midlines, and tooth lengths are planned digitally before porcelain is fabricated.'
              },
              {
                title: 'Attention to micro-details',
                text: 'Line angles, edge definition, texture, and translucency are refined so veneers mirror enamel.'
              }
            ].map(item => (
              <div key={item.title} className="bg-white shadow-sm border border-slate-100 rounded-xl p-6 h-full">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-semibold mb-4">What to Expect from Veneers in Los Angeles</h2>
          <p className="text-gray-600 mb-4 max-w-3xl">
            Patients choose porcelain veneers for confidence, symmetry, youthful energy, and long-term stain resistance.
            Common treatment ranges are 2, 4, 6, or 8+ veneers depending on how many teeth show when you smile—something
            your consultation will determine precisely.
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Bright, stable color that will not fade like natural enamel</li>
            <li>Custom shapes that fit your personality and profession</li>
            <li>Improved proportions and subtle alignment adjustments</li>
            <li>Thorough planning for long-term comfort and maintenance</li>
          </ul>
        </div>

        <div>
          <h2 className="text-3xl font-semibold mb-6">Veneer FAQs</h2>
          <div className="space-y-4">
            {[
              {
                q: 'Do veneers look fake?',
                a: 'Not when designed with layered porcelain, natural texture, and a shade tailored to you—as seen throughout the gallery.'
              },
              {
                q: 'Can veneers close gaps or fix chips?',
                a: 'Yes. Minor spacing, chips, or uneven lengths are some of the most common improvements in the sliders above.'
              },
              {
                q: 'How many veneers will I need?',
                a: 'Most clients choose 4-8 veneers to cover the entire smile zone, but some opt for just 2 strategic veneers. The consultation defines the ideal number.'
              },
              {
                q: 'Are veneers only for celebrities?',
                a: 'No. Most patients request subtle, camera-ready upgrades that feel authentic, not flashy.'
              }
            ].map(item => (
              <div key={item.q} className="border border-slate-200 rounded-lg p-4">
                <p className="font-semibold text-gray-900">{item.q}</p>
                <p className="text-gray-600 mt-2">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-primary/10 via-white to-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <p className="text-sm font-semibold tracking-wide text-primary">Ready to see your options?</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Start Your Smile Transformation</h2>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto">
            The gallery shows what is possible. A one-on-one consultation with Dr. Alexie Aguil delivers your custom
            veneer count, quote, and smile preview—without guesswork or pressure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to={SCHEDULE_CONSULTATION_PATH}>Schedule Consultation</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/veneers/front-teeth-veneers-los-angeles/">
                Review Veneer Pricing Guides
              </Link>
            </Button>
          </div>
          <p className="text-sm text-gray-500">
            Prefer to talk it through? Call{' '}
            <a href={`tel:${PHONE_NUMBER_E164}`} className="text-primary">
              {PHONE_NUMBER_DISPLAY}
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
};

export default VeneersBeforeAfterContent;
