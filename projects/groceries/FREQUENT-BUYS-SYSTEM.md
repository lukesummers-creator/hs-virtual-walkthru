# Frequent Buys — Hybrid System (Staples + Waste Control)

Luke decision: **mix and match**. So we run a 3-tier system.

## Tier A — Auto-add Staples (no confirmation unless you say)
Criteria: shows up constantly in order history *or* it’s a “we get screwed if we run out” item.
- Examples: eggs, milk, bananas, key kid snacks, sparkling water, deli defaults.

## Tier B — Confirm Stock (ask a 5-second question)
Criteria: frequent but easy to overbuy / size varies.
- Examples: sour cream, cheese, tortillas/chips, yogurt, potatoes, some snacks.

## Tier C — Plan-driven Only
Criteria: only buy when a weekly plan calls for it.
- Examples: specific proteins/produce tied to a meal, novelty treats, seasonal one-offs.

## Output behavior
- Weekly planning message: headlines only.
- Shopping list draft includes A automatically, then asks 3–8 stock questions for B, then lists C from the active week plan.

## Source-of-truth inputs
1) `Orders and Items/` pasted order pages (actual history)
2) `PREFERRED-ITEMS.md` (our curated list)
3) `ACTIVE-WEEK.md` + current Meals+More plan
4) `PUSH-TO-NEXT-WEEK.md`
