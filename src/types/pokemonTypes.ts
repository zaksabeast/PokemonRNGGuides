import { PokemonType } from "~/rngTools";
import { toOptions } from "~/utils/options";

export const pokemonTypes = [
  "Normal",
  "Fighting",
  "Flying",
  "Poison",
  "Ground",
  "Rock",
  "Bug",
  "Ghost",
  "Steel",
  "Fire",
  "Water",
  "Grass",
  "Electric",
  "Psychic",
  "Ice",
  "Dragon",
  "Dark",
  "Fairy",
] as const satisfies PokemonType[];

export const hiddenPowerTypes = [
  "Bug",
  "Dark",
  "Dragon",
  "Electric",
  "Fighting",
  "Fire",
  "Flying",
  "Ghost",
  "Grass",
  "Ground",
  "Ice",
  "Poison",
  "Psychic",
  "Rock",
  "Steel",
  "Water",
] as const satisfies PokemonType[];

export const hiddenPowerTypeOptions = toOptions(hiddenPowerTypes);
