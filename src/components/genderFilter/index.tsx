import { GenderRatio } from "~/rngTools";
import { useFormContext } from "~/hooks/form";
import { useEffect } from "react";
import { useWatch } from "react-hook-form";
import { type PkmFilterFields } from "../pkmFilter";
import { FormikSelect } from "../select";
import { getGenderFilterOptions } from "./options";

export const GenderFilter = ({
  genderRatio,
  permitAny = true,
}: {
  genderRatio?: GenderRatio;
  permitAny?: boolean;
}) => {
  const { setFieldValue } = useFormContext<PkmFilterFields>();
  const filter_gender = useWatch<PkmFilterFields, "filter_gender">({
    name: "filter_gender",
  });

  const options = getGenderFilterOptions(genderRatio, permitAny);

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
