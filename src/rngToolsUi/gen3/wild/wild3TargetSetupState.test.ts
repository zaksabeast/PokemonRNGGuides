import { expect, test } from "bun:test";
import { targetSetupAtomSchema } from "./wild3TargetSetupState";

const oldSavedSetup = {
  targetSetup: {
    map: "MAP_ROUTE119",
    action: "GoodRod",
    feebasState: "OnFeebasTile",
    feebasCycles: 219710,
    roamerState: "Inactive",
    massOutbreakState: "Inactive",
    lead: "Egg",
    targetPaintingAdvs: { before: 0, after: 42 },
    targetMethod: "Wild1",
    requiresWhiteFlute: false,
    safariPokeblock: null,
    aceSid: null,
  },
} as const;

test("old target setups default to the most probable Feebas count", () => {
  expect(targetSetupAtomSchema.parse(oldSavedSetup)).toEqual({
    targetSetup: {
      ...oldSavedSetup.targetSetup,
      feebasVblankSelection: "MostProbable",
    },
  });
});

test("explicit Feebas count survives a persisted setup round trip", () => {
  const saved = {
    targetSetup: {
      ...oldSavedSetup.targetSetup,
      feebasVblankSelection: { Exact: 2 },
    },
  };

  expect(
    targetSetupAtomSchema.parse(JSON.parse(JSON.stringify(saved))),
  ).toEqual(saved);
});
