# Experiment

**Question:** Does structured safety-action tracking improve detection of unresolved safety actions after shift change compared with free-text handover notes?

**Hypothesis:** Explicit responsibility, deadline, status and transfer state can reduce omissions in this generated dataset. It has not been demonstrated for clinical practice.

`npm run experiment` deterministically generates 160 synthetic action scenarios, free-text notes and ground truth. The baseline marks a note detected when any of `pending`, `follow up`, `check`, `waiting`, `incomplete`, `needs`, `not done`, `awaiting` appears. SafeHandover method reads the explicit unresolved status. The script calculates the CSV outcomes and stores metric values in PostgreSQL. Re-run it to reproduce results. Definitions: detection = detected unresolved / all unresolved; omission = missed unresolved / all unresolved; owner/deadline coverage = records with field / total records; overdue detection = overdue unresolved surfaced / overdue unresolved; acknowledgement = acknowledged transferred records / all transferred records. Baseline owner/deadline/ack data is not inferred where notes lack explicit evidence.

Generated data, results, confusion counts and sampling counts are in `data/`. The UI reports baseline true positives, false positives, false negatives and true negatives from the generated notes. The simulation is designed for an engineering demonstration, not an unbiased clinical trial. It assumes the structured action was entered, excludes workflow variation, and does not model clinical harm, user behavior, inter-rater ground truth or deployment context. Errors include keyword false positives/negatives and omitted structured entry. Do not claim the hypothesis proven or generalize the metrics.
