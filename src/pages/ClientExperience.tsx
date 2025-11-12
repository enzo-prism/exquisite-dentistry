import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Headphones,
  Clock,
  Calendar,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Film,
  Waves,
  HeartPulse,
  Moon,
  Activity
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import MasterStructuredData from '@/components/seo/MasterStructuredData';
import { PageSEO } from '@/components/seo/PageSEO';

// Scheduling URL constant
const SCHEDULING_URL = "https://scheduling.simplifeye.co#key=g5zcQrkS2CtYq4odV42VrV7GyZrpy2F&gaID=null";

const ClientExperience = () => {
  const comfortHighlights = [
    {
      title: "Spa Arrival Ritual",
      description: "Warm lavender towels, curated playlists, and sparkling refreshers ease you in before treatment begins.",
      icon: <Sparkles size={22} />
    },
    {
      title: "Convenient Scheduling",
      description: "Same-day emergency appointments, early morning/lunchtime slots, and family block appointments.",
      icon: <Calendar size={24} />
    },
    {
      title: "24/7 Online Booking",
      description: "Book appointments anytime, day or night, through our convenient online scheduling system.",
      icon: <Clock size={24} />
    },
    {
      title: "Entertainment Options",
      description: "Stream your favorite shows or music during treatment to help you relax and enjoy your visit.",
      icon: <Headphones size={24} />
    },
    {
      title: "Entertainment Studio",
      description: "Watch Netflix, Apple TV, or curated meditations with noise-canceling headphones and ceiling screens.",
      icon: <Film size={22} />
    }
  ];

  const experienceJourney = [
    {
      title: 'Arrival & Grounding',
      summary: 'Signature welcome ritual, aromatherapy, custom beverage.',
      details: 'Choose your lounge seating, adjust lighting, and complete digital forms with concierge support.',
      tip: 'Select your soundtrack or guided meditation before you’re escorted back.'
    },
    {
      title: 'Treatment Immersion',
      summary: 'Comfort tech + clear communication.',
      details: 'iTero scans, anesthesia warmers, and real-time visuals keep you informed and relaxed throughout treatment.',
      tip: 'Pause anytime via the comfort signal card if you need a reset.'
    },
    {
      title: 'Reveal & Aftercare',
      summary: 'Finishing touches + personalized plan.',
      details: 'Warm towels, vitamin-infused lip balm, and bespoke aftercare kits tailored to your procedure.',
      tip: 'Receive text check-ins and direct access to our concierge line.'
    }
  ];

  const testimonials = [
    {
      quote: '“I watched Netflix, sipped espresso, and forgot I was at the dentist.”',
      name: 'Morgan S.',
      service: 'Porcelain Veneers'
    },
    {
      quote: '“They scheduled my Invisalign visits around set days—concierge dentistry at its best.”',
      name: 'Nick R.',
      service: 'Invisalign'
    },
    {
      quote: '“The anxiety menu, aromatherapy, and sedation options made me feel in control again.”',
      name: 'Chloe F.',
      service: 'Smile Refresh'
    }
  ];

  const comfortMenu = [
    { title: 'Soundtrack Bar', description: 'Pick cinematic, lo-fi, or guided meditation audio.' },
    { title: 'Temperature Layering', description: 'Weighted blankets, plush throws, and cooling towels.' },
    { title: 'Hydration Cart', description: 'Still, sparkling, espresso, or botanical teas.' },
    { title: 'Mindful Entertainment', description: 'Netflix, Apple TV, or noise-canceling silence.' },
    { title: 'Aromatherapy Ritual', description: 'Neroli, lavender, or eucalyptus blends.' },
    { title: 'Comfort Signals', description: 'Hand-held call button to pause treatment anytime.' }
  ];

  const safetyAssurances = [
    'IV & oral sedation options for anxious guests',
    'Emergency availability with same-day pain relief',
    'On-call concierge line for post-visit support',
    'Sterile suites with hospital-grade purification'
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <PageSEO 
        title="Luxury Dental Spa LA | Comfort-Focused Dentistry"
        description="Experience luxury dental care in LA with spa amenities, sedation options, and personalized comfort. Redefining dental visits for anxious patients."
        keywords="luxury dental experience, spa dentistry Los Angeles, comfortable dental care, dental anxiety relief, premium dental office, Beverly Hills dental spa"
        path="/client-experience"
      />
      <MasterStructuredData 
        includeBusiness={true} 
        additionalSchemas={[{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Luxury Dental Experience',
          description: 'Comprehensive dental care delivered in a spa-like environment with advanced technology and personalized comfort',
          provider: { '@id': 'https://exquisitedentistryla.com/#business' },
          serviceType: 'Luxury Dental Care',
          areaServed: { '@type': 'City', name: 'Los Angeles' }
        }]} 
      />

      <div className="min-h-screen page-transition-in space-y-0">
        {/* Hero */}
        <section className="bg-gradient-to-b from-black to-black/90 text-white py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 text-xs tracking-[0.35em] uppercase text-gold/80">
                Comfort First
              </span>
              <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
                Experience Dentistry Reimagined on Wilshire Boulevard
              </h1>
              <p className="text-lg text-white/80">
                Private suites, spa rituals, concierge scheduling, and immersive entertainment turn every visit into a restorative ritual tailored to you.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href={SCHEDULING_URL} target="_blank" rel="noopener noreferrer" className="inline-flex w-full sm:w-auto">
                <Button className="bg-gold text-black hover:bg-gold/90 px-8 w-full sm:w-auto">
                  Book Your Experience
                </Button>
              </a>
              <Button variant="outline" className="border-white/30 text-white hover:text-black hover:bg-white w-full sm:w-auto" asChild>
                <Link to="/smile-gallery">
                  View the Smile Gallery
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Comfort Highlights */}
        <section className="py-16 md:py-24 bg-white">
          <div className="section-container space-y-10">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block text-sm text-gold font-medium mb-3">Comfort & Amenities</span>
              <h2 className="heading-lg mb-4">Designed to Melt Away Dental Anxiety</h2>
              <p className="paragraph">
                Every suite, playlist, and aromatic touch has been intentionally chosen to deliver full-sensory calm while we deliver clinical excellence.
              </p>
            </div>
            <div className="relative -mx-4 px-4 sm:mx-0 sm:px-0">
              <div className="pointer-events-none absolute inset-y-0 left-4 w-8 bg-gradient-to-r from-white to-transparent hidden sm:block" />
              <div className="pointer-events-none absolute inset-y-0 right-4 w-8 bg-gradient-to-l from-white to-transparent hidden sm:block" />
              <div className="overflow-x-auto snap-x snap-mandatory">
                <div className="flex gap-4 sm:gap-6">
                  {comfortHighlights.map((item) => (
                    <div
                      key={item.title}
                      className="snap-center min-w-[260px] sm:min-w-[280px] lg:min-w-[320px] p-6 rounded-2xl border border-black/5 shadow-sm bg-white flex flex-col gap-4"
                    >
                      <div className="w-12 h-12 rounded-full bg-gold/10 text-gold flex items.center justify-center">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                        <p className="text-black-light/80 text-sm leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Journey */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="section-container space-y-12">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block text-sm text-gold font-medium mb-3">Your Visit</span>
              <h2 className="heading-lg mb-4">A Guided Journey From Arrival to Reveal</h2>
              <p className="paragraph">Every stage is choreographed with transparency, calm, and concierge-level service.</p>
            </div>
            <div className="relative max-w-5xl mx-auto">
              <div className="hidden lg:block absolute inset-y-0 left-1/2 transform -translate-x-1/2 w-px bg-gradient-to-b from-transparent via-gold/40 to-transparent" />
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {experienceJourney.map((step, index) => (
                  <div key={step.title} className="relative bg-white rounded-2xl p-6 border border-black/5 shadow-sm w-full max-w-md mx-auto">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-gold text-black flex items-center justify-center font-semibold">
                        {index + 1}
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.35em] text-black-light/60">Stage {index + 1}</p>
                        <h3 className="text-xl font-semibold">{step.title}</h3>
                      </div>
                    </div>
                    <p className="text-sm text-gold font-medium mb-3">{step.summary}</p>
                    <p className="text-sm text-black-light/80 mb-4">{step.details}</p>
                    <div className="rounded-lg bg-gray-50 p-4 border border-gray-100">
                      <div className="text-xs uppercase tracking-[0.35em] text-black-light/60 mb-1">Concierge Tip</div>
                      <p className="text-sm text-black-light/80">{step.tip}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Immersive media + testimonials */}
        <section className="py-16 md:py-24 bg-white">
          <div className="section-container space-y-12">
            <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-6">
                <span className="inline-block text-sm text-gold font-medium">Immersive Care in Action</span>
                <h2 className="heading-lg">See How We Combine Technology + Calm</h2>
                <p className="paragraph">
                  From first scans to final polish, we narrate every step so you always feel informed and in control. Here’s how a typical smile session flows.
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    { title: 'Digital Preview Suite', body: 'iTero scans + 3D rendering let you visualize movements before we begin.' },
                    { title: 'Comfort Signals', body: 'Hand-held pause buttons and real-time updates ensure you guide the pace.' },
                    { title: 'Finish & Glow', body: 'Custom lip hydration, take-home care kits, and text follow-ups complete the visit.' },
                    { title: 'On-Call Support', body: '24/7 concierge texting keeps you connected to Dr. Aguil’s team.' }
                  ].map((item) => (
                    <div key={item.title} className="p-4 rounded-2xl bg-gray-50 border border-gray-100 shadow-sm">
                      <p className="text-sm font-semibold text-black">{item.title}</p>
                      <p className="text-sm text-black-light/80 mt-2">{item.body}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-black text-white rounded-3xl p-6 space-y-6">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="text-gold" size={24} />
                  <p className="text-sm uppercase tracking-[0.35em] text-gold/80">Client Notes</p>
                </div>
                <div className="grid gap-4">
                  {testimonials.map((item) => (
                    <div key={item.name} className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-3">
                      <p className="text-white/90 text-sm leading-relaxed">“{item.quote.replace(/(^“|”$)/g, '')}”</p>
                      <div className="text-xs uppercase tracking-widest text-gold">{item.service}</div>
                      <div className="text-sm text-white/70">{item.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comfort Menu */}
        <section className="py-16 md:py-24 bg-black text-white">
          <div className="section-container space-y-12">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <span className="inline-block text-sm text-gold font-medium mb-2">Comfort Menu</span>
                <h2 className="text-3xl md:text-4xl font-semibold">Customize Every Sensory Detail</h2>
              </div>
              <p className="text-white/80 max-w-xl">
                Mix and match sensory comforts before each visit—or adjust in real time. Our concierge tracks your preferences so every return visit feels familiar.
              </p>
            </div>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-black/80 via-black/30 to-transparent hidden md:block" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-black/80 via-black/30 to-transparent hidden md:block" />
              <div className="overflow-x-auto -mx-4 px-4 snap-x snap-mandatory">
                <div className="flex gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-3">
                  {comfortMenu.map((item) => (
                    <div key={item.title} className="min-w-[260px] rounded-2xl border border-white/15 bg-white/5 p-5 snap-center min-h-[160px]">
                      <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                      <p className="text-sm text-white/80">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Safety & CTA */}
        <section className="py-16 md:py-24 bg-white">
          <div className="section-container space-y-12">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-center">
              <div className="space-y-6">
                <span className="inline-block text-sm text-gold font-medium">Calm + Clinical Precision</span>
                <h2 className="heading-lg">Sedation, Emergency Care & 24/7 Concierge Support</h2>
                <p className="paragraph">
                  Whether you’re planning a full veneer case or need urgent relief, our team ensures you feel safe, heard, and cared for long after you leave the chair.
                </p>
                <ul className="space-y-3">
                  {safetyAssurances.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <ShieldCheck className="text-gold mt-1" size={18} />
                      <span className="text-sm text-black-light/80">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <a href={SCHEDULING_URL} target="_blank" rel="noopener noreferrer" className="inline-flex w-full sm:w-auto">
                    <Button className="bg-black text-white hover:bg-black/90 w-full sm:w-auto">
                      Book an Appointment
                    </Button>
                  </a>
                  <Button variant="outline" className="border-black/30 text-black hover:bg-black hover:text-white w-full sm:w-auto" asChild>
                    <a href="tel:+13232722388">
                      Call the Concierge Team
                    </a>
                  </Button>
                </div>
              </div>
              <div className="rounded-3xl border border-black/5 bg-gray-50 p-6 space-y-6">
                <div className="flex items-center gap-3">
                  <HeartPulse className="text-gold" size={24} />
                  <p className="text-sm uppercase tracking-[0.35em] text-gold/80">Calm Checklist</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-black-light/80">
                  <div className="rounded-2xl border border-black/5 p-4 bg-white min-h-[140px]">
                    <Waves className="text-gold mb-3" size={20} />
                    Guided breathing cues
                  </div>
                  <div className="rounded-2xl border border-black/5 p-4 bg-white min-h-[140px]">
                    <Headphones className="text-gold mb-3" size={20} />
                    Custom playlists & noise control
                  </div>
                  <div className="rounded-2xl border border-black/5 p-4 bg-white min-h-[140px]">
                    <Moon className="text-gold mb-3" size={20} />
                    Sedation & sleep dentistry
                  </div>
                  <div className="rounded-2xl border border-black/5 p-4 bg-white min-h-[140px]">
                    <Activity className="text-gold mb-3" size={20} />
                    Real-time vitals monitoring
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ClientExperience;
