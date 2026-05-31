import { Gen3StaticMethod, rngTools, Static3SearcherResult } from "~/rngTools";
import {
  Field,
  FormikNumberInput,
  FormikSelect,
  FormikSwitch,
  ResultColumn,
  RngToolForm,
  RngToolSubmit,
} from "~/components";
import {
  getPkmFilterFields,
  pkmFilterSchema,
  getPkmFilterInitialValues,
  pkmFilterFieldsToRustInput,
} from "~/components/pkmFilter";
import {
  gen3PkmFilterFieldsToRustInput,
  gen3PkmFilterSchema,
  getGen3PkmFilterFields,
  getGen3PkmFilterInitialValues,
} from "~/components/gen3PkmFilter";
import {
  getStatic3Species,
  Static3Game,
} from "~/rngToolsUi/gen3/static/constants";
import React from "react";
import {
  flattenIvs,
  FlattenIvs,
  ivColumns,
} from "~/rngToolsUi/shared/ivColumns";
import { z } from "zod";
import { species } from "~/types/species";
import { HexSchema } from "~/utils/number";

type Result = FlattenIvs<Static3SearcherResult>;

const columns: ResultColumn<Result>[] = [
  {
    title: "Seed",
    dataIndex: "seed",
    monospace: true,
    render: (seed) => seed.toString(16).padStart(8, "0").toUpperCase(),
  },
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
    tid: z.number().int().min(0).max(65535),
    sid: z.number().int().min(0).max(65535),
    initial_seed: HexSchema(0xffffffff),
    initial_advances: z.number().int().min(0).max(0xffffffff),
    max_advances: z.number().int().min(0).max(0xffffffff),
    max_result_count: z.number().int().min(1),
    species: z.enum(species),
    roamer: z.boolean(),
    method4: z.boolean(),
  })
  .extend(pkmFilterSchema.shape)
  .extend(gen3PkmFilterSchema.shape);

type FormState = z.infer<typeof Validator>;

const getInitialValues = (game: Static3Game): FormState => {
  return {
    tid: 0,
    sid: 0,
    initial_seed: 0,
    initial_advances: 0,
    max_advances: 100_000,
    max_result_count: 100,
    species: getStatic3Species(game)[0],
    roamer: false,
    method4: false,
    ...getPkmFilterInitialValues(),
    ...getGen3PkmFilterInitialValues(),
  };
};

const getFields = (game: Static3Game): Field[] => {
  const staticSpecies = getStatic3Species(game);
  return [
    {
      label: "TID",
      input: <FormikNumberInput<FormState> name="tid" numType="decimal" />,
    },
    {
      label: "SID",
      input: <FormikNumberInput<FormState> name="sid" numType="decimal" />,
    },
    {
      label: "Initial seed",
      input: <FormikNumberInput<FormState> name="initial_seed" numType="hex" />,
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
      input: <FormikSwitch<FormState> name="roamer" />,
    },
    {
      label: "Method 4",
      input: <FormikSwitch<FormState> name="method4" />,
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
      label: "Max results",
      input: (
        <FormikNumberInput<FormState>
          name="max_result_count"
          numType="decimal"
        />
      ),
    },
    ...getPkmFilterFields(),
    ...getGen3PkmFilterFields(),
  ];
};

type Props = {
  game: Static3Game;
};

export const Static3Searcher = ({ game }: Props) => {
  const [results, setResults] = React.useState<Result[]>([]);

  const fields = getFields(game);

  const onSubmit: RngToolSubmit<FormState> = async (opts) => {
    const method: Gen3StaticMethod = opts.method4 ? "Static4" : "Static1";
    const searchOpts = {
      initial_seed: opts.initial_seed,
      tid: opts.tid,
      sid: opts.sid,
      initial_advances: opts.initial_advances,
      max_advances: opts.max_advances,
      max_result_count: opts.max_result_count,
      bugged_roamer: game !== "emerald" && opts.roamer,
      filter: pkmFilterFieldsToRustInput(opts),
      gen3_filter: gen3PkmFilterFieldsToRustInput(opts, opts.species),
      painting_opts: undefined,
      species: opts.species,
      methods: [method],
    };

    const results = await rngTools.search_static3(searchOpts);

    setResults(results.map(flattenIvs));
  };

  return (
    <RngToolForm<FormState, Result>
      fields={fields}
      columns={columns}
      results={results}
      validationSchema={Validator}
      initialValues={getInitialValues(game)}
      onSubmit={onSubmit}
      submitTrackerId="search_gen3_static"
    />
  );
};
