# PRICING JOURNAL — 188 Goodview Dr Valpo (BACKFILL)

## Status
- Backfilled from PandaDoc PDF + Job Sheet + FastField JSON.
- Local photo payload rehydrated from original FastField zip for future walkthru/pages, but **webpages not built yet** (scope changes pending).

## Source artifacts
- PandaDoc PDF: `inbox/HOMEstretch Project Proposal_ 188 Goodview Dr Valpo.pdf`
- Job Sheet: `inbox/188 Goodview Dr Valpo Job Sheet.xlsx` (sheet: `2026-02-188 Goodview Dr Valpo`)
- FastField JSON: `FastField JSON/a99be57f-f77e-4e0c-850d-9c6a362c0450.json`
- FastField zip: `source.zip` (extracted to `intake/`)

## Customer pricing (from PandaDoc)
- Paint: **$7,375**
- Carpet install: **$4,815**
- Handyman (labor only): **$800**
- Bundled: **$12,990**
- Optional add-on: Paint Brick **$1,000**
- Early approval pricing: **5%** (savings shown: **$699.50**)
- Post-savings reference total in PDF: **$13,290.50**

## Job Sheet totals (sheet: `2026-02-188 Goodview Dr Valpo`)
The job sheet shows a cost/price/profit breakdown (appears to align to the “post savings” total):

### Job totals
- Total cost: **$8,966.28**
- Total price: **$13,290.50**
- Total profit: **$4,324.22**
- Adj margin: **~36.10%**
- Discount: **$699.50**

### Paint totals
- Cost: **$5,417.44**
- Price: **$8,375.00**
- Profit: **$2,957.56**

### Flooring totals
- Cost: **$3,189.26**
- Price: **$4,815.00**
- Profit: **$1,625.74**

### Handyman totals
- Cost: **$482.00**
- Price: **$800.00**
- Profit: **$318.00**

## FastField metrics
- Rooms in JSON: 14
- Paint-required rooms: 14
- Flooring-required rooms: 7
- Handyman-required rooms: multiple (see JSON)
- WorkedFloorSF (paint rooms): **~1,743.67 sf**

## Notes / reconciliations
- PandaDoc bundled price is **$12,990**, while the Job Sheet total price is **$13,290.50** with a listed discount of **$699.50**.
  - Working interpretation: Job Sheet “total price” corresponds to the **pre-discount / post-savings reference** amount shown in the PDF.
  - (We can confirm by checking the exact PandaDoc line items if needed.)

## Walkthru readiness (local)
- `source.zip` copied into job folder.
- Extracted photos into `intake/.../<json-id>/`.
- Generated `renamed-images/` + `RENAMED-MANIFEST.json` for deterministic web-page generation later.
