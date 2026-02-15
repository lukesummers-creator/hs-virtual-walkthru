/**
 * continuity-recall OpenClaw Hook
 *
 * Injects a short "context block" at session start using local recall + CORE-RULES.
 * Fails open (if anything breaks, it does nothing).
 */

import { execFileSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const MAX_RESULTS = 5;
const MAX_PROMPT_LEN = 500;
const MAX_SNIPPET_LEN = 220;

function sanitize(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/[\x00-\x1f\x7f]/g, '')
    .replace(/[`*_~\[\]]/g, '\\$&')
    .trim();
}

function truncate(str, n) {
  const s = sanitize(str).replace(/\s+/g, ' ');
  if (s.length <= n) return s;
  return s.slice(0, n - 1).trimEnd() + '…';
}

function extractInitialPrompt(event) {
  const fromContext = event?.context?.initialPrompt;
  if (typeof fromContext === 'string' && fromContext.trim()) {
    return fromContext.trim().slice(0, MAX_PROMPT_LEN);
  }
  const lists = [
    event?.context?.messages,
    event?.context?.initialMessages,
    event?.context?.history,
    event?.messages
  ];
  for (const list of lists) {
    if (!Array.isArray(list)) continue;
    for (const m of list) {
      const role = (m?.role || m?.type || '').toString().toLowerCase();
      if (role && role !== 'user' && role !== 'human') continue;
      const content = m?.content ?? m?.text ?? m?.message;
      const text = typeof content === 'string'
        ? content
        : Array.isArray(content)
          ? content.map(p => (typeof p === 'string' ? p : (p?.text || p?.content || ''))).join(' ')
          : '';
      if (typeof text === 'string' && text.trim()) {
        return text.trim().slice(0, MAX_PROMPT_LEN);
      }
    }
  }
  return '';
}

function getMacBrainDir() {
  const env = process.env.MAC_BRAIN_DIR;
  if (env && fs.existsSync(env)) return env;
  const fallback = '/Users/lrs/mac-brain';
  if (fs.existsSync(fallback)) return fallback;
  return '';
}

function readCoreRulesBullets(macBrainDir) {
  const p = path.join(macBrainDir, 'continuity', 'CORE-RULES.md');
  if (!fs.existsSync(p)) return [];
  const txt = fs.readFileSync(p, 'utf8');

  const bullets = [];
  // Pull the most important continuity anchors (keep small so it doesn't swamp prompts).
  const lines = txt.split(/\r?\n/);
  const want = [
    /Learning layer/i,
    /Brain-first default/i,
    /Session boot rule/i
  ];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (want.some(r => r.test(line))) {
      // include heading + next ~3 lines
      const chunk = [line, lines[i + 1] || '', lines[i + 2] || '', lines[i + 3] || '']
        .filter(Boolean)
        .join(' ');
      bullets.push(truncate(chunk, MAX_SNIPPET_LEN));
    }
    if (bullets.length >= 2) break;
  }

  return bullets;
}

function readVaultIndexMatches(macBrainDir, query) {
  const p = path.join(macBrainDir, 'vault', 'VAULT-INDEX.md');
  if (!fs.existsSync(p)) return [];

  const q = (query || '').toString().toLowerCase();
  const tokens = Array.from(new Set(q.split(/[^a-z0-9]+/g).filter(t => t.length >= 4)));
  if (!tokens.length) return [];

  const lines = fs.readFileSync(p, 'utf8').split(/\r?\n/);
  const hits = [];
  for (const line of lines) {
    if (!line.startsWith('|')) continue;
    const s = line.toLowerCase();
    if (!tokens.some(t => s.includes(t))) continue;
    // Keep only actual rows, not header/separators
    if (line.includes('---') || line.includes(' Note ') || line.includes('|------')) continue;
    hits.push(truncate(line, MAX_SNIPPET_LEN));
    if (hits.length >= 5) break;
  }
  return hits;
}

function runRecall(macBrainDir, query) {
  const recallBin = path.join(macBrainDir, 'tools', 'recall', 'recall');
  if (!fs.existsSync(recallBin)) return [];

  const q = (query || '').toString().replace(/[\x00-\x1f\x7f]/g, ' ').replace(/\s+/g, ' ').trim();
  if (!q) return [];

  let out = '';
  try {
    out = execFileSync(recallBin, [q, '--top', String(MAX_RESULTS)], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
      timeout: 8000,
      env: { ...process.env }
    });
  } catch {
    return [];
  }

  // Parse blocks like:
  // [0.336] continuity/CORE-RULES.md:1-30
  // snippet...
  const lines = out.split(/\r?\n/);
  const results = [];
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^\[(\d+\.\d+)\]\s+([^:]+):(\d+)-(\d+)/);
    if (!m) continue;
    const loc = `${m[2]}:${m[3]}-${m[4]}`;
    const snippet = lines[i + 1] || '';
    results.push({ loc, snippet: truncate(snippet, MAX_SNIPPET_LEN) });
    if (results.length >= MAX_RESULTS) break;
  }
  return results;
}

function buildContextBlock(prompt, coreBullets, vaultIndexMatches, recallHits) {
  const header = '[Context pulled from your brain] Relevant prior context';
  const lines = [header];

  if (coreBullets.length) {
    lines.push('');
    lines.push('Core rules:');
    for (const b of coreBullets) lines.push(`- ${b}`);
  }

  if (vaultIndexMatches.length) {
    lines.push('');
    lines.push('Vault index matches:');
    for (const row of vaultIndexMatches) lines.push(`- ${row}`);
  }

  if (recallHits.length) {
    lines.push('');
    lines.push(`Recall hits for: "${truncate(prompt, 120)}"`);
    for (const h of recallHits) {
      lines.push(`- ${h.loc}: ${h.snippet}`);
    }
  }

  return lines.join('\n');
}

export default async function handler(event) {
  try {
    const eventType = (event?.type || '').toString().toLowerCase();
    const action = (event?.action || '').toString().toLowerCase();

    // Light nudge on /new.
    if (eventType === 'command' && action === 'new') {
      if (Array.isArray(event.messages)) {
        event.messages.push('[continuity-recall] FYI: /new resets session context. If something feels important, harden it into files (CORE-RULES / project docs) before resetting.');
      }
      return;
    }

    // Session start injection.
    const name = (event?.name || event?.eventName || event?.event || '').toString().toLowerCase();
    const isSessionStart = (eventType === 'session' && action === 'start') || name === 'session:start' || action === 'session:start';
    if (!isSessionStart) return;

    const macBrainDir = getMacBrainDir();
    if (!macBrainDir) return;

    const prompt = extractInitialPrompt(event);

    const coreBullets = readCoreRulesBullets(macBrainDir);
    const vaultIndexMatches = prompt ? readVaultIndexMatches(macBrainDir, prompt) : [];
    const recallHits = prompt ? runRecall(macBrainDir, prompt) : [];

    // If no prompt exists yet, still inject baseline continuity anchors so new sessions feel consistent.
    if (!prompt && !coreBullets.length) return;
    if (prompt && !coreBullets.length && !vaultIndexMatches.length && !recallHits.length) return;

    const block = buildContextBlock(prompt || 'session start', coreBullets, vaultIndexMatches, recallHits);

    if (!Array.isArray(event.messages)) event.messages = [];
    // inject as system message
    event.messages.push({ role: 'system', content: block });
  } catch {
    // fail open
    return;
  }
}
