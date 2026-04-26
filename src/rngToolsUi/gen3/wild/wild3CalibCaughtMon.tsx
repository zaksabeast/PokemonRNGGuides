import { z } from "zod";
import { ResultColumn, Icon } from "~/components";
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
  Wild3EncounterGameData,
  Wild3MapSetups,
  Wild3SearcherOptions,
  Wild3SearcherResultMon,
} from "~/rngTools";
import { getWild3EmeraldGameData } from "./data/wild3GameData";
import type { TargetSetup } from "./wild3CalibTargetSetupInput";
import { isFishingAction, wild3Actions } from "./utils";
import { getIvRangeFromStats } from "~/types/statRange";
import {
  gen3PkmFilterFieldsToRustInput,
  getGen3PkmFilterInitialValues,
} from "~/components/gen3PkmFilter";
import { Tooltip } from "antd";
import { formatProbability } from "~/utils/formatProbability";
import { Gen3IvRating, getGen3IvRating } from "../ivRater";
import { ability } from "~/types/ability";
import { match, P } from "ts-pattern";
import { pokerng_with_jump } from "~/utils/lcrng";

export const emeraldWildGameData = getWild3EmeraldGameData();

export const validator = z
  .object({
    nature: z.enum(nature),
    gender: z.enum(gender),
    species: z.enum(emeraldWildGameData.species),
    lvl: z.number().min(1).max(100),
    ability: z.enum(ability).nullable(),
    generate_even_if_impossible: z.boolean(),
    rareCandy: z.number().min(0).max(99),
  })
  .extend(StatFieldsSchema.shape);

export type FormState = z.infer<typeof validator>;

export const initialValues: FormState = {
  hpStat: 0,
  atkStat: 0,
  defStat: 0,
  spaStat: 0,
  spdStat: 0,
  speStat: 0,
  nature: "Adamant",
  gender: "Male",
  species: "Shuckle",
  lvl: 1,
  ability: "First",
  generate_even_if_impossible: false,
  rareCandy: 1,
};

export type CaughtMonResult = {
  advance: {
    frame_before_painting: number;
    adv_after_painting: number;
  };
  targetAdvance: {
    frame_before_painting: number;
    adv_after_painting: number;
  };
  method: Gen3Method;
  score: number;
  probabilityHitMethodsAtAdvance: number;
  distanceFromTargetAfter: number;
  distanceFromTargetBefore: number;
  uid: number;
  statsWithRareCandy: StatsValue;
  ivs: Ivs;
} & Gen3IvRating;

export const BATTLE_VIDEO_CONFIDENCE_RANGE = 3600; // We assume the player hits its target advance by more or less 1 minute

let nextUid = 0;

