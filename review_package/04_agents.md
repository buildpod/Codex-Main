# Agent Definitions

Agents are currently defined as local JavaScript objects and runtime state, not as independent LLM workers with separate system prompts. The persona text below is the implemented mission/config used by Jarvis.

## Raw server agent catalog

```js
const agentCatalog = {
  moderator: {
    title: "Master Moderator",
    short: "Moderator",
    type: "Orchestration"
  },
  steering: {
    title: "Steering Committee",
    short: "Steering",
    type: "Governance"
  },
  product: {
    title: "Product Market Agent",
    short: "Market",
    type: "Strategy"
  },
  intake: {
    title: "Product Intake Agent",
    short: "Intake",
    type: "Product"
  },
  architecture: {
    title: "Architecture Agent",
    short: "Architecture",
    type: "Architecture"
  },
  backend: {
    title: "Backend Agent",
    short: "Backend",
    type: "Build"
  },
  frontend: {
    title: "Frontend UX Agent",
    short: "UX",
    type: "Build"
  },
  qa: {
    title: "QA/Security Agent",
    short: "QA Security",
    type: "Verification"
  },
  evidence: {
    title: "Evidence Agent",
    short: "Evidence",
    type: "Trust"
  },
  challenge: {
    title: "Decision Challenger",
    short: "Challenger",
    type: "Challenge"
  }
};
```

## Raw server runtime defaults

```js
const initialAgentRuntime = {
  moderator: {
    state: "waiting",
    task: "Waiting for product idea, charter, or command",
    waitingFor: "Human owner input"
  },
  steering: {
    state: "sleeping",
    task: "Standing by for release, risk, or approval decision",
    waitingFor: "Gate escalation"
  },
  product: {
    state: "waiting",
    task: "Waiting for product idea, buyer, pain, and distribution",
    waitingFor: "Buyer and painful workflow evidence"
  },
  intake: {
    state: "sleeping",
    task: "Standing by to create product intake record",
    waitingFor: "Passed market gate or approved bypass"
  },
  architecture: {
    state: "sleeping",
    task: "Standing by for requirements, data model, and security level",
    waitingFor: "Approved intake and charter"
  },
  backend: {
    state: "sleeping",
    task: "Standing by for approved build tickets",
    waitingFor: "Architecture, API contract, and security model"
  },
  frontend: {
    state: "sleeping",
    task: "Standing by for workflow and interface contracts",
    waitingFor: "UX flow and API contract"
  },
  qa: {
    state: "sleeping",
    task: "Standing by for code diff, tests, and scan path",
    waitingFor: "Build output"
  },
  evidence: {
    state: "waiting",
    task: "Waiting for agent outputs, changed files, and test logs",
    waitingFor: "Evidence-producing work"
  },
  challenge: {
    state: "sleeping",
    task: "Standing by for high-impact decisions or weak evidence",
    waitingFor: "Proposal, risk, or release decision"
  }
};
```

## Raw client agent/persona config

