# Task 001 — Document 4: Tech Stack Decision Record
**Phase:** 1 — Tech Stack Selection
**State:** ready
**Assigned to:** Codex
**Dropped by:** Claude (2026-06-07)
**Output location:** `factory/handoff/04-tech-stack-decision-record.md`
**Move this file to:** `forge/building/` when you start, `forge/review/` when done

---

## Your job

Draft **Document 4: Tech Stack Decision Record** for BuildPodFactory Phase 1.

This document locks the concrete tool and implementation choices needed to build the factory engine in Phase 2. It is a permanent governance document — the same standard as Documents 1, 2, and 3 from Phase 0.

Output the completed document to:
```
factory/handoff/04-tech-stack-decision-record.md
```

---

## Context you must read first

Read these files before writing anything:

1. `factory/handoff/master-orchestration.md` — project overview, locked decisions D1-D8
2. `factory/handoff/00-factory-process-flow.md` — S0-S10 pipeline, Master Moderator requirements
3. `factory/handoff/00-agent-role-cards.md` — 11 agent roster
4. `factory/handoff/00-evidence-and-gate-policy.md` — evidence schema, hash chain
5. `factory/handoff/p1-t0-tokencostscope-evaluation.md` — tokencostscope DEFER decision
6. `AntiGravity/BuildPodV2AntiGravity/engine/db.js` — working SQLite hash-chain implementation
7. `AntiGravity/BuildPodV2AntiGravity/engine/moderator.js` — working 3-agent factory loop

---

## Decisions already locked — DO NOT re-open these

| ID | Decision |
|---|---|
| D1 | LLM engine: Anthropic SDK direct, no framework (original) — BUT see TD2 below for amendment |
| D2 | Pluggable LLM adapter: Anthropic + Ollama + DeepSeek + OpenAI |
| D3 | 11-agent roster locked |
| D5 | Phase 0 → Phase 1 → Phase 2, no skipping |
| D6 | Dial is config, not code |
| OQ1 | Retention: 2-day POC default, captured at S0 Intake for production |
| OQ2 | Signature: hash-chain only (actor string + SHA-256), no crypto signing in Phase 2 |
| OQ3 | Evidence storage: `products/{product-id}/evidence.jsonl`, one file per product |
| OQ4 | 5 parked agents absorbed into existing 11 |
| Tokencost | tokencostscope DEFERRED — build internal prediction module in Phase 2 |

---

## Research findings to incorporate — these inform your decisions

**Gap analysis (from Phase 1 research, 2026-06-07):**

Neither Antigravity SDK nor Vercel AI SDK provides the factory's governance layer out of the box:

| Factory requirement | Antigravity SDK | Vercel AI SDK |
|---|---|---|
| max_steps / max_model_calls enforcement | ❌ | ✅ `stopWhen` / `stepCountIs` |
| Spend-based circuit breaker (70/85/100%) | ❌ | ❌ |
| File ownership locks | ❌ | ❌ |
| Job dependency graph / FIFO queue | ❌ | ❌ |
| Multi-provider (Anthropic + DeepSeek + Ollama + OpenAI) | ❌ Gemini-only | ✅ |
| Evidence writing / hash chain | ❌ | ❌ |
| Lesson injection | ❌ | ❌ |
| Human gate support | ✅ Tiered permissions | ⚠️ Manual via tool calls |
| Persistent state across sessions | ✅ | ⚠️ Stateless by default |

**Conclusion from research:** The governance layer (budget enforcement, circuit breaker, file locks, job graph, evidence writing, lesson injection) is the factory's unique value and must be built as custom Node.js code. The LLM adapter is just the call layer underneath.

**V2 prototype findings (in `AntiGravity/BuildPodV2AntiGravity/`):**
- `db.js` has a working Node 22+ built-in SQLite hash-chain implementation — directly reusable
- `moderator.js` has a working 3-agent loop (Intake → Drafting → Compliance → Human Gate)
- Stack used: Vercel AI SDK + Node built-in SQLite + plain HTML frontend

---

## Decisions Document 4 must make and lock

Structure your document around these 6 decisions. Each must have: decision, rationale, alternatives considered, and what it rules out.

### TD1 — LLM Adapter layer
**Question:** Raw Anthropic SDK (D1 original) or Vercel AI SDK as the unified multi-provider adapter?

**Recommended decision to evaluate:** Vercel AI SDK as the unified adapter.
- Satisfies D2 (multi-provider) without building raw wrappers per provider
- Already validated in V2 prototype
- ~10 lines to switch providers
- D1's "no framework" intent was about orchestration frameworks (CrewAI, LangChain) — a thin adapter library is not the same thing
- Rules out: building separate raw wrappers for Anthropic, DeepSeek, Ollama, OpenAI

### TD2 — Evidence storage engine
**Question:** Append-only JSONL (OQ3 decision) or SQLite WAL mode (V2 prototype approach)?

