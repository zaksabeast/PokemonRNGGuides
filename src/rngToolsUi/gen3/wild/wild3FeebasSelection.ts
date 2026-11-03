import type { Wild3FeebasVblankSelection } from "~/rngTools";

export type Wild3FeebasUiSelectionResult = {
  active: boolean;
  count: number;
  probability: number;
  probability_by_vblank: number[];
};

export const getWild3FeebasUiSelectionResult = (
  selection: Wild3FeebasVblankSelection,
  probabilities: number[] | undefined,
): Wild3FeebasUiSelectionResult => {
  const probabilityByVblank = probabilities ?? [];
  const count =
    selection === "MostProbable"
      ? probabilityByVblank.reduce((best, probability, count) => {
          return probability > (probabilityByVblank[best] ?? 0) ? count : best;
        }, 0)
      : selection.Exact;

  return {
    active: probabilities != null,
    count,
    probability: probabilityByVblank[count] ?? 0,
    probability_by_vblank: probabilityByVblank,
  };
};
