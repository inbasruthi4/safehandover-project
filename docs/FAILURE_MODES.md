# Failure modes

| Failure | Trigger | Potential consequence | Detection | User view | Mitigation | Remaining limit |
|---|---|---|---|---|---|---|
| Missing owner | Action saved unassigned | Follow-up unclear | Rule engine | UNASSIGNED | Assign and verify | Wrong owner still possible |
| Overdue action | Deadline passed unresolved | Delay | Deadline comparison | OVERDUE | Follow local escalation | Clock/timezone entry errors |
| False resolution | Incorrect resolved status | Open work hidden | Conflicting event wording check is limited | Audit/event review | Require note and verify | Text evidence can be ambiguous |
| Owner changed shift | Previous owner unavailable | Continuity gap | Owner/shift context | Owner and target shift shown | Reassign/acknowledge | Shift schedules not integrated |
| Deadline changed | User edits deadline | History obscured | Before/after audit | Audit trail | Review changes | Does not validate clinical appropriateness |
| Incoming acknowledgement missing | Transfer not acknowledged | Receipt unclear | Handover status | Pending | Confirm via team process | User may acknowledge without review |
| Duplicate action | Same issue entered twice | Conflicting states | Manual comparison | Action register | Review and archive duplicate | No reliable automated semantic matching |
| Blocked action | Status blocked | Stalled follow-up | Status/rule | Escalation flag | Add reason/escalate | Does not determine clinical urgency |
| Critical unresolved | Critical open status | High-priority work missed | Risk/status rule | Strong risk badge | Review immediately under local protocol | Risk level may be miscoded |
| API/database failure | Network or DB interruption | Changes unavailable | Error handler/health check | Retry message | Retry, verify DB, downtime process | No offline write queue |
| Missing deadline | Incomplete entry | Timing unclear | Rule engine | NO DEADLINE | Add valid deadline | May still be wrong |
| Stale handover | Old transfer remains active | Outdated state | Timestamp | Transfer date | Refresh/reconcile | External events not integrated |
| Consent omitted | User skips checkbox | Notice not understood | Frontend gate/API acknowledgement | Continue disabled | Complete acknowledgement | Checkbox cannot prove comprehension |
| Role misconfiguration | Incorrect role | Excess or blocked access | RBAC response | 403 or unexpected access | Admin review | Prototype role lifecycle is basic |
