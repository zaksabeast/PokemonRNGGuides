import { useStatic4RemainingAdvances, useStatic4Target } from "./state";
import { match, P } from "ts-pattern";
import { Typography } from "~/components";

export const Static4RemainingAdvances = () => {
  const remainingAdvances = useStatic4RemainingAdvances();

  if (remainingAdvances != null && remainingAdvances < 0) {
    return (
      <Typography.Text type="danger">
        Passed the target by {-remainingAdvances} advances, find a new target
      </Typography.Text>
    );
  }

  return remainingAdvances?.toString(10) ?? "???";
};

export const Static4SyncNature = () => {
  const lead = useStatic4Target()?.details.lead;

  return match(lead)
    .with({ Synchronize: P.string }, (matched) => matched.Synchronize)
    .otherwise(() => "???");
};
