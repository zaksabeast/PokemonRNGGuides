import { expect } from "vitest";
import { renderGuide } from "../utils/render";
import {
  getButton,
  getByLabel,
  getInputValue,
  getOnly,
  getSelectByLabel,
  getStep,
  isShown,
  readResultTable,
  readSelectOptionLabels,
  typeInto,
  waitFor,
  waitForSearchResults,
} from "../utils/dom";
import { createGoToStep } from "../utils/stepper";
import { toAdvanceFilterRow, toCoinFlips, type AdvanceFilterRow } from "./gen4";

export type LotteryTarget = {
  seed: string;
  advance: string;
};

const STEPS = {
  setUp: 0,
  pickPrize: 1,
  hitSeed: 2,
  advanceToTarget: 3,
};

const toHexSeed = (seedInput: string) => {
  return Number.parseInt(seedInput, 16)
    .toString(16)
    .toUpperCase()
    .padStart(8, "0");
};

export const openLotteryGuide = async () => {
  const container = renderGuide("/retail-dppt-lottery/");
  const setUp = await waitFor(() => getStep(container, STEPS.setUp));
  const pickPrize = getStep(container, STEPS.pickPrize);
  const hitSeed = getStep(container, STEPS.hitSeed);
  const advanceToTarget = getStep(container, STEPS.advanceToTarget);
  const goToStep = createGoToStep(container, [
    setUp,
    pickPrize,
    hitSeed,
    advanceToTarget,
  ]);

  const readAdvanceFilterRows = () => {
    return readResultTable(advanceToTarget).map(toAdvanceFilterRow);
  };

  return {
    gameOptions: () => {
      return readSelectOptionLabels(getSelectByLabel(setUp, "Game"));
    },

    selectFirstPrize: async (delay: string): Promise<LotteryTarget> => {
      await goToStep(STEPS.pickPrize);
      typeInto(getByLabel(pickPrize, "Min Delay"), delay);
      typeInto(getByLabel(pickPrize, "Max Delay"), delay);

      getButton(pickPrize, "Generate").click();
      const [row] = await waitForSearchResults(pickPrize);
      if (row == null) {
        throw new Error("No prizes found");
      }

      getButton(row.element, "Select").click();
      await waitFor(() => expect(isShown(hitSeed)).toBe(true));

      return { seed: row.cells.Seed, advance: row.cells.Advance };
    },

    /** Coin flips for the target seed, starting at advance 0 */
    targetSeedCoinFlips: async (): Promise<string> => {
      await goToStep(STEPS.hitSeed);
      typeInto(getByLabel(hitSeed, "Delay Offset"), "0");
      typeInto(getByLabel(hitSeed, "Second Offset"), "0");

      getButton(hitSeed, "Generate").click();
      const row = await waitFor(() =>
        getOnly(readResultTable(hitSeed), "seed calibration result"),
      );

      return toCoinFlips(row);
    },

    advanceFilterTarget: async (): Promise<LotteryTarget> => {
      await goToStep(STEPS.advanceToTarget);

      return {
        seed: toHexSeed(getInputValue(getByLabel(advanceToTarget, "Seed"))),
        advance: getInputValue(getByLabel(advanceToTarget, "Target Advance")),
      };
    },

    generateAdvances: async () => {
      await goToStep(STEPS.advanceToTarget);
      getButton(advanceToTarget, "Generate").click();

      await waitFor(() => expect(readAdvanceFilterRows()).not.toEqual([]));
    },

    enterCoinFlips: (coinFlips: string) => {
      typeInto(getByLabel(advanceToTarget, "Coin Flips"), coinFlips);
    },

    waitForShownAdvances: (rows: AdvanceFilterRow[]) => {
      return waitFor(() => expect(readAdvanceFilterRows()).toEqual(rows));
    },
  };
};
