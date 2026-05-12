#!/usr/bin/env node

import { spawn } from "node:child_process";
import { isJarvisHealthy, defaultBaseUrl } from "./jarvis-http.mjs";

const force = process.argv.includes("--force");
const watch = process.argv.includes("--watch");

if (!force && (await isJarvisHealthy())) {
  console.log(`Jarvis is already running at ${defaultBaseUrl}`);
  console.log("Open the browser URL instead of starting another server.");
  console.log(
    "Use `pnpm jarvis:dev -- --force` only if you intentionally need a fresh start."
  );
  process.exit(0);
}

const serverArgs = watch
  ? ["--watch-path=apps/jarvis/server.mjs", "apps/jarvis/server.mjs"]
  : ["apps/jarvis/server.mjs"];

console.log(
  watch
    ? "Starting Jarvis in backend watch mode."
    : "Starting Jarvis once. Restart manually after backend edits."
);

const child = spawn(
  process.execPath,
  serverArgs,
  {
    cwd: process.cwd(),
    stdio: "inherit",
    env: process.env
  }
);

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  process.exit(code || 0);
});
