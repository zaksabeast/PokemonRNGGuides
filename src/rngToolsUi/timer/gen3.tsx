import React from "react";
import { Skeleton } from "antd";
import { Flex, RadioGroup } from "~/components";
import { ZodSerializedDecimal, ZodSerializedOptional } from "~/utils/number";
import { ZodConsole, minutesBefore, updateGen3Timer } from "~/rngTools";
import { atomWithPersistence, useAtom } from "~/state/localStorage";
import { multiTimerStateAtom } from "~/state/multiTimerState";
import { z } from "zod";
import { hydrationLock, HydrationLock } from "~/utils/hydration";
import { useHydrate } from "~/hooks/useHydrate";
import { useTimerSequence } from "~/hooks/useTimerSequence";
import { getGen3PhaseLabels } from "~/rngToolsUi/timer/atoms";
import { Gen3Setup } from "./gen3Setup";
import { RunView } from "./runView";

const TimerStateSchema = z.object({
  milliseconds: z.array(z.number()),
  minutesBeforeTarget: z.number(),
});

type TimerState = z.infer<typeof TimerStateSchema>;

const timerStateAtom = atomWithPersistence("gen3Timer", TimerStateSchema, {
  milliseconds: [],
  minutesBeforeTarget: 0,
});

const V0FormStateSchema = z
  .object({
    version: z.literal(0).optional(),
    console: ZodConsole,
    pre_timer: ZodSerializedDecimal,
    target_frame: ZodSerializedDecimal,
    calibration: ZodSerializedDecimal,
    frame_hit: ZodSerializedOptional(ZodSerializedDecimal),
  })
  .transform((data) => ({
    version: 1 as const,
    console: data.console,
    preTimer: data.pre_timer,
    targetFrame: data.target_frame,
    calibration: data.calibration,
    frameHit: data.frame_hit,
  }));

const V1FormStateSchema = z.object({
  version: z.literal(1),
  console: ZodConsole,
  preTimer: ZodSerializedDecimal,
  targetFrame: ZodSerializedDecimal,
  calibration: ZodSerializedDecimal,
  frameHit: ZodSerializedOptional(ZodSerializedDecimal),
});

const FormStateSchema = z.discriminatedUnion("version", [
  V1FormStateSchema,
  V0FormStateSchema,
]);

export type FormState = z.infer<typeof FormStateSchema>;

const initialValues: FormState = {
  version: 1,
  console: "Gba",
  preTimer: 5000,
  targetFrame: 1000,
  calibration: 0.0,
  frameHit: null,
};

const timerSettingsAtom = atomWithPersistence(
  "gen3TimerSettings",
  FormStateSchema,
  initialValues,
);

type Mode = "setup" | "run";

type InnerProps = {
  timer: TimerState;
  setTimer: (timer: HydrationLock<TimerState>) => void;
  settings: FormState;
  onUpdate: (opts: HydrationLock<FormState>) => void;
  maxBeepCount: number;
  setMaxBeepCount: (maxBeepCount: number) => void;
};

const InnerGen3Timer = ({
  timer,
  setTimer,
  settings,
  onUpdate,
  maxBeepCount,
  setMaxBeepCount,
}: InnerProps) => {
  const [mode, setMode] = React.useState<Mode>("run");
  const sequence = useTimerSequence({
    milliseconds: timer.milliseconds,
    maxBeepCount,
  });

  const updateTimerSettings = (formState: FormState) => {
    const updatedTimer = updateGen3Timer(formState);
    setTimer(
      hydrationLock({
        milliseconds: updatedTimer.ms,
        minutesBeforeTarget: minutesBefore(updatedTimer.ms),
      }),
    );
    onUpdate(hydrationLock(formState));
  };

  const onCalibrate = (frameHit: number) => {
    const updated = updateGen3Timer(settings, frameHit);
    updateTimerSettings({ ...updated.settings, version: 1, frameHit: null });
  };

  const labels = getGen3PhaseLabels(settings);

  return (
    <Flex vertical gap={16}>
      <RadioGroup<Mode>
        name="timerMode"
        optionType="button"
        value={mode}
        onChange={({ target }) => setMode(target.value)}
        options={[
          { label: "Setup", value: "setup", disabled: sequence.isRunning },
          { label: "Run", value: "run" },
        ]}
      />

      {mode === "run" && (
        <RunView
          sequence={sequence}
          milliseconds={timer.milliseconds}
          startTrackerId="start_gen3_timer"
          stopTrackerId="stop_gen3_timer"
          listTitle="Timers"
          rows={timer.milliseconds.map((ms, index) => ({
            id: index,
            label: labels[index] ?? `Phase ${index + 1}`,
            ms,
          }))}
          onEdit={() => setMode("setup")}
          hit={{
            id: 0,
            type: "single",
            label: "Frame Hit",
            numType: "float",
            trackerId: "calibrate_gen3_timer",
            onCalibrate,
          }}
        />
      )}

      {mode === "setup" && (
        <Gen3Setup
          settings={settings}
          maxBeepCount={maxBeepCount}
          setMaxBeepCount={setMaxBeepCount}
          onSet={(draft) => {
            updateTimerSettings({
              ...settings,
              ...draft,
              version: 1,
              frameHit: null,
            });
            setMode("run");
          }}
        />
      )}
    </Flex>
  );
};

export const Gen3Timer = () => {
  const [settings, setSettings] = useAtom(timerSettingsAtom);
  const [timer, setTimer] = useAtom(timerStateAtom);
  const [lockedMultiTimerState, setLockedMultiTimerState] =
    useAtom(multiTimerStateAtom);
  const { hydrated, client } = useHydrate({
    settings,
    timer,
    multiTimerState: lockedMultiTimerState,
  });

  if (!hydrated) {
    return <Skeleton />;
  }

  return (
    <InnerGen3Timer
      timer={client.timer}
      setTimer={setTimer}
      settings={client.settings}
      onUpdate={setSettings}
      maxBeepCount={client.multiTimerState.maxBeepCount}
      setMaxBeepCount={(maxBeepCount) =>
        setLockedMultiTimerState(
          hydrationLock({ ...client.multiTimerState, maxBeepCount }),
        )
      }
    />
  );
};
