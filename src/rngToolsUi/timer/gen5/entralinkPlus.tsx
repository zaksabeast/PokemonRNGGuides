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
  minTimeMs: ZodSerializedDecimal,
  targetDelay: ZodSerializedDecimal,
  targetSecond: ZodSerializedDecimal,
  targetAdvance: ZodSerializedDecimal,
  calibration: ZodSerializedDecimal,
  entralinkCalibration: ZodSerializedDecimal,
  frameCalibration: ZodSerializedDecimal,
  delayHit: ZodSerializedOptional(ZodSerializedDecimal),
  secondHit: ZodSerializedOptional(ZodSerializedDecimal),
  advanceHit: ZodSerializedOptional(ZodSerializedDecimal),
});

export type FormState = z.infer<typeof FormStateSchema>;

const initialValues: FormState = {
  console: "NdsSlot1",
  minTimeMs: 14000,
  targetDelay: 1200,
  targetSecond: 50,
  targetAdvance: 100,
  calibration: -95,
  entralinkCalibration: 256,
  frameCalibration: 0,
  delayHit: undefined,
  secondHit: undefined,
  advanceHit: undefined,
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
    label: "Target Advance",
    input: (
      <FormikNumberInput<FormState> name="targetAdvance" numType="float" />
    ),
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
    label: "Frame Calibration",
    input: (
      <FormikNumberInput<FormState> name="frameCalibration" numType="float" />
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
  {
    label: "Advance Hit",
    input: <FormikNumberInput<FormState> name="advanceHit" numType="float" />,
  },
];

export const Gen5EntralinkPlusTimer = () => {
  const { initialSettings, onUpdate } = useTimerSettings(timerSettingsAtom);
  const [timer, setTimer] = useAtom(timerStateAtom);

  const onSubmit = React.useCallback<RngToolSubmit<FormState>>(
    async (opts, formik) => {
      let updatedOpts = opts;
      let settings: Gen5EntralinkPlusTimerSettings = {
        console: opts.console,
        min_time_ms: opts.minTimeMs,
        target_delay: opts.targetDelay,
        target_second: opts.targetSecond,
        target_advances: opts.targetAdvance,
        calibration: opts.calibration,
        entralink_calibration: opts.entralinkCalibration,
        frame_calibration: opts.frameCalibration,
      };

      if (
        opts.secondHit != null &&
        opts.delayHit != null &&
        opts.advanceHit != null
      ) {
        settings = await rngTools.calibrate_gen5_entralink_plus_timer(
          settings,
          opts.secondHit,
          opts.delayHit,
          opts.advanceHit,
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
        updatedOpts = {
          console: settings.console,
          minTimeMs: settings.min_time_ms,
          targetDelay: settings.target_delay,
          targetSecond: settings.target_second,
          targetAdvance: settings.target_advances,
          calibration: settings.calibration,
          entralinkCalibration: settings.entralink_calibration,
          frameCalibration: settings.frame_calibration,
          delayHit: undefined,
          secondHit: undefined,
          advanceHit: undefined,
        };
        formik.setValues(updatedOpts);
      }

      const milliseconds =
        await rngTools.create_gen5_entralink_plus_timer(settings);
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
