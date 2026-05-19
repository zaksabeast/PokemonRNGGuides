import { Flex, FormFieldTable } from "~/components";

import Instructions_calib_skip_setup from "./instructions_calib_skip_setup.mdx";
import { TargetSetup, Wild3TargetSetupInput } from "./wild3TargetSetupInput";
import React from "react";
import { Wild3LeadCycleSpeedSelectorWithBtn } from "./wild3LeadCycleSpeedSelector";
import { calculateTargetSetupResult } from "./calculateTargetSetupResult";
import { AVERAGE_LEAD_CYCLE_SPEED } from "./wild3LeadCycleSpeedInput";

type Props = {
  setTargetSetup: (targetSetup: TargetSetup) => void;
  setLeadCycleSpeed: (spd: number) => void;
  leadCycleSpeed: number;
  displayInstructions: boolean;
  permitEnablingDebugOptions: boolean;
  displayLeadCycleSpdButton: boolean;
};

export const Wild3TargetSetupAndLeadInput = ({
  setTargetSetup: setTargetSetupProp,
  setLeadCycleSpeed: setLeadCycleSpeedProp,
  leadCycleSpeed: leadCycleSpeedProp,
  displayInstructions,
  permitEnablingDebugOptions,
  displayLeadCycleSpdButton,
}: Props) => {
  const [targetSetup, setTargetSetup] = React.useState<TargetSetup | null>(
    null,
  );

  const setTargetSetupBoth = (targetSetup: TargetSetup | null) => {
    setTargetSetup?.(targetSetup);
    if (targetSetup != null) {
      setTargetSetupProp?.(targetSetup);
    }
  };

  const [leadCycleSpeed, setLeadCycleSpeed] =
    React.useState<number>(leadCycleSpeedProp);

  const [targetSetupResult, setTargetSetupResult] =
    React.useState<React.ReactNode>(null);

  React.useEffect(() => {
    if (targetSetup == null) {
      return setTargetSetupResult(null);
    }

    calculateTargetSetupResult(targetSetup, leadCycleSpeed).then(
      ({ content }) => {
        setTargetSetupResult(content);
      },
    );
  }, [leadCycleSpeed, targetSetup]);

  const setLeadCycleSpeedBoth = (spd: number) => {
    setLeadCycleSpeed(spd);
    setLeadCycleSpeedProp(spd);
  };

  return (
    <Flex vertical gap={10}>
      {displayInstructions && <Instructions_calib_skip_setup />}
      <Wild3TargetSetupInput setTargetSetup={setTargetSetupBoth} />
      {targetSetupResult != null && targetSetup != null && (
        <Flex vertical gap={20} mt={20}>
          <FormFieldTable
            fields={[
              {
                label: "Target Pokémon",
                input: targetSetupResult,
              },
            ]}
          />
          <Wild3LeadCycleSpeedSelectorWithBtn
            targetSetup={targetSetup}
            permitEnablingDebugOptions={permitEnablingDebugOptions}
            setLeadCycleSpeed={setLeadCycleSpeedBoth}
            leadCycleSpeed={leadCycleSpeed}
            displayLeadCycleSpdButton={displayLeadCycleSpdButton}
          />
        </Flex>
      )}
    </Flex>
  );
};

export const Wild3TargetSetupAndLeadInputStandalone = ({
  permitEnablingDebugOptions,
}: {
  permitEnablingDebugOptions: boolean;
}) => {
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
