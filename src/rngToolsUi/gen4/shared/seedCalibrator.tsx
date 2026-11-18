import { HgssElmCallSeedCalibrator } from "./hgssElmCalls/seedCalibrator";
import { DpptCoinFlipSeedCalibrator } from "./dpptCoinFlip/seedCalibrator";
import { useAtomValue } from "jotai";
import { gen4SetupAtom } from "./state/setup";

export const Gen4SeedCalibrator = () => {
  const setup = useAtomValue(gen4SetupAtom);

  if (setup.group === "hgss") {
    return <HgssElmCallSeedCalibrator />;
  }

  return <DpptCoinFlipSeedCalibrator />;
};
