import { ZodSerializedDecimal, ZodSerializedOptional } from "~/utils/number";
import {
  ZodConsole,
  calibrateGen5EntralinkTimer,
  createGen5EntralinkTimer,
  type Gen5EntralinkTimerSettings,
} from "~/rngTools";
import { atomWithPersistence, useAtom } from "~/state/localStorage";
import { useTimerSettings } from "~/state/timerSettings";
import { z } from "zod";
import { TimerStateSchema, initialTimerState } from "./timerState";
import { Gen5VariantTimer, type Gen5VariantConfigMulti } from "./variantTimer";

const timerStateAtom = atomWithPersistence(
  "gen5EntralinkTimer",
  TimerStateSchema,
  initialTimerState,
);

const V0FormStateSchema = z
  .object({
    version: z.literal(0).optional(),
    console: ZodConsole,
    min_time_ms: ZodSerializedDecimal,
    target_delay: ZodSerializedDecimal,
    target_second: ZodSerializedDecimal,
    calibration: ZodSerializedDecimal,
    entralink_calibration: ZodSerializedDecimal,
    delay_hit: ZodSerializedOptional(ZodSerializedDecimal),
    second_hit: ZodSerializedOptional(ZodSerializedDecimal),
  })
  .transform((data) => ({
    version: 1 as const,
    console: data.console,
    minTimeMs: data.min_time_ms,
    targetDelay: data.target_delay,
    targetSecond: data.target_second,
    calibration: data.calibration,
    entralinkCalibration: data.entralink_calibration,
    delayHit: data.delay_hit,
    secondHit: data.second_hit,
  }));

const V1FormStateSchema = z.object({
  version: z.literal(1),
  console: ZodConsole,
  minTimeMs: ZodSerializedDecimal,
  targetDelay: ZodSerializedDecimal,
  targetSecond: ZodSerializedDecimal,
  calibration: ZodSerializedDecimal,
  entralinkCalibration: ZodSerializedDecimal,
  delayHit: ZodSerializedOptional(ZodSerializedDecimal),
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
  targetDelay: 1200,
  targetSecond: 50,
  calibration: -95,
  entralinkCalibration: 256,
  delayHit: null,
  secondHit: null,
};

const timerSettingsAtom = atomWithPersistence(
  "gen5EntralinkTimerSettings",
  FormStateSchema,
  initialValues,
);

const config: Gen5VariantConfigMulti<
  Gen5EntralinkTimerSettings,
  FormState,
  "second" | "delay"
> = {
  type: "multi",
  trackerPrefix: "gen5_entralink",
  listTitle: "Timers",
  rowLabels: ["Seconds", "Delay"],
  hitLabel: "Hits",
  hitFields: [
    { id: "second", label: "Second Hit", numType: "float" },
    { id: "delay", label: "Delay Hit", numType: "float" },
  ],
  targetFields: [
    { key: "targetDelay", label: "Target Delay" },
    { key: "targetSecond", label: "Target Second" },
    { key: "minTimeMs", label: "Min Time (ms)" },
  ],
  calibrationFields: [
    { key: "calibration", label: "Calibration" },
    { key: "entralinkCalibration", label: "Entralink Calibration" },
  ],
  create: createGen5EntralinkTimer,
  calibrate: (settings, { second, delay }) =>
    calibrateGen5EntralinkTimer(settings, second, delay),
  toPersisted: (settings) => ({
    ...settings,
    version: 1,
    delayHit: null,
    secondHit: null,
  }),
};

export const Gen5EntralinkTimer = () => {
  const { initialSettings, onUpdate } = useTimerSettings(timerSettingsAtom);
  const [timer, setTimer] = useAtom(timerStateAtom);

  return (
    <Gen5VariantTimer
      config={config}
      initialSettings={initialSettings}
      onUpdate={onUpdate}
      timer={timer}
      setTimer={setTimer}
    />
  );
};
