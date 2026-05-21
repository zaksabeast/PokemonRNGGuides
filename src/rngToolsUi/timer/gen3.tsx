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

const FormStateSchema = z.object({
  console: ZodConsole,
  pre_timer: ZodSerializedDecimal,
  target_frame: ZodSerializedDecimal,
  calibration: ZodSerializedDecimal,
  frame_hit: ZodSerializedOptional(ZodSerializedDecimal),
});

export type FormState = z.infer<typeof FormStateSchema>;

const initialValues: FormState = {
  console: "Gba",
  pre_timer: 5000,
  target_frame: 1000,
  calibration: 0.0,
  frame_hit: null,
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
    input: <FormikNumberInput<FormState> name="pre_timer" numType="float" />,
  },
  {
    label: "Target Frame",
    input: <FormikNumberInput<FormState> name="target_frame" numType="float" />,
  },
  {
    label: "Calibration",
    input: <FormikNumberInput<FormState> name="calibration" numType="float" />,
  },
  {
    label: "Frame Hit",
    input: <FormikNumberInput<FormState> name="frame_hit" numType="float" />,
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
  const updateTimerSettings = async (formState: FormState) => {
    const milliseconds = await rngTools.create_gen3_timer(formState);
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

    if (opts.frame_hit != null) {
      const calibrated = await rngTools.calibrate_gen3_timer(
        settings,
        opts.frame_hit,
      );
      settings = {
        console: opts.console,
        pre_timer: capPrecision(calibrated.pre_timer),
        target_frame: capPrecision(calibrated.target_frame),
        calibration: capPrecision(calibrated.calibration),
        frame_hit: null,
      };
      setValue("console", settings.console);
      setValue("pre_timer", settings.pre_timer);
      setValue("target_frame", settings.target_frame);
      setValue("calibration", settings.calibration);
      setValue("frame_hit", settings.frame_hit);
    }

    await updateTimerSettings(settings);
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
              console: true,
              pre_timer: true,
              target_frame: true,
              calibration: true,
              frame_hit: true,
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
