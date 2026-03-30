import { gender } from "~/types/gender";

export const genderOptions = ([null, ...gender] as const).map((gen) => ({
  label: gen ?? ("Any" as const),
  value: gen,
}));
