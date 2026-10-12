import { expect, test } from "bun:test";
import { getSidResultingInShiny, shinyFilterSchema } from "~/rngTools/shiny";

test("saved boolean filters retain their previous meaning", () => {
  expect(shinyFilterSchema.parse(false)).toBe("Any");
  expect(shinyFilterSchema.parse(true)).toBe("AnyShiny");
  for (const value of ["Any", "AnyShiny", "SquareShiny", "StarShiny"] as const) {
    expect(shinyFilterSchema.parse(value)).toBe(value);
  }
  expect(shinyFilterSchema.safeParse("NotShiny").success).toBe(false);
});

test("ACE SID produces the requested subtype for signed and unsigned PIDs", () => {
  for (const pid of [0, 0xffffffff, 0x80001234, 0xe601f1cd]) {
    for (const tid of [0, 65535, 11568]) {
      for (const shiny of ["SquareShiny", "StarShiny"] as const) {
        const sid = getSidResultingInShiny(pid, { tid, shiny });
        expect(sid).toBeGreaterThanOrEqual(0);
        expect(sid).toBeLessThanOrEqual(65535);
        const xor = (pid >>> 16) ^ (pid & 0xffff) ^ tid ^ sid;
        expect(xor).toBe(shiny === "SquareShiny" ? 0 : 1);
      }
    }
  }
});
