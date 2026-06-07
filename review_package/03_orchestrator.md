# Orchestration Brain

Primary orchestrator for the current complete factory run: `factory/tools/factory-dry-run.mjs`.

Note: `apps/jarvis/server.mjs` is the larger local UI/API controller for Jarvis, but the deterministic end-to-end factory run is orchestrated by the dry-run tool below.

- File path: `factory/tools/factory-dry-run.mjs`
- Line count: 643
- Last modified: 2026-05-11T20:31:13.415Z

```js
#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const factoryDir = path.resolve(__dirname, "..");
const rootDir = path.resolve(factoryDir, "..");

const scenarios = {
  "sample-product": {
    slug: "product-000-dry-run",
    productName: "EvidenceFlow Dry Run",
    idea:
      "A dry-run SaaS concept that helps teams collect delivery evidence, " +
      "decisions, and release readiness notes in one controlled workspace.",
    targetBuyer: "Operations or compliance lead at a small regulated vendor",
    targetUser: "Project manager responsible for release evidence",
    pain:
      "Teams lose evidence across chats, files, spreadsheets, and tickets " +
      "before release reviews.",
    currentWorkaround:
      "Manual spreadsheets, shared folders, and late release checklists.",
    urgency:
      "Audit and customer review preparation becomes painful near release.",
    willingnessToPay:
      "Assumption: buyer may pay for reduced release-prep effort; needs " +
      "customer validation.",
    competitors: ["SharePoint", "Airtable", "Notion", "manual spreadsheets"],
    differentiation:
      "Evidence-first workflow with explicit gates, blockers, and approval " +
      "records.",
    distributionPath:
      "Founder-led outreach to project, quality, and compliance operators.",
    firstTenCustomers:
      "Existing network of small software vendors and operations teams.",
    pricingHypothesis: "Assumption: paid beta at 49 to 199 USD per seat/month.",
    supportBurden: "Medium. Needs onboarding and workflow setup support.",
    buildComplexity: "Medium",
    reusePotential: ["auth", "evidence ledger", "roles", "reporting"],
    dataSensitivity: "Confidential",
    securityLevel: "Medium",
    intendedUse:
      "Non-GxP dry-run workflow for release evidence organization. Not a " +
      "validated compliance system.",
    gxpRelevance: "To be assessed",
    integrations: ["CSV import later"],
    documentationMode: "Profile 0 for dry run",
    approvedToPlan: true,
    charterApproved: true,
    requirements: [
      {
        id: "REQ-DRY-001",
        text: "The product shall capture evidence records for release tasks."
      },
      {
        id: "REQ-DRY-002",
        text: "The product shall block release when required evidence is missing."
      },
      {
        id: "REQ-DRY-003",
        text: "The product shall classify data sensitivity during intake."
      }
    ],
    tickets: [
      {
        id: "TICKET-DRY-001",
        requirement: "REQ-DRY-001",
        owner: "Backend Agent",
        objective: "Design evidence record schema."
      },
      {
        id: "TICKET-DRY-002",
        requirement: "REQ-DRY-002",
        owner: "QA/Security Agent",
        objective: "Define missing-evidence blocker check."
      },
      {
        id: "TICKET-DRY-003",
        requirement: "REQ-DRY-003",
        owner: "Product Intake Agent",
        objective: "Classify product data during intake."
      }
    ]
  },
  "missing-buyer": {
    slug: "product-000-dry-run-blocker",
    productName: "Blocked Dry Run",
    idea: "A deliberately incomplete dry-run product idea.",
    targetBuyer: "",
    targetUser: "Internal operator",
    pain: "Some process is slow.",
    currentWorkaround: "Unknown",
    urgency: "",
    willingnessToPay: "",
    competitors: [],
    differentiation: "",
    distributionPath: "",
    firstTenCustomers: "",
    pricingHypothesis: "",
    supportBurden: "Unknown",
    buildComplexity: "Unknown",
    reusePotential: [],
    dataSensitivity: "Unknown",
    securityLevel: "Unknown",
    intendedUse: "",
    gxpRelevance: "Unknown",
    integrations: [],
    documentationMode: "Unknown",
    approvedToPlan: false,
    charterApproved: false,
    requirements: [],
    tickets: []
  }
};

function usage() {
  return [
    "Factory Dry Run Harness",
    "",
    "Usage:",
    "  node factory/tools/factory-dry-run.mjs run sample-product",
    "  node factory/tools/factory-dry-run.mjs run missing-buyer",
    "",
    "This tool creates a dry-run evidence pack under BuildPodFactory/products."
  ].join("\n");
}

function nowStamp() {
  return new Date().toISOString().replace(/[:.]/g, "-");
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function writeFile(file, content) {
  ensureDir(path.dirname(file));
  fs.writeFileSync(file, `${content.trim()}\n`, "utf8");
}

function list(items) {
  if (!items || items.length === 0) return "- None recorded.";
  return items.map((item) => `- ${item}`).join("\n");
}

function table(rows) {
  return rows.map((row) => `| ${row.join(" | ")} |`).join("\n");
}

function field(value) {
  if (Array.isArray(value)) return value.length ? value.join(", ") : "Missing";
  return value || "Missing";
}

function scoreScenario(scenario) {
  const scores = [
    ["Pain severity", scenario.pain ? 4 : 1],
    ["Buyer clarity", scenario.targetBuyer ? 4 : 1],
    ["Urgency", scenario.urgency ? 4 : 1],
    ["Distribution", scenario.distributionPath ? 4 : 1],
    ["Differentiation", scenario.differentiation ? 4 : 1],
    ["Build feasibility", scenario.buildComplexity !== "Unknown" ? 4 : 1],
    ["Reuse leverage", scenario.reusePotential.length ? 4 : 1],
    ["Security/compliance fit", scenario.dataSensitivity !== "Unknown" ? 4 : 1]
  ];
  const total = scores.reduce((sum, [, score]) => sum + score, 0);
  return { scores, total };
}

function blockersFor(scenario) {
  const blockers = [];
  if (!scenario.targetBuyer) blockers.push("Missing target buyer.");
  if (!scenario.targetUser) blockers.push("Missing target user.");
  if (!scenario.pain) blockers.push("Missing painful workflow or problem.");
  if (!scenario.intendedUse) blockers.push("Missing intended use.");
  if (scenario.dataSensitivity === "Unknown") {
    blockers.push("Unknown data classification.");
  }
  if (scenario.securityLevel === "Unknown") blockers.push("Unknown security level.");
  if (!scenario.distributionPath) blockers.push("Missing distribution path.");
  if (!scenario.charterApproved) blockers.push("Product Build Charter not approved.");
  return blockers;
}

function gateResult(scenario) {
  const { total } = scoreScenario(scenario);
  const blockers = blockersFor(scenario);
  if (blockers.length === 0 && total >= 28) return "Proceed to Product Charter";
  if (blockers.length > 0) return "Discovery Needed";
  if (total >= 20) return "Park";
  return "Reject";
}

function agentRecord(agent, role, status, findings, evidenceRefs = []) {
  return {
    agent,
    role,
    status,
    findings,
    evidenceRefs,
    assumptions: findings.filter((item) => item.toLowerCase().includes("assumption"))
  };
}

function runAgents(scenario) {
  const blockers = blockersFor(scenario);
  const missingEvidence = [];
  const requirementIds = new Set(scenario.requirements.map((req) => req.id));
  const ticketsWithoutReq = scenario.tickets.filter(
    (ticket) => !requirementIds.has(ticket.requirement)
  );

  if (!scenario.requirements.length) missingEvidence.push("No requirements.");
  if (!scenario.tickets.length) missingEvidence.push("No tickets.");
  if (ticketsWithoutReq.length) {
    missingEvidence.push("One or more tickets lack valid requirement links.");
  }

  return [
    agentRecord(
      "Product Intake Agent",
      "Intake",
      blockers.length ? "Blocked" : "Pass",
      [
        `Buyer: ${field(scenario.targetBuyer)}`,
        `User: ${field(scenario.targetUser)}`,
        `Intended use: ${field(scenario.intendedUse)}`,
        `Data sensitivity: ${field(scenario.dataSensitivity)}`,
        `Security level: ${field(scenario.securityLevel)}`
      ],
      ["02-product-intake.md"]
    ),
    agentRecord(
      "Product Market Agent",
      "Commercial Gate",
      gateResult(scenario) === "Proceed to Product Charter" ? "Pass" : "Review",
      [
        `Gate result: ${gateResult(scenario)}`,
        `Score total: ${scoreScenario(scenario).total}`,
        `Pricing hypothesis: ${field(scenario.pricingHypothesis)}`
      ],
      ["01-product-market-gate.md"]
    ),
    agentRecord(
      "Architecture Agent",
      "Architecture",
      scenario.requirements.length ? "Pass" : "Blocked",
      [
        "Default architecture used for dry run.",
        `Requirement count: ${scenario.requirements.length}`,
        `Reusable modules: ${field(scenario.reusePotential)}`
      ],
      ["04-requirements.md", "05-architecture.md"]
    ),
    agentRecord(
      "QA/Security Agent",
      "Security And Verification",
      blockers.some((item) => item.includes("security") || item.includes("data"))
        ? "Blocked"
        : "Pass",
      [
        `Data classification: ${field(scenario.dataSensitivity)}`,
        `Security level: ${field(scenario.securityLevel)}`,
        "No secrets used in dry run.",
        "No production deployment attempted."
      ],
      ["09-release-gates.md"]
    ),
    agentRecord(
      "Evidence Agent",
      "Evidence",
      missingEvidence.length ? "Blocked" : "Pass",
      missingEvidence.length
        ? missingEvidence
        : [
            "Requirements are present.",
            "Tickets link to requirements.",
            "Agent evidence records were generated."
          ],
      ["06-tickets.md", "07-agent-evidence/"]
    ),
    agentRecord(
      "Decision Challenger",
      "Challenge Review",
      blockers.length ? "Challenge" : "Pass",
      blockers.length
        ? blockers
        : [
            "No critical blocker found.",
            "Commercial assumptions remain assumptions until customer validation.",
            "Dry run is not a compliance or release claim."
          ],
      ["08-decision-challenge.md"]
    )
  ];
}

function finalStatus(scenario, agents) {
  const blockers = blockersFor(scenario);
  const blockedAgents = agents.filter((agent) => agent.status === "Blocked");
  if (blockers.length || blockedAgents.length) return "NEEDS DISCOVERY";
  if (gateResult(scenario) !== "Proceed to Product Charter") return "HOLD";
  return "PASS";
}

function markdownAgentRecord(record) {
  return [
    `# ${record.agent} Evidence Record`,
    "",
    `Role: ${record.role}`,
    `Status: ${record.status}`,
    "",
    "## Findings",
    "",
    list(record.findings),
    "",
    "## Evidence References",
    "",
    list(record.evidenceRefs),
    "",
    "## Assumptions",
    "",
    list(record.assumptions)
  ].join("\n");
}

