import { readFile, writeFile, rename } from "node:fs/promises";
import { fakeAudioComponents } from "../../src/rngToolsUi/gen3/wild/data/fake_vblank_audio";
import { emerald_wild_encounters } from "../../src/rngToolsUi/gen3/wild/data/emerald_wild_encounters";
import { mapCalibrationSettings } from "../../src/rngToolsUi/gen3/wild/data/initial_cycle_calibration_maps";
import type {
  CalibrationComponentEntry,
  MapCalibrationSource,
} from "../../src/rngToolsUi/gen3/wild/data/initial_cycle_calibration_types";
import { format, resolveConfig } from "prettier";

// This script generates initial_cycle_calibration_data.ts which represents Emerald wild initial cycle models.
// Run `bun run rng_tools/scripts/extract-vblank-calibration.ts` after updating the source data (vblank_calibration.local.data/*)

const root = new URL("../src/generators/gen3/wild/", import.meta.url);
const tolerance = 0.01;
const maxKnots = 128;
type Observation = {
  frame: number;
  audio: number;
  nonAudio: number;
  total: number;
};
type Weighted = { value: number; weight: number };
export type Knot = { x: number; p: number; area: number };
type CaptureMode = "sweet_scent" | "fishing";
type Source = {
  id: string;
  file: string;
  map: number;
  song: string;
  loop: number;
  mode?: CaptureMode;
  audio?: string;
  playing_song?: MapCalibrationSource["playing_song"];
  action?: MapCalibrationSource["action"];
  weather?: "Rain";
};

