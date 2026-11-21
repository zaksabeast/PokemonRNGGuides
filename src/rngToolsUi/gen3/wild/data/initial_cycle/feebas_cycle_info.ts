import type {
  CdfKnot,
  Wild3Action,
  Wild3InitialCycleDistribution,
  Wild3Weather,
} from "~/rngTools";
import {
  feebasCycleDataset,
  type FeebasCycleDatasetGroup,
  type FeebasCycleScenario,
} from "./feebas_cycle_dataset";
import { isFishingAction, wild3Actions } from "~/rngToolsUi/gen3/wild/utils";
import { range } from "lodash-es";

// No need to separate audio and non-audio dataset because non-audio is
// very consistent (6818 around 90% of the time, otherwise 6836).

const MAX_FEEBAS_VBLANK_COUNT = 5; // The maximum vblank count according to current distributions is 3.
const FEEBAS_UNIFORM_SMOOTHING_WEIGHT = 0.001;
const VBLANK_FREQ = 280_896;
const FISHING_ACTIONS: Wild3Action[] = wild3Actions.filter((action) =>
  isFishingAction(action),
);

const simulateCheckFeebasScenario = (
  scenario: FeebasCycleScenario,
  feebasCycle: number,
): { vblankCount: number; cycle: number } => {
  const [startCycle, vblankDurations] = scenario;
  let remainingCycles = feebasCycle;
  let cycle = startCycle;
  let vblankCount = 0;

  while (remainingCycles >= VBLANK_FREQ - cycle) {
    remainingCycles -= VBLANK_FREQ - cycle;
    cycle = vblankDurations[vblankCount % vblankDurations.length];
    vblankCount++;
  }

  return { vblankCount, cycle: cycle + remainingCycles };
};

const getWeightedCdf = (cycleWeights: Map<number, number>): CdfKnot[] => {
  if (cycleWeights.size === 0) {
    return [];
  }

  const sortedCycleWeights = [...cycleWeights].sort(
    ([left], [right]) => left - right,
  );
  const totalWeight = sortedCycleWeights.reduce(
    (sum, [, weight]) => sum + weight,
    0,
  );
  const minCycle = sortedCycleWeights[0][0];
  const maxCycle = sortedCycleWeights[sortedCycleWeights.length - 1][0];
  const distribution: CdfKnot[] = [{ cycle: minCycle, probability: 0 }];
  let cumulativeWeight = 0;

  for (const [index, [cycle, weight]] of sortedCycleWeights.entries()) {
    const knotCycle =
      cycle === minCycle
        ? (minCycle + (sortedCycleWeights[index + 1]?.[0] ?? maxCycle)) / 2
        : cycle;
    const observedProbability = (cumulativeWeight + weight / 2) / totalWeight;
    const uniformProbability =
      maxCycle === minCycle
        ? observedProbability
        : (knotCycle - minCycle) / (maxCycle - minCycle);

    distribution.push({
      cycle: knotCycle,
      probability:
        observedProbability * (1 - FEEBAS_UNIFORM_SMOOTHING_WEIGHT) +
        uniformProbability * FEEBAS_UNIFORM_SMOOTHING_WEIGHT,
    });
    cumulativeWeight += weight;
  }

  distribution.push({ cycle: maxCycle, probability: 1 });

  return distribution;
};

class CycleWeightsByVblankCount {
  // map[vblankCount][cycle] = weight
  private map = new Map<number, Map<number, number>>(
    range(MAX_FEEBAS_VBLANK_COUNT).map((vblank) => [vblank, new Map()]),
  );
  totalWeight = 0;

  addScenarioResult(vblankCount: number, cycle: number, weight: number): void {
    const weightByCycle =
      this.map.get(vblankCount) ?? new Map<number, number>();
    weightByCycle.set(cycle, (weightByCycle.get(cycle) ?? 0) + weight);
    this.map.set(vblankCount, weightByCycle);
    this.totalWeight += weight;
  }

