import { expect, test } from "bun:test";
import { getFeebasCycleDistributions } from "./feebas_cycle_info";

test("Feebas distributions preserve count probabilities and produce continuous conditional CDFs", () => {
  const tile = { x: 1, y: 2, cycle_counter: 205_803 };
  const distributions = getFeebasCycleDistributions(tile, "BikeSong", "Sunny");
  const probabilitiesByContext = new Map<string, number>();

  for (const result of distributions) {
    expect(result.feebas_tile).toBe(tile.cycle_counter);
    expect(result.playing_song).toBe("BikeSong");
    expect(result.weather).toBe("Sunny");
    expect(result.feebas_vblank_count).toBeGreaterThanOrEqual(0);
    expect(result.feebas_vblank_count_probability).toBeGreaterThan(0);
    expect(result.distribution[0]).toEqual({
      cycle: result.min,
      probability: 0,
    });
    expect(result.distribution.at(-1)).toEqual({
      cycle: result.max,
      probability: 1,
    });
    for (let index = 1; index < result.distribution.length; index++) {
      expect(result.distribution[index].cycle).toBeGreaterThan(
        result.distribution[index - 1].cycle,
      );
      expect(result.distribution[index].probability).toBeGreaterThan(
        result.distribution[index - 1].probability,
      );
    }

    const key = `${result.action}:${result.playing_song}:${result.weather}`;
    probabilitiesByContext.set(
      key,
      (probabilitiesByContext.get(key) ?? 0) +
        result.feebas_vblank_count_probability,
    );
  }

  expect(probabilitiesByContext.size).toBe(3);
  for (const probability of probabilitiesByContext.values()) {
    expect(probability).toBeCloseTo(1);
  }

  const matching = distributions.find(
    (result) =>
      result.action === "OldRod" &&
      result.playing_song === "BikeSong" &&
      result.weather === "Sunny" &&
      result.feebas_vblank_count === 1,
  );
  if (matching == null) {
    throw new Error("Missing one-vblank BikeSong distribution");
  }

  const observedCycle = matching.distribution.find(
    (knot) => knot.cycle === 74_182,
  );
  expect(observedCycle?.probability).toBeGreaterThan(0);
  expect(observedCycle?.probability).toBeLessThan(1);
});

test("Feebas distributions are empty without matching observations", () => {
  expect(
    getFeebasCycleDistributions(
      { x: 1, y: 2, cycle_counter: 205_803 },
      "BikeSong",
      "Thunderstorm",
    ),
  ).toEqual([]);
});
