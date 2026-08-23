import { describe, it, expect } from "bun:test";
import { findSubArrayIndex, findSubArrayIndices } from "../findIndexBy";

describe("findSubArrayIndex", () => {
  it("should return the correct index of the sub-array in the main array", () => {
    const array = [1, 2, 3, 4, 5];
    const subArray = [3, 4];
    expect(findSubArrayIndex(array, subArray)).toBe(2);
  });

  it("should return -1 if the sub-array is not found in the main array", () => {
    const array = [1, 2, 3, 4, 5];
    const subArray = [6, 7];
    expect(findSubArrayIndex(array, subArray)).toBe(-1);
  });

  it("should return -1 if the main array is empty", () => {
    const array: number[] = [];
    const subArray = [1, 2];
    expect(findSubArrayIndex(array, subArray)).toBe(-1);
  });

  it("should return -1 if the sub-array is empty", () => {
    const array = [1, 2, 3];
    const subArray: number[] = [];
    expect(findSubArrayIndex(array, subArray)).toBe(-1);
  });

  it("should find a sub-array with a custom comparison function", () => {
    const array = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
    const subArray = [{ id: 2 }, { id: 3 }];
    const compare = (first: { id: number }, second: { id: number }) =>
      first.id === second.id;
    expect(findSubArrayIndex(array, subArray, compare)).toBe(1);
  });
});

describe("findSubArrayIndices", () => {
  it("should return all indices of the sub-array in the main array", () => {
    const array = [1, 2, 3, 1, 2, 3];
    const subArray = [1, 2];
    expect(findSubArrayIndices(array, subArray)).toEqual([
      { start: 0, end: 1 },
      { start: 3, end: 4 },
    ]);
  });

  it("should return an empty array if the sub-array is not found in the main array", () => {
    const array = [1, 2, 3];
    const subArray = [4, 5];
    expect(findSubArrayIndices(array, subArray)).toEqual([]);
  });

  it("should return an empty array if the main array is empty", () => {
    const array: number[] = [];
    const subArray = [1, 2];
    expect(findSubArrayIndices(array, subArray)).toEqual([]);
  });

  it("should return an empty array if the sub-array is empty", () => {
    const array = [1, 2, 3];
    const subArray: number[] = [];
    expect(findSubArrayIndices(array, subArray)).toEqual([]);
  });

  it("should find all sub-arrays with a custom comparison function", () => {
    const array = [{ id: 1 }, { id: 2 }, { id: 1 }, { id: 2 }];
    const subArray = [{ id: 1 }];
    const compare = (first: { id: number }, second: { id: number }) =>
      first.id === second.id;
    expect(findSubArrayIndices(array, subArray, compare)).toEqual([
      { start: 0, end: 0 },
      { start: 2, end: 2 },
    ]);
  });
});
