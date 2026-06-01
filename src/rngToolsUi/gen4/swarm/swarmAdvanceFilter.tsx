import { useAtom } from "jotai";
import { gen4StateAtom } from "../shared/state";
import { DpptCoinFlipAdvanceFilter } from "../shared/dpptCoinFlip/advanceFilter";
import { HgssSwarmAdvanceTracker } from "./hgssSwarmAdvanceTracker";

export const SwarmAdvanceFilter = () => {
  const [state] = useAtom(gen4StateAtom);
  const game = state.config.game;

  if (game === "HeartGold" || game === "SoulSilver") {
    return <HgssSwarmAdvanceTracker />;
  }

  return <DpptCoinFlipAdvanceFilter />;
};