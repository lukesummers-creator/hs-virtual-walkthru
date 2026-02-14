#!/usr/bin/env python3
"""Export a public-safe, GitHub-Pages-friendly site for a job.

Creates:
- jobs/<jobcode>/walkthru/index.html (general room photos)
- jobs/<jobcode>/handyman/index.html (task summary + room photos row + handyman photos row)

No address/client PII in output.

Usage:
  python3 handyman_site_export_v2.py \
    --jobdir "projects/homestretch-proposals/jobs/<JOBDIR>" \
    --jobcode "HS-YYYY-MM-DD-RAND4" \
    --outdir "projects/homestretch-proposals/site-export/<jobcode>"

Then copy the contents of outdir into the GitHub Pages repo under jobs/<jobcode>/.
"""

from __future__ import annotations

import argparse
import html
import json
import shutil
from pathlib import Path


def load_job(jobdir: Path):
    manifest_path = jobdir / 'RENAMED-MANIFEST.json'
    if not manifest_path.exists():
        raise SystemExit(f"Missing RENAMED-MANIFEST.json in {jobdir}")

    json_files = [p for p in jobdir.glob('*.json') if p.name != 'RENAMED-MANIFEST.json']
    if not json_files:
        raise SystemExit(f"No job JSON found in {jobdir}")
    json_path = max(json_files, key=lambda p: p.stat().st_size)

    data = json.loads(json_path.read_text())
    manifest = json.loads(manifest_path.read_text())
    rooms = data.get('painting_flooring_handyman_clearout') or []

    room_imgs: dict[int, list[str]] = {}
    handy_imgs: dict[int, list[str]] = {}
    for f in manifest.get('files', []):
        ri = f.get('roomIndex')
        dst = f.get('dst')
        if not ri or not dst:
            continue
        if f.get('kind') == 'handyman':
            handy_imgs.setdefault(ri, []).append(dst)
        else:
            room_imgs.setdefault(ri, []).append(dst)

    for d in (room_imgs, handy_imgs):
        for ri in d:
            d[ri].sort()

    return rooms, room_imgs, handy_imgs


def copy_assets(jobdir: Path, out_assets: Path, filenames: set[str]):
    src_dir = jobdir / 'renamed-images'
    out_assets.mkdir(parents=True, exist_ok=True)
    for fn in sorted(filenames):
        src = src_dir / fn
        if src.exists():
            shutil.copy2(src, out_assets / fn)


def dims_str(rooms, idx: int) -> tuple[str, float | None]:
    e = rooms[idx - 1]
    L, W, H = e.get('length'), e.get('width'), e.get('height')
    sf = (L * W) if (L and W) else None
    bits = []
    if L and W:
        bits.append(f"{L:g}×{W:g} ft")
    if H:
        bits.append(f"H {H:g} ft")
    return '; '.join(bits) if bits else 'dims n/a', sf


def make_walkthru(jobcode: str, rooms, room_imgs, outdir: Path):
    css = """
    body{font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif; margin:32px;}
    h1{font-size:22px;margin:0 0 8px 0;}
    .meta{color:#444;margin:0 0 18px 0;font-size:13px;}
    .section{margin:0 0 18px 0; padding:14px 14px; border:1px solid #ddd; border-radius:10px;}
    .hdr{display:flex; justify-content:space-between; gap:12px; align-items:baseline;}
    .hdr h2{font-size:16px;margin:0;}
    .small{font-size:12px;color:#666;}
    .imgs{display:flex; flex-wrap:wrap; gap:10px; margin-top:10px;}
    .imgs img{max-width:240px; max-height:180px; border:1px solid #ccc; border-radius:6px;}
    """

    parts = ["<!doctype html><html><head><meta charset='utf-8'>",
             f"<title>{html.escape(jobcode)} — Virtual Walkthru</title>",
             f"<style>{css}</style></head><body>"]
    parts.append(f"<h1>{html.escape(jobcode)} — Virtual Walkthru</h1>")
    parts.append("<p class='meta'>Public-safe export. Address/client identifiers removed. Room order follows FastField room index. Photos are general room photos.</p>")

    for idx, e in enumerate(rooms, start=1):
        room = (e.get('selected_room') or ['Room'])[0]
        imgs = room_imgs.get(idx) or []
        if not imgs:
            continue
        dimtxt, _ = dims_str(rooms, idx)
        parts.append("<div class='section'>")
        parts.append(f"<div class='hdr'><h2>{idx:02d} {html.escape(str(room))}</h2><div class='small'>{html.escape(dimtxt)} • {len(imgs)} photo(s)</div></div>")
        parts.append("<div class='imgs'>")
        for fn in imgs:
            parts.append(f"<img src='../assets/{html.escape(fn)}' loading='lazy' />")
        parts.append("</div></div>")

    parts.append("</body></html>")
    (outdir / 'index.html').write_text('\n'.join(parts))


