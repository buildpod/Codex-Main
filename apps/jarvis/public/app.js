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

const initialAgentRuntime = {
  moderator: {
    state: "waiting",
    task: "Waiting for product idea, charter, or a command",
    waitingFor: "Human owner input",
    heartbeat: "Just now"
  },
  steering: {
    state: "sleeping",
    task: "Standing by for release, risk, or approval decision",
    waitingFor: "Gate escalation",
    heartbeat: "Idle"
  },
  product: {
    state: "waiting",
    task: "Waiting for a product idea with buyer and pain",
    waitingFor: "Buyer, user, problem, willingness to pay",
    heartbeat: "Idle"
  },
  intake: {
    state: "sleeping",
    task: "Standing by to create product intake record",
    waitingFor: "Passed market gate or approved bypass",
    heartbeat: "Idle"
  },
  architecture: {
    state: "sleeping",
    task: "Standing by for requirements and data model",
    waitingFor: "Approved charter and requirements",
    heartbeat: "Idle"
  },
  backend: {
    state: "sleeping",
    task: "Standing by for approved tickets",
    waitingFor: "Architecture, API contract, security model",
    heartbeat: "Idle"
  },
  frontend: {
    state: "sleeping",
    task: "Standing by for product workflow and API contract",
    waitingFor: "UX flow and interface contracts",
    heartbeat: "Idle"
  },
  qa: {
    state: "sleeping",
    task: "Standing by for code diff and test plan",
    waitingFor: "Build output",
    heartbeat: "Idle"
  },
  evidence: {
    state: "waiting",
    task: "Waiting for agent outputs and test logs",
    waitingFor: "Changed files, commands, evidence",
    heartbeat: "Idle"
  },
  challenge: {
    state: "sleeping",
    task: "Standing by for high-impact decisions",
    waitingFor: "Proposal or risk record",
    heartbeat: "Idle"
  }
};

let agentRuntime = JSON.parse(JSON.stringify(initialAgentRuntime));

const gateTemplate = [
  ["Market", "watch"],
  ["Intake", "pass"],
  ["Charter", "pass"],
  ["Architecture", "pass"],
  ["Tickets", "pass"],
  ["Build", "watch"],
  ["Test", "watch"],
  ["Challenge", "watch"],
  ["Evidence", "pass"],
  ["Release", "block"]
];

const orbitalMap = document.querySelector("#orbitalMap");
const beamLayer = document.querySelector("#beamLayer");
const gateTrack = document.querySelector("#gateTrack");
const consoleOutput = document.querySelector("#consoleOutput");
const evidenceCount = document.querySelector("#evidenceCount");
const lastStatus = document.querySelector("#lastStatus");
const lastRun = document.querySelector("#lastRun");
const agentStatusGrid = document.querySelector("#agentStatusGrid");
const runBadge = document.querySelector("#runBadge");
const linkBadge = document.querySelector("#linkBadge");
const queueList = document.querySelector("#queueList");
const queueSignal = document.querySelector("#queueSignal");
const gateSignal = document.querySelector("#gateSignal");
const coreSignal = document.querySelector("#coreSignal");
const meshSignal = document.querySelector("#meshSignal");
const decisionSignal = document.querySelector("#decisionSignal");
const activeAgentMetric = document.querySelector("#activeAgentMetric");
const activeAgentTask = document.querySelector("#activeAgentTask");
const localLlmStatus = document.querySelector("#localLlmStatus");
const localLlmDetail = document.querySelector("#localLlmDetail");
const actionBriefTitle = document.querySelector("#actionBriefTitle");
const actionBriefBody = document.querySelector("#actionBriefBody");
const stateSummary = document.querySelector("#stateSummary");
const agentState = document.querySelector("#agentState");
const agentRuntimeState = document.querySelector("#agentRuntimeState");
const agentRuntimeTask = document.querySelector("#agentRuntimeTask");
const agentRuntimeWaiting = document.querySelector("#agentRuntimeWaiting");
const agentRuntimeHeartbeat = document.querySelector("#agentRuntimeHeartbeat");
const commandInput = document.querySelector("#commandInput");
const jobSignal = document.querySelector("#jobSignal");
const jobSummary = document.querySelector("#jobSummary");
const jobList = document.querySelector("#jobList");
const learningSignal = document.querySelector("#learningSignal");
const learningPolicy = document.querySelector("#learningPolicy");
const learningActions = document.querySelector("#learningActions");
const learningList = document.querySelector("#learningList");
const ownerActionSignal = document.querySelector("#ownerActionSignal");
const ownerActionHeadline = document.querySelector("#ownerActionHeadline");
const ownerActionCounts = document.querySelector("#ownerActionCounts");
const ownerActionList = document.querySelector("#ownerActionList");
const cursorGlow = document.querySelector("#cursorGlow");
const canvas = document.querySelector("#neuralCanvas");
const ctx = canvas.getContext("2d");

