import { rngTools, Wild3SearcherResult } from "~/rngTools";
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
import {gen3Maps} from "~/types/maps";
import {nature} from "~/types/nature";

type Result = FlattenIvs<Static3SearcherResult>;

const gen3EncounterTypes = ["Sweet Scent (Land)", "Sweet Scent (Water)"];
const gen3Methods = ["Wild-1", "Wild-2", "Wild-4","Wild-5"];

const Validator = z
  .object({
    species:z.enum(species),
    tid:z.number().int().min(0).max(0xFFFF),
    sid:z.number().int().min(0).max(0xFFFF),
    allMaps:z.boolean(),
    maps:z.array(z.enum(gen3Maps)),
    allLeads:z.boolean(),
    vanillaLead:z.boolean(),
    allSynchronizeLeads:z.boolean(),
    synchronizeLeadNatures:z.array(z.enum(nature)),
    methods:z.array(z.enum(gen3Methods)),
    encounterTypes:z.array(z.enum(gen3EncounterTypes)),
    initial_advances:z.number().int().min(0),
    max_advances:z.number().int().min(0),

  })
  .merge(pkmFilterSchema);

type FormState = z.infer<typeof Validator>;

const getInitialValues = (game: Static3Game): FormState => {
  return {
    species:getStatic3Species(game)[0],
    tid:0,
    sid:0,
    allMaps:true,
    maps:[],
    allLeads:true,
    vanillaLead,
    allSynchronizeLeads,
    synchronizeLeadNatures,
    methods,
    encounterTypes,
    initial_advances,
    max_advances,

    tid: 0,
    sid: 0,
    species: ,
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
      validationSchema={Validator}
      initialValues={getInitialValues(game)}
      onSubmit={onSubmit}
      submitTrackerId="search_gen3_static"
    />
  );
};
