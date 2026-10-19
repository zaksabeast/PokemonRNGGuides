# Emerald wild cycle calibration: likelihood follow-up

## Implemented foundation

- Separate precomputed audio summaries, keyed by song, and non-audio summaries, keyed by map_internal_idx. Route 101 is the explicit fallback for uncalibrated maps.
- Initial calibration uses only route101_walk_sweet_scent.txt: 2,022 completed attempts. Audio min/median/max: 24,444 / 48,005 / 62,238; non-audio: 10,242 / 10,250 / 10,274.
- Combined support is 34,686-72,512. Summed component extrema cover all observed joint values, but are empirical bounds rather than proven hardware limits. The representative value 58,255 is a sum of component medians, not the median of the sum.
- This calibration applies only to land Sweet Scent on foot. Other actions retain existing estimates. Bike calibration needs an explicit movement/music context before it can be selected safely.
- Generator initialization, search-result likelihood, and distribution calculations receive the internal map index. Cycle initialization and cycle-data APIs require Wild3MapGameData; calibration lookup reads map_internal_idx from it.
- Likelihood remains uniform within the selected range for now. No raw log is included in the compiled program.

## Proposed compact distribution representation

1. Keep hard support and probability shape separate. Store explicit observed min/max independently of fitted knots, so compression cannot silently shrink the valid support. Record sample count, distinct-frame count, sampled span, song loop duration, action, movement mode, sound mode, and source/version metadata. Flag fallbacks and incomplete-loop samples.
2. Use a monotone piecewise-linear CDF for audio, keyed by actual playing song and encounter/movement context. Fit sorted, distinct endpoint frames with equal weight per frame; report duplicate or skipped frames. Use adaptive knots, starting with quantiles and adding knots at the largest empirical CDF error until an agreed tolerance (for example 0.5 percentage points) or storage budget is reached. Always retain endpoints. A CDF is preferable to an unnormalized piecewise density: range probability is directly F(end)-F(start), and monotonicity/normalization are easy to check.
3. Keep non-audio separate per map and context. These recordings have at most ten values, so store the exact small discrete PMF (cycle offset plus count/weight) rather than approximate it with a continuous curve. Include the optional 18-cycle timing states; their rarity means a short sample can miss the maximum. Store both observed support and any deliberately justified safety margin.
4. Approximate the sum by convolving the audio CDF with the non-audio PMF: F_total(x) = sum_s p_non_audio(s) * F_audio(x-s). Then calculate_method_probability integrates the requested interval using this combined CDF. Preserve the current interval boundary convention explicitly. Do not add component medians to claim an exact combined median; solve F_total(x)=0.5 instead.
5. Independence is an approximation: residual alignment and stalls can depend on audio completion time. Before adopting convolution, compare it with the empirical joint total distribution and method probabilities. If error exceeds tolerance, retain a compact conditional non-audio PMF by audio timing phase, or a separate correction sketch, rather than assuming independence.
6. Wire the distribution context through the public likelihood/ideal-lead APIs and callers. Preserve map-aware selection and use the combined model to choose the ideal lead timing. Decide how fallbacks are presented before enabling strict filtering for uncalibrated maps; Route 101 estimates cannot prove impossible timings on another map.

## Collection and validation

- Audio: collect at least one full actual song loop; prefer two loops to check repeatability. A musical loop is not necessarily an exact CPU-cost period. Count actual frames, not attempts. Avoid treating a partial extra loop as an unbiased whole-loop average.
- Non-audio: 256 elapsed frames gave a worst mean error of about 3.46 cycles across the six analyzed datasets. Use about 1,100 frames when observed extrema matter; this is empirical, not a universal guarantee. Cover representative positions, weather, tilesets, and encounter states separately.
- Before deleting logs, independently extract and review the constants and sketches. Keep the extractor, summarized provenance, and checksums so recalibration is reproducible from future logs without requiring old raw data in tests or builds.
- Validate on held-out full-loop samples: support coverage, CDF maximum error, quantiles, and range-probability error for real method intervals. Report dependence between repeated frames rather than using IID significance tests.
- Test monotonic CDF knots, total mass, support endpoints, convolution shifts, empty/outside intervals, map/song sharing, fallback selection, and unchanged uncalibrated actions. Compare generator filtering and search likelihood against the same model.
