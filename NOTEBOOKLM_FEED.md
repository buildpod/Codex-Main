# BuildPodFactory — NotebookLM Research Feed
**Generated:** 2026-06-07
**Purpose:** Upload this single file to NotebookLM to brief it on the full BuildPodFactory project. Use it to research tech stack options, evaluate Antigravity SDK vs Anthropic SDK, identify Phase 1 gaps, and synthesise architecture decisions before drafting Document 4.

---

## SECTION 1 — WHAT THIS PROJECT IS

BuildPodFactory is a private, local, governance-first AI software factory. Its job is to turn a human-selected product idea into a controlled output: a git repository, validation/evidence package, README, and release decision trail.

The factory is a **durable project state layer**. Apps it generates are downstream artifacts — not the purpose. The purpose is that decisions, evidence, approvals, and lessons persist across sessions, tools, and models. Conversations become disposable. State becomes durable.

**Owner:** Vineet Pathak (@buildpod). MacBook M5. Node.js, pnpm, gh CLI.

**Location:** `~/Documents/New project/BuildPodFactory`

**Primary wedge market:** Pharma/GxP compliance tooling. Vineet has 12+ years GxP/CSV/Veeva experience and a BioNTech network.

**Phase status as of 2026-06-07:**
- Phase 0 (design on paper): ✅ COMPLETE — closed 2026-05-14
- Phase 1 (tech stack selection): 🔄 IN PROGRESS — open questions closed 2026-06-07
- Phase 2 (build): ⏳ NOT STARTED
- Phase 3 (smoke test with first real product): ⏳ NOT STARTED

---

## SECTION 2 — LOCKED DECISIONS (CANNOT BE SILENTLY CHANGED)

| ID | Decision | Rationale |
|---|---|---|
| D1 | LLM engine: Anthropic SDK direct, no framework | Anthropic's own "Building Effective Agents" guide; Node.js project; ~200 lines vs importing 30,000. Vineet's governance shell IS the orchestration layer. |
| D2 | LLM strategy: pluggable adapter (Anthropic + Ollama + DeepSeek + OpenAI) | Cost optimisation; vendor independence; local Qwen 2.5 Coder 14B for dev, Claude Sonnet for ship-quality runs |
| D3 | Active agent roster: 11 agents (locked) | After QA/Security split. No new agents until these 11 are real. |
| D4 | Smoke-test product deferred until factory works | Don't pick fuel before testing the engine |
| D5 | Build approach: Phase 0 → Phase 1 → Phase 2, no skipping | V-Model GxP discipline |
| D6 | Same factory serves dial-1 through dial-10. Dial is config, not code. | Configurable strictness |
| D7 | First wedge market: pharma compliance | Vineet's BioNTech network + GxP expertise |
| D8 | Lorenz/Freyr/DocLabel-class products are 3-5 year goals | Honest scoping — not weekend smoke tests |

**Phase 1 open questions — NOW CLOSED (2026-06-07):**
- OQ1 Retention periods: 2-day POC default; captured at S0 Intake for production; fully configurable per product
- OQ2 Crypto signature standard: hash-chain only (actor string + SHA-256); upgrade path noted but not scheduled
- OQ3 JSONL evidence storage: `products/{product-id}/evidence.jsonl` — one file per product
- OQ4 5 parked v0.9 agents: absorbed — Import/Integration→Backend Agent, GxP Docs→Evidence Agent, Dependency Ledger→Security Agent, DevOps/Release→Master Moderator, Learning/Memory→Master Moderator

---

## SECTION 3 — PIPELINE (S0–S10 + 4 GATES)

All stages obey: **no source = assumption. No evidence = not done. No gate pass = no acceptance.**

