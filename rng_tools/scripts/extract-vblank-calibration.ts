import { createHash } from "node:crypto";
import { readFile, writeFile, rename } from "node:fs/promises";

const root = new URL("../src/generators/gen3/wild/", import.meta.url);
const tolerance = 0.0025;
const maxKnots = 512;
type Observation = { frame: number; audio: number; nonAudio: number; total: number };
type Weighted = { value: number; weight: number };
export type Knot = { x: number; p: number; area: number };
const sources = [
  { id: "ROUTE101", file: "route101_walk_sweet_scent.txt", map: 0, song: "ROUTE101", loop: 38400 / 19 },
  { id: "ROUTE102", file: "route102_walk_sweet_scent.txt", map: 1, song: "ROUTE101", loop: 38400 / 19 },
  { id: "ROUTE103", file: "route103_walk_sweet_scent.txt", map: 2, song: "ROUTE101", loop: 38400 / 19 },
  { id: "ROUTE104", file: "route104_walk_sweet_scent.txt", map: 3, song: "ROUTE104", loop: 2260.25 },
  { id: "ROUTE110", file: "route110_walk_sweet_scent.txt", map: 5, song: "ROUTE110", loop: 1920 * 150 / 132 },
  { id: "PETALBURG_WOODS", file: "petalsbourg_wood_walk_sweet_scent.txt", map: 14, song: "PETALBURG_WOODS", loop: 2016 * 150 / 130 },
  { id: "ROUTE113", file: "route113_walk_sweet_scent.txt", map: 8, song: "ROUTE113", loop: 3456 * 150 / 128 },
  { id: "SAFARI_ZONE_SOUTH", file: "safari_center_bottom_walk_sweet_scent.txt", map: 20, song: "SAFARI_ZONE", loop: 1152 * 150 / 142 },
];

type CaptureMetadata = Record<string, string | number | boolean> & {
  source: string; sha256: string; attempts: number; distinct_frames: number;
  frame_start: number; frame_end: number; duplicate_attempts: number; missing_frames: number;
  song_loop_frames: number; incomplete_loop: boolean;
};
type Capture = (typeof sources)[number] & { rows: Observation[]; metadata: CaptureMetadata };

export function parseLog(text: string): Observation[] {
  const events = new Map<number, Map<string, number>>();
  const observations: Observation[] = [];
  const runs = new Set<number>();
  for (const line of text.split(/\r?\n/)) {
    if (line.startsWith("event,")) {
      const c = line.split(",");
      if (c[3] !== "encounter_attempt") continue;
      const run = Number(c[1]);
      const map = events.get(run) ?? new Map<string, number>();
      map.set(c[7], Number(c[10]));
      events.set(run, map);
    } else if (line.startsWith("# attempt ")) {
      const fields = Object.fromEntries([...line.matchAll(/(\w+)=([^ ]+)/g)].map(m => [m[1], m[2]]));
      const run = Number(fields.run);
      if (runs.has(run)) throw new Error("Repeated run: " + run);
      runs.add(run);
      if (fields.mode !== "sweet_scent" || fields.endpoint !== "SweetScentWildEncounter") {
        throw new Error("Expected completed land Sweet Scent capture");
      }
      const event = events.get(run);
      const start = event?.get("m4aSoundMain");
      const end = event?.get("TryReceiveLinkBattleData");
      const total = Number(fields.target_offset);
      const frame = Number(fields.frame);
      if (start == null || end == null || event?.get("TrySweetScentEncounter") !== total ||
          !Number.isSafeInteger(start) || !Number.isSafeInteger(end) ||
          !Number.isSafeInteger(frame) || !Number.isSafeInteger(total) || end < start || total < end - start) {
        throw new Error("Invalid or incomplete capture: " + run);
      }
      observations.push({ frame, audio: end - start, nonAudio: total - (end - start), total });
      events.delete(run);
    }
  }
  if (!observations.length) throw new Error("No completed attempts");
  return observations;
}

export function weightedFrames(rows: Observation[], key: "audio" | "nonAudio" | "total"): Weighted[] {
  const counts = new Map<number, number>();
  for (const r of rows) counts.set(r.frame, (counts.get(r.frame) ?? 0) + 1);
  // Each frame has unit total weight, including when its non-audio costs differ across replays.
  return rows.map(r => ({ value: r[key], weight: 1 / counts.get(r.frame)! }));
}

