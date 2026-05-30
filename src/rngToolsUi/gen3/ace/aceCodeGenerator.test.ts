import { describe, it, expect } from "bun:test";
import {
  getEmeraldSeedBoxNames,
  getEmeraldSidBoxNames,
} from "./aceCodeGenerator";

describe("getEmeraldSidBoxNames", () => {
  it("returns correct values", () => {
    expect(JSON.stringify(getEmeraldSidBoxNames(0x1234, "eng").boxes)).toBe(
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

    expect(JSON.stringify(getEmeraldSidBoxNames(0xff23, "ita").boxes)).toBe(
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

    expect(JSON.stringify(getEmeraldSidBoxNames(0x1, "ger").boxes)).toBe(
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
  it("returns correct values", () => {
    expect(
      JSON.stringify(getEmeraldSeedBoxNames(0xacde1234, "eng").boxes),
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
      JSON.stringify(getEmeraldSeedBoxNames(0xff123423, "ita").boxes),
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

    expect(JSON.stringify(getEmeraldSeedBoxNames(0x1, "ger").boxes)).toBe(
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
