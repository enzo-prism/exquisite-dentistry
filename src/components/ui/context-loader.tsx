import React from 'react';
import { cn } from '@/lib/utils';
import BrandLoader from './brand-loader';

interface ContextLoaderProps {
  context: 'page' | 'image' | 'video' | 'form' | 'gallery' | 'testimonial' | 'appointment';
  stage?: 'initial' | 'processing' | 'finalizing';
  className?: string;
  inline?: boolean;
}

const ContextLoader: React.FC<ContextLoaderProps> = ({
  context,
  stage = 'initial',
  className,
  inline = false
}) => {
  const getContextConfig = () => {
    const configs = {
      page: {
        variant: 'immersive' as const,
        showLogo: true,
        messages: {
          initial: { message: 'Preparing Your Experience', subMessage: 'Loading beautiful content...' },
          processing: { message: 'Optimizing Layout', subMessage: 'Ensuring perfect presentation...' },
          finalizing: { message: 'Almost Ready', subMessage: 'Finalizing details...' }
        }
      },
      image: {
        variant: 'elegant' as const,
        showLogo: false,
        messages: {
          initial: { message: 'Loading Image', subMessage: undefined },
          processing: { message: 'Optimizing Quality', subMessage: undefined },
          finalizing: { message: 'Finalizing', subMessage: undefined }
        }
      },
      video: {
        variant: 'luxury' as const,
        showLogo: false,
        messages: {
          initial: { message: 'Preparing Video', subMessage: 'Loading high-quality content...' },
          processing: { message: 'Buffering', subMessage: 'Ensuring smooth playback...' },
          finalizing: { message: 'Ready to Play', subMessage: undefined }
        }
      },
      form: {
        variant: 'minimal' as const,
        showLogo: false,
        messages: {
          initial: { message: 'Processing...', subMessage: undefined },
          processing: { message: 'Submitting', subMessage: undefined },
          finalizing: { message: 'Completing', subMessage: undefined }
        }
      },
      gallery: {
        variant: 'elegant' as const,
        showLogo: false,
        messages: {
          initial: { message: 'Loading Gallery', subMessage: 'Preparing smile transformations...' },
          processing: { message: 'Optimizing Images', subMessage: 'Loading high-resolution photos...' },
          finalizing: { message: 'Almost Ready', subMessage: undefined }
        }
      },
      testimonial: {
        variant: 'elegant' as const,
        showLogo: false,
        messages: {
          initial: { message: 'Loading Testimonials', subMessage: 'Fetching patient stories...' },
          processing: { message: 'Processing Reviews', subMessage: undefined },
          finalizing: { message: 'Ready', subMessage: undefined }
        }
      },
      appointment: {
        variant: 'luxury' as const,
        showLogo: false,
        messages: {
          initial: { message: 'Scheduling Appointment', subMessage: 'Connecting to our system...' },
          processing: { message: 'Confirming Availability', subMessage: 'Checking Dr. Aguil\'s schedule...' },
          finalizing: { message: 'Confirming Booking', subMessage: 'Finalizing your appointment...' }
        }
      }
    };

    return configs[context];
  };

  const config = getContextConfig();
  const currentMessage = config.messages[stage];
  
  const size = inline ? 'sm' : config.variant === 'immersive' ? 'xl' : 'md';

  if (inline) {
    return (
      <BrandLoader
        variant="minimal"
        size={size}
        message={currentMessage.message}
        className={cn("py-2", className)}
      />
    );
  }

  return (
    <BrandLoader
      variant={config.variant}
      size={size}
      message={currentMessage.message}
      subMessage={currentMessage.subMessage}
      showLogo={config.showLogo}
      className={className}
    />
  );
};

export default ContextLoader;