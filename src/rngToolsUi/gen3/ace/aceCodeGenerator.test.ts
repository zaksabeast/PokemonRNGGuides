import { describe, it, expect } from "bun:test";
import {
  AceResult,
  getEmeraldSeedBoxNames,
  getEmeraldSidBoxNames,
} from "./aceCodeGenerator";
import type { EmeraldLang } from "./emeraldLang";
import { rngTools } from "~/rngTools";

const toRustEmeraldLang = (lang: EmeraldLang) => lang.toLowerCase();

const getBoxesAsStr = async (promise: Promise<AceResult>) => {
  const res = await promise;
  if (!res.success) {
    return JSON.stringify(null);
  }

  return JSON.stringify(res.rawBoxes);
};

describe("getEmeraldSidBoxNames", () => {
  it("matches the Rust implementation for random inputs", async () => {
    const langs: EmeraldLang[] = ["Eng", "Fra", "Ita", "Spa", "Ger"];
    let seed = 0x9e3779b9;

    for (let i = 0; i < 10; i++) {
      seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
      const sid = seed & 0xffff;
      const lang = langs[seed % langs.length];

      const actual = await getEmeraldSidBoxNames(sid, lang);
      const expected = (await rngTools.getEmeraldSidBoxNames(
        sid,
        toRustEmeraldLang(lang),
      )) as AceResult;

      expect(actual.success ? actual.rawBoxes : null).toEqual(
        expected.success ? expected.rawBoxes : null,
      );
      console.log(`getEmeraldSidBoxNames matched for sid=${sid} lang=${lang}`);
    }
  }, 120_000);

  it("returns correct values", async () => {
    expect(await getBoxesAsStr(getEmeraldSidBoxNames(0x1234, "Eng"))).toBe(
      JSON.stringify([
        [208, 188, 207, 226, 234, 176, 203, 226],
        [187, 187, 187, 176, 178, 203, 226],
        [187, 187, 238, 206, 173, 227],
        [187, 213, 207, 172, 226],
        [178, 192, 203, 225],
        [187],
        [187],
        [187],
        [238, 182, 224, 227, 237, 176, 203, 226],
        [182, 203, 226, 192, 193, 191, 226],
        [187, 187, 0, 176, 172, 229],
        [187, 177, 205, 206, 226],
        [211, 200, 172, 226, 192, 200, 204, 227],
        [205, 172, 226, 176, 0, 204, 226, 0],
      ]),
    );

    expect(await getBoxesAsStr(getEmeraldSidBoxNames(0xff23, "Ita"))).toBe(
      JSON.stringify([
        [208, 188, 207, 226, 234, 176, 203, 226],
        [187, 187, 187, 176, 178, 203, 226],
        [187, 187, 214, 204, 173, 227],
        [187, 162, 205, 172, 226],
        [163, 192, 172, 226, 178, 192, 203, 225],
        [187],
        [187],
        [187],
        [238, 182, 224, 227, 237, 176, 203, 226],
        [182, 203, 226, 192, 193, 191, 226],
        [187, 187, 0, 176, 172, 229],
        [187, 224, 206, 174, 226],
        [211, 200, 172, 226, 192, 200, 204, 227],
        [187, 187, 187, 222, 0, 172, 226, 0],
      ]),
    );

    expect(await getBoxesAsStr(getEmeraldSidBoxNames(0x1, "Ger"))).toBe(
      JSON.stringify([
        [208, 188, 207, 226, 246, 176, 203, 226],
        [187, 187, 187, 208, 194, 173, 227],
        [187, 187, 176, 194, 204, 226],
        [187, 178, 192, 203, 225],
        [187],
        [187],
        [187],
        [187],
        [238, 182, 224, 227, 237, 176, 203, 226],
        [182, 203, 226, 192, 193, 191, 226],
        [187, 187, 0, 176, 172, 229],
        [187, 225, 206, 174, 226],
        [211, 200, 172, 226, 192, 200, 204, 227],
        [187, 187, 187, 226, 0, 172, 226, 0],
      ]),
    );
  });
});

describe("getEmeraldSeedBoxNames_perf", () => {
  it("matches the Rust implementation for a specific random input", async () => {
    const seed = 0xfd768458;
    const lang: EmeraldLang = "Eng";

    const jsStart = performance.now();
    const actual = await getEmeraldSeedBoxNames(seed, lang);
    const jsElapsedMs = performance.now() - jsStart;

    const rustStart = performance.now();
    const expected = (await rngTools.getEmeraldSeedBoxNames(
      seed,
      toRustEmeraldLang(lang),
    )) as AceResult;
    const rustElapsedMs = performance.now() - rustStart;

    expect(actual.success ? actual.rawBoxes : null).toEqual(
      expected.success ? expected.rawBoxes : null,
    );
    console.log(
      `getEmeraldSeedBoxNames timing for seed=${seed} lang=${lang}: js=${jsElapsedMs.toFixed(2)}ms rust=${rustElapsedMs.toFixed(2)}ms`,
    );
  }, 120_000);
});

