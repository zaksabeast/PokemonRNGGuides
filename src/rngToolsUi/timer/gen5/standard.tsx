import { ZodSerializedDecimal, ZodSerializedOptional } from "~/utils/number";
import {
  ZodConsole,
  calibrateGen5StandardTimer,
  createGen5StandardTimer,
  type Gen5StandardTimerSettings,
} from "~/rngTools";
import { atomWithPersistence, useAtom } from "~/state/localStorage";
import { useTimerSettings } from "~/state/timerSettings";
import { z } from "zod";
import { TimerStateSchema, initialTimerState } from "./timerState";
import { Gen5VariantTimer, type Gen5VariantConfigSingle } from "./variantTimer";

const timerStateAtom = atomWithPersistence(
  "gen5StandardTimer",
  TimerStateSchema,
  initialTimerState,
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

const config: Gen5VariantConfigSingle<Gen5StandardTimerSettings, FormState> = {
  type: "single",
  trackerPrefix: "gen5_standard",
  listTitle: "Timers",
  rowLabels: ["Seconds"],
  hitLabel: "Second Hit",
  hitNumType: "float",
  targetFields: [
    { key: "targetSecond", label: "Target Second" },
    { key: "minTimeMs", label: "Min Time (ms)" },
  ],
  calibrationFields: [{ key: "calibration", label: "Calibration" }],
  create: createGen5StandardTimer,
  calibrate: calibrateGen5StandardTimer,
  toPersisted: (settings) => ({ ...settings, version: 1, secondHit: null }),
};

export const Gen5StandardTimer = () => {
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
