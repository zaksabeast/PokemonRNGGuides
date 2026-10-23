import type {
  CdfKnot,
  Wild3Action,
  Wild3MapCycleCalibration,
  Wild3MapGameData,
  Wild3MovementMode,
  Wild3Weather,
} from "~/rngTools";
import {
  calibrationComponents,
  mapCalibrationSources,
} from "./vblank_calibration_data";
import { mapCalibrationSettings } from "./vblank_calibration_maps";
import type {
  CalibrationComponent,
  RawCdfKnot,
} from "./vblank_calibration_types";

const VBLANK_FREQ = 280_896;
const components: Partial<Record<string, CalibrationComponent>> =
  calibrationComponents;
const combinedCdfs = new Map<string, CdfKnot[]>();

type CalibrationMap = Pick<
  Wild3MapGameData,
  "map_id" | "map_internal_idx" | "slots_by_action"
>;
type Setup = Pick<Wild3MapCycleCalibration, "action" | "movement" | "weather">;

export type Wild3CalibrationInfo = {
  calibration: Wild3MapCycleCalibration;
  audio: CalibrationComponent;
  non_audio: CalibrationComponent;
  joint_correction: CalibrationComponent | null;
  fallback: boolean;
};

export function cdfLessThan(
  knots: readonly RawCdfKnot[],
  cycle: number,
): number {
  let low = 0;
  let high = knots.length;
  while (low < high) {
    const mid = (low + high) >>> 1;
    if (knots[mid][0] < cycle) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }

  if (low === 0) {
    return 0;
  }

  const left = knots[low - 1];
  const right = knots[low];
  if (right == null) {
    return 1;
  }

  if (cycle === right[0]) {
    return right[1];
  }

  return (
    left[1] + ((right[1] - left[1]) * (cycle - left[0])) / (right[0] - left[0])
  );
}

function cdfIntegral(knots: readonly RawCdfKnot[], cycle: number): number {
  const index = knots.findIndex((knot) => knot[0] > cycle);
  if (index === 0) {
    return 0;
  }

  const left = knots[index < 0 ? knots.length - 1 : index - 1];
  const width = cycle - left[0];
  if (index < 0) {
    return left[2] + width;
  }

  const right = knots[index];

  return (
    left[2] +
    width * left[1] +
    (width * width * (right[1] - left[1])) / (right[0] - left[0]) / 2
  );
}

function convolvedLessThan(
  audio: CalibrationComponent,
  nonAudio: CalibrationComponent,
  cycle: number,
): number {
  let probability = 0;
  for (let index = 1; index < nonAudio.cdf.length; index++) {
    const left = nonAudio.cdf[index - 1];
    const right = nonAudio.cdf[index];
    const mass = right[1] - left[1];
    if (mass <= 0) {
      continue;
    }

    if (left[0] === right[0]) {
      probability += mass * cdfLessThan(audio.cdf, cycle - left[0]);
      continue;
    }

    probability +=
      (mass / (right[0] - left[0])) *
      (cdfIntegral(audio.cdf, cycle - left[0]) -
        cdfIntegral(audio.cdf, cycle - right[0]));
  }

  return Math.max(0, Math.min(1, probability));
}

function atomCycles(component: CalibrationComponent): number[] {
  return component.cdf.flatMap((knot, index, knots) => {
    const previous = knots[index - 1];

    return previous != null && previous[0] === knot[0] && previous[1] < knot[1]
      ? [knot[0]]
      : [];
  });
}

export function combineCalibrationComponents(
  audio: CalibrationComponent,
  nonAudio: CalibrationComponent,
): CdfKnot[] {
  const min = audio.summary.min + nonAudio.summary.min;
  const max = audio.summary.max + nonAudio.summary.max;
  const jumps = atomCycles(audio).flatMap((audioCycle) =>
    atomCycles(nonAudio).map((nonAudioCycle) => audioCycle + nonAudioCycle),
  );
  const samples = Array.from(
    { length: 65 },
    (_, index) => min + ((max - min) * index) / 64,
  );
  const cycles = [...new Set([...samples, ...jumps])].sort(
    (left, right) => left - right,
  );

  return cycles.flatMap((cycle) => {
    const probability = convolvedLessThan(audio, nonAudio, cycle);
    const knot = { cycle, probability };
    if (!jumps.includes(cycle)) {
      return [knot];
    }

    return [
      knot,
      { cycle, probability: convolvedLessThan(audio, nonAudio, cycle + 1e-7) },
    ];
  });
}

function defaultSong(map: CalibrationMap): string {
  // Route 118 plays Route 110 west of the river and Route 119 to the east.
  return mapCalibrationSettings[map.map_id]?.song ?? "ROUTE101";
}

