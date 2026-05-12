# Agent Parallelism and Dependency Management

Status: Draft baseline for Factory 1.0

## Purpose

Define how Factory agents may work in parallel without corrupting scope, files,
decisions, evidence, or security posture.

## Core Rule

Agents may work in parallel only when their work is dependency-clear, ownership
is explicit, and evidence expectations are known before execution starts.

If dependencies are unclear, the agent does not start building. It waits,
asks for clarification, or creates a blocker record.

## Simple Mental Model

Factory work is managed as a dependency graph.

- A job is a node.
- A dependency is an edge.
- A ready job has all required inputs.
- A blocked job is missing an input, approval, file ownership, tool, test path,
  or evidence path.
- A done job is accepted only when evidence is attached.

Parallel work means multiple ready jobs can run at the same time. It does not
mean every agent starts immediately.

## Job States

| State | Meaning |
| --- | --- |
| Queued | Job exists but dependencies have not been evaluated. |
| Ready | Dependencies are satisfied and work can start. |
| Working | Agent is actively doing the job. |
| Waiting | Agent needs an output, decision, or evidence from another job. |
| Blocked | A required dependency is missing or unsafe. |
| Review | Work is complete but needs QA, evidence, challenge, or human approval. |
| Done | Evidence is complete and acceptance criteria are met. |
| Rejected | Work failed a gate and must be changed or abandoned. |

## Dependency Types

| Dependency | Examples | Who Clears It |
| --- | --- | --- |
| Gate dependency | Market gate, charter, architecture approval, release gate | Human owner or Steering Committee |
| Information dependency | Buyer, intended use, data class, requirements, API contract | Product Intake or Product Market Agent |
| File ownership dependency | Same file, same module, shared schema, shared config | Master Moderator |
| Interface dependency | API contract, database schema, event name, component props | Architecture Agent |
| Security dependency | Auth, permissions, secrets, RLS, data classification | QA/Security Agent |
| Tool/package dependency | New npm/pip package, external service, CLI, model | Master Moderator and QA/Security Agent |
| Evidence dependency | Test output, scan output, screenshot, changed files, ADR | Evidence Agent |
| Human decision dependency | High-impact commercial, legal, security, release, cost decision | Human owner |

## Parallel Work Rules

Agents can run in parallel when all of these are true:

- The product gate and scope gate allow the work.
- Each job has a ticket or approved discovery action.
- Each job has an owner agent.
- Each job has allowed files/folders.
- No two working jobs own the same file unless one is read-only.
- Shared contracts are stable or explicitly versioned.
- Required tests/checks are known.
- Required evidence output is known.
- No unresolved human approval is needed.

Agents must not run in parallel when:

- two jobs edit the same file or schema;
- one job depends on another job's unfinished contract;
- the security model is unknown;
- a new package or external service is unapproved;
- a release, deployment, paid plan, or customer-facing claim needs approval;
- the evidence path is missing.

## Dependency Planning Flow

1. Product Market Agent checks buyer, pain, urgency, distribution, and willingness
   to pay.
2. Product Intake Agent records intended use, data class, security level,
   blockers, and build-start readiness.
3. Architecture Agent defines boundaries, modules, contracts, and high-impact
   decisions.
4. Master Moderator turns approved scope into tickets.
5. Master Moderator builds the dependency graph.
6. Ready jobs are assigned to agents or workers.
7. Agents work in parallel only on non-conflicting ready jobs.
8. QA/Security and Evidence review outputs.
9. Decision Challenger reviews risky assumptions.
10. Steering Committee or human owner approves high-impact gates.

## Ticket Dependency Fields

Every build ticket should include:

- depends on;
- blocks;
- parallel safe: yes/no;
- allowed files/folders;
- shared contracts touched;
- required tests/checks;
- evidence output;
- human approval needed: yes/no;
- stop conditions.

## File Ownership Locks

Before a job starts, the Master Moderator assigns one of these ownership modes:

| Mode | Meaning |
| --- | --- |
| Exclusive write | Only one agent may edit the file/folder. |
| Read-only | Agent may inspect but not edit. |
| Contract owner | Agent owns the shared API/schema/interface contract. |
| Review-only | Agent may comment, test, or challenge but not change code. |

If two agents need the same exclusive write area, the later job waits.

## Shared Contract Rule

Shared contracts must be agreed before parallel work starts.

Examples:

- API request/response shape;
- database schema;
- auth/permission behavior;
- event names;
- component props;
- environment variables;
- storage paths.

If the contract changes while agents are working, affected jobs move to Waiting
or Review until impact is checked.

## Tool And Package Dependencies

New packages, models, services, CLIs, or frameworks require a tool decision
record when they affect:

- auth;
- payments;
- files/uploads;
- AI/model behavior;
- secrets;
- production deployment;
- customer data;
- compliance or security claims.

The default is to reuse existing approved tools. Extra tools are added only
when they remove real risk or enable necessary work.

## Conflict Handling

When a conflict appears:

1. Stop the affected job.
2. Mark the job Waiting or Blocked.
3. Record the dependency causing the conflict.
4. Let the Master Moderator choose one:
   - sequence the jobs;
   - split file ownership;
   - freeze a contract;
   - ask Architecture or QA/Security to decide;
   - escalate to the human owner.
5. Resume only after the dependency is clear.

## Evidence Required

Each completed job must produce evidence:

- changed files or created files;
- tests/checks run;
- scan output if relevant;
- screenshots for UI work when relevant;
- decisions made;
- assumptions or limitations;
- unresolved risks.

No evidence means not done.

## Jarvis Implementation Target

Jarvis should eventually show:

- job graph;
- ready/blocked/waiting jobs;
- dependency reason for each waiting job;
- file ownership locks;
- active parallel agents;
- evidence links;
- approval-required gates;
- conflict warnings.

Factory 1.0 starts with documented rules and dry-run behavior. The next
implementation step is durable job records that store dependencies and agent
state on disk.
