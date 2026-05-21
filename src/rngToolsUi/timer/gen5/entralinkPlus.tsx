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
import { useHydrate } from "~/hooks/useHydrate";
import { hydrationLock, HydrationLock } from "~/utils/hydration";
import { useStateHistory } from "~/hooks/useStateHistory";
import { UndoButton } from "../undoButton";

const TimerStateSchema = z.object({
  milliseconds: z.array(z.number()),
  minutesBeforeTarget: z.number(),
});

type TimerState = z.infer<typeof TimerStateSchema>;

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
  min_time_ms: ZodSerializedDecimal,
  target_delay: ZodSerializedDecimal,
  target_second: ZodSerializedDecimal,
  target_advances: ZodSerializedDecimal,
  calibration: ZodSerializedDecimal,
  entralink_calibration: ZodSerializedDecimal,
  frame_calibration: ZodSerializedDecimal,
  delay_hit: ZodSerializedOptional(ZodSerializedDecimal),
  second_hit: ZodSerializedOptional(ZodSerializedDecimal),
  advance_hit: ZodSerializedOptional(ZodSerializedDecimal),
});

export type FormState = z.infer<typeof FormStateSchema>;

const initialValues: FormState = {
  console: "NdsSlot1",
  min_time_ms: 14000,
  target_delay: 1200,
  target_second: 50,
  target_advances: 100,
  calibration: -95,
  entralink_calibration: 256,
  frame_calibration: 0,
  delay_hit: null,
  second_hit: null,
  advance_hit: null,
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
    input: <FormikNumberInput<FormState> name="min_time_ms" numType="float" />,
  },
  {
    label: "Target Delay",
    input: <FormikNumberInput<FormState> name="target_delay" numType="float" />,
  },
  {
    label: "Target Second",
    input: (
      <FormikNumberInput<FormState> name="target_second" numType="float" />
    ),
  },
  {
    label: "Target Advance",
    input: (
      <FormikNumberInput<FormState> name="target_advances" numType="float" />
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
        name="entralink_calibration"
        numType="float"
      />
    ),
  },
  {
    label: "Frame Calibration",
    input: (
      <FormikNumberInput<FormState> name="frame_calibration" numType="float" />
    ),
  },
  {
    label: "Delay Hit",
    input: <FormikNumberInput<FormState> name="delay_hit" numType="float" />,
  },
  {
    label: "Second Hit",
    input: <FormikNumberInput<FormState> name="second_hit" numType="float" />,
  },
  {
    label: "Advance Hit",
    input: <FormikNumberInput<FormState> name="advance_hit" numType="float" />,
  },
];

type InnerProps = {
  timer: TimerState;
  setTimer: (timer: HydrationLock<TimerState>) => void;
  initialSettings: FormState;
  onUpdate: (opts: HydrationLock<FormState>) => void;
};

const InnerGen5EntralinkPlusTimer = ({
  timer,
  setTimer,
  initialSettings,
  onUpdate,
}: InnerProps) => {
  const updateTimerSettings = async (formState: FormState) => {
    const milliseconds =
      await rngTools.create_gen5_entralink_plus_timer(formState);
    setTimer(
      hydrationLock({
        milliseconds: [...milliseconds],
        minutesBeforeTarget: await rngTools.minutes_before(milliseconds),
      }),
    );
    onUpdate(hydrationLock(formState));
  };

  const history = useStateHistory({
    initialSettings,
    updateTimerSettings,
  });

  const onSubmit: RngToolSubmit<FormState> = async (opts, { setValue }) => {
    let settings = opts;

    if (
      opts.second_hit != null &&
      opts.delay_hit != null &&
      opts.advance_hit != null
    ) {
      const calibrated = await rngTools.calibrate_gen5_entralink_plus_timer(
        settings,
        opts.second_hit,
        opts.delay_hit,
        opts.advance_hit,
      );
      settings = {
        console: opts.console,
        min_time_ms: capPrecision(calibrated.min_time_ms),
        target_delay: capPrecision(calibrated.target_delay),
        target_second: capPrecision(calibrated.target_second),
        target_advances: capPrecision(calibrated.target_advances),
        calibration: capPrecision(calibrated.calibration),
        entralink_calibration: capPrecision(calibrated.entralink_calibration),
        frame_calibration: capPrecision(calibrated.frame_calibration),
        delay_hit: null,
        second_hit: null,
        advance_hit: null,
      };

      setValue("console", settings.console);
      setValue("min_time_ms", settings.min_time_ms);
      setValue("target_delay", settings.target_delay);
      setValue("target_second", settings.target_second);
      setValue("target_advances", settings.target_advances);
      setValue("calibration", settings.calibration);
      setValue("entralink_calibration", settings.entralink_calibration);
      setValue("frame_calibration", settings.frame_calibration);
      setValue("delay_hit", settings.delay_hit);
      setValue("second_hit", settings.second_hit);
      setValue("advance_hit", settings.advance_hit);
    }

    await updateTimerSettings(settings);
    history.addIfNew(settings);
  };

  return (
    <Flex vertical gap={12}>
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
        additionalButtons={
          <UndoButton
            history={history}
            trackerId="undo_gen5_entralink_plus_calibration"
            fields={{
              console: true,
              min_time_ms: true,
              target_delay: true,
              target_second: true,
              target_advances: true,
              calibration: true,
              entralink_calibration: true,
              frame_calibration: true,
              delay_hit: true,
              second_hit: true,
              advance_hit: true,
            }}
          />
        }
      />
    </Flex>
  );
};

export const Gen5EntralinkPlusTimer = () => {
  const { initialSettings, onUpdate } = useTimerSettings(timerSettingsAtom);
  const [timer, setTimer] = useAtom(timerStateAtom);
  const { hydrated, client } = useHydrate({ initialSettings, timer });

  if (!hydrated) {
    return <Skeleton />;
  }

  return (
    <InnerGen5EntralinkPlusTimer
      {...client}
      setTimer={setTimer}
      onUpdate={onUpdate}
    />
  );
};
