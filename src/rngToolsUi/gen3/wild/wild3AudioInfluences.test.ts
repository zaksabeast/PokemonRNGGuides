import { expect, test } from "bun:test";
import { omit } from "lodash-es";
import type {} from "~/emotion";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Wild3UiMapNameWithAudioTooltip } from "./wild3UiMapNameWithAudioTooltip";
import type { Wild3PlayingSong, Wild3SearcherCycleData } from "~/rngTools";
import { getWild3EmeraldGameData } from "./data/wild3GameData";
import {
  createWild3TargetCycleOptions,
  wild3AudioInfluencesSchema,
  formatPlayingSong,
  getWild3AudioInfluenceOptions,
  normalizeWild3AudioInfluences,
  getWild3InitialCycleDistribution,
  getWild3LikelihoodAudioInfluenceLabel,
  formatWild3Likelihood,
  getWild3TargetAudioInfluences,
  getDisplayedWild3CycleData,
} from "./wild3AudioInfluences";

test("audio influences require weather and a current playing song", () => {
  expect(
    [
      {},
      { weather: "Rain" },
      { playing_song: "MapSong" },
      ...["OnFoot", "Bike", "Surf"].map((movement) => ({
        weather: "Rain",
        movement,
      })),
      { weather: "Sunny", playing_song: "DivingSong" },
    ].map((input) => wild3AudioInfluencesSchema.safeParse(input).success),
  ).toEqual([false, false, false, false, false, false, false]);
});

test("audio influences preserve current values and ignore legacy movement", () => {
  expect(
    ["MapSong", "BikeSong", "SurfSong"].map((playing_song) =>
      wild3AudioInfluencesSchema.parse({ weather: "Sunny", playing_song }),
    ),
  ).toEqual([
    { weather: "Sunny", playing_song: "MapSong" },
    { weather: "Sunny", playing_song: "BikeSong" },
    { weather: "Sunny", playing_song: "SurfSong" },
  ]);
  expect(
    wild3AudioInfluencesSchema.parse({
      weather: "Thunderstorm",
      playing_song: "SurfSong",
      movement: "Bike",
    }),
  ).toEqual({ weather: "Thunderstorm", playing_song: "SurfSong" });
});

test("playing song values have readable labels", () => {
  const playingSongs: Wild3PlayingSong[] = ["MapSong", "BikeSong", "SurfSong"];

  expect(playingSongs.map(formatPlayingSong)).toEqual([
    "Map song",
    "Bike song",
    "Surf song",
  ]);
});

test("map capabilities exclude unavailable encounter actions", () => {
  const map = getWild3EmeraldGameData().maps_data.find(
    (map) => map.map_id === "MAP_ROUTE101",
  );

  expect(map?.possible_weather_by_action).toEqual({
    SweetScentLand: ["Sunny"],
    SweetScentWater: [],
    OldRod: [],
    GoodRod: [],
    SuperRod: [],
    RockSmash: [],
  });
  expect(map?.possible_playing_song_by_action).toEqual({
    SweetScentLand: ["MapSong", "BikeSong"],
    SweetScentWater: [],
    OldRod: [],
    GoodRod: [],
    SuperRod: [],
    RockSmash: [],
  });
});

test("recommended setups enable both options despite custom settings", () => {
  const values = {
    recommendedSetups: true,
    considerWeather: false,
    hasUnlockedBike: false,
    rngManipulatedLeadPid: true,
    generate_even_if_impossible: false,
  };

  expect(createWild3TargetCycleOptions(values)).toEqual({
    SearchNewTarget: {
      consider_weather: true,
      consider_bike: true,
      consider_rng_manipulated_lead_pid: true,
      generate_even_if_impossible: false,
    },
  });
  expect(
    createWild3TargetCycleOptions({ ...values, recommendedSetups: false }),
  ).toEqual({
    SearchNewTarget: {
      consider_weather: false,
      consider_bike: false,
      consider_rng_manipulated_lead_pid: true,
      generate_even_if_impossible: false,
    },
  });
});

