<!-- SPDX-FileCopyrightText: 2026 Numen Games S.L. -->
<!-- SPDX-License-Identifier: MIT -->

# CLAUDE.md

**First instruction (AGT-01): audit the current branch state before assuming
anything** — including what this file says. Read what is actually there.

This file is written for two homes, because it propagates. Determine which
one you are in from `git remote -v`:

## Upstream — `numen-games-nwos-orgs/nwos-workspace-template` (the mould)

- **Every file here is copied verbatim into every generated client
  workspace.** A mistake multiplies by itself. The strip/rename contract
  with `nwos-deploy` lives in the header of `REUSE.toml`; any new
  Numen-only file joins the strip list in the same commit that adds it.
- **Checks (run before pushing):** `node tests/check-mould.mjs` and
  `python3 tests/check-reuse.py`. CI runs both; CI is the authority.
- **Standards:** `ENGINEERING_STANDARDS.md` — follow its §7 agent protocol,
  reference practice IDs in commits.
- **AI stance (AGT-06):** cosmetic fixes are autonomous. Irreversible acts
  — merging to `main`, any licence-regime change, visibility changes,
  touching the strip contract, secrets — require Oracle sign-off. When in
  doubt, it is irreversible.
- **Scorecard scope:** public repo — all checks in scope.

## Downstream — a generated workspace or fork

- You received this file from the mould. Your own laws come first:
  `agents/{your-name}/OPERATOR.md`, `operations/security-policy.md`, and
  the session protocol in `README.md`.
- `ENGINEERING_STANDARDS.md` changes belong upstream (its §7.1): do not
  edit the local copy; offer to draft the upstream ADR instead.
- Documents in `canon/` are read-only without Oracle approval.
