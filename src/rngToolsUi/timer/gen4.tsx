import React from "react";
import { Skeleton } from "antd";
import { Flex, RadioGroup } from "~/components";
import { MetronomeButton } from "~/components/metronome";
import { ZodSerializedDecimal, ZodSerializedOptional } from "~/utils/number";
import { ZodConsole } from "~/rngTools";
import {
  createGen4TimerAtom,
  type Gen4TimerUpdates,
} from "~/rngToolsUi/timer/atoms";
import { atomWithPersistence, useAtom } from "~/state/localStorage";
import { multiTimerStateAtom } from "~/state/multiTimerState";
import { z } from "zod";
import { useHydrate } from "~/hooks/useHydrate";
import { useMetronome } from "~/hooks/useMetronome";
import { useTimerSequence } from "~/hooks/useTimerSequence";
import { hydrationLock, HydrationLock } from "~/utils/hydration";
import { Gen4Setup } from "./gen4Setup";
import { RunView } from "./runView";

const timerStateAtom = createGen4TimerAtom();

const FormStateSchema = z.object({
  console: ZodConsole,
  minTimeMs: ZodSerializedDecimal,
  calibratedDelay: ZodSerializedDecimal,
  calibratedSecond: ZodSerializedDecimal,
  targetDelay: ZodSerializedDecimal,
  targetSecond: ZodSerializedDecimal,
  delayHit: ZodSerializedOptional(ZodSerializedDecimal),
});

export type FormState = z.infer<typeof FormStateSchema>;

const defaultValues: FormState = {
  console: "NdsSlot1",
  minTimeMs: 14000,
  calibratedDelay: 500,
  calibratedSecond: 14,
  targetDelay: 600,
  targetSecond: 50,
  delayHit: null,
};

const timerSettingsAtom = atomWithPersistence(
  "gen4TimerSettings",
  FormStateSchema,
  defaultValues,
);

// The timer is [phase up to the delay, delay]
const PHASE_LABELS = ["Seconds", "Delay"];

type Mode = "setup" | "run";

type InnerProps = {
  initialSettings: FormState;
  onUpdate: (opts: HydrationLock<FormState>) => void;
  maxBeepCount: number;
  setMaxBeepCount: (maxBeepCount: number) => void;
};

const InnerGen4Timer = ({
  initialSettings,
  onUpdate,
  maxBeepCount,
  setMaxBeepCount,
}: InnerProps) => {
  const hasInited = React.useRef(false);
  const [timer, updateTimer] = useAtom(timerStateAtom);
  const [mode, setMode] = React.useState<Mode>("run");
  const metronome = useMetronome({ enableAudio: true });
  const sequence = useTimerSequence({ milliseconds: timer.ms, maxBeepCount });

  React.useEffect(() => {
    if (hasInited.current) {
      return;
    }
    hasInited.current = true;
    updateTimer(initialSettings);
  }, [updateTimer, initialSettings]);

  const updateTimerSettings = (updates: Gen4TimerUpdates) => {
    const newTimer = updateTimer(updates);

    onUpdate(
      hydrationLock({
        ...newTimer.settings,
        delayHit: null,
      }),
    );

    return newTimer.settings;
  };

  const is3ds = timer.settings.console === "ThreeDs";

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
          milliseconds={timer.ms}
          startTrackerId="mystic_timer_gen4_start"
          stopTrackerId="mystic_timer_gen4_stop"
          listTitle="Timers"
          rows={timer.ms.map((ms, index) => ({
            id: index,
            label: PHASE_LABELS[index] ?? `Phase ${index + 1}`,
            ms,
          }))}
          onEdit={() => setMode("setup")}
          disableStart={
            (is3ds && !metronome.isRunning) ||
            (metronome.isRunning && !metronome.justTicked)
          }
          belowStartButton={is3ds && <MetronomeButton {...metronome} />}
          hit={{
            id: 0,
            type: "single",
            label: "Delay Hit",
            numType: "float",
            trackerId: "calibrate_gen4_timer",
            onCalibrate: (delayHit: number) =>
              updateTimerSettings({ ...timer.settings, delayHit }),
          }}
        />
      )}

      {mode === "setup" && (
        <Gen4Setup
          settings={timer.settings}
          maxBeepCount={maxBeepCount}
          setMaxBeepCount={setMaxBeepCount}
          onSet={(settings) => {
            updateTimerSettings(settings);
            setMode("run");
          }}
        />
      )}
    </Flex>
  );
};

export const Gen4Timer = () => {
  const [timerSettings, setTimerSettings] = useAtom(timerSettingsAtom);
  const [lockedMultiTimerState, setLockedMultiTimerState] =
    useAtom(multiTimerStateAtom);
  const { hydrated, client } = useHydrate({
    settings: timerSettings,
    multiTimerState: lockedMultiTimerState,
  });

  if (!hydrated) {
    return <Skeleton />;
  }

  return (
    <InnerGen4Timer
      initialSettings={client.settings}
      onUpdate={setTimerSettings}
      maxBeepCount={client.multiTimerState.maxBeepCount}
      setMaxBeepCount={(maxBeepCount) =>
        setLockedMultiTimerState(
          hydrationLock({ ...client.multiTimerState, maxBeepCount }),
        )
      }
    />
  );
};
