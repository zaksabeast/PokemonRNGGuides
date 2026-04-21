import React from "react";
import { Skeleton } from "antd";
import {
  FormikNumberInput,
  RngToolForm,
  RngToolSubmit,
  Field,
  FormikSelect,
} from "~/components";
import { Gen4Timer as Gen4TimerComponent } from "~/components/gen4Timer";
import { ZodSerializedDecimal, ZodSerializedOptional } from "~/utils/number";
import { ZodConsole } from "~/rngTools";
import { atomWithPersistence, useAtom } from "~/state/localStorage";
import { z } from "zod";
import { useHydrate } from "~/hooks/useHydrate";
import { hydrationLock, HydrationLock } from "~/utils/hydration";
import { createGen4TimerAtom, useGen4Timer } from "~/hooks/useGen4Timer";
import { useStateHistory } from "~/hooks/useStateHistory";
import { UndoButton } from "./undoButton";

const timerStateAtom = createGen4TimerAtom();

const FormStateSchema = z.object({
  console: ZodConsole,
  min_time_ms: ZodSerializedDecimal,
  calibrated_delay: ZodSerializedDecimal,
  calibrated_second: ZodSerializedDecimal,
  target_delay: ZodSerializedDecimal,
  target_second: ZodSerializedDecimal,
  delay_hit: ZodSerializedOptional(ZodSerializedDecimal),
});

export type FormState = z.infer<typeof FormStateSchema>;

const defaultValues: FormState = {
  console: "NdsSlot1",
  min_time_ms: 14000,
  calibrated_delay: 500,
  calibrated_second: 14,
  target_delay: 600,
  target_second: 50,
  delay_hit: null,
};

const timerSettingsAtom = atomWithPersistence(
  "gen4TimerSettings",
  FormStateSchema,
  defaultValues,
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
    label: "Calibrated Delay",
    input: (
      <FormikNumberInput<FormState> name="calibrated_delay" numType="float" />
    ),
  },
  {
    label: "Calibrated Seconds",
    input: (
      <FormikNumberInput<FormState> name="calibrated_second" numType="float" />
    ),
  },
  {
    label: "Target Delay",
    input: <FormikNumberInput<FormState> name="target_delay" numType="float" />,
  },
  {
    label: "Target Seconds",
    input: (
      <FormikNumberInput<FormState> name="target_second" numType="float" />
    ),
  },
  {
    label: "Delay Hit",
    input: <FormikNumberInput<FormState> name="delay_hit" numType="float" />,
  },
];

type InnerProps = {
  timerSettings: FormState;
  onUpdate: (opts: HydrationLock<FormState>) => void;
};

const InnerGen4Timer = ({ timerSettings, onUpdate }: InnerProps) => {
  const hasInited = React.useRef(false);
  const { initTimer } = useGen4Timer(timerStateAtom);

  React.useEffect(() => {
    if (hasInited.current) {
      return;
    }
    hasInited.current = true;
    initTimer(timerSettings);
  }, [initTimer, timerSettings]);

  const updateTimerSettings = async (formState: FormState) => {
    const newTimer = await initTimer(formState);

    onUpdate(
      hydrationLock({
        ...newTimer.timer,
        delay_hit: null,
      }),
    );

    return newTimer.timer;
  };

  const history = useStateHistory({
    initialSettings: timerSettings,
    updateTimerSettings,
  });

  const onSubmit: RngToolSubmit<FormState> = async (opts, { setValue }) => {
    const updatedTimer = await updateTimerSettings(opts);

    setValue("calibrated_delay", updatedTimer.calibrated_delay);
    setValue("calibrated_second", updatedTimer.calibrated_second);
    setValue("console", updatedTimer.console);
    setValue("delay_hit", null);
    setValue("min_time_ms", updatedTimer.min_time_ms);
    setValue("target_delay", updatedTimer.target_delay);
    setValue("target_second", updatedTimer.target_second);

    history.addIfNew({ ...updatedTimer, delay_hit: null });
  };

  return (
    <Gen4TimerComponent
      selfInit={false}
      timer={timerStateAtom}
      trackerId="mystic_timer_gen4"
      is3ds={timerSettings.console === "ThreeDs"}
      fields={
        <RngToolForm<FormState, number[]>
          fields={fields}
          initialValues={timerSettings}
          onSubmit={onSubmit}
          submitTrackerId="set_gen4_timer"
          submitButtonLabel="Set Timer"
          additionalButtons={
            <UndoButton
              history={history}
              trackerId="undo_gen4_calibration"
              fields={{
                console: true,
                min_time_ms: true,
                calibrated_delay: true,
                calibrated_second: true,
                target_delay: true,
                target_second: true,
                delay_hit: true,
              }}
            />
          }
        />
      }
    />
  );
};

export const Gen4Timer = () => {
  const [timerSettings, setTimerSettings] = useAtom(timerSettingsAtom);
  const { hydrated, client } = useHydrate(timerSettings);

  if (!hydrated) {
    return <Skeleton />;
  }

  return <InnerGen4Timer timerSettings={client} onUpdate={setTimerSettings} />;
};
