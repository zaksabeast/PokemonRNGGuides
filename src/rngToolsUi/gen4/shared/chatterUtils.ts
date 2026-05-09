import type { ChatterState } from "~/rngTools";

const isWithinTolerance = (
  value1: number,
  value2: number,
  tolerance: number,
): boolean => {
  return Math.abs(value1 - value2) <= tolerance;
};

export type RelativeChatter = "Lower" | "Same" | "Higher";

export const getRelativeChatter = (
  prevState: ChatterState,
  currentState: ChatterState,
): RelativeChatter => {
  if (isWithinTolerance(currentState.pitch_value, prevState.pitch_value, 15)) {
    return "Same";
  }

  if (currentState.pitch_value < prevState.pitch_value) {
    return "Lower";
  }

  return "Higher";
};

export const getRelativeChatters = (
  states: ChatterState[],
): RelativeChatter[] => {
  return states
    .slice(1)
    .map((current, i) => getRelativeChatter(states[i], current));
};
