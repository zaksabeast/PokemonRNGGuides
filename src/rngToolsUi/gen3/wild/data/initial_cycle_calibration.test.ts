import { expect, test } from "bun:test";
import { omit } from "lodash-es";
import type { Wild3MapGameData } from "~/rngTools";
import { calibrationComponents } from "./initial_cycle_calibration_data";
import {
  cdfLessThan,
  combineCalibrationComponents,
  getWild3CalibrationInfo,
  getWild3VblankDistributions,
  getInitialCycleSummary,
} from "./initial_cycle_calibration";
import { fakeAudioComponents } from "./fake_vblank_audio";
import { getWild3EmeraldGameData } from "./wild3GameData";
import type { CalibrationComponent } from "./initial_cycle_calibration_types";

const uniform: CalibrationComponent = {
  is_fake: false,
  summary: { min: 0, mid: 1, max: 2 },
  cdf: [
    [0, 0, 0],
    [2, 1, 1],
  ],
  provenance: { source: "test" },
};

test("initial cycle summaries handle uniform distributions, jumps, and empty data", () => {
  expect(
    getInitialCycleSummary([
      { cycle: 10, probability: 0 },
      { cycle: 30, probability: 1 },
    ]),
  ).toEqual({ min: 10, max: 30, median: 20, average: 20 });
  expect(
    getInitialCycleSummary([
      { cycle: 10, probability: 0 },
      { cycle: 10, probability: 0.25 },
      { cycle: 20, probability: 0.75 },
      { cycle: 40, probability: 1 },
    ]),
  ).toEqual({ min: 10, max: 40, median: 15, average: 17.5 });
  expect(
    getInitialCycleSummary([
      { cycle: 7, probability: 0 },
      { cycle: 7, probability: 1 },
    ]),
  ).toEqual({ min: 7, max: 7, median: 7, average: 7 });
  expect(getInitialCycleSummary([])).toBeNull();
});

test("constructed game maps carry serializable combined distributions", () => {
  const game = getWild3EmeraldGameData();
  const route101 = game.maps_data.find((map) => map.map_id === "MAP_ROUTE101");
  expect(
    route101?.vblank_distrs.map((setup) => omit(setup, "distribution")),
  ).toEqual([
    {
      action: "SweetScentLand",
      playing_song: "MapSong",
      weather: "Sunny",
      min: 34_686,
      max: 72_512,
    },
    {
      action: "SweetScentLand",
      playing_song: "BikeSong",
      weather: "Sunny",
      min: 0,
      max: 280_895,
    },
  ]);
  expect(JSON.parse(JSON.stringify(route101?.vblank_distrs))).toEqual(
    route101?.vblank_distrs,
  );
});

const map = (
  map_id: string,
  map_internal_idx: number,
): Pick<
  Wild3MapGameData,
  "map_id" | "map_internal_idx" | "slots_by_action"
> => {
  return {
    map_id,
    map_internal_idx,
    slots_by_action: Array.from({ length: 6 }, () => [
      { min_level: 1, max_level: 1, species_data: { species: "Bulbasaur" } },
    ]),
  };
};

test("combined CDF handles continuous costs and retains discrete jumps", () => {
  const combined = combineCalibrationComponents(uniform, uniform).map(
    (knot) => [knot.cycle, knot.probability, 0] as const,
  );
  expect(cdfLessThan(combined, 1)).toBeCloseTo(0.125, 10);
  expect(cdfLessThan(combined, 2)).toBeCloseTo(0.5, 10);
  const atom: CalibrationComponent = {
    ...uniform,
    summary: { min: 3, mid: 3, max: 3 },
    cdf: [
      [3, 0, 0],
      [3, 1, 0],
    ],
  };
  const atomDistribution = combineCalibrationComponents(atom, atom);
  expect(atomDistribution).toEqual([
    { cycle: 6, probability: 0 },
    { cycle: 6, probability: 1 },
  ]);
  expect(
    cdfLessThan(
      atomDistribution.map((knot) => [knot.cycle, knot.probability, 0]),
      6,
    ),
  ).toBe(0);
  expect(
    cdfLessThan(
      atomDistribution.map((knot) => [knot.cycle, knot.probability, 0]),
      7,
    ),
  ).toBe(1);
});