test("weather and playing song options respect the map, action and search options", () => {
  expect(
    getWild3AudioInfluenceOptions("MAP_MT_PYRE_1F", "SweetScentLand"),
  ).toEqual({
    weathers: ["Sunny"],
    playingSongs: ["MapSong"],
    showAudioInfluences: false,
  });
  expect(
    getWild3AudioInfluenceOptions("MAP_ROUTE119", "SweetScentWater"),
  ).toEqual({
    weathers: ["Sunny", "Rain", "Thunderstorm"],
    playingSongs: ["SurfSong"],
    showAudioInfluences: true,
  });
  expect(
    getWild3AudioInfluenceOptions("MAP_ROUTE119", "SweetScentWater", {
      considerWeather: false,
      hasUnlockedBike: false,
    }),
  ).toEqual({
    weathers: ["Sunny"],
    playingSongs: ["SurfSong"],
    showAudioInfluences: false,
  });
  expect(
    getWild3AudioInfluenceOptions("MAP_ROUTE120", "SweetScentWater"),
  ).toEqual({
    weathers: ["Sunny"],
    playingSongs: ["SurfSong"],
    showAudioInfluences: false,
  });
  expect(
    getWild3AudioInfluenceOptions("MAP_ROUTE120", "OldRod", {
      considerWeather: false,
      hasUnlockedBike: false,
    }),
  ).toEqual({
    weathers: ["Sunny"],
    playingSongs: ["MapSong", "SurfSong"],
    showAudioInfluences: true,
  });
  expect(
    getWild3AudioInfluenceOptions("MAP_ROUTE101", "SweetScentLand", {
      considerWeather: true,
      hasUnlockedBike: false,
    }),
  ).toEqual({
    weathers: ["Sunny"],
    playingSongs: ["MapSong"],
    showAudioInfluences: false,
  });
});

test("Route 119 land Sweet Scent forbids bike music", () => {
  expect(
    getWild3AudioInfluenceOptions("MAP_ROUTE119", "SweetScentLand"),
  ).toEqual({
    weathers: ["Sunny", "Rain", "Thunderstorm"],
    playingSongs: ["MapSong"],
    showAudioInfluences: true,
  });
  expect(
    normalizeWild3AudioInfluences("MAP_ROUTE119", "SweetScentLand", {
      weather: "Rain",
      playing_song: "BikeSong",
    }),
  ).toEqual({ weather: "Rain", playing_song: "MapSong" });
  const map = getWild3EmeraldGameData().maps_data.find(
    (entry) => entry.map_id === "MAP_ROUTE119",
  );
  expect(
    map?.initial_cycle_distrs
      .filter((entry) => entry.action === "SweetScentLand")
      .map(({ action, weather, playing_song }) => ({
        action,
        weather,
        playing_song,
      })),
  ).toEqual([
    { action: "SweetScentLand", weather: "Sunny", playing_song: "MapSong" },
    { action: "SweetScentLand", weather: "Rain", playing_song: "MapSong" },
    {
      action: "SweetScentLand",
      weather: "Thunderstorm",
      playing_song: "MapSong",
    },
  ]);
  expect(
    getWild3AudioInfluenceOptions("MAP_ROUTE119", "OldRod").playingSongs,
  ).toEqual(["SurfSong"]);
});

test("Route 120 forbids bike music for land Sweet Scent but permits it for fishing", () => {
  const map = getWild3EmeraldGameData().maps_data.find(
    (entry) => entry.map_id === "MAP_ROUTE120",
  );
  expect(map?.possible_playing_song_by_action).toEqual({
    SweetScentLand: ["MapSong"],
    SweetScentWater: ["SurfSong"],
    OldRod: ["MapSong", "BikeSong", "SurfSong"],
    GoodRod: ["MapSong", "BikeSong", "SurfSong"],
    SuperRod: ["MapSong", "BikeSong", "SurfSong"],
    RockSmash: [],
  });
  expect(
    normalizeWild3AudioInfluences("MAP_ROUTE120", "SweetScentLand", {
      weather: "Rain",
      playing_song: "BikeSong",
    }),
  ).toEqual({ weather: "Rain", playing_song: "MapSong" });
  expect(
    map?.initial_cycle_distrs.filter(
      (entry) =>
        entry.action === "SweetScentLand" && entry.playing_song === "BikeSong",
    ),
  ).toEqual([]);
});

