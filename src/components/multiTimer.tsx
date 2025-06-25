import React from "react";
import { Skeleton } from "antd";
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
import { hydrationLock, HydrationLock } from "~/utils/hydration";
import { useHydrate } from "~/hooks/useHydrate";
import * as tst from "ts-toolbelt";

const MultiTimerStateSchema = z.object({
  showAllTimers: z.boolean(),
  // Intentionally not deprecating this field at the moment.
  // If we need to revert recent changes, we'll want this persisted in people's browsers.
  hardwareSyncSound: z.boolean(),
  maxBeepCount: z.number(),
});

type MultiTimerState = z.infer<typeof MultiTimerStateSchema>;

const multiTimerStateAtom = atomWithPersistence(
  "multiTimerState",
  MultiTimerStateSchema,
  { showAllTimers: false, maxBeepCount: 5, hardwareSyncSound: false },
);

const countdownIntervalMs = 500;

type InnerProps = {
  state: MultiTimerState;
  setState: (state: HydrationLock<MultiTimerState>) => void;
  minutesBeforeTarget: number;
  milliseconds: number[];
  disableStart?: boolean;
  startButtonTrackerId: string;
  stopButtonTrackerId: string;
};

const InnerMultiTimer = ({
  state,
  setState,
  minutesBeforeTarget,
  milliseconds,
  disableStart = false,
  startButtonTrackerId,
  stopButtonTrackerId,
}: InnerProps) => {
  const [startTimeMs, setStartTimeMs] = React.useState<number | null>(null);
  const [currentTimerIndex, setCurrentTimerIndex] = React.useState(0);
  const firstBeep = useAudio({ url: firstBeepMp3 });
  const secondBeep = useAudio({ url: secondBeepMp3 });
  const keepAlive = useAudio({ id: "silentNoise" });

  const isRunning = startTimeMs != null;
  const currentMs = milliseconds[currentTimerIndex] ?? 0;
  const nextMs = milliseconds[currentTimerIndex + 1] ?? 0;
  const displayTimerMs = milliseconds.length === 0 ? [0] : milliseconds;
  const countdownBeeps = Math.min(
    Math.floor(currentMs / countdownIntervalMs),
    state.maxBeepCount,
  );
  const countdownMs = countdownBeeps * countdownIntervalMs;

  React.useEffect(() => {
    if (isRunning) {
      firstBeep.playBeeps({
        count: countdownBeeps,
        offsetMs: currentMs - countdownMs,
      });
      secondBeep.playBeeps({
        count: 1,
        offsetMs: currentMs,
      });
    }
  }, [
    isRunning,
    firstBeep,
    secondBeep,
    countdownMs,
    currentMs,
    countdownBeeps,
  ]);

  React.useEffect(() => {
    if (!isRunning) {
      return () => {};
    }
    const timer = setInterval(() => keepAlive.playBeeps({ count: 1 }), 1000);
    return () => clearInterval(timer);
  }, [isRunning, keepAlive]);

  const onExpire = React.useCallback(() => {
    setCurrentTimerIndex((prev) => prev + 1);

    if (currentTimerIndex + 1 >= milliseconds.length) {
      setStartTimeMs(null);
      setCurrentTimerIndex(0);
    }
  }, [currentTimerIndex, milliseconds.length]);

  React.useEffect(() => {
    setStartTimeMs(null);
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
                setState(
                  hydrationLock({
                    ...state,
                    showAllTimers: target.value === "showAllTimers",
                  }),
                );
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
        label: "Countdown Beeps",
        input: (
          <Select<number>
            name="countdownBeeps"
            value={state.maxBeepCount}
            onChange={(value) => {
              setState(
                hydrationLock({
                  ...state,
                  maxBeepCount: value,
                }),
              );
            }}
            options={new Array(11).fill(0).map((_, index) => ({
              label: index.toString(),
              value: index,
            }))}
          />
        ),
      },
    ],
    [state, setState],
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
                run={isRunning && index === currentTimerIndex}
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
        disabled={disableStart && !isRunning}
        trackerId={isRunning ? startButtonTrackerId : stopButtonTrackerId}
        onClick={() => {
          const newStartTimeMs = !isRunning ? performance.now() : null;
          const newIsRunning = newStartTimeMs != null;
          setStartTimeMs(newStartTimeMs);
          setCurrentTimerIndex(0);
          if (!newIsRunning) {
            firstBeep.stopBeeps();
            secondBeep.stopBeeps();
          }
        }}
      >
        {startTimeMs == null ? "Start" : "Stop"}
      </Button>
    </Flex>
  );
};

const getMinutesBeforeTarget = (milliseconds: number[]) => {
  const summedMs = milliseconds.reduce((acc, ms) => acc + ms, 0);
  return Math.floor(summedMs / 60000);
};

type Props = tst.O.Optional<
  tst.O.Omit<InnerProps, "state" | "setState">,
  "minutesBeforeTarget"
>;

export const MultiTimer = (props: Props) => {
  const [lockedState, setState] = useAtom(multiTimerStateAtom);
  const { hydrated, client: state } = useHydrate(lockedState);

  if (!hydrated) {
    return <Skeleton />;
  }

  return (
    <InnerMultiTimer
      state={state}
      setState={setState}
      minutesBeforeTarget={
        props.minutesBeforeTarget ?? getMinutesBeforeTarget(props.milliseconds)
      }
      {...props}
    />
  );
};
