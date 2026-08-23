import { atom } from "jotai";
import { type BattleVideoInfo } from "../battleVideo/battleVideo";
import { Pokerus3Setup } from "./pokerus_emerald_select_setup";
import { lcrng_distance } from "~/utils/lcrng";

export const selectedSetupAtom = atom<Pokerus3Setup | null>(null);
export const battleVideoInfoAtom = atom<BattleVideoInfo | null>(null);

export const convertTotalAdvToAdvRelativeToPaintingReseeding = (
  frame_before_painting: number,
  totalAdv: number,
) => {
  if (frame_before_painting === 0) {
    return totalAdv;
  }
  const advDiff = totalAdv - lcrng_distance(0, frame_before_painting);
  return advDiff >= 0 ? advDiff : advDiff + 2 ** 32;
};
