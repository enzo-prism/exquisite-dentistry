import React from 'react';
import SpecialMomentCard from './SpecialMomentCard';
import { specialMoments } from '../data/specialMoments';

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
          {specialMoments.map((moment) => (
            <SpecialMomentCard 
              key={moment.id}
              title={moment.title}
              description={moment.description}
              buttonText={moment.buttonText}
              buttonLink={moment.buttonLink}
              imageSrc={moment.imageSrc}
              imageAlt={moment.imageAlt}
              icon={moment.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SeasonalTreatments;