let selectedAgent = "moderator";
let queue = [];
let frame = 0;
let currentStatus = "Standby";
let particles = [];
let pointer = { x: window.innerWidth * 0.5, y: window.innerHeight * 0.45 };
let latestTimelineAt = "";
let latestLearningId = "";

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function stateLabel(state) {
  return state
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function updateAgentRuntime(key, patch) {
  agentRuntime[key] = {
    ...agentRuntime[key],
    ...patch,
    heartbeat: patch.heartbeat || new Date().toLocaleTimeString()
  };
  renderAgentStatusBoard();
  if (key === selectedAgent) renderWorkers(agents[key]);
  updateSelectedRuntime();
  updateOrbitalStates();
}

function applyAgentsPayload(payload, options = {}) {
  if (!payload?.runtime) return;
  agentRuntime = {
    ...JSON.parse(JSON.stringify(initialAgentRuntime)),
    ...payload.runtime
  };
  renderAgentStatusBoard();
  renderWorkers(agents[selectedAgent]);
  updateSelectedRuntime();
  updateOrbitalStates();
  if (payload.reports) applyReportMetrics(payload.reports);

  const latest = payload.timeline?.[0];
  if (options.logTimeline && latest && latest.at !== latestTimelineAt) {
    latestTimelineAt = latest.at;
    const agent = agents[latest.agent]?.short || latest.agent;
    log(`${agent}: ${latest.message}`);
  }
}

async function syncAgentsFromServer(options = {}) {
  const payload = await requestJson("/api/agents", {}, "Sync agents");
  applyAgentsPayload(payload, options);
  return payload;
}

function renderJobs(payload) {
  const summary = payload.summary || {};
  const readyCount = payload.parallelReady?.length || 0;
  jobSignal.textContent = `${readyCount} ready`;
  jobSummary.innerHTML = ["ready", "working", "waiting", "review", "done", "blocked"]
    .map(
      (state) => `
        <span>${state}<strong>${summary[state] || 0}</strong></span>
      `
    )
    .join("");

  jobList.innerHTML = (payload.jobs || [])
    .map((job) => {
      const state = job.computedState || job.state;
      const deps = job.dependsOn?.length ? job.dependsOn.join(", ") : "none";
      const locks = job.fileLocks?.length ? job.fileLocks : ["no exclusive lock"];
      return `
        <article class="job-card ${escapeHtml(state)}">
          <div>
            <h3>${escapeHtml(job.title)}</h3>
            <p>${escapeHtml(job.waitingFor || "Dependencies clear")}</p>
            <div class="job-meta">
              <span>${escapeHtml(job.agent)}</span>
              <span>${escapeHtml(state)}</span>
              <span>${job.parallelSafe ? "parallel safe" : "sequenced"}</span>
              <span>${job.approvalRequired ? "approval" : "no approval"}</span>
            </div>
          </div>
          <div>
            <p>Depends on: ${escapeHtml(deps)}</p>
            <div class="job-locks">
              ${locks.map((lock) => `<span>${escapeHtml(lock)}</span>`).join("")}
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

async function refreshJobs() {
  const payload = await requestJson("/api/jobs", {}, "Refresh jobs");
  renderJobs(payload);
  return payload;
}

function renderLearning(payload) {
  learningPolicy.textContent = payload.policy || "Learning policy unavailable.";
  learningActions.innerHTML = (payload.actions || [])
    .map((action) => `<span>${escapeHtml(action)}</span>`)
    .join("");
  const records = payload.records || [];
  learningSignal.textContent = `${records.length} records`;
  if (!records.length) {
    learningList.innerHTML = `
      <article class="learning-record">
        <h3>No learning records yet</h3>
        <p>Run the Learning Loop after a dry run or agent command.</p>
      </article>
    `;
    return;
  }
  learningList.innerHTML = records
    .map(
      (record) => `
        <article class="learning-record">
          <h3>${escapeHtml(record.id)}</h3>
          <p><strong>${escapeHtml(record.latestStatus)}</strong> from ${escapeHtml(record.latestRun || "no run")}</p>
          <p>Ollama: ${escapeHtml(record.ollama?.status || "skipped")} ${record.ollama?.model ? `(${escapeHtml(record.ollama.model)})` : ""}</p>
          <p>${escapeHtml(record.filePath || payload.ledgerPath || "")}</p>
        </article>
      `
    )
    .join("");
}

async function refreshLearning(options = {}) {
  const payload = await requestJson("/api/learning", {}, "Refresh learning");
  renderLearning(payload);
  const latest = payload.records?.[0];
  if (options.logLatest && latest && latest.id !== latestLearningId) {
    latestLearningId = latest.id;
    log(`Learning record ready: ${latest.id}`);
  }
  return payload;
}

function safeClassToken(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-");
}

function renderOwnerActions(payload) {
  const summary = payload.summary || {};
  const actions = payload.actions || [];
  const total = summary.total || 0;
  ownerActionHeadline.textContent = payload.headline || "Task summary unavailable";
  ownerActionSignal.textContent = total ? `${summary.yours || total} for you` : "Clear";
  ownerActionSignal.dataset.status = summary.high ? "high" : total ? "open" : "clear";
  ownerActionCounts.innerHTML = [
    ["Open", total],
    ["High", summary.high || 0],
    ["Input", summary.input || 0],
    ["Review", summary.review || 0],
    ["Approval", summary.approval || 0]
  ]
    .map(([label, count]) => `<span>${label}<strong>${count}</strong></span>`)
    .join("");

  ownerActionList.innerHTML = actions
    .map((action) => {
      const priority = safeClassToken(action.priority || "medium");
      const type = safeClassToken(action.type || "review");
      return `
        <article class="owner-action-card ${priority} ${type}">
          <div class="owner-action-top">
            <span>${escapeHtml(action.owner || "You")}</span>
            <span>${escapeHtml(action.agent || "Factory")}</span>
            <span>${escapeHtml(action.priority || "medium")}</span>
          </div>
          <h3>${escapeHtml(action.title || "Untitled action")}</h3>
          <p>${escapeHtml(action.detail || "No detail recorded.")}</p>
          <div class="owner-action-next">
            <strong>Next</strong>
            <span>${escapeHtml(action.next || "No next step recorded.")}</span>
          </div>
        </article>
      `;
    })
    .join("");
}

async function refreshOwnerActions(payload) {
  if (payload) {
    renderOwnerActions(payload);
    return payload;
  }
  const data = await requestJson("/api/actions", {}, "Refresh owner actions");
  renderOwnerActions(data);
  return data;
}

function resetAgentRuntime() {
  agentRuntime = JSON.parse(JSON.stringify(initialAgentRuntime));
  renderAgentStatusBoard();
  updateSelectedRuntime();
  updateOrbitalStates();
}

function renderOrbitals() {
  const entries = Object.entries(agents).filter(([key]) => key !== "moderator");
  orbitalMap.insertAdjacentHTML(
    "beforeend",
    entries
      .map(([key, agent], index) => {
        const delay = `${index * -0.45}s`;
        return `
          <button
            class="orbital"
            style="--x: ${agent.x}%; --y: ${agent.y}%; --accent: ${agent.accent}; --delay: ${delay};"
            data-agent="${key}"
          >
            <span>${agent.type}</span>
            <strong>${agent.short}</strong>
            <small data-agent-state="${key}">${stateLabel(agentRuntime[key].state)}</small>
          </button>
        `;
      })
      .join("")
  );
}

function updateOrbitalStates() {
  document.querySelectorAll("[data-agent]").forEach((button) => {
    const key = button.dataset.agent;
    const runtime = agentRuntime[key];
    if (!runtime) return;
    button.dataset.state = runtime.state;
    const status = button.querySelector("[data-agent-state]");
    if (status) status.textContent = stateLabel(runtime.state);
  });
}

function renderAgentStatusBoard() {
  const counts = Object.values(agentRuntime).reduce((summary, runtime) => {
    summary[runtime.state] = (summary[runtime.state] || 0) + 1;
    return summary;
  }, {});
  stateSummary.textContent = [
    `${counts.working || 0} working`,
    `${counts.blocked || 0} blocked`,
    `${counts.waiting || 0} waiting`
  ].join(" / ");

  agentStatusGrid.innerHTML = Object.entries(agents)
    .map(([key, agent]) => {
      const runtime = agentRuntime[key];
      const active = key === selectedAgent ? "active" : "";
      return `
        <button class="agent-status-card ${runtime.state} ${active}" data-agent="${key}">
          <span class="state-dot"></span>
          <div>
            <strong>${agent.short}</strong>
            <small>${stateLabel(runtime.state)} - ${runtime.task}</small>
          </div>
        </button>
      `;
    })
    .join("");
}

function renderBeams() {
  const entries = Object.entries(agents).filter(([key]) => key !== "moderator");
  const rect = orbitalMap.getBoundingClientRect();
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  beamLayer.innerHTML = entries
    .map(([key, agent]) => {
      const x = (agent.x / 100) * rect.width;
      const y = (agent.y / 100) * rect.height;
      const dx = x - centerX;
      const dy = y - centerY;
      const length = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);
      const active = selectedAgent === key ? "active" : "";
      return `
        <span
          class="beam ${active}"
          style="
            width: ${length}px;
            left: ${centerX}px;
            top: ${centerY}px;
            --angle: ${angle}deg;
            --accent: ${agent.accent};
          "
        ></span>
      `;
    })
    .join("");
}

function renderGates(overrides = {}) {
  gateTrack.innerHTML = gateTemplate
    .map(([name, state], index) => {
      const finalState = overrides[name] || state;
      return `
        <article class="gate ${finalState}">
          <span>Gate ${String(index + 1).padStart(2, "0")}</span>
          <strong>${name}</strong>
          <small>${finalState}</small>
        </article>
      `;
    })
    .join("");
}

function setList(selector, items) {
  document.querySelector(selector).innerHTML = items
    .map((item) => `<li>${item}</li>`)
    .join("");
}

function renderProtocols(agent) {
  document.querySelector("#protocolStrip").innerHTML = agent.protocols
    .map((protocol) => `<span>${protocol}</span>`)
    .join("");
}

function renderWorkers(agent) {
  const runtime = agentRuntime[selectedAgent];
  const workerState =
    runtime.state === "working"
      ? "working"
      : runtime.state === "blocked"
        ? "blocked"
        : runtime.state === "done"
          ? "done"
          : "ready";
  document.querySelector("#workerStrip").innerHTML = agent.workers
    .map(
      (worker, index) => `
        <button class="worker ${workerState}" data-worker="${escapeHtml(worker)}">
          <span>0${index + 1}</span>
          <strong>${worker}</strong>
          <small>${workerState}</small>
        </button>
      `
    )
    .join("");
}

function updateSelectedRuntime() {
  const runtime = agentRuntime[selectedAgent];
  const agent = agents[selectedAgent];
  if (!runtime || !agent) return;
  agentRuntimeState.textContent = stateLabel(runtime.state);
  agentRuntimeTask.textContent = runtime.task;
  agentRuntimeWaiting.textContent = runtime.waitingFor;
  agentRuntimeHeartbeat.textContent = runtime.heartbeat;
  activeAgentMetric.textContent = agent.short;
  activeAgentTask.textContent = runtime.task;
  agentState.textContent = `${agent.short} ${stateLabel(runtime.state)}`;
}

function selectAgent(key) {
  const agent = agents[key];
  selectedAgent = key;
  document.documentElement.style.setProperty("--active-accent", agent.accent);
  document.querySelectorAll("[data-agent]").forEach((button) => {
    const active = button.dataset.agent === key;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  document.querySelector("#detailType").textContent = agent.type;
  document.querySelector("#detailTitle").textContent = agent.title;
  document.querySelector("#detailMission").textContent = agent.mission;
  setList("#detailInputs", agent.inputs);
  setList("#detailOutputs", agent.outputs);
  renderProtocols(agent);
  renderWorkers(agent);
  document.querySelector("#detailStop").textContent = agent.stop;
  document.querySelector("#corePulseLabel").textContent =
    key === "moderator" ? "Awaiting command" : `Linked to ${agent.short}`;
  agentState.textContent = `${agent.short} selected`;
  linkBadge.textContent =
    key === "moderator" ? "Core focus" : `Linked: ${agent.short}`;
  updateSelectedRuntime();
  actionBriefTitle.textContent = `${agent.short} selected`;
  actionBriefBody.textContent = `${stateLabel(agentRuntime[key].state)} - ${agentRuntime[key].task}`;
  renderBeams();
  log(`Agent focus changed: ${agent.title}`);
}

function log(message) {
  const timestamp = new Date().toLocaleTimeString();
  consoleOutput.textContent = `[${timestamp}] ${message}\n\n${consoleOutput.textContent}`;
}

async function requestJson(url, options = {}, label = "Jarvis request") {
  const controller = new AbortController();
  const timeoutMs = options.timeoutMs || 12000;
  const allowBusinessError = Boolean(options.allowBusinessError);
  const { timeoutMs: _timeoutMs, allowBusinessError: _allowBusinessError, ...fetchOptions } = options;
  const timeout = window.setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal
    });
    const text = await response.text();
    let data = {};
    try {
      data = text ? JSON.parse(text) : {};
    } catch {
      throw new Error(`${label} returned non-JSON output.`);
    }
    if (!response.ok || (data.ok === false && !allowBusinessError)) {
      throw new Error(data.error || `${label} failed with HTTP ${response.status}.`);
    }
    return data;
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error(`${label} timed out after ${Math.round(timeoutMs / 1000)}s.`);
    }
    throw error;
  } finally {
    window.clearTimeout(timeout);
  }
}

function setActionButtonsBusy(isBusy, activeButton) {
  document.body.classList.toggle("is-busy", isBusy);
  document
    .querySelectorAll(
      "#refreshButton, #runPassButton, #runBlockerButton, #planParallelButton, " +
        "#startReadyButton, #learningLoopButton, #commandForm button"
    )
    .forEach((button) => {
      button.disabled = isBusy;
      if (!button.dataset.readyLabel) button.dataset.readyLabel = button.textContent.trim();
      if (button === activeButton) {
        button.textContent = isBusy ? "Working" : button.dataset.readyLabel;
      } else if (!isBusy) {
        button.textContent = button.dataset.readyLabel;
      }
    });
}

async function withUiAction(button, label, action) {
  setActionButtonsBusy(true, button);
  actionBriefTitle.textContent = label;
  actionBriefBody.textContent = "Running with timeout, error handling, and recovery refresh.";
  try {
    const result = await action();
    actionBriefTitle.textContent = result?.title || `${label} complete`;
    actionBriefBody.textContent = result?.body || "Jarvis state refreshed.";
    if (result?.log !== false) log(result?.message || `${label} complete.`);
    return result;
  } catch (error) {
    log(`${label} failed: ${error.message}`);
    actionBriefTitle.textContent = `${label} failed`;
    actionBriefBody.textContent = "Jarvis caught the error. Check the Evidence Stream, then retry.";
    setRunState(currentStatus === "RUNNING" ? "Standby" : currentStatus);
    refreshOwnerActions().catch((refreshError) => log(refreshError.message));
    return null;
  } finally {
    setActionButtonsBusy(false, button);
  }
}

function statusLabel(report) {
  if (!report) return "No report";
  return report.report?.status || "Unknown";
}

function applyReportMetrics(reports = [], options = {}) {
  if (currentStatus === "RUNNING" && !options.force) return;
  const latest = reports[0];
  const status = statusLabel(latest);
  evidenceCount.textContent = `${reports.length} packs`;
  lastStatus.textContent = status;
  lastRun.textContent = latest?.runId || "No run yet";
  setRunState(status === "No report" ? "Standby" : status);
}

function setRunState(status) {
  currentStatus = status;
  document.body.classList.toggle("is-blocked", status === "NEEDS DISCOVERY");
  document.body.classList.toggle("is-running", status === "RUNNING");
  document.body.classList.toggle("is-pass", status === "PASS");
  runBadge.classList.toggle("pass", status === "PASS");
  runBadge.classList.toggle("block", status === "NEEDS DISCOVERY");
  runBadge.textContent = status === "RUNNING" ? "Scanning" : status;
  coreSignal.textContent = status === "RUNNING" ? "Processing" : status;
  decisionSignal.textContent =
    status === "PASS" ? "Review ready" : "Human controlled";

  if (status === "NEEDS DISCOVERY") {
    gateSignal.textContent = "Blocked";
    renderGates({
      Market: "block",
      Intake: "block",
      Charter: "block",
      Release: "block"
    });
    return;
  }

  if (status === "PASS") {
    gateSignal.textContent = "Release review";
    renderGates({
      Market: "pass",
      Build: "pass",
      Test: "pass",
      Challenge: "pass",
      Release: "watch"
    });
    return;
  }

  gateSignal.textContent = status === "RUNNING" ? "Scanning" : "Watching";
  renderGates();
}

function addQueueItem(agentKey, command, source = "manual", autoSettle = true) {
  const agent = agents[agentKey];
  const item = {
    id: Date.now(),
    agentKey,
    agent: agent.short,
    command,
    source,
    status: "queued"
  };
  queue = [item, ...queue].slice(0, 5);
  renderQueue();
  updateAgentRuntime(agentKey, {
    state: "working",
    task: command,
    waitingFor: "Command output and evidence"
  });

  window.setTimeout(() => {
    item.status = "running";
    renderQueue();
  }, 450);

  window.setTimeout(() => {
    item.status = "evidence needed";
    renderQueue();
    if (autoSettle) {
      updateAgentRuntime(agentKey, {
        state: "waiting",
        task: `Evidence needed for: ${command}`,
        waitingFor: "Evidence record or human review"
      });
    }
  }, 1500);

  return item;
}

function updateQueueItem(item, status) {
  if (!item) return;
  item.status = status;
  renderQueue();
}

function renderQueue() {
  queueSignal.textContent = `${queue.length} active`;
  if (!queue.length) {
    queueList.innerHTML = `
      <article class="queue-item empty">
        <span>No dispatched work yet</span>
        <strong>Select an agent and send a command.</strong>
      </article>
    `;
    return;
  }

  queueList.innerHTML = queue
    .map(
      (item) => `
        <article class="queue-item ${item.status.replaceAll(" ", "-")}">
          <span>${escapeHtml(item.agent)} - ${escapeHtml(item.source)}</span>
          <strong>${escapeHtml(item.command)}</strong>
          <small>${escapeHtml(item.status)}</small>
        </article>
      `
    )
    .join("");
}

function startDryRunRuntime(scenario) {
  resetAgentRuntime();
  if (scenario === "missing-buyer") {
    updateAgentRuntime("moderator", {
      state: "working",
      task: "Checking whether Product 000 can enter Factory build",
      waitingFor: "Market gate result"
    });
    updateAgentRuntime("product", {
      state: "working",
      task: "Testing buyer, pain, urgency, and distribution evidence",
      waitingFor: "Buyer evidence"
    });
    updateAgentRuntime("evidence", {
      state: "working",
      task: "Creating evidence record for blocker scenario",
      waitingFor: "Dry-run output"
    });
    return;
  }

  [
    ["moderator", "Orchestrating Product 000 dry-run"],
    ["product", "Validating market gate"],
    ["intake", "Creating product intake baseline"],
    ["architecture", "Checking Factory architecture path"],
    ["backend", "Simulating backend ticket readiness"],
    ["frontend", "Simulating UX workflow readiness"],
    ["qa", "Scanning verification and security gates"],
    ["challenge", "Challenging assumptions and release risk"],
    ["evidence", "Building evidence pack"]
  ].forEach(([key, task]) => {
    updateAgentRuntime(key, {
      state: "working",
      task,
      waitingFor: "Dry-run output"
    });
  });
}

function finishDryRunRuntime(scenario, status) {
  if (scenario === "missing-buyer" || status === "NEEDS DISCOVERY") {
    updateAgentRuntime("product", {
      state: "blocked",
      task: "Market gate stopped: target buyer and pain evidence missing",
      waitingFor: "Buyer, user, painful workflow, distribution path"
    });
    updateAgentRuntime("moderator", {
      state: "waiting",
      task: "Build stopped before architecture or tickets",
      waitingFor: "Completed market discovery"
    });
    updateAgentRuntime("challenge", {
      state: "waiting",
      task: "Ready to challenge commercial assumptions",
      waitingFor: "Updated buyer evidence"
    });
    updateAgentRuntime("evidence", {
      state: "done",
      task: "Blocker evidence captured",
      waitingFor: "Human review"
    });
    ["intake", "architecture", "backend", "frontend", "qa", "steering"].forEach((key) => {
      updateAgentRuntime(key, {
        state: "sleeping",
        task: initialAgentRuntime[key].task,
        waitingFor: initialAgentRuntime[key].waitingFor,
        heartbeat: "Idle"
      });
    });
    return;
  }

  updateAgentRuntime("moderator", {
    state: "done",
    task: "Dry-run orchestrated and report linked",
    waitingFor: "Human decision before real product build"
  });
  updateAgentRuntime("product", {
    state: "done",
    task: "Market gate passed for Product 000",
    waitingFor: "Real product idea"
  });
  updateAgentRuntime("architecture", {
    state: "done",
    task: "Architecture path checked",
    waitingFor: "Real requirements"
  });
  updateAgentRuntime("intake", {
    state: "done",
    task: "Product intake baseline created",
    waitingFor: "Real product intake inputs"
  });
  updateAgentRuntime("backend", {
    state: "done",
    task: "Backend readiness simulated",
    waitingFor: "Approved backend ticket"
  });
  updateAgentRuntime("frontend", {
    state: "done",
    task: "UX readiness simulated",
    waitingFor: "Approved workflow"
  });
  updateAgentRuntime("qa", {
    state: "done",
    task: "Verification gates simulated",
    waitingFor: "Real code diff"
  });
  updateAgentRuntime("challenge", {
    state: "done",
    task: "Decision challenge completed",
    waitingFor: "High-impact real decision"
  });
  updateAgentRuntime("evidence", {
    state: "done",
    task: "Evidence pack generated",
    waitingFor: "Human review"
  });
  updateAgentRuntime("steering", {
    state: "waiting",
    task: "Release gate is waiting for human approval",
    waitingFor: "Owner approval"
  });
}

async function refreshStatus() {
  const data = await requestJson("/api/status", {}, "Sync status");
  const reports = data.reports || [];
  applyReportMetrics(reports, { force: true });
  applyAgentsPayload(data.agents, { logTimeline: true });
  refreshOwnerActions(data.actions);
  log(`Status refreshed. Workspace: ${data.workspace}`);
}

async function checkLocalLlm() {
  try {
    const data = await requestJson(
      "/api/local-llm",
      { timeoutMs: 2500 },
      "Check local LLM"
    );
    localLlmStatus.textContent = data.status || "Unknown";
    if (data.available && data.models?.length) {
      localLlmDetail.textContent = `${data.models.length} local model(s). Small offline helper only.`;
      return;
    }
    if (data.available) {
      localLlmDetail.textContent = "Ollama is running, but no local model is installed yet.";
      return;
    }
    localLlmDetail.textContent = "Offline helper unavailable until Ollama is running.";
  } catch (error) {
    localLlmStatus.textContent = "Unknown";
    localLlmDetail.textContent = error.message;
  }
}

async function runDryRun(scenario) {
  setRunState("RUNNING");
  startDryRunRuntime(scenario);
  const agentKey = scenario === "missing-buyer" ? "product" : "moderator";
  selectAgent(agentKey);
  addQueueItem(agentKey, `Run ${scenario} dry-run`, "system", false);
  log(`Starting dry run: ${scenario}`);
  const data = await requestJson(
    `/api/dry-run?scenario=${scenario}`,
    { method: "POST", timeoutMs: 22000, allowBusinessError: true },
    `${scenario} dry run`
  );
  const latest = data.result || data.latest?.[0];
  applyReportMetrics(data.latest || [], { force: true });
  const status = statusLabel(latest);
  applyAgentsPayload(data.agents, { logTimeline: true });
  refreshOwnerActions(data.actions);
  log(data.stdout.trim() || `Dry run finished with status ${status}.`);
  if (!data.ok && status !== "NEEDS DISCOVERY") {
    throw new Error(data.stderr || data.stdout || "Dry run failed before a report was produced.");
  }
  return {
    title:
      status === "NEEDS DISCOVERY"
        ? "Blocker Scan stopped safely"
        : "Dry Pass complete",
    body:
      status === "NEEDS DISCOVERY"
        ? "Product Market Agent is blocked until buyer, pain, urgency, and distribution evidence exist."
        : "Factory dry-run completed and evidence/action panels were refreshed.",
    message: `Dry run result: ${status}.`
  };
}

async function planParallelWork() {
  setRunState("RUNNING");
  log("Moderator evaluating dependency graph for parallel-safe work.");
  const data = await requestJson(
    "/api/jobs/plan",
    { method: "POST", allowBusinessError: true },
    "Plan parallel work"
  );
  if (!data.ok) {
    log(`Dependency plan failed: ${data.error || "Unknown error"}`);
    setRunState("Standby");
    return;
  }
  renderJobs(data.jobs);
  applyAgentsPayload(data.agents, { logTimeline: true });
  refreshOwnerActions(data.actions);
  setRunState(currentStatus === "RUNNING" ? "Standby" : currentStatus);
  const ready = data.jobs?.parallelReady?.length || 0;
  return {
    title: "Plan Parallel complete",
    body: `${ready} dependency-clear job(s) are ready. Blocked jobs remain stopped.`
  };
}

async function startReadyWork() {
  setRunState("RUNNING");
  log("Moderator starting only dependency-clear parallel jobs.");
  const data = await requestJson(
    "/api/jobs/start-ready",
    { method: "POST", allowBusinessError: true },
    "Start ready work"
  );
  if (!data.ok) {
    log(`Start ready failed: ${data.error || "Unknown error"}`);
    setRunState("Standby");
    return;
  }
  renderJobs(data.jobs);
  applyAgentsPayload(data.agents, { logTimeline: true });
  refreshOwnerActions(data.actions);
  window.setTimeout(() => {
    refreshJobs().catch((error) => log(error.message));
    syncAgentsFromServer({ logTimeline: true }).catch((error) => log(error.message));
    refreshOwnerActions().catch((error) => log(error.message));
    setRunState(currentStatus === "RUNNING" ? "Standby" : currentStatus);
  }, 2600);
  const started = data.jobs?.started?.length || 0;
  return {
    title: started ? "Start Ready launched work" : "No ready work started",
    body: started
      ? `${started} dependency-safe job(s) started. Review state will refresh automatically.`
      : "No job met the dependency, approval, and file-lock rules yet."
  };
}

async function runLearningLoop() {
  setRunState("RUNNING");
  log("Moderator starting cross-check interviews and guarded local learning loop.");
  const data = await requestJson(
    "/api/learning/run",
    { method: "POST", timeoutMs: 7000, allowBusinessError: true },
    "Learning loop"
  );
  if (!data.ok) {
    log(`Learning loop failed: ${data.error || "Unknown error"}`);
    setRunState("Standby");
    return;
  }
  renderLearning(data.learning);
  renderJobs(data.jobs);
  applyAgentsPayload(data.agents, { logTimeline: true });
  refreshOwnerActions(data.actions);
  latestLearningId = data.record.id;
  log(
    data.cached
      ? `Learning loop reused recent record: ${data.record.id}`
      : `Learning loop completed. Record: ${data.record.filePath}`
  );
  setRunState(currentStatus === "RUNNING" ? "Standby" : currentStatus);
  return {
    title: data.cached ? "Learning Loop reused memory" : "Learning Loop complete",
    body: data.cached
      ? `Recent record reused: ${data.record.id}.`
      : `New reviewed learning record created: ${data.record.id}.`
  };
}

async function handleCommand(event) {
  event.preventDefault();
  const raw = commandInput.value.trim();
  if (!raw) {
    commandInput.focus();
    return {
      title: "Dispatch needs a command",
      body: "Type what the selected agent should do, then press Dispatch.",
      message: "Dispatch paused: command box is empty."
    };
  }
  const agent = agents[selectedAgent];
  const item = addQueueItem(selectedAgent, raw);
  setRunState("RUNNING");
  commandInput.value = "";
  try {
    const data = await requestJson("/api/dispatch", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ agent: selectedAgent, command: raw }),
      timeoutMs: 8000
    }, "Dispatch command");
    if (!data.ok) {
      log(`Dispatch failed: ${data.error || "Unknown error"}`);
      setRunState("Standby");
      return;
    }
    applyAgentsPayload(data.agents, { logTimeline: true });
    refreshOwnerActions(data.actions);
    log(`Command dispatched to ${agent.title}: ${raw}`);
    window.setTimeout(() => {
      syncAgentsFromServer({ logTimeline: true }).catch((error) => log(error.message));
      refreshOwnerActions().catch((error) => log(error.message));
      setRunState(currentStatus === "RUNNING" ? "Standby" : currentStatus);
    }, 1800);
    return {
      title: "Dispatch sent",
      body: `${agent.title} accepted the command and is waiting for evidence.`,
      log: false
    };
  } catch (error) {
    updateQueueItem(item, "failed");
    log(`Dispatch failed: ${error.message}`);
    setRunState("Standby");
    throw error;
  }
}

function updateClock() {
  document.querySelector("#liveClock").textContent = new Date().toLocaleTimeString();
}

function updateMetrics() {
  frame += 1;
  meshSignal.textContent = `${Object.keys(agents).length} nodes online`;
}

function sizeCanvas() {
  const scale = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.floor(window.innerWidth * scale);
  canvas.height = Math.floor(window.innerHeight * scale);
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  ctx.setTransform(scale, 0, 0, scale, 0, 0);
  particles = Array.from({ length: 88 }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    vx: (Math.random() - 0.5) * 0.22,
    vy: (Math.random() - 0.5) * 0.22,
    r: Math.random() * 1.8 + 0.6
  }));
  renderBeams();
}

function drawCanvas() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  ctx.globalCompositeOperation = "lighter";

  const active = agents[selectedAgent];
  ctx.strokeStyle = active?.accent || "#62ffd2";
  ctx.lineWidth = 1;

  for (const particle of particles) {
    particle.x += particle.vx;
    particle.y += particle.vy;

    if (particle.x < -10) particle.x = window.innerWidth + 10;
    if (particle.x > window.innerWidth + 10) particle.x = -10;
    if (particle.y < -10) particle.y = window.innerHeight + 10;
    if (particle.y > window.innerHeight + 10) particle.y = -10;

    const distance = Math.hypot(particle.x - pointer.x, particle.y - pointer.y);
    if (distance < 170) {
      ctx.globalAlpha = (170 - distance) / 420;
      ctx.beginPath();
      ctx.moveTo(pointer.x, pointer.y);
      ctx.lineTo(particle.x, particle.y);
      ctx.stroke();
    }

    ctx.globalAlpha = 0.45;
    ctx.fillStyle = active?.accent || "#62ffd2";
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.globalAlpha = 0.08;
  ctx.strokeStyle = "#7ae4ff";
  const radius = 120 + Math.sin(frame / 28) * 16;
  ctx.beginPath();
  ctx.arc(pointer.x, pointer.y, radius, 0, Math.PI * 2);
  ctx.stroke();

  ctx.globalCompositeOperation = "source-over";
  requestAnimationFrame(drawCanvas);
}

renderOrbitals();
renderGates();
renderQueue();
renderAgentStatusBoard();
updateOrbitalStates();
selectAgent("moderator");
refreshStatus().catch((error) => log(error.message));
checkLocalLlm().catch((error) => log(error.message));
refreshJobs().catch((error) => log(error.message));
refreshLearning().catch((error) => log(error.message));
refreshOwnerActions().catch((error) => log(error.message));
updateClock();
updateMetrics();
sizeCanvas();
drawCanvas();

window.setInterval(updateClock, 1000);
window.setInterval(updateMetrics, 1200);
window.setInterval(() => {
  syncAgentsFromServer({ logTimeline: true }).catch((error) => log(error.message));
  refreshJobs().catch((error) => log(error.message));
  refreshOwnerActions().catch((error) => log(error.message));
}, 3500);

document.addEventListener("pointermove", (event) => {
  pointer = { x: event.clientX, y: event.clientY };
  cursorGlow.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
});

window.addEventListener("resize", sizeCanvas);

document.addEventListener("click", (event) => {
  const agentButton = event.target.closest("[data-agent]");
  if (agentButton) {
    selectAgent(agentButton.dataset.agent);
    return;
  }

  const workerButton = event.target.closest("[data-worker]");
  if (workerButton) {
    const worker = workerButton.dataset.worker;
    const command = `Worker activated: ${worker}`;
    const item = addQueueItem(selectedAgent, command, "worker");
    workerButton.disabled = true;
    workerButton.setAttribute("aria-busy", "true");
    withUiAction(workerButton, "Worker Dispatch", async () => {
      try {
        const data = await requestJson("/api/dispatch", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ agent: selectedAgent, command }),
          timeoutMs: 8000
        }, "Worker dispatch");
        applyAgentsPayload(data.agents, { logTimeline: true });
        refreshOwnerActions(data.actions);
        return {
          title: "Worker Dispatch sent",
          body: `${worker} is active under ${agents[selectedAgent].title}.`,
          message: `${worker} activated under ${agents[selectedAgent].title}.`
        };
      } catch (error) {
        updateQueueItem(item, "failed");
        throw error;
      } finally {
        workerButton.disabled = false;
        workerButton.removeAttribute("aria-busy");
      }
    });
  }
});

document.querySelectorAll("[data-help-title]").forEach((button) => {
  const showHelp = () => {
    actionBriefTitle.textContent = button.dataset.helpTitle;
    actionBriefBody.textContent = button.dataset.helpBody;
  };
  button.addEventListener("mouseenter", showHelp);
  button.addEventListener("focus", showHelp);
});

document.querySelector("#commandForm").addEventListener("submit", (event) => {
  withUiAction(
    event.submitter || document.querySelector("#commandForm button"),
    "Dispatch",
    () => handleCommand(event)
  );
});

document.querySelector("#refreshButton").addEventListener("click", (event) => {
  withUiAction(event.currentTarget, "Sync Status", async () => {
    await refreshStatus();
    await checkLocalLlm();
    await refreshJobs();
    await refreshLearning({ logLatest: true });
    await refreshOwnerActions();
  });
});

document.querySelector("#runPassButton").addEventListener("click", (event) => {
  withUiAction(event.currentTarget, "Dry Pass", () => runDryRun("sample-product"));
});

document.querySelector("#runBlockerButton").addEventListener("click", (event) => {
  withUiAction(event.currentTarget, "Blocker Scan", () => runDryRun("missing-buyer"));
});

document.querySelector("#planParallelButton").addEventListener("click", (event) => {
  withUiAction(event.currentTarget, "Plan Parallel", planParallelWork);
});

document.querySelector("#startReadyButton").addEventListener("click", (event) => {
  withUiAction(event.currentTarget, "Start Ready", startReadyWork);
});

document.querySelector("#learningLoopButton").addEventListener("click", (event) => {
  withUiAction(event.currentTarget, "Learning Loop", runLearningLoop);
});
