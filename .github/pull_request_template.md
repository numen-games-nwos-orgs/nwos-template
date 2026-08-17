<!-- SPDX-FileCopyrightText: 2026 Numen Games S.L. -->
<!-- SPDX-License-Identifier: MIT -->

## What & why



## Mould checklist

- [ ] Commits are DCO-signed (`git commit -s`) and conventional
- [ ] CI green: `node tests/check-mould.mjs` and `python3 tests/check-reuse.py`
- [ ] **Propagation decided for every added file** — Numen-only files are on
      the `REUSE.toml` strip list in the same commit that adds them;
      everything else is intentionally part of the emitted client scaffold
- [ ] No file asserts a licence over content the client will own
- [ ] If this changes the strip/rename contract: follow-up for `nwos-deploy`
      is noted below

## Oracle gate

Merging to `main` replicates this change into every workspace generated
afterwards. Licence-regime changes and visibility changes are additionally
gated by C-005 §4.

## Follow-ups / open items

