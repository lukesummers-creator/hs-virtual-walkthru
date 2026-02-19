# Memo — 2026-02-19 — X Article Review (Memory/Recall/Continuity)

**Context:** Luke + Mac did a top-level review in DM while proposals channel was mid-review. Goal was to extract useful improvements without triggering patch mania or context hoarding.

**Sources (raw in workbench):**
- `_INBOX/The Files Your Open Claw Is Missing.md` (X: https://x.com/ijsthee/status/2023852711423181073)
- `_INBOX/Give your Openclaw the Memory it Needs (Full Guide).md` (X: https://x.com/KSimback/status/2024180197910864182)

---

## Review Contract
- Output needed: 4-bucket OS bounce:
  1) what we already do
  2) what we can steal with **no system changes**
  3) what we should **strongly consider** changing (system changes)
  4) novel ideas we dismiss + why
- Guardrails:
  - avoid “patch mania” / file sprawl
  - avoid “pocketing context”; distill into an artifact
  - no implementation until Luke explicitly says GO

---

## 1) What we’re already doing (mapped to our system)
**Living files / plain markdown / git layer (Article 1)**
- We already use agent-readable, git-backed canon files (SOUL/USER/AGENTS/MEMORY + daily memory) and a brain repo at `/Users/lrs/mac-brain`.
- We already treat docs as “living” via: readable by agent, editable, referenced, and recoverable via git checkpoints.

**Memory failure modes (Article 2)**
- Failure Mode 3 (compaction destroys knowledge): partially mitigated by:
  - `contextPruning` TTL mode (currently ttl=1h)
  - `compaction` safeguard mode
  - alerts-only heartbeat + a pager that surfaces compaction/pruning events
- Failure Mode 2 (saved but not retrieved): we enforce memory_search for “prior work/decisions/prefs/todos” questions.
- Git/checkpointing: already an established continuity safety net.

---

## 2) Steal + implement with NO system changes (behavior only)
1) **Start-of-session re-anchor line**
   - Luke says: “DM channel: systems/R&D” (or “Proposals channel”, “Pit channel”, etc.)
   - Mac responds with 5 bullets: active thread, changes since last, blockers, assumptions, next question.

2) **End-of-night micro-checkpoint (in chat)**
   - Luke drops 3 bullets: objective / next step / landmines.
   - Mac mirrors it back.

3) **Force artifact citations in reviews**
   - “Already doing” must cite actual files/settings, not vibes.

4) **Use review contracts as default**
   - e.g., “Review: 4-bucket OS bounce” to constrain output and prevent sprawl.

---

## 3) Strongly consider adjusting (system changes, high ROI)
1) **Memory flush before compaction**
   - Enable a compaction memoryFlush that writes decisions/state/lessons/blockers to daily memory before compaction.
   - Goal: prevent mid-session loss when context compacts.

2) **Fix DM session isolation**
   - Avoid shared main DM session behavior; increases correctness/safety and reduces weird context bleed.

3) **Tune contextPruning TTL**
   - ttl=1h may be too aggressive; consider 6h + keep last assistant turns to reduce repetition.

4) **Adopt the “7 living files” as a mapping, not more files**
   - Use the categories as a checklist/index pointing to existing canon, not a new 7-file sprawl.

---

## 4) Novel ideas dismissed (for now) + why
1) **Mem0 auto-capture/auto-recall**
   - Dismiss for now: adds moving parts + privacy/auditability risk; we prefer explicit files + explicit flush.

2) **Cognee / knowledge graphs**
   - Dismiss: overkill + setup complexity + encourages schema obsession (patch-mania fuel).

3) **QMD sidecar**
   - Maybe later: legit, but adds another service. First tighten built-in flush/retrieval/isolation.

4) **Obsidian integration**
   - Maybe later: useful for human browsing, but invites scope creep. Stabilize core loop first.

---

## Retrieval cue (what Luke can say later)
Say:
- “Mac, pull the memo: **2026-02-19 X article review (memory/recall/continuity)** and let’s start working through the ‘Strongly consider’ items one-by-one.”

Then Mac should:
- re-display section 3
- propose a GO/NO-GO menu of config patches (one at a time) with rollback hashes
- **do nothing** until Luke says GO
