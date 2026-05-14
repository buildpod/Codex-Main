# AI Enterprise SaaS Factory Document Pack v0.9 - Combined

**Status:** Controlled Draft - Baseline Candidate  
**Date:** 2026-05-02  



---

# 00 Master Index - AI Enterprise SaaS Factory Document Pack

**Document status:** Controlled Draft - Baseline Candidate  
**Version:** v0.9  
**Date:** 2026-05-02  
**Document type:** Master Index  

## Purpose
This document pack defines a reusable, product-agnostic AI Enterprise SaaS Factory. The factory is intended to build enterprise-grade software products through governed AI-agent delivery, controlled SDLC, traceability, evidence capture, risk-based documentation, human approval gates, and continuous learning.

## Core operating concept
Product Build Charter -> Requirements -> Architecture -> Component V-Model -> Agent Tickets -> Build -> Test -> Challenge Review -> Evidence Ledger -> Release Decision -> Learning Loop.

## Controlled document set
| ID | Document | Purpose |
| --- | --- | --- |
| 00 | Master Index | Defines the document pack, controlled status, usage, revision history, and traceability model. |
| 01 | Factory Platform URS | Defines requirements for the factory platform itself. |
| 02 | Product Build Intake URS | Defines mandatory product inputs and go/no-go rules before build. |
| 03 | Agent Management URS | Defines agent creation, control, KPIs, contracts, and subagents. |
| 04 | Master Moderator URS | Defines moderator/orchestration requirements. |
| 05 | Steering Committee URS | Defines governance board requirements. |
| 06 | Evidence Ledger URS | Defines evidence, audit, hash-chain, and release evidence requirements. |
| 07 | Dependency Ledger URS | Defines dependency protection and impact analysis requirements. |
| 08 | Decision Challenge URS | Defines confidence-gated adversarial review requirements. |
| 09 | GxP Documentation Engine URS | Defines risk-based vendor/customer validation documentation generation. |
| 10 | Security and Compliance URS | Defines security, privacy, and compliance-readiness requirements. |
| 11 | Import and Integration URS | Defines external tool ingestion and connector requirements. |
| 12 | V-Model Component Lifecycle SOP | Defines component-level V-Model operating procedure. |
| 13 | Agent Operating SOP | Defines step-by-step agent work procedure. |
| 14 | Release and Validation SOP | Defines release, evidence, and validation-support procedure. |
| 15 | Templates Pack | Provides templates for charter, ticket, evidence, decision, traceability, GxP triage, and release. |
| 16 | Agent Requirements Appendix | Detailed requirement sheets for all factory agents and subagents. |
| 17 | Baseline Traceability Matrix | Maps major factory capabilities to documents, agents, gates, and evidence. |
| 18 | Architecture Fitness Functions URS | Defines executable architecture tests and continuous architecture conformance checks. |
| 19 | Context Engineering URS | Defines how agents receive, retrieve, rank, cite, compress, and refresh context. |
| 20 | Agent Interoperability URS | Defines portable instructions and tool-connection standards for Codex, Claude, Cursor, MCP-compatible tools, and future agents. |
| 21 | Platform Engineering URS | Defines the factory as an internal developer platform with self-service golden paths and paved roads. |
| 22 | Reusable Module Registry URS | Defines reusable enterprise modules, versioning, ownership, validation status, and reuse criteria. |
| 23 | Data Governance and Data Contracts URS | Defines canonical data models, data classification, data contracts, retention, lineage, and integration data rules. |
| 24 | AI Security and Agent Safety URS | Defines AI-specific controls for prompt injection, tool misuse, excessive agency, secret leakage, and unsafe generated output. |
| 25 | AI FinOps and Cost Control URS | Defines token/model cost controls, per-ticket budgets, retry limits, and model-routing economics. |
| 26 | Agent Observability URS | Defines metrics, logs, traces, agent performance indicators, hallucination incidents, and operational dashboards. |
| 27 | Human Decision Rights URS | Defines which decisions AI may recommend, which decisions require human approval, and which decisions require Steering Committee approval. |

## Revision history
| Version | Date | Summary | Status |
| --- | --- | --- | --- |
| 0.7 | 2026-05-02 | Controlled draft with separate URS/SOP documents and component V-Model concept. | Baseline prior version. |
| 0.8 | 2026-05-02 | Added formal requirement IDs, verification methods, acceptance criteria, traceability matrix, agent requirement appendix, revision status, and controlled draft structure. | Baseline prior version. |
| 0.9 | 2026-05-02 | Added modern architecture maturity controls: architecture fitness functions, context engineering, agent interoperability, platform engineering, reusable module registry, data governance/contracts, AI security, FinOps, agent observability, and human decision rights. | Current controlled draft. |

## Controlled document status
- Status: Controlled Draft / Baseline Candidate.
- Intended use: Feed into Claude, Codex, Cursor, or equivalent AI engineering tools as a governed source-of-truth pack.
- Not approved for customer compliance claims without formal review and approval.

## Baseline capability traceability
| Capability | Requirement intent | Primary docs | Owner agents | Evidence |
| --- | --- | --- | --- | --- |
| Factory control | Product Build Charter, source-of-truth docs, ticket engine, gates | 01, 02, 12, 13 | Master Moderator, Steering Committee | Evidence Ledger, release record |
| Agent governance | Agent roles, KPIs, contracts, hard stops, subagents | 03, 04, 16 | Master Moderator, Agent Management | Agent evidence record, KPI log |
| Anti-hallucination | Source truth, evidence requirements, assumptions, rejection rules | 03, 04, 06, 08, 13 | Decision Challenger, QA, Evidence Ledger | Challenge record, evidence score |
| GxP-capable docs | Triage, GAMP-style profile, vendor package, customer lean kit | 09, 14, 15 | GxP Documentation Agent, Security/Compliance | GxP triage, responsibility matrix, documentation package |
| Tamper evidence | Audit/evidence records, hashes, chain verification | 06 | Evidence Ledger Agent | Hash-chain/evidence ledger verification |
| Import/integration | Parser, canonical draft, validation, preview, apply via services | 11 | Import/Integration Agent, QA, Security | Import evidence record, fixture tests |
| Architecture fitness | Automated rules continuously check architecture conformance and prevent drift. | 18 | Architecture Agent, QA/Test Agent | Fitness function results, architecture scan logs |
| Context engineering | Agents receive only relevant, current, source-grounded context. | 19 | Master Moderator, Context/Memory Agent | Context packet, source ranking record, stale-context check |
| Agent interoperability | Factory instructions work across Codex, Claude, Cursor, MCP tools, and future agents. | 20 | Master Moderator, DevOps/Release Agent | AGENTS.md, tool adapter records, MCP registry |
| Platform engineering | Factory becomes a repeatable internal developer platform with golden paths. | 21 | Platform Engineering Agent, Master Moderator | Golden path checklist, repo scaffold evidence |
| Module reuse | Enterprise modules are versioned, owned, validated, and reused safely. | 22 | Architecture Agent, Module Registry Agent | Module registry record, version/change evidence |
| Data governance | Data objects, contracts, retention, lineage, and classifications are controlled. | 23 | Data Governance Agent, Security/Compliance Agent | Data contract, lineage record, classification record |
| AI/agent security | AI-specific risks such as prompt injection, tool misuse, and excessive agency are controlled. | 24 | Security/Compliance Agent, Decision Challenger | AI security test report, red-team record |
| AI FinOps | Agent/model cost is tracked and controlled per product, ticket, and agent. | 25 | FinOps Agent, Master Moderator | Cost dashboard, budget exception record |
| Agent observability | Agent quality, latency, cost, rework, rejection, hallucination, and learning are measured. | 26 | Observability Agent, Learning Agent | Agent dashboard, incident metrics |
| Human decision rights | Critical decisions cannot be delegated to agents without human/Steering approval. | 27 | Steering Committee, Human Product Owner | Approval record, decision rights matrix |

## Most important design decisions
1. The factory is product-agnostic. Product-specific details enter through the Product Build Charter.
2. The factory uses component-level V-Model lifecycle for each major component.
3. Agents are governed workers, not free-form decision makers.
4. High-impact decisions require adversarial challenge and confidence-gated review.
5. GxP documentation is generated only after intended-use and risk triage; the factory must not over-document by default.
6. No source = assumption. No evidence = not done. No gate pass = no acceptance.

## Standard verification expectation
Every requirement shall be verifiable by review, inspection, automated test, security test, architecture scan, workflow demonstration, evidence-ledger record, or formal approval, as specified.

## Anti-hallucination rule
If an agent cannot cite an approved source-of-truth artifact, test result, code diff, or evidence record, the statement shall be marked as an assumption and shall not be used for release acceptance.


---

# 01 Factory Platform URS

**Document status:** Controlled Draft - Baseline Candidate  
**Version:** v0.9  
**Date:** 2026-05-02  
**Document type:** URS  

## Scope
The Factory Platform is the controlled operating system that manages product intake, requirements, agent orchestration, tickets, gates, evidence, documentation profiles, release decisions, and learning.

## Operating principle
The platform shall prevent uncontrolled AI coding by enforcing source truth, gate checks, evidence capture, and governance decisions.

## Formal requirements
| Req ID | Requirement | Priority | Verification | Acceptance Criteria |
| --- | --- | --- | --- | --- |
| FP-URS-001 | The factory shall maintain a Product Build Charter for every product before implementation starts. | Must | Review | Charter exists, has approved minimum inputs, and is linked to the product build ID. |
| FP-URS-002 | The factory shall block implementation when critical intake inputs are missing or conflicting. | Must | Demonstration | A build with missing intended use, scope, security level, or documentation mode is blocked and only discovery tickets are allowed. |
| FP-URS-003 | The factory shall maintain controlled source-of-truth documents for product scope, architecture, security, GxP documentation, dependencies, and release gates. | Must | Inspection | Source-of-truth folder exists and is referenced by tickets and agent outputs. |
| FP-URS-004 | The factory shall generate tickets only from approved requirements, approved discovery actions, or approved change decisions. | Must | Review | Every implementation ticket traces to a requirement/change/discovery decision. |
| FP-URS-005 | The factory shall assign every ticket to a named agent role and define allowed scope, inputs, outputs, tests, and stop rules. | Must | Review | Ticket includes agent owner, allowed files, acceptance criteria, tests, and out-of-scope rules. |
| FP-URS-006 | The factory shall run functional, architecture, security, evidence, and release gates before accepting work. | Must | Demonstration | No work item reaches accepted status without completed gate records. |
| FP-URS-007 | The factory shall record accepted outputs, tests, decisions, approvals, and release evidence in the Evidence Ledger. | Must | Inspection | Evidence Ledger contains event records for accepted work and release decisions. |
| FP-URS-008 | The factory shall support GxP-capable documentation mode using risk-based documentation profiles, not full validation documentation by default. | Must | Review | GxP triage selects a justified documentation profile and records rationale. |
| FP-URS-009 | The factory shall maintain a Learning Log and update rules after defects, rejected PRs, or repeated agent errors. | Should | Review | Learning entries include root cause, new rule/test, and prevention action. |

## Traceability expectation
Each requirement in this URS shall trace to one or more design items, tickets, tests, evidence records, and release decisions before acceptance.

## Standard verification expectation
Every requirement shall be verifiable by review, inspection, automated test, security test, architecture scan, workflow demonstration, evidence-ledger record, or formal approval, as specified.

## Anti-hallucination rule
If an agent cannot cite an approved source-of-truth artifact, test result, code diff, or evidence record, the statement shall be marked as an assumption and shall not be used for release acceptance.


---

# 02 Product Build Intake URS

**Document status:** Controlled Draft - Baseline Candidate  
**Version:** v0.9  
**Date:** 2026-05-02  
**Document type:** URS  

## Scope
This URS defines mandatory inputs before a product can be planned or built by the factory.

## Operating principle
The intake stage converts product ideas into an approved Product Build Charter.

