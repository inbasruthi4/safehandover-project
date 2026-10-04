# API reference

All successful responses use `{success:true,data:...}`; errors use `{success:false,error:{code,message}}`. Protected routes use `Authorization: Bearer <JWT>`. Role is checked server-side. Authentication failures are 401; forbidden operations are 403.

| Method / URL | Authentication / role | Request | Response / errors |
|---|---|---|---|
| POST `/api/auth/register` | Public | name,email,password (10+),department | Created as VIEWER; public registration cannot grant elevated roles; validation 400, duplicate 409 |
| POST `/api/auth/login` | Public | email,password | JWT and user; invalid credentials 401 |
| GET `/api/auth/me` | Any user | — | Current user |
| POST `/api/auth/logout` | Any user | — | loggedOut; client discards token |
| POST `/api/consent` | Any user | acknowledgementType, acknowledged:true | Consent record; missing acknowledgement 400 |
| GET `/api/health` | Public | — | status/database; 503 degraded |
| GET `/api/users` | Authenticated | — | Active owner choices |
| POST `/api/users` | Admin | name,email,password,role,department | New role-managed account; password hashed |
| PATCH `/api/users/:id` | Admin | role,active,department | Updated account; before/after audit |
| GET/POST `/api/patients` | Read / Nurse, Coordinator, Admin create | Search `q`; create syntheticPatientId,displayName,procedure,scheduledDate | Patient list/record |
| GET `/api/patients/:id` | Authenticated | ID or synthetic ID | Patient and handovers/actions; 404 |
| GET `/api/handovers` | Authenticated | Optional `shift`,`status` | Handover list |
| GET `/api/handovers/:id` | Authenticated | — | Detail; 404 |
| POST `/api/handovers` | Nurse, Coordinator, Admin | patientId,fromShift,toShift,summary | Transfer; 201 |
| PUT `/api/handovers/:id` | Nurse, Coordinator, Admin | summary,status,toShift | Updated and audited |
| POST `/api/handovers/:id/acknowledge` | Authenticated | — | Incoming acknowledgement and events |
| GET/POST `/api/actions` | Read / Nurse, Surgeon, Coordinator, Admin create | Filters; create handoverId,patientId,title,description,riskLevel,category,ownerId,deadline | Action with rule evaluation; validation errors 400 |
| GET `/api/actions/:id` | Authenticated | — | Action, events, rule evaluation; 404 |
| PUT `/api/actions/:id` | Nurse, Surgeon, Anaesthesia, Coordinator, Admin | Editable action fields; blocked needs blockReason | Updated action with before/after audit; resolve only by owner/admin |
| DELETE `/api/actions/:id` | Coordinator, Admin | — | Controlled archive with audit; record retained |
| POST `/api/actions/:id/acknowledge` | Authenticated | — | Subsequent event and audit |
| POST `/api/actions/:id/resolve` | Nurse, Surgeon, Coordinator, Admin; owner/admin constraint | Optional note | Resolved action and audit |
| POST `/api/actions/:id/escalate` | Coordinator, Admin | reason | Escalated action and audit |
| POST `/api/actions/:id/events` | Nurse, Surgeon, Anaesthesia, Coordinator, Admin | eventType,description,eventTime? | Event; 201 |
| POST `/api/shifts/change` | Nurse, Coordinator, Admin | fromShift,toShift | Transaction transfer counts |
| GET `/api/shifts/current` | Authenticated | — | Current demo shift |
| GET `/api/shifts/:id/unresolved` | Authenticated | — | Unresolved actions for shift |
| GET `/api/dashboard/summary`, `/trends` | Authenticated | — | Live counts and groups |
| GET `/api/metrics`, `/baseline`, `/prototype`, `/comparison` | Authenticated | — | Stored/action or generated results |
| GET `/api/metrics/confusion` | Authenticated | — | Baseline true/false positives/negatives from generated cohort |
| GET `/api/audit`, `/api/audit/:entityId` | Admin | — | Audit entries |
| GET/POST `/api/feedback` | Authenticated | role,taskTested,rating,comment,observedIssue? | Feedback list/create |
| GET `/api/notifications` | Authenticated | — | Current-user/global notifications |
| GET `/api/integrations/scheduling/status` | Authenticated | — | Explicit unconfigured integration stub; no external system is connected |
