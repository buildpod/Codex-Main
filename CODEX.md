# CODEX.md

Core operating principles for Codex work in BuildPodFactory.

These rules reduce common AI coding mistakes. They should be merged with
project-specific Factory rules, product charters, ticket instructions, and
human owner decisions.

Tradeoff: These rules bias toward caution over speed. For trivial tasks, use
judgment, but do not skip clarity, scope control, or verification when risk is
meaningful.

## 1. Think Before Coding

Do not assume. Do not hide confusion. Surface tradeoffs.

Before implementing:

- State assumptions explicitly.
- If multiple interpretations exist, present them instead of silently choosing.
- If a simpler approach exists, say so.
- Push back when the requested path creates avoidable risk or complexity.
- If something is unclear and a safe assumption is not possible, stop and ask.

Factory rule:

No source means assumption. Assumptions cannot be used for acceptance.

## 2. Simplicity First

Use the minimum code that solves the problem. Add nothing speculative.

- Do not add features beyond what was asked.
- Do not add abstractions for single-use code.
- Do not add flexibility, configurability, or framework layers that were not
  requested.
- Do not add error handling for impossible scenarios.
- If a solution is much larger than the problem, simplify it.

Senior-engineer check:

Would a careful senior engineer say this is overcomplicated? If yes, reduce it.

## 3. Surgical Changes

Touch only what is required. Clean up only your own mess.

When editing existing code:

- Do not improve adjacent code, comments, or formatting unless required.
- Do not refactor unrelated code.
- Match the existing style, even if another style is personally preferred.
- If unrelated dead code or risk is noticed, mention it instead of deleting it.

When a change creates unused code:

- Remove imports, variables, functions, or files made unused by the current
  change.
- Do not remove pre-existing dead code unless explicitly asked.

Diff test:

Every changed line should trace directly to the user request, approved ticket,
or required verification.

## 4. Goal-Driven Execution

Define success criteria. Work until verified.

Turn tasks into verifiable outcomes:

- "Add validation" means define invalid cases, test or check them, then make
  them pass.
- "Fix the bug" means reproduce or explain the failure, fix it, then verify the
  behavior.
- "Refactor X" means preserve behavior and run relevant checks before claiming
  completion.

For multi-step tasks, use a brief plan:

```text
1. Step -> verify with check.
2. Step -> verify with check.
3. Step -> verify with check.
```

Strong success criteria allow independent progress. Weak criteria require
clarification before coding.

## 5. Factory Safety

BuildPodFactory is a controlled product factory, not a place for uncontrolled
AI coding.

Codex must preserve these boundaries:

- Jarvis is private Factory infrastructure, not the sellable product.
- Product builds start only from approved intake, charter, requirements, or
  approved discovery actions.
- Builder agents do not approve their own work.
- Jobs cannot be Done without evidence.
- Release, deployment, paid launch, high-impact security, GxP, and
  customer-facing claims require human approval.
- If evidence, dependency clarity, source truth, or permission is missing,
  create or report a blocker instead of inventing completion.

These guidelines are working when diffs are smaller, changes are easier to
review, fewer rewrites are needed, and clarifying questions happen before
avoidable mistakes.
