import { expect, test } from "bun:test";
import { getWild3FeebasUiSelectionResult } from "./wild3FeebasSelection";

test("automatic selection follows count probabilities and chooses the smaller tied count", () => {
  expect([
    getWild3FeebasUiSelectionResult("MostProbable", [0.1, 0.7, 0.2, 0, 0]),
    getWild3FeebasUiSelectionResult("MostProbable", [0.5, 0.5, 0, 0, 0]),
  ]).toEqual([
    {
      active: true,
      count: 1,
      probability: 0.7,
      probability_by_vblank: [0.1, 0.7, 0.2, 0, 0],
    },
    {
      active: true,
      count: 0,
      probability: 0.5,
      probability_by_vblank: [0.5, 0.5, 0, 0, 0],
    },
  ]);
});

test("explicit selection distinguishes an impossible count from a bypassed check", () => {
  expect([
    getWild3FeebasUiSelectionResult({ Exact: 2 }, [0.1, 0.7, 0.2, 0, 0]),
    getWild3FeebasUiSelectionResult({ Exact: 99 }, [0.1, 0.7, 0.2, 0, 0]),
    getWild3FeebasUiSelectionResult({ Exact: 99 }, undefined),
  ]).toEqual([
    {
      active: true,
      count: 2,
      probability: 0.2,
      probability_by_vblank: [0.1, 0.7, 0.2, 0, 0],
    },
    {
      active: true,
      count: 99,
      probability: 0,
      probability_by_vblank: [0.1, 0.7, 0.2, 0, 0],
    },
    { active: false, count: 99, probability: 0, probability_by_vblank: [] },
  ]);
});
