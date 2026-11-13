import { readFileSync } from "node:fs";
import { expect, test } from "bun:test";
import { feebasCycleDataset } from "./feebas_cycle_dataset";

const sourceGroups = new Map<string, number[][]>();
const source = readFileSync(
  new URL("./feebas_cycles_samples.txt", import.meta.url),
  "utf8",
);
for (const line of source.split(/\r?\n/)) {
  if (!/^(SurfSong|MapSong|BikeSong) \|/.test(line)) {
    continue;
  }

  const [playingSong, weather, startCycle, durations] = line
    .split("|")
    .map((part) => part.trim());
  const values = [
    Number(startCycle),
    ...durations.slice(1, -1).split(",").map(Number),
  ];
  const key = `${playingSong}|${weather}|${values.length - 1}`;
  sourceGroups.set(key, [...(sourceGroups.get(key) ?? []), values]);
}

test("weighted Feebas scenarios summarize complete observed trajectories", () => {
  let scenarioCount = 0;
  let sampleWeight = 0;

  for (const group of feebasCycleDataset) {
    const key = `${group.playingSong}|${group.weather}|${group.durationCount}`;
    const records = sourceGroups.get(key);
    expect(records).toBeDefined();
    const sourceRecords = new Set(records?.map((record) => record.join(",")));
    const groupWeight = group.scenarios.reduce((sum, scenario) => {
      const [cycleAtStartOfCheckFeebas, vblankDurations, scenarioWeight] =
        scenario;
      expect(vblankDurations).toHaveLength(group.durationCount);
      expect(
        sourceRecords.has(
          [cycleAtStartOfCheckFeebas, ...vblankDurations].join(","),
        ),
      ).toBe(true);

      return sum + scenarioWeight;
    }, 0);

    expect(groupWeight).toBe(records?.length);
    scenarioCount += group.scenarios.length;
    sampleWeight += groupWeight;
  }

  expect(feebasCycleDataset.length).toBe(sourceGroups.size);
  expect(sampleWeight).toBe(1_000);
  expect(scenarioCount).toBeLessThan(200);
});

const vblankCountForCycles = (
  record: readonly number[],
  workCycles: number,
): number => {
  const [startCycle, ...durations] = record;
  let remainingCycles = workCycles;
  let currentCycle = startCycle;
  let vblankCount = 0;

  while (remainingCycles >= 280_896 - currentCycle) {
    remainingCycles -= 280_896 - currentCycle;
    currentCycle = durations[vblankCount % durations.length];
    vblankCount++;
  }

  return vblankCount;
};

test("weighted scenarios approximate Feebas vblank count frequencies", () => {
  const sourceRecords = [...sourceGroups.values()].flat();
  const scenarios = feebasCycleDataset.flatMap((group) => group.scenarios);

  for (const workCycles of [100_000, 250_000, 500_000]) {
    const sourceCounts = new Map<number, number>();
    const summaryCounts = new Map<number, number>();
    for (const record of sourceRecords) {
      const count = vblankCountForCycles(record, workCycles);
      sourceCounts.set(count, (sourceCounts.get(count) ?? 0) + 1);
    }

    for (const [startCycle, durations, weight] of scenarios) {
      const count = vblankCountForCycles(
        [startCycle, ...durations],
        workCycles,
      );
      summaryCounts.set(count, (summaryCounts.get(count) ?? 0) + weight);
    }

    for (const count of new Set([
      ...sourceCounts.keys(),
      ...summaryCounts.keys(),
    ])) {
      const sourceProbability =
        (sourceCounts.get(count) ?? 0) / sourceRecords.length;
      const summaryProbability =
        (summaryCounts.get(count) ?? 0) / sourceRecords.length;
      expect(Math.abs(sourceProbability - summaryProbability)).toBeLessThan(
        0.05,
      );
    }
  }
});
