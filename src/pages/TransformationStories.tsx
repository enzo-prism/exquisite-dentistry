import React from 'react';
import { Link } from 'react-router-dom';
import PageSEO from '@/components/seo/PageSEO';
import VideoHero from '@/components/VideoHero';
import { Button } from '@/components/ui/button';
import { transformationStories } from '@/data/transformationStories';
import YouTubeEmbed from '@/components/YouTubeEmbed';
import VimeoFacade from '@/components/VimeoFacade';

const TransformationStoriesPage: React.FC = () => {
  return (
    <>
      <PageSEO 
        title="Patient Transformation Stories | Exquisite Dentistry Los Angeles"
        description="Explore real patient transformation stories and smile makeover journeys from Dr. Alexie Aguil at Exquisite Dentistry in Los Angeles. See actual results."
        keywords="dental transformation stories Los Angeles, smile transformation journeys, cosmetic dentistry results, before after dental work, patient success stories"
        path="/transformation-stories"
        ogImage="/lovable-uploads/2e2732fc-c4a6-4f21-9829-3717d9b2b36d.png"
      />
      
      <VideoHero 
        title="Patient Transformation Stories"
        subtitle="Real patients, real transformations, real stories of confidence and care"
        primaryCta={{
          text: "Schedule a Consultation",
          href: "https://scheduling.simplifeye.co/#key=g5zcQrkS2CtYq4odV42VrV7GyZrpy2F&gaID=null"
        }}
        secondaryCta={{
          text: "View Smile Gallery",
          href: "/smile-gallery"
        }}
      />
      
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block text-sm text-gold font-medium mb-3">TRANSFORMATION STORIES</span>
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              Transformation Stories
            </h2>
            <p className="text-lg text-muted-foreground">
              See how our patients achieved their dream smiles and gained confidence through personalized care
            </p>
            <div className="separator mx-auto mt-6"></div>
          </div>
          
          {/* Transformation Stories Grid */}
          <div className="grid gap-12 mb-16">
            {transformationStories.map((caseStudy) => (
              <div key={caseStudy.id} className="bg-card rounded-lg shadow-lg overflow-hidden">
                <div className="grid lg:grid-cols-2 gap-8 p-8">
                  {/* Video Section */}
                  <div className="space-y-4">
                    {caseStudy.videoType === 'youtube' ? (
                      <YouTubeEmbed
                        videoId={caseStudy.videoId}
                        title={caseStudy.title}
                        thumbnailUrl={caseStudy.thumbnailUrl}
                        className="w-full"
                      />
                    ) : (
                      <VimeoFacade
                        videoId={caseStudy.videoId}
                        title={caseStudy.title}
                        thumbnailUrl={caseStudy.thumbnailUrl}
                        background={false}
                        controls={true}
                        className="w-full"
                      />
                    )}
                  </div>
                  
                  {/* Content Section */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-semibold mb-3">{caseStudy.title}</h3>
                      <p className="text-muted-foreground mb-4">{caseStudy.shortDescription}</p>
                    </div>
                    
                    {/* Key Takeaways */}
                    <div>
                      <h4 className="font-semibold mb-3 text-gold">Key Takeaways</h4>
                      <ul className="space-y-2">
                        {caseStudy.keyTakeaways.map((takeaway, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-gold text-sm leading-none mt-[0.125rem]">•</span>
                            <span className="text-sm leading-relaxed">{takeaway}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Patient Quote */}
                    {caseStudy.quotes[0] && (
                      <blockquote className="border-l-4 border-gold pl-4 italic text-muted-foreground">
                        "{caseStudy.quotes[0].text}"
                      </blockquote>
                    )}
                    
                    {/* CTA */}
                    <div className="pt-4">
                      <Button asChild className="bg-gold text-white hover:bg-gold/90">
                        <Link to={`/transformation-stories/${caseStudy.slug}`}>
                          Read Full Story
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Bottom CTA */}
          <div className="text-center bg-muted rounded-lg p-8">
            <h3 className="text-2xl font-semibold mb-4">Ready to Start Your Own Transformation?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Whether you want a straighter look, a confidence boost, or a complete smile refresh, 
              we'll meet you where you are and guide you step-by-step.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gold text-white hover:bg-gold/90">
                <a 
                  href="https://scheduling.simplifeye.co/#key=g5zcQrkS2CtYq4odV42VrV7GyZrpy2F&gaID=null"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Book a Consultation
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="tel:(323) 272-2388">
                  Call the Office
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TransformationStoriesPage;