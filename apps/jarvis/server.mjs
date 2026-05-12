#!/usr/bin/env node

import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const appDir = __dirname;
const rootDir = path.resolve(appDir, "../..");
const publicDir = path.join(appDir, "public");
const dryRunTool = path.join(rootDir, "factory/tools/factory-dry-run.mjs");
const jobsDir = path.join(rootDir, "factory/jobs");
const jobGraphFile = path.join(jobsDir, "jarvis-job-graph.json");
const learningDir = path.join(rootDir, "factory/learning");
const learningLedgerFile = path.join(learningDir, "learning-ledger.json");
const learningInterviewsDir = path.join(learningDir, "interviews");
const port = Number(process.env.PORT || 4173);
const startedAt = new Date().toISOString();

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml"
};

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

let agentRuntime = freshRuntime();
let agentTimeline = [
  {
    at: startedAt,
    agent: "moderator",
    type: "system",
    message: "Factory agent runtime initialized from Factory 1.0 workflow."
  }
];
let lastAlignedRunId = "";
let jobGraph = loadJobGraph();
let learningLedger = loadLearningLedger();

function json(res, status, data) {
  res.writeHead(status, { "content-type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(data, null, 2));
}

function notFound(res) {
  json(res, 404, { error: "Not found" });
}

function methodNotAllowed(res, allowed, message) {
  res.writeHead(405, {
    allow: allowed,
    "content-type": "application/json; charset=utf-8"
  });
  res.end(JSON.stringify({ ok: false, error: message }, null, 2));
}

function requireMethod(req, res, allowed, message) {
  if (req.method === allowed) return true;
  methodNotAllowed(res, allowed, message);
  return false;
}

function serverError(res, error) {
  console.error(error);
  json(res, 500, {
    ok: false,
    error: error.message || "Jarvis server error.",
    recovery: "Refresh Jarvis. If this repeats, restart with pnpm jarvis:dev."
  });
}

function ensureFactoryStorage() {
  [jobsDir, learningDir, learningInterviewsDir].forEach((directory) => {
    fs.mkdirSync(directory, { recursive: true });
  });
}

function readJsonFile(filePath, fallback) {
  try {
    if (!fs.existsSync(filePath)) return fallback;
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return fallback;
  }
}

function writeJsonFile(filePath, data) {
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`);
}

function seedJobGraph() {
  const now = new Date().toISOString();
  return {
    schemaVersion: 1,
    updatedAt: now,
    policy:
      "Agents can run in parallel only when dependencies, file ownership, contracts, tests, and evidence paths are clear.",
    jobs: [
      {
        id: "market-gate",
        title: "Market gate check",
        agent: "product",
        state: "done",
        dependsOn: [],
        blocks: ["product-intake"],
        parallelSafe: false,
        fileLocks: ["factory/commercial/product-market-gate.md"],
        contracts: ["Buyer, pain, urgency, distribution, willingness to pay"],
        evidenceRequired: ["01-product-market-gate.md"],
        approvalRequired: true,
        stopConditions: ["No buyer", "No painful workflow", "No distribution path"]
      },
      {
        id: "product-intake",
        title: "Product intake and classification",
        agent: "intake",
        state: "done",
        dependsOn: ["market-gate"],
        blocks: ["architecture-contract"],
        parallelSafe: false,
        fileLocks: ["factory/templates/product-intake-template.md"],
        contracts: ["Intended use", "data classification", "security level"],
        evidenceRequired: ["02-product-intake.md"],
        approvalRequired: false,
        stopConditions: ["Unknown intended use", "Unknown data/security class"]
      },
      {
        id: "architecture-contract",
        title: "Architecture and shared contracts",
        agent: "architecture",
        state: "done",
        dependsOn: ["product-intake"],
        blocks: ["backend-api", "frontend-ui", "challenge-review"],
        parallelSafe: false,
        fileLocks: ["factory/architecture/default-architecture.md"],
        contracts: ["API shape", "tenant boundary", "data model"],
        evidenceRequired: ["05-architecture.md", "ADR if changed"],
        approvalRequired: true,
        stopConditions: ["Contract unclear", "tenant boundary unclear"]
      },
      {
        id: "backend-api",
        title: "Backend API slice",
        agent: "backend",
        state: "ready",
        dependsOn: ["architecture-contract"],
        blocks: ["qa-security", "evidence-bundle"],
        parallelSafe: true,
        fileLocks: ["products/*/backend"],
        contracts: ["API request/response contract"],
        evidenceRequired: ["changed files", "unit/API checks"],
        approvalRequired: false,
        stopConditions: ["Auth model unclear", "API contract changes"]
      },
      {
        id: "frontend-ui",
        title: "Frontend UX slice",
        agent: "frontend",
        state: "ready",
        dependsOn: ["architecture-contract"],
        blocks: ["qa-security", "evidence-bundle"],
        parallelSafe: true,
        fileLocks: ["products/*/frontend"],
        contracts: ["UX flow", "component props", "API contract"],
        evidenceRequired: ["changed files", "screenshot", "responsive check"],
        approvalRequired: false,
        stopConditions: ["Primary workflow unclear", "API contract missing"]
      },
      {
        id: "challenge-review",
        title: "Decision challenge",
        agent: "challenge",
        state: "ready",
        dependsOn: ["market-gate", "architecture-contract"],
        blocks: ["steering-release"],
        parallelSafe: true,
        fileLocks: [],
        contracts: ["Risk assumptions"],
        evidenceRequired: ["08-decision-challenge.md"],
        approvalRequired: false,
        stopConditions: ["Critical assumption unresolved"]
      },
      {
        id: "qa-security",
        title: "QA and security verification",
        agent: "qa",
        state: "waiting",
        dependsOn: ["backend-api", "frontend-ui"],
        blocks: ["evidence-bundle", "steering-release"],
        parallelSafe: true,
        fileLocks: [],
        contracts: ["Test plan", "security baseline"],
        evidenceRequired: ["test output", "dependency/security scan"],
        approvalRequired: false,
        stopConditions: ["Critical finding", "secret exposure"]
      },
      {
        id: "evidence-bundle",
        title: "Evidence bundle",
        agent: "evidence",
        state: "waiting",
        dependsOn: ["backend-api", "frontend-ui", "qa-security"],
        blocks: ["steering-release"],
        parallelSafe: true,
        fileLocks: ["products/*/release-evidence"],
        contracts: ["Evidence ledger"],
        evidenceRequired: ["changed files", "checks", "risks", "decisions"],
        approvalRequired: false,
        stopConditions: ["Missing test output", "missing changed-file list"]
      },
      {
        id: "steering-release",
        title: "Steering release approval",
        agent: "steering",
        state: "waiting",
        dependsOn: ["qa-security", "evidence-bundle", "challenge-review"],
        blocks: [],
        parallelSafe: false,
        fileLocks: [],
        contracts: ["Release gate"],
        evidenceRequired: ["09-release-gates.md"],
        approvalRequired: true,
        stopConditions: ["Human approval missing", "release gate incomplete"]
      }
    ]
  };
}

function loadJobGraph() {
  ensureFactoryStorage();
  const graph = readJsonFile(jobGraphFile, seedJobGraph());
  if (!fs.existsSync(jobGraphFile)) writeJsonFile(jobGraphFile, graph);
  return graph;
}

function saveJobGraph() {
  jobGraph.updatedAt = new Date().toISOString();
  writeJsonFile(jobGraphFile, jobGraph);
}

function loadLearningLedger() {
  ensureFactoryStorage();
  const ledger = readJsonFile(learningLedgerFile, {
    schemaVersion: 1,
    updatedAt: new Date().toISOString(),
    trainingPolicy:
      "Continuous learning means reviewed lessons, interviews, eval prompts, and training candidates. Fine-tuning or model replacement requires human approval.",
    records: []
  });
  if (!fs.existsSync(learningLedgerFile)) writeJsonFile(learningLedgerFile, ledger);
  return ledger;
}

function saveLearningLedger() {
  learningLedger.updatedAt = new Date().toISOString();
  writeJsonFile(learningLedgerFile, learningLedger);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
      if (body.length > 50_000) {
        reject(new Error("Request body too large."));
        req.destroy();
      }
    });
    req.on("end", () => resolve(body));
    req.on("error", reject);
  });
}

async function readJson(req) {
  const body = await readBody(req);
  if (!body) return {};
  return JSON.parse(body);
}

function freshRuntime() {
  return Object.fromEntries(
    Object.entries(initialAgentRuntime).map(([key, runtime]) => [
      key,
      {
        ...runtime,
        heartbeat: runtime.state === "sleeping" ? "Idle" : "Just now",
        updatedAt: new Date().toISOString()
      }
    ])
  );
}

function addTimeline(agent, type, message) {
  agentTimeline = [
    {
      at: new Date().toISOString(),
      agent,
      type,
      message
    },
    ...agentTimeline
  ].slice(0, 40);
}

function setAgent(agent, patch, type = "state") {
  if (!agentRuntime[agent]) return;
  agentRuntime[agent] = {
    ...agentRuntime[agent],
    ...patch,
    heartbeat: new Date().toLocaleTimeString(),
    updatedAt: new Date().toISOString()
  };
  addTimeline(
    agent,
    type,
    `${agentCatalog[agent].short}: ${agentRuntime[agent].state} - ${agentRuntime[agent].task}`
  );
}

function resetAgents(message = "Agent runtime reset to Factory waiting state.") {
  agentRuntime = freshRuntime();
  addTimeline("moderator", "reset", message);
}

function agentSummary() {
  return Object.values(agentRuntime).reduce(
    (summary, runtime) => {
      summary[runtime.state] = (summary[runtime.state] || 0) + 1;
      return summary;
    },
    { sleeping: 0, waiting: 0, working: 0, blocked: 0, done: 0 }
  );
}

function agentsPayload(options = {}) {
  alignRuntimeWithLatestReport();
  return {
    agents: agentCatalog,
    runtime: agentRuntime,
    summary: agentSummary(),
    timeline: agentTimeline,
    reports: options.includeReports === false ? [] : latestReports()
  };
}

function alignRuntimeWithLatestReport() {
  const latest = latestReports()[0];
  if (!latest || latest.runId === lastAlignedRunId) return;
  lastAlignedRunId = latest.runId;
  const scenario =
    latest.slug === "product-000-dry-run-blocker"
      ? "missing-buyer"
      : "sample-product";
  resetAgents(`Agent runtime aligned with latest report: ${latest.runId}`);
  finishDryRunRuntime(scenario, latest.report?.status || "UNKNOWN");
}

function newestRun(productSlug) {
  const productDir = path.join(rootDir, "products", productSlug);
  if (!fs.existsSync(productDir)) return null;
  const runs = fs
    .readdirSync(productDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && entry.name.startsWith("run-"))
    .map((entry) => entry.name)
    .sort()
    .reverse();

  if (!runs.length) return null;
  const runDir = path.join(productDir, runs[0]);
  const reportFile = path.join(runDir, "report.json");
  const report = fs.existsSync(reportFile)
    ? JSON.parse(fs.readFileSync(reportFile, "utf8"))
    : null;

  return {
    slug: productSlug,
    runId: runs[0],
    path: runDir,
    report
  };
}

function latestReports() {
  return [
    newestRun("product-000-dry-run"),
    newestRun("product-000-dry-run-blocker")
  ].filter(Boolean).sort((a, b) => b.runId.localeCompare(a.runId));
}

function jobById(id) {
  return jobGraph.jobs.find((job) => job.id === id);
}

function dependenciesDone(job) {
  return job.dependsOn.every((dependencyId) => {
    const dependency = jobById(dependencyId);
    return dependency?.state === "done";
  });
}

function lockConflicts(job, workingJobs) {
  if (!job.fileLocks.length) return [];
  return workingJobs
    .filter((workingJob) => workingJob.id !== job.id)
    .filter((workingJob) =>
      job.fileLocks.some((lock) => workingJob.fileLocks.includes(lock))
    )
    .map((workingJob) => workingJob.id);
}

function evaluateJobGraph({ mutate = false } = {}) {
  const workingJobs = jobGraph.jobs.filter((job) => job.state === "working");
  const evaluated = jobGraph.jobs.map((job) => {
    const missingDependencies = job.dependsOn.filter((dependencyId) => {
      const dependency = jobById(dependencyId);
      return dependency?.state !== "done";
    });
    const conflicts = lockConflicts(job, workingJobs);
    let computedState = job.state;
    let waitingFor = "";

    if (["queued", "ready", "waiting"].includes(job.state)) {
      if (missingDependencies.length) {
        computedState = "waiting";
        waitingFor = `Depends on: ${missingDependencies.join(", ")}`;
      } else if (conflicts.length) {
        computedState = "waiting";
        waitingFor = `File lock conflict with: ${conflicts.join(", ")}`;
      } else {
        computedState = "ready";
        waitingFor = "Dependencies clear";
      }
    }

    if (mutate) {
      job.state = computedState;
      job.waitingFor = waitingFor;
      job.updatedAt = new Date().toISOString();
    }

    return {
      ...job,
      computedState,
      waitingFor,
      missingDependencies,
      conflicts
    };
  });

  if (mutate) saveJobGraph();
  return evaluated;
}

function jobSummary(jobs = evaluateJobGraph()) {
  return jobs.reduce(
    (summary, job) => {
      const state = job.computedState || job.state;
      summary[state] = (summary[state] || 0) + 1;
      return summary;
    },
    {
      queued: 0,
      ready: 0,
      working: 0,
      waiting: 0,
      blocked: 0,
      review: 0,
      done: 0,
      rejected: 0
    }
  );
}

function jobsPayload() {
  const jobs = evaluateJobGraph();
  return {
    policy: jobGraph.policy,
    updatedAt: jobGraph.updatedAt,
    jobs,
    summary: jobSummary(jobs),
    parallelReady: jobs.filter(
      (job) => job.computedState === "ready" && job.parallelSafe
    ),
    blockers: jobs.filter((job) =>
      ["blocked", "waiting"].includes(job.computedState || job.state)
    ),
    fileLocks: jobs
      .filter((job) => job.state === "working")
      .flatMap((job) => job.fileLocks.map((lock) => ({ lock, job: job.id })))
  };
}

function planParallelJobs() {
  evaluateJobGraph({ mutate: true });
  addTimeline(
    "moderator",
    "dependency-plan",
    "Moderator: ready - Dependency graph evaluated for parallel-safe work"
  );
  setAgent("moderator", {
    state: "waiting",
    task: "Dependency graph evaluated",
    waitingFor: "Human start command for ready jobs"
  });
  return jobsPayload();
}

function startParallelReadyJobs() {
  evaluateJobGraph({ mutate: true });
  const workingLocks = new Set(
    jobGraph.jobs
      .filter((job) => job.state === "working")
      .flatMap((job) => job.fileLocks)
  );
  const started = [];

  for (const job of jobGraph.jobs) {
    const safe = job.parallelSafe && job.state === "ready";
    const conflicts = job.fileLocks.some((lock) => workingLocks.has(lock));
    if (!safe || conflicts) continue;
    job.state = "working";
    job.waitingFor = "Agent output and evidence record";
    job.updatedAt = new Date().toISOString();
    job.fileLocks.forEach((lock) => workingLocks.add(lock));
    started.push(job);
    setAgent(job.agent, {
      state: "working",
      task: job.title,
      waitingFor: "Evidence and dependency-safe completion"
    });
  }

  if (!started.length) {
    setAgent("moderator", {
      state: "waiting",
      task: "No parallel-safe jobs are ready",
      waitingFor: "Dependencies, approvals, or file locks to clear"
    });
  } else {
    addTimeline(
      "moderator",
      "parallel-start",
      `Moderator: working - Started ${started.length} parallel-safe job(s)`
    );
  }

  saveJobGraph();

  if (started.length) {
    setTimeout(() => {
      for (const job of started) {
        const current = jobById(job.id);
        if (!current || current.state !== "working") continue;
        current.state = "review";
        current.waitingFor = "QA, evidence, and challenge review";
        current.updatedAt = new Date().toISOString();
        setAgent(current.agent, {
          state: "waiting",
          task: `${current.title} ready for review`,
          waitingFor: "QA/Security and Evidence review"
        });
      }
      evaluateJobGraph({ mutate: true });
      addTimeline(
        "moderator",
        "parallel-review",
        "Moderator: waiting - Parallel jobs moved to review"
      );
    }, 2200);
  }

  return {
    ...jobsPayload(),
    started: started.map((job) => ({
      id: job.id,
      title: job.title,
      agent: job.agent
    }))
  };
}

function checkLocalLlm() {
  return new Promise((resolve) => {
    const req = http.request(
      {
        hostname: "127.0.0.1",
        port: 11434,
        path: "/api/tags",
        method: "GET",
        timeout: 900
      },
      (ollamaRes) => {
        let body = "";
        ollamaRes.on("data", (chunk) => {
          body += chunk.toString();
        });
        ollamaRes.on("end", () => {
          try {
            const parsed = JSON.parse(body || "{}");
            const models = (parsed.models || []).map((model) => ({
              name: model.name,
              modifiedAt: model.modified_at,
              size: model.size
            }));
            resolve({
              available: true,
              models,
              status: models.length ? "ONLINE" : "READY NO MODELS",
              role:
                "Local LLM can help with small offline drafts, summaries, and simple code notes. It cannot approve gates or replace Codex/Claude for product builds."
            });
          } catch (error) {
            resolve({
              available: false,
              models: [],
              status: "UNREADABLE",
              error: error.message
            });
          }
        });
      }
    );

    req.on("timeout", () => {
      req.destroy(new Error("Timed out while checking Ollama."));
    });
    req.on("error", (error) => {
      resolve({
        available: false,
        models: [],
        status: "OFFLINE",
        error: error.message,
        role:
          "Offline local mode needs Ollama running and at least one small model installed."
      });
    });
    req.end();
  });
}

function askOllama(model, prompt, options = {}) {
  return new Promise((resolve) => {
    const body = JSON.stringify({
      model,
      prompt,
      stream: false,
      options: {
        temperature: 0.2,
        num_predict: options.numPredict || 140
      }
    });
    const req = http.request(
      {
        hostname: "127.0.0.1",
        port: 11434,
        path: "/api/generate",
        method: "POST",
        timeout: options.timeoutMs || 2500,
        headers: {
          "content-type": "application/json",
          "content-length": Buffer.byteLength(body)
        }
      },
      (ollamaRes) => {
        let data = "";
        ollamaRes.on("data", (chunk) => {
          data += chunk.toString();
        });
        ollamaRes.on("end", () => {
          try {
            const parsed = JSON.parse(data || "{}");
            resolve({
              ok: true,
              model,
              response: String(parsed.response || "").trim()
            });
          } catch (error) {
            resolve({ ok: false, model, error: error.message });
          }
        });
      }
    );

    req.on("timeout", () => {
      req.destroy(new Error("Timed out while asking Ollama."));
    });
    req.on("error", (error) => {
      resolve({ ok: false, model, error: error.message });
    });
    req.write(body);
    req.end();
  });
}

const learningActions = [
  "Observe latest Factory reports and agent runtime.",
  "Interview each agent for current work, dependency risk, and evidence gap.",
  "Cross-check the interview summary with local Ollama when available.",
  "Extract reusable lessons, anti-patterns, and evaluation prompts.",
  "Append learning record to the local Factory learning ledger.",
  "Hold fine-tuning, model replacement, and gate changes for human approval."
];

function interviewAgents() {
  return Object.entries(agentCatalog).map(([key, agent]) => {
    const runtime = agentRuntime[key];
    const relatedJobs = jobGraph.jobs.filter((job) => job.agent === key);
    return {
      agent: agent.title,
      state: runtime?.state || "unknown",
      currentWork: runtime?.task || "No runtime task",
      waitingFor: runtime?.waitingFor || "Nothing recorded",
      dependencyRisk:
        relatedJobs.find((job) => ["waiting", "blocked"].includes(job.state))
          ?.waitingFor || "No blocking dependency recorded",
      evidenceQuestion:
        "What evidence would prove your work is safe, useful, and complete?",
      recommendedEvidence:
        relatedJobs.flatMap((job) => job.evidenceRequired || []).slice(0, 4)
    };
  });
}

function learningRecordSummary(record) {
  return {
    id: record.id,
    createdAt: record.createdAt,
    latestRun: record.latestRun,
    latestStatus: record.latestStatus,
    ollama: {
      status: record.ollama?.status || "UNKNOWN",
      model: record.ollama?.model || "",
      error: record.ollama?.error || ""
    },
    lessons: (record.lessons || []).slice(0, 6),
    nextActions: (record.nextActions || []).slice(0, 4),
    filePath: record.filePath
  };
}

function learningPayload() {
  return {
    policy: learningLedger.trainingPolicy,
    actions: learningActions,
    records: learningLedger.records.slice(0, 8).map(learningRecordSummary),
    ledgerPath: learningLedgerFile,
    interviewDirectory: learningInterviewsDir
  };
}

function recentLearningRecordFor(runId, minutes = 30) {
  if (!runId) return null;
  const cutoff = Date.now() - minutes * 60 * 1000;
  return (
    learningLedger.records.find((record) => {
      const createdAt = Date.parse(record.createdAt || "");
      return record.latestRun === runId && createdAt >= cutoff;
    }) || null
  );
}

function addOwnerAction(actions, seen, action) {
  if (seen.has(action.id)) return;
  seen.add(action.id);
  actions.push({
    owner: "You",
    status: "open",
    priority: "medium",
    type: "review",
    source: "",
    ...action
  });
}

function actionsPayload() {
  alignRuntimeWithLatestReport();
  const reports = latestReports();
  const latest = reports[0];
  const jobs = jobsPayload();
  const learning = learningPayload();
  const latestLearning = learning.records[0];
  const actions = [];
  const seen = new Set();

  if (latest?.report?.status === "NEEDS DISCOVERY") {
    const blockers = Array.isArray(latest.report.blockers)
      ? latest.report.blockers
      : [];
    addOwnerAction(actions, seen, {
      id: "market-discovery-inputs",
      priority: "high",
      type: "input",
      agent: "Product Market Agent",
      title: "Complete market discovery inputs",
      detail: blockers.length
        ? blockers.join(" ")
        : "Factory cannot start a product build without buyer, use, data, security, and distribution clarity.",
      next:
        "Provide target buyer, user, painful workflow, intended use, pricing signal, data class, security level, and distribution path.",
      source: latest.runId
    });
  }

  if (latest?.report?.status === "PASS") {
    addOwnerAction(actions, seen, {
      id: "review-pass-evidence",
      priority: "medium",
      type: "review",
      agent: "Evidence Agent",
      title: "Review latest PASS evidence",
      detail:
        "The dry run passed, but a real product build still needs human approval before release or deployment.",
      next: "Open the latest report, confirm the evidence, then decide whether to approve the next real build step.",
      source: latest.runId
    });
  }

  for (const job of jobs.jobs) {
    const state = job.computedState || job.state;
    const agent = agentCatalog[job.agent]?.title || job.agent;

    if (state === "review") {
      addOwnerAction(actions, seen, {
        id: `review-${job.id}`,
        priority: "medium",
        type: "review",
        agent,
        title: `Review ${job.title}`,
        detail: job.evidenceRequired?.length
          ? `Evidence expected: ${job.evidenceRequired.join(", ")}.`
          : "Agent output is waiting for review.",
        next: "Ask QA, Evidence, and Challenger to verify before marking this job done.",
        source: job.id
      });
    }

    if (job.approvalRequired && !["done", "rejected"].includes(state)) {
      addOwnerAction(actions, seen, {
        id: `approval-${job.id}`,
        priority: state === "blocked" ? "high" : "medium",
        type: "approval",
        agent,
        title: `Approval needed: ${job.title}`,
        detail: job.waitingFor || "This gate is configured as human approval required.",
        next: "Approve only after evidence, risk, and dependency checks are visible.",
        source: job.id
      });
    }
  }

  const humanWaitPattern =
    /human|owner|approval|review|buyer|market|intended use|data|security|distribution|charter/i;
  for (const [key, runtime] of Object.entries(agentRuntime)) {
    if (!humanWaitPattern.test(runtime.waitingFor || "")) continue;
    const agentTitle = agentCatalog[key]?.title || key;
    if (key === "moderator" && (latestLearning || latest?.report?.status)) continue;
    const hasSpecificAction = actions.some((action) => action.agent === agentTitle);
    if (hasSpecificAction) continue;
    addOwnerAction(actions, seen, {
      id: `agent-wait-${key}`,
      priority: runtime.state === "blocked" ? "high" : "low",
      type: runtime.state === "blocked" ? "input" : "agent-wait",
      agent: agentTitle,
      title: `${agentCatalog[key]?.short || key} is waiting`,
      detail: runtime.task,
      next: runtime.waitingFor,
      source: "agent-runtime"
    });
  }

  if (latestLearning) {
    addOwnerAction(actions, seen, {
      id: `learning-review-${latestLearning.id}`,
      priority: "low",
      type: "learning",
      agent: "Master Moderator",
      title: "Review latest learning record",
      detail: `${latestLearning.latestStatus || "Unknown status"} from ${
        latestLearning.latestRun || "no run"
      }.`,
      next:
        "Promote only approved lessons into Factory rules. Keep fine-tuning or model changes human-approved.",
      source: latestLearning.id
    });

    if (latestLearning.ollama?.status === "ERROR") {
      addOwnerAction(actions, seen, {
        id: "ollama-cross-check-retry",
        priority: "optional",
        type: "system",
        owner: "System",
        agent: "Local LLM",
        title: "Optional: retry local Ollama cross-check",
        detail:
          latestLearning.ollama.error ||
          "The local model did not complete the cross-check.",
        next: "Use a smaller model or rerun the learning loop when the laptop is idle.",
        source: latestLearning.id
      });
    }
  }

  if (!actions.length) {
    addOwnerAction(actions, seen, {
      id: "no-owner-actions",
      priority: "info",
      type: "clear",
      owner: "Jarvis",
      status: "clear",
      agent: "Master Moderator",
      title: "No owner action pending",
      detail: "Agents can continue from the current Factory state.",
      next: "Run a dry pass, dispatch an agent command, or start a new product intake.",
      source: "current-state"
    });
  }

  const priorityOrder = { high: 0, medium: 1, low: 2, optional: 3, info: 4 };
  const typeOrder = {
    input: 0,
    approval: 1,
    review: 2,
    learning: 3,
    "agent-wait": 4,
    system: 5,
    clear: 6
  };
  actions.sort((a, b) => {
    const priorityDiff =
      (priorityOrder[a.priority] ?? 9) - (priorityOrder[b.priority] ?? 9);
    if (priorityDiff) return priorityDiff;
    return (typeOrder[a.type] ?? 9) - (typeOrder[b.type] ?? 9);
  });

  const openActions = actions.filter((action) => action.status !== "clear");
  const summary = openActions.reduce(
    (counts, action) => {
      counts.total += 1;
      counts[action.priority] = (counts[action.priority] || 0) + 1;
      counts[action.type] = (counts[action.type] || 0) + 1;
      if (action.owner === "You") counts.yours += 1;
      return counts;
    },
    {
      total: 0,
      yours: 0,
      high: 0,
      medium: 0,
      low: 0,
      optional: 0,
      input: 0,
      approval: 0,
      review: 0,
      learning: 0,
      system: 0
    }
  );

  return {
    updatedAt: new Date().toISOString(),
    headline: summary.high
      ? "Owner input required"
      : summary.total
        ? "Review queue ready"
        : "No owner action pending",
    summary,
    actions
  };
}

function writeLearningInterview(record) {
  const fileName = `${record.id}.md`;
  const filePath = path.join(learningInterviewsDir, fileName);
  const agentRows = record.agentInterviews
    .map(
      (interview) =>
        `## ${interview.agent}\n\n` +
        `- State: ${interview.state}\n` +
        `- Current work: ${interview.currentWork}\n` +
        `- Waiting for: ${interview.waitingFor}\n` +
        `- Dependency risk: ${interview.dependencyRisk}\n` +
        `- Evidence prompt: ${interview.evidenceQuestion}\n` +
        `- Recommended evidence: ${
          interview.recommendedEvidence.length
            ? interview.recommendedEvidence.join(", ")
            : "None recorded"
        }\n`
    )
    .join("\n");

  const text =
    `# Moderator Learning Interview - ${record.id}\n\n` +
    `Created: ${record.createdAt}\n\n` +
    `## Policy\n\n${record.trainingPolicy}\n\n` +
    `## Actions\n\n${record.actions.map((action) => `- ${action}`).join("\n")}\n\n` +
    `${agentRows}\n` +
    `## Local Ollama Cross-Check\n\n` +
    `- Status: ${record.ollama.status}\n` +
    `- Model: ${record.ollama.model || "None"}\n` +
    `- Result: ${record.ollama.response || record.ollama.error || "Skipped"}\n`;

  fs.writeFileSync(filePath, text);
  return filePath;
}

async function runLearningCycle(options = {}) {
  const latest = latestReports()[0];
  const cachedRecord = !options.force ? recentLearningRecordFor(latest?.runId) : null;
  if (cachedRecord) {
    setAgent("moderator", {
      state: "waiting",
      task: "Learning loop reused recent record",
      waitingFor: "Human review before promoting lessons"
    });
    return {
      ok: true,
      cached: true,
      record: learningRecordSummary(cachedRecord),
      learning: learningPayload(),
      agents: agentsPayload({ includeReports: false }),
      jobs: jobsPayload(),
      actions: actionsPayload()
    };
  }

  setAgent("moderator", {
    state: "working",
    task: "Running learning loop and cross-check interviews",
    waitingFor: "Agent interviews and local Ollama cross-check"
  });

  const agentInterviews = interviewAgents();
  const localLlm = await checkLocalLlm();
  let ollama = {
    status: localLlm.status,
    model: "",
    response: "",
    error: localLlm.role || "Ollama skipped"
  };

  if (localLlm.available && localLlm.models?.length) {
    const model = localLlm.models[0].name;
    const prompt =
      "You are the local offline helper for BuildPodFactory. " +
      "Cross-check this compact Factory state. Return only concise bullets: " +
      "dependency risks, evidence gaps, and reusable learning prompts. " +
      "Do not approve gates or releases.\n\n" +
      JSON.stringify(
        {
          latestRun: latest?.runId || "none",
          status: latest?.report?.status || "unknown",
          reviewJobs: jobsPayload().jobs.filter((job) =>
            ["review", "waiting", "blocked"].includes(job.computedState || job.state)
          ).map((job) => ({
            id: job.id,
            state: job.computedState || job.state,
            waitingFor: job.waitingFor || "",
            missingDependencies: job.missingDependencies || []
          })),
          agentInterviews: agentInterviews.map((interview) => ({
            agent: interview.agent,
            state: interview.state,
            waitingFor: interview.waitingFor,
            dependencyRisk: interview.dependencyRisk
          }))
        },
        null,
        2
      );
    ollama = await askOllama(model, prompt, { timeoutMs: 2500, numPredict: 140 });
    ollama.status = ollama.ok ? "CROSS-CHECKED" : "ERROR";
  }

  const record = {
    id: `learning-${new Date().toISOString().replaceAll(":", "-").replaceAll(".", "-")}`,
    createdAt: new Date().toISOString(),
    latestRun: latest?.runId || "",
    latestStatus: latest?.report?.status || "No report",
    trainingPolicy: learningLedger.trainingPolicy,
    actions: learningActions,
    agentInterviews,
    ollama,
    lessons: [
      "Parallel work must be dependency-clear before execution.",
      "Waiting states must name the missing dependency.",
      "Local LLM learning is a reviewed memory/eval queue, not automatic fine-tuning.",
      "Human approval remains mandatory for release, security acceptance, deployment, and model training.",
      "Jarvis UI actions need visible busy, error, and recovery states before they can be trusted.",
      "Backend edits should run with pnpm jarvis:dev to avoid manual kill/start loops."
    ],
    nextActions: [
      "Review ledger entry.",
      "Convert repeated lessons into evaluation prompts.",
      "Promote approved lessons into Factory docs.",
      "Only then consider human-approved local model tuning."
    ]
  };

  record.filePath = writeLearningInterview(record);
  learningLedger.records = [record, ...learningLedger.records].slice(0, 50);
  saveLearningLedger();

  setAgent("moderator", {
    state: "waiting",
    task: "Learning loop completed and queued for human review",
    waitingFor: "Human review before any model training or rule change"
  });
  setAgent("evidence", {
    state: "done",
    task: "Learning interview evidence captured",
    waitingFor: "Review learning ledger"
  });
  addTimeline(
    "moderator",
    "learning",
    `Moderator: waiting - Learning record created at ${record.filePath}`
  );

  return {
    ok: true,
    record: learningRecordSummary(record),
    learning: learningPayload(),
    agents: agentsPayload({ includeReports: false }),
    jobs: jobsPayload(),
    actions: actionsPayload()
  };
}

function startDryRunRuntime(scenario) {
  resetAgents(`Dry-run started: ${scenario}`);
  if (scenario === "missing-buyer") {
    setAgent("moderator", {
      state: "working",
      task: "Checking whether Product 000 can enter Factory build",
      waitingFor: "Market gate result"
    });
    setAgent("product", {
      state: "working",
      task: "Testing buyer, pain, urgency, and distribution evidence",
      waitingFor: "Buyer evidence"
    });
    setAgent("evidence", {
      state: "working",
      task: "Preparing blocker evidence record",
      waitingFor: "Dry-run output"
    });
    return;
  }

  [
    ["moderator", "Orchestrating Product 000 dry-run"],
    ["product", "Validating product market gate"],
    ["intake", "Creating product intake baseline"],
    ["architecture", "Checking Factory architecture path"],
    ["backend", "Simulating backend ticket readiness"],
    ["frontend", "Simulating UX workflow readiness"],
    ["qa", "Scanning verification and security gates"],
    ["challenge", "Challenging assumptions and release risk"],
    ["evidence", "Building evidence pack"]
  ].forEach(([agent, task]) => {
    setAgent(agent, {
      state: "working",
      task,
      waitingFor: "Dry-run output"
    });
  });
}

function finishDryRunRuntime(scenario, status) {
  if (scenario === "missing-buyer" || status === "NEEDS DISCOVERY") {
    setAgent("product", {
      state: "blocked",
      task: "Market gate stopped: target buyer and pain evidence missing",
      waitingFor: "Buyer, user, painful workflow, distribution path"
    });
    setAgent("moderator", {
      state: "waiting",
      task: "Build stopped before intake, architecture, or tickets",
      waitingFor: "Completed market discovery"
    });
    setAgent("challenge", {
      state: "waiting",
      task: "Ready to challenge commercial assumptions",
      waitingFor: "Updated buyer evidence"
    });
    setAgent("evidence", {
      state: "done",
      task: "Blocker evidence captured",
      waitingFor: "Human review"
    });
    ["intake", "architecture", "backend", "frontend", "qa", "steering"].forEach(
      (agent) => {
        setAgent(agent, {
          state: initialAgentRuntime[agent].state,
          task: initialAgentRuntime[agent].task,
          waitingFor: initialAgentRuntime[agent].waitingFor
        });
      }
    );
    return;
  }

  [
    ["moderator", "Dry-run orchestrated and report linked", "Human decision before real product build"],
    ["product", "Market gate passed for Product 000", "Real product idea"],
    ["intake", "Product intake baseline created", "Real product intake inputs"],
    ["architecture", "Architecture path checked", "Real requirements"],
    ["backend", "Backend readiness simulated", "Approved backend ticket"],
    ["frontend", "UX readiness simulated", "Approved workflow"],
    ["qa", "Verification gates simulated", "Real code diff"],
    ["challenge", "Decision challenge completed", "High-impact real decision"],
    ["evidence", "Evidence pack generated", "Human review"]
  ].forEach(([agent, task, waitingFor]) => {
    setAgent(agent, {
      state: "done",
      task,
      waitingFor
    });
  });
  setAgent("steering", {
    state: "waiting",
    task: "Release gate is waiting for human approval",
    waitingFor: "Owner approval"
  });
}

function runDryRun(scenario) {
  return new Promise((resolve) => {
    startDryRunRuntime(scenario);
    const child = spawn(process.execPath, [dryRunTool, "run", scenario], {
      cwd: rootDir,
      env: process.env
    });
    let stdout = "";
    let stderr = "";
    let settled = false;

    const finish = (code, extraError = "") => {
      if (settled) return;
      settled = true;
      clearTimeout(timeout);
      if (extraError) stderr += extraError;
      const slug =
        scenario === "missing-buyer"
          ? "product-000-dry-run-blocker"
          : "product-000-dry-run";
      const result = newestRun(slug);
      const status = result?.report?.status || (code === 0 ? "UNKNOWN" : "FAILED");
      finishDryRunRuntime(scenario, status);
      if (result?.runId) lastAlignedRunId = result.runId;
      resolve({
        ok: code === 0,
        code,
        stdout,
        stderr,
        result,
        latest: latestReports(),
        agents: agentsPayload(),
        actions: actionsPayload()
      });
    };

    const timeout = setTimeout(() => {
      child.kill("SIGTERM");
      finish(124, "\nDry run timed out and was stopped by Jarvis.\n");
    }, 20000);

    child.stdout.on("data", (chunk) => {
      stdout += chunk.toString();
    });
    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });
    child.on("error", (error) => {
      finish(1, `\n${error.message}\n`);
    });
    child.on("close", (code) => {
      finish(code);
    });
  });
}

