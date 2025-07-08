import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Heart, Flower } from 'lucide-react';

const SeasonalTreatments = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <span className="inline-block text-sm text-secondary font-medium mb-3">SPECIAL MOMENTS</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-sans font-semibold text-foreground leading-tight mb-6">
            Perfect Your Smile for <span className="text-secondary">Life's Big Moments</span>
          </h2>
          <div className="w-24 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Whether it's your wedding day or graduation, ensure your smile is picture-perfect for every special occasion
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Wedding Card */}
          <div className="relative overflow-hidden rounded-sm shadow-lg group transform transition-transform hover:scale-[1.01] duration-300">
            <div className="relative h-[400px] bg-gradient-to-br from-rose-100 via-pink-50 to-purple-100 dark:from-rose-900/20 dark:via-pink-900/20 dark:to-purple-900/20">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col items-center justify-center text-white p-8">
                <div className="w-16 h-16 rounded-full bg-gold/30 flex items-center justify-center mb-6 shadow-lg">
                  <Heart className="h-7 w-7 text-gold" />
                </div>
                <h3 className="text-2xl md:text-3xl font-semibold mb-3 text-center">Wedding Smile Preparation</h3>
                <p className="text-center text-gray-200 mb-6 leading-relaxed">
                  Look radiant on your special day with our comprehensive wedding smile makeover packages
                </p>
                <Link to="/wedding" className="inline-flex">
                  <div className="bg-gold hover:bg-gold/90 text-white px-6 py-3 rounded-sm font-medium transition-colors duration-300 shadow-lg hover:shadow-xl">
                    Plan Your Perfect Smile
                  </div>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Graduation Card */}
          <div className="relative overflow-hidden rounded-sm shadow-lg group transform transition-transform hover:scale-[1.01] duration-300">
            <div className="relative h-[400px]">
              <img 
                src="/lovable-uploads/ced61c9e-85aa-49c9-8378-f0ed60da48fc.png"
                alt="Happy graduates with perfect smiles"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col items-center justify-center text-white p-8">
                <div className="w-16 h-16 rounded-full bg-gold/30 flex items-center justify-center mb-6 shadow-lg">
                  <Flower className="h-7 w-7 text-gold" />
                </div>
                <h3 className="text-2xl md:text-3xl font-semibold mb-3 text-center">Graduation Smile Treatment</h3>
                <p className="text-center text-gray-200 mb-6 leading-relaxed">
                  Celebrate your achievements with confidence - get graduation-ready with our smile enhancement treatments
                </p>
                <Link to="/graduation" className="inline-flex">
                  <div className="bg-gold hover:bg-gold/90 text-white px-6 py-3 rounded-sm font-medium transition-colors duration-300 shadow-lg hover:shadow-xl">
                    Get Graduation Ready
                  </div>
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