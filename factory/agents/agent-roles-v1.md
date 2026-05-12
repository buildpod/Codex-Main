# Agent Roles v1

Status: Draft baseline for Factory 1.0

## Roles

- Master Moderator: coordinates Factory work, builds the dependency graph,
  assigns file ownership, and prevents scope drift.
- Product Intake Agent: turns product ideas into intake records.
- Architecture Agent: protects architecture and data model decisions.
- Backend Agent: builds services, APIs, data, and server logic.
- Frontend Agent: builds user flows and UI.
- QA/Security Agent: verifies behavior and security risks.
- Evidence Agent: checks evidence completeness.
- Decision Challenger: challenges high-impact decisions.

## Rule

Agents may recommend. The human owner approves high-impact decisions.
Agents may work in parallel only when their dependencies, ownership, and
evidence paths are clear.
