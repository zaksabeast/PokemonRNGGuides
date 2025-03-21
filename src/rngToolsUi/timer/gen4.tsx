import React from "react";
import {
  FormikInput,
  RngToolForm,
  RngToolSubmit,
  Field,
  FormikSelect,
} from "~/components";
import {
  capPrecision,
  DecimalString,
  fromDecimalString,
  toDecimalString,
} from "~/utils/number";
import { Flex, MultiTimer } from "~/components";
import { Console, rngTools } from "~/rngTools";

type Result = {
  milliseconds: number[];
  minutesBeforeTarget: number;
};

type FormState = {
  console: Console;
  minTimeMs: DecimalString;
  calibratedDelay: DecimalString;
  calibratedSeconds: DecimalString;
  targetDelay: DecimalString;
  targetSeconds: DecimalString;
  delayHit: DecimalString | "";
};

const initialValues: FormState = {
  console: "NDSSLOT1",
  minTimeMs: toDecimalString(14000),
  calibratedDelay: toDecimalString(500),
  calibratedSeconds: toDecimalString(14),
  targetDelay: toDecimalString(600),
  targetSeconds: toDecimalString(50),
  delayHit: "",
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
    label: "Calibrated Delay",
    input: <FormikInput<FormState> name="calibratedDelay" />,
  },
  {
    label: "Calibrated Seconds",
    input: <FormikInput<FormState> name="calibratedSeconds" />,
  },
  {
    label: "Target Delay",
    input: <FormikInput<FormState> name="targetDelay" />,
  },
  {
    label: "Target Seconds",
    input: <FormikInput<FormState> name="targetSeconds" />,
  },
  {
    label: "Delay Hit",
    input: <FormikInput<FormState> name="delayHit" />,
  },
];

export const Gen4Timer = () => {
  const [timer, setTimer] = React.useState<Result>({
    milliseconds: [],
    minutesBeforeTarget: 0,
  });

  const onSubmit = React.useCallback<RngToolSubmit<FormState>>(
    async (opts, formik) => {
      let settings = {
        console: opts.console,
        min_time_ms: fromDecimalString(opts.minTimeMs) ?? 0,
        calibrated_delay: fromDecimalString(opts.calibratedDelay) ?? 0,
        target_delay: fromDecimalString(opts.targetDelay) ?? 0,
        target_second: fromDecimalString(opts.targetSeconds) ?? 0,
        calibrated_second: fromDecimalString(opts.calibratedSeconds) ?? 0,
      };

      if (opts.delayHit !== "") {
        const delayHit = fromDecimalString(opts.delayHit) ?? 0;
        settings = await rngTools.calibrate_gen4_timer(settings, delayHit);
        settings = {
          console: opts.console,
          min_time_ms: capPrecision(settings.min_time_ms),
          calibrated_delay: capPrecision(settings.calibrated_delay),
          calibrated_second: capPrecision(settings.calibrated_second),
          target_delay: capPrecision(settings.target_delay),
          target_second: capPrecision(settings.target_second),
        };
        formik.setValues({
          console: settings.console,
          minTimeMs: toDecimalString(settings.min_time_ms),
          calibratedDelay: toDecimalString(settings.calibrated_delay),
          calibratedSeconds: toDecimalString(settings.calibrated_second),
          targetDelay: toDecimalString(settings.target_delay),
          targetSeconds: toDecimalString(settings.target_second),
          delayHit: "",
        });
      }

      const milliseconds = await rngTools.create_gen4_timer(settings);
      setTimer({
        milliseconds: [...milliseconds],
        minutesBeforeTarget: await rngTools.minutes_before(milliseconds),
      });
    },
    [],
  );

  return (
    <Flex vertical gap={24}>
      <MultiTimer
        startButtonTrackerId="start_gen4_timer"
        stopButtonTrackerId="stop_gen4_timer"
        milliseconds={timer.milliseconds}
        minutesBeforeTarget={timer.minutesBeforeTarget}
      />

      <RngToolForm<FormState, number[]>
        fields={fields}
        initialValues={initialValues}
        onSubmit={onSubmit}
        submitTrackerId="set_gen4_timer"
        submitButtonLabel="Set Timer"
      />
    </Flex>
  );
};
