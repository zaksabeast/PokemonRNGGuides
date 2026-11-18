import type { TableRow } from "../utils/dom";

export type AdvanceFilterRow = {
  advance: string;
  isMarked: boolean;
};

export const toCoinFlips = ({ cells }: TableRow) => {
  return cells["Coin Flips"].replace(/, /g, "");
};

// Target and Seen statuses render only an icon, with no text to read
const hasStatusIcon = ({ element }: TableRow) => {
  return element.querySelector("td svg") != null;
};

export const toAdvanceFilterRow = (row: TableRow): AdvanceFilterRow => ({
  advance: row.cells.Advance,
  isMarked: hasStatusIcon(row),
});
