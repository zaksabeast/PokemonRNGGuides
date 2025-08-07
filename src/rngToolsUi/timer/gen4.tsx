import React from "react";
import { Skeleton } from "antd";
import {
  FormikNumberInput,
  RngToolForm,
  RngToolSubmit,
  Field,
  FormikSelect,
  Gen4Timer as Gen4TimerComponent,
} from "~/components";
import { ZodSerializedDecimal, ZodSerializedOptional } from "~/utils/number";
import { ZodConsole } from "~/rngTools";
import { atomWithPersistence, useAtom } from "~/state/localStorage";
import { z } from "zod";
import { useHydrate } from "~/hooks/useHydrate";
import { hydrationLock, HydrationLock } from "~/utils/hydration";
import { createGen4TimerAtom, useGen4Timer } from "~/hooks/useGen4Timer";

const timerStateAtom = createGen4TimerAtom();

const FormStateSchema = z.object({
  console: ZodConsole,
  minTimeMs: ZodSerializedDecimal,
  calibratedDelay: ZodSerializedDecimal,
  calibratedSeconds: ZodSerializedDecimal,
  targetDelay: ZodSerializedDecimal,
  targetSeconds: ZodSerializedDecimal,
  delayHit: ZodSerializedOptional(ZodSerializedDecimal),
});

export type FormState = z.infer<typeof FormStateSchema>;

const defaultValues: FormState = {
  console: "NdsSlot1",
  minTimeMs: 14000,
  calibratedDelay: 500,
  calibratedSeconds: 14,
  targetDelay: 600,
  targetSeconds: 50,
  delayHit: null,
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
    input: <FormikNumberInput<FormState> name="minTimeMs" numType="float" />,
  },
  {
    label: "Calibrated Delay",
    input: (
      <FormikNumberInput<FormState> name="calibratedDelay" numType="float" />
    ),
  },
  {
    label: "Calibrated Seconds",
    input: (
      <FormikNumberInput<FormState> name="calibratedSeconds" numType="float" />
    ),
  },
  {
    label: "Target Delay",
    input: <FormikNumberInput<FormState> name="targetDelay" numType="float" />,
  },
  {
    label: "Target Seconds",
    input: (
      <FormikNumberInput<FormState> name="targetSeconds" numType="float" />
    ),
  },
  {
    label: "Delay Hit",
    input: <FormikNumberInput<FormState> name="delayHit" numType="float" />,
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
    initTimer({
      console: timerSettings.console,
      min_time_ms: timerSettings.minTimeMs,
      calibrated_delay: timerSettings.calibratedDelay,
      calibrated_second: timerSettings.calibratedSeconds,
      target_delay: timerSettings.targetDelay,
      target_second: timerSettings.targetSeconds,
    });
  }, [initTimer, timerSettings]);

  const onSubmit = React.useCallback<RngToolSubmit<FormState>>(
    async (opts, { setValue }) => {
      const newTimer = await initTimer({
        calibrated_delay: opts.calibratedDelay,
        calibrated_second: opts.calibratedSeconds,
        console: opts.console,
        min_time_ms: opts.minTimeMs,
        target_delay: opts.targetDelay,
        target_second: opts.targetSeconds,
        hit_delay: opts.delayHit,
      });

      const updates = {
        calibratedDelay: newTimer.timer.calibrated_delay,
        calibratedSeconds: newTimer.timer.calibrated_second,
        console: newTimer.timer.console,
        delayHit: null,
        minTimeMs: newTimer.timer.min_time_ms,
        targetDelay: newTimer.timer.target_delay,
        targetSeconds: newTimer.timer.target_second,
      };

      setValue("calibratedDelay", updates.calibratedDelay);
      setValue("calibratedSeconds", updates.calibratedSeconds);
      setValue("console", updates.console);
      setValue("delayHit", updates.delayHit);
      setValue("minTimeMs", updates.minTimeMs);
      setValue("targetDelay", updates.targetDelay);
      setValue("targetSeconds", updates.targetSeconds);

      onUpdate(hydrationLock(updates));
    },
    [initTimer, onUpdate],
  );

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