export const createWild3SearcherOptions = async (
  values: FormState,
  targetSetup: TargetSetup,
) => {
  const initial_seed = targetSetup.targetPaintingAdvs.before;

  const initial_advances = Math.max(
    targetSetup.targetPaintingAdvs.after - BATTLE_VIDEO_CONFIDENCE_RANGE,
    0,
  );

  const map_data = emeraldWildGameData.maps_data.find(
    (map) => map.map_id === targetSetup.map,
  );
  if (map_data == null) {
    return null;
  }
  const map_setup: Wild3MapSetups = {
    map_data,
    actions: [targetSetup.action],
    roamer_states: [targetSetup.roamerState],
    mass_outbreak_states: [targetSetup.massOutbreakState],
    feebas_states: [targetSetup.feebasState],
  };

  const minMaxIvs = await getIvRangeFromStats({
    species: values.species,
    lvl: values.lvl,
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
  const opts: Wild3SearcherOptions = {
    initial_seed,
    tid: 0, // doesn't matter
    sid: 0, // doesn't matter
    initial_advances,
    max_advances,
    max_result_count: 2 ** 32 - 1, // No limit
    filter: {
      ...pkmFilterFieldsToRustInput({
        ...getPkmFilterInitialValues(),
        filter_nature: values.nature,
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
    painting_opts: null,
    lead_cycle_speed: targetSetup.leadCycleSpeed,
  };

  return opts;
};

export const createUiResultBase = (
  result: Wild3SearcherResultMon,
  targetSetup: TargetSetup,
) => {
  return {
    advance: {
      frame_before_painting: pokerng_with_jump(
        result.seed,
        2 ** 32 - result.advance,
      ), // equivalent to reversing <result.advance> advances
      adv_after_painting: result.advance,
    },
    targetAdvance: {
      frame_before_painting: targetSetup.targetPaintingAdvs.before,
      adv_after_painting: targetSetup.targetPaintingAdvs.after,
    },
    method: result.method,
    uid: nextUid++,
    ...getGen3IvRating(result.ivs),
    statsWithRareCandy: createAllStats0(),
    ivs: result.ivs,
  };
};

export const getPossibleEncountersForMap = (targetSetup: TargetSetup) => {
  const map_data = emeraldWildGameData.maps_data.find(
    (map) => map.map_id === targetSetup.map,
  );
  if (map_data == null) {
    return [];
  }

  const list: Wild3EncounterGameData[] = [
    ...map_data.slots_by_action[wild3Actions.indexOf(targetSetup.action)],
  ];
  if (isFishingAction(targetSetup.action) && map_data.feebas != null) {
    list.push(map_data.feebas);
  }
  if (targetSetup.action === "SweetScentLand") {
    list.push(
      ...map_data.roamers
        .filter((roamer) => roamer.id === targetSetup.roamerState)
        .map((roamer) => roamer.encounter_data),
    );
  }
  if (
    targetSetup.action === "SweetScentLand" ||
    targetSetup.action === "SweetScentWater"
  ) {
    list.push(
      ...map_data.mass_outbreaks
        .filter(
          (mass_outbreak) => mass_outbreak.id === targetSetup.massOutbreakState,
        )
        .map((mass_outbreak) => mass_outbreak.encounter_data),
    );
  }
  return list;
};

export const updateResultsForRareCandy = async (
  results: CaughtMonResult[],
  species: Species,
  initialLvl: number,
  nature: Nature,
  rareCandy: number,
) => {
  return Promise.all(
    results.map(async (res) => {
      return {
        ...res,
        statsWithRareCandy: await rngTools.calculate_stats(
          species,
          Math.min(initialLvl + rareCandy, 100),
          nature,
          res.ivs,
          createAllStats0(),
        ),
      };
    }),
  );
};

export const confidenceRatingColumn: ResultColumn<CaughtMonResult> = {
  title: (
    <span>
      Confidence <br /> Rating
    </span>
  ),
  key: "Confidence Rating",
  dataIndex: "score",
  render: (score, values) => {
    const ratingTxt = match(score)
      .with(P.number.between(0, 500), () => "Very High")
      .with(P.number.between(500, 1000), () => "High")
      .with(P.number.between(1000, 2000), () => "Medium")
      .with(P.number.between(2000, 10000), () => "Low")
      .otherwise(() => "Very Low");

    const { method } = values;
    const prob = formatProbability(values.probabilityHitMethodsAtAdvance);

    const dist = formatLargeInteger(
      values.distanceFromTargetBefore + values.distanceFromTargetAfter,
    );

    const title = `Distance from target: ${dist} advances. Method ${method} (${prob} likelihood)`;
    return <Tooltip title={title}>{ratingTxt}</Tooltip>;
  },
};

export const ivInfoColumns = (
  lastRareCandyValue: number,
): ResultColumn<CaughtMonResult>[] => [
  {
    title: `Stats with x${lastRareCandyValue ?? 0} Rare Candy`,
    type: "group",
    columns: [
      {
        title: "HP",
        dataIndex: "statsWithRareCandy",
        render: (statsWithRareCandy) => {
          return statsWithRareCandy.hp;
        },
      },
      {
        title: "Atk",
        dataIndex: "statsWithRareCandy",
        render: (statsWithRareCandy) => {
          return statsWithRareCandy.atk;
        },
      },
      {
        title: "Def",
        dataIndex: "statsWithRareCandy",
        render: (statsWithRareCandy) => {
          return statsWithRareCandy.def;
        },
      },
      {
        title: "SpA",
        dataIndex: "statsWithRareCandy",
        render: (statsWithRareCandy) => {
          return statsWithRareCandy.spa;
        },
      },
      {
        title: "SpD",
        dataIndex: "statsWithRareCandy",
        render: (statsWithRareCandy) => {
          return statsWithRareCandy.spd;
        },
      },
      {
        title: "Spe",
        dataIndex: "statsWithRareCandy",
        render: (statsWithRareCandy) => {
          return statsWithRareCandy.spe;
        },
      },
    ],
  },
  {
    title: (
      <Tooltip title="Rating from the stat judge in the building behind the Pokémon Center at the Battle Frontier.">
        <div>
          IV Rating <Icon name="InformationCircle" size={16} />
        </div>
      </Tooltip>
    ),
    key: "ivRating",
    type: "group",
    columns: [
      {
        title: "Sum IVs",
        dataIndex: "sumIvsMsg",
      },
      {
        title: "Highest IV",
        dataIndex: "highestStatIds",
        render: (highestStatIds, values) => {
          return `${values.highestIvMsg} (${highestStatIds.map((statId) => statId.toUpperCase()).join(", ")})`;
        },
      },
    ],
  },
];
