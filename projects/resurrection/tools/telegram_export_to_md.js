#!/usr/bin/env node
/* Convert Telegram Desktop JSON export (result.json) into readable per-chat markdown.

Usage:
  node tools/telegram_export_to_md.js \
    --in "_inbox/Telegram DataExport_2026-02-06/result.json" \
    --out "exports"

Writes:
  exports/index.json
  exports/<chatSlug>.md
*/

const fs = require('fs');
const path = require('path');

function arg(name, def=null) {
  const i = process.argv.indexOf(name);
  if (i === -1) return def;
  return process.argv[i+1] ?? def;
}

function ensureDir(p) { fs.mkdirSync(p, { recursive: true }); }

function slugify(s) {
  return String(s)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 80) || 'chat';
}

function stripHtml(s) {
  return String(s)
    .replace(/<br\s*\/>/gi, '\n')
    .replace(/<[^>]*>/g, '');
}

function normalizeText(text) {
  if (text == null) return '';
  if (typeof text === 'string') return text;
  if (Array.isArray(text)) {
    return text.map(t => {
      if (typeof t === 'string') return t;
      if (t && typeof t === 'object' && 'text' in t) return String(t.text);
      return '';
    }).join('');
  }
  if (typeof text === 'object') {
    if ('text' in text) return String(text.text);
    return JSON.stringify(text);
  }
  return String(text);
}

function fmtMsg(m) {
  const dt = m.date || '';
  const from = m.from || m.actor || '';
  let body = normalizeText(m.text);
  if (m.html && (!body || body.trim() === '')) body = stripHtml(m.html);
  body = body.replace(/\r\n/g, '\n');
  const lines = body.split('\n');

  const header = `- **${dt}** — **${from}** (id:${m.id}, type:${m.type})`;

  // Attachments (Telegram export uses fields like photo, file, media_type, etc. Varies.)
  const extra = [];
  for (const k of ['photo', 'file', 'thumbnail', 'media_type', 'mime_type', 'duration_seconds']) {
    if (m[k]) extra.push(`${k}: ${typeof m[k] === 'string' ? m[k] : '[obj]'}`);
  }
  if (m.file_name) extra.push(`file_name: ${m.file_name}`);
  if (m.sticker_emoji) extra.push(`sticker: ${m.sticker_emoji}`);

  const extraBlock = extra.length ? `\n  - _${extra.join(', ')}_` : '';

  if (lines.length === 1 && lines[0].trim() !== '') {
    return `${header}${extraBlock}\n  ${lines[0]}`;
  }
  if (lines.every(l => l.trim() === '')) {
    return `${header}${extraBlock}`;
  }
  return `${header}${extraBlock}\n  ${lines.map(l => l === '' ? '' : l).join('\n  ')}`;
}

function main() {
  const inPath = arg('--in');
  const outDir = arg('--out', 'exports');
  if (!inPath) {
    console.error('Missing --in');
    process.exit(1);
  }

  const absIn = path.resolve(process.cwd(), inPath);
  const absOut = path.resolve(process.cwd(), outDir);
  ensureDir(absOut);

  const data = JSON.parse(fs.readFileSync(absIn, 'utf8'));
  const chats = (data?.chats?.list) || [];

  const index = [];

  for (const chat of chats) {
    const name = chat.name || `chat-${chat.id}`;
    const slug = `${slugify(name)}-${chat.id}`;
    const file = `${slug}.md`;

    const messages = chat.messages || [];

    const md = [];
    md.push(`# ${name}`);
    md.push('');
    md.push(`- type: ${chat.type}`);
    md.push(`- id: ${chat.id}`);
    md.push(`- messages: ${messages.length}`);
    md.push('');
    md.push('---');
    md.push('');

    for (const m of messages) {
      // Skip pure service noise if desired; keep everything for now.
      md.push(fmtMsg(m));
      md.push('');
    }

    fs.writeFileSync(path.join(absOut, file), md.join('\n'), 'utf8');
    index.push({ name, id: chat.id, type: chat.type, messages: messages.length, file });
  }

  fs.writeFileSync(path.join(absOut, 'index.json'), JSON.stringify(index, null, 2), 'utf8');
  console.log(`Wrote ${index.length} chats to ${outDir}`);
}

main();
