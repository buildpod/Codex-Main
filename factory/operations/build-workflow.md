# Build Workflow

Status: Draft baseline for Factory 1.0
Source alignment: Factory Platform URS, Product Build Intake URS, Component
V-Model SOP, Agent Operating SOP, Evidence Ledger URS, Decision Challenge URS

## Purpose

Define the controlled path from product idea to release candidate. Factory uses
this workflow to prevent uncontrolled AI coding.

## Core Flow

```text
Idea
-> Product Market Gate
-> Product Intake
-> Product Build Charter
-> Requirements
-> Architecture and Data Model
-> Component V-Model
-> Agent Tickets
-> Build
-> Test and Scan
-> Challenge Review
-> Evidence Ledger
-> Release Gates
-> Human Release Decision
-> Learning Log
```

## Phase 0: Idea Capture

Owner: Human owner

Required output:

- product idea statement;
- intended buyer/user if known;
- reason this idea matters.

Allowed work:

- discussion;
- market framing;
- discovery notes.

Not allowed:

- implementation;
- product repository creation unless approved.

## Phase 1: Product Market Gate

Owner: Product/Market function with human owner approval

Required output:

- completed Product Market Gate;
- proceed, discovery, park, or reject decision.

Allowed work:

- commercial analysis;
- competitor/workaround review;
- discovery ticket creation.

Not allowed:

- build tickets unless the gate proceeds or is explicitly bypassed.

## Phase 2: Product Intake

Owner: Product Intake Agent

Required output:

- Product Intake record;
- data/security classification;
- GxP/regulatory relevance if applicable;
- integration/import needs;
- unresolved blockers.

Stop if:

- intended use is missing;
- buyer/user is missing;
- data classification is unknown;
- security level is unknown.

## Phase 3: Product Build Charter

Owner: Human owner with Factory support

Required output:

- approved Product Build Charter;
- non-goals;
- documentation mode;
- approval gates;
- initial success criteria.

Rule:

No implementation starts before the Product Build Charter is approved.

## Phase 4: Requirements And Architecture

Owners: Product, Architecture, Security/Data functions

Required output:

- requirements;
- initial architecture;
- canonical data model;
- security model;
- module reuse decisions;
- ADRs for important choices.

Challenge required for:

- data model changes;
- tenant/security model;
- high-impact architecture choice;
- regulated/compliance profile;
- customer-facing claims.

## Phase 5: Component V-Model

Owner: Architecture and Engineering functions

Each major component needs:

- component purpose;
- component requirements;
- design/interface;
- build tickets;
- verification method;
- evidence expectation.

Rule:

Components are accepted through evidence, not agent claims.

## Phase 6: Agent Tickets

Owner: Master Moderator

Each ticket must include:

- objective;
- linked requirement or approved discovery action;
- dependencies;
- blocked-by and blocks relationships;
- parallel-safe yes/no;
- allowed files/folders;
- shared contracts touched;
- out-of-scope items;
- required tests/checks;
- evidence output;
- stop conditions.

Rule:

Builder agents may build. Reviewer/security/evidence functions must review.
Agents may work in parallel only when dependencies, ownership, and evidence
paths are clear. See `agent-parallelism-and-dependencies.md`.

## Phase 7: Build, Test, Evidence

Owners: Approved tools/agents

Required before acceptance:

- files changed;
- tests or checks run;
- security/dependency scans where relevant;
- evidence record;
- known risks and limitations.

If tests cannot run:

- state why;
- record risk;
- create follow-up or manual verification requirement.

## Phase 8: Release Gates

Owner: Release/DevOps function with human approval

Required output:

- completed release gate record;
- known limitations;
- release decision;
- learning log entry if defects or process gaps were found.

## Stop Conditions

- Missing intended use.
- Missing buyer/user.
- Unknown data classification.
- Unknown security level.
- Unapproved tool or dependency.
- Secret exposure risk.
- No test/evidence path.
- Unsupported compliance/legal/security claim.
- High-impact decision lacks human approval.
- Gate failed without recorded risk acceptance.

## Factory Rule

No source means assumption. No evidence means not done. No gate pass means no
acceptance.
