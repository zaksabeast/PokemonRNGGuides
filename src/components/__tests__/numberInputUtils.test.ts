import { describe, expect, it } from "bun:test";
import {
  getNumberInputBlurValue,
  getNumberInputChangeResult,
  shouldClearTransientValue,
} from "../numberInput/utils";

describe("numberInputUtils", () => {
  it("keeps transient text when replacing a controlled value with '-'", () => {
    expect(
      shouldClearTransientValue({
        numType: "decimal",
        transientValue: "-",
        previousExternalValue: 10,
        externalValue: null,
      }),
    ).toBe(false);
  });

  it("clears other transient text when a controlled value changes", () => {
    expect(
      shouldClearTransientValue({
        numType: "float",
        transientValue: "1.",
        previousExternalValue: 1,
        externalValue: 2,
      }),
    ).toBe(true);
  });

  it("keeps empty transient text while a controlled value is being cleared", () => {
    expect(
      shouldClearTransientValue({
        numType: "float",
        transientValue: "",
        previousExternalValue: 1.5,
        externalValue: 1.5,
      }),
    ).toBe(false);
  });

  describe("decimal input changes", () => {
    it("accepts negative numbers", () => {
      expect(getNumberInputChangeResult("decimal", "-12")).toEqual({
        accepted: true,
        transientValue: null,
        nextValue: -12,
      });
    });

    it("accepts decimal-digit numbers", () => {
      expect(getNumberInputChangeResult("decimal", "123")).toEqual({
        accepted: true,
        transientValue: null,
        nextValue: 123,
      });
    });

    it("accepts positive numbers", () => {
      expect(getNumberInputChangeResult("decimal", "7")).toEqual({
        accepted: true,
        transientValue: null,
        nextValue: 7,
      });
    });

    it("accepts zero", () => {
      expect(getNumberInputChangeResult("decimal", "0")).toEqual({
        accepted: true,
        transientValue: null,
        nextValue: 0,
      });
    });

    it("clears with backspace", () => {
      expect(getNumberInputChangeResult("decimal", "")).toEqual({
        accepted: true,
        transientValue: "",
        nextValue: null,
      });
    });

    it("replaces everything with '-'", () => {
      expect(getNumberInputChangeResult("decimal", "-")).toEqual({
        accepted: true,
        transientValue: "-",
        nextValue: null,
      });
    });

    it("replaces everything with '0'", () => {
      expect(getNumberInputChangeResult("decimal", "0")).toEqual({
        accepted: true,
        transientValue: null,
        nextValue: 0,
      });
    });

    it("replaces everything with a valid number", () => {
      expect(getNumberInputChangeResult("decimal", "42")).toEqual({
        accepted: true,
        transientValue: null,
        nextValue: 42,
      });
    });

    it("rejects malformed pasted values", () => {
      expect(getNumberInputChangeResult("decimal", "12abc")).toEqual({
        accepted: false,
      });
    });
  });

  describe("float input changes", () => {
    it("accepts negative numbers", () => {
      expect(getNumberInputChangeResult("float", "-12.5")).toEqual({
        accepted: true,
        transientValue: null,
        nextValue: -12.5,
      });
    });

    it("accepts decimal numbers", () => {
      expect(getNumberInputChangeResult("float", "12.5")).toEqual({
        accepted: true,
        transientValue: null,
        nextValue: 12.5,
      });
    });

    it("accepts positive numbers", () => {
      expect(getNumberInputChangeResult("float", "7")).toEqual({
        accepted: true,
        transientValue: null,
        nextValue: 7,
      });
    });

    it("accepts zero", () => {
      expect(getNumberInputChangeResult("float", "0")).toEqual({
        accepted: true,
        transientValue: null,
        nextValue: 0,
      });
    });

    it("clears with backspace", () => {
      expect(getNumberInputChangeResult("float", "")).toEqual({
        accepted: true,
        transientValue: "",
        nextValue: null,
      });
    });

    it("replaces everything with '-'", () => {
      expect(getNumberInputChangeResult("float", "-")).toEqual({
        accepted: true,
        transientValue: "-",
        nextValue: null,
      });
    });

    it("replaces everything with '0'", () => {
      expect(getNumberInputChangeResult("float", "0")).toEqual({
        accepted: true,
        transientValue: null,
        nextValue: 0,
      });
    });

    it("replaces everything with a valid number", () => {
      expect(getNumberInputChangeResult("float", "42.25")).toEqual({
        accepted: true,
        transientValue: null,
        nextValue: 42.25,
      });
    });

    it("keeps trailing decimal text transient until blur", () => {
      expect(getNumberInputChangeResult("float", "1.")).toEqual({
        accepted: true,
        transientValue: "1.",
        nextValue: undefined,
      });
      expect(getNumberInputBlurValue("float", "1.")).toBe(1);
    });
  });

  describe("hex input changes", () => {
    it("accepts decimal-digit strings", () => {
      expect(getNumberInputChangeResult("hex", "123")).toEqual({
        accepted: true,
        transientValue: null,
        nextValue: 0x123,
      });
    });

    it("accepts positive hex numbers", () => {
      expect(getNumberInputChangeResult("hex", "ff")).toEqual({
        accepted: true,
        transientValue: null,
        nextValue: 0xff,
      });
    });

    it("accepts zero", () => {
      expect(getNumberInputChangeResult("hex", "0")).toEqual({
        accepted: true,
        transientValue: null,
        nextValue: 0,
      });
    });

    it("clears with backspace", () => {
      expect(getNumberInputChangeResult("hex", "")).toEqual({
        accepted: true,
        transientValue: "",
        nextValue: null,
      });
    });

    it("replaces everything with '0'", () => {
      expect(getNumberInputChangeResult("hex", "0")).toEqual({
        accepted: true,
        transientValue: null,
        nextValue: 0,
      });
    });

    it("replaces everything with a valid number", () => {
      expect(getNumberInputChangeResult("hex", "a")).toEqual({
        accepted: true,
        transientValue: null,
        nextValue: 0x0a,
      });
    });

    it("rejects malformed pasted values", () => {
      expect(getNumberInputChangeResult("hex", "ffz")).toEqual({
        accepted: false,
      });
    });
  });
});