## Mandatory minimum inputs
- Product name and business objective.
- Target users and target buyer.
- Intended use and non-goals.
- Data sensitivity and security level.
- Regulated domain / GxP / Part 11 relevance.
- Import/integration needs.
- Documentation mode and approval gates.

## Formal requirements
| Req ID | Requirement | Priority | Verification | Acceptance Criteria |
| --- | --- | --- | --- | --- |
| PBI-URS-001 | The factory shall collect mandatory intake inputs before build planning begins. | Must | Review | Intake record includes product name, objective, intended use, users, data sensitivity, security level, and documentation mode. |
| PBI-URS-002 | The factory shall classify each input as Approved, Draft, To Be Assessed, Missing, Conflict, or Blocker. | Must | Inspection | Each intake item has a status and owner. |
| PBI-URS-003 | The factory shall identify regulatory, GxP, Part 11, privacy, and data-integrity relevance during intake. | Must | Review | Triage result is captured and routes to Security/GxP agents where applicable. |
| PBI-URS-004 | The factory shall capture import/integration needs during intake, including source tools, file formats, APIs, and mapping expectations. | Should | Review | Import needs are recorded before import architecture tickets start. |
| PBI-URS-005 | The factory shall prevent coding work when intended use, security level, or GxP mode is unresolved. | Must | Demonstration | Only discovery tickets are allowed until blockers are resolved. |
| PBI-URS-006 | The factory shall create an approved Product Build Charter as the start record for each build. | Must | Review | Charter has approval status and is linked to product build ID. |

## Traceability expectation
Each requirement in this URS shall trace to one or more design items, tickets, tests, evidence records, and release decisions before acceptance.

## Standard verification expectation
Every requirement shall be verifiable by review, inspection, automated test, security test, architecture scan, workflow demonstration, evidence-ledger record, or formal approval, as specified.

## Anti-hallucination rule
If an agent cannot cite an approved source-of-truth artifact, test result, code diff, or evidence record, the statement shall be marked as an assumption and shall not be used for release acceptance.


---

# 03 Agent Management URS

**Document status:** Controlled Draft - Baseline Candidate  
**Version:** v0.9  
**Date:** 2026-05-02  
**Document type:** URS  

## Scope
This URS defines how agents are created, controlled, measured, restricted, and improved.

## Operating principle
Agents must be domain-specialist roles with clear objectives and evidence obligations.

## Agent hierarchy
Steering Committee -> Master Moderator -> Specialist Agents -> Subagents / Task Workers.

## Formal requirements
| Req ID | Requirement | Priority | Verification | Acceptance Criteria |
| --- | --- | --- | --- | --- |
| AGT-URS-001 | The factory shall define each agent with mission, expertise, objectives, inputs, outputs, KPIs, permissions, subagents, and hard-stop rules. | Must | Review | Every active agent has an approved requirement sheet. |
| AGT-URS-002 | The factory shall separate builder agents from reviewer/approver agents. | Must | Inspection | No agent is allowed to fully approve its own implementation output. |
| AGT-URS-003 | The factory shall require every agent output to list source files used, assumptions, evidence, risks, tests, and recommendation. | Must | Review | Agent Evidence Record is complete for accepted outputs. |
| AGT-URS-004 | The factory shall track agent performance using role-specific KPIs. | Should | Review | KPI dashboard or log shows scope drift, defects caught, test pass rate, and repeated mistakes. |
| AGT-URS-005 | The factory shall allow subagents/workers only under a specialist agent with a scoped task and output contract. | Should | Review | Subagent work links to parent agent and ticket. |
| AGT-URS-006 | The factory shall require agents to stop when source truth, required inputs, dependencies, or evidence are missing. | Must | Demonstration | Stop condition produces a blocker record rather than invented output. |

## Traceability expectation
Each requirement in this URS shall trace to one or more design items, tickets, tests, evidence records, and release decisions before acceptance.

## Standard verification expectation
Every requirement shall be verifiable by review, inspection, automated test, security test, architecture scan, workflow demonstration, evidence-ledger record, or formal approval, as specified.

## Anti-hallucination rule
If an agent cannot cite an approved source-of-truth artifact, test result, code diff, or evidence record, the statement shall be marked as an assumption and shall not be used for release acceptance.


---

# 04 Master Moderator URS

**Document status:** Controlled Draft - Baseline Candidate  
**Version:** v0.9  
**Date:** 2026-05-02  
**Document type:** URS  

## Scope
This URS defines the Master Moderator Agent that acts as the source-grounded orchestrator similar to a moderator, not a free-form builder.

## Operating principle
The moderator decomposes work, assigns agents, checks dependencies, demands evidence, and escalates decisions.

## Formal requirements
| Req ID | Requirement | Priority | Verification | Acceptance Criteria |
| --- | --- | --- | --- | --- |
| MM-URS-001 | The Master Moderator Agent shall interpret the user intent and map it to source-of-truth documents before assigning work. | Must | Review | Moderator plan cites the Product Build Charter, architecture rules, and relevant requirements. |
| MM-URS-002 | The Master Moderator Agent shall decompose approved work into scoped tickets with dependencies and acceptance criteria. | Must | Review | Generated tickets contain objective, business reason, inputs, allowed scope, tests, and out-of-scope. |
| MM-URS-003 | The Master Moderator Agent shall assign tickets to appropriate specialist agents and identify required reviewer agents. | Must | Review | Assignment log lists builder, QA, security, architecture, and challenge reviewers where applicable. |
| MM-URS-004 | The Master Moderator Agent shall enforce dependency checks before work starts. | Must | Demonstration | Ticket with unmet dependencies is blocked or converted to prerequisite ticket. |
| MM-URS-005 | The Master Moderator Agent shall trigger Decision Challenge Review for high-impact decisions. | Must | Review | Challenge record exists for architecture, security, GxP, import, data model, release, and scope decisions. |
| MM-URS-006 | The Master Moderator Agent shall accept, revise, reject, or escalate work based on evidence and gate results. | Must | Inspection | Decision record includes confidence, evidence completeness, residual risk, and rationale. |

## Traceability expectation
Each requirement in this URS shall trace to one or more design items, tickets, tests, evidence records, and release decisions before acceptance.

## Standard verification expectation
Every requirement shall be verifiable by review, inspection, automated test, security test, architecture scan, workflow demonstration, evidence-ledger record, or formal approval, as specified.

## Anti-hallucination rule
If an agent cannot cite an approved source-of-truth artifact, test result, code diff, or evidence record, the statement shall be marked as an assumption and shall not be used for release acceptance.


---

# 05 Steering Committee URS

**Document status:** Controlled Draft - Baseline Candidate  
**Version:** v0.9  
**Date:** 2026-05-02  
**Document type:** URS  

## Scope
This URS defines the AI Steering Committee governance layer above the Master Moderator.

## Operating principle
The Steering Committee provides independent governance for high-impact product, architecture, security, GxP, and release decisions.

## Minimum committee perspectives
Product / Market Value, Architecture / Data Governance, Security / Compliance, QA / Evidence, Release / DevOps, Learning / Continuous Improvement, and Human Product Owner / Architect-of-Record.

## Formal requirements
| Req ID | Requirement | Priority | Verification | Acceptance Criteria |
| --- | --- | --- | --- | --- |
| SC-URS-001 | The factory shall define an AI Steering Committee above the Master Moderator for high-impact decisions. | Must | Review | Committee charter defines roles, authority, quorum, and decision scope. |
| SC-URS-002 | The Steering Committee shall include product, architecture, security/compliance, QA/evidence, release, and learning perspectives. | Must | Inspection | Decision record shows required viewpoints or justified waiver. |
| SC-URS-003 | The Steering Committee shall approve or reject major scope, architecture, GxP profile, security, and release decisions. | Must | Review | Major decisions have committee decision record. |
| SC-URS-004 | The Master Moderator shall chair the committee but shall not be sole approver for its own decisions. | Must | Inspection | Approval record includes at least one independent reviewer/approver for high-impact decisions. |
| SC-URS-005 | The Steering Committee shall maintain a decision log with alternatives, rationale, risks, and follow-up actions. | Should | Review | Decision log entries are complete and traceable to requirements/tickets. |

## Traceability expectation
Each requirement in this URS shall trace to one or more design items, tickets, tests, evidence records, and release decisions before acceptance.

## Standard verification expectation
Every requirement shall be verifiable by review, inspection, automated test, security test, architecture scan, workflow demonstration, evidence-ledger record, or formal approval, as specified.

## Anti-hallucination rule
If an agent cannot cite an approved source-of-truth artifact, test result, code diff, or evidence record, the statement shall be marked as an assumption and shall not be used for release acceptance.


---

# 06 Evidence Ledger URS

**Document status:** Controlled Draft - Baseline Candidate  
**Version:** v0.9  
**Date:** 2026-05-02  
**Document type:** URS  

## Scope
This URS defines evidence capture, traceability, and tamper-evident record requirements.

## Operating principle
The Evidence Ledger is the trust backbone of the factory.

## Formal requirements
| Req ID | Requirement | Priority | Verification | Acceptance Criteria |
| --- | --- | --- | --- | --- |
| EVID-URS-001 | The Evidence Ledger shall record requirements, tickets, agent outputs, code changes, tests, reviews, approvals, and releases. | Must | Inspection | Accepted work has an evidence record with required metadata. |
| EVID-URS-002 | The Evidence Ledger shall include actor identity, actor type, timestamp, ticket ID, requirement ID, artifact references, and result status. | Must | Inspection | Sample evidence records include required fields. |
| EVID-URS-003 | The Evidence Ledger shall support tamper-evident hash chaining or equivalent integrity protection. | Should | Test | Changing a prior record invalidates subsequent hash verification or integrity check. |
| EVID-URS-004 | The Evidence Ledger shall store hashes or references for prompts, outputs, diffs, test logs, and approval records where feasible. | Should | Inspection | Evidence records include artifact hash/reference fields. |
| EVID-URS-005 | The Evidence Ledger shall support evidence completeness scoring for gate decisions. | Must | Demonstration | Gate cannot pass when required evidence is missing. |
| EVID-URS-006 | The Evidence Ledger shall generate release evidence bundles. | Should | Review | Bundle includes requirements, tests, risks, approvals, release notes, and known limitations. |

## Traceability expectation
Each requirement in this URS shall trace to one or more design items, tickets, tests, evidence records, and release decisions before acceptance.

## Standard verification expectation
Every requirement shall be verifiable by review, inspection, automated test, security test, architecture scan, workflow demonstration, evidence-ledger record, or formal approval, as specified.

## Anti-hallucination rule
If an agent cannot cite an approved source-of-truth artifact, test result, code diff, or evidence record, the statement shall be marked as an assumption and shall not be used for release acceptance.


---

# 07 Dependency Ledger URS

**Document status:** Controlled Draft - Baseline Candidate  
**Version:** v0.9  
**Date:** 2026-05-02  
**Document type:** URS  

## Scope
This URS defines how dependencies are mapped, protected, and impact-assessed.

## Operating principle
The ledger prevents agents from breaking upstream/downstream dependencies silently.

## Formal requirements
| Req ID | Requirement | Priority | Verification | Acceptance Criteria |
| --- | --- | --- | --- | --- |
| DEP-URS-001 | The Dependency Ledger shall map business objectives to requirements, design, tickets, code, tests, evidence, and release decisions. | Must | Review | Trace links exist across lifecycle artifacts. |
| DEP-URS-002 | The Dependency Ledger shall identify prerequisite, impacted, blocked, and downstream items for each ticket. | Must | Inspection | Ticket shows dependencies and impact analysis. |
| DEP-URS-003 | The Dependency Ledger shall block work that depends on missing or rejected prerequisite decisions. | Must | Demonstration | Dependent ticket cannot proceed until prerequisite is accepted. |
| DEP-URS-004 | The Dependency Ledger shall support circular dependency detection in planning and design dependencies. | Should | Test | Circular dependency fixture is detected and flagged. |
| DEP-URS-005 | The Dependency Ledger shall support change impact assessment before modifying approved requirements, architecture, or components. | Must | Review | Change record lists impacted artifacts and required re-verification. |

