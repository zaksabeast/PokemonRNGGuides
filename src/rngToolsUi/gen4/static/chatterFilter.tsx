import { ChatterFilterBase } from "../shared/chatterFilter";
import { useStatic4State } from "./state";

export const Static4ChatterFilter = () => {
  const [state] = useStatic4State();
  const target = state.target;

  return (
    <ChatterFilterBase
      seed={target?.seed ?? null}
      targetAdvance={target?.advance ?? null}
      submitTrackerId="static4_chatter_filter"
    />
  );
};
