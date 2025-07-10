import React from "react";
import {
  FormikNumberInput,
  ResultColumn,
  FormikSelect,
  Field,
  FormikSwitch,
  RngToolForm,
  RngToolSubmit,
} from "~/components";
import { rngTools, Gen3HeldEgg } from "~/rngTools";
import { gen3SpeciesOptions, species } from "~/types/species";
import { nature } from "~/types/nature";
import { gender } from "~/types/gender";
import { genderOptions, natureOptions } from "~/components/pkmFilter";
import { z } from "zod";
import { t } from "~/translations";
import { useActiveRouteLanguage } from "~/hooks/useActiveRoute";
import { LanguageKey } from "~/guides";

const getColumns = (language: LanguageKey): ResultColumn<Gen3HeldEgg>[] => {
  return [
    { title: t("Advance", language), dataIndex: "advance" },
    { title: t("Redraws", language), dataIndex: "redraws" },
    {
      title: t("PID", language),
      dataIndex: "pid",
      monospace: true,
      render: (pid) => pid.toString(16).padStart(8, "0").toUpperCase(),
    },
    { title: t("Gender", language), dataIndex: "gender" },
    {
      title: t("Shiny", language),
      dataIndex: "shiny",
      render: (shiny) => (shiny ? "Yes" : "No"),
    },
    { title: t("Nature", language), dataIndex: "nature" },
    { title: t("Ability", language), dataIndex: "ability" },
  ];
};

const Validator = z.object({
  delay: z.number().int().min(0),
  initial_advances: z.number().int().min(0),
  max_advances: z.number().int().min(0),
  female_has_everstone: z.boolean(),
  female_nature: z.enum(nature),
  calibration: z.number().int().min(0),
  min_redraw: z.number().int().min(0),
  max_redraw: z.number().int().min(0),
  compatability: z.enum(["DontLikeEachOther", "GetAlong", "GetAlongVeryWell"]),
  tid: z.number().int().min(0).max(65535),
  sid: z.number().int().min(0).max(65535),
  egg_species: z.enum(species),
  filter_shiny: z.boolean(),
  filter_nature: z.enum(nature).nullable(),
  filter_gender: z.enum(gender).nullable(),
});

export type FormState = z.infer<typeof Validator>;

const initialValues: FormState = {
  delay: 0,
  initial_advances: 100,
  max_advances: 1000,
  female_has_everstone: false,
  female_nature: "Adamant",
  calibration: 18,
  min_redraw: 0,
  max_redraw: 5,
  compatability: "GetAlong",
  tid: 0,
  sid: 0,
  egg_species: "Bulbasaur",
  filter_shiny: false,
  filter_nature: null,
  filter_gender: null,
};

const getFields = (language: LanguageKey): Field[] => {
  return [
    {
      label: t("Female or Ditto has everstone", language),
      input: (
        <FormikSwitch<
          FormState,
          "female_has_everstone"
        > name="female_has_everstone" />
      ),
    },
    {
      label: t("Female or Ditto nature", language),
      input: (
        <FormikSelect<FormState, "female_nature">
          name="female_nature"
          options={natureOptions.required}
        />
      ),
    },
    {
      label: t("Egg species", language),
      input: (
        <FormikSelect<FormState, "egg_species">
          name="egg_species"
          options={gen3SpeciesOptions.byName}
        />
      ),
    },

    {
      label: t("Compatability", language),
      input: (
        <FormikSelect<FormState, "compatability">
          name="compatability"
          options={[
            {
              label: t("The two seem to get along", language),
              value: "GetAlong",
            },
            {
              label: t("The two seem to get along very well", language),
              value: "GetAlongVeryWell",
            },
            {
              label: t("The two don't seem to like each other", language),
              value: "DontLikeEachOther",
            },
          ]}
        />
      ),
    },
    {
      label: t("Calibration", language),
      input: (
        <FormikNumberInput<FormState> name="calibration" numType="decimal" />
      ),
    },
    {
      label: t("TID", language),
      input: <FormikNumberInput<FormState> name="tid" numType="decimal" />,
    },
    {
      label: t("SID", language),
      input: <FormikNumberInput<FormState> name="sid" numType="decimal" />,
    },
    {
      label: t("Initial advances", language),
      input: (
        <FormikNumberInput<FormState>
          name="initial_advances"
          numType="decimal"
        />
      ),
    },
    {
      label: t("Max advances", language),
      input: (
        <FormikNumberInput<FormState> name="max_advances" numType="decimal" />
      ),
    },
    {
      label: t("Delay", language),
      input: <FormikNumberInput<FormState> name="delay" numType="decimal" />,
    },
    {
      label: t("Min redraw", language),
      input: (
        <FormikNumberInput<FormState> name="min_redraw" numType="decimal" />
      ),
    },
    {
      label: t("Max redraw", language),
      input: (
        <FormikNumberInput<FormState> name="max_redraw" numType="decimal" />
      ),
    },
    {
      label: t("Filter shiny", language),
      input: <FormikSwitch<FormState, "filter_shiny"> name="filter_shiny" />,
    },
    {
      label: t("Filter nature", language),
      input: (
        <FormikSelect<FormState, "filter_nature">
          name="filter_nature"
          options={natureOptions.optional}
        />
      ),
    },
    {
      label: t("Filter gender", language),
      input: (
        <FormikSelect<FormState, "filter_gender">
          name="filter_gender"
          options={genderOptions}
        />
      ),
    },
  ];
};

type Props = {
  lua?: boolean;
};

export const EmeraldHeldEgg = ({ lua = false }: Props) => {
  const language = useActiveRouteLanguage();
  const fields = React.useMemo(() => getFields(language), [language]);
  const columns = React.useMemo(() => getColumns(language), [language]);
  const [results, setResults] = React.useState<Gen3HeldEgg[]>([]);

  const onSubmit = React.useCallback<RngToolSubmit<FormState>>(
    async (opts) => {
      const results = await rngTools.emerald_egg_held_states({
        ...opts,
        has_lightning_rod: false,
        has_roamer: false,
        registered_trainers: [],
        lua_adjustment: lua,
        filter_impossible_to_hit: false,
        filters: {
          shiny: opts.filter_shiny,
          nature: opts.filter_nature,
          gender: opts.filter_gender,
        },
      });

      setResults(results);
    },
    [lua],
  );

  return (
    <RngToolForm<FormState, Gen3HeldEgg>
      fields={fields}
      columns={columns}
      results={results}
      initialValues={initialValues}
      validationSchema={Validator}
      onSubmit={onSubmit}
      submitButtonLabel={t("Generate", language)}
      formContainerId="emerald_held_egg_form"
      submitTrackerId="generate_emerald_held_egg"
    />
  );
};
