import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { AppointmentOutcome, OUTCOME_CSV_COLUMNS, parseAppointmentOutcomes, reportAppointmentOutcomes, validateAppointmentOutcome } from '../utils/appointmentOutcomes';

const key = (number: number) => number.toString(16).padStart(32, '0');
const event = (stage: AppointmentOutcome['stage'], index: number, overrides: Partial<AppointmentOutcome> = {}): AppointmentOutcome => ({
  schemaVersion: 1, eventId: key(index), correlationId: key(100),
  appointmentId: ['booked', 'attended', 'treatment_accepted', 'cancelled'].includes(stage) ? key(200) : null,
  stage, occurredAt: `2026-09-${String(index).padStart(2, '0')}T12:00:00Z`,
  channel: 'google_organic', isTest: false,
  evidence: { type: stage === 'inquiry_received' ? 'accepted_form' : 'practice_export', system: stage === 'inquiry_received' ? 'formspree' : 'practice_management', reference: key(index + 300) },
  ...overrides,
});

test('rejects extra fields, patient identifiers, missing appointment proof and impossible dates', () => {
  for (const bad of [
    { ...event('inquiry_received', 1), name: 'Synthetic Patient' },
    { ...event('inquiry_received', 1), correlationId: 'person@example.com' },
    { ...event('booked', 2), appointmentId: null },
    { ...event('booked', 2), evidence: { type: 'accepted_form', system: 'formspree', reference: key(500) } },
    { ...event('attended', 3), occurredAt: '2026-02-30T12:00:00Z' },
    { ...event('attended', 3), occurredAt: '2026-09-03T12:00:00' },
    { ...event('attended', 3), isTest: 'false' },
  ]) assert.throws(() => validateAppointmentOutcome(bad), /invalid/);
});

test('is invariant to input order and duplicate exports, and rejects conflicting event IDs', () => {
  const events = ['inquiry_received', 'qualified', 'booked', 'attended', 'treatment_accepted'].map((stage, i) => event(stage as AppointmentOutcome['stage'], i + 1));
  const report = reportAppointmentOutcomes(events);
  assert.deepEqual(reportAppointmentOutcomes([...events].reverse()), report);
  const duplicate = reportAppointmentOutcomes([...events, events[0]]);
  assert.deepEqual(duplicate.stages, report.stages);
  assert.equal(duplicate.quality.duplicatesExcluded, 1);
  assert.throws(() => reportAppointmentOutcomes([events[0], { ...events[0], channel: 'direct' }]), /conflicting duplicate/);
});

test('keeps historical bookings while cancellation removes the active appointment', () => {
  const report = reportAppointmentOutcomes([event('cancelled', 3), event('booked', 2), event('inquiry_received', 1)]);
  assert.equal(report.stages.booked, 1);
  assert.equal(report.stages.cancelled, 1);
  assert.deepEqual(report.appointments, { activeBooked: 0, cancelled: 1, attended: 0, unknownState: 0 });
});

test('uses later verified rebooking and deterministic cancellation on timestamp ties', () => {
  const events = [event('booked', 2), event('cancelled', 3), event('booked', 4)];
  assert.equal(reportAppointmentOutcomes(events).appointments.activeBooked, 1);
  const tied = [event('booked', 2), event('cancelled', 3, { occurredAt: events[0].occurredAt })];
  assert.equal(reportAppointmentOutcomes(tied).appointments.cancelled, 1);
  assert.deepEqual(reportAppointmentOutcomes(tied), reportAppointmentOutcomes([...tied].reverse()));
});

test('excludes the entire test correlation even if downstream rows missed the test marker', () => {
  const report = reportAppointmentOutcomes([event('inquiry_received', 1, { isTest: true }), event('booked', 2), event('attended', 3)]);
  assert.equal(report.correlations, 0);
  assert.equal(report.quality.testCorrelationsExcluded, 1);
  assert.equal(report.quality.testEventsExcluded, 3);
});

test('never infers inquiry, qualification or booking from attendance or acceptance', () => {
  const report = reportAppointmentOutcomes([event('attended', 3), event('treatment_accepted', 4)]);
  assert.deepEqual(report.stages, { inquiry_received: 0, qualified: 0, booked: 0, attended: 1, treatment_accepted: 1, cancelled: 0 });
  assert.equal(report.quality.correlationsWithoutInquiry, 1);
  assert.equal(reportAppointmentOutcomes([event('treatment_accepted', 4)]).appointments.unknownState, 1);
  assert.equal(reportAppointmentOutcomes([event('treatment_accepted', 4)]).appointments.attended, 0);
});

