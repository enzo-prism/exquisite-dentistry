
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Headphones, Clock, Sofa, Calendar, ArrowRight, User2 } from 'lucide-react';
import VideoHero from '@/components/VideoHero';
import { YOUTUBE_VIDEOS } from '@/components/VideoHero';
import Button from '@/components/Button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';

interface AmenityProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
  animationDelay?: string;
}

const Amenity: React.FC<AmenityProps> = ({ title, description, icon, className, animationDelay }) => (
  <div 
    className={cn("bg-white p-6 rounded-sm shadow-md", className)}
    style={animationDelay ? { animationDelay } : undefined}
  >
    <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-medium mb-2">{title}</h3>
    <p className="text-black-light/80">
      {description}
    </p>
  </div>
);

const PatientExperience = () => {
  const amenities = [
    {
      title: "Spa-Like Amenities",
      description: "Enjoy soft lighting, warm blankets, noise-canceling headphones, aromatherapy, and hot lemongrass towels.",
      icon: <Sofa size={24} />
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
    }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen page-transition-in">
      {/* Hero Section with YouTube Video */}
      <VideoHero
        posterSrc="https://images.unsplash.com/photo-1620283085068-5aab84e2db3e?q=80&w=2070&auto=format&fit=crop"
        youtubeId={YOUTUBE_VIDEOS.PATIENT}
        title={<>The <span className="text-gold">Patient Experience</span></>}
        subtitle="At Exquisite Dentistry, we've reimagined what a dental visit can be with our focus on comfort, technology, and personalized care."
        primaryCta={{ text: "Book Your First Appointment" }}
        overlayColor="gradient"
        height="medium"
        badgeText="COMFORT & CARE"
        scrollIndicator={false}
      />

      {/* Welcome Section */}
      <section className="section-container">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block text-sm text-gold font-medium mb-3">WELCOME TO EXQUISITE DENTISTRY</span>
          <h1 className="heading-lg mb-6">Redefining the Dental Experience</h1>
          <div className="separator"></div>
          <p className="paragraph mt-6">
            At Exquisite Dentistry, we believe that dental care should be a comfortable and stress-free experience. 
            Dr. Alexie Aguil and our team have created an environment where advanced dental technology meets spa-like comfort, 
            ensuring that every visit is as pleasant as possible.
          </p>
        </div>
      </section>

      {/* Amenities Grid */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="section-container">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <span className="inline-block text-sm text-gold font-medium mb-3">COMFORT & AMENITIES</span>
            <h2 className="heading-lg mb-6">A Dental Experience Like No Other</h2>
            <div className="separator"></div>
            <p className="paragraph mt-6">
              We've carefully designed our offices and services to create a soothing environment 
              that helps alleviate dental anxiety and ensures your complete comfort.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {amenities.map((amenity, index) => (
              <Amenity 
                key={index}
                title={amenity.title}
                description={amenity.description}
                icon={amenity.icon}
                className="opacity-0 animate-fade-in"
                animationDelay={`${index * 150}ms`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <span className="inline-block text-sm text-gold font-medium mb-3">OUR OFFICES</span>
          <h2 className="heading-lg mb-6">Premium Locations Designed for Your Comfort</h2>
          <div className="separator"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Los Angeles Office */}
          <div className="group">
            <div className="relative overflow-hidden rounded-sm shadow-xl mb-6">
              <img 
                src="https://images.unsplash.com/photo-1629909615957-f40c4c5a6951?q=80&w=2071&auto=format&fit=crop" 
                alt="Los Angeles Office" 
                className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-semibold text-white">Los Angeles Office</h3>
                <p className="text-white/90 mt-2">Our flagship location with premium amenities</p>
              </div>
            </div>
            
            <Collapsible className="bg-white p-6 rounded-sm shadow-md">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-xl">Los Angeles Office Amenities</h3>
                <CollapsibleTrigger className="text-gold hover:text-gold/80">
                  <span className="text-sm underline">View Details</span>
                </CollapsibleTrigger>
              </div>
              
              <CollapsibleContent className="mt-4 space-y-3">
                <p className="text-black-light/80">
                  Experience soft lighting, warm blankets, noise-canceling headphones, aromatherapy, 
                  and post-treatment hot lemongrass cloths in our flagship location.
                </p>
                <ul className="space-y-2 mt-4">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-gold rounded-full mr-2"></span>
                    <span>Premium noise-canceling headphones</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-gold rounded-full mr-2"></span>
                    <span>Custom aromatherapy selections</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-gold rounded-full mr-2"></span>
                    <span>Warm blankets and neck pillows</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-gold rounded-full mr-2"></span>
                    <span>Hot lemongrass towels post-treatment</span>
                  </li>
                </ul>
              </CollapsibleContent>
            </Collapsible>
          </div>

          {/* Melrose Office */}
          <div className="group">
            <div className="relative overflow-hidden rounded-sm shadow-xl mb-6">
              <img 
                src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2069&auto=format&fit=crop" 
                alt="Melrose Office" 
                className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-semibold text-white">Melrose Office</h3>
                <p className="text-white/90 mt-2">Contemporary space with artistic elements</p>
              </div>
            </div>
            
            <Collapsible className="bg-white p-6 rounded-sm shadow-md">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-xl">Melrose Office Amenities</h3>
                <CollapsibleTrigger className="text-gold hover:text-gold/80">
                  <span className="text-sm underline">View Details</span>
                </CollapsibleTrigger>
              </div>
              
              <CollapsibleContent className="mt-4 space-y-3">
                <p className="text-black-light/80">
                  Enjoy soft pillows, private treatment rooms, curated local art, and entertainment 
                  options during procedures in our convenient Melrose location.
                </p>
                <ul className="space-y-2 mt-4">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-gold rounded-full mr-2"></span>
                    <span>Private treatment rooms with ambient music</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-gold rounded-full mr-2"></span>
                    <span>Curated art from local artists</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-gold rounded-full mr-2"></span>
                    <span>Entertainment streaming options</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-gold rounded-full mr-2"></span>
                    <span>Comfort-focused dental chairs</span>
                  </li>
                </ul>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>
      </section>

      {/* Patient Involvement */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
              <div>
                <span className="inline-block text-sm text-gold font-medium mb-3">PATIENT INVOLVEMENT</span>
                <h2 className="heading-lg mb-6">Your Voice Matters in Your Treatment</h2>
                <div className="separator-left"></div>
                <p className="paragraph mt-6">
                  We believe in clear communication and active patient participation in all treatment decisions. 
                  Dr. Aguil and our team will thoroughly explain all options and answer any questions you have, 
                  ensuring that you're confident and informed at every step.
                </p>
                <div className="mt-8">
                  <Link to="/contact">
                    <Button className="group">
                      Schedule Your Consultation
                      <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-sm shadow-xl">
                <h3 className="text-xl font-medium mb-4">Our Patient-First Approach</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="w-6 h-6 rounded-full bg-gold/10 text-gold flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">1</span>
                    <div>
                      <h4 className="font-medium mb-1">Comprehensive Consultation</h4>
                      <p className="text-black-light/80 text-sm">We take the time to listen to your concerns and goals before suggesting any treatment.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="w-6 h-6 rounded-full bg-gold/10 text-gold flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">2</span>
                    <div>
                      <h4 className="font-medium mb-1">Education & Options</h4>
                      <p className="text-black-light/80 text-sm">We explain all available treatment options with their benefits and considerations.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="w-6 h-6 rounded-full bg-gold/10 text-gold flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">3</span>
                    <div>
                      <h4 className="font-medium mb-1">Visual Communication</h4>
                      <p className="text-black-light/80 text-sm">Using intraoral cameras and digital imaging to show you exactly what we see and plan.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="w-6 h-6 rounded-full bg-gold/10 text-gold flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">4</span>
                    <div>
                      <h4 className="font-medium mb-1">Collaborative Decision-Making</h4>
                      <p className="text-black-light/80 text-sm">Your input shapes the final treatment plan, ensuring it aligns with your priorities.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto opacity-0 animate-fade-in">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-sans font-semibold text-white leading-tight mb-6">
              Experience <span className="text-gold">Dentistry Reimagined</span>
            </h2>
            <p className="text-lg md:text-xl text-white/80 mb-8 md:mb-10 font-light">
              Book your visit today and discover how comfortable and rewarding dental care can be.
            </p>
            <Button size="xl" className="animate-pulse-subtle">Book an Appointment</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PatientExperience;
