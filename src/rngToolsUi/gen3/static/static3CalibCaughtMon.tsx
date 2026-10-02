import React from "react";
import { ToolForm, type ToolFormSubmit } from "~/components/form";
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
  initialValues,
  isType,
  updateResultsForRareCandy,
  validator,
} from "../pokemonRng/calibCaughtMon";
import { CaughtMonFields } from "../pokemonRng/caughtMonFields";
import { getStaticEncounterLvl } from "./calculateTargetSetupResult";
import { defaultMinMaxStats, MinMaxStats } from "~/types/stat";
import { useFormContext, useWatch } from "~/hooks/form";
import clamp from "lodash-es/clamp";
import { gen3StaticMethods } from "./constants.tsx";

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
  const watchedValues = useWatch({
    names: {
      nature: true,
      rareCandy: true,
    },
    validationSchema: validator,
  });
  const selectedNature = watchedValues.nature ?? initialValues.nature;
  const rareCandy = watchedValues.rareCandy ?? initialValues.rareCandy;

  const [minMaxStats, setMinMaxStats] =
    React.useState<MinMaxStats>(defaultMinMaxStats);

  React.useEffect(() => {
    onRareCandyChange(targetSpecies, targetLvl, selectedNature, rareCandy);
  }, [onRareCandyChange, rareCandy, targetLvl, selectedNature, targetSpecies]);

  React.useEffect(() => {
    getStatRange({
      species: targetSpecies,
      levelRange: [targetLvl, targetLvl],
      nature: selectedNature,
    }).then(setMinMaxStats);
  }, [targetSpecies, targetLvl, selectedNature]);

  return (
    <CaughtMonFields
      species={targetSpecies}
      minMaxStats={minMaxStats}
      rareCandy={rareCandy}
      setRareCandyCount={(count) => {
        setFieldValue("rareCandy", count);
      }}
    />
  );
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

  const onSubmit: ToolFormSubmit<FormState> = async (values) => {
    setResults(await searchCaughtMon(values, targetSetup));
  };

  const onRemove = (values: CaughtMonResult) => {
    setResults(results.filter((res) => res !== values));
  };

  const onUpdateCalib =
    setLatestHitAdv == null
      ? undefined
      : (values: CaughtMonResult) => {
          const { method } = values;
          if (isType(gen3StaticMethods, method)) {
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
      formContainerId="generate-static3-caught"
      columns={columns}
      results={results}
      initialValues={initialValues}
      validationSchema={validator}
      onSubmit={onSubmit}
      submitTrackerId="generate_static3_caught"
      submitButtonLabel="Find caught Pokémon"
      rowKey="uid"
    >
      <Fields targetSetup={targetSetup} onRareCandyChange={onRareCandyChange} />
    </ToolForm>
  );
};
