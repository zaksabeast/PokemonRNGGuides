import { rngTools, Static3GeneratorResult } from "~/rngTools";
import {
  Field,
  FormikNumberInput,
  FormikSelect,
  FormikSwitch,
  ResultColumn,
  RngToolForm,
  RngToolSubmit,
} from "~/components";
import React from "react";
import { getPkmFilterFields, pkmFilterSchema } from "~/components/pkmFilter";
import {
  getStatic3Species,
  Static3Game,
} from "~/rngToolsUi/gen3/static/constants";
import { maxIvs, minIvs } from "~/types/ivs";
import {
  FlattenIvs,
  flattenIvs,
  ivColumns,
} from "~/rngToolsUi/shared/ivColumns";
import { z } from "zod";
import { HexSchema } from "~/utils/number";
import { species } from "~/types/species";

type Result = FlattenIvs<Static3GeneratorResult>;

const columns: ResultColumn<Result>[] = [
  { title: "Advance", dataIndex: "advance" },
  {
    title: "PID",
    dataIndex: "pid",
    monospace: true,
    render: (pid) => pid.toString(16).padStart(8, "0").toUpperCase(),
  },
  { title: "Nature", dataIndex: "nature" },
  { title: "Ability", dataIndex: "ability" },
  ...ivColumns,
  {
    title: "Shiny",
    dataIndex: "shiny",
    render: (shiny) => (shiny ? "Yes" : "No"),
  },
  { title: "Gender", dataIndex: "gender" },
];

const Validator = z
  .object({
    offset: z.number().int().min(0),
    seed: HexSchema(0xffff),
    initial_advances: z.number().int().min(0),
    max_advances: z.number().int().min(0),
    tid: z.number().int().min(0).max(65535),
    sid: z.number().int().min(0).max(65535),
    species: z.enum(species),
    roamer: z.boolean(),
    method4: z.boolean(),
  })
  .merge(pkmFilterSchema);

type FormState = z.infer<typeof Validator>;

const getInitialValues = (game: Static3Game): FormState => {
  return {
    offset: 0,
    seed: 0,
    initial_advances: 0,
    max_advances: 0,
    tid: 0,
    sid: 0,
    species: getStatic3Species(game)[0],
    roamer: false,
    method4: false,
    filter_shiny: false,
    filter_min_ivs: minIvs,
    filter_max_ivs: maxIvs,
    filter_nature: null,
    filter_gender: null,
    filter_ability: null,
    filter_max_size: false,
  };
};

const getFields = (game: Static3Game): Field[] => {
  const staticSpecies = getStatic3Species(game);
  return [
    {
      label: "Seed",
      input: <FormikNumberInput<FormState> name="seed" numType="hex" />,
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
      label: "Species",
      input: (
        <FormikSelect<FormState, "species">
          name="species"
          options={staticSpecies
            .sort((first, second) => first.localeCompare(second))
            .map((spec) => ({ label: spec, value: spec }))}
        />
      ),
    },
    {
      label: "Roamer",
      input: <FormikSwitch<FormState, "roamer"> name="roamer" />,
    },
    {
      label: "Method 4",
      input: <FormikSwitch<FormState, "method4"> name="method4" />,
    },
    {
      label: "Initial advances",
      input: (
        <FormikNumberInput<FormState>
          name="initial_advances"
          numType="decimal"
        />
      ),
    },
    {
      label: "Max advances",
      input: (
        <FormikNumberInput<FormState> name="max_advances" numType="decimal" />
      ),
    },
    {
      label: "Offset",
      input: <FormikNumberInput<FormState> name="offset" numType="decimal" />,
    },
    ...getPkmFilterFields(),
  ];
};

type Props = {
  game: Static3Game;
};

export const Static3Generator = ({ game = "emerald" }: Props) => {
  const [results, setResults] = React.useState<Result[]>([]);

  const fields = React.useMemo(() => getFields(game), [game]);

  const onSubmit = React.useCallback<RngToolSubmit<FormState>>(
    async (opts) => {
      const results = await rngTools.gen3_static_generator_states({
        ...opts,
        bugged_roamer: game !== "emerald" && opts.roamer,
        filter: {
          shiny: opts.filter_shiny,
          nature: opts.filter_nature,
          gender: opts.filter_gender,
          ability: opts.filter_ability,
          min_ivs: opts.filter_min_ivs,
          max_ivs: opts.filter_max_ivs,
          stats: null,
        },
      });

      setResults(results.map(flattenIvs));
    },
    [game],
  );

  return (
    <RngToolForm<FormState, Result>
      fields={fields}
      columns={columns}
      results={results}
      initialValues={getInitialValues(game)}
      validationSchema={Validator}
      onSubmit={onSubmit}
      submitTrackerId="generate_gen3_static"
    />
  );
};