## Traceability expectation
Each requirement in this URS shall trace to one or more design items, tickets, tests, evidence records, and release decisions before acceptance.

## Standard verification expectation
Every requirement shall be verifiable by review, inspection, automated test, security test, architecture scan, workflow demonstration, evidence-ledger record, or formal approval, as specified.

## Anti-hallucination rule
If an agent cannot cite an approved source-of-truth artifact, test result, code diff, or evidence record, the statement shall be marked as an assumption and shall not be used for release acceptance.


---

# 08 Decision Challenge URS

**Document status:** Controlled Draft - Baseline Candidate  
**Version:** v0.9  
**Date:** 2026-05-02  
**Document type:** URS  

## Scope
This URS defines confidence-gated adversarial review of high-impact decisions.

## Operating principle
The Decision Challenger Agent reduces overconfidence, hallucination, and unsupported decisions.

## Formal requirements
| Req ID | Requirement | Priority | Verification | Acceptance Criteria |
| --- | --- | --- | --- | --- |
| DCH-URS-001 | The factory shall require adversarial Decision Challenge Review for high-impact decisions. | Must | Review | Challenge record exists for high-impact decisions. |
| DCH-URS-002 | The Decision Challenger Agent shall identify unsupported assumptions, missing evidence, hidden dependencies, safer alternatives, and residual risks. | Must | Inspection | Challenge output includes challenge questions and findings. |
| DCH-URS-003 | The factory shall assign confidence score, evidence completeness score, and residual risk rating to challenged decisions. | Must | Review | Decision record contains all three scores/ratings. |
| DCH-URS-004 | The factory shall reject or escalate decisions with unresolved critical risk or insufficient evidence. | Must | Demonstration | Critical-risk decision cannot be accepted without mitigation or committee approval. |
| DCH-URS-005 | The factory shall apply challenge review proportionally and avoid over-challenging low-risk mechanical tasks. | Should | Review | Challenge trigger rationale is recorded. |

## Traceability expectation
Each requirement in this URS shall trace to one or more design items, tickets, tests, evidence records, and release decisions before acceptance.

## Standard verification expectation
Every requirement shall be verifiable by review, inspection, automated test, security test, architecture scan, workflow demonstration, evidence-ledger record, or formal approval, as specified.

## Anti-hallucination rule
If an agent cannot cite an approved source-of-truth artifact, test result, code diff, or evidence record, the statement shall be marked as an assumption and shall not be used for release acceptance.


---

# 09 GxP Documentation Engine URS

**Document status:** Controlled Draft - Baseline Candidate  
**Version:** v0.9  
**Date:** 2026-05-02  
**Document type:** URS  

## Scope
This URS defines optional GxP-capable documentation generation using intended-use and risk-based profiles.

## Operating principle
The engine supports vendor validation packages and customer lean validation kits without over-documentation.

## Documentation profiles
- Profile 0: Non-GxP enterprise product.
- Profile 1: Low-risk / indirect GxP support.
- Profile 2: GAMP Category 3 style lean package.
- Profile 3: GAMP Category 4 style configured SaaS package.
- Profile 4: GAMP Category 5 style custom/direct-impact package.

## Formal requirements
| Req ID | Requirement | Priority | Verification | Acceptance Criteria |
| --- | --- | --- | --- | --- |
| GXP-URS-001 | The GxP Documentation Engine shall perform validation triage based on intended use, GxP impact, Part 11 relevance, data integrity risk, and customer SOP expectations. | Must | Review | Triage record is complete before GxP package generation. |
| GXP-URS-002 | The GxP Documentation Engine shall select a risk-based documentation profile rather than generating maximum documentation by default. | Must | Demonstration | Low-risk scenario receives lean package; high-risk scenario receives expanded package. |
| GXP-URS-003 | The GxP Documentation Engine shall support vendor validation package generation where applicable. | Should | Review | Package includes supplier evidence, requirements, risk assessment, test summary, release notes, and validation summary as justified. |
| GXP-URS-004 | The GxP Documentation Engine shall support customer lean validation kit generation. | Should | Review | Kit includes intended-use assessment, supplier assessment checklist, UAT templates, SOP mapping, and acceptance templates as justified. |
| GXP-URS-005 | The GxP Documentation Engine shall include supplier/customer responsibility matrix for regulated use cases. | Must | Inspection | Matrix clearly separates vendor-provided evidence from customer-owned validation activities. |
| GXP-URS-006 | The GxP Documentation Engine shall prevent unsupported compliance claims such as automatic validated status or certification. | Must | Review | Generated documents include appropriate limitation and customer responsibility language. |

## Traceability expectation
Each requirement in this URS shall trace to one or more design items, tickets, tests, evidence records, and release decisions before acceptance.

## Standard verification expectation
Every requirement shall be verifiable by review, inspection, automated test, security test, architecture scan, workflow demonstration, evidence-ledger record, or formal approval, as specified.

## Anti-hallucination rule
If an agent cannot cite an approved source-of-truth artifact, test result, code diff, or evidence record, the statement shall be marked as an assumption and shall not be used for release acceptance.


---

# 10 Security and Compliance URS

**Document status:** Controlled Draft - Baseline Candidate  
**Version:** v0.9  
**Date:** 2026-05-02  
**Document type:** URS  

## Scope
This URS defines security, privacy, compliance-readiness, tenant isolation, secrets, and auditability requirements.

## Operating principle
Security is a gate, not an afterthought.

## Formal requirements
| Req ID | Requirement | Priority | Verification | Acceptance Criteria |
| --- | --- | --- | --- | --- |
| SEC-URS-001 | The Security Agent shall verify secrets are not committed and service-role or privileged keys are never exposed to frontend code. | Must | Test | Secret scan passes and no privileged key appears in client bundle/source. |
| SEC-URS-002 | The factory shall require tenant isolation controls for multi-tenant products. | Must | Test | RLS/adversarial tests prove cross-tenant access is blocked. |
| SEC-URS-003 | The factory shall require role/permission review for access to sensitive actions and data. | Must | Review | Permission matrix exists and is linked to tests where applicable. |
| SEC-URS-004 | The factory shall require auditability for security-sensitive mutations. | Must | Inspection | Security-sensitive create/update/delete actions write audit/evidence records. |
| SEC-URS-005 | The factory shall support security standards alignment planning using an approved framework such as NIST CSF/ISO 27001 readiness. | Should | Review | Security control roadmap maps to governance/protect/detect/respond/recover type functions. |
| SEC-URS-006 | The factory shall require security review for import, file upload, authentication, authorization, and release changes. | Must | Review | Security review record exists for security-sensitive tickets. |

## Traceability expectation
Each requirement in this URS shall trace to one or more design items, tickets, tests, evidence records, and release decisions before acceptance.

## Standard verification expectation
Every requirement shall be verifiable by review, inspection, automated test, security test, architecture scan, workflow demonstration, evidence-ledger record, or formal approval, as specified.

## Anti-hallucination rule
If an agent cannot cite an approved source-of-truth artifact, test result, code diff, or evidence record, the statement shall be marked as an assumption and shall not be used for release acceptance.


---

# 11 Import and Integration URS

**Document status:** Controlled Draft - Baseline Candidate  
**Version:** v0.9  
**Date:** 2026-05-02  
**Document type:** URS  

## Scope
This URS defines safe ingestion of exports from external tools and future integration connectors.

## Operating principle
External tools must map into the canonical model through adapters, validation, preview, and service-based apply flow.

## Formal requirements
| Req ID | Requirement | Priority | Verification | Acceptance Criteria |
| --- | --- | --- | --- | --- |
| IMP-URS-001 | The Import Engine shall use the flow parser -> canonical draft -> validation -> preview -> apply via services. | Must | Demonstration | Importer output creates draft and cannot directly write database records. |
| IMP-URS-002 | The Import Engine shall support generic CSV/Excel import with manual and suggested mapping. | Should | Test | CSV/Excel fixture imports into canonical draft with mapping warnings. |
| IMP-URS-003 | The Import Engine shall support future Smartsheet export and Microsoft Project XML profiles through replaceable adapters. | Should | Review | Importer architecture defines profile-specific adapters and shared canonical model. |
| IMP-URS-004 | The Import Engine shall detect validation issues such as missing owners, invalid dates, duplicate IDs, unmapped columns, circular dependencies, and unsafe overwrites. | Must | Test | Bad fixture produces warnings/rejections without corrupting project state. |
| IMP-URS-005 | The Import Engine shall require user review before applying imported data to the product database. | Must | Demonstration | Import preview must be accepted before apply service runs. |
| IMP-URS-006 | The Import Engine shall record import evidence including source file hash, mapping version, validation warnings, accepted/rejected rows, and user approval. | Should | Inspection | Import evidence record contains required fields. |

## Traceability expectation
Each requirement in this URS shall trace to one or more design items, tickets, tests, evidence records, and release decisions before acceptance.

## Standard verification expectation
Every requirement shall be verifiable by review, inspection, automated test, security test, architecture scan, workflow demonstration, evidence-ledger record, or formal approval, as specified.

## Anti-hallucination rule
If an agent cannot cite an approved source-of-truth artifact, test result, code diff, or evidence record, the statement shall be marked as an assumption and shall not be used for release acceptance.


---

# 12 V-Model Component Lifecycle SOP

**Document status:** Controlled Draft - Baseline Candidate  
**Version:** v0.9  
**Date:** 2026-05-02  
**Document type:** SOP  

## Purpose
This SOP defines how each factory component is developed and verified using a component-level V-Model.

## Component V-Model
1. Component Charter.
2. Component URS.
3. Functional / Technical Design.
4. Build Tickets.
5. Implementation.
6. Unit / Integration / Acceptance Verification.
7. Evidence Ledger Record.
8. Release Approval.
9. Learning Feedback.

## Formal SOP requirements
| Req ID | Requirement | Priority | Verification | Acceptance Criteria |
| --- | --- | --- | --- | --- |
| VM-SOP-001 | Each factory component shall follow component-level V-Model lifecycle. | Must | Review | Component has charter, URS, design, tickets, verification, evidence, and release criteria. |
| VM-SOP-002 | Component requirements shall be verified by review, test, inspection, demonstration, or evidence record. | Must | Review | Traceability matrix includes verification method for each component requirement. |
| VM-SOP-003 | Component release shall not occur until verification evidence is complete and approved. | Must | Inspection | Release record links to completed verification evidence. |
| VM-SOP-004 | Component defects shall update learning log and, where needed, tests or SOP rules. | Should | Review | Defect closure includes recurrence-prevention action. |


## Standard verification expectation
Every requirement shall be verifiable by review, inspection, automated test, security test, architecture scan, workflow demonstration, evidence-ledger record, or formal approval, as specified.

## Anti-hallucination rule
If an agent cannot cite an approved source-of-truth artifact, test result, code diff, or evidence record, the statement shall be marked as an assumption and shall not be used for release acceptance.


---

# 13 Agent Operating SOP

**Document status:** Controlled Draft - Baseline Candidate  
**Version:** v0.9  
**Date:** 2026-05-02  
**Document type:** SOP  

## Purpose
This SOP defines how agents receive work, use source truth, execute, stop, hand off, and record evidence.

## Procedure
1. Read source-of-truth files.
2. Confirm ticket scope and dependencies.
3. Confirm allowed files/tools.
4. Execute only assigned task.
5. Run required tests.
6. Produce Agent Evidence Record.
7. Hand off to reviewer agents.
8. Stop when blockers or forbidden assumptions appear.

