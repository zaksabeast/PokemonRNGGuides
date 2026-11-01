import { expect, test } from "bun:test";
import type { CdfKnot } from "~/rngTools";
import { getInitialCycleQualitativeProbability } from "./cdf";

test("uniform distributions remain common across wide ranges and at the edges", () => {
  const knots: CdfKnot[] = [
    { cycle: 0, probability: 0 },
    { cycle: 60000, probability: 1 },
  ];

  expect(
    [0, 30000, 60000].map((value) =>
      getInitialCycleQualitativeProbability(knots, value),
    ),
  ).toEqual([
    {
      probabilityTxt:
        "5.0% chance that the initial cycle is within (-3,000, 3,000)",
      qualitativeTxt: "Common",
    },
    {
      probabilityTxt:
        "10% chance that the initial cycle is within (27,000, 33,000)",
      qualitativeTxt: "Common",
    },
    {
      probabilityTxt:
        "5.0% chance that the initial cycle is within (57,000, 63,000)",
      qualitativeTxt: "Common",
    },
  ]);
});

test("qualitative probability uses the specified ratios against uniform likelihood", () => {
  const probabilities = [0, 0.02, 0.025, 0.125, 0.75];

  expect(
    probabilities.map((probability) =>
      getInitialCycleQualitativeProbability(
        [
          { cycle: 0, probability: 0 },
          { cycle: 6000, probability },
          { cycle: 12000, probability: 1 },
        ],
        3000,
      ),
    ),
  ).toEqual([
    {
      probabilityTxt: "0% chance that the initial cycle is within (0, 6,000)",
      qualitativeTxt: "Impossible",
    },
    {
      probabilityTxt: "2.0% chance that the initial cycle is within (0, 6,000)",
      qualitativeTxt: "Very unlikely",
    },
    {
      probabilityTxt: "2.5% chance that the initial cycle is within (0, 6,000)",
      qualitativeTxt: "Unlikely",
    },
    {
      probabilityTxt:
        "12.5% chance that the initial cycle is within (0, 6,000)",
      qualitativeTxt: "Common",
    },
    {
      probabilityTxt:
        "75.0% chance that the initial cycle is within (0, 6,000)",
      qualitativeTxt: "Very Common",
    },
  ]);
});

test("qualitative probability includes point masses at either 3000-cycle boundary", () => {
  const knots: CdfKnot[] = [
    { cycle: 0, probability: 0 },
    { cycle: 0, probability: 1 },
  ];

  expect(
    [-3001, -3000, 0, 3000, 3001].map((value) =>
      getInitialCycleQualitativeProbability(knots, value),
    ),
  ).toEqual([
    {
      probabilityTxt: "0% chance that the initial cycle is within (-6,001, -1)",
      qualitativeTxt: "Impossible",
    },
    {
      probabilityTxt:
        "100% chance that the initial cycle is within (-6,000, 0)",
      qualitativeTxt: "Common",
    },
    {
      probabilityTxt:
        "100% chance that the initial cycle is within (-3,000, 3,000)",
      qualitativeTxt: "Common",
    },
    {
      probabilityTxt: "100% chance that the initial cycle is within (0, 6,000)",
      qualitativeTxt: "Common",
    },
    {
      probabilityTxt: "0% chance that the initial cycle is within (1, 6,001)",
      qualitativeTxt: "Impossible",
    },
  ]);
});
