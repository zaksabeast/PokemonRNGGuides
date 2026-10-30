import type {
  CdfKnot,
  Wild3Action,
  Wild3InitialCycleDistribution,
  Wild3MapGameData,
  PlayingSong,
  Wild3Weather,
} from "~/rngTools";
import {
  calibrationComponents,
  mapCalibrationSources,
} from "./initial_cycle_calibration_data";
import { mapCalibrationSettings } from "./initial_cycle_calibration_maps";
import { wild3Actions } from "../utils";
import type {
  CalibrationComponent,
  MapCalibrationSource,
  RawCdfKnot,
} from "./initial_cycle_calibration_types";

// NO_PROD fishing : bike instead of walk => +1,772 cycles non-audio cycles.
// NO_PROD fishing : surf instead of walk => +5,420.63 cycles non-audio cycles.

/*
TODO: Make a plan to write this file again with this logic

The file exports a function call
getInitialCycleInfo(mapId, weather, playingSong, action)
  if action is OldRod or GoodRod, consider it like its SuperRod

  that function must find the audio data for a dataset from src\rngToolsUi\gen3\wild\data\initial_cycle_calibration_data.ts that matches the most the input.
  Do the same for non-audio data.
  merge both of them, using functions in initial_cycle_utils.ts

  important note: two maps have the same playingSong if:
    - both are SurfSong
    - both are BikeSong
    - both are MapSong AND they have the same song according to src\rngToolsUi\gen3\wild\data\initial_cycle_calibration_maps.ts

  the criteria to find the most matching data set for AUDIO data:
    1. If all criterias are the same
    2. action > playingSong > weather
    3. In case multiple possibilities: pick the map with the same MapSong. Otherwise, pick the first result.



*/
