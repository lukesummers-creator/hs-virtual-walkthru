# Contractor Scope Pages — Spec (DO NOT DRIFT)

Purpose: a consistent, client/contractor-friendly, mobile-first web export built from FastField JSON + renamed photos.

This doc is the checklist. If a page looks different than this, it’s a bug.

---

## 0) Scope page types
- Walkthru (room photos)
- Handyman (task summary + room photos + handyman-task photos)
- Paint (scope summary + per-room scope + room photos)
- (Future) Shopping List (fixture recommendations)

---

## 1) Photo selection rules (source of truth)

### 1.1 Room photos (all page types)
- Use `room_photos` only.
- Assets must exist in `renamed-images/`.
- `RENAMED-MANIFEST.json` must include these with **no `kind`** (or `kind != handyman`).

### 1.2 Handyman-task photos (handyman page only)
- Use `handyman_photos_handyman` only.
- `RENAMED-MANIFEST.json` entries MUST include: `kind: "handyman"`.
- If JSON contains handyman photos but manifest doesn’t: add them (copy/rename into `renamed-images/`, append manifest).

---

## 2) Room inclusion rules

### Walkthru
- Include **ALL rooms**, even if no scope.
- Show photo strip; if no photos show the “No photos available” CTA.

### Handyman
- Include **ONLY rooms where `handyman_required=true`**.
- Do NOT override to include all rooms.

### Paint
- Include **ONLY rooms where `painting_required=true`**.

---

## 3) Required UI / layout (mobile-first)

### 3.1 Photo strip (default everywhere)
- Horizontal swipe strip with scroll-snap.
- Full-photo display (no crop): `object-fit: contain`.
- Strip wrapper styling:
  - background: **light gray**
  - padding
  - rounded corners
- Photos:
  - subtle drop shadow
- Static CTA inside strip (not floating elsewhere):
  - 0 photos → “No photos available”
  - 1 photo → “Photo”
  - 2+ photos → “Swipe for more”

### 3.2 Safe/public output
- No address/client identifiers rendered on-page.
- Use jobcode in the title/header.

---

## 4) Build workflow
1) Generate/refresh `renamed-images/` + `RENAMED-MANIFEST.json`.
2) Generate **local preview** page(s) first.
3) Luke sanity-check.
4) Only after approval: push to GitHub Pages.

---

## 5) Naming conventions
- Git jobcode folder: `HS-YYYY-MM-DD-XXXX/`
- Page path examples:
  - `.../<jobcode>/walkthru/`
  - `.../<jobcode>/handyman/`
  - `.../<jobcode>/paint/`

---

## 6) Known failure modes (do not repeat)
- Missing handyman photos because manifest didn’t include `kind:"handyman"`.
- Cropped photos due to `object-fit: cover` (must be contain).
- Bad room inclusion (handyman page showing rooms without handyman_required).
- UI drift (missing gray wrapper, CTA outside strip, missing shadow).