const sources: Source[] = [
  {
    id: "ROUTE101",
    file: "ROUTE101-Sunny-MapSong-SweetScentLand.txt",
    map: 0,
    song: "ROUTE101",
    loop: 38400 / 19,
  },
  {
    id: "ROUTE102",
    file: "ROUTE102-Sunny-MapSong-SweetScentLand.txt",
    map: 1,
    song: "ROUTE101",
    loop: 38400 / 19,
  },
  {
    id: "ROUTE103",
    file: "ROUTE103-Sunny-MapSong-SweetScentLand.txt",
    map: 2,
    song: "ROUTE101",
    loop: 38400 / 19,
  },
  {
    id: "ROUTE104",
    file: "ROUTE104-Sunny-MapSong-SweetScentLand.txt",
    map: 3,
    song: "ROUTE104",
    loop: 2260.25,
  },
  {
    id: "ROUTE110",
    file: "ROUTE110-Sunny-MapSong-SweetScentLand.txt",
    map: 5,
    song: "ROUTE110",
    loop: (1920 * 150) / 132,
  },
  {
    id: "PETALBURG_WOODS",
    file: "PETALBURG_WOODS-Sunny-MapSong-SweetScentLand.txt",
    map: 14,
    song: "PETALBURG_WOODS",
    loop: (2016 * 150) / 130,
  },
  {
    id: "ROUTE113",
    file: "ROUTE113-Sunny-MapSong-SweetScentLand.txt",
    map: 8,
    song: "ROUTE113",
    loop: (3456 * 150) / 128,
  },
  {
    id: "SAFARI_ZONE_SOUTH",
    file: "SAFARI_ZONE_SOUTH-Sunny-MapSong-SweetScentLand.txt",
    map: 20,
    song: "SAFARI_ZONE",
    loop: (1152 * 150) / 142,
  },
  {
    id: "ALTERING_CAVE",
    file: "ALTERING_CAVE-Sunny-MapSong-SweetScentLand.txt",
    map: 114,
    song: "RG_SEVII_CAVE",
    loop: 5525.619515,
  },
  {
    id: "LILYCOVE_FISHING_SUNNY",
    file: "LILYCOVE_CITY-Sunny-MapSong-SuperRod.txt",
    map: 84,
    song: "LILYCOVE",
    // Loop markers and tempo changes in pokeemerald's mus_lilycove.mid.
    loop: 3354.689,
    mode: "fishing",
    audio: "LILYCOVE_FISHING_SUNNY_AUDIO",
  },
  {
    id: "ROUTE117_BIKE_FISHING_SUNNY",
    file: "ROUTE117-Sunny-BikeSong-SuperRod.txt",
    map: 11,
    song: "ROUTE110",
    loop: (2688 * 150) / 138,
    mode: "fishing",
    audio: "CYCLING_FISHING_SUNNY_AUDIO",
    playing_song: "BikeSong",
  },
  {
    id: "DESERT_UNDERPASS_BIKE_SUNNY",
    file: "DESERT_UNDERPASS-Sunny-BikeSong-SweetScentLand.txt",
    map: 111,
    song: "MT_CHIMNEY",
    loop: (2688 * 150) / 138,
    mode: "sweet_scent",
    audio: "CYCLING_SUNNY_AUDIO",
    playing_song: "BikeSong",
  },
  {
    id: "METEOR_FALLS_B1F_2R",
    file: "METEOR_FALLS_B1F_2R-Sunny-MapSong-SweetScentLand.txt",
    map: 25,
    song: "CAVE_OF_ORIGIN",
    loop: (1728 * 150) / 100,
    mode: "sweet_scent",
  },
  {
    id: "ROUTE123_BIKE_FISHING_RAIN",
    file: "ROUTE123-Rain-BikeSong-SuperRod.txt",
    map: 37,
    song: "ROUTE122",
    loop: (2688 * 150) / 138,
    mode: "fishing",
    audio: "CYCLING_FISHING_RAIN_AUDIO",
    playing_song: "BikeSong",
    weather: "Rain",
  },
  {
    id: "ROUTE116",
    file: "ROUTE116-Sunny-MapSong-SweetScentLand.txt",
    map: 10,
    song: "ROUTE104",
    loop: 2260.25,
    mode: "sweet_scent",
  },
  {
    id: "MT_PYRE_EXTERIOR",
    file: "MT_PYRE_EXTERIOR-Sunny-MapSong-SweetScentLand.txt",
    map: 43,
    song: "MT_PYRE_EXTERIOR",
    loop: (2496 * 150) / 102,
    mode: "sweet_scent",
  },
  {
    id: "METEOR_FALLS_B1F_2R_FISHING_SUNNY",
    file: "METEOR_FALLS_B1F_2R-Sunny-MapSong-SuperRod.txt",
    map: 25,
    song: "CAVE_OF_ORIGIN",
    loop: (1728 * 150) / 100,
    mode: "fishing",
    audio: "CAVE_OF_ORIGIN_FISHING_SUNNY_AUDIO",
  },
  {
    id: "SAFARI_ZONE_NORTHWEST_SURF_FISHING_SUNNY",
    file: "SAFARI_ZONE_NORTHWEST-Sunny-SurfSong-SuperRod.txt",
    map: 74,
    song: "SAFARI_ZONE",
    loop: (2304 * 150) / 82,
    mode: "fishing",
    audio: "SURF_FISHING_SUNNY_AUDIO",
    playing_song: "SurfSong",
  },
  {
    id: "ROUTE129_SURF_SUNNY",
    file: "ROUTE129-Sunny-SurfSong-SweetScentWater.txt",
    map: 50,
    song: "ROUTE119",
    loop: (2304 * 150) / 82,
    mode: "sweet_scent",
    audio: "SURF_SUNNY_AUDIO",
    playing_song: "SurfSong",
    action: "SweetScentWater",
  },
  {
    id: "ROUTE120",
    file: "ROUTE120-Sunny-MapSong-SweetScentLand.txt",
    map: 34,
    song: "ROUTE120",
    loop: (3072 * 150) / 134,
    mode: "sweet_scent",
    audio: "ROUTE120_SUNNY_AUDIO",
  },
  {
    id: "ROUTE123_SUNNY",
    file: "ROUTE123-Sunny-MapSong-SweetScentLand.txt",
    map: 37,
    song: "ROUTE122",
    loop: (2304 * 150) / 124,
    mode: "sweet_scent",
    audio: "ROUTE122_SUNNY_AUDIO",
  },
  {
    id: "ROUTE120_RAIN",
    file: "ROUTE120-Rain-MapSong-SweetScentLand.txt",
    map: 34,
    song: "ROUTE120",
    loop: (3072 * 150) / 134,
    mode: "sweet_scent",
    audio: "ROUTE120_RAIN_AUDIO",
    weather: "Rain",
  },
  {
    id: "DEWFORD_FISHING_SUNNY",
    file: "DEWFORD_TOWN-Sunny-MapSong-SuperRod.txt",
    map: 85,
    song: "DEWFORD",
    loop: (2496 * 150) / 94,
    mode: "fishing",
    audio: "DEWFORD_FISHING_SUNNY_AUDIO",
  },
];

