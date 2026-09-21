import React from "react";
import { Skeleton } from "antd";
import { Flex, RadioGroup } from "~/components";
import { type GameConsole, minutesBefore } from "~/rngTools";
import { useTimerSequence } from "~/hooks/useTimerSequence";
import { hydrationLock, HydrationLock } from "~/utils/hydration";
import { useHydrate } from "~/hooks/useHydrate";
import { useAtom } from "~/state/localStorage";
import { multiTimerStateAtom } from "~/state/multiTimerState";
import { RunView, type HitField } from "../runView";
import { Gen5Setup, type SetupField } from "./setup";
import { type TimerState } from "./timerState";

/**
 * Everything that differs between the gen 5 timer variants.
 *
 * `Settings` is what the timer math needs, and `Persisted` is what is stored,
 * which also carries the storage version and the (always cleared) hit values.
 */
type Gen5VariantConfigBase<
  Settings extends { console: GameConsole },
  Persisted extends Settings,
> = {
  trackerPrefix: string;
  listTitle: string;
  rowLabels: string[];
  hitLabel: string;
  targetFields: SetupField<Settings>[];
  calibrationFields: SetupField<Settings>[];
  create: (settings: Settings) => number[];
  toPersisted: (settings: Settings) => Persisted;
};

export type Gen5VariantConfigSingle<
  Settings extends { console: GameConsole },
  Persisted extends Settings,
> = Gen5VariantConfigBase<Settings, Persisted> & {
  type: "single";
  hitNumType: "hex" | "float";
  calibrate: (settings: Settings, hit: number) => Settings;
};

export type Gen5VariantConfigMulti<
  Settings extends { console: GameConsole },
  Persisted extends Settings,
  HitId extends string,
> = Gen5VariantConfigBase<Settings, Persisted> & {
  type: "multi";
  hitFields: HitField<HitId>[];
  calibrate: (settings: Settings, hits: Record<HitId, number>) => Settings;
};

export type Gen5VariantConfig<
  Settings extends { console: GameConsole },
  Persisted extends Settings,
  HitId extends string,
> =
  | Gen5VariantConfigSingle<Settings, Persisted>
  | Gen5VariantConfigMulti<Settings, Persisted, HitId>;

type Mode = "setup" | "run";

type InnerProps<
  Settings extends { console: GameConsole },
  Persisted extends Settings,
  HitId extends string,
> = {
  config: Gen5VariantConfig<Settings, Persisted, HitId>;
  timer: TimerState;
  setTimer: (timer: HydrationLock<TimerState>) => void;
  initialSettings: Persisted;
  onUpdate: (opts: HydrationLock<Persisted>) => void;
  maxBeepCount: number;
  setMaxBeepCount: (maxBeepCount: number) => void;
};

const InnerGen5Timer = <
  Settings extends { console: GameConsole },
  Persisted extends Settings,
  HitId extends string,
>({
  config,
  timer,
  setTimer,
  initialSettings,
  onUpdate,
  maxBeepCount,
  setMaxBeepCount,
}: InnerProps<Settings, Persisted, HitId>) => {
  const [settings, setSettings] = React.useState(initialSettings);
  const [mode, setMode] = React.useState<Mode>("run");
  const sequence = useTimerSequence({
    milliseconds: timer.milliseconds,
    maxBeepCount,
  });

  const updateTimerSettings = (updated: Persisted) => {
    const milliseconds = config.create(updated);
    setTimer(
      hydrationLock({
        milliseconds,
        minutesBeforeTarget: minutesBefore(milliseconds),
      }),
    );
    onUpdate(hydrationLock(updated));
    setSettings(updated);
  };

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
          startTrackerId={`start_${config.trackerPrefix}_timer`}
          stopTrackerId={`stop_${config.trackerPrefix}_timer`}
          listTitle={config.listTitle}
          rows={timer.milliseconds.map((ms, index) => ({
            id: index,
            label: config.rowLabels[index] ?? `Timer ${index + 1}`,
            ms,
          }))}
          onEdit={() => setMode("setup")}
          hit={
            config.type === "multi"
              ? {
                  id: 0,
                  type: "multi",
                  label: config.hitLabel,
                  fields: config.hitFields,
                  trackerId: `calibrate_${config.trackerPrefix}_timer`,
                  onCalibrate: (hits: Record<HitId, number>) =>
                    updateTimerSettings(
                      config.toPersisted(config.calibrate(settings, hits)),
                    ),
                }
              : {
                  id: 0,
                  type: "single",
                  label: config.hitLabel,
                  numType: config.hitNumType,
                  trackerId: `calibrate_${config.trackerPrefix}_timer`,
                  onCalibrate: (hit: number) =>
                    updateTimerSettings(
                      config.toPersisted(config.calibrate(settings, hit)),
                    ),
                }
          }
        />
      )}

      {mode === "setup" && (
        <Gen5Setup<Settings>
          settings={settings}
          targetFields={config.targetFields}
          calibrationFields={config.calibrationFields}
          maxBeepCount={maxBeepCount}
          setMaxBeepCount={setMaxBeepCount}
          setTrackerId={`set_${config.trackerPrefix}_timer`}
          onSet={(draft) => {
            updateTimerSettings(config.toPersisted(draft));
            setMode("run");
          }}
        />
      )}
    </Flex>
  );
};

type Gen5VariantTimerProps<
  Settings extends { console: GameConsole },
  Persisted extends Settings,
  HitId extends string,
> = {
  config: Gen5VariantConfig<Settings, Persisted, HitId>;
  initialSettings: HydrationLock<Persisted>;
  onUpdate: (opts: HydrationLock<Persisted>) => void;
  timer: HydrationLock<TimerState>;
  setTimer: (timer: HydrationLock<TimerState>) => void;
};

export const Gen5VariantTimer = <
  Settings extends { console: GameConsole },
  Persisted extends Settings,
  HitId extends string,
>({
  config,
  initialSettings,
  onUpdate,
  timer,
  setTimer,
}: Gen5VariantTimerProps<Settings, Persisted, HitId>) => {
  const [lockedMultiTimerState, setLockedMultiTimerState] =
    useAtom(multiTimerStateAtom);
  const { hydrated, client } = useHydrate({
    initialSettings,
    timer,
    multiTimerState: lockedMultiTimerState,
  });

  if (!hydrated) {
    return <Skeleton />;
  }

  return (
    <InnerGen5Timer
      config={config}
      timer={client.timer}
      setTimer={setTimer}
      initialSettings={client.initialSettings}
      onUpdate={onUpdate}
      maxBeepCount={client.multiTimerState.maxBeepCount}
      setMaxBeepCount={(maxBeepCount) =>
        setLockedMultiTimerState(
          hydrationLock({ ...client.multiTimerState, maxBeepCount }),
        )
      }
    />
  );
};
