import React from "react";
import {
  RngToolForm,
  Field,
  Flex,
  ResultColumn,
  Icon,
  FormFieldTable,
  FormikRadio,
  FormikSwitch,
  FormikNumberInput,
} from "~/components";
import { FormikSelect } from "~/components/select";
import { RngToolSubmit } from "~/components/rngToolForm";
import { Typography } from "~/components/typography";
import { Button } from "~/components/button";
import { toOptions } from "~/utils/options";
import { formatLargeInteger } from "~/utils/formatLargeInteger";
import { getNatureInputProps } from "~/components/pkmFilter";
import { getStatFields } from "~/rngToolsUi/shared/statFields";
import { Gen3Method, Nature, rngTools, Species } from "~/rngTools";
import type { TargetSetup } from "./wild3TargetSetupInput";
import { useWatch } from "react-hook-form";
import { getStatRange } from "~/types/statRange";
import uniq from "lodash-es/uniq";
import clamp from "lodash-es/clamp";
import { Tooltip } from "antd";
import { FormikAbilityFilter } from "~/components/abilityFilter";
import { useFormContext } from "~/hooks/form";
import { formatEmeraldTargetFromPainting } from "~/utils/formatEmeraldTargetFromPainting";
import {
  CaughtMonResult,
  confidenceRatingColumn,
  createUiResultBase,
  createWild3SearcherOptions,
  FormState,
  getPossibleEncountersForMap,
  initialValues,
  ivInfoColumns,
  updateResultsForRareCandy,
  validator,
} from "./wild3CalibCaughtMon";
import { getGenderFilterOptions } from "~/types";
import { createColumns } from "../pokemonRng/calibCaughtMon";

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

  const selectedSpecies = useWatch<FormState, "species">({ name: "species" });
  const selectedLvl = useWatch<FormState, "lvl">({ name: "lvl" });
  const selectedNature = useWatch<FormState, "nature">({ name: "nature" });
  const rareCandy = useWatch<FormState, "rareCandy">({ name: "rareCandy" });

  const [fields, setFields] = React.useState<Field[]>([]);

  React.useEffect(() => {
    onRareCandyChange(selectedSpecies, selectedLvl, selectedNature, rareCandy);
  }, [
    onRareCandyChange,
    rareCandy,
    selectedLvl,
    selectedNature,
    selectedSpecies,
  ]);

  React.useEffect(() => {
    const encounters = getPossibleEncountersForMap(targetSetup);
    const speciesList = uniq(
      encounters.map((enc) => enc.species_data.species),
    ).toSorted();
    const selectedSpeciesInfos = encounters.filter(
      (enc) => enc.species_data.species === selectedSpecies,
    );

    const speciesField: Field = {
      label: "Species",
      input: (
        <FormikRadio<FormState>
          name="species"
          options={toOptions(speciesList)}
        />
      ),
    };

    if (selectedSpeciesInfos.length === 0) {
      setFields([speciesField]);
      return;
    }

    const lvls = new Set<number>();
    selectedSpeciesInfos.forEach((info) => {
      for (let lvl = info.min_level; lvl <= info.max_level; lvl++) {
        lvls.add(lvl);
      }
    });
    const sortedLvls = Array.from(lvls).sort((lvl1, lvl2) => lvl1 - lvl2);

    getStatRange({
      species: selectedSpecies,
      levelRange: [selectedLvl, selectedLvl],
      nature: selectedNature,
    }).then((minMaxStats) => {
      setFields([
        speciesField,
        {
          label: "Level",
          input: (
            <FormikRadio<FormState>
              name="lvl"
              options={toOptions(sortedLvls)}
            />
          ),
        },
        ...getCommonFieldInputs(selectedSpecies, minMaxStats, rareCandy, (count) => {
            setFieldValue("rareCandy", count);
        }),
        {
          label: "Display results with 0% likelihood",
          input: <FormikSwitch<FormState> name="generate_even_if_impossible" />,
        },
      ]);
    });
  }, [
    targetSetup,
    selectedSpecies,
    selectedLvl,
    selectedNature,
    setFieldValue,
    rareCandy,
  ]);

  return <FormFieldTable fields={fields} />;
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
        ...createUiResultBase(result, targetSetup),
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
    values.species,
    values.lvl,
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

  const onSubmit: RngToolSubmit<FormState> = async (values) => {
    setResults(await searchCaughtMon(values, targetSetup, leadCycleSpeed));
  };

  const getAdvDiffTxt = (result: CaughtMonResult) => {
    const diffWithTarget =
      result.advance.adv_after_painting -
      result.targetAdvance.adv_after_painting;
    const valStr = formatLargeInteger(result.advance.adv_after_painting);

    if (diffWithTarget === 0) {
      const suffix =
        result.method === targetMethod
          ? `(Target)`
          : `(Target advance but wrong method)`;
      return `${valStr} ${suffix}`;
    }
    const sign = diffWithTarget > 0 ? "+" : "";

    return `${valStr} (${sign}${formatLargeInteger(diffWithTarget)})`;
  };



    const onRemove = (values:CaughtMonResult) => {
        setResults(results.filter((res) => res !== values));
    };

    const onUpdateCalib = setLatestHitAdv == null ? undefined :(values:CaughtMonResult) => {
        setLatestHitAdv?.(values.advance, values.method);
        setResults([]);
    }

  const columns = createColumns(targetMethod, targetPaintingAdvs, usingPaintingReseeding, lastRareCandyValue, onRemove, onUpdateCalib);

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
    <Flex vertical gap={8}>
      <Typography.Title level={5} p={0} m={0}>
        Caught Pokémon
      </Typography.Title>
      <RngToolForm<FormState, CaughtMonResult>
        formContainerId="generate-wild3-caught"
        columns={columns}
        results={results}
        initialValues={initialValues}
        validationSchema={validator}
        onSubmit={onSubmit}
        submitTrackerId="generate_wild3_caught"
        submitButtonLabel="Find advances matching caught Pokémon"
        rowKey="uid"
      >
        <Flex vertical ml={20}>
          <Fields
            targetSetup={targetSetup}
            onRareCandyChange={onRareCandyChange}
          />
        </Flex>
      </RngToolForm>
    </Flex>
  );
};
