import { ZodSerializedDecimal, ZodSerializedOptional } from "~/utils/number";
import {
  ZodConsole,
  calibrateGen5CgearTimer,
  createGen5CgearTimer,
  type Gen5CGearTimerSettings,
} from "~/rngTools";
import { atomWithPersistence, useAtom } from "~/state/localStorage";
import { useTimerSettings } from "~/state/timerSettings";
import { z } from "zod";
import { TimerStateSchema, initialTimerState } from "./timerState";
import { Gen5VariantTimer, type Gen5VariantConfigSingle } from "./variantTimer";

const timerStateAtom = atomWithPersistence(
  "gen5CGearTimer",
  TimerStateSchema,
  initialTimerState,
);

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

const config: Gen5VariantConfigSingle<Gen5CGearTimerSettings, FormState> = {
  type: "single",
  trackerPrefix: "gen5_cgear",
  listTitle: "Timers",
  rowLabels: ["Seconds", "Delay"],
  hitLabel: "Delay Hit",
  hitNumType: "float",
  targetFields: [
    { key: "targetDelay", label: "Target Delay" },
    { key: "targetSecond", label: "Target Second" },
    { key: "minTimeMs", label: "Min Time (ms)" },
  ],
  calibrationFields: [{ key: "calibration", label: "Calibration" }],
  create: createGen5CgearTimer,
  calibrate: calibrateGen5CgearTimer,
  toPersisted: (settings) => ({ ...settings, version: 1, delayHit: null }),
};

export const Gen5CGearTimer = () => {
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
