# Practice appointment outcome reporting

The website records accepted form inquiries and booking intent separately. Neither a scheduling click, an iframe load, a callback request nor a financing action proves that an appointment was booked or attended.

An executable internal reporting path is available for **deidentified, normalized practice exports**. It produces aggregate channel and stage counts. It does not publish a patient dashboard, fetch patient records, send advertising conversions, or alter appointments.

## Current integration boundary

Read-only inspection of `enzo-prism/exquisite-dentistry-leads` on September 30, 2026 confirmed:

- `server/formspree.js` reads the non-spam Formspree inbox behind an authenticated, non-cacheable API. It accepts `form_key`, then `form_type`/`formType`, and explicit test flags. The callback's `form_key=consultation_callback` fits that existing contract.
- Inbox rows are submissions; prospective-persona labels are not staff qualification. The callback intentionally has no new-patient persona and is not automatically an acquisition conversion.
- `server/pathways.js` and the dashboard distinguish scheduler clicks from appointments. Simplifeye appointments are not available in that service.
- Website `annotateLeadSubmission()` stores `measurement_event_id`, an opaque random UUID. The private inbox normalizer does not currently return this field in its dashboard payload. The original Formspree record retains it for an authorized provider export or a future private adapter.

No Simplifeye export columns, webhook event schema, webhook signing contract, practice-management connection, appointment read credential, or authorized staff correlation map was supplied. **Live booking and attendance integration is not connected.** This implementation validates normalized JSON/CSV exports; it must not be presented as an automated scheduler integration.

## Operating the report

Keep real exports and the identifier mapping in an approved private practice location outside this repository, `public/`, and static build inputs. Only import normalized rows with the fields below. Do not import a raw vendor export containing names, messages, emails, phone numbers, dates of birth, addresses or vendor patient IDs.

```sh
node --import tsx scripts/report-appointment-outcomes.ts \
  --input /approved/private/outcomes.csv \
  --from 2026-09-01T00:00:00Z \
  --to 2026-10-01T00:00:00Z \
  --as-of 2026-09-30T23:59:59Z \
  --output /approved/private/september-outcome-report.json
```

Without `--output`, the aggregate report goes to stdout. The output contains no event, appointment, correlation or evidence identifiers. `--output` creates a new file with mode `0600` and refuses to overwrite existing files, including the input. Inputs are limited to 10 MiB. Invalid arguments, extra columns, unknown fields and invalid rows stop the entire report; error output contains row/field names, not submitted values. `--help` lists options.

`--from` is inclusive and `--to` exclusive. They select inquiry cohorts by the earliest `inquiry_received` timestamp, falling back to the earliest known event if the inquiry is missing. `--as-of` excludes later events. All timestamps must be explicit UTC ISO timestamps with `Z`. These UTC ranges are not Pacific calendar boundaries; for a Pacific-local month, convert its start/end to UTC before running the command.

The committed [sample](samples/appointment-outcomes.csv) is synthetic and entirely marked as test data. It should produce zero production counts. It is a format template, not example evidence of real appointments.

## Exact contract (version 1)

JSON input is an array of objects with exactly these keys. CSV has exactly the header shown in the sample, in that order, and flattens the evidence object into `evidenceType`, `evidenceSystem`, `evidenceReference`.

| Field | Requirement |
| --- | --- |
| `schemaVersion` | JSON number `1`; CSV literal `1` |
| `eventId` | Stable opaque UUID or 32–64 character hexadecimal hash for this individual source event. Preserve it across repeated exports. |
| `correlationId` | Stable opaque key for one inquiry/patient journey, reused for all its downstream events. Keep the private mapping to provider records separately. |
| `appointmentId` | Opaque stable appointment key required for `booked`, `attended`, `treatment_accepted`, `cancelled`. JSON `null` or CSV blank when no appointment applies. |
| `stage` | `inquiry_received`, `qualified`, `booked`, `attended`, `treatment_accepted`, `cancelled` |
| `occurredAt` | Actual source occurrence time, UTC ISO with `Z`. Do not substitute export time. |
| `channel` | `google_paid`, `google_organic`, `chatgpt`, `instagram`, `tiktok`, `referral`, `direct`, `other`, `unknown`. Use `unknown` when attribution is unavailable; an untagged record is not automatically direct. |
| `isTest` | Explicit JSON boolean; CSV lowercase `true`/`false`. Propagate provider test markers. |
| `evidence.type` | `accepted_form`, `practice_export`, `scheduler_export`, `staff_review` |
| `evidence.system` | `formspree`, `simplifeye`, `practice_management`, `practice_staff` |
| `evidence.reference` | Opaque reference to retained source evidence in the separate private map. Not free text or a URL. |

