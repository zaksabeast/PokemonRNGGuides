import React from "react";
import {
  Alert,
  Button,
  Flex,
  Link,
  NumberInput,
  Typography,
} from "~/components";
import { type Gen4TimerSettings } from "~/rngTools";
import { PRIMARY_BUTTON_HEIGHT } from "./constants";
import {
  BeepsRow,
  DsConsoleRow,
  FieldLabel,
  FieldRow,
  GroupLabel,
  GroupRule,
} from "./setupParts";

type Props = {
  settings: Gen4TimerSettings;
  maxBeepCount: number;
  setMaxBeepCount: (maxBeepCount: number) => void;
  onSet: (settings: Gen4TimerSettings) => void;
};

export const Gen4Setup = ({
  settings,
  maxBeepCount,
  setMaxBeepCount,
  onSet,
}: Props) => {
  const [draft, setDraft] = React.useState(settings);

  const update = (updates: Partial<Gen4TimerSettings>) =>
    setDraft({ ...draft, ...updates });

  return (
    <Flex vertical gap={16}>
      <Flex vertical gap={10}>
        <GroupLabel>Target</GroupLabel>

        <FieldRow>
          <FieldLabel>Target Delay</FieldLabel>
          <NumberInput
            name="targetDelay"
            numType="float"
            value={draft.targetDelay}
            onChange={(targetDelay) =>
              update({ targetDelay: targetDelay ?? 0 })
            }
            fullFlex
          />
        </FieldRow>

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

        <FieldRow>
          <FieldLabel>Min Time (ms)</FieldLabel>
          <NumberInput
            name="minTimeMs"
            numType="float"
            value={draft.minTimeMs}
            onChange={(minTimeMs) => update({ minTimeMs: minTimeMs ?? 0 })}
            fullFlex
          />
        </FieldRow>
      </Flex>

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

        <DsConsoleRow
          value={draft.console}
          onChange={(console) => update({ console })}
        />

        <BeepsRow value={maxBeepCount} onChange={setMaxBeepCount} />
      </Flex>

      <Alert
        type="tip"
        showIcon
        title="Want easier 3ds RNG?"
        description={
          <Flex vertical>
            <Typography.Text>
              Set the console to 3ds and click "Set Timer" to see the 3ds
              helper.
            </Typography.Text>
            <Link href="/3ds-helper/">
              View the 3ds Helper guide for more details.
            </Link>
          </Flex>
        }
      />

      <Button
        trackerId="set_gen4_timer"
        type="primary"
        height={PRIMARY_BUTTON_HEIGHT}
        onClick={() => onSet(draft)}
      >
        Set Timer
      </Button>
    </Flex>
  );
};
