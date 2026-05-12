# Session Handoff - 2026-05-12

Status: Pickup note for next Factory session

## What We Are Building

BuildPodFactory, short name Factory, is the private internal operating system for creating future products, SaaS, and mobile apps. Factory itself is not for sale. It is the controlled environment where product ideas are evaluated, agents are coordinated, evidence is captured, and sellable products are built only after gates pass.

Current UI project: Project Jarvis, the Factory command center.

## Current Workspace

Primary Codex-owned workspace:

`/Users/vineetpathak/Documents/New project/BuildPodFactory`

Jarvis app files:

- `apps/jarvis/server.mjs`
- `apps/jarvis/public/index.html`
- `apps/jarvis/public/styles.css`
- `apps/jarvis/public/app.js`

Run command:

```bash
cd "/Users/vineetpathak/Documents/New project/BuildPodFactory"
pnpm jarvis
```

Better development command for backend edits:

```bash
cd "/Users/vineetpathak/Documents/New project/BuildPodFactory"
pnpm jarvis:dev
```

This first checks whether Jarvis is already healthy. If it is already running,
it tells you to use the browser instead of starting a duplicate server. If it is
not running, it starts one stable server process. Frontend changes usually only
need a browser refresh.

Optional backend watch mode:

```bash
pnpm jarvis:watch
```

Quick checks:

```bash
pnpm jarvis:health
pnpm jarvis:smoke
pnpm jarvis:check
```

Correct browser URL:

```text
http://localhost:4173/
```

Important: `file:///Users/.../apps/jarvis/public/index.html` can show the static page, but backend features will not work there. Use `http://localhost:4173/` after running `pnpm jarvis`.

## What Is Done

- Factory document base and missing Factory 1.0 docs were added under `factory/`.
- Dry-run harness exists at `factory/tools/factory-dry-run.mjs`.
- Jarvis UI exists and runs locally.
- Jarvis now has a futuristic command-center UI with:
  - Agent constellation.
  - Agent Activity Board.
  - Runtime states: Sleeping, Waiting, Working, Blocked, Done.
  - Selected-agent runtime panel.
  - Current work / waiting-for / heartbeat fields.
  - Dispatch queue.
  - Evidence stream.
  - Release gates.
  - Clearer action labels: Sync Status, Dry Pass, Blocker Scan.
- Backend has local LLM status endpoint:
  - `/api/local-llm`
  - Checks local Ollama on `127.0.0.1:11434`.
- Jarvis now has backend-backed live agent runtime:
  - `/api/agents` returns agent catalog, runtime states, timeline, summary, and latest reports.
  - `/api/dispatch` accepts a selected agent command and updates that agent from Working to Waiting.
  - `/api/dry-run` updates the agent runtime as the Factory dry-run executes.
  - The browser polls `/api/agents`, so status changes survive refresh and stay aligned with the backend.
- Latest verified run showed 10 nodes online, 9 agents Done, Steering Committee Waiting, Last Status PASS, and 2 evidence packs.
- Added Factory dependency orchestration rules:
  - `factory/operations/agent-parallelism-and-dependencies.md`
  - agents may work in parallel only when dependencies, file ownership, contracts, tests, and evidence paths are clear;
  - tickets now include `Depends on`, `Blocks`, `Parallel safe`, `Shared contracts touched`, approval, and stop-condition fields.
- Added Moderator Learning Loop rules:
  - `factory/operations/moderator-learning-loop.md`
  - Jarvis can interview agents, cross-check with local Ollama when available, and record lessons under `factory/learning/`;
  - continuous learning means reviewed memory/eval records, not automatic fine-tuning;
  - model training, model replacement, release-rule changes, and security-rule changes need human approval.
- Implemented Jarvis panels and APIs for dependency control and learning:
  - `/api/jobs`
  - `/api/jobs/plan`
  - `/api/jobs/start-ready`
  - `/api/learning`
  - `/api/learning/run`
  - UI panels: Parallel Job Graph and Cross-Check Loop.
- Added the Owner Action Board near the top of Jarvis:
  - `/api/actions` computes what needs the human owner, what is review-ready, and what is optional system cleanup;
  - the UI shows open/high/input/review/approval counts;
  - each card names the owner, agent, priority, reason, and next step.