```
S0  Intake              → idea record, known unknowns, initial dial
S1  Market Check        → commercial clarity score, buyer/pain/distribution review
S2  Charter             → product build charter, non-goals, success criteria
    G-Charter           ← HUMAN REQUIRED
S3  Requirements / FRS  → functional requirements, acceptance criteria, trace links
S4  Architecture        → system boundaries, data model, APIs, ADRs
    G-Architecture      ← HUMAN REQUIRED
S5  Backend Build  ⟍
                   ⟩    parallel
S6  Frontend Build ⟋
S7  QA / Security       → QA/Test Agent + Security/Compliance Agent + Decision Challenger
    G-QA                ← optional dial 1-3, encouraged dial 5, MANDATORY dial 7-10
S8  Evidence Compilation → compile hash-chained evidence package
S9  Release             → assemble release candidate
    G-Release           ← HUMAN REQUIRED
S10 Operations Handoff  → support plan, monitoring, learning proposals
```

### Master Moderator cross-cutting rules
- FIFO product queue, concurrency = 1
- Budget per task: max_steps=10, max_model_calls=6, max_wall_clock=90s
- Spend by dial: $0.50 (dial 1) → $5.00 (dial 10)
- Model routing: complex reasoning → Claude Sonnet; routine execution → Claude Haiku or DeepSeek V3; verification → fast/cheap
- Circuit breaker: 70% → warn; 85% → throttle to cheaper model; 100% → hard stop, escalate
- Failure: 1 repair attempt (different approach), then escalate. 2 consecutive failures = mandatory escalation.
- Lesson injection: max 10 lessons per prompt, 5,000 token cap

### Branch and loopback rules
- G-Charter rejected → loop to S0 or Park/Reject
- G-Architecture rejected → loop to S3 (not directly to S4 rework)
- G-QA failed → 1 repair in S5/S6; on repair failure escalate to human
- G-Release rejected → loop to S8 (evidence issue) or S9 (packaging issue) or escalate (goal-level)
- Budget exhaustion → hard stop, preserve evidence, notify human

---

## SECTION 4 — 11 AGENT ROSTER (LOCKED)

| # | Agent | Primary stage | Key authority limits |
|---|---|---|---|
| 1 | Master Moderator | Cross-cutting all stages | Cannot approve own outputs at human gates. Cannot exceed task budget without escalation. |
| 2 | Steering Committee | G-Charter, G-Architecture, G-Release support | Cannot replace human owner at required gates. Cannot modify/delete evidence records. |
| 3 | Product Market | S1 Market Check | Cannot commit engineering scope. Cannot convert weak buyer evidence into build-ready claim. |
| 4 | Product Intake | S0 Intake | Cannot approve idea for build. Cannot create product repo from intake alone. |
| 5 | Architecture | S4 Architecture | Cannot bypass G-Architecture. Cannot change security/data model without evidence. |
| 6 | Backend | S5 Backend Build | Cannot deploy to production. Cannot introduce secrets into code/logs/prompts. Also absorbs: Import/Integration, Dependency Ledger duties. |
| 7 | Frontend UX | S6 Frontend Build | Cannot change backend contracts unilaterally. Cannot claim UX readiness without workflow evidence. |
| 8 | QA / Test | S7 QA + G-QA co-sign | Cannot accept own test failures. Cannot sign G-QA without test evidence. |
| 9 | Security / Compliance | S7 QA + G-QA co-sign | Cannot waive critical findings without human approval. Cannot expose secrets. Also absorbs: Dependency Ledger duties. |
| 10 | Evidence | S8 Evidence Compilation | Cannot alter substantive evidence for another agent. Cannot suppress contradictory records. Also absorbs: GxP Documentation duties. |
| 11 | Decision Challenger | S7, high-impact decisions, gates | Cannot make final decisions. Cannot approve release. |

**Parked agents absorbed (OQ4 — closed 2026-06-07):**
- Import/Integration → Backend Agent
- GxP Documentation → Evidence Agent
- Dependency Ledger → Security/Compliance Agent
- DevOps/Release → Master Moderator
- Learning/Memory → Master Moderator

---

## SECTION 5 — EVIDENCE AND GATE POLICY

