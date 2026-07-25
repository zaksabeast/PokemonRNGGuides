import * as tst from "ts-toolbelt";
import { pokemonTypes } from "~/types/pokemonTypes";
import {
  getPkmFilterFields as _getPkmFilterFields,
  pkmFilterSchema as _pkmFilterSchema,
  getPkmFilterInitialValues as _getPkmFilterInitialValues,
  pkmFilterFieldsToRustInput as _pkmFilterFieldsToRustInput,
  PkmFilterProps,
} from "~/components/pkmFilter";
import { optOut, toOptions } from "~/utils/options";
import { Translations } from "~/translations/en";
import { MinMaxContainer, FormikNumberInput, FormikSelect } from "~/components";
import { GenericForm, nature, species } from "~/types";
import { Field } from "./descriptions";
import { z } from "zod";
import { getIvRangeFromStats } from "~/types/statRange";
import { Species } from "~/rngTools";

type IvFilterMode = "ivs" | "stats";

const ExtendedSchema = z.object({
  species: z.enum(species),
  filter_level: z.number().int().min(1).max(100),
  filter_stat_nature: z.enum(nature),
  filter_stat_hp: z.number(),
  filter_stat_atk: z.number(),
  filter_stat_def: z.number(),
  filter_stat_spa: z.number(),
  filter_stat_spd: z.number(),
  filter_stat_spe: z.number(),
});

export const pkmFilterSchema = _pkmFilterSchema.extend(ExtendedSchema.shape);

type PkmFilterFields = z.infer<typeof pkmFilterSchema>;

export const getPkmFilterInitialValues = (): tst.O.Omit<
  PkmFilterFields,
  "species" | "filter_level"
> => {
  return {
    ..._getPkmFilterInitialValues(),
    filter_stat_nature: "Hardy",
    filter_stat_hp: 0,
    filter_stat_atk: 0,
    filter_stat_def: 0,
    filter_stat_spa: 0,
    filter_stat_spd: 0,
    filter_stat_spe: 0,
  };
};

export const pkmFilterFieldsToRustInput = async (
  { ivFilterMode }: { ivFilterMode: IvFilterMode },
  opts: PkmFilterFields,
) => {
  const filterIvs = {
    max_ivs: opts.filter_max_ivs,
    min_ivs: opts.filter_min_ivs,
  };
  const minMaxIvs =
    ivFilterMode === "stats"
      ? ((await getIvRangeFromStats({
          species: opts.species,
          lvl: opts.filter_level,
          nature: opts.filter_stat_nature,
          stats: {
            hp: opts.filter_stat_hp,
            atk: opts.filter_stat_atk,
            def: opts.filter_stat_def,
            spa: opts.filter_stat_spa,
            spd: opts.filter_stat_spd,
            spe: opts.filter_stat_spe,
          },
        })) ?? filterIvs)
      : filterIvs;

  const natures =
    ivFilterMode === "stats" ? [opts.filter_stat_nature] : opts.filter_nature;

  return _pkmFilterFieldsToRustInput({
    ...opts,
    filter_nature: natures,
    filter_max_ivs: minMaxIvs.max_ivs,
    filter_min_ivs: minMaxIvs.min_ivs,
    filter_hidden_power: {
      ...opts.filter_hidden_power,
      active: opts.filter_hidden_power.pokemon_types.length > 0,
    },
  });
};

const ivFields: Field[] = [
  {
    label: "HP IV",
    children: (
      <MinMaxContainer
        min={
          <FormikNumberInput<PkmFilterFields>
            name="filter_min_ivs.hp"
            numType="decimal"
          />
        }
        max={
          <FormikNumberInput<PkmFilterFields>
            name="filter_max_ivs.hp"
            numType="decimal"
          />
        }
      />
    ),
  },
  {
    label: "Atk IV",
    children: (
      <MinMaxContainer
        min={
          <FormikNumberInput<PkmFilterFields>
            name="filter_min_ivs.atk"
            numType="decimal"
          />
        }
        max={
          <FormikNumberInput<PkmFilterFields>
            name="filter_max_ivs.atk"
            numType="decimal"
          />
        }
      />
    ),
  },
  {
    label: "Def IV",
    children: (
      <MinMaxContainer
        min={
          <FormikNumberInput<PkmFilterFields>
            name="filter_min_ivs.def"
            numType="decimal"
          />
        }
        max={
          <FormikNumberInput<PkmFilterFields>
            name="filter_max_ivs.def"
            numType="decimal"
          />
        }
      />
    ),
  },
  {
    label: "SpA IV",
    children: (
      <MinMaxContainer
        min={
          <FormikNumberInput<PkmFilterFields>
            name="filter_min_ivs.spa"
            numType="decimal"
          />
        }
        max={
          <FormikNumberInput<PkmFilterFields>
            name="filter_max_ivs.spa"
            numType="decimal"
          />
        }
      />
    ),
  },
  {
    label: "SpD IV",
    children: (
      <MinMaxContainer
        min={
          <FormikNumberInput<PkmFilterFields>
            name="filter_min_ivs.spd"
            numType="decimal"
          />
        }
        max={
          <FormikNumberInput<PkmFilterFields>
            name="filter_max_ivs.spd"
            numType="decimal"
          />
        }
      />
    ),
  },
  {
    label: "Spe IV",
    children: (
      <MinMaxContainer
        min={
          <FormikNumberInput<PkmFilterFields>
            name="filter_min_ivs.spe"
            numType="decimal"
          />
        }
        max={
          <FormikNumberInput<PkmFilterFields>
            name="filter_max_ivs.spe"
            numType="decimal"
          />
        }
      />
    ),
  },
];