## Formal SOP requirements
| Req ID | Requirement | Priority | Verification | Acceptance Criteria |
| --- | --- | --- | --- | --- |
| AOP-SOP-001 | Agents shall begin work only after reading applicable source-of-truth documents and assigned ticket. | Must | Review | Agent output lists source files used. |
| AOP-SOP-002 | Agents shall stop and raise a blocker when required inputs, dependencies, permissions, or evidence are missing. | Must | Demonstration | Blocker record is created instead of assumed implementation. |
| AOP-SOP-003 | Builder agents shall hand off to QA/Security/Architecture reviewers before acceptance. | Must | Inspection | PR/evidence record shows independent review. |
| AOP-SOP-004 | Agents shall not expand scope without approved change decision. | Must | Review | Scope expansion is rejected or traced to approved change. |


## Standard verification expectation
Every requirement shall be verifiable by review, inspection, automated test, security test, architecture scan, workflow demonstration, evidence-ledger record, or formal approval, as specified.

## Anti-hallucination rule
If an agent cannot cite an approved source-of-truth artifact, test result, code diff, or evidence record, the statement shall be marked as an assumption and shall not be used for release acceptance.


---

# 14 Release and Validation SOP

**Document status:** Controlled Draft - Baseline Candidate  
**Version:** v0.9  
**Date:** 2026-05-02  
**Document type:** SOP  

## Purpose
This SOP defines how releases are packaged, reviewed, evidenced, validated where applicable, and approved.

## Procedure
1. Confirm release scope.
2. Confirm all linked tickets are accepted.
3. Confirm test/security/evidence gates.
4. Confirm documentation profile if GxP mode is active.
5. Prepare release evidence bundle.
6. Steering Committee approves/rejects release.
7. Capture release decision and learning entries.

## Formal SOP requirements
| Req ID | Requirement | Priority | Verification | Acceptance Criteria |
| --- | --- | --- | --- | --- |
| REL-SOP-001 | Every release shall have a release decision record. | Must | Review | Release decision includes scope, evidence summary, risks, approvals, and known limitations. |
| REL-SOP-002 | Every release shall include functional, architecture, security, and evidence gate results. | Must | Inspection | Release bundle contains gate outputs. |
| REL-SOP-003 | GxP-mode releases shall include the selected validation documentation package or justification for exclusion. | Must | Review | Release bundle includes GxP documentation package or triage rationale. |
| REL-SOP-004 | Every release shall have rollback or recovery instructions appropriate to the product. | Should | Review | Release package includes rollback/recovery guidance. |


## Standard verification expectation
Every requirement shall be verifiable by review, inspection, automated test, security test, architecture scan, workflow demonstration, evidence-ledger record, or formal approval, as specified.

## Anti-hallucination rule
If an agent cannot cite an approved source-of-truth artifact, test result, code diff, or evidence record, the statement shall be marked as an assumption and shall not be used for release acceptance.


---

# 15 Templates Pack

**Document status:** Controlled Draft - Baseline Candidate  
**Version:** v0.9  
**Date:** 2026-05-02  
**Document type:** Templates  

## Product Build Charter template
| Field | Required | Notes |
|---|---|---|
| Product name | Yes | Working name allowed. |
| Business objective | Yes | Must state business outcome. |
| Target users | Yes | Personas and roles. |
| Intended use | Yes | Required for GxP/security triage. |
| Non-goals | Yes | Prevents scope drift. |
| Data sensitivity | Yes | Public/internal/confidential/regulated. |
| Security level | Yes | Low/medium/high. |
| GxP mode | Yes | No / To be assessed / Yes. |
| Import/integration needs | Conditional | Required if external data is involved. |
| Approval gates | Yes | Human/Steering Committee approvals. |

## Ticket template
| Field | Required |
|---|---|
| Ticket ID | Yes |
| Objective | Yes |
| Business reason | Yes |
| Linked requirement ID | Yes |
| Allowed files/folders | Yes |
| Architecture rules | Yes |
| Required tests | Yes |
| Security impact | Yes |
| Acceptance criteria | Yes |
| Out of scope | Yes |

## Agent Evidence Record template
| Field | Required |
|---|---|
| Agent name and role | Yes |
| Ticket ID | Yes |
| Source files used | Yes |
| Assumptions | Yes, if any |
| Files changed | Yes |
| Tests run and results | Yes |
| Evidence links/hashes | Yes |
| Risks and limitations | Yes |
| Recommendation | Yes |

## Decision Challenge Record template
| Field | Required |
|---|---|
| Decision ID | Yes |
| Decision type | Yes |
| Proposal summary | Yes |
| Challenger findings | Yes |
| Unsupported assumptions | Yes |
| Evidence completeness score | Yes |
| Confidence score | Yes |
| Residual risk | Yes |
| Recommendation | Yes |

## GxP triage template
| Field | Required |
|---|---|
| Intended use | Yes |
| GxP process involvement | Yes |
| System of record? | Yes |
| Regulated records? | Yes |
| E-signature? | Yes |
| GAMP-style category/profile | Yes / To be assessed |
| Documentation profile selected | Yes |
| Rationale | Yes |

## Release checklist template
- All linked requirements approved.
- All tickets accepted.
- Functional tests passed.
- Architecture scan passed.
- Security gate passed.
- Evidence completeness confirmed.
- Decision challenge completed where required.
- GxP package included or excluded with rationale.
- Known limitations recorded.
- Rollback/recovery instructions available.


## Standard verification expectation
Every requirement shall be verifiable by review, inspection, automated test, security test, architecture scan, workflow demonstration, evidence-ledger record, or formal approval, as specified.

## Anti-hallucination rule
If an agent cannot cite an approved source-of-truth artifact, test result, code diff, or evidence record, the statement shall be marked as an assumption and shall not be used for release acceptance.


---

# 16 Agent Requirements Appendix

**Document status:** Controlled Draft - Baseline Candidate  
**Version:** v0.9  
**Date:** 2026-05-02  
**Document type:** Appendix / Agent URS Sheets  

## Purpose
This appendix defines detailed requirements for each expert agent in the factory. Each agent may use task-focused subagents only under scoped assignment and evidence obligations.

## Master Moderator Agent
**Mission:** Orchestrates source-grounded work, decomposes scope into tickets, assigns agents, demands evidence, runs challenge routing, and recommends accept/revise/reject/escalate.

| Area | Requirement |
| --- | --- |
| Required expertise | Expert-level reasoning in its assigned domain; must use source-of-truth documents rather than inventing rules. |
| Input contract | Product Build Charter; source-of-truth docs; dependency ledger; ticket backlog; gate results. |
| Output contract | Moderation plan; ticket assignments; decision records; escalation records. |
| KPIs | % tickets source-linked; unresolved blockers detected early; accepted PRs without scope drift; gate completion rate. |
| Allowed subagents/workers | May use planning worker, dependency-check worker, evidence completeness worker. |
| Hard stops | Stop if source truth is missing, dependencies are unresolved, tests cannot be run, evidence is incomplete, or a forbidden assumption is required. |
| Evidence obligation | Must produce an Agent Evidence Record for any accepted output. |

## Product Strategy / Market Agent
**Mission:** Ensures each product and feature solves a real buyer/user pain and does not become generic software without market purpose.

| Area | Requirement |
| --- | --- |
| Required expertise | Expert-level reasoning in its assigned domain; must use source-of-truth documents rather than inventing rules. |
| Input contract | Product thesis; personas; competitor notes; customer feedback; intake charter. |
| Output contract | Product requirement rationale; prioritization; business acceptance criteria; market risks. |
| KPIs | % features linked to user pain; rejected low-value features; design partner feedback incorporation. |
| Allowed subagents/workers | May use competitor research worker, pricing hypothesis worker, persona refinement worker. |
| Hard stops | Stop if source truth is missing, dependencies are unresolved, tests cannot be run, evidence is incomplete, or a forbidden assumption is required. |
| Evidence obligation | Must produce an Agent Evidence Record for any accepted output. |

## Architecture & Data Governance Agent
**Mission:** Protects modular architecture, canonical data model, ports/adapters, dependency direction, and replaceability.

| Area | Requirement |
| --- | --- |
| Required expertise | Expert-level reasoning in its assigned domain; must use source-of-truth documents rather than inventing rules. |
| Input contract | Architecture kernel; data model; import architecture; existing code; tickets. |
| Output contract | Architecture decisions; ADRs; data model changes; architecture review record. |
| KPIs | Boundary violations caught; circular dependency prevention; ADR completeness; architecture scan pass rate. |
| Allowed subagents/workers | May use ADR writer, schema reviewer, dependency graph worker. |
| Hard stops | Stop if source truth is missing, dependencies are unresolved, tests cannot be run, evidence is incomplete, or a forbidden assumption is required. |
| Evidence obligation | Must produce an Agent Evidence Record for any accepted output. |

## Backend / Platform Agent
**Mission:** Builds backend foundation including auth, tenants/workspaces, repositories, APIs, RLS, audit events, and server-side services.

| Area | Requirement |
| --- | --- |
| Required expertise | Expert-level reasoning in its assigned domain; must use source-of-truth documents rather than inventing rules. |
| Input contract | Data model; security model; tickets; repository patterns; environment config. |
| Output contract | Backend code; migrations; repositories; API/server actions; backend tests. |
| KPIs | RLS pass rate; API test pass rate; zero secrets exposure; mutation audit coverage. |
| Allowed subagents/workers | May use migration worker, repository worker, RLS policy worker. |
| Hard stops | Stop if source truth is missing, dependencies are unresolved, tests cannot be run, evidence is incomplete, or a forbidden assumption is required. |
| Evidence obligation | Must produce an Agent Evidence Record for any accepted output. |

## Frontend UX Agent
**Mission:** Builds user flows, app shell, role-aware screens, dashboards, grids, reports, and accessible UI.

| Area | Requirement |
| --- | --- |
| Required expertise | Expert-level reasoning in its assigned domain; must use source-of-truth documents rather than inventing rules. |
| Input contract | UX requirements; product charter; services/API contracts; design rules. |
| Output contract | UI components; user-flow implementation; screenshots; UX test evidence. |
| KPIs | E2E pass rate; task completion success; console-error count; accessibility baseline pass. |
| Allowed subagents/workers | May use component worker, Playwright scenario worker, copy/empty-state worker. |
| Hard stops | Stop if source truth is missing, dependencies are unresolved, tests cannot be run, evidence is incomplete, or a forbidden assumption is required. |
| Evidence obligation | Must produce an Agent Evidence Record for any accepted output. |

## Import / Integration Agent
**Mission:** Builds safe external data ingestion and replaceable connector architecture.

| Area | Requirement |
| --- | --- |
| Required expertise | Expert-level reasoning in its assigned domain; must use source-of-truth documents rather than inventing rules. |
| Input contract | Import architecture; canonical model; source format samples; security rules. |
| Output contract | Importer adapters; canonical drafts; mapping/preview logic; import validation tests. |
| KPIs | Fixture pass rate; unsafe import rejection rate; mapping accuracy; zero direct DB writes. |
| Allowed subagents/workers | May use CSV parser worker, Smartsheet mapping worker, MS Project XML worker, validation worker. |
| Hard stops | Stop if source truth is missing, dependencies are unresolved, tests cannot be run, evidence is incomplete, or a forbidden assumption is required. |
| Evidence obligation | Must produce an Agent Evidence Record for any accepted output. |

## QA / Test Agent
**Mission:** Proves the system works and prevents regressions across unit, integration, architecture, security, and E2E tests.

| Area | Requirement |
| --- | --- |
| Required expertise | Expert-level reasoning in its assigned domain; must use source-of-truth documents rather than inventing rules. |
| Input contract | Tickets; requirements; code diffs; test strategy; risk areas. |
| Output contract | Test suites; test logs; defect reports; coverage of critical scenarios. |
| KPIs | Defects caught before merge; critical-flow coverage; regression rate; test pass rate. |
| Allowed subagents/workers | May use unit-test worker, E2E worker, architecture-scan worker, fixture-test worker. |
| Hard stops | Stop if source truth is missing, dependencies are unresolved, tests cannot be run, evidence is incomplete, or a forbidden assumption is required. |
| Evidence obligation | Must produce an Agent Evidence Record for any accepted output. |

