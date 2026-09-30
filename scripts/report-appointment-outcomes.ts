import { readFile, stat, writeFile } from 'node:fs/promises';
import { extname } from 'node:path';
import { OutcomeValidationError, parseAppointmentOutcomes, reportAppointmentOutcomes } from '../src/utils/appointmentOutcomes';

async function main() {
  const args = process.argv.slice(2);
  const values = new Map<string, string>();
  const allowed = ['--input', '--format', '--from', '--to', '--as-of', '--output'];
  if (args.length === 1 && args[0] === '--help') {
    process.stdout.write('Usage: node --import tsx scripts/report-appointment-outcomes.ts --input /private/outcomes.json [--format json|csv] [--from UTC_ISO] [--to UTC_ISO] [--as-of UTC_ISO] [--output /private/aggregate.json]\n');
    return;
  }
  for (let index = 0; index < args.length; index += 2) {
    if (!allowed.includes(args[index]) || !args[index + 1] || args[index + 1].startsWith('--') || values.has(args[index])) throw new OutcomeValidationError('Invalid arguments. Use --help.');
    values.set(args[index], args[index + 1]);
  }
  const path = values.get('--input');
  if (!path) throw new OutcomeValidationError('--input is required.');
  const format = values.get('--format') || extname(path).slice(1);
  if (format !== 'json' && format !== 'csv') throw new OutcomeValidationError('Format must be json or csv.');
  if ((await stat(path)).size > 10 * 1024 * 1024) throw new OutcomeValidationError('Input exceeds the 10 MiB limit.');
  const content = await readFile(path, 'utf8');
  if (Buffer.byteLength(content) > 10 * 1024 * 1024) throw new OutcomeValidationError('Input exceeds the 10 MiB limit.');
  const events = parseAppointmentOutcomes(content, format);
  const report = reportAppointmentOutcomes(events, { from: values.get('--from'), to: values.get('--to'), asOf: values.get('--as-of') });
  const json = `${JSON.stringify(report, null, 2)}\n`;
  const output = values.get('--output');
  // Exclusive creation avoids destroying an export or replacing an existing report.
  if (output) await writeFile(output, json, { mode: 0o600, flag: 'wx' });
  else process.stdout.write(json);
}

main().catch((error: unknown) => {
  process.stderr.write(`${error instanceof OutcomeValidationError ? error.message : 'Unable to read input or create output. No report generated.'}\n`);
  process.exitCode = 1;
});
