# HOMEstretch Proposals — Process (Working Rules)

Reference libraries:
- `projects/homestretch-proposals/docs/libraries/QUOTE-LANGUAGE-AND-BLURBS.md`
- `projects/homestretch-proposals/docs/libraries/HANDYMAN-MATERIALS-ALLOWANCE.md` (fixture budget + convenience fee canon)

Templates:
- `projects/homestretch-proposals/templates/PROPOSAL-PACK-TEMPLATE.md` (includes Intake Complete Gate)

PandaDoc email blurb rules (locked):
- Always include a timeline estimate; when less confident widen the range and add “depending on final scope” (and/or repairs + dry times).
- MSG 2 = default; MSG 1 only when options/toggles are present; MSG 3 only when we need fully-managed framing and/or we intentionally went all-in and expect to scale back.

## 1) The Pit (context isolation for side work)
**Purpose:** protect the main quote flow when we need to do impromptu side projects (UX experiments, generators, tooling, refactors) in order to support the main project.

**Trigger:** if we are about to do work that is not directly progressing the current quote deliverable (or risks drifting scope/context), we call:

> **THE PIT:**

Then we write 1–2 lines:
- what we’re testing/building
- what “done” looks like

**Rules inside The Pit:**
- Prefer **local-only iteration** until approved.
- Avoid editing the main Proposal Pack / Pricing Journal unless the pit work is accepted.
- When accepted, integrate back with a **single clean change-set** (one commit / one doc edit pass).

## 2) MERGE-MAP (conditional, required when FastField capture is hacked/split)
**Purpose:** prevent lost scope when FastField capture uses duplicate room names or split records.

**Create a MERGE-MAP when any of these are true:**
- Duplicate room names exist in the JSON.
- A space/room is split across multiple records due to consult capture constraints.
- We’re generating multiple deliverables from the same FastField data (proposal pack + contractor scope pages + RFQs).

**Artifact:**
- `projects/homestretch-proposals/jobs/<job>/MERGE-MAP.md`

**MERGE-MAP must include:**
- Merge groups (e.g., "Basement Hallway (merged)")
- If duplicates are not merged and notes don’t clarify, label as "(1 of 2)", "(2 of 2)".
- Source indices (roomIndex or array index)
- What to **sum** (e.g., baseboard LF, flooring SF)
- What to **union** (photos, notes)
- Any special notes that must roll into all outputs

## 3) Local job folder naming + structure (canonical)
- Canonical folder: `projects/homestretch-proposals/jobs/<Job Name>/`
  - Example: `jobs/5565 E 73rd Ave/`
- Do **not** create parallel folders like `... JSON Pkg`.
- Store intake artifacts inside the canonical folder:
  - `FastField JSON/<id>.json`
  - `source.zip` (optional)
  - extracted image folder (optional)
  - `RENAMED-MANIFEST.json` (if we renamed/exported photos)
- If a conflict ever occurs (same filename from two sources), keep both by suffixing the older/losing file as `-OLD`.

### Backfill deliverables (non-negotiable)
When backfilling a job from PandaDoc/Job Sheet:
- `PROPOSAL-PACK.md` must include a **blind pricing build-up**, especially the **Paint Price Cube** (triangle) + recommendation.
- Any “sent pricing” from PandaDoc goes in a clearly labeled **REFERENCE ONLY** section, after the recommendation, so it doesn’t bias the cube.

## 4) FastField JSON nuance: closets
- Closet measurements may be stored as **nested fields** inside a room object (not a separate room record).
- Closet measurements are sometimes captured for **flooring takeoff only**.
  - Assumption rule (Luke): assume **NO PAINT** for closets if closet dims exist but painting is not called out, especially when flooring_required=true. If closets should be painted, it must be in notes (otherwise human catches).
- When a PDF/Job Sheet references a closet, search the JSON for keys containing `closet` and extract:
  - `number_of_closets`
  - `_sub_length_closet_1`, `_sub_width_closet_1`, `_sub_height_closet_1` (and possibly closet_2, etc.)

## 5) Web page standards (applies to Handyman SOW + Paint SOW + Virtual Walkthru)
### Safety
- **Never** run wipe/clean operations in the workbench directories. Local-only previews must be created under `tmp/`.

