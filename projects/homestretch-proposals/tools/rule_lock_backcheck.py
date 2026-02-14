#!/usr/bin/env python3
"""Executable backcheck step after a process/rule change is locked.

Why:
- We keep re-learning the same lesson: a newly locked rule must be applied to the current active job immediately.

Usage:
  python3 projects/homestretch-proposals/tools/rule_lock_backcheck.py \
    "projects/homestretch-proposals/jobs/<Job Name>" \
    --drive "<Drive Jobs folder path>/022026 <Job Name>/Workbench Drafts"

What it does:
- Runs intake_validator on the job folder (warn-only but surfaces FAILs)
- Re-copies PROPOSAL-PACK.md + PRICING-JOURNAL.md to the Drive Workbench Drafts folder

This is also the required step for blurb-rule/library updates: validate + re-copy so the active job reflects the new standard.

This script is intentionally simple; it does not edit content.
"""

from __future__ import annotations

import argparse
import shutil
import subprocess
from pathlib import Path


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("job", help="Path to job folder under projects/homestretch-proposals/jobs")
    ap.add_argument("--drive", required=True, help="Path to Drive Workbench Drafts folder for this job")
    args = ap.parse_args()

    job = Path(args.job).expanduser()
    drive = Path(args.drive).expanduser()

    pp = job / "PROPOSAL-PACK.md"
    pj = job / "PRICING-JOURNAL.md"

    if not pp.exists():
        raise SystemExit(f"Missing {pp}")
    if not pj.exists():
        raise SystemExit(f"Missing {pj}")

    # 1) Validate
    validator = Path("projects/homestretch-proposals/tools/intake_validator.py")
    if validator.exists():
        print("Running intake_validator…")
        subprocess.run(["python3", str(validator), str(job)], check=False)
    else:
        print("WARN: intake_validator.py not found; skipping")

    # 2) Copy drafts
    drive.mkdir(parents=True, exist_ok=True)
    job_name = job.name
    shutil.copy2(pp, drive / f"{job_name} - PROPOSAL-PACK (Workbench Draft).md")
    shutil.copy2(pj, drive / f"{job_name} - PRICING-JOURNAL (Workbench Draft).md")
    print("Copied drafts to Drive workbench folder")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
