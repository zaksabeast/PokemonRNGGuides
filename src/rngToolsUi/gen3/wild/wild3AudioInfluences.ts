import type {
  Wild3Action,
  Wild3MapGameData,
  Wild3InitialCycleDistribution,
  Wild3MovementMode,
  Wild3SearcherCycleData,
  Wild3SearcherCycleDataByLead,
  Wild3SearcherCycleOpts,
  Wild3Weather,
} from "~/rngTools";
import { getWild3EmeraldGameData } from "./data/wild3GameData";
import { formatProbability } from "~/utils/formatProbability";

export const wild3Weathers = [
  "Sunny",
  "Rain",
  "Thunderstorm",
] as const satisfies readonly Wild3Weather[];
export const wild3Movements = [
  "OnFoot",
  "Bike",
  "Surf",
] as const satisfies readonly Wild3MovementMode[];

export type Wild3AudioInfluences = {
  weather: Wild3Weather;
  movement: Wild3MovementMode;
};

export type Wild3SearchAudioInfluences = {
  considerWeather: boolean;
  hasUnlockedBike: boolean;
};

export const formatWild3Weather = (weather: Wild3Weather): string => weather;
export const formatWild3Movement = (movement: Wild3MovementMode): string =>
  movement === "OnFoot" ? "On foot" : movement;

export const getWild3SearchAudioInfluences = (
  values: Wild3SearchAudioInfluences & { recommendedSetups: boolean },
): Wild3SearchAudioInfluences => ({
  considerWeather: values.recommendedSetups || values.considerWeather,
  hasUnlockedBike: values.recommendedSetups || values.hasUnlockedBike,
});

export const createWild3TargetCycleOptions = (
  values: Wild3SearchAudioInfluences & {
    recommendedSetups: boolean;
    rngManipulatedLeadPid: boolean;
    generate_even_if_impossible: boolean;
  },
): Wild3SearcherCycleOpts => {
  const audioInfluences = getWild3SearchAudioInfluences(values);

  return {
    SearchNewTarget: {
      consider_weather: audioInfluences.considerWeather,
      consider_bike: audioInfluences.hasUnlockedBike,
      consider_rng_manipulated_lead_pid: values.rngManipulatedLeadPid,
      generate_even_if_impossible: values.generate_even_if_impossible,
    },
  };
};

export const getWild3AudioInfluenceOptions = (
  mapId: string,
  action: Wild3Action,
  options: Wild3SearchAudioInfluences = {
    considerWeather: true,
    hasUnlockedBike: true,
  },
): {
  weathers: Wild3Weather[];
  movements: Wild3MovementMode[];
  showAudioInfluences: boolean;
} => {
  const map = getWild3EmeraldGameData().maps_data.find(
    (map) => map.map_id === mapId,
  );
  // Only Sunny is selected when considerWeather is false
  const weathers = (map?.possible_weather_by_action[action] ?? []).filter(
    (weather) => options.considerWeather || weather === "Sunny",
  );
  const movements = (map?.possible_movement_by_action[action] ?? []).filter(
    (movement) => options.hasUnlockedBike || movement !== "Bike",
  );

  return {
    weathers,
    movements,
    showAudioInfluences: weathers.length > 1 || movements.length > 1,
  };
};

export const normalizeWild3AudioInfluences = (
  mapId: string,
  action: Wild3Action,
  preferred: Partial<Wild3AudioInfluences> = {},
): Wild3AudioInfluences => {
  const { weathers, movements } = getWild3AudioInfluenceOptions(mapId, action);

  return {
    weather:
      weathers.find((weather) => weather === preferred.weather) ??
      weathers.find((weather) => weather === "Sunny") ??
      weathers[0] ??
      "Sunny",
    movement:
      movements.find((movement) => movement === preferred.movement) ??
      movements.find((movement) => movement === "OnFoot") ??
      movements[0] ??
      "OnFoot",
  };
};