  getResults(): {
    feebas_vblank_count: number;
    weightByCycle: Map<number, number>;
    feebas_vblank_count_probability: number;
  }[] {
    return [...this.map]
      .filter(([, weightByCycle]) => weightByCycle.size > 0)
      .sort(([left], [right]) => left - right)
      .map(([feebas_vblank_count, weightByCycle]) => ({
        feebas_vblank_count,
        weightByCycle,
        feebas_vblank_count_probability:
          [...weightByCycle.values()].reduce((sum, weight) => sum + weight, 0) /
          this.totalWeight,
      }));
  }
}

const getFeebasCycleDistributionsFromContext = (
  feebasCycle: number,
  context: FeebasCycleDatasetGroup,
): Wild3InitialCycleDistribution[] => {
  const cycleWeightsByVblankCount = new CycleWeightsByVblankCount();

  for (const scenario of context.scenarios) {
    const { vblankCount, cycle } = simulateCheckFeebasScenario(
      scenario,
      feebasCycle,
    );
    const weight = scenario[2];
    cycleWeightsByVblankCount.addScenarioResult(vblankCount, cycle, weight);
  }

  return cycleWeightsByVblankCount
    .getResults()
    .flatMap(
      ({
        feebas_vblank_count,
        weightByCycle,
        feebas_vblank_count_probability,
      }) => {
        const distribution = getWeightedCdf(weightByCycle);

        return FISHING_ACTIONS.map((action) => ({
          feebas_vblank_count,
          feebas_vblank_count_probability,
          feebas_cycle: feebasCycle,
          min: distribution[0]?.cycle ?? 0,
          max: distribution[distribution.length - 1]?.cycle ?? 0,
          distribution,
          action,
          playing_song: FEEBAS_SONG,
          weather: context.weather,
        }));
      },
    );
};

const getFeebasCycleDistributionsForAllVblankCounts = (
  feebasCycle: number,
  weather: Wild3Weather,
): Wild3InitialCycleDistribution[] => {
  const cachedDistributions = feebasCycleDistributionsCache.get(feebasCycle);

  if (cachedDistributions != null) {
    return cachedDistributions.filter((distr) => {
      return distr.weather === weather;
    });
  }

  const context = feebasCycleDataset.find(
    (candidate) => candidate.weather === weather,
  );
  if (context == null) {
    return [];
  }

  return getFeebasCycleDistributionsFromContext(feebasCycle, context);
};

const feebasCycleDistributionsCache = new Map<
  number,
  Wild3InitialCycleDistribution[]
>();
const feebasWeathers: Wild3Weather[] = ["Sunny", "Rain", "Thunderstorm"];
const FEEBAS_SONG = "SurfSong";

export const getAllFeebasCycleDistributions = (
  feebasCycle: number,
): Wild3InitialCycleDistribution[] => {
  const cachedDistributions = feebasCycleDistributionsCache.get(feebasCycle);

  if (cachedDistributions != null) {
    return cachedDistributions;
  }

  const distributions = feebasWeathers.flatMap((weather) =>
    getFeebasCycleDistributionsForAllVblankCounts(feebasCycle, weather),
  );
  feebasCycleDistributionsCache.set(feebasCycle, distributions);

  return distributions;
};

export const getFeebasCycleDistribution = (
  feebasCycle: number,
  weather: Wild3Weather,
  feebasVblankCount: number,
): Wild3InitialCycleDistribution => {
  return (
    getFeebasCycleDistributionsForAllVblankCounts(feebasCycle, weather).find(
      (distr) => distr.feebas_vblank_count === feebasVblankCount,
    ) ?? {
      feebas_vblank_count: feebasVblankCount,
      feebas_vblank_count_probability: 0,
      feebas_cycle: feebasCycle,
      min: 0,
      max: 0,
      distribution: [],
      action: "OldRod",
      playing_song: FEEBAS_SONG,
      weather,
    }
  );
};
