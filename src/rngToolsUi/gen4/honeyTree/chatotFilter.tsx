import { ChatterFilterBase } from "../shared/chatterFilter";
import { useHoneyTreeState } from "./state";

export const HoneyTreeChatotFilter = () => {
  const [state] = useHoneyTreeState();

  return (
    <ChatterFilterBase
      seed={state.initialSeed}
      targetAdvance={state.targetAdvance}
      mode="embedded"
      submitTrackerId="honey_tree_chatter_filter"
    />
  );
};
