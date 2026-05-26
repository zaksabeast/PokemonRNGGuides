import { type CoinFlip } from "~/rngTools";

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

export const matchesCoinFlipFilter = (
  coinFlips: CoinFlip[],
  filterString: string,
): boolean => {
  if (filterString.length === 0) {
    return true;
  }
  const filterList = splitFlips(filterString);
  const shrunk = shrinkCoinFlips(coinFlips);
  return (
    shrunk.length >= filterList.length &&
    filterList.every((flip, i) => shrunk[i] === flip)
  );
};
