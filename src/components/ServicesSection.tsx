import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ServiceCard from '@/components/ServiceCard';
import { useMobile } from '@/hooks/use-mobile';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '@/components/ui/carousel';

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
  const isMobile = useMobile();

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block text-sm text-gold font-medium mb-3">OUR EXPERTISE</span>
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Our <span className="text-gold">Services</span>
          </h2>
          <div className="separator mx-auto"></div>
          <p className="text-gray-600 mt-6 max-w-2xl mx-auto">
            Comprehensive cosmetic and restorative dental solutions tailored to your unique needs
          </p>
        </div>
        
        {isMobile ? (
          // Mobile carousel view
          <div className="px-4 md:hidden">
            <Carousel className="w-full">
              <CarouselContent>
                {services.map((service) => (
                  <CarouselItem key={service.title}>
                    <ServiceCard
                      title={service.title}
                      description={service.description}
                      href={service.href}
                      index={service.index}
                      className="h-full"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center gap-4 mt-6">
                <CarouselPrevious className="relative static transform-none translate-y-0 left-0" />
                <CarouselNext className="relative static transform-none translate-y-0 right-0" />
              </div>
            </Carousel>
          </div>
        ) : (
          // Desktop grid view (unchanged)
          <>
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
          </>
        )}
        
        <div className="flex justify-center mt-12">
          <Link to="/services" className="inline-flex items-center bg-white border border-gold text-black hover:bg-gold/5 px-6 py-3 rounded-sm shadow-sm transition-colors group">
            View All Services 
            <ArrowRight className="ml-2 h-5 w-5 transform transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
