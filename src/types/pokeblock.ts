import z from "zod";
import { Wild3SafariPokeblockSearchOpt } from "~/rngTools";

export type Pokeblock = [number, number, number, number, number];
export const defaultPokeblock = (): Pokeblock => [0, 0, 0, 0, 0];

const flavor_schema = z.number().int().min(0).max(255);

export const pokeblockSchema = z
  .tuple([
    flavor_schema,
    flavor_schema,
    flavor_schema,
    flavor_schema,
    flavor_schema,
  ])
  .nullable();

export const wild3SafariPokeblockSearchOpt = [
  "None",
  "SoloOnly",
  "All",
] as const satisfies Wild3SafariPokeblockSearchOpt[];

export const pokeblockFlavorNames = ["Spicy", "Dry", "Sweet", "Bitter", "Sour"];
