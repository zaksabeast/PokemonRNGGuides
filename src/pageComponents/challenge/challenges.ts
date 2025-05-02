import { GuideSlug } from "~/guides";
import { z } from "zod";
import * as tst from "ts-toolbelt";

export const RngTaskStatusSchema = z.enum([
  "not-started",
  "in-progress",
  "completed",
]);

export type RngTaskStatus = z.infer<typeof RngTaskStatusSchema>;

type GenericRngTask<ChallengeId extends string> = {
  id: string;
  challengeId: ChallengeId;
  name: string;
  requirements: string;
  tips?: string;
  description: string;
  slug: GuideSlug;
  difficulty: "easy" | "medium" | "hard";
  status: RngTaskStatus;
};

const usumTaTasks = [
  {
    id: "usumTaIvEgg",
    challengeId: "usumTa",
    slug: "/retail-usum-egg-mmsc",
    name: "6IV Egg",
    requirements: "RNG a 6IV egg, does not need to be shiny.",
    description: "Easy 6IV Pokemon.",
    tips: "Start with two 6IV parents to make this easier!",
    difficulty: "easy",
  },
  {
    id: "usumTaShinyMmEgg",
    challengeId: "usumTa",
    slug: "/retail-usum-egg-mmsc",
    name: "Shiny 6IV Masuda Method Egg",
    requirements: "RNG a shiny 6IV egg with different language parents.",
    description: "Most relaxing shinies in the game.",
    tips: "Use two different language parents to automatically activate Masuda Method!",
    difficulty: "easy",
  },
  {
    id: "usumTaNoNpcWild",
    challengeId: "usumTa",
    slug: "/retail-usum-wild",
    name: "0 NPC Shiny Wild",
    requirements: "RNG a shiny wild Pokémon in an area with 0 NPCs.",
    description: "Make some wild Pokemon shiny.",
    tips: "Use PokeReader's NPC counter to find a good spot!",
    difficulty: "easy",
  },
  {
    id: "usumTaShiny6IvNoMmscEgg",
    challengeId: "usumTa",
    slug: "/retail-usum-egg-no-mmsc",
    name: "Shiny 6IV Egg without Masuda",
    requirements: "RNG a shiny 6IV egg without Masuda Method or Shiny Charm.",
    description: "Fastest 6IV shinies in the game.",
    tips: "Use parents with the same language!",
    difficulty: "medium",
  },
  {
    id: "usumTaNpcShinyWild",
    challengeId: "usumTa",
    slug: "/retail-usum-wild",
    name: "Timeline Shiny Wild",
    requirements: "RNG a shiny wild Pokémon in an area with 1 or more NPCs.",
    description: "Make any wild Pokemon shiny.",
    difficulty: "medium",
  },
  {
    id: "usumTaIslandScan",
    challengeId: "usumTa",
    slug: "/retail-usum-wild",
    name: "Shiny Island Scan",
    requirements: "RNG a shiny Island Scan Pokémon.",
    description: "Ooh, rare shinies.",
    difficulty: "medium",
  },
  {
    id: "usumTaWormhole",
    challengeId: "usumTa",
    slug: "/retail-usum-wormhole",
    name: "Shiny 6IV Wormhole Xurkitree",
    requirements: "RNG a shiny 6IV Xurkitree in a wormhole.",
    description: "One of the most rewarding RNGs.",
    difficulty: "hard",
  },
  {
    id: "usumTaNpcShinyHighIvWild",
    challengeId: "usumTa",
    slug: "/retail-usum-wild",
    name: "Shiny High IV Wild",
    requirements: "RNG a shiny wild Pokémon where all IVs are 20 or higher.",
    description: "Make any wild Pokemon shiny.",
    difficulty: "hard",
  },
] as const satisfies tst.O.Omit<GenericRngTask<"usumTa">, "status">[];

export const challenges = {
  usumTa: usumTaTasks,
} as const;

export type Challenges = typeof challenges;
export type RngTask = tst.O.Merge<
  Challenges[keyof Challenges][number],
  { readonly status: RngTaskStatus; readonly tips?: string }
>;
