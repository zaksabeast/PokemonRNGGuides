import { GenderRatio } from "~/rngTools";
import { gender, getPossibleGenders } from "~/types/gender";

export const genderOptions = ([null, ...gender] as const).map((gen) => ({
  label: gen ?? ("Any" as const),
  value: gen,
}));

export const getGenderFilterOptions = (
  genderRatio?: GenderRatio,
  permitAny = true,
) => {
  if (genderRatio == null) {
    return genderOptions;
  }

  const possibleGenders = getPossibleGenders(genderRatio);
  permitAny = permitAny && possibleGenders.length > 1;
  return genderOptions.filter((option) => {
    if (option.value == null) {
      return permitAny;
    }
    return possibleGenders.includes(option.value);
  });
};
