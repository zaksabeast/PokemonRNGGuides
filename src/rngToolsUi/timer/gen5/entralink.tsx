import React from "react";
import { Skeleton } from "antd";
import {
  FormikNumberInput,
  RngToolForm,
  RngToolSubmit,
  Field,
  FormikSelect,
  Flex,
  MultiTimer,
} from "~/components";
import {
  capPrecision,
  ZodSerializedDecimal,
  ZodSerializedOptional,
} from "~/utils/number";
import { Gen5EntralinkTimerSettings, rngTools, ZodConsole } from "~/rngTools";
import { atomWithPersistence, useAtom } from "~/state/localStorage";
import { useTimerSettings } from "~/state/timerSettings";
import { z } from "zod";
import { useHydrate } from "~/hooks/useHydrate";
import { hydrationLock, HydrationLock } from "~/utils/hydration";

const TimerStateSchema = z.object({
  milliseconds: z.array(z.number()),
  minutesBeforeTarget: z.number(),
});

type TimerState = z.infer<typeof TimerStateSchema>;

const timerStateAtom = atomWithPersistence(
  "gen5EntralinkTimer",
  TimerStateSchema,
  {
    milliseconds: [],
    minutesBeforeTarget: 0,
  },
);

const FormStateSchema = z.object({
  console: ZodConsole,
  minTimeMs: ZodSerializedDecimal,
  targetDelay: ZodSerializedDecimal,
  targetSecond: ZodSerializedDecimal,
  calibration: ZodSerializedDecimal,
  entralinkCalibration: ZodSerializedDecimal,
  delayHit: ZodSerializedOptional(ZodSerializedDecimal),
  secondHit: ZodSerializedOptional(ZodSerializedDecimal),
});

export type FormState = z.infer<typeof FormStateSchema>;

const initialValues: FormState = {
  console: "NdsSlot1",
  minTimeMs: 14000,
  targetDelay: 1200,
  targetSecond: 50,
  calibration: -95,
  entralinkCalibration: 256,
  delayHit: null,
  secondHit: null,
};

const timerSettingsAtom = atomWithPersistence(
  "gen5EntralinkTimerSettings",
  FormStateSchema,
  initialValues,
);

const fields: Field[] = [
  {
    label: "Console",
    input: (
      <FormikSelect<FormState, "console">
        name="console"
        options={[
          { label: "NDS - Slot 1", value: "NdsSlot1" },
          { label: "DSI", value: "Dsi" },
          { label: "3DS", value: "ThreeDs" },
        ]}
      />
    ),
  },
  {
    label: "Min Time (ms)",
    input: <FormikNumberInput<FormState> name="minTimeMs" numType="float" />,
  },
  {
    label: "Target Delay",
    input: <FormikNumberInput<FormState> name="targetDelay" numType="float" />,
  },
  {
    label: "Target Second",
    input: <FormikNumberInput<FormState> name="targetSecond" numType="float" />,
  },
  {
    label: "Calibration",
    input: <FormikNumberInput<FormState> name="calibration" numType="float" />,
  },
  {
    label: "Entralink Calibration",
    input: (
      <FormikNumberInput<FormState>
        name="entralinkCalibration"
        numType="float"
      />
    ),
  },
  {
    label: "Delay Hit",
    input: <FormikNumberInput<FormState> name="delayHit" numType="float" />,
  },
  {
    label: "Second Hit",
    input: <FormikNumberInput<FormState> name="secondHit" numType="float" />,
  },
];

type InnerProps = {
  timer: TimerState;
  setTimer: (timer: HydrationLock<TimerState>) => void;
  initialSettings: FormState;
  onUpdate: (opts: HydrationLock<FormState>) => void;
};

const InnerGen5EntralinkTimer = ({
  timer,
  setTimer,
  initialSettings,
  onUpdate,
}: InnerProps) => {
  const onSubmit = React.useCallback<RngToolSubmit<FormState>>(
    async (opts, { setValue }) => {
      let updatedOpts = opts;
      let settings: Gen5EntralinkTimerSettings = {
        console: opts.console,
        min_time_ms: opts.minTimeMs,
        target_delay: opts.targetDelay,
        target_second: opts.targetSecond,
        calibration: opts.calibration,
        entralink_calibration: opts.entralinkCalibration,
      };

      if (opts.secondHit != null && opts.delayHit != null) {
        settings = await rngTools.calibrate_gen5_entralink_timer(
          settings,
          opts.secondHit,
          opts.delayHit,
        );
        settings = {
          console: opts.console,
          min_time_ms: capPrecision(settings.min_time_ms),
          target_delay: capPrecision(settings.target_delay),
          target_second: capPrecision(settings.target_second),
          calibration: capPrecision(settings.calibration),
          entralink_calibration: capPrecision(settings.entralink_calibration),
        };
        updatedOpts = {
          console: settings.console,
          minTimeMs: settings.min_time_ms,
          targetDelay: settings.target_delay,
          targetSecond: settings.target_second,
          calibration: settings.calibration,
          entralinkCalibration: settings.entralink_calibration,
          delayHit: null,
          secondHit: null,
        };

        setValue("console", updatedOpts.console);
        setValue("minTimeMs", updatedOpts.minTimeMs);
        setValue("targetDelay", updatedOpts.targetDelay);
        setValue("targetSecond", updatedOpts.targetSecond);
        setValue("calibration", updatedOpts.calibration);
        setValue("entralinkCalibration", updatedOpts.entralinkCalibration);
        setValue("delayHit", updatedOpts.delayHit);
        setValue("secondHit", updatedOpts.secondHit);
      }

      const milliseconds = await rngTools.create_gen5_entralink_timer(settings);
      setTimer(
        hydrationLock({
          milliseconds: [...milliseconds],
          minutesBeforeTarget: await rngTools.minutes_before(milliseconds),
        }),
      );
      onUpdate(hydrationLock(updatedOpts));
    },
    [onUpdate, setTimer],
  );

  return (
    <Flex vertical gap={12}>
      <MultiTimer
        startButtonTrackerId="start_gen5_entralink_timer"
        stopButtonTrackerId="stop_gen5_entralink_timer"
        milliseconds={timer.milliseconds}
        minutesBeforeTarget={timer.minutesBeforeTarget}
      />

      <RngToolForm<FormState, number[]>
        fields={fields}
        initialValues={initialSettings}
        onSubmit={onSubmit}
        submitTrackerId="set_gen5_entralink_timer"
        submitButtonLabel="Set Timer"
      />
    </Flex>
  );
};

export const Gen5EntralinkTimer = () => {
  const { initialSettings, onUpdate } = useTimerSettings(timerSettingsAtom);
  const [timer, setTimer] = useAtom(timerStateAtom);
  const { hydrated, client } = useHydrate({ initialSettings, timer });

  if (!hydrated) {
    return <Skeleton />;
  }

  return (
    <InnerGen5EntralinkTimer
      {...client}
      setTimer={setTimer}
      onUpdate={onUpdate}
    />
  );
};
