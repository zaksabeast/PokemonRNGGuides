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
  calibrateGen5EntralinkPlusTimer,
  createGen5EntralinkPlusTimer,
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
  "gen5EntralinkPlusTimer",
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
    target_delay: ZodSerializedDecimal,
    target_second: ZodSerializedDecimal,
    target_advances: ZodSerializedDecimal,
    calibration: ZodSerializedDecimal,
    entralink_calibration: ZodSerializedDecimal,
    frame_calibration: ZodSerializedDecimal,
    delay_hit: ZodSerializedOptional(ZodSerializedDecimal),
    second_hit: ZodSerializedOptional(ZodSerializedDecimal),
    advance_hit: ZodSerializedOptional(ZodSerializedDecimal),
  })
  .transform((data) => ({
    version: 1 as const,
    console: data.console,
    minTimeMs: data.min_time_ms,
    targetDelay: data.target_delay,
    targetSecond: data.target_second,
    targetAdvances: data.target_advances,
    calibration: data.calibration,
    entralinkCalibration: data.entralink_calibration,
    frameCalibration: data.frame_calibration,
    delayHit: data.delay_hit,
    secondHit: data.second_hit,
    advanceHit: data.advance_hit,
  }));

const V1FormStateSchema = z.object({
  version: z.literal(1),
  console: ZodConsole,
  minTimeMs: ZodSerializedDecimal,
  targetDelay: ZodSerializedDecimal,
  targetSecond: ZodSerializedDecimal,
  targetAdvances: ZodSerializedDecimal,
  calibration: ZodSerializedDecimal,
  entralinkCalibration: ZodSerializedDecimal,
  frameCalibration: ZodSerializedDecimal,
  delayHit: ZodSerializedOptional(ZodSerializedDecimal),
  secondHit: ZodSerializedOptional(ZodSerializedDecimal),
  advanceHit: ZodSerializedOptional(ZodSerializedDecimal),
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
  targetDelay: 1200,
  targetSecond: 50,
  targetAdvances: 100,
  calibration: -95,
  entralinkCalibration: 256,
  frameCalibration: 0,
  delayHit: null,
  secondHit: null,
  advanceHit: null,
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
    label: "Target Advance",
    input: (
      <FormikNumberInput<FormState> name="targetAdvances" numType="float" />
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
        name="entralinkCalibration"
        numType="float"
      />
    ),
  },
  {
    label: "Frame Calibration",
    input: (
      <FormikNumberInput<FormState> name="frameCalibration" numType="float" />
    ),
  },
  {
    label: "Delay Hit",
    input: <FormikNumberInput<FormState> name="delayHit" numType="float" />,
  },
  {
    label: "Second Hit",
    input: <FormikNumberInput<FormState> name="secondHit" numType="float" />,
  },
  {
    label: "Advance Hit",
    input: <FormikNumberInput<FormState> name="advanceHit" numType="float" />,
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
  const updateTimerSettings = (formState: FormState) => {
    const milliseconds = createGen5EntralinkPlusTimer(formState);
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

    if (
      opts.secondHit != null &&
      opts.delayHit != null &&
      opts.advanceHit != null
    ) {
      const calibrated = calibrateGen5EntralinkPlusTimer({
        settings,
        hitSecond: opts.secondHit,
        hitDelay: opts.delayHit,
        hitAdvances: opts.advanceHit,
      });
      settings = {
        ...calibrated,
        version: 1,
        console: opts.console,
        delayHit: null,
        secondHit: null,
        advanceHit: null,
      };

      setValue("console", settings.console);
      setValue("minTimeMs", settings.minTimeMs);
      setValue("targetDelay", settings.targetDelay);
      setValue("targetSecond", settings.targetSecond);
      setValue("targetAdvances", settings.targetAdvances);
      setValue("calibration", settings.calibration);
      setValue("entralinkCalibration", settings.entralinkCalibration);
      setValue("frameCalibration", settings.frameCalibration);
      setValue("delayHit", settings.delayHit);
      setValue("secondHit", settings.secondHit);
      setValue("advanceHit", settings.advanceHit);
    }

    updateTimerSettings(settings);
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
              version: true,
              console: true,
              minTimeMs: true,
              targetDelay: true,
              targetSecond: true,
              targetAdvances: true,
              calibration: true,
              entralinkCalibration: true,
              frameCalibration: true,
              delayHit: true,
              secondHit: true,
              advanceHit: true,
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
