import { z } from "zod";
import { P, match } from "ts-pattern";
import { capPrecision } from "~/utils/number";
import { ZodConsole, type GameConsole, updateGen3Timer } from "~/rngTools";
import { atomWithPersistence } from "~/state/localStorage";

export const SingleTimerSettingsSchema = z.object({
  timer_id: z.number(),
  target: z.number(),
  calibration: z.number(),
  target_type: z.enum(["ms", "advances", "seed_hex"]),
});

export type SingleTimerSettings = z.infer<typeof SingleTimerSettingsSchema>;

const AllTimerSettingsSchema = z.object({
  version: z.literal(1),
  console: ZodConsole,
  timers: z.array(SingleTimerSettingsSchema),
});

export type AllTimerSettings = z.infer<typeof AllTimerSettingsSchema>;

export const initialTimerValues: Omit<SingleTimerSettings, "timer_id"> = {
  target: 0,
  calibration: 0.0,
  target_type: "ms",
};

export const initialAllTimerSettings: AllTimerSettings = {
  version: 1,
  console: "Gba",
  timers: [],
};

export const customTimerSettingsAtom = atomWithPersistence(
  "customTimerSettings",
  AllTimerSettingsSchema,
  initialAllTimerSettings,
);

export const nextTimerId = (timers: SingleTimerSettings[]) =>
  timers.reduce((highest, timer) => Math.max(highest, timer.timer_id + 1), 0);

export const calibrate = (
  gameConsole: GameConsole,
  settings: SingleTimerSettings,
  hit: number,
) => {
  const calibration = match(settings.target_type)
    .with("ms", () => settings.target - hit + settings.calibration)
    .with(P.union("advances", "seed_hex"), () => {
      const updated = updateGen3Timer(
        {
          console: gameConsole,
          calibration: settings.calibration,
          targetFrame: settings.target,
          preTimer: 0,
        },
        hit,
      );
      return updated.settings.calibration;
    })
    .exhaustive();

  return capPrecision(calibration);
};

export const create = (
  gameConsole: GameConsole,
  settings: SingleTimerSettings,
) => {
  const target = settings.target;

  return match(settings.target_type)
    .with("ms", () => settings.target + settings.calibration)
    .with(P.union("advances", "seed_hex"), () => {
      const updated = updateGen3Timer({
        console: gameConsole,
        calibration: settings.calibration,
        targetFrame: target,
        preTimer: 0,
      });
      // Ignore the pre-timer
      return updated.ms[1] ?? 0;
    })
    .exhaustive();
};

export const updateTimer = (
  timerSettings: AllTimerSettings,
  updated: SingleTimerSettings,
): AllTimerSettings => {
  const timers = timerSettings.timers.map((timer) => {
    if (timer.timer_id === updated.timer_id) {
      return updated;
    }
    return timer;
  });
  return {
    ...timerSettings,
    timers,
  };
};

export const getMilliseconds = (settings: AllTimerSettings) =>
  settings.timers.map((timer) => create(settings.console, timer));

export const getTimerLabel = (timer: SingleTimerSettings) =>
  match(timer.target_type)
    .with("ms", () => `${timer.target} ms`)
    .with("advances", () => `${timer.target} advances`)
    .with("seed_hex", () => `Seed 0x${timer.target.toString(16).toUpperCase()}`)
    .exhaustive();

export const getHitLabel = (timer: SingleTimerSettings) =>
  match(timer.target_type)
    .with("ms", () => "Millisecond Hit")
    .with("advances", () => "Frame Hit")
    .with("seed_hex", () => "Seed Hit")
    .exhaustive();

export const getNumType = (timer: SingleTimerSettings) =>
  timer.target_type === "seed_hex" ? ("hex" as const) : ("float" as const);