**Trade-offs to evaluate:**
- JSONL: simpler, human-readable, trivially append-only, hash chain is easy to verify with `cat`
- SQLite WAL: safer for concurrent agent writes, V2 db.js already implements it, Node 22+ built-in (no native compilation)
- Single product at a time (concurrency = 1 per design) — does concurrent write safety matter?

**Recommended decision to evaluate:** Keep JSONL for the primary evidence ledger (OQ3 locked) + use SQLite for orchestration state only (job graph, file locks, budgets). Two different stores for two different purposes.

### TD3 — Orchestration state persistence
**Question:** How does Master Moderator persist job graph, file locks, budgets, and agent state across sessions?

**Options:**
- JSON files (current Jarvis approach) — simple, dirty, race condition risk
- SQLite WAL (V2 prototype approach) — safe concurrent writes, queryable, Node 22+ built-in
- In-memory + JSONL checkpoint — fast but loses state on crash

**Recommended decision to evaluate:** SQLite WAL for orchestration state. Separate from evidence JSONL.

### TD4 — Local UI (Jarvis)
**Question:** Keep plain HTML/CSS/JS or upgrade to Svelte?

**Context:**
- Plain HTML/CSS/JS: zero build step, Codex-friendly, currently working
- Svelte: already in V2 node_modules, reactive, better for complex state — but adds a build step
- Jarvis is local factory infrastructure only, not a customer product

**Recommended decision to evaluate:** Keep plain HTML/CSS/JS for Phase 2. Defer Svelte to Phase 3 if needed. Simpler = faster to build the real engine.

### TD5 — Tool ecosystem roles (locked in Phase 1)
**Question:** How do Codex, Antigravity, NotebookLM, and Banana Code fit into the factory workflow?

**Decision to record:**
- Codex: primary builder — executes working prompt packages for S5/S6 build work
- Antigravity 2.0: extended hands for agentic testing and browser verification (S7/S9)
- NotebookLM: research and synthesis (Phase 1 only — not a runtime factory component)
- Banana Code: mobile maintenance PRs
- Claude: architecture, gate review, Doc drafting

**This is NOT about the LLM adapter** — these are human workflow tools, not factory engine components.

### TD6 — Node.js version and runtime constraints
**Question:** Which Node.js version and what constraints apply?

**Context:**
- V2 prototype uses Node built-in SQLite (`node:sqlite`) which requires Node 22+
- Vineet's Mac runs Node v26
- `DatabaseSync` (synchronous SQLite API) is the right choice for the factory's single-threaded, step-by-step orchestration model
- pnpm is the package manager (locked)

**Decision to record:** Node 22+ required (Node 26 on dev machine). Use `node:sqlite` built-in. No native C++ compilation dependencies for core factory modules.

---

## Document structure to follow

Use this exact structure:

```markdown
# Tech Stack Decision Record (Phase 1 Document 4)
**Version:** 1.0
**Date:** [today]
**Status:** APPROVED / DRAFT
**Owner:** Vineet

## 1. Purpose
## 2. Scope and constraints
## 3. Decisions

### TD1 — LLM Adapter layer
### TD2 — Evidence storage engine
### TD3 — Orchestration state persistence
### TD4 — Local UI (Jarvis)
### TD5 — Tool ecosystem roles
### TD6 — Runtime and Node version

## 4. Ruled out (with rationale)
## 5. Impact on Phase 2 build plan
## 6. Open questions carried into Phase 2
```

For each decision block use:
```
**Decision:** [what was decided]
**Rationale:** [why — cite source docs]
**Alternatives considered:** [what was evaluated]
**Rules out:** [what this closes off]
**Source refs:** [file paths]
```

---

## Acceptance criteria

Document 4 is accepted when:
- [ ] All 6 TD decisions are present with decision, rationale, alternatives, and rules-out
- [ ] Every decision traces to a source ref (file path or research finding above)
- [ ] No decision contradicts D1-D8 or OQ1-OQ4 without a recorded amendment
- [ ] "Ruled out" section explicitly closes off: raw per-provider adapters, Antigravity SDK as factory engine, Svelte for Phase 2 Jarvis, tokencostscope
- [ ] Phase 2 build plan impact is described in plain terms (what Phase 2 now builds, in what order)
- [ ] Document is clean Markdown, no broken headings, no TODO placeholders left in

---

## What NOT to do

- Do not re-open D1-D8 or OQ1-OQ4
- Do not add new agent roles
- Do not design Phase 2 implementation details — just state what Phase 2 will build based on these decisions
- Do not install any packages or write any code — this task is documentation only
- Do not create a product repo or run the factory

---

## When done

1. Write the document to `factory/handoff/04-tech-stack-decision-record.md`
2. Move this task file from `forge/building/` to `forge/review/`
3. Add a short summary at the bottom of this file:

```
## Codex completion note
Date: 
Decisions made: TD1, TD2, TD3, TD4, TD5, TD6
Output: factory/handoff/04-tech-stack-decision-record.md
Notes: [anything Claude or Vineet should check]
```

---

**End of task-001.**
