import React from 'react';
import { Button } from '@/components/ui/button';
import { Star, Award, Users, Clock } from 'lucide-react';
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
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Section */}
          <div className="relative">
            <div className="relative aspect-[4/5] max-w-md mx-auto lg:max-w-full rounded-lg overflow-hidden shadow-2xl">
              <ImageComponent
                src="/lovable-uploads/7fc03f27-6c3a-4d2a-bba6-961af127a9f0.png"
                alt="Dr. Alexie Aguil, DDS - Professional portrait in dental office"
                fill={true}
                objectFit="cover"
                objectPosition="center"
                priority={true}
              />
            </div>
            {/* Floating Stats Card */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-lg shadow-xl p-6 hidden md:block">
              <div className="text-center">
                <div className="text-3xl font-bold text-gold">15+</div>
                <div className="text-sm text-gray-600">Years of Excellence</div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="lg:pl-8">
            <div className="inline-block text-sm text-gold font-medium mb-3">MEET YOUR DENTIST</div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-6">
              Dr. Alexie <span className="text-gold">Aguil</span>
            </h2>
            <div className="separator mb-6"></div>
            
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              With over 15 years of experience in cosmetic dentistry, Dr. Aguil has transformed thousands of smiles 
              using the latest techniques and technology. His commitment to excellence and patient comfort has made 
              him one of Los Angeles' most trusted cosmetic dentists.
            </p>

            <p className="text-gray-600 mb-8 leading-relaxed">
              Dr. Aguil specializes in porcelain veneers, smile makeovers, and advanced cosmetic procedures, 
              combining artistry with precision to deliver exceptional results that exceed expectations.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="bg-gold/10 rounded-full p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                      <IconComponent className="h-5 w-5 text-gold" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                );
              })}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                asChild 
                size="lg" 
                className="bg-gold hover:bg-gold/90 text-white px-8 py-3"
              >
                <a href="/about">Learn More About Dr. Aguil</a>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                asChild
                className="border-gold text-gold hover:bg-gold hover:text-white px-8 py-3"
              >
                <a href="https://scheduling.simplifeye.co/#key=g5zcQrkS2CtYq4odV42VrV7GyZrpy2F&gaID=null">
                  Schedule Consultation
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoctorIntroSection;