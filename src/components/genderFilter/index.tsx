import { Gender, Species } from "~/rngTools";
import React from "react";
import { genderOptions } from "./options";
import {
  GenericForm,
  GuaranteeFormNameType,
  genderRatioBySpecies,
  getPossibleGenders,
} from "~/types";
import { useField } from "~/hooks/form";
import { FormikRadio } from "../radio";

type FormikGenderFilterProps<FormState extends GenericForm> = {
  species?: Species;
  permitAny?: boolean;
  name: GuaranteeFormNameType<FormState, Gender | null>;
};

const getGenderFilterOptions = (species?: Species, permitAny = true) => {
  if (species == null) {
    return genderOptions;
  }

  const genderRatio = genderRatioBySpecies[species];
  const possibleGenders = getPossibleGenders(genderRatio);
  const safePermitAny = permitAny && possibleGenders.length > 1;
  return genderOptions.filter((option) => {
    if (option.value == null) {
      return safePermitAny;
    }
    return possibleGenders.includes(option.value);
  });
};

export const FormikGenderFilter = <FormState extends GenericForm>({
  species,
  permitAny = true,
  name,
}: FormikGenderFilterProps<FormState>) => {
  const [{ value }, , { setValue }] = useField<Gender | null>(name);

  const options = getGenderFilterOptions(species, permitAny);

  React.useEffect(() => {
    if (options.some((opt) => opt.value === value)) {
      return;
    }

    if (options.length === 0) {
      return;
    }

    // Currently selected value is invalid.
    setValue(options[0].value);
  }, [value, options, setValue]);

  return (
    // @ts-expect-error -- prop types guarantee this is correct
    <FormikRadio name={name} options={options} />
  );
};
