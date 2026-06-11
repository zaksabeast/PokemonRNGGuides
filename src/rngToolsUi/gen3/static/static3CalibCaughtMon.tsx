import React from "react";
import { Field, Flex, FormFieldTable, RngToolForm } from "~/components";
import {
  getPkmFilterInitialValues,
  pkmFilterFieldsToRustInput,
} from "~/components/pkmFilter";
import {
  Gen3StaticMethod,
  Nature,
  rngTools,
  Species,
  Static3SearcherOptions,
} from "~/rngTools";
import type { TargetSetup } from "./static3TargetSetupSearcher";
import { getIvRangeFromStats, getStatRange } from "~/types/statRange";
import {
  gen3PkmFilterFieldsToRustInput,
  getGen3PkmFilterInitialValues,
} from "~/components/gen3PkmFilter";
import {
  BATTLE_VIDEO_CONFIDENCE_RANGE,
  CaughtMonResult,
  createColumns,
  createUiResultBase,
  FormState,
  getCommonFieldInputs,
  initialValues,
  updateResultsForRareCandy,
  validator,
} from "../pokemonRng/calibCaughtMon";
import { getStaticEncounterLvl } from "./calculateTargetSetupResult";
import { RngToolSubmit } from "~/components/rngToolForm";
import { Typography } from "~/components/typography";
import { useWatch } from "react-hook-form";
import { useFormContext } from "~/hooks/form";
import clamp from "lodash-es/clamp";

const createStatic3SearcherOptions = async (
  values: FormState,
  targetSetup: TargetSetup,
) => {
  const initial_seed = targetSetup.targetPaintingAdvs.before;

  const initial_advances = Math.max(
    targetSetup.targetPaintingAdvs.after - BATTLE_VIDEO_CONFIDENCE_RANGE,
    0,
  );

  const minMaxIvs = await getIvRangeFromStats({
    species: targetSetup.species,
    lvl: getStaticEncounterLvl(targetSetup),
    nature: values.nature,
    stats: {
      hp: values.hpStat,
      atk: values.atkStat,
      def: values.defStat,
      spa: values.spaStat,
      spd: values.spdStat,
      spe: values.speStat,
    },
  });

  if (minMaxIvs == null) {
    return null;
  }

  const max_advances = BATTLE_VIDEO_CONFIDENCE_RANGE * 2;
  const opts: Static3SearcherOptions = {
    initial_seed,
    tid: 0, // doesn't matter
    sid: 0, // doesn't matter
    initial_advances,
    max_advances,
    max_result_count: 2 ** 32 - 1, // No limit
    filter: {
      ...pkmFilterFieldsToRustInput({
        ...getPkmFilterInitialValues(),
        filter_nature: [values.nature],
        filter_gender: values.gender,
        filter_ability: values.ability,
      }),
      ...minMaxIvs,
    },
    gen3_filter: gen3PkmFilterFieldsToRustInput(
      {
        ...getGen3PkmFilterInitialValues(),
        filter_lvl: getStaticEncounterLvl(targetSetup),
      },
      targetSetup.species,
    ),
    species: targetSetup.species,
    bugged_roamer: targetSetup.game !== "emerald" && targetSetup.roaming,
    methods: [targetSetup.targetMethod],
    painting_opts: null,
  };

  return opts;
};

const searchCaughtMon = async (values: FormState, targetSetup: TargetSetup) => {
  const opts = await createStatic3SearcherOptions(values, targetSetup);
  if (opts == null) {
    return [];
  }

  const resultsBySeed = await rngTools.search_static3(opts);
  const lvl = getStaticEncounterLvl(targetSetup);

  const list = resultsBySeed
    .filter((result) => {
      return result.advance <= opts.initial_advances + opts.max_advances;
    })
    .map((result) => {
      const probabilityHitMethodsAtAdvance = 1;
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
    targetSetup.species,
    lvl,
    values.nature,
    values.rareCandy,
  );
};

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

  const targetSpecies = targetSetup.species;
  const targetLvl = getStaticEncounterLvl(targetSetup);
  const selectedNature = useWatch<FormState, "nature">({ name: "nature" });
  const rareCandy = useWatch<FormState, "rareCandy">({ name: "rareCandy" });

  const [fields, setFields] = React.useState<Field[]>([]);

  React.useEffect(() => {
    onRareCandyChange(targetSpecies, targetLvl, selectedNature, rareCandy);
  }, [onRareCandyChange, rareCandy, targetLvl, selectedNature, targetSpecies]);

  React.useEffect(() => {
    getStatRange({
      species: targetSetup.species,
      levelRange: [targetLvl, targetLvl],
      nature: selectedNature,
    }).then((minMaxStats) => {
      setFields([
        ...getCommonFieldInputs(
          targetSpecies,
          minMaxStats,
          rareCandy,
          (count) => {
            setFieldValue("rareCandy", count);
          },
        ),
      ]);
    });
  }, [
    targetSetup,
    targetSpecies,
    targetLvl,
    selectedNature,
    setFieldValue,
    rareCandy,
  ]);

  return <FormFieldTable fields={fields} />;
};

type Props = {
  targetSetup: TargetSetup;
  setLatestHitAdv?: (
    hitAdv: {
      frame_before_painting: number;
      adv_after_painting: number;
    },
    hitMethod: Gen3StaticMethod,
  ) => void;
};

export const Static3CalibCaughtMon = ({
  targetSetup,
  setLatestHitAdv,
}: Props) => {
  const [lastRareCandyValue, setLastRareCandyValue] = React.useState(1);
  const [results, setResults] = React.useState<CaughtMonResult[]>([]);
  const { targetMethod, targetPaintingAdvs } = targetSetup;
  const usingPaintingReseeding = targetSetup.targetPaintingAdvs.before > 0;

  const onSubmit: RngToolSubmit<FormState> = async (values) => {
    setResults(await searchCaughtMon(values, targetSetup));
  };

  const onRemove = (values: CaughtMonResult) => {
    setResults(results.filter((res) => res !== values));
  };

  const onUpdateCalib =
    setLatestHitAdv == null
      ? undefined
      : (values: CaughtMonResult) => {
          setLatestHitAdv?.(values.advance, values.method as Gen3StaticMethod);
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
    <Flex vertical gap={8}>
      <Typography.Title level={5} p={0} m={0}>
        Caught Pokémon
      </Typography.Title>
      <RngToolForm<FormState, CaughtMonResult>
        formContainerId="generate-static3-caught"
        columns={columns}
        results={results}
        initialValues={initialValues}
        validationSchema={validator}
        onSubmit={onSubmit}
        submitTrackerId="generate_static3_caught"
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
