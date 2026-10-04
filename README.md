# SafeHandover

Academic prototype for tracking unresolved pre-operative workflow actions across shift changes. **Synthetic data only. Do not enter real patient information. This is not clinically validated, is not a medical device, and is not a production clinical system. It does not make clinical decisions. Clinical staff remain responsible for decisions and established procedures.**

## Run locally

Requirements: Node.js 20+, Docker Desktop (or PostgreSQL 16), and npm.

1. Copy `.env.example` to `.env`; set a private random `JWT_SECRET`.
2. Start PostgreSQL with `docker compose up -d postgres` (or create a database using the URL in `.env`).
3. Run `npm run install-all`.
4. Run `npm run db:setup` to generate Prisma client and apply the schema.
5. Run `npm run seed` to create synthetic users, cases, handovers, actions, events, dataset CSVs, and measured experiment outputs.
6. Run `npm run dev` and open http://localhost:5173. This builds the client then serves the Vite production preview alongside the API. API health is at http://localhost:4000/api/health. For client hot reload, run `npm run client` in place of the combined command.

Demo accounts all use `DemoSafe2026!`: `nurse@safehandover.demo`, `coordinator@safehandover.demo`, `admin@safehandover.demo`, `surgeon@safehandover.demo`, `anaesthesia@safehandover.demo`, `viewer@safehandover.demo`.

Useful commands: `npm run server`, `npm run client`, `npm run test`, `npm run build`. PostgreSQL-backed flows need the database available. Seed data is synthetic and can be reset with `npm run db:reset` (destructive to the local demo database).

## Prototype scope

React/Vite client; Express REST API; PostgreSQL/Prisma; JWT and bcryptjs; Zod request validation; Recharts; audit log and subsequent events. Backend authorization enforces role permissions. Shift change makes every unresolved (non-RESOLVED) action visible on a new handover; incoming acknowledgement is recorded. The deterministic safety-rule evaluator explains unresolved, overdue, owner, deadline, risk, blocked, and handover flags. Records should be archived/status-updated rather than deleted.

The experiment generates a fixed synthetic cohort, runs keyword detection against its free-text notes, compares it with structured ground truth, writes result CSVs, and stores calculated results in PostgreSQL. Run `npm run experiment` to regenerate the experimental dataset and actual metrics. The generated measurements characterize only this synthetic cohort and should not be generalized to real clinical settings.

Initial reproducible run (160 action scenarios; 133 unresolved; 69 overdue unresolved):

| Metric | Free-text baseline | Structured workflow |
|---|---:|---:|
| Unresolved detection rate | 75.9% | 100.0% |
| Owner assignment/coverage | 8.8% | 90.6% |
| Deadline coverage | 8.8% | 91.9% |
| Overdue detection rate | 76.8% | 100.0% |
| Acknowledgement rate | 0.0% | 30.1% |
| False omission rate | 24.1% | 0.0% |

These values are calculated from the generated notes and ground-truth rows by the server experiment script; see data/experiment_results.csv for the underlying output. The figures do not measure clinical performance.

Baseline confusion counts on the 160 synthetic notes: **101 true positives, 27 false positives, 32 false negatives, 0 true negatives.** Here, the substring “check” in “checks documented complete” is a keyword false positive for resolved scenarios. The zero true-negative count is a property of this generated note set and keyword list, not a general claim about free-text handovers.

## Limits

This prototype does not guarantee patient safety or replace professional judgement, approved clinical procedures, or an operational record system. Correctness depends on users entering complete and accurate information and on database/network availability. See `docs/` for requirements, architecture, safety analysis, failure modes, experiment, privacy, validation, and API details. No real stakeholder participation or clinical validation is represented.
