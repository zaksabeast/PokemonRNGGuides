import { expect, test } from "bun:test";
import type { PlayingSong, Wild3Action, Wild3Weather } from "~/rngTools";
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

test("measured Dewford bike fishing replaces adjusted fallback and preserves rod equivalence", () => {
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
    audio: "DEWFORD_TOWN_SUNNY_BIKESONG_SUPERROD_AUDIO",
    nonAudio: "DEWFORD_TOWN_SUNNY_BIKESONG_SUPERROD_NON_AUDIO",
    adjustment: 0,
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
    min: 52218,
    max: 98008,
    median: 75794.70489085195,
    average: 74574.6878347137,
  });
  expect(
    calibrationComponents.find((entry) => entry.id === result.nonAudio.id)
      ?.summary,
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

test("new recordings each provide measured audio and non-audio within one song loop", () => {
  const files = [
    "ABANDONED_SHIP_ROOMS_B1F-Sunny-MapSong-SuperRod.txt",
    "DEWFORD_TOWN-Sunny-BikeSong-SuperRod.txt",
    "DEWFORD_TOWN-Sunny-SurfSong-SuperRod.txt",
    "EVER_GRANDE_CITY-Sunny-MapSong-SuperRod.txt",
    "MAGMA_HIDEOUT_1F-Sunny-MapSong-SweetScentLand.txt",
    "MAP_UNDERWATER_ROUTE126-Sunny-DivingSong-SweetScentWater.txt",
    "METEOR_FALLS_1F_1R-Sunny-MapSong-SweetScentLand.txt",
    "MT_PYRE_2F-Sunny-MapSong-SweetScentLand.txt",
    "MT_PYRE_SUMMIT-Sunny-MapSong-SweetScentLand.txt",
    "PETALBURG_CITY-Sunny-MapSong-SuperRod.txt",
    "ROUTE102-Sunny-MapSong-SuperRod.txt",
    "ROUTE110-Sunny-BikeSong-SweetScentLand.txt",
    "ROUTE115-Sunny-MapSong-SuperRod.txt",
    "ROUTE119-Rain-MapSong-SweetScentLand.txt",
    "ROUTE119-Rain-SurfSong-SweetScentWater.txt",
    "ROUTE119-Sunny-MapSong-SweetScentLand.txt",
    "ROUTE119-Thunderstorm-MapSong-SweetScentLand.txt",
    "ROUTE119-Thunderstorm-SurfSong-SweetScentWater.txt",
    "ROUTE122-Sunny-MapSong-SweetScentLand.txt",
    "ROUTE123-Rain-MapSong-SweetScentLand.txt",
    "ROUTE130-Sunny-MapSong-SweetScentLand.txt",
    "SEAFLOOR_CAVERN_ENTRANCE-Sunny-MapSong-SuperRod.txt",
    "SHOAL_CAVE_LOW_TIDE_ENTRANCE_ROOM-Sunny-MapSong-SuperRod.txt",
    "SHOAL_CAVE_LOW_TIDE_ENTRANCE_ROOM-Sunny-MapSong-SweetScentLand.txt",
    "SKY_PILLAR_1F-Sunny-MapSong-SweetScentLand.txt",
    "VICTORY_ROAD_1F-Sunny-MapSong-SweetScentLand.txt",
    "MAP_ROUTE111-Sunny-MapSong-RockSmash.txt",
    "MAP_SAFARI_ZONE_NORTHEAST-Sunny-MapSong-RockSmash.txt",
    "MOSSDEEP_CITY-Sunny-MapSong-SuperRod.txt",
    "ROUTE114-Sunny-MapSong-RockSmash.txt",
    "ROUTE122-Sunny-MapSong-SuperRod.txt",
    "ROUTE123-Rain-MapSong-SuperRod.txt",
    "ROUTE124-Sunny-MapSong-SuperRod.txt",
    "ROUTE131-Sunny-MapSong-SuperRod.txt",
    "SLATEPORT_CITY-Sunny-MapSong-SuperRod.txt",
    "SOOTOPOLIS_CITY-Sunny-MapSong-SuperRod.txt",
    "VICTORY_ROAD_B2F-Sunny-MapSong-SuperRod.txt",
    "MAP_GRANITE_CAVE_B2F-Sunny-MapSong-RockSmash.txt",
    "MAP_VICTORY_ROAD_B1F-Sunny-MapSong-RockSmash.txt",
    "ROUTE114-Sunny-BikeSong-RockSmash.txt",
    "ROUTE110-Sunny-MapSong-SuperRod.txt",
    "ROUTE118-Sunny-MapSong-SuperRod.txt",
    "ROUTE118-Sunny-MapSong-SweetScentLand.txt",
    "ROUTE119-Rain-SurfSong-SuperRod.txt",
    "ROUTE119-Thunderstorm-SurfSong-SuperRod.txt",
    "ROUTE123-Rain-BikeSong-SweetScentLand.txt",
    "SAFARI_ZONE_SOUTHEAST-Sunny-MapSong-SuperRod.txt",
  ];
  const recordings = files.map((source) => ({
    source,
    kinds: calibrationComponents
      .filter((component) => component.provenance.source === source)
      .map((component) => ({
        isAudio: component.isAudio,
        isFake: component.is_fake,
      })),
  }));
  expect(recordings).toEqual(
    files.map((source) => ({
      source,
      kinds: [
        { isAudio: true, isFake: false },
        { isAudio: false, isFake: false },
      ],
    })),
  );
  const invalidFrameCounts = calibrationComponents
    .filter((component) => files.includes(component.provenance.source))
    .filter((component) => {
      const frames = component.provenance.sampled_frames;
      const loop = component.provenance.song_loop_frames;

      return (
        typeof frames !== "number" ||
        typeof loop !== "number" ||
        frames <= 0 ||
        frames > Math.ceil(loop)
      );
    })
    .map((component) => component.id);
  expect(invalidFrameCounts).toEqual([]);
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
        isFake: entry.is_fake,
      };
    }),
  ).toEqual([
    {
      id: "UNDERWATER_SUNNY_AUDIO",
      mapId: "MAP_UNDERWATER_ROUTE126",
      weather: "Sunny",
      playingSong: "DivingSong",
      action: "SweetScentWater",
      isAudio: true,
      isFake: false,
    },
    {
      id: "ROUTE119_THUNDERSTORM_AUDIO",
      mapId: "MAP_ROUTE119",
      weather: "Thunderstorm",
      playingSong: "MapSong",
      action: "SweetScentLand",
      isAudio: true,
      isFake: false,
    },
    {
      id: "SURF_THUNDERSTORM_AUDIO",
      mapId: "MAP_ROUTE119",
      weather: "Thunderstorm",
      playingSong: "SurfSong",
      action: "SweetScentWater",
      isAudio: true,
      isFake: false,
    },
  ]);
});

