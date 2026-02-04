#!/usr/bin/env node
"use strict";

const pkg = require("../package.json");

if (!pkg.openclaw || !Array.isArray(pkg.openclaw.extensions) || pkg.openclaw.extensions.length === 0) {
  console.error("ERROR: package.json is missing openclaw.extensions – refusing to publish a broken package.");
  console.error("Add an \"openclaw\": { \"extensions\": [\"./index.ts\"] } field to package.json.");
  process.exit(1);
}

console.log("validate-package: openclaw.extensions OK");
