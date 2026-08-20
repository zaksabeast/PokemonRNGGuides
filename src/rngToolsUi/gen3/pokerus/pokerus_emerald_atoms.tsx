import { atom } from "jotai";
import { type BattleVideoInfo } from "../battleVideo/battleVideo";
import { Pokerus3Setup } from "./pokerus_emerald_select_setup";

export const selectedSetupAtom = atom<Pokerus3Setup | null>(null);
export const battleVideoInfoAtom = atom<BattleVideoInfo | null>(null);
