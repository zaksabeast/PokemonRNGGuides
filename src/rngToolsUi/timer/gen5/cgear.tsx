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

const timerStateAtom = atomWithPersistence("gen5CGearTimer", TimerStateSchema, {
  milliseconds: [],
  minutesBeforeTarget: 0,
});

const FormStateSchema = z.object({
  console: ZodConsole,
  minTimeMs: ZodSerializedDecimal,
  targetDelay: ZodSerializedDecimal,
  targetSecond: ZodSerializedDecimal,
  calibration: ZodSerializedDecimal,
  delayHit: ZodSerializedOptional(ZodSerializedDecimal),
});

export type FormState = z.infer<typeof FormStateSchema>;

const initialValues: FormState = {
  console: "NdsSlot1",
  minTimeMs: 14000,
  targetDelay: 1200,
  targetSecond: 50,
  calibration: -95,
  delayHit: null,
};

const timerSettingsAtom = atomWithPersistence(
  "gen5CGearTimerSettings",
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
    label: "Delay Hit",
    input: <FormikNumberInput<FormState> name="delayHit" numType="float" />,
  },
];

export const Gen5CGearTimer = () => {
  const { initialSettings, onUpdate } = useTimerSettings(timerSettingsAtom);
  const [timer, setTimer] = useAtom(timerStateAtom);

  const onSubmit = React.useCallback<RngToolSubmit<FormState>>(
    async (opts, formik) => {
      let updatedOpts = opts;
      let settings = {
        console: opts.console,
        min_time_ms: opts.minTimeMs,
        target_delay: opts.targetDelay,
        target_second: opts.targetSecond,
        calibration: opts.calibration,
      };

      if (opts.delayHit != null) {
        settings = await rngTools.calibrate_gen5_cgear_timer(
          settings,
          opts.delayHit,
        );
        settings = {
          console: opts.console,
          min_time_ms: capPrecision(settings.min_time_ms),
          target_delay: capPrecision(settings.target_delay),
          target_second: capPrecision(settings.target_second),
          calibration: capPrecision(settings.calibration),
        };
        updatedOpts = {
          console: settings.console,
          minTimeMs: settings.min_time_ms,
          targetDelay: settings.target_delay,
          targetSecond: settings.target_second,
          calibration: settings.calibration,
          delayHit: null,
        };
        formik.setValues(updatedOpts);
      }

      const milliseconds = await rngTools.create_gen5_cgear_timer(settings);
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
        startButtonTrackerId="start_gen5_cgear_timer"
        stopButtonTrackerId="stop_gen5_cgear_timer"
        milliseconds={timer.milliseconds}
        minutesBeforeTarget={timer.minutesBeforeTarget}
      />

      <RngToolForm<FormState, number[]>
        fields={fields}
        initialValues={initialSettings}
        onSubmit={onSubmit}
        submitTrackerId="set_gen5_cgear_timer"
        submitButtonLabel="Set Timer"
      />
    </Flex>
  );
};
