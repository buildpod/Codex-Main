# BuildPodFactory — Conversation Handoff
**Date:** 2026-05-13
**Purpose:** Capture the conclusions of a long working session so the next conversation can start at the right point without re-litigating decisions.

---

## 1. The reframe (most important thing on this page)

**The factory's real job is NOT "generate apps from prompts."**

The factory's real job is to be a **durable project memory and state layer** — a system where:
- Project state persists across conversations, sessions, tools, and models
- Decisions, evidence, approvals, and lessons are captured once and reused forever
- Conversations become disposable; state becomes durable
- Apps are downstream artifacts produced by the state layer, not the point of it

This solves a problem Vineet hit directly during the conversation that produced this document: LLM conversations run out of context, state is lost, decisions get re-litigated. The factory makes that problem disappear by externalizing state.

**App generation is one downstream use of this state layer. Not the primary purpose.**

---

## 2. Decisions made in this session (locked in)

| # | Decision | Reasoning |
|---|---|---|
| D1 | **Engine: Anthropic SDK direct, no framework** | Anthropic's own published guidance ("Building Effective Agents") says start with the SDK. Existing Jarvis is Node; frameworks are Python (cross-language complexity). Vineet's governance shell IS the orchestration layer — no need for a second one. ~200 lines of code instead of importing 30,000. |
| D2 | **LLM strategy: pluggable adapter, dual-mode by default** | Local Qwen 2.5 Coder 14B (Ollama, free) for dev iterations + Claude Sonnet 4.5 for ship-quality runs. Adapter pattern lets DeepSeek V3 ($0.14/$0.28 per M tokens), Kimi K2, and OpenAI slot in. Token cost matters. Provider abstraction is non-negotiable. |
| D3 | **No new agent roles added until existing 10 are real** | Current factory has 10 agent roles defined as JavaScript catalog entries with state strings. They are not yet real LLM agents. Make them real before defining an 11th. |
| D4 | **Smoke-test product is DEFERRED, not decided** | Don't burn tokens debating products before the factory can run one. Pick the smoke-test product *after* the factory is functional, not before. The factory either works or it doesn't — the test fuel is independent of the engine design. |
| D5 | **Build approach: Phase 0 design before Phase 1 stack before Phase 2 build** | Vineet correctly enforced GxP/CSV sequencing on the project itself. No code, no Codex prompts, no tool installs until process design is documented and signed off. S3 (FRS) before S4 (architecture) before S5 (build). |
| D6 | **"Principles never change, evidence intensity changes"** | The same factory serves a GxP-validated pharma submission tool (dial-10) and a hobby project (dial-1). The dial configures gate strictness, evidence integrity, and approval requirements. The thesis is universal; the wedge customer is not. |
| D7 | **First-wedge customer: pharma compliance (deferred but locked)** | Vineet's unique edge: 12+ years GxP/CSV/Veeva, BioNTech network, native understanding of pharma evidence requirements. Pharma compliance is a "machine-rule" market (explicit, published rules), which favors AI-native architecture. Other industries (fintech, dev SaaS) come later. |
| D8 | **Lorenz/Freyr/DocLabel are 3-5 year products, not weekend smoke tests** | The 10k-lines-vs-500-lines intuition is correct for UI/code. It is NOT correct for accumulated regulatory rule databases, validation evidence, customer trust, and compliance certifications. Smoke tests stay scoped to "real but bounded." |

---

## 3. Phase 0 — what comes next (NOT yet started)

**Phase 0 = process design on paper, before tools.**

### Phase 0 deliverables (3 documents)

1. `00-factory-process-flow.md` — end-to-end pipeline, every step, every gate, every artifact
2. `00-agent-role-card.md` (one per agent, 10 total) — mission, trigger, input, output, gate, failure modes
3. `00-evidence-and-gate-policy.md` — evidence schema, hash-chain spec, gate types, intensity dial 1–10, approval signers

### Six gaps Vineet needs to answer (or delegate to "figure it out from existing files")

1. **Industry scope of the factory's process** — pharma-hardwired, or general with dial-based configuration? *(Likely: general with dial.)*
2. **Human-in-the-loop policy** — where is human approval required, optional, forbidden?
3. **Failure semantics** — when an agent fails, default to retry / repair / escalate?
4. **Product output format** — what does a "finished product" look like? Git repo only? Plus validation pack? Plus deployment script?
5. **Parallelism** — one product at a time, or multiple in parallel?
6. **Memory and learning loop** — how does the factory use past lessons (existing `learning-ledger.json` + 14 interview records) in future runs?

### How Phase 0 will be produced

- Drafted by: assistant (Claude), mining Vineet's existing 87 governance files + answers to the six gaps
- Reviewed by: Vineet
- Iterated: until Vineet can describe the factory to an auditor from memory with no gaps
- Codex's role in Phase 0: small — only generates folder structure and stub files matching the approved design (no logic)