## Security / Compliance Agent
**Mission:** Protects trust through auth, authorization, tenant isolation, secrets control, auditability, data protection, and compliance readiness.

| Area | Requirement |
| --- | --- |
| Required expertise | Expert-level reasoning in its assigned domain; must use source-of-truth documents rather than inventing rules. |
| Input contract | Security model; data model; code diff; deployment config; GxP triage. |
| Output contract | Security review; risk findings; required mitigations; security test evidence. |
| KPIs | Zero cross-tenant leaks; no secret exposure; security gate pass rate; audit coverage. |
| Allowed subagents/workers | May use secret-scan worker, RLS adversary worker, dependency-vulnerability worker. |
| Hard stops | Stop if source truth is missing, dependencies are unresolved, tests cannot be run, evidence is incomplete, or a forbidden assumption is required. |
| Evidence obligation | Must produce an Agent Evidence Record for any accepted output. |

## GxP Documentation / Validation Agent
**Mission:** Selects lean documentation profile and generates vendor validation package/customer lean validation kit where justified.

| Area | Requirement |
| --- | --- |
| Required expertise | Expert-level reasoning in its assigned domain; must use source-of-truth documents rather than inventing rules. |
| Input contract | Intended use; GxP triage; GAMP-style category; customer SOP expectations; evidence. |
| Output contract | GxP impact assessment; documentation profile; vendor package; customer kit; responsibility matrix. |
| KPIs | Over-documentation avoided; profile justified; traceability completeness; customer responsibility clarity. |
| Allowed subagents/workers | May use validation template worker, traceability worker, Part 11 assessment worker. |
| Hard stops | Stop if source truth is missing, dependencies are unresolved, tests cannot be run, evidence is incomplete, or a forbidden assumption is required. |
| Evidence obligation | Must produce an Agent Evidence Record for any accepted output. |

## Evidence Ledger Agent
**Mission:** Ensures accepted work has complete, tamper-evident, source-linked evidence.

| Area | Requirement |
| --- | --- |
| Required expertise | Expert-level reasoning in its assigned domain; must use source-of-truth documents rather than inventing rules. |
| Input contract | Agent outputs; test logs; PRs; approvals; artifacts; hashes. |
| Output contract | Evidence records; hash-chain records; evidence completeness score; release evidence bundle. |
| KPIs | Evidence completeness rate; hash verification pass rate; missing-evidence rejection count. |
| Allowed subagents/workers | May use hash worker, evidence completeness worker, release bundle worker. |
| Hard stops | Stop if source truth is missing, dependencies are unresolved, tests cannot be run, evidence is incomplete, or a forbidden assumption is required. |
| Evidence obligation | Must produce an Agent Evidence Record for any accepted output. |

## Dependency Ledger Agent
**Mission:** Protects dependencies across requirements, designs, tickets, code, tests, and releases.

| Area | Requirement |
| --- | --- |
| Required expertise | Expert-level reasoning in its assigned domain; must use source-of-truth documents rather than inventing rules. |
| Input contract | Requirement set; ticket backlog; design records; code impact; test coverage. |
| Output contract | Dependency map; impact assessment; blocked dependency alerts; traceability updates. |
| KPIs | Missing dependencies detected; change impact accuracy; circular dependency prevention. |
| Allowed subagents/workers | May use dependency graph worker, traceability matrix worker. |
| Hard stops | Stop if source truth is missing, dependencies are unresolved, tests cannot be run, evidence is incomplete, or a forbidden assumption is required. |
| Evidence obligation | Must produce an Agent Evidence Record for any accepted output. |

## Decision Challenger Agent
**Mission:** Challenges high-impact decisions to reduce overconfidence, hallucination, security gaps, and product-value mistakes.

| Area | Requirement |
| --- | --- |
| Required expertise | Expert-level reasoning in its assigned domain; must use source-of-truth documents rather than inventing rules. |
| Input contract | Proposal; evidence; requirements; risk log; alternatives. |
| Output contract | Challenge record; confidence score; evidence score; residual risk; accept/revise/reject recommendation. |
| KPIs | Critical risks found; unsupported assumptions detected; false acceptance prevented. |
| Allowed subagents/workers | May use devil-advocate worker, security challenger, product-value challenger. |
| Hard stops | Stop if source truth is missing, dependencies are unresolved, tests cannot be run, evidence is incomplete, or a forbidden assumption is required. |
| Evidence obligation | Must produce an Agent Evidence Record for any accepted output. |

## DevOps / Release Agent
**Mission:** Makes deployment repeatable, safe, observable, and recoverable.

| Area | Requirement |
| --- | --- |
| Required expertise | Expert-level reasoning in its assigned domain; must use source-of-truth documents rather than inventing rules. |
| Input contract | Release scope; environment config; deployment guide; test results. |
| Output contract | CI/CD config; deployment instructions; smoke tests; rollback guide; release notes. |
| KPIs | Deployment success; rollback readiness; smoke-test pass rate; environment reproducibility. |
| Allowed subagents/workers | May use CI worker, deployment-doc worker, smoke-test worker. |
| Hard stops | Stop if source truth is missing, dependencies are unresolved, tests cannot be run, evidence is incomplete, or a forbidden assumption is required. |
| Evidence obligation | Must produce an Agent Evidence Record for any accepted output. |

## Learning / Memory Agent
**Mission:** Ensures defects, rejected outputs, and decisions improve the factory rules and reduce repeated mistakes.

| Area | Requirement |
| --- | --- |
| Required expertise | Expert-level reasoning in its assigned domain; must use source-of-truth documents rather than inventing rules. |
| Input contract | Defect logs; rejected PR reasons; lessons learned; agent KPIs. |
| Output contract | Learning log entries; updated rules; updated prompts; new tests/checklists. |
| KPIs | Repeated-error reduction; learning actions closed; rules updated after defects. |
| Allowed subagents/workers | May use root-cause worker, prompt-rule worker, checklist-update worker. |
| Hard stops | Stop if source truth is missing, dependencies are unresolved, tests cannot be run, evidence is incomplete, or a forbidden assumption is required. |
| Evidence obligation | Must produce an Agent Evidence Record for any accepted output. |


## Standard verification expectation
Every requirement shall be verifiable by review, inspection, automated test, security test, architecture scan, workflow demonstration, evidence-ledger record, or formal approval, as specified.

## Anti-hallucination rule
If an agent cannot cite an approved source-of-truth artifact, test result, code diff, or evidence record, the statement shall be marked as an assumption and shall not be used for release acceptance.


---

# 17 Baseline Traceability Matrix

**Document status:** Controlled Draft - Baseline Candidate  
**Version:** v0.9  
**Date:** 2026-05-02  
**Document type:** Traceability Matrix  

## Purpose
This matrix links key factory requirements to design controls, agents, verification methods, and evidence records. It is the starting traceability matrix for the v0.9 controlled draft.

