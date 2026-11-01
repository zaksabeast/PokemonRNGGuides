import { expect, test } from "bun:test";
import type { Wild3PlayingSong } from "~/rngTools";
import {
  adjustNonAudioComponent,
  haveSamePlayingSong,
  getInitialCycleInfo,
  selectInitialCycleDataset,
} from "./initial_cycle_info";
import {
  calibrationComponents,
  type InitialCycleDataset,
} from "./initial_cycle_dataset";
import { combineCalibrationComponents } from "./cdf";
import { getInitialCycleSummary } from "../initial_cycle_main";

const input = {
  mapId: "MAP_ROUTE101",
  weather: "Sunny",
  playingSong: "MapSong",
  action: "SweetScentLand",
} as const;

const dataset = (
  id: string,
  overrides: Partial<InitialCycleDataset> = {},
): InitialCycleDataset => {
  return {
    ...input,
    id,
    isAudio: true,
    summary: { min: 100, mid: 150, max: 200 },
    cdf: [
      [100, 0, 0],
      [200, 1, 50],
    ],
    metaData: { source: "test", songLoopFrames: 1, maxCdfError: 0 },
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
    expect(selectInitialCycleDataset(candidates, request, isAudio)).toEqual(
      exact,
    );
    expect(
      selectInitialCycleDataset(
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
  winner: Partial<InitialCycleDataset>;
  loser: Partial<InitialCycleDataset>;
}[])("audio ranks $name", ({ winner, loser }) => {
  const expected = dataset("winner", winner);
  expect(
    selectInitialCycleDataset([dataset("loser", loser), expected], input, true),
  ).toEqual(expected);
});

test.each([
  {
    name: "action before map",
    winner: { mapId: "MAP_ROUTE110", playingSong: "BikeSong", weather: "Rain" },
    loser: { action: "SuperRod" },
    adjusted: {
      summary: { min: -1672, mid: -1622, max: -1572 },
      cdf: [
        [-1672, 0, 0],
        [-1572, 1, 50],
      ],
    },
  },
  {
    name: "map before underlying song and movement",
    winner: { playingSong: "BikeSong", weather: "Rain" },
    loser: { mapId: "MAP_ROUTE102" },
    adjusted: {
      summary: { min: -1672, mid: -1622, max: -1572 },
      cdf: [
        [-1672, 0, 0],
        [-1572, 1, 50],
      ],
    },
  },
  {
    name: "underlying song before playing song",
    winner: { mapId: "MAP_ROUTE102", playingSong: "BikeSong" },
    loser: { mapId: "MAP_ROUTE110" },
    adjusted: {
      summary: { min: -1672, mid: -1622, max: -1572 },
      cdf: [
        [-1672, 0, 0],
        [-1572, 1, 50],
      ],
    },
  },
  {
    name: "playing song breaks non-audio ties",
    winner: { mapId: "MAP_ROUTE102", weather: "Rain" },
    loser: { mapId: "MAP_ROUTE103", playingSong: "BikeSong", weather: "Rain" },
    adjusted: {},
  },
  {
    name: "weather before underlying song and playing song",
    winner: { mapId: "MAP_ROUTE110", playingSong: "BikeSong" },
    loser: { mapId: "MAP_ROUTE102", weather: "Rain" },
    adjusted: {
      summary: { min: -1672, mid: -1622, max: -1572 },
      cdf: [
        [-1672, 0, 0],
        [-1572, 1, 50],
      ],
    },
  },
] satisfies {
  name: string;
  winner: Partial<InitialCycleDataset>;
  loser: Partial<InitialCycleDataset>;
  adjusted: Partial<InitialCycleDataset>;
}[])("non-audio ranks $name", ({ winner, loser, adjusted }) => {
  const expected = dataset("winner", { ...winner, isAudio: false });
  expect(
    selectInitialCycleDataset(
      [dataset("loser", { ...loser, isAudio: false }), expected],
      input,
      false,
    ),
  ).toEqual({ ...expected, ...adjusted });
});

test.each(["BikeSong", "SurfSong"] as const)(
  "%s matches across maps",
  (playingSong) => {
    const winner = dataset("winner", {
      mapId: "MAP_ROUTE110",
      playingSong,
      weather: "Rain",
    });
    expect(
      selectInitialCycleDataset(
        [dataset("loser", { mapId: "MAP_ROUTE102" }), winner],
        { ...input, playingSong },
        true,
      ),
    ).toEqual(winner);
  },
);

test.each([
  ["MapSong", "MapSong", true],
  ["MapSong", "BikeSong", false],
  ["BikeSong", "MapSong", false],
  ["MapSong", "SurfSong", false],
  ["SurfSong", "MapSong", false],
  ["BikeSong", "SurfSong", false],
  ["SurfSong", "BikeSong", false],
] satisfies [Wild3PlayingSong, Wild3PlayingSong, boolean][])(
  "%s versus %s on maps with equivalent music",
  (leftSong, rightSong, expected) => {
    expect(
      haveSamePlayingSong(
        { ...input, playingSong: leftSong },
        { ...input, mapId: "MAP_ROUTE102", playingSong: rightSong },
      ),
    ).toBe(expected);
  },
);

test("unknown map settings use the default map song", () => {
  const first = dataset("first", { mapId: "MAP_ROUTE110", weather: "Rain" });
  const unknown = dataset("unknown", {
    mapId: "MAP_UNKNOWN_OTHER",
    weather: "Rain",
  });
  expect(
    selectInitialCycleDataset(
      [first, unknown],
      { ...input, mapId: "MAP_UNKNOWN" },
      true,
    ),
  ).toEqual(unknown);
});

test("ties preserve order and opposite-kind datasets are excluded", () => {
  const first = dataset("first", { isAudio: false, mapId: "MAP_ROUTE102" });
  const second = dataset("second", { isAudio: false, mapId: "MAP_ROUTE103" });
  expect(
    selectInitialCycleDataset([dataset("audio"), first, second], input, false),
  ).toEqual(first);
});

test("missing calibration kind falls back to the first dataset", () => {
  const audio = dataset("audio");

  expect(selectInitialCycleDataset([audio], input, false)).toEqual(audio);
});

test.each([
  ["MapSong", "BikeSong", 1772, 1872, 1922, 1972],
  ["BikeSong", "MapSong", -1772, -1672, -1622, -1572],
  ["MapSong", "SurfSong", 5421, 5521, 5571, 5621],
  ["SurfSong", "MapSong", -5421, -5321, -5271, -5221],
  ["SurfSong", "BikeSong", 3649, 3749, 3799, 3849],
  ["BikeSong", "SurfSong", -3649, -3549, -3499, -3449],
] satisfies [
  Wild3PlayingSong,
  Wild3PlayingSong,
  number,
  number,
  number,
  number,
][])(
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
    expect(
      selectInitialCycleDataset(
        [source],
        { ...input, playingSong: requested },
        false,
      ),
    ).toEqual({
      ...source,
      summary: { min, mid, max },
      cdf: [
        [min, 0, 0],
        [max, 1, 50],
      ],
    });
  },
);

test.each([
  ["MAP_ROUTE110", "SweetScentLand"],
  ["MAP_ROUTE101", "SuperRod"],
  ["MAP_ROUTE110", "SuperRod"],
  ["MAP_ROUTE102", "SweetScentLand"],
] as const)(
  "different playing songs adjust non-audio for %s %s",
  (mapId, action) => {
    const source = dataset("non", { isAudio: false });
    const setup = { ...input, mapId, action, playingSong: "BikeSong" } as const;
    const component: InitialCycleDataset = {
      ...source,
      summary: { min: 1872, mid: 1922, max: 1972 },
      cdf: [
        [1872, 0, 0],
        [1972, 1, 50],
      ],
    };

    expect(adjustNonAudioComponent(source, setup)).toEqual({
      component,
      adjustment: 1772,
    });
    expect(selectInitialCycleDataset([source], setup, false)).toEqual(
      component,
    );
  },
);

test("matching playing songs leave non-audio unchanged", () => {
  const source = dataset("non", { isAudio: false });

  expect(adjustNonAudioComponent(source, input)).toEqual({
    component: source,
    adjustment: 0,
  });
});

test("underwater map music has no movement adjustment", () => {
  const underwater = dataset("underwater", {
    mapId: "MAP_UNDERWATER_ROUTE126",
    isAudio: false,
  });
  expect(
    adjustNonAudioComponent(underwater, {
      ...input,
      mapId: "MAP_UNDERWATER_ROUTE124",
    }),
  ).toEqual({
    component: underwater,
    adjustment: 0,
  });
});

test("measured Dewford bike fishing replaces adjusted fallback and preserves rod equivalence", () => {
  const setup = {
    mapId: "MAP_DEWFORD_TOWN",
    weather: "Sunny",
    playingSong: "BikeSong",
    action: "OldRod",
  } as const;
  const audio = selectInitialCycleDataset(calibrationComponents, setup, true);
  const nonAudio = selectInitialCycleDataset(
    calibrationComponents,
    setup,
    false,
  );
  const result = getInitialCycleInfo(
    "MAP_DEWFORD_TOWN",
    "Sunny",
    "BikeSong",
    "OldRod",
  );
  expect({
    audio: audio.id,
    nonAudio: nonAudio.id,
  }).toEqual({
    audio: "DEWFORD_TOWN_SUNNY_BIKESONG_SUPERROD_AUDIO",
    nonAudio: "DEWFORD_TOWN_SUNNY_BIKESONG_SUPERROD_NON_AUDIO",
  });
  expect(
    getInitialCycleInfo("MAP_DEWFORD_TOWN", "Sunny", "BikeSong", "GoodRod"),
  ).toEqual(result);
  expect(
    getInitialCycleInfo("MAP_DEWFORD_TOWN", "Sunny", "BikeSong", "SuperRod"),
  ).toEqual(result);
  expect(result.distribution).toEqual(
    combineCalibrationComponents(audio, nonAudio),
  );
  expect(result.summary).toEqual({
    min: 52218,
    max: 98008,
    median: 75795,
    average: 74574.6878347137,
  });
  expect(
    calibrationComponents.find((entry) => entry.id === nonAudio.id)?.summary,
  ).toEqual({
    min: 26737,
    mid: 26768,
    max: 35040,
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

test("new diving and thunderstorm captures retain their setup metadata", () => {
  const ids = [
    "UNDERWATER_SUNNY_AUDIO",
    "ROUTE119_THUNDERSTORM_AUDIO",
    "SURF_THUNDERSTORM_AUDIO",
  ];
  expect(
    ids.map((id) => {
      const entry = calibrationComponents.find(
        (component) => component.id === id,
      );
      if (entry == null) {
        throw new Error(id);
      }

      return {
        id: entry.id,
        mapId: entry.mapId,
        weather: entry.weather,
        playingSong: entry.playingSong,
        action: entry.action,
        isAudio: entry.isAudio,
      };
    }),
  ).toEqual([
    {
      id: "UNDERWATER_SUNNY_AUDIO",
      mapId: "MAP_UNDERWATER_ROUTE126",
      weather: "Sunny",
      playingSong: "MapSong",
      action: "SweetScentWater",
      isAudio: true,
    },
    {
      id: "ROUTE119_THUNDERSTORM_AUDIO",
      mapId: "MAP_ROUTE119",
      weather: "Thunderstorm",
      playingSong: "MapSong",
      action: "SweetScentLand",
      isAudio: true,
    },
    {
      id: "SURF_THUNDERSTORM_AUDIO",
      mapId: "MAP_ROUTE119",
      weather: "Thunderstorm",
      playingSong: "SurfSong",
      action: "SweetScentWater",
      isAudio: true,
    },
  ]);
});
