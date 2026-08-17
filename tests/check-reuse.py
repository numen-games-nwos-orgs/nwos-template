# SPDX-FileCopyrightText: 2026 Numen Games S.L.
# SPDX-License-Identifier: MIT
#
# REUSE gate with one documented deviation.
#
# Full `reuse lint` cannot pass here by design: LICENSE.client is excluded
# from REUSE analysis by the spec (any LICENSE.* filename), so the
# LicenseRef-NWOS-Client-Reserved text in LICENSES/ is "unused" — it is a
# template artifact instantiated in generated workspaces (C-005 §2.5), not
# an active grant in this repo. This gate therefore accepts exactly that
# one deviation and fails on anything else, so REUSE regressions still
# break the build. Removing the deviation is an Oracle decision.
#
# Run: python3 tests/check-reuse.py   (requires: pip install reuse)

import json
import subprocess
import sys

ALLOWED_UNUSED = ["LicenseRef-NWOS-Client-Reserved"]

out = subprocess.run(
    [sys.executable, "-m", "reuse", "lint", "--json"],
    capture_output=True, text=True,
)
report = json.loads(out.stdout)
nc = report.get("non_compliant", {})

problems = []
for key, value in nc.items():
    if key == "unused_licenses":
        extra = [x for x in value if x not in ALLOWED_UNUSED]
        if extra:
            problems.append(f"unused_licenses beyond the documented deviation: {extra}")
    elif value:
        problems.append(f"{key}: {value}")

if problems:
    print(f"reuse gate: {len(problems)} problem(s)", file=sys.stderr)
    for p in problems:
        print(f"  x {p}", file=sys.stderr)
    sys.exit(1)

print("reuse gate: OK (known deviation only: "
      f"{', '.join(ALLOWED_UNUSED)} — template artifact, see header)")
