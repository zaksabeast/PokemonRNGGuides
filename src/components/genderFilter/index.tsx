import { GenderRatio } from "~/rngTools";
import { getPossibleGenders } from "~/types/gender";
import { useFormContext } from "~/hooks/form";
import { useEffect } from "react";
import { useWatch } from "react-hook-form";
import { type PkmFilterFields } from "../pkmFilter";
import { FormikSelect } from "../select";
import { genderOptions } from "./options";

const getGenderFilterOptions = (genderRatio?: GenderRatio) => {
  if (genderRatio == null) {
    return genderOptions;
  }

  const possibleGenders = getPossibleGenders(genderRatio);
  const permitNull = possibleGenders.length > 1;
  return genderOptions.filter((option) => {
    if (option.value == null) {
      return permitNull;
    }
    return possibleGenders.includes(option.value);
  });
};

export const GenderFilter = ({
  genderRatio,
}: {
  genderRatio?: GenderRatio;
}) => {
  const { setFieldValue } = useFormContext<PkmFilterFields>();
  const filter_gender = useWatch<PkmFilterFields, "filter_gender">({
    name: "filter_gender",
  });

  const options = getGenderFilterOptions(genderRatio);

  useEffect(() => {
    if (options.some((opt) => opt.value === filter_gender)) {
      return;
    }
    if (options.length === 0) {
      return;
    }
    // Currently selected value is invalid.
    setFieldValue("filter_gender", options[0].value);
  }, [filter_gender, options, setFieldValue]);

  return (
    <FormikSelect<PkmFilterFields, "filter_gender">
      name="filter_gender"
      options={options}
      disabled={options.length <= 1}
    />
  );
};