### Evidence record schema (minimum required fields)
```json
{
  "id": "ev-2026-05-14-0001",
  "timestamp": "2026-05-14T19:30:00Z",
  "agent": "Evidence",
  "stage": "G-QA",
  "task_id": "qa-gate-product-001",
  "content_hash": "<sha256-hex>",
  "prev_hash": "GENESIS",
  "model_used": "claude-sonnet-4-5",
  "tokens_in": 1200,
  "tokens_out": 400,
  "cost_usd": 0.0024,
  "source_refs": ["factory/handoff/00-factory-process-flow.md"],
  "uncertainties": [],
  "signature": "Vineet"
}
```

Optional by dial: `artifact_refs`, `test_refs`, `approval_ref`, `risk_acceptance`, `traceability_refs`, `retention_until`, `prediction`, `calibration`

### Hash chain (SHA-256)
- Genesis: `prev_hash = "GENESIS"`
- Each record: `content_hash = SHA-256(id + timestamp + agent + stage + task_id + prev_hash + model_used + tokens_in + tokens_out + cost_usd + canonical(source_refs) + canonical(uncertainties) + ...)`
- Verifier fits in ~50 lines of Node.js

### Signature standard (OQ2 — locked)
- Phase 2 implementation: hash-chain only — actor string + SHA-256 chain
- Upgrade path to HMAC or Ed25519 noted but not scheduled

### Evidence storage (OQ3 — locked)
- Layout: `products/{product-id}/evidence.jsonl`
- One append-only JSONL file per product
- Hash chain provides ordering

### Retention (OQ1 — locked)
- POC default: 2 days, then auto-cleanup
- Production: retention period captured at S0 Intake as a named field
- Configurable per product; factory prompts for it on dial-4+ products

### Gate approval record fields
`id`, `gate`, `approver`, `approver_role`, `timestamp`, `decision`, `evidence_reviewed`, `risks_accepted`, `rationale`, `signature`, `revoked_by`, `revoked_at`, `revocation_reason`

### Dial table
| Dial | Evidence package | Hash chain | G-QA human? | Max spend/task |
|---|---|---|---|---|
| 1 | Schema + README + ledger dump | Optional | Optional | $0.50 |
| 3 | + Charter, arch summary, QA report | Recommended | Optional | $1.00 |
| 5 | + Test results, change log, dep list | Enforced for stage/gate records | Encouraged | $2.00 |
| 7 | + Risk assessment, security review, signed approvals | Enforced for all accepted records | Mandatory | $3.50 |
| 10 | + Validation pack, traceability matrix, hash-chain proof, regulatory mapping | Enforced + release must include verification proof | Mandatory | $5.00 |

---

## SECTION 6 — TECH STACK (CURRENT + PLANNED)

### Currently implemented (Phase 0 prototype)
- Runtime: Node.js ES modules
- Package manager: pnpm
- Servers: Node `http` module (no Express)
- Frontend (Jarvis): plain HTML, CSS, browser JavaScript
- State: local JSON and Markdown files
- Evidence/design docs: Markdown + JSON
- Jarvis runs on `127.0.0.1:4173`
- PlayPatch Kids prototype runs on `127.0.0.1:4273`

### AntiGravity V2 prototype (in `~/Documents/New project/AntiGravity/BuildPodV2AntiGravity`)
A second exploratory implementation was started. Key findings:
- Uses Vercel AI SDK (`@ai-sdk/openai`) for LLM calls
- Uses Node.js built-in SQLite (Node 22+) for evidence storage instead of JSONL
- Has a working `db.js` with hash-chained evidence records
- Has a working `moderator.js` with a 3-agent factory loop (Intake → Drafting Agent → Compliance Agent → Human Gate)
- Stack includes Svelte, Zod, React (multiple UI frameworks explored)
- This is a proof-of-concept, not the approved design — but the db.js hash-chain implementation is directly reusable

### Planned for Phase 2 (from D1/D2, now extended)
- LLM Adapter: pluggable — Anthropic SDK + Ollama + DeepSeek + OpenAI + **Antigravity SDK** (new, added 2026-06-07)
- Evidence ledger: JSONL append-only, hash-chained (OQ3 locked)
- Orchestration state: SQLite WAL mode (from V2 exploration — safer than JSON files for concurrent agent writes)
- Local UI: Jarvis — decision pending (plain HTML vs upgrade)
- Pre-run prediction module: internal build in Phase 2 (tokencostscope deferred — see below)

