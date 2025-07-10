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
import experimentalBeeps from "~/assets/timer-6-beeps.mp3";
import { useAudio } from "~/hooks/useAudio";
import { FormFieldTable } from "./formFieldTable";
import { atomWithPersistence, useAtom } from "~/state/localStorage";
import { z } from "zod";
import { hydrationLock, HydrationLock } from "~/utils/hydration";
import { useHydrate } from "~/hooks/useHydrate";
import * as tst from "ts-toolbelt";
import { Switch } from "./switch";
import { createTranslator, Translations } from "~/utils/siteLanguage";
import { LanguageKey } from "~/guides";

const englishTranslations = {
  "Minutes Before Target": "Minutes Before Target",
  Yes: "Yes",
  No: "No",
  "Display All Timers?": "Display All Timers?",
  Beeps: "Beeps",
  "Sync Optimization": "Sync Optimization",
  "Experimental Sync (Test)": "Experimental Sync (Test)",
  "Next Phase": "Next Phase",
} as const;

const translations = {
  en: englishTranslations,
  es: englishTranslations,
  zh: englishTranslations,
  fr: englishTranslations,
  it: {
    "Minutes Before Target": "Minuti prima del target",
    Yes: "Sì",
    No: "No",
    "Display All Timers?": "Mostra tutti i timer?",
    Beeps: "Beeps",
    "Sync Optimization": "Sync Optimization",
    "Experimental Sync (Test)": "Experimental Sync (Test)",
    "Next Phase": "Next Phase",
  },
} as const satisfies Translations<typeof englishTranslations>;

const t = createTranslator(translations);

const MultiTimerStateSchema = z.object({
  showAllTimers: z.boolean(),
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
  language?: LanguageKey;
};

const InnerMultiTimer = ({
  state,
  setState,
  minutesBeforeTarget,
  milliseconds,
  disableStart = false,
  startButtonTrackerId,
  stopButtonTrackerId,
  language = "en",
}: InnerProps) => {
  const [experimentalSync, setExperimentalSync] = React.useState(false);
  const [startTimeMs, setStartTimeMs] = React.useState<number | null>(null);
  const [currentTimerIndex, setCurrentTimerIndex] = React.useState(0);
  const { playBeeps: playExperimentalBeeps, ...experimentalBeep } = useAudio({
    url: experimentalBeeps,
  });
  const { playBeeps: playFirstBeeps, ...firstBeep } = useAudio({
    url: firstBeepMp3,
  });
  const { playBeeps: playSecondBeeps, ...secondBeep } = useAudio({
    url: secondBeepMp3,
  });
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
    if (experimentalSync) {
      playExperimentalBeeps({ count: 1 });
      return;
    }
    playFirstBeeps({ count: countdownBeeps });
  }, [playFirstBeeps, playExperimentalBeeps, experimentalSync, countdownBeeps]);

  const onExpire = React.useCallback(() => {
    if (!experimentalSync) {
      playSecondBeeps({ count: 1 });
    }

    setCurrentTimerIndex((prev) => prev + 1);

    if (currentTimerIndex + 1 >= milliseconds.length) {
      setStartTimeMs(null);
      setCurrentTimerIndex(0);
    }
  }, [
    playSecondBeeps,
    currentTimerIndex,
    milliseconds.length,
    experimentalSync,
  ]);

  React.useEffect(() => {
    setStartTimeMs(null);
    setCurrentTimerIndex(0);
  }, [milliseconds]);

  const timerSettingFields = React.useMemo(
    () => [
      {
        label: t("Display All Timers?", language),
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
                { label: t("Yes", language), value: "showAllTimers" },
                { label: t("No", language), value: "showCurrentTimer" },
              ]}
            />
          </Flex>
        ),
      },
      {
        label: t("Sync Optimization", language),
        tooltip:
          "Enable only if beep timing is off. Improves audio sync on some devices by working around browser and Bluetooth quirks.",
        input: (
          <Flex justify="flex-end">
            <Switch
              checked={state.hardwareSyncSound}
              onChange={(checked) => {
                setState(
                  hydrationLock({
                    ...state,
                    hardwareSyncSound: checked,
                  }),
                );
              }}
            />
          </Flex>
        ),
      },
      {
        label: t("Experimental Sync (Test)", language),
        tooltip:
          "Enable only if beep timing is off. Improves audio sync on some devices by working around browser and Bluetooth quirks.",
        input: (
          <Flex justify="flex-end">
            <Switch
              checked={experimentalSync}
              onChange={(checked) => {
                setExperimentalSync(checked);
                if (checked) {
                  setState(
                    hydrationLock({
                      ...state,
                      hardwareSyncSound: true,
                      maxBeepCount: 5,
                    }),
                  );
                }
              }}
            />
          </Flex>
        ),
      },
      {
        label: t("Beeps", language),
        input: (
          <Select<number>
            name="countdownBeeps"
            disabled={experimentalSync}
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
    ],
    [state, setState, experimentalSync, language],
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
              {t("Next Phase", language)}:{" "}
              {nextMs == null ? "None" : nextMs / 1000}
            </Typography.Title>
            <Typography.Title level={5} p={0} m={0}>
              {t("Minutes Before Target", language)}: {minutesBeforeTarget}
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
              {t("Minutes Before Target", language)}: {minutesBeforeTarget}
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
            experimentalBeep.stopBeeps();
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
