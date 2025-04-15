import React from "react";
import {
  FormikInput,
  RngToolForm,
  RngToolSubmit,
  Field,
  FormikSelect,
} from "~/components";
import {
  capPrecision,
  fromDecimalString,
  toDecimalString,
  ZodDecimalString,
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
  minTimeMs: ZodDecimalString,
  calibratedDelay: ZodDecimalString,
  calibratedSeconds: ZodDecimalString,
  targetDelay: ZodDecimalString,
  targetSeconds: ZodDecimalString,
  delayHit: z.union([ZodDecimalString, z.literal("")]),
});

export type FormState = z.infer<typeof FormStateSchema>;

const defaultValues: FormState = {
  console: "NdsSlot1",
  minTimeMs: toDecimalString(14000),
  calibratedDelay: toDecimalString(500),
  calibratedSeconds: toDecimalString(14),
  targetDelay: toDecimalString(600),
  targetSeconds: toDecimalString(50),
  delayHit: "",
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
    input: <FormikInput<FormState> name="minTimeMs" />,
  },
  {
    label: "Calibrated Delay",
    input: <FormikInput<FormState> name="calibratedDelay" />,
  },
  {
    label: "Calibrated Seconds",
    input: <FormikInput<FormState> name="calibratedSeconds" />,
  },
  {
    label: "Target Delay",
    input: <FormikInput<FormState> name="targetDelay" />,
  },
  {
    label: "Target Seconds",
    input: <FormikInput<FormState> name="targetSeconds" />,
  },
  {
    label: "Delay Hit",
    input: <FormikInput<FormState> name="delayHit" />,
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
        min_time_ms: fromDecimalString(opts.minTimeMs) ?? 0,
        calibrated_delay: fromDecimalString(opts.calibratedDelay) ?? 0,
        target_delay: fromDecimalString(opts.targetDelay) ?? 0,
        target_second: fromDecimalString(opts.targetSeconds) ?? 0,
        calibrated_second: fromDecimalString(opts.calibratedSeconds) ?? 0,
      };

      if (opts.delayHit !== "") {
        const delayHit = fromDecimalString(opts.delayHit) ?? 0;
        settings = await rngTools.calibrate_gen4_timer(settings, delayHit);
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
          minTimeMs: toDecimalString(settings.min_time_ms),
          calibratedDelay: toDecimalString(settings.calibrated_delay),
          calibratedSeconds: toDecimalString(settings.calibrated_second),
          targetDelay: toDecimalString(settings.target_delay),
          targetSeconds: toDecimalString(settings.target_second),
          delayHit: "",
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
