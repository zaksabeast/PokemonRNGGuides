import { z } from "zod";
import type { ShinyFilter, ShinyType } from "~/rngTools";

export const shinyFilterOptions: { value: ShinyFilter; label: string }[] = [
  { value: "Any", label: "Any" },
  { value: "AnyShiny", label: "Any shiny" },
  { value: "SquareShiny", label: "Square shiny" },
  { value: "StarShiny", label: "Star shiny" },
];

export const shinyFilterSchema = z.union([
  z.enum(["Any", "AnyShiny", "SquareShiny", "StarShiny"]),
  z.boolean().transform((value): ShinyFilter => (value ? "AnyShiny" : "Any")),
]);

export const shinyLabels: Record<ShinyType, string> = {
  NotShiny: "Not shiny",
  SquareShiny: "Square shiny",
  StarShiny: "Star shiny",
};

export type AceSidConfig = {
  tid: number;
  shiny: "SquareShiny" | "StarShiny";
};

export const getSidResultingInShiny = (pid: number, config: AceSidConfig): number => {
  const xor = config.shiny === "SquareShiny" ? 0 : 1;
  return ((pid >>> 16) ^ (pid & 0xffff) ^ config.tid ^ xor) & 0xffff;
};
