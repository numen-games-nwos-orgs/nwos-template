#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// Mould invariant checks — nwos-workspace-template.
//
// Everything in this repo is copied verbatim into every generated client
// workspace, so a defect here multiplies by itself. These checks encode
// the invariants established under C-005 and LD-002:
//   1. The mould's own LICENSE is the full MIT text — never truncated,
//      never CC0 (the original LD-002 defect was a 768-byte truncation).
//   2. LICENSE.client is the reserved-rights text the mould must emit
//      (C-005 §2.5), templated on {{COMPANY_NAME}} / {{DEPLOY_DATE}}.
//   3. No emitted file asserts a licence over client content.
//   4. The REUSE.toml strip list (the nwos-deploy contract) stays
//      consistent: entries exist, and known mould-only artifacts are on it.
//   5. Design-system artifacts, when present, are internally consistent
//      (§2 block byte-identical to design.tokens.schema.json; all $value
//      null except radius.full).
//   6. Placeholders are well-formed {{UPPER_SNAKE}} everywhere.
//
// Zero dependencies. Run: node tests/check-mould.mjs

import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (f) => readFileSync(path.join(root, f), "utf8");
const has = (f) => existsSync(path.join(root, f));

const failures = [];
const fail = (msg) => failures.push(msg);
const check = (cond, msg) => { if (!cond) fail(msg); };

const tracked = execFileSync("git", ["ls-files"], { cwd: root, encoding: "utf8" })
  .split("\n").filter(Boolean);

// ---- 1 · The mould's LICENSE: full MIT, anti-truncation ----------------
{
  const lic = read("LICENSE");
  check(lic.startsWith("MIT License"), "LICENSE: does not start with 'MIT License'");
  check(lic.includes("Copyright (c) 2026 Numen Games S.L."), "LICENSE: missing Numen copyright line");
  check(lic.includes("Permission is hereby granted"), "LICENSE: missing the grant clause — truncated?");
  check(lic.includes("WITHOUT WARRANTY OF ANY KIND"), "LICENSE: missing the warranty disclaimer — truncated?");
  check(!/CC0|Creative Commons/i.test(lic), "LICENSE: mentions CC0/Creative Commons");
}

// ---- 2 · LICENSE.client: the emitted reservation (C-005 §2.5) ----------
{
  const lc = read("LICENSE.client");
  check(lc.includes("{{COMPANY_NAME}}"), "LICENSE.client: missing {{COMPANY_NAME}} placeholder");
  check(lc.includes("{{DEPLOY_DATE}}"), "LICENSE.client: missing {{DEPLOY_DATE}} placeholder");
  check(lc.includes("All rights reserved"), "LICENSE.client: missing 'All rights reserved'");
  check(lc.includes("No rights are granted"), "LICENSE.client: missing the express no-grant sentence");
  check(!lc.includes("Permission is hereby granted"), "LICENSE.client: contains MIT grant language");
}

// ---- 3 · LICENSES/ mirrors ---------------------------------------------
check(read("LICENSES/MIT.txt") === read("LICENSE"),
  "LICENSES/MIT.txt: out of sync with LICENSE");
check(read("LICENSES/LicenseRef-NWOS-Client-Reserved.txt") === read("LICENSE.client"),
  "LICENSES/LicenseRef-NWOS-Client-Reserved.txt: out of sync with LICENSE.client");

