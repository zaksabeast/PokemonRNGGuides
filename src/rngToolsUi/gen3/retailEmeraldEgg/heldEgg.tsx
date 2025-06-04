import React from "react";
import {
  FormikNumberInput,
  ResultColumn,
  FormikSelect,
  Field,
  FormikSwitch,
  RngToolForm,
  RngToolSubmit,
  Button,
} from "~/components";
import { useCurrentStep } from "~/components/stepper/state";
import { rngTools, Gen3HeldEgg, PokeNavTrainer } from "~/rngTools";
import { gen3SpeciesOptions, species } from "~/types/species";
import { nature } from "~/types/nature";
import { gender } from "~/types/gender";
import { genderOptions, natureOptions } from "~/components/pkmFilter";
import { z } from "zod";
import { startCase } from "lodash-es";
import { useHeldEggState, useRegisteredTrainers } from "./state";
import { useHydrate } from "~/hooks/useHydrate";
import { Skeleton } from "antd";
import { toOptions } from "~/utils/options";
import { match } from "ts-pattern";
import { approximateGen3FrameTime } from "~/utils/approximateGen3FrameTime";

type Result = Gen3HeldEgg & { key: string; time: string };

type SelectButtonProps = {
  result: Result;
};

const SelectButton = ({ result }: SelectButtonProps) => {
  const [, setCurrentStep] = useCurrentStep();
  const [, setState] = useHeldEggState();

  const onClick = React.useCallback(() => {
    setState((prev) => ({
      ...prev,
      target: {
        ...result,
        redraws: result.redraws,
        calibration: result.calibration,
        advance: result.advance,
      },
    }));
    setCurrentStep((prev) => prev + 1);
  }, [result, setState, setCurrentStep]);

  return (
    <Button trackerId="select_retail_emerald_held_egg" onClick={onClick}>
      Select
    </Button>
  );
};

const columns: ResultColumn<Result>[] = [
  {
    title: "Select",
    dataIndex: "advance",
    render: (_, result) => <SelectButton result={result} />,
  },
  {
    title: "Time",
    dataIndex: "time",
  },
  {
    title: "Shiny",
    dataIndex: "shiny",
    render: (shiny) => (shiny ? "Yes" : "No"),
  },
  {
    title: "PokeDex",
    dataIndex: "redraws",
    render: (redraws) => `PokeDex x${redraws}`,
  },
  {
    title: "Match call",
    dataIndex: "match_call",
    render: (match_call) => startCase(match_call),
  },
  {
    title: "PID",
    dataIndex: "pid",
    monospace: true,
    render: (pid) => pid.toString(16).padStart(8, "0").toUpperCase(),
  },
  { title: "Gender", dataIndex: "gender" },
  { title: "Nature", dataIndex: "nature" },
  { title: "Ability", dataIndex: "ability" },
  {
    title: "Advance",
    dataIndex: "advance",
  },
];

const compatability = [
  "DontLikeEachOther",
  "GetAlong",
  "GetAlongVeryWell",
] as const;

const Validator = z.object({
  max_advances: z.number().int().min(0),
  has_roamer: z.boolean(),
  has_lightning_rod: z.boolean(),
  female_has_everstone: z.boolean(),
  female_nature: z.enum(nature),
  compatability: z.enum(compatability),
  tid: z.number().int().min(0).max(65535),
  sid: z.number().int().min(0).max(65535),
  egg_species: z.enum(species),
  filter_shiny: z.boolean(),
  filter_nature: z.enum(nature).nullable(),
  filter_gender: z.enum(gender).nullable(),
});

export type FormState = z.infer<typeof Validator>;

const initialValues: FormState = {
  max_advances: 10000,
  has_roamer: false,
  has_lightning_rod: true,
  female_has_everstone: false,
  female_nature: "Adamant",
  compatability: "GetAlong",
  tid: 0,
  sid: 0,
  egg_species: "Bulbasaur",
  filter_shiny: false,
  filter_nature: null,
  filter_gender: null,
};

const compatabilityOptions = toOptions(compatability, (option) => {
  return match(option)
    .with("GetAlong", () => "The two seem to get along")
    .with("GetAlongVeryWell", () => "The two seem to get along very well")
    .with("DontLikeEachOther", () => "The two don't seem to like each other")
    .exhaustive();
});

const fields: Field[] = [
  {
    label: "Has lightning rod",
    input: (
      <FormikSwitch<FormState, "has_lightning_rod"> name="has_lightning_rod" />
    ),
  },
  {
    label: "Roamer is active",
    input: <FormikSwitch<FormState, "has_roamer"> name="has_roamer" />,
  },
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
        options={natureOptions.required}
      />
    ),
  },
  {
    label: "Egg species",
    input: (
      <FormikSelect<FormState, "egg_species">
        name="egg_species"
        options={gen3SpeciesOptions.byName}
      />
    ),
  },
  {
    label: "Compatability",
    input: (
      <FormikSelect<FormState, "compatability">
        name="compatability"
        options={compatabilityOptions}
      />
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
    label: "Max advances",
    input: (
      <FormikNumberInput<FormState> name="max_advances" numType="decimal" />
    ),
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
        options={natureOptions.optional}
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

type InnerProps = {
  registeredTrainers: PokeNavTrainer[];
};

const InnerRetailEmeraldHeldEgg = ({ registeredTrainers }: InnerProps) => {
  const [, setState] = useHeldEggState();
  const [results, setResults] = React.useState<Result[]>([]);

  const onSubmit = React.useCallback<RngToolSubmit<FormState>>(
    async (opts) => {
      const results = await rngTools.emerald_egg_held_states({
        ...opts,
        delay: 0,
        registered_trainers: registeredTrainers,
        lua_adjustment: true,
        min_redraw: 0,
        max_redraw: 100,
        calibration: 19,
        initial_advances: 2000,
        filter_impossible_to_hit: true,
        filters: {
          shiny: opts.filter_shiny,
          nature: opts.filter_nature,
          gender: opts.filter_gender,
        },
      });

      setResults(
        results.map((result) => ({
          ...result,
          time: approximateGen3FrameTime(result.advance),
          key: `${result.advance}-${result.pid}`,
        })),
      );

      setState((prev) => ({ ...prev, eggSettings: opts }));
    },
    [registeredTrainers, setState],
  );

  return (
    <RngToolForm<FormState, Result>
      fields={fields}
      columns={columns}
      results={results}
      initialValues={initialValues}
      validationSchema={Validator}
      onSubmit={onSubmit}
      formContainerId="retail_emerald_held_egg_form"
      submitTrackerId="generate_retail_emerald_held_egg"
      rowKey="key"
    />
  );
};

export const RetailEmeraldHeldEgg = () => {
  const [lockedState] = useRegisteredTrainers();
  const { hydrated, client } = useHydrate(lockedState);

  if (!hydrated) {
    return <Skeleton />;
  }

  return (
    <InnerRetailEmeraldHeldEgg registeredTrainers={client.registeredTrainers} />
  );
};
