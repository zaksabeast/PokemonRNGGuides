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