| Req ID | Source document | Primary owner | Verification | Evidence record |
| --- | --- | --- | --- | --- |
| FP-URS-001 | 01_FACTORY_PLATFORM_URS | Master Moderator / Steering Committee | Review | Evidence Ledger record / review record / test result as applicable |
| FP-URS-002 | 01_FACTORY_PLATFORM_URS | Master Moderator / Steering Committee | Demonstration | Evidence Ledger record / review record / test result as applicable |
| FP-URS-003 | 01_FACTORY_PLATFORM_URS | Master Moderator / Steering Committee | Inspection | Evidence Ledger record / review record / test result as applicable |
| FP-URS-004 | 01_FACTORY_PLATFORM_URS | Master Moderator / Steering Committee | Review | Evidence Ledger record / review record / test result as applicable |
| FP-URS-005 | 01_FACTORY_PLATFORM_URS | Master Moderator / Steering Committee | Review | Evidence Ledger record / review record / test result as applicable |
| FP-URS-006 | 01_FACTORY_PLATFORM_URS | Master Moderator / Steering Committee | Demonstration | Evidence Ledger record / review record / test result as applicable |
| FP-URS-007 | 01_FACTORY_PLATFORM_URS | Master Moderator / Steering Committee | Inspection | Evidence Ledger record / review record / test result as applicable |
| FP-URS-008 | 01_FACTORY_PLATFORM_URS | Master Moderator / Steering Committee | Review | Evidence Ledger record / review record / test result as applicable |
| FP-URS-009 | 01_FACTORY_PLATFORM_URS | Master Moderator / Steering Committee | Review | Evidence Ledger record / review record / test result as applicable |
| PBI-URS-001 | 02_PRODUCT_BUILD_INTAKE_URS | Product Agent / Master Moderator | Review | Evidence Ledger record / review record / test result as applicable |
| PBI-URS-002 | 02_PRODUCT_BUILD_INTAKE_URS | Product Agent / Master Moderator | Inspection | Evidence Ledger record / review record / test result as applicable |
| PBI-URS-003 | 02_PRODUCT_BUILD_INTAKE_URS | Product Agent / Master Moderator | Review | Evidence Ledger record / review record / test result as applicable |
| PBI-URS-004 | 02_PRODUCT_BUILD_INTAKE_URS | Product Agent / Master Moderator | Review | Evidence Ledger record / review record / test result as applicable |
| PBI-URS-005 | 02_PRODUCT_BUILD_INTAKE_URS | Product Agent / Master Moderator | Demonstration | Evidence Ledger record / review record / test result as applicable |
| PBI-URS-006 | 02_PRODUCT_BUILD_INTAKE_URS | Product Agent / Master Moderator | Review | Evidence Ledger record / review record / test result as applicable |
| AGT-URS-001 | 03_AGENT_MANAGEMENT_URS | Agent Management / Learning Agent | Review | Evidence Ledger record / review record / test result as applicable |
| AGT-URS-002 | 03_AGENT_MANAGEMENT_URS | Agent Management / Learning Agent | Inspection | Evidence Ledger record / review record / test result as applicable |
| AGT-URS-003 | 03_AGENT_MANAGEMENT_URS | Agent Management / Learning Agent | Review | Evidence Ledger record / review record / test result as applicable |
| AGT-URS-004 | 03_AGENT_MANAGEMENT_URS | Agent Management / Learning Agent | Review | Evidence Ledger record / review record / test result as applicable |
| AGT-URS-005 | 03_AGENT_MANAGEMENT_URS | Agent Management / Learning Agent | Review | Evidence Ledger record / review record / test result as applicable |
| AGT-URS-006 | 03_AGENT_MANAGEMENT_URS | Agent Management / Learning Agent | Demonstration | Evidence Ledger record / review record / test result as applicable |
| MM-URS-001 | 04_MASTER_MODERATOR_URS | Master Moderator | Review | Evidence Ledger record / review record / test result as applicable |
| MM-URS-002 | 04_MASTER_MODERATOR_URS | Master Moderator | Review | Evidence Ledger record / review record / test result as applicable |
| MM-URS-003 | 04_MASTER_MODERATOR_URS | Master Moderator | Review | Evidence Ledger record / review record / test result as applicable |
| MM-URS-004 | 04_MASTER_MODERATOR_URS | Master Moderator | Demonstration | Evidence Ledger record / review record / test result as applicable |
| MM-URS-005 | 04_MASTER_MODERATOR_URS | Master Moderator | Review | Evidence Ledger record / review record / test result as applicable |
| MM-URS-006 | 04_MASTER_MODERATOR_URS | Master Moderator | Inspection | Evidence Ledger record / review record / test result as applicable |
| SC-URS-001 | 05_STEERING_COMMITTEE_URS | Steering Committee | Review | Evidence Ledger record / review record / test result as applicable |
| SC-URS-002 | 05_STEERING_COMMITTEE_URS | Steering Committee | Inspection | Evidence Ledger record / review record / test result as applicable |
| SC-URS-003 | 05_STEERING_COMMITTEE_URS | Steering Committee | Review | Evidence Ledger record / review record / test result as applicable |
| SC-URS-004 | 05_STEERING_COMMITTEE_URS | Steering Committee | Inspection | Evidence Ledger record / review record / test result as applicable |
| SC-URS-005 | 05_STEERING_COMMITTEE_URS | Steering Committee | Review | Evidence Ledger record / review record / test result as applicable |
| EVID-URS-001 | 06_EVIDENCE_LEDGER_URS | Evidence Ledger Agent | Inspection | Evidence Ledger record / review record / test result as applicable |
| EVID-URS-002 | 06_EVIDENCE_LEDGER_URS | Evidence Ledger Agent | Inspection | Evidence Ledger record / review record / test result as applicable |
| EVID-URS-003 | 06_EVIDENCE_LEDGER_URS | Evidence Ledger Agent | Test | Evidence Ledger record / review record / test result as applicable |
| EVID-URS-004 | 06_EVIDENCE_LEDGER_URS | Evidence Ledger Agent | Inspection | Evidence Ledger record / review record / test result as applicable |
| EVID-URS-005 | 06_EVIDENCE_LEDGER_URS | Evidence Ledger Agent | Demonstration | Evidence Ledger record / review record / test result as applicable |
| EVID-URS-006 | 06_EVIDENCE_LEDGER_URS | Evidence Ledger Agent | Review | Evidence Ledger record / review record / test result as applicable |
| DEP-URS-001 | 07_DEPENDENCY_LEDGER_URS | Dependency Ledger Agent | Review | Evidence Ledger record / review record / test result as applicable |
| DEP-URS-002 | 07_DEPENDENCY_LEDGER_URS | Dependency Ledger Agent | Inspection | Evidence Ledger record / review record / test result as applicable |
| DEP-URS-003 | 07_DEPENDENCY_LEDGER_URS | Dependency Ledger Agent | Demonstration | Evidence Ledger record / review record / test result as applicable |
| DEP-URS-004 | 07_DEPENDENCY_LEDGER_URS | Dependency Ledger Agent | Test | Evidence Ledger record / review record / test result as applicable |
| DEP-URS-005 | 07_DEPENDENCY_LEDGER_URS | Dependency Ledger Agent | Review | Evidence Ledger record / review record / test result as applicable |
| DCH-URS-001 | 08_DECISION_CHALLENGE_URS | Decision Challenger Agent | Review | Evidence Ledger record / review record / test result as applicable |
| DCH-URS-002 | 08_DECISION_CHALLENGE_URS | Decision Challenger Agent | Inspection | Evidence Ledger record / review record / test result as applicable |
| DCH-URS-003 | 08_DECISION_CHALLENGE_URS | Decision Challenger Agent | Review | Evidence Ledger record / review record / test result as applicable |
| DCH-URS-004 | 08_DECISION_CHALLENGE_URS | Decision Challenger Agent | Demonstration | Evidence Ledger record / review record / test result as applicable |
| DCH-URS-005 | 08_DECISION_CHALLENGE_URS | Decision Challenger Agent | Review | Evidence Ledger record / review record / test result as applicable |
| GXP-URS-001 | 09_GXP_DOCUMENTATION_ENGINE_URS | GxP Documentation Agent | Review | Evidence Ledger record / review record / test result as applicable |
| GXP-URS-002 | 09_GXP_DOCUMENTATION_ENGINE_URS | GxP Documentation Agent | Demonstration | Evidence Ledger record / review record / test result as applicable |
| GXP-URS-003 | 09_GXP_DOCUMENTATION_ENGINE_URS | GxP Documentation Agent | Review | Evidence Ledger record / review record / test result as applicable |
| GXP-URS-004 | 09_GXP_DOCUMENTATION_ENGINE_URS | GxP Documentation Agent | Review | Evidence Ledger record / review record / test result as applicable |
| GXP-URS-005 | 09_GXP_DOCUMENTATION_ENGINE_URS | GxP Documentation Agent | Inspection | Evidence Ledger record / review record / test result as applicable |
| GXP-URS-006 | 09_GXP_DOCUMENTATION_ENGINE_URS | GxP Documentation Agent | Review | Evidence Ledger record / review record / test result as applicable |
| SEC-URS-001 | 10_SECURITY_AND_COMPLIANCE_URS | Security / Compliance Agent | Test | Evidence Ledger record / review record / test result as applicable |
| SEC-URS-002 | 10_SECURITY_AND_COMPLIANCE_URS | Security / Compliance Agent | Test | Evidence Ledger record / review record / test result as applicable |
| SEC-URS-003 | 10_SECURITY_AND_COMPLIANCE_URS | Security / Compliance Agent | Review | Evidence Ledger record / review record / test result as applicable |
| SEC-URS-004 | 10_SECURITY_AND_COMPLIANCE_URS | Security / Compliance Agent | Inspection | Evidence Ledger record / review record / test result as applicable |
| SEC-URS-005 | 10_SECURITY_AND_COMPLIANCE_URS | Security / Compliance Agent | Review | Evidence Ledger record / review record / test result as applicable |
| SEC-URS-006 | 10_SECURITY_AND_COMPLIANCE_URS | Security / Compliance Agent | Review | Evidence Ledger record / review record / test result as applicable |
| IMP-URS-001 | 11_IMPORT_AND_INTEGRATION_URS | Import / Integration Agent | Demonstration | Evidence Ledger record / review record / test result as applicable |
| IMP-URS-002 | 11_IMPORT_AND_INTEGRATION_URS | Import / Integration Agent | Test | Evidence Ledger record / review record / test result as applicable |
| IMP-URS-003 | 11_IMPORT_AND_INTEGRATION_URS | Import / Integration Agent | Review | Evidence Ledger record / review record / test result as applicable |
| IMP-URS-004 | 11_IMPORT_AND_INTEGRATION_URS | Import / Integration Agent | Test | Evidence Ledger record / review record / test result as applicable |
| IMP-URS-005 | 11_IMPORT_AND_INTEGRATION_URS | Import / Integration Agent | Demonstration | Evidence Ledger record / review record / test result as applicable |
| IMP-URS-006 | 11_IMPORT_AND_INTEGRATION_URS | Import / Integration Agent | Inspection | Evidence Ledger record / review record / test result as applicable |

## Use rule
No requirement may be marked accepted until the traceability row links to a design artifact, implementation ticket, verification evidence, and acceptance decision.

## Standard verification expectation
Every requirement shall be verifiable by review, inspection, automated test, security test, architecture scan, workflow demonstration, evidence-ledger record, or formal approval, as specified.

## Anti-hallucination rule
If an agent cannot cite an approved source-of-truth artifact, test result, code diff, or evidence record, the statement shall be marked as an assumption and shall not be used for release acceptance.

---

# 18 Architecture Fitness Functions URS

**Document status:** Controlled Draft - Baseline Candidate  
**Version:** v0.9  
**Date:** 2026-05-02  
**Document type:** URS  

## Scope
This URS defines executable architecture controls, called fitness functions, that continuously verify whether the factory and generated products still conform to approved architecture rules.

## Operating principle
Architecture must be tested continuously. Human review is necessary but not sufficient. The factory shall convert critical architecture rules into automated checks wherever practical.

## Formal requirements
| Req ID | Requirement | Priority | Verification | Acceptance Criteria |
| --- | --- | --- | --- | --- |
| FIT-URS-001 | The factory shall maintain a version-controlled Architecture Fitness Function catalog. | Must | Inspection | Catalog exists and lists each fitness function, owner, trigger, scope, pass/fail rule, and evidence output. |
| FIT-URS-002 | The factory shall include a fitness function that detects prohibited UI-to-database, UI-to-adapter, and UI-to-repository dependencies. | Must | Automated test | Build fails when UI imports persistence, adapter, repository, or secret-handling modules directly. |
| FIT-URS-003 | The factory shall include a fitness function that detects domain-layer I/O violations. | Must | Automated test | Build fails when domain code imports UI, database, network, filesystem, browser storage, or environment-secret modules. |
| FIT-URS-004 | The factory shall include a fitness function that detects importer direct-write violations. | Must | Automated test | Importers may only create canonical import drafts and validation records; direct database mutation from importer code fails the scan. |
| FIT-URS-005 | The factory shall include a fitness function that verifies tenant-scoped data structures include tenant/workspace isolation fields where applicable. | Must | Inspection / automated schema test | Tenant/project scoped tables or schemas are flagged when isolation fields are missing. |
| FIT-URS-006 | The factory shall include a fitness function that checks whether mutation paths create or reference an audit/evidence event. | Must | Automated test / review | Critical create, update, delete, import-apply, approval, and release paths are traced to evidence/audit records. |
| FIT-URS-007 | The factory shall record fitness function results in the Evidence Ledger. | Must | Inspection | Each release candidate includes a fitness function evidence record with timestamp, run ID, result, and failing rule list if applicable. |
| FIT-URS-008 | The factory shall prevent agents from disabling, weakening, or bypassing fitness functions without an approved ADR and Steering Committee decision. | Must | Review | Any modification to fitness checks is blocked unless linked to approved decision record. |
| FIT-URS-009 | The factory shall support product-specific fitness functions in addition to factory-wide baseline fitness functions. | Should | Demonstration | A product can add custom fitness rules without weakening baseline rules. |
| FIT-URS-010 | The factory shall review failed fitness functions through the Decision Challenge process when the failure affects architecture, security, GxP documentation, or release readiness. | Must | Review | Critical failure produces challenge record and cannot be accepted silently. |

## Example fitness functions
- No UI module may import persistence, adapter, repository, Supabase, database, or secret modules.
- No domain module may import UI, database, network, filesystem, browser storage, or environment modules.
- No importer may write directly to product database tables.
- Every high-impact mutation path must create an Evidence Ledger event.
- Every product-scoped data table must include the approved isolation keys.

## Traceability expectation
Each fitness function shall trace to an architecture rule, security rule, GxP rule, or agent operating rule.

---

# 19 Context Engineering URS

**Document status:** Controlled Draft - Baseline Candidate  
**Version:** v0.9  
**Date:** 2026-05-02  
**Document type:** URS  

## Scope
This URS defines how the factory constructs, limits, validates, refreshes, and records the context given to agents.

## Operating principle
For AI-agent factories, context is part of architecture. Too little context causes wrong outputs; too much context causes drift, cost, and hallucination. Context shall be task-specific, source-grounded, current, and auditable.

## Formal requirements
| Req ID | Requirement | Priority | Verification | Acceptance Criteria |
| --- | --- | --- | --- | --- |
| CTX-URS-001 | The factory shall generate a Context Packet for every agent task. | Must | Inspection | Each task includes approved source files, ticket, constraints, allowed assumptions, and excluded context. |
| CTX-URS-002 | The Context Packet shall reference approved source-of-truth documents rather than relying on chat memory alone. | Must | Review | Agent input lists source documents, versions, and sections used. |
| CTX-URS-003 | The factory shall mark stale, superseded, draft, or conflicting context before it is given to agents. | Must | Demonstration | Superseded source documents are flagged and agents are instructed not to use them as truth. |
| CTX-URS-004 | The factory shall support context ranking by relevance, authority, freshness, and applicability. | Should | Review | Context Packet includes primary, secondary, and excluded sources. |
| CTX-URS-005 | The factory shall require agents to separate confirmed facts, assumptions, unknowns, and recommendations in their outputs. | Must | Review | Agent evidence record includes fact/assumption/unknown sections. |
| CTX-URS-006 | The factory shall prevent agents from inventing requirements not present in approved context. | Must | Review / challenge | Unsupported requirements are marked as assumptions and cannot be implemented without approval. |
| CTX-URS-007 | The factory shall maintain a Context Change Log when source-of-truth inputs are updated. | Should | Inspection | Context changes link to affected tickets, agents, and dependency records. |
| CTX-URS-008 | The factory shall support context compression/summarization only when the summary links back to original source records. | Should | Review | Summarized context includes source links and cannot override original documents. |
| CTX-URS-009 | The factory shall detect and flag context overload for complex tasks and split work into smaller tickets when needed. | Should | Demonstration | Master Moderator splits tickets when context exceeds manageable scope. |
| CTX-URS-010 | The factory shall record the final Context Packet hash or identifier in the Evidence Ledger for accepted work. | Must | Inspection | Evidence record references the exact context package used for the task. |

