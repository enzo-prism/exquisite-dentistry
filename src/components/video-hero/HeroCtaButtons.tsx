
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@/components/Button';
import { ArrowRight } from 'lucide-react';

interface CtaButtonsProps {
  primaryCta?: {
    text: string;
    href?: string;
    onClick?: () => void;
  };
  secondaryCta?: {
    text: string;
    href: string;
  };
  isMobile?: boolean;
}

const HeroCtaButtons: React.FC<CtaButtonsProps> = ({
  primaryCta,
  secondaryCta,
  isMobile = false
}) => {
  const buttonSize = isMobile ? "default" : "lg";
  const containerClass = isMobile ? "flex flex-col sm:flex-row gap-4" : "flex flex-wrap items-center gap-4";
  const primaryButtonClass = isMobile ? "w-full sm:w-auto" : "";

  const renderPrimaryButton = () => {
    if (!primaryCta) return null;

    const ButtonContent = () => (
      <Button 
        size={buttonSize}
        onClick={primaryCta.onClick}
        fullWidth={isMobile}
        className="group shadow-lg hover:shadow-xl transition-all duration-300"
      >
        {primaryCta.text}
        <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
      </Button>
    );

    if (primaryCta.href) {
      if (primaryCta.href.startsWith('http')) {
        return (
          <a 
            href={primaryCta.href} 
            target="_blank" 
            rel="noopener noreferrer"
            className={primaryButtonClass}
          >
            <ButtonContent />
          </a>
        );
      }
      return (
        <Link to={primaryCta.href} className={primaryButtonClass}>
          <ButtonContent />
        </Link>
      );
    }
    return <ButtonContent />;
  };

  return (
    <div className={containerClass}>
      {renderPrimaryButton()}
      
      {secondaryCta && (
        <Link to={secondaryCta.href} className={isMobile ? "w-full sm:w-auto" : ""}>
          <Button 
            variant="outline" 
            size={buttonSize}
            className="border-white text-white hover:bg-white/10 group"
            fullWidth={isMobile}
          >
            {secondaryCta.text}
            <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      )}
    </div>
  );
};

export default HeroCtaButtons;

