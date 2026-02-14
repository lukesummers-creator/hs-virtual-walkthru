# Resurrection

Inputs:
- Telegram export JSON: `_inbox/Telegram DataExport_2026-02-06/result.json`

Outputs (generated):
- `exports/` — per-chat markdown transcripts + indices
- `summaries/` — distilled context / decisions / TODOs extracted from transcripts

Runbook:
- `node tools/telegram_export_to_md.js` to convert the JSON export into readable markdown transcripts.
