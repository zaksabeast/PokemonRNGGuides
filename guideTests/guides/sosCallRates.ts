import { expect } from "vitest";
import { renderGuide } from "../utils/render";
import {
  getFirstTableRow,
  getOnly,
  readTable,
  typeInto,
  waitFor,
  type TableRow,
} from "../utils/dom";

export type SosCallRate = {
  dexNumber: string;
  name: string;
  smCallRate: string;
  usumCallRate: string;
};

const SEARCH_PLACEHOLDER = "Search Pokemon name";

const toSosCallRate = ({ cells }: TableRow): SosCallRate => ({
  dexNumber: cells["Dex #"],
  name: cells.Name,
  smCallRate: cells.SM,
  usumCallRate: cells.USUM,
});

const getSearchInput = (root: ParentNode) => {
  const inputs = [
    ...root.querySelectorAll<HTMLInputElement>(
      `input[placeholder="${SEARCH_PLACEHOLDER}"]`,
    ),
  ];

  return getOnly(inputs, `input showing "${SEARCH_PLACEHOLDER}"`);
};

export const openSosCallRates = async () => {
  const container = renderGuide("/sos-call-rates/");
  await waitFor(() => getFirstTableRow(container));

  const readCallRates = () => readTable(container).map(toSosCallRate);

  return {
    search: (searchText: string) => {
      const previousCallRates = readCallRates();
      typeInto(getSearchInput(container), searchText);

      return waitFor(() => {
        const callRates = readCallRates();
        expect(callRates).not.toEqual(previousCallRates);

        return callRates;
      });
    },
  };
};
