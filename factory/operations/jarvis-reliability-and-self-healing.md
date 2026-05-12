# Jarvis Reliability And Self-Healing

Status: Draft baseline for Factory 1.0

## Purpose

Jarvis must be useful before it is impressive. Every control should make the
Factory state clearer, safer, or easier to recover.

## Button Contract

Every Jarvis action button must have:

- visible purpose;
- busy state;
- timeout;
- success state;
- error state;
- recovery message;
- refreshed owner actions after completion or failure.

Buttons must not silently fail. If a backend call fails, Jarvis should show the
failure in the Evidence Stream and keep the Factory in a known state.

## Efficient Dev Loop

Backend edits should run with:

```bash
pnpm jarvis:dev
```

This command checks whether Jarvis is already healthy before trying to start a
new server. If Jarvis is not running, it starts one stable server process.
Restart manually after backend edits.

Backend watch mode is available only when we intentionally want auto-restart:

```bash
pnpm jarvis:watch
```

Frontend-only edits usually need only a browser refresh.

Use these checks before claiming Jarvis is ready:

```bash
pnpm jarvis:health
pnpm jarvis:smoke
pnpm jarvis:check
```

Required pass condition:

- health endpoint responds;
- owner actions endpoint responds;
- job graph endpoint responds;
- learning endpoint responds with summaries;
- Learning Loop returns a record and reuses recent records where possible;
- UI-backed action contracts work for Sync Status, Dispatch, Plan Parallel,
  Start Ready, Learning Loop, Dry Pass, and Blocker Scan;
- dry-runs use POST because they mutate Factory evidence state;
- server and client JavaScript syntax checks pass;
- Factory markdown lint passes.

## Self-Healing Boundary

Jarvis may self-heal by:

- retrying safe reads;
- timing out stuck requests;
- reusing recent learning records;
- refreshing agent, job, learning, and owner-action state;
- telling the owner exactly what failed.

Jarvis must not self-heal by:

- approving release;
- changing security rules;
- pushing code;
- deploying;
- training or replacing a model;
- hiding failures from the owner.

## Agent Learning Rule

When Jarvis itself fails or feels slow, the Moderator must record the lesson and
promote it into Factory rules after human review.

Current accepted build lessons:

- UI actions need busy, error, timeout, and recovery states.
- UI actions need visible completion text, not only console output.
- Repeated Learning Loop clicks should reuse recent records for the same run.
- Local Ollama is optional and bounded; a timeout is evidence, not a reason to
  block the Factory.
- `pnpm jarvis:dev` should start one stable server by default; watch mode is
  optional because repeated automatic restarts waste time and hide the real
  failure.
- Developer workflow should distinguish backend restart from frontend refresh.
