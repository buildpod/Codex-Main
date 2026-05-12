#!/usr/bin/env node

import { requestJson, defaultBaseUrl } from "./jarvis-http.mjs";

const checks = [
  ["health", "/api/health"],
  ["actions", "/api/actions"],
  ["jobs", "/api/jobs"],
  ["learning", "/api/learning"]
];

const results = [];

for (const [name, path] of checks) {
  const started = Date.now();
  try {
    const payload = await requestJson(path, { timeoutMs: 2500 });
    results.push({
      name,
      ok: true,
      ms: Date.now() - started,
      summary:
        name === "actions"
          ? `${payload.summary?.total || 0} owner action(s)`
          : name === "jobs"
            ? `${payload.jobs?.length || 0} job(s)`
            : name === "learning"
              ? `${payload.records?.length || 0} learning record(s)`
              : payload.name || "ok"
    });
  } catch (error) {
    results.push({
      name,
      ok: false,
      ms: Date.now() - started,
      summary: error.message
    });
  }
}

console.log(`Jarvis health: ${defaultBaseUrl}`);
for (const result of results) {
  const mark = result.ok ? "PASS" : "FAIL";
  console.log(`${mark} ${result.name} ${result.ms}ms - ${result.summary}`);
}

if (results.some((result) => !result.ok)) {
  console.log("Recovery: run `pnpm jarvis:dev`, then open http://localhost:4173/");
  process.exit(1);
}
