import { Species } from "rng_tools/pkg/rng_tools";
import { Gen4GameVersion } from "../gen4types";

const RoamersByGame = {
  Diamond: ["Cresselia", "Mesprit"],
  Pearl: ["Cresselia", "Mesprit"],
  Platinum: ["Cresselia", "Mesprit", "Articuno", "Zapdos", "Moltres"],
  HeartGold: ["Raikou", "Entei", "Latias"],
  SoulSilver: ["Raikou", "Entei", "Latios"],
} as const satisfies Record<Gen4GameVersion, Species[]>;

export const getRoamersForGame = (
  game: Gen4GameVersion,
): readonly Species[] => {
  return RoamersByGame[game];
};
