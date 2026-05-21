import { isString } from "lodash-es";

export const sortLocale = <T extends Record<string, unknown>>(
  list: T[],
  key: keyof T,
  language: string = "en",
  startIndex: number = -1,
): T[] => {
  const unsorted = list.slice(0, startIndex + 1);
  const sortableList = list.slice(startIndex + 1);
  const sorted = sortableList.sort((first, second) => {
    const firstValue = first[key];
    const secondValue = second[key];
    if (isString(firstValue) && isString(secondValue)) {
      return firstValue.localeCompare(secondValue, language);
    }

    return -1;
  });

  return [...unsorted, ...sorted];
};