def make_handyman(jobcode: str, rooms, room_imgs, handy_imgs, outdir: Path):
    # Handyman task definitions for this job (7540) — can be generalized later.
    tasks = [
        (1, 'Foyer', 105, 'Install (2) light fixtures (30 min + 75 min)'),
        (4, 'Kitchen', 60, 'Install (2) 6" surface-mount LED lights (30 min each)'),
        (5, 'Dining Room', 45, 'Install (1) chandelier/light fixture (45 min)'),
        (6, '1st Floor Hallway', 90, 'Install (2) light fixtures'),
        (7, 'Bedroom 1', 90, 'Install (1) ceiling fan'),
        (9, 'Main Bedroom', 45, 'Install ~10 wall plates'),
        (10, 'Main Bathroom', 210, 'Replace (2) faucets; install (2) 6" surface-mount LEDs; replace (1) shower light; replace (1) main bath door knob'),
        (12, 'Bathroom 1', 60, 'Replace faucet; replace panel mirror; replace strip light with vanity fixture; replace shower light with flush-mount style fixture'),
        (14, 'Bedroom 3', 90, 'Install door casing on (1) standard opening (interior casing)'),
        (15, 'Bedroom 4 (Area 1)', 134, 'Install new baseboards around perimeter; install door casing on (1) standard opening (interior casing)'),
        (16, 'Basement Hallway (Part 2)', 120, 'Replace (2) water-damaged doorways with prefab door kits'),
        (18, 'Bedroom 5', 194, 'Install new baseboards around perimeter; install door casing on (2) standard openings (interior casing)'),
        (20, 'Bedroom 4 (Area 2)', 178, 'Install new baseboards around perimeter; install door casing on (1) standard opening (both sides)'),
    ]

    # Stick-down floor add-on (THIS JOB ONLY)
    floor = [
        (13, 'Basement Hallway (Part 1)', 'Install stick-down floor'),
        (16, 'Basement Hallway (Part 2)', 'Install stick-down floor'),
        (17, 'Basement Main Room', 'Install stick-down floor'),
    ]

    # Totals and baseboard LF by room
    baseboards = {
        'Bedroom 4 (Area 1)': 47.0,
        'Bedroom 4 (Area 2)': 46.0,
        'Bedroom 5': 55.2,
        'Basement Hallway (Part 1)': 75.6,
        'Basement Hallway (Part 2)': 40.6,
    }

    floor_sf = {}
    for idx, name, _ in floor:
        _, sf = dims_str(rooms, idx)
        floor_sf[name] = sf

    css = """
    body{font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif; margin:32px;}
    h1{font-size:22px;margin:0 0 8px 0;}
    h2{font-size:16px;margin:0;}
    .meta{color:#444;margin:0 0 14px 0;font-size:13px;}
    .totals{font-size:13px; margin:0 0 16px 0;}
    .totals ul{margin:6px 0 0 18px;}
    .section{margin:0 0 18px 0; padding:14px 14px; border:1px solid #ddd; border-radius:10px;}
    .hdr{display:flex; justify-content:space-between; gap:12px; align-items:baseline;}
    .small{font-size:12px;color:#666;}
    .task{margin:8px 0 8px 0; font-size:13px;}
    .imgs{display:flex; flex-wrap:wrap; gap:10px; margin-top:6px;}
    .imgs img{max-width:240px; max-height:180px; border:1px solid #ccc; border-radius:6px;}
    .rowlabel{font-size:12px;color:#444;margin-top:10px;}
    .hr{height:1px;background:#eee;margin:18px 0;}
    """

    parts = ["<!doctype html><html><head><meta charset='utf-8'>",
             f"<title>{html.escape(jobcode)} — Handyman</title>",
             f"<style>{css}</style></head><body>"]

    parts.append(f"<h1>{html.escape(jobcode)} — Handyman Scope</h1>")
    parts.append("<p class='meta'>Public-safe export. Address/client identifiers removed. Includes room photos + any handyman-task photos per section.</p>")

    # Quick totals
    total_floor_sf = sum(v for v in floor_sf.values() if v)
    parts.append("<div class='totals'><b>Quick totals</b><ul>")
    parts.append("<li>6\" surface-mount LEDs: <b>4</b> total (30 min each standard)</li>")
    parts.append("<li>Wall plates: ~<b>10</b></li>")
    parts.append("<li>Baseboards (approx LF by room):</li>")
    parts.append("<ul>")
    for k, v in baseboards.items():
        parts.append(f"<li>{html.escape(k)}: <b>{v:g} LF</b></li>")
    parts.append(f"<li><b>Total:</b> {sum(baseboards.values()):.1f} LF</li>")
    parts.append("</ul>")
    parts.append("<li>Prefab door kits: <b>2</b></li>")
    parts.append(f"<li>Stick-down flooring install (THIS JOB ONLY): ~<b>{total_floor_sf:.0f} sf</b> (basement hallways + basement main room)</li>")
    parts.append("</ul></div>")

    # Tasks
    def img_block(title: str, imgs: list[str]):
        if not imgs:
            return "<div class='small'>(none)</div>"
        return "<div class='imgs'>" + ''.join(f"<img src='../assets/{html.escape(fn)}' loading='lazy' />" for fn in imgs) + "</div>"

    for idx, room_name, mins, desc in tasks:
        dimtxt, _ = dims_str(rooms, idx)
        parts.append("<div class='section'>")
        parts.append(f"<div class='hdr'><h2>{html.escape(room_name)}</h2><div class='small'>{html.escape(dimtxt)} • <b>{mins} min</b></div></div>")
        parts.append(f"<div class='task'>{html.escape(desc)}</div>")
        parts.append("<div class='rowlabel'>Room photos</div>")
        parts.append(img_block('Room photos', room_imgs.get(idx) or []))
        parts.append("<div class='rowlabel'>Handyman-task photos</div>")
        parts.append(img_block('Handyman photos', handy_imgs.get(idx) or []))
        parts.append("</div>")

    # Stick-down floor section
    parts.append("<div class='hr'></div>")
    parts.append("<h2>THIS JOB ONLY: Stick-Down Floor Install</h2>")

    for idx, room_name, desc in floor:
        dimtxt, sf = dims_str(rooms, idx)
        extra = f" • ~{sf:.0f} sf" if sf else ''
        parts.append("<div class='section'>")
        parts.append(f"<div class='hdr'><h2>{html.escape(room_name)}</h2><div class='small'>{html.escape(dimtxt)}{html.escape(extra)}</div></div>")
        parts.append(f"<div class='task'>{html.escape(desc)} (time TBD)</div>")
        parts.append("<div class='rowlabel'>Room photos</div>")
        parts.append(img_block('Room photos', room_imgs.get(idx) or []))
        parts.append("<div class='rowlabel'>Handyman-task photos</div>")
        parts.append(img_block('Handyman photos', handy_imgs.get(idx) or []))
        parts.append("</div>")

    parts.append("</body></html>")
    (outdir / 'index.html').write_text('\n'.join(parts))


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument('--jobdir', required=True)
    ap.add_argument('--jobcode', required=True)
    ap.add_argument('--outdir', required=True)
    args = ap.parse_args()

    jobdir = Path(args.jobdir).resolve()
    outdir = Path(args.outdir).resolve()
    outdir.mkdir(parents=True, exist_ok=True)

    rooms, room_imgs, handy_imgs = load_job(jobdir)

    # assets are shared between handyman + walkthru exports
    needed = set()
    for d in (room_imgs, handy_imgs):
        for files in d.values():
            needed.update(files)

    copy_assets(jobdir, outdir / 'assets', needed)

    walk = outdir / 'walkthru'
    handy = outdir / 'handyman'
    walk.mkdir(exist_ok=True)
    handy.mkdir(exist_ok=True)

    make_walkthru(args.jobcode, rooms, room_imgs, walk)
    make_handyman(args.jobcode, rooms, room_imgs, handy_imgs, handy)


if __name__ == '__main__':
    main()
