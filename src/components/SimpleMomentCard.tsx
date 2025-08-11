import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import SimpleImage from './SimpleImage';

interface SimpleMomentCardProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  imageSrc: string;
  imageAlt: string;
  icon: LucideIcon;
}

const SimpleMomentCard: React.FC<SimpleMomentCardProps> = ({
  title,
  description,
  buttonText,
  buttonLink,
  imageSrc,
  imageAlt,
  icon: Icon,
}) => {
  return (
    <div 
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '4/5',
        borderRadius: '2px',
        overflow: 'hidden',
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
      }}
    >
      <SimpleImage 
        src={imageSrc}
        alt={imageAlt}
        className="absolute inset-0"
      />
      
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 50%, transparent 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          padding: '2rem',
          textAlign: 'center',
        }}
      >
        <div 
          style={{
            width: '4rem',
            height: '4rem',
            borderRadius: '50%',
            backgroundColor: 'rgba(212, 175, 55, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.5rem',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
          }}
        >
          <Icon style={{ width: '1.75rem', height: '1.75rem', color: '#d4af37' }} />
        </div>
        
        <h3 
          style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            marginBottom: '0.75rem',
            lineHeight: '1.25',
          }}
        >
          {title}
        </h3>
        
        <p 
          style={{
            fontSize: '0.875rem',
            marginBottom: '1.5rem',
            lineHeight: '1.5',
            opacity: 0.95,
            maxWidth: '20rem',
          }}
        >
          {description}
        </p>
        
        <Link to={buttonLink}>
          <button
            style={{
              backgroundColor: '#d4af37',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '2px',
              border: 'none',
              fontWeight: '500',
              fontSize: '0.875rem',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
              minHeight: '44px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#c4a037'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#d4af37'}
          >
            {buttonText}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SimpleMomentCard;