test("measured maps retain bounds and raw provenance without sending metadata to Rust", () => {
  const info = getWild3CalibrationInfo(map("MAP_ROUTE101", 0))[0];
  const { distribution, ...parameters } = info.calibration;
  expect(parameters).toEqual({
    action: "SweetScentLand",
    playing_song: "MapSong",
    weather: "Sunny",
    min: 34_686,
    max: 72_512,
  });
  expect(info.fallback).toBe(false);
  expect(info.audio.is_fake).toBe(false);
  expect(info.audio.provenance.source).toBe("route101_walk_sweet_scent.txt");
  expect(
    cdfLessThan(
      distribution.map((knot) => [knot.cycle, knot.probability, 0]),
      34_686,
    ),
  ).toBe(0);
  expect(
    cdfLessThan(
      distribution.map((knot) => [knot.cycle, knot.probability, 0]),
      72_513,
    ),
  ).toBe(1);
  expect(Object.keys(info.calibration).sort()).toEqual([
    "action",
    "distribution",
    "max",
    "min",
    "playing_song",
    "weather",
  ]);
});

test("joint correction replaces convolution only for its measured setup", () => {
  const info = getWild3CalibrationInfo(map("MAP_PETALBURG_WOODS", 14))[0];
  expect(info.joint_correction).toBe(
    calibrationComponents.PETALBURG_WOODS_JOINT,
  );
  expect(info.calibration.distribution).toEqual(
    calibrationComponents.PETALBURG_WOODS_JOINT.cdf.map(
      ([cycle, probability]) => ({ cycle, probability }),
    ),
  );
});

test("fallback and synthetic setups retain conservative filtering bounds", () => {
  const { distribution, ...fallback } = getWild3VblankDistributions(
    map("MAP_UNKNOWN", 999),
  )[0];
  expect(fallback).toEqual({
    action: "SweetScentLand",
    playing_song: "MapSong",
    weather: "Sunny",
    min: 0,
    max: 280_895,
  });
  expect(distribution[0].probability).toBe(0);
  const info = getWild3CalibrationInfo(map("MAP_ROUTE101", 0)).find(
    (info) => info.calibration.playing_song === "BikeSong",
  );
  expect(info?.audio.is_fake).toBe(true);
  expect(info?.fallback).toBe(true);
  expect([info?.calibration.min, info?.calibration.max]).toEqual([0, 280_895]);
});

test("weather and playing song variants respect the map and encounter action", () => {
  const weather = (id: string, index: number, action: string) => [
    ...new Set(
      getWild3VblankDistributions(map(id, index))
        .filter((calibration) => calibration.action === action)
        .map((calibration) => calibration.weather),
    ),
  ];
  expect(weather("MAP_ROUTE119", 12, "OldRod")).toEqual([
    "Sunny",
    "Rain",
    "Thunderstorm",
  ]);
  expect(weather("MAP_ROUTE123", 17, "OldRod")).toEqual(["Sunny", "Rain"]);
  expect(weather("MAP_ROUTE120", 13, "SweetScentLand")).toEqual([
    "Sunny",
    "Rain",
  ]);
  expect(weather("MAP_ROUTE120", 13, "OldRod")).toEqual(["Sunny"]);
  expect(
    getWild3VblankDistributions(map("MAP_ROUTE119", 12))
      .filter((calibration) => calibration.action === "SweetScentWater")
      .map((calibration) => calibration.playing_song),
  ).toEqual(["SurfSong", "SurfSong", "SurfSong"]);
  expect(
    getWild3VblankDistributions({
      ...map("MAP_ROUTE101", 0),
      slots_by_action: [],
    }),
  ).toEqual([]);
});

