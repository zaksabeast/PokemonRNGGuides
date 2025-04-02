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
import {
  Gen5EntralinkPlusTimerSettings,
  rngTools,
  ZodConsole,
} from "~/rngTools";
import { atomWithPersistence, useAtom } from "~/state/localStorage";
import { useTimerSettings } from "~/state/timerSettings";
import { z } from "zod";

const TimerStateSchema = z.object({
  milliseconds: z.array(z.number()),
  minutesBeforeTarget: z.number(),
});

const timerStateAtom = atomWithPersistence(
  "gen5EntralinkPlusTimer",
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
  targetAdvance: ZodDecimalString,
  calibration: ZodDecimalString,
  entralinkCalibration: ZodDecimalString,
  frameCalibration: ZodDecimalString,
  delayHit: z.union([ZodDecimalString, z.literal("")]),
  secondHit: z.union([ZodDecimalString, z.literal("")]),
  advanceHit: z.union([ZodDecimalString, z.literal("")]),
});

type FormState = z.infer<typeof FormStateSchema>;

const initialValues: FormState = {
  console: "NdsSlot1",
  minTimeMs: toDecimalString(14000),
  targetDelay: toDecimalString(1200),
  targetSecond: toDecimalString(50),
  targetAdvance: toDecimalString(100),
  calibration: toDecimalString(-95),
  entralinkCalibration: toDecimalString(256),
  frameCalibration: toDecimalString(0),
  delayHit: "",
  secondHit: "",
  advanceHit: "",
};

const timerSettingsAtom = atomWithPersistence(
  "gen5EntralinkPlusTimerSettings",
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
    label: "Target Advance",
    input: <FormikInput<FormState> name="targetAdvance" />,
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
    label: "Frame Calibration",
    input: <FormikInput<FormState> name="frameCalibration" />,
  },
  {
    label: "Delay Hit",
    input: <FormikInput<FormState> name="delayHit" />,
  },
  {
    label: "Second Hit",
    input: <FormikInput<FormState> name="secondHit" />,
  },
  {
    label: "Advance Hit",
    input: <FormikInput<FormState> name="advanceHit" />,
  },
];

export const Gen5EntralinkPlusTimer = () => {
  const { initialSettings, onUpdate } = useTimerSettings(timerSettingsAtom);
  const [timer, setTimer] = useAtom(timerStateAtom);

  const onSubmit = React.useCallback<RngToolSubmit<FormState>>(
    async (opts, formik) => {
      let settings: Gen5EntralinkPlusTimerSettings = {
        console: opts.console,
        min_time_ms: fromDecimalString(opts.minTimeMs) ?? 0,
        target_delay: fromDecimalString(opts.targetDelay) ?? 0,
        target_second: fromDecimalString(opts.targetSecond) ?? 0,
        target_advances: fromDecimalString(opts.targetAdvance) ?? 0,
        calibration: fromDecimalString(opts.calibration) ?? 0,
        entralink_calibration:
          fromDecimalString(opts.entralinkCalibration) ?? 0,
        frame_calibration: fromDecimalString(opts.frameCalibration) ?? 0,
      };

      if (
        opts.secondHit !== "" &&
        opts.delayHit !== "" &&
        opts.advanceHit !== ""
      ) {
        const delayHit = fromDecimalString(opts.delayHit) ?? 0;
        const secondHit = fromDecimalString(opts.secondHit) ?? 0;
        const advanceHit = fromDecimalString(opts.advanceHit) ?? 0;
        settings = await rngTools.calibrate_gen5_entralink_plus_timer(
          settings,
          secondHit,
          delayHit,
          advanceHit,
        );
        settings = {
          console: opts.console,
          min_time_ms: capPrecision(settings.min_time_ms),
          target_delay: capPrecision(settings.target_delay),
          target_second: capPrecision(settings.target_second),
          target_advances: capPrecision(settings.target_advances),
          calibration: capPrecision(settings.calibration),
          entralink_calibration: capPrecision(settings.entralink_calibration),
          frame_calibration: capPrecision(settings.frame_calibration),
        };
        formik.setValues({
          console: settings.console,
          minTimeMs: toDecimalString(settings.min_time_ms),
          targetDelay: toDecimalString(settings.target_delay),
          targetSecond: toDecimalString(settings.target_second),
          targetAdvance: toDecimalString(settings.target_advances),
          calibration: toDecimalString(settings.calibration),
          entralinkCalibration: toDecimalString(settings.entralink_calibration),
          frameCalibration: toDecimalString(settings.frame_calibration),
          delayHit: "",
          secondHit: "",
          advanceHit: "",
        });
      }

      const milliseconds =
        await rngTools.create_gen5_entralink_plus_timer(settings);
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
        startButtonTrackerId="start_gen5_entralink_plus_timer"
        stopButtonTrackerId="stop_gen5_entralink_plus_timer"
        milliseconds={timer.milliseconds}
        minutesBeforeTarget={timer.minutesBeforeTarget}
      />

      <RngToolForm<FormState, number[]>
        fields={fields}
        initialValues={initialSettings}
        onSubmit={onSubmit}
        submitTrackerId="set_gen5_entralink_plus_timer"
        submitButtonLabel="Set Timer"
      />
    </Flex>
  );
};
