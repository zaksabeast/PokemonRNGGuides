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
import { Switch } from "./switch";

const MultiTimerStateSchema = z.object({
  showAllTimers: z.boolean(),
  // Keeping for now in case we need to revert and use the persisted state
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
  const [altSounds, setAltSounds] = React.useState(false);
  const [startTimeMs, setStartTimeMs] = React.useState<number | null>(null);
  const [currentTimerIndex, setCurrentTimerIndex] = React.useState(0);
  const { playBeeps: playFirstBeeps, ...firstBeep } = useAudio(
    altSounds
      ? {
          id: "softBeep",
        }
      : {
          url: firstBeepMp3,
        },
  );
  const { playBeeps: playSecondBeeps, ...secondBeep } = useAudio(
    altSounds
      ? {
          id: "softBeep",
        }
      : {
          url: secondBeepMp3,
        },
  );
  const keepAlive = useAudio({ url: firstBeepMp3 });

  const currentMs = milliseconds[currentTimerIndex] ?? 0;
  const nextMs = milliseconds[currentTimerIndex + 1] ?? 0;
  const displayTimerMs = milliseconds.length === 0 ? [0] : milliseconds;
  const countdownBeeps = Math.min(
    Math.floor(currentMs / countdownIntervalMs),
    state.maxBeepCount,
  );
  const countdownMs = countdownBeeps * countdownIntervalMs;

  React.useEffect(() => {
    if (startTimeMs == null) {
      return () => {};
    }
    const timer = setInterval(
      () => keepAlive.playBeeps({ count: 1, gain: 0.001 }),
      1000,
    );
    return () => clearInterval(timer);
  }, [startTimeMs, keepAlive]);

  const onCountdown = React.useCallback(() => {
    playFirstBeeps({ count: countdownBeeps });
  }, [playFirstBeeps, countdownBeeps]);

  const onExpire = React.useCallback(() => {
    playSecondBeeps({ count: 1 });
    setCurrentTimerIndex((prev) => prev + 1);

    if (currentTimerIndex + 1 >= milliseconds.length) {
      setStartTimeMs(null);
      setCurrentTimerIndex(0);
    }
  }, [playSecondBeeps, currentTimerIndex, milliseconds.length]);

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
        label: "Alt Beeps (Test)",
        tooltip:
          "This is a special test to see if it helps certain computers with audio issues.",
        input: (
          <Flex justify="flex-end">
            <Switch checked={altSounds} onChange={setAltSounds} />
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
    [state, setState, altSounds],
  );

  return (
    <Flex vertical gap={24}>
      {!state.showAllTimers && (
        <>
          <Flex vertical gap={16} justify="center" align="center">
            <Timer
              expirationMs={currentMs}
              countdownMs={countdownMs}
              run={
                startTimeMs != null && currentTimerIndex < milliseconds.length
              }
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
                run={startTimeMs != null && index === currentTimerIndex}
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
        disabled={disableStart && startTimeMs == null}
        trackerId={
          startTimeMs != null ? startButtonTrackerId : stopButtonTrackerId
        }
        onClick={() => {
          const newStartTimeMs = startTimeMs == null ? performance.now() : null;
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
