import { match } from "ts-pattern";
import { useActiveRoute } from "~/hooks/useActiveRoute";
import { Static3TargetSetupSearcher } from "./static3TargetSetupSearcher";

export const Static3TargetSetupSearcher_WithSetTargetSetup = () => {
  const route = useActiveRoute();
  const game = match(route)
    .with("/emerald-static/", () => "emerald" as const)
    .with("/rs-static/", () => "rs" as const)
    .with("/frlg-static/", () => "frlg" as const)
    .otherwise(() => "emerald" as const);

  const setTargetSetup = () => {
    // TODO: Forward the targetSetup to calibration step.
  };

  return (
    <Static3TargetSetupSearcher game={game} setTargetSetup={setTargetSetup} />
  );
};
