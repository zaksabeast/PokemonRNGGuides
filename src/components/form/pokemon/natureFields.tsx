import { type Nature } from "~/rngTools";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import { GenericForm } from "~/types/form";
import { Paths } from "~/types";
import {
  FormMultiSelectField,
  FormSelectField,
} from "~/components/form/base/selectField";
import { getNatureOptions } from "./natureOptions";

type NatureForm = Record<string, Nature>;

type NatureListForm = Record<string, Nature[]>;

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
