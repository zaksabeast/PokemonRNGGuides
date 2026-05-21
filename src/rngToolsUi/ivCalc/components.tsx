import React from "react";
import { match } from "ts-pattern";
import {
  Field,
  FormFieldTable,
  FormikNumberInput,
  FormikRadio,
  FormikSelect,
} from "~/components";
import { useWatch, useField } from "~/hooks/form";
import {
  defaultMinMaxStats,
  getGen3SpeciesOptions,
  getGen4SpeciesOptions,
  getGen5SpeciesOptions,
  MinMaxStats,
} from "~/types";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import { translateOptions, Translations } from "~/translations";
import { natureOptions } from "~/components/pkmFilter";
import { getStatFields } from "../shared/statFields";
import { getStatRange } from "~/types/statRange";
import {
  Characteristic4Options,
  Characteristic5Options,
} from "../gen4/gen4types";
import { Validator, type FormState } from "./types";

type SpeciesFieldProps = {
  disabled: boolean;
};

export const SpeciesField = ({ disabled }: SpeciesFieldProps) => {
  const [, , { setValue }] = useField<FormState["species"]>("species");
  const watched = useWatch({
    names: { gen: true },
    validationSchema: Validator,
  });

  const speciesOptions = match(watched.gen)
    .with("3", () => getGen3SpeciesOptions().byName)
    .with("4", () => getGen4SpeciesOptions().byName)
    .with("5", () => getGen5SpeciesOptions().byName)
    .with(undefined, () => [])
    .with(null, () => [])
    .exhaustive();

  React.useEffect(() => {
    if (watched.gen == null) {
      return;
    }

    setValue("Bulbasaur");
  }, [setValue, watched.gen]);

  return (
    <FormikSelect<FormState, "species">
      name="species"
      options={speciesOptions}
      disabled={disabled}
    />
  );
};

type CharacteristicFieldProps = {
  t: Translations;
  disabled: boolean;
};

export const CharacteristicField = ({
  t,
  disabled,
}: CharacteristicFieldProps) => {
  const [, , { setValue }] =
    useField<FormState["characteristic"]>("characteristic");
  const watched = useWatch({
    names: { gen: true },
    validationSchema: Validator,
  });

  const gen = watched.gen == null ? "3" : watched.gen;

  const options = match(gen)
    .with("3", () => [])
    .with("4", () => Characteristic4Options)
    .with("5", () => Characteristic5Options)
    .exhaustive();

  React.useEffect(() => {
    setValue("None");
  }, [setValue, gen]);

  return (
    <FormikSelect<FormState, "characteristic">
      name="characteristic"
      disabled={disabled || gen === "3"}
      options={[{ label: t["None"], value: "None" }, ...options]}
    />
  );
};

type FieldsProps = {
  hasSubmitted: boolean;
};

export const Fields = ({ hasSubmitted }: FieldsProps) => {
  const t = useActiveRouteTranslations();
  const [minMaxStats, setMinMaxStats] =
    React.useState<MinMaxStats>(defaultMinMaxStats);
  const watched = useWatch({
    names: {
      gen: true,
      species: true,
      nature: true,
      level: true,
    },
    validationSchema: Validator,
  });

  React.useEffect(() => {
    const run = async () => {
      if (
        watched.species == null ||
        watched.nature == null ||
        watched.level == null
      ) {
        return;
      }

      const range = await getStatRange({
        species: watched.species,
        nature: watched.nature,
        levelRange: [watched.level, watched.level],
      });
      setMinMaxStats(range);
    };
    run();
  }, [watched.species, watched.nature, watched.level]);

  const fields: Field[] = [
    {
      label: t["Generation"],
      input: (
        <FormikRadio<FormState>
          name="gen"
          disabled={hasSubmitted}
          options={[
            { label: t["Gen 3"], value: "3" },
            { label: t["Gen 4"], value: "4" },
            { label: t["Gen 5"], value: "5" },
          ]}
        />
      ),
    },
    {
      label: t["Species"],
      input: <SpeciesField disabled={hasSubmitted} />,
    },
    {
      label: t["Nature"],
      input: (
        <FormikSelect<FormState, "nature">
          disabled={hasSubmitted}
          name="nature"
          options={translateOptions({
            t,
            options: natureOptions.required,
            sort: true,
          })}
        />
      ),
    },
    {
      label: t["Characteristic"],
      input: <CharacteristicField t={t} disabled={hasSubmitted} />,
    },
    {
      label: t["Level"],
      input: <FormikNumberInput<FormState> name="level" numType="decimal" />,
    },
    ...getStatFields<FormState>(minMaxStats),
  ];

  return <FormFieldTable fields={fields} />;
};
