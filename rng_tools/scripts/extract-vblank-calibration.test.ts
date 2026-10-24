import { expect, test } from "bun:test";
import {
  parseLog,
  weightedFrames,
  fit,
  less,
  convolution,
} from "./extract-vblank-calibration";

// Those tests are

test("complex distributions fit within the error budget", () => {
  const values = Array.from({ length: 1000 }, (_, i) => ({
    value: i * i,
    weight: 1 + (i % 7),
  }));
  const { knots, error } = fit(values);
  expect(error).toBeLessThanOrEqual(0.01);
  expect(knots.length).toBeLessThanOrEqual(64);
  expect(knots[0].x).toBe(0);
  expect(knots.at(-1)!.x).toBe(998001);
  expect(less(knots, -1)).toBe(0);
  expect(less(knots, 1e7)).toBe(1);
});

test("rare extrema and jumps survive fitting", () => {
  const { knots } = fit(
    [
      { value: 10, weight: 999 },
      { value: 42, weight: 1 },
    ],
    0,
  );
  expect(knots[0].x).toBe(10);
  expect(knots.at(-1)!.x).toBe(42);
  expect(less(knots, 10)).toBe(0);
  expect(less(knots, 11)).toBeCloseTo(0.999, 10);
  expect(less(knots, 43)).toBe(1);
});

test("replays share their frame weight", () => {
  const rows = [
    { frame: 1, audio: 100, nonAudio: 10, total: 110 },
    { frame: 1, audio: 100, nonAudio: 20, total: 120 },
    { frame: 2, audio: 200, nonAudio: 10, total: 210 },
  ];
  expect(weightedFrames(rows, "nonAudio").map((v) => v.weight)).toEqual([
    0.5, 0.5, 1,
  ]);
});

test("convolution handles continuous costs and atoms", () => {
  const uniform = [
    { x: 0, p: 0, area: 0 },
    { x: 2, p: 1, area: 1 },
  ];
  expect(convolution(uniform, uniform, 1)).toBeCloseTo(0.125, 12);
  const atom = [
    { x: 3, p: 0, area: 0 },
    { x: 3, p: 1, area: 0 },
  ];
  expect(convolution(atom, atom, 6)).toBe(0);
  expect(convolution(atom, atom, 7)).toBe(1);
});

test("malformed or absent completed captures fail", () => {
  expect(() => parseLog("# run_start run=1")).toThrow();
  expect(() =>
    parseLog(
      "# attempt run=1 frame=1 target_offset=10 mode=sweet_scent endpoint=SweetScentWildEncounter",
    ),
  ).toThrow();
});
