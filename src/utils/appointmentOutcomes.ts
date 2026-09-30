/** Internal, deidentified practice reporting. Never import into a public page or advertising SDK. */
export const OUTCOME_STAGES = ['inquiry_received', 'qualified', 'booked', 'attended', 'treatment_accepted', 'cancelled'] as const;
export type OutcomeStage = typeof OUTCOME_STAGES[number];
export const OUTCOME_CHANNELS = ['google_paid', 'google_organic', 'chatgpt', 'instagram', 'tiktok', 'referral', 'direct', 'other', 'unknown'] as const;
export type OutcomeChannel = typeof OUTCOME_CHANNELS[number];
const EVIDENCE_TYPES = ['accepted_form', 'practice_export', 'scheduler_export', 'staff_review'] as const;
const EVIDENCE_SYSTEMS = ['formspree', 'simplifeye', 'practice_management', 'practice_staff'] as const;
type EvidenceType = typeof EVIDENCE_TYPES[number];
type EvidenceSystem = typeof EVIDENCE_SYSTEMS[number];
export interface AppointmentOutcome {
  schemaVersion: 1;
  eventId: string;
  correlationId: string;
  appointmentId: string | null;
  stage: OutcomeStage;
  occurredAt: string;
  channel: OutcomeChannel;
  isTest: boolean;
  evidence: { type: EvidenceType; system: EvidenceSystem; reference: string };
}

// UUID or hash only. Names, emails, phone numbers and vendor patient identifiers are not keys.
const OPAQUE_KEY = /^(?:[a-f0-9]{32,64}|[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})$/i;
export class OutcomeValidationError extends Error {}
const invalid = (row: number, field: string): never => {
  // Never include a submitted value in logs or errors.
  throw new OutcomeValidationError(`Row ${row}: invalid ${field}.`);
};
const object = (input: unknown, row: number, field: string): Record<string, unknown> => {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return invalid(row, field);
  return input as Record<string, unknown>;
};
const exactKeys = (input: Record<string, unknown>, keys: readonly string[], row: number, field: string) => {
  if (Object.keys(input).length !== keys.length || keys.some(key => !Object.prototype.hasOwnProperty.call(input, key))) invalid(row, field);
};
const opaqueKey = (input: unknown, row: number, field: string): string => {
  if (typeof input !== 'string' || !OPAQUE_KEY.test(input)) return invalid(row, field);
  return input.toLowerCase();
};
export function outcomeTimestamp(input: unknown, row = 0): string {
  if (typeof input !== 'string' || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?Z$/.test(input)) return invalid(row, 'occurredAt (UTC ISO timestamp required)');
  const date = new Date(input);
  // Reject JavaScript's rollover of impossible calendar dates.
  if (!Number.isFinite(date.getTime()) || date.toISOString().slice(0, 19) !== input.slice(0, 19)) return invalid(row, 'occurredAt');
  return date.toISOString();
}

export function validateAppointmentOutcome(input: unknown, row = 1): AppointmentOutcome {
  const value = object(input, row, 'event');
  exactKeys(value, ['schemaVersion', 'eventId', 'correlationId', 'appointmentId', 'stage', 'occurredAt', 'channel', 'isTest', 'evidence'], row, 'event fields');
  if (value.schemaVersion !== 1) invalid(row, 'schemaVersion');
  if (!OUTCOME_STAGES.includes(value.stage as OutcomeStage)) invalid(row, 'stage');
  if (!OUTCOME_CHANNELS.includes(value.channel as OutcomeChannel)) invalid(row, 'channel');
  if (typeof value.isTest !== 'boolean') invalid(row, 'isTest');
  const stage = value.stage as OutcomeStage;
  const appointmentId = value.appointmentId === null ? null : opaqueKey(value.appointmentId, row, 'appointmentId');
  if (['booked', 'attended', 'treatment_accepted', 'cancelled'].includes(stage) && !appointmentId) invalid(row, 'appointmentId (required for appointment outcomes)');
  const evidence = object(value.evidence, row, 'evidence');
  exactKeys(evidence, ['type', 'system', 'reference'], row, 'evidence fields');
  if (!EVIDENCE_TYPES.includes(evidence.type as EvidenceType)) invalid(row, 'evidence type');
  if (!EVIDENCE_SYSTEMS.includes(evidence.system as EvidenceSystem)) invalid(row, 'evidence system');
  const type = evidence.type as EvidenceType;
  const system = evidence.system as EvidenceSystem;
  const validEvidence = (type === 'accepted_form' && system === 'formspree' && stage === 'inquiry_received')
    || (type === 'scheduler_export' && system === 'simplifeye' && ['booked', 'attended', 'cancelled'].includes(stage))
    || (type === 'practice_export' && system === 'practice_management')
    || (type === 'staff_review' && system === 'practice_staff' && stage !== 'inquiry_received');
  if (!validEvidence) invalid(row, 'evidence for stage');
  return {
    schemaVersion: 1,
    eventId: opaqueKey(value.eventId, row, 'eventId'),
    correlationId: opaqueKey(value.correlationId, row, 'correlationId'),
    appointmentId,
    stage,
    occurredAt: outcomeTimestamp(value.occurredAt, row),
    channel: value.channel as OutcomeChannel,
    isTest: value.isTest as boolean,
    evidence: { type, system, reference: opaqueKey(evidence.reference, row, 'evidence reference') },
  };
}

