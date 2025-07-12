import { GenericForm, GuaranteeFormNameType } from "~/types/form";
import { z } from "zod";
import { pokemonTypes } from "../types/pokemonTypes";
import { PokemonType } from "~/rngTools";
import { FormikNumberInput, FormikSelect, FormFieldTable } from "~/components";
import { toOptions } from "~/utils/options";
import { useField } from "formik";
import React from "react";

type UiHiddenPowerFilter = {
  active: boolean;
  pokemon_types: PokemonType[];
  min_bp: number;
  max_bp: number;
};

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

type Props<FormState extends GenericForm> = {
  name: GuaranteeFormNameType<FormState, UiHiddenPowerFilter>;
};

const HIDDEN_POWER_TYPES = pokemonTypes.filter((type) => type !== "Normal");

export const HiddenPowerInput = <FormState extends GenericForm>({
  name,
}: Props<FormState>) => {
  const [{ value: active }] = useField<UiHiddenPowerFilter["active"]>(
    `${name}.active`,
  );
  const fields = React.useMemo(
    () => [
      {
        label: "Type",
        input: (
          <FormikSelect<FormState, "pokemon_types">
            name={`${name}.pokemon_types`}
            //@ts-expect-error TODO
            options={toOptions(HIDDEN_POWER_TYPES)}
            mode="multiple"
          />
        ),
      },
      {
        label: "Min power",
        input: (
          //@ts-expect-error TODO
          <FormikNumberInput<FormState>
            name={`${name}.min_bp`}
            numType="decimal"
          />
        ),
      },
      {
        label: "Max power",
        input: (
          //@ts-expect-error TODO
          <FormikNumberInput<FormState>
            name={`${name}.max_bp`}
            numType="decimal"
          />
        ),
      },
    ],
    [name],
  );
  return active && <FormFieldTable fields={fields} />;
};
