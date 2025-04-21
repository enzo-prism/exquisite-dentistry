
import React from 'react';
import { Headphones, Clock, Sofa, Calendar } from 'lucide-react';
import Button from '@/components/Button';
import { Link } from 'react-router-dom';

const SCHEDULING_URL = "https://scheduling.simplifeye.co/#key=g5zcQrkS2CtYq4odV42VrV7GyZrpy2F&gaID=null";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <Sofa size={24} />,
    title: "Spa-Like Amenities",
    description: "Enjoy soft lighting, warm blankets, noise-canceling headphones, aromatherapy, and hot lemongrass towels."
  },
  {
    icon: <Calendar size={24} />,
    title: "Convenient Scheduling",
    description: "Same-day emergency appointments, early morning/lunchtime slots, and family block appointments."
  },
  {
    icon: <Clock size={24} />,
    title: "24/7 Online Booking",
    description: "Book appointments anytime, day or night, through our convenient online scheduling system."
  },
  {
    icon: <Headphones size={24} />,
    title: "Entertainment Options",
    description: "Stream your favorite shows or music during treatment to help you relax and enjoy your visit."
  }
];

const ClientExperienceSection: React.FC = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-sm text-gold font-medium mb-3">CLIENT EXPERIENCE</span>
          <h2 className="heading-lg mb-6">Exceptional Comfort & Care</h2>
          <div className="separator"></div>
          <p className="paragraph">
            At Exquisite Dentistry, we've reimagined what a dental visit can be, focusing on your comfort, convenience, and peace of mind.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-sm shadow-md">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                <p className="text-black-light/80">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
          
          <div className="space-y-6">
            <div className="relative rounded-sm overflow-hidden shadow-md mb-6">
              <img 
                src="/lovable-uploads/3e26b70e-31d0-4e1f-95b7-b2f1144f262b.png" 
                alt="Patient relaxing in dental chair" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-white text-xl font-semibold mb-2">Dr. Aguil's Approach</h3>
                <p className="text-white/90 text-sm">
                  "My goal is to make every patient feel comfortable and cared for throughout their visit." - Dr. Alexie Aguil
                </p>
              </div>
            </div>
            
            <div className="bg-gold/10 p-6 rounded-sm border-l-4 border-gold">
              <h4 className="font-medium text-lg mb-2">Client Involvement</h4>
              <p className="text-black-light/80">
                We believe in clear communication and active client participation in all treatment decisions. Dr. Aguil and our team will thoroughly explain all options and answer any questions you have.
              </p>
            </div>
            
            <div className="pt-4">
              <a href={SCHEDULING_URL} target="_blank" rel="noopener noreferrer">
                <Button className="group">
                  Schedule Your Visit
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 transition-transform group-hover:translate-x-1">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientExperienceSection;
