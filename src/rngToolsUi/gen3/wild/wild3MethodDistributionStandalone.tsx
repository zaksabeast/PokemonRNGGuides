import { AVERAGE_LEAD_CYCLE_SPEED } from "./wild3LeadCycleSpeedInput";
import { Wild3TargetSetupAndLeadInput } from "./wild3TargetSetupAndLeadInput";

type Props = {
  permitEnablingDebugOptions: boolean;
};

export const Wild3MethodDistributionStandalone = ({
  permitEnablingDebugOptions,
}: Props) => {
  return (
    <Wild3TargetSetupAndLeadInput
      setTargetSetup={() => {}}
      leadCycleSpeed={AVERAGE_LEAD_CYCLE_SPEED}
      setLeadCycleSpeed={() => {}}
      displayInstructions={false}
      permitEnablingDebugOptions={permitEnablingDebugOptions}
      displayLeadCycleSpdButton={false}
    />
  );
};