- Added reliability and efficiency improvements:
  - `pnpm jarvis:dev` avoids duplicate starts and starts one stable server by default;
  - `pnpm jarvis:watch` is available when backend auto-restart is intentionally needed;
  - `pnpm jarvis:health`, `pnpm jarvis:smoke`, and `pnpm jarvis:check` provide a fast readiness loop;
  - API calls now use shared timeout/error handling in the UI;
  - action buttons show busy/failure/recovery states instead of silently failing;
  - the Learning Loop reuses a recent record for the same latest run unless forced;
  - server API errors return structured JSON instead of crashing silently.
- Added `factory/operations/jarvis-reliability-and-self-healing.md`.

## Current Agent Set

- Master Moderator: orchestrates Factory work and prevents scope drift.
- Master Moderator also builds the dependency graph and assigns file ownership before parallel work starts.
- Steering Committee: human governance for approval/risk/release decisions.
- Product Market Agent: checks buyer, pain, urgency, distribution, willingness to pay.
- Product Intake Agent: turns a passed market gate into intake records, classification, blockers, and build-start readiness.
- Architecture Agent: protects architecture, tenant boundaries, contracts, ADRs.
- Backend Agent: builds APIs, services, migrations, audit-aware backend work.
- Frontend UX Agent: builds user flows, UI, responsive screens, visual proof.
- QA/Security Agent: verifies behavior, scans security and release blockers.
- Evidence Agent: checks changed files, test output, source links, release evidence.
- Decision Challenger: challenges assumptions, risk, weak evidence, unsafe claims.

## Current Reality Check

Jarvis is not yet Iron Man-level. It now looks and behaves more like a Factory command UI, and the agents have server-backed states. The current "alive" layer is still a controlled runtime and dry-run simulation, not autonomous long-running Codex/Claude workers yet.

To feel truly alive, it still needs:

- Durable backend job records for each agent command.
- Real execution mapping from agent command to Codex/Claude/local helper action.
- Live timeline per run with clickable evidence files.
- Clickable evidence files.
- Interactive approval gates before GitHub push, deploy, release, security acceptance, or paid-product decisions.
- Local LLM fallback for small offline tasks.
- Better visual hierarchy once real agent jobs produce larger timelines.
- More real self-healing: retry safe reads, isolate failed jobs, and surface
  recovery actions without pretending unsafe work succeeded.

## Local LLM Position

Ollama can be used for small offline helper work only:

- Draft questions.
- Summarize local docs.
- Inspect small snippets.
- Suggest checklist items.

Ollama should not:

- Approve gates.
- Push to GitHub.
- Deploy.
- Replace Codex or Claude Code for serious product builds.
- Make commercial/security/release decisions.

## Why It Felt Slow

This was not a cloud redeploy. We were editing a local app, restarting the local Node server, reloading the browser, and verifying interactions. Backend changes such as `/api/local-llm` require restarting `pnpm jarvis` or `pnpm jarvis:dev`; frontend-only changes may only need browser reload. Auto-restart is now optional because noisy watch loops make small changes feel slower than they are.

Tomorrow we should make this faster by using a tiny dev-mode loop or clearly separating:

- Frontend-only edit: reload browser.
- Backend edit: restart `pnpm jarvis:dev`.
- Verification: run syntax checks and browser smoke test.

## Next Best Steps

1. Add clickable latest evidence pack links from the UI.
2. Add approval/review controls to promote Review jobs to Done.
3. Add a "Factory Control Rules" panel: what Jarvis can do alone vs what needs human approval.
4. Create the first real agent execution bridge: command -> job record -> evidence -> UI timeline.
5. Convert repeated learning records into evaluation prompts.
6. Decide whether to use a faster small Ollama model for cross-checks; `qwen3:8b` timed out during local cross-checks.

## Commands To Resume

Check syntax:

```bash
cd "/Users/vineetpathak/Documents/New project/BuildPodFactory"
node --check apps/jarvis/server.mjs
node --check apps/jarvis/public/app.js
```

Start Jarvis:

```bash
cd "/Users/vineetpathak/Documents/New project/BuildPodFactory"
pnpm jarvis
```

Open:

```text
http://localhost:4173/
```

Run dry-run manually:

```bash
pnpm factory:dry-run
pnpm factory:dry-run:blocker
```

## Human Preference To Remember

- User is beginner; explain step by step.
- Do not jump into product build before Factory is ready.
- Do not over-install tools.
- Avoid hallucinated claims.
- Explain why each tool or model is needed.
- Factory is private and used to create future products.
- Codex and Claude Code are the main coding agents.
- Local LLM is optional and should not make important decisions.
