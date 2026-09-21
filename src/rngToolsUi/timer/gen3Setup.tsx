import React from "react";
import { Button, Flex, NumberInput, Select } from "~/components";
import { type Gen3TimerSettings } from "~/rngTools";
import { PRIMARY_BUTTON_HEIGHT } from "./constants";
import {
  BeepsRow,
  FieldLabel,
  FieldRow,
  GroupLabel,
  GroupRule,
} from "./setupParts";

type Props = {
  settings: Gen3TimerSettings;
  maxBeepCount: number;
  setMaxBeepCount: (maxBeepCount: number) => void;
  onSet: (settings: Gen3TimerSettings) => void;
};

export const Gen3Setup = ({
  settings,
  maxBeepCount,
  setMaxBeepCount,
  onSet,
}: Props) => {
  const [draft, setDraft] = React.useState(settings);

  const update = (updates: Partial<Gen3TimerSettings>) =>
    setDraft({ ...draft, ...updates });

  return (
    <Flex vertical gap={16}>
      <Flex vertical gap={10}>
        <GroupLabel>Target</GroupLabel>

        <FieldRow>
          <FieldLabel>Pre-Timer (ms)</FieldLabel>
          <NumberInput
            name="preTimer"
            numType="float"
            value={draft.preTimer}
            onChange={(preTimer) => update({ preTimer: preTimer ?? 0 })}
            fullFlex
          />
        </FieldRow>

        <FieldRow>
          <FieldLabel>Target Frame</FieldLabel>
          <NumberInput
            name="targetFrame"
            numType="float"
            value={draft.targetFrame}
            onChange={(targetFrame) =>
              update({ targetFrame: targetFrame ?? 0 })
            }
            fullFlex
          />
        </FieldRow>
      </Flex>

      <Flex vertical gap={10}>
        <GroupLabel>Calibration</GroupLabel>

        <FieldRow>
          <FieldLabel>Calibration</FieldLabel>
          <NumberInput
            name="calibration"
            numType="float"
            value={draft.calibration}
            onChange={(calibration) =>
              update({ calibration: calibration ?? 0 })
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
          <FieldLabel>Console</FieldLabel>
          <Select<Gen3TimerSettings["console"]>
            name="console"
            value={draft.console}
            onChange={(console) => update({ console })}
            fullFlex
            options={[
              { label: "GBA", value: "Gba" },
              { label: "NDS - Slot 2", value: "NdsSlot2" },
              { label: "NDS - Slot 1", value: "NdsSlot1" },
              { label: "DSI", value: "Dsi" },
              { label: "3DS", value: "ThreeDs" },
              { label: "Switch - FR/LG", value: "SwitchFrLg" },
            ]}
          />
        </FieldRow>

        <BeepsRow value={maxBeepCount} onChange={setMaxBeepCount} />
      </Flex>

      <Button
        trackerId="set_gen3_timer"
        type="primary"
        height={PRIMARY_BUTTON_HEIGHT}
        onClick={() => onSet(draft)}
      >
        Set Timer
      </Button>
    </Flex>
  );
};
