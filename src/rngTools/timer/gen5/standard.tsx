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
  create_gen5_standard_timer,
  calibrate_gen5_standard_timer,
  minutes_before,
} from "rng_tools";

type Result = {
  milliseconds: number[];
  minutesBeforeTarget: number;
};

type FormState = {
  console: Console;
  targetSecond: DecimalString;
  calibration: DecimalString;
  secondHit: DecimalString | "";
};

const initialValues: FormState = {
  console: "NDSSLOT1",
  targetSecond: toDecimalString(50),
  calibration: toDecimalString(-95),
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
  const [timer, setTimer] = React.useState<Result>({
    milliseconds: [],
    minutesBeforeTarget: 0,
  });

  const onSubmit = React.useCallback<RngToolSubmit<FormState>>(
    (opts, formik) => {
      let settings = {
        console: opts.console,
        target_second: fromDecimalString(opts.targetSecond) ?? 0,
        calibration: fromDecimalString(opts.calibration) ?? 0,
      };

      if (opts.secondHit !== "") {
        const secondHit = fromDecimalString(opts.secondHit) ?? 0;
        settings = calibrate_gen5_standard_timer(settings, secondHit);
        settings = {
          console: opts.console,
          target_second: capPrecision(settings.target_second),
          calibration: capPrecision(settings.calibration),
        };
        formik.setValues({
          console: settings.console,
          targetSecond: toDecimalString(settings.target_second),
          calibration: toDecimalString(settings.calibration),
          secondHit: "",
        });
      }

      const milliseconds = create_gen5_standard_timer(settings);
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
        startButtonTrackerId="start_gen5_standard_timer"
        stopButtonTrackerId="stop_gen5_standard_timer"
        milliseconds={timer.milliseconds}
        minutesBeforeTarget={timer.minutesBeforeTarget}
      />

      <RngToolForm<FormState, number[]>
        fields={fields}
        initialValues={initialValues}
        onSubmit={onSubmit}
        submitTrackerId="set_gen5_standard_timer"
        submitButtonLabel="Set Timer"
      />
    </Flex>
  );
};