test.each([
  [
    "MAP_ROUTE111",
    "Sunny",
    "RockSmash",
    "MAP_ROUTE111-Sunny-MapSong-RockSmash.txt",
  ],
  [
    "MAP_SAFARI_ZONE_NORTHEAST",
    "Sunny",
    "RockSmash",
    "MAP_SAFARI_ZONE_NORTHEAST-Sunny-MapSong-RockSmash.txt",
  ],
  [
    "MAP_MOSSDEEP_CITY",
    "Sunny",
    "SuperRod",
    "MOSSDEEP_CITY-Sunny-MapSong-SuperRod.txt",
  ],
  [
    "MAP_ROUTE114",
    "Sunny",
    "RockSmash",
    "ROUTE114-Sunny-MapSong-RockSmash.txt",
  ],
  ["MAP_ROUTE122", "Sunny", "SuperRod", "ROUTE122-Sunny-MapSong-SuperRod.txt"],
  ["MAP_ROUTE123", "Rain", "SuperRod", "ROUTE123-Rain-MapSong-SuperRod.txt"],
  ["MAP_ROUTE124", "Sunny", "SuperRod", "ROUTE124-Sunny-MapSong-SuperRod.txt"],
  ["MAP_ROUTE131", "Sunny", "SuperRod", "ROUTE131-Sunny-MapSong-SuperRod.txt"],
  [
    "MAP_SLATEPORT_CITY",
    "Sunny",
    "SuperRod",
    "SLATEPORT_CITY-Sunny-MapSong-SuperRod.txt",
  ],
  [
    "MAP_SOOTOPOLIS_CITY",
    "Sunny",
    "SuperRod",
    "SOOTOPOLIS_CITY-Sunny-MapSong-SuperRod.txt",
  ],
  [
    "MAP_VICTORY_ROAD_B2F",
    "Sunny",
    "SuperRod",
    "VICTORY_ROAD_B2F-Sunny-MapSong-SuperRod.txt",
  ],
] satisfies [string, Wild3Weather, Wild3Action, string][])(
  "%s %s %s selects both measured components from %s",
  (mapId, weather, action, source) => {
    const info = getInitialCycleInfo(mapId, weather, "MapSong", action);
    expect({
      audioSource: info.audio.provenance.source,
      nonAudioSource: info.nonAudio.provenance.source,
      audioFake: info.audio.is_fake,
      nonAudioFake: info.nonAudio.is_fake,
      adjustment: info.nonAudioAdjustment,
    }).toEqual({
      audioSource: source,
      nonAudioSource: source,
      audioFake: false,
      nonAudioFake: false,
      adjustment: 0,
    });
  },
);

