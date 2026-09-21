import styled from "@emotion/styled";
import React from "react";
import { Button, Flex, Select, Typography } from "~/components";
import { type GameConsole } from "~/rngTools";
import {
  BeepsRow,
  FieldLabel,
  FieldRow,
  GroupLabel,
  GroupRule,
} from "../setupParts";
import { SetupTimerCard } from "./setupTimerCard";
import {
  initialTimerValues,
  nextTimerId,
  type AllTimerSettings,
  type SingleTimerSettings,
} from "./state";

const AddButton = styled(Button)(({ theme }) => ({
  "&&&": {
    height: 40,
    border: `1px dashed ${theme.token.colorBorder}`,
    color: theme.token.colorPrimary,
    background: "none",
  },
}));

type Props = {
  draft: AllTimerSettings;
  setDraft: (draft: AllTimerSettings) => void;
  milliseconds: number[];
  maxBeepCount: number;
  setMaxBeepCount: (maxBeepCount: number) => void;
};

export const SetupMode = ({
  draft,
  setDraft,
  milliseconds,
  maxBeepCount,
  setMaxBeepCount,
}: Props) => {
  const [expandedId, setExpandedId] = React.useState<number | null>(null);

  const setTimers = (timers: SingleTimerSettings[]) =>
    setDraft({ ...draft, timers });

  const addTimer = () => {
    const timerId = nextTimerId(draft.timers);
    setTimers([...draft.timers, { timer_id: timerId, ...initialTimerValues }]);
    setExpandedId(timerId);
  };

  const duplicateTimer = (index: number) => {
    const source = draft.timers[index];
    if (source == null) {
      return;
    }
    const timerId = nextTimerId(draft.timers);
    const timers = [...draft.timers];
    timers.splice(index + 1, 0, { ...source, timer_id: timerId });
    setTimers(timers);
    setExpandedId(timerId);
  };

  const removeTimer = (timerId: number) => {
    setTimers(draft.timers.filter((timer) => timer.timer_id !== timerId));
    setExpandedId(null);
  };

  return (
    <Flex vertical gap={16}>
      <Flex vertical gap={10}>
        <GroupLabel>This RNG</GroupLabel>

        {draft.timers.length === 0 && (
          <Typography.Text fontSize={13} color="TextTertiary">
            No timers yet. Add one to get started.
          </Typography.Text>
        )}

        {draft.timers.map((timer, index) => (
          <SetupTimerCard
            key={timer.timer_id}
            timer={timer}
            index={index}
            durationMs={milliseconds[index] ?? 0}
            expanded={expandedId === timer.timer_id}
            onToggle={() =>
              setExpandedId(
                expandedId === timer.timer_id ? null : timer.timer_id,
              )
            }
            onChange={(updated) =>
              setTimers(
                draft.timers.map((existing) =>
                  existing.timer_id === updated.timer_id ? updated : existing,
                ),
              )
            }
            onDuplicate={() => duplicateTimer(index)}
            onRemove={() => removeTimer(timer.timer_id)}
          />
        ))}

        <AddButton trackerId="add_custom_timer" onClick={addTimer}>
          + Add timer
        </AddButton>
      </Flex>

      <Flex vertical gap={10}>
        <GroupLabel>
          Rarely changes
          <GroupRule />
        </GroupLabel>

        <FieldRow>
          <FieldLabel>Console</FieldLabel>
          <Select<GameConsole>
            name="console"
            value={draft.console}
            onChange={(gameConsole) =>
              setDraft({ ...draft, console: gameConsole })
            }
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
    </Flex>
  );
};
