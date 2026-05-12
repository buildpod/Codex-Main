# Moderator Learning Loop

Status: Draft baseline for Factory 1.0

## Purpose

Define how the Master Moderator helps Factory improve every day without
hallucinating, silently changing rules, or unsafe-training a local model.

## Core Rule

Factory may learn continuously. Local model training does not happen
automatically.

Continuous learning means:

- interviewing agents;
- cross-checking with local Ollama when available;
- extracting lessons;
- creating evaluation prompts;
- recording failures and improvements;
- promoting reviewed lessons into Factory docs.

Fine-tuning, model replacement, release-rule changes, and security-rule changes
require explicit human approval.

## Learning Actions

Each learning cycle performs this defined action set:

1. Observe latest Factory reports and agent runtime.
2. Interview each agent for current work, dependency risk, and evidence gaps.
3. Cross-check the summary with local Ollama if a local model is available.
4. Extract reusable lessons, anti-patterns, and evaluation prompts.
5. Append a learning record to the local Factory learning ledger.
6. Hold any model training, gate change, or policy change for human approval.

## Efficiency Rule

The learning loop must improve the next loop. It should not repeat expensive or
slow work when the same evidence already exists.

Jarvis must:

- reuse a recent learning record for the same latest run unless forced;
- keep local Ollama cross-checks short and bounded by a timeout;
- send compact state summaries to local models instead of full logs;
- prefer one useful cross-check over multiple decorative model calls;
- record any timeout, skipped model, or failed action honestly;
- convert repeated Jarvis build failures into agent rules.

Current build lesson:

- UI actions need visible busy, success, error, timeout, and recovery states.
- Backend edits should use `pnpm jarvis:dev` to reduce manual kill/start loops.
- Self-healing starts with safe retries, cached learning records, and clear
  owner actions. It does not mean silent autonomous fixes.

## Agent Interview Questions

Each agent is asked:

- What are you currently doing?
- What are you waiting for?
- Which dependency could block or corrupt your work?
- What evidence would prove the work is complete?
- What should the local helper remember for future similar work?

## Local Ollama Role

Ollama is a second-opinion helper for small local work.

It may:

- summarize agent interviews;
- detect dependency gaps;
- suggest evidence prompts;
- propose reusable checklists;
- help draft local evaluation questions.

It must not:

- approve gates;
- approve release;
- approve security exceptions;
- deploy;
- push code;
- silently train or replace a model;
- override Codex, Claude Code, or human approval.

## Training Queue

A learning record can become a training candidate only after human review.

Minimum fields:

- source run;
- agent interviews;
- dependency gaps;
- evidence gaps;
- accepted lesson;
- rejected lesson;
- evaluation prompt;
- expected answer;
- risk label;
- human approval status.

## Jarvis Implementation

Jarvis stores learning outputs under:

```text
factory/learning/
```

Current files:

- `learning-ledger.json`
- `interviews/*.md`

Jarvis should show:

- latest learning record;
- Ollama cross-check status;
- learning actions;
- policy reminder;
- human-review requirement.
- whether the latest learning loop reused a recent record or created a new one.

## Factory Rule

Learning improves the Factory. It does not bypass the Factory.
