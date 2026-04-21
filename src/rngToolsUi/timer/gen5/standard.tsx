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
  "gen5StandardTimer",
  TimerStateSchema,
  {
    milliseconds: [],
    minutesBeforeTarget: 0,
  },
);

const FormStateSchema = z.object({
  console: ZodConsole,
  min_time_ms: ZodSerializedDecimal,
  target_second: ZodSerializedDecimal,
  calibration: ZodSerializedDecimal,
  second_hit: ZodSerializedOptional(ZodSerializedDecimal),
});

export type FormState = z.infer<typeof FormStateSchema>;

const initialValues: FormState = {
  console: "NdsSlot1",
  min_time_ms: 14000,
  target_second: 50,
  calibration: -95,
  second_hit: null,
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
    input: <FormikNumberInput<FormState> name="min_time_ms" numType="float" />,
  },
  {
    label: "Target Second",
    input: (
      <FormikNumberInput<FormState> name="target_second" numType="float" />
    ),
  },
  {
    label: "Calibration",
    input: <FormikNumberInput<FormState> name="calibration" numType="float" />,
  },
  {
    label: "Second Hit",
    input: <FormikNumberInput<FormState> name="second_hit" numType="float" />,
  },
];

type InnerProps = {
  timer: TimerState;
  setTimer: (timer: HydrationLock<TimerState>) => void;
  initialSettings: FormState;
  onUpdate: (opts: HydrationLock<FormState>) => void;
};

export const InnerGen5StandardTimer = ({
  timer,
  setTimer,
  initialSettings,
  onUpdate,
}: InnerProps) => {
  const updateTimerSettings = async (formState: FormState) => {
    const milliseconds = await rngTools.create_gen5_standard_timer(formState);
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

    if (opts.second_hit != null) {
      const calibrated = await rngTools.calibrate_gen5_standard_timer(
        settings,
        opts.second_hit,
      );
      settings = {
        console: opts.console,
        min_time_ms: capPrecision(calibrated.min_time_ms),
        target_second: capPrecision(calibrated.target_second),
        calibration: capPrecision(calibrated.calibration),
        second_hit: null,
      };

      setValue("console", settings.console);
      setValue("min_time_ms", settings.min_time_ms);
      setValue("target_second", settings.target_second);
      setValue("calibration", settings.calibration);
      setValue("second_hit", settings.second_hit);
    }

    await updateTimerSettings(settings);
    history.addIfNew(settings);
  };

  return (
    <Flex vertical gap={12}>
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
        additionalButtons={
          <UndoButton
            history={history}
            trackerId="undo_gen5_standard_calibration"
            fields={{
              console: true,
              min_time_ms: true,
              target_second: true,
              calibration: true,
              second_hit: true,
            }}
          />
        }
      />
    </Flex>
  );
};

export const Gen5StandardTimer = () => {
  const { initialSettings, onUpdate } = useTimerSettings(timerSettingsAtom);
  const [timerState, setTimer] = useAtom(timerStateAtom);
  const { hydrated, client } = useHydrate({ initialSettings, timerState });

  if (!hydrated) {
    return <Skeleton />;
  }

  return (
    <InnerGen5StandardTimer
      timer={client.timerState}
      setTimer={setTimer}
      initialSettings={client.initialSettings}
      onUpdate={onUpdate}
    />
  );
};
