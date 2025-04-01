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

const timerStateAtom = atomWithPersistence(
  "gen5StandardTimer",
  TimerStateSchema,
  {
    milliseconds: [],
    minutesBeforeTarget: 0,
  },
);

const FormStateSchema = z.object({
  console: ZodConsole,
  minTimeMs: ZodDecimalString,
  targetSecond: ZodDecimalString,
  calibration: ZodDecimalString,
  secondHit: z.union([ZodDecimalString, z.literal("")]),
});

type FormState = z.infer<typeof FormStateSchema>;

const initialValues: FormState = {
  console: "NdsSlot1",
  minTimeMs: toDecimalString(14000),
  targetSecond: toDecimalString(50),
  calibration: toDecimalString(-95),
  secondHit: "",
};

const timerSettingsAtom = atomWithPersistence(
  "gen5StandardTimerSettings",
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
    label: "Target Second",
    input: <FormikInput<FormState> name="targetSecond" />,
  },
  {
    label: "Calibration",
    input: <FormikInput<FormState> name="calibration" />,
  },
  {
    label: "Second Hit",
    input: <FormikInput<FormState> name="secondHit" />,
  },
];

export const Gen5StandardTimer = () => {
  const { initialSettings, onUpdate } = useTimerSettings(timerSettingsAtom);
  const [timer, setTimer] = useAtom(timerStateAtom);

  const onSubmit = React.useCallback<RngToolSubmit<FormState>>(
    async (opts, formik) => {
      let settings = {
        console: opts.console,
        min_time_ms: fromDecimalString(opts.minTimeMs) ?? 0,
        target_second: fromDecimalString(opts.targetSecond) ?? 0,
        calibration: fromDecimalString(opts.calibration) ?? 0,
      };

      if (opts.secondHit !== "") {
        const secondHit = fromDecimalString(opts.secondHit) ?? 0;
        settings = await rngTools.calibrate_gen5_standard_timer(
          settings,
          secondHit,
        );
        settings = {
          console: opts.console,
          min_time_ms: capPrecision(settings.min_time_ms),
          target_second: capPrecision(settings.target_second),
          calibration: capPrecision(settings.calibration),
        };
        formik.setValues({
          console: settings.console,
          minTimeMs: toDecimalString(settings.min_time_ms),
          targetSecond: toDecimalString(settings.target_second),
          calibration: toDecimalString(settings.calibration),
          secondHit: "",
        });
      }

      const milliseconds = await rngTools.create_gen5_standard_timer(settings);
      setTimer({
        milliseconds: [...milliseconds],
        minutesBeforeTarget: await rngTools.minutes_before(milliseconds),
      });
      onUpdate(opts);
    },
    [onUpdate, setTimer],
  );

  return (
    <Flex vertical gap={24}>
      <MultiTimer
        startButtonTrackerId="start_gen5_standard_timer"
        stopButtonTrackerId="stop_gen5_standard_timer"
        milliseconds={timer.milliseconds}
        minutesBeforeTarget={timer.minutesBeforeTarget}
      />

      <RngToolForm<FormState, number[]>
        fields={fields}
        initialValues={initialSettings}
        onSubmit={onSubmit}
        submitTrackerId="set_gen5_standard_timer"
        submitButtonLabel="Set Timer"
      />
    </Flex>
  );
};
