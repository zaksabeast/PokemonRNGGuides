import { isString } from "lodash-es";

export const sortLocale = <T extends Record<string, unknown>>(
  list: T[],
  key: keyof T,
  language: string = "en",
): T[] => {
  return list.sort((first, second) => {
    const firstValue = first[key];
    const secondValue = second[key];
    if (isString(firstValue) && isString(secondValue)) {
      return firstValue.localeCompare(secondValue, language);
    }

    return -1;
  });
};
