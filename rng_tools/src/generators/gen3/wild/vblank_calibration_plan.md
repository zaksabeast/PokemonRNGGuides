# Emerald wild cycle calibration

TypeScript owns the calibration components and composes the distributions attached to each `Wild3MapGameData.vblank_distrs` array. Rust receives only action, movement, weather, filtering bounds, and combined CDF knots.

## Data and composition

- `src/rngToolsUi/gen3/wild/data/vblank_calibration_data.ts` contains the measured components, joint corrections, fake audio components, and source-map assignments.
- `fake_vblank_audio.ts` defines the synthetic recipes and scaling. Every synthetic component retains `is_fake: true` and identifies its source as synthetic.
- `vblank_calibration_maps.ts` records map-header songs and cycling permissions. Route 118's position-dependent song is not resolved by the map-only input and uses conservative fallback calibration.
- `vblank_calibration.ts` selects components and resolves fallback status before producing the minimal Rust input. Unmeasured setups retain full-frame filtering bounds. Provenance, fake flags, and fallback status remain available through its TypeScript `getWild3CalibrationInfo` function.
- Independent components are convolved and sampled into a combined piecewise-linear CDF. Joint corrections are used directly for their measured setups. Duplicate cycle coordinates preserve discrete jumps. Likelihood intervals remain half-open: `[start, end)`.
- Setup enumeration includes available encounter actions, on-foot/bike/surf movement, and the Route 119/120/123 weather variants. Existing cycle options use the first matching setup, with sunny entries ordered first; a caller can supply a selected subset of distributions.
- Rust queries the supplied CDF for bounds, median, and likelihood. Missing input has broad uniform bounds, distinct from the explicit test-only uniform calibration spanning 30,000 to 70,000 cycles.

## Reproduction

Run from the repository root:

    bun run rng_tools/scripts/extract-vblank-calibration.ts
    bun run rng_tools/scripts/extract-vblank-calibration.ts --check
    bun test rng_tools/scripts/extract-vblank-calibration.test.ts src/rngToolsUi/gen3/wild/data/vblank_calibration.test.ts
    bun run test:rust

The extractor reads ignored captures from `rng_tools/src/generators/gen3/wild/vblank_calibration.local.data/` and generates `vblank_calibration_data.ts` and `vblank_calibration_validation.json` in the TypeScript data directory. Regeneration needs those captures; application builds and tests use the checked-in output.

Each completed encounter frame has unit total weight. Replays share their frame's weight. Incomplete attempts are ignored and malformed completed attempts are rejected. Source checksums normalize line endings to LF.

## Validation limits

The extraction report preserves the component fitting errors, source loop coverage, joint correction diagnostics, and interval-probability errors from the captures. These diagnostics describe the raw fits, not a guarantee on the sampled runtime convolution. Independent temporal full-loop validation has not been collected. Recorded bounds are empirical; safety margins are retained separately in the raw provenance and applied during TypeScript composition.