function empirical(values: Weighted[]): Knot[] {
  const groups = new Map<number, number>();
  for (const { value, weight } of values) groups.set(value, (groups.get(value) ?? 0) + weight);
  const mass = [...groups.values()].reduce((a, b) => a + b, 0);
  let p = 0;
  const points: Knot[] = [];
  for (const [x, weight] of [...groups].sort((a, b) => a[0] - b[0])) {
    points.push({ x, p, area: 0 });
    p += weight / mass;
    points.push({ x, p: Math.min(p, 1), area: 0 });
  }
  points[points.length - 1].p = 1;
  return points;
}

export function fit(values: Weighted[], limit = tolerance): { knots: Knot[]; error: number } {
  if (!values.length || values.some(v => !Number.isSafeInteger(v.value) || v.value < 0 || !Number.isFinite(v.weight) || v.weight <= 0)) {
    throw new Error("Expected finite nonnegative integer cycles with positive weights");
  }
  const points = empirical(values);
  const chosen = new Set([0, points.length - 1]);
  // Start with quantiles, then split at the largest error against both sides of every jump.
  for (let q = 1; q < 8; q++) {
    chosen.add(points.findIndex(v => v.p >= q / 8));
  }
  while (true) {
    let error = -1;
    let worst = -1;
    const indices = [...chosen].sort((a, b) => a - b);
    for (let j = 1; j < indices.length; j++) {
      const lo = indices[j - 1], hi = indices[j];
      const a = points[lo], b = points[hi];
      for (let i = lo + 1; i < hi; i++) {
        const p = a.x === b.x ? a.p : a.p + (b.p - a.p) * (points[i].x - a.x) / (b.x - a.x);
        const e = Math.abs(points[i].p - p);
        if (e > error) { error = e; worst = i; }
      }
    }
    if (error <= limit || worst < 0) {
      const knots = indices.map(i => ({ ...points[i] }));
      for (let i = 1; i < knots.length; i++) {
        knots[i].area = knots[i - 1].area + (knots[i].x - knots[i - 1].x) * (knots[i].p + knots[i - 1].p) / 2;
      }
      return { knots, error: Math.max(error, 0) };
    }
    if (chosen.size >= maxKnots) throw new Error("CDF knot budget cannot meet error tolerance");
    chosen.add(worst);
  }
}

export function less(knots: Knot[], x: number): number {
  let lo = 0, hi = knots.length;
  while (lo < hi) { const m = (lo + hi) >>> 1; if (knots[m].x < x) lo = m + 1; else hi = m; }
  if (!lo) return 0;
  if (lo === knots.length) return 1;
  const a = knots[lo - 1], b = knots[lo];
  if (x === b.x) return b.p;
  return a.p + (b.p - a.p) * (x - a.x) / (b.x - a.x);
}

function primitive(knots: Knot[], x: number): number {
  let lo = 0, hi = knots.length;
  while (lo < hi) { const m = (lo + hi) >>> 1; if (knots[m].x <= x) lo = m + 1; else hi = m; }
  if (!lo) return 0;
  const a = knots[lo - 1], w = x - a.x;
  if (lo === knots.length) return a.area + w;
  const b = knots[lo];
  return a.area + w * a.p + 0.5 * w * w * (b.p - a.p) / (b.x - a.x);
}

export function convolution(audio: Knot[], non: Knot[], x: number): number {
  let result = 0;
  for (let i = 1; i < non.length; i++) {
    const a = non[i - 1], b = non[i], mass = b.p - a.p;
    if (mass <= 0) continue;
    result += a.x === b.x ? mass * less(audio, x - a.x)
      : mass / (b.x - a.x) * (primitive(audio, x - a.x) - primitive(audio, x - b.x));
  }
  return Math.max(0, Math.min(1, result));
}

function summary(values: Weighted[]) {
  const points = empirical(values);
  return { min: points[0].x, median: points.find(p => p.p >= 0.5)!.x, max: points.at(-1)!.x };
}

function comparison(knots: Knot[], values: Weighted[]) {
  return Math.max(...empirical(values).map((p, i, all) => Math.abs(
    (i % 2 ? less(knots, p.x + 1e-7) : less(knots, p.x)) - p.p)));
}

