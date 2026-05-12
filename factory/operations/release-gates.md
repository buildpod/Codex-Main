# Release Gates

Status: Draft baseline for Factory 1.0
Source alignment: Release and Validation SOP, Evidence Ledger URS, Security and
Compliance URS, Architecture Fitness Functions URS, Human Decision Rights URS

## Purpose

Define minimum gates before a Factory-created product can be considered
release-ready.

## Release Scope

Every release candidate must state:

- product name;
- release ID/version;
- release target: local demo, private beta, paid beta, production;
- included features;
- excluded features;
- known limitations;
- human owner.

## Gates

| Gate | Required Evidence | Blocks Release When |
| --- | --- | --- |
| Scope Gate | Product charter, requirements, accepted tickets. | Scope is unclear or unapproved. |
| Functional Gate | Core workflow tests or manual verification. | Core workflow is broken. |
| UX Gate | Screens/workflows reviewed on target devices. | Primary workflow is confusing or unusable. |
| Security Gate | Secret scan, dependency scan, auth/permission review. | Critical security issue is open. |
| Architecture Gate | ADRs and boundary checks where relevant. | Critical architecture rule is violated. |
| Data Gate | Data model, classification, retention, recovery expectation. | Data handling is unclear or unsafe. |
| Commercial Gate | Buyer, pricing/distribution, support burden. | Release target conflicts with market readiness. |
| Legal/Privacy Gate | Privacy/legal checklist where external users exist. | Required legal/privacy item is missing. |
| Evidence Gate | Evidence records for accepted work. | Evidence is missing or contradictory. |
| Human Approval Gate | Human owner decision record. | Human approval is missing. |
| Deployment Gate | Target environment and deploy command approved. | Deployment target or command is unclear. |

## Security Release Blockers

- Exposed secret.
- Known critical vulnerability without human risk acceptance.
- Cross-tenant access risk.
- Missing auth/permission review for sensitive product.
- Unsafe import/file upload path.
- Customer-facing compliance claim without approval.
- Deployment secret or environment variable missing/unsafe.

## Deployment Approval Levels

| Target | Approval Rule |
| --- | --- |
| Local demo | Codex may run when requested. |
| Preview | Human approval required before triggering. |
| Staging | Human approval required before triggering. |
| Production | Release gates and explicit human approval required. |

## GitHub Release Requirements

Before a production release or merge to main:

- branch is pushed intentionally;
- PR scope is clear;
- required checks have run or missing checks are explained;
- release gate evidence exists;
- secrets are not present in diff/logs;
- human owner approval is recorded.

## Release Decision

| Decision | Meaning |
| --- | --- |
| Release | Ready for intended release target. |
| Conditional Release | Known limitations accepted by human owner. |
| Hold | Must fix blockers before release. |
| Reject | Not suitable for release. |

## Required Release Record

The release record must include:

- release decision;
- gate results;
- tests/checks run;
- security findings;
- known limitations;
- rollback/recovery notes where applicable;
- human owner approval;
- GitHub PR or commit reference where applicable;
- deployment target and result where applicable;
- evidence links.

## Rule

A release is not accepted because an agent says it is ready. It is accepted only
when gates, evidence, and human approval are complete.
