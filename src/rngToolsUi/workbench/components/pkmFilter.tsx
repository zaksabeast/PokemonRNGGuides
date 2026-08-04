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
  FormikNumberInput,
  FormikSelect,
  IvInput,
  StatFieldsInput,
  EvInput,
  EvsSchema,
} from "~/components";
import { GenericForm, maxIvs, minIvs, nature } from "~/types";
import { Field } from "./descriptions";
import { z } from "zod";
import { getIvRangeFromStats } from "~/types/statRange";
import { Species } from "~/rngTools";

type IvFilterMode = "ivs" | "stats";

const Stat = z.number().int().min(0);

const StatSchema = z.object({
  hp: Stat,
  atk: Stat,
  def: Stat,
  spa: Stat,
  spd: Stat,
  spe: Stat,
});

const ExtendedSchema = z.object({
  filter_level: z.number().int().min(1).max(100),
  filter_stat_nature: z.enum(nature),
  filter_stats: StatSchema,
  filter_evs: EvsSchema,
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
    filter_stats: minIvs,
    filter_evs: minIvs,
  };
};

// Intentionally impossible range
const impossibleIvs = {
  min_ivs: maxIvs,
  max_ivs: minIvs,
};

export const pkmFilterFieldsToRustInput = async (
  { species, ivFilterMode }: { species: Species; ivFilterMode: IvFilterMode },
  opts: PkmFilterFields,
) => {
  const filterIvs = {
    max_ivs: opts.filter_max_ivs,
    min_ivs: opts.filter_min_ivs,
  };
  const minMaxIvs =
    ivFilterMode === "stats"
      ? ((await getIvRangeFromStats({
          species,
          lvl: opts.filter_level,
          nature: opts.filter_stat_nature,
          evs: opts.filter_evs,
          stats: opts.filter_stats,
        })) ?? impossibleIvs)
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
    label: "Min IVs",
    children: (
      <IvInput<PkmFilterFields>
        name="filter_min_ivs"
        gridOverrides={{ desktop: 2, mobile: 2, smallTablet: 2, tablet: 2 }}
      />
    ),
  },
  {
    label: "Max IVs",
    children: (
      <IvInput<PkmFilterFields>
        name="filter_max_ivs"
        gridOverrides={{ desktop: 2, mobile: 2, smallTablet: 2, tablet: 2 }}
      />
    ),
  },
];

const statFields: Field[] = [
  {
    label: "Stats",
    children: (
      <StatFieldsInput<PkmFilterFields>
        name="filter_stats"
        gridOverrides={{ desktop: 2, mobile: 2, smallTablet: 2, tablet: 2 }}
      />
    ),
  },
  {
    label: "EVs",
    children: (
      <EvInput<PkmFilterFields>
        name="filter_evs"
        gridOverrides={{ desktop: 2, mobile: 2, smallTablet: 2, tablet: 2 }}
      />
    ),
  },
];

export const getPkmStatFilterFields = <FormState extends GenericForm>(
  {
    displayIvs,
    displayHiddenPower,
    displayNature = true,
    ...props
  }: tst.O.Required<PkmFilterProps, "species">,
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
      label: "Level",
      children: (
        <FormikNumberInput<PkmFilterFields>
          name="filter_level"
          numType="decimal"
        />
      ),
    },
    optOut(displayNature, {
      label: "Nature",
      children: (
        <FormikSelect<PkmFilterFields, "filter_stat_nature">
          name="filter_stat_nature"
          options={toOptions(nature)}
        />
      ),
    }),
    ...(optOut(displayIvs, statFields) ?? []),
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
