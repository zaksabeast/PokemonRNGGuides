import React from "react";
import { Flex } from "./flex";
import { Button } from "./button";
import { Typography } from "./typography";
import { Timer } from "./timer";
import { RadioGroup } from "./radio";
import { Select } from "./select";
import firstBeepMp3 from "~/assets/first-beep.mp3";
import secondBeepMp3 from "~/assets/second-beep.mp3";
import { useAudio } from "~/hooks/useAudio";
import { FormFieldTable } from "./formFieldTable";
import { atomWithPersistence, useAtom } from "~/state/localStorage";
import { z } from "zod";

const MultiTimerStateSchema = z.object({
  showAllTimers: z.boolean(),
  maxBeepCount: z.number(),
});

const multiTimerStateAtom = atomWithPersistence(
  "multiTimerState",
  MultiTimerStateSchema,
  { showAllTimers: false, maxBeepCount: 5 },
);

type Props = {
  minutesBeforeTarget: number;
  milliseconds: number[];
  startButtonTrackerId: string;
  stopButtonTrackerId: string;
};

const countdownIntervalMs = 500;

export const MultiTimer = ({
  minutesBeforeTarget,
  milliseconds,
  startButtonTrackerId,
  stopButtonTrackerId,
}: Props) => {
  const [state, setState] = useAtom(multiTimerStateAtom);
  const [isRunning, setIsRunning] = React.useState(false);
  const [currentTimerIndex, setCurrentTimerIndex] = React.useState(0);
  const firstBeep = useAudio(firstBeepMp3);
  const secondBeep = useAudio(secondBeepMp3);

  const currentMs = milliseconds[currentTimerIndex] ?? 0;
  const nextMs = milliseconds[currentTimerIndex + 1] ?? 0;
  const displayTimerMs = milliseconds.length === 0 ? [0] : milliseconds;
  const countdownBeeps = Math.min(
    Math.floor(currentMs / countdownIntervalMs),
    state.maxBeepCount,
  );
  const countdownMs = currentMs - countdownBeeps * countdownIntervalMs;

  const onCountdown = React.useCallback(
    () => firstBeep.playBeeps(countdownBeeps),
    [firstBeep, countdownBeeps],
  );

  const onExpire = React.useCallback(() => {
    secondBeep.playBeeps(1);
    setCurrentTimerIndex((prev) => prev + 1);
  }, [secondBeep]);

  React.useEffect(() => {
    setIsRunning(false);
    setCurrentTimerIndex(0);
  }, [milliseconds]);

  const timerSettingFields = React.useMemo(
    () => [
      {
        label: "Display All Timers?",
        input: (
          <Flex justify="flex-end">
            <RadioGroup
              name="timerDisplay"
              optionType="button"
              value={state.showAllTimers ? "showAllTimers" : "showCurrentTimer"}
              onChange={({ target }) => {
                setState({
                  showAllTimers: target.value === "showAllTimers",
                  maxBeepCount: state.maxBeepCount,
                });
              }}
              options={[
                { label: "Yes", value: "showAllTimers" },
                { label: "No", value: "showCurrentTimer" },
              ]}
            />
          </Flex>
        ),
      },
      {
        label: "Countdown beeps",
        input: (
          <Select<number>
            name="countdownBeeps"
            value={state.maxBeepCount}
            onChange={(value) => {
              setState({
                maxBeepCount: value,
                showAllTimers: state.showAllTimers,
              });
            }}
            options={new Array(11).fill(0).map((_, index) => ({
              label: index.toString(),
              value: index,
            }))}
          />
        ),
      },
    ],
    [state.maxBeepCount, state.showAllTimers, setState],
  );

  return (
    <Flex vertical gap={24}>
      {!state.showAllTimers && (
        <>
          <Flex vertical gap={16} justify="center" align="center">
            <Timer
              expirationMs={currentMs}
              countdownMs={countdownMs}
              run={isRunning && currentTimerIndex < milliseconds.length}
              onCountdown={onCountdown}
              onExpire={onExpire}
            />
          </Flex>
          <Flex vertical gap={8}>
            <Typography.Title level={5} p={0} m={0}>
              Next Phase: {nextMs == null ? "None" : nextMs / 1000}
            </Typography.Title>
            <Typography.Title level={5} p={0} m={0}>
              Minutes Before Target: {minutesBeforeTarget}
            </Typography.Title>
          </Flex>
        </>
      )}

      {state.showAllTimers && (
        <>
          <Flex wrap gap={16} justify="center" align="center">
            {displayTimerMs.map((ms, index) => (
              <Timer
                key={index}
                expirationMs={ms}
                countdownMs={countdownMs}
                run={isRunning && index <= currentTimerIndex}
                onCountdown={onCountdown}
                onExpire={onExpire}
              />
            ))}
          </Flex>
          <Flex vertical gap={8}>
            <Typography.Title level={5} p={0} m={0}>
              Minutes Before Target: {minutesBeforeTarget}
            </Typography.Title>
          </Flex>
        </>
      )}

      <FormFieldTable fields={timerSettingFields} />

      <Button
        trackerId={isRunning ? startButtonTrackerId : stopButtonTrackerId}
        onClick={() => {
          const newIsRunning = !isRunning;
          setIsRunning(newIsRunning);
          setCurrentTimerIndex(0);
          if (!newIsRunning) {
            firstBeep.stopBeeps();
            secondBeep.stopBeeps();
          }
        }}
      >
        {isRunning ? "Stop" : "Start"}
      </Button>
    </Flex>
  );
};
