import React from "react";
import { z } from "zod";
import { Button, ResultColumn } from "~/components";
import {
  FieldRow,
  FormNumberField,
  FormSection,
  NumberField,
  ToolForm,
} from "~/components/form";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import { useSwarmState } from "./state";
import { useAtomValue, useSetAtom } from "jotai";
import { gen4SetupAtom } from "../shared/state/setup";
import { gen4TargetAtom, selectGen4AdvanceAtom } from "../shared/state/target";
import { gameMons, type SwarmRoute } from "./constants";
import { rngTools, type SwarmPokemon, type SwarmGame } from "~/rngTools";
import { uniqueId } from "lodash-es";
import { useCurrentStep } from "~/components/stepper/state";
import { Translations } from "~/translations";
import { type Gen4GameVersion } from "~/types/games";

const SwarmGameByVersion: Record<Gen4GameVersion, SwarmGame> = {
  Diamond: "DP",
  Pearl: "DP",
  Platinum: "PT",
  HeartGold: "HG",
  SoulSilver: "SS",
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
  const selectAdvance = useSetAtom(selectGen4AdvanceAtom);
  const [, setStep] = useCurrentStep();

  return (
    <Button
      trackerId="swarm_select_advance"
      onClick={() => {
        selectAdvance({ mtAdvance: advance });

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
  const t = useActiveRouteTranslations();
  const target = useAtomValue(gen4TargetAtom);
  const setup = useAtomValue(gen4SetupAtom);
  const [targetRoutes] = useSwarmState();
  const targetRoute = targetRoutes[setup.game];

  const defaultMinAdvance =
    setup.group === "dppt" ? (target?.coinFlipCount ?? 0) : 0;

  const [results, setResults] = React.useState<Result[]>([]);

  React.useEffect(() => {
    setResults([]);
  }, [target?.seedTime]);

  const mons = gameMons[setup.game];
  const targetSpecies = (mons as Partial<Record<SwarmRoute, string>>)[
    targetRoute
  ];

  const seed = target?.seedTime.seed;

  const onSubmit = async (opts: FormState) => {
    if (seed == null || targetSpecies == null) {
      return;
    }

    const results = await rngTools.find_swarm_advances({
      seed,
      game: SwarmGameByVersion[setup.game],
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
    <ToolForm<FormState, Result>
      key={defaultMinAdvance}
      initialValues={getInitialValues(defaultMinAdvance)}
      disableGenerate={seed == null}
      submitTrackerId="swarm_find_encounter"
      validationSchema={Validator}
      getColumns={getColumns}
      onSubmit={onSubmit}
      results={results}
    >
      <FormSection>
        <NumberField
          name="seed"
          label={t["Seed"]}
          numType="hex"
          disabled
          value={seed ?? null}
          errorMessage={seed == null ? "Find your seed first" : undefined}
        />
        <FieldRow>
          <FormNumberField<FormState>
            name="minAdvances"
            label={t["Min Advance"]}
            numType="decimal"
          />
          <FormNumberField<FormState>
            name="maxAdvances"
            label={t["Max Advance"]}
            numType="decimal"
          />
        </FieldRow>
      </FormSection>
    </ToolForm>
  );
};
