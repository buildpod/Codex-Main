#!/usr/bin/env node

import { spawnSync } from "node:child_process";

const commands = [
  [process.execPath, ["--check", "apps/jarvis/server.mjs"], "server syntax"],
  [process.execPath, ["--check", "apps/jarvis/public/app.js"], "client syntax"],
  ["/opt/homebrew/bin/markdownlint-cli2", ["factory/**/*.md"], "factory markdown"]
];

for (const [command, args, label] of commands) {
  const result = spawnSync(command, args, {
    cwd: process.cwd(),
    stdio: "inherit"
  });
  if (result.status !== 0) {
    console.error(`FAIL ${label}`);
    process.exit(result.status || 1);
  }
  console.log(`PASS ${label}`);
}

console.log("Jarvis local checks passed.");
