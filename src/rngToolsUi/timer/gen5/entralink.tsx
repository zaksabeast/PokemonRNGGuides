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
import { Gen5EntralinkTimerSettings, rngTools, ZodConsole } from "~/rngTools";
import { atomWithPersistence, useAtom } from "~/state/localStorage";
import { useTimerSettings } from "~/state/timerSettings";
import { z } from "zod";

const TimerStateSchema = z.object({
  milliseconds: z.array(z.number()),
  minutesBeforeTarget: z.number(),
});

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
  minTimeMs: ZodDecimalString,
  targetDelay: ZodDecimalString,
  targetSecond: ZodDecimalString,
  calibration: ZodDecimalString,
  entralinkCalibration: ZodDecimalString,
  delayHit: z.union([ZodDecimalString, z.literal("")]),
  secondHit: z.union([ZodDecimalString, z.literal("")]),
});

type FormState = z.infer<typeof FormStateSchema>;

const initialValues: FormState = {
  console: "NdsSlot1",
  minTimeMs: toDecimalString(14000),
  targetDelay: toDecimalString(1200),
  targetSecond: toDecimalString(50),
  calibration: toDecimalString(-95),
  entralinkCalibration: toDecimalString(256),
  delayHit: "",
  secondHit: "",
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
    label: "Entralink Calibration",
    input: <FormikInput<FormState> name="entralinkCalibration" />,
  },
  {
    label: "Delay Hit",
    input: <FormikInput<FormState> name="delayHit" />,
  },
  {
    label: "Second Hit",
    input: <FormikInput<FormState> name="secondHit" />,
  },
];

export const Gen5EntralinkTimer = () => {
  const { initialSettings, onUpdate } = useTimerSettings(timerSettingsAtom);
  const [timer, setTimer] = useAtom(timerStateAtom);

  const onSubmit = React.useCallback<RngToolSubmit<FormState>>(
    async (opts, formik) => {
      let settings: Gen5EntralinkTimerSettings = {
        console: opts.console,
        min_time_ms: fromDecimalString(opts.minTimeMs) ?? 0,
        target_delay: fromDecimalString(opts.targetDelay) ?? 0,
        target_second: fromDecimalString(opts.targetSecond) ?? 0,
        calibration: fromDecimalString(opts.calibration) ?? 0,
        entralink_calibration:
          fromDecimalString(opts.entralinkCalibration) ?? 0,
      };

      if (opts.secondHit !== "" && opts.delayHit !== "") {
        const delayHit = fromDecimalString(opts.delayHit) ?? 0;
        const secondHit = fromDecimalString(opts.secondHit) ?? 0;
        settings = await rngTools.calibrate_gen5_entralink_timer(
          settings,
          secondHit,
          delayHit,
        );
        settings = {
          console: opts.console,
          min_time_ms: capPrecision(settings.min_time_ms),
          target_delay: capPrecision(settings.target_delay),
          target_second: capPrecision(settings.target_second),
          calibration: capPrecision(settings.calibration),
          entralink_calibration: capPrecision(settings.entralink_calibration),
        };
        formik.setValues({
          console: settings.console,
          minTimeMs: toDecimalString(settings.min_time_ms),
          targetDelay: toDecimalString(settings.target_delay),
          targetSecond: toDecimalString(settings.target_second),
          calibration: toDecimalString(settings.calibration),
          entralinkCalibration: toDecimalString(settings.entralink_calibration),
          delayHit: "",
          secondHit: "",
        });
      }

      const milliseconds = await rngTools.create_gen5_entralink_timer(settings);
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