```js
const agents = {
  moderator: {
    type: "Orchestration",
    title: "Master Moderator",
    short: "Moderator",
    accent: "#62ffd2",
    mission:
      "Turns approved context into scoped tickets, assigns agents, demands " +
      "evidence, and prevents uncontrolled AI coding.",
    inputs: ["Charter", "Source-of-truth docs", "Backlog", "Gate results"],
    outputs: ["Ticket routing", "Escalations", "Decision records"],
    workers: ["Planning Worker", "Dependency Worker", "Evidence Worker"],
    protocols: ["Scope lock", "Evidence required", "Human gate"],
    stop: "Source truth, dependency, test path, or evidence path is missing."
  },
  steering: {
    type: "Governance",
    title: "Steering Committee",
    short: "Steering",
    accent: "#ffd36a",
    x: 50,
    y: 8,
    mission:
      "Independent governance for product, architecture, security, evidence, " +
      "release, and learning decisions.",
    inputs: ["Product charter", "Gate results", "Challenge records"],
    outputs: ["Approve", "Reject", "Escalate", "Risk acceptance"],
    workers: ["Product Owner", "Architect", "Security Reviewer"],
    protocols: ["Approval control", "Risk review", "Release hold"],
    stop: "Critical release, security, data, or compliance decision lacks human approval."
  },
  product: {
    type: "Strategy",
    title: "Product Market Agent",
    short: "Market",
    accent: "#7ae4ff",
    x: 18,
    y: 22,
    mission:
      "Checks whether a product idea has a buyer, user pain, urgency, " +
      "distribution path, and willingness to pay.",
    inputs: ["Product idea", "Buyer", "User", "Competitors"],
    outputs: ["Market gate", "Discovery questions", "Commercial risks"],
    workers: ["Buyer Worker", "Pricing Worker", "Competitor Worker"],
    protocols: ["Buyer first", "Pain proof", "Distribution check"],
    stop: "No target buyer, no painful workflow, or no distribution path."
  },
  intake: {
    type: "Product",
    title: "Product Intake Agent",
    short: "Intake",
    accent: "#6affb8",
    x: 50,
    y: 24,
    mission:
      "Turns product ideas that pass the market gate into intake records, " +
      "classification, unresolved blockers, and build-start readiness.",
    inputs: ["Market gate", "Intended use", "Data/security notes"],
    outputs: ["Intake record", "Classification", "Open blockers"],
    workers: ["Scope Worker", "Data Classifier", "Blocker Worker"],
    protocols: ["Intended use", "Classification", "No build before charter"],
    stop: "Intended use, buyer/user, data class, or security level is unknown."
  },
  architecture: {
    type: "Architecture",
    title: "Architecture Agent",
    short: "Architecture",
    accent: "#8da2ff",
    x: 82,
    y: 22,
    mission:
      "Protects modular architecture, data contracts, tenant boundaries, " +
      "interfaces, and reusable module decisions.",
    inputs: ["Requirements", "Data model", "Default architecture"],
    outputs: ["ADRs", "Module decisions", "Architecture risks"],
    workers: ["ADR Worker", "Schema Worker", "Boundary Worker"],
    protocols: ["Tenant boundary", "ADR required", "Contract first"],
    stop: "High-impact architecture or data decision lacks approval."
  },
  backend: {
    type: "Build",
    title: "Backend Agent",
    short: "Backend",
    accent: "#4c8dff",
    x: 9,
    y: 52,
    mission:
      "Builds service boundaries, APIs, repositories, auth-aware mutations, " +
      "audit events, and server-side workflows.",
    inputs: ["Tickets", "Data model", "Security model"],
    outputs: ["Backend code", "Migrations", "Tests", "Evidence"],
    workers: ["Service Worker", "Migration Worker", "Audit Worker"],
    protocols: ["API contract", "Auth aware", "Audit trail"],
    stop: "Secrets, tenant isolation, or mutation evidence path is unclear."
  },
  frontend: {
    type: "Build",
    title: "Frontend UX Agent",
    short: "UX",
    accent: "#baff6a",
    x: 91,
    y: 52,
    mission:
      "Builds user flows, dashboards, responsive screens, states, and " +
      "accessible controls aligned to product purpose.",
    inputs: ["UX standard", "API contracts", "Product workflows"],
    outputs: ["UI screens", "Screenshots", "UX review notes"],
    workers: ["Component Worker", "Flow Worker", "State Worker"],
    protocols: ["Workflow first", "Responsive check", "Visual proof"],
    stop: "Primary workflow is unclear or API contract is missing."
  },
  qa: {
    type: "Verification",
    title: "QA/Security Agent",
    short: "QA Security",
    accent: "#ff6f7a",
    x: 18,
    y: 80,
    mission:
      "Verifies behavior, scans dependencies, checks secrets, challenges auth, " +
      "and blocks unsafe release candidates.",
    inputs: ["Code diff", "Security baseline", "Test plan"],
    outputs: ["Test results", "Security findings", "Release blockers"],
    workers: ["Test Worker", "Secret Scan Worker", "RLS Worker"],
    protocols: ["Scan diff", "Test evidence", "Block criticals"],
    stop: "Critical finding, exposed secret, or missing verification path."
  },
  evidence: {
    type: "Trust",
    title: "Evidence Agent",
    short: "Evidence",
    accent: "#62ffd2",
    x: 82,
    y: 80,
    mission:
      "Checks that accepted work has source links, changed files, test outputs, " +
      "risks, decisions, and approval evidence.",
    inputs: ["Agent output", "Test logs", "Decision records"],
    outputs: ["Evidence record", "Completeness score", "Release bundle"],
    workers: ["Hash Worker", "Bundle Worker", "Trace Worker"],
    protocols: ["No evidence no done", "Traceability", "Bundle release"],
    stop: "No evidence means not done."
  },
  challenge: {
    type: "Challenge",
    title: "Decision Challenger",
    short: "Challenger",
    accent: "#ff9d6a",
    x: 50,
    y: 92,
    mission:
      "Finds unsupported assumptions, weak evidence, hidden dependencies, " +
      "unsafe claims, and safer alternatives.",
    inputs: ["Proposal", "Evidence", "Risk log"],
    outputs: ["Challenge record", "Residual risk", "Recommendation"],
    workers: ["Devil Advocate", "Security Challenger", "Value Challenger"],
    protocols: ["Assumption hunt", "Risk pressure", "Alternative path"],
    stop: "Critical risk remains unresolved."
  }
};
```

