import type {
  CdfKnot,
  Wild3Action,
  Wild3InitialCycleDistribution,
  Wild3PlayingSong,
  Wild3Weather,
} from "~/rngTools";
import {
  feebasCycleDataset,
  type FeebasCycleDatasetGroup,
  type FeebasCycleScenario,
} from "./feebas_cycle_dataset";
import { isFishingAction, wild3Actions } from "~/rngToolsUi/gen3/wild/utils";

const VBLANK_FREQ = 280_896;
const FISHING_ACTIONS: Wild3Action[] = wild3Actions.filter((action) =>
  isFishingAction(action),
);

const simulateCheckFeebasScenario = (
  scenario: FeebasCycleScenario,
  checkFeebasCycle: number,
): { vblankCount: number; cycle: number } => {
  const [startCycle, vblankDurations] = scenario;
  let remainingCycles = checkFeebasCycle;
  let cycle = startCycle;
  let vblankCount = 0;

  while (remainingCycles >= VBLANK_FREQ - cycle) {
    remainingCycles -= VBLANK_FREQ - cycle;
    cycle = vblankDurations[vblankCount % vblankDurations.length];
    vblankCount++;
  }

  return { vblankCount, cycle: cycle + remainingCycles };
};

const getConditionalCdf = (cycleWeights: Map<number, number>): CdfKnot[] => {
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
    distribution.push({
      cycle: knotCycle,
      probability: (cumulativeWeight + weight / 2) / totalWeight,
    });
    cumulativeWeight += weight;
  }

  distribution.push({ cycle: maxCycle, probability: 1 });

  return distribution;
};

class CycleWeightsByVblankCount {
  // map[vblankCount][cycle] = weight
  private map = new Map<number, Map<number, number>>();
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
  checkFeebasCycle: number,
  context: FeebasCycleDatasetGroup,
): Wild3InitialCycleDistribution[] => {
  const cycleWeightsByVblankCount = new CycleWeightsByVblankCount();

  for (const scenario of context.scenarios) {
    const { vblankCount, cycle } = simulateCheckFeebasScenario(
      scenario,
      checkFeebasCycle,
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
        const distribution = getConditionalCdf(weightByCycle);

        return FISHING_ACTIONS.map((action) => ({
          feebas_vblank_count,
          feebas_vblank_count_probability,
          check_feebas_cycle: checkFeebasCycle,
          min: distribution[0].cycle,
          max: distribution[distribution.length - 1].cycle,
          distribution,
          action,
          playing_song: context.playingSong,
          weather: context.weather,
        }));
      },
    );
};

const getFeebasCycleDistributionsForAllVblankCounts = (
  checkFeebasCycle: number,
  playingSong: Wild3PlayingSong,
  weather: Wild3Weather,
): Wild3InitialCycleDistribution[] => {
  const cachedDistributions =
    feebasCycleDistributionsCache.get(checkFeebasCycle);
  if (cachedDistributions != null) {
    return cachedDistributions.filter((distr) => {
      return distr.playing_song === playingSong && distr.weather === weather;
    });
  }

  const context = feebasCycleDataset.find(
    (candidate) =>
      candidate.playingSong === playingSong && candidate.weather === weather,
  );
  if (context == null) {
    return [];
  }

  return getFeebasCycleDistributionsFromContext(checkFeebasCycle, context);
};

const feebasCycleDistributionsCache = new Map<
  number,
  Wild3InitialCycleDistribution[]
>();
const feebasWeathers: Wild3Weather[] = ["Sunny", "Rain", "Thunderstorm"];
const feebasSongs: Wild3PlayingSong[] = ["SurfSong"];

export const getAllFeebasCycleDistributions = (
  checkFeebasCycle: number,
): Wild3InitialCycleDistribution[] => {
  const cachedDistributions =
    feebasCycleDistributionsCache.get(checkFeebasCycle);
  if (cachedDistributions != null) {
    return cachedDistributions;
  }

  const distributions = feebasWeathers.flatMap((weather) =>
    feebasSongs.flatMap((playingSong) =>
      getFeebasCycleDistributionsForAllVblankCounts(
        checkFeebasCycle,
        playingSong,
        weather,
      ),
    ),
  );
  feebasCycleDistributionsCache.set(checkFeebasCycle, distributions);

  return distributions;
};

export const getFeebasCycleDistribution = (
  checkFeebasCycle: number,
  playingSong: Wild3PlayingSong,
  weather: Wild3Weather,
  feebasVblankCount: number,
): Wild3InitialCycleDistribution => {
  return (
    getFeebasCycleDistributionsForAllVblankCounts(
      checkFeebasCycle,
      playingSong,
      weather,
    ).find((distr) => distr.feebas_vblank_count === feebasVblankCount) ?? {
      feebas_vblank_count: feebasVblankCount,
      feebas_vblank_count_probability: 0,
      check_feebas_cycle: checkFeebasCycle,
      min: 0,
      max: 0,
      distribution: [],
      action: "OldRod",
      playing_song: playingSong,
      weather,
    }
  );
};
