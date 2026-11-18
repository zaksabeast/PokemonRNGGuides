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
  selectOption,
  selectRadio,
  typeInto,
  waitFor,
  waitForSearchResults,
  type TableRow,
} from "../utils/dom";
import { createGoToStep } from "../utils/stepper";
import { toCoinFlips } from "./gen4";
import {
  STAT_LABELS,
  toIvs,
  typeIvFilter,
  type IvFilterInputs,
  type Stats,
} from "./pokemonFilter";

export type CaughtPokemon = {
  natureOption: string;
  characteristic: string;
  stats: Stats;
};

export type StaticResult = {
  nature: string;
  ability: string;
  gender: string;
  ivs: Stats;
  lead: string;
  pid: string;
  advance: string;
  delay: string;
  second: string;
  seed: string;
};

export type AdvanceCalibration = {
  advanceOffset: string;
  advance: string;
  delayOffset: string;
  secondOffset: string;
  seed: string;
};

export type SeedCalibration = {
  delayOffset: string;
  secondOffset: string;
  seed: string;
  delay: string;
  second: string;
};

export type SeedSearchRange = {
  delayOffset: string;
  secondOffset: string;
};

const STEPS = {
  setUp: 0,
  pickPokemon: 1,
  hitSeed: 2,
  getPokemon: 3,
  calibrate: 4,
};

const toStaticResult = ({ cells }: TableRow): StaticResult => ({
  nature: cells.Nature,
  ability: cells.Ability,
  gender: cells.Gender,
  ivs: toIvs(cells),
  lead: cells.Lead,
  pid: cells.PID,
  advance: cells.Advance,
  delay: cells.Delay,
  second: cells.Second,
  seed: cells.Seed,
});

const toAdvanceCalibration = ({ cells }: TableRow): AdvanceCalibration => ({
  advanceOffset: cells["Advance Offset"],
  advance: cells.Advance,
  delayOffset: cells["Delay Offset"],
  secondOffset: cells["Second Offset"],
  seed: cells.Seed,
});

const toSeedCalibration = ({ cells }: TableRow): SeedCalibration => ({
  delayOffset: cells["Delay Offset"],
  secondOffset: cells["Second Offset"],
  seed: cells.Seed,
  delay: cells.Delay,
  second: cells.Second,
});

const selectStats = (step: HTMLElement, stats: Stats) => {
  for (const label of STAT_LABELS) {
    selectRadio(getByLabel(step, label), stats[label]);
  }
};

const enterCaughtPokemon = async (
  calibrate: HTMLElement,
  caughtPokemon: CaughtPokemon,
) => {
  const natureSelect = getSelectByLabel(calibrate, "Nature");
  const characteristicSelect = getSelectByLabel(calibrate, "Characteristic");

  await selectOption(natureSelect, caughtPokemon.natureOption);
  await selectOption(characteristicSelect, caughtPokemon.characteristic);
  selectStats(calibrate, caughtPokemon.stats);
};

const hasCalibrateAdvanceButton = (row: TableRow) => {
  return [...row.element.querySelectorAll("button")].some(
    (button) => button.textContent === "Calibrate Advance",
  );
};

export const openRetailStaticGuide = async () => {
  const container = renderGuide("/retail-dppt-static/");
  const setUp = await waitFor(() => getStep(container, STEPS.setUp));
  const pickPokemon = getStep(container, STEPS.pickPokemon);
  const hitSeed = getStep(container, STEPS.hitSeed);
  const getPokemon = getStep(container, STEPS.getPokemon);
  const calibrate = getStep(container, STEPS.calibrate);
  const goToStep = createGoToStep(container, [
    setUp,
    pickPokemon,
    hitSeed,
    getPokemon,
    calibrate,
  ]);

  const readSeedCalibrationTable = () => readResultTable(hitSeed);

  return {
    selectOnlySearchResult: async (
      species: string,
      ivFilter: IvFilterInputs,
    ): Promise<StaticResult> => {
      await goToStep(STEPS.pickPokemon);
      await selectOption(getSelectByLabel(pickPokemon, "Species"), species);
      typeIvFilter(pickPokemon, ivFilter);

      getButton(pickPokemon, "Generate").click();
      const rows = await waitForSearchResults(pickPokemon);
      const row = getOnly(rows, "search result");

      getButton(row.element, "Select").click();
      await waitFor(() => expect(isShown(hitSeed)).toBe(true));

      return toStaticResult(row);
    },

    findSeedsNearTarget: async ({
      delayOffset,
      secondOffset,
    }: SeedSearchRange): Promise<SeedCalibration[]> => {
      await goToStep(STEPS.hitSeed);
      typeInto(getByLabel(hitSeed, "Delay Offset"), delayOffset);
      typeInto(getByLabel(hitSeed, "Second Offset"), secondOffset);

      getButton(hitSeed, "Generate").click();
      const rows = await waitFor(() => {
        const shownRows = readSeedCalibrationTable();
        expect(shownRows).not.toEqual([]);

        return shownRows;
      });

      return rows.map(toSeedCalibration);
    },

    targetSeedCoinFlips: (targetSeed: string): string => {
      const rows = readSeedCalibrationTable().filter(
        ({ cells }) => cells.Seed === targetSeed,
      );

      return toCoinFlips(getOnly(rows, `seed ${targetSeed}`));
    },

    enterCoinFlips: (coinFlips: string) => {
      typeInto(getByLabel(hitSeed, "Coin Flips"), coinFlips);
    },

    waitForShownSeeds: (seeds: string[]) => {
      return waitFor(() =>
        expect(
          readSeedCalibrationTable().map(({ cells }) => cells.Seed),
        ).toEqual(seeds),
      );
    },

    coinFlips: (): string => {
      return getInputValue(getByLabel(hitSeed, "Coin Flips"));
    },

    targetAdvance: async (): Promise<string> => {
      await goToStep(STEPS.getPokemon);

      return getInputValue(getByLabel(getPokemon, "Target Advance"));
    },

    calibrateAdvanceWith: async (
      caughtPokemon: CaughtPokemon,
    ): Promise<AdvanceCalibration> => {
      await goToStep(STEPS.calibrate);
      await enterCaughtPokemon(calibrate, caughtPokemon);

      getButton(calibrate, "Generate").click();
      const rows = await waitForSearchResults(calibrate);
      const calibratableRows = rows.filter(hasCalibrateAdvanceButton);
      const row = getOnly(calibratableRows, "result to calibrate with");

      getButton(row.element, "Calibrate Advance").click();
      await waitFor(() => expect(isShown(hitSeed)).toBe(true));

      return toAdvanceCalibration(row);
    },
  };
};

export type RetailStaticGuide = Awaited<
  ReturnType<typeof openRetailStaticGuide>
>;
