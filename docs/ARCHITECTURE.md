# Architecture

The React/Vite UI calls the Express REST API. The API validates request data with Zod, authenticates JWTs, enforces per-role permissions, runs transactions for related safety updates, and persists through Prisma to PostgreSQL. Safety rules are deterministic and return human-readable reasons. Audit entries capture changes; events capture workflow chronology. Metrics read stored actions or the reproducible generated experiment.

```mermaid
flowchart LR
  Staff --> React[React + Vite]
  React -->|JWT REST JSON| Express[Express API]
  Express --> Auth[JWT + RBAC]
  Express --> Rules[Explainable safety rules]
  Express --> Audit[Audit + event service]
  Express --> Prisma[Prisma ORM]
  Prisma --> PG[(PostgreSQL)]
  Experiment[Generated cohort + baseline] --> PG
```

```mermaid
sequenceDiagram
  participant Outgoing
  participant API
  participant DB as PostgreSQL
  participant Incoming
  Outgoing->>API: POST shift change
  API->>DB: Transaction: new handover, move open actions, events, audit
  DB-->>API: Commit or rollback
  API-->>Outgoing: transferred action count
  Incoming->>API: acknowledge handover
  API->>DB: acknowledgement + action events + audit
```

Integration stub: REST is the boundary for future external scheduling/identity integrations. No external clinical system is connected. Deployment requires security, privacy, safety, usability, workflow and regulatory review; this academic prototype is not validated for care.
