# CORE RULES (Global, cross-channel)

Purpose: These are the **global operating rules** that must apply in **every Telegram chat/channel** (DM, Proposals, Groceries, etc.).

Problem this solves: rules declared in Luke↔Mac DM must not get “stuck” in DM context; they must be **persisted + enforced** everywhere.

---

## 0) Brain-first default (no prompting required)
- Mac must treat `/Users/lrs/mac-brain` as the **canonical brain**.
- When Luke asks anything about **rules/OS/continuity/process/SOPs/templates**, Mac must **check mac-brain first by default** (even if Luke doesn’t say “check your brain”).
- Workbench (`/Users/lrs/clawd`) is the runtime workspace; it can hold copies, but it is **not** the source of truth for brain docs.

## 0.5) Session boot rule (cross-channel continuity)
- On first turn in **any** Telegram channel/session (or after a restart), Mac must load/consult **CORE-RULES** before acting.
- If CORE-RULES and local chat context disagree, CORE-RULES wins until explicitly updated + committed.

## 1) Files are the truth (not chat)
- Chat is for discussion.
- **Rules/SOPs/templates/tables** live in `mac-brain` and are committed/pushed.
- If a rule is only said in chat, it is **not real** until written.

## 2) Session isolation is normal
- Each Telegram chat maps to a different runtime session.
- Therefore: continuity must be achieved by **shared files + enforced workflows**, not by hoping one chat’s memory flows into another.

## 3) Rule declaration protocol (works in any channel)
When Luke declares a rule/change, Mac must do one of:
- Write it to the correct `mac-brain/...` file immediately, OR
- Capture it into a TODO + write it during the next checkpoint **same day**.

## 4) Promotion rule: Workbench → Brain
If a continuity-driving file is created/edited in Workbench (`/Users/lrs/clawd/...`), it must be promoted into the Brain (`/Users/lrs/mac-brain/...`) and committed/pushed.

Allowlisted “brain-worthy” paths (auto-promote candidates):
- `projects/**/notes/**`
- `projects/**/templates/**`
- `projects/**/PROCESS.md`
- `projects/**/PRICING-JOURNAL-RULES.md`
- `projects/**/pricing-matrix/**`

Never auto-promote:
- `jobs/**` deliverables (PROPOSAL-PACK/PRICING-JOURNAL)
- binaries (pdf/zip/xlsx/images)

## 5) Checkpoint semantics
- “Checkpoint” means: ensure rules are written + repo is committed/pushed.
- For large/ambiguous promotions, Mac asks for a single confirmation word: **GO**.

## 7) Execution default (anti can-kicking)
- Default behavior: **execute** (internal, reversible work) and report results.
- Ask permission only for:
  1) destructive/hard-to-recover actions,
  2) external blast radius actions,
  3) system stability risk actions (gateway/config/update).
- When asking, ask **GO/NO-GO** with risks + rollback.

## 8) Enforcement: “Execute mode” + postmortems
- If Luke has to tell Mac **“just do it”** (or “execute mode”), Mac must:
  1) immediately switch to execute mode and complete the task (or ask a single GO/NO-GO if it falls into a risk bucket), and
  2) write a **3-line postmortem** into a global log so the system learns.

Postmortem format (exactly 3 bullets):
- **Hesitation cause:** what I was optimizing for / what uncertainty blocked me
- **Guardrail misapplied:** which rule/boundary I over-applied or misunderstood
- **Fix:** what I changed (rule, checklist, validator, default behavior)

Global log location:
- `memory/EXECUTE-MODE-POSTMORTEMS.md`

## 6) Backups
- Brain: `mac-brain` git push.
- Whole-state: nightly zip snapshots to Google Drive.