export const getWild3InitialCycleDistribution = (
  map: Wild3MapGameData,
  action: Wild3Action,
  audioInfluences: Wild3AudioInfluences,
): Wild3InitialCycleDistribution | undefined =>
  map.vblank_distrs.find(
    (distribution) =>
      distribution.action === action &&
      distribution.weather === audioInfluences.weather &&
      distribution.movement === audioInfluences.movement,
  );

export const getWild3InitialCycleDistributionForSetup = (
  setup: Wild3AudioInfluences & { map: string; action: Wild3Action },
): Wild3InitialCycleDistribution | undefined => {
  const map = getWild3EmeraldGameData().maps_data.find(
    (map) => map.map_id === setup.map,
  );

  return map == null
    ? undefined
    : getWild3InitialCycleDistribution(map, setup.action, setup);
};

export const getDisplayedWild3CycleData = (
  data: Wild3SearcherCycleDataByLead | null | undefined,
  rngManipulatedLeadPid: boolean,
): Wild3SearcherCycleData | null => {
  if (data == null) {
    return null;
  }

  if (rngManipulatedLeadPid) {
    return data.ideal_lead;
  }

  return data.common_lower_lead.method_probability <
    data.common_upper_lead.method_probability
    ? data.common_lower_lead
    : data.common_upper_lead;
};

export const getCommonWild3CycleData = (
  data: Wild3SearcherCycleDataByLead,
): Wild3SearcherCycleData[] =>
  data.common_lower_lead.method_probability <
  data.common_upper_lead.method_probability
    ? [data.common_lower_lead, data.common_upper_lead]
    : [data.common_upper_lead, data.common_lower_lead];

export const getWild3TargetAudioInfluences = (
  mapId: string,
  action: Wild3Action,
  data: Wild3SearcherCycleDataByLead | null | undefined,
  rngManipulatedLeadPid: boolean,
): Wild3AudioInfluences => {
  const lower = data?.common_lower_lead;
  const upper = data?.common_upper_lead;
  const hasSharedAudioInfluences =
    lower?.weather === upper?.weather && lower?.movement === upper?.movement;
  const preferred =
    rngManipulatedLeadPid || hasSharedAudioInfluences
      ? (getDisplayedWild3CycleData(data, rngManipulatedLeadPid) ?? {})
      : {};

  return normalizeWild3AudioInfluences(mapId, action, preferred);
};

export const formatWild3Likelihood = (
  data: readonly Wild3SearcherCycleData[],
): string => {
  const least = data[0]?.method_probability ?? 0;
  const most = data[data.length - 1]?.method_probability ?? least;
  const leastText = formatProbability(least);
  const mostText = formatProbability(most);
  if (leastText === mostText || (least !== 0 && most - least <= 0.1)) {
    return leastText;
  }

  return `${leastText} - ${mostText}`;
};

export const getWild3LikelihoodAudioInfluenceLabels = (
  data: readonly Wild3SearcherCycleData[],
  showWeather = true,
): string[] => {
  const first = data[0];
  if (first == null) {
    return [];
  }

  const audioInfluenceLabel = (entry: Wild3SearcherCycleData) => {
    const weather =
      entry.weather === "Rain" ? "Rainy" : formatWild3Weather(entry.weather);
    const movement = {
      OnFoot: "on foot",
      Bike: "on bike",
      Surf: "surfing",
    }[entry.movement];

    return `Optimal setup: ${showWeather ? `${weather} weather, ` : ""}${movement}.`;
  };

  if (
    data.every(
      (entry) =>
        entry.weather === first.weather && entry.movement === first.movement,
    )
  ) {
    return [audioInfluenceLabel(first)];
  }

  return data.map(
    (entry) =>
      `${formatProbability(entry.method_probability)} (${entry.lead_pid_cycle_count} cycles): ${audioInfluenceLabel(entry)}`,
  );
};