export const OUTCOME_CSV_COLUMNS = ['schemaVersion', 'eventId', 'correlationId', 'appointmentId', 'stage', 'occurredAt', 'channel', 'isTest', 'evidenceType', 'evidenceSystem', 'evidenceReference'] as const;

/** RFC 4180 style quoted fields, commas and line endings; unclosed or misplaced quotes fail closed. */
function csvRows(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let quoted = false;
  let closed = false;
  const pushField = () => { row.push(field); field = ''; closed = false; };
  const pushRow = () => { pushField(); rows.push(row); row = []; };
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (quoted) {
      if (char === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; }
        else { quoted = false; closed = true; }
      } else field += char;
    } else if (char === '"') {
      if (field || closed) invalid(rows.length + 1, 'CSV quoting');
      quoted = true;
    } else if (char === ',') pushField();
    else if (char === '\n' || char === '\r') {
      if (char === '\r' && text[i + 1] === '\n') i++;
      pushRow();
    } else {
      if (closed) invalid(rows.length + 1, 'CSV quoting');
      field += char;
    }
  }
  if (quoted) invalid(rows.length + 1, 'CSV quoting');
  if (field || row.length || closed) pushRow();
  return rows;
}

export function parseAppointmentOutcomes(text: string, format: 'json' | 'csv'): AppointmentOutcome[] {
  if (format === 'json') {
    let input: unknown;
    try { input = JSON.parse(text); } catch { throw new OutcomeValidationError('Invalid JSON.'); }
    if (!Array.isArray(input)) throw new OutcomeValidationError('JSON must be an event array.');
    return input.map((event, index) => validateAppointmentOutcome(event, index + 1));
  }
  const rows = csvRows(text.replace(/^\uFEFF/, ''));
  const header = rows.shift();
  if (!header || header.join(',') !== OUTCOME_CSV_COLUMNS.join(',')) throw new OutcomeValidationError('CSV header must match the outcome contract exactly.');
  return rows.map((columns, index) => {
    const row = index + 2;
    if (columns.length !== header.length) invalid(row, 'CSV column count');
    const value = Object.fromEntries(header.map((key, col) => [key, columns[col]]));
    if (!['true', 'false'].includes(value.isTest)) invalid(row, 'isTest');
    return validateAppointmentOutcome({
      schemaVersion: value.schemaVersion === '1' ? 1 : null,
      eventId: value.eventId, correlationId: value.correlationId, appointmentId: value.appointmentId || null,
      stage: value.stage, occurredAt: value.occurredAt, channel: value.channel, isTest: value.isTest === 'true',
      evidence: { type: value.evidenceType, system: value.evidenceSystem, reference: value.evidenceReference },
    }, row);
  });
}

type StageCounts = Record<OutcomeStage, number>;
const emptyCounts = (): StageCounts => Object.fromEntries(OUTCOME_STAGES.map(stage => [stage, 0])) as StageCounts;
const canonical = (event: AppointmentOutcome) => JSON.stringify(event);
// Ties have explicit conservative semantics: cancellation wins at an identical timestamp.
const compare = (a: AppointmentOutcome, b: AppointmentOutcome) => a.occurredAt.localeCompare(b.occurredAt)
  || OUTCOME_STAGES.indexOf(a.stage) - OUTCOME_STAGES.indexOf(b.stage) || a.eventId.localeCompare(b.eventId);
export interface OutcomeReportOptions { from?: string; to?: string; asOf?: string }

