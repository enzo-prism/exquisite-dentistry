
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Star, GraduationCap, Check } from 'lucide-react';
import Button from '@/components/Button';
import { cn } from '@/lib/utils';

const Graduation = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-28 md:pt-32 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 md:py-20 bg-gradient-to-b from-black to-black/90">
        <div className="absolute inset-0 opacity-30 mix-blend-overlay">
          <img
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2071&auto=format&fit=crop"
            alt="Graduation smile"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-sans font-semibold text-white leading-tight mb-6">
              Graduate With A <span className="text-gold">Confident Smile</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8">
              Make your graduation photos memorable with our quick and effective cosmetic dental treatments designed specifically for graduates.
            </p>
            <Button size="xl" className="animate-pulse-subtle">Book Your Graduation Smile Consultation</Button>
          </div>
        </div>
      </section>

      {/* Quick Treatments Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-sans font-semibold text-black leading-tight mb-6">
              Quick-Fix <span className="text-gold">Smile Solutions</span>
            </h2>
            <p className="text-lg text-black-light">
              Short on time before graduation? We have fast, effective treatments to ensure you look your best.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 1-2 Week Solutions */}
            <div className="bg-gray-50 p-8 rounded-sm shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold mr-4">
                  <Calendar size={24} />
                </div>
                <h3 className="text-xl font-medium">1-2 Week Solutions</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check size={18} className="text-gold mt-1 mr-2 shrink-0" />
                  <span>Professional teeth whitening (in-office)</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-gold mt-1 mr-2 shrink-0" />
                  <span>Cosmetic dental bonding for chips/gaps</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-gold mt-1 mr-2 shrink-0" />
                  <span>Professional cleaning and polishing</span>
                </li>
              </ul>
            </div>

            {/* 2-4 Week Solutions */}
            <div className="bg-gray-50 p-8 rounded-sm shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold mr-4">
                  <Star size={24} />
                </div>
                <h3 className="text-xl font-medium">2-4 Week Solutions</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check size={18} className="text-gold mt-1 mr-2 shrink-0" />
                  <span>Take-home whitening kits with custom trays</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-gold mt-1 mr-2 shrink-0" />
                  <span>Gingivectomy for gummy smile correction</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-gold mt-1 mr-2 shrink-0" />
                  <span>Single-tooth porcelain crown</span>
                </li>
              </ul>
            </div>

            {/* 1-3 Month Solutions */}
            <div className="bg-gray-50 p-8 rounded-sm shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold mr-4">
                  <GraduationCap size={24} />
                </div>
                <h3 className="text-xl font-medium">1-3 Month Solutions</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check size={18} className="text-gold mt-1 mr-2 shrink-0" />
                  <span>Porcelain veneers (full set)</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-gold mt-1 mr-2 shrink-0" />
                  <span>Multiple crowns or bridges</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-gold mt-1 mr-2 shrink-0" />
                  <span>Limited orthodontic treatment</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Treatments Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-sans font-semibold text-black leading-tight mb-6">
              Most Popular <span className="text-gold">Graduation Treatments</span>
            </h2>
            <p className="text-lg text-black-light">
              These treatments are favorites among graduates for their quick results and lasting impact.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="flex flex-col md:flex-row gap-6 bg-white p-6 rounded-sm shadow-sm">
              <div className="md:w-1/3">
                <img 
                  src="https://images.unsplash.com/photo-1594839688900-0935432b8d15?q=80&w=1974&auto=format&fit=crop"
                  alt="Professional Teeth Whitening" 
                  className="w-full h-full object-cover rounded-sm"
                  loading="lazy"
                />
              </div>
              <div className="md:w-2/3">
                <h3 className="text-xl font-medium mb-3">One-Hour Power Whitening</h3>
                <p className="text-black-light mb-4">
                  Our most popular graduation treatment, this in-office whitening procedure brightens your smile by up to 8 shades in just one hour – perfect for last-minute preparations.
                </p>
                <div className="flex items-center text-sm text-black-light mt-auto">
                  <span className="font-medium mr-2">Treatment Time:</span>
                  <span>60-90 minutes, single appointment</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 bg-white p-6 rounded-sm shadow-sm">
              <div className="md:w-1/3">
                <img 
                  src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=1936&auto=format&fit=crop"
                  alt="Smile Makeover" 
                  className="w-full h-full object-cover rounded-sm"
                  loading="lazy"
                />
              </div>
              <div className="md:w-2/3">
                <h3 className="text-xl font-medium mb-3">Graduation Smile Package</h3>
                <p className="text-black-light mb-4">
                  This comprehensive package includes professional cleaning, in-office whitening, and minor cosmetic bonding to perfect your smile for graduation photos.
                </p>
                <div className="flex items-center text-sm text-black-light mt-auto">
                  <span className="font-medium mr-2">Treatment Time:</span>
                  <span>2-3 hours, can be done in one day</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 bg-white p-6 rounded-sm shadow-sm">
              <div className="md:w-1/3">
                <img 
                  src="https://images.unsplash.com/photo-1628508962459-f41c41c761f4?q=80&w=1972&auto=format&fit=crop"
                  alt="Cosmetic Bonding" 
                  className="w-full h-full object-cover rounded-sm"
                  loading="lazy"
                />
              </div>
              <div className="md:w-2/3">
                <h3 className="text-xl font-medium mb-3">Express Cosmetic Bonding</h3>
                <p className="text-black-light mb-4">
                  Repair chips, close small gaps, or reshape teeth in just one visit with our artistic composite bonding technique – no anesthesia required.
                </p>
                <div className="flex items-center text-sm text-black-light mt-auto">
                  <span className="font-medium mr-2">Treatment Time:</span>
                  <span>30-60 minutes per tooth, same-day results</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 bg-white p-6 rounded-sm shadow-sm">
              <div className="md:w-1/3">
                <img 
                  src="https://images.unsplash.com/photo-1541599468348-e96984315921?q=80&w=2070&auto=format&fit=crop"
                  alt="Dental Veneers" 
                  className="w-full h-full object-cover rounded-sm"
                  loading="lazy"
                />
              </div>
              <div className="md:w-2/3">
                <h3 className="text-xl font-medium mb-3">Front Teeth Veneers</h3>
                <p className="text-black-light mb-4">
                  Transform your most visible teeth with our limited veneer set, focusing on the front 4-6 teeth for maximum impact with faster treatment time.
                </p>
                <div className="flex items-center text-sm text-black-light mt-auto">
                  <span className="font-medium mr-2">Treatment Time:</span>
                  <span>Two appointments over 2-3 weeks</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-sans font-semibold text-black leading-tight mb-6">
              Graduation <span className="text-gold">Success Stories</span>
            </h2>
            <p className="text-lg text-black-light">
              Hear from recent graduates who transformed their smiles for their big day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-8 rounded-sm shadow-sm">
              <div className="flex items-center mb-6">
                <GraduationCap size={24} className="text-gold mr-3" />
                <div className="text-gold">★★★★★</div>
              </div>
              <p className="text-lg italic mb-6">
                "With just two weeks before graduation, Dr. Aguil's one-hour whitening treatment gave me the confidence to smile widely in all my photos. Best investment I made for graduation!"
              </p>
              <div>
                <p className="font-medium">Tyler J.</p>
                <p className="text-sm text-black-light">UCLA Graduate, 2023</p>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-sm shadow-sm">
              <div className="flex items-center mb-6">
                <GraduationCap size={24} className="text-gold mr-3" />
                <div className="text-gold">★★★★★</div>
              </div>
              <p className="text-lg italic mb-6">
                "I had always been self-conscious about my slightly chipped front tooth. Dr. Aguil's cosmetic bonding fixed it in one visit. My graduation photos are perfect now!"
              </p>
              <div>
                <p className="font-medium">Aisha M.</p>
                <p className="text-sm text-black-light">USC Graduate, 2023</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-sans font-semibold text-white leading-tight mb-6">
              Ready to <span className="text-gold">Graduate with Confidence?</span>
            </h2>
            <p className="text-lg md:text-xl text-white/80 mb-8 md:mb-10 font-light">
              Don't wait! Schedule your consultation today and let us help you create a graduation-ready smile.
            </p>
            <Button size="xl">Book Your Graduation Smile Consultation</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Graduation;
