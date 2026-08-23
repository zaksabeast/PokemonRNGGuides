import { HgssElmCallSeedFinder } from "./hgssElmCalls/seedFinder";
import { DpptCoinFlipSeedFinder } from "./dpptCoinFlip/seedFinder";
import { useAtom } from "jotai";
import { gen4StateAtom } from "./state";

export const Gen4SeedFinder = () => {
  const [state] = useAtom(gen4StateAtom);

  const game = state.config.game;

  if (game === "HeartGold" || game === "SoulSilver") {
    return <HgssElmCallSeedFinder />;
  }

  return <DpptCoinFlipSeedFinder />;
};
