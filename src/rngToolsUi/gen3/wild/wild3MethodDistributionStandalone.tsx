import React from "react";
import { Wild3LeadCycleSpeedSelector } from "./wild3LeadCycleSpeedSelector";
import { TargetSetup, Wild3TargetSetupInput } from "./wild3TargetSetupInput";
import { AVERAGE_LEAD_CYCLE_SPEED } from "./wild3LeadCycleSpeedInput";

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
      <Wild3TargetSetupInput setTargetSetup={setTargetSetup} />

      {targetSetup != null && (
        <Wild3LeadCycleSpeedSelector
          targetSetup={targetSetup}
          permitEnablingDebugOptions={permitEnablingDebugOptions}
          leadCycleSpeed={leadCycleSpeed}
          setLeadCycleSpeed={setLeadCycleSpeed}
        />
      )}
    </>
  );
};