---

## SECTION 7 — TOOL ECOSYSTEM (ROLES — DECIDED 2026-06-07)

### OpenAI Codex — PRIMARY BUILDER (main worker)
- Codex is the primary execution engine for BuildPodFactory. It did all the Phase 0 document drafting (T2, T3, T4 tasks) and will do the Phase 2 build work.
- Receives working prompts/packages from Claude (architect) and executes them: writes code, generates documents, creates PRs, runs checks.
- **Factory role:** S5 Backend build, S6 Frontend build, document generation, ticket execution. The engine that turns approved specs into committed artifacts.
- **Key constraint:** Codex works best with well-scoped, self-contained working prompt packages (as used in Phase 0). Prompt packages must include: task spec, source files, acceptance criteria, and evidence obligations.
- **Evidence note:** Codex outputs must be wrapped in evidence records by the Master Moderator before acceptance. Codex does not self-approve its own work.

### Google Antigravity 2.0 (launched Google I/O May 2026)
- Agent-first development platform. Multiple AI agents plan architecture, write code, test live in browser, fix errors, deploy.
- Launched with: desktop app, CLI, SDK, Managed Agents via Gemini API, enterprise tier.
- Pricing: $100/month AI Ultra (5x higher limits)
- **Factory role:** Extended hands for agentic testing, browser-based verification, and deployment steps (S9). Potential 5th adapter target for D2 (pluggable LLM adapter). Supplement to Codex for tasks requiring live browser interaction.
- **Key research question:** What does Antigravity SDK support vs. what the factory's Master Moderator requires (budget enforcement, evidence writing, circuit breaker, file locks, job graph)?

### Google NotebookLM
- Research and synthesis. Upload docs, query across them.
- **Factory role:** Phase 1 research — feed factory docs in, query for gaps before drafting Doc 4. Zero cost for research that doesn't need code generation.

### Banana Code (bananacode.ai)
- Mobile AI coding agent. Pick GitHub repo, describe change in plain English, get a PR from phone.
- Pricing: $5/month, bring your own API key.
- **Factory role:** Small patches and maintenance PRs when away from Mac. Not for architecture or gate decisions.

### Claude (Anthropic) — architect and gatekeeper
- Expensive (per token). Reserve for: architecture decisions, Doc drafting, gate approvals, complex reasoning requiring full Phase 0 context in memory.
- Also acts as the human-facing interface — asks questions, presents options, records decisions.

### Tool split by task
| Task type | Primary tool | Why |
|---|---|---|
| Code generation, document drafting, PRs | **Codex** | Main builder — flat prompt-package model, no per-token conversation cost |
| Research, synthesis, doc analysis | **NotebookLM** | Free, no LLM cost, great for querying large doc sets |
| Agentic testing, browser verification, deploy | **Antigravity 2.0** | Live browser + agent loop, flat monthly cost |
| Quick mobile PRs, hotfixes on the go | **Banana Code** | $5/mo, phone-friendly |
| Architecture, gates, Doc drafting, locked decisions | **Claude** | Full Phase 0 context, reasoning, complex synthesis |

### How Codex and Claude work together (the Phase 0 pattern)
1. Claude designs + decides (architecture session, questions, locked decisions)
2. Claude packages a working prompt (scoped task spec + source docs + acceptance criteria)
3. Codex executes (writes code/docs, runs checks, creates commit/PR)
4. Claude reviews output at gate (evidence check, accept/revise/escalate)
5. Human approves at required gates (G-Charter, G-Architecture, G-QA, G-Release)

---

## SECTION 8 — DOCUMENT 4 (TECH STACK DECISION RECORD) — TO BE DRAFTED

This is the first Phase 1 deliverable. It must lock:

