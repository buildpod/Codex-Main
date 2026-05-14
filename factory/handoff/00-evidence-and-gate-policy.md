# Evidence and Gate Policy (Phase 0 Document 3)

## 1. Purpose

This document specifies the evidence record, hash chain, approval records, gate behavior, and evidence intensity dial for BuildPodFactory. It completes the Phase 0 durable state layer: Document 1 defines the stages and gates, Document 2 defines the agents and their evidence obligations, and this policy defines what must be recorded before work can be accepted. Source basis: `00-factory-process-flow.md`, `00-agent-role-cards.md`, `gap-answers.md`, v0.9 Sections 06, 24, and 27, plus local governance files.

## 2. Evidence record schema

An evidence record is JSON. v0.9 Section 06 requires records for requirements, tickets, outputs, code changes, tests, approvals, and releases, with actor identity, timestamp, ticket/requirement links, artifacts, and result status. Minimum required fields:

| Field | Type and constraint |
| --- | --- |
| `id` | String, unique, stable. |
| `timestamp` | ISO-8601 UTC string. |
| `agent` | One of the 11 Document 2 agents or `human`. |
| `stage` | `S0`-`S10` or gate id. |
| `task_id` | Ticket, decision, release, or intake id. |
| `content_hash` | SHA-256 hex string computed by Section 3. |
| `prev_hash` | Previous record hash, or genesis value. |
| `model_used` | Model/provider id or `none`. |
| `tokens_in` / `tokens_out` | Non-negative integers. |
| `cost_usd` | Non-negative number. |
| `source_refs` | Array of file paths, URLs, or artifact ids. |
| `uncertainties` | Array of explicit assumptions or unknowns. |
| `signature` | Actor signature string; stronger signing by dial is in Section 5. |

Optional by dial: `artifact_refs`, `test_refs`, `approval_ref`, `risk_acceptance`, `traceability_refs`, `retention_until`, `prediction`, `calibration`.

Valid example:

```json
{
  "id": "ev-2026-05-14-0001",
  "timestamp": "2026-05-14T19:30:00Z",
  "agent": "Evidence",
  "stage": "G-QA",
  "task_id": "qa-gate-product-001",
  "content_hash": "b1946ac92492d2347c6235b4d2611184b1946ac92492d2347c6235b4d2611184",
  "prev_hash": "GENESIS",
  "model_used": "none",
  "tokens_in": 0,
  "tokens_out": 0,
  "cost_usd": 0,
  "source_refs": [
    "factory/handoff/00-factory-process-flow.md",
    "factory/handoff/00-agent-role-cards.md"
  ],
  "uncertainties": [],
  "signature": "Vineet"
}
```

Invalid example: a record missing `source_refs` is rejected because v0.9 Section 06 and the local Evidence Policy require source-linked evidence. A record with negative `cost_usd` or a non-ISO timestamp is also rejected.

## 3. Hash chain specification

Algorithm: SHA-256. `content_hash` is computed from these fields in this exact order: `id`, `timestamp`, `agent`, `stage`, `task_id`, `prev_hash`, `model_used`, `tokens_in`, `tokens_out`, `cost_usd`, canonical JSON of `source_refs`, canonical JSON of `uncertainties`, canonical JSON of optional `artifact_refs`, `test_refs`, `approval_ref`, `risk_acceptance`, `traceability_refs`, `prediction`, and `calibration`. Separator: newline (`\n`). `content_hash` and `signature` are not included in their own hash.

Genesis record: the first record uses `prev_hash = "GENESIS"`. Every later record sets `prev_hash` equal to the prior record's `content_hash`. Chain verification recomputes each record hash and checks that every `prev_hash` matches the previous record. Tamper signals: recomputed hash differs, missing prior hash, duplicate id, changed order without stated migration, or invalid required field.

Third-party verification procedure: export records as JSONL sorted by append order; run a verifier that parses each line, validates required fields, recomputes the canonical hash, and checks the link.

