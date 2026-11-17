import { expect, test } from "bun:test";
import { feebasCycleDataset } from "./feebas_cycle_dataset";

test("SurfSong Feebas scenarios summarize all recorded weather samples", () => {
  const summaries = feebasCycleDataset.map((group) => ({
    playingSong: group.playingSong,
    weather: group.weather,
    scenarioCount: group.scenarios.length,
    sampleWeight: group.scenarios.reduce(
      (sum, [, , weight]) => sum + weight,
      0,
    ),
    firstScenario: group.scenarios[0],
    lastScenario: group.scenarios.at(-1),
  }));

  expect(summaries).toEqual([
    {
      playingSong: "SurfSong",
      weather: "Rain",
      scenarioCount: 436,
      sampleWeight: 3488,
      firstScenario: [49709, [53833, 49126, 46949], 1],
      lastScenario: [93410, [49730, 50405, 48165], 1],
    },
    {
      playingSong: "SurfSong",
      weather: "Sunny",
      scenarioCount: 436,
      sampleWeight: 3488,
      firstScenario: [40794, [44542, 39218, 38592], 1],
      lastScenario: [90712, [56879, 48251, 47902], 1],
    },
    {
      playingSong: "SurfSong",
      weather: "Thunderstorm",
      scenarioCount: 436,
      sampleWeight: 3488,
      firstScenario: [49101, [53521, 47839, 47371], 1],
      lastScenario: [129426, [56691, 57581, 56291], 1],
    },
  ]);

  for (const [startCycle, durations, weight] of feebasCycleDataset.flatMap(
    (group) => group.scenarios,
  )) {
    expect(startCycle).toBeGreaterThanOrEqual(0);
    expect(startCycle).toBeLessThan(280_896);
    expect(durations).toHaveLength(3);
    expect(
      durations.every((duration) => duration > 0 && duration < 280_896),
    ).toBe(true);
    expect(weight).toBeGreaterThan(0);
  }
});
