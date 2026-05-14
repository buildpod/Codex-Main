# Factory Process Flow (Phase 0 Document 1)

## 1. Purpose

BuildPodFactory is a private factory for turning a human-chosen software product idea into a controlled product output: a git repository, a validation evidence package, and a README. The factory does not choose the business idea by itself. It runs one product at a time through market check, charter, requirements, architecture, build, QA/security, evidence, release approval, and operations handoff. Industry or regulatory context is captured at intake and changes gate strictness through the evidence intensity dial; it is not hardwired into separate factory flows.[^gap]

## 2. Pipeline overview

All stages obey the same rule: no source means assumption, no evidence means not done, and no gate pass means no acceptance.[^flow]

### S0 Intake

- **Input:** Product idea, reason it matters, buyer/user if known, initial evidence dial.
- **Agent owner:** Human owner with Master Moderator.
- **Action:** Capture the idea and known unknowns; do not create a product repo.
- **Output artifact:** Idea record or discovery note.
- **Pre-conditions:** Human owner is named.
- **Post-conditions:** Idea can enter market check or is blocked for missing basics.
- **Evidence produced:** Source statement, assumptions, initial dial, blocker list.
- **Failure path:** Missing intended use, buyer, or unsafe claim becomes discovery/blocker.
- **Source citation:** `factory/operations/build-workflow.md`, `factory/handoff/gap-answers.md`.

### S1 Market Check / Opportunity Validation

- **Input:** Idea, buyer, user, pain, workaround, urgency, distribution, willingness to pay.
- **Agent owner:** Product Market Agent.
- **Action:** Score commercial clarity and name blockers.
- **Output artifact:** Product Market Gate record.
- **Pre-conditions:** No build tickets exist.
- **Post-conditions:** Decision is Proceed, Discovery Needed, Park, or Reject.
- **Evidence produced:** Scores, assumptions, alternatives, discovery questions, human decision.
- **Failure path:** Weak buyer, weak pain, no distribution, or unsafe data use parks/rejects.
- **Source citation:** `factory/commercial/product-market-gate.md`.[^market]

### S2 Charter

- **Input:** Market decision, intake facts, data/security class, regulatory context.
- **Agent owner:** Product Intake Agent with human owner.
- **Action:** Draft product build charter, non-goals, success criteria, gates.
- **Output artifact:** Product Build Charter draft.
- **Pre-conditions:** Intended use, buyer/user, data class, and security level are known.
- **Post-conditions:** Charter package is ready for G-Charter.
- **Evidence produced:** Charter draft, classification, blockers, approval request.
- **Failure path:** Missing intake facts stop the factory until clarified.
- **Source citation:** `factory/operations/build-workflow.md`, `factory/security/data-classification.md`.

### G-Charter

- **Sits between:** S2 Charter and S3 Requirements / FRS.
- **Pass condition:** Human owner approves goal, non-goals, scope, gates, and success criteria.
- **Fail condition:** Charter is unclear, goal changed without approval, or evidence is missing.
- **Human required:** Yes.
- **Override authority:** Human owner / Vineet.
- **Evidence produced:** Approval record with approver, date, decision, risks, and source documents.[^rights]

### S3 Requirements / FRS

- **Input:** Approved charter and market/intake evidence.
- **Agent owner:** Product Intake Agent with Architecture Agent support.
- **Action:** Write functional requirements, acceptance criteria, constraints, and trace links.
- **Output artifact:** Requirements / FRS document.
- **Pre-conditions:** G-Charter passed.
- **Post-conditions:** Architecture has stable requirements and open questions.
- **Evidence produced:** Requirement IDs, source links, assumptions, exclusions.
- **Failure path:** Unsupported requirement or compliance claim is labeled assumption or blocked.
- **Source citation:** `factory/anti-hallucination-rules.md`, `factory/operations/build-workflow.md`.

### S4 Architecture

- **Input:** Requirements / FRS, data class, security context, reuse candidates.
- **Agent owner:** Architecture Agent.
- **Action:** Define system boundaries, data model, APIs, contracts, modules, ADRs.
- **Output artifact:** Architecture brief, ADRs, module contracts, component V-model notes.
- **Pre-conditions:** Requirements are approved enough to design against.
- **Post-conditions:** Architecture package is ready for G-Architecture.
- **Evidence produced:** ADRs, contract notes, reuse decisions, open risks.
- **Failure path:** High-impact unknowns or tenant/security uncertainty stop for human decision.
- **Source citation:** `factory/architecture/default-architecture.md`, `factory/modules/module-contract-template.md`.

