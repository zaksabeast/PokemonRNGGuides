import type {
  PlayingSong,
  Wild3Action,
  Wild3InitialCycleDistribution,
  Wild3MapGameData,
  Wild3Weather,
} from "~/rngTools";
import { isFishingAction, wild3Actions } from "../utils";
import { getInitialCycleInfo } from "./initial_cycle_calibration";
import {
  getMapCalibrationSettings,
  getMapCalibrationSong,
} from "./initial_cycle_calibration_maps";

type CalibrationMap = Pick<Wild3MapGameData, "map_id" | "slots_by_action">;

export type Wild3ActionCapabilities = {
  possible_weather_by_action: Record<Wild3Action, Wild3Weather[]>;
  possible_playing_song_by_action: Record<Wild3Action, PlayingSong[]>;
};

const actionWeathers = (mapId: string, action: Wild3Action): Wild3Weather[] => {
  const settings = getMapCalibrationSettings(mapId);

  switch (action) {
    case "SweetScentLand":
      return settings.weathers_sweet_scent_land;
    case "SweetScentWater":
      return settings.weathers_sweet_scent_water;
    case "RockSmash":
      return settings.weathers_rocksmash;
    default:
      return settings.weathers_fishing;
  }
};

const actionPlayingSongs = (
  map: CalibrationMap,
  action: Wild3Action,
): PlayingSong[] => {
  if (
    map.map_id === "MAP_UNDERWATER_ROUTE124" ||
    map.map_id === "MAP_UNDERWATER_ROUTE126"
  ) {
    return ["DivingSong"];
  }

  if (action === "SweetScentWater") {
    return ["SurfSong"];
  }

  if (map.map_id === "MAP_ROUTE119" && isFishingAction(action)) {
    // Requires surfing to access Feebas tile.
    return ["SurfSong"];
  }

  const songs: PlayingSong[] = ["MapSong"];
  const mapSettings = getMapCalibrationSettings(map.map_id);
  if (
    mapSettings.can_bike &&
    (action !== "SweetScentLand" || mapSettings.can_bike_for_sweet_scent_land)
  ) {
    songs.push("BikeSong");
  }

  if (isFishingAction(action)) {
    songs.push("SurfSong");
  }

  return songs;
};

export const getWild3ActionCapabilities = (
  map: CalibrationMap,
): Wild3ActionCapabilities => {
  const available = (action: Wild3Action): boolean =>
    (map.slots_by_action[wild3Actions.indexOf(action)]?.length ?? 0) > 0;
  const weathers = (action: Wild3Action): Wild3Weather[] =>
    available(action) ? actionWeathers(map.map_id, action) : [];
  const songs = (action: Wild3Action): PlayingSong[] =>
    available(action) ? actionPlayingSongs(map, action) : [];

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

export const getWild3VblankDistributions = (
  map: CalibrationMap,
): Wild3InitialCycleDistribution[] => {
  const capabilities = getWild3ActionCapabilities(map);

  return wild3Actions.flatMap((action) =>
    capabilities.possible_weather_by_action[action].flatMap((weather) =>
      capabilities.possible_playing_song_by_action[action].map(
        (playing_song) => {
          const info = getInitialCycleInfo(
            map.map_id,
            weather,
            playing_song,
            action,
          );
          const calibratedAction =
            action === "OldRod" || action === "GoodRod" ? "SuperRod" : action;
          const measured =
            !info.audio.is_fake &&
            info.nonAudio.mapId === map.map_id &&
            info.nonAudio.action === calibratedAction &&
            info.nonAudio.weather === weather &&
            info.nonAudio.playingSong === playing_song &&
            info.audio.action === calibratedAction &&
            info.audio.weather === weather &&
            info.audio.playingSong === playing_song &&
            (playing_song !== "MapSong" ||
              getMapCalibrationSong(info.audio.mapId) ===
                getMapCalibrationSong(map.map_id));

          return {
            action,
            weather,
            playing_song,
            // Approximate distributions must not exclude viable search results.
            min: measured ? Math.floor(info.summary.min) : 0,
            max: measured ? Math.ceil(info.summary.max) : 280_895,
            distribution: info.distribution,
          };
        },
      ),
    ),
  );
};
