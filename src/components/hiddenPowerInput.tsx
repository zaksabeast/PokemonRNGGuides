import { z } from "zod";
import { pokemonTypes } from "../types/pokemonTypes";
import { HiddenPowerFilter } from "~/rngTools";
import { FormikNumberInput, FormikSelect, FormFieldTable } from "~/components";
import { toOptions } from "~/utils/options";
import { useField } from "formik";
import React from "react";
import { PkmFilterFields } from "./pkmFilter";
import { Paths } from "~/types";

type UiHiddenPowerFilter = z.infer<typeof HiddenPowerSchema>;

export const defaultHiddenPowerFilter: UiHiddenPowerFilter = {
  active: false,
  pokemon_types: [],
  min_bp: 30,
  max_bp: 70,
};

export const HiddenPowerSchema = z.object({
  active: z.boolean(),
  pokemon_types: z.array(z.enum(pokemonTypes)),
  min_bp: z.number().min(30).max(70),
  max_bp: z.number().min(30).max(70),
});

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
  const fields = React.useMemo(
    () => [
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
    ],
    [],
  );
  if (active === true) {
    return <FormFieldTable fields={fields} />;
  }
  return null;
};
