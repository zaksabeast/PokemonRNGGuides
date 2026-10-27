import { expect, test } from "bun:test";
import { omit } from "lodash-es";
import type {} from "~/emotion";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Wild3Likelihood } from "./wild3Likelihood";
import type { Wild3SearcherCycleData } from "~/rngTools";
import { getWild3EmeraldGameData } from "./data/wild3GameData";
import {
  createWild3TargetCycleOptions,
  getWild3AudioInfluenceOptions,
  normalizeWild3AudioInfluences,
  getWild3InitialCycleDistribution,
  getWild3LikelihoodAudioInfluenceLabels,
  formatWild3Likelihood,
  getWild3TargetAudioInfluences,
  getDisplayedWild3CycleData,
} from "./wild3AudioInfluences";

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
  expect(map?.possible_movement_by_action).toEqual({
    SweetScentLand: ["OnFoot", "Bike"],
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

test("audio influence counts respect the map, action and search options", () => {
  expect(
    getWild3AudioInfluenceOptions("MAP_MT_PYRE_1F", "SweetScentLand"),
  ).toEqual({
    weathers: ["Sunny"],
    movements: ["OnFoot"],
    showAudioInfluences: false,
  });
  expect(
    getWild3AudioInfluenceOptions("MAP_ROUTE119", "SweetScentWater"),
  ).toEqual({
    weathers: ["Sunny", "Rain", "Thunderstorm"],
    movements: ["Surf"],
    showAudioInfluences: true,
  });
  expect(
    getWild3AudioInfluenceOptions("MAP_ROUTE119", "SweetScentWater", {
      considerWeather: false,
      hasUnlockedBike: false,
    }),
  ).toEqual({
    weathers: ["Sunny"],
    movements: ["Surf"],
    showAudioInfluences: false,
  });
  expect(
    getWild3AudioInfluenceOptions("MAP_ROUTE120", "SweetScentWater"),
  ).toEqual({
    weathers: ["Sunny"],
    movements: ["Surf"],
    showAudioInfluences: false,
  });
  expect(
    getWild3AudioInfluenceOptions("MAP_ROUTE120", "OldRod", {
      considerWeather: false,
      hasUnlockedBike: false,
    }),
  ).toEqual({
    weathers: ["Sunny"],
    movements: ["OnFoot", "Surf"],
    showAudioInfluences: true,
  });
  expect(
    getWild3AudioInfluenceOptions("MAP_ROUTE101", "SweetScentLand", {
      considerWeather: true,
      hasUnlockedBike: false,
    }),
  ).toEqual({
    weathers: ["Sunny"],
    movements: ["OnFoot"],
    showAudioInfluences: false,
  });
});

test("audio influence selection preserves valid values and normalizes map/action changes", () => {
  expect(
    normalizeWild3AudioInfluences("MAP_ROUTE119", "OldRod", {
      weather: "Rain",
      movement: "Bike",
    }),
  ).toEqual({
    weather: "Rain",
    movement: "Bike",
  });
  expect(
    normalizeWild3AudioInfluences("MAP_ROUTE120", "SweetScentWater", {
      weather: "Rain",
      movement: "Bike",
    }),
  ).toEqual({
    weather: "Sunny",
    movement: "Surf",
  });
  expect(
    normalizeWild3AudioInfluences("MAP_ROUTE101", "SweetScentLand", {
      weather: "Thunderstorm",
      movement: "Surf",
    }),
  ).toEqual({
    weather: "Sunny",
    movement: "OnFoot",
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
    movement: "Surf",
  });
  const settings = omit(distribution, "distribution");

  expect(settings).toEqual({
    action: "OldRod",
    movement: "Surf",
    weather: "Rain",
    min: 0,
    max: 280895,
  });

  expect(
    getWild3InitialCycleDistribution(map, "SweetScentWater", {
      weather: "Rain",
      movement: "Bike",
    }),
  ).toBeUndefined();
});

const lower: Wild3SearcherCycleData = {
  lead_pid_cycle_count: 608,
  pre_sweet_scent_cycle_range: { start: 0, len: 100 },
  method_probability: 0.25,
  movement: "OnFoot",
  weather: "Sunny",
};
const upper: Wild3SearcherCycleData = {
  lead_pid_cycle_count: 868,
  pre_sweet_scent_cycle_range: { start: 200, len: 100 },
  method_probability: 0.75,
  movement: "Bike",
  weather: "Rain",
};

test("selected setups carry the audio influences behind their displayed likelihood", () => {
  const data = {
    post_sweet_scent_range: { start: { cycle: 0, lead_pid_mod: 1 }, len: 100 },
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
  ).toEqual({ weather: "Rain", movement: "Bike" });
  expect(
    getWild3TargetAudioInfluences("MAP_ROUTE119", "OldRod", data, false),
  ).toEqual({ weather: "Sunny", movement: "OnFoot" });
  expect(
    getWild3TargetAudioInfluences(
      "MAP_ROUTE119",
      "OldRod",
      {
        ...data,
        common_lower_lead: { ...lower, weather: "Rain", movement: "Bike" },
      },
      false,
    ),
  ).toEqual({ weather: "Rain", movement: "Bike" });
});

test("likelihood ranges identify independently optimized audio influences", () => {
  expect(formatWild3Likelihood([lower, upper])).toBe("25.0% - 75.0%");
  expect(getWild3LikelihoodAudioInfluenceLabels([lower, upper])).toEqual([
    "25.0% (608 cycles): Weather: Sunny; Movement: On foot",
    "75.0% (868 cycles): Weather: Rain; Movement: Bike",
  ]);
  expect(getWild3LikelihoodAudioInfluenceLabels([lower, lower])).toEqual([
    "Weather: Sunny; Movement: On foot",
  ]);
  expect(getWild3LikelihoodAudioInfluenceLabels([])).toEqual([]);
});

test("likelihood renders an information icon only for multiple eligible audio influences", () => {
  const single = getWild3AudioInfluenceOptions(
    "MAP_ROUTE120",
    "SweetScentWater",
  );
  const multiple = getWild3AudioInfluenceOptions(
    "MAP_ROUTE119",
    "SweetScentWater",
  );
  const plain = renderToStaticMarkup(
    React.createElement(Wild3Likelihood, {
      data: [lower],
      showAudioInfluences: single.showAudioInfluences,
    }),
  );
  const annotated = renderToStaticMarkup(
    React.createElement(Wild3Likelihood, {
      data: [lower],
      showAudioInfluences: multiple.showAudioInfluences,
    }),
  );

  expect(plain).toBe("25.0%");
  expect(annotated).toContain('aria-label="Optimal weather and movement"');
  expect(annotated).toContain("25.0%");
});
