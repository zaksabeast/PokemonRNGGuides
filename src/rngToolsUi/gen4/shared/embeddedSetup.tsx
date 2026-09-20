import React from "react";
import { Alert, Button, Flex, NumberInput } from "~/components";
import { type Gen4TimerSettings } from "~/rngTools";
import { PRIMARY_BUTTON_HEIGHT } from "~/rngToolsUi/timer/constants";
import {
  BeepsRow,
  FieldLabel,
  FieldRow,
  GroupLabel,
  GroupRule,
} from "~/rngToolsUi/timer/setupParts";

export type Gen4EmbeddedSettings = Pick<
  Gen4TimerSettings,
  "calibratedDelay" | "calibratedSecond" | "targetSecond"
>;

type Props = {
  settings: Gen4EmbeddedSettings;
  maxBeepCount: number;
  setMaxBeepCount: (maxBeepCount: number) => void;
  onSet: (settings: Gen4EmbeddedSettings) => void;
};

export const Gen4EmbeddedSetup = ({
  settings,
  maxBeepCount,
  setMaxBeepCount,
  onSet,
}: Props) => {
  const [draft, setDraft] = React.useState(settings);

  const update = (updates: Partial<Gen4EmbeddedSettings>) =>
    setDraft({ ...draft, ...updates });

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
          <FieldLabel>Calibrated Delay</FieldLabel>
          <NumberInput
            name="calibratedDelay"
            numType="float"
            value={draft.calibratedDelay}
            onChange={(calibratedDelay) =>
              update({ calibratedDelay: calibratedDelay ?? 0 })
            }
            fullFlex
          />
        </FieldRow>

        <FieldRow>
          <FieldLabel>Calibrated Seconds</FieldLabel>
          <NumberInput
            name="calibratedSecond"
            numType="float"
            value={draft.calibratedSecond}
            onChange={(calibratedSecond) =>
              update({ calibratedSecond: calibratedSecond ?? 0 })
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

        <FieldRow>
          <FieldLabel>Target Seconds</FieldLabel>
          <NumberInput
            name="targetSecond"
            numType="float"
            value={draft.targetSecond}
            onChange={(targetSecond) =>
              update({ targetSecond: targetSecond ?? 0 })
            }
            fullFlex
          />
        </FieldRow>

        <BeepsRow value={maxBeepCount} onChange={setMaxBeepCount} />
      </Flex>

      <Button
        trackerId="set_gen4_embedded_timer"
        type="primary"
        height={PRIMARY_BUTTON_HEIGHT}
        onClick={() => onSet(draft)}
      >
        Set Timer
      </Button>
    </Flex>
  );
};
