import { expect, test } from "bun:test";
import type { PlayingSong } from "~/rngTools";
import {
  adjustNonAudioComponent,
  getInitialCycleInfo,
  selectCalibrationComponent,
} from "./initial_cycle_calibration";
import { calibrationComponents } from "./initial_cycle_calibration_data";
import type { CalibrationComponentEntry } from "./initial_cycle_calibration_types";
import {
  combineCalibrationComponents,
  getInitialCycleSummary,
} from "./initial_cycle_utils";

const input = {
  mapId: "MAP_ROUTE101",
  weather: "Sunny",
  playingSong: "MapSong",
  action: "SweetScentLand",
} as const;

const dataset = (
  id: string,
  overrides: Partial<CalibrationComponentEntry> = {},
): CalibrationComponentEntry => {
  return {
    ...input,
    id,
    isAudio: true,
    is_fake: false,
    summary: { min: 100, mid: 150, max: 200 },
    cdf: [
      [100, 0, 0],
      [200, 1, 50],
    ],
    provenance: { source: "test" },
    ...overrides,
  };
};

test("exact matches win for audio and non-audio after normalizing rods", () => {
  const request = { ...input, action: "OldRod" } as const;
  for (const isAudio of [true, false]) {
    const exact = dataset("exact", { isAudio, action: "SuperRod" });
    const candidates = [
      dataset("other", { isAudio, mapId: "MAP_ROUTE102", action: "GoodRod" }),
      exact,
    ];
    expect(selectCalibrationComponent(candidates, request, isAudio)).toEqual(
      exact,
    );
    expect(
      selectCalibrationComponent(
        candidates,
        { ...request, action: "GoodRod" },
        isAudio,
      ),
    ).toEqual(exact);
  }
});

test.each([
  {
    name: "action before song and weather",
    winner: { mapId: "MAP_ROUTE110", weather: "Rain", playingSong: "BikeSong" },
    loser: { mapId: "MAP_ROUTE102", action: "SuperRod" },
  },
  {
    name: "equivalent map song before weather",
    winner: { mapId: "MAP_ROUTE102", weather: "Rain" },
    loser: { mapId: "MAP_ROUTE110" },
  },
  {
    name: "weather before underlying map song",
    winner: { mapId: "MAP_ROUTE110", playingSong: "BikeSong" },
    loser: { mapId: "MAP_ROUTE102", playingSong: "BikeSong", weather: "Rain" },
  },
  {
    name: "underlying map song breaks audio ties",
    winner: { mapId: "MAP_ROUTE102", playingSong: "BikeSong" },
    loser: { mapId: "MAP_ROUTE110", playingSong: "BikeSong" },
  },
] satisfies {
  name: string;
  winner: Partial<CalibrationComponentEntry>;
  loser: Partial<CalibrationComponentEntry>;
}[])("audio ranks $name", ({ winner, loser }) => {
  const expected = dataset("winner", winner);
  expect(
    selectCalibrationComponent(
      [dataset("loser", loser), expected],
      input,
      true,
    ),
  ).toEqual(expected);
});

test.each([
  {
    name: "action before map",
    winner: { mapId: "MAP_ROUTE110", playingSong: "BikeSong", weather: "Rain" },
    loser: { action: "SuperRod" },
  },
  {
    name: "map before underlying song and movement",
    winner: { playingSong: "BikeSong", weather: "Rain" },
    loser: { mapId: "MAP_ROUTE102" },
  },
  {
    name: "underlying song before movement and weather",
    winner: { mapId: "MAP_ROUTE102", playingSong: "BikeSong", weather: "Rain" },
    loser: { mapId: "MAP_ROUTE110" },
  },
  {
    name: "movement before weather",
    winner: { mapId: "MAP_ROUTE102", weather: "Rain" },
    loser: { mapId: "MAP_ROUTE103", playingSong: "BikeSong" },
  },
  {
    name: "weather breaks non-audio ties",
    winner: { mapId: "MAP_ROUTE102" },
    loser: { mapId: "MAP_ROUTE103", weather: "Rain" },
  },
] satisfies {
  name: string;
  winner: Partial<CalibrationComponentEntry>;
  loser: Partial<CalibrationComponentEntry>;
}[])("non-audio ranks $name", ({ winner, loser }) => {
  const expected = dataset("winner", { ...winner, isAudio: false });
  expect(
    selectCalibrationComponent(
      [dataset("loser", { ...loser, isAudio: false }), expected],
      input,
      false,
    ),
  ).toEqual(expected);
});

test.each(["BikeSong", "SurfSong", "DivingSong"] as const)(
  "%s matches across maps",
  (playingSong) => {
    const winner = dataset("winner", {
      mapId: "MAP_ROUTE110",
      playingSong,
      weather: "Rain",
    });
    expect(
      selectCalibrationComponent(
        [dataset("loser", { mapId: "MAP_ROUTE102" }), winner],
        { ...input, playingSong },
        true,
      ),
    ).toEqual(winner);
  },
);

test("unknown map settings do not imply equivalent map songs", () => {
  const first = dataset("first", { mapId: "MAP_ROUTE110", weather: "Rain" });
  const unknown = dataset("unknown", {
    mapId: "MAP_UNKNOWN_OTHER",
    weather: "Rain",
  });
  expect(
    selectCalibrationComponent(
      [first, unknown],
      { ...input, mapId: "MAP_UNKNOWN" },
      true,
    ),
  ).toEqual(first);
});

