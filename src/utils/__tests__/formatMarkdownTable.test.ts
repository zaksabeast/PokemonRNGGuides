import { describe, it, expect } from "bun:test";
import { formatMarkdownTable } from "../formatMarkdownTable";

describe("formatMarkdownTable", () => {
  it("should format a right-aligned table", () => {
    const table = formatMarkdownTable(
      ["Advance", "Pokedex", "Calibration", "Nature", "Match Call"],
      [
        ["100", "7", "19", "Hardy", "None"],
        ["1234", "12", "19", "Adamant", "SwimmerTony"],
      ],
    );

    expect(table).toBe(
      [
        "| Advance | Pokedex | Calibration |  Nature |  Match Call |",
        "| ------- | ------- | ----------- | ------- | ----------- |",
        "|     100 |       7 |          19 |   Hardy |        None |",
        "|    1234 |      12 |          19 | Adamant | SwimmerTony |",
      ].join("\n"),
    );
  });

  it("should size columns to the widest cell when a cell is wider than its header", () => {
    const table = formatMarkdownTable(["A"], [["long value"], ["x"]]);

    expect(table).toBe(
      [
        "|          A |",
        "| ---------- |",
        "| long value |",
        "|          x |",
      ].join("\n"),
    );
  });

  it("should size columns to the header when all cells are narrower", () => {
    const table = formatMarkdownTable(["Header"], [["1"]]);

    expect(table).toBe(["| Header |", "| ------ |", "|      1 |"].join("\n"));
  });

  it("should format only the header and separator when there are no rows", () => {
    const table = formatMarkdownTable(["One", "Two"], []);

    expect(table).toBe(["| One | Two |", "| --- | --- |"].join("\n"));
  });

  it("should treat missing cells as empty", () => {
    const table = formatMarkdownTable(["One", "Two"], [["1"]]);

    expect(table).toBe(
      ["| One | Two |", "| --- | --- |", "|   1 |     |"].join("\n"),
    );
  });
});