function dispatchAgent(agent, command) {
  setAgent(
    agent,
    {
      state: "working",
      task: command,
      waitingFor: "Command output and evidence"
    },
    "dispatch"
  );

  setTimeout(() => {
    setAgent(
      agent,
      {
        state: "waiting",
        task: `Evidence needed for: ${command}`,
        waitingFor: "Evidence record or human review"
      },
      "follow-up"
    );
  }, 1500);
}

async function handleApi(req, res, url) {
  if (url.pathname === "/api/status") {
    if (!requireMethod(req, res, "GET", "Use GET for status.")) return;
    json(res, 200, {
      name: "Project Jarvis",
      workspace: rootDir,
      reports: latestReports(),
      agents: agentsPayload(),
      actions: actionsPayload()
    });
    return;
  }

  if (url.pathname === "/api/health") {
    if (!requireMethod(req, res, "GET", "Use GET for health.")) return;
    json(res, 200, {
      ok: true,
      name: "Project Jarvis",
      workspace: rootDir,
      startedAt,
      time: new Date().toISOString()
    });
    return;
  }

  if (url.pathname === "/api/agents") {
    if (!requireMethod(req, res, "GET", "Use GET for agents.")) return;
    json(res, 200, agentsPayload());
    return;
  }

  if (url.pathname === "/api/jobs") {
    if (!requireMethod(req, res, "GET", "Use GET for jobs.")) return;
    json(res, 200, jobsPayload());
    return;
  }

  if (url.pathname === "/api/actions") {
    if (!requireMethod(req, res, "GET", "Use GET for actions.")) return;
    json(res, 200, actionsPayload());
    return;
  }

  if (url.pathname === "/api/jobs/plan") {
    if (!requireMethod(req, res, "POST", "Use POST for dependency planning.")) return;
    json(res, 200, {
      ok: true,
      jobs: planParallelJobs(),
      agents: agentsPayload({ includeReports: false }),
      actions: actionsPayload()
    });
    return;
  }

  if (url.pathname === "/api/jobs/start-ready") {
    if (!requireMethod(req, res, "POST", "Use POST to start ready jobs.")) return;
    json(res, 200, {
      ok: true,
      jobs: startParallelReadyJobs(),
      agents: agentsPayload({ includeReports: false }),
      actions: actionsPayload()
    });
    return;
  }

  if (url.pathname === "/api/learning") {
    if (!requireMethod(req, res, "GET", "Use GET for learning.")) return;
    json(res, 200, learningPayload());
    return;
  }

  if (url.pathname === "/api/learning/run") {
    if (!requireMethod(req, res, "POST", "Use POST to run the learning loop.")) return;
    json(res, 200, await runLearningCycle({ force: url.searchParams.get("force") === "1" }));
    return;
  }

  if (url.pathname === "/api/dispatch") {
    if (!requireMethod(req, res, "POST", "Use POST for dispatch.")) return;
    try {
      const body = await readJson(req);
      const agent = String(body.agent || "");
      const command = String(body.command || "").trim();
      if (!agentCatalog[agent]) {
        json(res, 400, { error: "Unknown agent." });
        return;
      }
      if (!command || command.length > 240) {
        json(res, 400, { error: "Command must be 1-240 characters." });
        return;
      }
      dispatchAgent(agent, command);
      json(res, 200, {
        ok: true,
        agent,
        command,
        agents: agentsPayload({ includeReports: false }),
        actions: actionsPayload()
      });
    } catch (error) {
      json(res, 400, { error: error.message });
    }
    return;
  }

  if (url.pathname === "/api/local-llm") {
    if (!requireMethod(req, res, "GET", "Use GET for local LLM status.")) return;
    json(res, 200, await checkLocalLlm());
    return;
  }

  if (url.pathname === "/api/dry-run") {
    if (!requireMethod(req, res, "POST", "Use POST for dry-runs.")) return;
    const scenario = url.searchParams.get("scenario") || "sample-product";
    if (!["sample-product", "missing-buyer"].includes(scenario)) {
      json(res, 400, { error: "Unsupported dry-run scenario." });
      return;
    }
    json(res, 200, await runDryRun(scenario));
    return;
  }

  notFound(res);
}

function serveStatic(req, res, url) {
  const requested = url.pathname === "/" ? "/index.html" : url.pathname;
  const filePath = path.normalize(path.join(publicDir, requested));

  if (!filePath.startsWith(publicDir)) {
    notFound(res);
    return;
  }

  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    notFound(res);
    return;
  }

  const ext = path.extname(filePath);
  res.writeHead(200, {
    "content-type": contentTypes[ext] || "application/octet-stream"
  });
  fs.createReadStream(filePath).pipe(res);
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    if (url.pathname.startsWith("/api/")) {
      await handleApi(req, res, url);
      return;
    }
    serveStatic(req, res, url);
  } catch (error) {
    if (res.headersSent) {
      res.end();
      return;
    }
    serverError(res, error);
  }
});

server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(
      `Port ${port} is already in use. Jarvis is probably already running at http://localhost:${port}.`
    );
    console.error("Use pnpm jarvis:dev to reuse the existing server or start one stable process.");
    process.exit(1);
  }
  throw error;
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Project Jarvis running at http://localhost:${port}`);
});