export function reportAppointmentOutcomes(input: readonly unknown[], options: OutcomeReportOptions = {}) {
  const from = options.from ? outcomeTimestamp(options.from) : undefined;
  const to = options.to ? outcomeTimestamp(options.to) : undefined;
  const asOf = options.asOf ? outcomeTimestamp(options.asOf) : undefined;
  if (from && to && from >= to) throw new OutcomeValidationError('from must be earlier than to.');
  const unique = new Map<string, AppointmentOutcome>();
  let duplicatesExcluded = 0;
  for (const [index, value] of input.entries()) {
    const event = validateAppointmentOutcome(value, index + 1);
    const prior = unique.get(event.eventId);
    if (prior && canonical(prior) !== canonical(event)) invalid(index + 1, 'conflicting duplicate eventId');
    if (prior) duplicatesExcluded++;
    else unique.set(event.eventId, event);
  }
  const testIds = new Set([...unique.values()].filter(event => event.isTest).map(event => event.correlationId));
  const groups = new Map<string, AppointmentOutcome[]>();
  const appointmentOwners = new Map<string, string>();
  let testEventsExcluded = 0;
  let futureEventsExcluded = 0;
  for (const event of unique.values()) {
    if (testIds.has(event.correlationId)) { testEventsExcluded++; continue; }
    if (asOf && event.occurredAt > asOf) { futureEventsExcluded++; continue; }
    if (event.appointmentId) {
      const owner = appointmentOwners.get(event.appointmentId);
      if (owner && owner !== event.correlationId) throw new OutcomeValidationError('Appointment has conflicting correlation keys.');
      appointmentOwners.set(event.appointmentId, event.correlationId);
    }
    const group = groups.get(event.correlationId) || [];
    group.push(event);
    groups.set(event.correlationId, group);
  }
  const counts = emptyCounts();
  const channels: Partial<Record<OutcomeChannel, StageCounts>> = {};
  let correlations = 0;
  let correlationsWithoutInquiry = 0;
  let conflictingChannelCorrelations = 0;
  let activeBookedAppointments = 0;
  let cancelledAppointments = 0;
  let attendedAppointments = 0;
  let unknownStateAppointments = 0;
  for (const events of groups.values()) {
    events.sort(compare);
    const inquiry = events.find(event => event.stage === 'inquiry_received');
    const origin = inquiry || events[0];
    if ((from && origin.occurredAt < from) || (to && origin.occurredAt >= to)) continue;
    correlations++;
    if (!inquiry) correlationsWithoutInquiry++;
    if (new Set(events.map(event => event.channel).filter(channel => channel !== 'unknown')).size > 1) conflictingChannelCorrelations++;
    const channelCounts = channels[origin.channel] || emptyCounts();
    channels[origin.channel] = channelCounts;
    for (const stage of new Set(events.map(event => event.stage))) { counts[stage]++; channelCounts[stage]++; }
    const latest = new Map<string, AppointmentOutcome>();
    const appointmentIds = new Set(events.map(event => event.appointmentId).filter((id): id is string => id !== null));
    // Acceptance concerns a treatment decision. It must not resurrect a cancelled appointment
    // or imply attendance when no appointment lifecycle record was supplied.
    for (const event of events) if (event.appointmentId && ['booked', 'attended', 'cancelled'].includes(event.stage)) latest.set(event.appointmentId, event);
    unknownStateAppointments += appointmentIds.size - latest.size;
    for (const event of latest.values()) {
      if (event.stage === 'cancelled') cancelledAppointments++;
      else if (event.stage === 'booked') activeBookedAppointments++;
      else attendedAppointments++;
    }
  }
  return {
    schemaVersion: 1,
    cohort: { from: from ?? null, toExclusive: to ?? null, asOf: asOf ?? null },
    correlations,
    // Unique inquiries/correlations ever explicitly observed at each stage. No stage is inferred.
    stages: counts,
    channels: Object.fromEntries(OUTCOME_CHANNELS.filter(channel => channels[channel]).map(channel => [channel, channels[channel]])),
    appointments: { activeBooked: activeBookedAppointments, cancelled: cancelledAppointments, attended: attendedAppointments, unknownState: unknownStateAppointments },
    quality: { duplicatesExcluded, testCorrelationsExcluded: testIds.size, testEventsExcluded, futureEventsExcluded, correlationsWithoutInquiry, conflictingChannelCorrelations },
  };
}
