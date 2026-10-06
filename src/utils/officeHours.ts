/**
 * Live office status derived from the published hours in constants/contact.ts
 * (Monday–Thursday, 8 AM–6 PM, Los Angeles time). Keep the two in sync: this
 * file is the machine-readable form of BUSINESS_HOURS.
 */
const OPEN_DAYS = new Set([1, 2, 3, 4]); // Mon–Thu (0 = Sunday)
const OPEN_MINUTE = 8 * 60;
const CLOSE_MINUTE = 18 * 60;
const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/** Compact display form of the same hours, for tight UI such as the mobile menu. */
export const OFFICE_HOURS_SHORT = 'Mon–Thu 8 AM–6 PM';

export type OfficeStatus = {
  isOpen: boolean;
  /** Short, calm sentence, e.g. "Open now · until 6 PM" or "Opens Monday at 8 AM". */
  label: string;
};

const losAngelesClock = (date: Date) => {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Los_Angeles',
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    hourCycle: 'h23',
  }).formatToParts(date);
  const get = (type: string) => parts.find((part) => part.type === type)?.value ?? '';
  const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
  return { day, minutes: Number(get('hour')) * 60 + Number(get('minute')) };
};

export const getOfficeStatus = (now: Date = new Date()): OfficeStatus => {
  const { day, minutes } = losAngelesClock(now);
  if (OPEN_DAYS.has(day) && minutes >= OPEN_MINUTE && minutes < CLOSE_MINUTE) {
    return { isOpen: true, label: 'Open now · until 6 PM' };
  }
  if (OPEN_DAYS.has(day) && minutes < OPEN_MINUTE) {
    return { isOpen: false, label: 'Opens today at 8 AM' };
  }
  for (let offset = 1; offset <= 7; offset += 1) {
    const next = (day + offset) % 7;
    if (OPEN_DAYS.has(next)) {
      return { isOpen: false, label: offset === 1 ? 'Opens tomorrow at 8 AM' : `Opens ${DAY_NAMES[next]} at 8 AM` };
    }
  }
  return { isOpen: false, label: 'Call for office hours' };
};
