import {
  closestAncestor,
  getByLabel,
  getInnermostElementWithText,
  typeInto,
  type TableRow,
} from "../utils/dom";

export const STAT_LABELS = ["HP", "Atk", "Def", "SpA", "SpD", "Spe"] as const;

type StatLabel = (typeof STAT_LABELS)[number];

export type Stats = Record<StatLabel, string>;

export type IvFilterInputs = {
  minIvs: Partial<Stats>;
  maxIvs: Partial<Stats>;
};

export const toIvs = (cells: TableRow["cells"]): Stats => ({
  HP: cells.HP,
  Atk: cells.Atk,
  Def: cells.Def,
  SpA: cells.SpA,
  SpD: cells.SpD,
  Spe: cells.Spe,
});

const getEnteredStats = (stats: Partial<Stats>) => {
  return STAT_LABELS.flatMap((label) => {
    const value = stats[label];

    return value == null ? [] : [{ label, value }];
  });
};

const hasFieldLabels = (element: Element) => {
  return element.querySelector("[data-field-label]") != null;
};

const getIvGrid = (root: ParentNode, title: string) => {
  const titleElement = getInnermostElementWithText(root, title);
  const grid = closestAncestor(titleElement, hasFieldLabels);
  if (grid == null) {
    throw new Error(`No IV grid titled "${title}"`);
  }

  return grid;
};

const typeIvs = (grid: HTMLElement, ivs: Partial<Stats>) => {
  for (const { label, value } of getEnteredStats(ivs)) {
    typeInto(getByLabel(grid, label), value);
  }
};

export const typeIvFilter = (
  root: ParentNode,
  { minIvs, maxIvs }: IvFilterInputs,
) => {
  typeIvs(getIvGrid(root, "Min IVs"), minIvs);
  typeIvs(getIvGrid(root, "Max IVs"), maxIvs);
};
