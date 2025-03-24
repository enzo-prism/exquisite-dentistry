import React, { useEffect } from 'react';
import { Smile, Shield, Wrench, Stethoscope, ArrowRight, Check } from 'lucide-react';
import Button from '@/components/Button';
import { cn } from '@/lib/utils';

const Services = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const services = [
    {
      id: "cosmetic",
      title: "Cosmetic Dentistry",
      icon: <Smile size={40} />,
      description: "Transform your smile with our range of advanced cosmetic procedures, designed to enhance the appearance of your teeth and overall smile.",
      treatments: [
        { name: "Teeth Whitening", details: "Professional whitening treatments that remove stains and discoloration, giving you a brighter, more youthful smile." },
        { name: "Porcelain Veneers", details: "Custom-made, thin shells of porcelain that cover the front surface of teeth to improve appearance and provide a natural, beautiful look." },
        { name: "Smile Makeovers", details: "Comprehensive treatment plans combining multiple cosmetic procedures to achieve your ideal smile." },
        { name: "Composite Bonding", details: "Tooth-colored resin applied to repair chips, cracks, or gaps, enhancing your smile's appearance." }
      ],
      image: "https://images.unsplash.com/photo-1581600140682-79c8177640fb?q=80&w=1903&auto=format&fit=crop"
    },
    {
      id: "preventive",
      title: "Preventive Care",
      icon: <Shield size={40} />,
      description: "Maintain optimal oral health and prevent potential issues with our comprehensive preventive care services.",
      treatments: [
        { name: "Regular Checkups", details: "Thorough examinations to detect any potential issues early, preventing more serious problems." },
        { name: "Professional Cleanings", details: "Remove plaque and tartar buildup to maintain healthy teeth and gums." },
        { name: "Oral Cancer Screenings", details: "Early detection screenings that can be life-saving." },
        { name: "Dental Sealants", details: "Protective coatings applied to prevent decay in children and adults." }
      ],
      image: "https://images.unsplash.com/photo-1606265752439-1f18756aa8fc?q=80&w=1964&auto=format&fit=crop"
    },
    {
      id: "restorative",
      title: "Restorative Dentistry",
      icon: <Wrench size={40} />,
      description: "Restore the function, integrity, and morphology of missing tooth structure due to decay or trauma with our advanced restorative procedures.",
      treatments: [
        { name: "Dental Implants", details: "Permanent replacements for missing teeth that look, feel, and function like natural teeth." },
        { name: "Crowns & Bridges", details: "Restore damaged teeth or replace missing teeth with natural-looking prosthetics." },
        { name: "Inlays & Onlays", details: "Conservative alternatives to crowns that preserve more of your natural tooth structure." },
        { name: "Dentures", details: "Full or partial dentures to replace multiple missing teeth and restore your smile." }
      ],
      image: "https://images.unsplash.com/photo-1579683563554-ca08d70a1265?q=80&w=1887&auto=format&fit=crop"
    },
    {
      id: "specialized",
      title: "Specialized Procedures",
      icon: <Stethoscope size={40} />,
      description: "Advanced dental treatments using the latest technology and techniques to address specific oral health concerns.",
      treatments: [
        { name: "TMJ Treatment", details: "Alleviate pain and discomfort from temporomandibular joint disorders." },
        { name: "Sleep Apnea Solutions", details: "Custom oral appliances to help manage sleep apnea and improve sleep quality." },
        { name: "Root Canal Therapy", details: "Comfortable, effective treatment to save infected or damaged teeth." },
        { name: "Laser Dentistry", details: "Minimally invasive procedures using advanced laser technology for enhanced precision and comfort." }
      ],
      image: "https://images.unsplash.com/photo-1579684288361-5c1a2957a700?q=80&w=1887&auto=format&fit=crop"
    }
  ];
  
  return (
    <div className="min-h-screen pt-24 page-transition-in">
      {/* Hero Section */}
      <section className="relative py-24">
        <div className="absolute top-0 inset-0 bg-[url('https://images.unsplash.com/photo-1629909615184-74f495363b67?q=80&w=2069&auto=format&fit=crop')] bg-cover bg-center h-[50vh]">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-xs"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block bg-gold/90 text-white px-4 py-1 rounded-sm text-sm font-medium mb-6">
              OUR SERVICES
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-semibold text-white leading-tight mb-6">
              Comprehensive <span className="text-gold">Dental Services</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="-mt-32 relative z-20 mb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow-xl rounded-sm p-8 md:p-12 lg:p-16">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="heading-lg mb-6">Excellence in Every Aspect of Dental Care</h2>
              <div className="separator"></div>
              <p className="paragraph mb-8">
                At Exquisite Dentistry, we offer a comprehensive range of dental services utilizing the latest techniques and technology. From routine preventive care to advanced cosmetic and restorative procedures, we are committed to providing exceptional treatment tailored to your unique needs.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-12">
                {services.map((service, index) => (
                  <a 
                    key={service.id} 
                    href={`#${service.id}`}
                    className="flex flex-col items-center text-center group"
                  >
                    <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mb-4 text-gold group-hover:bg-gold group-hover:text-white transition-all duration-300">
                      {service.icon}
                    </div>
                    <span className="font-medium text-black group-hover:text-gold transition-colors duration-300">
                      {service.title}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Sections */}
      {services.map((service, index) => (
        <section 
          key={service.id}
          id={service.id} 
          className={cn(
            "py-20",
            index % 2 === 1 ? "bg-gray-50" : ""
          )}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className={cn(
                "space-y-6",
                index % 2 === 1 ? "lg:order-2" : ""
              )}>
                <span className="inline-block text-sm text-gold font-medium">OUR SERVICES</span>
                <h2 className="heading-lg">{service.title}</h2>
                <div className="separator-left"></div>
                <p className="paragraph">
                  {service.description}
                </p>
                
                <div className="space-y-4 py-4">
                  {service.treatments.map((treatment) => (
                    <div key={treatment.name} className="flex">
                      <div className="flex-shrink-0 mt-1">
                        <Check size={18} className="text-gold" />
                      </div>
                      <div className="ml-3">
                        <h4 className="font-medium text-black">{treatment.name}</h4>
                        <p className="text-sm text-black-light/80 mt-1">{treatment.details}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="pt-4">
                  <Button className="group">
                    Schedule a Consultation
                    <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
              
              <div className={cn(
                "relative",
                index % 2 === 1 ? "lg:order-1" : ""
              )}>
                <div className="aspect-[4/3] rounded-sm overflow-hidden shadow-xl">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-white rounded-sm shadow-lg p-6 flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                    {service.icon}
                  </div>
                  <span className="text-xl font-medium text-black">{service.title}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA Section */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-sans font-semibold text-white leading-tight mb-6">
              Ready to Transform <span className="text-gold">Your Smile?</span>
            </h2>
            <p className="text-xl text-white/80 mb-10 font-light">
              Schedule your consultation today and discover how our comprehensive dental services can enhance your smile and oral health.
            </p>
            <Button size="lg">Book an Appointment</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
