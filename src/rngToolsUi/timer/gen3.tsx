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

const timerStateAtom = atomWithPersistence("gen3Timer", TimerStateSchema, {
  milliseconds: [],
  minutesBeforeTarget: 0,
});

const FormStateSchema = z.object({
  console: ZodConsole,
  preTimer: ZodDecimalString,
  targetFrame: ZodDecimalString,
  calibration: ZodDecimalString,
  frameHit: z.union([ZodDecimalString, z.literal("")]),
});

type FormState = z.infer<typeof FormStateSchema>;

const initialValues: FormState = {
  console: "GBA",
  preTimer: toDecimalString(5000),
  targetFrame: toDecimalString(1000),
  calibration: toDecimalString(0.0),
  frameHit: "",
};

const timerSettingsAtom = atomWithPersistence(
  "gen3TimerSettings",
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
          { label: "GBA", value: "GBA" },
          { label: "NDS - Slot 2", value: "NDSSLOT2" },
        ]}
      />
    ),
  },
  {
    label: "Pre-Timer",
    input: <FormikInput<FormState> name="preTimer" />,
  },
  {
    label: "Target Frame",
    input: <FormikInput<FormState> name="targetFrame" />,
  },
  {
    label: "Calibration",
    input: <FormikInput<FormState> name="calibration" />,
  },
  {
    label: "Frame Hit",
    input: <FormikInput<FormState> name="frameHit" />,
  },
];

export const Gen3Timer = () => {
  const { initialSettings, onUpdate } = useTimerSettings(timerSettingsAtom);
  const [timer, setTimer] = useAtom(timerStateAtom);

  const onSubmit = React.useCallback<RngToolSubmit<FormState>>(
    async (opts, formik) => {
      let settings = {
        console: opts.console,
        pre_timer: fromDecimalString(opts.preTimer) ?? 0,
        target_frame: fromDecimalString(opts.targetFrame) ?? 0,
        calibration: fromDecimalString(opts.calibration) ?? 0,
      };

      if (opts.frameHit !== "") {
        const frameHit = fromDecimalString(opts.frameHit) ?? 0;
        settings = await rngTools.calibrate_gen3_timer(settings, frameHit);
        settings = {
          console: opts.console,
          pre_timer: capPrecision(settings.pre_timer),
          target_frame: capPrecision(settings.target_frame),
          calibration: capPrecision(settings.calibration),
        };
        formik.setValues({
          console: settings.console,
          preTimer: toDecimalString(settings.pre_timer),
          targetFrame: toDecimalString(settings.target_frame),
          calibration: toDecimalString(settings.calibration),
          frameHit: "",
        });
      }

      const milliseconds = await rngTools.create_gen3_timer(settings);
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
        startButtonTrackerId="start_gen3_timer"
        stopButtonTrackerId="stop_gen3_timer"
        milliseconds={timer.milliseconds}
        minutesBeforeTarget={timer.minutesBeforeTarget}
      />

      <RngToolForm<FormState, number[]>
        fields={fields}
        initialValues={initialSettings}
        onSubmit={onSubmit}
        submitTrackerId="set_gen3_timer"
        submitButtonLabel="Set Timer"
      />
    </Flex>
  );
};