type CaptureMetadata = {
  source: string;
  song_loop_frames: number;
  sampled_frames?: number;
};
type Capture = Source & {
  rows: Observation[];
  metadata: CaptureMetadata;
};

export function parseLog(
  text: string,
  mode: CaptureMode = "sweet_scent",
): Observation[] {
  const endpoint =
    mode === "fishing" ? "FishingWildEncounter" : "SweetScentWildEncounter";
  const target =
    mode === "fishing" ? "FishingWildEncounter" : "TrySweetScentEncounter";
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
      const fields = Object.fromEntries(
        [...line.matchAll(/(\w+)=([^ ]+)/g)].map((m) => [m[1], m[2]]),
      );
      const run = Number(fields.run);
      if (runs.has(run)) throw new Error("Repeated run: " + run);
      runs.add(run);
      if (fields.mode !== mode || fields.endpoint !== endpoint) {
        throw new Error("Expected completed " + mode + " capture");
      }

      const event = events.get(run);
      const start = event?.get("m4aSoundMain");
      const end = event?.get("TryReceiveLinkBattleData");
      const total = Number(fields.target_offset);
      const frame = Number(fields.frame);
      if (
        start == null ||
        end == null ||
        event?.get(target) !== total ||
        !Number.isSafeInteger(start) ||
        !Number.isSafeInteger(end) ||
        !Number.isSafeInteger(frame) ||
        !Number.isSafeInteger(total) ||
        end < start ||
        total < end - start
      ) {
        throw new Error("Invalid or incomplete capture: " + run);
      }
      observations.push({
        frame,
        audio: end - start,
        nonAudio: total - (end - start),
        total,
      });
      events.delete(run);
    }
  }
  if (!observations.length) throw new Error("No completed attempts");
  return observations;
}

export function selectLoopFrames(
  rows: Observation[],
  loopFrames: number,
): Observation[] {
  if (!Number.isFinite(loopFrames) || loopFrames <= 0) {
    throw new Error("Expected positive finite song loop duration");
  }

  const selected = new Map<number, Observation>();
  const limit = Math.ceil(loopFrames);
  for (const row of rows) {
    if (!selected.has(row.frame)) {
      selected.set(row.frame, row);
    }

    if (selected.size === limit) {
      break;
    }
  }

  return [...selected.values()];
}

const audioId = (source: Source): string => {
  return source.audio ?? source.song + "_AUDIO";
};

export function weightedFrames(
  rows: Observation[],
  key: "audio" | "nonAudio" | "total",
): Weighted[] {
  const counts = new Map<number, number>();
  for (const r of rows) counts.set(r.frame, (counts.get(r.frame) ?? 0) + 1);
  // Each frame has unit total weight, including when its non-audio costs differ across replays.
  return rows.map((r) => ({ value: r[key], weight: 1 / counts.get(r.frame)! }));
}

