import React from "react";
import { RngToolForm, Flex, ResultColumn, Icon } from "~/components";
import { RngToolSubmit } from "~/components/rngToolForm";
import { Typography } from "~/components/typography";
import { Button } from "~/components/button";
import { formatLargeInteger } from "~/utils/formatLargeInteger";
import { createAllStats0 } from "~/types";
import { Nature, rngTools, Species } from "~/rngTools";
import type { TargetSetup } from "./wild3CalibTargetSetupInput";
import clamp from "lodash-es/clamp";
import { Tooltip } from "antd";
import { getGen3IvRating } from "../ivRater";
import { formatEmeraldTargetFromPainting } from "~/utils/formatEmeraldTargetFromPainting";

import {
  Validator,
  FormState,
  initialValues,
  CaughtMonResult,
  createWild3SearcherOptions,
  updateResultsForRareCandy,
  Fields,
  ivInfoColumns,
  confidenceRatingColumn,
} from "./wild3CalibCaughtMon";

type Props = {
  targetPaintingAdvs: { before: number; after: number };
  setLatestHitAdv: (hitAdv: {
    frame_before_painting: number;
    adv_after_painting: number;
  }) => void;
};

const createTargetSetupAtVictoryRoad = (targetPaintingAdvs: {
  before: number;
  after: number;
}): TargetSetup => {
  return {
    map: "MAP_VICTORY_ROAD_1F",
    feebasState: "NotInMap",
    roamerState: "Inactive",
    massOutbreakState: "Inactive",
    action: "SweetScentLand",
    lead: "Egg",
    targetPaintingAdvs,
    targetMethod: "Wild1", // Unused
    usingAverageLeadCycleSpeed: false,
    leadCycleSpeed: 0,
  };
};

const PAINTING_CONFIDENCE_RANGE = 600; // We assume the player hits its target advance by more or less 10s

let nextUid = 0;

const searchCaughtMon = async (values: FormState, targetSetup: TargetSetup) => {
  const opts = await createWild3SearcherOptions(values, targetSetup);

  if (opts == null) {
    return [];
  }

  const min_initial_seed = Math.max(
    0,
    opts.initial_seed - PAINTING_CONFIDENCE_RANGE,
  );
  const max_initial_seed = Math.min(
    0xffff,
    opts.initial_seed + PAINTING_CONFIDENCE_RANGE,
  );

  const wrappedResultsBySeed =
    await rngTools.search_wild3_with_initial_advances_range(
      opts,
      min_initial_seed,
      max_initial_seed,
    );
  const resultsBySeed = wrappedResultsBySeed.map(
    (wrappedRes) => wrappedRes.vec,
  );

  const list = resultsBySeed
    .map((results, seedIncr) => {
      const seed = seedIncr + min_initial_seed;
      return results
        .filter((result) => {
          return result.advance <= opts.max_advances;
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
          const distanceFromTargetBefore = Math.abs(
            targetSetup.targetPaintingAdvs.before - seed,
          );
          const distanceFromTargetScore =
            distanceFromTargetAfter + distanceFromTargetBefore ** 1.5;
          // after has more chance to fluctuate than before.
          // distance = 100 => scoreBefore = 1000

          const score = distanceFromTargetScore / scoreHitMethodsAtAdvance;

          return {
            advance: {
              frame_before_painting: seed,
              adv_after_painting: result.advance,
            },
            targetAdvance: {
              frame_before_painting: targetSetup.targetPaintingAdvs.before,
              adv_after_painting: targetSetup.targetPaintingAdvs.after,
            },
            method: result.method,
            score,
            probabilityHitMethodsAtAdvance,
            distanceFromTargetAfter,
            distanceFromTargetBefore,
            uid: nextUid++,
            ...getGen3IvRating(result.ivs),
            statsWithRareCandy: createAllStats0(),
            ivs: result.ivs,
          };
        });
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

export const Wild3CalibCaughtMonForPainting = ({
  targetPaintingAdvs,
  setLatestHitAdv,
}: Props) => {
  const [lastRareCandyValue, setLastRareCandyValue] = React.useState(1);
  const [results, setResults] = React.useState<CaughtMonResult[]>([]);

  const targetSetup = createTargetSetupAtVictoryRoad(targetPaintingAdvs);

  const onSubmit: RngToolSubmit<FormState> = async (values) => {
    setResults(await searchCaughtMon(values, targetSetup));
  };

  const getAdvDiffTxt = (
    result: CaughtMonResult,
    prop: "adv_after_painting" | "frame_before_painting",
  ) => {
    const diffWithTarget = result.advance[prop] - result.targetAdvance[prop];
    const valStr = formatLargeInteger(result.advance[prop]);

    if (diffWithTarget === 0) {
      const suffix = prop === "frame_before_painting" ? " (Target)" : "";
      return `${valStr}${suffix}`;
    }
    const sign = diffWithTarget > 0 ? "+" : "";

    return `${valStr} (${sign}${formatLargeInteger(diffWithTarget)})`;
  };

  const columns: ResultColumn<CaughtMonResult>[] = [
    {
      title: (
        <span>
          Update <br /> Calibration
        </span>
      ),
      key: "Update Calibration",
      dataIndex: "advance",
      render: (advance) => {
        return (
          <Button
            type="text"
            color="PrimaryText"
            trackerId="wild3CalibCaughtMon_adv"
            onClick={() => {
              setLatestHitAdv(advance);
              setResults([]);
            }}
          >
            <Icon name="Update" size={20} />
          </Button>
        );
      },
    },
    {
      title: (
        <span>
          Frame before <br /> painting
        </span>
      ),
      key: "frame_before_painting",
      dataIndex: "advance",
      render: (_, values) => {
        return getAdvDiffTxt(values, "frame_before_painting");
      },
    },
    {
      title: (
        <span>
          Advance after <br /> painting
        </span>
      ),
      key: "frame_after_painting",
      dataIndex: "advance",
      render: (_, values) => {
        const diffTxt = getAdvDiffTxt(values, "adv_after_painting");
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
            trackerId="Wild3CalibCaughtMon_remove"
            onClick={() => {
              setResults(results.filter((res) => res !== values));
            }}
          >
            <Icon name="Close" />
          </Button>
        );
      },
    },
    ...ivInfoColumns(lastRareCandyValue),
  ];

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
        validationSchema={Validator}
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
