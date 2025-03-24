
import React, { useEffect } from 'react';
import { Smile, Shield, Wrench, Stethoscope, ArrowRight, Check, Camera, Monitor } from 'lucide-react';
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
      description: "Transform your smile with our comprehensive range of cosmetic procedures, where Dr. Aguil's expertise has made us a leading provider in Beverly Hills and West Hollywood.",
      highlight: "Dr. Aguil is ranked as a top Invisalign provider in West Hollywood and Beverly Hills.",
      treatments: [
        { name: "Porcelain Veneers", details: "Custom-made, thin shells of porcelain that cover the front surface of teeth to improve appearance and provide a natural, beautiful look." },
        { name: "Invisalign", details: "Clear aligner therapy for straightening teeth without the appearance of traditional braces." },
        { name: "Smile Makeovers", details: "Comprehensive treatment plans combining multiple cosmetic procedures to achieve your ideal smile." },
        { name: "Dental Bonding", details: "Using composite resin to repair chipped, cracked, or discolored teeth with natural-looking results." },
        { name: "Laser Teeth Whitening", details: "Advanced whitening technology that removes deep stains for a brighter, more youthful smile." }
      ],
      image: "https://images.unsplash.com/photo-1581600140682-79c8177640fb?q=80&w=1903&auto=format&fit=crop"
    },
    {
      id: "general",
      title: "General Dentistry",
      icon: <Shield size={40} />,
      description: "Maintain optimal oral health with our comprehensive general dentistry services, designed to prevent issues and keep your smile healthy for life.",
      highlight: "We offer same-day emergency appointments at our Melrose location.",
      treatments: [
        { name: "Teeth Cleaning", details: "Professional cleanings to remove plaque and tartar buildup, maintaining healthy teeth and gums." },
        { name: "Oral Cancer Screening", details: "Early detection screenings that can be life-saving, performed during regular checkups." },
        { name: "Pain-Free Dentistry", details: "Utilizing the latest techniques and amenities to ensure a comfortable, stress-free experience." },
        { name: "Root Canals", details: "Comfortable, effective treatment to save infected or damaged teeth and relieve pain." },
        { name: "Emergency Dental Care", details: "Same-day appointments for urgent dental issues at our Melrose location." }
      ],
      image: "https://images.unsplash.com/photo-1606265752439-1f18756aa8fc?q=80&w=1964&auto=format&fit=crop"
    },
    {
      id: "restorative",
      title: "Restorative Dentistry",
      icon: <Wrench size={40} />,
      description: "Restore the function, integrity, and aesthetics of your teeth with our advanced restorative procedures customized to your unique needs.",
      highlight: "",
      treatments: [
        { name: "Dental Implants", details: "Permanent replacements for missing teeth that look, feel, and function like natural teeth." },
        { name: "Porcelain Dental Crowns", details: "Tooth-colored crowns that protect damaged teeth while providing a natural appearance." },
        { name: "Dental Bridges", details: "Replace missing teeth by bridging the gap between existing teeth with natural-looking prosthetics." },
        { name: "Full Mouth Restorations", details: "Comprehensive procedures to restore function and aesthetics to your entire mouth." },
        { name: "Implant-Supported Restorations", details: "Advanced solutions combining implants with crowns, bridges or dentures for optimal results." }
      ],
      image: "https://images.unsplash.com/photo-1579683563554-ca08d70a1265?q=80&w=1887&auto=format&fit=crop"
    },
    {
      id: "specialized",
      title: "Specialized Treatments",
      icon: <Stethoscope size={40} />,
      description: "Experience exceptional care with our specialized dental treatments, designed to address specific concerns with the highest level of expertise.",
      highlight: "",
      treatments: [
        { name: "Sedation Dentistry", details: "Gentle and effective sedation methods for anxious patients or complex procedures." },
        { name: "Gum Treatments", details: "Non-surgical treatments to maintain healthy gums and prevent periodontal disease." },
        { name: "Night Guards & TMJ Treatment", details: "Custom solutions for teeth grinding and temporomandibular joint discomfort." },
        { name: "Laser Dentistry", details: "Minimally invasive procedures using advanced laser technology for enhanced precision and comfort." },
        { name: "Digital Smile Design", details: "Advanced technology to preview your smile transformation before treatment begins." }
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
                At Exquisite Dentistry, Dr. Alexie Aguil offers a comprehensive range of dental services utilizing the latest techniques and technology. From advanced cosmetic procedures to general and restorative treatments, we are committed to providing exceptional care tailored to your unique needs.
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
                
                {service.highlight && (
                  <div className="bg-gold/10 p-4 rounded-sm border-l-4 border-gold">
                    <p className="font-medium text-black">{service.highlight}</p>
                  </div>
                )}
                
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

      {/* Technology Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block text-sm text-gold font-medium mb-3">ADVANCED TECHNOLOGY</span>
            <h2 className="heading-lg mb-6">Cutting-Edge Dental Equipment</h2>
            <div className="separator"></div>
            <p className="paragraph">
              We utilize state-of-the-art technology to enhance precision, efficiency, and comfort during your dental treatment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-sm shadow-md">
              <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center text-gold mb-6">
                <Camera size={32} />
              </div>
              <h3 className="heading-sm mb-4">Intraoral Cameras</h3>
              <p className="text-black-light/80">
                High-definition intraoral cameras allow us to show you exactly what we see, helping you understand your treatment needs and options.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-sm shadow-md">
              <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center text-gold mb-6">
                <Monitor size={32} />
              </div>
              <h3 className="heading-sm mb-4">Digital X-Rays</h3>
              <p className="text-black-light/80">
                Digital radiography provides immediate, high-quality images with significantly reduced radiation exposure compared to traditional x-rays.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-sm shadow-md">
              <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center text-gold mb-6">
                <span className="text-2xl font-bold">3D</span>
              </div>
              <h3 className="heading-sm mb-4">3Shape Trios Scanner</h3>
              <p className="text-black-light/80">
                Our advanced 3D scanner creates precise digital impressions without the discomfort of traditional methods, improving treatment planning and results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Patient Experience */}
      <section className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <span className="inline-block text-sm text-gold font-medium">PATIENT EXPERIENCE</span>
            <h2 className="heading-lg">Exceptional Comfort & Care</h2>
            <div className="separator-left"></div>
            <p className="paragraph">
              At Exquisite Dentistry, we've reimagined what a dental visit can be. Our spa-like environment features amenities designed for your ultimate comfort:
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <Check size={24} className="text-gold flex-shrink-0 mt-1" />
                <p className="ml-3">Soft lighting and warm blankets</p>
              </div>
              <div className="flex items-start">
                <Check size={24} className="text-gold flex-shrink-0 mt-1" />
                <p className="ml-3">Noise-canceling headphones</p>
              </div>
              <div className="flex items-start">
                <Check size={24} className="text-gold flex-shrink-0 mt-1" />
                <p className="ml-3">Aromatherapy</p>
              </div>
              <div className="flex items-start">
                <Check size={24} className="text-gold flex-shrink-0 mt-1" />
                <p className="ml-3">Private treatment rooms</p>
              </div>
              <div className="flex items-start">
                <Check size={24} className="text-gold flex-shrink-0 mt-1" />
                <p className="ml-3">Entertainment options during procedures</p>
              </div>
              <div className="flex items-start">
                <Check size={24} className="text-gold flex-shrink-0 mt-1" />
                <p className="ml-3">Hot lemongrass towels after treatment</p>
              </div>
            </div>
            
            <div className="pt-4">
              <Button className="group">
                Experience Our Difference
                <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-[4/3] rounded-sm overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1521453510357-5c7a77db7074?q=80&w=2144&auto=format&fit=crop" 
                alt="Spa-like dental environment" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white rounded-sm shadow-lg p-6 max-w-xs">
              <p className="text-black-light italic text-sm">
                "We believe that exceptional dental care should be a comfortable, stress-free experience from start to finish."
              </p>
            </div>
          </div>
        </div>
      </section>

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
