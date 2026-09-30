import { SCHEDULE_CONSULTATION_PATH } from '@/constants/urls';
import { PRACTICE_FACTS } from '@/data/practiceFacts';

/** Treatment context is restricted to these values and sent only with an intake request. */
export const CONSULTATION_SERVICES = [
  { id: 'porcelain-veneers', label: 'Porcelain veneers' },
  { id: 'invisalign', label: 'Invisalign' },
  { id: 'dental-implants', label: 'Dental implants' },
  { id: 'teeth-whitening', label: 'Teeth whitening' },
  { id: 'smile-makeover', label: 'Smile makeover' },
  { id: 'general-dentistry', label: 'General dentistry' },
] as const;

export type ConsultationServiceId = typeof CONSULTATION_SERVICES[number]['id'];

export const getConsultationService = (value: string | null | undefined) =>
  CONSULTATION_SERVICES.find(service => service.id === value);

export const consultationHref = (service: ConsultationServiceId) =>
  `${SCHEDULE_CONSULTATION_PATH}?service=${service}`;

export const CONSULTATION_DETAILS = [
  {
    title: 'Start with your goals',
    description: 'Tell us what you would like to change or ask about. Our team can help you choose the right appointment for veneers, Invisalign, implants, whitening, or general dental care.',
  },
  {
    title: 'Confirm the details before your visit',
    description: PRACTICE_FACTS.consultationDetails,
  },
  {
    title: 'Plan your arrival',
    description: `Visit us at 6227 Wilshire Blvd in Los Angeles. ${PRACTICE_FACTS.parking}`,
  },
] as const;
