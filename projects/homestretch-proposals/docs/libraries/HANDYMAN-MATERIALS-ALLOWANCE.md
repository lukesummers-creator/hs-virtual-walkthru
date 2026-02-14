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

## Rehydrated starter product list (fixtures + hardware)
Source: `_INBOX/Product List_ Material & Cost.md` (Luke, 2026-02-14).

Use this as the default recommendation set when the client is furnishing fixtures or when we need a fast allowance estimate. (Prices may drift; treat as a starting point.)

### Common fixtures (Amazon unless noted)
- Black chandelier — **$47.98** — install time **30 min**
- 12" flush mount ceiling light — **$39.99** — install time **15 min**
- Bathroom vanity light — **2-light $35.99 / 3-light $49.99** — install time **30 min**
- 4-light chandelier — **$43.99** — install time **45 min**
- Semi-flush mount ceiling light — **$39.99** — install time **30 min**
- Pendant lights (2-pack) — **$45.99** — install time **30 min**
- Outdoor wall sconces (2-pack) — **$39.99** — install time **45 min each**
- Mirrors — price varies; install time not specified
- Cabinet knobs — price varies (by pack); install time not specified

### LED retrofit kits
- Must identify whether job needs **4" vs 6" cans**.
- 12-pack flush-mount flat retrofit — **$49.99**
- 6-pack 6" gimbal retrofit — **$93.00**

### Ceiling fans (Menards unless noted)
- Flush mount fan — **$100**
- Vaulted ceiling fan — **$100**
- 45° canopy kit for steep ceilings — **$50** (Lowes)
  - **Lead time ~1 week**

## TODO (rehydration next step)
Add the “standard handyman sundries list” (consumables + small parts) with pricing and per-job allocation:
- wire nuts, tape, anchors, screws, filler, caulk, sanding, plastic, etc.
