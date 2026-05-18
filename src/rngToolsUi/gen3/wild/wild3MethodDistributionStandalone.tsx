import React from "react";
import { Wild3MethodDistribution } from "./wild3MethodDistribution";
import {
  TargetSetup,
  Wild3CalibTargetSetupInput,
} from "./wild3CalibTargetSetupInput";
import { AVERAGE_LEAD_CYCLE_SPEED } from "./leadCycleSpeedSelector";

type Props = {
  permitEnablingDebugOptions: boolean;
};

export const Wild3MethodDistributionStandalone = ({
  permitEnablingDebugOptions,
}: Props) => {
  const [targetSetup, setTargetSetup] = React.useState<TargetSetup | null>(
    null,
  );
  const [leadCycleSpeed, setLeadCycleSpeed] = React.useState<number | null>(
    AVERAGE_LEAD_CYCLE_SPEED,
  );

  return (
    <>
      <Wild3CalibTargetSetupInput setTargetSetup={setTargetSetup} />

      {targetSetup != null && (
        <Wild3MethodDistribution
          targetSetup={targetSetup}
          permitEnablingDebugOptions={permitEnablingDebugOptions}
          leadCycleSpeed={leadCycleSpeed}
          setLeadCycleSpeed={setLeadCycleSpeed}
        />
      )}
    </>
  );
};
