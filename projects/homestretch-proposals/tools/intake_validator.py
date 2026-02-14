#!/usr/bin/env python3
"""Lightweight validator to prevent "bones" intakes.

Usage:
  python3 projects/homestretch-proposals/tools/intake_validator.py "projects/homestretch-proposals/jobs/<Job Name>"

Checks:
- PROPOSAL-PACK contains triangle points (Cost Plus / Room Rate / $/sf / Recommendation)
- No TBD remains in paint recommendation
- Handyman: heuristically flag multi-task bullets (commas/" and ")
- Duplicate room names in paint-required list (warn)

This is intentionally conservative: it warns, it doesn't auto-edit.
"""

from __future__ import annotations

import re
import sys
from pathlib import Path


def die(msg: str, code: int = 2) -> None:
    print(f"ERROR: {msg}")
    sys.exit(code)


def main() -> int:
    if len(sys.argv) != 2:
        die("Pass job folder path")

    job = Path(sys.argv[1]).expanduser()
    pp = job / "PROPOSAL-PACK.md"
    pj = job / "PRICING-JOURNAL.md"

    if not pp.exists():
        die(f"Missing {pp}")
    if not pj.exists():
        print(f"WARN: Missing {pj}")

    txt = pp.read_text()

    # Triangle presence checks
    required = [
        "# 0.5) PandaDoc",
        "### 1) Cost Plus",
        "### 2) Room Rate",
        "### 3) $/Floor-sqft",
        "## Recommendation (paint)",
    ]
    for r in required:
        if r not in txt:
            print(f"FAIL: missing '{r}'")

    if re.search(r"\$TBD|<WorkedFloorSF>|\bTBD\b", txt):
        print("FAIL: contains TBD markers")

    # Duplicate rooms (paint-required list section)
    m = re.search(r"## Rooms included \(paint-required\)(.*?)(?:\n\n## |\n\n---)", txt, re.S)
    if m:
        blob = m.group(1)
        rooms = [re.sub(r"^[\-\*]\s*", "", ln).strip() for ln in blob.splitlines() if ln.strip()]
        # also handle semicolon-separated legacy
        if len(rooms) == 1 and ";" in rooms[0]:
            rooms = [r.strip() for r in rooms[0].split(";") if r.strip()]
        counts = {}
        for r in rooms:
            counts[r] = counts.get(r, 0) + 1
        dups = {k: v for k, v in counts.items() if v > 1}
        if dups:
            print(f"WARN: duplicate room labels in list: {dups}")

    # Handyman multi-task heuristic
    hm = re.search(r"## Handyman — SCOPE DETAILS(.*?)(?:\n\n---|\n\n# 4\)|\Z)", txt, re.S)
    if hm:
        lines = [ln.strip() for ln in hm.group(1).splitlines() if ln.strip().startswith("-")]
        for ln in lines:
            if "," in ln or " and " in ln.lower():
                print(f"WARN: handyman bullet may contain multiple tasks (split to one per line): {ln}")

    print("DONE")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