For Formspree inquiry records with `measurement_event_id`, use that UUID as the correlation key. Preserve a separate stable event ID if one journey can have multiple inquiries. For older records, create a private mapping with stable random UUIDs. Do not derive keys from emails, phone numbers or names. If hashing vendor record IDs, use a secret-keyed hash in the authorized private exporter; a plain hash of predictable IDs is not an anonymization guarantee.

Allowed evidence combinations:

- `accepted_form` + `formspree`: `inquiry_received` only, based on a retained accepted provider submission. Client-side intent or form success telemetry alone is insufficient source evidence.
- `scheduler_export` + `simplifeye`: `booked`, `attended`, `cancelled`, only if the actual vendor export explicitly supports that state. Do not assume the vendor reports attendance.
- `practice_export` + `practice_management`: explicit states supported by the source system, including acceptance and attendance.
- `staff_review` + `practice_staff`: downstream states only, with a retained staff review record. Qualification requires the practice's documented criteria and staff confirmation; a new-patient persona is not enough.

Contract validation does **not** authenticate a vendor or prove a staff assertion. This tool is for an authorized operator using retained source records. Evidence and correlation quality remain operational responsibilities. No speculative webhook signatures or APIs have been implemented.

## Counting and reconciliation rules

- Exact duplicate event IDs are excluded. Conflicting duplicate IDs reject the whole report. Canonical casing/timestamps are normalized before comparison.
- Events sort by occurrence time rather than file order. At an identical time, cancellation wins over other appointment states. A later explicit rebooking reactivates that same appointment; a new appointment should use a new appointment key.
- Each stage counts unique correlation keys for which that exact stage was explicitly observed. Missing stages are never inferred from later stages. These independently observed counts can be non-monotonic, so they are not automatically conversion rates.
- Historical `booked` counts remain after cancellation. The separate appointment summary reports latest explicit lifecycle state per appointment: active booked, cancelled, attended, or unknown when only a treatment/qualification record exists. Treatment acceptance does not imply attendance or reactivate a cancelled appointment.
- Channel attribution comes from the earliest accepted inquiry, or the earliest known event if none exists. A later marketing channel does not overwrite the original channel, including `unknown`.
- If any event marks a correlation as a test, the entire correlation is excluded, even if downstream records missed the marker.
- One appointment associated with different correlation keys rejects the report. Incomplete history and conflicting channel metadata appear as aggregate quality counts.
- Do not report cancellation as lost revenue without its own accounting evidence. Do not extrapolate booking outcomes from the website's consent-limited analytics.

## Remaining activation inputs

1. Obtain an approved Simplifeye or practice-management export with documented appointment ID, exact status, occurrence timestamp and supported status meanings. Inspect the real schema before adding a provider-specific adapter.
2. An authorized practice operator must privately match accepted inquiries to appointments using operational records and assign stable opaque keys. Preserve duplicate/reschedule decisions and test markers. The website cannot reliably join the cross-origin scheduler from a click.
3. Staff must define and record `qualified` and `treatment_accepted` criteria and provenance. Confirm whether attendance exists in the scheduler or requires practice-management/staff evidence.
4. Normalize to this contract and run the report. Reconcile stage totals against the authoritative systems before using it for business decisions. A real export, not the synthetic sample, is required to validate production counts.

Focused verification:

```sh
node --import tsx --test src/__tests__/appointmentOutcomes.unit.ts
```
