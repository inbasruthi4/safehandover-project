# Safety analysis

| Hazard | Cause | Effect | Detection | Mitigation |
|---|---|---|---|---|
| Missed action | User omits an item | Handover incomplete | Workflow review; no automated detection possible | Existing checklist and independent review |
| Wrong owner | Misassignment | Follow-up delayed | Owner display and audit | Confirm with incoming team |
| Stale data | Delayed refresh | Misleading view | Timestamps and explicit API errors | Retry and verify source |
| Unauthorized visibility | Bad role setup | Privacy exposure | RBAC and access error logs | Least privilege; review role assignments |
| False resolution | Incorrect status entry | Open item hidden | Resolution note/event history | Require evidence review; staff confirmation |
| Missed deadline | Invalid entry or no update | Delay unnoticed | Deadline evaluator | Verify deadlines and local escalation process |
| Duplicate action | Multiple entry paths | Conflicting ownership | Similar titles can be reviewed | Manual duplicate review; no automatic merge |
| API failure | Service/network issue | Updates unavailable | Health endpoint and error state | Retry and use established downtime procedure |
| Database failure | DB unavailable | Persistence stops | Health endpoint | Restore and reconcile from approved records |
| Ack failure | Incoming user skips receipt | Ownership ambiguous | Pending acknowledgement flag | Escalate through local procedure |
| Overdue status race | Clock/time zone differences | Incorrect overdue flag | Deadline/time shown | Use consistent timezone and user verification |
| Excessive alerts | Broad rules | Important items obscured | User feedback | Review relevance and workflow fit |

The prototype is not clinically validated and cannot guarantee patient safety or replace professional judgement or established procedures.
