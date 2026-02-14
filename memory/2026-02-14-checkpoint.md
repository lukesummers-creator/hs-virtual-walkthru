# 2026-02-14 — Checkpoint (Valentine’s Day)

## Situation / why we paused
- Luke is mobile / family day. OS workshop can’t be run now, but is **priority #1** next.
- Trust issue: Luke is frustrated with patch-by-patch behavior and message verbosity. Wants Mac to be the catalyst/operator using existing brain artifacts, not spewing “next steps.”

## Global locks (canon)
- **Execute Mode default (anti can-kicking)** is globally locked: execute internal/reversible work by default; ask only for destructive, external blast radius, or system stability risk (GO/NO-GO with risk + rollback).
- **Enforcement:** if Luke has to say “just do it/execute mode,” Mac must log a 3-bullet postmortem in a global log.

## OS workshop artifact already exists
- Confirmed: `/Users/lrs/mac-brain/continuity/OS-WORKSHOP-PLAN.md` exists and is the intended structure for the operating system workshop.
- Mac admitted it did **not** know this doc existed until checked; logged as a postmortem.

## Redundancy / canon unification (brain vs workbench)
- Luke asked about redundancy across workbench vs brain. Decision: unify canon via **symlinks** (Option 1).
- Actions taken:
  1) Synced updated canon docs from `/Users/lrs/clawd` into `/Users/lrs/mac-brain` and pushed mac-brain.
  2) Replaced canon docs in clawd with symlinks pointing to mac-brain (surgical only):
     - `clawd/CORE-RULES.md` → `mac-brain/continuity/CORE-RULES.md`
     - `clawd/SOUL.md` → `mac-brain/root/SOUL.md`
     - `clawd/projects/GUARDRAILS.md` → `mac-brain/projects/GUARDRAILS.md`
     - Proposals canon files under `clawd/projects/homestretch-proposals/` → brain equivalents
     - `clawd/projects/homestretch-proposals/templates` and `docs/libraries` → symlinked directories
  3) Backup of replaced clawd files/dirs created: `clawd/tmp/symlink-backup-20260214_084910/`

## Repo notes
- `mac-brain` commit/push: “Sync canon from clawd + prep for symlink unification” plus later postmortem log commit.
- `clawd` symlink unification commit exists and is pushed.
- Noted potential confusion: `clawd` remote is `lukesummers-creator/hs-virtual-walkthru` (verify later; do NOT change now).

## Continuity hook
- A hook patch was made to inject baseline context on session start even without a prompt. This contributed to Luke’s trust frustration (“another patch”).
- Freeze: no more system patches until OS workshop decisions.

## Key open decision (not decided)
- Path A vs Path B:
  - **A: Salvage + consolidate** (OS workshop → single cohesive consolidation pass)
  - **B: Mac 2.0 manifesto reboot** (curate a training manifesto + wipe/rebuild)
- Luke is not ready to decide today.

## Next time (first action)
- Run OS workshop using the existing brain doc, **one agenda item at a time**, starting at item #1.
- Keep outputs short, concrete, and anchored to the workshop structure.
