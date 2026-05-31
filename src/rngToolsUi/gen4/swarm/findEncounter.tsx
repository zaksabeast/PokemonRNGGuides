import React from "react";
import { z } from "zod";
import {
  Button,
  Field,
  FormikNumberInput,
  MinMaxContainer,
  NumberInput,
  ResultColumn,
  RngToolForm,
} from "~/components";
import { useSwarmState } from "./state";
import { gameMons, type SwarmRoute } from "./constants";
import { rngTools, type SwarmPokemon, type SwarmGame } from "~/rngTools";
import { uniqueId } from "lodash-es";
import { useCurrentStep } from "~/components/stepper/state";
import { Translations } from "~/translations";

const gameVersionToSwarmGame = (game: string): SwarmGame => {
  if (game === "Diamond" || game === "Pearl") {
    return "DP";
  }
  if (game === "Platinum") {
    return "PT";
  }
  if (game === "HeartGold") {
    return "HG";
  }
  return "SS";
};

type Result = {
  id: string;
  advance: number;
  pokemon: string;
};

const Validator = z.object({
  minAdvances: z.number().int().min(0),
  maxAdvances: z.number().int().min(0),
});

type FormState = z.infer<typeof Validator>;

const initialValues: FormState = {
  minAdvances: 0,
  maxAdvances: 50,
};

type SelectButtonProps = {
  advance: number;
};

const SelectButton = ({ advance }: SelectButtonProps) => {
  const [, setState] = useSwarmState();
  const [, setStep] = useCurrentStep();

  return (
    <Button
      trackerId="swarm_select_advance"
      onClick={() => {
        setState((prev) => ({ ...prev, targetAdvance: advance }));
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
    render: (_, record) => <SelectButton advance={record.advance} />,
  },
  {
    title: t["Advance"],
    dataIndex: "advance",
  },
  {
    title: t["Species"],
    dataIndex: "pokemon",
  },
];

export const SwarmFindEncounter = () => {
  const [state] = useSwarmState();
  const [results, setResults] = React.useState<Result[]>([]);

  React.useEffect(() => {
    setResults([]);
  }, [state.seed]);

  const mons = gameMons[state.game];
  const targetSpecies = (mons as Partial<Record<SwarmRoute, string>>)[
    state.targetRoute
  ];

  const getFields = (t: Translations): Field[] => [
    {
      label: t["Seed"],
      input: (
        <NumberInput
          disabled
          name="seed"
          numType="hex"
          errorMessage={state.seed == null ? "Find your seed first" : undefined}
          value={state.seed}
        />
      ),
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
    if (state.seed == null || targetSpecies == null) {
      return;
    }

    const swarmGame = gameVersionToSwarmGame(state.game);

    const results = await rngTools.find_swarm_advances({
      seed: state.seed,
      game: swarmGame,
      wanted_pokemon: targetSpecies as SwarmPokemon,
      min_advances: opts.minAdvances,
      max_advances: opts.maxAdvances,
    });

    const mappedResults = results.map(
      (res): Result => ({
        id: uniqueId(),
        advance: res.advance,
        pokemon: res.pokemon,
      }),
    );

    setResults(mappedResults);
  };

  return (
    <RngToolForm<FormState, Result>
      initialValues={initialValues}
      disableGenerate={state.seed == null}
      submitTrackerId="swarm_find_encounter"
      validationSchema={Validator}
      getFields={getFields}
      getColumns={getColumns}
      onSubmit={onSubmit}
      results={results}
    />
  );
};
