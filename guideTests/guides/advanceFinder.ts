import { expect } from "vitest";
import { renderGuide } from "../utils/render";
import {
  getButton,
  getByLabel,
  getInputValue,
  readResultTable,
  selectRadio,
  typeInto,
  waitFor,
  type TableRow,
} from "../utils/dom";
import { toAdvanceFilterRow, type AdvanceFilterRow } from "./gen4";

type ElmCall = "E" | "K" | "P";

export type ElmCallRow = AdvanceFilterRow & {
  call: string;
};

export type AdvanceRange = {
  seed: string;
  minAdvance: string;
  maxAdvance: string;
  targetAdvance: string;
};

const elmCallButtonLabels = {
  // eslint-disable-next-line id-length
  E: "Evolution",
  // eslint-disable-next-line id-length
  K: "Kanto",
  // eslint-disable-next-line id-length
  P: "Pokérus",
} as const satisfies Record<ElmCall, string>;

const toElmCallRow = (row: TableRow): ElmCallRow => ({
  ...toAdvanceFilterRow(row),
  call: row.cells.Call,
});

export const openAdvanceFinder = async () => {
  const container = renderGuide("/chatot-pitch-elm-call-finder/");
  await waitFor(() => getByLabel(container, "Filter"));

  const readElmCallRows = () => {
    return readResultTable(container).map(toElmCallRow);
  };

  const enteredCalls = () => getInputValue(getByLabel(container, "Calls"));

  // Each button appends to the calls shown when it rendered, so clicks wait for the field to update
  const addElmCall = async (call: ElmCall) => {
    const expectedCalls = `${enteredCalls()}${call}`;
    getButton(container, elmCallButtonLabels[call]).click();

    await waitFor(() => expect(enteredCalls()).toBe(expectedCalls));
  };

  return {
    generateElmCalls: async ({
      seed,
      minAdvance,
      maxAdvance,
      targetAdvance,
    }: AdvanceRange): Promise<ElmCallRow[]> => {
      selectRadio(getByLabel(container, "Filter"), "Pokégear Calls");
      await waitFor(() => getByLabel(container, "Calls"));
      typeInto(getByLabel(container, "Seed"), seed);
      typeInto(getByLabel(container, "Min Advance"), minAdvance);
      typeInto(getByLabel(container, "Max Advance"), maxAdvance);
      typeInto(getByLabel(container, "Target Advance"), targetAdvance);

      getButton(container, "Generate").click();

      return waitFor(() => {
        const rows = readElmCallRows();
        expect(rows).not.toEqual([]);

        return rows;
      });
    },

    addElmCalls: async (calls: ElmCall[]) => {
      for (const call of calls) {
        await addElmCall(call);
      }
    },

    waitForShownCalls: (rows: ElmCallRow[]) => {
      return waitFor(() => expect(readElmCallRows()).toEqual(rows));
    },
  };
};
