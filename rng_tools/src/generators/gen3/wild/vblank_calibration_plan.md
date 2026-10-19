# Emerald wild cycle calibration: implementation

## Implemented

- Audio and non-audio use the same adaptive monotone piecewise-linear CDF. Repeated x coordinates preserve jumps; no limit on the number of distinct non-audio values is assumed. Fitting error is at most 0.0025 (0.25 percentage points), with a 512-knot budget that fails explicitly if insufficient.
- Audio is stored once per song/context. Route 101 audio is shared by Routes 101, 102, and 103; Routes 104, 110, 113, Petalburg Woods, and Safari Zone have their own songs. Each of the eight measured maps has its own non-audio distribution; the Safari recording is registered only for SafariZone_South. Selection uses Wild3MapGameData and an explicit action/movement/sound context.
- Current measurements cover Emerald land Sweet Scent on foot, with unspecified sound mode. Generator/search options accept optional calibration_context; omitted values preserve the existing walking context. Explicit bike or sound-mode contexts are not silently matched to this data. Other actions keep their legacy estimates.
- Observed min/max are separate from CDF knots. Current safety margins are zero: these are empirical bounds, not hardware guarantees. A justified margin can expand filtering without changing the fitted likelihood. Unmeasured land maps first borrow the first calibrated map sharing their default song; if none exists, they borrow Route 101. These likelihood approximations remain flagged as fallbacks and use full-frame filtering, so borrowed support does not declare another map's timings impossible. Default song lookup uses Emerald map headers and internal wild-header indices; runtime overrides are not available in Wild3MapGameData. Unsupported land contexts also use full-frame filtering and uniform fallback likelihood.
- Likelihood uses convolution: F_total(x) = integral F_audio(x-y) dF_non_audio(y). Audio CDF primitives integrate non-audio linear segments analytically; jumps contribute explicitly. Combined CDFs are not assumed piecewise linear. Probabilities use half-open intervals [start, end), with left limits preserving discrete endpoints.
- Combined medians are solved offline and stored, rather than summing component medians or running a solver per generated encounter. Ideal lead speed maximizes interval probability over legal integer speeds. Initialization, search results, likelihood/ideal-lead APIs, and the UI caller carry the same context.
- get_wild3_calibration_info exposes source checksums, counts, skipped/repeated frames, loop coverage, fitting errors, support margins, and supported/fallback status. Runtime and Rust model tests do not need the raw captures.

## Reproduction

Run from the repository root:

    bun run rng_tools/scripts/extract-vblank-calibration.ts
    bun run rng_tools/scripts/extract-vblank-calibration.ts --check
    bun test ./rng_tools/scripts/extract-vblank-calibration.test.ts
    bun run test:rust

The extractor writes vblank_calibration_data.rs and vblank_calibration_validation.json next to this document. Check mode validates captures and compares both artifacts without writing. Keep the extractor, Rust constants, and JSON report after deleting raw .txt files. Regeneration needs recordings; builds and tests do not.

Each completed encounter frame has unit total weight. Replayed attempts within a frame share that weight, preserving differing residual costs without over-weighting the frame. Incomplete attempts are ignored; malformed completed attempts are rejected. SHA-256 uses LF-normalized source text for stable cross-platform artifacts. Metadata records action/movement/sound assumptions and extractor version.

## Validation and limits

The report records component CDF errors, joint total CDF errors, quantiles, and tested interval-probability errors for widths 32, 256, 1,024, and 8,192 cycles. Routes 102/103 provide cross-map audio holdouts while retaining their own non-audio fits. Routes 101/104/110 provide in-sample joint validation. Extraction rejects joint CDF error above 2 percentage points, tested interval error above 2.5 points, or shared audio CDF error above 2 points. When convolution exceeds the joint limits, the extractor retains an additional fitted joint CDF, validates it against the same limits, and uses it for likelihood and the combined median. Separate component data and their summed conservative bounds remain intact. Both independent and corrected errors are recorded. Petalburg Woods requires this correction: independent joint error is 3.22 percentage points, versus under 0.25 points after correction.

Current errors are below 0.25 points for fitted components, 1.25 points for joint CDFs, and 0.72 points for tested interval probabilities. These checks do not prove independence or guaranteed extrema. Independent temporal full-loop validation has not been collected and is explicitly flagged false. Sparse coverage and skipped frames remain visible in provenance.

Prefer two full audio loops to check repeatability. Choose non-audio duration through convergence across independent windows and representative positions, weather, tileset/sprite animation phases, actions, and movement states. Song duration need not cover non-audio periodicity. Earlier 256-frame mean and approximately 1,100-frame extrema results apply only to those recorded setups.

Tests cover complex fitting, rare extrema, replay weighting, malformed captures, analytic convolution, jumps, half-open boundaries, normalization, integral consistency, shared songs, map-specific residuals, fallback filtering, unsupported contexts, missing-context deserialization, unchanged legacy actions, generator support, and globally optimal integer lead selection.
