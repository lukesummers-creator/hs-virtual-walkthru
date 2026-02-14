#!/usr/bin/env node
/*
Hydrate FastField zip packages into workbench job folders.

- Reads zips from /Users/lrs/clawd/_INBOX/fastfield-zips
- Extracts each zip to /Users/lrs/clawd/_INBOX/_extracted/<zipBase>/
- Locates a JSON payload inside the zip
- Best-effort identifies the property address/job name
- Copies:
    - source zip -> projects/homestretch-proposals/_ARTIFACTS/fastfield-zips/<zip>
    - extracted json -> projects/homestretch-proposals/jobs/<jobFolder>/FastField JSON/<json>
  And writes: hydration summary.md per job.

This is intentionally NOT the full intake (no photo renaming, no proposal pack generation).
*/

const fs = require('fs');
const path = require('path');
const cp = require('child_process');

const ROOT = '/Users/lrs/clawd';
const ZIP_DIR = path.join(ROOT, '_INBOX/fastfield-zips');
const EXTRACT_DIR = path.join(ROOT, '_INBOX/_extracted');
const PROJ = path.join(ROOT, 'projects/homestretch-proposals');
const JOBS_DIR = path.join(PROJ, 'jobs');
const ARTIFACTS_DIR = path.join(PROJ, '_ARTIFACTS/fastfield-zips');

function sh(cmd) {
  return cp.execSync(cmd, { encoding: 'utf8' });
}

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function listZips() {
  if (!fs.existsSync(ZIP_DIR)) return [];
  return fs.readdirSync(ZIP_DIR)
    .filter(f => f.toLowerCase().endsWith('.zip'))
    .map(f => path.join(ZIP_DIR, f))
    .sort();
}

function unzip(zipPath, outDir) {
  ensureDir(outDir);
  // -o overwrite
  sh(`unzip -o ${JSON.stringify(zipPath)} -d ${JSON.stringify(outDir)} >/dev/null`);
}

function findJsonFiles(dir) {
  const out = [];
  function walk(d) {
    for (const ent of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, ent.name);
      if (ent.isDirectory()) walk(p);
      else if (ent.isFile() && ent.name.toLowerCase().endsWith('.json')) out.push(p);
    }
  }
  walk(dir);
  // prefer smaller path depth
  out.sort((a,b)=>a.split(path.sep).length - b.split(path.sep).length);
  return out;
}

function extractStrings(obj, acc) {
  if (obj == null) return;
  if (typeof obj === 'string') { acc.push(obj); return; }
  if (Array.isArray(obj)) { for (const v of obj) extractStrings(v, acc); return; }
  if (typeof obj === 'object') {
    for (const [k,v] of Object.entries(obj)) {
      // include key hints as strings too
      if (typeof k === 'string') acc.push(k);
      extractStrings(v, acc);
    }
  }
}

function guessAddressFromJson(jsonObj) {
  if (!jsonObj || typeof jsonObj !== 'object') return null;
  const directKeys = [
    'address','property_address','job_address','site_address','Address','Property Address','Job Address'
  ];
  for (const k of directKeys) {
    if (k in jsonObj && typeof jsonObj[k] === 'string' && jsonObj[k].trim()) return jsonObj[k].trim();
  }

  const strings = [];
  extractStrings(jsonObj, strings);

  // crude address regex: number + street + suffix
  const re = /\b\d{1,6}\s+[A-Za-z0-9.'\- ]{2,40}\s+(?:St|Street|Ave|Avenue|Rd|Road|Dr|Drive|Ct|Court|Blvd|Boulevard|Ln|Lane|Way|Pl|Place|Pkwy|Parkway)\b\s*(?:[#A-Za-z0-9\- ]{0,10})?/i;
  for (const s of strings) {
    if (typeof s !== 'string') continue;
    const m = s.match(re);
    if (m) return m[0].trim();
  }
  return null;
}

function safeJobFolderName(addr) {
  // If we can't identify, use UNKNOWN + zip base
  if (!addr) return null;
  // Normalize spacing
  let name = addr.replace(/\s+/g,' ').trim();
  // Remove commas/state/zip if present
  name = name.replace(/,\s*[A-Z]{2}\s*\d{5}(-\d{4})?$/,'');
  name = name.replace(/[\\/:*?"<>|]/g, '');
  return name;
}

function writeHydrationNote(jobDir, content) {
  fs.writeFileSync(path.join(jobDir, 'HYDRATION-NOTE.md'), content, 'utf8');
}

function main() {
  ensureDir(EXTRACT_DIR);
  ensureDir(JOBS_DIR);
  ensureDir(ARTIFACTS_DIR);

  const zips = listZips();
  if (!zips.length) {
    console.log('No zips found in', ZIP_DIR);
    return;
  }

  const results = [];

  for (const zipPath of zips) {
    const base = path.basename(zipPath, '.zip');
    const outDir = path.join(EXTRACT_DIR, base);

    unzip(zipPath, outDir);

    const jsonFiles = findJsonFiles(outDir);
    const primaryJson = jsonFiles[0] || null;

    let addr = null;
    let parsed = null;
    if (primaryJson) {
      try {
        const txt = fs.readFileSync(primaryJson, 'utf8');
        parsed = JSON.parse(txt);
        addr = guessAddressFromJson(parsed);
      } catch (e) {
        // ignore
      }
    }

    const jobFolder = safeJobFolderName(addr) || `UNKNOWN__${base}`;
    const jobDir = path.join(JOBS_DIR, jobFolder);
    ensureDir(jobDir);

    // Copy artifacts
    fs.copyFileSync(zipPath, path.join(ARTIFACTS_DIR, path.basename(zipPath)));

    if (primaryJson) {
      const jsonDestDir = path.join(jobDir, 'FastField JSON');
      ensureDir(jsonDestDir);
      fs.copyFileSync(primaryJson, path.join(jsonDestDir, path.basename(primaryJson)));
    }

    writeHydrationNote(jobDir,
`# Hydration note

This job folder was (re)hydrated from a FastField zip.

- Source zip: ${path.basename(zipPath)}
- Extracted to: ${outDir}
- Primary JSON: ${primaryJson ? path.basename(primaryJson) : 'NOT FOUND'}
- Address guess: ${addr || 'UNKNOWN'}

Next step (later): run full intake (photos rename/manifest, proposal pack/pricing journal generation) when Luke says GO.
`);

    results.push({ zip: path.basename(zipPath), jobFolder, addr: addr || 'UNKNOWN', json: primaryJson ? path.basename(primaryJson) : 'NONE' });
  }

  const summaryPath = path.join(PROJ, '_ARTIFACTS', 'HYDRATION-SUMMARY.json');
  ensureDir(path.dirname(summaryPath));
  fs.writeFileSync(summaryPath, JSON.stringify({ createdAt: new Date().toISOString(), results }, null, 2));
  console.log('Hydrated', results.length, 'zip(s). Summary:', summaryPath);
}

main();
