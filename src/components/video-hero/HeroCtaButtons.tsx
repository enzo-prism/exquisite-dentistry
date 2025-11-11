
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

// Scheduling URL constant
const SCHEDULING_URL = "https://scheduling.simplifeye.co#key=g5zcQrkS2CtYq4odV42VrV7GyZrpy2F&gaID=null";

interface CtaButtonsProps {
  primaryCta?: {
    text: string;
    href?: string;
    onClick?: () => void;
    target?: string;
    rel?: string;
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

    const hasCustomHref = typeof primaryCta.href === 'string' && primaryCta.href.trim().length > 0;
    const shouldRenderStandaloneButton = Boolean(primaryCta.onClick && !hasCustomHref);
    const buttonHref = hasCustomHref ? primaryCta.href! : SCHEDULING_URL;

    const ButtonContent = () => (
      <Button 
        variant="default"
        size={buttonSize}
        onClick={primaryCta.onClick}
        type="button"
        className={`group ${isMobile ? 'w-full' : ''}`}
      >
        {primaryCta.text}
        <ArrowRight 
          size={16} 
          className="ml-2 transition-transform duration-300 ease-out motion-reduce:transform-none group-hover:translate-x-1.5" 
        />
      </Button>
    );

    if (shouldRenderStandaloneButton) {
      return (
        <div className={primaryButtonClass}>
          <ButtonContent />
        </div>
      );
    }

    // If it's an external link or scheduling URL
    if (buttonHref.startsWith('http')) {
      return (
        <a 
          href={buttonHref} 
          target={primaryCta.target || "_blank"} 
          rel={primaryCta.rel || "noopener noreferrer"}
          className={primaryButtonClass}
        >
          <ButtonContent />
        </a>
      );
    }

    // For internal routes
    return (
      <Link to={buttonHref} className={primaryButtonClass}>
        <ButtonContent />
      </Link>
    );
  };

  return (
    <div className={containerClass}>
      {renderPrimaryButton()}
      
      {secondaryCta && (
        <Link to={secondaryCta.href} className={isMobile ? "w-full sm:w-auto" : ""}>
          <Button 
            variant="black" 
            size={buttonSize}
            className={`group ${isMobile ? 'w-full' : ''}`}
          >
            {secondaryCta.text}
            <ArrowRight 
              size={16} 
              className="ml-2 transition-transform duration-300 ease-out motion-reduce:transform-none group-hover:translate-x-1.5" 
            />
          </Button>
        </Link>
      )}
    </div>
  );
};

export default HeroCtaButtons;
