import type { CdfKnot } from "~/rngTools";
import type {
  CalibrationComponent,
  RawCdfKnot,
} from "./initial_cycle_calibration_types";

export const getInitialCycleSummary = (
  knots: readonly CdfKnot[],
): { min: number; max: number; median: number; average: number } | null => {
  const first = knots[0];
  const last = knots.at(-1);
  if (first == null || last == null) {
    return null;
  }

  let average = 0;
  let median = first.cycle;
  for (let index = 1; index < knots.length; index++) {
    const left = knots[index - 1];
    const right = knots[index];
    const mass = right.probability - left.probability;
    average += (mass * (left.cycle + right.cycle)) / 2;

    if (left.probability < 0.5 && right.probability >= 0.5) {
      median =
        left.cycle +
        ((0.5 - left.probability) * (right.cycle - left.cycle)) / mass;
    }
  }

  return { min: first.cycle, max: last.cycle, median, average };
};

export const cdfLessThan = (
  knots: readonly RawCdfKnot[],
  cycle: number,
): number => {
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
};

const cdfIntegral = (knots: readonly RawCdfKnot[], cycle: number): number => {
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
};

const convolvedLessThan = (
  audio: CalibrationComponent,
  nonAudio: CalibrationComponent,
  cycle: number,
): number => {
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
};

const atomCycles = (component: CalibrationComponent): number[] => {
  return component.cdf.flatMap((knot, index, knots) => {
    const previous = knots[index - 1];

    return previous != null && previous[0] === knot[0] && previous[1] < knot[1]
      ? [knot[0]]
      : [];
  });
};

export const combineCalibrationComponents = (
  audio: CalibrationComponent,
  nonAudio: CalibrationComponent,
): CdfKnot[] => {
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
};
