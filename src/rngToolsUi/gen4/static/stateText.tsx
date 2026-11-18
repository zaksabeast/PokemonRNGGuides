import { useStatic4Target } from "./state";
import { match, P } from "ts-pattern";

export const Static4SyncNature = () => {
  const lead = useStatic4Target()?.details.lead;

  return match(lead)
    .with({ Synchronize: P.string }, (matched) => matched.Synchronize)
    .otherwise(() => "???");
};
