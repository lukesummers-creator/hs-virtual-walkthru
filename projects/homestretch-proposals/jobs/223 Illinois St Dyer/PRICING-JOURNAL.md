# PRICING JOURNAL — 223 Illinois St Dyer (DRAFT / INTAKE)

## Status
- Intake created from FastField zip + JSON.
- Draft paint triangle + handyman estimate created.

## Identity (from FastField)
- Client: Rita Bais
- Address: 223 Illinois St, Dyer

## Source artifacts
- FastField zip: `source.zip`
- Extracted payload: `intake/`
- FastField JSON: `FastField JSON/4b84ef23-a825-4121-b3c4-52b668aea437.json`
- Renamed photos: `renamed-images/` + `RENAMED-MANIFEST.json`

## Paint takeoffs
- Paint-required rooms (base paint): **5**
- Construction-zone room (separate service lines): **Bathroom 2**
- Paint options snapshot (Luke service pass direction):
  - Base package is a whole-house repaint across base rooms: **full walls**
  - Main Bedroom: **walls + (1) door**
  - Kitchen: **full walls** + repair settlement crack
  - Bathroom 2 door is included in the separate Bath 2 paint add-on

### WorkedFloorSF (sanity)
- WorkedFloorSF (Σ L×W across base-paint rooms): **~806 sf**
- Bathroom 2 floor SF (6 × 6.5): **~39 sf** (excluded from base triangle; handled as add-on)

## Handyman snapshot
- Handyman-required rooms: **2**
- Captured tasks:
  - Main Bedroom: Install light fixture (qty 2)
  - Bedroom 2: Install light fixture (qty 1)

## Paint triangle (baseline)
Constants (standard): fees f=10.25% (franchise + card); GM target g=40% net of fees; materials target m=13%.

Baseline production anchor (base paint, excluding Bathroom 2 construction-zone add-on):
- 2-person crew @ $300 per painter-day (=$600 per crew-day)
- Updated production assumption (Privet calibration: this crew can outperform our historical day counts): **2 painters × 2.25 days** (= 4.5 painter-days)
- Labor cost anchor L: **$1,350**

Solve customer price:
- P = L / ( (1−f)(1−g) − m )
- Denominator ≈ (0.8975×0.6) − 0.13 = 0.4085
- Cost Plus P ≈ 1350 / 0.4085 ≈ **$3,305**

Back-into costs (for each point):
- Materials = m × P
- Allowed cost pool = P × (1−f) × (1−g)
- Labor allowed = Allowed cost pool − Materials

Points (WorkedFloorSF ~806 sf):
- Cost Plus: Customer $3,300; Materials ~$429; Labor ~$1,348; $/sf ~$4.09
- Room Rate: Customer $3,600; Materials ~$468; Labor ~$1,471; $/sf ~$4.47
- $/sf sanity: Customer $3,100; Materials ~$403; Labor ~$1,266; $/sf ~$3.85
- Recommendation: Customer $3,650; Materials ~$475; Labor ~$1,491; $/sf ~$4.53

Add-ons (outside base triangle):
- Bathroom 2 — drywall finish (mud/tape/sand): **$915** customer price (Gemini quote bot anchor; draft)
- Bathroom 2 — post-construction paint (PVA + 2 coats): **$625** customer price (Gemini quote bot anchor; draft)

## Bathroom 2 (construction zone) — split scope (DRAFT)
Tony scope (referred / not HOMEstretch): hang drywall, install vanity/floor/toilet, refinish shower pan + surround; also remove exterior-entry paneling and replace with drywall + door casing.

HOMEstretch scope starts after Tony:
- **Service Line A — Drywall finish (mud + tape + sand)** for new drywall (bath + exterior entry area).
  - Estimating unit: **1 painter** doing finish work.
  - Internal cost: **$300 per painter-day** (NOT $600; $600 is a 2-painter crew-day).
  - Production allowance (dry-time throttled but bundled with other painting): **~1.5 crew-days** ⇒ labor cost **~$900** (at $600/crew-day).
  - Customer price anchor (Gemini quote bot): **$915**.
- **Service Line B — Paint (PVA + 2 coats)**: paint **walls + ceiling + door** (plus paint new casing/drywall at exterior entry area).
  - Production allowance (masking-heavy around new fixtures + PVA + 2 coats): **~1.0 crew-day** ⇒ labor cost **~$600**.
  - Customer price anchor (Gemini quote bot): **$625**.

## Next
- Service pass: validate room-by-room scope (ceilings/trim/doors), confirm repair depth, and reconcile any flooring flags.
- If a PandaDoc PDF / Job Sheet appears, add REFERENCE section to reconcile sent vs recommended.
