# Jarvis Build Spec

Status: Draft build contract for Factory 1.0

## Purpose

Jarvis is the private local command center for FactoryModel. It helps the human
owner intake product ideas, coordinate agents and subworkers, track jobs,
surface blockers, collect evidence, and prepare release decisions.

Jarvis is not the sellable product. Jarvis must not be deployed as a public
customer app.

## Source Documents

Jarvis implements the operating rules defined in:

- `factory/factory-model-summary.md`
- `factory/operations/build-workflow.md`
- `factory/agents/agent-roles-v1.md`
- `factory/operations/agent-parallelism-and-dependencies.md`
- `factory/operations/release-gates.md`
- `factory/governance/evidence-ledger-format.md`
- `factory/security/permissions-and-access.md`
- `factory/security/security-baseline.md`
- `factory/templates/product-intake-template.md`
- `factory/templates/ticket-template.md`
- `factory/templates/agent-evidence-record-template.md`

If this spec conflicts with a safety, security, approval, or release rule, the
stricter rule wins.

## V1 Goal

Jarvis v1 should make Factory work visible and controllable.

The user should be able to:

- enter a product idea;
- see whether intake is ready or blocked;
- see active agents and subworkers;
- see job states and dependencies;
- see why work is waiting or blocked;
- record evidence;
- see approval gates;
- prepare but not auto-approve release or deployment.

## Non-Goals

Jarvis v1 must not:

- deploy Jarvis publicly;
- deploy any product without explicit human approval;
- approve release gates by itself;
- make paid-product claims by itself;
- create secrets or expose secrets;
- replace human product strategy;
- pretend a product is done without evidence;
- run uncontrolled autonomous code edits without a scoped job.

## Required Screens

### 1. Factory Status

Shows the current Factory state.

Required content:

- active product name or "No active product";
- current phase;
- open jobs;
- blocked jobs;
- review jobs;
- approval-required gates;
- latest evidence records;
- last run or check timestamp.

### 2. Product Intake

Captures the minimum product intake needed before build planning.

Required fields:

- product name;
- product idea;
- target buyer;
- target user;
- painful problem;
- current workaround;
- payment reason;
- v1 scope;
- data needs;
- access model;
- security level;
- delivery target;
- revenue model;
- success proof.

Required behavior:

- show missing required inputs;
- mark intake as blocked if buyer, pain, payment reason, scope, data, or
  security is missing;
- create or update a product intake record under `products/{product-slug}/`;
- never start implementation from incomplete intake unless the human owner
  records an explicit approved bypass.

### 3. Agent Graph

Shows Factory agents and their current state.

Required agents:

- Master Moderator;
- Product Market Agent;
- Product Intake Agent;
- Architecture Agent;
- Backend Agent;
- Frontend UX Agent;
- QA/Security Agent;
- Evidence Agent;
- Decision Challenger;
- Steering Committee.

Required fields per agent:

- state;
- current task;
- waiting for;
- owned jobs;
- latest handoff;
- blockers.

### 4. Subworker Board

Shows temporary scoped workers created for individual jobs.

Required fields per subworker:

- id;
- parent agent;
- objective;
- state;
- allowed files or folders;
- dependencies;
- stop conditions;
- expected evidence;
- handoff summary.

Required behavior:

- subworkers cannot exist without an owner agent and scoped job;
- subworkers cannot edit outside allowed files or folders;
- subworkers must move to Waiting or Blocked when scope, ownership, security,
  dependency, or evidence path is unclear.

### 5. Job Queue

Shows all product and Factory jobs as a dependency graph.

Required job states:

- Queued;
- Ready;
- Working;
- Waiting;
- Blocked;
- Review;
- Done;
- Rejected.

Required fields per job:

- id;
- title;
- product slug;
- owner agent;
- assigned subworker, if any;
- state;
- depends on;
- blocks;
- parallel safe;
- allowed files or folders;
- shared contracts touched;
- required checks;
- evidence output;
- approval required;
- stop conditions;
- latest update.

### 6. Blockers

Shows anything preventing work.

Required blocker types:

- missing buyer;
- missing painful problem;
- missing payment reason;
- missing scope;
- missing data classification;
- missing security level;
- missing architecture decision;
- file ownership conflict;
- unstable shared contract;
- missing test path;
- missing evidence path;
- approval required;
- unapproved tool, package, service, model, or deployment target.

### 7. Evidence

