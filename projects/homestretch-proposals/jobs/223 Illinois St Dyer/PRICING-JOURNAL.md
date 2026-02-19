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
- Paint-required rooms: **6**
- Paint options snapshot:
  - Mostly **walls-only**
  - Main Bedroom: **(1) door**
  - Bathroom 2: **walls + ceiling + (1) door**
  - Kitchen notes: **repair settlement crack** + paint one wall

### WorkedFloorSF (sanity)
- WorkedFloorSF (Σ L×W across paint-required rooms): **~845 sf**

## Handyman snapshot
- Handyman-required rooms: **2**
- Captured tasks:
  - Main Bedroom: Install light fixture (qty 2)
  - Bedroom 2: Install light fixture (qty 1)

## Paint triangle (baseline)
Constants (standard): fees f=10.25% (franchise + card); GM target g=40% net of fees; materials target m=13%.

Baseline production anchor:
- 2-person crew @ $300 per painter-day (=$600 per crew-day)
- Draft production: **2 painters × 3.0 days** (= 6 painter-days)
- Labor cost anchor L: **$1,800**

Solve customer price:
- P = L / ( (1−f)(1−g) − m )
- Denominator ≈ (0.8975×0.6) − 0.13 = 0.4085
- Cost Plus P ≈ 1800 / 0.4085 ≈ **$4,406**

Back-into costs (for each point):
- Materials = m × P
- Allowed cost pool = P × (1−f) × (1−g)
- Labor allowed = Allowed cost pool − Materials

Points (WorkedFloorSF ~845 sf):
- Cost Plus: Customer $4,400; Materials ~$572; Labor ~$1,797; $/sf ~$5.21
- Room Rate: Customer $4,700; Materials ~$611; Labor ~$1,920; $/sf ~$5.56
- $/sf sanity: Customer $4,100; Materials ~$533; Labor ~$1,675; $/sf ~$4.85
- Recommendation: Customer $4,750; Materials ~$618; Labor ~$1,940; $/sf ~$5.62

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
