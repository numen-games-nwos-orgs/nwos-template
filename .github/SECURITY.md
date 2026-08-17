<!-- SPDX-FileCopyrightText: 2026 Numen Games S.L. -->
<!-- SPDX-License-Identifier: MIT -->

# Security Policy

This policy covers **nwos-workspace-template** (the mould). It lives under
`.github/`, which nwos-deploy strips after generation; generated client
workspaces carry their own `operations/security-policy.md`.

## Reporting a vulnerability

Use **GitHub's private vulnerability reporting** on this repository
(Security tab → "Report a vulnerability"). Do not open a public issue for
anything security-sensitive.

You should receive an acknowledgement within 7 days. Please include steps
to reproduce and the impact you believe the issue has.

## Scope notes

- A mistake in this repository replicates into every workspace generated
  after it lands on `main` — reports about content that would propagate
  incorrectly (credentials, licence assertions over client content,
  workflow injection) are in scope, not just running code.
- Secrets must never appear in this repository or its history (SEC-04);
  finding one is a valid report.
