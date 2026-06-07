# Factory Model Summary

Status: Draft baseline for Factory 1.0

## Purpose

FactoryModel is the intake-to-delivery system for building real sellable
products. It is not the product being sold. It is the controlled process that
turns a product idea into a scoped, tested, approved release candidate.

## Simple Flow

```text
Idea
-> Intake
-> Market Gate
-> Product Charter
-> Requirements
-> Architecture
-> Build Tickets
-> Product Build
-> Testing And Evidence
-> Release Gate
-> Human Approval
-> Deployment
-> Learning Log
```

## Intake Needs

FactoryModel needs these inputs before a real product build can start:

- Product idea: what we are building in one sentence.
- Target buyer: who will pay.
- Target user: who will use it.
- Painful problem: what costly, stressful, risky, or slow workflow it fixes.
- Current workaround: how the buyer solves the problem today.
- Payment reason: why the buyer would pay now.
- V1 scope: the smallest useful version with 3 to 5 core features.
- Data needs: what information the product stores or processes.
- Access model: public, private, customer login, team roles, or admin-only.
- Security level: how sensitive the product and data are.
- Delivery target: web app, mobile app, internal tool, extension, or other.
- Revenue model: subscription, one-time fee, per-user, usage, service plus
  software, or marketplace.
- Success proof: how we know the product is ready to ship.

## Factory Produces

For an approved product, FactoryModel should produce:

- product intake record;
- product build charter;
- requirements and non-goals;
- architecture and data model;
- scoped build tickets;
- working product implementation;
- tests, checks, and review evidence;
- release checklist;
- deployment notes;
- known limitations;
- learning log entry.

## Agent Model

FactoryModel uses agents to divide product work into clear responsibilities.
Agents may recommend and execute approved work. The human owner approves
high-impact product, security, commercial, release, and deployment decisions.

Core agents:

- Master Moderator: coordinates the full product run, builds the dependency
  graph, assigns jobs, controls file ownership, and prevents scope drift.
- Product Market Agent: checks buyer, pain, urgency, distribution, willingness
  to pay, and whether the idea is worth building.
- Product Intake Agent: turns an approved idea into an intake record with
  intended use, users, data class, security level, integrations, blockers, and
  build-start readiness.
- Architecture Agent: defines system boundaries, data model, shared contracts,
  module reuse, and important technical decisions.
- Backend Agent: builds services, APIs, data storage, server logic, auth hooks,
  integrations, and backend tests.
- Frontend UX Agent: builds user flows, screens, components, states, and
  frontend tests according to the product workflow.
- QA/Security Agent: verifies behavior, security risks, permissions, secrets,
  dependency risk, and release blockers.
- Evidence Agent: checks that every completed job has changed files, tests,
  screenshots where useful, decisions, assumptions, and known risks.
- Decision Challenger: challenges weak assumptions, risky architecture,
  unclear buyer logic, unsupported claims, and release readiness.
- Steering Committee: handles governance, approvals, risk acceptance, release
  decisions, and escalation.

## Subworker Model

Subworkers are temporary execution workers created for scoped jobs. They do not
own the product direction. They complete narrow tasks under an agent or the
Master Moderator.

Subworkers can be used for:

- implementing one backend module;
- implementing one frontend workflow;
- writing focused tests;
- researching one tool or integration;
- reviewing a specific risk;
- preparing one evidence record;
- fixing one isolated bug.

Every subworker job must have:

- objective;
- owner agent;
- allowed files or folders;
- dependencies;
- stop conditions;
- required checks;
- expected evidence;
- clear handoff output.

Subworkers must stop when:

- the buyer, scope, or requirement is unclear;
- file ownership conflicts with another worker;
- a shared contract is not agreed;
- security or data classification is unknown;
- a new package, service, or deployment target needs approval;
- tests or evidence path is missing.

## Job States

FactoryModel tracks work as jobs in a dependency graph.

| State | Meaning |
| --- | --- |
| Queued | Job exists but dependencies have not been evaluated. |
| Ready | Dependencies are satisfied and work can start. |
| Working | Agent or subworker is actively doing the job. |
| Waiting | Job needs an output, decision, or evidence from another job. |
| Blocked | Required input, approval, file ownership, tool, test, or evidence path is missing. |
| Review | Work is complete but needs QA, evidence, challenge, or human approval. |
| Done | Evidence is complete and acceptance criteria are met. |
| Rejected | Work failed a gate and must be changed or abandoned. |

## Parallel Work Rules

Agents and subworkers may work in parallel only when the work is dependency
clear, ownership is explicit, and evidence expectations are known.

Parallel work is allowed when:

- product gate and scope gate allow the work;
- every job has a ticket or approved discovery action;
- every job has an owner agent;
- allowed files and folders are assigned;
- no two workers edit the same file unless one is review-only;
- shared API, schema, auth, event, or component contracts are agreed;
- required checks and evidence are known;
- no unresolved human approval is needed.

Parallel work is not allowed when:

- two jobs need the same file or schema;
- one job depends on another unfinished contract;
- data class or security model is unknown;
- a new package, external service, or AI model is unapproved;
- a release, paid plan, customer-facing claim, or deployment needs approval;
- evidence path is missing.

## Agent Handoff

Each agent or subworker handoff should include:

- what changed;
- files created or edited;
- tests or checks run;
- screenshots or logs where useful;
- decisions made;
- assumptions;
- limitations;
- unresolved blockers;
- next recommended job.

## Build Rules

- No buyer means no product build.
- No painful problem means no product build.
- No payment reason means no sellable product.
- No V1 scope means no implementation.
- No data/security clarity means no implementation.
- No evidence means not done.
- No release approval means no production deployment.

## Delivery Decision

FactoryModel can help analyze, structure, build, test, and prepare deployment.
The human owner approves product strategy, high-impact decisions, paid launch,
and production deployment.

## Product Standard

A Factory product must be useful, trusted, and sellable. It should solve a
specific workflow, protect customer data, handle core user states, and have a
clear path for support, pricing, release, and recovery.