test.each([
  [
    "MAP_GRANITE_CAVE_B2F",
    "MapSong",
    "MAP_GRANITE_CAVE_B2F-Sunny-MapSong-RockSmash.txt",
  ],
  [
    "MAP_VICTORY_ROAD_B1F",
    "MapSong",
    "MAP_VICTORY_ROAD_B1F-Sunny-MapSong-RockSmash.txt",
  ],
  ["MAP_ROUTE114", "BikeSong", "ROUTE114-Sunny-BikeSong-RockSmash.txt"],
] satisfies [string, PlayingSong, string][])(
  "%s Rock Smash with %s uses new recording %s",
  (mapId, playingSong, source) => {
    const info = getInitialCycleInfo(mapId, "Sunny", playingSong, "RockSmash");
    expect({
      audioSource: info.audio.provenance.source,
      nonAudioSource: info.nonAudio.provenance.source,
      audioAction: info.audio.action,
      nonAudioAction: info.nonAudio.action,
      audioSong: info.audio.playingSong,
      nonAudioSong: info.nonAudio.playingSong,
      adjustment: info.nonAudioAdjustment,
    }).toEqual({
      audioSource: source,
      nonAudioSource: source,
      audioAction: "RockSmash",
      nonAudioAction: "RockSmash",
      audioSong: playingSong,
      nonAudioSong: playingSong,
      adjustment: 0,
    });
  },
);

test.each([
  [
    "MAP_ROUTE110",
    "Sunny",
    "MapSong",
    "SuperRod",
    "ROUTE110-Sunny-MapSong-SuperRod.txt",
  ],
  [
    "MAP_ROUTE118",
    "Sunny",
    "MapSong",
    "SuperRod",
    "ROUTE118-Sunny-MapSong-SuperRod.txt",
  ],
  [
    "MAP_ROUTE118",
    "Sunny",
    "MapSong",
    "SweetScentLand",
    "ROUTE118-Sunny-MapSong-SweetScentLand.txt",
  ],
  [
    "MAP_ROUTE119",
    "Rain",
    "SurfSong",
    "SuperRod",
    "ROUTE119-Rain-SurfSong-SuperRod.txt",
  ],
  [
    "MAP_ROUTE119",
    "Thunderstorm",
    "SurfSong",
    "SuperRod",
    "ROUTE119-Thunderstorm-SurfSong-SuperRod.txt",
  ],
  [
    "MAP_ROUTE123",
    "Rain",
    "BikeSong",
    "SweetScentLand",
    "ROUTE123-Rain-BikeSong-SweetScentLand.txt",
  ],
  [
    "MAP_SAFARI_ZONE_SOUTHEAST",
    "Sunny",
    "MapSong",
    "SuperRod",
    "SAFARI_ZONE_SOUTHEAST-Sunny-MapSong-SuperRod.txt",
  ],
] satisfies [string, Wild3Weather, PlayingSong, Wild3Action, string][])(
  "%s %s %s %s uses completed recording %s",
  (mapId, weather, playingSong, action, source) => {
    const info = getInitialCycleInfo(mapId, weather, playingSong, action);
    expect({
      audioSource: info.audio.provenance.source,
      nonAudioSource: info.nonAudio.provenance.source,
      audioFake: info.audio.is_fake,
      nonAudioFake: info.nonAudio.is_fake,
      audioAction: info.audio.action,
      nonAudioAction: info.nonAudio.action,
      audioSong: info.audio.playingSong,
      nonAudioSong: info.nonAudio.playingSong,
      audioWeather: info.audio.weather,
      nonAudioWeather: info.nonAudio.weather,
      adjustment: info.nonAudioAdjustment,
    }).toEqual({
      audioSource: source,
      nonAudioSource: source,
      audioFake: false,
      nonAudioFake: false,
      audioAction: action,
      nonAudioAction: action,
      audioSong: playingSong,
      nonAudioSong: playingSong,
      audioWeather: weather,
      nonAudioWeather: weather,
      adjustment: 0,
    });
  },
);

test("Route 118 recordings use the west fishing and east land song-loop durations", () => {
  const files = [
    "ROUTE118-Sunny-MapSong-SuperRod.txt",
    "ROUTE118-Sunny-MapSong-SweetScentLand.txt",
  ];
  expect(
    files.map((source) =>
      calibrationComponents
        .filter((entry) => entry.provenance.source === source)
        .map((entry) => entry.provenance.song_loop_frames),
    ),
  ).toEqual([
    [2181.818181818182, 2181.818181818182],
    [3388.235294117647, 3388.235294117647],
  ]);
});
