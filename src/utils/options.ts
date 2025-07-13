import { identity } from "lodash-es";

export const toOptions = <T extends readonly string[] | readonly number[]>(
  options: T,
  formatLabel: (option: T[number]) => string = identity,
) => {
  return options.map((option) => ({
    value: option,
    label: formatLabel(option),
  })) as { -readonly [K in keyof T]: { value: T[K]; label: T[K] } };
};

export const optOut = <T>(
  condition: boolean | undefined,
  value: T,
): T | null => {
  return condition === false ? null : value;
};

export const optIn = <T>(
  condition: boolean | undefined,
  value: T,
): T | null => {
  return condition === true ? value : null;
};