### Public-safe
- Remove PII: use **Job Code** naming (no address/client identifiers).

### Mobile-first (iPhone)
- Photos must render consistently **large** on iPhone (use viewport-height based sizing) and be horizontally swipeable.

### Headers / metadata
- Include room dimensions (rounded to nearest foot) in each room header when available.
- Use label **Room #** (not “JSON index”).

### Structure
- Merge multi-task rooms into a single section; list tasks on separate lines.
- Remove linked room list from page header.

### Copy
- Missing-photo callouts should be generic: **“No photos available.”**

## 6) Milestones (proposal workflow)
Use these phases to estimate “percent done” and to decide what kind of work is allowed.

1) **Intake** (FastField → workbench + Drive) + 7540-style draft artifacts
2) **Service Pass** (Paint + Handyman; may split scope/services; refine SOPs)
3) **Publishing** (Job Sheet + PandaDoc; backfill learnings to .mds; finalize email send)
4) **Ship** (send proposal)

Notes:
- Intake + 7540-style Proposal Pack/Journal drafts are one combined milestone.
- Service Pass can be 2–3 subpasses depending on novelty (paint cube noodle, handyman refinement, etc.).

## 7) Intake process (FastField zip → workbench job folder → Drive)
Default intake is end-to-end unless Luke says otherwise:
1) Create canonical local job folder: `projects/homestretch-proposals/jobs/<Job Name>/`
2) Copy zip into job folder as `source.zip`
3) Extract zip into `intake/` (keep raw payload for re-generation)
4) Copy primary JSON into `FastField JSON/<id>.json`
5) Generate `renamed-images/` + `RENAMED-MANIFEST.json`
6) Write/refresh `HYDRATION-NOTE.md` (include client + realtor partner if available)
7) Create next-step artifacts (draft):
   - Run `notes/SELF-CHECK-SHIP-LIST.md` before declaring the pack “ready.”
   - `PROPOSAL-PACK.md` must match the **7540-style final format** immediately after intake:
     - PandaDoc “email send” message
     - Paint triangle (Cost Plus + Room Rate + $/sf sanity) + recommendation
       - If a paint-required room has **no room notes and no paint notes**, assume **Tier 2 midpoint** on room rate for that room (document as an assumption).
       - If a room label appears multiple times and notes don’t clarify: label as "<Room> (1 of 2)", "<Room> (2 of 2)" and keep consistent across scope blocks.
  - **Per pricing point format (Proposal Pack):** show ONLY, in this order (4 lines; no extras):
    1) Customer Price
    2) Materials Cost
    3) Labor Cost
    4) Customer Price $/sf @ WorkedFloorSF
  - All deeper math / formulas / assumptions live in the Pricing Journal.
  - Reference template: `templates/PAINT-TRIANGLE-POINT-TEMPLATE.md`
     - Handyman section (labor estimate + scope list + copy/paste minutes/allowances)
     - PandaDoc-ready paint SCOPE DETAILS (client-facing: remove internal capture notes)
       - Formatting rule: **plain text only** (no bold/italics) for PandaDoc copy/paste sections.
     - PandaDoc-ready handyman SCOPE DETAILS + standard terms
       - Formatting rule: plain text only (no bold/italics)
     - Confidence / Questions at bottom
     - If any service is split out (room rehab, stairwell, cabinets, etc.):
       - give it its **own cube build-up** AND its **own PandaDoc scope section**
       - include a brief client-facing OVERVIEW, but avoid overly predictive scheduling language (use approximate added days + drivers)
   - `PRICING-JOURNAL.md`
8) Export photos to **Google Drive job folder** (required by default):
   - Root: room photos → `FastField Photos/`
   - Subfolders: `FastField Photos/Handyman/`, `.../Flooring/`, `.../Clearout/`
   - Use renamed filenames; do not overwrite silently (if conflicts, suffix `-OLD`).

## 7) Drive photo export (FastField zip → Google Drive job folder)
- Default rule: export **ALL photos** from the FastField zip to the Drive job folder.
- Drive folder layout:
  - Room photos go in: `Jobs/<job>/FastField Photos/` (root)
  - Service-based photos go in **spelled-out subfolders**:
    - `Jobs/<job>/FastField Photos/Handyman/`
    - `Jobs/<job>/FastField Photos/Flooring/`
    - `Jobs/<job>/FastField Photos/Clearout/`
    - (add more as needed, but keep names spelled out)
