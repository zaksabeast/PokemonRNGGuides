import { describe, it, expect } from "bun:test";
import { fromRngDate, fromRngDateTime } from "../time";

describe("fromRngDateTime", () => {
  it("keeps years 0-99 instead of mapping them to 1900-1999", () => {
    const datetime = fromRngDateTime({
      year: 50,
      month: 3,
      day: 23,
      hour: 11,
      minute: 59,
      second: 10,
    });
    expect(datetime.year()).toBe(50);
    expect(datetime.month()).toBe(2);
    expect(datetime.date()).toBe(23);
    expect(datetime.hour()).toBe(11);
    expect(datetime.minute()).toBe(59);
    expect(datetime.second()).toBe(10);
  });
});

describe("fromRngDate", () => {
  it("keeps years 0-99 instead of mapping them to 1900-1999", () => {
    const date = fromRngDate({ year: 50, month: 3, day: 23 });
    expect(date.year()).toBe(50);
    expect(date.month()).toBe(2);
    expect(date.date()).toBe(23);
    expect(date.hour()).toBe(0);
  });
});
