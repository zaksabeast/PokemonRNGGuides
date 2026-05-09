import { match } from "ts-pattern";
import type { ChatterState } from "~/rngTools";

const isWithinTolerance = (
  value1: number,
  value2: number,
  tolerance: number,
): boolean => {
  return Math.abs(value1 - value2) <= tolerance;
};

export type RelativeChatter = {
  isLower: boolean;
  isHigher: boolean;
  isSame: boolean;
};

export const getRelativeChatter = (
  prevState: ChatterState,
  currentState: ChatterState,
): RelativeChatter => {
  const isSame = isWithinTolerance(
    currentState.pitch_value,
    prevState.pitch_value,
    15,
  );
  const isLower = currentState.pitch_value < prevState.pitch_value;
  const isHigher = currentState.pitch_value > prevState.pitch_value;
  return { isLower, isHigher, isSame };
};

export const getRelativeChatters = (
  states: ChatterState[],
): RelativeChatter[] => {
  return states
    .slice(1)
    .map((current, i) => getRelativeChatter(states[i], current));
};

export type MiniPitch = "L" | "S" | "H";

export const isRelativePitchEqual = (
  relative: RelativeChatter,
  pitch: MiniPitch,
): boolean => {
  return match({ ...relative, pitch })
    .with({ isSame: true, pitch: "S" }, () => true)
    .with({ isLower: true, pitch: "L" }, () => true)
    .with({ isHigher: true, pitch: "H" }, () => true)
    .otherwise(() => false);
};
