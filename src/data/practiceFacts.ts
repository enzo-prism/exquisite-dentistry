import { BUSINESS_HOURS, PHONE_NUMBER_DISPLAY } from '@/constants/contact';

/** Reuse established practice details; never infer 24/7 staffing from online booking. */
export const PRACTICE_FACTS = {
  officeHours: BUSINESS_HOURS,
  parking: 'A paid parking lot operates at our building. It is run separately from the practice and charges a cash fee. Street parking nearby is limited; check the posted signs.',
  emergencyAvailability: `Call ${PHONE_NUMBER_DISPLAY} during office hours to confirm the soonest available appointment. Same-day visits depend on the schedule and the care you need.`,
  sedation: 'Tell the team about dental anxiety, your medical history, and any medications when you book. They can confirm which comfort or sedation options are appropriate and available for your visit.',
  postVisitSupport: `For questions after a visit, call ${PHONE_NUMBER_DISPLAY} during office hours. Follow the aftercare instructions provided for your treatment.`,
  consultationDetails: 'Ask the team to confirm your consultation fee, expected visit length, and any imaging or treatment credit when you book.',
} as const;
