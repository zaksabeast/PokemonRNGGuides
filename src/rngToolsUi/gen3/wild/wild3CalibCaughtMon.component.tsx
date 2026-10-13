import React from "react";
import {
  FormRadioField,
  FormSection,
  FormSelectField,
  ToolForm,
  type ToolFormSubmit,
} from "~/components/form";
import { defaultMinMaxStats, MinMaxStats } from "~/types/stat";
import { toOptions } from "~/utils/options";
import { Gen3Method, Nature, rngTools, Species } from "~/rngTools";
import type { TargetSetup } from "./wild3TargetSetupInput";
import { getStatRange } from "~/types/statRange";
import uniq from "lodash-es/uniq";
import clamp from "lodash-es/clamp";
import { useFormContext, useWatch_UNSAFE } from "~/hooks/form";
import {
  createWild3SearcherOptions,
  getPossibleEncountersForMap,
} from "./wild3CalibCaughtMon";
import { CaughtMonFields } from "../pokemonRng/caughtMonFields";
import {
  CaughtMonResult,
  createColumns,
  createUiResultBase,
  FormState,
  initialValues,
  updateResultsForRareCandy,
  validator,
  isType,
} from "../pokemonRng/calibCaughtMon";
import { gen3Methods } from "~/types";

export const Fields = ({
  targetSetup,
  onRareCandyChange,
}: {
  targetSetup: TargetSetup;
  onRareCandyChange: (
    species: Species,
    lvl: number,
    nature: Nature,
    rareCandy: number,
  ) => void;
}) => {
  const { setFieldValue } = useFormContext<FormState>();

  const selectedSpecies = useWatch_UNSAFE<FormState, "wildSpecies">({
    name: "wildSpecies",
  });
  const selectedLvl = useWatch_UNSAFE<FormState, "wildLvl">({
    name: "wildLvl",
  });
  const selectedNature = useWatch_UNSAFE<FormState, "nature">({
    name: "nature",
  });
  const rareCandy = useWatch_UNSAFE<FormState, "rareCandy">({
    name: "rareCandy",
  });

  const [minMaxStats, setMinMaxStats] =
    React.useState<MinMaxStats>(defaultMinMaxStats);

  React.useEffect(() => {
    onRareCandyChange(selectedSpecies, selectedLvl, selectedNature, rareCandy);
  }, [
    onRareCandyChange,
    rareCandy,
    selectedLvl,
    selectedNature,
    selectedSpecies,
  ]);

  const encounters = getPossibleEncountersForMap(targetSetup);
  const speciesList = uniq(
    encounters.map((enc) => enc.species_data.species),
  ).toSorted();
  const selectedSpeciesInfos = encounters.filter(
    (enc) => enc.species_data.species === selectedSpecies,
  );
  const isSpeciesInMap = selectedSpeciesInfos.length > 0;

  React.useEffect(() => {
    if (!isSpeciesInMap) {
      return;
    }

    getStatRange({
      species: selectedSpecies,
      levelRange: [selectedLvl, selectedLvl],
      nature: selectedNature,
    }).then(setMinMaxStats);
  }, [isSpeciesInMap, selectedSpecies, selectedLvl, selectedNature]);

  // A select, since a map can have more species than fit a radio's single row
  const speciesField = (
    <FormSelectField<FormState>
      name="wildSpecies"
      label="Species"
      options={toOptions(speciesList)}
    />
  );

  if (!isSpeciesInMap) {
    return <FormSection title="Caught Pokémon">{speciesField}</FormSection>;
  }

  const lvls = new Set<number>();
  selectedSpeciesInfos.forEach((info) => {
    for (let lvl = info.min_level; lvl <= info.max_level; lvl++) {
      lvls.add(lvl);
    }
  });
  const sortedLvls = Array.from(lvls).sort((lvl1, lvl2) => lvl1 - lvl2);

  return (
    <>
      <CaughtMonFields
        species={selectedSpecies}
        minMaxStats={minMaxStats}
        rareCandy={rareCandy}
        setRareCandyCount={(count) => {
          setFieldValue("rareCandy", count);
        }}
      >
        {speciesField}
        <FormRadioField<FormState>
          name="wildLvl"
          label="Level"
          cellSize="number"
          options={toOptions(sortedLvls)}
        />
      </CaughtMonFields>

    </>
  );
};

