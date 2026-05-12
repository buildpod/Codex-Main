#!/usr/bin/env node

import { requestJson, defaultBaseUrl } from "./jarvis-http.mjs";

function requireCondition(name, condition, detail) {
  if (!condition) {
    throw new Error(`${name}: ${detail}`);
  }
  console.log(`PASS ${name}`);
}

const health = await requestJson("/api/health", { timeoutMs: 2500 });
requireCondition("health endpoint", health.ok, "Jarvis health is not ok.");

const actions = await requestJson("/api/actions", { timeoutMs: 2500 });
requireCondition(
  "owner action summary",
  actions.headline && Array.isArray(actions.actions),
  "Owner actions payload is missing headline or actions."
);

const jobs = await requestJson("/api/jobs", { timeoutMs: 2500 });
requireCondition(
  "job graph",
  Array.isArray(jobs.jobs) && jobs.jobs.length > 0,
  "Job graph is empty."
);

const learning = await requestJson("/api/learning", { timeoutMs: 2500 });
requireCondition(
  "learning summary",
  Array.isArray(learning.records),
  "Learning records are not summarized."
);

const learningRun = await requestJson("/api/learning/run", {
  method: "POST",
  timeoutMs: 8000
});
requireCondition(
  "learning loop cached-or-complete",
  learningRun.ok && learningRun.record?.id,
  "Learning Loop did not return a record."
);

const localLlm = await requestJson("/api/local-llm", { timeoutMs: 3000 });
requireCondition(
  "local LLM status",
  localLlm.status,
  "Local LLM endpoint did not return a status."
);

const plan = await requestJson("/api/jobs/plan", {
  method: "POST",
  timeoutMs: 3000
});
requireCondition(
  "plan parallel action",
  plan.ok && Array.isArray(plan.jobs?.jobs),
  "Plan Parallel did not return a job graph."
);

const startReady = await requestJson("/api/jobs/start-ready", {
  method: "POST",
  timeoutMs: 3000
});
requireCondition(
  "start ready action",
  startReady.ok && Array.isArray(startReady.jobs?.started),
  "Start Ready did not return started-job detail."
);

const dispatch = await requestJson("/api/dispatch", {
  method: "POST",
  body: { agent: "moderator", command: "Smoke test button wiring" },
  timeoutMs: 3000
});
requireCondition(
  "dispatch action",
  dispatch.ok && dispatch.agent === "moderator",
  "Dispatch did not accept a Moderator command."
);

let dryRunGetBlocked = false;
try {
  await requestJson("/api/dry-run?scenario=sample-product", { timeoutMs: 3000 });
} catch {
  dryRunGetBlocked = true;
}
requireCondition(
  "dry-run method guard",
  dryRunGetBlocked,
  "Dry-run should reject GET because it mutates Factory state."
);

const dryPass = await requestJson("/api/dry-run?scenario=sample-product", {
  method: "POST",
  timeoutMs: 22000
});
requireCondition(
  "dry pass action",
  dryPass.ok && dryPass.result?.report?.status === "PASS",
  "Dry Pass did not produce a PASS report."
);

const blocker = await requestJson("/api/dry-run?scenario=missing-buyer", {
  method: "POST",
  timeoutMs: 22000,
  allowBusinessError: true
});
requireCondition(
  "blocker scan action",
  blocker.ok === true && blocker.result?.report?.status === "NEEDS DISCOVERY",
  "Blocker Scan did not stop with NEEDS DISCOVERY."
);

console.log(`Jarvis smoke passed at ${defaultBaseUrl}`);
console.log(
  `Actions: ${actions.summary?.total || 0}; Jobs: ${jobs.jobs.length}; ` +
    `Started: ${startReady.jobs.started.length}; Learning cached: ${
      learningRun.cached ? "yes" : "no"
    }`
);
