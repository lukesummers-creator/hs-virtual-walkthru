# HOMEstretch Pricing Journal System (Project Rules)

**Goal:** Every quote produces a durable, job-specific `PRICING-JOURNAL.md` inside the job folder. Mac drafts ~80% automatically; Luke only adds the final 20% (final calls + nuance).

## Canonical file + location
For every job folder:
- `projects/homestretch-proposals/jobs/<job folder>/PRICING-JOURNAL.md`

This file is the source of truth for:
- why we picked production time assumptions
- why we picked price (and what we would change to VE/price-match)
- productivity watch-outs
- revision/change history

## Triggers (when to create/update)
1) **New quote (v1):** Create the journal as soon as we have scope + first production anchor.
2) **Any revision (v2, v3, …):** Append a new version section whenever we change:
   - production days (any trade)
   - price target / strategy (VE, price match, aggressive vs safe)
   - scope (added/removed rooms/trades)
   - any major assumption (tier/coats, repair level, access/height)

## Mac’s responsibility (~80% draft)
Mac will draft the following every time:
- Snapshot (address, date, estimator, job mix)
- Production anchors (cost-plus) by trade:
  - Paint crew-days + painter-days
  - Flooring crew-days (if applicable)
  - Handyman crew-days (if applicable)
  - Explicit baseline: 2-person paint crew; $300 per painter-day (unless overridden)
- “Why this many days” drivers (3–8 bullets)
- Likely longest / pace-setter areas (productivity watch list)
- Key assumptions (tiers/coats, repair level, sheen/surface prep, masking, sequencing, dry-time logic)
- Risks/unknowns + what to verify
- Value engineering levers (what to cut first + expected impact)
- Change log notes between versions
- Tags (standard vocabulary) + Segments (reusable sub-scopes)

## Luke’s responsibility (~20% finish)
Luke only needs to add/confirm:
- Final chosen production number when we debated a range
- Any "street" context (crew capability, timing constraints, client expectations)
- Any critical constraint (deadline promises, must-keep scope)

If Luke adds nothing, the journal is still considered complete enough for later recall.

## Tags (for cross-job similarity)
Each journal begins with a `Tags:` line. Mac assigns tags.

**Initial tag vocabulary (expand over time):**
- `paint-only`
- `paint+flooring`
- `paint+handyman`
- `multi-trade`
- `cabinets`
- `doors`
- `trim-heavy`
- `high-sheen`
- `dark-to-light`
- `3-coat`
- `primer`
- `repairs-light`
- `repairs-medium`
- `repairs-heavy`
- `plaster-repair`
- `stairwell>12ft`
- `rails/stringers/risers`
- `open-concept`
- `many-rooms`
- `basement`
- `LVP`
- `carpet`
- `carpet-option`
- `fixture-install`
- `mirror-risk`
- `masking-heavy`
- `schedule-tight`

## Segments (to enable mix-and-match recall)
Every journal includes a **Segments** section with reusable chunk notes. Minimum segments when applicable:
- Kitchen (walls/ceiling)
- Cabinets (if any)
- Stairwell (if any)
- Bathrooms
- Bedrooms/Halls
- Basement
- Flooring
- Handyman

Segments should capture: scope, what made it slow/fast, and the production implication.

## “Rules/Principles” sourcing
When we write a principle in any README/notes, we should cite 2–5 jobs whose `PRICING-JOURNAL.md` supports it.

Format suggestion:
- **Source jobs:** 9046 Kleinman Rd (v1), 10421 Privet Dr (v2)

---

## Minimal viable journal standard (so this doesn’t die)
A journal is acceptable even if it only contains:
- Production anchors
- 3–8 driver bullets
- 3 productivity watch-outs
- assumptions + risks
- one VE lever list

Depth is optional; consistency is mandatory.
