import type {
  CdfKnot,
  Wild3Action,
  Wild3FeebasTile,
  Wild3InitialCycleDistribution,
  Wild3PlayingSong,
  Wild3Weather,
} from "~/rngTools";
import {
  feebasCycleDataset,
  type FeebasCycleScenario,
} from "./feebas_cycle_dataset";

const VBLANK_FREQ = 280_896;
const CDF_EDGE_WIDTH_CYCLES = 3_000;
const FISHING_ACTIONS: Wild3Action[] = [
  "OldRod",
  "GoodRod",
  "SuperRod",
] as const;

type FeebasCycleContext = {
  playingSong: Wild3PlayingSong;
  weather: Wild3Weather;
  scenarios: FeebasCycleScenario[];
};

const getFeebasCycleContexts = (): FeebasCycleContext[] => {
  const contexts = new Map<string, FeebasCycleContext>();
  for (const group of feebasCycleDataset) {
    const key = `${group.playingSong}:${group.weather}`;
    const context = contexts.get(key);
    if (context != null) {
      context.scenarios.push(...group.scenarios);
      continue;
    }

    contexts.set(key, {
      playingSong: group.playingSong,
      weather: group.weather,
      scenarios: [...group.scenarios],
    });
  }

  return [...contexts.values()];
};

const feebasCycleContexts = getFeebasCycleContexts();

const getCycleAfterCheckFeebas = (
  scenario: FeebasCycleScenario,
  workCycles: number,
): { vblankCount: number; cycle: number } => {
  const [startCycle, vblankDurations] = scenario;
  let remainingCycles = workCycles;
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
  const minCycle = Math.max(
    0,
    sortedCycleWeights[0][0] - CDF_EDGE_WIDTH_CYCLES,
  );
  const maxCycle = Math.min(
    VBLANK_FREQ,
    sortedCycleWeights[sortedCycleWeights.length - 1][0] +
      CDF_EDGE_WIDTH_CYCLES,
  );
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

const getContextDistributions = (
  context: FeebasCycleContext,
  tile: Wild3FeebasTile,
): Wild3InitialCycleDistribution[] => {
  const cycleWeightsByVblankCount = new Map<number, Map<number, number>>();
  let totalWeight = 0;

  for (const scenario of context.scenarios) {
    const { vblankCount, cycle } = getCycleAfterCheckFeebas(
      scenario,
      tile.cycle_counter,
    );
    const weight = scenario[2];
    const cycleWeights =
      cycleWeightsByVblankCount.get(vblankCount) ?? new Map<number, number>();
    cycleWeights.set(cycle, (cycleWeights.get(cycle) ?? 0) + weight);
    cycleWeightsByVblankCount.set(vblankCount, cycleWeights);
    totalWeight += weight;
  }

  return [...cycleWeightsByVblankCount]
    .sort(([left], [right]) => left - right)
    .flatMap(([feebas_vblank_count, cycleWeights]) => {
      const distribution = getConditionalCdf(cycleWeights);
      const groupWeight = [...cycleWeights.values()].reduce(
        (sum, weight) => sum + weight,
        0,
      );

      return FISHING_ACTIONS.map((action) => ({
        feebas_vblank_count,
        feebas_vblank_count_probability: groupWeight / totalWeight,
        feebas_tile: tile.cycle_counter,
        min: distribution[0].cycle,
        max: distribution[distribution.length - 1].cycle,
        distribution,
        action,
        playing_song: context.playingSong,
        weather: context.weather,
      }));
    });
};

export const getFeebasCycleDistributions = (
  tile: Wild3FeebasTile,
  playingSong: Wild3PlayingSong,
  weather: Wild3Weather,
): Wild3InitialCycleDistribution[] => {
  const context = feebasCycleContexts.find(
    (candidate) =>
      candidate.playingSong === playingSong && candidate.weather === weather,
  );
  if (context == null) {
    return [];
  }

  return getContextDistributions(context, tile);
};
