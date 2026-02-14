# HOMEstretch Proposals — RED RULES (canon)

**Purpose:** the small set of rules that must not drift. If a red rule conflicts with anything else, the red rule wins.

**Status legend:**
- **LOCKED:** do it this way every time (unless Luke explicitly overrides)
- **SOFT:** default preference; can flex
- **TBD:** needs Luke decision

---

## 0) Authority + shipping
- **LOCKED:** Luke is Accountable (final authority) for the proposal system.
- **LOCKED:** Mac must act with bias-for-action:
  - May proactively update **job artifacts** (e.g., `PROPOSAL-PACK.md`, `PRICING-JOURNAL.md`) and **process artifacts** (PROCESS/templates/libraries) without waiting for explicit permission.
  - Must clearly label assumptions and learning moments in the artifacts.
- **LOCKED:** Anything that constitutes an **external ship** (client send / official deliverable publish) remains Luke’s call.
  - Source: Luke clarification (2026-02-14) + `projects/GUARDRAILS.md`

---

## 1) Workflow milestones + context isolation
- **LOCKED:** Use **The Pit** when we’re doing side-work that risks derailing the active quote flow or when there’s **no clear home** for the work; keep iteration local-only until accepted, then merge back as one clean change-set.
  - Source: `PROCESS.md` (The Pit) + Luke review
- **SOFT:** Use milestone phases (Intake → Service Pass → Publishing → Ship) to communicate percent-done + what kind of work is allowed.
  - Source: `PROCESS.md` (Milestones)

---

## 2) Canonical job folder + intake artifact structure
- **LOCKED:** Canonical folder: `projects/homestretch-proposals/jobs/<Job Name>/` (no parallel “JSON Pkg” folders).
- **LOCKED:** Store intake artifacts inside the canonical folder (FastField JSON, source.zip, renamed images, manifest).
- **LOCKED:** If filename conflicts occur, keep both (suffix older as `-OLD`).
  - Source: `PROCESS.md` (Local job folder naming + structure)

---

## 3) Backfill deliverables are non-negotiable
- **LOCKED:** When backfilling from PandaDoc/Job Sheet, `PROPOSAL-PACK.md` must include a **blind pricing build-up** (esp. the **Paint Price Cube / triangle**) + recommendation.
- **LOCKED:** Any previously sent pricing goes in a clearly labeled **REFERENCE ONLY** section after the recommendation.
  - Source: `PROCESS.md` (Backfill deliverables)

---

## 4) Proposal Pack output rules (format + ordering)
- **LOCKED:** Paint Pricing points in Proposal Pack must show **ONLY** these 4 lines, in this order (no extras):
  1) Customer Price
  2) Materials Cost
  3) Labor Cost
  4) Customer Price $/sf @ WorkedFloorSF
- **LOCKED:** Handyman Pricing points in Proposal Pack must show **ONLY** these 4 lines, in this order (no extras):
  1) Customer Price
  2) Materials Allowance
  3) Labor Cost
  4) Estimated hours to complete
  - Note: “Materials Allowance” here is an **internal courtesy client spend estimate** (aggregate $X); it does **not** drive our customer price unless we explicitly supply items.
  - Source: Luke review
- **LOCKED:** All deeper math/formulas/assumptions live in the **Pricing Journal**, not the Proposal Pack.
  - Source: `PROCESS.md` (Intake process / per pricing point format)

---

## 5) PandaDoc copy/paste formatting
- **LOCKED:** PandaDoc scope sections must be **plain text only** (no bold/italics/bullets). Keep rooms listed in **consistent walk-thru order** across all services for rooms worked.
  - Source: `PROCESS.md` (PandaDoc-ready scope sections) + Luke review
- **LOCKED:** PandaDoc Paint scope list uses **one blank line** between rooms (readability).
  - Source: Luke review

---