1. **LLM Adapter** — Anthropic SDK direct (D1) confirmed, but now evaluate: does Antigravity SDK change D1? Options: (a) Anthropic SDK as primary + Antigravity as an adapter; (b) Vercel AI SDK as the unified adapter layer (already used in V2 prototype); (c) Build raw adapters per D1 original.

2. **Evidence storage** — JSONL per OQ3, but V2 prototype used SQLite. Does SQLite WAL mode solve the concurrent-write problem better than JSONL? Trade-offs to evaluate.

3. **Orchestration state persistence** — How does Master Moderator persist job graph, file locks, budgets across sessions? Options: (a) JSON files (current Jarvis); (b) SQLite WAL (V2 prototype); (c) In-memory + JSONL checkpoint.

4. **Local UI (Jarvis)** — Keep plain HTML/CSS/JS or upgrade to Svelte (already in V2 node_modules)?

5. **Hash-chain implementation** — V2 db.js has a working Node 22+ built-in SQLite implementation. Reuse it or rewrite for JSONL?

6. **Antigravity SDK evaluation** — Is it a viable adapter for build-agent (S5/S6) work, or is it too opinionated for factory integration?

---

## SECTION 9 — RESEARCH QUESTIONS FOR NOTEBOOKLM

Use these prompts when querying this document in NotebookLM:

1. "What are the gaps between what the Master Moderator requires (budget enforcement, circuit breaker, file locks, evidence writing) and what a typical agent SDK like Antigravity or Vercel AI SDK provides out of the box?"

2. "Compare SQLite WAL mode vs append-only JSONL for the factory evidence ledger. Which fits better given: hash-chain integrity, concurrent agent writes, 2-day POC retention, single-product-at-a-time constraint?"

3. "What does Document 4 (Tech Stack Decision Record) need to cover based on the Phase 1 open questions, Phase 0 locked decisions, and the new tools (Antigravity, NotebookLM, Banana)?"

4. "Which of the 11 agents are candidates for Antigravity SDK execution vs. Anthropic SDK, and why?"

5. "What is the minimal factory loop (smallest end-to-end path from S0 to G-Release) and what is the minimum viable tech stack to implement it?"

6. "What is the Vercel AI SDK and how does it compare to raw Anthropic SDK for a multi-provider LLM adapter? What does it add and what does it cost in abstraction overhead?"

7. "The factory has a 'fast-track policy' mentioned for non-regulated/prototype components. What should it cover and how does it interact with the dial system?"

---

## SECTION 10 — FILES TO READ FOR DEEPER CONTEXT

If you have access to these files, also upload them:
- `factory/handoff/master-orchestration.md` — project entry point
- `factory/handoff/00-factory-process-flow.md` — full S0-S10 spec
- `factory/handoff/00-agent-role-cards.md` — 11 agent role cards
- `factory/handoff/00-evidence-and-gate-policy.md` — evidence schema + hash chain
- `factory/handoff/2026-05-13-conversation-handoff.md` — session decisions log
- `factory/handoff/p1-t0-tokencostscope-evaluation.md` — tokencostscope DEFER decision
- `factory/handoff/p1-t0-steering-committee.md` — Steering Committee operational details
- `AntiGravity/BuildPodV2AntiGravity/engine/db.js` — working hash-chain SQLite implementation
- `AntiGravity/BuildPodV2AntiGravity/engine/moderator.js` — working 3-agent factory loop

---

## SECTION 11 — KNOWN GAPS AND HONEST STATE

- The real factory engine is designed but NOT built. Jarvis and PlayPatch are prototypes only.
- No real product has run through the S0-S10 pipeline yet.
- The V2 AntiGravity prototype has a working hash-chain and a 3-agent loop, but it is exploratory — not the approved design.
- Antigravity SDK was announced May 2026 — no production evaluation against factory requirements has been done yet.
- Fast-track policy (lower-friction loop for prototypes) is mentioned in V2 context but not formally designed.
- Jarvis UI has not been decided (plain HTML vs Svelte upgrade).
- Pre-run prediction module is deferred to Phase 2, after LLM adapter is functional with 2+ providers.

---

**End of NotebookLM feed. Version: 2026-06-07-v1.**
