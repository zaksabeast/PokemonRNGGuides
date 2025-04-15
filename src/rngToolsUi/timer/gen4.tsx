import React from "react";
import {
  FormikNumberInput,
  RngToolForm,
  RngToolSubmit,
  Field,
  FormikSelect,
} from "~/components";
import {
  capPrecision,
  ZodSerializedDecimal,
  ZodSerializedOptional,
} from "~/utils/number";
import { Flex, MultiTimer } from "~/components";
import { rngTools, ZodConsole } from "~/rngTools";
import { atomWithPersistence, useAtom } from "~/state/localStorage";
import { useTimerSettings } from "~/state/timerSettings";
import { z } from "zod";

const TimerStateSchema = z.object({
  milliseconds: z.array(z.number()),
  minutesBeforeTarget: z.number(),
});

const timerStateAtom = atomWithPersistence("gen4Timer", TimerStateSchema, {
  milliseconds: [],
  minutesBeforeTarget: 0,
});

const FormStateSchema = z.object({
  console: ZodConsole,
  minTimeMs: ZodSerializedDecimal,
  calibratedDelay: ZodSerializedDecimal,
  calibratedSeconds: ZodSerializedDecimal,
  targetDelay: ZodSerializedDecimal,
  targetSeconds: ZodSerializedDecimal,
  delayHit: ZodSerializedOptional(ZodSerializedDecimal),
});

export type FormState = z.infer<typeof FormStateSchema>;

const defaultValues: FormState = {
  console: "NdsSlot1",
  minTimeMs: 14000,
  calibratedDelay: 500,
  calibratedSeconds: 14,
  targetDelay: 600,
  targetSeconds: 50,
  delayHit: undefined,
};

const timerSettingsAtom = atomWithPersistence(
  "gen4TimerSettings",
  FormStateSchema,
  defaultValues,
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
    label: "Calibrated Delay",
    input: (
      <FormikNumberInput<FormState> name="calibratedDelay" numType="float" />
    ),
  },
  {
    label: "Calibrated Seconds",
    input: (
      <FormikNumberInput<FormState> name="calibratedSeconds" numType="float" />
    ),
  },
  {
    label: "Target Delay",
    input: <FormikNumberInput<FormState> name="targetDelay" numType="float" />,
  },
  {
    label: "Target Seconds",
    input: (
      <FormikNumberInput<FormState> name="targetSeconds" numType="float" />
    ),
  },
  {
    label: "Delay Hit",
    input: <FormikNumberInput<FormState> name="delayHit" numType="float" />,
  },
];

export const Gen4Timer = () => {
  const { initialSettings, onUpdate } = useTimerSettings(timerSettingsAtom);
  const [timer, setTimer] = useAtom(timerStateAtom);

  const onSubmit = React.useCallback<RngToolSubmit<FormState>>(
    async (opts, formik) => {
      let updatedOpts = opts;
      let settings = {
        console: opts.console,
        min_time_ms: opts.minTimeMs,
        calibrated_delay: opts.calibratedDelay,
        target_delay: opts.targetDelay,
        target_second: opts.targetSeconds,
        calibrated_second: opts.calibratedSeconds,
      };

      if (opts.delayHit != null) {
        settings = await rngTools.calibrate_gen4_timer(settings, opts.delayHit);
        settings = {
          console: opts.console,
          min_time_ms: capPrecision(settings.min_time_ms),
          calibrated_delay: capPrecision(settings.calibrated_delay),
          calibrated_second: capPrecision(settings.calibrated_second),
          target_delay: capPrecision(settings.target_delay),
          target_second: capPrecision(settings.target_second),
        };
        updatedOpts = {
          console: settings.console,
          minTimeMs: settings.min_time_ms,
          calibratedDelay: settings.calibrated_delay,
          calibratedSeconds: settings.calibrated_second,
          targetDelay: settings.target_delay,
          targetSeconds: settings.target_second,
          delayHit: undefined,
        };
        formik.setValues(updatedOpts);
      }

      const milliseconds = await rngTools.create_gen4_timer(settings);
      setTimer({
        milliseconds: [...milliseconds],
        minutesBeforeTarget: await rngTools.minutes_before(milliseconds),
      });
      onUpdate(updatedOpts);
    },
    [onUpdate, setTimer],
  );

  return (
    <Flex vertical gap={24}>
      <MultiTimer
        startButtonTrackerId="start_gen4_timer"
        stopButtonTrackerId="stop_gen4_timer"
        milliseconds={timer.milliseconds}
        minutesBeforeTarget={timer.minutesBeforeTarget}
      />

      <RngToolForm<FormState, number[]>
        fields={fields}
        initialValues={initialSettings}
        onSubmit={onSubmit}
        submitTrackerId="set_gen4_timer"
        submitButtonLabel="Set Timer"
      />
    </Flex>
  );
};
