import React from "react";
import {
  FormikInput,
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
import {
  DecimalString,
  fromDecimalString,
  toDecimalString,
} from "~/utils/number";
import { gen3Species } from "~/types/species";
import { nature } from "~/types/nature";
import { gender } from "~/types/gender";

const columns: ResultColumn<Gen3HeldEgg>[] = [
  { title: "Advance", dataIndex: "advance", key: "advance" },
  { title: "Redraws", dataIndex: "redraws", key: "redraws" },
  {
    title: "PID",
    dataIndex: "pid",
    key: "pid",
    monospace: true,
    render: (pid) => pid.toString(16).padStart(8, "0").toUpperCase(),
  },
  { title: "Gender", dataIndex: "gender", key: "gender" },
  {
    title: "Shiny",
    dataIndex: "shiny",
    key: "shiny",
    render: (shiny) => (shiny ? "Yes" : "No"),
  },
  { title: "Nature", dataIndex: "nature", key: "nature" },
  { title: "Ability", dataIndex: "ability", key: "ability" },
];

type FormState = {
  delay: DecimalString;
  initial_advances: DecimalString;
  max_advances: DecimalString;
  female_has_everstone: boolean;
  female_nature: Nature;
  calibration: DecimalString;
  min_redraw: DecimalString;
  max_redraw: DecimalString;
  compatability: Compatability;
  tid: DecimalString;
  sid: DecimalString;
  egg_species: Species;
  filter_shiny: boolean;
  filter_nature: Nature | "None";
  filter_gender: Gender | "None";
};

const initialValues: FormState = {
  delay: toDecimalString(0),
  initial_advances: toDecimalString(100),
  max_advances: toDecimalString(1000),
  female_has_everstone: false,
  female_nature: "Adamant",
  calibration: toDecimalString(18),
  min_redraw: toDecimalString(0),
  max_redraw: toDecimalString(5),
  compatability: "GetAlong",
  tid: toDecimalString(0),
  sid: toDecimalString(0),
  egg_species: "Bulbasaur",
  filter_shiny: false,
  filter_nature: "None",
  filter_gender: "None",
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
        options={nature.map((nat) => ({ label: nat, value: nat }))}
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
    input: <FormikInput<FormState> name="calibration" />,
  },
  {
    label: "TID",
    input: <FormikInput<FormState> name="tid" />,
  },
  {
    label: "SID",
    input: <FormikInput<FormState> name="sid" />,
  },
  {
    label: "Initial advances",
    input: <FormikInput<FormState> name="initial_advances" />,
  },
  {
    label: "Max advances",
    input: <FormikInput<FormState> name="max_advances" />,
  },
  {
    label: "Delay",
    input: <FormikInput<FormState> name="delay" />,
  },
  {
    label: "Min redraw",
    input: <FormikInput<FormState> name="min_redraw" />,
  },
  {
    label: "Max redraw",
    input: <FormikInput<FormState> name="max_redraw" />,
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
        options={(["None", ...nature] as const).map((nat) => ({
          label: nat,
          value: nat,
        }))}
      />
    ),
  },
  {
    label: "Filter gender",
    input: (
      <FormikSelect<FormState, "filter_gender">
        name="filter_gender"
        options={(["None", ...gender] as const).map((gen) => ({
          label: gen,
          value: gen,
        }))}
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
      const initialAdvances = fromDecimalString(opts.initial_advances);
      const maxAdvances = fromDecimalString(opts.max_advances);
      const calibration = fromDecimalString(opts.calibration);
      const minRedraw = fromDecimalString(opts.min_redraw);
      const maxRedraw = fromDecimalString(opts.max_redraw);
      const tid = fromDecimalString(opts.tid);
      const sid = fromDecimalString(opts.sid);
      const delay = fromDecimalString(opts.delay);

      if (
        initialAdvances == null ||
        maxAdvances == null ||
        calibration == null ||
        minRedraw == null ||
        maxRedraw == null ||
        tid == null ||
        sid == null ||
        delay == null
      ) {
        return;
      }

      const results = await rngTools.emerald_egg_held_states({
        ...opts,
        initial_advances: initialAdvances,
        max_advances: maxAdvances,
        calibration: calibration,
        min_redraw: minRedraw,
        max_redraw: maxRedraw,
        tid,
        sid,
        delay,
        lua_adjustment: lua,
        filters: {
          shiny: opts.filter_shiny,
          nature:
            opts.filter_nature === "None" ? undefined : opts.filter_nature,
          gender:
            opts.filter_gender === "None" ? undefined : opts.filter_gender,
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
      submitTrackerId="generate_emerald_held_egg"
    />
  );
};
