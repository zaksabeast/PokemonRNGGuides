import React from "react";
import { z } from "zod";
import { ResultColumn } from "~/components";
import {
  FieldRow,
  FormNumberField,
  FormSection,
  NumberField,
  ToolForm,
} from "~/components/form";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import { rngTools, Species } from "~/rngTools";
import { formatSpeciesLabel } from "~/types/species";
import {
  getPkmFilterInitialValues,
  pkmFilterFieldsToRustInput,
} from "~/components/pkmFilter";
import { Translations } from "~/translations";
import { selectedShinyPatchAtom, type SelectedShinyPatch } from "./state";
import { useAtomValue } from "jotai";

type PokeRadar4ChainStarterProps = {
  target: SelectedShinyPatch | null;
  initialMinAdvance?: number;
  initialMaxAdvance?: number;
};

type Result = {
  id: string;
  advance: number;
  species: Species;
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
  target: targetProp,
  initialMinAdvance = 0,
  initialMaxAdvance = 0,
}) => {
  const t = useActiveRouteTranslations();
  const storeTarget = useAtomValue(selectedShinyPatchAtom);
  const target = targetProp ?? storeTarget;
  const [generated, setGenerated] = React.useState<{
    target: SelectedShinyPatch;
    results: Result[];
  } | null>(null);
  const results = generated?.target === target ? generated.results : [];

  const targetKey =
    target == null
      ? "none"
      : `${target.seed}-${target.species}-${target.encounterSlots.join(",")}-${target.advance}`;

  const canGenerate = target != null;

  const onSubmit = async (opts: FormState) => {
    if (!canGenerate) {
      return;
    }

    const {
      seed,
      tid,
      sid,
      lead,
      species: targetSpecies,
      encounterSlots,
      level,
    } = target;

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
      .filter((pkm) => encounterSlots.includes(pkm.encounter_slot))
      .map(
        (pkm): Result => ({
          id: `${pkm.advance}`,
          advance: pkm.advance,
          species: targetSpecies,
          encounterSlot: pkm.encounter_slot,
        }),
      );

    setGenerated({ target, results: mappedResults });
  };

  const maxAdvance = target?.advance ?? initialMaxAdvance;

  return (
    <ToolForm<FormState, Result>
      key={targetKey}
      initialValues={getInitialValues(initialMinAdvance, maxAdvance)}
      disableGenerate={!canGenerate}
      submitTrackerId="pokeradar4_chain_starter_generate"
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
          value={target?.seed ?? null}
          errorMessage={
            target == null
              ? "Select a result from the Searcher to generate advances here."
              : undefined
          }
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
