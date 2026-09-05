import React from "react";
import { z } from "zod";
import {
  Button,
  Field,
  Flex,
  FormikNumberInput,
  MinMaxContainer,
  NumberInput,
  ResultColumn,
  RngToolForm,
} from "~/components";
import { rngTools, LeadAbility } from "~/rngTools";
import { formatSpeciesLabel, species } from "~/types/species";
import {
  getPkmFilterInitialValues,
  pkmFilterFieldsToRustInput,
} from "~/components/pkmFilter";
import { Translations } from "~/translations";
import { useCurrentStep } from "~/components/stepper/state";

type SpeciesName = (typeof species)[number];

type PokeRadar4ChainStarterProps = {
  seed?: number;
  tid?: number;
  sid?: number;
  lead?: LeadAbility;
  species?: SpeciesName;
  encounterSlot?: number;
  level?: number;
  initialMinAdvance?: number;
  initialMaxAdvance?: number;
};

type Result = {
  id: string;
  advance: number;
  species: SpeciesName;
  encounterSlot: number;
};

const Validator = z.object({
  minAdvances: z.number().int().min(0),
  maxAdvances: z.number().int().min(0),
});

type FormState = z.infer<typeof Validator>;

const getInitialValues = (
  minAdvance: number,
  maxAdvance: number,
): FormState => ({
  minAdvances: minAdvance,
  maxAdvances: Math.max(minAdvance, maxAdvance),
});

const allowAllFilter = pkmFilterFieldsToRustInput(getPkmFilterInitialValues());

const getColumns = (t: Translations): ResultColumn<Result>[] => [
  {
    title: t["Advance"],
    dataIndex: "advance",
  },
  {
    title: t["Species"],
    dataIndex: "species",
    render: (_, record) => formatSpeciesLabel(record.species),
  },
];

export const PokeRadar4ChainStarter: React.FC<PokeRadar4ChainStarterProps> = ({
  seed,
  tid,
  sid,
  lead,
  species: targetSpecies,
  encounterSlot,
  level,
  initialMinAdvance = 0,
  initialMaxAdvance = 0,
}) => {
  const [results, setResults] = React.useState<Result[]>([]);
  const [, setStep] = useCurrentStep();

  React.useEffect(() => {
    setResults([]);
  }, [seed, targetSpecies, encounterSlot]);

  const canGenerate =
    seed != null &&
    tid != null &&
    sid != null &&
    lead != null &&
    targetSpecies != null &&
    level != null &&
    encounterSlot != null;

  const getFields = (t: Translations): Field[] => [
    {
      label: t["Seed"],
      input: (
        <NumberInput
          disabled
          name="seed"
          numType="hex"
          errorMessage={
            seed == null
              ? "Select a result from the Searcher to generate advances here."
              : undefined
          }
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
    if (!canGenerate) {
      return;
    }

    const pkmList = await rngTools.generate_static4_states({
      tid,
      sid,
      species: targetSpecies,
      offset: 0,
      encounter_min_level: level,
      encounter_max_level: level,
      initial_advances: opts.minAdvances,
      max_advances: Math.max(0, opts.maxAdvances - opts.minAdvances),
      method: "DpptWild",
      lead,
      seed,
      filter: allowAllFilter,
      filter_level: null,
      filter_characteristic: null,
    });

    const mappedResults = pkmList
      .filter((pkm) => pkm.encounter_slot === encounterSlot)
      .map(
        (pkm): Result => ({
          id: `${pkm.advance}`,
          advance: pkm.advance,
          species: targetSpecies,
          encounterSlot: pkm.encounter_slot,
        }),
      );

    setResults(mappedResults);
  };

  const handleDone = () => {
    setStep(Number.MAX_SAFE_INTEGER);
  };

  return (
    <Flex vertical gap={16}>
      <RngToolForm<FormState, Result>
        key={`${seed}-${targetSpecies}-${encounterSlot}`}
        initialValues={getInitialValues(initialMinAdvance, initialMaxAdvance)}
        disableGenerate={!canGenerate}
        submitTrackerId="pokeradar4_chain_starter_generate"
        validationSchema={Validator}
        getFields={getFields}
        getColumns={getColumns}
        onSubmit={onSubmit}
        results={results}
      />
      <Button
        trackerId="pokeradar4_chain_starter_done"
        onClick={handleDone}
        fullWidth
      >
        Done!
      </Button>
    </Flex>
  );
};
