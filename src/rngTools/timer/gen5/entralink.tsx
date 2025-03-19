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
  Gen5EntralinkTimerSettings,
  create_gen5_entralink_timer,
  calibrate_gen5_entralink_timer,
  minutes_before,
} from "rng_tools";

type Result = {
  milliseconds: number[];
  minutesBeforeTarget: number;
};

type FormState = {
  console: Console;
  minTimeMs: DecimalString;
  targetDelay: DecimalString;
  targetSecond: DecimalString;
  calibration: DecimalString;
  entralinkCalibration: DecimalString;
  delayHit: DecimalString | "";
  secondHit: DecimalString | "";
};

const initialValues: FormState = {
  console: "NDSSLOT1",
  minTimeMs: toDecimalString(14000),
  targetDelay: toDecimalString(1200),
  targetSecond: toDecimalString(50),
  calibration: toDecimalString(-95),
  entralinkCalibration: toDecimalString(256),
  delayHit: "",
  secondHit: "",
};

const fields: Field[] = [
  {
    label: "Console",
    input: (
      <FormikSelect<FormState, "console">
        name="console"
        options={[
          { label: "NDS - Slot 1", value: "NDSSLOT1" },
          { label: "DSI", value: "DSI" },
          { label: "3DS", value: "THREEDS" },
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
  const [timer, setTimer] = React.useState<Result>({
    milliseconds: [],
    minutesBeforeTarget: 0,
  });

  const onSubmit = React.useCallback<RngToolSubmit<FormState>>(
    (opts, formik) => {
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
        settings = calibrate_gen5_entralink_timer(
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

      const milliseconds = create_gen5_entralink_timer(settings);
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
        startButtonTrackerId="start_gen5_entralink_timer"
        stopButtonTrackerId="stop_gen5_entralink_timer"
        milliseconds={timer.milliseconds}
        minutesBeforeTarget={timer.minutesBeforeTarget}
      />

      <RngToolForm<FormState, number[]>
        fields={fields}
        initialValues={initialValues}
        onSubmit={onSubmit}
        submitTrackerId="set_gen5_entralink_timer"
        submitButtonLabel="Set Timer"
      />
    </Flex>
  );
};