function createDryRun(scenarioName) {
  const scenario = scenarios[scenarioName];
  if (!scenario) {
    throw new Error(`Unknown scenario: ${scenarioName}`);
  }

  const runId = `run-${nowStamp()}`;
  const outDir = path.join(rootDir, "products", scenario.slug, runId);
  const evidenceDir = path.join(outDir, "07-agent-evidence");
  ensureDir(evidenceDir);

  const score = scoreScenario(scenario);
  const blockers = blockersFor(scenario);
  const agents = runAgents(scenario);
  const status = finalStatus(scenario, agents);

  writeFile(
    path.join(outDir, "00-product-idea.md"),
    [
      "# Product Idea",
      "",
      `Product: ${scenario.productName}`,
      `Scenario: ${scenarioName}`,
      "",
      "## Idea",
      "",
      scenario.idea,
      "",
      "## Human Owner Note",
      "",
      "This is Product 000 dry run evidence. It is not Product 001."
    ].join("\n")
  );

  writeFile(
    path.join(outDir, "01-product-market-gate.md"),
    [
      "# Product Market Gate",
      "",
      `Gate result: ${gateResult(scenario)}`,
      `Total score: ${score.total}`,
      "",
      "## Required Inputs",
      "",
      table([
        ["Input", "Value"],
        ["---", "---"],
        ["Target buyer", field(scenario.targetBuyer)],
        ["Target user", field(scenario.targetUser)],
        ["Pain/problem", field(scenario.pain)],
        ["Current workaround", field(scenario.currentWorkaround)],
        ["Urgency", field(scenario.urgency)],
        ["Willingness to pay", field(scenario.willingnessToPay)],
        ["Competitors", field(scenario.competitors)],
        ["Differentiation", field(scenario.differentiation)],
        ["Distribution path", field(scenario.distributionPath)],
        ["Pricing hypothesis", field(scenario.pricingHypothesis)],
        ["Support burden", field(scenario.supportBurden)],
        ["Build complexity", field(scenario.buildComplexity)],
        ["Reuse potential", field(scenario.reusePotential)]
      ]),
      "",
      "## Scores",
      "",
      table([
        ["Area", "Score"],
        ["---", "---"],
        ...score.scores.map(([area, value]) => [area, String(value)])
      ]),
      "",
      "## Blockers",
      "",
      list(blockers)
    ].join("\n")
  );

  writeFile(
    path.join(outDir, "02-product-intake.md"),
    [
      "# Product Intake",
      "",
      `Product name: ${scenario.productName}`,
      `Business objective: ${scenario.idea}`,
      `Target buyer: ${field(scenario.targetBuyer)}`,
      `Target user: ${field(scenario.targetUser)}`,
      `Intended use: ${field(scenario.intendedUse)}`,
      `Non-goals: No validated compliance claims in dry run.`,
      `Data sensitivity: ${field(scenario.dataSensitivity)}`,
      `Security level: ${field(scenario.securityLevel)}`,
      `GxP mode: ${field(scenario.gxpRelevance)}`,
      `Import/integration needs: ${field(scenario.integrations)}`,
      `Documentation mode: ${field(scenario.documentationMode)}`,
      "",
      "## Intake Status",
      "",
      blockers.length ? "Blocked pending discovery." : "Ready for charter review."
    ].join("\n")
  );

  writeFile(
    path.join(outDir, "03-product-build-charter.md"),
    [
      "# Product Build Charter",
      "",
      `Product: ${scenario.productName}`,
      `Approved to plan: ${scenario.approvedToPlan ? "Yes" : "No"}`,
      `Charter approved: ${scenario.charterApproved ? "Yes" : "No"}`,
      "",
      "## Scope",
      "",
      "Dry-run only. Simulates the Factory process without building product code.",
      "",
      "## Approval",
      "",
      scenario.charterApproved
        ? "Approved for dry-run simulation."
        : "Not approved. Build tickets are blocked."
    ].join("\n")
  );

  writeFile(
    path.join(outDir, "04-requirements.md"),
    [
      "# Requirements",
      "",
      scenario.requirements.length
        ? scenario.requirements.map((req) => `- ${req.id}: ${req.text}`).join("\n")
        : "- No requirements. Discovery required."
    ].join("\n")
  );

  writeFile(
    path.join(outDir, "05-architecture.md"),
    [
      "# Architecture",
      "",
      "Default Architecture: Factory dry-run architecture.",
      "",
      "## Modules",
      "",
      list(scenario.reusePotential),
      "",
      "## Data",
      "",
      `Classification: ${field(scenario.dataSensitivity)}`,
      "",
      "## Security",
      "",
      `Security level: ${field(scenario.securityLevel)}`,
      "",
      "## Rule",
      "",
      "No implementation architecture is accepted in a dry run."
    ].join("\n")
  );

  writeFile(
    path.join(outDir, "06-tickets.md"),
    [
      "# Tickets",
      "",
      scenario.tickets.length
        ? scenario.tickets
            .map(
              (ticket) =>
                `## ${ticket.id}\n\n` +
                `Owner: ${ticket.owner}\n\n` +
                `Linked requirement: ${ticket.requirement}\n\n` +
                `Objective: ${ticket.objective}\n\n` +
                "Required evidence: Agent evidence record.\n"
            )
            .join("\n")
        : "No implementation tickets allowed. Discovery required."
    ].join("\n")
  );

  for (const record of agents) {
    const file = `${record.agent.toLowerCase().replaceAll(" ", "-")}.md`;
    writeFile(path.join(evidenceDir, file), markdownAgentRecord(record));
  }

  writeFile(
    path.join(outDir, "08-decision-challenge.md"),
    [
      "# Decision Challenge",
      "",
      `Status: ${blockers.length ? "Challenge" : "Pass"}`,
      "",
      "## Challenger Findings",
      "",
      blockers.length
        ? list(blockers)
        : list([
            "No critical blocker found for dry-run process.",
            "Commercial assumptions must remain labeled until validation.",
            "No customer-facing compliance claim is allowed."
          ]),
      "",
      "## Recommendation",
      "",
      status === "PASS"
        ? "Proceed only as a dry-run validation of Factory controls."
        : "Do not proceed to build. Complete discovery first."
    ].join("\n")
  );

  writeFile(
    path.join(outDir, "09-release-gates.md"),
    [
      "# Release Gates",
      "",
      table([
        ["Gate", "Result", "Evidence"],
        ["---", "---", "---"],
        ["Scope", scenario.charterApproved ? "Pass" : "Blocked", "03-product-build-charter.md"],
        ["Functional", "Pass", "Dry-run file generation completed"],
        ["UX", "Not applicable", "No user interface in dry run"],
        ["Security", blockers.some((b) => b.includes("security")) ? "Blocked" : "Pass", "No secrets used"],
        ["Architecture", scenario.requirements.length ? "Pass" : "Blocked", "05-architecture.md"],
        ["Data", scenario.dataSensitivity !== "Unknown" ? "Pass" : "Blocked", "02-product-intake.md"],
        ["Commercial", gateResult(scenario), "01-product-market-gate.md"],
        ["Evidence", "Pass", "07-agent-evidence/"],
        ["Human Approval", scenario.charterApproved ? "Pass" : "Blocked", "03-product-build-charter.md"]
      ]),
      "",
      "## Release Decision",
      "",
      status
    ].join("\n")
  );

  const summaryRows = agents.map((agent) => [
    agent.agent,
    agent.role,
    agent.status
  ]);

  writeFile(
    path.join(outDir, "10-dry-run-report.md"),
    [
      "# Factory Dry Run Report",
      "",
      `Run ID: ${runId}`,
      `Scenario: ${scenarioName}`,
      `Product: ${scenario.productName}`,
      `Final status: ${status}`,
      "",
      "## Agent Summary",
      "",
      table([["Agent", "Role", "Status"], ["---", "---", "---"], ...summaryRows]),
      "",
      "## Blockers",
      "",
      list(blockers),
      "",
      "## Next Action",
      "",
      status === "PASS"
        ? "Factory dry-run controls passed. Product 001 still requires real intake."
        : "Resolve blockers through discovery before any product build."
    ].join("\n")
  );

  writeFile(
    path.join(outDir, "report.json"),
    JSON.stringify(
      {
        runId,
        scenario: scenarioName,
        product: scenario.productName,
        status,
        gateResult: gateResult(scenario),
        scoreTotal: score.total,
        blockers,
        agents
      },
      null,
      2
    )
  );

  writeFile(
    path.join(rootDir, "products", scenario.slug, "LATEST.md"),
    [
      "# Latest Dry Run",
      "",
      `Latest run: ${runId}`,
      `Path: ${outDir}`,
      `Status: ${status}`
    ].join("\n")
  );

  return { outDir, status, blockers };
}

function main() {
  const [, , command, scenarioName = "sample-product"] = process.argv;
  if (command !== "run") {
    console.log(usage());
    process.exit(command ? 1 : 0);
  }

  const result = createDryRun(scenarioName);
  console.log(`Factory dry run complete: ${result.status}`);
  console.log(`Output: ${result.outDir}`);
  if (result.blockers.length) {
    console.log("Blockers:");
    for (const blocker of result.blockers) console.log(`- ${blocker}`);
  }
}

main();


```
