# Wild encounter cycle recordings

These emulator recordings provide the test data for calibrating the wild Gen 3
generator. Each `.json` file contains one JSON object per line, rather than a
single JSON array. Recordings cover land and water Sweet Scent, Old Rod fishing,
and Rock Smash, with different maps, leads, and Safari Pokeblocks.

Each record contains the encounter's RNG advance, hexadecimal lead PID, VBlank
durations, and a timeline of named moments with frame and cycle counters. Frame
numbers are absolute emulator frames. Repeated PID rolls may be compressed to
the first and last occurrence of each PID half within a frame. Consecutive
duplicate moments are removed before scoring.

`cycle_calibration_tests.rs` validates the corpus and tests the scoring logic.
Scores compare CPU-work increments between matching transitions, subtracting
recorded VBlank durations and penalizing missing transitions. PID spans retain
the weight of the uncompressed generated timeline. Recordings where a VBlank
occurs between PID halves can be identified separately for calibration.

This preparation step leaves production generation unchanged. Connecting the
recordings to detailed generator output and enforcing calibration accuracy belong
to the subsequent generator change.

Run the focused tests from the repository root:

```sh
bun run test:rust -- cycle_calibration_tests
```
