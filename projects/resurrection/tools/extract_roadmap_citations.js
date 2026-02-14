#!/usr/bin/env node
/*
Extract roadmap/backlog/parked/TODO-style lines from Telegram-export transcripts.

Usage:
  node tools/extract_roadmap_citations.js --in exports --out summaries/roadmap-citations.md

This is a best-effort heuristic scanner.
*/

const fs = require('fs');
const path = require('path');

function arg(name, def=null) {
  const i = process.argv.indexOf(name);
  if (i === -1) return def;
  return process.argv[i+1] ?? def;
}

function listFiles(dir) {
  const out=[];
  for (const ent of fs.readdirSync(dir, {withFileTypes:true})) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) out.push(...listFiles(p));
    else out.push(p);
  }
  return out;
}

const inDir = arg('--in', 'exports');
const outPath = arg('--out', 'summaries/roadmap-citations.md');

const needles = [
  /\broadmap\b/i,
  /\bbacklog\b/i,
  /\bpark(ed|ing)?\b/i,
  /\btodo\b/i,
  /\bnext step\b/i,
  /\bnext up\b/i,
  /\bfuture\b/i,
  /\bwe can keep .* for now and .* roadmap\b/i,
];

function isHit(line) {
  const s=line.trim();
  if (!s) return false;
  // ignore some generic mentions
  if (/\bNext step pinned\b/i.test(s)) return true;
  return needles.some(r=>r.test(s));
}

function chatNameFromFile(p) {
  const base = path.basename(p, '.md');
  // e.g., homestretch-proposals-3507... -> HOMEstretch Proposals
  const m = base.split('-');
  return m.slice(0, -1).join('-');
}

const files = listFiles(inDir).filter(f=>f.endsWith('.md'));
const byChat = new Map();

for (const f of files) {
  const lines = fs.readFileSync(f,'utf8').split(/\n/);
  const chat = chatNameFromFile(f);
  for (let i=0;i<lines.length;i++) {
    const line = lines[i];
    if (!isHit(line)) continue;

    // capture a small window of context
    const start = Math.max(0, i-2);
    const end = Math.min(lines.length-1, i+2);
    const ctx = [];
    for (let j=start;j<=end;j++) {
      const l=lines[j].trimEnd();
      if (l.trim()==='') continue;
      ctx.push(l);
    }

    const rec = { file: f, line: i+1, snippet: ctx.join('\n') };
    const arr = byChat.get(chat) || [];
    arr.push(rec);
    byChat.set(chat, arr);
  }
}

// Write output
const out=[];
out.push('# Roadmap / backlog items (with citations from Telegram exports)');
out.push('');
out.push('Generated: '+new Date().toISOString());
out.push('');
out.push('This is a best-effort scan. Each bullet cites the export file + line number.');
out.push('');

for (const [chat, recs] of Array.from(byChat.entries()).sort((a,b)=>a[0].localeCompare(b[0]))) {
  out.push(`## ${chat}`);
  out.push('');
  // de-dupe by snippet
  const seen = new Set();
  for (const r of recs) {
    const key = r.snippet;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(`- **${path.basename(r.file)}:${r.line}**`);
    out.push('');
    out.push('```');
    out.push(r.snippet);
    out.push('```');
    out.push('');
  }
}

fs.mkdirSync(path.dirname(outPath), {recursive:true});
fs.writeFileSync(outPath, out.join('\n'), 'utf8');
console.log('Wrote', outPath);
