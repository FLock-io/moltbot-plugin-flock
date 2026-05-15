#!/usr/bin/env node
"use strict";

const path = require("node:path");
const fs = require("node:fs");
const pkg = require("../package.json");

const HOSTS = ["openclaw", "moltbot", "clawdbot"];
const repoRoot = path.resolve(__dirname, "..");
let failed = false;

for (const host of HOSTS) {
  const cfg = pkg[host];
  if (!cfg || !Array.isArray(cfg.extensions) || cfg.extensions.length === 0) {
    console.error(`ERROR: package.json is missing "${host}.extensions" - refusing to publish a broken package.`);
    console.error(`Add a "${host}": { "extensions": ["./dist/index.js"] } field to package.json.`);
    failed = true;
    continue;
  }
  for (const ext of cfg.extensions) {
    const abs = path.resolve(repoRoot, ext);
    if (!fs.existsSync(abs)) {
      console.error(`ERROR: ${host}.extensions[*] entry "${ext}" does not exist on disk at ${abs}.`);
      console.error(`Did you run "npm run build" before publishing?`);
      failed = true;
      continue;
    }
    if (ext.endsWith(".ts")) {
      console.error(`ERROR: ${host}.extensions[*] entry "${ext}" is raw TypeScript.`);
      console.error(`OpenClaw 2026.5.7+ rejects npm-installed plugins whose entries are raw .ts.`);
      console.error(`Build to dist/ and reference "./dist/index.js" instead.`);
      failed = true;
    }
  }
}

if (failed) process.exit(1);
console.log(`validate-package: ${HOSTS.map((h) => `${h}.extensions`).join(", ")} OK`);
