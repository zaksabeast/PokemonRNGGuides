import { type Nature } from "~/rngTools";
import { getNatureInputProps } from "~/components/pkmFilter";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import { Translations } from "~/translations";
import { GenericForm } from "~/types/form";
import { Paths } from "~/types";
import {
  FormMultiSelectField,
  FormSelectField,
  type SelectOption,
} from "~/components/form/base/selectField";

type NatureForm = Record<string, Nature>;

type NatureListForm = Record<string, Nature[]>;

const getNatureOptions = (t: Translations): SelectOption<Nature>[] =>
  getNatureInputProps(t).options.map((option) => ({
    value: option.value,
    label: option.label,
    selectedLabel: option.labelWhenSelected,
    searchText: option.labelWhenSelected,
  }));

type NatureFieldProps<FormState extends GenericForm> = {
  name: Paths<FormState, Nature>;
};

export const NatureField = <FormState extends GenericForm>({
  name,
}: NatureFieldProps<FormState>) => {
  const t = useActiveRouteTranslations();

  return (
    <FormSelectField<NatureForm>
      name={name}
      label={t["Nature"]}
      options={getNatureOptions(t)}
    />
  );
};

type NatureFilterFieldProps<FormState extends GenericForm> = {
  name: Paths<FormState, Nature[]>;
};

export const NatureFilterField = <FormState extends GenericForm>({
  name,
}: NatureFilterFieldProps<FormState>) => {
  const t = useActiveRouteTranslations();

  return (
    <FormMultiSelectField<NatureListForm>
      name={name}
      label={t["Nature"]}
      placeholder={t["Any"]}
      options={getNatureOptions(t)}
    />
  );
};