### G-Architecture

- **Sits between:** S4 Architecture and S5/S6 Build.
- **Pass condition:** Human owner approves architecture, key ADRs, data model, security model, and build boundaries.
- **Fail condition:** Major contract, data, security, tool, or compliance issue remains unresolved.
- **Human required:** Yes.
- **Override authority:** Human owner / Steering Committee.
- **Evidence produced:** Architecture approval record, ADR references, accepted risks.[^rights]

### S5 Build (Backend)

- **Input:** Approved architecture, backend tickets, contracts, allowed files/folders.
- **Agent owner:** Backend Agent.
- **Action:** Build services, APIs, data handling, migrations/imports, and tests.
- **Output artifact:** Backend code and verification output.
- **Pre-conditions:** Ticket dependencies, file locks, tool approvals, and test path are clear.
- **Post-conditions:** Backend work moves to Review with evidence attached.
- **Evidence produced:** Changed files, tests/checks, scan notes, known risks.
- **Failure path:** Failing tests, file conflict, or missing dependency triggers one repair or escalation.
- **Source citation:** `factory/operations/agent-parallelism-and-dependencies.md`, `factory/governance/evidence-policy.md`.[^evidence]

### S6 Build (Frontend / UX)

- **Input:** Approved UX requirements, frontend tickets, stable API/component contracts.
- **Agent owner:** Frontend UX Agent.
- **Action:** Build the actual product workflow, states, responsive views, and basic accessibility.
- **Output artifact:** Frontend code plus visual/manual verification notes.
- **Pre-conditions:** Shared contracts are stable or versioned.
- **Post-conditions:** UI work moves to Review with evidence attached.
- **Evidence produced:** Changed files, screenshots where relevant, checks, limitations.
- **Failure path:** Broken, confusing, or non-responsive workflow returns for repair.
- **Source citation:** `factory/design/ux-quality-standard.md`, `factory/product/product-quality-standard.md`.

### S7 QA / Security

- **Input:** Built product, tickets, evidence records, security/data classifications.
- **Agent owner:** QA / Test Agent and Security / Compliance Agent (collaborating), with Decision Challenger.
- **Action:** QA / Test Agent verifies core workflows and runs functional/regression tests. Security / Compliance Agent reviews auth/permissions and scans secrets/dependencies. Decision Challenger challenges both sets of claims. Both agents produce independent evidence records.
- **Output artifact:** QA report (from QA/Test Agent) and Security report (from Security/Compliance Agent), both attached to the S7 evidence package.
- **Pre-conditions:** Build evidence and test path exist.
- **Post-conditions:** QA package is ready for G-QA.
- **Evidence produced:** Test output, scan output, findings, risk acceptance requests.
- **Failure path:** Critical security, broken workflow, or contradictory evidence blocks release path.
- **Source citation:** `factory/security/security-baseline.md`, `factory/security/product-security-checklist.md`, `AI_Enterprise_SaaS_Factory_Document_Pack_v0_9.md` §16 (QA/Test Agent and Security/Compliance Agent).

### G-QA

- **Sits between:** S7 QA / Security and S8 Evidence Compilation.
- **Pass condition:** QA / Test Agent confirms core workflow verified and tests pass. Security / Compliance Agent confirms no unresolved critical security issues (or risks formally accepted by human). Evidence from both agents is not contradictory.
- **Fail condition:** Broken primary workflow, exposed secret, critical vulnerability, or missing test evidence.
- **Human required:** Conditional by dial; optional at low dial, required at higher regulated/compliance settings.
- **Override authority:** Human owner for risk acceptance.
- **Evidence produced:** QA gate record containing both QA findings and Security findings, accepted risks, human review if required.[^release]

### S8 Evidence Compilation

