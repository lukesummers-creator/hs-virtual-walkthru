# After Action — FastField “Hacked Form” Mapping Nuances (2026-02-03)

Context: 7540 W 92nd Ave scope/pricing build involved multiple context shifts (paint scope pages, contractor scope UX, then handyman service-line restructuring). The FastField form structure included duplicated/"hacked" room entries (e.g., Basement Hallway split into 2 records) to handle consult capture constraints. During later translation into client-facing proposal lines, one of the merged hallway sections dropped from trim/baseboard pricing.

## What went wrong (root causes)
1) **Name collisions + split records**
   - Two separate JSON records share the same room name ("Basement Hallway") but represent different physical sections.
   - One record carried handyman notes, the other carried flooring dimensions; treating only the handyman-marked record as "the hallway" caused omission.

2) **No explicit “merge map” artifact**
   - We verbally decided to “merge hallways,” but there was no single written mapping table indicating:
     - which JSON indices belong to the merged room
     - which metrics must be summed (LF/SF)
     - which attributes are OR’d/unioned (photos, notes)

3) **Multiple parallel deliverables, no cross-check gate**
   - Contractor scope pages (web) and proposal pack were edited at different times.
   - No checklist step enforced reconciliation between deliverables (e.g., baseboard LF totals match between “contractor scope” narrative and “proposal pricing” narrative).

4) **Heuristic-driven estimating under changing models**
   - Earlier handyman pricing used time-based estimates; later moved to LF/SF unit pricing.
   - Conversion step lacked a validation pass against the original “scope list” (rooms/tasks).

## Proposed system/process to prevent repeats

### A) Create a "Room Merge Map" (required when duplicates exist)
Add a small JSON/YAML/MD artifact per job:
- Example (MD):
  - `Basement Hallway (merged)` = indices [13, 16]
  - Sum fields: baseboards_perimeter, flooring_sf
  - Union fields: notes, photos
  - Pricing hooks: baseboards LF, peel&stick SF, door kit allowance

Where to store:
- `projects/homestretch-proposals/jobs/<job>/MERGE-MAP.md` (or `.json`).

### B) Add a “nuance checklist” gate before client-facing output
A short checklist run before final proposal pack is considered ready:
- [ ] Duplicate room names resolved or mapped
- [ ] Merged rooms: summed LF/SF reconciled
- [ ] Handyman Trim: baseboards + casing by room totals cross-checked
- [ ] Flooring line: SF totals cross-checked to selected rooms
- [ ] Any special-case notes (e.g., picture rail trim removal) appear in all relevant deliverables

### C) Build a lightweight validation script
In `projects/homestretch-proposals/tools/`:
- Detect duplicate room names
- Suggest merge candidates
- Compute per-room and merged totals:
  - baseboard LF (perimeter)
  - flooring SF
  - door casing LF estimate (using chosen rule)
- Emit a “diff” report comparing:
  - scope pages room list vs proposal pack room list
  - totals used in pricing vs totals computed

### D) Standardize the mapping rule: “Room identity” is not room name
Define a stable identity for a room record:
- `roomIndex` + normalized name
- plus an optional `mergeGroupId`

### E) UI workflow: treat contractor scope pages as a *view* of the same data
- Contractor scope pages and proposal pack should be generated from the same intermediate representation (post-merge).
- Avoid manual edits across separate documents when possible.

## Action items
1) For 7540 and future jobs: create `MERGE-MAP.md` when duplicates exist.
2) Add a pre-flight checklist section in proposal pack template.
3) Implement a validator script (duplicate detection + totals report).