test.each(["MAP_UNDERWATER_ROUTE124", "MAP_UNDERWATER_ROUTE126"])(
  "%s only permits map music",
  (mapId) => {
    expect(getWild3AudioInfluenceOptions(mapId, "SweetScentWater")).toEqual({
      weathers: ["Sunny"],
      playingSongs: ["MapSong"],
      showAudioInfluences: false,
    });
    expect(
      normalizeWild3AudioInfluences(mapId, "SweetScentWater", {
        playing_song: "BikeSong",
      }),
    ).toEqual({
      weather: "Sunny",
      playing_song: "MapSong",
    });
    const map = getWild3EmeraldGameData().maps_data.find(
      (entry) => entry.map_id === mapId,
    );
    expect(map?.possible_playing_song_by_action).toEqual({
      SweetScentLand: [],
      SweetScentWater: ["MapSong"],
      OldRod: [],
      GoodRod: [],
      SuperRod: [],
      RockSmash: [],
    });
    expect(
      map?.initial_cycle_distrs.map(({ action, weather, playing_song }) => ({
        action,
        weather,
        playing_song,
      })),
    ).toEqual([
      {
        action: "SweetScentWater",
        weather: "Sunny",
        playing_song: "MapSong",
      },
    ]);
  },
);

test("weather and playing song selection preserves valid values and normalizes map/action changes", () => {
  expect(
    normalizeWild3AudioInfluences("MAP_ROUTE119", "OldRod", {
      weather: "Rain",
      playing_song: "BikeSong",
    }),
  ).toEqual({
    weather: "Rain",
    playing_song: "SurfSong",
  });
  expect(
    normalizeWild3AudioInfluences("MAP_ROUTE120", "SweetScentWater", {
      weather: "Rain",
      playing_song: "BikeSong",
    }),
  ).toEqual({
    weather: "Sunny",
    playing_song: "SurfSong",
  });
  expect(
    normalizeWild3AudioInfluences("MAP_ROUTE101", "SweetScentLand", {
      weather: "Thunderstorm",
      playing_song: "SurfSong",
    }),
  ).toEqual({
    weather: "Sunny",
    playing_song: "MapSong",
  });
});

test("distribution selection matches all three audio influence fields", () => {
  const map = getWild3EmeraldGameData().maps_data.find(
    (map) => map.map_id === "MAP_ROUTE119",
  );
  if (map == null) {
    throw new Error("Missing Route 119 map data");
  }

  const distribution = getWild3InitialCycleDistribution(map, "OldRod", {
    weather: "Rain",
    playing_song: "SurfSong",
  });
  const settings = omit(distribution, "distribution");

  expect(settings).toEqual({
    action: "OldRod",
    playing_song: "SurfSong",
    weather: "Rain",
    min: 49366,
    max: 99196,
  });

  expect(
    getWild3InitialCycleDistribution(map, "SweetScentWater", {
      weather: "Rain",
      playing_song: "BikeSong",
    }),
  ).toBeUndefined();
});

const lower: Wild3SearcherCycleData = {
  lead_pid_cycle_count: 608,
  initial_cycle_range: { start: 0, len: 100 },
  method_probability: 0.25,
  playing_song: "MapSong",
  weather: "Sunny",
};
const upper: Wild3SearcherCycleData = {
  lead_pid_cycle_count: 868,
  initial_cycle_range: { start: 200, len: 100 },
  method_probability: 0.75,
  playing_song: "BikeSong",
  weather: "Rain",
};

