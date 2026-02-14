# Memory System Rules (Global)

This repo uses a **file-based memory system** so work persists across restarts and can be reused across projects.

## The 4 memory layers
1) **Project artifacts** (source of truth)
   - Quotes: `projects/homestretch-proposals/jobs/<job>/PRICING-JOURNAL.md`
   - Groceries: `projects/groceries/...` planning docs
   - Other projects: `projects/<project>/...` thread docs

2) **Daily log** (what happened)
   - `memory/YYYY-MM-DD.md`

3) **Long-term distilled memory** (principles + preferences)
   - `MEMORY.md`

4) **Self-review log** (quality control)
   - `memory/self-review.md`

## Backcheck + rollout rule (global)
When we lock in a fix, treat it like a mini-deploy:
- Backcheck recent artifacts to see what already complies.
- Decide rollout scope (this job / this+next / last N / global).
- Record the decision in the right SOP/template.

## Checkpoint triggers (flush to files)
Trigger a checkpoint immediately when any of these happens:
- Luke indicates he’s stepping away (e.g., "Ok Mac I gotta go")
- Luke explicitly switches context/projects (e.g., "let’s move to the next quote" / "different project")
- Major learning / training moment (repeatable rule)
- Completion of a discrete deliverable (quote/cart/proposal pack)
- Context getting too large / forced flush
- Before any restart

## Routing rules (where content goes)
On checkpoint:
- Always write a short summary to `memory/YYYY-MM-DD.md`.
- Update the relevant **project artifact** (journal/thread doc) if decisions were made.
- Write to `MEMORY.md` only if it’s durable across time and projects.
- Write/adjust workflows in project docs/templates when repeatable.

## Similarity + reuse
- Job journals should include Tags + Segments to enable “jobs like this” comparisons.
- Principles in any README/notes should cite supporting job journals.