test('later treatment acceptance does not resurrect a cancelled appointment', () => {
  const report = reportAppointmentOutcomes([event('booked', 2), event('cancelled', 3), event('treatment_accepted', 4)]);
  assert.equal(report.stages.treatment_accepted, 1);
  assert.equal(report.appointments.cancelled, 1);
  assert.equal(report.appointments.attended, 0);
});

test('reports unique correlations per stage and separate appointment state counts', () => {
  const report = reportAppointmentOutcomes([event('booked', 2), event('booked', 3, { appointmentId: key(201) }), event('attended', 4)]);
  assert.equal(report.stages.booked, 1);
  assert.deepEqual(report.appointments, { activeBooked: 1, cancelled: 0, attended: 1, unknownState: 0 });
  assert.throws(() => reportAppointmentOutcomes([event('booked', 2), event('attended', 3, { correlationId: key(101) })]), /conflicting correlation/);
});

test('cohort uses first accepted inquiry and channel, with no guessed attribution', () => {
  const events = [event('inquiry_received', 1, { channel: 'unknown' }), event('booked', 2, { channel: 'chatgpt' }), event('attended', 3)];
  const report = reportAppointmentOutcomes(events, { from: '2026-09-01T00:00:00Z', to: '2026-09-02T00:00:00Z', asOf: '2026-09-02T23:59:59Z' });
  assert.equal(report.channels.unknown?.booked, 1);
  assert.equal(report.stages.attended, 0);
  assert.equal(report.quality.futureEventsExcluded, 1);
  assert.equal(reportAppointmentOutcomes(events, { from: '2026-09-02T00:00:00Z' }).correlations, 0);
  assert.throws(() => reportAppointmentOutcomes(events, { from: '2026-09-02T00:00:00Z', to: '2026-09-01T00:00:00Z' }));
});

test('CSV and JSON have identical strict normalized output', () => {
  const input = event('inquiry_received', 1);
  const columns = [1, input.eventId, input.correlationId, '', input.stage, input.occurredAt, input.channel, false, input.evidence.type, input.evidence.system, input.evidence.reference];
  const csv = `${OUTCOME_CSV_COLUMNS.join(',')}\r\n${columns.map(value => `"${value}"`).join(',')}\r\n`;
  assert.deepEqual(parseAppointmentOutcomes(csv, 'csv'), parseAppointmentOutcomes(JSON.stringify([input]), 'json'));
  assert.throws(() => parseAppointmentOutcomes(`${csv}"unterminated`, 'csv'), /CSV quoting/);
  assert.throws(() => parseAppointmentOutcomes(csv.replace('"false"', '"False"'), 'csv'), /isTest/);
  assert.throws(() => parseAppointmentOutcomes(csv.replace('schemaVersion', 'patientName'), 'csv'), /header/);
});

test('aggregate output has no correlation keys or evidence references', () => {
  const input = event('inquiry_received', 1);
  const output = JSON.stringify(reportAppointmentOutcomes([input]));
  for (const secret of [input.eventId, input.correlationId, input.evidence.reference]) assert.equal(output.includes(secret), false);
});

test('CLI produces aggregate JSON and sanitizes rejected values', () => {
  const directory = mkdtempSync(join(tmpdir(), 'exquisite-outcomes-'));
  try {
    const path = join(directory, 'outcomes.json');
    writeFileSync(path, JSON.stringify([event('inquiry_received', 1), event('booked', 2)]));
    const run = () => spawnSync(process.execPath, ['--import', 'tsx', 'scripts/report-appointment-outcomes.ts', '--input', path], { encoding: 'utf8' });
    const success = run();
    assert.equal(success.status, 0, success.stderr);
    assert.equal(JSON.parse(success.stdout).stages.booked, 1);
    const overwrite = spawnSync(process.execPath, ['--import', 'tsx', 'scripts/report-appointment-outcomes.ts', '--input', path, '--output', path], { encoding: 'utf8' });
    assert.equal(overwrite.status, 1);
    assert.equal(overwrite.stdout, '');
    assert.equal(run().status, 0, 'original input survives attempted output overwrite');
    writeFileSync(path, JSON.stringify([{ ...event('inquiry_received', 1), correlationId: 'sensitive@example.com' }]));
    const failure = run();
    assert.equal(failure.status, 1);
    assert.equal(failure.stdout, '');
    assert.equal(failure.stderr.includes('sensitive@example.com'), false);
  } finally { rmSync(directory, { recursive: true, force: true }); }
});
