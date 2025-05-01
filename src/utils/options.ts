export const toOptions = <T extends readonly string[] | readonly number[]>(
  options: T,
) => {
  return options.map((option) => ({
    value: option,
    label: option,
  })) as { -readonly [K in keyof T]: { value: T[K]; label: T[K] } };
};
