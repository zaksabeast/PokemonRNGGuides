import { Flex } from "~/components";
import { FormCard, FormSummary } from "~/components/form";

import Instructions_calib_skip_setup from "./instructions_calib_skip_setup.mdx";
import { TargetSetup, Wild3TargetSetupInput } from "./wild3TargetSetupInput";
import React from "react";
import { Wild3LeadCycleSpeedSelectorWithBtn } from "./wild3LeadCycleSpeedSelector";
import { calculateTargetSetupResult } from "./calculateTargetSetupResult";
import { AVERAGE_LEAD_CYCLE_SPEED } from "./wild3LeadCycleSpeedInput";
import {
  defaultAudioInfluences,
  getDefaultWild3AudioInfluences,
  type Wild3AudioInfluences,
} from "./wild3AudioInfluences";

type Props = {
  audioInfluences?: Wild3AudioInfluences;
  setAudioInfluences?: (audioInfluences: Wild3AudioInfluences) => void;
  setTargetSetup?: (targetSetup: TargetSetup) => void;
  setLeadCycleSpeed?: (spd: number) => void;
  leadCycleSpeed: number;
  displayInstructions: boolean;
  permitEnablingDebugOptions: boolean;
  initialDisplayLeadCycleSpdButton: boolean;
};

export const Wild3TargetSetupAndLeadInput = ({
  setTargetSetup: setTargetSetupProp,
  audioInfluences: audioInfluencesProp,
  setAudioInfluences: setAudioInfluencesProp,
  setLeadCycleSpeed: setLeadCycleSpeedProp,
  leadCycleSpeed: leadCycleSpeedProp,
  displayInstructions,
  permitEnablingDebugOptions,
  initialDisplayLeadCycleSpdButton,
}: Props) => {
  const [targetSetup, setTargetSetup] = React.useState<TargetSetup | null>(
    null,
  );

  const [localAudioInfluences, setLocalAudioInfluences] =
    React.useState<Wild3AudioInfluences>(defaultAudioInfluences);

  const audioInfluences = audioInfluencesProp ?? localAudioInfluences;

  const setAudioInfluencesBoth = (audio: Wild3AudioInfluences) => {
    setLocalAudioInfluences(audio);
    setAudioInfluencesProp?.(audio);
  };

  const setTargetSetupBoth = (targetSetup: TargetSetup | null) => {
    if (targetSetup == null && permitEnablingDebugOptions) {
      return; // When debugging, it is useful to not reset the target setup and debugging info.
    }

    setTargetSetup(targetSetup);
    if (targetSetup != null) {
      const audio = getDefaultWild3AudioInfluences(
        targetSetup.map,
        targetSetup.action,
      );
      setAudioInfluencesBoth(audio);
      setTargetSetupProp?.(targetSetup);
    }
  };

  const [localLeadCycleSpeed, setLeadCycleSpeed] =
    React.useState<number>(leadCycleSpeedProp);
  const leadCycleSpeed =
    setLeadCycleSpeedProp == null ? localLeadCycleSpeed : leadCycleSpeedProp;

  const [targetSetupResult, setTargetSetupResult] =
    React.useState<React.ReactNode>(null);

  React.useEffect(() => {
    if (targetSetup == null) {
      return setTargetSetupResult(null);
    }

    calculateTargetSetupResult(
      targetSetup,
      leadCycleSpeed,
      audioInfluences,
    ).then(({ content }) => {
      setTargetSetupResult(content);
    });
  }, [leadCycleSpeed, targetSetup, audioInfluences]);

  const setLeadCycleSpeedBoth = (spd: number) => {
    setLeadCycleSpeed(spd);
    setLeadCycleSpeedProp?.(spd);
  };

  return (
    <Flex vertical gap={10}>
      {displayInstructions && <Instructions_calib_skip_setup />}
      <Wild3TargetSetupInput setTargetSetup={setTargetSetupBoth} />
      {targetSetupResult != null && targetSetup != null && (
        <Flex vertical gap={20} mt={20}>
          <FormCard>
            <FormSummary
              rows={[{ label: "Target Pokémon", value: targetSetupResult }]}
            />
          </FormCard>
          <Wild3LeadCycleSpeedSelectorWithBtn
            targetSetup={targetSetup}
            audioInfluences={audioInfluences}
            setAudioInfluences={setAudioInfluencesBoth}
            permitEnablingDebugOptions={permitEnablingDebugOptions}
            setLeadCycleSpeed={setLeadCycleSpeedBoth}
            leadCycleSpeed={leadCycleSpeed}
            initialDisplayLeadCycleSpdButton={initialDisplayLeadCycleSpdButton}
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
      leadCycleSpeed={AVERAGE_LEAD_CYCLE_SPEED}
      displayInstructions={false}
      permitEnablingDebugOptions={permitEnablingDebugOptions}
      initialDisplayLeadCycleSpdButton={false}
    />
  );
};
