# Architecture Brief

## 1. End-to-end purpose
BuildPodFactory is a private AI Enterprise SaaS Factory. Its implemented path is: capture or simulate product intake, evaluate blockers, represent agent roles, create jobs, track dependencies, require evidence, record approvals, run dry-run checks, and log learning records. It does not yet build a real revenue app end to end; the current complete path is a deterministic dry-run that produces Markdown/JSON evidence artifacts.

## 2. Agent roles
- Master Moderator: coordinates Factory work, dependency planning, dispatch, and learning loop.
- Steering Committee: represents human/committee approval for release, risk, and governance decisions.
- Product Market Agent: checks buyer, pain, urgency, distribution, and willingness to pay.
- Product Intake Agent: captures intended use, users, data/security classification, and build-readiness blockers.
- Architecture Agent: owns architecture, data model, contracts, and high-impact technical decisions.
- Backend Agent: represents backend/API/data-service implementation work.
- Frontend UX Agent: represents product workflow, UI, state, and responsive interface work.
- QA/Security Agent: verifies behavior, tests, security risk, secrets, and release blockers.
- Evidence Agent: records proof and blocks fake Done states.
- Decision Challenger: challenges unsupported assumptions and high-impact decisions.

## 3. Work flow between agents
Current orchestration is local-file and HTTP-API based, not a message bus. Jarvis runs a local Node HTTP server in `apps/jarvis/server.mjs`. The UI calls endpoints such as `/api/jobs`, `/api/subworkers`, `/api/evidence`, `/api/approvals`, and dry-run endpoints. Job state is stored in JSON files. Agent state is mostly in memory during the server process, with durable outputs written as JSON/Markdown.

## 4. State location
State lives in local files and process memory. Durable state: `factory/jobs/*.json`, `factory/learning/learning-ledger.json`, and `products/*/run-*/` Markdown/JSON reports. Runtime agent status and timeline are in server memory. There is no database, vector store, queue service, or external state backend.

## 5. How it decides what to build
The factory does not yet autonomously find apps to build. The human still provides the product idea or dry-run scenario. Product intake and blocker detection exist, but discovery/ideation is not an implemented market-research loop.

## 6. Current bottleneck
The bottleneck is converting a human product idea into an approved Product Build Charter with traceable requirements and then scaffolding/building a real product repo. Jarvis can model jobs and evidence, but it does not yet perform actual multi-agent implementation with independent reviewer gates on a real SaaS product.
