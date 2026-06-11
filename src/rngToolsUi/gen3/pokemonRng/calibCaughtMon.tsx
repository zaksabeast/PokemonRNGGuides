import { z } from "zod";
import {
  Flex,
  FormikNumberInput,
  FormikRadio,
  Icon,
  ResultColumn,
} from "~/components";
import { Button } from "~/components/button";
import { FormikSelect } from "~/components/select";
import { nature } from "~/types/nature";
import { formatLargeInteger } from "~/utils/formatLargeInteger";
import { getNatureInputProps } from "~/components/pkmFilter";
import {
  createAllStats0,
  gender,
  species,
  StatFieldsSchema,
  getGenderFilterOptions,
} from "~/types";
import {
  Gen3StaticMethod,
  Gen3Method,
  Ivs,
  Nature,
  rngTools,
  Species,
  StatsValue,
  Static3SearcherResult,
  Wild3SearcherResultMon,
} from "~/rngTools";
import { Tooltip } from "antd";
import { formatProbability } from "~/utils/formatProbability";
import { Gen3IvRating, getGen3IvRating } from "../ivRater";
import { ability12 } from "~/types/ability";
import { match, P } from "ts-pattern";
import { pokerng_with_jump } from "~/utils/lcrng";
import { MinMaxStats } from "~/types/stat";
import { FormikAbilityFilter } from "~/components/abilityFilter";
import { getStatFields } from "~/rngToolsUi/shared/statFields";
import { formatEmeraldTargetFromPainting } from "~/utils/formatEmeraldTargetFromPainting";

export const validator = z
  .object({
    nature: z.enum(nature),
    gender: z.enum(gender),
    species: z.enum(species),
    lvl: z.number().min(1).max(100),
    ability: z.enum(ability12).nullable(),
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
  method: Gen3Method | Gen3StaticMethod;
  score: number;
  probabilityHitMethodsAtAdvance: number;
  distanceFromTargetAfter: number;
  distanceFromTargetBefore: number;
  uid: number;
  statsWithRareCandy: StatsValue & { lvl: number };
  ivs: Ivs;
} & Gen3IvRating;

export const BATTLE_VIDEO_CONFIDENCE_RANGE = 3600; // We assume the player hits its target advance by more or less 1 minute

export const updateResultsForRareCandy = async (
  results: CaughtMonResult[],
  species: Species,
  initialLvl: number,
  nature: Nature,
  rareCandy: number,
) => {
  return Promise.all(
    results.map(async (res) => {
      const lvl = Math.min(initialLvl + rareCandy, 100);
      const stats = await rngTools.calculate_stats(
        species,
        lvl,
        nature,
        res.ivs,
        createAllStats0(),
      );

      return {
        ...res,
        statsWithRareCandy: {
          ...stats,
          lvl,
        },
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
        title: "Lv.",
        dataIndex: "statsWithRareCandy",
        render: (statsWithRareCandy) => {
          return statsWithRareCandy.lvl;
        },
      },
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
    title: "IV Rating",
    tooltip:
      "Rating from the stat judge in the building behind the Pokémon Center at the Battle Frontier.",
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

export const getCommonFieldInputs = (
  selectedSpecies: Species,
  minMaxStats: MinMaxStats,
  rareCandy: number,
  setRareCandyCount: (count: number) => void,
) => {
  return [
    {
      label: "Gender",
      input: (
        <FormikRadio
          name="gender"
          options={getGenderFilterOptions(selectedSpecies, false)}
        />
      ),
    },
    {
      label: "Ability",
      input: (
        <FormikAbilityFilter<FormState>
          name="ability"
          species={selectedSpecies}
          permitAny={false}
          displayHiddenAbility={false}
          mergeFirstSecondIfSameAbility
        />
      ),
    },
    {
      label: "Nature",
      input: (
        <FormikSelect<FormState, "nature">
          name="nature"
          {...getNatureInputProps()}
        />
      ),
    },
    ...getStatFields<FormState>(minMaxStats),
    {
      label: "Rare Candy",
      input: (
        <Flex dir="row">
          <Button
            trackerId="calib_set_rare_candy_to_1"
            onClick={() => {
              setRareCandyCount(1);
            }}
          >
            {" =1 "}
          </Button>
          <FormikNumberInput<FormState> name="rareCandy" numType="decimal" />
          <Button
            trackerId="calib_add_rare_candy"
            onClick={() => {
              setRareCandyCount(Math.min(rareCandy + 1, 99));
            }}
          >
            {" +1 "}
          </Button>
        </Flex>
      ),
    },
  ];
};

export const getAdvDiffTxt = (
  result: CaughtMonResult,
  targetMethod: Gen3Method | Gen3StaticMethod,
) => {
  const diffWithTarget =
    result.advance.adv_after_painting - result.targetAdvance.adv_after_painting;
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

export const createColumns = (
  targetMethod: Gen3Method | Gen3StaticMethod,
  targetPaintingAdvs: { before: number; after: number },
  usingPaintingReseeding: boolean,
  lastRareCandyValue: number,
  onRemove: (onRemove: CaughtMonResult) => void,
  onUpdateCalib?: (selected: CaughtMonResult) => void,
): ResultColumn<CaughtMonResult>[] => {
  return [
    {
      title: (
        <span>
          Update <br /> Calibration
        </span>
      ),
      key: "Update Calibration",
      dataIndex: "advance",
      show: onUpdateCalib != null,
      render: (_, values) => {
        if (
          values.advance.frame_before_painting === targetPaintingAdvs.before &&
          values.advance.adv_after_painting === targetPaintingAdvs.after &&
          values.method === targetMethod
        ) {
          return "Target Pokémon";
        }

        return (
          <Button
            type="text"
            color="PrimaryText"
            trackerId="static3CalibCaughtMon_adv"
            onClick={() => {
              onUpdateCalib?.(values);
            }}
          >
            <Icon name="Update" size={20} />
          </Button>
        );
      },
    },
    {
      title: usingPaintingReseeding ? (
        <span>
          Advance after <br /> painting
        </span>
      ) : (
        "Advance"
      ),
      key: "frame_after_painting",
      dataIndex: "advance",
      render: (_, values) => {
        const diffTxt = getAdvDiffTxt(values, targetMethod);
        const title = formatEmeraldTargetFromPainting(
          values.advance.frame_before_painting,
          values.advance.adv_after_painting,
        );
        return <Tooltip title={title}>{diffTxt}</Tooltip>;
      },
    },
    confidenceRatingColumn,
    {
      title: "Remove",
      dataIndex: "advance",
      render: (_, values) => {
        return (
          <Button
            type="text"
            color="PrimaryText"
            trackerId="Static3CalibCaughtMon_remove"
            onClick={() => {
              onRemove(values);
            }}
          >
            <Icon name="Close" />
          </Button>
        );
      },
    },
    ...ivInfoColumns(lastRareCandyValue),
  ];
};

let nextUid = 0;

export const createUiResultBase = (
  result: Static3SearcherResult | Wild3SearcherResultMon,
  targetPaintingAdvs: { before: number; after: number },
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
      frame_before_painting: targetPaintingAdvs.before,
      adv_after_painting: targetPaintingAdvs.after,
    },
    method: result.method,
    uid: nextUid++,
    ...getGen3IvRating(result.ivs),
    statsWithRareCandy: createAllStats0(),
    ivs: result.ivs,
  };
};