- **Input:** Stage records, tickets, test output, scans, approvals, known risks.
- **Agent owner:** Evidence Agent.
- **Action:** Compile and check the validation evidence package.
- **Output artifact:** Evidence package / ledger export.
- **Pre-conditions:** QA passed or a human accepted the risk.
- **Post-conditions:** Release candidate can be assembled.
- **Evidence produced:** Ledger records, artifact links, missing-evidence list if any.
- **Failure path:** Missing or contradictory evidence returns work to the owning stage.
- **Source citation:** `factory/governance/evidence-ledger-format.md`, `factory/templates/agent-evidence-record-template.md`.

### S9 Release / Publication

- **Input:** Git repo, evidence package, README, release scope, release checklist.
- **Agent owner:** Master Moderator with Evidence Agent.
- **Action:** Assemble release candidate and prepare approved publication/deployment steps.
- **Output artifact:** Release candidate: repo, validation evidence package, README.
- **Pre-conditions:** G-QA passed and release target is known.
- **Post-conditions:** Release package is ready for G-Release.
- **Evidence produced:** Release checklist, limitations, deployment target, command results if run.
- **Failure path:** Unapproved deployment, secret risk, missing legal/privacy item, or missing evidence becomes Hold.
- **Source citation:** `factory/operations/release-gates.md`, `factory/security/permissions-and-access.md`.

### G-Release

- **Sits between:** S9 Release / Publication and S10 Operations Handoff.
- **Pass condition:** Human owner approves release decision, target, known limitations, and evidence package.
- **Fail condition:** Release gate failed, human approval missing, or deployment target unclear.
- **Human required:** Yes.
- **Override authority:** Human owner / Vineet.
- **Evidence produced:** Release decision record, gate results, approval, rollback/recovery notes.[^release]

### S10 Operations Handoff

- **Input:** Approved release package, limitations, support/recovery expectations.
- **Agent owner:** Master Moderator with Evidence Agent.
- **Action:** Capture support contact, monitoring/logging plan, backup/recovery note, and learning proposals.
- **Output artifact:** Operations handoff and learning-ledger proposals.
- **Pre-conditions:** G-Release decision is recorded.
- **Post-conditions:** Product is closed, supported, or returned to backlog with known limitations.
- **Evidence produced:** Handoff record, release notes, support/recovery plan, proposed lessons.
- **Failure path:** Missing support or recovery expectation becomes conditional release or hold.
- **Source citation:** `factory/operations/support-and-operations-baseline.md`, `factory/operations/moderator-learning-loop.md`.

## 3. The Master Moderator's cross-cutting role

The Master Moderator owns orchestration, not final approval. It operates
across all stages and handles the following responsibilities:

**Orchestration:**
- Maintains FIFO product queue at concurrency 1
- Builds the job dependency graph for each product
- Assigns file ownership locks across agents
- Tracks ready / blocked / review states
- Routes work to agents based on stage and task type

**Budget enforcement (per task, defaults from gap-answers.md Gap 3):**
- `max_steps = 10`
- `max_model_calls = 6`
- `max_wall_clock_seconds = 90` for synchronous work
- `max_spend_usd` scales by dial: $0.50 at dial 1, $1.00 at dial 3,
  $2.00 at dial 5, $3.50 at dial 7, $5.00 at dial 10
- `max_context_tokens = 100,000`

**Model routing (per call, not per task):**
- Planning / orchestration / complex reasoning → high-reasoning model
  (e.g., Claude Sonnet 4.5)
- Routine execution / generation → fast/cheap model
  (e.g., Claude Haiku 4.5 or DeepSeek V3)
- Verification / QA / linting → fast/cheap model
- All routing decisions are logged in the evidence ledger

**Circuit breaker:**
- 70% of any budget: log warning, continue
- 85% of any budget: throttle to cheaper model
- 100% of any budget: hard stop, pause task, escalate to human

**Failure handling:**
- One repair attempt per failure, using a different approach
  (different prompt structure, different model, or different agent)
- On repair failure: escalate to human, no further automated attempts
- Global hard cap: never more than 3 LLM calls per failure event
  without human checkpoint
- Two consecutive failures from the same agent on the same task force
  mandatory escalation regardless of remaining budget

**Lesson injection (per agent invocation):**
- Pulls active matching lessons from learning-ledger.json by tag and phase
- Max 10 lessons injected per prompt
- Hard cap of 5,000 tokens for injected lessons
- Lessons are kept in a clearly delineated section of the agent prompt,
  not merged with system prompt or task input

