import { atom } from "jotai";
import {
  updateGen4Timer,
  type Gen4Timer,
  type Gen4TimerSettings,
} from "~/rngTools";
import { initialGen4Timer } from "~/rngToolsUi/timer/atoms";
import type { Gen4Console } from "~/rngToolsUi/gen4/gen4types";
import { gen4SetupAtom } from "./setup";
import { gen4TargetAtom } from "./target";

type Gen4TimerCalibration = Pick<
  Gen4TimerSettings,
  "calibratedDelay" | "calibratedSecond"
>;

type Gen4TargetSecondOverride = {
  targetId: string | null;
  targetSecond: number;
};

type Gen4TimerPlayerSettings = Gen4TimerCalibration &
  Pick<Gen4TimerSettings, "targetSecond">;

const initialGen4TimerCalibration: Gen4TimerCalibration = {
  calibratedDelay: initialGen4Timer.settings.calibratedDelay,
  calibratedSecond: initialGen4Timer.settings.calibratedSecond,
};

const calibrationAtom = atom(initialGen4TimerCalibration);

const targetSecondOverrideAtom = atom<Gen4TargetSecondOverride | null>(null);

export const getGen4ConsoleTimerSettings = (
  gameConsole: Gen4Console,
): Pick<Gen4TimerSettings, "console" | "minTimeMs"> => {
  const is3dsNormalSettings = gameConsole === "3dsNormalSettings";
  return {
    console: is3dsNormalSettings ? "ThreeDs" : "NdsSlot1",
    minTimeMs: is3dsNormalSettings ? 55_000 : 14_000,
  };
};

export const gen4TimerAtom = atom((get): Gen4Timer => {
  const setup = get(gen4SetupAtom);
  const target = get(gen4TargetAtom);
  const override = get(targetSecondOverrideAtom);
  const targetId = target?.id ?? null;
  const targetSecond =
    override != null && override.targetId === targetId
      ? override.targetSecond
      : (target?.seedTime.datetime.second ?? 0);

  return updateGen4Timer({
    ...get(calibrationAtom),
    ...getGen4ConsoleTimerSettings(setup.console),
    targetDelay: target?.seedTime.delay ?? 0,
    targetSecond,
  });
});

export const calibrateGen4TimerAtom = atom(
  null,
  (get, set, hitDelay: number) => {
    const { settings } = updateGen4Timer(get(gen4TimerAtom).settings, hitDelay);
    set(calibrationAtom, {
      calibratedDelay: settings.calibratedDelay,
      calibratedSecond: settings.calibratedSecond,
    });
  },
);

export const setGen4TimerSettingsAtom = atom(
  null,
  (get, set, { targetSecond, ...calibration }: Gen4TimerPlayerSettings) => {
    set(calibrationAtom, calibration);
    set(targetSecondOverrideAtom, {
      targetId: get(gen4TargetAtom)?.id ?? null,
      targetSecond,
    });
  },
);

export const resetGen4TimerAtom = atom(null, (_get, set) => {
  set(calibrationAtom, initialGen4TimerCalibration);
  set(targetSecondOverrideAtom, null);
});