function empirical(values: Weighted[]): Knot[] {
  const groups = new Map<number, number>();
  for (const { value, weight } of values)
    groups.set(value, (groups.get(value) ?? 0) + weight);
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

export function fit(
  values: Weighted[],
  limit = tolerance,
): { knots: Knot[]; error: number } {
  if (
    !values.length ||
    values.some(
      (v) =>
        !Number.isSafeInteger(v.value) ||
        v.value < 0 ||
        !Number.isFinite(v.weight) ||
        v.weight <= 0,
    )
  ) {
    throw new Error(
      "Expected finite nonnegative integer cycles with positive weights",
    );
  }
  const points = empirical(values);
  const chosen = new Set([0, points.length - 1]);
  // Start with quantiles, then split at the largest error against both sides of every jump.
  for (let q = 1; q < 8; q++) {
    chosen.add(points.findIndex((v) => v.p >= q / 8));
  }
  while (true) {
    let error = -1;
    let worst = -1;
    const indices = [...chosen].sort((a, b) => a - b);
    for (let j = 1; j < indices.length; j++) {
      const lo = indices[j - 1],
        hi = indices[j];
      const a = points[lo],
        b = points[hi];
      for (let i = lo + 1; i < hi; i++) {
        const p =
          a.x === b.x
            ? a.p
            : a.p + ((b.p - a.p) * (points[i].x - a.x)) / (b.x - a.x);
        const e = Math.abs(points[i].p - p);
        if (e > error) {
          error = e;
          worst = i;
        }
      }
    }
    if (error <= limit || worst < 0) {
      const knots = indices.map((i) => ({ ...points[i] }));
      for (let i = 1; i < knots.length; i++) {
        knots[i].area =
          knots[i - 1].area +
          ((knots[i].x - knots[i - 1].x) * (knots[i].p + knots[i - 1].p)) / 2;
      }
      return { knots, error: Math.max(error, 0) };
    }
    if (chosen.size >= maxKnots)
      throw new Error("CDF knot budget cannot meet error tolerance");
    chosen.add(worst);
  }
}

export function less(knots: Knot[], x: number): number {
  let lo = 0,
    hi = knots.length;
  while (lo < hi) {
    const m = (lo + hi) >>> 1;
    if (knots[m].x < x) lo = m + 1;
    else hi = m;
  }
  if (!lo) return 0;
  if (lo === knots.length) return 1;
  const a = knots[lo - 1],
    b = knots[lo];
  if (x === b.x) return b.p;
  return a.p + ((b.p - a.p) * (x - a.x)) / (b.x - a.x);
}

function primitive(knots: Knot[], x: number): number {
  let lo = 0,
    hi = knots.length;
  while (lo < hi) {
    const m = (lo + hi) >>> 1;
    if (knots[m].x <= x) lo = m + 1;
    else hi = m;
  }
  if (!lo) return 0;
  const a = knots[lo - 1],
    w = x - a.x;
  if (lo === knots.length) return a.area + w;
  const b = knots[lo];
  return a.area + w * a.p + (0.5 * w * w * (b.p - a.p)) / (b.x - a.x);
}

export function convolution(audio: Knot[], non: Knot[], x: number): number {
  let result = 0;
  for (let i = 1; i < non.length; i++) {
    const a = non[i - 1],
      b = non[i],
      mass = b.p - a.p;
    if (mass <= 0) continue;
    result +=
      a.x === b.x
        ? mass * less(audio, x - a.x)
        : (mass / (b.x - a.x)) *
          (primitive(audio, x - a.x) - primitive(audio, x - b.x));
  }
  return Math.max(0, Math.min(1, result));
}

function summary(values: Weighted[]) {
  const points = empirical(values);
  return {
    min: points[0].x,
    median: points.find((p) => p.p >= 0.5)!.x,
    max: points.at(-1)!.x,
  };
}

function comparison(knots: Knot[], values: Weighted[]) {
  return Math.max(
    ...empirical(values).map((p, i, all) =>
      Math.abs((i % 2 ? less(knots, p.x + 1e-7) : less(knots, p.x)) - p.p),
    ),
  );
}

function componentSetup(source: Source) {
  const map =
    emerald_wild_encounters.wild_encounter_groups[0].encounters[source.map];
  if (map == null) {
    throw new Error(`Unknown capture map: ${source.map}`);
  }

  return {
    mapId: map.map,
    weather: source.weather ?? "Sunny",
    playingSong: source.playing_song ?? "MapSong",
    action:
      source.mode === "fishing"
        ? "SuperRod"
        : (source.action ?? "SweetScentLand"),
  } satisfies Pick<
    CalibrationComponentEntry,
    "mapId" | "weather" | "playingSong" | "action"
  >;
}

function fakeComponentSetup(id: string) {
  const weather = id.includes("_THUNDERSTORM_")
    ? "Thunderstorm"
    : id.includes("_RAIN_")
      ? "Rain"
      : "Sunny";
  const fishing = id.includes("_FISHING_");
  const playingSong = id.startsWith("SURF_")
    ? "SurfSong"
    : id.startsWith("CYCLING_")
      ? "BikeSong"
      : "MapSong";
  const song =
    playingSong === "MapSong"
      ? id.replace(/_(FISHING_)?(SUNNY|RAIN|THUNDERSTORM)_AUDIO$/, "")
      : "ROUTE119";
  const action = fishing
    ? "SuperRod"
    : playingSong === "SurfSong"
      ? "SweetScentWater"
      : "SweetScentLand";
  const map = Object.entries(mapCalibrationSettings).find(
    ([, settings]) =>
      settings?.song === song &&
      (fishing
        ? settings.weathers_fishing
        : action === "SweetScentWater"
          ? settings.weathers_sweet_scent_water
          : settings.weathers_sweet_scent_land
      ).includes(weather),
  );
  if (map == null) {
    throw new Error(`No representative map for synthetic component: ${id}`);
  }

  return { mapId: map[0], weather, playingSong, action } satisfies Pick<
    CalibrationComponentEntry,
    "mapId" | "weather" | "playingSong" | "action"
  >;
}

export async function extract(check = false) {
  const captures: Capture[] = [];
  for (const source of sources) {
    const text = await readFile(
      new URL("vblank_calibration.local.data/" + source.file, root),
      "utf8",
    );
    const observations = parseLog(text, source.mode);
    const rows =
      source.mode != null
        ? selectLoopFrames(observations, source.loop)
        : observations;
    captures.push({
      ...source,
      rows,
      metadata: {
        source: source.file,
        song_loop_frames: source.loop,
        ...(source.mode != null ? { sampled_frames: rows.length } : {}),
      },
    });
  }
  const models = new Map<string, ReturnType<typeof fit>>();
  const components: Record<string, CalibrationComponentEntry> = {};
  const mapSources: MapCalibrationSource[] = [];
  const diagnostics: Array<
    { component: string; knots: number; max_cdf_error: number } & Record<
      string,
      unknown
    >
  > = [];
  const emitComponent = (
    id: string,
    values: Weighted[],
    result: ReturnType<typeof fit>,
    m: CaptureMetadata,
    capture: Source,
    isAudio: boolean,
  ) => {
    const s = summary(values);
    components[id] = {
      id,
      ...componentSetup(capture),
      isAudio,
      is_fake: false,
      summary: { min: s.min, mid: s.median, max: s.max },
      cdf: result.knots.map((knot) => [knot.x, knot.p, knot.area]),
      provenance: {
        ...m,
        max_cdf_error: result.error,
      },
    };
    diagnostics.push({
      component: id,
      ...m,
      knots: result.knots.length,
      max_cdf_error: result.error,
      support: s,
    });
  };
  for (const capture of captures) {
    for (const key of ["audio", "nonAudio"] as const) {
      // The first capture for a song supplies its shared audio model.
      if (
        key === "audio" &&
        captures.find((c) => audioId(c) === audioId(capture))!.id !== capture.id
      )
        continue;
      const values = weightedFrames(capture.rows, key);
      const result = fit(values);
      const id = key === "audio" ? audioId(capture) : capture.id + "_NON_AUDIO";
      models.set(id, result);
      emitComponent(
        id,
        values,
        result,
        capture.metadata,
        capture,
        key === "audio",
      );
    }
  }
  const validation = [];
  for (const capture of captures) {
    const audio = models.get(audioId(capture))!.knots;
    const non = models.get(capture.id + "_NON_AUDIO")!.knots;
    const totals = empirical(weightedFrames(capture.rows, "total"));
    let error = 0;
    for (let i = 0; i < totals.length; i++) {
      const p = totals[i];
      const threshold = p.x + (i % 2 ? 1e-7 : 0);
      error = Math.max(
        error,
        Math.abs(convolution(audio, non, threshold) - p.p),
      );
    }
    // Validate representative interval widths, including narrow method windows.
    let intervalError = 0;
    const totalValues = weightedFrames(capture.rows, "total");
    const totalWeight = totalValues.reduce((s, v) => s + v.weight, 0);
    for (const width of [32, 256, 1024, 8192]) {
      for (let start = totals[0].x; start <= totals.at(-1)!.x; start += 256) {
        const measured =
          totalValues
            .filter((v) => v.value >= start && v.value < start + width)
            .reduce((s, v) => s + v.weight, 0) / totalWeight;
        const estimated =
          convolution(audio, non, start + width) -
          convolution(audio, non, start);
        intervalError = Math.max(intervalError, Math.abs(estimated - measured));
      }
    }
    const audioError = comparison(audio, weightedFrames(capture.rows, "audio"));
    // Sharing Route 101 audio with Routes 102/103 is a cross-map holdout, not an independent temporal loop.
    if (audioError > 0.02)
      throw new Error("Shared audio validation failed for " + capture.id);
    const independentCdfError = error;
    const independentIntervalError = intervalError;
    const joint =
      error > 0.02 || intervalError > 0.025 ? fit(totalValues) : null;
    const totalCdf = (x: number) =>
      joint ? less(joint.knots, x) : convolution(audio, non, x);
    if (joint) {
      emitComponent(
        capture.id + "_JOINT",
        totalValues,
        joint,
        capture.metadata,
        capture,
        false,
      );
      error = comparison(joint.knots, totalValues);
      intervalError = 0;
      for (const width of [32, 256, 1024, 8192]) {
        for (let start = totals[0].x; start <= totals.at(-1)!.x; start += 256) {
          const measured =
            totalValues
              .filter((v) => v.value >= start && v.value < start + width)
              .reduce((s, v) => s + v.weight, 0) / totalWeight;
          intervalError = Math.max(
            intervalError,
            Math.abs(totalCdf(start + width) - totalCdf(start) - measured),
          );
        }
      }
      if (error > 0.02 || intervalError > 0.025)
        throw new Error("Joint correction validation failed for " + capture.id);
    }
    mapSources.push({
      map_internal_idx: capture.map,
      song: capture.song,
      non_audio: capture.id + "_NON_AUDIO",
      joint_correction: joint ? capture.id + "_JOINT" : null,
      ...(capture.mode === "fishing" ? { mode: capture.mode } : {}),
      ...(capture.playing_song != null
        ? { playing_song: capture.playing_song }
        : {}),
      ...(capture.weather != null ? { weather: capture.weather } : {}),
      ...(capture.action != null ? { action: capture.action } : {}),
    });
    let lo = audio[0].x + non[0].x;
    let hi = audio.at(-1)!.x + non.at(-1)!.x;
    for (let i = 0; i < 48; i++) {
      const mid = (lo + hi) / 2;
      if (totalCdf(mid) < 0.5) lo = mid;
      else hi = mid;
    }
    const median = Math.ceil(hi - 1e-7);
    const quantiles = [0.01, 0.05, 0.25, 0.5, 0.75, 0.95, 0.99].map((p) => {
      let low = totals[0].x,
        high = totals.at(-1)!.x;
      for (let i = 0; i < 48; i++) {
        const mid = (low + high) / 2;
        if (totalCdf(mid) < p) low = mid;
        else high = mid;
      }
      return {
        p,
        empirical_cycles: totals.find((t) => t.p >= p)!.x,
        estimated_cycles: Math.ceil(high - 1e-7),
      };
    });
    validation.push({
      map: capture.id,
      combined_median: median,
      quantiles,
      audio_source: audioId(capture),
      sampled_frames: capture.rows.length,
      audio_cdf_error: audioError,
      joint_cdf_error: error,
      max_interval_probability_error: intervalError,
      independent_joint_cdf_error: independentCdfError,
      independent_interval_probability_error: independentIntervalError,
      model: joint ? "joint_cdf_correction" : "independent_convolution",
      validation_kind:
        captures.find((c) => audioId(c) === audioId(capture))!.id === capture.id
          ? "in_sample_joint"
          : "cross_map_audio_holdout",
    });
  }
  const route101 = components.ROUTE101_AUDIO;
  for (const [id, component] of Object.entries(fakeAudioComponents(route101))) {
    if (components[id] == null) {
      components[id] = {
        id,
        ...fakeComponentSetup(id),
        isAudio: true,
        ...component,
      };
    }
  }

  const outputRoot = new URL(
    "../../src/rngToolsUi/gen3/wild/data/",
    import.meta.url,
  );
  const code = await format(
    "// Generated by bun run rng_tools/scripts/extract-vblank-calibration.ts. Do not edit.\n" +
      'import type { CalibrationComponentEntry, MapCalibrationSource } from "./initial_cycle_calibration_types";\n' +
      "export const calibrationComponents: CalibrationComponentEntry[] = " +
      JSON.stringify(Object.values(components)) +
      ";\n" +
      "export const mapCalibrationSources: MapCalibrationSource[] = " +
      JSON.stringify(mapSources) +
      ";\n",
    {
      ...(await resolveConfig(
        new URL("initial_cycle_calibration_data.ts", outputRoot).pathname,
      )),
      parser: "typescript",
    },
  );
  const name = "initial_cycle_calibration_data.ts";
  const url = new URL(name, outputRoot);
  if (check) {
    if ((await readFile(url, "utf8")) !== code)
      throw new Error("Outdated calibration artifact: " + name);
  } else {
    const temporary = new URL(name + ".tmp", outputRoot);
    await writeFile(temporary, code);
    await rename(temporary, url);
  }

  console.log(
    JSON.stringify(
      {
        components: diagnostics.map((v) => ({
          id: v.component,
          knots: v.knots,
          error: v.max_cdf_error,
        })),
        validation,
      },
      null,
      2,
    ),
  );
}

if (import.meta.main) {
  if (process.argv.slice(2).some((arg) => arg !== "--check"))
    throw new Error("Usage: extract-vblank-calibration.ts [--check]");
  await extract(process.argv.includes("--check"));
}
