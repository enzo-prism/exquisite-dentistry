
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, GraduationCap } from 'lucide-react';
import OptimizedImage from '@/components/OptimizedImage';
import Button from '@/components/Button';

const SeasonalTreatments: React.FC = () => {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Seasonal <span className="text-gold">Treatments</span>
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Special services for life's important moments
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Wedding Card */}
          <div className="relative overflow-hidden rounded-sm group">
            <div className="relative h-[400px]">
              <OptimizedImage
                src="/lovable-uploads/9683bb53-6591-4e0a-9a1d-6f49d54ea2b1.png"
                alt="Wedding couple smiling"
                fill={true}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white p-8">
                <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center mb-6">
                  <Calendar className="h-7 w-7 text-gold" />
                </div>
                <h3 className="text-2xl md:text-3xl font-semibold mb-3">Wedding Smile Packages</h3>
                <p className="text-center text-white/80 mb-6">
                  Look your absolute best on your special day with our customized wedding smile treatments.
                </p>
                <Link to="/wedding">
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-white text-white hover:bg-white/10 group"
                  >
                    Wedding Smile Guide
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2 transition-transform group-hover:translate-x-1">
                      <path d="M1 8H15M15 8L8 1M15 8L8 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Graduation Card */}
          <div className="relative overflow-hidden rounded-sm group">
            <div className="relative h-[400px]">
              <OptimizedImage
                src="/lovable-uploads/993eead8-0b95-49ef-84bc-778c614cda09.png"
                alt="Graduates smiling"
                fill={true}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white p-8">
                <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center mb-6">
                  <GraduationCap className="h-7 w-7 text-gold" />
                </div>
                <h3 className="text-2xl md:text-3xl font-semibold mb-3">Graduation Smile Treatment</h3>
                <p className="text-center text-white/80 mb-6">
                  Graduate with confidence with our quick, effective smile enhancement solutions.
                </p>
                <Link to="/graduation">
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-white text-white hover:bg-white/10 group"
                  >
                    Graduation Smile Guide
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2 transition-transform group-hover:translate-x-1">
                      <path d="M1 8H15M15 8L8 1M15 8L8 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeasonalTreatments;