const searchCaughtMon = async (
  values: FormState,
  targetSetup: TargetSetup,
  leadCycleSpeed: number,
) => {
  const opts = await createWild3SearcherOptions(
    values,
    targetSetup,
    leadCycleSpeed,
  );
  if (opts == null) {
    return [];
  }
  const wrappedResultsBySeed = await rngTools.search_wild3(opts);

  const resultsBySeed = wrappedResultsBySeed.flatMap(
    (wrappedRes) => wrappedRes.vec,
  );

  const list = resultsBySeed
    .filter((result) => {
      return result.advance <= opts.initial_advances + opts.max_advances;
    })
    .map((result) => {
      const probabilityHitMethodsAtAdvance =
        result.cycle_data_by_lead?.specified_lead?.method_probability ?? 0;
      const scoreHitMethodsAtAdvance = clamp(
        probabilityHitMethodsAtAdvance,
        0.01,
        1,
      );

      const distanceFromTargetAfter = Math.abs(
        targetSetup.targetPaintingAdvs.after - result.advance,
      );
      const score = distanceFromTargetAfter / scoreHitMethodsAtAdvance;

      return {
        ...createUiResultBase(result, targetSetup.targetPaintingAdvs),
        score,
        probabilityHitMethodsAtAdvance,
        distanceFromTargetAfter,
        distanceFromTargetBefore: 0,
      };
    })
    .flat();

  list.sort((res1, res2) => {
    return res1.score - res2.score;
  });

  return updateResultsForRareCandy(
    list,
    values.wildSpecies,
    values.wildLvl,
    values.nature,
    values.rareCandy,
  );
};

type Props = {
  targetSetup: TargetSetup;
  setLatestHitAdv?: (
    hitAdv: {
      frame_before_painting: number;
      adv_after_painting: number;
    },
    hitMethod: Gen3Method,
  ) => void;
  leadCycleSpeed: number;
};

export const Wild3CalibCaughtMon = ({
  targetSetup,
  leadCycleSpeed,
  setLatestHitAdv,
}: Props) => {
  const [lastRareCandyValue, setLastRareCandyValue] = React.useState(1);
  const [results, setResults] = React.useState<CaughtMonResult[]>([]);
  const { targetMethod, targetPaintingAdvs } = targetSetup;
  const usingPaintingReseeding = targetSetup.targetPaintingAdvs.before > 0;

  const onSubmit: ToolFormSubmit<FormState> = async (values) => {
    setResults(await searchCaughtMon(values, targetSetup, leadCycleSpeed));
  };

  const onRemove = (values: CaughtMonResult) => {
    setResults(results.filter((res) => res !== values));
  };

  const onUpdateCalib =
    setLatestHitAdv == null
      ? undefined
      : (values: CaughtMonResult) => {
          const { method } = values;
          if (isType(gen3Methods, method)) {
            setLatestHitAdv?.(values.advance, method);
          }
          setResults([]);
        };

  const columns = createColumns(
    targetMethod,
    targetPaintingAdvs,
    usingPaintingReseeding,
    lastRareCandyValue,
    onRemove,
    onUpdateCalib,
  );

  const onRareCandyChange = async (
    species: Species,
    lvl: number,
    nature: Nature,
    rareCandy: number,
  ) => {
    if (lastRareCandyValue === rareCandy) {
      return;
    }
    setLastRareCandyValue(rareCandy);

    setResults(
      await updateResultsForRareCandy(results, species, lvl, nature, rareCandy),
    );
  };

  return (
    <ToolForm<FormState, CaughtMonResult>
      formContainerId="generate-wild3-caught"
      columns={columns}
      results={results}
      initialValues={initialValues}
      validationSchema={validator}
      onSubmit={onSubmit}
      submitTrackerId="generate_wild3_caught"
      submitButtonLabel="Find caught Pokémon"
      rowKey="uid"
    >
      <Fields targetSetup={targetSetup} onRareCandyChange={onRareCandyChange} />
    </ToolForm>
  );
};
