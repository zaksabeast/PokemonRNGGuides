import { type HiddenPowerFilter } from "~/rngTools";
import { useField } from "~/hooks/form";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import { pokemonTypes } from "~/types/pokemonTypes";
import { GenericForm } from "~/types/form";
import { Paths } from "~/types";
import { toOptions } from "~/utils/options";
import { FieldRow } from "~/components/form/base/layout";
import { FormNumberField } from "~/components/form/base/numberField";
import { FormMultiSelectField } from "~/components/form/base/selectField";
import { FormSwitchField } from "~/components/form/base/switchField";

type HiddenPowerForm = Record<string, HiddenPowerFilter>;

const hiddenPowerTypeOptions = toOptions(
  pokemonTypes.filter((type) => type !== "Normal"),
);

type HiddenPowerFieldProps<FormState extends GenericForm> = {
  name: Paths<FormState, HiddenPowerFilter>;
};

export const HiddenPowerField = <FormState extends GenericForm>({
  name,
}: HiddenPowerFieldProps<FormState>) => {
  const t = useActiveRouteTranslations();
  const [, , { setValue: setTypes }] = useField<
    HiddenPowerFilter["pokemon_types"]
  >(`${name}.pokemon_types`);

  return (
    <FormSwitchField<HiddenPowerForm>
      name={`${name}.active`}
      label={t["Hidden Power"]}
      onChange={(active) => {
        if (!active) {
          setTypes([]);
        }
      }}
    >
      <FormMultiSelectField<HiddenPowerForm>
        name={`${name}.pokemon_types`}
        label={t["Type"]}
        options={hiddenPowerTypeOptions}
      />
      <FieldRow>
        <FormNumberField<HiddenPowerForm>
          name={`${name}.min_bp`}
          label={t["Min power"]}
          numType="decimal"
        />
        <FormNumberField<HiddenPowerForm>
          name={`${name}.max_bp`}
          label={t["Max power"]}
          numType="decimal"
        />
      </FieldRow>
    </FormSwitchField>
  );
};
