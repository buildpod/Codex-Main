# Factory Tools

Status: Draft baseline for Factory 1.0

## Tools

- `factory-dry-run.mjs`: rule-based dry run harness for Factory agent flow.
- `jarvis-dev.mjs`: starts Jarvis once and refuses duplicate starts when Jarvis
  is already healthy.
- `jarvis-health.mjs`: checks Jarvis health, owner actions, jobs, and learning.
- `jarvis-smoke.mjs`: verifies Jarvis button/API contracts for status sync,
  dispatch, dependency planning, ready-job start, Learning Loop, Dry Pass, and
  Blocker Scan.
- `jarvis-check.mjs`: runs local syntax and Factory markdown checks.

## Usage

```bash
node factory/tools/factory-dry-run.mjs run sample-product
```

Or:

```bash
pnpm factory:dry-run
```

Start Jarvis for development:

```bash
pnpm jarvis:dev
```

Optional backend watch mode, only when we intentionally want auto-restart:

```bash
pnpm jarvis:watch
```

Check Jarvis without opening the browser:

```bash
pnpm jarvis:health
pnpm jarvis:smoke
pnpm jarvis:check
```

## Rule

Dry-run tools test Factory controls. They do not create real customer products.
