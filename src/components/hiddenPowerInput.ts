import { pokemonTypes } from "../types/pokemonTypes";
import { z } from "zod";

export const HiddenPowerSchema = z
  .object({
    active: z.boolean(),
    pokemon_types: z.array(z.enum(pokemonTypes)),
    min_bp: z.number().min(30).max(70),
    max_bp: z.number().min(30).max(70),
  })
  .refine((data) => !data.active || data.pokemon_types.length >= 1, {
    message: "pokemon_types must have at least one item when active is true",
    path: ["pokemon_types"],
  });

export const defaultHiddenPowerFilter: z.infer<typeof HiddenPowerSchema> = {
  active: false,
  pokemon_types: [],
  min_bp: 30,
  max_bp: 70,
};
