import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Sparkles, Shield, Clock, Star, Calculator, Heart } from 'lucide-react';
import { PageSEO } from '@/components/seo/PageSEO';
import MasterStructuredData from '@/components/seo/MasterStructuredData';
import WebPageStructuredData from '@/components/WebPageStructuredData';
import ServiceStructuredData from '@/components/ServiceStructuredData';
import MedicalProcedureStructuredData from '@/components/seo/MedicalProcedureStructuredData';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import VeneerCTA from '@/components/VeneerCTA';
import InternalLinkingWidget from '@/components/InternalLinkingWidget';
import RelatedArticles from '@/components/RelatedArticles';
import { SCHEDULING_URL } from '@/constants/urls';
import { PHONE_NUMBER_DISPLAY } from '@/constants/contact';

const FrontTeethVeneers = () => {
  const costHighlights = [
    {
      title: '2 Front Teeth',
      range: '$3,000 – $7,000',
      idealFor: 'Single dark tooth, chips, or matching peg laterals',
      notes: 'We plan whitening first so the veneers match your brightest shade.'
    },
    {
      title: '4 Front Teeth',
      range: '$7,200 – $10,000',
      idealFor: 'Symmetry upgrades, closing gaps, and balancing the smile line',
      notes: 'Stops future shade mismatch between veneers and natural teeth.'
    }
  ];

  const benefits = [
    'Design harmony across the smile zone instead of piecemeal fixes',
    'Minimal-prep porcelain engineered for translucency and strength',
    'Temporaries you can “test drive” before final bonding',
    'Precise shade planning so veneers and natural enamel age gracefully',
    'Protective bite planning and nightguard guidance for longevity'
  ];

  const process = [
    {
      step: '01',
      title: 'Consultation & Smile Design',
      detail: 'Digital records, shade mapping, and facial photography to preview your new front teeth.'
    },
    {
      step: '02',
      title: 'Minimal Preparation',
      detail: 'Conservative enamel reshaping (about 0.3–0.5mm) only where needed for a flush fit.'
    },
    {
      step: '03',
      title: 'Temporaries You Can Live In',
      detail: 'Prototype veneers let you test speech, bite, and aesthetics before approving finals.'
    },
    {
      step: '04',
      title: 'Delivery & Protection',
      detail: 'Hand-layered porcelain is bonded, bite is calibrated, and protective guidance is provided.'
    }
  ];

  const faqs = [
    {
      question: 'Is it better to veneer 2 or 4 front teeth?',
      answer: 'Two veneers can fix localized issues, but four veneers prevent future color mismatch and deliver balanced symmetry in photos and video.'
    },
    {
      question: 'How long do they last?',
      answer: 'Our porcelain veneers routinely last 10–15+ years with routine hygiene, nightguard use for clenching, and mindful habits.'
    },
    {
      question: 'Will they look natural?',
      answer: 'We customize translucency, texture, and edge design to your facial features. The goal is believable teeth, not identical “blocks.”'
    }
  ];

  return (
    <>
      <MasterStructuredData includeBusiness includeWebsite />

      <PageSEO
        title="Front Teeth Veneers in Los Angeles | 2–4 Tooth Smile Zone Makeovers"
        description="Upgrade just your front teeth with handcrafted porcelain veneers. Transparent pricing for 2 or 4 veneers, conservative prep, and camera-ready symmetry from Dr. Alexie Aguil in Los Angeles."
        keywords="front teeth veneers, 2 front teeth veneers cost, 4 front teeth veneers cost, veneers for front teeth Los Angeles, smile zone veneers"
        path="/veneers/front-teeth-veneers-los-angeles"
        ogType="article"
        ogImage="https://exquisitedentistryla.com/lovable-uploads/2e2732fc-c4a6-4f21-9829-3717d9b2b36d.png"
      />

      <WebPageStructuredData
        title="Front Teeth Veneers in Los Angeles"
        description="Transparent pricing and design guidance for 2–4 front teeth veneers with Dr. Alexie Aguil."
        url="https://exquisitedentistryla.com/veneers/front-teeth-veneers-los-angeles"
        breadcrumbs={[
          { name: 'Veneers', url: 'https://exquisitedentistryla.com/veneers/' },
          { name: 'Front Teeth Veneers', url: 'https://exquisitedentistryla.com/veneers/front-teeth-veneers-los-angeles/' }
        ]}
      />

      <ServiceStructuredData
        serviceName="Front Teeth Veneers"
        description="Hand-layered porcelain veneers for the 2–4 front teeth to balance symmetry, color, and proportion."
        url="/veneers/front-teeth-veneers-los-angeles"
        priceRange="$$$"
      />

      <MedicalProcedureStructuredData
        procedureName="Front Teeth Porcelain Veneers"
        description="Conservative porcelain veneers designed for the smile zone (front 2–4 teeth) with digital planning, temporaries, and protective bite calibration."
        url="/veneers/front-teeth-veneers-los-angeles"
        image="https://exquisitedentistryla.com/lovable-uploads/2e2732fc-c4a6-4f21-9829-3717d9b2b36d.png"
        procedureType="Cosmetic Dental Procedure"
        bodyLocation="Front teeth (central and lateral incisors)"
        preparation={[
          'Digital smile design and shade mapping',
          'iTero scans and photography',
          'Optional whitening prior to veneer shade selection'
        ]}
        steps={[
          { name: 'Consultation & Design', description: 'Smile simulation, bite evaluation, and veneer count planning (2 vs 4).' },
          { name: 'Preparation', description: 'Minimal enamel reshaping only where needed for a flush veneer fit.' },
          { name: 'Temporaries', description: 'Prototype veneers worn for speech, bite, and aesthetic feedback.' },
          { name: 'Final Placement', description: 'Layered porcelain bonded with color-matched cement and bite refinement.' }
        ]}
        followupCare={[
          'Nightguard for clenching/grinding',
          'Professional cleanings every 6 months',
          'Non-abrasive toothpaste and mindful chewing habits'
        ]}
        benefits={[
          'Balanced symmetry across the smile zone',
          'Shade stability and stain resistance',
          'Conservative, tooth-preserving design'
        ]}
        duration="2–3 appointments over ~3 weeks"
        recoveryTime="Immediate return to normal activities"
        priceRange="$3,000–$10,000 depending on veneer count and complexity"
      />

      <div className="min-h-screen bg-background">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-b from-gold/15 via-white to-white py-16 md:py-24">
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_20%_20%,rgba(218,165,32,0.12),transparent_35%),radial-gradient(circle_at_80%_0,rgba(218,165,32,0.08),transparent_30%)]" />
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="uppercase tracking-[0.3em] text-secondary font-semibold mb-4">Front Teeth Veneers</p>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground max-w-3xl leading-tight">
              Camera-ready front teeth veneers designed for symmetry, color, and confidence
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-3xl">
              Whether you need 2 veneers for a single dark tooth or 4 veneers to harmonize your smile line, Dr. Alexie Aguil designs minimal-prep porcelain that looks believable on- and off-camera.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <a href={SCHEDULING_URL} target="_blank" rel="noopener noreferrer">
                  Book a front teeth veneer consult
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/smile-gallery">
                  View veneer transformations
                </Link>
              </Button>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">Need clarity first? Call {PHONE_NUMBER_DISPLAY} for pricing and timelines.</p>
          </div>
        </section>

        {/* Cost & Scenarios */}
        <section className="py-14 md:py-16 bg-muted/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
              <div>
                <h2 className="text-3xl font-bold text-foreground">Transparent pricing for your smile zone</h2>
                <p className="text-muted-foreground mt-2 max-w-3xl">
                  No bait-and-switch: we plan whitening, gum balance, and bite protection up front so you know the full investment for 2 or 4 veneers.
                </p>
              </div>
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-secondary">
                <Calculator className="h-4 w-4" />
                Itemized treatment plans & financing available
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {costHighlights.map((item) => (
                <Card key={item.title} className="border-gold/25 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                      <span className="text-sm font-semibold text-secondary">{item.range}</span>
                    </div>
                    <p className="text-muted-foreground">{item.idealFor}</p>
                    <div className="flex items-start gap-2 text-sm text-gray-700">
                      <Check className="h-4 w-4 text-gold mt-0.5" />
                      <span>{item.notes}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-6 p-6 rounded-lg bg-white border border-gold/20 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-secondary" />
                  <p className="text-sm text-gray-700">
                    Includes digital design, temporaries, lab-crafted porcelain, bonding, and bite calibration. Whitening, minor gum contouring, and nightguard protection are recommended when indicated.
                  </p>
                </div>
                <Button size="sm" variant="ghost" asChild>
                  <a href={SCHEDULING_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center">
                    See your options
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Why section */}
        <section className="py-14 md:py-16 bg-background">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center space-y-3">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Why focus on the front 2–4 teeth?</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                The central and lateral incisors define your smile line. Treating them together prevents shade mismatch, gives symmetrical proportions, and keeps photos and video consistent under different lighting.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-start gap-3 bg-white border border-border rounded-lg p-4 shadow-sm">
                  <Sparkles className="h-5 w-5 text-secondary mt-0.5" />
                  <p className="text-gray-700">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-14 md:py-16 bg-muted/20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
              <div>
                <h2 className="text-3xl font-bold text-foreground">Process with Dr. Aguil</h2>
                <p className="text-muted-foreground mt-2">Conservative prep, precise bonding, and a bite that feels natural from day one.</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-secondary">
                <Clock className="h-4 w-4" />
                2–3 visits over ~3 weeks
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {process.map((item) => (
                <Card key={item.step} className="border-gold/20 shadow-sm">
                  <CardContent className="p-6 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gold/15 text-secondary flex items-center justify-center font-semibold">{item.step}</div>
                      <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                    </div>
                    <p className="text-muted-foreground">{item.detail}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-6 p-6 rounded-lg bg-white border border-gold/15 shadow-sm">
              <p className="font-semibold text-foreground">You are never without teeth.</p>
              <p className="text-muted-foreground mt-2">Prototype temporaries look great, protect your teeth, and let you test speech and bite before final placement.</p>
            </div>
          </div>
        </section>

        {/* Candidates & Care */}
        <section className="py-14 md:py-16 bg-background">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white border border-border rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Star className="h-5 w-5 text-secondary" />
                  Great candidates
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Discoloration that whitening cannot fix</li>
                  <li>• Chips, uneven edges, or worn enamel</li>
                  <li>• Small gaps or narrow laterals</li>
                  <li>• Asymmetric front teeth or smile line</li>
                  <li>• Healthy gums and commitment to maintenance</li>
                </ul>
              </div>

              <div className="bg-white border border-border rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-secondary" />
                  Protecting your investment
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Nightguard if you clench or grind</li>
                  <li>• Non-abrasive toothpaste and gentle brushing</li>
                  <li>• Routine professional cleanings and bite checks</li>
                  <li>• Avoid using teeth as tools or biting hard objects</li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-gold/15 via-white to-white border border-gold/20 rounded-xl p-6 md:p-8 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="space-y-2">
                  <p className="uppercase text-secondary tracking-[0.2em] text-xs font-semibold">What to expect</p>
                  <h3 className="text-2xl font-bold text-foreground">Shade-stable porcelain, calibrated bite, concierge comfort</h3>
                  <p className="text-muted-foreground max-w-2xl">Netflix, warm blankets, and gentle anesthesia protocols keep the experience calm while we refine details that make your veneers believable.</p>
                </div>
                <Button size="lg" variant="default" asChild>
                  <a href={SCHEDULING_URL} target="_blank" rel="noopener noreferrer">
                    Start your design
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-14 md:py-16 bg-muted/30">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-2">Front teeth veneer FAQs</h2>
              <p className="text-muted-foreground">Straight answers before you invest.</p>
            </div>
            <div className="space-y-6">
              {faqs.map((faq) => (
                <div key={faq.question} className="bg-white border border-border rounded-lg p-5 shadow-sm">
                  <h3 className="text-lg font-semibold text-foreground mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Articles Section */}
        <RelatedArticles
          tags={['front teeth', 'veneers', '4 front teeth', 'single tooth', 'cost']}
          category="Cosmetic Dentistry"
          title="Front Teeth Veneer Guides"
          subtitle="Expert articles on 2-4 front teeth veneers, costs, and what to expect"
        />

        {/* CTA */}
        <section className="py-14 md:py-16 bg-black text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <div className="flex justify-center">
              <Heart className="h-8 w-8 text-gold" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">Ready to align your smile zone?</h2>
            <p className="text-white/80 text-lg max-w-3xl mx-auto">
              Book a complimentary consult to plan your exact veneer count, timeline, and total investment with Dr. Aguil.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href={SCHEDULING_URL} target="_blank" rel="noopener noreferrer">
                  Book your veneer consult
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white hover:text-black">
                <Link to="/contact">
                  Talk to our concierge
                </Link>
              </Button>
            </div>
            <p className="text-sm text-white/60">Prefer to speak now? Call {PHONE_NUMBER_DISPLAY}</p>
          </div>
        </section>

        <section className="bg-background pb-14">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <VeneerCTA variant="prominent" />
            <InternalLinkingWidget
              currentPage="/veneers/front-teeth-veneers-los-angeles"
              context="veneer"
              variant="expanded"
            />
          </div>
        </section>
      </div>
    </>
  );
};

export default FrontTeethVeneers;
