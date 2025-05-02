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
  minTimeMs: ZodSerializedDecimal,
  targetSecond: ZodSerializedDecimal,
  calibration: ZodSerializedDecimal,
  secondHit: ZodSerializedOptional(ZodSerializedDecimal),
});

export type FormState = z.infer<typeof FormStateSchema>;

const initialValues: FormState = {
  console: "NdsSlot1",
  minTimeMs: 14000,
  targetSecond: 50,
  calibration: -95,
  secondHit: null,
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
    input: <FormikNumberInput<FormState> name="minTimeMs" numType="float" />,
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
    label: "Second Hit",
    input: <FormikNumberInput<FormState> name="secondHit" numType="float" />,
  },
];

export const Gen5StandardTimer = () => {
  const { initialSettings, onUpdate } = useTimerSettings(timerSettingsAtom);
  const [timer, setTimer] = useAtom(timerStateAtom);

  const onSubmit = React.useCallback<RngToolSubmit<FormState>>(
    async (opts, formik) => {
      let updatedOpts = opts;
      let settings = {
        console: opts.console,
        min_time_ms: opts.minTimeMs,
        target_second: opts.targetSecond,
        calibration: opts.calibration,
      };

      if (opts.secondHit != null) {
        settings = await rngTools.calibrate_gen5_standard_timer(
          settings,
          opts.secondHit,
        );
        settings = {
          console: opts.console,
          min_time_ms: capPrecision(settings.min_time_ms),
          target_second: capPrecision(settings.target_second),
          calibration: capPrecision(settings.calibration),
        };
        updatedOpts = {
          console: settings.console,
          minTimeMs: settings.min_time_ms,
          targetSecond: settings.target_second,
          calibration: settings.calibration,
          secondHit: null,
        };
        formik.setValues(updatedOpts);
      }

      const milliseconds = await rngTools.create_gen5_standard_timer(settings);
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
