import { expect, test } from "bun:test";
import {
  getAllFeebasCycleDistributions,
  getFeebasCycleDistribution,
} from "./feebas_cycle_info";

test("Feebas distributions preserve count probabilities and produce continuous conditional CDFs", () => {
  const cycle_counter = 205_803;
  const distributions = getAllFeebasCycleDistributions(cycle_counter).filter(
    (distribution) => distribution.weather === "Sunny",
  );
  const probabilitiesByContext = new Map<string, number>();

  for (const result of distributions) {
    expect(result.feebas_cycle).toBe(cycle_counter);
    expect(result.playing_song).toBe("SurfSong");
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
      expect(result.distribution[index].cycle).toBeGreaterThanOrEqual(
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
      result.playing_song === "SurfSong" &&
      result.weather === "Sunny" &&
      result.feebas_vblank_count === 1,
  );
  if (matching == null) {
    throw new Error("Missing one-vblank SurfSong distribution");
  }

  expect(matching.distribution.length).toBeGreaterThan(2);
});

test("Feebas distributions have zero probability without matching observations", () => {
  expect(getFeebasCycleDistribution(205_803, "Thunderstorm", 10)).toEqual({
    feebas_vblank_count: 10,
    feebas_vblank_count_probability: 0,
    feebas_cycle: 205_803,
    min: 0,
    max: 0,
    distribution: [],
    action: "OldRod",
    playing_song: "SurfSong",
    weather: "Thunderstorm",
  });
});
