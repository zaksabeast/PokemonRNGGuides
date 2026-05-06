import { isEqual } from "lodash-es";

export const findSubArrayIndex = <T, U>(
  array: T[],
  subArray: U[],
  compare: (first: T, second: U) => boolean = isEqual,
): number => {
  if (array.length === 0 || subArray.length === 0) {
    return -1;
  }

  const subArrayLength = subArray.length;
  const lastIndex = array.length - subArrayLength;

  for (let i = 0; i <= lastIndex; i++) {
    if (compare(array[i], subArray[0])) {
      let match = true;
      for (let j = 1; j < subArrayLength; j++) {
        if (!compare(array[i + j], subArray[j])) {
          match = false;
          break;
        }
      }
      if (match) {
        return i;
      }
    }
  }

  return -1;
};

export type IndexRange = {
  start: number;
  end: number;
};

export const findSubArrayIndices = <T, U>(
  array: T[],
  subArray: U[],
  compare: (first: T, second: U) => boolean = isEqual,
): IndexRange[] => {
  const indices: IndexRange[] = [];
  if (array.length === 0 || subArray.length === 0) {
    return indices;
  }

  const subArrayLength = subArray.length;
  const lastIndex = array.length - subArrayLength;

  for (let i = 0; i <= lastIndex; i++) {
    if (compare(array[i], subArray[0])) {
      let match = true;
      for (let j = 1; j < subArrayLength; j++) {
        if (!compare(array[i + j], subArray[j])) {
          match = false;
          break;
        }
      }
      if (match) {
        indices.push({ start: i, end: i + subArrayLength - 1 });
      }
    }
  }

  return indices;
};
