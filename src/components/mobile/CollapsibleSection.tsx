import React, { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useTouchOptimization } from '@/hooks/use-mobile-gestures';
import { useIsMobile } from '@/hooks/use-mobile';

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  icon?: React.ReactNode;
  summary?: string;
  mobileOnly?: boolean;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  children,
  defaultOpen = false,
  onToggle,
  className,
  headerClassName,
  contentClassName,
  icon,
  summary,
  mobileOnly = false
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const isMobile = useIsMobile();
  const { getTouchTargetClasses } = useTouchOptimization();

  useEffect(() => {
    setIsOpen(defaultOpen);
  }, [defaultOpen]);

  // If mobileOnly is true and we're not on mobile, render normally without collapsing
  if (mobileOnly && !isMobile) {
    return (
      <div className={className}>
        <h3 className={cn('text-lg font-semibold mb-4', headerClassName)}>
          {icon && <span className="mr-2">{icon}</span>}
          {title}
        </h3>
        <div className={contentClassName}>
          {children}
        </div>
      </div>
    );
  }

  const toggleSection = () => {
    setIsOpen(prevState => {
      const nextState = !prevState;
      onToggle?.(nextState);
      return nextState;
    });
  };

  const contentVariants = {
    closed: {
      height: 0,
      opacity: 0,
      transition: {
        height: { duration: 0.3, ease: 'easeInOut' },
        opacity: { duration: 0.2, ease: 'easeInOut' }
      }
    },
    open: {
      height: 'auto',
      opacity: 1,
      transition: {
        height: { duration: 0.3, ease: 'easeInOut' },
        opacity: { duration: 0.3, ease: 'easeInOut', delay: 0.1 }
      }
    }
  };

  return (
    <div className={cn('border-b border-gray-200 last:border-b-0', className)}>
      <button
        className={cn(
          'w-full flex items-center justify-between py-4 text-left',
          'transition-colors duration-200',
          'hover:bg-gray-50 focus:bg-gray-50',
          'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50',
          getTouchTargetClasses('md'),
          headerClassName
        )}
        onClick={toggleSection}
        aria-expanded={isOpen}
        aria-controls={`content-${title.replace(/\s+/g, '-').toLowerCase()}`}
      >
        <div className="flex items-center flex-1">
          {icon && (
            <span className="mr-3 text-primary flex-shrink-0">
              {icon}
            </span>
          )}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground">
              {title}
            </h3>
            {summary && !isOpen && (
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                {summary}
              </p>
            )}
          </div>
        </div>
        
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="ml-4 flex-shrink-0"
        >
          <ChevronDown size={20} className="text-muted-foreground" />
        </motion.div>
      </button>

      <motion.div
        id={`content-${title.replace(/\s+/g, '-').toLowerCase()}`}
        variants={contentVariants}
        initial="closed"
        animate={isOpen ? 'open' : 'closed'}
        className="overflow-hidden"
      >
        <div className={cn('pb-4', contentClassName)}>
          {children}
        </div>
      </motion.div>
    </div>
  );
};

// Accordion wrapper for multiple collapsible sections
interface CollapsibleAccordionProps {
  children: React.ReactNode;
  allowMultiple?: boolean;
  className?: string;
}

export const CollapsibleAccordion: React.FC<CollapsibleAccordionProps> = ({
  children,
  allowMultiple = false,
  className
}) => {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const handleToggle = (index: number, isOpening: boolean) => {
    setOpenItems(prevItems => {
      const nextItems = new Set(prevItems);

      if (allowMultiple) {
        if (isOpening) {
          nextItems.add(index);
        } else {
          nextItems.delete(index);
        }
        return nextItems;
      }

      return isOpening ? new Set([index]) : new Set();
    });
  };

  return (
    <div className={cn('divide-y divide-gray-200', className)}>
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement<CollapsibleSectionProps>(child) && child.type === CollapsibleSection) {
          return React.cloneElement(child, {
            ...child.props,
            defaultOpen: openItems.has(index),
            onToggle: (isOpen: boolean) => handleToggle(index, isOpen)
          });
        }
        return child;
      })}
    </div>
  );
};

// Quick summary component for collapsed state
interface SectionSummaryProps {
  children: React.ReactNode;
  maxLines?: number;
}

export const SectionSummary: React.FC<SectionSummaryProps> = ({ 
  children, 
  maxLines = 2 
}) => (
  <div 
    className={cn('text-sm text-muted-foreground', `line-clamp-${maxLines}`)}
    style={{ 
      display: '-webkit-box',
      WebkitLineClamp: maxLines,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden'
    }}
  >
    {children}
  </div>
);

export default CollapsibleSection;
