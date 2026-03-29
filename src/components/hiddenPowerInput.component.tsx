import { pokemonTypes } from "../types/pokemonTypes";
import { HiddenPowerFilter } from "~/rngTools";
import {
  FormikNumberInput,
  FormikSelect,
  FormFieldTable,
  FormikSwitch,
} from "~/components";
import { toOptions } from "~/utils/options";
import { useField } from "~/hooks/form";
import { PkmFilterFields } from "./pkmFilter";
import { Paths } from "~/types";

const HIDDEN_POWER_TYPES = pokemonTypes.filter((type) => type !== "Normal");

type Props<FormState extends PkmFilterFields> = {
  name: Paths<FormState, HiddenPowerFilter> & "filter_hidden_power";
};

export const HiddenPowerInput = <FormState extends PkmFilterFields>({
  name,
}: Props<FormState>) => {
  const [{ value: active }] = useField<HiddenPowerFilter["active"]>(
    `${name}.active`,
  );
  const fields = [
    {
      label: "Type",
      input: (
        <FormikSelect<PkmFilterFields, "filter_hidden_power.pokemon_types">
          name="filter_hidden_power.pokemon_types"
          options={toOptions(HIDDEN_POWER_TYPES)}
          mode="multiple"
        />
      ),
    },
    {
      label: "Min power",
      input: (
        <FormikNumberInput<PkmFilterFields>
          name="filter_hidden_power.min_bp"
          numType="decimal"
        />
      ),
    },
    {
      label: "Max power",
      input: (
        <FormikNumberInput<PkmFilterFields>
          name="filter_hidden_power.max_bp"
          numType="decimal"
        />
      ),
    },
  ];

  if (active === true) {
    return <FormFieldTable fields={fields} />;
  }
  return null;
};

export const HiddenPowerSwitch = () => {
  const [, , { setValue }] = useField<HiddenPowerFilter["pokemon_types"]>(
    "filter_hidden_power.pokemon_types",
  );

  const resetHiddenPower = (active: boolean) => {
    if (active) {
      return;
    }

    setValue([]);
  };

  return (
    <FormikSwitch<PkmFilterFields>
      name="filter_hidden_power.active"
      onChange={resetHiddenPower}
    />
  );
};
