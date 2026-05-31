import { type CoinFlip } from "~/rngTools";
import { findSubArrayIndices, type IndexRange } from "~/utils/findIndexBy";
import { matchesSubsequence } from "~/utils/matchesSubsequence";

export type SmallCoinFlip = "H" | "T";

export const shrinkCoinFlips = (coinFlips: CoinFlip[]) => {
  return coinFlips.map((coinFlip) => (coinFlip === "Heads" ? "H" : "T"));
};

const joinCoinFlips = (coinFlips: SmallCoinFlip[]) => {
  return coinFlips.join("");
};

export const splitFlips = (input: string): SmallCoinFlip[] => {
  return input
    .split("")
    .filter((flip): flip is SmallCoinFlip => flip === "H" || flip === "T");
};

export const sanitizeFlips = (input: string): string => {
  return joinCoinFlips(splitFlips(input));
};

export const isSmallCoinFlipEqual = (
  coinFlip: CoinFlip | SmallCoinFlip,
  filterFlip: SmallCoinFlip,
): boolean => {
  const shrunk =
    coinFlip === "Heads" ? "H" : coinFlip === "Tails" ? "T" : coinFlip;
  return shrunk === filterFlip;
};

export const findCoinFlipSequenceIndices = (
  coinFlips: Array<CoinFlip | SmallCoinFlip>,
  filterString: string,
): IndexRange[] => {
  const filterList = splitFlips(filterString);
  return findSubArrayIndices(coinFlips, filterList, isSmallCoinFlipEqual);
};

export const matchesCoinFlipFilter = (
  coinFlips: SmallCoinFlip[],
  filterString: string,
): boolean => {
  const filterList = splitFlips(filterString);
  return matchesSubsequence(coinFlips, filterList);
};
