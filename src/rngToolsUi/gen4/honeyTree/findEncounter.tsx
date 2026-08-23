import React from "react";
import { z } from "zod";
import {
  Button,
  Field,
  FormikNumberInput,
  FormikSelect,
  MinMaxContainer,
  NumberInput,
  ResultColumn,
  RngToolForm,
} from "~/components";
import { toOptions } from "~/utils/options";
import { gen4StateAtom } from "../shared/state";
import { honeyTreeAtom } from "./state";
import { useAtom } from "jotai";
import { type Species, rngTools } from "~/rngTools";
import { uniqueId, sortBy } from "lodash-es";
import { useCurrentStep } from "~/components/stepper/state";
import { Translations } from "~/translations";
import {
  ALL_SPECIES,
  getSpecies,
  type HoneyTreeSpecies,
} from "../encounters/honey";

type Result = {
  id: string;
  advance: number;
  species: Species;
};

const Validator = z.object({
  species: z.enum(["Any", ...ALL_SPECIES]),
  minAdvances: z.number().int().min(0),
  maxAdvances: z.number().int().min(0),
});

type FormState = z.infer<typeof Validator>;

const initialValues: FormState = {
  species: "Any",
  minAdvances: 0,
  maxAdvances: 300,
};

type SelectButtonProps = {
  disabled: boolean;
  advance: number;
};

const SelectButton = ({ disabled, advance }: SelectButtonProps) => {
  const [, setState] = useAtom(gen4StateAtom);
  const [, setStep] = useCurrentStep();

  return (
    <Button
      trackerId="honey_tree_select_advance"
      disabled={disabled}
      onClick={() => {
        setState({ target: { lcrngAdvance: advance } });
        setStep((step) => step + 1);
      }}
    >
      Select
    </Button>
  );
};

const getColumns = (t: Translations): ResultColumn<Result>[] => [
  {
    title: t["Select"],
    dataIndex: "id",
    render: (_, record) => (
      <SelectButton
        disabled={record.species === "None"}
        advance={record.advance}
      />
    ),
  },
  {
    title: t["Advance"],
    dataIndex: "advance",
  },
  {
    title: t["Species"],
    dataIndex: "species",
  },
];

type SpeciesSelectProps = {
  isMunchlaxTree: boolean;
};

const SpeciesSelect = ({ isMunchlaxTree }: SpeciesSelectProps) => {
  const [state] = useAtom(honeyTreeAtom);

  const species = sortBy(getSpecies(state.game, isMunchlaxTree));
  const optionLabels = ["Any", ...species] as const;
  const formatSpecies = (spec: HoneyTreeSpecies | "Any") =>
    spec === "Burmy_Plant" ? "Burmy" : spec;

  return (
    <FormikSelect<FormState, "species">
      name="species"
      options={toOptions(optionLabels, formatSpecies)}
    />
  );
};

export const HoneyTreeFindEncounter = () => {
  const [{ target }] = useAtom(gen4StateAtom);
  const [state] = useAtom(honeyTreeAtom);
  const [results, setResults] = React.useState<Result[]>([]);
  const initialSeed = target?.seedTime?.seed;

  React.useEffect(() => {
    setResults([]);
  }, [initialSeed]);

  const isMunchlaxTree =
    state.munchlaxLocations?.includes(state.targetLocation) ?? false;

  const getFields = (t: Translations): Field[] => [
    {
      label: t["Seed"],
      input: (
        <NumberInput
          disabled
          name="seed"
          numType="hex"
          errorMessage={
            initialSeed == null ? "Find your seed first" : undefined
          }
          value={initialSeed}
        />
      ),
    },
    {
      label: t["Species"],
      input: <SpeciesSelect isMunchlaxTree={isMunchlaxTree} />,
    },
    {
      label: t["Advances"],
      input: (
        <MinMaxContainer
          min={
            <FormikNumberInput<FormState>
              name="minAdvances"
              numType="decimal"
            />
          }
          max={
            <FormikNumberInput<FormState>
              name="maxAdvances"
              numType="decimal"
            />
          }
        />
      ),
    },
  ];

  const onSubmit = async (opts: FormState) => {
    if (initialSeed == null) {
      return;
    }

    const results = await rngTools.generate_honey_tree_encounters({
      seed: initialSeed,
      game: state.game,
      is_munchlax_tree: isMunchlaxTree,
      min_advance: opts.minAdvances,
      max_advance: opts.maxAdvances,
    });
    const filteredResults = results.filter((result) => {
      if (opts.species === "Any") {
        return true;
      }

      return result.species === opts.species;
    });
    const mappedResults = filteredResults.map(
      (res): Result => ({
        id: uniqueId(),
        advance: res.advance,
        species: res.species,
      }),
    );
    setResults(mappedResults);
  };

  return (
    <RngToolForm<FormState, Result>
      initialValues={initialValues}
      disableGenerate={initialSeed == null}
      submitTrackerId="honey_tree_find_encounter"
      validationSchema={Validator}
      getFields={getFields}
      getColumns={getColumns}
      onSubmit={onSubmit}
      results={results}
    />
  );
};
