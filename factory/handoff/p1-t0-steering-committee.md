# Steering Committee — Operational Details
**Status:** Filed 2026-05-14. Resolves Doc 2 §4 carry-over (Steering Committee fields incomplete in v0.9 §05).
**Authority source:** v0.9 §05 (Steering Committee URS), Doc 1 §3, gap-answers.md, claude-operating-principles.md §A.

## Mission

Provides strategic oversight, approves portfolio-level decisions, and arbitrates unresolved high-impact disputes between agents or between an agent and the human owner.

Verbatim from `AI_Enterprise_SaaS_Factory_Document_Pack_v0_9.md` §05.

## Scope clarification

The Steering Committee is the **strategic governance body** of the factory. It does NOT replace:
- The human owner (Vineet) at G-Charter, G-Architecture, and G-Release gates
- The Master Moderator for orchestration, budgeting, or routing decisions
- The Decision Challenger for in-line adversarial review during agent execution

It operates above the per-product gates, at the portfolio level.

## KPIs

**Active KPI (effective immediately):**
- Every Steering Committee session produces a hash-chained decision record in the evidence ledger, referencing the topic, participants, evidence reviewed, decision, dissenting views, and action items.

**Aspirational KPIs (revisit 2026-11-14, six months after filing):**
- Portfolio decision turnaround: 95% of escalated decisions resolved within 7 days
- Decision quality: <10% of approved portfolio decisions reversed within 90 days
- Coverage of high-stakes products: 100% of dial-7+ products receive at least one Steering Committee review per quarter

These three are intentionally not active yet because:
- The factory has zero active products at filing time
- Vineet operates as Steering Committee solo, evenings, with limited bandwidth
- Calibration requires real session data before targets can be defensibly set

When revisited at 2026-11-14, decide: activate as-is, adjust numbers based on real data, drop entirely, or replace with different KPIs.

## Allowed subagents / workers

None. The Steering Committee is a deliberative body, not an execution one. When deeper analysis is required, it commissions existing agents (Architecture Agent, Product Market Agent) to produce supporting evidence. It does not delegate to dedicated subagents.

## Hard stops

The Steering Committee may NOT:

1. Approve a product that has not passed G-Charter under the standard human-owner gate process.
2. Override G-Release if the QA / Test Agent or Security / Compliance Agent has flagged unresolved critical findings, except by recording an explicit risk-acceptance with named approver, rationale, and rollback plan.
3. Modify or delete existing evidence records in the ledger. Decisions create new records; they never erase prior ones.
4. Commit factory-level architecture changes unilaterally. Architecture changes affecting the process flow (Doc 1), agent roster (Doc 2), or evidence model (Doc 3) require a written rationale and a minimum 7-day pause for human owner review before commit.
5. Approve any decision where a member has an undisclosed conflict of interest. Conflicts must be declared in the session record.

## Activation triggers

The Steering Committee convenes when ANY of the following occurs:

1. Scheduled quarterly factory health review (calendar-driven).
2. Portfolio decision: should a product enter, exit, or be re-prioritized in the active queue.
3. Repeated budget cap hits on the same product type, indicating a systemic issue rather than a single-task problem.
4. Conflict escalation: an agent and the human owner disagree on a critical decision and the human owner explicitly requests committee input.
5. Cross-product risk: a finding in one product implies risk for others in the portfolio.

## Evidence obligation

Every Steering Committee session produces a decision record in the factory evidence ledger. Required fields:

- `id`, `timestamp`, `agent` = `Steering Committee`, `stage` = `cross-cutting`
- Members present (named)
- Topic and trigger (which activation trigger applied)
- Evidence reviewed (file paths, evidence record ids referenced)
- Supporting agent outputs (if any agent was commissioned for analysis)
- Decision text
- Dissenting views (if any)
- Action items (with owner and target date)
- Next-review date (if applicable)
- Conflicts of interest declared

Records are hash-chained per Doc 3 §3 and obey the same gate / dial rules as other evidence records.

## Composition

At filing time: Vineet, in strategic governance capacity, sole member.

Future expansion may add trusted advisors (Noopur for non-conflicted topics, domain experts for specific product areas, external reviewers for high-stakes decisions). When the composition changes, this section is updated and the change is itself a Steering Committee decision record.

## Revisit schedule

This document is revisited on 2026-11-14 (six months from filing) to:
- Decide on activation of the three aspirational KPIs
- Update composition if it has changed
- Adjust hard stops or activation triggers based on actual operating experience
- Capture any lessons learned that should be merged into the factory's learning ledger
