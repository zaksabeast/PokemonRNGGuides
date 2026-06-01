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
import { useAtom } from "jotai";
import { gen4StateAtom } from "../shared/state";
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

const getInitialValues = (minAdvance: number): FormState => ({
  minAdvances: minAdvance,
  maxAdvances: Math.max(50, minAdvance + 50),
});

type SelectButtonProps = {
  advance: number;
};

const SelectButton = ({ advance }: SelectButtonProps) => {
  const [, setGen4State] = useAtom(gen4StateAtom);
  const [, setStep] = useCurrentStep();

  return (
    <Button
      trackerId="swarm_select_advance"
      onClick={() => {
        setGen4State({
          target: {
            mtAdvance: advance,
          },
        });

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
  const [swarmState] = useSwarmState();
  const [state] = useAtom(gen4StateAtom);

  const defaultMinAdvance =
  state.config.game === "Diamond" ||
  state.config.game === "Pearl" ||
  state.config.game === "Platinum"
    ? state.target.coinFlipCount
    : 0;
  
  const [results, setResults] = React.useState<Result[]>([]);

  React.useEffect(() => {
    setResults([]);
  }, [state.target.seedTime]);

  const mons = gameMons[state.config.game];
  const targetSpecies = (mons as Partial<Record<SwarmRoute, string>>)[
    swarmState.targetRoute
  ];

  const seed = state.target.seedTime?.seed;

  const getFields = (t: Translations): Field[] => [
    {
      label: t["Seed"],
      input: (
        <NumberInput
          disabled
          name="seed"
          numType="hex"
          errorMessage={seed == null ? "Find your seed first" : undefined}
          value={seed}
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
    if (seed == null || targetSpecies == null) {
      return;
    }

    const swarmGame = gameVersionToSwarmGame(state.config.game);

    const results = await rngTools.find_swarm_advances({
      seed,
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
      key={state.target.coinFlipCount}
      initialValues={getInitialValues(defaultMinAdvance)}
      disableGenerate={seed == null}
      submitTrackerId="swarm_find_encounter"
      validationSchema={Validator}
      getFields={getFields}
      getColumns={getColumns}
      onSubmit={onSubmit}
      results={results}
    />
  );
};