## Annotations

### Master Moderator
Role: Orchestration. Persona: turns approved context into scoped tickets, assigns agents, demands evidence, prevents uncontrolled AI coding. Tools/functions: local Jarvis APIs, dependency planning, dispatch, dry-run, learning loop. Input: charter/source docs/backlog/gates. Output: routing, escalations, decision records.

### Steering Committee
Role: Governance. Persona: independent governance for product, architecture, security, evidence, release, and learning. Tools/functions: approval records only. Input: charter, gate results, challenge records. Output: approve/reject/escalate/risk acceptance.

### Product Market Agent
Role: Strategy. Persona: checks buyer, user pain, urgency, distribution, willingness to pay. Tools/functions: represented via dry-run and dispatch. Input: idea, buyer, user, competitors. Output: market gate, discovery questions, commercial risks.

### Product Intake Agent
Role: Product intake. Persona: turns ideas into intake records, classifications, blockers, readiness. Tools/functions: `/api/intake`. Input: market gate, intended use, data/security notes. Output: intake record, classification, blockers.

### Architecture Agent
Role: Architecture. Persona: protects architecture, data contracts, tenant boundaries, interfaces, module decisions. Tools/functions: represented in jobs and dry-run artifacts. Input: requirements, data model, architecture rules. Output: ADRs, module decisions, architecture risks.

### Backend Agent
Role: Build. Persona: builds service boundaries, APIs, repositories, auth-aware mutations, audit events, server workflows. Tools/functions: represented in jobs/subworkers. Input: tickets, data model, security model. Output: backend code, migrations, tests, evidence.

### Frontend UX Agent
Role: Build. Persona: builds user flows, dashboards, responsive screens, states, accessible controls. Tools/functions: represented in jobs/subworkers. Input: UX standard, API contracts, product workflows. Output: UI screens, screenshots, UX review notes.

### QA/Security Agent
Role: Verification. Persona: verifies behavior, scans dependencies, checks secrets, challenges auth, blocks unsafe releases. Tools/functions: smoke/check scripts, evidence records. Input: code diff, baseline, test plan. Output: test results, security findings, release blockers.

### Evidence Agent
Role: Trust. Persona: checks source links, changed files, test outputs, risks, decisions, approvals. Tools/functions: `/api/evidence`; Done-state guard. Input: agent output, test logs, decisions. Output: evidence records, completeness signal, release bundle placeholder.

### Decision Challenger
Role: Challenge. Persona: finds unsupported assumptions, weak evidence, hidden dependencies, unsafe claims. Tools/functions: dry-run challenge artifact. Input: proposal, evidence, risk log. Output: challenge record, residual risk, recommendation.
