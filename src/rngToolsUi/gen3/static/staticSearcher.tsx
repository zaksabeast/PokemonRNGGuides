import { rngTools, Static3SearcherResult } from "~/rngTools";
import {
  Field,
  FormikNumberInput,
  FormikSelect,
  FormikSwitch,
  ResultColumn,
  RngToolForm,
  RngToolSubmit,
} from "~/components";
import { getPkmFilterFields, pkmFilterSchema } from "~/components/pkmFilter";
import {
  getStatic3Species,
  Static3Game,
} from "~/rngToolsUi/gen3/static/constants";
import React from "react";
import { maxIvs, minIvs } from "~/types/ivs";
import {
  flattenIvs,
  FlattenIvs,
  ivColumns,
} from "~/rngToolsUi/shared/ivColumns";
import { z } from "zod";
import { species } from "~/types/species";

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
    species: z.enum(species),
    roamer: z.boolean(),
    method4: z.boolean(),
  })
  .merge(pkmFilterSchema);

type FormState = z.infer<typeof Validator>;

const getInitialValues = (game: Static3Game): FormState => {
  return {
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
    ...getPkmFilterFields(),
  ];
};

type Props = {
  game: Static3Game;
};

export const Static3Searcher = ({ game }: Props) => {
  const [results, setResults] = React.useState<Result[]>([]);

  const fields = React.useMemo(() => getFields(game), [game]);

  const onSubmit = React.useCallback<RngToolSubmit<FormState>>(
    async (opts) => {
      const results = await rngTools.gen3_static_searcher_states({
        ...opts,
        bugged_roamer: game !== "emerald" && opts.roamer,
        filter: {
          shiny: opts.filter_shiny,
          nature: opts.filter_nature,
          gender: opts.filter_gender,
          ability: opts.filter_ability,
          min_ivs: opts.filter_min_ivs,
          max_ivs: opts.filter_max_ivs,
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
      validationSchema={Validator}
      initialValues={getInitialValues(game)}
      onSubmit={onSubmit}
      submitTrackerId="search_gen3_static"
    />
  );
};
