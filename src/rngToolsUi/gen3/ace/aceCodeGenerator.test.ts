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

const getBoxNamesStr = async (promise: Promise<AceResult>) => {
  const res = await promise;
  if (!res.success) {
    return JSON.stringify(null);
  }

  return JSON.stringify(res.boxes);
};

describe("getEmeraldSidBoxNames", () => {
  it("matches the Rust implementation for random inputs", async () => {
    const langs: EmeraldLang[] = ["eng", "fra", "ita", "spa", "ger"];
    let seed = 0x9e3779b9;

    for (let i = 0; i < 10; i++) {
      seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
      const sid = seed & 0xffff;
      const lang = langs[seed % langs.length];

      expect(await getEmeraldSidBoxNames(sid, lang)).toEqual(
        getEmeraldSidBoxNamesResult(sid, lang),
      );
      console.log(`getEmeraldSidBoxNames matched for sid=${sid} lang=${lang}`);
    }
  }, 120_000);

  it("returns correct values", async () => {
    expect(await getBoxNamesStr(getEmeraldSidBoxNames(0x1234, "eng"))).toBe(
      JSON.stringify([
        "VBUnv…Qn",
        "AAA…”Qn",
        "AAzT.o",
        "AaU?n",
        "”FQm",
        "A",
        "A",
        "A",
        "z♀loy…Qn",
        "♀QnFGEn",
        "AA …?q",
        "A“STn",
        "YN?nFNRo",
        "S?n… Rn ",
      ]),
    );

    expect(await getBoxNamesStr(getEmeraldSidBoxNames(0xff23, "ita"))).toBe(
      JSON.stringify([
        "VBUnv…Qn",
        "AAA…”Qn",
        "AAbR.o",
        "A1S?n",
        "2F?n”FQm",
        "A",
        "A",
        "A",
        "z♀loy…Qn",
        "♀QnFGEn",
        "AA …?q",
        "AlT–n",
        "YN?nFNRo",
        "AAAj ?n ",
      ]),
    );

    expect(await getBoxNamesStr(getEmeraldSidBoxNames(0x1, "ger"))).toBe(
      JSON.stringify([
        "VBUnü…Qn",
        "AAAVH.o",
        "AA…HRn",
        "A“FQm",
        "A",
        "A",
        "A",
        "A",
        "z♀loy…Qn",
        "♀QnFGEn",
        "AA …?q",
        "AmT–n",
        "YN?nFNRo",
        "AAAn ?n ",
      ]),
    );
  });
});

describe("getEmeraldSeedBoxNames", () => {
  it("matches the Rust implementation for random inputs", async () => {
    const langs: EmeraldLang[] = ["eng", "fra", "ita", "spa", "ger"];
    let seed = 0x85ebca6b;

    for (let i = 0; i < 10; i++) {
      seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
      const lang = langs[seed % langs.length];

      expect(await getEmeraldSeedBoxNames(seed, lang)).toEqual(
        getEmeraldSeedBoxNamesResult(seed, lang),
      );
      console.log(
        `getEmeraldSeedBoxNames matched for seed=${seed} lang=${lang}`,
      );
    }
  }, 120_000);

  it("returns correct values", async () => {
    expect(
      await getBoxNamesStr(getEmeraldSeedBoxNames(0xacde1234, "eng")),
    ).toBe(
      JSON.stringify([
        "FM…o♀S?n",
        "AAAFS?n",
        "AA?’.o",
        "Aj,!n",
        "zD!naE!n",
        "AAA …?q",
        "A",
        "A",
        "z♀loy…Qn",
        "♀QnFGEn",
        "AA …?q",
        "A“STn",
        "YN?nFNRo",
        "S?n… Rn ",
      ]),
    );

    expect(
      await getBoxNamesStr(getEmeraldSeedBoxNames(0xff123423, "ita")),
    ).toBe(
      JSON.stringify([
        "FM…o♀S?n",
        "AAAFS?n",
        "AAz,lo",
        "ATC!n",
        "3…!n …?q",
        "A",
        "A",
        "A",
        "z♀loy…Qn",
        "♀QnFGEn",
        "AA …?q",
        "AlT–n",
        "YN?nFNRo",
        "AAAj ?n ",
      ]),
    );

    expect(await getBoxNamesStr(getEmeraldSeedBoxNames(0x1, "ger"))).toBe(
      JSON.stringify([
        "FM…o♀S?n",
        "AAAFS?n",
        "AAV“.o",
        "A…“Qn",
        " …?q",
        "A",
        "A",
        "A",
        "z♀loy…Qn",
        "♀QnFGEn",
        "AA …?q",
        "AmT–n",
        "YN?nFNRo",
        "AAAn ?n ",
      ]),
    );
  });
});
