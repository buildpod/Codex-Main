# Tokencostscope Evaluation
**Status:** Filed 2026-05-14. Resolves Doc 1 §6 UNCERTAIN about pre-run prediction component.
**Verdict:** DEFER. Borrow algorithm; do not install dependency.

## What tokencostscope is

`github.com/krulewis/tokencostscope` (formerly `tokencast`). MIT license. Solo developer.

A Claude Code skill (not a library) that estimates token and dollar costs for planned agent tasks before execution and self-calibrates from actuals.

### Mechanism

- Installs as `.claude/skills/tokencostscope/` plus a Stop hook and a PostToolUse hook
- Infers task size (S/M/L), file count, and complexity from conversation context
- Decomposes pipeline into stages (research, architect, implement, test, qa, PR review loop)
- Looks up per-stage model pricing from `references/pricing.md`
- Produces Optimistic / Expected / Pessimistic cost bands
- At session end, the Stop hook captures actual token usage from the session JSONL and updates a calibration history

### Calibration algorithm

- Sessions 1-2: no correction applied
- Sessions 3-10: global correction factor via trimmed mean of (actual / expected) ratios, trim fraction 0.1
- Sessions 10+: exponentially weighted moving average with recency weighting
- Outlier filter: ratios outside [0.2, 3.0] excluded
- Per-size-class factors activated after 3+ samples per class

This algorithm is the genuinely interesting contribution. It is published and reproducible.

## Gap analysis vs factory needs

| Factory need | Tokencostscope status |
|---|---|
| Pre-execution cost estimation | Has it |
| Anthropic model coverage | Has it |
| Ollama / local model coverage | Missing |
| DeepSeek coverage | Missing |
| OpenAI coverage | Missing |
| Wall-clock time prediction | Missing — cost only |
| Integration with factory evidence ledger | Missing — uses its own JSONL |
| Pipeline mapping to S0-S10 (Doc 1) | Missing — generic pipeline names |
| Operates outside Claude Code | Missing — Claude Code-only |
| Auto-calibration from actuals | Has it |

## Operational risk

- Pre-alpha software, 0 GitHub stars at evaluation time
- Solo developer, no organisational backing
- Renamed once already (tokencast -> tokencostscope), indicating early-stage churn
- No published roadmap or release cadence

For a factory designed for regulated industries with multi-year audit trails, depending on a pre-alpha solo project for a core pre-run prediction capability is not acceptable.

## Alternative considered: AgentOps-AI/tokencost

- ~1,932 GitHub stars, MIT licence, actively maintained
- Python library for accurate cost calculation given a known prompt and completion
- Different category: post-hoc cost math, not pre-execution prediction
- Useful as a pricing table source, not as a replacement

## Decision

**DEFER tokencostscope as a direct dependency. Build an internal pre-run prediction module in Phase 2.**

The internal module will:

1. Use `tokencost` (AgentOps-AI) pricing table as the primary source of model pricing, or maintain a small internal pricing table updated from the same data. Initial implementation: internal table in Node, ~50 lines, refreshed periodically.

2. Implement the tokencostscope calibration algorithm (trimmed mean for 3-10 sessions, EWMA after 10) in approximately 150 lines of Node. The algorithm is published and reproducible.

3. Cover all four planned providers (Anthropic, DeepSeek, Ollama, OpenAI) via the existing LLM Adapter abstraction.

4. Write predictions into the factory's hash-chained evidence ledger using the optional `prediction` field defined in Doc 3 §2. Capture actuals via the Master Moderator's existing budget enforcement hooks (Doc 1 §3) and update calibration via a quarterly review job aligned with Gap 6.

5. Predict not only cost in USD but also tokens (input / output / total) and wall-clock seconds, since Doc 1 §3 budget enforcement covers all three dimensions.

## Sequencing

- Phase 1 Doc 4 (Tech Stack Decision Record): records this decision as locked
- Phase 1 Doc 6 (Phase 2 Build Plan): adds prediction module to the build backlog, low priority initially
- Phase 2 sprint: implement the module after the LLM Adapter is functional with two or more providers. The module depends on the adapter, not vice versa.
- Phase 2 verification: backfill 10+ historical runs into the calibration history to validate the algorithm in your context before relying on it for budget enforcement.

## What is NOT done in Phase 1

- No installation of tokencostscope
- No fork of tokencostscope
- No dependency on a Claude Code skill
- No new agent role for prediction (the module is internal to the LLM Adapter / Master Moderator)

## Revisit conditions

This decision is revisited if:

- Tokencostscope gains substantial maintainer base and multi-provider support
- The factory exceeds 100 runs and the internal calibration algorithm shows accuracy below 80% of Expected band
- A clearly superior third-party alternative emerges that handles multi-provider + wall-clock + evidence ledger integration

Otherwise, no further evaluation needed.
