# BuildPodFactory — Master Orchestration Document
**Version:** 1.0 — Phase 0 closure
**Date:** 2026-05-14
**Owner:** Vineet
**Status:** Living document. Update after each phase or major artifact.

This is the index of everything produced for the BuildPodFactory project. New conversations should start here. New contributors should read this first. When in doubt about what file to look at, return to this document.

---

## 1. What BuildPodFactory is

A local, governance-first system that orchestrates LLM agents through a controlled SDLC pipeline to produce software products with audit-grade evidence. Built and run from Vineet's MacBook. The factory's primary job is to be a **durable project state layer** — apps generated are downstream artifacts, not the primary purpose.

The intended user is Vineet. The intended scale is one product at a time, configurable strictness via an evidence intensity dial from 1 (hobby) to 10 (GxP-validated).

---

## 2. Project state at a glance

| Phase | Status | Closed on |
|---|---|---|
| Phase 0: Design on paper | ✅ Complete | 2026-05-14 |
| Phase 1: Tech stack selection | ⏳ Not started | — |
| Phase 2: Build (implement Phase 0 design) | ⏳ Not started | — |
| Phase 3: Smoke test (first real product) | ⏳ Not started | — |

**Current focus:** Phase 0 just closed. Next session opens with Phase 1 scoping.

---

## 3. Locked decisions (cannot be silently changed)

These were made during Phase 0 working sessions and are now considered permanent unless explicitly versioned with a recorded change.

| ID | Decision | Rationale source |
|---|---|---|
| D1 | LLM engine: Anthropic SDK direct, no framework | Anthropic "Building Effective Agents"; Node.js project constraint; Karpathy P2 |
| D2 | LLM strategy: pluggable adapter (Anthropic + Ollama + DeepSeek + OpenAI) | Cost optimization; vendor independence |
| D3 (amended) | Active agent roster: 11 agents | v0.9 §16 + QA/Security split; supersedes earlier "10 agents" |
| D4 | Smoke-test product: deferred until factory works | Don't pick fuel before testing the engine |
| D5 | Build approach: Phase 0 → Phase 1 → Phase 2 (no skipping) | V-Model GxP discipline |
| D6 | Same factory serves dial-1 through dial-10. Dial is config, not code. | Configurable strictness |
| D7 | First wedge market: pharma compliance | Vineet's BioNTech network + GxP expertise |
| D8 | Lorenz/Freyr/DocLabel-class products are 3-5 year goals, not weekend smoke tests | Honest scoping |

For full context: `factory/handoff/2026-05-13-conversation-handoff.md` §2 (Decisions).

---

## 4. Artifact registry

Repo paths are relative to project root. Prompt filenames in the Codex working prompts section refer to the provided working prompts unless later copied into the repo. Status legend:
- **CURRENT** — authoritative; reference and follow
- **SUPERSEDED** — historical; do not follow, but kept for traceability
- **REFERENCE** — context-only, not actionable

### Phase 0 design documents (CURRENT, COMMITTED)

| File | Purpose |
|---|---|
| `factory/handoff/00-factory-process-flow.md` | Document 1 — 11 stages, 4 gates, Master Moderator role, dial table. v3. APPROVED. |
| `factory/handoff/00-agent-role-cards.md` | Document 2 — 11 agent role cards. APPROVED. |
| `factory/handoff/00-evidence-and-gate-policy.md` | Document 3 — evidence schema, hash chain, gate catalog, dial spec. APPROVED. |
| `factory/handoff/phase0-approval.json` | Approval record. `all_approved=true`, `ready_for_phase1=true`. |
| `factory/handoff/gap-answers.md` | The 6 Phase 0 gap answers (Gap 3 research-anchored). D3 amended for 11 agents. |
| `factory/handoff/2026-05-13-conversation-handoff.md` | Working session log; decisions D1-D8; open loops; flags. |
| `factory/handoff/claude-operating-principles.md` | Spec for how Claude operates on this project. 10 principles + sprint structure + architecture + verification. |

### Source-of-truth pack (REFERENCE)

