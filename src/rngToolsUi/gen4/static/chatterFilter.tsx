import { RelativeChatterFilterBase } from "../shared/relativeChatterFilter";
import { ChatterFilterBase } from "../shared/chatterFilter";
import { useStatic4State } from "./state";

type Static4ChatterFilterProps = {
  honey?: boolean;
};

export const Static4ChatterFilter = ({ honey }: Static4ChatterFilterProps) => {
  const [state] = useStatic4State();
  const target = state.target;

  if (honey) {
    return (
      <RelativeChatterFilterBase
        seed={target?.seed ?? null}
        targetAdvance={target?.advance ?? null}
        submitTrackerId="static4_chatter_filter"
      />
    );
  }

  return (
    <ChatterFilterBase
      seed={target?.seed ?? null}
      targetAdvance={target?.advance ?? null}
      submitTrackerId="static4_chatter_filter"
    />
  );
};
