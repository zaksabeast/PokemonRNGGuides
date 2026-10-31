import { expect, test } from "bun:test";
import {
  parseLog,
  weightedFrames,
  fit,
  less,
  convolution,
  selectLoopFrames,
} from "./extract-vblank-calibration";

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

const fishingLog = [
  "event,1,0,encounter_attempt,22,20522,20522,m4aSoundMain,0x082E0124,5764047167,20133,11683",
  "event,1,0,encounter_attempt,22,20522,20522,TryReceiveLinkBattleData,0x08033648,5764085350,58316,38183",
  "event,1,0,encounter_attempt,22,20522,20522,FishingWildEncounter,0x080B5734,5764090748,63714,1154",
  "# attempt run=1 delay=0 frame=20522 target_offset=63714 encounter_offset=63714 sweet_scent_hits=0 mode=fishing endpoint=FishingWildEncounter",
].join("\n");

test("fishing captures split audio from the full encounter offset", () => {
  expect(parseLog(fishingLog, "fishing")).toEqual([
    { frame: 20522, audio: 38183, nonAudio: 25531, total: 63714 },
  ]);
  expect(() => parseLog(fishingLog)).toThrow();
  expect(() =>
    parseLog(fishingLog.replace("63714,1154", "63715,1154"), "fishing"),
  ).toThrow("Invalid or incomplete capture");
});

const rockSmashLog = [
  "event,1,0,encounter_attempt,200,18239,18239,m4aSoundMain,0x082E0124,5122748709,7254,141",
  "event,1,0,encounter_attempt,200,18239,18239,TryReceiveLinkBattleData,0x08033648,5122795613,54158,46904",
  "event,1,0,encounter_attempt,200,18239,18239,RockSmashWildEncounter,0x080B550C,5122802451,60996,100",
  "# attempt run=1 delay=0 frame=18239 target_offset=60996 encounter_offset=60996 sweet_scent_hits=0 mode=rock_smash endpoint=RockSmashWildEncounter",
].join("\n");

test("Rock Smash captures split audio at the Rock Smash encounter endpoint", () => {
  expect(parseLog(rockSmashLog, "rock_smash")).toEqual([
    { frame: 18239, audio: 46904, nonAudio: 14092, total: 60996 },
  ]);
  expect(() => parseLog(rockSmashLog)).toThrow();
  expect(() => parseLog(rockSmashLog, "fishing")).toThrow();
  expect(() =>
    parseLog(rockSmashLog.replace("60996,100", "60997,100"), "rock_smash"),
  ).toThrow("Invalid or incomplete capture");
});

test("one song loop keeps the first observation per frame and rounds up", () => {
  expect(
    selectLoopFrames(
      [
        { frame: 10, audio: 100, nonAudio: 10, total: 110 },
        { frame: 10, audio: 100, nonAudio: 20, total: 120 },
        { frame: 11, audio: 200, nonAudio: 10, total: 210 },
        { frame: 12, audio: 300, nonAudio: 10, total: 310 },
        { frame: 13, audio: 400, nonAudio: 10, total: 410 },
      ],
      2.1,
    ),
  ).toEqual([
    { frame: 10, audio: 100, nonAudio: 10, total: 110 },
    { frame: 11, audio: 200, nonAudio: 10, total: 210 },
    { frame: 12, audio: 300, nonAudio: 10, total: 310 },
  ]);
});

test("short captures retain their distinct frames", () => {
  expect(
    selectLoopFrames(
      [
        { frame: 10, audio: 100, nonAudio: 10, total: 110 },
        { frame: 10, audio: 100, nonAudio: 20, total: 120 },
      ],
      3354.689,
    ),
  ).toEqual([{ frame: 10, audio: 100, nonAudio: 10, total: 110 }]);
});