export async function extract(check = false) {
  const captures: Capture[] = [];
  for (const source of sources) {
    const text = await readFile(new URL("vblank_calibration_data/" + source.file, root), "utf8");
    const rows = parseLog(text);
    const frames = [...new Set(rows.map(r => r.frame))].sort((a, b) => a - b);
    const span = frames.at(-1)! - frames[0] + 1;
    captures.push({ ...source, rows, metadata: {
      source: source.file, sha256: createHash("sha256").update(text.replaceAll("\r\n", "\n")).digest("hex"),
      checksum_normalization: "LF",
      attempts: rows.length, distinct_frames: frames.length, frame_start: frames[0], frame_end: frames.at(-1)!,
      duplicate_attempts: rows.length - frames.length, missing_frames: span - frames.length,
      song_loop_frames: source.loop, incomplete_loop: span < Math.ceil(source.loop),
      game: "Emerald", action: "SweetScentLand", movement: "OnFoot", sound_mode: "Unspecified",
      safety_margin_cycles: 0, independent_full_loop_validation: false,
    } });
  }
  const models = new Map<string, ReturnType<typeof fit>>();
  let code = "// Generated by bun run rng_tools/scripts/extract-vblank-calibration.ts. Do not edit.\n";
  code += "use super::{CalibrationProvenance, ComponentDistribution, CycleCalibrationSummary};\n";
  code += "use super::super::cycle_distribution::{CdfKnot, PiecewiseCdf};\n\n";
  const diagnostics: Array<{ component: string; knots: number; max_cdf_error: number } & Record<string, unknown>> = [];
  const emitComponent = (id: string, values: Weighted[], result: ReturnType<typeof fit>, m: CaptureMetadata) => {
      const s = summary(values);
      const number = (x: number) => Number.isInteger(x) ? x.toFixed(1) : x.toPrecision(17);
      code += "pub(super) const " + id + ": ComponentDistribution = ComponentDistribution {\n";
      code += "    summary: CycleCalibrationSummary { min: " + s.min + ", median: " + s.median + ", max: " + s.max + " },\n";
      code += "    cdf: PiecewiseCdf { knots: &[\n";
      for (const k of result.knots) code += "        CdfKnot { cycle: " + number(k.x) + ", probability: " + number(k.p) + ", integral: " + number(k.area) + " },\n";
      code += "    ] },\n    provenance: CalibrationProvenance {\n";
      code += "        source: \"" + m.source + "\", sha256: \"" + m.sha256 + "\",\n";
      code += "        attempts: " + m.attempts + ", distinct_frames: " + m.distinct_frames + ",\n";
      code += "        frame_start: " + m.frame_start + ", frame_end: " + m.frame_end + ",\n";
      code += "        missing_frames: " + m.missing_frames + ", duplicate_attempts: " + m.duplicate_attempts + ",\n";
      code += "        song_loop_frames: " + number(m.song_loop_frames) + ", incomplete_loop: " + m.incomplete_loop + ",\n";
      code += "        max_cdf_error: " + number(result.error) + ", safety_margin_cycles: 0,\n";
      code += "    },\n};\n\n";
      diagnostics.push({ component: id, ...m, knots: result.knots.length, max_cdf_error: result.error, support: s });
  };
  for (const capture of captures) {
    for (const key of ["audio", "nonAudio"] as const) {
      // The first capture for a song supplies its shared audio model.
      if (key === "audio" && captures.find(c => c.song === capture.song)!.id !== capture.id) continue;
      const values = weightedFrames(capture.rows, key);
      const result = fit(values);
      const id = key === "audio" ? capture.song + "_AUDIO" : capture.id + "_NON_AUDIO";
      models.set(id, result);
      emitComponent(id, values, result, capture.metadata);
    }
  }
  const validation = [];
  for (const capture of captures) {
    const audio = models.get(capture.song + "_AUDIO")!.knots;
    const non = models.get(capture.id + "_NON_AUDIO")!.knots;
    const totals = empirical(weightedFrames(capture.rows, "total"));
    let error = 0;
    for (let i = 0; i < totals.length; i++) {
      const p = totals[i];
      const threshold = p.x + (i % 2 ? 1e-7 : 0);
      error = Math.max(error, Math.abs(convolution(audio, non, threshold) - p.p));
    }
    // Validate representative interval widths, including narrow method windows.
    let intervalError = 0;
    const totalValues = weightedFrames(capture.rows, "total");
    const totalWeight = totalValues.reduce((s, v) => s + v.weight, 0);
    for (const width of [32, 256, 1024, 8192]) {
      for (let start = totals[0].x; start <= totals.at(-1)!.x; start += 256) {
        const measured = totalValues.filter(v => v.value >= start && v.value < start + width)
          .reduce((s, v) => s + v.weight, 0) / totalWeight;
        const estimated = convolution(audio, non, start + width) - convolution(audio, non, start);
        intervalError = Math.max(intervalError, Math.abs(estimated - measured));
      }
    }
    const audioError = comparison(audio, weightedFrames(capture.rows, "audio"));
    // Sharing Route 101 audio with Routes 102/103 is a cross-map holdout, not an independent temporal loop.
    if (audioError > 0.02) throw new Error("Shared audio validation failed for " + capture.id);
    const independentCdfError = error;
    const independentIntervalError = intervalError;
    const joint = error > 0.02 || intervalError > 0.025 ? fit(totalValues) : null;
    const totalCdf = (x: number) => joint ? less(joint.knots, x) : convolution(audio, non, x);
    if (joint) {
      emitComponent(capture.id + "_JOINT", totalValues, joint, capture.metadata);
      error = comparison(joint.knots, totalValues);
      intervalError = 0;
      for (const width of [32, 256, 1024, 8192]) {
        for (let start = totals[0].x; start <= totals.at(-1)!.x; start += 256) {
          const measured = totalValues.filter(v => v.value >= start && v.value < start + width)
            .reduce((s, v) => s + v.weight, 0) / totalWeight;
          intervalError = Math.max(intervalError, Math.abs(totalCdf(start + width) - totalCdf(start) - measured));
        }
      }
      if (error > 0.02 || intervalError > 0.025) throw new Error("Joint correction validation failed for " + capture.id);
    }
    code += "pub(super) const " + capture.id + "_JOINT_CORRECTION: Option<ComponentDistribution> = "
      + (joint ? "Some(" + capture.id + "_JOINT)" : "None") + ";\n";
    let lo = audio[0].x + non[0].x;
    let hi = audio.at(-1)!.x + non.at(-1)!.x;
    for (let i = 0; i < 48; i++) {
      const mid = (lo + hi) / 2;
      if (totalCdf(mid) < 0.5) lo = mid; else hi = mid;
    }
    const median = Math.ceil(hi - 1e-7);
    code += "pub(super) const " + capture.id + "_COMBINED_MEDIAN: usize = " + median + ";\n";
    const quantiles = [0.01, 0.05, 0.25, 0.5, 0.75, 0.95, 0.99].map(p => {
      let low = totals[0].x, high = totals.at(-1)!.x;
      for (let i = 0; i < 48; i++) {
        const mid = (low + high) / 2;
        if (totalCdf(mid) < p) low = mid; else high = mid;
      }
      return { p, empirical_cycles: totals.find(t => t.p >= p)!.x, estimated_cycles: Math.ceil(high - 1e-7) };
    });
    validation.push({ map: capture.id, combined_median: median, quantiles, audio_source: capture.song, audio_cdf_error: audioError,
      joint_cdf_error: error, max_interval_probability_error: intervalError,
      independent_joint_cdf_error: independentCdfError, independent_interval_probability_error: independentIntervalError,
      model: joint ? "joint_cdf_correction" : "independent_convolution",
      validation_kind: captures.find(c => c.song === capture.song)!.id === capture.id ? "in_sample_joint" : "cross_map_audio_holdout" });
  }
  const artifacts = [
    ["vblank_calibration_data.rs", code],
    ["vblank_calibration_validation.json", JSON.stringify({ extractor_version: 3, cdf_tolerance: tolerance,
      validation_limits: { joint_cdf_error: 0.02, interval_probability_error: 0.025, shared_audio_cdf_error: 0.02 },
      probability_interval: "[start, end)", components: diagnostics, validation }, null, 2) + "\n"],
  ];
  for (const [name, content] of artifacts) {
    const url = new URL(name, root);
    if (check) {
      if (await readFile(url, "utf8") !== content) throw new Error("Outdated calibration artifact: " + name);
    } else {
      const temporary = new URL(name + ".tmp", root);
      await writeFile(temporary, content);
      await rename(temporary, url);
    }
  }
  console.log(JSON.stringify({ components: diagnostics.map(v => ({ id: v.component, knots: v.knots,
    error: v.max_cdf_error })), validation }, null, 2));
}

if (import.meta.main) {
  if (process.argv.slice(2).some(arg => arg !== "--check")) throw new Error("Usage: extract-vblank-calibration.ts [--check]");
  await extract(process.argv.includes("--check"));
}
