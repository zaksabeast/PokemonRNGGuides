import { ZodSerializedDecimal, ZodSerializedOptional } from "~/utils/number";
import {
  ZodConsole,
  calibrateGen5EntralinkPlusTimer,
  createGen5EntralinkPlusTimer,
  type Gen5EntralinkPlusTimerSettings,
} from "~/rngTools";
import { atomWithPersistence, useAtom } from "~/state/localStorage";
import { useTimerSettings } from "~/state/timerSettings";
import { z } from "zod";
import { TimerStateSchema, initialTimerState } from "./timerState";
import { Gen5VariantTimer, type Gen5VariantConfigMulti } from "./variantTimer";

const timerStateAtom = atomWithPersistence(
  "gen5EntralinkPlusTimer",
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

const config: Gen5VariantConfigMulti<
  Gen5EntralinkPlusTimerSettings,
  FormState,
  "second" | "delay" | "advances"
> = {
  type: "multi",
  trackerPrefix: "gen5_entralink_plus",
  listTitle: "Timers",
  rowLabels: ["Seconds", "Delay", "Advances"],
  hitLabel: "Hits",
  hitFields: [
    { id: "second", label: "Second Hit", numType: "float" },
    { id: "delay", label: "Delay Hit", numType: "float" },
    { id: "advances", label: "Advance Hit", numType: "float" },
  ],
  targetFields: [
    { key: "targetAdvances", label: "Target Advance" },
    { key: "targetDelay", label: "Target Delay" },
    { key: "targetSecond", label: "Target Second" },
    { key: "minTimeMs", label: "Min Time (ms)" },
  ],
  calibrationFields: [
    { key: "calibration", label: "Calibration" },
    { key: "entralinkCalibration", label: "Entralink Calibration" },
    { key: "frameCalibration", label: "Frame Calibration" },
  ],
  create: createGen5EntralinkPlusTimer,
  calibrate: (settings, { second, delay, advances }) =>
    calibrateGen5EntralinkPlusTimer({
      settings,
      hitSecond: second,
      hitDelay: delay,
      hitAdvances: advances,
    }),
  toPersisted: (settings) => ({
    ...settings,
    version: 1,
    delayHit: null,
    secondHit: null,
    advanceHit: null,
  }),
};

export const Gen5EntralinkPlusTimer = () => {
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
