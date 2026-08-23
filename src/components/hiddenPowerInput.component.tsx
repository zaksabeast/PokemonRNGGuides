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
import { Paths } from "~/types";

const HIDDEN_POWER_TYPES = pokemonTypes.filter((type) => type !== "Normal");

type HiddenPowerFields = {
  filter_hidden_power: HiddenPowerFilter;
};

type Props<FormState extends HiddenPowerFields> = {
  name: Paths<FormState, HiddenPowerFilter> & "filter_hidden_power";
};

export const HiddenPowerInput = <FormState extends HiddenPowerFields>(
  // Keeping props to make sure form state is compatible
  _props: Props<FormState>,
) => {
  const fields = [
    {
      label: "Type",
      input: (
        <FormikSelect<HiddenPowerFields, "filter_hidden_power.pokemon_types">
          name="filter_hidden_power.pokemon_types"
          options={toOptions(HIDDEN_POWER_TYPES)}
          mode="multiple"
        />
      ),
    },
    {
      label: "Min power",
      input: (
        <FormikNumberInput<HiddenPowerFields>
          name="filter_hidden_power.min_bp"
          numType="decimal"
        />
      ),
    },
    {
      label: "Max power",
      input: (
        <FormikNumberInput<HiddenPowerFields>
          name="filter_hidden_power.max_bp"
          numType="decimal"
        />
      ),
    },
  ];

  return <FormFieldTable fields={fields} />;
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
    <FormikSwitch<HiddenPowerFields>
      name="filter_hidden_power.active"
      onChange={resetHiddenPower}
    />
  );
};
