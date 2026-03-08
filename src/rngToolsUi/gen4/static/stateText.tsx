import { useStatic4State } from "./state";
import { match, P } from "ts-pattern";

export const Static4ChatotCount = () => {
  const [state] = useStatic4State();
  return state.target?.advance?.toString(10) ?? "???";
};

export const Static4SyncNature = () => {
  const [state] = useStatic4State();
  const lead = state.target?.lead;

  return match(lead)
    .with({ Synchronize: P.string }, (matched) => matched.Synchronize)
    .otherwise(() => "???");
};