// ---- 4 · REUSE.toml strip list — the nwos-deploy contract --------------
const reuse = read("REUSE.toml");
const stripMatch = /stripped by nwos-deploy after generation:\n((?:#.*\n)+?)# Renamed/.exec(reuse);
check(!!stripMatch, "REUSE.toml: strip-list header block not found");
const stripList = stripMatch
  ? stripMatch[1].replace(/#/g, "").split(/[\s,]+/).filter(Boolean)
  : [];
for (const entry of stripList) {
  check(has(entry.replace(/\/$/, "")), `strip list entry does not exist in repo: ${entry}`);
}
check(reuse.includes("LICENSE.client -> LICENSE"), "REUSE.toml: rename contract line missing");
// Known mould-only artifacts must be on the list (forward rule).
for (const mustStrip of ["LICENSE", "LICENSES/", "REUSE.toml", "TRADEMARKS.md", "LEGAL_DEBT.md", "tests/", ".github/"]) {
  if (has(mustStrip.replace(/\/$/, ""))) {
    check(stripList.includes(mustStrip), `mould-only artifact missing from strip list: ${mustStrip}`);
  }
}

// ---- 5 · No emitted file asserts a licence over client content ---------
const mouldOnly = new Set(stripList.map((e) => e.replace(/\/$/, "")));
const emitted = tracked.filter((f) => {
  const top = f.split("/")[0];
  return !mouldOnly.has(f) && !mouldOnly.has(top) && !mouldOnly.has(top + "/") && f !== "LICENSE.client" && !f.endsWith(".license");
});
for (const f of emitted) {
  const text = read(f);
  if (/CC0-1\.0|Creative Commons|public domain/i.test(text)) {
    fail(`emitted file asserts/mentions a public-domain regime: ${f}`);
  }
  if (/^\s*\*?License:/im.test(text) && !/All rights reserved/.test(text)) {
    fail(`emitted file carries a License: assertion that is not the client reservation: ${f}`);
  }
}
{
  const readme = read("README.md");
  check(readme.includes("Powered by [NWOS]"), "README.md: the 'Powered by NWOS' credit is gone");
  check(readme.includes("{{COMPANY_NAME}}. All rights reserved."), "README.md: client reservation footer missing");
}

// ---- 6 · Design-system artifacts (conditional until merged) ------------
if (has("DESIGN_SYSTEM_TEMPLATE.md")) {
  const t = read("DESIGN_SYSTEM_TEMPLATE.md");
  check(/^version: \d+\.\d+\.\d+$/m.test(t), "DESIGN_SYSTEM_TEMPLATE.md: no semver version in frontmatter");
  // REUSE-IgnoreStart — the literals below are content we scan for, not this file's tags.
  check(t.includes("<!-- SPDX-License-Identifier: MIT -->"), "DESIGN_SYSTEM_TEMPLATE.md: SPDX license comment missing");
  check(t.includes("<!-- SPDX-FileCopyrightText: Numen Games S.L. -->"), "DESIGN_SYSTEM_TEMPLATE.md: SPDX copyright comment missing");
  // REUSE-IgnoreEnd
  if (has("design.tokens.schema.json")) {
    const block = /```json\n([\s\S]*?)```/.exec(t)?.[1] ?? "";
    check(block.replace(/\n$/, "") === read("design.tokens.schema.json").replace(/\n$/, ""),
      "design.tokens.schema.json: not byte-identical to the template's §2 block");
  }
}
if (has("design.tokens.schema.json")) {
  check(has("design.tokens.schema.json.license"), "design.tokens.schema.json: REUSE .license sidecar missing");
  let schema = null;
  try { schema = JSON.parse(read("design.tokens.schema.json")); }
  catch { fail("design.tokens.schema.json: invalid JSON"); }
  if (schema) {
    const nonNull = [];
    const walk = (n, p) => {
      for (const [k, v] of Object.entries(n)) {
        if (v && typeof v === "object") {
          if ("$value" in v && v.$value !== null) nonNull.push(p + k);
          walk(v, p + k + ".");
        }
      }
    };
    walk(schema, "");
    check(nonNull.length === 1 && nonNull[0] === "radius.full",
      `design.tokens.schema.json: non-null $value outside radius.full: ${nonNull.join(", ") || "(none)"}`);
  }
}

// ---- 7 · Presence checks (ENGINEERING_STANDARDS §3.3) ------------------
// Conditional on the standards doc existing, so the check activates with it.
if (has("ENGINEERING_STANDARDS.md")) {
  check(has("CLAUDE.md"), "AGT-01: CLAUDE.md missing at repo root");
  if (has("CLAUDE.md")) {
    check(read("CLAUDE.md").includes("audit the current branch state"),
      "AGT-01: CLAUDE.md must open with the audit-first instruction");
  }
  check(has(".github/SECURITY.md"), "SEC-09: .github/SECURITY.md missing");
  check(has(".github/CODEOWNERS"), "SEC-10: .github/CODEOWNERS missing");
  check(has(".github/pull_request_template.md"), "PM-02: PR template missing");
  check(has("LICENSES/CC-BY-4.0.txt"),
    "ARC-03: ENGINEERING_STANDARDS.md is CC-BY-4.0 but LICENSES/ lacks the text");
  for (const wf of ["ci.yml", "scorecard.yml"]) {
    if (!has(`.github/workflows/${wf}`)) continue;
    const y = read(`.github/workflows/${wf}`);
    check(/^permissions: read-all$/m.test(y), `SEC-08: ${wf} missing top-level read-all permissions`);
    for (const m of y.matchAll(/uses:\s*(\S+)/g)) {
      if (!/@[0-9a-f]{40}( |$)/m.test(m[1] + " ")) fail(`SEC-07: unpinned action in ${wf}: ${m[1]}`);
    }
  }
}

// ---- 8 · Placeholders are well-formed {{UPPER_SNAKE}} ------------------
const placeholders = new Set();
for (const f of emitted) {
  for (const m of read(f).matchAll(/\{\{([^}]*)\}\}/g)) {
    if (!/^[A-Z0-9_]+$/.test(m[1])) fail(`malformed placeholder {{${m[1]}}} in ${f}`);
    else placeholders.add(m[1]);
  }
}

// ---- report -------------------------------------------------------------
if (failures.length > 0) {
  console.error(`mould checks: ${failures.length} failure(s)`);
  for (const f of failures) console.error(`  ✗ ${f}`);
  process.exit(1);
}
console.log(`mould checks: OK — ${tracked.length} tracked files, ${emitted.length} emitted, strip list [${stripList.join(" ")}], placeholders [${[...placeholders].sort().join(" ")}]`);
