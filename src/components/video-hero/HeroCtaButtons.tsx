
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { SCHEDULE_CONSULTATION_PATH } from '@/constants/urls';
import { normalizeInternalHref } from '@/utils/normalizeInternalHref';

const DEFAULT_PRIMARY_CTA_HREF = SCHEDULE_CONSULTATION_PATH;

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
    const buttonHref = hasCustomHref ? primaryCta.href! : DEFAULT_PRIMARY_CTA_HREF;
    const normalizedHref = normalizeInternalHref(buttonHref);
    const isHashLink = buttonHref.startsWith('#');

    if (shouldRenderStandaloneButton) {
      return (
        <div className={primaryButtonClass}>
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
        </div>
      );
    }

    if (isHashLink) {
      return (
        <div className={primaryButtonClass}>
          <Button
            asChild
            variant="default"
            size={buttonSize}
            className={`group ${isMobile ? 'w-full' : ''}`}
          >
            <a href={buttonHref} onClick={handleHashClick(buttonHref)}>
              {primaryCta.text}
              <ArrowRight
                size={16}
                className="ml-2 transition-transform duration-300 ease-out motion-reduce:transform-none group-hover:translate-x-1.5"
              />
            </a>
          </Button>
        </div>
      );
    }

    // If it's an external link or scheduling URL
    if (buttonHref.startsWith('http')) {
      return (
        <div className={primaryButtonClass}>
          <Button
            asChild
            variant="default"
            size={buttonSize}
            className={`group ${isMobile ? 'w-full' : ''}`}
          >
            <a
              href={normalizedHref}
              target={primaryCta.target || "_blank"}
              rel={primaryCta.rel || "noopener noreferrer"}
            >
              {primaryCta.text}
              <ArrowRight
                size={16}
                className="ml-2 transition-transform duration-300 ease-out motion-reduce:transform-none group-hover:translate-x-1.5"
              />
            </a>
          </Button>
        </div>
      );
    }

    // For internal routes
    return (
      <div className={primaryButtonClass}>
        <Button
          asChild
          variant="default"
          size={buttonSize}
          className={`group ${isMobile ? 'w-full' : ''}`}
        >
          <Link to={normalizedHref}>
            {primaryCta.text}
            <ArrowRight
              size={16}
              className="ml-2 transition-transform duration-300 ease-out motion-reduce:transform-none group-hover:translate-x-1.5"
            />
          </Link>
        </Button>
      </div>
    );
  };

  return (
    <div className={containerClass}>
      {renderPrimaryButton()}
      {secondaryCta && (() => {
        const hasHref = typeof secondaryCta.href === 'string' && secondaryCta.href.trim().length > 0;
        const shouldRenderStandaloneButton = Boolean(secondaryCta.onClick && !hasHref);
        const buttonHref = hasHref ? secondaryCta.href! : undefined;
        const normalizedHref = buttonHref ? normalizeInternalHref(buttonHref) : undefined;
        const wrapperClass = isMobile ? "w-full sm:w-auto" : "";
        const isHashLink = buttonHref?.startsWith('#');

        if (shouldRenderStandaloneButton) {
          return (
            <div className={wrapperClass}>
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
                asChild
                variant="black"
                size={buttonSize}
                className={`group ${isMobile ? 'w-full' : ''}`}
              >
                <a href={buttonHref} onClick={handleHashClick(buttonHref)}>
                  {secondaryCta.text}
                  <ArrowRight
                    size={16}
                    className="ml-2 transition-transform duration-300 ease-out motion-reduce:transform-none group-hover:translate-x-1.5"
                  />
                </a>
              </Button>
            </div>
          );
        }

        if (buttonHref.startsWith('http')) {
          return (
            <div className={wrapperClass}>
              <Button
                asChild
                variant="black"
                size={buttonSize}
                className={`group ${isMobile ? 'w-full' : ''}`}
              >
                <a
                  href={normalizedHref}
                  target={secondaryCta.target || "_blank"}
                  rel={secondaryCta.rel || "noopener noreferrer"}
                >
                  {secondaryCta.text}
                  <ArrowRight
                    size={16}
                    className="ml-2 transition-transform duration-300 ease-out motion-reduce:transform-none group-hover:translate-x-1.5"
                  />
                </a>
              </Button>
            </div>
          );
        }

        return (
          <div className={wrapperClass}>
            <Button
              asChild
              variant="black"
              size={buttonSize}
              className={`group ${isMobile ? 'w-full' : ''}`}
            >
              <Link to={normalizedHref ?? buttonHref}>
                {secondaryCta.text}
                <ArrowRight
                  size={16}
                  className="ml-2 transition-transform duration-300 ease-out motion-reduce:transform-none group-hover:translate-x-1.5"
                />
              </Link>
            </Button>
          </div>
        );
      })()}
    </div>
  );
};

export default HeroCtaButtons;
