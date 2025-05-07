
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import VideoHero from '@/components/VideoHero';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, ChevronRight } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useBreakpoint } from '@/hooks/use-mobile';

const SmileGallery = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // State for tracking which view is shown (before or after)
  const [view, setView] = useState<"before" | "after">("after");
  const { isMobile } = useBreakpoint();
  
  // Patient data
  const patients = [
    {
      name: "Brittany",
      beforeImg: "/lovable-uploads/7be70408-3316-4a36-8ad0-68fafc9d0e05.png",
      afterImg: "/lovable-uploads/52dd6454-e5d1-4a7e-aa17-65a34cbc8044.png", 
      beforeQuote: "I was always self-conscious about my smile...",
      afterQuote: "Now I can't stop smiling! Dr. Aguil changed my life."
    },
    {
      name: "Ryan",
      beforeImg: "/lovable-uploads/8e2e1684-e2b2-4ebe-81de-ffec0bb4c801.png",
      afterImg: "/lovable-uploads/4820b0df-82b4-4e9b-9724-b8d1f720712b.png",
      beforeQuote: "I never liked showing my teeth in photos...",
      afterQuote: "The confidence I've gained is incredible. Best decision ever!"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Smile Gallery | Exquisite Dentistry</title>
        <meta name="description" content="View our amazing smile transformations at Exquisite Dentistry." />
      </Helmet>

      {/* Hero Section with VideoHero */}
      <VideoHero
        title={<>Smile <span className="text-gold">Transformations</span></>}
        subtitle="See the incredible results our patients have achieved with our expert dental care."
        primaryCta={{ 
          text: "Schedule a Consultation" 
        }}
        height="medium"
        badgeText="SMILE GALLERY"
        scrollIndicator={true}
      />

      {/* Simplified smile transformation gallery */}
      <section className="bg-white py-10 md:py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-semibold mb-8 text-center">Real Patient Results</h2>
          
          {/* Toggle for before/after */}
          <div className="flex flex-col items-center justify-center mb-8">
            <p className="text-gray-600 mb-3">Toggle between before and after</p>
            <ToggleGroup 
              type="single" 
              value={view} 
              onValueChange={(value) => value && setView(value as "before" | "after")}
              className="border border-gray-200 rounded-full p-1"
            >
              <ToggleGroupItem 
                value="before" 
                className={`rounded-l-full px-6 py-2 ${view === 'before' ? 'bg-gray-800 text-white' : 'bg-transparent text-gray-700'}`}
              >
                Before
              </ToggleGroupItem>
              <ToggleGroupItem 
                value="after" 
                className={`rounded-r-full px-6 py-2 ${view === 'after' ? 'bg-gold text-white' : 'bg-transparent text-gray-700'}`}
              >
                After
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
          
          {/* Patient transformations - simplified grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {patients.map((patient, index) => (
              <div key={index} className="transform transition-all duration-300 hover:scale-[1.02]">
                <Card className="overflow-hidden border-0 shadow-lg h-full">
                  <div className="relative">
                    {/* Patient name badge */}
                    <div className="absolute top-0 left-0 z-10 m-4">
                      <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
                        <h3 className="text-lg font-medium text-gray-800 flex items-center">
                          <Sparkles className="w-4 h-4 mr-2 text-gold" />
                          {patient.name}
                        </h3>
                      </div>
                    </div>

                    {/* Image */}
                    <AspectRatio ratio={3/4} className="bg-black/5">
                      <img 
                        src={view === "before" ? patient.beforeImg : patient.afterImg}
                        alt={`${patient.name}'s smile ${view} transformation`}
                        className="w-full h-full object-cover transition-all duration-500"
                      />
                    </AspectRatio>
                    
                    {/* Corner label */}
                    <div className={`absolute top-0 right-0 ${view === "before" ? "bg-black/80" : "bg-gold"} text-white px-4 py-2 rounded-bl-lg font-medium`}>
                      {view.toUpperCase()}
                    </div>
                  </div>
                  <CardContent className={`p-5 ${view === "before" ? "bg-gradient-to-r from-gray-50 to-white" : "bg-gradient-to-r from-gold/10 to-white"}`}>
                    <p className={`${view === "before" ? "text-gray-600 italic" : "text-gray-800"}`}>
                      {view === "before" ? patient.beforeQuote : patient.afterQuote}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile-optimized CTA section */}
      <section className="bg-gray-50 py-10 md:py-12">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 md:mb-6">Ready for Your Own Transformation?</h2>
          <p className="text-gray-600 mb-6 md:mb-8">Our cosmetic dentistry experts can help you achieve the smile you've always dreamed of.</p>
          <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-4 justify-center`}>
            <Button asChild className="bg-gold hover:bg-gold/90 text-white px-6 py-5 w-full md:w-auto">
              <a href="https://scheduling.simplifeye.co/#key=g5zcQrkS2CtYq4odV42VrV7GyZrpy2F&gaID=null" target="_blank" rel="noopener noreferrer">
                Schedule Your Consultation
                <ChevronRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button asChild variant="outline" className="border-gold text-gold hover:bg-gold/10 w-full md:w-auto">
              <Link to="/contact">
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default SmileGallery;