Shows evidence records for completed and review jobs.

Required evidence fields:

- job id;
- agent or subworker;
- changed files;
- checks run;
- screenshots or logs;
- decisions made;
- assumptions;
- limitations;
- unresolved risks;
- timestamp.

Rule:

No evidence means the job cannot be Done.

### 8. Approval Gates

Shows decisions that require human approval.

Required gates:

- product market gate;
- product build charter approval;
- architecture or data model high-impact decision;
- security exception;
- tool/package/service approval;
- paid launch decision;
- preview deployment;
- staging deployment;
- production deployment;
- release approval.

Required behavior:

- Jarvis may request approval;
- Jarvis may record approval status;
- Jarvis must not approve on behalf of the human owner.

### 9. Learning Log

Shows lessons from product runs, blockers, failures, and reviews.

Required content:

- what happened;
- root cause or learning;
- changed Factory rule or recommendation;
- whether human approval is needed;
- follow-up job.

## Data Files

Jarvis v1 may use local JSON and Markdown files.

Recommended files:

- `factory/jobs/jarvis-job-graph.json`
- `factory/learning/learning-ledger.json`
- `products/{product-slug}/product-intake.md`
- `products/{product-slug}/job-graph.json`
- `products/{product-slug}/evidence/{job-id}.md`
- `products/{product-slug}/release-checklist.md`

Data should be readable without Jarvis running. Important product records should
be stored as Markdown when human review matters.

## Local API Requirements

Jarvis should provide local-only endpoints for the UI.

Required API groups:

- status: read Factory state;
- intake: create, read, update product intake;
- agents: read and update agent state;
- subworkers: create, read, update scoped subworkers;
- jobs: create, read, update jobs and dependencies;
- blockers: read active blockers;
- evidence: create and read evidence records;
- approvals: request and record human approval status;
- learning: create and read learning entries.

All APIs should run locally. Network or deployment actions require explicit
human approval before execution.

## Agent And Subworker Lifecycle

### Agent Lifecycle

```text
Sleeping
-> Waiting
-> Ready
-> Working
-> Review
-> Done
```

Agents can move to Blocked when a required input, approval, dependency, file
ownership, security decision, or evidence path is missing.

### Subworker Lifecycle

```text
Created
-> Ready
-> Working
-> Handoff
-> Review
-> Closed
```

Subworkers must be closed after handoff and review. Long-running ownership
stays with the parent agent or Master Moderator, not the subworker.

## Parallel Execution Rules

Jarvis may show jobs as parallel-ready only when:

- all dependencies are satisfied;
- file ownership does not conflict;
- shared contracts are stable;
- required checks are known;
- expected evidence is known;
- approval is not pending;
- security/data classification is clear.

Jarvis must mark jobs blocked or waiting when:

- another job owns the same file;
- a schema, API, or auth contract is unsettled;
- a package, model, service, or deployment target is unapproved;
- the job depends on unfinished work;
- the job lacks a test or evidence path.

## Safety Rules

Jarvis must always show these boundaries:

- Jarvis can coordinate work.
- Jarvis can prepare product plans.
- Jarvis can record jobs, blockers, approvals, and evidence.
- Jarvis can run approved local checks.
- Jarvis cannot deploy without explicit human approval.
- Jarvis cannot approve release.
- Jarvis cannot approve paid launch.
- Jarvis cannot override failed gates.
- Jarvis cannot expose secrets.
- Jarvis cannot mark work Done without evidence.

## V1 Acceptance Criteria

Jarvis v1 is acceptable when:

- it runs locally;
- it clearly says Jarvis is private Factory infrastructure;
- it captures a product intake record;
- it identifies missing intake fields and blockers;
- it shows all core agents;
- it can create and display subworkers;
- it can create and display jobs with dependencies;
- it shows ready, blocked, waiting, review, and done work;
- it records evidence for a job;
- it shows approval gates;
- it prevents Done state when evidence is missing;
- it does not provide public deployment controls for Jarvis;
- it keeps product deployment behind explicit human approval.

## First Build Order

Build Jarvis in this order:

1. Data schema and file storage.
2. Factory status API.
3. Product intake UI and API.
4. Agent graph.
5. Job queue and dependency states.
6. Subworker board.
7. Blockers view.
8. Evidence records.
9. Approval gates.
10. Learning log.

Do not start with visual polish. Start with truthful state, clear blockers, and
records that survive restart.