const statFields: Field[] = [
  {
    label: "HP Stat",
    children: (
      <FormikNumberInput<PkmFilterFields>
        name="filter_stat_hp"
        numType="decimal"
      />
    ),
  },
  {
    label: "Atk Stat",
    children: (
      <FormikNumberInput<PkmFilterFields>
        name="filter_stat_atk"
        numType="decimal"
      />
    ),
  },
  {
    label: "Def Stat",
    children: (
      <FormikNumberInput<PkmFilterFields>
        name="filter_stat_def"
        numType="decimal"
      />
    ),
  },
  {
    label: "SpA Stat",
    children: (
      <FormikNumberInput<PkmFilterFields>
        name="filter_stat_spa"
        numType="decimal"
      />
    ),
  },
  {
    label: "SpD Stat",
    children: (
      <FormikNumberInput<PkmFilterFields>
        name="filter_stat_spd"
        numType="decimal"
      />
    ),
  },
  {
    label: "Spe Stat",
    children: (
      <FormikNumberInput<PkmFilterFields>
        name="filter_stat_spe"
        numType="decimal"
      />
    ),
  },
];

export const getPkmStatFilterFields = <FormState extends GenericForm>(
  {
    displayIvs,
    displayHiddenPower,
    displayNature = true,
    speciesOptions,
    ...props
  }: tst.O.Required<PkmFilterProps, "species"> & {
    speciesOptions: { label: string; value: Species }[];
  },
  t?: Translations,
): FormState extends PkmFilterFields ? Field[] : never => {
  const fields = _getPkmFilterFields<FormState>(
    {
      ...props,
      // We have custom stat fields
      displayIvs: false,
      displayHiddenPower: false,
      displayNature: false,
    },
    t,
  );

  const mapped: Field[] = [
    {
      label: "Species",
      children: (
        <FormikSelect<PkmFilterFields, "species">
          name="species"
          options={speciesOptions}
        />
      ),
    },
    ...(optOut(displayIvs, statFields) ?? []),
    optOut(displayNature, {
      label: "Nature",
      children: (
        <FormikSelect<PkmFilterFields, "filter_stat_nature">
          name="filter_stat_nature"
          options={toOptions(nature)}
        />
      ),
    }),
    ...fields.map((field) => ({
      label: field.label,
      children: field.input,
    })),
    optOut(displayHiddenPower, {
      label: "HP Type",
      children: (
        <FormikSelect<PkmFilterFields, "filter_hidden_power.pokemon_types">
          name="filter_hidden_power.pokemon_types"
          options={toOptions(pokemonTypes.filter((type) => type !== "Normal"))}
          mode="multiple"
        />
      ),
    }),
  ].filter((field) => field != null);

  return mapped as FormState extends PkmFilterFields ? Field[] : never;
};

export const getPkmFilterIvFields = <FormState extends GenericForm>(
  { displayIvs, displayHiddenPower, ...props }: PkmFilterProps,
  t?: Translations,
): FormState extends PkmFilterFields ? Field[] : never => {
  const fields = _getPkmFilterFields<FormState>(
    {
      ...props,
      // We have custom stat fields
      displayIvs: false,
      displayHiddenPower: false,
    },
    t,
  );

  const mapped: Field[] = [
    ...(optOut(displayIvs, ivFields) ?? []),
    ...fields.map((field) => ({
      label: field.label,
      children: field.input,
    })),
    optOut(displayHiddenPower, {
      label: "HP Type",
      children: (
        <FormikSelect<PkmFilterFields, "filter_hidden_power.pokemon_types">
          name="filter_hidden_power.pokemon_types"
          options={toOptions(pokemonTypes.filter((type) => type !== "Normal"))}
          mode="multiple"
        />
      ),
    }),
  ].filter((field) => field != null);

  return mapped as FormState extends PkmFilterFields ? Field[] : never;
};
