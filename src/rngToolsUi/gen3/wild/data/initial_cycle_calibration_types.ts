import type { PlayingSong, Wild3Action, Wild3Weather } from "~/rngTools";

export type RawCdfKnot = readonly [
  cycle: number,
  probability: number,
  integral: number,
];

export type CalibrationComponent = {
  is_fake: boolean;
  summary: { min: number; mid: number; max: number };
  cdf: RawCdfKnot[];
  provenance: {
    source: string;
    [key: string]: string | number | boolean;
  };
};

export type CalibrationComponentEntry = CalibrationComponent & {
  id: string;
  mapId: string;
  weather: Wild3Weather;
  playingSong: PlayingSong;
  action: Wild3Action;
  isAudio: boolean;
};

export type MapCalibrationSource = {
  map_internal_idx: number;
  song: string;
  non_audio: string;
  joint_correction: string | null;
  mode?: "fishing";
  playing_song?: "BikeSong" | "SurfSong";
  weather?: "Rain";
  action?: "SweetScentWater";
};
