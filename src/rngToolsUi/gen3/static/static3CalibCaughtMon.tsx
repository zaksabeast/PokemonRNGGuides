import { z } from "zod";
import { ResultColumn } from "~/components";
import { nature } from "~/types/nature";
import { formatLargeInteger } from "~/utils/formatLargeInteger";
import {
  getPkmFilterInitialValues,
  pkmFilterFieldsToRustInput,
} from "~/components/pkmFilter";
import {
  createAllStats0,
  gen3Methods,
  gender,
  StatFieldsSchema,
} from "~/types";
import {
  Gen3Method,
  Ivs,
  Nature,
  rngTools,
  Species,
  StatsValue,
  Static3EncounterGameData,
  Static3MapSetups,
  Static3SearcherOptions,
  Static3SearcherResultMon,
} from "~/rngTools";
import { getStatic3EmeraldGameData } from "./data/static3GameData";
import type { TargetSetup } from "./static3TargetSetupInput";
import { isFishingAction, static3Actions } from "./utils";
import { getIvRangeFromStats } from "~/types/statRange";
import {
  gen3PkmFilterFieldsToRustInput,
  getGen3PkmFilterInitialValues,
} from "~/components/gen3PkmFilter";
import { Tooltip } from "antd";
import { formatProbability } from "~/utils/formatProbability";
import { Gen3IvRating, getGen3IvRating } from "../ivRater";
import { ability12 } from "~/types/ability";
import { match, P } from "ts-pattern";
import { pokerng_with_jump } from "~/utils/lcrng";
import {
  BATTLE_VIDEO_CONFIDENCE_RANGE,
  CaughtMonResult,
  createColumns,
  FormState,
  getCommonFieldInputs,
} from "../pokemonRng/calibCaughtMon";
import { getStaticEncounterLvl } from "./calculateTargetSetupResult";

let nextUid = 0;

const createStatic3SearcherOptions = async (
  values: FormState,
  targetSetup: TargetSetup,
  leadCycleSpeed: number,
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
        filter_lvl: values.lvl,
      },
      values.species,
    ),
    leads: [targetSetup.lead],
    map_setups: [map_setup],
    methods: gen3Methods,
    consider_cycles: true,
    consider_rng_manipulated_lead_pid: false,
    generate_even_if_impossible: values.generate_even_if_impossible,
    using_white_flute: targetSetup.requiresWhiteFlute,
    painting_opts: null,
    lead_cycle_speed: leadCycleSpeed,
    considered_safari_pokeblocks:
      targetSetup.safariPokeblock == null
        ? "None"
        : {
            Specific: targetSetup.safariPokeblock,
          },
  };

  return opts;
};

const searchCaughtMon = async (
  values: FormState,
  targetSetup: TargetSetup,
  leadCycleSpeed: number,
) => {
  const opts = await createStatic3SearcherOptions(
    values,
    targetSetup,
    leadCycleSpeed,
  );
  if (opts == null) {
    return [];
  }

  const wrappedResultsBySeed = await rngTools.search_static3(opts);

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
    values.species,
    values.lvl,
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
        {
          label: "Display results with 0% likelihood",
          input: <FormikSwitch<FormState> name="generate_even_if_impossible" />,
        },
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
      ? null
      : (values: CaughtMonResult) => {
          setLatestHitAdv?.(values.advance, values.method);
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
