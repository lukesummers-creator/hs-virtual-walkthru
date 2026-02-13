# Groceries — Rules (project canon)

## Output format
- **Headlines only** in chat when discussing upcoming meals (short, scannable lines).
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
- Don’t “substitute” preferences without asking (especially chips/crackers flavors).
