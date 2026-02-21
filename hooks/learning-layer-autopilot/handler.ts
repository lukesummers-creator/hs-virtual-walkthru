import fs from "node:fs/promises";
import path from "node:path";

// NOTE: Workspace hooks must be self-contained. Do not import OpenClaw internal modules
// via relative paths (those paths won't exist in the workspace).

const LEARNED_LOG = "/Users/lrs/mac-brain/continuity/LEARNED-LOG.md";

type Cue = {
  kind:
    | "learning-moment"
    | "repetition-drift"
    | "global-lock"
    | "remember"
    | "correction";
  askWhy: boolean;
};

function detectCue(textRaw: string): Cue | null {
  const text = textRaw.toLowerCase();

  const hasBecause = /\bbecause\b|\bhere'?s why\b|\bwhy:\b/.test(text);

  if (/\blearning\s+moment\b/.test(text) || /\blet\s+(this|that)\s+be\s+a\s+lesson\s+learned\b/.test(text)) {
    return { kind: "learning-moment", askWhy: !hasBecause };
  }

  if (/\bwe\s+(talked|discussed)\s+about\s+this\s+already\b|\byou\s+should\s+know\s+this\b|\bwe\s+already\s+defined\s+this\b/.test(text)) {
    return { kind: "repetition-drift", askWhy: !hasBecause };
  }

  if (/\bglobal\s+lock\b/.test(text)) {
    return { kind: "global-lock", askWhy: false };
  }

  if (/\bremember\s+this\b|\blearn\s+this\b|\block\s+this\s+in\b/.test(text)) {
    return { kind: "remember", askWhy: !hasBecause };
  }

  // Generic corrections (looser)
  if (/\byou\s+forgot\b|\bstop\s+doing\s+that\b|\bno,?\s+do\s+it\s+this\s+way\b|\bwrong\b/.test(text)) {
    return { kind: "correction", askWhy: !hasBecause };
  }

  return null;
}

async function appendLearned(entry: string) {
  await fs.mkdir(path.dirname(LEARNED_LOG), { recursive: true });
  await fs.appendFile(LEARNED_LOG, entry, "utf8");
}

const handler = async (event: any) => {
  // message:received detection (fail open)
  const eventType = String(event?.type || "").toLowerCase();
  const action = String(event?.action || "").toLowerCase();
  if (!(eventType === "message" && action === "received")) return;

  const channel = String(event?.context?.channelId || "").toLowerCase();
  // Only Telegram + Web dashboard
  if (!(channel === "telegram" || channel === "web" || channel === "webchat")) return;

  const content = String(event?.context?.content || "").trim();
  if (!content) return;

  // Best-effort filter to Luke only when the event provides a stable numeric sender id.
  // In some group contexts metadata sender ids may be usernames; we fail open in that case.
  const senderId =
    event?.context?.metadata?.senderId || event?.context?.metadata?.from || event?.context?.from;
  const senderStr = senderId ? String(senderId) : "";
  if (senderStr && /^\d+$/.test(senderStr) && senderStr !== "8444328214") return;

  const cue = detectCue(content);
  if (!cue) return;

  const ts = event.timestamp?.toISOString?.() ?? new Date().toISOString();
  const convo = event.context.conversationId || event.sessionKey || "";
  const status = cue.askWhy ? "[ASK-WHY]" : "[NEEDS-CANON]";

  const snippet = content.replace(/\s+/g, " ").slice(0, 500);

  const block =
    `\n- ${ts} — ${status} **Cue:** ${cue.kind} (channel=${channel}${convo ? ", convo=" + convo : ""})\n` +
    `  - **Raw:** ${snippet}\n`;

  try {
    await appendLearned(block);
  } catch (err) {
    console.error("[learning-layer-autopilot] failed to append learned log:", err);
  }

};

export default handler;
