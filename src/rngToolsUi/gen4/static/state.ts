import { useAtomValue } from "jotai";
import {
  gen4TargetAtom,
  type Gen4Target,
  type Static4Details,
} from "../shared/state/target";
import { gen4MarkersAtom } from "../shared/state/markers";
import { gen4SetupAtom, getGen4ElmCallAdvances } from "../shared/state/setup";

type ActiveStatic4Target = {
  target: Gen4Target;
  details: Static4Details;
};

export const useStatic4Target = (): ActiveStatic4Target | null => {
  const target = useAtomValue(gen4TargetAtom);
  const details = target?.details;
  if (target == null || details?.tool !== "static") {
    return null;
  }

  return { target, details };
};

export const useStatic4RemainingAdvances = (): number | null => {
  const static4Target = useStatic4Target();
  const markers = useAtomValue(gen4MarkersAtom);
  const setup = useAtomValue(gen4SetupAtom);
  const targetAdvance = static4Target?.target.lcrngAdvance;

  if (static4Target == null || targetAdvance == null) {
    return null;
  }

  return (
    targetAdvance +
    static4Target.details.advanceCalibration -
    static4Target.target.roamerAdvances -
    getGen4ElmCallAdvances(setup, markers.elmCalls)
  );
};
