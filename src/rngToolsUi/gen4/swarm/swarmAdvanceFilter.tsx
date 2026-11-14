import { useAtomValue } from "jotai";
import { gen4SetupAtom } from "../shared/state/setup";
import { DpptCoinFlipAdvanceFilter } from "../shared/dpptCoinFlip/advanceFilter";
import { HgssSwarmAdvanceTracker } from "./hgssSwarmAdvanceTracker";

export const SwarmAdvanceFilter = () => {
  const setup = useAtomValue(gen4SetupAtom);

  if (setup.group === "hgss") {
    return <HgssSwarmAdvanceTracker />;
  }

  return <DpptCoinFlipAdvanceFilter />;
};
