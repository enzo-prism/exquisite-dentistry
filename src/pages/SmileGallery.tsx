
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import VideoHero from '@/components/VideoHero';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, ChevronRight } from 'lucide-react';

const SmileGallery = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

      {/* Smile transformation gallery with improved design */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-semibold mb-12 text-center">Real Patient Results</h2>
          
          {/* First patient - Brittany */}
          <div className="mb-24">
            <div className="flex items-center justify-center mb-10">
              <div className="bg-gold/20 px-6 py-2.5 rounded-full">
                <h3 className="text-2xl font-medium text-gold flex items-center">
                  <Sparkles className="w-5 h-5 mr-2.5" />
                  Brittany's Transformation
                </h3>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
              {/* Before image */}
              <div className="transform transition-all duration-500 hover:scale-105">
                <Card className="overflow-hidden border-0 shadow-lg">
                  <div className="relative">
                    <div className="absolute top-0 left-0 bg-black/80 text-white px-6 py-3 rounded-br-lg font-medium z-10">
                      BEFORE
                    </div>
                    <AspectRatio ratio={3/4} className="bg-black/5">
                      <img 
                        src="/lovable-uploads/7be70408-3316-4a36-8ad0-68fafc9d0e05.png" 
                        alt="Brittany's smile before transformation"
                        className="w-full h-full object-cover"
                      />
                    </AspectRatio>
                  </div>
                  <CardContent className="bg-gradient-to-r from-gray-50 to-white p-5">
                    <p className="text-gray-600 italic">
                      "I was always self-conscious about my smile..."
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              {/* After image */}
              <div className="transform transition-all duration-500 hover:scale-105">
                <Card className="overflow-hidden border-0 shadow-xl">
                  <div className="relative">
                    <div className="absolute top-0 left-0 bg-gold text-white px-6 py-3 rounded-br-lg font-medium z-10">
                      AFTER
                    </div>
                    <AspectRatio ratio={3/4} className="bg-black/5">
                      <img 
                        src="/lovable-uploads/52dd6454-e5d1-4a7e-aa17-65a34cbc8044.png" 
                        alt="Brittany's smile after transformation"
                        className="w-full h-full object-cover"
                      />
                    </AspectRatio>
                  </div>
                  <CardContent className="bg-gradient-to-r from-gold/10 to-white p-5">
                    <p className="text-gray-800">
                      "Now I can't stop smiling! Dr. Aguil changed my life."
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
          
          {/* Second patient - Ryan */}
          <div>
            <div className="flex items-center justify-center mb-10">
              <div className="bg-gold/20 px-6 py-2.5 rounded-full">
                <h3 className="text-2xl font-medium text-gold flex items-center">
                  <Sparkles className="w-5 h-5 mr-2.5" />
                  Ryan's Transformation
                </h3>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
              {/* Before image */}
              <div className="transform transition-all duration-500 hover:scale-105">
                <Card className="overflow-hidden border-0 shadow-lg">
                  <div className="relative">
                    <div className="absolute top-0 left-0 bg-black/80 text-white px-6 py-3 rounded-br-lg font-medium z-10">
                      BEFORE
                    </div>
                    <AspectRatio ratio={3/4} className="bg-black/5">
                      <img 
                        src="/lovable-uploads/8e2e1684-e2b2-4ebe-81de-ffec0bb4c801.png" 
                        alt="Ryan's smile before transformation"
                        className="w-full h-full object-cover"
                      />
                    </AspectRatio>
                  </div>
                  <CardContent className="bg-gradient-to-r from-gray-50 to-white p-5">
                    <p className="text-gray-600 italic">
                      "I never liked showing my teeth in photos..."
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              {/* After image */}
              <div className="transform transition-all duration-500 hover:scale-105">
                <Card className="overflow-hidden border-0 shadow-xl">
                  <div className="relative">
                    <div className="absolute top-0 left-0 bg-gold text-white px-6 py-3 rounded-br-lg font-medium z-10">
                      AFTER
                    </div>
                    <AspectRatio ratio={3/4} className="bg-black/5">
                      <img 
                        src="/lovable-uploads/4820b0df-82b4-4e9b-9724-b8d1f720712b.png" 
                        alt="Ryan's smile after transformation"
                        className="w-full h-full object-cover"
                      />
                    </AspectRatio>
                  </div>
                  <CardContent className="bg-gradient-to-r from-gold/10 to-white p-5">
                    <p className="text-gray-800">
                      "The confidence I've gained is incredible. Best decision ever!"
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">Ready for Your Own Transformation?</h2>
          <p className="text-gray-600 mb-8">Our cosmetic dentistry experts can help you achieve the smile you've always dreamed of.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-gold hover:bg-gold/90 text-white px-8 py-6">
              <a href="https://scheduling.simplifeye.co/#key=g5zcQrkS2CtYq4odV42VrV7GyZrpy2F&gaID=null" target="_blank" rel="noopener noreferrer">
                Schedule Your Consultation
                <ChevronRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button asChild variant="outline" className="border-gold text-gold hover:bg-gold/10">
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
