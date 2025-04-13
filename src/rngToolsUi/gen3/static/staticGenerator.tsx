import { rngTools, Static3GeneratorResult, Species } from "~/rngTools";
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
  fromHexString,
  HexString,
  toDecimalString,
  toHexString,
} from "~/utils/number";
import React from "react";
import { getPkmFilterFields, PkmFilterFields } from "~/components/pkmFilter";
import {
  getStatic3Species,
  Static3Game,
} from "~/rngToolsUi/gen3/static/constants";
import { maxIvs, minIvs } from "~/types/ivs";
import { FlattenIvs, flattenIvs, ivColumns } from "../../shared/ivColumns";

type Result = FlattenIvs<Static3GeneratorResult>;

const columns: ResultColumn<Result>[] = [
  { title: "Advance", dataIndex: "advance", key: "advance" },
  {
    title: "PID",
    dataIndex: "pid",
    key: "pid",
    monospace: true,
    render: (pid) => pid.toString(16).padStart(8, "0").toUpperCase(),
  },
  { title: "Nature", dataIndex: "nature", key: "nature" },
  { title: "Ability", dataIndex: "ability", key: "ability" },
  ...ivColumns,
  {
    title: "Shiny",
    dataIndex: "shiny",
    key: "shiny",
    render: (shiny) => (shiny ? "Yes" : "No"),
  },
  { title: "Gender", dataIndex: "gender", key: "gender" },
];

type FormState = {
  offset: DecimalString;
  seed: HexString;
  initial_advances: DecimalString;
  max_advances: DecimalString;
  tid: DecimalString;
  sid: DecimalString;
  species: Species;
  roamer: boolean;
  method4: boolean;
} & PkmFilterFields;

const getInitialValues = (game: Static3Game): FormState => {
  return {
    offset: toDecimalString(0),
    seed: toHexString(0),
    initial_advances: toDecimalString(100),
    max_advances: toDecimalString(1000),
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
      label: "Seed",
      input: <FormikInput<FormState> name="seed" />,
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
      input: <FormikInput<FormState> name="initial_advances" />,
    },
    {
      label: "Max advances",
      input: <FormikInput<FormState> name="max_advances" />,
    },
    {
      label: "Offset",
      input: <FormikInput<FormState> name="offset" />,
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
      const initialAdvances = fromDecimalString(opts.initial_advances);
      const maxAdvances = fromDecimalString(opts.max_advances);
      const seed = fromHexString(opts.seed);
      const offset = fromDecimalString(opts.offset);
      const tid = fromDecimalString(opts.tid);
      const sid = fromDecimalString(opts.sid);

      if (
        initialAdvances == null ||
        maxAdvances == null ||
        seed == null ||
        offset == null ||
        tid == null ||
        sid == null
      ) {
        return;
      }

      const results = await rngTools.gen3_static_generator_states({
        ...opts,
        initial_advances: initialAdvances,
        max_advances: maxAdvances,
        seed,
        offset,
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
      onSubmit={onSubmit}
      submitTrackerId="generate_gen3_static"
    />
  );
};