describe("getEmeraldSeedBoxNames", () => {
  it("matches the Rust implementation for random inputs", async () => {
    const langs: EmeraldLang[] = ["Eng", "Fra", "Ita", "Spa", "Ger"];
    let seed = 0x85bca64;
    let jsMs = 0;
    let rustMs = 0;
    let longestJsMs = 0;
    let longestRustMs = 0;

    for (let i = 0; i < 100; i++) {
      seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
      const lang = langs[seed % langs.length];

      const jsStart = performance.now();
      const actual = await getEmeraldSeedBoxNames(seed, lang);
      const jsElapsedMs = performance.now() - jsStart;
      jsMs += jsElapsedMs;
      longestJsMs = Math.max(longestJsMs, jsElapsedMs);

      const rustStart = performance.now();
      const expected = (await rngTools.getEmeraldSeedBoxNames(
        seed,
        toRustEmeraldLang(lang),
      )) as AceResult;
      const rustElapsedMs = performance.now() - rustStart;
      rustMs += rustElapsedMs;
      longestRustMs = Math.max(longestRustMs, rustElapsedMs);

      expect(actual.success ? actual.rawBoxes : null).toEqual(
        expected.success ? expected.rawBoxes : null,
      );
      console.log(
        `getEmeraldSeedBoxNames matched for seed=${seed} lang=${lang}`,
      );
    }
    const jsTime = jsMs.toFixed(2);
    const rustTime = rustMs.toFixed(2);
    const longestJsTime = longestJsMs.toFixed(2);
    const longestRustTime = longestRustMs.toFixed(2);

    console.log(
      `getEmeraldSeedBoxNames timing: js=${jsTime}ms rust=${rustTime}ms`,
    );
    console.log(
      `getEmeraldSeedBoxNames longest: js=${longestJsTime}ms rust=${longestRustTime}ms`,
    );
  }, 120_000);

  it("returns correct values", async () => {
    expect(await getBoxesAsStr(getEmeraldSeedBoxNames(0xacde1234, "Eng"))).toBe(
      JSON.stringify([
        [192, 199, 176, 227, 182, 205, 172, 226],
        [187, 187, 187, 192, 205, 172, 226],
        [187, 187, 172, 180, 173, 227],
        [187, 222, 184, 171, 226],
        [238, 190, 171, 226, 213, 191, 171, 226],
        [187, 187, 187, 0, 176, 172, 229],
        [187],
        [187],
        [238, 182, 224, 227, 237, 176, 203, 226],
        [182, 203, 226, 192, 193, 191, 226],
        [187, 187, 0, 176, 172, 229],
        [187, 177, 205, 206, 226],
        [211, 200, 172, 226, 192, 200, 204, 227],
        [205, 172, 226, 176, 0, 204, 226, 0],
      ]),
    );

    expect(await getBoxesAsStr(getEmeraldSeedBoxNames(0xff123423, "Ita"))).toBe(
      JSON.stringify([
        [192, 199, 176, 227, 182, 205, 172, 226],
        [187, 187, 187, 192, 205, 172, 226],
        [187, 187, 238, 184, 224, 227],
        [187, 206, 189, 171, 226],
        [164, 176, 171, 226, 0, 176, 172, 229],
        [187],
        [187],
        [187],
        [238, 182, 224, 227, 237, 176, 203, 226],
        [182, 203, 226, 192, 193, 191, 226],
        [187, 187, 0, 176, 172, 229],
        [187, 224, 206, 174, 226],
        [211, 200, 172, 226, 192, 200, 204, 227],
        [187, 187, 187, 222, 0, 172, 226, 0],
      ]),
    );

    expect(await getBoxesAsStr(getEmeraldSeedBoxNames(0x1, "Ger"))).toBe(
      JSON.stringify([
        [192, 199, 176, 227, 182, 205, 172, 226],
        [187, 187, 187, 192, 205, 172, 226],
        [187, 187, 208, 178, 173, 227],
        [187, 176, 178, 203, 226],
        [0, 176, 172, 229],
        [187],
        [187],
        [187],
        [238, 182, 224, 227, 237, 176, 203, 226],
        [182, 203, 226, 192, 193, 191, 226],
        [187, 187, 0, 176, 172, 229],
        [187, 225, 206, 174, 226],
        [211, 200, 172, 226, 192, 200, 204, 227],
        [187, 187, 187, 226, 0, 172, 226, 0],
      ]),
    );
  });
});
