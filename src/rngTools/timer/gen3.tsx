import React from "react";
import {
  FormikInput,
  RngToolForm,
  RngToolSubmit,
  Field,
  FormikSelect,
} from "~/components";
import {
  DecimalString,
  toDecimalString,
  fromDecimalString,
  capPrecision,
} from "~/utils/number";
import { Flex, MultiTimer } from "~/components";
import {
  Console,
  create_gen3_timer,
  calibrate_gen3_timer,
  minutes_before,
} from "rng_tools";

type Result = {
  milliseconds: number[];
  minutesBeforeTarget: number;
};

type FormState = {
  console: Console;
  preTimer: DecimalString;
  targetFrame: DecimalString;
  calibration: DecimalString;
  frameHit: DecimalString | "";
};

const initialValues: FormState = {
  console: "GBA",
  preTimer: toDecimalString(5000),
  targetFrame: toDecimalString(1000),
  calibration: toDecimalString(0.0),
  frameHit: "",
};

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
  const [timer, setTimer] = React.useState<Result>({
    milliseconds: [],
    minutesBeforeTarget: 0,
  });

  const onSubmit = React.useCallback<RngToolSubmit<FormState>>(
    (opts, formik) => {
      let settings = {
        console: opts.console,
        pre_timer: fromDecimalString(opts.preTimer) ?? 0,
        target_frame: fromDecimalString(opts.targetFrame) ?? 0,
        calibration: fromDecimalString(opts.calibration) ?? 0,
      };

      if (opts.frameHit !== "") {
        const frameHit = fromDecimalString(opts.frameHit) ?? 0;
        settings = calibrate_gen3_timer(settings, frameHit);
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

      const milliseconds = create_gen3_timer(settings);
      setTimer({
        milliseconds: [...milliseconds],
        minutesBeforeTarget: minutes_before(milliseconds),
      });
    },
    [],
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
        initialValues={initialValues}
        onSubmit={onSubmit}
        submitTrackerId="set_gen3_timer"
        submitButtonLabel="Set Timer"
      />
    </Flex>
  );
};