## Context Packet minimum fields
- Ticket ID
- Product Build ID
- Agent role
- Source-of-truth documents and versions
- Approved scope
- Architecture rules
- Security rules
- GxP documentation mode, if applicable
- Allowed files/folders
- Assumption budget
- Excluded sources
- Expected evidence output

---

# 20 Agent Interoperability URS

**Document status:** Controlled Draft - Baseline Candidate  
**Version:** v0.9  
**Date:** 2026-05-02  
**Document type:** URS  

## Scope
This URS defines how the factory shall remain tool-agnostic and portable across Codex, Claude, Cursor, MCP-enabled tools, future coding agents, and human engineers.

## Operating principle
The factory shall not depend on a single AI vendor or tool. Agent instructions, tool access, context, evidence, and tickets shall use portable formats where practical.

## Formal requirements
| Req ID | Requirement | Priority | Verification | Acceptance Criteria |
| --- | --- | --- | --- | --- |
| AINT-URS-001 | The factory shall maintain a root AGENTS.md or equivalent agent instruction file for coding agents. | Must | Inspection | Repository includes AGENTS.md with setup commands, architecture rules, test commands, and PR expectations. |
| AINT-URS-002 | The factory shall allow directory-specific agent instruction files where different areas have different rules. | Should | Inspection | Domain, UI, importer, database, and security folders may have scoped instructions. |
| AINT-URS-003 | The factory shall define a tool adapter pattern for AI tools and external systems. | Must | Review | Tool use is mediated through approved adapters, not hardcoded into product logic. |
| AINT-URS-004 | The factory shall support model/tool replacement without rewriting the Product Build Charter, architecture requirements, or ticket structure. | Should | Demonstration | Same ticket can be executed by an alternate capable tool using the same context packet. |
| AINT-URS-005 | The factory shall support MCP-compatible tool/data connectors only through approved, least-privilege servers or adapters. | Should | Security review | MCP/tool integrations are listed, approved, permission-scoped, and logged. |
| AINT-URS-006 | The factory shall record which tool, model, agent role, and version executed each task. | Must | Inspection | Evidence record includes tool/model/agent metadata. |
| AINT-URS-007 | The factory shall prevent agents from using unapproved tools, unapproved MCP servers, or unapproved credentials. | Must | Security test | Tool allowlist exists and unauthorized tool use is blocked or rejected. |
| AINT-URS-008 | The factory shall define output formats that are usable by multiple tools, including Markdown, JSON where needed, and repository files. | Must | Inspection | Tickets, evidence records, challenge records, and agent reports use stable templates. |
| AINT-URS-009 | The factory shall maintain tool-specific known limitations and operating guidance. | Should | Review | Tool profiles exist for Codex, Claude, Cursor, and future tools used by the factory. |
| AINT-URS-010 | The factory shall reject work that depends on an unportable hidden context or unrecorded tool state. | Must | Review | Accepted work references reproducible files, diffs, logs, or evidence records. |

## Tool-neutrality requirement
The factory shall make the product build reproducible by another capable tool or human engineer using the same source-of-truth documents, tickets, evidence records, and repository state.

---

# 21 Platform Engineering URS

**Document status:** Controlled Draft - Baseline Candidate  
**Version:** v0.9  
**Date:** 2026-05-02  
**Document type:** URS  

## Scope
This URS defines the factory as a platform for repeatedly creating enterprise software products through standardized golden paths, reusable modules, self-service workflows, and controlled release gates.

## Operating principle
The factory shall act as an internal developer platform for AI agents and humans. It shall make the safest path the easiest path.

## Formal requirements
| Req ID | Requirement | Priority | Verification | Acceptance Criteria |
| --- | --- | --- | --- | --- |
| PLAT-URS-001 | The factory shall provide golden paths for common product types, including standard enterprise SaaS, regulated/GxP-capable SaaS, importer-heavy products, and reporting-heavy products. | Should | Review | Golden path templates exist and include required docs, modules, tests, and gates. |
| PLAT-URS-002 | The factory shall provide repository scaffolding templates aligned to the architecture kernel. | Must | Demonstration | New product repository can be generated with approved folders, AGENTS.md, tests, and CI stubs. |
| PLAT-URS-003 | The factory shall provide standard CI checks for linting, type checks, tests, architecture scans, and security scans. | Must | Automated test | A generated repo includes baseline CI or script commands. |
| PLAT-URS-004 | The factory shall define paved-road patterns for auth, tenant/workspace, audit/evidence, import, reporting, and release workflows. | Must | Review | Approved patterns exist and agents are instructed to use them unless an ADR approves deviation. |
| PLAT-URS-005 | The factory shall maintain self-service templates for product intake, ticket creation, evidence records, decision challenges, release records, and GxP triage. | Must | Inspection | Templates pack contains required operating records. |
| PLAT-URS-006 | The factory shall support product environment profiles such as local, development, staging, preview, and production. | Should | Review | Environment model exists and defines allowed data/secrets per environment. |
| PLAT-URS-007 | The factory shall maintain a platform backlog separate from product-specific backlogs. | Should | Review | Reusable factory improvements are tracked separately from product features. |
| PLAT-URS-008 | The factory shall require deviations from golden paths to be recorded and approved. | Must | Review | Deviation record exists for nonstandard architecture, tool, or process decisions. |
| PLAT-URS-009 | The factory shall include onboarding guidance for new agents, new engineers, and new products. | Should | Inspection | Onboarding docs explain setup, architecture rules, ticket flow, and evidence expectations. |
| PLAT-URS-010 | The factory shall track platform health through build success, ticket cycle time, fitness function results, agent rework, and release failure metrics. | Should | Inspection | Platform health dashboard or metrics file exists. |

---

# 22 Reusable Module Registry URS

**Document status:** Controlled Draft - Baseline Candidate  
**Version:** v0.9  
**Date:** 2026-05-02  
**Document type:** URS  

## Scope
This URS defines how reusable modules are identified, versioned, governed, tested, documented, and safely reused across products generated by the factory.

## Operating principle
The factory becomes valuable when it can reuse validated patterns and modules without copying defects or creating uncontrolled dependencies.

## Formal requirements
| Req ID | Requirement | Priority | Verification | Acceptance Criteria |
| --- | --- | --- | --- | --- |
| MOD-URS-001 | The factory shall maintain a Reusable Module Registry. | Must | Inspection | Registry lists module ID, name, purpose, owner, version, status, dependencies, limitations, and validation status. |
| MOD-URS-002 | Each reusable module shall have a Module Charter. | Must | Review | Charter defines intended use, interfaces, inputs, outputs, assumptions, risks, and supported product types. |
| MOD-URS-003 | Each reusable module shall have a documented interface/contract. | Must | Review / test | Consumers can use the module through stable interfaces without relying on internal implementation. |
| MOD-URS-004 | Each reusable module shall have versioning and change history. | Must | Inspection | Breaking changes are identified and linked to migration guidance. |
| MOD-URS-005 | Each reusable module shall have required tests and evidence records before reuse in a product. | Must | Automated test / review | Module test evidence is linked before product use. |
| MOD-URS-006 | The factory shall track module validation/documentation status when used in GxP-capable product builds. | Must | Review | Module registry shows whether the module is draft, verified, release-ready, or validation-package-supported. |
| MOD-URS-007 | The factory shall prevent uncontrolled copy-paste reuse of modules outside registry control. | Should | Architecture scan / review | Shared module usage is traceable to registry and version. |
| MOD-URS-008 | The factory shall support module deprecation and replacement plans. | Should | Review | Deprecated modules include reason, replacement module, migration path, and sunset date. |
| MOD-URS-009 | The factory shall evaluate reusable modules for security and dependency risks before reuse. | Must | Security review | Security review exists for modules handling auth, data, imports, files, AI, or external APIs. |
| MOD-URS-010 | The factory shall allow product-specific extension of reusable modules only through approved extension points. | Should | Review | Extensions do not modify core module internals without change approval. |

## Initial module candidates
- Auth and identity module
- Tenant/workspace module
- Evidence ledger module
- Dependency ledger module
- Import engine module
- Reporting/export module
- GxP documentation engine module
- AI gateway module
- Security gate module
- Release gate module

---

# 23 Data Governance and Data Contracts URS

**Document status:** Controlled Draft - Baseline Candidate  
**Version:** v0.9  
**Date:** 2026-05-02  
**Document type:** URS  

## Scope
This URS defines data governance controls for factory-generated products, including canonical models, data contracts, classification, retention, lineage, tenancy, import/export rules, and integration boundaries.

## Operating principle
Data must be treated as a controlled product asset. Agents shall not invent data structures without approved contracts and impact assessment.

## Formal requirements
| Req ID | Requirement | Priority | Verification | Acceptance Criteria |
| --- | --- | --- | --- | --- |
| DATA-URS-001 | Every product shall define a canonical data model before significant implementation starts. | Must | Review | Data model exists and is linked to product requirements and architecture. |
| DATA-URS-002 | Every externally exchanged data structure shall have a data contract. | Must | Review / test | Import/export/API contracts define fields, types, required/optional status, validation rules, and version. |
| DATA-URS-003 | The factory shall require data classification for product data. | Must | Review | Data is classified by sensitivity, regulated status, personal data status, and retention expectations. |
| DATA-URS-004 | The factory shall define data ownership and stewardship for each major data domain. | Should | Review | Each domain has owner role and approval authority for changes. |
| DATA-URS-005 | The factory shall define retention, archival, deletion, and export expectations for each product build. | Must | Review | Product Build Charter or data model includes retention and deletion assumptions. |
| DATA-URS-006 | The factory shall capture data lineage for import, transformation, and export workflows. | Must | Demonstration | Import/export evidence links source file, mapping, transformed draft, validation results, and applied records. |
| DATA-URS-007 | The factory shall support schema and contract versioning. | Must | Inspection | Data contracts and schemas include version, change history, and migration notes. |
| DATA-URS-008 | The factory shall prevent silent changes to canonical fields, key identifiers, tenant boundaries, or regulated-data assumptions. | Must | Review | Such changes require impact assessment and approval. |
| DATA-URS-009 | The factory shall require test fixtures for critical data contracts and import/export formats. | Must | Automated test | Contract fixture tests pass for accepted import/export features. |
| DATA-URS-010 | The factory shall require privacy and security review when data contracts include personal, confidential, regulated, or customer-controlled data. | Must | Security review | Data protection review is linked to the contract before release. |

---

# 24 AI Security and Agent Safety URS

**Document status:** Controlled Draft - Baseline Candidate  
**Version:** v0.9  
**Date:** 2026-05-02  
**Document type:** URS  

## Scope
This URS defines AI-specific security and agent-safety controls for the factory and products it generates.

## Operating principle
AI agents shall operate with least privilege, source-grounded context, explicit approvals, and verifiable evidence. Agent autonomy shall be constrained by risk.

