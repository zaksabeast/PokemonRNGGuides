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
import { ZodSerializedDecimal, ZodSerializedOptional } from "~/utils/number";
import {
  ZodConsole,
  calibrateGen5StandardTimer,
  createGen5StandardTimer,
  minutesBefore,
} from "~/rngTools";
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

const V0FormStateSchema = z
  .object({
    version: z.literal(0).optional(),
    console: ZodConsole,
    min_time_ms: ZodSerializedDecimal,
    target_second: ZodSerializedDecimal,
    calibration: ZodSerializedDecimal,
    second_hit: ZodSerializedOptional(ZodSerializedDecimal),
  })
  .transform((data) => ({
    version: 1 as const,
    console: data.console,
    minTimeMs: data.min_time_ms,
    targetSecond: data.target_second,
    calibration: data.calibration,
    secondHit: data.second_hit,
  }));

const V1FormStateSchema = z.object({
  version: z.literal(1),
  console: ZodConsole,
  minTimeMs: ZodSerializedDecimal,
  targetSecond: ZodSerializedDecimal,
  calibration: ZodSerializedDecimal,
  secondHit: ZodSerializedOptional(ZodSerializedDecimal),
});

const FormStateSchema = z.discriminatedUnion("version", [
  V0FormStateSchema,
  V1FormStateSchema,
]);

export type FormState = z.infer<typeof FormStateSchema>;

const initialValues: FormState = {
  version: 1,
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
  const updateTimerSettings = (formState: FormState) => {
    const milliseconds = createGen5StandardTimer(formState);
    setTimer(
      hydrationLock({
        milliseconds,
        minutesBeforeTarget: minutesBefore(milliseconds),
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

    if (opts.secondHit != null) {
      const calibrated = calibrateGen5StandardTimer(settings, opts.secondHit);
      settings = {
        ...calibrated,
        version: 1,
        secondHit: null,
      };

      setValue("console", settings.console);
      setValue("minTimeMs", settings.minTimeMs);
      setValue("targetSecond", settings.targetSecond);
      setValue("calibration", settings.calibration);
      setValue("secondHit", settings.secondHit);
    }

    updateTimerSettings(settings);
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
              version: true,
              console: true,
              minTimeMs: true,
              targetSecond: true,
              calibration: true,
              secondHit: true,
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