## 6) FastField duplicates + MERGE-MAP
- **LOCKED (conditional):** Create a `MERGE-MAP.md` if duplicates/splits exist in capture, or if we’re generating multiple outputs from the same FastField data.
- **LOCKED:** MERGE-MAP must include merge groups, source indices, what to sum vs union, and special notes that must roll into all outputs.
  - Source: `PROCESS.md` (MERGE-MAP)

---

## 7) Closet nuance (paint vs flooring)
- **LOCKED (assumption):** If closet dims exist but paint isn’t called out (esp. when `flooring_required=true`), assume **NO PAINT** for closets unless notes explicitly say otherwise.
  - Source: `PROCESS.md` (FastField JSON nuance: closets)

---

## 8) Handyman capture glitch
- **LOCKED:** When `handyman_required=true` but dropdown tasks are missing (FastField glitch) or dropdown task clearly mismatches the notes (e.g. install ceiling fan task selected and notes say "NOT CEILING FAN - repair cabinet"), treat handyman notes as authoritative; include dropdown tasks when present.
- **LOCKED:** One task per line in downstream handyman scope lists.
  - Source: `PROCESS.md` (Handyman capture nuance), AND luke added feedback

---

## 9) Public-safe / PII + web standards
- **LOCKED:** For public-safe outputs, remove PII; use **Job Code** naming (no address/client identifiers).
- **LOCKED:** Never run wipe/clean operations in the workbench directories; previews under `tmp/`.
  - Source: `PROCESS.md` (Web page standards)
- **LOCKED:** If we change design/UX rules for one web output (e.g., photo sizing on a handyman walkthru), verify whether the change should be propagated to **all** web output design rules for consistency.
  - Source: Luke review

---

## 10) RealVitalize is an exception mode
- **LOCKED:** Only apply RealVitalize pricing/constraints when RealVitalize is explicitly mentioned in the job notes/JSON or Luke flags it.
- **LOCKED:** RealVitalize cost-plus anchor is production-first and uses: `P = L / ( (1−f)(1−g) − m )` with fees as pass-through.
- **LOCKED:** RealVitalize fees + rates: franchise 7.25%; RealVitalize fee 15% (replaces 3% card); handyman $120/hr customer, $50/hr internal baseline (unless overridden).
  - Source: `PROCESS.md` (RealVitalize section)

---

## 11) Pricing Journal is mandatory (durable recall)
- **LOCKED:** Every job produces `PRICING-JOURNAL.md` in the job folder; it’s the source-of-truth for assumptions + why we chose the number.
- **LOCKED:** Create/update journal on v1 and on any revision that changes production days, price strategy, scope, or major assumptions.
- **SOFT:** Minimal viable journal is acceptable if it has anchors + drivers + watch-outs + assumptions/risks + VE levers.
  - Source: `PRICING-JOURNAL-RULES.md`

---

## 12) Rule-lock backcheck discipline
- **LOCKED:** When Luke locks a new rule/assumption affecting intake outputs, Mac must immediately:
  1) backcheck active job artifacts,
  2) re-copy updated drafts to Drive `Workbench Drafts/`,
  3) report what changed.
  4) confirm whether backcheck needs to back any further 
  - Source: `projects/GUARDRAILS.md` + `PROCESS.md`


Helper: `python3 projects/homestretch-proposals/tools/rule_lock_backcheck.py <job> --drive <drive_workbench_drafts_path>`

---

## Open questions (TBD)
- **RESOLVED:** Job Code format (and storage)
  - Format: `YYYYMM-<RAND4>` (e.g., `202602-X3V1`).
  - Storage (TBD exact file): likely a post-win job manifest / SOW index that contains job code + links to walkthrus + scope artifacts.
  - Source: Luke review
- **RESOLVED (for now):** PandaDoc email messages
  - Default = MSG 2.
  - We don’t need 3 totally different messages; we need a default + small **modifiers** (notable, fully managed, starting point, options) that slot into the default.
  - Source: Luke review
