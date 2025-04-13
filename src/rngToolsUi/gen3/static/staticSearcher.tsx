import { rngTools, Species, Static3SearcherResult } from "~/rngTools";
import {
  Field,
  FormikInput,
  FormikSelect,
  FormikSwitch,
  ResultColumn,
  RngToolForm,
  RngToolSubmit,
} from "~/components";
import {
  DecimalString,
  fromDecimalString,
  toDecimalString,
} from "~/utils/number";
import { getPkmFilterFields, PkmFilterFields } from "~/components/pkmFilter";
import {
  getStatic3Species,
  Static3Game,
} from "~/rngToolsUi/gen3/static/constants";
import React from "react";
import { maxIvs, minIvs } from "~/types/ivs";

const columns: ResultColumn<Static3SearcherResult>[] = [
  {
    title: "Seed",
    dataIndex: "seed",
    key: "seed",
    monospace: true,
    render: (seed) => seed.toString(16).padStart(8, "0").toUpperCase(),
  },
  {
    title: "PID",
    dataIndex: "pid",
    key: "pid",
    monospace: true,
    render: (pid) => pid.toString(16).padStart(8, "0").toUpperCase(),
  },
  { title: "Nature", dataIndex: "nature", key: "nature" },
  { title: "Ability", dataIndex: "ability", key: "ability" },
  {
    title: "IVs",
    dataIndex: "ivs",
    key: "ivs",
    render: (ivs) =>
      ivs.hp.toString().padStart(2, "0") +
      "/" +
      ivs.atk.toString().padStart(2, "0") +
      "/" +
      ivs.def.toString().padStart(2, "0") +
      "/" +
      ivs.spa.toString().padStart(2, "0") +
      "/" +
      ivs.spd.toString().padStart(2, "0") +
      "/" +
      ivs.spe.toString().padStart(2, "0"),
  },
  {
    title: "Shiny",
    dataIndex: "shiny",
    key: "shiny",
    render: (shiny) => (shiny ? "Yes" : "No"),
  },
  { title: "Gender", dataIndex: "gender", key: "gender" },
];

type FormState = {
  tid: DecimalString;
  sid: DecimalString;
  species: Species;
  roamer: boolean;
  method4: boolean;
} & PkmFilterFields;

const getInitialValues = (game: Static3Game): FormState => {
  return {
    tid: toDecimalString(0),
    sid: toDecimalString(0),
    species: getStatic3Species(game)[0],
    roamer: false,
    method4: false,
    filter_shiny: false,
    filter_min_ivs: minIvs,
    filter_max_ivs: maxIvs,
    filter_nature: "None",
    filter_gender: "None",
    filter_ability: "None",
  };
};

const getFields = (game: Static3Game): Field[] => {
  const staticSpecies = getStatic3Species(game);
  return [
    {
      label: "TID",
      input: <FormikInput<FormState> name="tid" />,
    },
    {
      label: "SID",
      input: <FormikInput<FormState> name="sid" />,
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
  const [results, setResults] = React.useState<Static3SearcherResult[]>([]);

  const fields = React.useMemo(() => getFields(game), [game]);

  const onSubmit = React.useCallback<RngToolSubmit<FormState>>(
    async (opts) => {
      const tid = fromDecimalString(opts.tid);
      const sid = fromDecimalString(opts.sid);

      if (tid == null || sid == null) {
        return;
      }

      const results = await rngTools.gen3_static_searcher_states({
        ...opts,
        tid,
        sid,
        bugged_roamer: game !== "emerald" && opts.roamer,
        filter: {
          shiny: opts.filter_shiny,
          nature:
            opts.filter_nature === "None" ? undefined : opts.filter_nature,
          gender:
            opts.filter_gender === "None" ? undefined : opts.filter_gender,
          ability:
            opts.filter_ability === "None" ? undefined : opts.filter_ability,
          min_ivs: opts.filter_min_ivs,
          max_ivs: opts.filter_max_ivs,
        },
      });

      setResults(results);
    },
    [game],
  );

  return (
    <RngToolForm<FormState, Static3SearcherResult>
      fields={fields}
      columns={columns}
      results={results}
      initialValues={getInitialValues(game)}
      onSubmit={onSubmit}
      submitTrackerId="search_gen3_static"
    />
  );
};
