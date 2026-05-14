# Phase 0 Gap Answers
**Date:** 2026-05-14
**Owner:** Vineet
**Status:** Locked in for T2 (drafting Phase 0 Document 1)
**Source:** Working session 2026-05-13 to 2026-05-14, decisions captured in `2026-05-13-conversation-handoff.md`

This file answers the six open gaps identified in the conversation handoff document, Section 3. These answers are the input to T2 (drafting `00-factory-process-flow.md`). They are also the basis for T3 (agent role cards) and T4 (evidence and gate policy).

If any answer here conflicts with later design decisions, this file is the prior version of the truth and the change must be recorded in a changelog, not silently overwritten.

---

## Gap 1 — Industry scope of the factory's process

**Question asked:** Is the factory's process pharma-hardwired, or general with dial-based configuration?

**Reframing accepted:** The question was poorly framed. Vineet's clearer framing is recorded here.

**Answer:**
The factory builds **software products, tools, and systems via SDLC**. Industry context (e.g., "this is a GxP-regulated product" vs. "this is a hobby project") is an **input parameter** declared at product intake, not a baked-in characteristic of the factory itself.

The factory has one SDLC process. The intake declares the regulatory context. Gates, evidence intensity, and approval requirements adjust based on that declaration via the evidence intensity dial (Gap 6 of the original handoff doc; see also `00-evidence-and-gate-policy.md` once drafted).

**Implications for Document 1:**
- The process flow is described once, generically
- Each stage notes "what changes at higher dial settings" rather than having separate flows per industry
- Product intake explicitly captures: industry classification, regulatory framework applicable (GxP / SOC2 / HIPAA / none), and evidence intensity dial setting

---

## Gap 2 — Human-in-the-loop policy

**Answer:**
Human approval is **required** at three gates:
- **Charter gate** (after intake, before architecture begins)
- **Architecture gate** (after architecture design, before build begins)
- **Release gate** (after QA, before final artifact is published)

Human approval is **optional** at:
- **QA gate** (agent-only approval acceptable at lower dial settings; human review encouraged at higher dial settings)

Human approval is **forbidden nowhere** — a human can intervene at any gate if they choose to.

**Rationale:**
- Charter sets the goal. OWASP ASI01 (Agent Goal Hijack) explicitly requires human-in-the-loop for goal changes [^owasp-agentic].
- Architecture is the most expensive thing to undo. Catch errors here, not after build.
- Release is the "this goes out the door" moment. Always human.
- QA is mechanical at lower dial settings; at higher dial settings (GxP, SOC2), human QA review becomes mandatory via the dial.

**Implications for Document 1:**
- Three named human gates: G-Charter, G-Architecture, G-Release
- Each gate has a named approver field in evidence records
- QA gate referenced as G-QA with conditional human requirement

---

## Gap 3 — Failure semantics default

**Answer:**
The **Master Moderator agent** owns budget enforcement and failure handling for every task. It enforces multi-dimensional budget limits per task and circuit-breaker behavior.

### Per-task budget defaults

| Limit | Default value | Configurable by dial? |
|---|---|---|
| `max_steps` | 10 | Yes — lower dial reduces, higher dial may increase for complex GxP tasks |
| `max_model_calls` | 6 | Yes |
| `max_spend_usd` | dial-1: $0.50, dial-3: $1.00, dial-5: $2.00, dial-7: $3.50, dial-10: $5.00 | Yes (by dial) |
| `max_wall_clock_seconds` | 90 for synchronous; longer for batch jobs | Yes |
| `max_context_tokens` | 100,000 | Yes |

### Circuit-breaker behavior

- **70% of any budget:** log warning, continue
- **85% of any budget:** throttle — Master Moderator downgrades subsequent calls to cheaper model (e.g., Sonnet → Haiku → DeepSeek V3 → Qwen local)
- **100% of any budget:** hard stop, pause task, escalate to human, record blocker in evidence ledger

### Failure handling