Pseudocode:

```js
records = readJsonl("evidence.jsonl")
previous = "GENESIS"
seen = new Set()
for record of records:
  require(record.id && !seen.has(record.id))
  require(record.prev_hash === previous)
  require(requiredFieldsPresent(record))
  copy = selectHashFields(record)
  canonical = [
    copy.id, copy.timestamp, copy.agent, copy.stage, copy.task_id,
    copy.prev_hash, copy.model_used, copy.tokens_in, copy.tokens_out,
    copy.cost_usd, stableJson(copy.source_refs), stableJson(copy.uncertainties),
    stableJson(copy.artifact_refs), stableJson(copy.test_refs),
    stableJson(copy.approval_ref), stableJson(copy.risk_acceptance),
    stableJson(copy.traceability_refs), stableJson(copy.prediction),
    stableJson(copy.calibration)
  ].join("\n")
  hash = sha256hex(canonical)
  require(hash === record.content_hash)
  seen.add(record.id)
  previous = record.content_hash
print("OK")
```

This is intended to fit in a Node.js script under 50 lines.

## 4. Gate types

| Gate | Sits between | Pass condition | Fail condition | Override authority | Approval record schema | Human required |
| --- | --- | --- | --- | --- | --- | --- |
| G-Charter | S2 and S3 | Goal, non-goals, scope, gates, and success criteria approved. | Charter unclear, goal change unapproved, or evidence missing. | Vineet/human owner; override requires rationale and residual risk. | `id`, `gate`, `approver`, `role`, `timestamp`, `decision`, `evidence_refs`, `risks_accepted`, `rationale`, `signature`. | Yes. |
| G-Architecture | S4 and S5/S6 | Architecture, ADRs, data model, security model, and boundaries approved. | Major contract, data, security, tool, or compliance issue unresolved. | Human owner or Steering Committee for high impact. | Same as above plus `adr_refs` and `architecture_refs`. | Yes. |
| G-QA | S7 and S8 | QA / Test confirms core workflow and tests pass; Security / Compliance confirms no unresolved critical security issues or accepted risks; evidence does not conflict. | Broken primary workflow, exposed secret, critical vulnerability, or missing test evidence. | Human owner for risk acceptance; Steering Committee if critical. | Same as above plus `qa_refs`, `security_refs`, `challenge_refs`, `accepted_risks`. | Dial-dependent: optional 1-3, encouraged 5, mandatory 7-10. |
| G-Release | S9 and S10 | Human owner approves release decision, target, limitations, and evidence package. | Release gate failed, approval missing, or deployment target unclear. | Vineet/human owner; Steering Committee for critical release risk. | Same as above plus `release_target`, `rollback_ref`, `evidence_bundle_ref`. | Yes. |

Authority follows v0.9 Section 27: agents may recommend, but high-impact architecture, security, GxP, release, and customer-facing compliance decisions require human or Steering Committee approval.

## 5. Evidence intensity dial (1-10)

| Dial | Required evidence fields and package | Hash chain | Human approval by gate | Audit trail | Retention | Signature | Max budget per task | Learning review |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Required schema plus README and ledger dump. Optional fields mostly empty. | Optional; `prev_hash` may be `GENESIS`. | Charter yes; Architecture yes if high impact; G-QA optional; Release yes. | Editable with change note. | UNCERTAIN - needs Vineet review. | Actor string. | $0.50. | Quarterly review applies. |
| 3 | Dial 1 plus charter, architecture summary, QA report. | Recommended; enforce for gate records. | Charter yes; Architecture yes; G-QA optional; Release yes. | Editable with change note and history. | UNCERTAIN - needs Vineet review. | Actor string plus approval ref. | $1.00. | Quarterly review applies. |
| 5 | Dial 3 plus test results, change log, dependency list, prediction field if available. | Enforced for accepted stage and gate records. | Charter yes; Architecture yes; G-QA encouraged human review; Release yes. | Append-only after gate pass unless correction record is added. | UNCERTAIN - needs Vineet review. | Named approver string plus evidence ref. | $2.00. | Quarterly review applies. |
| 7 | Dial 5 plus risk assessment, security review, signed approvals. | Enforced for all accepted records. | Charter yes; Architecture yes; G-QA mandatory; Release yes. | Append-only; corrections are new records. | UNCERTAIN - product/regulatory context sets it. | Signed approval marker; cryptographic standard deferred. | $3.50. | Quarterly review required with evidence. |
| 10 | Dial 7 plus validation pack, traceability matrix, hash-chain proof, named approver signatures, regulatory mapping. | Enforced and release must include verification proof. | Charter yes; Architecture yes; G-QA mandatory; Release yes. | Immutable after release except documented superseding record. | UNCERTAIN - regulated/customer requirement sets it. | Named approver signature; cryptographic standard deferred. | $5.00. | Quarterly review required with evidence. |

