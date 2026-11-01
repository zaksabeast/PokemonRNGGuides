import * as _ from "lodash-es";
import type {
  CdfKnot,
  Wild3PlayingSong,
  Wild3Action,
  Wild3Weather,
} from "~/rngTools";
import {
  calibrationComponents,
  type InitialCycleDataset,
} from "./initial_cycle_dataset";
import { getInitialCycleMapGameData } from "./initial_cycle_map_game_data";
import { combineCalibrationComponents } from "./cdf";
import { getInitialCycleSummary } from "../initial_cycle_main";

type InitialCycleSetup = Pick<
  InitialCycleDataset,
  "mapId" | "weather" | "playingSong" | "action"
>;

export type InitialCycleInfo = {
  distribution: CdfKnot[];
  summary: { min: number; max: number; median: number; average: number };
};

const normalizeAction = (action: Wild3Action): Wild3Action =>
  action === "OldRod" || action === "GoodRod" ? "SuperRod" : action;

const haveSameMapSong = (left: string, right: string): boolean => {
  return (
    getInitialCycleMapGameData(left).song ===
    getInitialCycleMapGameData(right).song
  );
};

export const haveSamePlayingSong = (
  left: InitialCycleSetup,
  right: InitialCycleSetup,
): boolean => {
  if (left.playingSong !== right.playingSong) {
    return false;
  }

  if (left.playingSong === "MapSong") {
    return haveSameMapSong(left.mapId, right.mapId);
  }

  return true;
};

const getMatchingRank = (
  candidate: InitialCycleDataset,
  input: InitialCycleSetup,
  isAudio: boolean,
): number => {
  const action =
    normalizeAction(candidate.action) === normalizeAction(input.action);
  const map = candidate.mapId === input.mapId;
  const mapSong = haveSameMapSong(candidate.mapId, input.mapId);
  const playingSong = haveSamePlayingSong(candidate, input);
  const weather = candidate.weather === input.weather;
  const exact =
    action && map && candidate.playingSong === input.playingSong && weather;
  const criteria = isAudio
    ? [exact, action, playingSong, weather, mapSong]
    : [exact, action, map, weather, mapSong, playingSong];

  return criteria.reduce((rank, matches) => rank * 2 + Number(matches), 0);
};

export const selectInitialCycleDataset = (
  datasets: readonly InitialCycleDataset[],
  input: InitialCycleSetup,
  isAudio: boolean,
): InitialCycleDataset => {
  const best =
    _.maxBy(
      datasets.filter((candidate) => candidate.isAudio === isAudio),
      (candidate) => getMatchingRank(candidate, input, isAudio),
    ) ?? datasets[0];

  return isAudio ? best : adjustNonAudioComponent(best, input).component;
};

// Audio has a constant impact on non-audio cycle because the player sprite is different.
// Sprite size for MapSong (foot) < BikeSong < SurfSong.
// This conversion chart reduces the number of dataset required.
// Ex: Instead of needing both ROUTE102-SurfSong-SuperRod and ROUTE102-MapSong-SuperRod,
// we can use ROUTE102-MapSong-SuperRod = ROUTE102-SurfSong-SuperRod - 5421 (for non-audio only).
const audioImpactOnNonAudio: Partial<
  Record<Wild3PlayingSong, Partial<Record<Wild3PlayingSong, number>>>
> = {
  MapSong: { MapSong: 0, BikeSong: 1772, SurfSong: 5421 },
  BikeSong: { MapSong: -1772, BikeSong: 0, SurfSong: -3649 },
  SurfSong: { MapSong: -5421, BikeSong: 3649, SurfSong: 0 },
};

export const adjustNonAudioComponent = (
  source: InitialCycleDataset,
  input: InitialCycleSetup,
): { component: InitialCycleDataset; adjustment: number } => {
  const adjustment =
    audioImpactOnNonAudio[source.playingSong]?.[input.playingSong] ?? 0;
  if (adjustment === 0) {
    return { component: source, adjustment };
  }

  return {
    adjustment,
    component: {
      ...source,
      summary: {
        min: source.summary.min + adjustment,
        mid: source.summary.mid + adjustment,
        max: source.summary.max + adjustment,
      },
      cdf: source.cdf.map(([cycle, probability, integral]) => [
        cycle + adjustment,
        probability,
        integral,
      ]),
    },
  };
};

const mergeCalibrationComponents = _.memoize(
  (
    audio: InitialCycleDataset,
    nonAudio: InitialCycleDataset,
  ): InitialCycleInfo => {
    const distribution = combineCalibrationComponents(audio, nonAudio);

    return {
      distribution,
      summary: getInitialCycleSummary(distribution),
    };
  },
  (audio, nonAudio) => `${audio.id}:${nonAudio.id}:${nonAudio.summary.min}`,
);

export const getInitialCycleInfo = (
  mapId: string,
  weather: Wild3Weather,
  playingSong: Wild3PlayingSong,
  action: Wild3Action,
): InitialCycleInfo => {
  const input = { mapId, weather, playingSong, action };
  const audio = selectInitialCycleDataset(calibrationComponents, input, true);
  const nonAudio = selectInitialCycleDataset(
    calibrationComponents,
    input,
    false,
  );

  return mergeCalibrationComponents(audio, nonAudio);
};