- **On agent failure (output doesn't meet acceptance criteria):**
  - Master Moderator triggers **1 repair attempt** using a *different approach* (different prompt structure, different model, or different agent — never just retry the same thing)
  - On repair failure: escalate to human; no further automated attempts on this task without human approval
- **Global hard cap:** never more than 3 LLM calls per failure event before human checkpoint
- **No loops permitted:** if the Master Moderator detects two consecutive failures from the same agent on the same task, escalation is mandatory regardless of remaining budget

### Model routing

- **Planning / orchestration / complex reasoning:** high_reasoning model (Claude Sonnet 4.5 default)
- **Routine execution / generation:** fast_cheap model (Claude Haiku 4.5 or DeepSeek V3)
- **Verification / QA / linting:** fast_cheap model

The Master Moderator selects model per call, not per task. Routing decisions are logged.

### Sources

[^icmd-2026]: ICMD, *The 2026 Playbook for Agentic AI Ops: Guardrails, Costs, and Reliability at Scale*, 2026-04. URL: https://icmd.app/article/the-2026-playbook-for-agentic-ai-ops-guardrails-costs-and-reliability-at-scale-1776661990431. Source for max_steps/max_model_calls/max_spend_usd config pattern and tiered model routing.

[^owasp-llm-top10]: OWASP Top 10 for LLM Applications 2025, **LLM10: Unbounded Consumption** and **LLM06: Excessive Agency**. URL: https://genai.owasp.org/llm-top-10/. Source for circuit-breaker pattern, layered defenses, least-privilege design.

[^owasp-agentic]: OWASP Agentic Top 10 2026, **ASI01: Agent Goal Hijack**. URL: https://blog.alexewerlof.com/p/owasp-top-10-ai-llm-agents. Source for "human-in-the-loop required for goal changes."

[^oracle-budget]: Oracle, *Runtime Budget Guardrails for Agentic AI*, 2026-04. URL: https://blogs.oracle.com/ai-and-datascience/runtime-budget-guardrails-agentic-ai. Source for throttle / pause / kill circuit-breaker semantics.

[^authority-partners]: Authority Partners, *AI Agent Guardrails: Production Guide for 2026*, 2026-03. URL: https://authoritypartners.com/insights/ai-agent-guardrails-production-guide-for-2026/. Source for layered guardrails and accuracy-first sequencing.

### Implications for Document 1

- The Master Moderator agent must be present in every stage of the process flow as the budget enforcer, not just a starting orchestrator
- Each stage has its own per-stage sub-budget (sum of which ≤ task budget)
- The evidence record schema (Document 3) must include: budget consumed per call, model used per call, repair attempts, escalations

---

## Gap 4 — Product output format

**Answer:**
Every product produced by the factory outputs **three artifacts**:

1. **Git repository** — the working code or content
2. **Validation evidence package** — the audit trail (contents scale with dial)
3. **README.md** — what it is, how to use it, who built it, when

### Evidence package contents by dial

| Dial | Evidence package contents |
|---|---|
| 1 | Evidence ledger dump (JSON), README only |
| 3 | + Charter, architecture summary, QA report |
| 5 | + Test results, change log, dependency list |
| 7 | + Risk assessment, security review, signed approvals |
| 10 | + IQ/OQ/PQ-style validation pack, full traceability matrix, immutable hash-chain proof, named approver signatures, regulatory framework mapping |

The structure is the same. The contents scale.

### Implications for Document 1

- "Release" stage produces these three artifacts as the formal output
- The validation evidence package is itself an artifact of the factory, generated by the Evidence Agent
- Product README is generated, not hand-written, and references the evidence package

---

## Gap 5 — Parallelism

**Answer:**
**One product at a time.** Phase 0 is designed for single-product execution.

Parallel product execution may be added later (Phase 3+), but is explicitly out of scope for the initial design. The current factory runs one product through the pipeline to completion before accepting the next.

### Rationale

- Simpler Phase 0 design
- Easier to debug, easier to audit
- Resource contention (LLM tokens, file system locks, evidence ledger writes) avoided
- Vineet's bandwidth as approver at three gates is the actual bottleneck, not factory throughput

### Implications for Document 1

- Process flow is linear, not concurrent
- Job queue exists but is FIFO with concurrency=1
- Future parallelism is noted as out-of-scope but architecturally possible (orchestrator state per job, not global)

---

## Gap 6 — Memory and learning loop

**Answer:**
Lessons from past runs are **automatically injected into agent prompts** at prompt-build time, subject to these guardrails:

### Storage model

- Canonical store: `factory/learning/learning-ledger.json` (already exists)
- Each lesson has: `id`, `created_at`, `created_in_run_id`, `tags` (agent + phase + product type), `expiry_date` (optional), `active` (boolean), `severity` (info / warn / blocker), `content` (max 500 chars)

### Injection at prompt build time

- At every agent call, the Master Moderator queries the learning ledger for lessons matching the calling agent's tags AND the current phase
- Filter rules:
  - `active = true`
  - `expiry_date > today` (or null)
  - Max 10 lessons injected per prompt
  - If more than 10 match, take the 10 with most recent `created_at`
  - Total injected lesson token budget: 5,000 tokens hard cap

### Lessons hygiene

- Quarterly human review of the learning ledger
- During review: archive obsolete lessons (set `active = false`, log reason), update expirations, merge duplicates
- Review is a Vineet task; recorded as evidence

### Implications for Document 1

- The "lesson injection" step is part of every agent invocation, not a separate stage
- Agent prompts have a clearly delineated "lessons from prior runs" section, never mixed with system prompt or task input
- The Evidence Agent is responsible for proposing new lessons after each completed task; Vineet approves them into the ledger

---

## Cross-cutting decisions reaffirmed from the handoff doc

For Codex's reference while drafting Document 1, these decisions from the 2026-05-13 handoff are in force and should not be re-litigated:

- **D1:** Engine is Anthropic SDK direct, no framework. The factory orchestrator is Node.js.
- **D2:** LLM strategy is pluggable adapter. Anthropic + Ollama + DeepSeek + OpenAI as candidate providers.
- **D3 (amended 2026-05-14):** Active agent roles are kept to the
  11-agent set used in Doc 1 v3 and Doc 2 (T3). The split of
  QA/Security into QA / Test Agent and Security / Compliance Agent
  was approved on 2026-05-14 based on v0.9 §16 separation; this
  supersedes the earlier "no new agents beyond 10" statement.
  Additional agents present in v0.9 §16 (Import / Integration,
  GxP Documentation / Validation, Dependency Ledger, DevOps / Release,
  Learning / Memory) remain parked as future scope, not active in
  Phase 0.
- **D4:** Smoke-test product is deferred. Phase 0 does not select one.
- **D5:** Build approach is Phase 0 → Phase 1 → Phase 2. No skipping.
- **D6:** Same factory serves dial-1 through dial-10. Dial is config, not code.
- **D7:** First wedge market is pharma compliance, but the factory itself is industry-agnostic (per Gap 1 reframing).
- **D8:** Lorenz/Freyr/DocLabel-class products are 3–5 year goals, not weekend smoke tests.

---

## Approval

This file represents Vineet's answers to the six Phase 0 gaps as of 2026-05-14. T2 may proceed with these answers as input. Future changes to these answers must be recorded as new versions of this file with a changelog, not silent overwrites.

**Status:** READY FOR T2
**Approved by:** Vineet (implicit by use as T2 input; explicit signature optional)
**Date:** 2026-05-14
