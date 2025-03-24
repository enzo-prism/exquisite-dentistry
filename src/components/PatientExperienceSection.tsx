
import React from 'react';
import { Headphones, Clock, Sofa, Calendar } from 'lucide-react';
import Button from '@/components/Button';
import { Link } from 'react-router-dom';

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

const PatientExperienceSection: React.FC = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-sm text-gold font-medium mb-3">PATIENT EXPERIENCE</span>
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
            <h3 className="heading-sm">Our Office</h3>
            
            <div className="bg-white p-6 rounded-sm shadow-md mb-6">
              <h4 className="font-medium text-lg mb-2">Wilshire Boulevard Location</h4>
              <p className="text-black-light/80 mb-4">
                Experience soft lighting, warm blankets, noise-canceling headphones, aromatherapy, and post-treatment hot lemongrass cloths in our modern, comfortable office at 6227 Wilshire Blvd.
              </p>
              <div className="flex items-start text-black-light/80">
                <span className="font-medium mr-2">Address:</span> 
                <span>6227 Wilshire Blvd, Los Angeles, CA 90048</span>
              </div>
            </div>
            
            <div className="bg-gold/10 p-6 rounded-sm border-l-4 border-gold">
              <h4 className="font-medium text-lg mb-2">Patient Involvement</h4>
              <p className="text-black-light/80">
                We believe in clear communication and active patient participation in all treatment decisions. Dr. Aguil and our team will thoroughly explain all options and answer any questions you have.
              </p>
            </div>
            
            <div className="pt-4">
              <Link to="/contact">
                <Button className="group">
                  Schedule Your Visit
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 transition-transform group-hover:translate-x-1">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PatientExperienceSection;