[^gap][^parallel][^learning]

## 4. Branches and exits

Proceed means the stage output satisfies its post-conditions and evidence exists. Discovery Needed permits only discovery tickets. Park and Reject stop build planning. Blocked means an input, approval, file lock, tool, test path, or evidence path is missing. Repair means one different approach is allowed under Moderator control. Escalate means human decision is required. Release outcomes are Release, Conditional Release, Hold, or Reject. Incident exits stop affected work, preserve evidence, rotate exposed secrets where needed, and update rules after review.[^incident]

**Explicit branch and loopback rules:**

- **Charter rejected at G-Charter:** loop back to S0 Intake with feedback,
  or Park/Reject and exit.
- **Architecture rejected at G-Architecture:** loop back to S3 Requirements
  with feedback; do not skip directly to S4 rework.
- **QA failure at G-QA:** Master Moderator triggers one repair attempt
  in the failing build stage (S5 or S6); on repair failure, escalate
  to human owner.
- **Release rejected at G-Release:** loop back to S8 Evidence Compilation
  if the issue is evidence; loop back to S9 if the issue is release
  packaging; escalate to human if the issue is goal-level.
- **Budget exhaustion at any stage:** hard stop, task pauses, evidence
  preserved, human owner notified.
- **Incident exit at any stage:** stop affected work, preserve evidence,
  rotate exposed secrets where needed, update rules after review.

## 5. Evidence intensity dial - what changes per dial

The process does not fork by industry. Intake declares product type, data class, regulatory context, and dial. Dial changes how much evidence and human review is required.

| Dial | Evidence package expectation |
| --- | --- |
| 1 | Evidence ledger dump and README. |
| 3 | Dial 1 plus charter, architecture summary, QA report. |
| 5 | Dial 3 plus test results, change log, dependency list. |
| 7 | Dial 5 plus risk assessment, security review, signed approvals. |
| 10 | Dial 7 plus validation pack, traceability matrix, hash-chain proof, named approver signatures, regulatory mapping. |

## 6. Open design questions

- **UNCERTAIN:** The exact evidence schema, hash-chain rule, and approval record format belong in T4 and are not finalized here.
- **UNCERTAIN:** The exact dial threshold where G-QA changes from optional human review to mandatory human review is not yet encoded.
- **UNCERTAIN:** The exact product repository template and engine persistence model belong to later Phase 0/Phase 1 documents.
- **UNCERTAIN:** How does the factory estimate task duration and cost
  *before* running, to support predictive (not just reactive) enforcement
  of the 70/85/100% circuit breaker defined in Section 3? Candidate
  component: `tokencostscope` (github.com/krulewis/tokencostscope) —
  open-source MIT pre-execution estimator with Optimistic / Expected /
  Pessimistic bands and auto-calibration from actuals. Identified gaps
  vs. factory needs: (a) Anthropic-only (factory needs DeepSeek, Ollama,
  OpenAI); (b) no wall-clock time estimation, only cost; (c) no integration
  with the factory evidence ledger; (d) pipeline step naming not mapped
  to S0-S10. Pre-alpha quality at time of writing (0 GitHub stars, solo
  developer); operational risk acknowledged. Decision deferred to Phase 1
  (tech stack evaluation) and Phase 2 (implementation). Research basis:
  Bai et al. 2026, "How Do AI Agents Spend Your Money?" (arxiv 2604.22750),
  which establishes that coarse-grained pre-run prediction is feasible
  while instance-level precision is not.
- Current implementation gap: Jarvis is a local UI/dry-run command center; real autonomous agent execution is not implemented in Phase 0.

[^flow]: `factory/operations/build-workflow.md`
[^gap]: `factory/handoff/gap-answers.md`
[^market]: `factory/commercial/product-market-gate.md`
[^rights]: `factory/governance/decision-rights-matrix.md`
[^parallel]: `factory/operations/agent-parallelism-and-dependencies.md`
[^evidence]: `factory/governance/evidence-policy.md`, `factory/governance/evidence-ledger-format.md`
[^release]: `factory/operations/release-gates.md`
[^learning]: `factory/operations/moderator-learning-loop.md`
[^incident]: `factory/security/incident-response-lite.md`
