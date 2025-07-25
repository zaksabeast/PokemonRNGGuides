import React from "react";
import { Skeleton } from "antd";
import {
  FormikNumberInput,
  RngToolForm,
  RngToolSubmit,
  Field,
  FormikSelect,
  Flex,
  MultiTimer,
} from "~/components";
import {
  capPrecision,
  ZodSerializedDecimal,
  ZodSerializedOptional,
} from "~/utils/number";
import { rngTools, ZodConsole } from "~/rngTools";
import { atomWithPersistence, useAtom } from "~/state/localStorage";
import { useTimerSettings } from "~/state/timerSettings";
import { z } from "zod";
import { hydrationLock, HydrationLock } from "~/utils/hydration";
import { useHydrate } from "~/hooks/useHydrate";

const TimerStateSchema = z.object({
  milliseconds: z.array(z.number()),
  minutesBeforeTarget: z.number(),
});

type TimerState = z.infer<typeof TimerStateSchema>;

const timerStateAtom = atomWithPersistence("gen3Timer", TimerStateSchema, {
  milliseconds: [],
  minutesBeforeTarget: 0,
});

const FormStateSchema = z.object({
  console: ZodConsole,
  preTimer: ZodSerializedDecimal,
  targetFrame: ZodSerializedDecimal,
  calibration: ZodSerializedDecimal,
  frameHit: ZodSerializedOptional(ZodSerializedDecimal),
});

export type FormState = z.infer<typeof FormStateSchema>;

const initialValues: FormState = {
  console: "Gba",
  preTimer: 5000,
  targetFrame: 1000,
  calibration: 0.0,
  frameHit: null,
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
          { label: "GBA", value: "Gba" },
          { label: "NDS - Slot 2", value: "NdsSlot2" },
          { label: "NDS - Slot 1", value: "NdsSlot1" },
          { label: "DSI", value: "Dsi" },
          { label: "3DS", value: "ThreeDs" },
        ]}
      />
    ),
  },
  {
    label: "Pre-Timer",
    input: <FormikNumberInput<FormState> name="preTimer" numType="float" />,
  },
  {
    label: "Target Frame",
    input: <FormikNumberInput<FormState> name="targetFrame" numType="float" />,
  },
  {
    label: "Calibration",
    input: <FormikNumberInput<FormState> name="calibration" numType="float" />,
  },
  {
    label: "Frame Hit",
    input: <FormikNumberInput<FormState> name="frameHit" numType="float" />,
  },
];

type InnerProps = {
  timer: TimerState;
  setTimer: (timer: HydrationLock<TimerState>) => void;
  initialSettings: FormState;
  onUpdate: (opts: HydrationLock<FormState>) => void;
};

const InnerGen3Timer = ({
  timer,
  setTimer,
  initialSettings,
  onUpdate,
}: InnerProps) => {
  const onSubmit = React.useCallback<RngToolSubmit<FormState>>(
    async (opts, formik) => {
      let updatedOpts = opts;
      let settings = {
        console: opts.console,
        pre_timer: opts.preTimer,
        target_frame: opts.targetFrame,
        calibration: opts.calibration,
      };

      if (opts.frameHit != null) {
        settings = await rngTools.calibrate_gen3_timer(settings, opts.frameHit);
        settings = {
          console: opts.console,
          pre_timer: capPrecision(settings.pre_timer),
          target_frame: capPrecision(settings.target_frame),
          calibration: capPrecision(settings.calibration),
        };
        updatedOpts = {
          console: settings.console,
          preTimer: settings.pre_timer,
          targetFrame: settings.target_frame,
          calibration: settings.calibration,
          frameHit: null,
        };
        formik.setValues(updatedOpts);
      }

      const milliseconds = await rngTools.create_gen3_timer(settings);
      setTimer(
        hydrationLock({
          milliseconds: [...milliseconds],
          minutesBeforeTarget: await rngTools.minutes_before(milliseconds),
        }),
      );
      onUpdate(hydrationLock(updatedOpts));
    },
    [onUpdate, setTimer],
  );

  return (
    <Flex vertical gap={12}>
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

export const Gen3Timer = () => {
  const { initialSettings, onUpdate } = useTimerSettings(timerSettingsAtom);
  const [timer, setTimer] = useAtom(timerStateAtom);
  const { hydrated, client } = useHydrate({ initialSettings, timer });

  if (!hydrated) {
    return <Skeleton />;
  }

  return <InnerGen3Timer {...client} setTimer={setTimer} onUpdate={onUpdate} />;
};
