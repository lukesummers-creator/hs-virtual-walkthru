# Handyman — Materials Allowance (Library)

Purpose: give Mac a repeatable way to estimate **materials allowance** for handyman items while we often have the client **furnish fixtures**.

## Core principles (locked)
- Client often furnishes fixtures (lights, fans, etc.). We still:
  - provide **recommendations** (what to buy), and
  - carry a **materials allowance** for contractor-supplied sundries/consumables and any small purchased parts.
- Materials allowance is an **estimate** and may change based on final selections.
- Handyman labor is estimated separately (T&M @ the standard labor rate; currently $100/hr standard unless overridden).

## Default allowance rules
Use these defaults unless notes/job context specify otherwise.

### 1) If client furnishes the fixture
- Set **Materials Allowance = $0** for the fixture itself.
- Add **Sundries Allowance** per install line:
  - Light fixture install/replace: **$10** (wire nuts, tape, screws, minor patch/caulk)
  - Ceiling fan install/replace: **$15**
  - Swap/paint HVAC supply vent: **$10**
  - Smoke/CO detector swap: **$10**

### 2) If we are supplying the item (rare; only when explicitly stated)
- Materials Allowance = expected retail cost + sundries.
- Add a note in the scope: “Allowance may change based on final selections.”

### 3) Small repair materials (typical)
- Cabinet face / minor carpentry repair materials: **$15–$50** (wood filler, sandpaper, fasteners) unless parts replacement is explicitly required.
- Drywall patch supplies (small): **$10–$25**.

## TODO (rehydration work)
We need a real “standard handyman materials list” with product + pricing. When we build that, this doc becomes the index and the product list becomes the source-of-truth.

Desired outputs:
- A table of common items (wire nuts, tape, anchors, screws, filler, caulk, sanding discs, plastic, etc.) with:
  - typical unit cost
  - “per job” allocation guidance
  - preferred brands/SKUs
