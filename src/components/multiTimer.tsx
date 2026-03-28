import React from "react";
import { Skeleton } from "antd";
import { Flex } from "./flex";
import { Button } from "./button";
import { Typography } from "./typography";
import { Timer } from "./timer";
import { RadioGroup } from "./radio";
import { Select } from "./select";
import firstBeepMp3 from "~/assets/first-beep.mp3";
import countdownBeepsAudio from "~/assets/timer-11-beeps.mp3";
import { useAudio } from "~/hooks/useAudio";
import { useCountdownBeeps } from "~/hooks/useCountdownBeeps";
import { COUNTDOWN_INTERVAL_MS } from "~/hooks/useCanvasTimer";
import { Field, FormFieldTable } from "./formFieldTable";
import { atomWithPersistence, useAtom } from "~/state/localStorage";
import { z } from "zod";
import { hydrationLock, HydrationLock } from "~/utils/hydration";
import { useHydrate } from "~/hooks/useHydrate";
import * as tst from "ts-toolbelt";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";

const MultiTimerStateSchema = z.object({
  showAllTimers: z.boolean(),
  maxBeepCount: z.number(),
});

type MultiTimerState = z.infer<typeof MultiTimerStateSchema>;

const multiTimerStateAtom = atomWithPersistence(
  "multiTimerState",
  MultiTimerStateSchema,
  { showAllTimers: false, maxBeepCount: 5 },
);

const calculateOffset = (timers: number[], index: number) =>
  timers.slice(0, index).reduce((sum, ms) => sum + ms, 0);

type InnerProps = {
  state: MultiTimerState;
  setState: (state: HydrationLock<MultiTimerState>) => void;
  minutesBeforeTarget: number;
  milliseconds: number[];
  labels?: React.ReactNode[];
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
  labels,
}: InnerProps) => {
  const t = useActiveRouteTranslations();
  const [startTimeMs, setStartTimeMs] = React.useState<number | null>(null);
  const [currentTimerIndex, setCurrentTimerIndex] = React.useState(0);
  const { playBeeps: playKeepAlive, stopBeeps: stopKeepAlive } = useAudio({
    url: firstBeepMp3,
  });

  const countdownBeeps = Math.min(
    Math.floor((milliseconds[currentTimerIndex] ?? 0) / COUNTDOWN_INTERVAL_MS),
    state.maxBeepCount,
  );

  const { playTrimmedBeeps, stopBeeps } = useCountdownBeeps({
    audioUrl: countdownBeepsAudio,
    countdownBeeps,
  });

  const currentMs = milliseconds[currentTimerIndex] ?? 0;
  const nextMs = milliseconds[currentTimerIndex + 1] ?? 0;
  const displayTimerMs = milliseconds.length === 0 ? [0] : milliseconds;
  const countdownMs = countdownBeeps * COUNTDOWN_INTERVAL_MS;

  // Calculate when this timer starts in the global timeline (sum of all previous timers)
  const timerStartOffset = calculateOffset(displayTimerMs, currentTimerIndex);

  // Keep audio system alive with quiet beeps
  React.useEffect(() => {
    if (startTimeMs == null) {
      return () => {};
    }
    const timer = setInterval(
      () => playKeepAlive({ count: 1, gain: 0.001 }),
      1000,
    );
    return () => clearInterval(timer);
  }, [startTimeMs, playKeepAlive]);

  // Play countdown beeps once at first countdown beep time
  React.useEffect(() => {
    if (startTimeMs == null) {
      return;
    }

    // First beep fires at: expirationMs - countdownMs
    const delayUntilFirstBeep = currentMs - countdownMs;
    const timeout = window.setTimeout(() => {
      playTrimmedBeeps();
    }, delayUntilFirstBeep);

    return () => clearTimeout(timeout);
  }, [startTimeMs, playTrimmedBeeps, currentMs, countdownMs]);

  const onExpire = () => {
    setCurrentTimerIndex((prev) => prev + 1);

    if (currentTimerIndex + 1 >= milliseconds.length) {
      setStartTimeMs(null);
      setCurrentTimerIndex(0);
    }
  };

  const timerSettingFields: Field[] = [
    {
      label: t["Display All Timers?"],
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
              { label: t["Yes"], value: "showAllTimers" },
              { label: t["No"], value: "showCurrentTimer" },
            ]}
          />
        </Flex>
      ),
    },
    {
      label: t["Beeps"],
      input: (
        <Select<number>
          name="countdownBeeps"
          disabled={startTimeMs != null}
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
            label: (index + 1).toString(),
            value: index,
          }))}
        />
      ),
    },
  ];

  return (
    <Flex vertical gap={24}>
      {!state.showAllTimers && (
        <>
          <Flex vertical gap={16} justify="center" align="center">
            <Timer
              expirationMs={currentMs}
              countdownMs={countdownMs}
              startTimeMs={startTimeMs}
              timerStartOffset={timerStartOffset}
              run={
                startTimeMs != null && currentTimerIndex < milliseconds.length
              }
              onExpire={onExpire}
            />
          </Flex>
          <Flex vertical gap={8}>
            <Typography.Title level={5} p={0} m={0}>
              {t["Next Phase"]}: {nextMs == null ? "None" : nextMs / 1000}
            </Typography.Title>
            <Typography.Title level={5} p={0} m={0}>
              {t["Minutes Before Target"]}: {minutesBeforeTarget}
            </Typography.Title>
          </Flex>
        </>
      )}

      {state.showAllTimers && (
        <>
          <Flex wrap gap={16} justify="center" align="center">
            {displayTimerMs.map((ms, index) => {
              const offsetForTimer = calculateOffset(displayTimerMs, index);
              return (
                <Timer
                  key={index}
                  label={labels?.[index]}
                  expirationMs={ms}
                  countdownMs={index === currentTimerIndex ? countdownMs : 0}
                  startTimeMs={startTimeMs}
                  timerStartOffset={offsetForTimer}
                  run={startTimeMs != null && index === currentTimerIndex}
                  onExpire={onExpire}
                />
              );
            })}
          </Flex>
          <Flex vertical gap={8}>
            <Typography.Title level={5} p={0} m={0}>
              {t["Minutes Before Target"]}: {minutesBeforeTarget}
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
          setStartTimeMs(newStartTimeMs);
          setCurrentTimerIndex(0);
          // Stop audio when timer is stopped
          if (newStartTimeMs == null) {
            stopBeeps();
            stopKeepAlive();
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
