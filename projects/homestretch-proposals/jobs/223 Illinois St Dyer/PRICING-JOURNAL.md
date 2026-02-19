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
- Paint options snapshot:
  - Mostly **walls-only**
  - Main Bedroom: **(1) door**
  - Kitchen notes: **repair settlement crack** + paint one wall

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
- Draft production: **2 painters × 2.75 days** (= 5.5 painter-days)
- Labor cost anchor L: **$1,650**

Solve customer price:
- P = L / ( (1−f)(1−g) − m )
- Denominator ≈ (0.8975×0.6) − 0.13 = 0.4085
- Cost Plus P ≈ 1650 / 0.4085 ≈ **$4,039**

Back-into costs (for each point):
- Materials = m × P
- Allowed cost pool = P × (1−f) × (1−g)
- Labor allowed = Allowed cost pool − Materials

Points (WorkedFloorSF ~806 sf):
- Cost Plus: Customer $4,050; Materials ~$526; Labor ~$1,654; $/sf ~$5.02
- Room Rate: Customer $4,300; Materials ~$559; Labor ~$1,757; $/sf ~$5.33
- $/sf sanity: Customer $3,750; Materials ~$488; Labor ~$1,532; $/sf ~$4.65
- Recommendation: Customer $4,350; Materials ~$566; Labor ~$1,777; $/sf ~$5.40

Add-ons (outside base triangle):
- Bathroom 2 — drywall finish (mud/tape/sand): **~$1,100** customer price (draft)
- Bathroom 2 — post-construction paint (PVA + 2 coats): **~$600** customer price (draft)

## Bathroom 2 (construction zone) — split scope (DRAFT)
Tony scope (referred / not HOMEstretch): hang drywall, install vanity/floor/toilet, refinish shower pan + surround; also remove exterior-entry paneling and replace with drywall + door casing.

HOMEstretch scope starts after Tony:
- **Service Line A — Drywall finish (mud + tape + sand)** for new drywall (bath + exterior entry area).
  - Estimating unit: **1 painter** doing finish work.
  - Internal cost: **$300 per painter-day** (NOT $600; $600 is a 2-painter crew-day).
  - Production allowance (active touch time, bundled with other painting during dry times): **~1.5 painter-days** ⇒ labor cost **~$450**.
  - Customer price (triangle baseline; f=10.25%, g=40%, m=13%): **~$1,100** (rounding target TBD).
- **Service Line B — Paint (PVA + 2 coats)**: paint **walls + ceiling + door** (plus paint new casing/drywall at exterior entry area).
  - Customer price target (Luke baseline): **~$600** for the bath paint portion (validate during scope pass).

## Next
- Service pass: validate room-by-room scope (ceilings/trim/doors), confirm repair depth, and reconcile any flooring flags.
- If a PandaDoc PDF / Job Sheet appears, add REFERENCE section to reconcile sent vs recommended.
