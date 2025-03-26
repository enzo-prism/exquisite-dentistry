import React, { useEffect } from 'react';
import Button from '@/components/Button';
import VideoHero from '@/components/VideoHero';
import { YOUTUBE_VIDEOS } from '@/components/VideoHero';
import { Smile, Shield, Wrench, Stethoscope, ArrowRight, Check, Camera, Monitor } from 'lucide-react';
import { cn } from '@/lib/utils';

// Define services data
const services = [
  {
    id: "cosmetic",
    title: "Cosmetic Dentistry",
    description: "Transform your smile with our comprehensive cosmetic dental services. We combine artistic vision with technical precision to create beautiful, natural-looking results that enhance your confidence.",
    highlight: "Our signature smile makeovers are custom-designed to complement your facial features and achieve your aesthetic goals.",
    icon: <Smile size={24} />,
    image: "/lovable-uploads/a7c198f8-b229-4850-af33-aff84c90fd94.png",
    treatments: [
      {
        name: "Porcelain Veneers",
        details: "Custom-designed porcelain shells that cover the front surface of teeth to improve appearance"
      },
      {
        name: "Professional Teeth Whitening",
        details: "Advanced in-office and take-home whitening systems for brilliantly white teeth"
      },
      {
        name: "Smile Makeovers",
        details: "Comprehensive treatment plans combining multiple procedures for total smile transformation"
      },
      {
        name: "Cosmetic Bonding",
        details: "Tooth-colored resin applied to repair chips, cracks, and discoloration"
      }
    ]
  },
  {
    id: "restorative",
    title: "Restorative Dentistry",
    description: "Restore function and aesthetics to damaged or missing teeth with our advanced restorative solutions. We focus on long-lasting results that look and feel completely natural.",
    highlight: "Our metal-free restorations provide superior strength without compromising aesthetics.",
    icon: <Wrench size={24} />,
    image: "/lovable-uploads/ab504393-67bf-4498-b08e-0ff259231b9e.png",
    treatments: [
      {
        name: "Dental Implants",
        details: "Permanent tooth replacement that looks, feels, and functions like natural teeth"
      },
      {
        name: "Porcelain Crowns & Bridges",
        details: "Beautiful, durable restorations to repair damaged teeth or replace missing teeth"
      },
      {
        name: "Inlays & Onlays",
        details: "Conservative alternatives to full crowns that preserve more of your natural tooth structure"
      },
      {
        name: "Full & Partial Dentures",
        details: "Removable appliances to replace multiple missing teeth and restore function"
      }
    ]
  },
  {
    id: "preventive",
    title: "Preventive Care",
    description: "Maintain optimal oral health with our comprehensive preventive care services. Regular preventive care helps detect issues early, saving you time, discomfort, and expense in the long run.",
    highlight: "Our preventive approach includes thorough oral cancer screenings at every regular check-up.",
    icon: <Shield size={24} />,
    image: "/lovable-uploads/9605398c-9376-492f-96bf-fe0660461b0b.png",
    treatments: [
      {
        name: "Comprehensive Exams",
        details: "Thorough evaluation of your oral health, including teeth, gums, and supporting structures"
      },
      {
        name: "Professional Cleaning",
        details: "Removal of plaque and tartar to prevent cavities and gum disease"
      },
      {
        name: "Digital X-Rays",
        details: "Low-radiation imaging to detect issues not visible during a visual examination"
      },
      {
        name: "Oral Cancer Screenings",
        details: "Early detection of abnormal tissues that may indicate precancerous conditions"
      }
    ]
  },
  {
    id: "specialty",
    title: "Specialty Services",
    description: "Access specialized dental care without being referred elsewhere. Our comprehensive range of specialty services allows us to address complex dental issues with the same attention to comfort and quality.",
    highlight: "Dr. Aguil's advanced training allows us to offer specialized care that many general practices cannot provide.",
    icon: <Stethoscope size={24} />,
    image: "https://images.unsplash.com/photo-1606265752439-1f18756c8df2?q=80&w=2070&auto=format&fit=crop",
    treatments: [
      {
        name: "Invisalign® Clear Aligners",
        details: "Discreet orthodontic treatment to straighten teeth without metal braces"
      },
      {
        name: "TMJ/TMD Therapy",
        details: "Treatment for jaw pain, clicking, and limited mouth movement"
      },
      {
        name: "Sleep Apnea Solutions",
        details: "Custom oral appliances to improve breathing during sleep"
      },
      {
        name: "Laser Gum Therapy",
        details: "Minimally invasive treatment for gum disease and cosmetic gum procedures"
      }
    ]
  }
];

const Services = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen page-transition-in">
      {/* Hero Section with YouTube Video */}
      <VideoHero
        posterSrc="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=2070&auto=format&fit=crop"
        youtubeId={YOUTUBE_VIDEOS.PROCEDURE}
        title={<>Our <span className="text-gold">Services</span></>}
        subtitle="Exquisite Dentistry offers a complete range of cosmetic, restorative, and general dental services in Los Angeles."
        primaryCta={{ text: "Book an Appointment" }}
        overlayColor="gradient"
        height="medium"
        badgeText="EXCEPTIONAL DENTAL CARE"
        scrollIndicator={false}
      />

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
