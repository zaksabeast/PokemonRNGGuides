import React from "react";
import {
  FormikInput,
  RngToolForm,
  RngToolSubmit,
  Field,
  FormikSelect,
} from "~/components";
import {
  toDecimalString,
  fromDecimalString,
  capPrecision,
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

const timerStateAtom = atomWithPersistence("gen5CGearTimer", TimerStateSchema, {
  milliseconds: [],
  minutesBeforeTarget: 0,
});

const FormStateSchema = z.object({
  console: ZodConsole,
  minTimeMs: ZodDecimalString,
  targetDelay: ZodDecimalString,
  targetSecond: ZodDecimalString,
  calibration: ZodDecimalString,
  delayHit: z.union([ZodDecimalString, z.literal("")]),
});

export type FormState = z.infer<typeof FormStateSchema>;

const initialValues: FormState = {
  console: "NdsSlot1",
  minTimeMs: toDecimalString(14000),
  targetDelay: toDecimalString(1200),
  targetSecond: toDecimalString(50),
  calibration: toDecimalString(-95),
  delayHit: "",
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
    input: <FormikInput<FormState> name="minTimeMs" />,
  },
  {
    label: "Target Delay",
    input: <FormikInput<FormState> name="targetDelay" />,
  },
  {
    label: "Target Second",
    input: <FormikInput<FormState> name="targetSecond" />,
  },
  {
    label: "Calibration",
    input: <FormikInput<FormState> name="calibration" />,
  },
  {
    label: "Delay Hit",
    input: <FormikInput<FormState> name="delayHit" />,
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
        min_time_ms: fromDecimalString(opts.minTimeMs) ?? 0,
        target_delay: fromDecimalString(opts.targetDelay) ?? 0,
        target_second: fromDecimalString(opts.targetSecond) ?? 0,
        calibration: fromDecimalString(opts.calibration) ?? 0,
      };

      if (opts.delayHit !== "") {
        const delayHit = fromDecimalString(opts.delayHit) ?? 0;
        settings = await rngTools.calibrate_gen5_cgear_timer(
          settings,
          delayHit,
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
          minTimeMs: toDecimalString(settings.min_time_ms),
          targetDelay: toDecimalString(settings.target_delay),
          targetSecond: toDecimalString(settings.target_second),
          calibration: toDecimalString(settings.calibration),
          delayHit: "",
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
