import React, { useEffect } from 'react';
import PageSEO from '@/components/seo/PageSEO';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import VideoHero from '@/components/VideoHero';
import {
  Smile,
  Shield,
  Wrench,
  Stethoscope,
  ArrowRight,
  Check,
  Camera,
  Monitor,
  Sparkles,
  Palette,
  Cpu
} from 'lucide-react';
import { cn } from '@/lib/utils';
import ImageComponent from '@/components/Image';
import UniversalVideoPlayer from '@/components/UniversalVideoPlayer';
import { serviceCategories, SCHEDULING_URL } from '@/data/services';

import MasterStructuredData from '@/components/seo/MasterStructuredData';
import MedicalProcedureStructuredData from '@/components/seo/MedicalProcedureStructuredData';
import TopicClusterWidget from '@/components/TopicClusterWidget';
import InternalLinkingWidget from '@/components/InternalLinkingWidget';

// Icon mapping helper
const getIcon = (iconName: string) => {
  const icons = {
    Smile: <Smile size={24} />,
    Shield: <Shield size={24} />,
    Wrench: <Wrench size={24} />,
    Stethoscope: <Stethoscope size={24} />
  };
  return icons[iconName as keyof typeof icons] || <Smile size={24} />;
};

const Services = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const differentiators = [
    {
      title: 'Artistic Smile Design',
      description:
        'Preview your transformation with digital smile design that harmonizes with your facial features.',
      Icon: Palette
    },
    {
      title: 'Precision-Driven Technology',
      description:
        '3D imaging, iTero scanning, and meticulous planning deliver accurate, comfortable treatment journeys.',
      Icon: Cpu
    },
    {
      title: 'Elevated Patient Experience',
      description:
        'Relaxing amenities and compassionate care create a spa-like visit tailored to your comfort.',
      Icon: Sparkles
    }
  ];

  const serviceNavigation = [
    {
      id: 'cosmetic',
      title: 'Cosmetic Dentistry',
      description: 'Signature veneers, whitening, and bespoke smile makeovers crafted for you.',
      Icon: Smile
    },
    {
      id: 'restorative',
      title: 'Restorative Dentistry',
      description: 'Full-mouth rehabilitation, crowns, implants, and tooth-colored restorations.',
      Icon: Wrench
    },
    {
      id: 'preventive',
      title: 'Preventive Care',
      description: 'Comprehensive exams, cleanings, and proactive screenings to protect your smile.',
      Icon: Shield
    },
    {
      id: 'specialty',
      title: 'Specialty Services',
      description: 'Laser therapies, full-mouth reconstruction, and advanced clinical expertise.',
      Icon: Stethoscope
    },
    {
      id: 'invisalign',
      title: 'Invisalign®',
      description: 'Discreet clear aligners shaped by digital precision for confident results.',
      Icon: Sparkles
    }
  ];

  return (
    <>
      <MasterStructuredData 
        includeBusiness={true}
        includeWebsite={true}
        additionalSchemas={[{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          '@id': 'https://exquisitedentistryla.com/services/#catalog',
          name: 'Dental Services Catalog',
          description: 'Comprehensive dental services offered at Exquisite Dentistry in Los Angeles',
          url: 'https://exquisitedentistryla.com/services/',
          numberOfItems: 6,
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              item: {
                '@type': 'MedicalProcedure',
                name: 'Porcelain Veneers',
                description: 'Ultra-thin porcelain shells designed to cover the front surface of teeth for a perfect smile transformation',
                url: 'https://exquisitedentistryla.com/veneers/',
                category: 'Cosmetic Dentistry',
                provider: {
                  '@id': 'https://exquisitedentistryla.com/#business'
                },
                performer: {
                  '@id': 'https://exquisitedentistryla.com/#doctor'
                }
              }
            },
            {
              '@type': 'ListItem',
              position: 2,
              item: {
                '@type': 'MedicalProcedure',
                name: 'Teeth Whitening',
                description: 'Professional teeth whitening treatments for a brighter, more confident smile',
                url: 'https://exquisitedentistryla.com/zoom-whitening/',
                category: 'Cosmetic Dentistry',
                provider: {
                  '@id': 'https://exquisitedentistryla.com/#business'
                },
                performer: {
                  '@id': 'https://exquisitedentistryla.com/#doctor'
                }
              }
            },
            {
              '@type': 'ListItem',
              position: 3,
              item: {
                '@type': 'MedicalProcedure',
                name: 'Dental Implants',
                description: 'Permanent tooth replacement solution using titanium implants for natural-looking results',
                url: 'https://exquisitedentistryla.com/services/',
                category: 'Restorative Dentistry',
                provider: {
                  '@id': 'https://exquisitedentistryla.com/#business'
                },
                performer: {
                  '@id': 'https://exquisitedentistryla.com/#doctor'
                }
              }
            },
            {
              '@type': 'ListItem',
              position: 4,
              item: {
                '@type': 'MedicalProcedure',
                name: 'Invisalign Clear Aligners',
                description: 'Discreet orthodontic treatment using clear, removable aligners to straighten teeth',
                url: 'https://exquisitedentistryla.com/services/',
                category: 'Orthodontics',
                provider: {
                  '@id': 'https://exquisitedentistryla.com/#business'
                },
                performer: {
                  '@id': 'https://exquisitedentistryla.com/#doctor'
                }
              }
            },
            {
              '@type': 'ListItem',
              position: 5,
              item: {
                '@type': 'MedicalProcedure',
                name: 'Dental Crowns',
                description: 'Custom-made caps that cover damaged or decayed teeth to restore function and appearance',
                url: 'https://exquisitedentistryla.com/services/',
                category: 'Restorative Dentistry',
                provider: {
                  '@id': 'https://exquisitedentistryla.com/#business'
                },
                performer: {
                  '@id': 'https://exquisitedentistryla.com/#doctor'
                }
              }
            },
            {
              '@type': 'ListItem',
              position: 6,
              item: {
                '@type': 'MedicalProcedure',
                name: 'Smile Makeover',
                description: 'Comprehensive cosmetic dental treatment combining multiple procedures for complete smile transformation',
                url: 'https://exquisitedentistryla.com/services/',
                category: 'Cosmetic Dentistry',
                provider: {
                  '@id': 'https://exquisitedentistryla.com/#business'
                },
                performer: {
                  '@id': 'https://exquisitedentistryla.com/#doctor'
                }
              }
            }
          ]
        }]}
      />
      
      <PageSEO
        title="Cosmetic Dentistry LA | Veneers, Whitening, Implants"
        description="Complete cosmetic dentistry in LA: porcelain veneers, Zoom whitening, Invisalign & implants. Advanced techniques, natural results. Call today!"
        keywords="cosmetic dental services, porcelain veneers Los Angeles, teeth whitening, dental implants, smile makeover, dental crowns, cosmetic dentistry Beverly Hills"
        path="/services"
        ogImage="https://exquisitedentistryla.com/lovable-uploads/2e2732fc-c4a6-4f21-9829-3717d9b2b36d.png"
      />

      {/* Add structured data for key services */}
      <MedicalProcedureStructuredData
        procedureName="Cosmetic Dental Services"
        description="Comprehensive cosmetic dentistry services including porcelain veneers, teeth whitening, dental implants, and complete smile makeovers"
        url="/services"
        procedureType="Cosmetic Dental Procedures"
        bodyLocation="Oral and Dental System"
        benefits={[
          "Enhanced smile aesthetics",
          "Improved confidence",
          "Long-lasting results",
          "Natural appearance"
        ]}
        priceRange="$500-$5,000+ depending on procedure"
      />
      
      <VideoHero 
        vimeoId="1076745525"
        title={<>Advanced Cosmetic & <span className="text-gold">Restorative Dental Services</span></>} 
        subtitle="Experience the full spectrum of modern dentistry with procedures ranging from preventive care to complex smile makeovers. Our Los Angeles practice near Beverly Hills combines artistic vision with cutting-edge technology to deliver exceptional results." 
        primaryCta={{
          text: "Book Appointment",
          href: SCHEDULING_URL,
          target: "_blank",
          rel: "noopener noreferrer"
        }}
        secondaryCta={{ text: "View Smile Gallery", href: "/smile-gallery" }}
        overlayColor="gradient" 
        height="medium" 
        badgeText="COMPREHENSIVE DENTAL EXCELLENCE" 
        scrollIndicator={false} 
      />

      <section className="relative -mt-16 sm:-mt-24 md:-mt-32 z-20 mb-16 sm:mb-20 md:mb-24">
        <div className="absolute inset-0 bg-gradient-to-br from-[#f8fafc] via-white to-[#edf2f7]" aria-hidden="true" />
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-20 -left-10 h-48 w-48 rounded-full bg-gold/20 blur-3xl opacity-60" aria-hidden="true" />
          <div className="absolute bottom-[-6rem] right-[-4rem] h-64 w-64 rounded-full bg-primary/10 blur-3xl opacity-50" aria-hidden="true" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-black/5 bg-white/70 shadow-2xl backdrop-blur-sm">
            <div className="absolute -top-20 right-0 h-56 w-56 rounded-full bg-gold/30 blur-3xl opacity-60" aria-hidden="true" />
            <div className="relative grid gap-12 lg:grid-cols-[1.2fr,1fr] p-6 sm:p-10 lg:p-14">
              <div className="space-y-8">
                <div className="space-y-4 max-w-2xl">
                  <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-[0.4em] uppercase text-gold">
                    Signature Care Journey
                  </span>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-black tracking-tight">
                    Where Technology Meets Artistry
                  </h2>
                  <p className="text-base sm:text-lg text-black-light/80 leading-relaxed">
                    Our Los Angeles practice near Beverly Hills delivers the complete spectrum of modern dentistry—from transformative aesthetics to comprehensive restorative solutions. Dr. Aguil blends time-honored techniques with the latest innovations, ensuring each experience is as precise and personal as it is beautiful.
                  </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {differentiators.map(({ title, description, Icon }) => (
                    <div
                      key={title}
                      className="rounded-2xl border border-black/5 bg-white/80 p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gold/15 text-gold">
                          <Icon size={20} />
                        </div>
                        <h3 className="text-base font-semibold text-black">{title}</h3>
                      </div>
                      <p className="mt-3 text-sm text-black-light/80 leading-relaxed">{description}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <a href={SCHEDULING_URL} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                    <Button className="group w-full sm:w-auto">
                      Schedule a Consultation
                      <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </a>
                  <Link to="/contact" className="w-full sm:w-auto">
                    <Button variant="outline" className="w-full sm:w-auto">
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {serviceNavigation.map(({ id, title, description, Icon }) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    className="group relative overflow-hidden rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-2xl"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary transition group-hover:bg-gold group-hover:text-white">
                        <Icon size={22} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-black">{title}</h3>
                        <p className="mt-2 text-sm text-black-light/80 leading-relaxed">{description}</p>
                      </div>
                    </div>
                    <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:text-gold">
                      Explore {title}
                      <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {serviceCategories.map((service, index) => (
        <section key={service.id} id={service.id} className={cn("py-20", index % 2 === 1 ? "bg-gray-50" : "")}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className={cn("space-y-6", index % 2 === 1 ? "lg:order-2" : "")}>
                <span className="inline-block text-sm text-gold font-medium">OUR SERVICES</span>
                <h2 className="heading-lg">{service.title}</h2>
                <div className="separator-left"></div>
                <p className="paragraph">{service.description}</p>
                
                {service.highlight && (
                  <div className="bg-gold/10 p-4 rounded-sm border-l-4 border-gold">
                    <p className="font-medium text-black">{service.highlight}</p>
                  </div>
                )}
                
                <div className="space-y-4 py-4">
                  {service.treatments.map(treatment => (
                    <div key={treatment.name} className="flex justify-between items-start">
                      <div className="flex flex-1">
                        <div className="flex-shrink-0 mt-1">
                          <Check size={18} className="text-gold" />
                        </div>
                        <div className="ml-3 flex-1">
                          <h4 className="font-medium text-black">{treatment.name}</h4>
                          <p className="text-sm text-black-light/80 mt-1">{treatment.details}</p>
                        </div>
                      </div>
                      {treatment.hasDetailPage && treatment.slug && (
                        <div className="ml-4 flex-shrink-0">
                          <a href="https://exquisiteveneersla.com/" target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" size="sm" className="text-xs border-gold text-gold hover:bg-gold/5">
                              View Veneer Details
                            </Button>
                          </a>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                 <div className="pt-4 flex flex-col gap-3">
                  <a href={SCHEDULING_URL} target="_blank" rel="noopener noreferrer">
                    <Button className="group">
                      Schedule a Consultation
                      <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </a>
                  <Link to="/contact">
                    <Button variant="outline" size="sm">
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className={cn("relative", index % 2 === 1 ? "lg:order-1" : "")}>
                <div className="aspect-[4/3] rounded-sm overflow-hidden shadow-xl">
                  <ImageComponent src={service.image} alt={service.title} className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Invisalign Section */}
      <section id="invisalign" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <span className="inline-block text-sm text-gold font-medium">CLEAR ALIGNERS</span>
              <h2 className="heading-lg">Invisalign Treatment</h2>
              <div className="separator-left"></div>
              <p className="paragraph">
                Straighten your teeth discreetly with Invisalign clear aligners. Our advanced digital treatment planning ensures precise, comfortable results that fit seamlessly into your lifestyle.
              </p>
              
              <div className="space-y-4 py-4">
                <div className="flex items-start">
                  <Check size={18} className="text-gold mt-1 flex-shrink-0" />
                  <div className="ml-3">
                    <h4 className="font-medium text-black">Nearly Invisible</h4>
                    <p className="text-sm text-black-light/80 mt-1">Clear aligners that are virtually undetectable when worn</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Check size={18} className="text-gold mt-1 flex-shrink-0" />
                  <div className="ml-3">
                    <h4 className="font-medium text-black">Removable Convenience</h4>
                    <p className="text-sm text-black-light/80 mt-1">Eat, drink, brush, and floss normally throughout treatment</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Check size={18} className="text-gold mt-1 flex-shrink-0" />
                  <div className="ml-3">
                    <h4 className="font-medium text-black">Comfortable Design</h4>
                    <p className="text-sm text-black-light/80 mt-1">Smooth plastic with no metal brackets, wires, or sharp edges</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Check size={18} className="text-gold mt-1 flex-shrink-0" />
                  <div className="ml-3">
                    <h4 className="font-medium text-black">Predictable Results</h4>
                    <p className="text-sm text-black-light/80 mt-1">3D digital planning shows your expected results before treatment begins</p>
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                <a href={SCHEDULING_URL} target="_blank" rel="noopener noreferrer">
                  <Button className="group">
                    Schedule Invisalign Consultation
                    <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </a>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white shadow-lg rounded-sm border border-gray-100 overflow-hidden">
                <UniversalVideoPlayer
                  platform="vimeo"
                  videoId="1114914495"
                  title="Invisalign Treatment at Exquisite Dentistry"
                  thumbnailUrl="/lovable-uploads/77e54716-bd1f-4933-a6e9-a2e31367a263.png"
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

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
              <h3 className="heading-sm mb-4">Invisalign iTero scanner</h3>
              <p className="text-black-light/80">
                Our advanced 3D scanner creates precise digital impressions without the discomfort of traditional methods, improving treatment planning and results.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <span className="inline-block text-sm text-gold font-medium">CLIENT EXPERIENCE</span>
              <h2 className="heading-lg">Exceptional Comfort & Care</h2>
              <div className="separator-left"></div>
              <p className="paragraph">
                At Exquisite Dentistry, we've reimagined what a dental visit can be. Our spa-like environment features amenities designed for your ultimate comfort:
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <Check size={18} className="text-gold mt-1 flex-shrink-0" />
                  <div className="ml-3">
                    <h4 className="font-medium text-black">Spa-Like Amenities</h4>
                    <p className="text-sm text-black-light/80 mt-1">Soft lighting and warm blankets for ultimate comfort</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Check size={18} className="text-gold mt-1 flex-shrink-0" />
                  <div className="ml-3">
                    <h4 className="font-medium text-black">Noise-Canceling Experience</h4>
                    <p className="text-sm text-black-light/80 mt-1">High-quality headphones to help you relax during treatment</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Check size={18} className="text-gold mt-1 flex-shrink-0" />
                  <div className="ml-3">
                    <h4 className="font-medium text-black">Aromatherapy & Wellness</h4>
                    <p className="text-sm text-black-light/80 mt-1">Calming scents and hot lemongrass towels after treatment</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Check size={18} className="text-gold mt-1 flex-shrink-0" />
                  <div className="ml-3">
                    <h4 className="font-medium text-black">Private Treatment Rooms</h4>
                    <p className="text-sm text-black-light/80 mt-1">Comfortable, private spaces with entertainment options</p>
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                <a href={SCHEDULING_URL} target="_blank" rel="noopener noreferrer">
                  <Button className="group">
                    Experience Our Difference
                    <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </a>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-[4/3] rounded-sm overflow-hidden shadow-xl">
                <ImageComponent
                  alt="Spa-like dental environment"
                  className="w-full h-full object-cover"
                  src="/lovable-uploads/e1a7d23f-3c7b-4c52-a1ac-7862140cf0af.png"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white rounded-sm shadow-lg p-6 max-w-xs">
                <p className="text-black-light italic text-sm">
                  "We believe that exceptional dental care should be a comfortable, stress-free experience from start to finish."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Topic Clusters Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Explore Treatment Options
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover comprehensive solutions for your smile goals
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TopicClusterWidget
              title="Smile Makeover Hub"
              description="Complete transformation solutions"
              centralHub={{
                title: "Complete Smile Makeover",
                href: "/services#cosmetic",
                description: "Transform your entire smile with our comprehensive approach",
                type: "service"
              }}
              spokes={[
                {
                  title: "Porcelain Veneers",
                  href: "/veneers",
                  description: "Perfect teeth in just visits",
                  type: "service",
                  featured: true
                },
                {
                  title: "Teeth Whitening",
                  href: "/zoom-whitening",
                  description: "Professional brightening treatment",
                  type: "service"
                },
                {
                  title: "Before & After Gallery",
                  href: "/smile-gallery",
                  description: "See real transformation results",
                  type: "gallery"
                },
                {
                  title: "Patient Stories",
                  href: "/testimonials",
                  description: "Hear from transformed patients",
                  type: "testimonial"
                }
              ]}
            />

            <TopicClusterWidget
              title="Special Occasions"
              description="Perfect smile for life's moments"
              centralHub={{
                title: "Wedding & Graduation Prep",
                href: "/wedding",
                description: "Look your absolute best for special occasions",
                type: "special"
              }}
              spokes={[
                {
                  title: "Wedding Smiles",
                  href: "/wedding",
                  description: "Perfect smile for your big day",
                  type: "special",
                  featured: true
                },
                {
                  title: "Graduation Ready",
                  href: "/graduation", 
                  description: "Confident smile for photos",
                  type: "special"
                },
                {
                  title: "Quick Solutions",
                  href: "/veneers",
                  description: "Fast results for tight timelines",
                  type: "service"
                },
                {
                  title: "Timeline Planning",
                  href: "/contact",
                  description: "Plan your treatment schedule",
                  type: "consultation"
                }
              ]}
            />

            <TopicClusterWidget
              title="Orthodontic Solutions"
              description="Straighter teeth, better confidence"
              centralHub={{
                title: "Invisalign Treatment",
                href: "/services#invisalign",
                description: "Discreet teeth straightening with clear aligners",
                type: "service"
              }}
              spokes={[
                {
                  title: "Invisalign vs Braces",
                  href: "/blog/invisalign-clear-advantage-over-traditional-braces",
                  description: "Compare your options",
                  type: "blog",
                  featured: true
                },
                {
                  title: "Student Discounts",
                  href: "/graduation",
                  description: "Special rates for students",
                  type: "special"
                },
                {
                  title: "Treatment Gallery",
                  href: "/smile-gallery",
                  description: "Before & after results",
                  type: "gallery"
                },
                {
                  title: "Free Consultation",
                  href: "/contact",
                  description: "Get your custom plan",
                  type: "consultation"
                }
              ]}
            />
          </div>

          <div className="mt-12">
            <InternalLinkingWidget 
              context="general" 
              variant="expanded"
              title="Start Your Smile Journey"
              currentPage="/services"
            />
          </div>
        </div>
      </section>

      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-sans font-semibold text-white leading-tight mb-6">
              Ready to Transform <span className="text-gold">Your Smile?</span>
            </h2>
            <p className="text-xl text-white/80 mb-10 font-light">
              Schedule your consultation today and discover how our comprehensive dental services can enhance your smile and oral health.
            </p>
            <a href={SCHEDULING_URL} target="_blank" rel="noopener noreferrer">
              <Button size="lg">Book an Appointment</Button>
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
