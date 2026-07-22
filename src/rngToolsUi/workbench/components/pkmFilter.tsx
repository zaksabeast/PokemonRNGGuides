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
import {
  MinMaxContainer,
  FormikNumberInput,
  FormikRadio,
  FormikSelect,
} from "~/components";
import { GenericForm, nature, species } from "~/types";
import { Field } from "./descriptions";
import { z } from "zod";
import { getIvRangeFromStats } from "~/types/statRange";

const IvFilterModeSchema = z.enum(["ivs", "stats"]);

type IvFilterMode = z.infer<typeof IvFilterModeSchema>;

const ExtendedSchema = z.object({
  species: z.enum(species),
  iv_filter_mode: IvFilterModeSchema,
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
    iv_filter_mode: "ivs",
    filter_stat_nature: "Hardy",
    filter_stat_hp: 0,
    filter_stat_atk: 0,
    filter_stat_def: 0,
    filter_stat_spa: 0,
    filter_stat_spd: 0,
    filter_stat_spe: 0,
  };
};

export const pkmFilterFieldsToRustInput = async (opts: PkmFilterFields) => {
  const filterIvs = {
    max_ivs: opts.filter_max_ivs,
    min_ivs: opts.filter_min_ivs,
  };
  const minMaxIvs =
    opts.iv_filter_mode === "stats"
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
    opts.iv_filter_mode === "stats"
      ? [opts.filter_stat_nature]
      : opts.filter_nature;

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
    label: "HP",
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
    label: "Atk",
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
    label: "Def",
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
    label: "SpA",
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
    label: "SpD",
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
    label: "Spe",
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
    label: "HP",
    children: (
      <FormikNumberInput<PkmFilterFields>
        name="filter_stat_hp"
        numType="decimal"
      />
    ),
  },
  {
    label: "Atk",
    children: (
      <FormikNumberInput<PkmFilterFields>
        name="filter_stat_atk"
        numType="decimal"
      />
    ),
  },
  {
    label: "Def",
    children: (
      <FormikNumberInput<PkmFilterFields>
        name="filter_stat_def"
        numType="decimal"
      />
    ),
  },
  {
    label: "SpA",
    children: (
      <FormikNumberInput<PkmFilterFields>
        name="filter_stat_spa"
        numType="decimal"
      />
    ),
  },
  {
    label: "SpD",
    children: (
      <FormikNumberInput<PkmFilterFields>
        name="filter_stat_spd"
        numType="decimal"
      />
    ),
  },
  {
    label: "Spe",
    children: (
      <FormikNumberInput<PkmFilterFields>
        name="filter_stat_spe"
        numType="decimal"
      />
    ),
  },
];

export const getPkmFilterFields = <FormState extends GenericForm>(
  {
    ivFilterMode,
    displayIvs,
    displayHiddenPower,
    displayNature = true,
    ...props
  }: PkmFilterProps & { ivFilterMode: IvFilterMode },
  t?: Translations,
): FormState extends PkmFilterFields ? Field[] : never => {
  const fields = _getPkmFilterFields<FormState>(
    {
      ...props,
      // We have custom stat fields
      displayIvs: false,
      displayHiddenPower: false,
      displayNature: displayNature && ivFilterMode === "ivs",
    },
    t,
  );

  const mapped: Field[] = [
    {
      label: "Mode",
      children: (
        <FormikRadio<PkmFilterFields>
          name="iv_filter_mode"
          options={[
            { label: "IVs", value: "ivs" },
            { label: "Stats", value: "stats" },
          ]}
        />
      ),
    },
    ...(optOut(displayIvs || ivFilterMode === "ivs", ivFields) ?? []),
    ...(optOut(displayIvs || ivFilterMode === "stats", statFields) ?? []),
    optOut(displayNature && ivFilterMode === "stats", {
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
