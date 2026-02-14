---
name: continuity-recall
description: "Injects relevant prior context on session start using local recall + CORE-RULES"
metadata:
  openclaw:
    emoji: "🧠"
    events: ["session:start", "command:new"]
    requires:
      bins: ["node"]
---

# continuity-recall hook

Goal: improve continuity automatically.

- On `session:start`: inject a short context block derived from local brain files.
- On `command:new`: warn/encourage checkpointing before reset (lightweight).

Design notes:
- Local-only: reads files + runs local recall (`mac-brain/tools/recall/recall`).
- Snippets are sanitized + length-capped.
- If anything fails, the hook fails open (no injection).
