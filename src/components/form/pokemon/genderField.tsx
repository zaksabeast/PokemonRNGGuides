import { type Gender, type Species } from "~/rngTools";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import { getGenderFilterOptions } from "~/types/gender";
import { GenericForm } from "~/types/form";
import { Paths } from "~/types";
import { FormRadioField } from "~/components/form/base/radioField";

type GenderForm = Record<string, Gender | null>;

type GenderFilterFieldProps<FormState extends GenericForm> = {
  name: Paths<FormState, Gender | null>;
  /** Limits the options to the species' possible genders */
  species?: Species;
};

export const GenderFilterField = <FormState extends GenericForm>({
  name,
  species,
}: GenderFilterFieldProps<FormState>) => {
  const t = useActiveRouteTranslations();
  const options = getGenderFilterOptions(species).map((option) => ({
    label: t[option.label],
    value: option.value,
  }));

  return (
    <FormRadioField<GenderForm>
      name={name}
      label={t["Gender"]}
      cellSize="word"
      options={options}
    />
  );
};
