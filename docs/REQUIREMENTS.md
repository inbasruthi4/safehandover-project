# Requirements

## Functional

- Authenticate with JWT; hash passwords; show a required privacy and safety acknowledgement before the main UI.
- Create/read/update synthetic patients, handovers and safety actions; record owner, risk, category, deadline, status, resolution and subsequent events.
- Transfer all unresolved actions at a shift change in a transaction, surface them for the incoming shift, and record receipt acknowledgement.
- Audit safety changes; show handover, action and metric data from the API/DB; offer search, filtering, notifications and feedback capture.
- Evaluate structured tracking against deterministic free-text keyword detection on generated notes; show measured metrics and error analysis.

## Non-functional

Responsive, accessible, explainable, validated at API boundaries, error responses in a stable format, health endpoint, environment-based secrets, and modular client/server. PostgreSQL is the system of record; client storage only holds the active demo session/acknowledgement.

## Roles

ADMIN manages and audits; SURGEON reads and creates/updates/resolves assigned actions; NURSE creates handovers/actions and updates actions/events; ANAESTHESIA reads, updates and adds events; COORDINATOR manages handovers, assigns, escalates and resolves; VIEWER reads only. Authorization is enforced by the API.

## Safety, privacy and data

Synthetic records only. Never collect real identifiers. Staff retain decision responsibility. Least-privilege role checks, password hashing, consent records, audit of material changes, timestamps, explicit failure state and no destructive safety-action deletion are required. Incomplete records surface missing owner/deadline flags.

## API and database

JSON REST API, bearer JWT, Zod validation, PostgreSQL through Prisma. User, Patient, Handover, SafetyAction, SubsequentEvent, Shift, AuditLog, ConsentAcknowledgement, Notification, ValidationFeedback, and ExperimentResult models.

## Experiment

Generated notes have action-level ground truth. Baseline is a fixed keyword detector; structured workflow detects from structured unresolved status. Report denominator and method with each result. Do not imply clinical generalizability.

## Acceptance criteria

- A shift change atomically transfers every unresolved action, records events/audit, and incoming users can see and acknowledge it.
- Authorized changes record before/after state; unauthorized access yields 403 and unauthenticated access yields 401.
- The consent gate records acknowledgements and blocks progression until accepted.
- Dashboard and experiment metrics are derived from API/database or generated cohort calculation, not invented client constants.
- Only synthetic patient identifiers/data appear in fixtures and seed.
