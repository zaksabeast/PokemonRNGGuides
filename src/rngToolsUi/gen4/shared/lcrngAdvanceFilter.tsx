import { useAtomValue } from "jotai";
import { ChatterFilterBase } from "./chatterFilter";
import { HgssElmCallAdvanceFilterBase } from "./hgssElmCalls/advanceFilter";
import { gen4MarkersAtom } from "./state/markers";
import {
  gen4SetupAtom,
  getGen4AdvanceMethod,
  getGen4ElmCallAdvances,
} from "./state/setup";
import { gen4TargetAtom, getCalibratedLcrngAdvance } from "./state/target";

export const Gen4LcrngAdvanceFilter = () => {
  const setup = useAtomValue(gen4SetupAtom);
  const target = useAtomValue(gen4TargetAtom);
  const markers = useAtomValue(gen4MarkersAtom);
  const seed = target?.seedTime.seed ?? null;
  const targetAdvance = getCalibratedLcrngAdvance(target);
  const roamerAdvances = target?.roamerAdvances ?? 0;

  if (getGen4AdvanceMethod(setup) === "pokegearCall") {
    return (
      <HgssElmCallAdvanceFilterBase
        seed={seed}
        targetAdvance={targetAdvance}
        minAdvance={roamerAdvances}
        mode="embedded"
        submitTrackerId="gen4_lcrng_elm_call_filter_generate"
      />
    );
  }

  return (
    <ChatterFilterBase
      seed={seed}
      targetAdvance={targetAdvance}
      minAdvance={
        roamerAdvances + getGen4ElmCallAdvances(setup, markers.elmCalls)
      }
      mode="embedded"
      submitTrackerId="gen4_lcrng_chatter_filter_generate"
    />
  );
};
