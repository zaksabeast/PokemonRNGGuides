import type {
  Wild3PlayingSong,
  Wild3Action,
  Wild3InitialCycleDistribution,
  Wild3MapGameData,
  Wild3Weather,
} from "~/rngTools";
import { wild3Actions } from "~/rngToolsUi/gen3/wild/utils";
import { initial_cycle_distributions as initialCycleData } from "./initial_cycle/initial_cycle_distributions";
import {
  getPossiblePlayingSongs,
  getPossibleWeathers,
} from "./initial_cycle/initial_cycle_map_game_data";
export {
  getInitialCycleSummary,
  getInitialCycleQualitativeProbability,
} from "./initial_cycle/cdf";

// This file exports the functions needed by the rest of the application.
// Functions in ./initial_cycle shouldn't be exported outside.

const distributionIndexesByMap: Record<
  string,
  Record<string, number>
> = initialCycleData.setups;

export const getInitialCycleUiMapGameData = (
  map_id: string,
  slots_by_action: Wild3MapGameData["slots_by_action"],
) => {
  return {
    ...getPossibleWeathersAndPlayingSongs(map_id, slots_by_action),
    initial_cycle_distrs: getInitialCycleDistributions(map_id, slots_by_action),
  };
};

const getPossibleWeathersAndPlayingSongs = (
  map_id: string,
  slots_by_action: Wild3MapGameData["slots_by_action"],
) => {
  const available = (action: Wild3Action): boolean =>
    slots_by_action[wild3Actions.indexOf(action)].length > 0;
  const weathers = (action: Wild3Action): Wild3Weather[] =>
    available(action) ? getPossibleWeathers(map_id, action) : [];
  const songs = (action: Wild3Action): Wild3PlayingSong[] =>
    available(action) ? getPossiblePlayingSongs(map_id, action) : [];

  return {
    possible_weather_by_action: {
      SweetScentLand: weathers("SweetScentLand"),
      SweetScentWater: weathers("SweetScentWater"),
      OldRod: weathers("OldRod"),
      GoodRod: weathers("GoodRod"),
      SuperRod: weathers("SuperRod"),
      RockSmash: weathers("RockSmash"),
    },
    possible_playing_song_by_action: {
      SweetScentLand: songs("SweetScentLand"),
      SweetScentWater: songs("SweetScentWater"),
      OldRod: songs("OldRod"),
      GoodRod: songs("GoodRod"),
      SuperRod: songs("SuperRod"),
      RockSmash: songs("RockSmash"),
    },
  };
};

const getInitialCycleDistributions = (
  map_id: string,
  slots_by_action: Wild3MapGameData["slots_by_action"],
): Wild3InitialCycleDistribution[] => {
  const { possible_weather_by_action, possible_playing_song_by_action } =
    getPossibleWeathersAndPlayingSongs(map_id, slots_by_action);

  return wild3Actions.flatMap((action) =>
    possible_weather_by_action[action].flatMap((weather) =>
      possible_playing_song_by_action[action].map((playing_song) => {
        const key = `${action}:${weather}:${playing_song}`;
        const index = distributionIndexesByMap[map_id]?.[key];
        const distribution = initialCycleData.distributions[index] ?? {
          summary: { min: 0, max: 0 },
          distribution: [],
        };

        return {
          action,
          weather,
          playing_song,
          ...distribution,
        };
      }),
    ),
  );
};
