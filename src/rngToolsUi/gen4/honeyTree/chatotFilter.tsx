import { RelativeChatterFilterBase } from "../shared/relativeChatterFilter";
import { useHoneyTreeState } from "./state";

export const HoneyTreeChatotFilter = () => {
  const [state] = useHoneyTreeState();

  return (
    <RelativeChatterFilterBase
      seed={state.initialSeed}
      targetAdvance={state.targetAdvance}
      submitTrackerId="honey_tree_chatter_filter"
    />
  );
};