This resolves Doc 1's G-QA threshold: human G-QA review is optional at dials 1-3, encouraged at dial 5, and mandatory at dials 7-10. Budget caps come from `gap-answers.md` Gap 3. Package contents come from Doc 1 Section 5 and `gap-answers.md` Gap 4. Learning review follows Gap 6.

## 6. Approval signer model

Vineet/human owner approves G-Charter and G-Release, and approves G-Architecture when high impact. Steering Committee approves critical decisions or unresolved high residual risk. Master Moderator may accept low-risk implementation decisions only when acceptance criteria, tests, and evidence are complete, per v0.9 Section 27. Agents sign their evidence; they do not approve high-impact gates.

Approval record fields: `id`, `gate`, `approver`, `approver_role`, `timestamp`, `decision`, `evidence_reviewed`, `risks_accepted`, `rationale`, `signature`, `revoked_by`, `revoked_at`, `revocation_reason`. Revocation is a new evidence record linked to the original approval; the original is not deleted. If an approver is unavailable, the gate remains blocked unless Vineet names a delegate in an approval record.

## 7. Failure semantics (cross-cutting)

**Retry:** applies to transient tool, network, or command failures where the same approach is still valid. Maximum one retry unless the stage owner records a reason. Evidence captured: command/tool output, timestamp, and result.

**Repair:** applies when output fails acceptance criteria or the approach is flawed. Repair means a different prompt structure, model, agent, or implementation path, not just repeating the same action. Per Gap 3, one repair attempt is allowed; a second failed attempt escalates.

**Escalate:** triggered by budget exhaustion, two consecutive same-agent failures on the same task, missing source truth, missing approval, critical security issue, contradictory evidence, or goal-level uncertainty. Path: Master Moderator records blocker, preserves evidence, notifies human owner, and stops the stage or loops back according to Doc 1 Section 4.

## 8. Pre-run prediction

Pre-run prediction is deferred to Phase 1/2. It is not required for Phase 0 acceptance. The evidence schema keeps room for it through optional `prediction` and `calibration` fields. If used later, prediction output should record estimated tokens, cost, wall-clock, confidence band, estimator version, and predicted stage/task. Calibration should compare prediction to actual `tokens_in`, `tokens_out`, `cost_usd`, and elapsed time.

`tokencostscope` (`github.com/krulewis/tokencostscope`) remains a candidate only. Doc 1 already notes gaps: provider coverage, wall-clock estimation, evidence-ledger integration, and S0-S10 mapping. No Phase 0 design depends on it.

## 9. Open design questions

- **UNCERTAIN - needs Vineet review:** retention periods are not fixed in the source documents and should be set by product type, regulatory context, and customer commitments.
- **UNCERTAIN - needs Vineet review:** cryptographic signature standard is intentionally deferred; Phase 0 only requires a signature field and SHA-256 hash chain.
- **UNCERTAIN - needs Vineet review:** exact implementation location for JSONL evidence storage is not specified; candidate location should be chosen in Phase 1.