test("selected setup audio influences normalize to the map and action", () => {
  const data = {
    post_cycle_range: { start: { cycle: 0, lead_pid_mod: 1 }, len: 100 },
    specified_lead: undefined,
    slowest_lead: upper,
    fastest_lead: lower,
    ideal_lead: upper,
    common_lower_lead: lower,
    common_upper_lead: upper,
  };

  expect(getDisplayedWild3CycleData(data, false)).toEqual(lower);
  expect(getDisplayedWild3CycleData(data, true)).toEqual(upper);
  expect(
    getWild3TargetAudioInfluences("MAP_ROUTE119", "OldRod", data, true),
  ).toEqual({ weather: "Rain", playing_song: "SurfSong" });
  expect(
    getWild3TargetAudioInfluences("MAP_ROUTE119", "OldRod", data, false),
  ).toEqual({ weather: "Sunny", playing_song: "SurfSong" });
  expect(
    getWild3TargetAudioInfluences(
      "MAP_ROUTE119",
      "OldRod",
      {
        ...data,
        common_lower_lead: {
          ...lower,
          weather: "Rain",
          playing_song: "BikeSong",
        },
      },
      false,
    ),
  ).toEqual({ weather: "Rain", playing_song: "SurfSong" });
});

test("likelihood labels use the supplied audio influence", () => {
  expect(formatWild3Likelihood([lower, upper])).toBe("25.0% - 75.0%");
  expect(getWild3LikelihoodAudioInfluenceLabel(lower)).toBe(
    "Optimal audio: Sunny weather audio, map song playing.",
  );
  expect(getWild3LikelihoodAudioInfluenceLabel(upper)).toBe(
    "Optimal audio: Rainy weather audio, bike song playing.",
  );
  expect(
    getWild3LikelihoodAudioInfluenceLabel({ ...upper, weather: "Sunny" }),
  ).toBe("Optimal audio: Sunny weather audio, bike song playing.");
  expect(
    getWild3LikelihoodAudioInfluenceLabel({
      ...upper,
      weather: "Thunderstorm",
      playing_song: "SurfSong",
    }),
  ).toBe("Optimal audio: Thunderstorm weather audio, surf song playing.");
});

test("optimal setup labels omit weather when the map action allows only one", () => {
  const data = {
    ...lower,
    playing_song: "BikeSong",
  } satisfies Wild3SearcherCycleData;
  const land = getWild3AudioInfluenceOptions("MAP_ROUTE120", "SweetScentLand");
  const fishing = getWild3AudioInfluenceOptions("MAP_ROUTE120", "OldRod");

  expect(
    getWild3LikelihoodAudioInfluenceLabel(data, land.weathers.length > 1),
  ).toBe("Optimal audio: Sunny weather audio, bike song playing.");
  expect(
    getWild3LikelihoodAudioInfluenceLabel(data, fishing.weathers.length > 1),
  ).toBe("Optimal audio: bike song playing.");
});

test("map renders an information icon only for multiple weather or playing song options", () => {
  const single = getWild3AudioInfluenceOptions(
    "MAP_ROUTE120",
    "SweetScentWater",
  );
  const multiple = getWild3AudioInfluenceOptions(
    "MAP_ROUTE119",
    "SweetScentWater",
  );
  const plain = renderToStaticMarkup(
    React.createElement(Wild3UiMapNameWithAudioTooltip, {
      mapId: "MAP_ROUTE120",
      action: "SweetScentWater",
      data: { ...lower, playing_song: "SurfSong" },
      showAudioInfluences: single.showAudioInfluences,
      children: "Route 120",
    }),
  );
  const annotated = renderToStaticMarkup(
    React.createElement(Wild3UiMapNameWithAudioTooltip, {
      mapId: "MAP_ROUTE119",
      action: "SweetScentWater",
      data: { ...lower, playing_song: "SurfSong" },
      showAudioInfluences: multiple.showAudioInfluences,
      children: "Route 119",
    }),
  );

  expect(plain).toBe("Route 120");
  expect(annotated).toContain(
    'aria-label="Optimal weather audio and playing song"',
  );
  expect(annotated).toContain("Route 119");
});
