import React from 'react';
import SimpleMomentCard from './SimpleMomentCard';
import { specialMoments } from '../data/specialMoments';

const SeasonalTreatments = () => {
  return (
    <section 
      style={{
        padding: '4rem 0',
        backgroundColor: 'hsl(var(--muted))',
      }}
    >
      <div 
        style={{
          maxWidth: '80rem',
          margin: '0 auto',
          padding: '0 1rem',
        }}
      >
        <div 
          style={{
            textAlign: 'center',
            maxWidth: '48rem',
            margin: '0 auto 4rem auto',
          }}
        >
          <span 
            style={{
              display: 'inline-block',
              fontSize: '0.875rem',
              color: 'hsl(var(--secondary))',
              fontWeight: '500',
              marginBottom: '0.75rem',
              letterSpacing: '0.05em',
            }}
          >
            SPECIAL MOMENTS
          </span>
          <h2 
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: '600',
              color: 'hsl(var(--foreground))',
              lineHeight: '1.25',
              marginBottom: '1.5rem',
            }}
          >
            Perfect Your Smile for <span style={{ color: 'hsl(var(--secondary))' }}>Life's Big Moments</span>
          </h2>
          <div 
            style={{
              width: '6rem',
              height: '0.25rem',
              backgroundColor: 'hsl(var(--secondary))',
              margin: '0 auto 1.5rem auto',
            }}
          ></div>
          <p 
            style={{
              fontSize: '1.125rem',
              color: 'hsl(var(--muted-foreground))',
              lineHeight: '1.75',
            }}
          >
            Whether it's your wedding day or graduation, ensure your smile is picture-perfect for every special occasion
          </p>
        </div>

        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            maxWidth: '64rem',
            margin: '0 auto',
          }}
        >
          {specialMoments.map((moment, index) => (
            <SimpleMomentCard 
              key={index}
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