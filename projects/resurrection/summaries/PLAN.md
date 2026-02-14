# Resurrection Plan (Telegram export)

## What we have
- Telegram Desktop export JSON: `_inbox/Telegram DataExport_2026-02-06/result.json`
- Converted per-chat transcripts (markdown): `exports/*.md`

## Immediate goals
1) Recreate the missing *working context* (rules, processes, decisions) that was previously living in root-level md files and ad-hoc notes.
2) Rebuild missing project folder skeletons (`projects/_INBOX`, `projects/passport`, `projects/migration`, `projects/sheets`) with canonical docs derived from Telegram + any surviving files.
3) For homestretch-proposals: rebuild the *artifact pipeline* so job packages can be rehydrated from source inputs (Drive/PandaDoc/FastField), even if the old local `renamed-images/` sets are gone.

## Next steps (today)
- [ ] Read through `exports/homestretch-proposals-3507395346.md` and extract:
  - guardrails / rules
  - pricing rules
  - canonical file/folder conventions
  - job-specific decisions and changes
- [ ] Same for `exports/the-pit-3893871630.md`.
- [ ] Produce distilled docs into `projects/resurrection/summaries/`:
  - `HOMESTRETCH-RULES.md`
  - `FILE-STRUCTURE.md`
  - `OPEN-LOOPS.md`

## Outputs
- Human-readable transcripts: `exports/*.md`
- Distilled knowledge: `summaries/*.md`
