# Assumption Engine — Backlog (intake must be pricing-pass ready)

Goal: codify recurring FastField/JSON gaps into explicit assumptions + checks so intake is never “bones.”

## Why this exists
FastField has known limitations (picklists missing nuance; placeholder fields; inconsistent room labeling). Intake must still produce a Proposal Pack + Pricing Journal that’s ready for Luke’s pricing pass.

## Observed recurring gaps (from scanning existing job JSONs)

### 1) Room identity normalization
- Duplicate room names that are actually distinct areas (example: two “1st Floor Hallway” instances).
- Need a rule: if notes say there are multiple areas, label them explicitly (Hallway 1 / Hallway 2) and keep that label consistent across:
  - paint room list
  - PandaDoc scope blocks
  - handyman scope (if applicable)

### 2) Tier / repair signals buried in notes
- Tier markers are often absent, inconsistent, or embedded in free text.
- Rule (Luke): if there are **no paint notes or room notes**, assume **Tier 2 midpoint** for that room rate.
- Need a rule: always pull forward repair drivers (tier notes, water damage, failing tape, corner bead, wallpaper/plaster unknowns, mobility-aid scrape repairs, etc.) into:
  - Paint “Key drivers” section
  - Confidence/questions

### 3) Handyman picklist ≠ real scope
- JSON frequently has generic “Install Light Fixture” while notes indicate something else (HVAC vent, cabinet face repair, etc.).
- Rule: when notes explicitly contradict picklist, treat notes as truth and document the assumption.
- Rule (downstream dependency): **one task per line** (split multi-task lines into separate bullets).

### 4) Closet data lives as nested fields
- Closets may appear as nested keys under a room object (`number_of_closets`, `_sub_*_closet_1`) rather than separate rooms.
- Rule: include closets in takeoffs and scope logic when present, but don’t create phantom rooms.

### 5) Materials model exceptions
- Some scopes are labor-dominant (rehabs) where % materials target is misleading; use fixed allowance/range.
- Rule: allow per-scope materials model override (documented in journal) while keeping Proposal Pack schema consistent.

### 6) Fee mode ambiguity (STD vs RealVitalize)
- Default STD unless explicitly flagged by Luke/JSON.
- Rule: intake must include a clear Mode callout and the fees used for math.

## Proposed “Intake Complete Gate” (minimum required before telling Luke it’s ready)
- Paint triangle complete: Cost Plus + Room Rate + $/sf + Recommendation (no TBD)
- Each paint point uses 4-line schema (Customer / Materials / Labor / $/sf @ WorkedFloorSF)
- Repair drivers pulled forward from notes
- Handyman section notes-driven when needed; assumptions stated
- PandaDoc scope blocks are plain text and client-facing

## Next step
Add these as explicit steps/checks in PROCESS.md and SELF-CHECK-SHIP-LIST.md, and/or build a lightweight validator script that flags likely issues (duplicate room names, placeholders, missing driver extraction).
