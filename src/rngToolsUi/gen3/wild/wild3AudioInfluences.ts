import type {
  Wild3Action,
  Wild3MapGameData,
  Wild3InitialCycleDistribution,
  PlayingSong,
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
] as const satisfies readonly PlayingSong[];

export type Wild3AudioInfluences = {
  weather: Wild3Weather;
  playing_song: PlayingSong;
};

export const wild3AudioInfluencesSchema = z
  .object({
    weather: z.enum(wild3Weathers).optional().default("Sunny"),
    playing_song: z.enum(wild3PlayingSongs).optional(),
    movement: z.enum(["OnFoot", "Bike", "Surf"]).optional(),
  })
  .transform(({ weather, playing_song, movement }): Wild3AudioInfluences => {
    const legacyPlayingSongs = {
      OnFoot: "MapSong",
      Bike: "BikeSong",
      Surf: "SurfSong",
    } as const satisfies Record<string, PlayingSong>;

    return {
      weather,
      playing_song: playing_song ?? legacyPlayingSongs[movement ?? "OnFoot"],
    };
  });

export type Wild3SearchAudioInfluences = {
  considerWeather: boolean;
  hasUnlockedBike: boolean;
};

export const formatWild3Weather = (weather: Wild3Weather): string => weather;
export const formatPlayingSong = (playingSong: PlayingSong): string =>
  ({ MapSong: "Map song", BikeSong: "Bike song", SurfSong: "Surf song" })[
    playingSong
  ];

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
  playingSongs: PlayingSong[];
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
      weathers.find((weather) => weather === "Sunny") ??
      weathers[0] ??
      "Sunny",
    playing_song:
      playingSongs.find(
        (playing_song) => playing_song === preferred.playing_song,
      ) ??
      playingSongs.find((playing_song) => playing_song === "MapSong") ??
      playingSongs[0] ??
      "MapSong",
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
    const playingSong = formatPlayingSong(entry.playing_song).toLowerCase();

    return `Optimal setup: ${showWeather ? `${weather} weather, ` : ""}${playingSong} playing.`;
  };

  if (
    data.every(
      (entry) =>
        entry.weather === first.weather &&
        entry.playing_song === first.playing_song,
    )
  ) {
    return [audioInfluenceLabel(first)];
  }

  return data.map(
    (entry) =>
      `${formatProbability(entry.method_probability)} (${entry.lead_pid_cycle_count} cycles): ${audioInfluenceLabel(entry)}`,
  );
};
