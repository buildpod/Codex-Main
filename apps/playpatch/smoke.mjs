#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const root = path.resolve("apps/playpatch/public");

function read(file) {
  return fs.readFileSync(path.join(root, file), "utf8");
}

function pass(name) {
  console.log(`PASS ${name}`);
}

function requireText(name, text, needle) {
  if (!text.includes(needle)) {
    throw new Error(`${name}: missing ${needle}`);
  }
  pass(name);
}

const html = read("index.html");
const css = read("styles.css");
const js = read("app.js");
const manifest = JSON.parse(read("manifest.webmanifest"));
const serviceWorker = read("sw.js");

[
  "parentButton",
  "buildPlanButton",
  "startActivityButton",
  "favoriteButton",
  "shuffleButton",
  "timerButton",
  "resetTimerButton",
  "finishButton",
  "patchStrip",
  "activityGrid",
  "parentPanel",
  "soundToggle",
  "calmModeToggle"
].forEach((id) => requireText(`html id ${id}`, html, `id="${id}"`));

[
  "paper-bridge-lab",
  "rainbow-hunt",
  "story-dice",
  "animal-yoga",
  "kitchen-patterns",
  "quiet-cloud"
].forEach((id) => requireText(`activity ${id}`, js, `id: "${id}"`));

[
  "localStorage",
  "serviceWorker",
  "Parent gate",
  "No ads",
  "No account",
  "Premium Preview",
  "Calm endings"
].forEach((feature) => requireText(`feature ${feature}`, `${html}\n${js}`, feature));

[
  ".activity-stage",
  ".activity-card",
  ".parent-panel",
  ".pack-card",
  ".patch-strip",
  ".parent-controls",
  "@media"
].forEach((selector) => requireText(`css ${selector}`, css, selector));

if (manifest.name !== "PlayPatch Kids") {
  throw new Error("manifest: wrong app name");
}
pass("manifest app name");

if (!serviceWorker.includes("caches.open") || !serviceWorker.includes("fetch")) {
  throw new Error("service worker: missing cache/fetch handling");
}
pass("service worker cache path");

console.log("PlayPatch static smoke passed.");
