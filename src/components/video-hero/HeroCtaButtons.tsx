
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
    href?: string;
    onClick?: () => void;
    target?: string;
    rel?: string;
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

  const handleHashClick = (hash: string) => (event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    event.preventDefault();
    const targetId = hash.replace('#', '');
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const renderPrimaryButton = () => {
    if (!primaryCta) return null;

    const hasCustomHref = typeof primaryCta.href === 'string' && primaryCta.href.trim().length > 0;
    const shouldRenderStandaloneButton = Boolean(primaryCta.onClick && !hasCustomHref);
    const buttonHref = hasCustomHref ? primaryCta.href! : SCHEDULING_URL;
    const isHashLink = buttonHref.startsWith('#');

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

    if (isHashLink) {
      return (
        <div className={primaryButtonClass}>
          <Button 
            variant="default"
            size={buttonSize}
            onClick={handleHashClick(buttonHref)}
            type="button"
            className={`group ${isMobile ? 'w-full' : ''}`}
          >
            {primaryCta.text}
            <ArrowRight 
              size={16} 
              className="ml-2 transition-transform duration-300 ease-out motion-reduce:transform-none group-hover:translate-x-1.5" 
            />
          </Button>
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
      {secondaryCta && (() => {
        const hasHref = typeof secondaryCta.href === 'string' && secondaryCta.href.trim().length > 0;
        const shouldRenderStandaloneButton = Boolean(secondaryCta.onClick && !hasHref);
        const buttonHref = hasHref ? secondaryCta.href! : undefined;
        const wrapperClass = isMobile ? "w-full sm:w-auto" : "";
        const isHashLink = buttonHref?.startsWith('#');

        const ButtonContent = () => (
          <Button 
            variant="black" 
            size={buttonSize}
            className={`group ${isMobile ? 'w-full' : ''}`}
            onClick={secondaryCta.onClick}
            type="button"
          >
            {secondaryCta.text}
            <ArrowRight 
              size={16} 
              className="ml-2 transition-transform duration-300 ease-out motion-reduce:transform-none group-hover:translate-x-1.5" 
            />
          </Button>
        );

        if (shouldRenderStandaloneButton) {
          return (
            <div className={wrapperClass}>
              <ButtonContent />
            </div>
          );
        }

        if (!buttonHref) {
          return null;
        }

        if (isHashLink) {
          return (
            <div className={wrapperClass}>
              <Button 
                variant="black" 
                size={buttonSize}
                className={`group ${isMobile ? 'w-full' : ''}`}
                onClick={handleHashClick(buttonHref)}
                type="button"
              >
                {secondaryCta.text}
                <ArrowRight 
                  size={16} 
                  className="ml-2 transition-transform duration-300 ease-out motion-reduce:transform-none group-hover:translate-x-1.5" 
                />
              </Button>
            </div>
          );
        }

        if (buttonHref.startsWith('http')) {
          return (
            <a 
              href={buttonHref} 
              target={secondaryCta.target || "_blank"} 
              rel={secondaryCta.rel || "noopener noreferrer"}
              className={wrapperClass}
            >
              <ButtonContent />
            </a>
          );
        }

        return (
          <Link to={buttonHref} className={wrapperClass}>
            <ButtonContent />
          </Link>
        );
      })()}
    </div>
  );
};

export default HeroCtaButtons;
