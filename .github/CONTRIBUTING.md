<!-- SPDX-FileCopyrightText: 2026 Numen Games S.L. -->
<!-- SPDX-License-Identifier: MIT -->

# Contributing to the mould

> This file governs contributions to **nwos-workspace-template itself** (the
> mould). It lives under `.github/`, which nwos-deploy strips after
> generation, so it never reaches client workspaces — the `CONTRIBUTING.md`
> at the repository root is the client's, part of the emitted scaffold, and
> must never carry Numen policy.

## The one rule that orders everything here

**Every file in this repository is copied verbatim into every client
workspace generated after it lands on `main`.** A mistake here multiplies by
itself. Therefore:

- Anything you add that is **Numen's rather than the client's** MUST be added
  to the strip list in `REUSE.toml`'s header **in the same commit** that adds
  the file. CI enforces this for the known mould-only artifacts.
- Never assert a licence over content the client will own. The mould emits
  exactly one licence into the generated workspace: `LICENSE.client`, the
  reserved-rights text in the client's name (C-005 §2.5).

## Mechanics

- **DCO, not CLA.** This is an MIT-only repository, so per C-005 §6 every
  commit carries a Developer Certificate of Origin sign-off:
  `git commit -s`. Unsigned commits are not merged.
- **Conventional commits** (`feat:`, `fix:`, `test:`, `docs:`, …).
- **Branch + PR, never direct to `main`.** Merging to `main` is an Oracle
  act: from that moment the change replicates into every workspace generated
  afterwards. Turning anything public, or any licence-regime change, is
  additionally gated by C-005 §4.
- **CI must be green**: `node tests/check-mould.mjs` (mould invariants) and
  `python3 tests/check-reuse.py` (REUSE, with its one documented deviation).
  Run both locally before pushing.

## Licensing of contributions

The mould is `MIT` (Numen Games S.L.); by contributing you agree your
contribution is MIT under the DCO. The reserved-rights texts
(`LICENSE.client`, its mirror in `LICENSES/`) are template artifacts — they
license nothing in this repository and become real only in a generated
workspace, in the client's name.
