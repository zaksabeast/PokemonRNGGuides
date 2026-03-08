import { type CoinFlip } from "~/rngTools";

export type SmallCoinFlip = "H" | "T";

export const shrinkCoinFlips = (coinFlips: CoinFlip[]) => {
  return coinFlips.map((coinFlip) => (coinFlip === "Heads" ? "H" : "T"));
};

export const joinCoinFlips = (coinFlips: SmallCoinFlip[]) => {
  return coinFlips.join(", ");
};

export const splitFlips = (input: string): SmallCoinFlip[] => {
  return input
    .split(", ")
    .filter((flip): flip is SmallCoinFlip => flip === "H" || flip === "T");
};

export const sanitizeFlips = (input: string): string => {
  return joinCoinFlips(splitFlips(input));
};