function audioComponentName(song: string, setup: Setup): string {
  const weather = setup.weather.toUpperCase();
  const fishing =
    setup.action === "OldRod" ||
    setup.action === "GoodRod" ||
    setup.action === "SuperRod";
  if (setup.movement === "Bike") {
    return `CYCLING_${fishing ? "FISHING_" : ""}${weather}_AUDIO`;
  }

  if (setup.movement === "Surf") {
    return `SURF_${fishing ? "FISHING_" : ""}${weather}_AUDIO`;
  }

  if (fishing) {
    return `${song}_FISHING_${weather}_AUDIO`;
  }

  if (setup.weather === "Sunny" && components[`${song}_AUDIO`] != null) {
    return `${song}_AUDIO`;
  }

  return `${song}_${weather}_AUDIO`;
}

function weatherForAction(
  map: CalibrationMap,
  action: Wild3Action,
): Wild3Weather[] {
  const settings = mapCalibrationSettings[map.map_id];

  switch (action) {
    case "SweetScentLand":
      return settings?.weathers_sweet_scent_land ?? ["Sunny"];
    case "SweetScentWater":
      return settings?.weathers_sweet_scent_water ?? ["Sunny"];
    case "OldRod":
    case "GoodRod":
    case "SuperRod":
      return settings?.weathers_fishing ?? ["Sunny"];
    case "RockSmash":
      return settings?.weathers_rocksmash ?? ["Sunny"];
  }
}

function movementForAction(
  map: CalibrationMap,
  action: Wild3Action,
): Wild3MovementMode[] {
  if (action === "SweetScentWater") {
    return ["Surf"];
  }

  const land: Wild3MovementMode[] = mapCalibrationSettings[map.map_id]?.can_bike
    ? ["OnFoot", "Bike"]
    : ["OnFoot"];
  if (action === "OldRod" || action === "GoodRod" || action === "SuperRod") {
    return [...land, "Surf"];
  }

  return land;
}

function mapSetups(map: CalibrationMap): Setup[] {
  const actions: Wild3Action[] = [
    "SweetScentLand",
    "SweetScentWater",
    "OldRod",
    "GoodRod",
    "SuperRod",
    "RockSmash",
  ];

  return actions.flatMap((action, index) => {
    if ((map.slots_by_action[index]?.length ?? 0) === 0) {
      return [];
    }

    return movementForAction(map, action).flatMap((movement) =>
      weatherForAction(map, action).map((weather) => ({
        action,
        movement,
        weather,
      })),
    );
  });
}

function composeCalibration(
  map: CalibrationMap,
  setup: Setup,
): Wild3CalibrationInfo {
  const song = defaultSong(map);
  const source =
    mapCalibrationSources.find(
      (source) => source.map_internal_idx === map.map_internal_idx,
    ) ??
    mapCalibrationSources.find((source) => source.song === song) ??
    mapCalibrationSources[0];
  const audioName = audioComponentName(song, setup);
  const audio = components[audioName] ?? calibrationComponents.ROUTE101_AUDIO;
  const nonAudio =
    components[source.non_audio] ?? calibrationComponents.ROUTE101_NON_AUDIO;
  const exact =
    source.map_internal_idx === map.map_internal_idx &&
    setup.action === "SweetScentLand" &&
    setup.movement === "OnFoot" &&
    setup.weather === "Sunny" &&
    source.song === song;
  const joint =
    exact && source.joint_correction != null
      ? (components[source.joint_correction] ?? null)
      : null;
  const fallback = !exact || audio.is_fake || components[audioName] == null;
  const key = `${audioName}:${source.non_audio}:${joint == null ? "" : source.joint_correction}`;
  let distribution = combinedCdfs.get(key);
  if (distribution == null) {
    distribution =
      joint == null
        ? combineCalibrationComponents(audio, nonAudio)
        : joint.cdf.map(([cycle, probability]) => ({ cycle, probability }));
    combinedCdfs.set(key, distribution);
  }

  const margin =
    audio.provenance.safety_margin_cycles +
    nonAudio.provenance.safety_margin_cycles;

  return {
    calibration: {
      ...setup,
      min: fallback
        ? 0
        : Math.max(0, audio.summary.min + nonAudio.summary.min - margin),
      max: fallback
        ? VBLANK_FREQ - 1
        : Math.min(
            VBLANK_FREQ - 1,
            audio.summary.max + nonAudio.summary.max + margin,
          ),
      distribution,
    },
    audio,
    non_audio: nonAudio,
    joint_correction: joint,
    fallback,
  };
}

export function getWild3CalibrationInfo(
  map: CalibrationMap,
): Wild3CalibrationInfo[] {
  return mapSetups(map).map((setup) => composeCalibration(map, setup));
}

export function getWild3VblankDistributions(
  map: CalibrationMap,
): Wild3MapCycleCalibration[] {
  return getWild3CalibrationInfo(map).map((info) => info.calibration);
}
