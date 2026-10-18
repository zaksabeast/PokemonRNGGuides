# Simplified Emerald Wild RNG

## Goal

Create a separated simplified version of Emerald wild RNG on one page without a stepper.
The user selects a species, searches, and receives an automatically selected
setup followed by Catch and Calibrate. The advanced workflow is not available.
Reuse existing encounter data and setup types where straightforward. Keep the
target search independent from the advanced wild3 form, and try to reuse the
existing calibration component.

The new page is /emerald-wild-shiny
Create a guide for it with only relevant info.

## Interface and fixed rules

- Species is the only target Pokemon filter. Hide IVs, nature, gender, ability,
  shininess, TID/SID, and ACE SID controls.
  Don't show Feebas in the list.
- No battle video, painting reseeding, or manual target setup entry.
- Keep "Ignore Recommended Setups", initially off. When enabled, show map,
  action, and lead restrictions, initialized to all eligible choices.
- Permit all species-compatible maps and actions under the fixed rules below.
- Permit only ordinary (`Vanilla`), `Egg`, and all Synchronize natures.
- Roamer and mass outbreak states are always `Inactive`; hide their fields.
- Disable special Feebas behavior and hide Feebas state/tile fields.
- Search wild methods Wild1, Wild2, Wild4 without showing a method selector.
- Initial seed is 0, minimum advance is 1,000, maximum results is 20; all hidden.
- Retain the existing 10,000,000 maximum advance as a hidden search bound.
- Disable RNG-manipulated lead PID and exclude impossible setups.

After searching, display the chosen Pokemon, map, action, lead, advance,
likelihood, and any required items (using the same component as Info from previous steps from "Catch and Calibrate").
Show Catch and Calibrate directly below.
There's no result table with rows.

## Design decisions

### Independent target-search form

Create a new simplified search component with its own `FormState`, validation
schema, and initial values. Do not extend or import the advanced wild3
`FormState`. The new state should contain only editable inputs:

- `species`.
- `recommendedSetups`, initially true.
- Selected maps, actions, and permitted leads for custom setup restrictions.

Use existing domain types for species, actions, and leads. If the Select component
requires primitive values, use stable lead keys mapped to domain values. Only
reuse field components when they work with the new form without coupling it to
the advanced schema. Reuse the existing form primitives and display helpers.

Keep hidden constants out of `FormState`. Construct search options explicitly
from the validated form and the fixed rules above. This prevents hidden advanced
defaults from affecting the simplified workflow.

### Separate search adapter

Add a simplified search function that accepts the new `FormState` and builds
`Wild3SearcherOptions` directly for `rngTools.search_wild3`. Reuse existing game
data and small helpers where easy. Do not refactor the advanced searcher merely
to make the two forms share an adapter, and do not introduce a collection of
simplified-mode flags into the advanced form.

Apply the fixed lead and encounter-state restrictions regardless of the
recommendation switch. With recommended setups enabled, consider all eligible
maps/actions and all allowed leads. With it disabled, intersect those choices
with the user's selections. Derive options from species-compatible game data
and reconcile map/action selections when species changes.

Search only `Wild1`, `Wild2`, and `Wild4`. Build unconstrained Pokemon filters
with existing helpers, applying only species. Keep painting options null and
use the hidden seed, advance bounds, and result limit specified above.

Feebas has no `Inactive` state: `NotInMap` means outside Route 119. Respect
map-state compatibility and existing search limitations instead of assigning
that state indiscriminately. Species requiring unsupported special encounters
must be unavailable or produce a clear explanation, not a hidden validation
error. Retain existing White Flute and Safari Pokeblock search defaults where
practical, and preserve any required items in the selected setup summary.

### Automatic selection without a result table

Process returned candidates internally; do not render result rows or require a
manual setup confirmation. Select a concrete setup rather than a grouped PID
path:

1. Discard incompatible setups and candidates with unreliable or missing
   probability data.
2. Calculate method probability using `AVERAGE_LEAD_CYCLE_SPEED` for ordinary
   and Synchronize leads. Use speed 0 for Egg leads. Reuse existing WASM cycle
   calculations rather than approximating the probability.
3. Require an unrounded probability strictly greater than `0.5`.
4. Choose the earliest qualifying target advance. Resolve ties consistently by
   map ID, action, method, and stable lead order.
5. Produce the existing `TargetSetup` type, preserving encounter states, method,
   lead, and required items. Use `{ before: 0, after: advance }` for painting
   advances and null for `aceSid`.

Reuse the result-to-setup mapping from `wild3ResultSetupInfos.tsx` if extracting
it is straightforward; otherwise keep the simplified mapping small and explicit.
Do not depend on its advanced result-table state or `primaryLikelihood`, which
is not necessarily the probability at average lead speed.

The 20-result limit applies to the search response before qualification. If
none qualifies, select the one with highest likelihood.

### Reuse Catch and Calibrate first

Try rendering the existing `Wild3Calib` component directly with the selected
`TargetSetup`, the chosen lead speed, and explicit no-video information:

```ts
{
  targetPaintingAdvs: targetSetup.targetPaintingAdvs,
  battleVideoAdvAfterPainting: 0,
  consoleType: null,
}
```

Use its existing target summary (currently titled "Info from previous steps")
to display the selected setup; do not build a second summary above it. If needed,
add a small optional prop to rename the summary to "Selected setup", preserving
the existing default for other callers.

Keep caught-Pokemon matching, console selection, timing correction, timer, and
wrong-method feedback inside the reused component. Prefer small optional props
for any necessary presentation changes over duplicating calibration logic.
Ensure recovery controls do not expose painting, battle video, or debug-only
features in this flow. Review action labels: the existing timer hardcodes
"Trigger Sweet Scent", while this page also permits fishing and Rock Smash.

Only extract a shared calibration section if direct reuse requires substantial
unrelated inputs or cannot support this flow cleanly. Keep the existing advanced
component behavior unchanged for its current callers.

### State and reset behavior

The simplified page owns the selected target and search status in local state.
Do not use advanced `emerald_wild_*` persisted atoms, which can contain disallowed
setups. If persistence is added later, use separate keys and schema migrations.

Clear the old target when search inputs change or a new search starts. Prevent
superseded asynchronous responses from selecting an obsolete target. Render
calibration only after successful selection, and reset its session when the
target changes, for example by keying the component with a stable setup identity.
Preserve timing corrections between attempts at the same target. Clear All
clears selection and calibration together.

## Implementation and validation

1. Add the independent form schema, defaults, and simplified search adapter.
2. Add automatic qualification and conversion to `TargetSetup`.
3. Build the single-page form and wire the selected target into `Wild3Calib`.
4. Make only the small calibration presentation changes required for reuse.
5. Integrate the page through existing guide/page conventions without manually
   editing generated metadata or WASM artifacts.

Verify fixed constraints in both recommendation modes, species changes,
probabilities equal to and above 50%, Egg speed, deterministic selection, empty
results, errors, and stale responses. Manually exercise Catch and Calibrate with
Sweet Scent, fishing, and Rock Smash, including repeated attempts and target
changes. Confirm there is no result table or intermediate selection step.

For implementation, run `bun run lint:ts:types` and, if guide integration changes,
`bun run build:guides:check`. This plan-only update requires content review rather
than application builds or tests.
