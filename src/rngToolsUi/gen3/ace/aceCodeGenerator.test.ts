import { describe, it, expect } from "bun:test";
import {
  AceResult,
  getEmeraldSeedBoxNames,
  getEmeraldSidBoxNames,
} from "./aceCodeGenerator";

const getBoxNamesStr = async (promise: Promise<AceResult>) => {
  const res = await promise;
  if (!res.success) {
    return JSON.stringify(null);
  }

  return JSON.stringify(res.boxes);
};

describe("getEmeraldSidBoxNames", () => {
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
