import { GenderRatio, Gender } from "~/rngTools";
import React from "react";
import { FormikSelect } from "../select";
import { getGenderFilterOptions } from "./options";
import { GenericForm, GuaranteeFormNameType } from "~/types";
import { useField } from "~/hooks/form";

type FormikGenderFilterProps<FormState extends GenericForm> = {
  genderRatio?: GenderRatio;
  permitAny?: boolean;
  name: GuaranteeFormNameType<FormState, Gender | null>;
};

export const FormikGenderFilter = <FormState extends GenericForm>({
  genderRatio,
  permitAny = true,
  name,
}: FormikGenderFilterProps<FormState>) => {
  const [{ value }, , { setValue }] = useField<Gender | null>(name);

  const options = getGenderFilterOptions(genderRatio, permitAny);

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

  // No need to pass generic types since they're validated above
  return (
    <FormikSelect
      name={name}
      options={options}
      disabled={options.length <= 1}
    />
  );
};