- Rename convention (keep it simple + consistent):
  - Room photo: `{idx}_{RoomName}_{nn}.jpg`
  - Service photo (inside its subfolder): `{idx}_{RoomName}_{nn}.jpg`
  - (Service is implied by folder; no need to encode it in filename.)

## 3) Pre-flight before client-facing output
- Duplicates resolved or MERGE-MAP exists.
- Merged totals reconciled (LF/SF).
- Special-case notes appear in all relevant deliverables.
- Pricing build-ups follow standard order:
  1) Customer Price
  2) Materials Price ($0 if N/A)
  3) Labor Price

### RealVitalize (pricing + constraints) — EXCEPTION ONLY
**Not default.** Only apply RealVitalize rules if:
- RealVitalize is explicitly mentioned in the FastField job notes/JSON, **or**
- Luke explicitly flags it during intake.

Otherwise assume standard pricing fees (franchise + card processing).

When the proposal is for **RealVitalize**:
- **Cost Plus anchor rule (don’t let it slip):** production-first.
  - Start from painter-days → labor cost anchor **L** (e.g., 2 painters × 4 days × $300/day = $2,400).
  - Solve customer price with: **P = L / ( (1−f)(1−g) − m )**.
  - Fees are pass-through (not marked up).
- Fees:
  - Keep franchise fees: **7.25%**
  - Replace card processing fee (**3%**) with **RealVitalize fee: 15%**
- Handyman pricing (default for RealVitalize):
  - Customer labor rate: **$120/hr** (use $125 only when Luke specifies)
  - Internal handyman labor cost baseline: **$50/hr** (subcontractor)
- Budget visibility:
  - Often budget is a % of list price (default assumption: **3% of list price**)
  - In some cases budget is tied to REALTOR® commission (e.g., **5% of list price**)
- Margin targets (net of fees):
  - Target **40%** when possible
  - Common settle band: **30–35%**
  - Floor scenario seen: **~28%**
- Proposal writing:
  - Itemize scope cleanly; minimize ambiguity; expect external review/approval.
- Paint scope language: **no “as scoped”** anywhere (too ambiguous). Use explicit details (counts, locations, brief distinctive tags).
- **Complex / expensive rooms:** scope line must start with a **bold, brief distinctive tag** so it can’t get lost.
  - Pattern: `Room Name: **Wallpaper removal, plaster repair, color-change prep**; ...`
  - Use for: Tier 3 rooms, heavy repairs, wallpaper removal, built-ins/cabinets, high-sheen, stairwells/heights, major prep.
- Repairs: room-level “repair” only where applicable; method-agnostic.
- **Repair-first wording rule:** if a room includes repair, start the room scope line with `Drywall repair ...;` before `prep/paint...`.
- **Repair clarification sentence:** include a short explainer near the paint scope list that “Drywall repair” covers settlement cracks, failing tape seams, damaged corner bead, etc., and is distinct from minor patching (nail/screw holes) that’s included in standard prep.

### Handyman capture nuance (FastField glitch)
- Some room records may have `handyman_required = true` but no task dropdown selections available due to a FastField form glitch.
- In those cases, the scope is often captured in **handyman notes** (e.g., Bathroom 1 frequently).
- Therefore, handyman scope build must:
  - include selected handyman task dropdowns **when present**, and
  - always parse/include `handyman_handyman_notes` as authoritative scope text when dropdowns are missing.

Handyman formatting rule (downstream dependency):
- **One task per line** in the scope list (split multi-task entries into separate bullets).

## Rule-lock backcheck (executable)
Any time Luke locks a new rule/assumption that affects intake outputs, Mac must immediately:
1) Backcheck the current active job artifacts (Proposal Pack + Pricing Journal) for compliance.
2) Re-copy the updated drafts to the job’s Drive `Workbench Drafts/` folder.
3) Reply with what changed (1–3 bullets).

Executable helper:
- `python3 projects/homestretch-proposals/tools/rule_lock_backcheck.py <job> --drive <drive_workbench_drafts_path>`
