import assert from 'node:assert/strict';
import test from 'node:test';
import { createConfirmedSubmissionReporter } from '../utils/confirmedSubmission';

const RECEIPT = 'af135724-1234-4123-8123-0123456789ab';
const SECOND_RECEIPT = 'bf135724-1234-4123-8123-0123456789ab';

test('a repeated or reentrant accepted receipt reports each destination once', () => {
  const report = createConfirmedSubmissionReporter();
  const events: string[] = [];
  const destinations = [() => { events.push('analytics'); report(RECEIPT, destinations); }, () => events.push('ads')];
  assert.equal(report(RECEIPT, destinations), true);
  assert.equal(report(RECEIPT, destinations), false);
  assert.deepEqual(events, ['analytics', 'ads']);
  assert.equal(report(SECOND_RECEIPT, destinations), true);
  assert.deepEqual(events, ['analytics', 'ads', 'analytics', 'ads']);
});

test('an optional destination failure cannot fail intake or suppress the other destination', () => {
  const report = createConfirmedSubmissionReporter();
  let ads = 0;
  assert.doesNotThrow(() => report(RECEIPT, [() => { throw new Error('blocked analytics'); }, () => { ads += 1; }]));
  assert.equal(ads, 1);
  assert.equal(report(RECEIPT, [() => { ads += 1; }]), false);
  assert.equal(ads, 1);
});

test('missing or malformed receipt IDs do not create untraceable conversions', () => {
  const report = createConfirmedSubmissionReporter();
  let events = 0;
  for (const id of [undefined, null, '', 'visitor@example.test', 'not-a-receipt']) {
    assert.equal(report(id, [() => { events += 1; }]), false);
  }
  assert.equal(events, 0);
});
