import React from 'react';
import { Link } from 'react-router-dom';
import PageSEO from '@/components/seo/PageSEO';
import VideoHero from '@/components/VideoHero';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Sparkles, Palette, Shield, Camera, Heart, ArrowRight } from 'lucide-react';
import MasterStructuredData from '@/components/seo/MasterStructuredData';
import WebPageStructuredData from '@/components/WebPageStructuredData';
import ServiceStructuredData from '@/components/ServiceStructuredData';
import FAQStructuredData from '@/components/seo/FAQStructuredData';
import FinancingOptionsSection from '@/components/FinancingOptionsSection';
import InternalLinkingWidget from '@/components/InternalLinkingWidget';
import ServiceRecommendation from '@/components/ServiceRecommendation';
import RelatedArticles from '@/components/RelatedArticles';
import { getCanonicalUrl } from '@/utils/schemaValidation';
import {
  INSURANCE_PATH,
  SCHEDULE_CONSULTATION_PATH,
  VENEERS_INSURANCE_BLOG_PATH,
} from '@/constants/urls';
import { trackCTAClick } from '@/utils/googleAdsTracking';

const VeneersLosAngeles = () => {
  const differentiators = [
    {
      icon: <Palette className="h-8 w-8 text-secondary" />,
      title: "Artistry Meets Science",
      description: "Smile designs combine 3D facial mapping with porcelain layered by hand in the lab."
    },
    {
      icon: <Sparkles className="h-8 w-8 text-secondary" />,
      title: "Natural on Camera and in Person",
      description: "Shade, shape, and surface texture are planned to read naturally in person, on video, and in photos."
    },
    {
      icon: <Shield className="h-8 w-8 text-secondary" />,
      title: "Protective Protocols",
      description: "Minimally invasive preparation, guided anesthesia, and occlusal planning preserve long-term health."
    },
    {
      icon: <Heart className="h-8 w-8 text-secondary" />,
      title: "Comfort-First Experience",
      description: "Noise-canceling headphones, streaming, and sedation options help keep visits calm and comfortable."
    }
  ];

  const veneerStyles = [
    {
      heading: "Natural Brightness",
      content: "Balanced translucency and subtle surface detail mimic healthy enamel, so veneers look at home in everyday light and in photographs."
    },
    {
      heading: "Conservative Refinement",
      content: "Micro-layered feldspathic porcelain refines a single tooth or a pair for patients who want a change that is noticeable to them, not obvious to everyone else."
    },
    {
      heading: "Brighter, Bolder Shaping",
      content: "When you want a more noticeable change, we can design fuller contours, a wider smile arc, and a higher-luster finish while protecting your bite."
    }
  ];

  const faqs = [
    {
      question: "How many porcelain veneers do Los Angeles patients usually choose?",
      answer: "Treatment plans range from one veneer to refresh a single camera-facing tooth to full 10-tooth smile makeovers. We begin by analyzing your smile width, lip dynamics, and desired outcome. During your design visit, you’ll preview digital mockups and test-drive temporary veneers so we can finalize the exact number that delivers harmony."
    },
    {
      question: "What makes Exquisite Dentistry veneers different?",
      answer: "Our veneers are handcrafted by skilled Southern California ceramists who custom mix porcelain powders for your complexion, gender expression, and lighting environment. Dr. Aguil personally sculpts provisionals, sculpts gum symmetry when needed, and uses meticulous adhesive protocols that guard against sensitivity and staining along the margins."
    },
    {
      question: "How long do veneers last?",
      answer: "With proper care, nightguard use, professional maintenance, and mindful habits, our porcelain veneers routinely last 15 years or longer. We enroll you in a personalized maintenance calendar that combines hygiene visits, bite evaluations, and whitening touch-ups to keep your veneers in good condition."
    }
  ];

  return (
    <>
      <MasterStructuredData
        includeBusiness={true}
        includeWebsite={true}
        additionalSchemas={[{
          '@context': 'https://schema.org',
          '@type': 'MedicalProcedure',
          name: 'Porcelain Veneers Los Angeles',
          description: 'Custom porcelain veneer smile makeovers handcrafted for Los Angeles patients seeking camera-ready aesthetics.',
          url: getCanonicalUrl('/veneers-los-angeles'),
          category: 'Cosmetic Dentistry',
          provider: {
            '@id': 'https://exquisitedentistryla.com/#business'
          },
          performer: {
            '@id': 'https://exquisitedentistryla.com/#doctor'
          },
          bodyLocation: 'Teeth',
          preparation: [
            'Digital smile design consultation',
            'Facial photography and shade analysis',
            'Minimally invasive tooth contouring when indicated'
          ],
          followup: [
            'Nightguard delivery',
            'Six-month maintenance visits',
            'Professional whitening calibration'
          ],
          expectedPrognosis: 'Balanced, natural-looking results with strengthened enamel surfaces.'
        }]}
      />

      <PageSEO
        title="Veneers Los Angeles | Custom Porcelain Smile Design"
        description="Handcrafted porcelain veneers in Los Angeles, with conservative prep and long-lasting strength."
        keywords="veneers Los Angeles, porcelain veneers LA, smile makeover Los Angeles, cosmetic dentist LA"
        path="/veneers-los-angeles"
        ogImage="https://exquisitedentistryla.com/lovable-uploads/1575f241-2d2e-4530-b7e7-6fd4ff56ccf5.png"
      />

      <WebPageStructuredData
        title="Porcelain Veneers in Los Angeles"
        description="Handcrafted porcelain veneers in Los Angeles, designed by Dr. Alexie Aguil for natural-looking results."
        url="https://exquisitedentistryla.com/veneers-los-angeles"
        breadcrumbs={[
          { name: 'Services', url: 'https://exquisitedentistryla.com/services/' },
          { name: 'Porcelain Veneers Los Angeles', url: 'https://exquisitedentistryla.com/veneers-los-angeles/' }
        ]}
      />

      <ServiceStructuredData
        serviceName="Los Angeles Porcelain Veneers"
        description="Custom smile makeovers using porcelain veneers, designed for a natural look and long-term durability."
        url="/veneers-los-angeles"
      />

      <FAQStructuredData
        faqs={faqs}
        about="Porcelain Veneers in Los Angeles"
      />

      <div className="min-h-screen bg-background">
        <VideoHero
          title="Porcelain Veneers Los Angeles"
          subtitle="Handcrafted porcelain veneers, designed to look natural in daily life and on camera."
          primaryCta={{
            text: "Schedule Consultation",
            href: SCHEDULE_CONSULTATION_PATH
          }}
          secondaryCta={{
            text: "Smile Gallery",
            href: "/smile-gallery/"
          }}
          height="medium"
        />

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto text-center">
              <span className="uppercase tracking-[0.3em] text-secondary font-semibold">Los Angeles Cosmetic Dentistry</span>
              <h2 className="mt-6 text-4xl md:text-5xl font-bold text-foreground">
                Veneers Designed for Everyday Confidence
              </h2>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Every veneer plan starts with a smile discovery session. We look at your facial proportions, how you speak,
                and how you want your smile to feel day to day, then design porcelain that fits your features rather than
                covering them. The goal is a smile that photographs well, speaks naturally, and still looks like you.
              </p>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Dr. Alexie Aguil works with Los Angeles ceramists to shape each veneer by hand.
                Layers of porcelain are chosen to match your complexion and the way your teeth catch light.
                The finished result looks consistent in person and on camera, and is built to hold up over years of everyday use.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 bg-muted/25">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-white border border-border rounded-xl shadow-sm p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <p className="uppercase text-secondary tracking-[0.2em] text-xs font-semibold">Options for just your front teeth</p>
                  <h3 className="text-2xl font-bold text-foreground mt-2">2 or 4 veneers for the smile zone</h3>
                  <p className="text-muted-foreground mt-2">See transparent pricing and design guidance when you only need the front teeth perfected.</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button asChild>
                    <Link to="/veneers/front-teeth-veneers-los-angeles/">
                      Explore front teeth veneers
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/veneers/2-front-teeth-veneers-cost-los-angeles/">
                      View 2-tooth cost guide
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/veneers/1-tooth-veneer-los-angeles/">
                      Single-tooth veneer options
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {differentiators.map((item) => (
                <Card key={item.title} className="border border-border/60 bg-white shadow-sm hover:shadow-lg transition-shadow">
                  <CardHeader className="items-center text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center">
                      {item.icon}
                    </div>
                    <CardTitle className="text-xl text-foreground">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed text-center">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  From Consultation to Final Placement
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Your veneer plan begins with photography, digital smile simulations, and a conversation about how you want your smile to look and feel.
                  We map out the shape and shade together, whether you want a subtle refinement or a more noticeable change.
                  Trial-smile previews let you wear the design at home and check how it feels and sounds before we finalize the porcelain shades.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  On veneer day, Dr. Aguil uses micro-thin preparation guides that conserve enamel and maintain tooth vitality.
                  Conscious sedation, warm neck pillows, and your choice of music help keep the visit comfortable.
                  Before final placement, we check the veneers under different lighting so the shade reads well in person and on camera.
                  You leave with a protective nightguard, whitening for your natural teeth, and a written care plan.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  If veneers are part of a wedding plan, timing matters. Our{' '}
                  <Link to="/blog/when-to-start-wedding-smile-prep-los-angeles/" className="text-secondary underline-offset-4 hover:underline">
                    wedding smile prep timeline guide
                  </Link>{' '}
                  explains when to start veneer planning relative to whitening, alignment, and other event-driven treatment decisions.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" asChild>
                    <Link to={SCHEDULE_CONSULTATION_PATH} onClick={() => trackCTAClick('veneers_pillar_book_click', 'Schedule Consultation')}>Schedule Consultation</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link to="/transformation-stories/">
                      Explore Patient Transformations
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="bg-muted/40 border border-border/60 rounded-2xl p-8">
                <h3 className="text-2xl font-semibold text-foreground mb-4">Veneer Styles We Offer</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Every set is layered for depth, translucency, and the way it diffuses light, matched to your features and the look you want.
                </p>
                <div className="space-y-6">
                  {veneerStyles.map((style) => (
                    <div key={style.heading} className="p-4 bg-white rounded-xl shadow-sm border border-border/40">
                      <h4 className="text-lg font-semibold text-foreground mb-2">{style.heading}</h4>
                      <p className="text-muted-foreground leading-relaxed">{style.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted/15">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Los Angeles-Focused Veneer Planning</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                In Los Angeles, your smile shows up on video calls, in photos, and in everyday conversation.
                We look at how your teeth move as you speak, laugh, and smile, and if your gum levels need refining we can pair veneers with gentle laser recontouring.
                Some patients prefer slightly warmer undertones and others prefer a brighter, cooler shade. We plan the shade with you so it suits your face and the light you are usually in.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Our team can coordinate with your schedule so treatment milestones line up with the dates that matter to you.
                Temporary veneers are hand-polished to look natural while you wait, and the final porcelain works alongside <Link to="/zoom-whitening/" className="text-secondary underline-offset-4 hover:underline">Zoom whitening</Link>,
                <Link to="/invisalign/" className="text-secondary underline-offset-4 hover:underline">Invisalign alignment</Link>, or <Link to="/dental-implants/" className="text-secondary underline-offset-4 hover:underline">implant restorations</Link> when a fuller bite plan is needed.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                After delivery, you receive custom Vivera retainers, a nightguard, and a place in our maintenance program.
                Six-month reviews include polish refinements, veneer-safe whitening, and bite balancing to protect your investment.
                We also document your results with professional photography, so you have updated photos of your new smile.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
              <Card className="bg-gradient-to-br from-white to-secondary/10 border border-border/60 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl text-foreground">Investment & Concierge Options</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Veneer investments range from $2,200 to $3,000 per tooth, including design, provisionals, final porcelain, and maintenance essentials.
                    Larger smile makeovers include whitening of the remaining teeth, a nightguard, and two years of touch-up visits.
                    Your estimate outlines every step up front, so there are no surprises along the way.
                  </p>
                  <p>
                    We accept major credit cards, work with third-party financing, and help with FSA/HSA reimbursements.
                    If you have a demanding schedule or need confidential billing, our concierge desk can coordinate appointments and paperwork around it.
                  </p>
                  <p>
                    If insurance is part of the decision, start with our{' '}
                    <Link to={INSURANCE_PATH} className="text-secondary underline underline-offset-4 hover:no-underline">
                      insurance page
                    </Link>{' '}
                    and our{' '}
                    <Link
                      to={VENEERS_INSURANCE_BLOG_PATH}
                      className="text-secondary underline underline-offset-4 hover:no-underline"
                    >
                      updated veneers coverage guide
                    </Link>
                    . If a remaining balance still matters, Cherry can help eligible patients review
                    monthly payment options after benefits are considered.
                  </p>
                  <p>
                    Patients combining veneers with implants, Invisalign, or therapeutic Botox can ask about bundled savings and coordinated scheduling.
                    If you are planning treatment around a specific date, let us know early so we can map the timeline.
                  </p>
                </CardContent>
              </Card>

              <div className="flex flex-col gap-6">
                <div className="bg-white border border-border/60 rounded-2xl p-8 shadow-sm">
                  <h3 className="text-2xl font-semibold text-foreground mb-4">Your Veneer Maintenance Blueprint</h3>
                  <ul className="space-y-3 text-muted-foreground leading-relaxed">
                    <li className="flex items-start gap-3">
                      <Camera className="w-5 h-5 text-secondary mt-1" />
                      <span>Attend professional cleanings every 3 to 4 months with hygienists trained in veneer-safe polishing paste.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Camera className="w-5 h-5 text-secondary mt-1" />
                      <span>Wear your nightguard nightly to protect porcelain edges from clenching and grinding.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Camera className="w-5 h-5 text-secondary mt-1" />
                      <span>Use non-abrasive toothpaste and gentle floss to protect the finish and keep the margins clean.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Camera className="w-5 h-5 text-secondary mt-1" />
                      <span>Schedule quick bite checks after major orthodontic changes or new restorative work to keep veneers balanced.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Camera className="w-5 h-5 text-secondary mt-1" />
                      <span>Keep a travel-safe whitening pen and veneer case in your bag for touch-ups while you travel.</span>
                    </li>
                  </ul>
                </div>

                <ServiceRecommendation
                  currentService="Veneers Los Angeles"
                  context="combination"
                  recommendations={[
                    {
                      title: "Invisalign Clear Aligners",
                      href: "/invisalign",
                      description: "Align teeth before veneers for optimal symmetry and bite.",
                      popularity: 58,
                      priceRange: "$$$",
                      combination: true
                    },
                    {
                      title: "Zoom Teeth Whitening",
                      href: "/teeth-whitening",
                      description: "Maintain natural teeth and veneer harmony with professional whitening.",
                      popularity: 72,
                      priceRange: "$$"
                    },
                    {
                      title: "Smile Gallery",
                      href: "/smile-gallery",
                      description: "Preview our Los Angeles veneer transformations and color palettes.",
                      popularity: 84
                    }
                  ]}
                />
              </div>
            </div>
          </div>
        </section>

        <FinancingOptionsSection
          className="bg-background pt-6 md:pt-8"
          title="Planning veneers? Review monthly payment options now."
          description="If you are comparing per-tooth veneer investment or a broader smile makeover plan, our Cherry financing page lets you review monthly payment options right after the concierge pricing details and after you have checked whether PPO benefits apply."
        />

        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
                Veneer FAQs for Los Angeles Patients
              </h2>
              <Accordion type="single" collapsible className="w-full space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem key={faq.question} value={`faq-${index}`} className="border border-border/60 rounded-lg">
                    <AccordionTrigger className="px-6 py-4 text-left text-lg font-semibold text-foreground">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6 pt-2 text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Related Articles Section */}
        <RelatedArticles
          tags={['veneers', 'los angeles', 'hollywood veneers', 'cosmetic dentistry']}
          category="Cosmetic Dentistry"
          title="Veneer Insights from Our Blog"
          subtitle="Guidance on costs, materials, and what to expect from veneers"
        />

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Plan Your Los Angeles Veneers
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                A confident smile makes a difference in how you show up, at work, on camera, and in everyday life.
                We will walk you through the veneer process step by step and design a result that looks natural and lasts.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" asChild>
                  <Link to={SCHEDULE_CONSULTATION_PATH} onClick={() => trackCTAClick('veneers_pillar_book_click', 'Schedule Consultation')}>Schedule Consultation</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/testimonials/">
                    Hear from Our Veneer Patients
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-20">
          <div className="container mx-auto px-4">
            <InternalLinkingWidget
              context="veneer"
              variant="expanded"
              title="Explore More Cosmetic Dentistry Resources"
            />
          </div>
        </section>
      </div>
    </>
  );
};

export default VeneersLosAngeles;
