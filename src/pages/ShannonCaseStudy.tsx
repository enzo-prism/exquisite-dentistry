import React from 'react';
import { Link } from 'react-router-dom';
import PageSEO from '@/components/seo/PageSEO';
import VideoHero from '@/components/VideoHero';
import { Button } from '@/components/ui/button';
import YouTubeEmbed from '@/components/YouTubeEmbed';
import CaseStudyStructuredData from '@/components/CaseStudyStructuredData';
import { caseStudies } from '@/data/caseStudies';

const ShannonCaseStudy: React.FC = () => {
  const caseStudy = caseStudies.find(study => study.slug === 'shannon-langhorne')!;

  return (
    <>
      <PageSEO 
        title={caseStudy.seo.title}
        description={caseStudy.seo.description}
        keywords={caseStudy.seo.keywords}
        path="/case-studies/shannon-langhorne"
        ogImage="/lovable-uploads/2e2732fc-c4a6-4f21-9829-3717d9b2b36d.png"
      />
      
      <CaseStudyStructuredData 
        caseStudy={caseStudy} 
        canonicalUrl="https://exquisitedentistryla.com/case-studies/shannon-langhorne" 
      />
      
      <VideoHero 
        title="Shannon Langhorne's Story"
        subtitle="A dental visit that feels like stepping into a spa"
        primaryCta={{
          text: "Schedule a Consultation",
          href: "https://scheduling.simplifeye.co/#key=g5zcQrkS2CtYq4odV42VrV7GyZrpy2F&gaID=null"
        }}
        secondaryCta={{
          text: "View All Case Studies",
          href: "/case-studies"
        }}
      />
      
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Video Section */}
          <div className="mb-16">
            <YouTubeEmbed
              videoId={caseStudy.videoId}
              title={caseStudy.title}
              thumbnailUrl={caseStudy.thumbnailUrl}
              className="w-full max-w-3xl mx-auto"
            />
          </div>
          
          {/* Quick Take Section */}
          <div className="bg-muted rounded-lg p-8 mb-16">
            <h2 className="text-2xl font-semibold mb-6">Quick Take</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gold mb-2">Patient</h3>
                <p className="mb-4">{caseStudy.patientName}</p>
                
                <h3 className="font-semibold text-gold mb-2">Goal</h3>
                <p>{caseStudy.goal}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gold mb-2">Location</h3>
                <p className="mb-4">{caseStudy.location}</p>
                
                <h3 className="font-semibold text-gold mb-2">What stood out</h3>
                <p className="italic">"It feels like I'm walking into a spa."</p>
              </div>
            </div>
          </div>
          
          {/* Story Section */}
          <div className="prose prose-lg max-w-none mb-16">
            <h2 className="text-3xl font-semibold mb-6">Meet Shannon</h2>
            <p className="text-lg leading-relaxed mb-6">
              For Shannon, going to the dentist used to be just another appointment on the calendar. 
              That changed the first time she visited Exquisite Dentistry. The difference was immediate 
              — a calm environment, friendly greetings, and a sense of ease that set the tone before 
              she even sat in the chair.
            </p>
            
            <blockquote className="border-l-4 border-gold pl-6 my-8 italic text-xl">
              "I like coming here because it feels like I'm walking into a spa."
            </blockquote>
            
            <h3 className="text-2xl font-semibold mb-4">The Experience</h3>
            <p className="text-lg leading-relaxed mb-6">
              Every detail felt intentional. The staff greeted her with genuine smiles, and Dr. Lexi 
              was excited to see her. That energy mattered — it turned routine care into a refreshing 
              experience. Dental visits went from something to check off the list to something she 
              looked forward to.
            </p>
          </div>
          
          {/* Key Takeaways */}
          <div className="bg-card rounded-lg p-8 mb-16">
            <h3 className="text-2xl font-semibold mb-6">Why Exquisite Dentistry Worked for Shannon</h3>
            <div className="space-y-4">
              {caseStudy.keyTakeaways.map((takeaway, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="text-gold text-sm leading-none mt-[0.125rem]">•</span>
                  <span className="text-lg leading-relaxed">{takeaway}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Patient Quotes */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold mb-8 text-center">In Shannon's Words</h3>
            <div className="space-y-8">
              {caseStudy.quotes.map((quote, index) => (
                <blockquote key={index} className="bg-muted rounded-lg p-6 text-center">
                  <p className="text-lg italic mb-4">"{quote.text}"</p>
                  <cite className="text-gold font-medium">— {caseStudy.patientName}</cite>
                </blockquote>
              ))}
            </div>
          </div>
          
          {/* Results */}
          <div className="bg-card rounded-lg p-8 mb-16">
            <h3 className="text-2xl font-semibold mb-6">What Changed</h3>
            <div className="space-y-4">
              {caseStudy.whatChanged.map((result, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="text-gold text-sm leading-none mt-[0.125rem]">✓</span>
                  <div>
                    <h4 className="font-semibold text-gold mb-1">{result.category}</h4>
                    <span className="leading-relaxed">{result.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="text-center bg-muted rounded-lg p-8">
            <h3 className="text-2xl font-semibold mb-4">Thinking About a New Dentist?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              If you want an experience that feels more like a spa than a clinic — and results that 
              make you love your smile — schedule your visit with Exquisite Dentistry today. 
              We'd love to welcome you, just like we did for Shannon.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gold text-white hover:bg-gold/90">
                <a 
                  href="https://scheduling.simplifeye.co/#key=g5zcQrkS2CtYq4odV42VrV7GyZrpy2F&gaID=null"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Schedule Your Visit
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/case-studies">
                  View More Stories
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShannonCaseStudy;