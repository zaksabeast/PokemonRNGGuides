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
import {
  rngTools,
  Gen3HeldEgg,
  Nature,
  Compatability,
  Species,
  Gender,
} from "~/rngTools";
import { gen3Species } from "~/types/species";
import { nature } from "~/types/nature";
import { genderOptions, natureOptions } from "~/components/pkmFilter";

const columns: ResultColumn<Gen3HeldEgg>[] = [
  { title: "Advance", dataIndex: "advance" },
  { title: "Redraws", dataIndex: "redraws" },
  {
    title: "PID",
    dataIndex: "pid",
    monospace: true,
    render: (pid) => pid.toString(16).padStart(8, "0").toUpperCase(),
  },
  { title: "Gender", dataIndex: "gender" },
  {
    title: "Shiny",
    dataIndex: "shiny",
    render: (shiny) => (shiny ? "Yes" : "No"),
  },
  { title: "Nature", dataIndex: "nature" },
  { title: "Ability", dataIndex: "ability" },
];

export type FormState = {
  delay: number;
  initial_advances: number;
  max_advances: number;
  female_has_everstone: boolean;
  female_nature: Nature;
  calibration: number;
  min_redraw: number;
  max_redraw: number;
  compatability: Compatability;
  tid: number;
  sid: number;
  egg_species: Species;
  filter_shiny: boolean;
  filter_nature: Nature | undefined;
  filter_gender: Gender | undefined;
};

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
  filter_nature: undefined,
  filter_gender: undefined,
};

const fields: Field[] = [
  {
    label: "Female has everstone",
    input: (
      <FormikSwitch<
        FormState,
        "female_has_everstone"
      > name="female_has_everstone" />
    ),
  },
  {
    label: "Female nature",
    input: (
      <FormikSelect<FormState, "female_nature">
        name="female_nature"
        options={natures.map((nat) => ({ label: nat, value: nat }))}
      />
    ),
  },
  {
    label: "Egg species",
    input: (
      <FormikSelect<FormState, "egg_species">
        name="egg_species"
        options={gen3Species
          .sort((first, second) => first.localeCompare(second))
          .map((spec) => ({ label: spec, value: spec }))}
      />
    ),
  },

  {
    label: "Compatability",
    input: (
      <FormikSelect<FormState, "compatability">
        name="compatability"
        options={[
          {
            label: "The two seem to get along",
            value: "GetAlong",
          },
          {
            label: "The two seem to get along very well",
            value: "GetAlongVeryWell",
          },
          {
            label: "The two don't seem to like each other",
            value: "DontLikeEachOther",
          },
        ]}
      />
    ),
  },
  {
    label: "Calibration",
    input: (
      <FormikNumberInput<FormState> name="calibration" numType="decimal" />
    ),
  },
  {
    label: "TID",
    input: <FormikNumberInput<FormState> name="tid" numType="decimal" />,
  },
  {
    label: "SID",
    input: <FormikNumberInput<FormState> name="sid" numType="decimal" />,
  },
  {
    label: "Initial advances",
    input: (
      <FormikNumberInput<FormState> name="initial_advances" numType="decimal" />
    ),
  },
  {
    label: "Max advances",
    input: (
      <FormikNumberInput<FormState> name="max_advances" numType="decimal" />
    ),
  },
  {
    label: "Delay",
    input: <FormikNumberInput<FormState> name="delay" numType="decimal" />,
  },
  {
    label: "Min redraw",
    input: <FormikNumberInput<FormState> name="min_redraw" numType="decimal" />,
  },
  {
    label: "Max redraw",
    input: <FormikNumberInput<FormState> name="max_redraw" numType="decimal" />,
  },
  {
    label: "Filter shiny",
    input: <FormikSwitch<FormState, "filter_shiny"> name="filter_shiny" />,
  },
  {
    label: "Filter nature",
    input: (
      <FormikSelect<FormState, "filter_nature">
        name="filter_nature"
        options={natureOptions}
      />
    ),
  },
  {
    label: "Filter gender",
    input: (
      <FormikSelect<FormState, "filter_gender">
        name="filter_gender"
        options={genderOptions}
      />
    ),
  },
];

type Props = {
  lua?: boolean;
};

export const EmeraldHeldEgg = ({ lua = false }: Props) => {
  const [results, setResults] = React.useState<Gen3HeldEgg[]>([]);

  const onSubmit = React.useCallback<RngToolSubmit<FormState>>(
    async (opts) => {
      const results = await rngTools.emerald_egg_held_states({
        ...opts,
        lua_adjustment: lua,
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
      onSubmit={onSubmit}
      formContainerId="emerald_held_egg_form"
      submitTrackerId="generate_emerald_held_egg"
    />
  );
};
