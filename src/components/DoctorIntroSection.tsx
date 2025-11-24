import React from 'react';
import { Button } from '@/components/ui/button';
import ConversionButton from '@/components/ConversionButton';
import { Star, Award, Users, Clock, Wand2, Sparkles, ClipboardCheck, HandHeart } from 'lucide-react';
import ImageComponent from '@/components/Image';
import { drAguilImages } from '@/data/drAguilImages';

const DoctorIntroSection: React.FC = () => {
  const stats = [
    { icon: Star, label: '5-Star Reviews', value: '500+' },
    { icon: Award, label: 'Years Experience', value: '15+' },
    { icon: Users, label: 'Happy Patients', value: '2000+' },
    { icon: Clock, label: 'Procedures', value: '5000+' },
  ];

  return (
    <section className="py-12 md:py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile First Design */}
        <div className="space-y-8 md:space-y-12 lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center lg:space-y-0">
          
          {/* Content Section - Mobile First */}
          <div className="text-center lg:text-left lg:order-2">
            <div className="inline-block text-xs sm:text-sm text-gold font-medium mb-2 sm:mb-3">EXQUISITE DENTISTRY</div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 sm:mb-6">
              Meet Dr. Alexie <span className="text-gold">Aguil</span>
            </h2>
            <div className="separator mx-auto lg:mx-0 mb-4 sm:mb-6"></div>
            
            <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Transforming smiles with precision, artistry, and compassionate care
            </p>

            <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              With over 15 years of experience in cosmetic dentistry, Dr. Aguil has transformed thousands of smiles 
              using the latest techniques and technology. His commitment to excellence and patient comfort has made 
              him one of Los Angeles' most trusted cosmetic dentists.
            </p>

            {/* Mobile Stats - 2x2 Grid */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8 max-w-sm mx-auto lg:max-w-none">
              {[
                { label: 'Board Certified', value: 'Cosmetic Dentistry' },
                { label: 'Happy Patients', value: '2,500+' },
                { label: 'Years Experience', value: '15+' },
                { label: 'Success Rate', value: '98%' }
              ].map((stat, index) => (
                <div key={index} className="text-center p-3 sm:p-4 bg-gold/5 rounded-lg">
                  <div className="text-lg sm:text-xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-gray-600 leading-tight">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Why Choose Section - Mobile Optimized */}
            <div className="mb-6 sm:mb-8 text-center lg:text-left">
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-900">Why Choose Dr. Aguil?</h3>
              <ul className="space-y-3 text-sm sm:text-base text-gray-600 max-w-md mx-auto lg:mx-0">
                {[
                  { icon: Wand2, label: 'Precision-crafted smile transformations' },
                  { icon: Sparkles, label: 'Advanced cosmetic dentistry techniques' },
                  { icon: ClipboardCheck, label: 'Personalized treatment planning' },
                  { icon: HandHeart, label: 'Comfortable, anxiety-free experience' }
                ].map(({ icon: Icon, label }) => (
                  <li key={label} className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/10 text-gold">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="text-gray-700">{label}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Buttons - Mobile Optimized */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <Button 
                asChild 
                size="lg" 
                className="px-6 sm:px-8 py-3 min-h-[44px] touch-optimized"
              >
                <a href="/about">Learn More About Dr. Aguil</a>
              </Button>
              <ConversionButton 
                variant="outline" 
                size="lg" 
                className="px-6 sm:px-8 py-3 min-h-[44px] touch-optimized"
                href="https://scheduling.simplifeye.co#key=g5zcQrkS2CtYq4odV42VrV7GyZrpy2F&gaID=null"
                target="_blank"
                rel="noopener noreferrer"
              >
                Schedule Consultation
              </ConversionButton>
            </div>
          </div>

          {/* Image Section - Mobile Optimized */}
          <div className="relative lg:order-1">
            <div className="relative aspect-[4/5] sm:aspect-[3/4] max-w-xs sm:max-w-sm mx-auto lg:max-w-full rounded-lg overflow-hidden shadow-2xl">
              <ImageComponent
                src="/lovable-uploads/7fc03f27-6c3a-4d2a-bba6-961af127a9f0.webp"
                alt="Dr. Alexie Aguil - Premium business portrait"
                fill={true}
                objectFit="cover"
                objectPosition="center"
                priority={true}
              />
            </div>
            {/* Floating Stats Card - Hidden on mobile, visible on larger screens */}
            <div className="absolute -bottom-4 -right-4 bg-white rounded-lg shadow-xl p-4 hidden lg:block">
              <div className="text-center">
                <div className="text-2xl font-bold text-gold">15+</div>
                <div className="text-xs text-gray-600">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoctorIntroSection;