### Phase 0 timing
**No fixed deadline.** Vineet is carrying significant cognitive load (BioNTech day job, Noopur's job search, two young kids). Phase 0 done correctly > Phase 0 done quickly.

---

## 4. What was installed / agreed during this session

- **Karpathy CLAUDE.md** installed (file saved to Vineet's downloads). The four principles (Think Before Coding, Simplicity First, Surgical Changes, Goal-Driven Execution) apply to this project from now on, including life-scale decisions about scope.
- **Reading list (Tier 1) before framework decisions:**
  - MetaGPT paper — arxiv 2308.00352
  - ChatDev paper — arxiv 2307.07924
  - Anthropic "Building Effective Agents" — anthropic.com/research/building-effective-agents

Vineet hasn't read these yet. Not blocking — Phase 0 doesn't require them. But the framework decision (D1) was made with confidence partly because Anthropic's guidance independently supports it.

---

## 5. Things flagged for honesty (do not lose)

These are observations the assistant made during the session that should persist into future conversations.

### On revenue ambition
The "₹100 cr in 6-12 months" target is not realistic given Vineet's current state (side-project, evenings, no product shipped, no paying customers, demanding day job, young family). Realistic 12-month target: €30K–€150K revenue, 10–30 paying customers, 2–3 pilot conversations. €1M ARR is a year 2–3 outcome. €10M ARR is a year 5–7 outcome. **This is not negative — it is the trajectory that actually compounds to ₹100 cr by year 5–7 if executed well.** Don't let future-Claude or future-Vineet rewrite this.

### On the buyer conversation
Vineet has shown PharmaPM Pro to at least one real pharma buyer. **The details of that conversation are the most valuable asset in this project and were never captured.** Next conversation should explicitly ask Vineet to write them down: who, role, exact words, body language, did they ask "how much" or "when can I try it" or offer introductions. This is unfinished business.

### On the conversation pattern
Across this session, every time the conversation approached a small concrete buildable thing (PharmaPM Pro, the smoke test, Phase 0), the scope expanded (₹100 cr factory, Lorenz clone, autism apps, resume builder, AGI Jarvis). This is the classic side-project founder loop: hard parts trigger new ideas. The Karpathy file Vineet installed explicitly addresses this: *"if something is unclear, stop. Name what's confusing. Ask."* Future conversations should name the loop when it appears, gently, without shame.

### On rest and family
The conversation ran long. Vineet was carrying a lot. Future conversations should accept "I'm tired, let's resume later" as a valid move at any point, not push for closure.

### On format preference
Vineet prefers **button-option questions** over free-text questions. Mobile-friendly, lower cognitive load. Future conversations should default to `ask_user_input_v0` style questions whenever a discrete choice is being made. Free-text only when genuinely needed (e.g. capturing the buyer-conversation details).

---

## 6. Starter prompt for the next conversation

Paste the block below into a fresh conversation. It will restore working state.

```
Hi Claude. We had a long working session on 2026-05-13 about my BuildPodFactory
project. I have the handoff document. Key context:

1. The factory's real job is durable project memory + state layer. App
   generation is a downstream artifact, not the purpose.

2. We are at Phase 0 — process design on paper, BEFORE picking tools or
   writing code. Three documents to produce: factory-process-flow,
   agent-role-cards, evidence-and-gate-policy.

3. Decisions locked in: Anthropic SDK direct (no framework), pluggable
   LLM adapter (Qwen local + Claude Sonnet + DeepSeek etc.), pharma
   compliance as first-wedge market, no new agent roles until the
   existing 10 are real, smoke-test product deferred until factory works.

4. I prefer button-option questions over free text. Use ask_user_input_v0
   format whenever there's a discrete choice.

5. I have 87 existing governance files in factory/* that should be
   mined as input, not ignored. Some will be kept, some rewritten,
   some archived.

6. Six gaps to close before drafting Phase 0 documents — listed in the
   handoff doc. Ask me about them one at a time, with options.

Please load the handoff document attached/referenced, and start by
asking me about Gap 1 (industry scope of the factory's process —
pharma-hardwired or general-with-dial).

Don't propose new agents, new products, or new scope. Don't try to
finish Phase 0 in one session. Don't push timelines. Phase 0 is done
when it's done.
```

---

## 7. Open loops that the next conversation should NOT forget

- [ ] Vineet to capture details of the buyer conversation (who, what they said, what they asked)
- [ ] Six Phase 0 gaps to be answered one at a time
- [ ] Tier 1 reading (MetaGPT, ChatDev, Anthropic guide) — optional but useful
- [ ] After Phase 0 documents are signed off, revisit whether existing frameworks (CrewAI, MetaGPT) already implement enough that custom build isn't needed — Phase 0 may make this question moot one way or the other
- [ ] Hash-chained evidence ledger — known gap in current factory, will be addressed in Phase 0 evidence-and-gate-policy doc and implemented in Phase 2
- [ ] Once factory has one real LLM agent working (replacing the deterministic dry-run), force one real product through it end-to-end. Smoke-test product TBD.
- [ ] Noopur's job search and family bandwidth are real constraints. Project pace must accommodate them.

---

## 8. What was NOT decided (open questions, deferred deliberately)

- Which specific product the factory builds first (deferred to after Phase 0)
- Whether to seek funding (deferred — not relevant until factory works and first revenue is in)
- Whether to go full-time on this (deferred — not relevant until traction justifies it)
- Whether to pursue the autism support app for Indian families in Germany (parked to "Year 3" — only after pharma revenue exists; if built, built as a non-revenue mission project)
- Whether to do anything with the SoloPilot / Full Volume / MathMind / StoryCards / BuildPod-agent side projects (parked; do not add to active list)
- Whether to build Lorenz/Freyr/DocLabel-class products (parked; these are year 2–5 products if factory + first wedge succeed)

---

**End of handoff document.**

*The factory's first job, recursively, was to capture its own design intake. This document is that intake. Treat it as the first piece of evidence in the project's ledger.*
