
import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import ServiceCard from '@/components/ServiceCard';

interface ServiceItemProps {
  title: string;
  description: string;
  href: string;
  index: number;
}

const services: ServiceItemProps[] = [
  {
    title: "Porcelain Veneers",
    description: "Transform your smile with custom-designed, ultra-thin porcelain shells that cover imperfections and create a naturally beautiful appearance.",
    href: "/services#cosmetic",
    index: 0
  },
  {
    title: "Smile Makeovers",
    description: "Comprehensive treatment plans combining multiple procedures to completely transform your smile's appearance.",
    href: "/services#cosmetic",
    index: 1
  },
  {
    title: "Invisalign",
    description: "Discreet clear aligners that gradually straighten teeth without the need for traditional metal braces.",
    href: "/services#specialty",
    index: 2
  },
  {
    title: "Dental Implants",
    description: "Permanent, natural-looking tooth replacements that restore both function and aesthetics to your smile.",
    href: "/services#restorative",
    index: 3
  },
  {
    title: "Full Mouth Reconstruction",
    description: "Comprehensive restoration of all teeth in both jaws through a combination of restorative procedures.",
    href: "/services#restorative",
    index: 4
  }
];

const ServicesSection: React.FC = () => {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Our <span className="text-gold">Services</span>
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Comprehensive cosmetic and restorative dental solutions tailored to your unique needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.slice(0, 3).map((service) => (
            <ServiceCard
              key={service.title}
              title={service.title}
              description={service.description}
              href={service.href}
              index={service.index}
            />
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {services.slice(3, 5).map((service) => (
            <ServiceCard
              key={service.title}
              title={service.title}
              description={service.description}
              href={service.href}
              index={service.index}
            />
          ))}
        </div>
        
        <div className="flex justify-center mt-12">
          <Link to="/services" className="inline-flex items-center border border-gold text-black hover:bg-gold/5 px-6 py-3 rounded-sm transition-colors group">
            View All Services 
            <ArrowRight className="ml-2 h-5 w-5 transform transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
