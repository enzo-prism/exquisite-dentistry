import React, { useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { Phone, MessageSquare, MapPin, Calendar, X, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTouchOptimization } from '@/hooks/use-mobile-gestures';
import { CherryWidgetContext } from '@/components/cherry-widget-context';
import { gtagSendEvent } from '@/utils/googleAdsTracking';
import { GOOGLE_MAPS_SHORT_URL, SCHEDULE_CONSULTATION_PATH } from '@/constants/urls';
import { PHONE_NUMBER_E164 } from '@/constants/contact';
import { trackContactMethodClick } from '@/utils/vercelAnalytics';

interface FloatingActionButtonProps {
  className?: string;
}

// Visibility (mobile + scrolled) is owned by GlobalMobileFab so this module —
// and its animation styles — only ever load when the FAB is actually shown.
const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  className
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { getTouchTargetClasses, getThumbZoneClasses } = useTouchOptimization();
  const cherry = useContext(CherryWidgetContext);

  // Clear the Cherry "Pay over time" floating pill (~64px tall at
  // bottom:safe-area+16px) only on pages where a Cherry widget is mounted.
  const bottomOffset = cherry?.hasActiveWidgets
    ? 'calc(env(safe-area-inset-bottom, 0px) + 96px)'
    : 'calc(env(safe-area-inset-bottom, 0px) + 16px)';

  const actions = [
    {
      icon: Phone,
      label: 'Call Now',
      href: `tel:${PHONE_NUMBER_E164}`,
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      icon: MessageSquare,
      label: 'Text Us',
      href: `sms:${PHONE_NUMBER_E164}`,
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      icon: MapPin,
      label: 'Directions',
      href: GOOGLE_MAPS_SHORT_URL,
      color: 'bg-red-500 hover:bg-red-600'
    },
    {
      icon: Calendar,
      label: 'Schedule Consultation',
      href: SCHEDULE_CONSULTATION_PATH,
      color: 'bg-primary hover:bg-primary/90 text-primary-foreground',
      trackConversion: true
    }
  ];

  const floatingActions = (
    <div
      className={cn(getThumbZoneClasses(), className)}
      style={{ bottom: bottomOffset }}
    >
      {/* Action buttons */}
      {isExpanded && (
        <div className="absolute bottom-20 right-0 space-y-3">
          {actions.map((action, index) => (
            <a
              key={action.label}
              href={action.href}
              className={cn(
                'flex items-center justify-center rounded-full shadow-lg text-white',
                'transition-transform duration-200 active:scale-95',
                'animate-in fade-in zoom-in-75 slide-in-from-bottom-2 fill-mode-backwards',
                getTouchTargetClasses('md'),
                action.color
              )}
              style={{ animationDelay: `${index * 50}ms`, animationDuration: '200ms' }}
              onClick={(e) => {
                if (action.trackConversion) {
                  e.preventDefault();
                  gtagSendEvent(action.href, undefined, 'mobile_floating_action_button');
                } else if (action.href.startsWith('tel:')) {
                  trackContactMethodClick({
                    method: 'phone',
                    source: 'mobile_floating_action_button',
                    destination: action.href,
                  });
                } else if (action.href.startsWith('sms:')) {
                  trackContactMethodClick({
                    method: 'sms',
                    source: 'mobile_floating_action_button',
                    destination: action.href,
                  });
                } else if (action.href === GOOGLE_MAPS_SHORT_URL) {
                  trackContactMethodClick({
                    method: 'directions',
                    source: 'mobile_floating_action_button',
                    destination: action.href,
                  });
                }
                setIsExpanded(false);
              }}
            >
              <action.icon size={20} />
              <span className="sr-only">{action.label}</span>
            </a>
          ))}
        </div>
      )}

      {/* Main FAB */}
      <button
        className={cn(
          'bg-primary text-primary-foreground rounded-full shadow-xl',
          'border-2 border-white',
          'transition-transform duration-200',
          'active:scale-95',
          isExpanded && 'rotate-45 scale-110',
          getTouchTargetClasses('lg')
        )}
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--gold-light)))',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.2)'
        }}
      >
        {isExpanded ? (
          <X size={24} className="text-white" />
        ) : (
          <Menu size={24} className="text-white" />
        )}
        <span className="sr-only">
          {isExpanded ? 'Close menu' : 'Open quick actions'}
        </span>
      </button>

      {/* Backdrop */}
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10 animate-in fade-in duration-200"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </div>
  );

  if (typeof document === 'undefined') {
    return floatingActions;
  }

  return createPortal(floatingActions, document.body);
};

export default FloatingActionButton;
