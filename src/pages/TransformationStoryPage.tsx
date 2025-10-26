import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import PageSEO from '@/components/seo/PageSEO';
import TransformationStoryStructuredData from '@/components/TransformationStoryStructuredData';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { transformationStories } from '@/data/transformationStories';
import SimpleTransformationEmbed from '@/components/SimpleTransformationEmbed';
import { ArrowLeft, CheckCircle, Heart, Star, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const TransformationStoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const caseStudy = transformationStories.find(cs => cs.slug === slug);

  if (!caseStudy) {
    return <Navigate to="/transformation-stories" replace />;
  }

  const canonicalUrl = `https://exquisitedentistryla.com/transformation-stories/${caseStudy.slug}/`;

  const videoSectionTitle = caseStudy.videoSection?.title ?? `🎥 Watch ${caseStudy.patientName}'s Story`;
  const defaultVideoDescription =
    caseStudy.patientName === 'Real Patients'
      ? 'Hear how our patients transformed their dental experience from anxiety to ease.'
      : 'Hear how the experience changed their confidence and why they recommend the team.';
  const videoSectionDescription = caseStudy.videoSection?.description ?? defaultVideoDescription;

  const defaultApproach = [
    {
      title: 'Listen First',
      description: 'Every transformation starts with understanding the person behind the smile.'
    },
    {
      title: 'Design with Intent',
      description: 'Blend facial aesthetics, function, and artistry for a natural result.'
    },
    {
      title: 'Deliver with Care',
      description:
        'Gentle, precise treatment and follow-through so confidence lasts long after the appointment.'
    }
  ];
  const approachItems = caseStudy.approach ?? defaultApproach;

  const finalCta = {
    heading: caseStudy.finalCta?.heading ?? 'Thinking About Your Own Smile?',
    description:
      caseStudy.finalCta?.description ??
      'Whether you’re looking for subtle refinements or a complete transformation, our team guides you with empathy, artistry, and clarity — every step of the way.',
    primaryCtaText: caseStudy.finalCta?.primaryCtaText ?? '👉 Book a Consultation',
    primaryCtaHref:
      caseStudy.finalCta?.primaryCtaHref ??
      'https://scheduling.simplifeye.co#key=g5zcQrkS2CtYq4odV42VrV7GyZrpy2F&gaID=null',
    secondaryCtaText: caseStudy.finalCta?.secondaryCtaText ?? 'Call the Office',
    secondaryCtaHref: caseStudy.finalCta?.secondaryCtaHref ?? 'tel:+13232722388'
  } as const;

  const isExternalLink = (href?: string) => Boolean(href && href.startsWith('http'));

  return (
    <>
      <PageSEO
        title={caseStudy.seo.title}
        description={caseStudy.seo.description}
        keywords={caseStudy.seo.keywords}
        path={`/transformation-stories/${caseStudy.slug}`}
        ogImage={caseStudy.thumbnailUrl || "/lovable-uploads/2e2732fc-c4a6-4f21-9829-3717d9b2b36d.png"}
        ogType="article"
      />
      
      <TransformationStoryStructuredData transformationStory={caseStudy} canonicalUrl={canonicalUrl} />
      
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-background to-muted">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link 
              to="/transformation-stories" 
              className="inline-flex items-center gap-2 text-gold hover:text-gold/80 transition-colors"
            >
              <ArrowLeft size={16} />
              Back to Transformation Stories
            </Link>
          </div>
          
          <div className="text-center max-w-4xl mx-auto">
            <span className="inline-block text-sm text-gold font-medium mb-3">TRANSFORMATION STORY</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{caseStudy.title}</h1>
            <p className="text-xl text-muted-foreground mb-8">{caseStudy.shortDescription}</p>
          </div>
        </div>
      </section>
      
      {/* Video Section */}
      <section className="py-12 bg-muted/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold mb-4">{videoSectionTitle}</h2>
            <p className="text-muted-foreground">{videoSectionDescription}</p>
          </div>

           <div className="max-w-3xl mx-auto">
            <SimpleTransformationEmbed
              source={caseStudy.video.src}
              poster={caseStudy.video.poster || caseStudy.thumbnailUrl}
              title={caseStudy.title}
              className="w-full"
            />
          </div>
        </div>
      </section>
      
      {/* Key Takeaways */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold mb-4">Big Takeaways from the Interview</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {caseStudy.keyTakeaways.map((takeaway, index) => (
              <Card key={index} className="text-center p-6">
                <CardContent className="pt-6">
                  <CheckCircle className="h-12 w-12 text-gold mx-auto mb-4" />
                  <p className="font-medium">{takeaway}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Patient Info */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <Card className="p-8">
              <h3 className="text-xl font-semibold mb-6 text-gold">Patient</h3>
              <div className="space-y-4">
                <div>
                  <span className="font-medium">Name:</span> {caseStudy.patientName}
                </div>
                <div>
                  <span className="font-medium">Goal:</span> {caseStudy.goal}
                </div>
                <div>
                  <span className="font-medium">Location:</span> {caseStudy.location}
                </div>
              </div>
            </Card>
            
            {/* Patient Quotes */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gold">{caseStudy.patientName}'s Experience</h3>
              {caseStudy.quotes.map((quote, index) => (
                <blockquote key={index} className="border-l-4 border-gold pl-6 py-4 bg-muted/50 rounded-r-lg">
                  <p className="text-lg italic mb-2">"{quote.text}"</p>
                  {quote.context && (
                    <cite className="text-sm text-muted-foreground">— {quote.context}</cite>
                  )}
                </blockquote>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Why She Chose Us */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold text-center mb-12">Why {caseStudy.patientName === 'Real Patients' ? 'Patients Choose' : caseStudy.patientName + ' Chose'} Us</h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {caseStudy.whyChoseUs.map((reason, index) => {
              const icons = [Heart, Star, Users];
              const Icon = icons[index] || CheckCircle;
              
              return (
                <Card key={index} className="text-center p-6">
                  <CardContent className="pt-6">
                    <Icon className="h-12 w-12 text-gold mx-auto mb-4" />
                    <h3 className="font-semibold mb-3">{reason.title}</h3>
                    <p className="text-muted-foreground">{reason.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* What Changed */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold text-center mb-12">What Changed</h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {caseStudy.whatChanged.map((change, index) => (
              <Card key={index} className="p-6">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-3 text-gold">{change.category}</h3>
                  <p className="text-muted-foreground">{change.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Our Approach */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold mb-4">Our Approach (At a Glance)</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {approachItems.map((item, index) => (
              <div className="text-center" key={item.title}>
                <div className="bg-gold text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                  {index + 1}
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center text-sm text-muted-foreground italic">
            Every smile is unique. Your plan will be tailored to your goals and lifestyle. Individual results may vary.
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold text-center mb-12">FAQ (for prospective patients)</h2>
          
          <Accordion type="single" collapsible className="mb-16">
            {caseStudy.faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-gold/10 to-gold/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-semibold mb-4">{finalCta.heading}</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">{finalCta.description}</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {finalCta.primaryCtaHref && finalCta.primaryCtaText && (
              <Button asChild size="lg" variant="default">
                <a
                  href={finalCta.primaryCtaHref}
                  target={isExternalLink(finalCta.primaryCtaHref) ? '_blank' : undefined}
                  rel={isExternalLink(finalCta.primaryCtaHref) ? 'noopener noreferrer' : undefined}
                >
                  {finalCta.primaryCtaText}
                </a>
              </Button>
            )}
            {finalCta.secondaryCtaHref && finalCta.secondaryCtaText && (
              <Button asChild variant="outline" size="lg">
                <a
                  href={finalCta.secondaryCtaHref}
                  target={isExternalLink(finalCta.secondaryCtaHref) ? '_blank' : undefined}
                  rel={isExternalLink(finalCta.secondaryCtaHref) ? 'noopener noreferrer' : undefined}
                >
                  {finalCta.secondaryCtaText}
                </a>
              </Button>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default TransformationStoryPage;