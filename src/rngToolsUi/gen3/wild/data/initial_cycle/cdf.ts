import type { CdfKnot } from "~/rngTools";
import { InitialCycleDataset } from "./initial_cycle_dataset";
import { formatLargeInteger } from "~/utils/formatLargeInteger";
import { formatProbability } from "~/utils/formatProbability";

// A Cumulative Distribution Function (CDF) gives the probability that a random variable
// will take a value less than or equal to a specific value.

export type RawCdfKnot = readonly [
  cycle: number,
  probability: number,
  integral: number,
];

export type QualitativeProbability =
  | "Impossible"
  | "Very unlikely"
  | "Unlikely"
  | "Common"
  | "Very Common";

const INITIAL_CYCLE_PROXIMITY = 3000;

const getNearbyCycleProbability = (
  knots: readonly CdfKnot[],
  value: number,
): number => {
  const start = value - INITIAL_CYCLE_PROXIMITY;
  const end = value + INITIAL_CYCLE_PROXIMITY;
  let probability = 0;
  for (let index = 1; index < knots.length; index++) {
    const left = knots[index - 1];
    const right = knots[index];
    const mass = right.probability - left.probability;
    if (mass <= 0 || right.cycle < start || left.cycle > end) {
      continue;
    }

    const width = right.cycle - left.cycle;
    const overlap = Math.max(
      0,
      Math.min(end, right.cycle) - Math.max(start, left.cycle),
    );
    probability += width === 0 ? mass : (mass * overlap) / width;
  }

  return probability;
};

const getQualitativeProbability = (
  probability: number,
  uniformProbability: number,
): QualitativeProbability => {
  if (probability <= 0) {
    return "Impossible";
  }

  const relativeProbability = probability / uniformProbability;
  if (relativeProbability < 0.05) {
    return "Very unlikely";
  }

  if (relativeProbability < 0.25) {
    return "Unlikely";
  }

  if (relativeProbability < 1.5) {
    return "Common";
  }

  return "Very Common";
};

export const getInitialCycleQualitativeProbability = (
  knots: readonly CdfKnot[],
  value: number,
) => {
  const first = knots[0];
  const last = knots[knots.length - 1];

  const start = value - INITIAL_CYCLE_PROXIMITY;
  const end = value + INITIAL_CYCLE_PROXIMITY;
  const overlap = Math.max(
    0,
    Math.min(end, last.cycle) - Math.max(start, first.cycle),
  );
  const width = last.cycle - first.cycle;
  const uniformProbability = width === 0 ? 1 : overlap / width;
  const probability = getNearbyCycleProbability(knots, value);
  const qualitative = getQualitativeProbability(
    probability,
    uniformProbability,
  );

  return {
    probabilityTxt: `${formatProbability(probability)} chance that the initial cycle is within (${formatLargeInteger(start)}, ${formatLargeInteger(end)})`,
    qualitativeTxt: qualitative,
  };
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
  audio: InitialCycleDataset,
  nonAudio: InitialCycleDataset,
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

const atomCycles = (component: InitialCycleDataset): number[] => {
  return component.cdf.flatMap((knot, index, knots) => {
    const previous = knots[index - 1];

    return previous != null && previous[0] === knot[0] && previous[1] < knot[1]
      ? [knot[0]]
      : [];
  });
};

const CDF_INTERVAL_COUNT = 64;

export const combineCalibrationComponents = (
  audio: InitialCycleDataset,
  nonAudio: InitialCycleDataset,
): CdfKnot[] => {
  const min = audio.summary.min + nonAudio.summary.min;
  const max = audio.summary.max + nonAudio.summary.max;
  const jumps = atomCycles(audio).flatMap((audioCycle) =>
    atomCycles(nonAudio).map((nonAudioCycle) => audioCycle + nonAudioCycle),
  );
  const samples = Array.from(
    { length: CDF_INTERVAL_COUNT + 1 },
    (_, index) => min + ((max - min) * index) / CDF_INTERVAL_COUNT,
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

export const getInitialCycleSummary = (
  knots: readonly CdfKnot[],
): { min: number; max: number; median: number; average: number } => {
  const first = knots[0];
  const last = knots[knots.length - 1];

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

  return {
    min: Math.floor(first.cycle),
    max: Math.ceil(last.cycle),
    median: Math.ceil(median),
    average,
  };
};
