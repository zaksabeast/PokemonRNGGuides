import { describe, it, expect } from "bun:test";
import { chunkRange } from "../chunkRange";

describe("chunkRange", () => {
  it("returns single chunk for start === end", () => {
    expect(chunkRange([5, 5], 10)).toEqual([[5, 5]]);
    expect(chunkRange([0, 0], 1)).toEqual([[0, 0]]);
    expect(chunkRange([100, 100], 50)).toEqual([[100, 100]]);
  });

  it("returns single chunk when range is smaller than chunk size", () => {
    expect(chunkRange([0, 5], 10)).toEqual([[0, 5]]);
    expect(chunkRange([10, 15], 20)).toEqual([[10, 15]]);
  });

  it("splits range evenly into chunks", () => {
    expect(chunkRange([0, 10], 5)).toEqual([
      [0, 5],
      [5, 10],
    ]);
    expect(chunkRange([0, 20], 10)).toEqual([
      [0, 10],
      [10, 20],
    ]);
  });

  it("handles ranges that don't divide evenly", () => {
    expect(chunkRange([0, 10], 3)).toEqual([
      [0, 3],
      [3, 6],
      [6, 9],
      [9, 10],
    ]);
    expect(chunkRange([0, 7], 2)).toEqual([
      [0, 2],
      [2, 4],
      [4, 6],
      [6, 7],
    ]);
  });

  it("works with chunk size of 1", () => {
    expect(chunkRange([0, 3], 1)).toEqual([
      [0, 1],
      [1, 2],
      [2, 3],
    ]);
  });

  it("works with very large ranges", () => {
    expect(chunkRange([0, 1000], 100)).toHaveLength(10);
    expect(chunkRange([0, 1000], 100)[0]).toEqual([0, 100]);
    expect(chunkRange([0, 1000], 100)[9]).toEqual([900, 1000]);
  });

  it("handles negative start values", () => {
    expect(chunkRange([-10, 0], 5)).toEqual([
      [-10, -5],
      [-5, 0],
    ]);
    expect(chunkRange([-5, 5], 3)).toEqual([
      [-5, -2],
      [-2, 1],
      [1, 4],
      [4, 5],
    ]);
  });

  it("handles negative ranges", () => {
    expect(chunkRange([-20, -10], 5)).toEqual([
      [-20, -15],
      [-15, -10],
    ]);
  });

  it("works with large chunk sizes", () => {
    expect(chunkRange([0, 100], 500)).toEqual([[0, 100]]);
  });

  it("respects start and end boundaries correctly", () => {
    const chunks = chunkRange([5, 25], 7);
    expect(chunks[0][0]).toBe(5);
    expect(chunks[chunks.length - 1][1]).toBe(25);
  });

  it("ensures all chunk boundaries are contiguous", () => {
    const chunks = chunkRange([0, 50], 7);
    for (let i = 0; i < chunks.length - 1; i++) {
      expect(chunks[i][1]).toBe(chunks[i + 1][0]);
    }
  });
});
