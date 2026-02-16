import React from 'react';
import { Link } from 'react-router-dom';
import PageSEO from '@/components/seo/PageSEO';
import VideoHero from '@/components/VideoHero';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Zap, Clock, Shield, Star, CheckCircle, MapPin, Phone } from 'lucide-react';
import WebPageStructuredData from '@/components/WebPageStructuredData';
import ServiceStructuredData from '@/components/ServiceStructuredData';
import FAQStructuredData from '@/components/seo/FAQStructuredData';
import MasterStructuredData from '@/components/seo/MasterStructuredData';
import InternalLinkingWidget from '@/components/InternalLinkingWidget';
import RelatedArticles from '@/components/RelatedArticles';
import LastUpdated from '@/components/LastUpdated';
import { GOOGLE_MAPS_SHORT_URL, SCHEDULE_CONSULTATION_PATH } from '@/constants/urls';
import { ROUTE_METADATA } from '@/constants/metadata';
import { ZOOM_WHITENING_FAQS } from '@/data/zoomWhitening';
import { ADDRESS, BUSINESS_HOURS, PHONE_NUMBER_DISPLAY, PHONE_NUMBER_E164 } from '@/constants/contact';
import {
  ZOOM_WHITENING_HUB_INTRO_PARAGRAPHS,
  ZOOM_WHITENING_REFERENCES
} from '@/data/zoom-whitening-hub';

