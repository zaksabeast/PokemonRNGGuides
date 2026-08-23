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
  calibrateGen5CgearTimer,
  createGen5CgearTimer,
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

const timerStateAtom = atomWithPersistence("gen5CGearTimer", TimerStateSchema, {
  milliseconds: [],
  minutesBeforeTarget: 0,
});

const v0FormStateSchema = z
  .object({
    version: z.literal(0).optional(),
    console: ZodConsole,
    min_time_ms: ZodSerializedDecimal,
    target_delay: ZodSerializedDecimal,
    target_second: ZodSerializedDecimal,
    calibration: ZodSerializedDecimal,
    delay_hit: ZodSerializedOptional(ZodSerializedDecimal),
  })
  .transform((data) => ({
    version: 1 as const,
    console: data.console,
    minTimeMs: data.min_time_ms,
    targetDelay: data.target_delay,
    targetSecond: data.target_second,
    calibration: data.calibration,
    delayHit: data.delay_hit,
  }));

const V1FormStateSchema = z.object({
  version: z.literal(1),
  console: ZodConsole,
  minTimeMs: ZodSerializedDecimal,
  targetDelay: ZodSerializedDecimal,
  targetSecond: ZodSerializedDecimal,
  calibration: ZodSerializedDecimal,
  delayHit: ZodSerializedOptional(ZodSerializedDecimal),
});

const FormStateSchema = z.discriminatedUnion("version", [
  v0FormStateSchema,
  V1FormStateSchema,
]);

export type FormState = z.infer<typeof FormStateSchema>;

const initialValues: FormState = {
  version: 1,
  console: "NdsSlot1",
  minTimeMs: 14000,
  targetDelay: 1200,
  targetSecond: 50,
  calibration: -95,
  delayHit: null,
};

const timerSettingsAtom = atomWithPersistence(
  "gen5CGearTimerSettings",
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
    label: "Target Delay",
    input: <FormikNumberInput<FormState> name="targetDelay" numType="float" />,
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
    label: "Delay Hit",
    input: <FormikNumberInput<FormState> name="delayHit" numType="float" />,
  },
];

type InnerProps = {
  timer: TimerState;
  setTimer: (timer: HydrationLock<TimerState>) => void;
  initialSettings: FormState;
  onUpdate: (opts: HydrationLock<FormState>) => void;
};

const InnerGen5CGearTimer = ({
  timer,
  setTimer,
  initialSettings,
  onUpdate,
}: InnerProps) => {
  const updateTimerSettings = (formState: FormState) => {
    const milliseconds = createGen5CgearTimer(formState);
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

    if (opts.delayHit != null) {
      const calibrated = calibrateGen5CgearTimer(settings, opts.delayHit);
      settings = {
        ...calibrated,
        version: 1,
        delayHit: null,
      };

      setValue("console", settings.console);
      setValue("minTimeMs", settings.minTimeMs);
      setValue("targetDelay", settings.targetDelay);
      setValue("targetSecond", settings.targetSecond);
      setValue("calibration", settings.calibration);
      setValue("delayHit", settings.delayHit);
    }

    updateTimerSettings(settings);
    history.addIfNew(settings);
  };

  return (
    <Flex vertical gap={12}>
      <MultiTimer
        startButtonTrackerId="start_gen5_cgear_timer"
        stopButtonTrackerId="stop_gen5_cgear_timer"
        milliseconds={timer.milliseconds}
        minutesBeforeTarget={timer.minutesBeforeTarget}
      />

      <RngToolForm<FormState, number[]>
        fields={fields}
        initialValues={initialSettings}
        onSubmit={onSubmit}
        submitTrackerId="set_gen5_cgear_timer"
        submitButtonLabel="Set Timer"
        additionalButtons={
          <UndoButton
            history={history}
            trackerId="undo_gen5_cgear_calibration"
            fields={{
              version: true,
              console: true,
              minTimeMs: true,
              targetDelay: true,
              targetSecond: true,
              calibration: true,
              delayHit: true,
            }}
          />
        }
      />
    </Flex>
  );
};

export const Gen5CGearTimer = () => {
  const { initialSettings, onUpdate } = useTimerSettings(timerSettingsAtom);
  const [timer, setTimer] = useAtom(timerStateAtom);
  const { hydrated, client } = useHydrate({ initialSettings, timer });

  if (!hydrated) {
    return <Skeleton />;
  }

  return (
    <InnerGen5CGearTimer {...client} setTimer={setTimer} onUpdate={onUpdate} />
  );
};
