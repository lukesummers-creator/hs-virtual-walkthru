# HANDYMAN — Labor estimate + scope list (Template)

## Labor estimate (draft)
- Estimated labor: **<X.XX> hours**
- Estimated labor $ (@$100/hr): **<...>**

## Scope list (walkthrough order)
- <Room> — <Task>

Rule (downstream dependency): one task per line. Split multi-task entries into separate bullets (repeat room name as needed).
## Copy/paste minutes list (line breaks)
<min>
<min>

## Copy/paste allowance list (tax-loaded, rounded; line breaks)
0
0

## Handyman — SCOPE DETAILS (paste-ready)
$100 Per Hour Plus the Cost of Materials:
- <Room>: <task 1>
- <Room>: <task 2>

**Rules:**
- One task per line (split multi-task entries; repeat room name as needed).
- Each SCOPE DETAILS bullet must correspond 1:1 with the Copy/paste minutes list line breaks (same count, same order).
Handyman terms (paste):

"The final handyman invoice is calculated based on actual hours, in 15 min increments, worked on completing the above tasks and the cost of purchasing any necessary materials to complete the job.

For the purposes of this quote, we've inserted our best estimate of the time needed to perform the above tasks. The final cost may be more or less than the provided number based on actual time spent.

Client is responsible for purchasing fixtures/materials. Please confirm compatibility with HOMEstretch before purchasing to avoid delays and additional fees. Homestretch will make product recommendations at no additional cost upon request.

As a courtesy, we can provide a rough fixture budget estimate to help you understand total “all-in” costs. After proposal acceptance, we can also provide a fixture list.

HOMEstretch can purchase and deliver the necessary fixtures, faucets, and hardware to make this project easier for you. If you’d prefer this, please let us know and a convenience fee will be added.

HOMEstretch can haul away old fixtures for an additional fee.

The time begins as soon as a HOMEstretch Team Member is on the client's property and ends as soon as a HOMEstretch Team Member leaves the client's property. Drive time is not billed. HOMEstretch will haul away and dispose of all old fixtures unless otherwise instructed by the client."

### Notes override rule (FastField glitch aware)
- Include selected handyman dropdown tasks when present.
- If dropdown tasks are missing, treat `handyman_handyman_notes` as authoritative scope text.
