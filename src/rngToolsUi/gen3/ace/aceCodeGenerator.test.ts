import { describe, it, expect } from "bun:test";
import { readFileSync } from "node:fs";
import {
  AceResult,
  getEmeraldSeedBoxNames,
  getEmeraldSidBoxNames,
} from "./aceCodeGenerator";
import type { EmeraldLang } from "./emeraldLang";
// @ts-expect-error The generated wasm-bindgen glue does not emit a .d.ts file.
import * as RngToolsGlue from "../../../../rng_tools/pkg/rng_tools_bg.js";

const { instance } = await WebAssembly.instantiate(
  readFileSync(
    new URL("../../../../rng_tools/pkg/rng_tools_bg.wasm", import.meta.url),
  ),
  { "./rng_tools_bg.js": RngToolsGlue as WebAssembly.ModuleImports },
);
const wasmExports = instance.exports as WebAssembly.Exports & {
  __wbindgen_start?: () => void;
};
RngToolsGlue.__wbg_set_wasm(wasmExports);
wasmExports.__wbindgen_start?.();
const getEmeraldSidBoxNamesResult = RngToolsGlue.getEmeraldSidBoxNames as (
  sid: number,
  lang: EmeraldLang,
) => AceResult;
const getEmeraldSeedBoxNamesResult = RngToolsGlue.getEmeraldSeedBoxNames as (
  seed: number,
  lang: EmeraldLang,
) => AceResult;

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
      const expected = getEmeraldSidBoxNamesResult(sid, lang);

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

describe("getEmeraldSeedBoxNames", () => {
  it("matches the Rust implementation for random inputs", async () => {
    const langs: EmeraldLang[] = ["Eng", "Fra", "Ita", "Spa", "Ger"];
    let seed = 0x85ebca6b;
    let jsMs = 0;
    let rustMs = 0;

    for (let i = 0; i < 10; i++) {
      seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
      const lang = langs[seed % langs.length];

      const jsStart = performance.now();
      const actual = await getEmeraldSeedBoxNames(seed, lang);
      jsMs += performance.now() - jsStart;

      const rustStart = performance.now();
      const expected = getEmeraldSeedBoxNamesResult(seed, lang);
      rustMs += performance.now() - rustStart;

      expect(actual.success ? actual.rawBoxes : null).toEqual(
        expected.success ? expected.rawBoxes : null,
      );
      console.log(
        `getEmeraldSeedBoxNames matched for seed=${seed} lang=${lang}`,
      );
    }
    const jsTime = jsMs.toFixed(2);
    const rustTime = rustMs.toFixed(2);

    console.log(
      `getEmeraldSeedBoxNames timing: js=${jsTime}ms rust=${rustTime}ms`,
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
