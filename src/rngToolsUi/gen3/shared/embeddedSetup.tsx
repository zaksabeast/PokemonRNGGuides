import React from "react";
import { Alert, Button, Flex, NumberInput } from "~/components";
import { type Gen3TimerSettings } from "~/rngTools";
import { PRIMARY_BUTTON_HEIGHT } from "~/rngToolsUi/timer/constants";
import {
  BeepsRow,
  FieldLabel,
  FieldRow,
  GroupLabel,
  GroupRule,
} from "~/rngToolsUi/timer/setupParts";

export type Gen3EmbeddedSettings = Pick<Gen3TimerSettings, "calibration">;

type Props = {
  settings: Gen3EmbeddedSettings;
  maxBeepCount: number;
  setMaxBeepCount: (maxBeepCount: number) => void;
  onSet: (settings: Gen3EmbeddedSettings) => void;
};

/**
 * The target frame comes from the guide,
 * so only calibration and rarely changed settings are editable here.
 */
export const Gen3EmbeddedSetup = ({
  settings,
  maxBeepCount,
  setMaxBeepCount,
  onSet,
}: Props) => {
  const [draft, setDraft] = React.useState(settings);

  return (
    <Flex vertical gap={16}>
      <Alert
        type="warning"
        showIcon
        title="Only change these settings if you know what you're doing."
        description="The guide sets up this timer for you. Modifying it could ruin the RNG."
      />

      <Flex vertical gap={10}>
        <GroupLabel>Calibration</GroupLabel>

        <FieldRow>
          <FieldLabel>Calibration</FieldLabel>
          <NumberInput
            name="calibration"
            numType="float"
            value={draft.calibration}
            onChange={(calibration) =>
              setDraft({ ...draft, calibration: calibration ?? 0 })
            }
            fullFlex
          />
        </FieldRow>
      </Flex>

      <Flex vertical gap={10}>
        <GroupLabel>
          Rarely changes
          <GroupRule />
        </GroupLabel>

        <BeepsRow value={maxBeepCount} onChange={setMaxBeepCount} />
      </Flex>

      <Button
        trackerId="set_gen3_embedded_timer"
        type="primary"
        height={PRIMARY_BUTTON_HEIGHT}
        onClick={() => onSet(draft)}
      >
        Set Timer
      </Button>
    </Flex>
  );
};
