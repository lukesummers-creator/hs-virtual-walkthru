#!/usr/bin/env python3
"""Generate a public-shareable static "Handyman Scope of Work" site folder.

Design goals:
- No address/client PII in the rendered output.
- Uses relative paths so it can be hosted on GitHub Pages.
- Copies only the needed images into the export folder.

Usage:
  python3 handyman_site_export.py \
    --jobdir "projects/homestretch-proposals/jobs/7540 W 92nd Ave Crown Point JSON Pkg" \
    --jobcode "HS-2026-02-03-K7Q2" \
    --outdir "projects/homestretch-proposals/site-export/HS-2026-02-03-K7Q2"

Notes:
- Assumes jobdir contains: <submission>.json, RENAMED-MANIFEST.json, renamed-images/
"""

from __future__ import annotations

import argparse
import html
import json
import os
import shutil
from pathlib import Path


def build(jobdir: Path, jobcode: str, outdir: Path) -> None:
    jobdir = jobdir.resolve()
    outdir = outdir.resolve()
    outdir.mkdir(parents=True, exist_ok=True)

    # locate JSON + manifest
    json_files = [p for p in jobdir.glob('*.json') if p.name != 'RENAMED-MANIFEST.json']
    if not json_files:
        raise SystemExit(f"No job JSON found in {jobdir}")
    # pick the largest json (submission)
    json_path = max(json_files, key=lambda p: p.stat().st_size)
    manifest_path = jobdir / 'RENAMED-MANIFEST.json'
    if not manifest_path.exists():
        raise SystemExit(f"Missing RENAMED-MANIFEST.json in {jobdir}")

    data = json.loads(json_path.read_text())
    manifest = json.loads(manifest_path.read_text())
    rooms = data.get('painting_flooring_handyman_clearout') or []

    # map roomIndex -> renamed images (room vs handyman)
    room_imgs: dict[int, list[str]] = {}
    handy_imgs: dict[int, list[str]] = {}
    for f in manifest.get('files', []):
        ri = f.get('roomIndex')
        if not ri:
            continue
        kind = f.get('kind')
        dst = f.get('dst')
        if not dst:
            continue
        if kind == 'handyman':
            handy_imgs.setdefault(ri, []).append(dst)
        else:
            room_imgs.setdefault(ri, []).append(dst)

    for d in (room_imgs, handy_imgs):
        for ri in d:
            d[ri].sort()

    # Copy images used into outdir/assets
    assets = outdir / 'assets'
    assets.mkdir(exist_ok=True)

    needed = set()
    for d in (room_imgs, handy_imgs):
        for files in d.values():
            needed.update(files)

    src_img_dir = jobdir / 'renamed-images'
    for fn in sorted(needed):
        src = src_img_dir / fn
        if not src.exists():
            continue
        shutil.copy2(src, assets / fn)

    # basic helpers
    def dims(idx: int) -> str:
        if idx - 1 < 0 or idx - 1 >= len(rooms):
            return 'dims n/a'
        e = rooms[idx - 1]
        L, W, H = e.get('length'), e.get('width'), e.get('height')
        bits = []
        if L and W:
            bits.append(f"{L:g}×{W:g} ft")
        if H:
            bits.append(f"H {H:g} ft")
        return '; '.join(bits) if bits else 'dims n/a'

    # For now, we don't attempt to auto-derive handyman tasks here; we embed the Virtual Walkthru only.
    # The PDF workflow remains primary; this export is intended for photo review and navigation.

    css = """
    body{font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif; margin:32px;}
    h1{font-size:22px;margin:0 0 8px 0;}
    .meta{color:#444;margin:0 0 18px 0;font-size:13px;}
    .section{page-break-inside:avoid; margin:0 0 18px 0; padding:14px 14px; border:1px solid #ddd; border-radius:10px;}
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
        parts.append("<div class='section'>")
        parts.append(f"<div class='hdr'><h2>{idx:02d} {html.escape(str(room))}</h2><div class='small'>{html.escape(dims(idx))} • {len(imgs)} photo(s)</div></div>")
        parts.append("<div class='imgs'>")
        for fn in imgs:
            parts.append(f"<img src='assets/{html.escape(fn)}' loading='lazy' />")
        parts.append("</div></div>")

    parts.append("</body></html>")

    (outdir / 'index.html').write_text('\n'.join(parts))
    (outdir / 'README.txt').write_text(
        "This folder is safe for public hosting if you do NOT add address/client identifiers.\n"
        "Open index.html locally, or host the folder as a static site (e.g., GitHub Pages).\n"
    )


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument('--jobdir', required=True)
    ap.add_argument('--jobcode', required=True)
    ap.add_argument('--outdir', required=True)
    args = ap.parse_args()

    build(Path(args.jobdir), args.jobcode, Path(args.outdir))


if __name__ == '__main__':
    main()
