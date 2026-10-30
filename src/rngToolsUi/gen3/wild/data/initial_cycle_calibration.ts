import type {
  CdfKnot,
  PlayingSong,
  Wild3Action,
  Wild3Weather,
} from "~/rngTools";
import { calibrationComponents } from "./initial_cycle_calibration_data";
import { mapCalibrationSettings } from "./initial_cycle_calibration_maps";
import type { CalibrationComponentEntry } from "./initial_cycle_calibration_types";
import {
  combineCalibrationComponents,
  getInitialCycleSummary,
} from "./initial_cycle_utils";

type Setup = Pick<
  CalibrationComponentEntry,
  "mapId" | "weather" | "playingSong" | "action"
>;

export type InitialCycleInfo = {
  audio: CalibrationComponentEntry;
  nonAudio: CalibrationComponentEntry;
  nonAudioAdjustment: number;
  distribution: CdfKnot[];
  summary: { min: number; max: number; median: number; average: number };
};

const normalizeAction = (action: Wild3Action): Wild3Action =>
  action === "OldRod" || action === "GoodRod" ? "SuperRod" : action;

const sameMapSong = (left: string, right: string): boolean => {
  const song = mapCalibrationSettings[left]?.song;

  return song != null && song === mapCalibrationSettings[right]?.song;
};

const samePlayingSong = (left: Setup, right: Setup): boolean =>
  left.playingSong === right.playingSong &&
  (left.playingSong !== "MapSong" || sameMapSong(left.mapId, right.mapId));

const matchingRank = (
  candidate: CalibrationComponentEntry,
  input: Setup,
  isAudio: boolean,
): number => {
  const action =
    normalizeAction(candidate.action) === normalizeAction(input.action);
  const map = candidate.mapId === input.mapId;
  const mapSong = sameMapSong(candidate.mapId, input.mapId);
  const playingSong = samePlayingSong(candidate, input);
  const weather = candidate.weather === input.weather;
  const exact =
    action && map && candidate.playingSong === input.playingSong && weather;
  const criteria = isAudio
    ? [exact, action, playingSong, weather, mapSong]
    : [exact, action, map, mapSong, playingSong, weather];

  return criteria.reduce((rank, matches) => rank * 2 + Number(matches), 0);
};

export const selectCalibrationComponent = (
  datasets: readonly CalibrationComponentEntry[],
  input: Setup,
  isAudio: boolean,
): CalibrationComponentEntry => {
  let best: CalibrationComponentEntry | undefined;
  let bestRank = -1;
  for (const candidate of datasets) {
    // Joint entries contain both costs and cannot be convolved as non-audio.
    if (candidate.isAudio !== isAudio || candidate.id.endsWith("_JOINT")) {
      continue;
    }

    const rank = matchingRank(candidate, input, isAudio);
    if (rank > bestRank) {
      best = candidate;
      bestRank = rank;
    }
  }

  if (best == null) {
    throw new Error(`No ${isAudio ? "audio" : "non-audio"} calibration data`);
  }

  return best;
};

// Measured movement differences; the direct BikeSong/SurfSong adjustments follow the recording specification.
const songAdjustments: Partial<
  Record<PlayingSong, Partial<Record<PlayingSong, number>>>
> = {
  MapSong: { MapSong: 0, BikeSong: 1772, SurfSong: 5421 },
  BikeSong: { MapSong: -1772, BikeSong: 0, SurfSong: -3649 },
  SurfSong: { MapSong: -5421, BikeSong: 3649, SurfSong: 0 },
};

export const adjustNonAudioComponent = (
  source: CalibrationComponentEntry,
  input: Setup,
): { component: CalibrationComponentEntry; adjustment: number } => {
  const eligible =
    normalizeAction(source.action) === normalizeAction(input.action) &&
    (source.mapId === input.mapId || sameMapSong(source.mapId, input.mapId));
  const adjustment = eligible
    ? (songAdjustments[source.playingSong]?.[input.playingSong] ?? 0)
    : 0;
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

const mergedDistributions = new Map<
  string,
  Pick<InitialCycleInfo, "distribution" | "summary">
>();

export const getInitialCycleInfo = (
  mapId: string,
  weather: Wild3Weather,
  playingSong: PlayingSong,
  action: Wild3Action,
): InitialCycleInfo => {
  const input = { mapId, weather, playingSong, action };
  const audio = selectCalibrationComponent(calibrationComponents, input, true);
  const source = selectCalibrationComponent(
    calibrationComponents,
    input,
    false,
  );
  const { component: nonAudio, adjustment } = adjustNonAudioComponent(
    source,
    input,
  );
  const key = `${audio.id}:${source.id}:${adjustment}`;
  let merged = mergedDistributions.get(key);
  if (merged == null) {
    const distribution = combineCalibrationComponents(audio, nonAudio);
    const summary = getInitialCycleSummary(distribution);
    if (summary == null) {
      throw new Error(`Empty combined calibration: ${key}`);
    }

    merged = { distribution, summary };
    mergedDistributions.set(key, merged);
  }

  return { audio, nonAudio, nonAudioAdjustment: adjustment, ...merged };
};
