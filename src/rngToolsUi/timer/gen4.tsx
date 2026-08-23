import React from "react";
import { Skeleton } from "antd";
import {
  FormikNumberInput,
  RngToolForm,
  RngToolSubmit,
  Field,
  FormikSelect,
  Alert,
  Link,
  Typography,
  Flex,
} from "~/components";
import { Gen4Timer as Gen4TimerComponent } from "~/components/gen4Timer";
import { ZodSerializedDecimal, ZodSerializedOptional } from "~/utils/number";
import { ZodConsole } from "~/rngTools";
import { createGen4TimerAtom } from "~/rngToolsUi/timer/atoms";
import { atomWithPersistence, useAtom } from "~/state/localStorage";
import { z } from "zod";
import { useHydrate } from "~/hooks/useHydrate";
import { hydrationLock, HydrationLock } from "~/utils/hydration";
import { useStateHistory } from "~/hooks/useStateHistory";
import { UndoButton } from "./undoButton";

const timerStateAtom = createGen4TimerAtom();

const FormStateSchema = z.object({
  console: ZodConsole,
  minTimeMs: ZodSerializedDecimal,
  calibratedDelay: ZodSerializedDecimal,
  calibratedSecond: ZodSerializedDecimal,
  targetDelay: ZodSerializedDecimal,
  targetSecond: ZodSerializedDecimal,
  delayHit: ZodSerializedOptional(ZodSerializedDecimal),
});

export type FormState = z.infer<typeof FormStateSchema>;

const defaultValues: FormState = {
  console: "NdsSlot1",
  minTimeMs: 14000,
  calibratedDelay: 500,
  calibratedSecond: 14,
  targetDelay: 600,
  targetSecond: 50,
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
      <FormikNumberInput<FormState> name="calibratedSecond" numType="float" />
    ),
  },
  {
    label: "Target Delay",
    input: <FormikNumberInput<FormState> name="targetDelay" numType="float" />,
  },
  {
    label: "Target Seconds",
    input: <FormikNumberInput<FormState> name="targetSecond" numType="float" />,
  },
  {
    label: "Delay Hit",
    input: <FormikNumberInput<FormState> name="delayHit" numType="float" />,
  },
];

type InnerProps = {
  initialSettings: FormState;
  onUpdate: (opts: HydrationLock<FormState>) => void;
};

const InnerGen4Timer = ({ initialSettings, onUpdate }: InnerProps) => {
  const hasInited = React.useRef(false);
  const [timer, updateTimer] = useAtom(timerStateAtom);

  React.useEffect(() => {
    if (hasInited.current) {
      return;
    }
    hasInited.current = true;
    updateTimer(initialSettings);
  }, [updateTimer, initialSettings]);

  const updateTimerSettings = (formState: FormState) => {
    const newTimer = updateTimer(formState);

    onUpdate(
      hydrationLock({
        ...newTimer.settings,
        delayHit: null,
      }),
    );

    return newTimer.settings;
  };

  const history = useStateHistory({
    initialSettings,
    updateTimerSettings,
  });

  const onSubmit: RngToolSubmit<FormState> = async (opts, { setValue }) => {
    const updatedTimer = updateTimerSettings(opts);

    setValue("calibratedDelay", updatedTimer.calibratedDelay);
    setValue("calibratedSecond", updatedTimer.calibratedSecond);
    setValue("console", updatedTimer.console);
    setValue("delayHit", null);
    setValue("minTimeMs", updatedTimer.minTimeMs);
    setValue("targetDelay", updatedTimer.targetDelay);
    setValue("targetSecond", updatedTimer.targetSecond);

    history.addIfNew({ ...updatedTimer, delayHit: null });
  };

  return (
    <Gen4TimerComponent
      timer={timerStateAtom}
      trackerId="mystic_timer_gen4"
      disableAdvancedSettings
      is3ds={timer.settings.console === "ThreeDs"}
      slots={{
        belowStartButton: (
          <>
            <RngToolForm<FormState, number[]>
              fields={fields}
              initialValues={initialSettings}
              onSubmit={onSubmit}
              submitTrackerId="set_gen4_timer"
              submitButtonLabel="Set Timer"
              additionalButtons={
                <UndoButton
                  history={history}
                  trackerId="undo_gen4_calibration"
                  fields={{
                    console: true,
                    minTimeMs: true,
                    calibratedDelay: true,
                    calibratedSecond: true,
                    targetDelay: true,
                    targetSecond: true,
                    delayHit: true,
                  }}
                />
              }
            />
            <Alert
              type="tip"
              showIcon
              title="Want easier 3ds RNG?"
              mt={12}
              description={
                <Flex vertical>
                  <Typography.Text>
                    Set the console to 3ds and click "Set Timer" to see the 3ds
                    helper.
                  </Typography.Text>
                  <Link href="/3ds-helper/">
                    View the 3ds Helper guide for more details.
                  </Link>
                </Flex>
              }
            />
          </>
        ),
      }}
    />
  );
};

export const Gen4Timer = () => {
  const [timerSettings, setTimerSettings] = useAtom(timerSettingsAtom);
  const { hydrated, client } = useHydrate(timerSettings);

  if (!hydrated) {
    return <Skeleton />;
  }

  return (
    <InnerGen4Timer initialSettings={client} onUpdate={setTimerSettings} />
  );
};
