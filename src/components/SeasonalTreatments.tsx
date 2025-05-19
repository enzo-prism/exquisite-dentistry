
import React from 'react';
import { Link } from 'react-router-dom';
import { Flower } from 'lucide-react';
import OptimizedImage from '@/components/OptimizedImage';
import Button from '@/components/Button';

const SeasonalTreatments: React.FC = () => {
  return (
    <section className="bg-gradient-to-b from-black/5 to-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block text-sm text-gold font-medium mb-3">SPECIAL OCCASIONS</span>
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Seasonal <span className="text-gold">Treatments</span>
          </h2>
          <div className="separator mx-auto"></div>
          <p className="text-gray-600 mt-6 max-w-2xl mx-auto">
            Special services designed for life's important moments
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Wedding Card */}
          <div className="relative overflow-hidden rounded-sm shadow-lg group transform transition-transform hover:scale-[1.01] duration-300">
            <div className="relative h-[400px]">
              <OptimizedImage
                src="/lovable-uploads/96c9493a-c97f-4076-b224-591c2e9c50e6.png"
                alt="Wedding couple smiling"
                fill={true}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-black/40 flex flex-col items-center justify-center text-white p-8">
                <div className="w-16 h-16 rounded-full bg-gold/30 flex items-center justify-center mb-6 shadow-lg">
                  <Flower className="h-7 w-7 text-gold" />
                </div>
                <h3 className="text-2xl md:text-3xl font-semibold mb-3">Wedding Smile Packages</h3>
                <p className="text-center text-white/90 mb-6 max-w-md">
                  Look your absolute best on your special day with our customized wedding smile treatments.
                </p>
                <Link to="/wedding">
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-white text-white hover:bg-white/10 group shadow-md"
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
          <div className="relative overflow-hidden rounded-sm shadow-lg group transform transition-transform hover:scale-[1.01] duration-300">
            <div className="relative h-[400px]">
              <OptimizedImage
                src="/lovable-uploads/b873d422-2613-49ad-b9ef-d12c878cf4f4.png"
                alt="Graduates smiling"
                fill={true}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-black/40 flex flex-col items-center justify-center text-white p-8">
                <div className="w-16 h-16 rounded-full bg-gold/30 flex items-center justify-center mb-6 shadow-lg">
                  <Flower className="h-7 w-7 text-gold" />
                </div>
                <h3 className="text-2xl md:text-3xl font-semibold mb-3">Graduation Smile Treatment</h3>
                <p className="text-center text-white/90 mb-6 max-w-md">
                  Graduate with confidence with our quick, effective smile enhancement solutions.
                </p>
                <Link to="/graduation">
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-white text-white hover:bg-white/10 group shadow-md"
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
