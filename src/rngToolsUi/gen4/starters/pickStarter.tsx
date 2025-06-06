import React from "react";
import {
  Button,
  Field,
  FormikNumberInput,
  FormikSelect,
  ResultColumn,
  RngToolForm,
} from "~/components";
import { rngTools, SearchStatic4Method1State } from "~/rngTools";
import { z } from "zod";
import {
  getPkmFilterFields,
  getPkmFilterInitialValues,
  pkmFilterSchema,
} from "~/components/pkmFilter";
import {
  flattenIvs,
  FlattenIvs,
  ivColumns,
} from "~/rngToolsUi/shared/ivColumns";
import { toOptions } from "~/utils/options";
import { useCurrentStep } from "~/components/stepper/state";
import { match } from "ts-pattern";
import { useStarterState } from "./state";

type Result = FlattenIvs<SearchStatic4Method1State & { key: string }>;

type SelectButtonProps = {
  target: Result;
};

const SelectButton = ({ target }: SelectButtonProps) => {
  const [, setCurrentStep] = useCurrentStep();
  const [, setState] = useStarterState();
  return (
    <Button
      trackerId="select_gen4_starter"
      onClick={() => {
        setState({ target });
        setCurrentStep((prev) => prev + 1);
      }}
    >
      Select
    </Button>
  );
};

const dpptStarters = ["Turtwig", "Chimchar", "Piplup"] as const;
const hgssStarters = ["Chikorita", "Cyndaquil", "Totodile"] as const;
const allStarters = [...dpptStarters, ...hgssStarters] as const;
type Gen4Starter = (typeof allStarters)[number];

const Validator = z
  .object({
    tid: z.number().int().min(0).max(65535),
    sid: z.number().int().min(0).max(65535),
    year: z.number().int().min(2000).max(2100),
    species: z.enum(allStarters),
    min_delay: z.number().int().min(0),
    max_delay: z.number().int().min(0),
  })
  .merge(pkmFilterSchema);

type FormState = z.infer<typeof Validator>;

const initialValues: FormState = {
  tid: 0,
  sid: 0,
  year: 2000,
  species: "Turtwig",
  min_delay: 600,
  max_delay: 1000,
  ...getPkmFilterInitialValues(),
};

const getStarterAdvance = (species: Gen4Starter): number => {
  return match(species)
    .with("Turtwig", () => 0)
    .with("Chimchar", () => 4)
    .with("Piplup", () => 8)
    .with("Chikorita", () => 0)
    .with("Cyndaquil", () => 4)
    .with("Totodile", () => 8)
    .exhaustive();
};

const columns: ResultColumn<Result>[] = [
  {
    title: "Select",
    dataIndex: "key",
    render: (_, target) => <SelectButton target={target} />,
  },
  {
    title: "Shiny",
    dataIndex: "shiny",
    render: (shiny: boolean) => (shiny ? "Yes" : "No"),
  },
  { title: "Nature", dataIndex: "nature" },
  { title: "Ability", dataIndex: "ability" },
  { title: "Gender", dataIndex: "gender" },
  {
    title: "PID",
    dataIndex: "pid",
    monospace: true,
    render: (pid) => pid.toString(16).padStart(8, "0").toUpperCase(),
  },
  ...ivColumns,
];

const fields: Field[] = [
  {
    label: "TID",
    input: <FormikNumberInput<FormState> name="tid" numType="decimal" />,
  },
  {
    label: "SID",
    input: <FormikNumberInput<FormState> name="sid" numType="decimal" />,
  },
  {
    label: "Year",
    input: <FormikNumberInput<FormState> name="year" numType="decimal" />,
  },
  {
    label: "Min Delay",
    input: <FormikNumberInput<FormState> name="min_delay" numType="decimal" />,
  },
  {
    label: "Max Delay",
    input: <FormikNumberInput<FormState> name="max_delay" numType="decimal" />,
  },
  {
    label: "Species",
    input: (
      <FormikSelect<FormState, "species">
        name="species"
        options={toOptions(allStarters)}
      />
    ),
  },
  ...getPkmFilterFields(),
];

export const PickStarter4 = () => {
  const [results, setResults] = React.useState<Result[]>([]);

  const onSubmit = React.useCallback(async (opts: FormState) => {
    const advance = getStarterAdvance(opts.species);
    const results = await rngTools.search_static4_method1_seeds({
      ...opts,
      min_advance: advance,
      max_advance: advance,
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
    const formattedResults = results.map((res) => ({
      ...flattenIvs(res),
      key: `${res.seed}-${res.pid}`,
    }));
    setResults(formattedResults);
  }, []);

  return (
    <RngToolForm<FormState, Result>
      fields={fields}
      columns={columns}
      results={results}
      initialValues={initialValues}
      validationSchema={Validator}
      onSubmit={onSubmit}
      rowKey="key"
      submitTrackerId="search_gen4_starters"
    />
  );
};
