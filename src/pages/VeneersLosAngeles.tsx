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
import InternalLinkingWidget from '@/components/InternalLinkingWidget';
import ServiceRecommendation from '@/components/ServiceRecommendation';
import RelatedArticles from '@/components/RelatedArticles';
import { getCanonicalUrl } from '@/utils/schemaValidation';

const VeneersLosAngeles = () => {
  const differentiators = [
    {
      icon: <Palette className="h-8 w-8 text-secondary" />,
      title: "Artistry Meets Science",
      description: "Smile designs blend 3D facial mapping with handcrafted porcelain layering from master ceramists."
    },
    {
      icon: <Sparkles className="h-8 w-8 text-secondary" />,
      title: "Hollywood-Tested Results",
      description: "Camera-ready aesthetics crafted for actors, entrepreneurs, and producers who live in front of the lens."
    },
    {
      icon: <Shield className="h-8 w-8 text-secondary" />,
      title: "Protective Protocols",
      description: "Minimally invasive preparation, guided anesthesia, and occlusal planning preserve long-term health."
    },
    {
      icon: <Heart className="h-8 w-8 text-secondary" />,
      title: "Comfort-First Experience",
      description: "Noise-canceling headphones, streaming suites, and sedation options reframe dental visits as self-care."
    }
  ];

  const veneerStyles = [
    {
      heading: "Signature LA Glow",
      content: "Balanced translucency and subtle characterization mimic sunlit enamel, perfect for red carpets, agency photos, and daily life in Beverly Grove."
    },
    {
      heading: "Ultra-Natural Refinement",
      content: "Micro-layered feldspathic porcelain refines single teeth or pairs for executives and creatives who want enhancement without broadcasting treatment."
    },
    {
      heading: "High-Impact Glamour",
      content: "For performers seeking runway drama, we design bolder contours, wider smile arcs, and high-luster finishes while safeguarding occlusion."
    }
  ];

  const faqs = [
    {
      question: "How many porcelain veneers do Los Angeles patients usually choose?",
      answer: "Treatment plans range from one veneer to refresh a single camera-facing tooth to full 10-tooth smile makeovers. We begin by analyzing your smile width, lip dynamics, and desired outcome. During your design visit, you’ll preview digital mockups and test-drive temporary veneers so we can finalize the exact number that delivers harmony."
    },
    {
      question: "What makes Exquisite Dentistry veneers different?",
      answer: "Our veneers are handcrafted by elite Southern California ceramists who custom mix porcelain powders for your complexion, gender expression, and lighting environment. Dr. Aguil personally sculpts provisionals, sculpts gum symmetry when needed, and uses meticulous adhesive protocols that guard against sensitivity and staining along the margins."
    },
    {
      question: "How long do veneers last?",
      answer: "With proper care—nightguard use, professional maintenance, and mindful habits—our porcelain veneers routinely last 15 years or longer. We enroll you in a personalized maintenance calendar that combines hygiene visits, bite evaluations, and whitening touch-ups to keep your investment flawless."
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
          expectedPrognosis: 'Balanced, luminous smile transformation with strengthened enamel surfaces.'
        }]}
      />

      <PageSEO
        title="Veneers Los Angeles | Custom Porcelain Smile Design"
        description="Handcrafted porcelain veneers in Los Angeles deliver camera-ready brilliance with conservative prep, concierge comfort, and long-lasting strength."
        keywords="veneers Los Angeles, porcelain veneers LA, smile makeover Los Angeles, cosmetic dentist LA"
        path="/veneers-los-angeles"
        ogImage="https://exquisitedentistryla.com/lovable-uploads/1575f241-2d2e-4530-b7e7-6fd4ff56ccf5.png"
      />

      <WebPageStructuredData
        title="Porcelain Veneers in Los Angeles"
        description="Discover handcrafted porcelain veneers in Los Angeles designed by Dr. Alexie Aguil for natural, camera-ready smile transformations."
        url="https://exquisitedentistryla.com/veneers-los-angeles"
        breadcrumbs={[
          { name: 'Services', url: 'https://exquisitedentistryla.com/services/' },
          { name: 'Porcelain Veneers Los Angeles', url: 'https://exquisitedentistryla.com/veneers-los-angeles/' }
        ]}
      />

      <ServiceStructuredData
        serviceName="Los Angeles Porcelain Veneers"
        description="Custom smile makeovers using premium porcelain veneers, designed for natural beauty and long-term durability."
        url="/veneers-los-angeles"
        priceRange="$$$$"
      />

      <FAQStructuredData
        faqs={faqs}
        about="Porcelain Veneers in Los Angeles"
      />

      <div className="min-h-screen bg-background">
        <VideoHero
          title="Porcelain Veneers Los Angeles"
          subtitle="Capture the radiance of a handcrafted smile designed for film, fashion, and modern city life."
          primaryCta={{
            text: "Plan Your Smile Design",
            href: "https://scheduling.simplifeye.co#key=g5zcQrkS2CtYq4odV42VrV7GyZrpy2F&gaID=null",
            target: "_blank",
            rel: "noopener noreferrer"
          }}
          secondaryCta={{
            text: "Explore Transformations",
            href: "/smile-gallery"
          }}
          height="medium"
        />

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto text-center">
              <span className="uppercase tracking-[0.3em] text-secondary font-semibold">Los Angeles Cosmetic Dentistry</span>
              <h1 className="mt-6 text-4xl md:text-5xl font-bold text-foreground">
                Veneers Crafted for Spotlight & Everyday Confidence
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Exquisite Dentistry veneers capture California sunshine, red-carpet glamour, and authentic personality.
                We begin with an immersive smile discovery session—analyzing facial proportions, phonetics, and lifestyle needs—before handcrafting
                porcelain that enhances your identity rather than masking it. The result is a smile that photographs beautifully,
                speaks naturally, and leaves a lasting impression long after the cameras and conversations end.
              </p>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Dr. Alexie Aguil partners with boutique LA ceramists to sculpt each veneer by hand.
                Every layer of porcelain powder is chosen to harmonize with your complexion and reflectivity under studio lighting.
                The finished smile is luminous in person, dynamic on screen, and durable for years of fine dining, travel, and networking events across Los Angeles.
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
                <Button asChild>
                  <Link to="/veneers/front-teeth-veneers-los-angeles">
                    Explore front teeth veneers
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
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
                  From Consultation to Camera-Ready Reveal
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Your veneer journey begins with high-definition photography, digital smile simulations, and a deep conversation about how you want to look and feel.
                  We co-create a mood board that captures your aspirational smile—whether that is effortless Beverly Hills polish or editorial edge.
                  Trial smile previews let you wear your design at home, receive feedback from stylists, and ensure phonetics feel natural before we finalize porcelain shades.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  On veneer day, Dr. Aguil employs micro-thin preparation guides that conserve enamel and maintain tooth vitality.
                  Conscious sedation, warm neck pillows, and curated playlists transform treatment into a restorative experience.
                  When veneers are ready for delivery, we test under soft box lighting to ensure brilliance on stage, on camera, and in the boardroom.
                  You leave with a protective nightguard, whitening serum for natural teeth, and a personalized care roadmap.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" asChild>
                    <a
                      href="https://scheduling.simplifeye.co#key=g5zcQrkS2CtYq4odV42VrV7GyZrpy2F&gaID=null"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Reserve Smile Consultation
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link to="/transformation-stories">
                      Explore Patient Transformations
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="bg-muted/40 border border-border/60 rounded-2xl p-8">
                <h3 className="text-2xl font-semibold text-foreground mb-4">Veneer Styles We Curate</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Every porcelain set is layered for depth, translucency, and light diffusion that match your features and ambitions.
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
                Living in LA means every angle of your smile is photographed—at premieres, on Zoom, and in candid photos with friends.
                We evaluate how your teeth interact with facial muscles as you speak, laugh, and perform.
                If gum levels need refinement, we pair veneers with gentle laser recontouring.
                Patients coming from Santa Monica or Malibu often request slightly warm undertones to harmonize with beach lighting, while downtown executives prefer crisp brightness for indoor boardrooms.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Our concierge team coordinates with glam squads, brand managers, and wedding planners so treatment milestones align with key dates.
                Temporary veneers are hand-polished to look natural during press tours, while final porcelain integrates seamlessly with <Link to="/zoom-whitening" className="text-secondary underline-offset-4 hover:underline">Zoom whitening</Link>,
                <Link to="/invisalign" className="text-secondary underline-offset-4 hover:underline">Invisalign alignment</Link>, or <Link to="/dental-implants" className="text-secondary underline-offset-4 hover:underline">implant restorations</Link> for comprehensive bite rehabilitation.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                After delivery, you will receive custom Vivera retainers, a nightguard, and access to our VIP maintenance program.
                Six-month reviews include polish refinements, veneer-safe whitening, and bite balancing to protect your investment.
                We document your journey with professional photography so you always have updated headshots and brand imagery that showcase your new smile.
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
                    Multi-arch smile makeovers include whitening of remaining teeth, nightguard fabrication, and two years of touch-up visits.
                    Transparent estimates outline every step, so there are zero surprises from consultation to reveal.
                  </p>
                  <p>
                    We accept major credit cards, work with flexible third-party financing, and assist with FSA/HSA reimbursements.
                    Entertainment professionals can request confidential billing and calendar coordination through our concierge desk to align with production schedules and contract milestones.
                  </p>
                  <p>
                    Patients combining veneers with implants, Invisalign, or therapeutic Botox receive bundled savings and priority scheduling blocks.
                    Ask about our &ldquo;Premiere Smile Package,&rdquo; designed for actors and public figures preparing for career-defining appearances.
                  </p>
                </CardContent>
              </Card>

              <div className="flex flex-col gap-6">
                <div className="bg-white border border-border/60 rounded-2xl p-8 shadow-sm">
                  <h3 className="text-2xl font-semibold text-foreground mb-4">Your Veneer Maintenance Blueprint</h3>
                  <ul className="space-y-3 text-muted-foreground leading-relaxed">
                    <li className="flex items-start gap-3">
                      <Camera className="w-5 h-5 text-secondary mt-1" />
                      <span>Attend professional cleanings every 3–4 months with hygienists trained in veneer-safe polishing paste.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Camera className="w-5 h-5 text-secondary mt-1" />
                      <span>Wear your nightguard nightly to safeguard porcelain edges from clenching during long edit sessions or performances.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Camera className="w-5 h-5 text-secondary mt-1" />
                      <span>Use non-abrasive toothpaste and silk floss to protect glossy finishes and maintain impeccable margins.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Camera className="w-5 h-5 text-secondary mt-1" />
                      <span>Schedule quick bite checks after major orthodontic changes or new restorative work to keep veneers balanced.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Camera className="w-5 h-5 text-secondary mt-1" />
                      <span>Keep a travel-safe whitening pen and veneer case in your bag for on-location touch-ups and protection.</span>
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
          subtitle="Expert guidance on costs, materials, and celebrity smile transformations"
        />

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Elevate Your Los Angeles Smile
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                From Beverly Hills to Silver Lake, a confident smile opens doors, books roles, and amplifies your personal brand.
                Let us guide you through a porcelain veneer experience that celebrates your identity and delivers lasting radiance.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" asChild>
                  <a
                    href="https://scheduling.simplifeye.co#key=g5zcQrkS2CtYq4odV42VrV7GyZrpy2F&gaID=null"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Schedule Veneer Design Session
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/testimonials">
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
