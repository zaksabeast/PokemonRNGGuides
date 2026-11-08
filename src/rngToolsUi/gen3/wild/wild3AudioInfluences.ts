import type {
  Wild3Action,
  Wild3MapGameData,
  Wild3InitialCycleDistribution,
  Wild3PlayingSong,
  Wild3SearcherCycleData,
  Wild3SearcherCycleDataByLead,
  Wild3SearcherCycleOpts,
  Wild3Weather,
} from "~/rngTools";
import { getWild3EmeraldGameData } from "./data/wild3GameData";
import { formatProbability } from "~/utils/formatProbability";
import { z } from "zod";

export const wild3Weathers = [
  "Sunny",
  "Rain",
  "Thunderstorm",
] as const satisfies readonly Wild3Weather[];
export const wild3PlayingSongs = [
  "MapSong",
  "BikeSong",
  "SurfSong",
] as const satisfies readonly Wild3PlayingSong[];

export type Wild3AudioInfluences = {
  weather: Wild3Weather;
  playing_song: Wild3PlayingSong;
};

export const defaultAudioInfluences: Wild3AudioInfluences = {
  weather: "Sunny",
  playing_song: "MapSong",
};

export const wild3AudioInfluencesSchema = z.object({
  weather: z.enum(wild3Weathers),
  playing_song: z.enum(wild3PlayingSongs),
});

export type Wild3SearchAudioInfluences = {
  considerWeather: boolean;
  hasUnlockedBike: boolean;
};

export const formatWild3Weather = (weather: Wild3Weather): string => weather;
export const formatPlayingSong = (playingSong: Wild3PlayingSong): string =>
  ({
    MapSong: "Map song",
    BikeSong: "Bike song",
    SurfSong: "Surf song",
  })[playingSong];

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
  playingSongs: Wild3PlayingSong[];
  showAudioInfluences: boolean;
} => {
  const map = getWild3EmeraldGameData().maps_data.find(
    (map) => map.map_id === mapId,
  );
  // Only Sunny is selected when considerWeather is false
  const weathers = (map?.possible_weather_by_action[action] ?? []).filter(
    (weather) => options.considerWeather || weather === "Sunny",
  );
  const playingSongs = (
    map?.possible_playing_song_by_action[action] ?? []
  ).filter(
    (playing_song) => options.hasUnlockedBike || playing_song !== "BikeSong",
  );

  return {
    weathers,
    playingSongs,
    showAudioInfluences: weathers.length > 1 || playingSongs.length > 1,
  };
};

export const getDefaultWild3AudioInfluences = (
  mapId: string,
  action: Wild3Action,
): Wild3AudioInfluences => {
  return normalizeWild3AudioInfluences(mapId, action, {});
};

export const normalizeWild3AudioInfluences = (
  mapId: string,
  action: Wild3Action,
  preferred: Partial<Wild3AudioInfluences> = {},
): Wild3AudioInfluences => {
  const { weathers, playingSongs } = getWild3AudioInfluenceOptions(
    mapId,
    action,
  );

  return {
    weather:
      weathers.find((weather) => weather === preferred.weather) ??
      weathers.find((weather) => weather === defaultAudioInfluences.weather) ??
      weathers[0] ??
      defaultAudioInfluences.weather,
    playing_song:
      playingSongs.find(
        (playing_song) => playing_song === preferred.playing_song,
      ) ??
      playingSongs.find(
        (playing_song) => playing_song === defaultAudioInfluences.playing_song,
      ) ??
      playingSongs[0] ??
      defaultAudioInfluences.playing_song,
  };
};

export const getWild3InitialCycleDistribution = (
  map: Wild3MapGameData,
  action: Wild3Action,
  audioInfluences: Wild3AudioInfluences,
): Wild3InitialCycleDistribution | undefined =>
  map.initial_cycle_distrs.find(
    (distribution) =>
      distribution.action === action &&
      distribution.weather === audioInfluences.weather &&
      distribution.playing_song === audioInfluences.playing_song,
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
    lower?.weather === upper?.weather &&
    lower?.playing_song === upper?.playing_song;
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

export const getWild3LikelihoodAudioInfluenceLabel = (
  data: Wild3SearcherCycleData,
  showWeather = true,
): string => {
  const weather =
    data.weather === "Rain" ? "Rainy" : formatWild3Weather(data.weather);
  const playingSong = formatPlayingSong(data.playing_song).toLowerCase();

  return `Optimal audio: ${showWeather ? `${weather} weather audio, ` : ""}${playingSong} playing.`;
};