## Formal requirements
| Req ID | Requirement | Priority | Verification | Acceptance Criteria |
| --- | --- | --- | --- | --- |
| AIS-URS-001 | The factory shall classify AI-agent actions by risk level before granting tool access. | Must | Review | Tool/action permissions are scoped by agent role and ticket risk. |
| AIS-URS-002 | The factory shall prevent agents from accessing secrets unless explicitly required and approved. | Must | Security test | No secret appears in frontend, output logs, prompts, or evidence records. |
| AIS-URS-003 | The factory shall protect against prompt injection from user-provided files, imports, webpages, comments, and external connector data. | Must | Security review / test | Untrusted content is labeled, isolated, and not treated as instructions. |
| AIS-URS-004 | The factory shall prevent excessive agency by limiting destructive actions, external calls, and privileged operations. | Must | Demonstration | Delete, deploy, release, secret, and architecture-changing actions require approvals. |
| AIS-URS-005 | The factory shall require tool allowlists for each agent and task class. | Must | Inspection | Agent tasks list approved tools; unauthorized tool use is rejected. |
| AIS-URS-006 | The factory shall require AI-generated code to pass static checks, tests, architecture scans, and security scans before acceptance. | Must | Automated test | Generated code cannot be accepted based only on agent claims. |
| AIS-URS-007 | The factory shall require red-team or adversarial review for AI features that act on customer data or external tools. | Should | Review | High-impact AI features have challenge review and misuse scenarios. |
| AIS-URS-008 | The factory shall record agent prompts, tool calls, outputs, and evidence references at an appropriate level for audit and troubleshooting. | Should | Inspection | Evidence records link to task prompt/input and tool metadata without leaking secrets. |
| AIS-URS-009 | The factory shall require fallback or human escalation when AI confidence or evidence completeness is below threshold. | Must | Demonstration | Low-confidence outputs trigger revise/reject/escalate status. |
| AIS-URS-010 | The factory shall maintain an AI safety incident log for hallucination, tool misuse, unsafe output, policy violations, and repeated agent errors. | Should | Inspection | Incidents include root cause, corrective action, and prevention rule. |

## AI-specific threat examples
- Prompt injection from imported files or external tool data
- Tool misuse or excessive agency
- Fake evidence or fake test results
- Secret disclosure
- Unsafe code generation
- Cross-tenant access due to generated policy errors
- Approval bypass through misleading agent summaries

---

# 25 AI FinOps and Cost Control URS

**Document status:** Controlled Draft - Baseline Candidate  
**Version:** v0.9  
**Date:** 2026-05-02  
**Document type:** URS  

## Scope
This URS defines cost governance for AI usage, agent execution, model routing, tool usage, retries, and build economics.

## Operating principle
The factory shall optimize for validated outcomes per unit cost, not maximum agent activity.

## Formal requirements
| Req ID | Requirement | Priority | Verification | Acceptance Criteria |
| --- | --- | --- | --- | --- |
| FIN-URS-001 | The factory shall track AI cost by product build, ticket, agent, model/tool, and outcome. | Should | Inspection | Cost records exist and can be summarized by product, ticket, and agent. |
| FIN-URS-002 | The factory shall define budget limits for each product build and major ticket class. | Should | Review | Build charter or delivery plan includes cost budget and escalation threshold. |
| FIN-URS-003 | The factory shall support model-tier routing based on task complexity, risk, and required reasoning depth. | Should | Review | Simple tasks use lower-cost models where appropriate; high-risk decisions use stronger review. |
| FIN-URS-004 | The factory shall limit uncontrolled retries and repeated agent loops. | Must | Demonstration | Retry limit exists and repeated failure triggers escalation or task redesign. |
| FIN-URS-005 | The factory shall track rejected-output cost and rework cost. | Should | Inspection | KPI dashboard shows cost of rejected PRs, repeated errors, and failed tasks. |
| FIN-URS-006 | The factory shall require approval for high-cost agent runs, large context expansions, or multi-agent debates above threshold. | Should | Review | Budget exception record exists for high-cost runs. |
| FIN-URS-007 | The factory shall encourage reuse of verified modules and source-of-truth summaries to reduce repetitive AI work. | Should | Review | Reusable modules and validated context summaries are used where suitable. |
| FIN-URS-008 | The factory shall report cost per accepted feature and cost per release candidate. | Should | Inspection | Release record includes AI and infrastructure cost summary where available. |
| FIN-URS-009 | The factory shall define FinOps KPIs for agent productivity and cost efficiency. | Should | Review | KPIs include cost per ticket, cost per accepted PR, cost per defect found, and cost per rejected PR. |
| FIN-URS-010 | The factory shall not allow cost reduction to bypass security, architecture, or evidence gates. | Must | Review | Gate records cannot be skipped for cost reasons without Steering Committee risk acceptance. |

---

# 26 Agent Observability URS

**Document status:** Controlled Draft - Baseline Candidate  
**Version:** v0.9  
**Date:** 2026-05-02  
**Document type:** URS  

## Scope
This URS defines observability requirements for agents, factory operations, product builds, tickets, reviews, and releases.

## Operating principle
Agents shall be measured like controlled contributors. The factory shall observe quality, speed, cost, risk, rework, hallucination, and learning outcomes.

## Formal requirements
| Req ID | Requirement | Priority | Verification | Acceptance Criteria |
| --- | --- | --- | --- | --- |
| OBS-URS-001 | The factory shall track each agent task with unique ID, agent role, tool/model, ticket, start/end time, status, and outcome. | Must | Inspection | Agent task log exists for accepted and rejected work. |
| OBS-URS-002 | The factory shall track agent quality metrics. | Should | Inspection | Metrics include acceptance rate, rejection rate, defect rate, rework rate, and repeated mistake rate. |
| OBS-URS-003 | The factory shall track hallucination and unsupported-claim incidents. | Must | Review | Incidents are logged with source, severity, detection gate, and corrective action. |
| OBS-URS-004 | The factory shall track confidence scores, evidence completeness scores, and residual-risk levels for challenged decisions. | Must | Inspection | Decision Challenge records are summarized for governance review. |
| OBS-URS-005 | The factory shall track architecture violations by agent, ticket, and rule. | Should | Inspection | Architecture dashboard/report identifies recurring violations and owners. |
| OBS-URS-006 | The factory shall track security findings by severity, source agent, affected component, and closure status. | Must | Security review | Security finding log exists and unresolved criticals block release. |
| OBS-URS-007 | The factory shall support release-readiness dashboards showing gate status, evidence status, unresolved risks, and open deviations. | Should | Demonstration | Release dashboard or checklist provides current readiness state. |
| OBS-URS-008 | The factory shall feed observability findings into the Learning Log. | Must | Inspection | Repeated issues produce updated rules, tests, prompts, or templates. |
| OBS-URS-009 | The factory shall distinguish between agent productivity metrics and product-quality metrics. | Should | Review | Dashboard separates speed/cost from quality/security/customer-value measures. |
| OBS-URS-010 | The factory shall prevent metric gaming by requiring evidence-backed outcomes rather than self-reported success alone. | Must | Review | Agent success depends on gate evidence and review acceptance, not agent claim. |

---

# 27 Human Decision Rights URS

**Document status:** Controlled Draft - Baseline Candidate  
**Version:** v0.9  
**Date:** 2026-05-02  
**Document type:** URS  

## Scope
This URS defines which decisions may be recommended by AI agents, which decisions may be accepted by the Master Moderator, and which decisions require human or Steering Committee approval.

## Operating principle
AI may accelerate decisions but shall not own high-impact accountability. Human authority remains mandatory for strategic, regulated, security-sensitive, release, and customer-facing decisions.

## Formal requirements
| Req ID | Requirement | Priority | Verification | Acceptance Criteria |
| --- | --- | --- | --- | --- |
| HDR-URS-001 | The factory shall maintain a Decision Rights Matrix. | Must | Inspection | Matrix defines decision type, recommender, reviewer, approver, required evidence, and escalation path. |
| HDR-URS-002 | The factory shall classify decisions by impact level. | Must | Review | Decision records are classified as low, medium, high, or critical impact. |
| HDR-URS-003 | AI agents may recommend architecture, security, GxP, release, and product decisions but shall not be final approvers for high-impact decisions. | Must | Review | Decision records show human/Steering approval for high-impact decisions. |
| HDR-URS-004 | The Master Moderator may accept low-risk implementation decisions only when acceptance criteria, tests, and evidence are complete. | Should | Review | Low-risk decision acceptance record includes evidence and no open critical issues. |
| HDR-URS-005 | Data model changes, tenant/security model changes, GxP documentation profile decisions, release approvals, and customer-facing compliance claims shall require human approval. | Must | Review | These decisions cannot be closed by AI-only approval. |
| HDR-URS-006 | The factory shall require Steering Committee approval for critical decisions or unresolved high residual risk. | Must | Review | Critical decision record contains Steering Committee disposition. |
| HDR-URS-007 | The factory shall reject any agent attempt to bypass human approval for decisions assigned to human or Steering Committee authority. | Must | Demonstration | Approval bypass attempt is blocked and logged as an incident. |
| HDR-URS-008 | Human approval records shall include approver, role, date/time, decision meaning, evidence reviewed, and any residual risk accepted. | Must | Inspection | Approval record is complete and linked to Evidence Ledger. |
| HDR-URS-009 | The factory shall allow human override of AI recommendations with rationale. | Must | Review | Override records capture reason and impact. |
| HDR-URS-010 | The factory shall periodically review decision outcomes to improve agent recommendations and decision thresholds. | Should | Review | Learning Log includes decision-quality review and threshold improvements. |

## Example decision rights matrix
| Decision Type | AI may recommend | Master Moderator may accept | Human Product Owner required | Steering Committee required |
| --- | --- | --- | --- | --- |
| Low-risk copy/edit/document cleanup | Yes | Yes, with evidence | Optional | No |
| Small UI improvement with tests | Yes | Yes, if in scope | Optional | No |
| Data model change | Yes | No | Yes | If high impact |
| Security/RLS rule change | Yes | No | Yes | Yes if critical |
| GxP documentation profile | Yes | No | Yes | If regulated/high impact |
| Release approval | Yes | No | Yes | Yes for baseline/major release |
| Customer-facing compliance claim | Yes | No | Yes | Yes |
| Tool/vendor replacement | Yes | No | Yes | If architecture/security impact |

---

# 28 Modern Architecture Reference Anchors

**Document status:** Controlled Draft - Baseline Candidate  
**Version:** v0.9  
**Date:** 2026-05-02  
**Document type:** Reference Appendix  

## Purpose
This appendix records the modern architecture and AI-agent engineering concepts used as reference anchors for v0.9. These references do not replace approved requirements; they explain why the new v0.9 control areas exist.

## Reference anchors
| Area | Reference anchor | Factory implication |
| --- | --- | --- |
| Evolutionary architecture | Architecture fitness functions and continuous architecture validation | Architecture rules should be executable and continuously checked. |
| Platform engineering | Golden paths, paved roads, reusable platform capabilities | The factory should become a repeatable platform, not only a document process. |
| Team/product topology | Clear ownership and team/agent boundaries | Agents should have bounded responsibilities and clear interfaces. |
| Continuous delivery / DORA thinking | Flow, feedback, recovery, deployment reliability | The factory should measure lead time, deployment success, and recovery. |
| Context engineering | Task-specific, source-grounded, current context for AI agents | The Master Moderator must curate context packets. |
| AGENTS.md-style agent guidance | Durable repo-level instructions for coding agents | Each repo/folder should give agents stable operating rules. |
| MCP-style interoperability | Standardized tool/data connections for AI systems | Tool connections should be governed, scoped, and replaceable. |
| OWASP LLM/agentic security | Prompt injection, sensitive info disclosure, excessive agency, tool misuse | AI-agent security must be first-class. |
| NIST AI RMF | Govern, map, measure, manage AI risks | AI factory decisions must include human governance and risk controls. |
| Data contracts | Stable producer/consumer expectations | Imports, APIs, exports, and modules need explicit contracts. |
| FinOps | Cost accountability for AI, infra, and tooling | Agent productivity must be measured against cost and accepted outcomes. |
| Human-in-the-loop governance | Humans own critical accountability | AI may recommend but must not approve critical decisions alone. |

## Operating rule
Reference anchors shall not be treated as automatic requirements. They must be translated into explicit URS requirements, SOP steps, controls, or acceptance criteria before implementation.