test("ties preserve order and joint or opposite-kind datasets are excluded", () => {
  const first = dataset("first", { isAudio: false, mapId: "MAP_ROUTE102" });
  const second = dataset("second", { isAudio: false, mapId: "MAP_ROUTE103" });
  expect(
    selectCalibrationComponent(
      [
        dataset("exact_JOINT", { isAudio: false }),
        dataset("audio"),
        first,
        second,
      ],
      input,
      false,
    ),
  ).toEqual(first);
  expect(() =>
    selectCalibrationComponent(
      [dataset("only_JOINT", { isAudio: false })],
      input,
      false,
    ),
  ).toThrow("No non-audio calibration data");
});

test.each([
  ["MapSong", "BikeSong", 1772, 1872, 1922, 1972],
  ["BikeSong", "MapSong", -1772, -1672, -1622, -1572],
  ["MapSong", "SurfSong", 5421, 5521, 5571, 5621],
  ["SurfSong", "MapSong", -5421, -5321, -5271, -5221],
  ["SurfSong", "BikeSong", 3649, 3749, 3799, 3849],
  ["BikeSong", "SurfSong", -3649, -3549, -3499, -3449],
] satisfies [PlayingSong, PlayingSong, number, number, number, number][])(
  "shifts %s to %s by %i",
  (playingSong, requested, adjustment, min, mid, max) => {
    const source = dataset("non", { playingSong, isAudio: false });
    const before = structuredClone(source);
    const result = adjustNonAudioComponent(source, {
      ...input,
      playingSong: requested,
    });
    expect(result).toEqual({
      adjustment,
      component: {
        ...source,
        summary: { min, mid, max },
        cdf: [
          [min, 0, 0],
          [max, 1, 50],
        ],
      },
    });
    expect(source).toEqual(before);
  },
);

test("adjustments require the same action and a matching map or map song", () => {
  const source = dataset("non", { isAudio: false });
  expect(
    adjustNonAudioComponent(source, {
      ...input,
      mapId: "MAP_ROUTE110",
      playingSong: "BikeSong",
    }),
  ).toEqual({ component: source, adjustment: 0 });
  expect(
    adjustNonAudioComponent(source, {
      ...input,
      action: "SuperRod",
      playingSong: "BikeSong",
    }),
  ).toEqual({ component: source, adjustment: 0 });
  expect(adjustNonAudioComponent(source, input)).toEqual({
    component: source,
    adjustment: 0,
  });
  expect(
    adjustNonAudioComponent(source, {
      ...input,
      mapId: "MAP_ROUTE102",
      playingSong: "BikeSong",
    }).adjustment,
  ).toBe(1772);
});

test("diving has no assumed movement adjustment", () => {
  const mapSong = dataset("map", { isAudio: false });
  const divingSong = dataset("diving", {
    isAudio: false,
    playingSong: "DivingSong",
  });
  expect(
    adjustNonAudioComponent(mapSong, { ...input, playingSong: "DivingSong" }),
  ).toEqual({ component: mapSong, adjustment: 0 });
  expect(adjustNonAudioComponent(divingSong, input)).toEqual({
    component: divingSong,
    adjustment: 0,
  });
});

test("real data selects independently and preserves rod equivalence", () => {
  const result = getInitialCycleInfo(
    "MAP_DEWFORD_TOWN",
    "Sunny",
    "BikeSong",
    "OldRod",
  );
  expect({
    audio: result.audio.id,
    nonAudio: result.nonAudio.id,
    adjustment: result.nonAudioAdjustment,
  }).toEqual({
    audio: "CYCLING_FISHING_SUNNY_AUDIO",
    nonAudio: "DEWFORD_FISHING_SUNNY_NON_AUDIO",
    adjustment: 1772,
  });
  expect(
    getInitialCycleInfo("MAP_DEWFORD_TOWN", "Sunny", "BikeSong", "GoodRod"),
  ).toEqual(result);
  expect(
    getInitialCycleInfo("MAP_DEWFORD_TOWN", "Sunny", "BikeSong", "SuperRod"),
  ).toEqual(result);
  expect(result.distribution).toEqual(
    combineCalibrationComponents(result.audio, result.nonAudio),
  );
  expect(result.summary).toEqual({
    min: 52222,
    max: 99963,
    median: 75940.65247427893,
    average: 74708.44150656847,
  });
  expect(
    calibrationComponents.find((entry) => entry.id === result.nonAudio.id)
      ?.summary,
  ).toEqual({
    min: 24965,
    mid: 24991,
    max: 35223,
  });
});

test("merging point masses preserves the exact jump and summary", () => {
  const audio = dataset("audio", {
    summary: { min: 100, mid: 100, max: 100 },
    cdf: [
      [100, 0, 0],
      [100, 1, 0],
    ],
  });
  const nonAudio = dataset("non", {
    isAudio: false,
    summary: { min: 200, mid: 200, max: 200 },
    cdf: [
      [200, 0, 0],
      [200, 1, 0],
    ],
  });
  const combined = combineCalibrationComponents(audio, nonAudio);
  expect(combined).toEqual([
    { cycle: 300, probability: 0 },
    { cycle: 300, probability: 1 },
  ]);
  expect(getInitialCycleSummary(combined)).toEqual({
    min: 300,
    max: 300,
    median: 300,
    average: 300,
  });
});