test("fake audio retains scales and excluded thunderstorm variants stay absent", () => {
  const components = fakeAudioComponents(calibrationComponents.ROUTE101_AUDIO);
  expect(components.CYCLING_FISHING_SUNNY_AUDIO.summary).toEqual({
    min: 20_370,
    mid: 40_038,
    max: 51_865,
  });
  expect(components.CYCLING_FISHING_RAIN_AUDIO.summary).toEqual({
    min: 22_407,
    mid: 44_041,
    max: 57_052,
  });
  expect(components.CYCLING_FISHING_THUNDERSTORM_AUDIO).toBeUndefined();
  expect(components.ROUTE122_THUNDERSTORM_AUDIO).toBeUndefined();
  expect(components.ROUTE122_FISHING_THUNDERSTORM_AUDIO).toBeUndefined();
  expect(
    Object.values(components).every((component) => component.is_fake),
  ).toBe(true);
});

test("Lilycove fishing uses measured audio and non-audio for map music", () => {
  const fishing = getWild3CalibrationInfo(map("MAP_LILYCOVE_CITY", 84)).filter(
    ({ calibration }) =>
      ["OldRod", "GoodRod", "SuperRod"].includes(calibration.action) &&
      calibration.playing_song === "MapSong",
  );

  expect(
    fishing.map(
      ({ calibration, audio, non_audio, fallback, joint_correction }) => ({
        ...omit(calibration, "distribution"),
        audio: { is_fake: audio.is_fake, summary: audio.summary },
        non_audio: { is_fake: non_audio.is_fake, summary: non_audio.summary },
        fallback,
        joint_correction,
      }),
    ),
  ).toEqual([
    {
      action: "OldRod",
      playing_song: "MapSong",
      weather: "Sunny",
      min: 49354,
      max: 93327,
      audio: {
        is_fake: false,
        summary: { min: 23825, mid: 46302, max: 61463 },
      },
      non_audio: {
        is_fake: false,
        summary: { min: 25529, mid: 25562, max: 31864 },
      },
      fallback: false,
      joint_correction: null,
    },
    {
      action: "GoodRod",
      playing_song: "MapSong",
      weather: "Sunny",
      min: 49354,
      max: 93327,
      audio: {
        is_fake: false,
        summary: { min: 23825, mid: 46302, max: 61463 },
      },
      non_audio: {
        is_fake: false,
        summary: { min: 25529, mid: 25562, max: 31864 },
      },
      fallback: false,
      joint_correction: null,
    },
    {
      action: "SuperRod",
      playing_song: "MapSong",
      weather: "Sunny",
      min: 49354,
      max: 93327,
      audio: {
        is_fake: false,
        summary: { min: 23825, mid: 46302, max: 61463 },
      },
      non_audio: {
        is_fake: false,
        summary: { min: 25529, mid: 25562, max: 31864 },
      },
      fallback: false,
      joint_correction: null,
    },
  ]);
});

test("fishing non-audio does not replace land or water timing", () => {
  const info = getWild3CalibrationInfo(map("MAP_LILYCOVE_CITY", 84)).filter(
    ({ calibration }) =>
      calibration.action === "SweetScentLand" ||
      calibration.action === "SweetScentWater",
  );

  expect(
    info.map(({ calibration, non_audio, fallback }) => ({
      ...omit(calibration, "distribution"),
      non_audio: non_audio.provenance.source,
      fallback,
    })),
  ).toEqual([
    {
      action: "SweetScentLand",
      playing_song: "MapSong",
      weather: "Sunny",
      min: 0,
      max: 280895,
      non_audio: "route101_walk_sweet_scent.txt",
      fallback: true,
    },
    {
      action: "SweetScentLand",
      playing_song: "BikeSong",
      weather: "Sunny",
      min: 0,
      max: 280895,
      non_audio: "route101_walk_sweet_scent.txt",
      fallback: true,
    },
    {
      action: "SweetScentWater",
      playing_song: "SurfSong",
      weather: "Sunny",
      min: 0,
      max: 280895,
      non_audio: "route101_walk_sweet_scent.txt",
      fallback: true,
    },
  ]);
});