| File | Purpose |
|---|---|
| `factory/handoff/AI_Enterprise_SaaS_Factory_Document_Pack_v0_9.md` | v0.9 URS pack (29 URS/SOP docs). Authoritative for agent definitions. Predates this conversation. |

### Claude/Codex operating references (REFERENCE / CHECK BEFORE USE)

| File | Purpose |
|---|---|
| `factory/handoff/claude-operating-principles.md` | Repo-local operating principles for Claude/Codex behavior. |
| `CODEX.md` | Local Codex principles file exists in the working tree but is not part of the Phase 0 committed set yet. |
| `.claude/skills/buildpod-*` | Not present in this repo snapshot; install or copy before relying on Claude Code auto-loading. |
| `CLAUDE.md` | Not present in this repo snapshot; use `factory/handoff/claude-operating-principles.md` as the committed source. |

### Phase 0 working artifacts (REFERENCE)

| File | Purpose |
|---|---|
| `factory/handoff/state-baseline-2026-05-13.md` | T0 output — file system snapshot before Phase 0 work |
| `factory/handoff/state-baseline-2026-05-13.sha256` | T0 output — file hashes |
| `factory/handoff/file-inventory-2026-05-13.csv` | T1 output — classification of 60 existing files (KEEP/REWRITE/ARCHIVE) |
| `factory/handoff/file-inventory-2026-05-13-summary.md` | T1 output — summary of inventory |
| `factory/_archive/2026-05-13-phase0-cleanup/` | (Not yet created) Where ARCHIVE-classified files would be moved if T6 ran |

### Codex working prompts (SUPERSEDED after use)

These were the prompts given to Codex during Phase 0. They were provided as working prompts and are kept here for traceability, not as repo-local authoritative files unless separately copied in.

| File | What it produced |
|---|---|
| `codex-work-package-phase-0.md` | Initial T0-T7 task spec |
| `T2-codex-prompt-customized.md` | First T2 draft of Document 1 |
| `T2-revision-prompt.md` (v1) | (Not used — superseded by v2) |
| `T2-revision-prompt-v2.md` | Document 1 v2 revision (4 edits) |
| (T2 v3 prompt — embedded in `next-sprint-T2v3-and-T3.md`) | Document 1 v3 (QA/Security split) |
| `T3-standalone.md` | Document 2 first draft |
| `T3-revision-and-D3-fix.md` | Document 2 cleanup + gap-answers D3 amendment |
| `T4-standalone.md` | Document 3 first draft |
| `T4-header-cleanup.md` | Document 3 header cleanup |
| `codex-final-commit.md` | Phase 0 closure commit |
| `next-sprint-T2v3-and-T3.md` | Combined T2v3 + T3 sprint package |

---

## 5. 11 agents (locked roster)

For full role cards: `factory/handoff/00-agent-role-cards.md`

| # | Agent | Source |
|---|---|---|
| 1 | Master Moderator | v0.9 §16 + Doc 1 §3 |
| 2 | Steering Committee | v0.9 §05 |
| 3 | Product Market | v0.9 §16 |
| 4 | Product Intake | Doc 1 §S0 (drafted fresh) |
| 5 | Architecture | v0.9 §16 |
| 6 | Backend | v0.9 §16 |
| 7 | Frontend UX | v0.9 §16 |
| 8 | QA / Test | v0.9 §16 (split from QA/Security) |
| 9 | Security / Compliance | v0.9 §16 (split from QA/Security) |
| 10 | Evidence | v0.9 §16 |
| 11 | Decision Challenger | v0.9 §16 + §08 |

Parked agents (in v0.9 §16, not in current scope): Import/Integration, GxP Documentation, Dependency Ledger, DevOps/Release, Learning/Memory.

---

## 6. Pipeline (locked stages and gates)

For full process flow: `factory/handoff/00-factory-process-flow.md`