const ZoomWhitening = () => {
  const meta = ROUTE_METADATA['/zoom-whitening'];
  const benefits = [
    {
      icon: <Zap className="h-8 w-8 text-secondary" />,
      title: "Immediate Results",
      description: "See dramatic whitening results in just one 60 to 90 minute session"
    },
    {
      icon: <Shield className="h-8 w-8 text-secondary" />,
      title: "Safe & Comfortable",
      description: "Dentist-supervised protocol with gum protection and comfort-first sensitivity planning"
    },
    {
      icon: <Star className="h-8 w-8 text-secondary" />,
      title: "Professional Grade",
      description: "Advanced whitening technology available only in dental offices"
    },
    {
      icon: <Clock className="h-8 w-8 text-secondary" />,
      title: "Long-lasting Results",
      description: "Maintain your bright smile for months with proper care and maintenance"
    }
  ];

  const process = [
    {
      step: "01",
      title: "Consultation & Preparation",
      description: "Comprehensive evaluation to ensure you're a good candidate for Zoom whitening"
    },
    {
      step: "02", 
      title: "Protection & Setup",
      description: "Gums and lips are carefully protected while the whitening gel is applied to teeth"
    },
    {
      step: "03",
      title: "Light Activation",
      description: "Special Zoom light activates the whitening gel for optimal results"
    },
    {
      step: "04",
      title: "Results & Maintenance",
      description: "Immediate results with take-home kit to maintain your brilliant smile"
    }
  ];

  const beforeAfter = [
    "Remove years of stains from coffee, tea, and wine",
    "Eliminate yellowing from aging and lifestyle factors", 
    "Brighten teeth up to 8 shades in one visit",
    "Restore confidence in your smile",
    "Prepare for special events and occasions"
  ];

  const faqs = ZOOM_WHITENING_FAQS;

	  return (
	    <>
	      <MasterStructuredData 
	        includeBusiness={true}
	        includeDoctor={true}
	        includeWebsite={true}
	      />
	      <PageSEO
	        title={meta.title}
	        description={meta.description}
        keywords={meta.keywords}
        path="/zoom-whitening"
        ogImage={meta.ogImage}
	      />

	      <WebPageStructuredData 
	        title="Zoom Whitening Los Angeles"
	        description={meta.description}
	        url="https://exquisitedentistryla.com/zoom-whitening"
	        breadcrumbs={[
	          { name: "Services", url: "https://exquisitedentistryla.com/services/" },
	          { name: "Teeth Whitening", url: "https://exquisitedentistryla.com/teeth-whitening/" },
	          { name: "Zoom Whitening", url: "https://exquisitedentistryla.com/zoom-whitening/" }
	        ]}
	      />

	      <ServiceStructuredData 
	        serviceName="Zoom Whitening Los Angeles"
	        description={meta.description}
	        url="https://exquisitedentistryla.com/zoom-whitening"
	      />

	      <FAQStructuredData 
	        faqs={faqs} 
	        about="Zoom Whitening Los Angeles" 
	      />

	        <div className="min-h-screen bg-background">
	          {/* Hero Section */}
	          <VideoHero
	            title="Zoom Whitening in Los Angeles"
	            subtitle="Fast, in-office teeth whitening designed to lift stains and brighten your smile in about one visit at our Wilshire Blvd dental studio."
	            primaryCta={{
	              text: "Schedule Consultation",
	              href: SCHEDULE_CONSULTATION_PATH
	            }}
	            height="medium"
	            preferStaticOnMobile={true}
	          />

        {/* Introduction */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
	              <div className="w-24 h-1 bg-secondary mx-auto mb-8"></div>
	              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
	                Zoom Whitening Los Angeles: What to Expect
	              </h2>
	              <p className="text-sm text-muted-foreground mb-4">
	                Reviewed by{' '}
		                <Link to="/about/" className="text-secondary underline-offset-4 hover:underline">
		                  Dr. Alexie Aguil
	                </Link>{' '}
	                ·{' '}
	                <Link to="/editorial-policy/" className="text-secondary underline-offset-4 hover:underline">
		                  Editorial policy
		                </Link>
	              </p>
	              {ZOOM_WHITENING_HUB_INTRO_PARAGRAPHS.map((paragraph) => (
	                <p key={paragraph} className="mt-6 text-lg text-muted-foreground leading-relaxed">
	                  {paragraph}
	                </p>
	              ))}

	              <nav
	                aria-label="On this page"
	                className="mx-auto mt-10 max-w-3xl rounded-2xl border border-border bg-muted/30 p-6 text-left"
	              >
	                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-primary">On this page</p>
	                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
	                  <li>
	                    <a className="text-primary underline-offset-4 hover:underline" href="#benefits">
	                      Benefits
	                    </a>
	                  </li>
	                  <li>
	                    <a className="text-primary underline-offset-4 hover:underline" href="#process">
	                      Process
	                    </a>
	                  </li>
	                  <li>
	                    <a className="text-primary underline-offset-4 hover:underline" href="#sensitivity">
	                      Sensitivity
	                    </a>
	                  </li>
	                  <li>
	                    <a className="text-primary underline-offset-4 hover:underline" href="#cost">
	                      Cost
	                    </a>
	                  </li>
	                  <li>
	                    <a className="text-primary underline-offset-4 hover:underline" href="#aftercare">
	                      Aftercare
	                    </a>
	                  </li>
	                  <li>
	                    <a className="text-primary underline-offset-4 hover:underline" href="#location">
	                      Location & hours
	                    </a>
	                  </li>
	                  <li>
	                    <a className="text-primary underline-offset-4 hover:underline" href="#faqs">
	                      FAQs
	                    </a>
	                  </li>
	                  <li>
	                    <a className="text-primary underline-offset-4 hover:underline" href="#references">
	                      References
	                    </a>
	                  </li>
	                </ul>
	              </nav>

	              <div className="mt-10 grid gap-4 sm:grid-cols-2 text-left">
	                <Card className="border border-border/60 shadow-sm">
	                  <CardContent className="p-6 space-y-2">
	                    <h3 className="text-lg font-semibold text-foreground">Visit Our Los Angeles Office</h3>
	                    <p className="text-sm text-muted-foreground">{ADDRESS}</p>
	                    <p className="text-sm text-muted-foreground">
	                      Call{' '}
	                      <a className="text-secondary underline-offset-4 hover:underline" href={`tel:${PHONE_NUMBER_E164}`}>
	                        {PHONE_NUMBER_DISPLAY}
	                      </a>{' '}
	                      ·{' '}
	                      <a className="text-secondary underline-offset-4 hover:underline" href="#location">
	                        directions and hours
	                      </a>
	                      .
	                    </p>
	                  </CardContent>
	                </Card>
                <Card className="border border-border/60 shadow-sm">
                  <CardContent className="p-6 space-y-2">
                    <h3 className="text-lg font-semibold text-foreground">Not Sure Which Whitening Option?</h3>
                    <p className="text-sm text-muted-foreground">
                      Compare Zoom to custom take-home whitening and hybrid plans on our{' '}
                      <Link to="/teeth-whitening/" className="text-secondary underline-offset-4 hover:underline">
                        teeth whitening page
                      </Link>
                      .
                    </p>
	                    <p className="text-sm text-muted-foreground">
	                      Coming from Culver City? Start here:{' '}
	                      <Link to="/culver-city-teeth-whitening/" className="text-secondary underline-offset-4 hover:underline">
	                        Culver City teeth whitening
	                      </Link>
	                      .
	                    </p>
                    <p className="text-sm text-muted-foreground">
                      Coming from Beverly Hills? Start here:{' '}
                      <Link to="/teeth-whitening-beverly-hills/" className="text-secondary underline-offset-4 hover:underline">
                        teeth whitening near Beverly Hills
                      </Link>
                      .
                    </p>
                    <p className="text-sm text-muted-foreground">
                      If you have veneers or bonding, we’ll plan your shade so everything looks consistent.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
	        </section>

	        {/* Benefits Grid */}
	        <section id="benefits" className="py-16 bg-muted/30">
	          <div className="container mx-auto px-4">
	            <div className="text-center mb-12">
	              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
	                Why Choose Zoom Whitening?
	              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Experience the gold standard in professional teeth whitening
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {benefits.map((benefit, index) => (
                <Card key={index} className="text-center border-0 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <CardContent className="pt-8 pb-6">
                    <div className="flex justify-center mb-4">
                      {benefit.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
	        </section>

        {/* What to Expect */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                    What Zoom Can Do For You
                  </h2>
                  <div className="space-y-4">
                    {beforeAfter.map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-6 w-6 text-secondary flex-shrink-0 mt-0.5" />
                        <p className="text-muted-foreground">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-2xl p-8 text-center">
                  <div className="text-6xl font-bold text-secondary mb-4">3 to 8</div>
                  <div className="text-xl font-semibold text-foreground mb-2">Shades Whiter</div>
                  <div className="text-muted-foreground">In just one visit</div>
                </div>
              </div>
            </div>
          </div>
        </section>

	        {/* Process Section */}
	        <section id="process" className="py-16 bg-muted/30">
	          <div className="container mx-auto px-4">
	            <div className="text-center mb-12">
	              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
	                The Zoom Whitening Process
	              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                A comfortable, professional experience from start to finish
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                {process.map((step, index) => (
                  <div key={index} className="flex gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center">
                        <span className="text-2xl font-bold text-secondary">{step.step}</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-3">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
		        </section>

		        <section id="sensitivity" className="py-16 bg-background">
		          <div className="container mx-auto px-4">
		            <div className="max-w-5xl mx-auto">
		              <div className="text-center mb-12">
		                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
		                  Sensitivity & Comfort Protocol
		                </h2>
		                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
		                  Zoom whitening in Los Angeles can cause temporary sensitivity, especially if you’ve had sensitivity in the past.
		                  We tailor gel cycles and aftercare so you can whiten predictably and comfortably.
		                </p>
		              </div>

		              <div className="grid gap-6 md:grid-cols-2">
		                <Card className="border border-border/60 bg-white shadow-sm">
		                  <CardHeader>
		                    <CardTitle className="text-xl text-foreground">Comfort-first adjustments</CardTitle>
		                  </CardHeader>
		                  <CardContent className="text-muted-foreground leading-relaxed">
		                    <ul className="list-disc pl-5 space-y-2">
		                      <li>Review sensitivity history and enamel condition before starting</li>
		                      <li>Timed gel cycles with monitoring and on-the-fly comfort adjustments</li>
		                      <li>Desensitizing options and clear 24 to 48 hour aftercare guidance</li>
		                    </ul>
		                  </CardContent>
		                </Card>
		                <Card className="border border-border/60 bg-white shadow-sm">
		                  <CardHeader>
		                    <CardTitle className="text-xl text-foreground">If you have sensitive teeth</CardTitle>
		                  </CardHeader>
		                  <CardContent className="text-muted-foreground leading-relaxed space-y-4">
		                    <p>
		                      If sensitivity is a big concern, we can recommend a slower plan with custom take-home trays or a hybrid approach.
		                      The goal is a bright, natural shade that still feels comfortable day to day.
		                    </p>
		                    <div className="flex flex-col gap-3 sm:flex-row">
		                      <Button variant="outline" asChild>
		                        <Link to="/teeth-whitening/">Compare whitening options</Link>
		                      </Button>
		                      <Button asChild>
		                        <Link to={SCHEDULE_CONSULTATION_PATH}>Schedule Consultation</Link>
		                      </Button>
		                    </div>
		                  </CardContent>
		                </Card>
		              </div>
		            </div>
		          </div>
		        </section>

		        <section id="cost" className="py-16 bg-muted/20">
		          <div className="container mx-auto px-4">
		            <div className="max-w-5xl mx-auto">
		              <div className="text-center mb-12">
		                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
		                  Zoom Whitening Cost in Los Angeles
		                </h2>
		                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
		                  Pricing depends on your starting shade, sensitivity history, and whether take-home boosters are included. We’ll confirm candidacy first and share a clear estimate.
		                </p>
		              </div>

		              <Card className="border border-border/60 bg-white shadow-sm">
		                <CardContent className="p-8 space-y-4">
		                  <ul className="list-disc pl-5 space-y-2 text-muted-foreground leading-relaxed">
		                    <li>In-office Zoom whitening typically starts around $595 (confirm after your exam and shade check)</li>
		                    <li>Existing veneers, crowns, or bonding may require shade matching to keep results consistent</li>
		                    <li>Maintenance items (touch-up gel or trays) can extend longevity for coffee/tea/wine habits</li>
		                  </ul>
		                  <div className="flex flex-col gap-3 sm:flex-row">
		                    <Button asChild>
		                      <Link to={SCHEDULE_CONSULTATION_PATH}>Schedule Consultation</Link>
		                    </Button>
		                    <Button variant="outline" asChild>
		                      <Link to="/teeth-whitening/">Compare programs</Link>
		                    </Button>
		                  </div>
		                </CardContent>
		              </Card>
		            </div>
		          </div>
		        </section>

		        <section id="aftercare" className="py-16 bg-background">
		          <div className="container mx-auto px-4">
		            <div className="max-w-5xl mx-auto">
		              <div className="text-center mb-12">
		                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
		                  Aftercare & How Long Results Last
		                </h2>
		                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
		                  Results commonly last months to a couple of years depending on diet, habits, and home care. The first 24 to 48 hours are the most important for protecting your new shade.
		                </p>
		              </div>

		              <div className="grid gap-6 md:grid-cols-2">
		                <Card className="border border-border/60 bg-white shadow-sm">
		                  <CardHeader>
		                    <CardTitle className="text-xl text-foreground">24 to 48 hour “white diet”</CardTitle>
		                  </CardHeader>
		                  <CardContent className="text-muted-foreground leading-relaxed">
		                    <ul className="list-disc pl-5 space-y-2">
		                      <li>Avoid coffee, red wine, tea, berries, and dark sauces</li>
		                      <li>Choose lighter meals, still water, and non-staining drinks</li>
		                      <li>Follow sensitivity guidance if teeth feel temporarily “zingy”</li>
		                    </ul>
		                  </CardContent>
		                </Card>
		                <Card className="border border-border/60 bg-white shadow-sm">
		                  <CardHeader>
		                    <CardTitle className="text-xl text-foreground">Maintenance</CardTitle>
		                  </CardHeader>
		                  <CardContent className="text-muted-foreground leading-relaxed">
		                    <ul className="list-disc pl-5 space-y-2">
		                      <li>Keep up with regular cleanings so surface stains don’t build up</li>
		                      <li>Use touch-ups when you notice dulling (especially with coffee/tea/wine habits)</li>
		                      <li>Schedule whitening ahead of events so shade settles naturally</li>
		                    </ul>
		                  </CardContent>
		                </Card>
		              </div>
		            </div>
		          </div>
		        </section>

		        <section id="location" className="py-16 bg-muted/15">
		          <div className="container mx-auto px-4">
		            <div className="max-w-5xl mx-auto">
		              <div className="text-center mb-12">
		                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
		                  Location, Hours, and Directions
		                </h2>
		                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
		                  Visit Exquisite Dentistry on Wilshire Blvd in Los Angeles for Zoom whitening and professional stain reduction with comfort-first care.
		                </p>
		              </div>

		              <Card className="border border-border/60 bg-white shadow-sm">
		                <CardContent className="p-8">
		                  <div className="grid gap-6 md:grid-cols-3">
		                    <div className="flex items-start gap-3">
		                      <MapPin className="mt-1 h-5 w-5 text-secondary" />
		                      <div>
		                        <p className="font-semibold text-foreground">Address</p>
		                        <p className="text-muted-foreground">{ADDRESS}</p>
		                      </div>
		                    </div>
		                    <div className="flex items-start gap-3">
		                      <Phone className="mt-1 h-5 w-5 text-secondary" />
		                      <div>
		                        <p className="font-semibold text-foreground">Phone</p>
		                        <a
		                          href={`tel:${PHONE_NUMBER_E164}`}
		                          className="text-muted-foreground underline-offset-4 hover:underline"
		                        >
		                          {PHONE_NUMBER_DISPLAY}
		                        </a>
		                      </div>
		                    </div>
		                    <div className="flex items-start gap-3">
		                      <Clock className="mt-1 h-5 w-5 text-secondary" />
		                      <div>
		                        <p className="font-semibold text-foreground">Hours</p>
		                        <div className="space-y-1 text-muted-foreground">
		                          {BUSINESS_HOURS.map(({ label, value }) => (
		                            <p key={label}>
		                              <span className="font-medium">{label}:</span> {value}
		                            </p>
		                          ))}
		                        </div>
		                      </div>
		                    </div>
		                  </div>

		                  <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
		                    <Button variant="outline" asChild>
		                      <a href={GOOGLE_MAPS_SHORT_URL} target="_blank" rel="noopener noreferrer">
		                        Get directions
		                      </a>
		                    </Button>
		                    <Button variant="outline" asChild>
		                      <a href={`tel:${PHONE_NUMBER_E164}`}>Call {PHONE_NUMBER_DISPLAY}</a>
		                    </Button>
		                    <Button asChild>
		                      <Link to={SCHEDULE_CONSULTATION_PATH}>Schedule Consultation</Link>
		                    </Button>
		                  </div>
		                </CardContent>
		              </Card>
		            </div>
		          </div>
		        </section>

		        {/* FAQ Section */}
		        <section id="faqs" className="py-16 bg-background">
		          <div className="container mx-auto px-4">
		            <div className="text-center mb-12">
	              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
	                Frequently Asked Questions
	              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Answers for Zoom whitening in Los Angeles
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger textClassName="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
	          </div>
	        </section>

	        <section id="references" className="py-16 bg-muted/20">
	          <div className="container mx-auto px-4">
	            <div className="max-w-4xl mx-auto">
	              <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-10">
	                References
	              </h2>
	              <div className="space-y-3 text-muted-foreground">
	                {ZOOM_WHITENING_REFERENCES.map((reference) => (
	                  <p key={reference.href}>
	                    <a
	                      className="text-secondary underline-offset-4 hover:underline"
	                      href={reference.href}
	                      target="_blank"
	                      rel="noopener noreferrer"
	                    >
	                      {reference.label}
	                    </a>
	                  </p>
	                ))}
	              </div>
	            </div>
	          </div>
	        </section>

	        {/* Related Articles Section */}
	        <RelatedArticles
	          tags={['whitening', 'zoom', 'teeth whitening', 'bright']}
	          title="Whitening Articles & Tips"
          subtitle="Expert advice on achieving and maintaining your brightest smile"
        />

        {/* CTA Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Ready for a Brighter Smile?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Schedule your Zoom whitening appointment today and see immediate results 
                that will boost your confidence and brighten your day.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="default" 
                  size="lg"
                  asChild
                >
                  <Link to={SCHEDULE_CONSULTATION_PATH}>Schedule Consultation</Link>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  asChild
                >
	                  <Link to="/contact/">
	                    Contact Us
	                  </Link>
	                </Button>
              </div>

              {/* Additional Internal Links near CTA */}
              <div className="mt-12 pt-8 border-t border-muted">
                <InternalLinkingWidget 
                  context="whitening" 
                  variant="compact"
                  currentPage="/zoom-whitening"
                  title="Explore Related Services"
                />
              </div>

              <LastUpdated date="December 2025" className="text-center" />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ZoomWhitening;
