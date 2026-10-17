import { z } from "zod";
import type { ShinyFilter, ShinyType } from "~/rngTools";

export const shinyFilterOptions: { value: ShinyFilter; label: string }[] = [
  { value: "Any", label: "Any" },
  { value: "AnyShiny", label: "Shiny (Star or Square)" },
  { value: "SquareShiny", label: "Square shiny" },
  { value: "StarShiny", label: "Star shiny" },
];

export const shinyFilterOptionsGen3To6: {
  value: ShinyFilter;
  label: string;
}[] = [
  { value: "Any", label: "Any" },
  {
    value: "AnyShiny",
    label: "Shiny (Star or Square if transferred to Gen 8+)",
  },
  { value: "SquareShiny", label: "Square shiny (If transferred to Gen 8+)" },
  { value: "StarShiny", label: "Star shiny (If transferred to Gen 8+)" },
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
