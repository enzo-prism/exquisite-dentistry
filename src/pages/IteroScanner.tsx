import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageSEO from '@/components/seo/PageSEO';
import MasterStructuredData from '@/components/seo/MasterStructuredData';
import { Button } from '@/components/ui/button';
import { OptimizedImage } from '@/components/seo';
import { Check, Sparkles, Cpu } from 'lucide-react';
import { SCHEDULE_CONSULTATION_PATH } from '@/constants/urls';
import { getCanonicalUrl } from '@/utils/schemaValidation';

const heroImage = '/lovable-uploads/0cf5c270-9dc6-41f6-9b69-f40a31403033.png';

const IteroScanner = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const canonicalUrl = getCanonicalUrl('/itero-scanner');

  const visitImprovements = [
    {
      title: 'No goopy impressions',
      description: 'Digital scans replace bulky trays, so you can breathe, swallow, and speak comfortably during impressions.'
    },
    {
      title: 'Real-time 3D visualization',
      description: 'Watch a live rendering of your teeth and gums as we glide the scanner, highlighting areas that need care.'
    },
    {
      title: 'Faster Invisalign + restorations',
      description: 'Instant uploads to Align Technology speed up ClinCheck approvals, aligner delivery, and lab-made crowns or veneers.'
    }
  ];

  const patientBenefits = [
    'Micron-level accuracy for Invisalign, crowns, bridges, and veneers.',
    'Comfort-first experience without gagging triggers or messy impression materials.',
    'Visual education that helps you understand bite changes and treatment timelines.',
    'Streamlined appointments and fewer refinements thanks to precise fits.'
  ];

  const deviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalDevice',
    name: 'iTero Element 5D',
    manufacturer: {
      '@type': 'Organization',
      name: 'Align Technology'
    },
    model: 'Element 5D',
    purpose: 'Intraoral digital scanning for Invisalign treatment planning and restorative dentistry',
    url: canonicalUrl,
    isRelatedTo: getCanonicalUrl('/invisalign'),
    image: getCanonicalUrl('/lovable-uploads/0cf5c270-9dc6-41f6-9b69-f40a31403033.png')
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Digital Dental Impressions',
    description: 'Mess-free iTero Element 5D scans that capture bite data for Invisalign, crowns, bridges, and veneers.',
    provider: {
      '@id': 'https://exquisitedentistryla.com/#business'
    },
    serviceType: 'Dental Diagnostic Service',
    areaServed: {
      '@type': 'City',
      name: 'Los Angeles'
    },
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: canonicalUrl
    }
  };

  return (
    <>
      <MasterStructuredData
        includeBusiness={true}
        includeWebsite={true}
        additionalSchemas={[deviceSchema, serviceSchema]}
      />
      <PageSEO
        title="iTero Scanner Los Angeles | Digital Dental Impressions"
        description="Experience precise, mess-free iTero Element 5D scans at Exquisite Dentistry. Preview Invisalign results, accelerate restorations, and enjoy ultra-comfortable visits in Los Angeles."
        keywords="iTero scanner Los Angeles, digital dental impressions, Invisalign technology, iTero Element 5D, intraoral scanner LA"
        path="/itero-scanner"
      />
      <main className="bg-background">
        <section className="bg-gradient-to-br from-black via-slate-900 to-slate-950 text-white py-20">
          <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-gold">
                <span className="block h-2 w-2 rounded-full bg-gold"></span>
                Technology Spotlight
              </span>
              <h1 className="text-4xl md:text-5xl font-bold">Precision Dentistry Powered by iTero 3D Scanning</h1>
              <p className="text-white/80 text-lg leading-relaxed">
                Our iTero Element 5D scanner replaces traditional molds with ultra-fast, comfortable digital imaging.
                The result? Invisalign plans you can preview instantly, plus restorations that seat with exceptional accuracy.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" asChild>
                  <Link to={SCHEDULE_CONSULTATION_PATH}>Schedule Consultation</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/invisalign/">See Invisalign Results</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 rounded-[32px] bg-gradient-to-tr from-gold/30 to-transparent blur-3xl opacity-70" />
              <div className="relative rounded-[28px] border border-gold/30 bg-black/40 p-4 backdrop-blur">
                <OptimizedImage
                  src={heroImage}
                  alt="iTero Element scanner at Exquisite Dentistry"
                  className="rounded-[20px] object-cover w-full h-full"
                  loading="lazy"
                  sizes="(min-width: 1024px) 520px, 90vw"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">What Is the iTero Scanner?</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              The iTero Element 5D is an intraoral imaging system that captures more than 6,000 frames per second,
              stitching them into a highly accurate 3D model of your teeth, gums, and bite.
              No alginate, no powder, and no anxiety, just a quick, breathable scan that translates directly to Invisalign treatment planning and restorative design.
            </p>
          </div>
        </section>

        <section className="py-20 bg-slate-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              {visitImprovements.map((item) => (
                <div key={item.title} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                  <div className="w-12 h-12 rounded-full bg-gold/10 text-gold flex items-center justify-center mb-4">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-3 text-slate-600 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 grid lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-5">
              <span className="uppercase tracking-[0.3em] text-sm text-gold font-semibold">How It Works</span>
              <h2 className="text-3xl font-bold text-gray-900">16-Camera 3D Mapping With Invisalign Intelligence</h2>
              <p className="text-gray-600 leading-relaxed">
                Each scan uses a wand with integrated near-infrared imaging and a 16-camera array.
                As we glide it over your teeth, the iTero software captures every cusp, contact, and gingival margin.
                The scan uploads to Align Technology in real time, allowing Dr. Aguil to refine ClinCheck simulations, design custom attachments, and deliver treatment timelines with remarkable precision.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Beyond Invisalign, the digital model integrates with our CAD/CAM partners for crowns, implant restorations, and veneer wax-ups.
                That means seating appointments are shorter, adjustments are minimal, and your smile design remains perfectly on track.
              </p>
            </div>
            <div className="bg-slate-900 text-white rounded-3xl p-8 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                  <Cpu className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-semibold">Live Comparison Tool</p>
                  <p className="text-sm text-white/70">Overlay scans to track tooth movement and gum health over time.</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-semibold">Colorized Detection</p>
                  <p className="text-sm text-white/70">Spot interproximal caries and wear with near-infrared imaging.</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                  <Check className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-semibold">Seamless Invisalign Sync</p>
                  <p className="text-sm text-white/70">Send scans directly to ClinCheck for same-day treatment previews.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">Patient Benefits</h2>
            <ul className="space-y-4 max-w-3xl mx-auto">
              {patientBenefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-gold mt-1" />
                  <span className="text-gray-700 leading-relaxed">{benefit}</span>
                </li>
              ))}
            </ul>
            <p className="text-center text-gray-600 mt-8">
              Want to see the scanner in action? Our <Link to="/services/" className="text-gold hover:text-gold/80 underline-offset-4 hover:underline">Services</Link> and{' '}
              <Link to="/invisalign/" className="text-gold hover:text-gold/80 underline-offset-4 hover:underline">Invisalign</Link> pages highlight real case studies powered by iTero technology.
            </p>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
            <span className="uppercase tracking-[0.3em] text-sm text-gold font-semibold">Ready to Experience It?</span>
            <h2 className="text-4xl font-bold text-gray-900">Experience Precision Scanning</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Upgrade your Invisalign treatment, veneers, crowns, and smile previews with iTero Element 5D technology at Exquisite Dentistry.
              We combine digital scans with Pearl AI diagnostics for the most informed care in Los Angeles.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild>
                <Link to={SCHEDULE_CONSULTATION_PATH}>Schedule Consultation</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/contact/">Ask About iTero</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default IteroScanner;
