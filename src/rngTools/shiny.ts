import { z } from "zod";
import type { ShinyFilter, ShinyType } from "~/rngTools";

export const shinyFilterOptions: { value: ShinyFilter; label: string }[] = [
  { value: "Any", label: "Not shiny" },
  { value: "AnyShiny", label: "Shiny (Star or Square)" },
  { value: "SquareShiny", label: "Square shiny" },
  { value: "StarShiny", label: "Star shiny" },
];

export const shinyFilterGen3To7Tooltip =
  "Star and Square shiny describe how the Pokemon will appear when transferred to Gen 8 or later. Both appear as regular shiny Pokemon in Gen 3-7.";

export const shinyFilterSchema = z.union([
  z.enum(["Any", "AnyShiny", "SquareShiny", "StarShiny"]),
  z.boolean().transform((value): ShinyFilter => (value ? "AnyShiny" : "Any")),
]);

export const shinyLabels = {
  NotShiny: "Not shiny",
  SquareShiny: "Square shiny",
  StarShiny: "Star shiny",
} as const satisfies Record<ShinyType, string>;