```
S0 Intake
  ↓
S1 Market Check
  ↓
S2 Charter
  ↓ G-Charter (human required)
S3 Requirements / FRS
  ↓
S4 Architecture
  ↓ G-Architecture (human required)
S5 Backend Build  ⟍
                   ⟩ (parallel)
S6 Frontend Build ⟋
  ↓
S7 QA / Security (QA/Test Agent + Security/Compliance Agent collaborate)
  ↓ G-QA (optional at dial 1-3, encouraged at 5, mandatory at 7-10)
S8 Evidence Compilation
  ↓
S9 Release / Publication
  ↓ G-Release (human required)
S10 Operations Handoff
```

Cross-cutting: Master Moderator owns budget enforcement (max_steps=10, max_model_calls=6, max_spend by dial), circuit breaker (70/85/100%), model routing, failure handling (1 repair attempt then escalate), and lesson injection (10 lessons max, 5000 token cap).

---

## 7. Evidence and gate model (locked)

For full spec: `factory/handoff/00-evidence-and-gate-policy.md`

- **Hash chain:** SHA-256 over canonical-ordered fields, prev_hash links, GENESIS sentinel. Verifiable in ~30 lines of Node.
- **Evidence record fields:** id, timestamp, agent, stage, task_id, content_hash, prev_hash, model_used, tokens_in, tokens_out, cost_usd, source_refs, uncertainties, signature.
- **Gates:** G-Charter, G-Architecture, G-QA, G-Release. All require human at higher dials.
- **Approval record:** id, gate, approver, role, timestamp, decision, evidence_refs, risks_accepted, rationale, signature.

---

## 8. Open questions (carry into Phase 1)

These are intentional deferrals. Phase 1 should address them.

1. **Retention periods** by product type / regulatory context (Doc 3 §9)
2. **Cryptographic signature standard** beyond simple actor string (Doc 3 §9)
3. **JSONL evidence storage location** — directory structure, partitioning (Doc 3 §9)
4. **Tokencostscope integration** — does it fill the prediction gap or do we build alternative (Doc 1 §6)
5. **Steering Committee operational details** — KPIs, subagents, hard stops (Doc 2 §4 — v0.9 §05 incomplete)
6. **Parking decision for the 5 extra v0.9 agents** — formal status (Doc 2 §4)

---

## 9. How to use this document

**Starting a new Claude conversation:** paste this section, then ask your question. Claude has full context.

> *"I'm continuing work on BuildPodFactory. Master orchestration doc is at `factory/handoff/master-orchestration.md`. Phase 0 complete on 2026-05-14, ready for Phase 1. Please read the master doc first, then [your question]."*

**Recovering from context loss mid-conversation:** if Claude seems confused or starts repeating past decisions, paste section 3 (Locked decisions) and section 4 (Artifact registry).

**Onboarding a new person:** they read sections 1, 2, 3, 5, 6 in order. ~10 minutes. Then they can read individual artifacts as needed.

**Audit / review:** sections 4, 5, 6, 7 give full traceability from decision to artifact to commit.

---

## 10. Maintenance rules

This document is itself under the discipline it describes:

- **Update after each phase closes** (Phase 1, Phase 2, Phase 3)
- **Update after any locked decision is amended** (rare; requires evidence)
- **Do not version-bump for minor edits** — Phase boundaries only
- **Treat as evidence:** changes to this doc are themselves changes that should be committed with a descriptive message

---

## 11. Honest current state

A working session lasted ~12 hours on 2026-05-13/14 producing Phase 0. The Phase 0 artifacts in this registry are real and committed locally; a GitHub remote exists, but Phase 0 was not pushed in this session. The factory described here is **designed but not yet built**. Phase 1 selects the tools to build it with. Phase 2 builds it. Phase 3 runs the first real product through it.

No Phase 1 factory engine code has been written yet. Jarvis and PlayPatch prototypes/dry-run artifacts exist, but they are not the implemented factory engine. No real product has been run through the approved Phase 0 process yet. The honest state is: paper design complete, implementation pending.

This is not a failure. This is the GxP path: design rigorously, then build to the design. The Karpathy principle Vineet installed at the start of the session — *"if something is unclear, stop, name what's confusing, ask"* — was followed. The factory has a designed self.

The next conversation builds it.

---

**End of master orchestration document v1.0.**
