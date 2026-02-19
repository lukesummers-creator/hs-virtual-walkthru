# Quest: ai-media-lab

## 00 — Brief
- Problem:
  - We want AI-assisted *renderings* and broader media capabilities (vision + image generation), but our current OpenClaw `image` tool is effectively pinned to Anthropic vision and fails when Anthropic credits are out.
  - We also want this capability to be reusable beyond proposals (system-level media lab), then mount a proposals-specific wrapper.

- Goal / Definition of Done:
  1) **Map the terrain**: document the exact tool surfaces available in OpenClaw today for (a) image understanding, (b) image generation, and what is / isn’t configurable.
  2) **Unblock vision**: confirm a reliable path to image *analysis* using Gemini (either via OpenClaw config wiring or an explicit CLI/script).
  3) **Image generation MVP (manual, no hooks)**:
     - a reproducible command (script) that takes: `prompt` + optional `input image`
     - outputs: PNG/JPG file saved under a deterministic path in workbench
     - uses existing credentials (GEMINI_API_KEY) and avoids provider lock-in
  4) **Prompt library v0**: generic prompt templates (not proposals-specific) + a small proposals mount doc.

- Non-goals:
  - No hooks/daemons/auto-triggers (hook trauma acknowledged).
  - Not shipping into production workflows yet; this is R&D + tool hardening.

- Constraints:
  - Avoid configs that can DOS APIs.
  - Prefer manual + rate-limited scripts.
  - Preserve continuity: everything captured in The Pit quest + eventually promoted to mac-brain canon/tooling.

## 01 — Context + Backlinks
- Origin: Luke↔Mac DM (system channel) → mounted into The Pit for R&D.
- Related:
  - OpenClaw config patch attempted to reroute `agents.defaults.imageModel` and `tools.media.image.models` to Google/Gemini; **`functions.image` still called Anthropic** and failed due to credits.
  - Proposals use-case: generate “after” concept renderings (Gray/White refresh) from room photos.

## 02 — Worklog (decisions + notes)
- 2026-02-19
  - Decision: treat this as a **standalone media lab** capability; proposals will be a mounted wrapper.
  - Decision: **no hooks**. Use manual scripts / explicit commands only.
  - Observation: OpenClaw config schema supports `agents.defaults.imageModel` and `tools.media.image.*` for media understanding, but image generation is not obviously a first-class tool surface.
  - Next investigation: determine whether OpenClaw can route `functions.image` via config (or if that tool is pinned) and, if pinned, implement a manual Gemini/Imagen generation script.

## 04 — Deploy
- Deploy target(s):
  - `mac-brain/projects/...` (new standalone project or mounted docs)
  - `mac-brain/tools/...` for any durable scripts
  - `mac-brain/projects/homestretch-proposals/...` for the proposals wrapper
- Deploy steps:
  - When v0 is stable: promote quest outputs (docs + scripts) into mac-brain, commit/push.
- Rollback plan:
  - Delete/disable scripts (manual tools only).
  - Revert config patch if needed (gateway config patch rollback via baseHash).
- Owner approval needed: Luke
