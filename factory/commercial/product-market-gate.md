# Product Market Gate

Status: Draft baseline for Factory 1.0
Source alignment: Product Build Intake URS, Steering Committee URS, Decision
Challenge URS, Human Decision Rights URS

## Purpose

Factory must not build a product only because it is technically possible. This
gate decides whether a product idea is commercially clear enough to become a
Product Build Charter.

## Operating Rule

The human owner chooses product ideas. Factory may challenge, structure, and
score the idea, but Factory does not approve product strategy by itself.

No product enters build planning until one of these is true:

- the human owner approves this gate;
- the human owner explicitly bypasses this gate with rationale;
- the result is Discovery Needed, and only discovery tickets are allowed.

## Required Inputs

| Input | Required | Evidence Expected |
| --- | --- | --- |
| Product idea | Yes | Human owner statement. |
| Target buyer | Yes | Buyer role or company type. |
| Target user | Yes | User role and workflow. |
| Pain/problem | Yes | Clear painful situation. |
| Current workaround | Yes | Manual process, spreadsheet, tool, or service. |
| Urgency | Yes | Why now matters. |
| Willingness to pay | Yes | Pricing signal, budget owner, or assumption. |
| Competitors/alternatives | Yes | Named tools, services, or internal workaround. |
| Differentiation | Yes | Why this can win. |
| Distribution path | Yes | How first users/customers are reached. |
| First 10 customer path | Should | Specific reachable people/segments. |
| Pricing hypothesis | Should | Initial packaging and price assumption. |
| Support burden | Should | Expected onboarding/support effort. |
| Build complexity | Yes | Low, medium, high, or unknown. |
| Reuse potential | Should | Which Factory modules may be reused. |
| Data/security sensitivity | Yes | Public, internal, confidential, personal, regulated. |

## Scoring

Use a 1 to 5 score for each area. Unknowns score 1 until clarified.

| Area | Score Meaning |
| --- | --- |
| Pain severity | Is the problem painful enough to matter? |
| Buyer clarity | Is the payer identifiable? |
| Urgency | Is there a reason to act soon? |
| Distribution | Can we reach early users/customers? |
| Differentiation | Is there a believable reason to choose this product? |
| Build feasibility | Can Factory build a credible MVP quickly? |
| Reuse leverage | Does this strengthen reusable modules? |
| Security/compliance fit | Does Factory have an advantage here? |

## Gate Thresholds

| Result | Rule |
| --- | --- |
| Proceed to Product Charter | No blocker, buyer/user clear, total score 28 or higher. |
| Discovery Needed | Important unknowns exist, but the idea may be promising. |
| Park | Useful idea, weak timing or weak distribution. |
| Reject | Weak pain, unclear buyer, or poor Factory fit. |

## Blockers

- No target buyer.
- No target user.
- No painful workflow or business problem.
- No plausible distribution path.
- Unknown regulated/security risk with no discovery plan.
- Product would require unsupported claims or unsafe data use.

## Output

The gate output must include:

- gate result;
- score summary;
- key assumptions;
- blocker list;
- discovery questions if needed;
- human owner decision;
- link to Product Build Charter if approved.
