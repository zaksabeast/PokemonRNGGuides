import { HgssElmCallSeedFinder } from "./hgssElmCalls/seedFinder";
import { DpptCoinFlipSeedFinder } from "./dpptCoinFlip/seedFinder";
import { useAtomValue } from "jotai";
import { gen4SetupAtom } from "./state/setup";

export const Gen4SeedFinder = () => {
  const setup = useAtomValue(gen4SetupAtom);

  if (setup.group === "hgss") {
    return <HgssElmCallSeedFinder />;
  }

  return <DpptCoinFlipSeedFinder />;
};
