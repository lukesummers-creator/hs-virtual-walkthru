# Groceries — Rules (project canon)

## Output format
- **Headlines only** in chat when discussing upcoming meals (short, scannable lines).
- Default plan = **5 dinners/week** (one per weekday), then tighten based on availability/activities.
- When a meal needs extra detail (pull from freezer / quick prep), provide **only the minimum prep bullets**.

## Day-of-week question logic ("what's for dinner <day>?")
- Default to **THIS WEEK** as long as the requested day is **on or after today**.
- Source of truth is the **active week plan** in `ACTIVE-WEEK.md`.
- If it’s mid-week and the user asks about a day **before today**, assume they mean **NEXT WEEK** (unless they explicitly say otherwise).

## Push-to-next-week
- If a dinner gets swapped or postponed (e.g., "cod moves to Tuesday next week"), record it in `PUSH-TO-NEXT-WEEK.md`.
- The next plan must explicitly incorporate pushed items (or explicitly reject them).

## Preferred items
- Preferred repeat-buys live in `PREFERRED-ITEMS.md`.
- **Full-fat dairy whenever possible.**
- Don’t “substitute” preferences without asking (especially chips/crackers flavors).
- If a preferred item is out of stock and substitutions might be acceptable, ask in Groceries chat: **"it’s out of stock; here are options A/B/C—should I add one?"**
- Exception: **sour cream** — any full-fat sour cream is fine; aim for ~16 oz tub; avoid monster tubs.
- Exception: **Mexican shredded cheese** — 32 oz family pack preferred; if out of stock, smaller sizes are acceptable.
- Exception: **Uncrustables** — must be grape; pack size flexible.
- Snyder’s GF pretzels/pretzel sticks: **exact match only** (skip if not available).
