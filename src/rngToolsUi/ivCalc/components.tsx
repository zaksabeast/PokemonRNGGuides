import React from "react";
import { match } from "ts-pattern";
import {
  FormNumberField,
  FormRadioField,
  FormSection,
  FormSelectField,
  getNatureOptions,
  StatRadioFields,
} from "~/components/form";
import { useWatch, useField } from "~/hooks/form";
import { defaultMinMaxStats, MinMaxStats } from "~/types";
import {
  getGen3SpeciesOptions,
  getGen4SpeciesOptions,
  getGen5SpeciesOptions,
} from "~/components/form/pokemon/speciesOptions";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
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
  const t = useActiveRouteTranslations();
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
    <FormSelectField<FormState>
      name="species"
      label={t["Species"]}
      options={speciesOptions}
      disabled={disabled}
    />
  );
};

type CharacteristicFieldProps = {
  disabled: boolean;
};

export const CharacteristicField = ({ disabled }: CharacteristicFieldProps) => {
  const t = useActiveRouteTranslations();
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
    <FormSelectField<FormState>
      name="characteristic"
      label={t["Characteristic"]}
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

  return (
    <>
      <FormSection title={t["Your Pokémon"]}>
        <FormRadioField<FormState>
          name="gen"
          label={t["Generation"]}
          cellSize="word"
          disabled={hasSubmitted}
          options={[
            { label: t["Gen 3"], value: "3" },
            { label: t["Gen 4"], value: "4" },
            { label: t["Gen 5"], value: "5" },
          ]}
        />
        <SpeciesField disabled={hasSubmitted} />
        <FormSelectField<FormState>
          name="nature"
          label={t["Nature"]}
          options={getNatureOptions(t)}
          disabled={hasSubmitted}
        />
        <CharacteristicField disabled={hasSubmitted} />
        <FormNumberField<FormState>
          name="level"
          label={t["Level"]}
          numType="decimal"
        />
      </FormSection>

      <FormSection title={t["Stats"]}>
        <StatRadioFields<FormState> minMaxStats={minMaxStats} />
      </FormSection>
    </>
  );
};
