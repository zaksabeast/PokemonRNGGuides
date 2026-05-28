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
import { ZodConsole, minutesBefore, updateGen3Timer } from "~/rngTools";
import { atomWithPersistence, useAtom } from "~/state/localStorage";
import { useTimerSettings } from "~/state/timerSettings";
import { z } from "zod";
import { hydrationLock, HydrationLock } from "~/utils/hydration";
import { useHydrate } from "~/hooks/useHydrate";
import { useStateHistory } from "~/hooks/useStateHistory";
import { UndoButton } from "./undoButton";

const TimerStateSchema = z.object({
  milliseconds: z.array(z.number()),
  minutesBeforeTarget: z.number(),
});

type TimerState = z.infer<typeof TimerStateSchema>;

const timerStateAtom = atomWithPersistence("gen3Timer", TimerStateSchema, {
  milliseconds: [],
  minutesBeforeTarget: 0,
});

const V0FormStateSchema = z
  .object({
    version: z.literal(0).optional(),
    console: ZodConsole,
    pre_timer: ZodSerializedDecimal,
    target_frame: ZodSerializedDecimal,
    calibration: ZodSerializedDecimal,
    frame_hit: ZodSerializedOptional(ZodSerializedDecimal),
  })
  .transform((data) => ({
    version: 1 as const,
    console: data.console,
    preTimer: data.pre_timer,
    targetFrame: data.target_frame,
    calibration: data.calibration,
    frameHit: data.frame_hit,
  }));

const V1FormStateSchema = z.object({
  version: z.literal(1),
  console: ZodConsole,
  preTimer: ZodSerializedDecimal,
  targetFrame: ZodSerializedDecimal,
  calibration: ZodSerializedDecimal,
  frameHit: ZodSerializedOptional(ZodSerializedDecimal),
});

const FormStateSchema = z.discriminatedUnion("version", [
  V1FormStateSchema,
  V0FormStateSchema,
]);

export type FormState = z.infer<typeof FormStateSchema>;

const initialValues: FormState = {
  version: 1,
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
  const updateTimerSettings = (formState: FormState) => {
    const updatedTimer = updateGen3Timer(formState);
    setTimer(
      hydrationLock({
        milliseconds: updatedTimer.ms,
        minutesBeforeTarget: minutesBefore(updatedTimer.ms),
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

    if (opts.frameHit != null) {
      const updated = updateGen3Timer(settings, opts.frameHit);
      settings = {
        ...updated.settings,
        version: 1,
        frameHit: null,
      };
      setValue("console", settings.console);
      setValue("preTimer", settings.preTimer);
      setValue("targetFrame", settings.targetFrame);
      setValue("calibration", settings.calibration);
      setValue("frameHit", settings.frameHit);
    }

    updateTimerSettings(settings);
    history.addIfNew(settings);
  };

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
        additionalButtons={
          <UndoButton
            history={history}
            trackerId="undo_gen3_calibration"
            fields={{
              version: true,
              console: true,
              preTimer: true,
              targetFrame: true,
              calibration: true,
              frameHit: true,
            }}
          />
        }
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
